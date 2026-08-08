import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import test from "node:test";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const installerPath = fileURLToPath(
  new URL("../install-pet.mjs", import.meta.url),
);

test("rejects pet IDs that escape the catalog directory", () => {
  const codexHome = mkdtempSync(join(tmpdir(), "awesome-codex-pet-"));

  try {
    const result = spawnSync(
      process.execPath,
      [
        installerPath,
        "../pets/firefly--lingxiaotian",
        "--codex-home",
        codexHome,
      ],
      {
        encoding: "utf8",
        env: { ...process.env, AWESOME_CODEX_PET_NO_STATS: "1" },
      },
    );

    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /Invalid pet id:/);
  } finally {
    rmSync(codexHome, { force: true, recursive: true });
  }
});
