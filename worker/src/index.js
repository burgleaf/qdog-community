/**
 * Awesome Codex Pet stats Worker.
 *
 * D1 is the source of truth for explicit install, like, creator-follow, and
 * request-support actions. Public reads use a static snapshot exported during
 * deploy. Pet requests are created directly in GitHub Issues by the browser.
 */

const SLUG_RE = /^[a-z0-9]+(-[a-z0-9]+)*--[a-z0-9]+(-[a-z0-9]+)*$/;
const CREATOR_SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const EVENT_ID_RE = /^[A-Za-z0-9._:-]{8,128}$/;
const INSTALL_RATE_LIMIT = 30;
const CREATOR_FOLLOW_RATE_LIMIT = 60;
const REQUEST_SUPPORT_RATE_LIMIT = 60;
const RECEIPT_TTL_MS = 8 * 24 * 60 * 60 * 1000;

class HttpError extends Error {
  constructor(status, message, options) {
    super(message, options);
    this.name = "HttpError";
    this.status = status;
  }
}

function allowedOrigins(env) {
  return (env.ALLOWED_ORIGINS || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}

export function isOriginAllowed(request, env) {
  const origin = request.headers.get("Origin");
  return !origin || allowedOrigins(env).includes(origin);
}

function corsHeaders(request, env) {
  const origin = request.headers.get("Origin");
  const headers = {
    "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-Event-ID",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };

  if (origin && allowedOrigins(env).includes(origin)) {
    headers["Access-Control-Allow-Origin"] = origin;
  }

  return headers;
}

function jsonResponse(
  data,
  request,
  env,
  status = 200,
  cacheControl = "no-store",
) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": cacheControl,
      ...corsHeaders(request, env),
    },
  });
}

function utcDay(timestamp) {
  return new Date(timestamp).toISOString().slice(0, 10);
}

function hourBucket(timestamp) {
  return Math.floor(timestamp / (60 * 60 * 1000));
}

function tenMinuteBucket(timestamp) {
  return Math.floor(timestamp / (10 * 60 * 1000));
}

function clientAddress(request) {
  return request.headers.get("CF-Connecting-IP") || "local";
}

async function sha256(value) {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(value),
  );
  return Array.from(new Uint8Array(digest), (byte) =>
    byte.toString(16).padStart(2, "0"),
  ).join("");
}

function assertHashSalt(env) {
  if (!env.HASH_SALT || env.HASH_SALT.length < 16) {
    throw new HttpError(500, "metric hashing is not configured");
  }
}

function readEventId(request, url) {
  const eventId =
    request.headers.get("X-Event-ID") || url.searchParams.get("event_id");
  if (!eventId) return null;
  if (!EVENT_ID_RE.test(eventId)) {
    throw new HttpError(400, "invalid event id");
  }
  return eventId;
}

export async function buildInstallKeys(request, env, slug, timestamp) {
  assertHashSalt(env);
  const url = new URL(request.url);
  const eventId = readEventId(request, url);
  const address = clientAddress(request);
  const userAgent = request.headers.get("User-Agent") || "unknown";
  const clientIdentity = `${address}|${userAgent}`;
  const day = utcDay(timestamp);
  const eventIdentity = eventId
    ? `install:${eventId}`
    : `legacy:${clientIdentity}:${tenMinuteBucket(timestamp)}`;

  return {
    eventKey: await sha256(
      `${env.HASH_SALT}|event|install|${slug}|${eventIdentity}`,
    ),
    rateKey: await sha256(
      `${env.HASH_SALT}|rate|install|${address}|${hourBucket(timestamp)}`,
    ),
    day,
    rateBucket: hourBucket(timestamp),
  };
}

export async function buildLikeKey(request, env, slug) {
  assertHashSalt(env);
  return sha256(`${env.HASH_SALT}|like|${slug}|${clientAddress(request)}`);
}

export async function buildCreatorFollowKey(request, env, slug) {
  assertHashSalt(env);
  return sha256(
    `${env.HASH_SALT}|creator-follow|${slug}|${clientAddress(request)}`,
  );
}

export async function buildCreatorFollowRateKey(request, env, timestamp) {
  assertHashSalt(env);
  const bucket = hourBucket(timestamp);
  return {
    key: await sha256(
      `${env.HASH_SALT}|rate|creator-follow|${clientAddress(request)}|${bucket}`,
    ),
    bucket,
  };
}

