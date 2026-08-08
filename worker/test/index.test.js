import assert from "node:assert/strict";
import test from "node:test";

import worker, {
  buildCreatorFollowKey,
  buildCreatorFollowRateKey,
  buildInstallKeys,
  buildLikeKey,
  buildRequestSupportKey,
  buildRequestSupportRateKey,
  computeTrendingScore,
  isOriginAllowed,
  serializeStatsRows,
} from "../src/index.js";

const env = {
  ALLOWED_ORIGINS: "https://codexpet.top,http://localhost:3000",
  HASH_SALT: "test-only-hash-salt-value",
};

test("origin checks allow scripts and configured browser origins", () => {
  assert.equal(
    isOriginAllowed(new Request("https://stats.example/stats"), env),
    true,
  );
  assert.equal(
    isOriginAllowed(
      new Request("https://stats.example/stats", {
        headers: { Origin: "https://codexpet.top" },
      }),
      env,
    ),
    true,
  );
  assert.equal(
    isOriginAllowed(
      new Request("https://stats.example/stats", {
        headers: { Origin: "https://example.invalid" },
      }),
      env,
    ),
    false,
  );
});

test("legacy request-submission routes stay disabled", async () => {
  const routeEnv = { ...env, DB: {} };
  const requests = [
    new Request("https://api.example/stats"),
    new Request("https://api.example/track/view?slug=firefly--lingxiaotian", {
      method: "POST",
    }),
    new Request("https://api.example/track/vote?kind=pet", {
      method: "POST",
    }),
    new Request("https://api.example/requests/manual", { method: "POST" }),
    new Request("https://api.example/config/public"),
    new Request(
      `https://api.example/uploads/reference/references/${"a".repeat(64)}.png`,
    ),
  ];

  for (const request of requests) {
    const response = await worker.fetch(request, routeEnv);
    assert.equal(response.status, 404, request.url);
  }
});

test("install receipt IDs are idempotent", async () => {
  const request = new Request(
    "https://stats.example/track/install?slug=firefly--lingxiaotian",
    {
      method: "POST",
      headers: {
        "CF-Connecting-IP": "203.0.113.4",
        "X-Event-ID": "install.12345678",
      },
    },
  );
  const first = await buildInstallKeys(
    request,
    env,
    "firefly--lingxiaotian",
    Date.UTC(2026, 6, 14, 1),
  );
  const later = await buildInstallKeys(
    request,
    env,
    "firefly--lingxiaotian",
    Date.UTC(2026, 6, 15, 1),
  );

  assert.equal(first.eventKey, later.eventKey);
});

test("like keys allow one like per IP and pet", async () => {
  const firstRequest = new Request("https://stats.example/track/like", {
    headers: { "CF-Connecting-IP": "203.0.113.4" },
  });
  const sameIpRequest = new Request("https://stats.example/track/like", {
    headers: {
      "CF-Connecting-IP": "203.0.113.4",
      "User-Agent": "another browser",
    },
  });
  const otherIpRequest = new Request("https://stats.example/track/like", {
    headers: { "CF-Connecting-IP": "203.0.113.5" },
  });

  const first = await buildLikeKey(firstRequest, env, "firefly--lingxiaotian");
  const sameIp = await buildLikeKey(
    sameIpRequest,
    env,
    "firefly--lingxiaotian",
  );
  const otherIp = await buildLikeKey(
    otherIpRequest,
    env,
    "firefly--lingxiaotian",
  );
  const otherPet = await buildLikeKey(
    firstRequest,
    env,
    "acheron--lingxiaotian",
  );

  assert.equal(first, sameIp);
  assert.notEqual(first, otherIp);
  assert.notEqual(first, otherPet);
});

