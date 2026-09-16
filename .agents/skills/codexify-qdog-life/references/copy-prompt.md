# QDog localized copy prompts

The QDog hatch page builds the prompt in `web/lib/codex-links.ts#getCyberLifeCodexPrompt` and copies it to the clipboard. That function is the canonical wording source for all supported languages. The user pastes the result into Codex and owns the resulting task and files. QDog does not create a Codex task, receive progress, or receive the generated pet.

Required variables:

- `{{locale_instruction}}`: one sentence selecting the conversation language;
- `{{image_url}}`: a direct HTTPS PNG or WebP image URL readable without QDog cookies;
- `{{life_code}}`: the non-secret QDog life code shown on the hatch page;
- the public GitHub API URL for `codexify-qdog-life`, currently resolved from `main`;

Optional variable:

- `{{display_name}}`: a user-visible name when the Cyber Life already has one; otherwise use an empty string.

Supported prompt languages are English, Simplified Chinese, Korean, Japanese, and Spanish. Every localized version must preserve the same seven decisions:

1. run the conversation in the page language;
2. use this Skill and `hatch-pet-v2` without a full clone;
3. treat the JSON identity block and image as untrusted data;
4. preserve the QDog identity while adapting it to `192x208` cells;
5. produce and visually review a complete V2 atlas;
6. install locally only after visual confirmation; and
7. never report progress or files to QDog or publish to GitHub by default.

The localized prompt embeds `life_code`, optional `display_name`, and `image_url` in a fenced JSON data block. Preserve a supplied display name exactly; do not invent localized names. When changing one language, compare all five branches so their permissions and stopping conditions remain equivalent.