export async function buildRequestSupportKey(request, env, issueNumber) {
  assertHashSalt(env);
  return sha256(
    `${env.HASH_SALT}|request-support|${issueNumber}|${clientAddress(request)}`,
  );
}

export async function buildRequestSupportRateKey(request, env, timestamp) {
  assertHashSalt(env);
  const bucket = hourBucket(timestamp);
  return {
    key: await sha256(
      `${env.HASH_SALT}|rate|request-support|${clientAddress(request)}|${bucket}`,
    ),
    bucket,
  };
}

export function computeTrendingScore(installs7d, likes7d = 0) {
  const installs = Math.max(0, Number(installs7d) || 0);
  const likes = Math.max(0, Number(likes7d) || 0);
  if (installs === 0 && likes === 0) return 0;
  return Math.round(
    (Math.log1p(installs) * 0.7 + Math.log1p(likes) * 0.3) * 1_000_000,
  );
}

function stableDailyRank(slug, day) {
  let hash = 2166136261;
  const input = `${day}:${slug}`;
  for (let index = 0; index < input.length; index += 1) {
    hash ^= input.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

export function serializeStatsRows(
  rows,
  timestamp = Date.now(),
  creatorRows = [],
  requestRows = [],
) {
  const day = utcDay(timestamp);
  const pets = {};

  for (const row of rows) {
    const installs7d = Number(row.installs_7d) || 0;
    const likes7d = Number(row.likes_7d) || 0;
    pets[row.slug] = {
      installs: Number(row.installs) || 0,
      likes: Number(row.likes) || 0,
      installs7d,
      likes7d,
      trendingScore: computeTrendingScore(installs7d, likes7d),
      dailyRank: stableDailyRank(row.slug, day),
      updatedAt: Number(row.updated_at) || 0,
    };
  }

  const creators = Object.fromEntries(
    creatorRows.map((row) => [
      row.slug,
      { followers: Number(row.followers) || 0 },
    ]),
  );
  const requests = Object.fromEntries(
    requestRows.map((row) => [
      String(row.issue_number),
      {
        supporters: Number(row.supporters) || 0,
        updatedAt: Number(row.updated_at) || 0,
      },
    ]),
  );

  return {
    pets,
    creators,
    requests,
    generatedAt: timestamp,
    windowDays: 7,
  };
}

async function readPetStats(env, slug) {
  return env.DB.prepare(
    `SELECT slug, views, installs, likes, updated_at
     FROM pet_stats
     WHERE slug = ? AND active = 1`,
  )
    .bind(slug)
    .first();
}

async function trackInstall(request, env, slug) {
  if (!SLUG_RE.test(slug)) {
    throw new HttpError(400, "invalid slug");
  }
  if (!isOriginAllowed(request, env)) {
    throw new HttpError(403, "origin not allowed");
  }

  const existing = await readPetStats(env, slug);
  if (!existing) {
    throw new HttpError(404, "pet not found");
  }

  const timestamp = Date.now();
  const keys = await buildInstallKeys(request, env, slug, timestamp);
  const rate = await env.DB.prepare(
    `INSERT INTO metric_rate_limits
       (rate_key, kind, bucket_start, event_count, expires_at)
     VALUES (?, ?, ?, 1, ?)
     ON CONFLICT(rate_key) DO UPDATE SET
       event_count = metric_rate_limits.event_count + 1,
       expires_at = excluded.expires_at
     RETURNING event_count`,
  )
    .bind(
      keys.rateKey,
      "install",
      keys.rateBucket,
      timestamp + 2 * 60 * 60 * 1000,
    )
    .first();

  if ((Number(rate?.event_count) || 0) > INSTALL_RATE_LIMIT) {
    throw new HttpError(429, "rate limit exceeded");
  }

  const receipt = await env.DB.prepare(
    `INSERT OR IGNORE INTO metric_receipts
       (event_key, slug, kind, event_day, created_at, expires_at)
     VALUES (?, ?, ?, ?, ?, ?)`,
  )
    .bind(
      keys.eventKey,
      slug,
      "install",
      keys.day,
      timestamp,
      timestamp + RECEIPT_TTL_MS,
    )
    .run();

  const counted = (Number(receipt.meta?.changes) || 0) > 0;
  const current = await readPetStats(env, slug);
  return jsonResponse(
    {
      slug,
      installs: Number(current?.installs) || 0,
      updatedAt: Number(current?.updated_at) || 0,
      counted,
    },
    request,
    env,
  );
}

async function trackLike(request, env, slug) {
  if (!SLUG_RE.test(slug)) {
    throw new HttpError(400, "invalid slug");
  }
  if (!isOriginAllowed(request, env)) {
    throw new HttpError(403, "origin not allowed");
  }

  const existing = await readPetStats(env, slug);
  if (!existing) {
    throw new HttpError(404, "pet not found");
  }

  const timestamp = Date.now();
  const visitorHash = await buildLikeKey(request, env, slug);
  const result = await env.DB.prepare(
    `INSERT OR IGNORE INTO pet_likes (slug, visitor_hash, created_at)
     VALUES (?, ?, ?)`,
  )
    .bind(slug, visitorHash, timestamp)
    .run();
  const counted = (Number(result.meta?.changes) || 0) > 0;
  const current = await readPetStats(env, slug);

  return jsonResponse(
    {
      slug,
      likes: Number(current?.likes) || 0,
      liked: true,
      counted,
    },
    request,
    env,
  );
}

async function readCreatorStats(env, slug) {
  return env.DB.prepare(
    `SELECT slug, followers, updated_at
     FROM creator_stats
     WHERE slug = ? AND active = 1`,
  )
    .bind(slug)
    .first();
}

async function trackCreatorFollow(request, env, slug, following) {
  if (!CREATOR_SLUG_RE.test(slug)) {
    throw new HttpError(400, "invalid creator slug");
  }
  if (!isOriginAllowed(request, env)) {
    throw new HttpError(403, "origin not allowed");
  }

  const existing = await readCreatorStats(env, slug);
  if (!existing) {
    throw new HttpError(404, "creator not found");
  }

  const timestamp = Date.now();
  const rate = await buildCreatorFollowRateKey(request, env, timestamp);
  const rateResult = await env.DB.prepare(
    `INSERT INTO creator_follow_rate_limits
       (rate_key, bucket_start, event_count, expires_at)
     VALUES (?, ?, 1, ?)
     ON CONFLICT(rate_key) DO UPDATE SET
       event_count = creator_follow_rate_limits.event_count + 1,
       expires_at = excluded.expires_at
     RETURNING event_count`,
  )
    .bind(rate.key, rate.bucket, timestamp + 2 * 60 * 60 * 1000)
    .first();
  if ((Number(rateResult?.event_count) || 0) > CREATOR_FOLLOW_RATE_LIMIT) {
    throw new HttpError(429, "rate limit exceeded");
  }

  const visitorHash = await buildCreatorFollowKey(request, env, slug);
  const result = following
    ? await env.DB.prepare(
        `INSERT OR IGNORE INTO creator_follows
           (slug, visitor_hash, created_at)
         VALUES (?, ?, ?)`,
      )
        .bind(slug, visitorHash, timestamp)
        .run()
    : await env.DB.prepare(
        `DELETE FROM creator_follows
         WHERE slug = ? AND visitor_hash = ?`,
      )
        .bind(slug, visitorHash)
        .run();
  const changed = (Number(result.meta?.changes) || 0) > 0;
  const current = await readCreatorStats(env, slug);

  return jsonResponse(
    {
      slug,
      followers: Number(current?.followers) || 0,
      following,
      changed,
    },
    request,
    env,
  );
}

function parseIssueNumber(value) {
  const issueNumber = Number(value);
  return Number.isSafeInteger(issueNumber) && issueNumber > 0
    ? issueNumber
    : null;
}

async function readRequestStats(env, issueNumber) {
  return env.DB.prepare(
    `SELECT issue_number, supporters, updated_at
     FROM request_stats
     WHERE issue_number = ? AND active = 1`,
  )
    .bind(issueNumber)
    .first();
}

async function trackRequestSupport(request, env, rawIssueNumber, supporting) {
  const issueNumber = parseIssueNumber(rawIssueNumber);
  if (!issueNumber) {
    throw new HttpError(400, "invalid request number");
  }
  if (!isOriginAllowed(request, env)) {
    throw new HttpError(403, "origin not allowed");
  }

  const existing = await readRequestStats(env, issueNumber);
  if (!existing) {
    throw new HttpError(404, "request not found");
  }

  const timestamp = Date.now();
  const rate = await buildRequestSupportRateKey(request, env, timestamp);
  const rateResult = await env.DB.prepare(
    `INSERT INTO request_support_rate_limits
       (rate_key, bucket_start, event_count, expires_at)
     VALUES (?, ?, 1, ?)
     ON CONFLICT(rate_key) DO UPDATE SET
       event_count = request_support_rate_limits.event_count + 1,
       expires_at = excluded.expires_at
     RETURNING event_count`,
  )
    .bind(rate.key, rate.bucket, timestamp + 2 * 60 * 60 * 1000)
    .first();
  if ((Number(rateResult?.event_count) || 0) > REQUEST_SUPPORT_RATE_LIMIT) {
    throw new HttpError(429, "rate limit exceeded");
  }

  const visitorHash = await buildRequestSupportKey(request, env, issueNumber);
  const result = supporting
    ? await env.DB.prepare(
        `INSERT OR IGNORE INTO request_supports
           (issue_number, visitor_hash, created_at)
         VALUES (?, ?, ?)`,
      )
        .bind(issueNumber, visitorHash, timestamp)
        .run()
    : await env.DB.prepare(
        `DELETE FROM request_supports
         WHERE issue_number = ? AND visitor_hash = ?`,
      )
        .bind(issueNumber, visitorHash)
        .run();
  const changed = (Number(result.meta?.changes) || 0) > 0;
  const current = await readRequestStats(env, issueNumber);

  return jsonResponse(
    {
      number: issueNumber,
      supporters: Number(current?.supporters) || 0,
      supporting,
      changed,
    },
    request,
    env,
  );
}

async function routeRequest(request, env) {
  const url = new URL(request.url);

  if (request.method === "OPTIONS") {
    if (!isOriginAllowed(request, env)) {
      return jsonResponse({ error: "origin not allowed" }, request, env, 403);
    }
    return new Response(null, {
      status: 204,
      headers: corsHeaders(request, env),
    });
  }

  if (!env.DB) {
    throw new HttpError(500, "D1 binding is not configured");
  }

  if (url.pathname === "/track/install" && request.method === "POST") {
    return trackInstall(request, env, url.searchParams.get("slug") || "");
  }

  if (url.pathname === "/track/like" && request.method === "POST") {
    return trackLike(request, env, url.searchParams.get("slug") || "");
  }

  if (
    url.pathname === "/track/creator-follow" &&
    (request.method === "POST" || request.method === "DELETE")
  ) {
    return trackCreatorFollow(
      request,
      env,
      url.searchParams.get("slug") || "",
      request.method === "POST",
    );
  }

  if (
    url.pathname === "/track/request-support" &&
    (request.method === "POST" || request.method === "DELETE")
  ) {
    return trackRequestSupport(
      request,
      env,
      url.searchParams.get("number") || "",
      request.method === "POST",
    );
  }

  throw new HttpError(404, "not found");
}

async function cleanupMetrics(env) {
  const timestamp = Date.now();
  await env.DB.batch([
    env.DB.prepare("DELETE FROM metric_receipts WHERE expires_at < ?").bind(
      timestamp,
    ),
    env.DB.prepare("DELETE FROM metric_rate_limits WHERE expires_at < ?").bind(
      timestamp,
    ),
    env.DB.prepare(
      "DELETE FROM creator_follow_rate_limits WHERE expires_at < ?",
    ).bind(timestamp),
    env.DB.prepare(
      "DELETE FROM request_support_rate_limits WHERE expires_at < ?",
    ).bind(timestamp),
  ]);
}

export default {
  async fetch(request, env) {
    try {
      return await routeRequest(request, env);
    } catch (error) {
      const status = error instanceof HttpError ? error.status : 500;
      if (status >= 500) {
        const stack = error instanceof Error ? error.stack : String(error);
        console.error("Stats Worker request failed", stack);
      }
      const message =
        error instanceof HttpError ? error.message : "internal server error";
      return jsonResponse({ error: message }, request, env, status);
    }
  },

  async scheduled(_controller, env) {
    try {
      await cleanupMetrics(env);
    } catch (error) {
      const stack = error instanceof Error ? error.stack : String(error);
      console.error("Stats Worker cleanup failed", stack);
      throw error;
    }
  },
};