test("creator follow keys are scoped by IP and creator", async () => {
  const firstRequest = new Request(
    "https://stats.example/track/creator-follow",
    { headers: { "CF-Connecting-IP": "203.0.113.4" } },
  );
  const sameIpRequest = new Request(
    "https://stats.example/track/creator-follow",
    {
      headers: {
        "CF-Connecting-IP": "203.0.113.4",
        "User-Agent": "another browser",
      },
    },
  );
  const otherIpRequest = new Request(
    "https://stats.example/track/creator-follow",
    { headers: { "CF-Connecting-IP": "203.0.113.5" } },
  );

  const first = await buildCreatorFollowKey(firstRequest, env, "lingxiaotian");
  const sameIp = await buildCreatorFollowKey(
    sameIpRequest,
    env,
    "lingxiaotian",
  );
  const otherIp = await buildCreatorFollowKey(
    otherIpRequest,
    env,
    "lingxiaotian",
  );
  const otherCreator = await buildCreatorFollowKey(
    firstRequest,
    env,
    "chenxin-dlut",
  );
  const firstRate = await buildCreatorFollowRateKey(
    firstRequest,
    env,
    Date.UTC(2026, 6, 13, 1),
  );
  const sameRate = await buildCreatorFollowRateKey(
    sameIpRequest,
    env,
    Date.UTC(2026, 6, 13, 1, 59),
  );
  const nextHourRate = await buildCreatorFollowRateKey(
    firstRequest,
    env,
    Date.UTC(2026, 6, 13, 2),
  );

  assert.equal(first, sameIp);
  assert.notEqual(first, otherIp);
  assert.notEqual(first, otherCreator);
  assert.equal(firstRate.key, sameRate.key);
  assert.notEqual(firstRate.key, nextHourRate.key);
});

test("request support keys are scoped by IP and issue", async () => {
  const firstRequest = new Request(
    "https://stats.example/track/request-support",
    { headers: { "CF-Connecting-IP": "203.0.113.4" } },
  );
  const sameIpRequest = new Request(
    "https://stats.example/track/request-support",
    {
      headers: {
        "CF-Connecting-IP": "203.0.113.4",
        "User-Agent": "another browser",
      },
    },
  );
  const otherIpRequest = new Request(
    "https://stats.example/track/request-support",
    { headers: { "CF-Connecting-IP": "203.0.113.5" } },
  );

  const first = await buildRequestSupportKey(firstRequest, env, 77);
  const sameIp = await buildRequestSupportKey(sameIpRequest, env, 77);
  const otherIp = await buildRequestSupportKey(otherIpRequest, env, 77);
  const otherIssue = await buildRequestSupportKey(firstRequest, env, 69);
  const firstRate = await buildRequestSupportRateKey(
    firstRequest,
    env,
    Date.UTC(2026, 6, 29, 1),
  );
  const nextHourRate = await buildRequestSupportRateKey(
    firstRequest,
    env,
    Date.UTC(2026, 6, 29, 2),
  );

  assert.equal(first, sameIp);
  assert.notEqual(first, otherIp);
  assert.notEqual(first, otherIssue);
  assert.notEqual(firstRate.key, nextHourRate.key);
});

test("stats serialization exposes recent likes and creator fields", () => {
  const payload = serializeStatsRows(
    [
      {
        slug: "firefly--lingxiaotian",
        installs: 10,
        likes: 7,
        installs_7d: 3,
        likes_7d: 5,
        updated_at: 42,
      },
    ],
    Date.UTC(2026, 6, 14),
    [{ slug: "lingxiaotian", followers: 12 }],
    [{ issue_number: 77, supporters: 4, updated_at: 43 }],
  );

  assert.equal(payload.windowDays, 7);
  assert.equal(payload.pets["firefly--lingxiaotian"].installs7d, 3);
  assert.equal(payload.pets["firefly--lingxiaotian"].likes, 7);
  assert.equal(payload.pets["firefly--lingxiaotian"].likes7d, 5);
  assert.equal(
    payload.pets["firefly--lingxiaotian"].trendingScore,
    computeTrendingScore(3, 5),
  );
  assert.equal(payload.creators.lingxiaotian.followers, 12);
  assert.deepEqual(payload.requests["77"], {
    supporters: 4,
    updatedAt: 43,
  });
  assert.ok(payload.pets["firefly--lingxiaotian"].dailyRank >= 0);
});

test("trending score combines recent installs and likes", () => {
  assert.ok(computeTrendingScore(5) > computeTrendingScore(1));
  assert.ok(computeTrendingScore(1, 5) > computeTrendingScore(1, 1));
  assert.equal(computeTrendingScore(-1), 0);
  assert.equal(computeTrendingScore(Number.NaN), 0);
});
