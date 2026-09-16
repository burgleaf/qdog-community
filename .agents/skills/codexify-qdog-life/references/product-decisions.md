# Product decisions and open questions

## Confirmed product boundary

1. A completed Cyber Life hatch page shows “Copy Codex pet prompt”.
2. Clicking it only copies a fully populated text prompt.
3. The user opens Codex and pastes the prompt themselves.
4. Codex reads the public Skill and downloads the direct image link included in the prompt.
5. Codex owns generation, QA, local installation, retries, and files.
6. QDog receives no progress callback, conversion state, spritesheet, pet metadata, or completion receipt.
7. Community submission remains a separate explicit user request.

QDog therefore has no Codex conversion job model. It should not reserve credits, poll Codex, expose a result-upload API, or describe the pet as already converted.

## Image-link requirements

The authenticated hatch-image route cannot be copied directly because Codex does not inherit the browser's QDog cookie. The copy action therefore requests a stateless HMAC-signed PNG or WebP link that:

- is readable with an ordinary unauthenticated HTTPS `GET`;
- does not require browser cookies, custom headers, JavaScript, or a referrer;
- returns image bytes rather than an HTML hatch page;
- remains valid long enough for the user to paste and run the prompt;
- is unguessable or explicitly public, according to the product's privacy choice;
- contains no email address, account id, session id, or reusable account credential;
- may be cached as immutable image content without exposing private account data.

The implemented link is valid for 24 hours and can be recreated by clicking copy again. It is not a conversion API or platform-managed task; it is only the source-image link embedded in the copied prompt.

## Prompt construction

- Keep the public Skill URL and `hatch-pet-v2` compatible on the referenced repository branch.
- Include only the life code, optional display name, direct image URL, language instruction, and pinned Skill ref.
- Do not include account information, browser state, hidden genome data, provider credentials, or an upload callback.
- Keep the button label explicit: “Copy Codex pet prompt”, followed by transient feedback such as “Copied — paste into Codex”.
- Do not claim the click starts generation; generation starts only after the user pastes and submits the prompt in Codex.

## Remaining questions

### Image access and privacy

- Is the Cyber Life image intentionally public, or should the URL be unguessable and expire?
- Is a future explicit revocation control needed before the current 24-hour expiry?
- Is the user clearly told that anyone receiving the copied prompt can view the linked image until expiry?

### Naming and identity

- Can users name a Cyber Life before copying, or should Codex derive a neutral name from the life code?
- Is the visible life code safe to include in prompts and local filenames?
- Which visual simplifications are acceptable for wide wings, multiple tails, detached ornaments, or dense crystalline detail?

### Cost and expectations

- The V2 process may use up to 13 image-generation jobs plus repairs. Is the page clear that these consume the user's own Codex allowance rather than QDog hatch credits?
- Should the page estimate that generation takes time and remains open to visual confirmation inside Codex?
- What fallback copy should appear if the user's Codex environment has no image generation capability?

### Compatibility

- How is the tested Skill commit updated without breaking prompts copied earlier?
- Should the prompt include an explicit minimum Codex version?
- What should mobile users see when they can copy the prompt but cannot run Codex Desktop immediately?

### Public sharing

- If the user later submits the result, which public author name should be used?
- Should QDog explain that local creation does not automatically publish or license the pet?
- Does community submission need a separate consent step for revealing the pet's QDog origin?
