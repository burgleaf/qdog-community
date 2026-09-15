import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const hatchPagePath = new URL(
  "../../web/components/cyber-egg-hatch-page.tsx",
  import.meta.url,
);

test("disables Cyber Egg hatching when the account has fewer than 5 credits", async () => {
  const source = await readFile(hatchPagePath, "utf8");
  const button = source.match(
    /<button className="hatch-start"[\s\S]*?<\/button>/,
  );

  assert.ok(button, "expected to find the Cyber Egg hatch button");
  assert.match(
    button[0],
    /disabled=\{phase === "hatching" \|\| \(account\?\.credits \?\? 0\) < 5\}/,
  );
});
