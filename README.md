<div align="center">

# QDog

[简体中文](./docs/zh-CN/README.md) | [한국어](./docs/ko/README.md) | [日本語](./docs/ja/README.md) | [Español](./docs/es/README.md) | English

<h2><a href="https://q.dog">Browse and install free community Codex pets at QDog →</a></h2>

<p><strong>QDog is a free community pet gallery.</strong> Browse complete animations like a pet store, install a favorite without cloning the repository, or request a missing character that a community contributor may volunteer to make.</p>

<p><a href="https://q.dog"><strong>Browse pets</strong></a> · <a href="https://q.dog/install"><strong>Install a pet</strong></a> · <a href="https://q.dog/request"><strong>Request a character</strong></a></p>

<a href="https://q.dog"><img src="./assets/cover/qdog-cover.png" alt="Open the QDog gallery"></a>

![pets: 183](https://img.shields.io/badge/pets-183-2ea44f) ![categories: 11](https://img.shields.io/badge/categories-11-0969da) ![languages: en | zh--CN | ko | ja | es](https://img.shields.io/badge/languages-en%20%7C%20zh--CN%20%7C%20ko%20%7C%20ja%20%7C%20es-8250df) ![code: MIT](https://img.shields.io/badge/code-MIT-111111) ![assets: CC BY--NC 4.0](https://img.shields.io/badge/assets-CC%20BY--NC%204.0-f97316) ![install: one command](https://img.shields.io/badge/install-one%20command-111111) [![Pet previews](https://github.com/burgleaf/qdog-community/actions/workflows/pet-previews.yml/badge.svg)](https://github.com/burgleaf/qdog-community/actions/workflows/pet-previews.yml)

</div>

This repository is the source catalog behind [QDog](https://q.dog): it keeps installable pet packages, creator attribution, collection metadata, validation tools, and contribution history. For browsing and installing pets, start with the website.

## Highlights

- **One-command install** — no clone, no manual setup, works on macOS / Linux / Windows
- **Free community gallery** — complete animation previews, collections, creator profiles, weekly rankings based on installs and likes, sharing, and community statistics at [QDog](https://q.dog)
- **Free character requests** — submit a character and references without making a spritesheet; a community contributor may volunteer to create it, with no delivery guarantee
- **AI-first contributions** — contributors can create, repair, and submit pets with Codex; advanced contributors can still open a PR
- **Open licensing** — code under MIT, pet assets under CC BY-NC 4.0

Each pet is a small shareable package:

```text
pets/<pet-slug>--<author-slug>/
├── submission.json
├── pet.json
└── spritesheet.webp
```

Preview images are generated into `assets/previews/<pet-id>/` as local or CI build output, never inside the pet folder.

Repository-defined series and collections live in `collections.json`. Use `kind: franchise` for pets from the same original work and `kind: theme` for cross-franchise groups connected by a shared subject or style. A pet joins either by listing its slug in `submission.json.collections`; the catalog and website are generated from that metadata. Membership is recorded immediately, while the website publishes a collection only after it has at least three pets.

`submission.json.name` is the required fallback name. Creators may keep a pet single-language by omitting `localized_names`, or opt into bilingual naming by providing both `localized_names.en` and `localized_names.zh`. The website follows the visitor's selected language and never invents a translation.

## Pet Versions

| Version | Atlas                            | Runtime metadata                            | Use                                                   |
| ------- | -------------------------------- | ------------------------------------------- | ----------------------------------------------------- |
| v1      | `1536x1872`, 8 columns × 9 rows  | omit `spriteVersionNumber` or set it to `1` | Existing standard-animation pets                      |
| v2      | `1536x2288`, 8 columns × 11 rows | set `spriteVersionNumber: 2`                | Standard animations plus 16 clockwise look directions |

Both versions remain installable. Use v1 when maintaining an existing 9-row pet; use v2 for newly upgraded pets that need directional looking.

## Quick Install

No clone required. Pick the script for your shell:

```bash
# macOS / Linux
curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- firefly--lingxiaotian
```

```powershell
# Windows PowerShell
powershell -NoProfile -ExecutionPolicy Bypass -Command "iwr -UseB https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.ps1 | iex; Install-CodexPet firefly--lingxiaotian"
```

```bash
# Anywhere with Node.js
npx awesome-codex-pet firefly--lingxiaotian
```

List available pets:

```bash
curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- --list
```

Default install locations:

- macOS / Linux: `~/.codex/pets/<pet-id>/`
- Windows: `%USERPROFILE%\.codex\pets\<pet-id>\`

Set `CODEX_HOME` to override, or `AWESOME_CODEX_PET_NO_STATS=1` to opt out of anonymous install counters.

## Upgrade an Existing v1 Pet

1. Open Codex **Settings → Pets**.
2. Find the installed custom pet and choose **Update**.
3. Codex opens a Hatch Pet task. The current v2 workflow validates and preserves the existing 9 animation rows, generates four cardinal anchors plus 16 look directions, then writes an 11-row atlas with `spriteVersionNumber: 2`.
4. Review the generated contact sheet and direction previews before accepting the replacement.

The **Update** action is an AI-assisted v1-to-v2 conversion, not a download notification from this repository. It updates the local package under `~/.codex/pets/`; it does not modify or submit the GitHub copy automatically.

## Pets

### Game Characters

<table>
<tr><th>Name</th><td colspan="5"><strong>★ Featured pet</strong> · <a href="https://q.dog/pets/firefly--lingxiaotian">Firefly</a> · Author: <a href="https://github.com/legeling">@legeling</a> · Category: Game Characters · Version: v1</td></tr>
<tr><th>Install</th><td colspan="5"><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- firefly--lingxiaotian</code></td></tr>
<tr><th>Action</th><td><strong>Idle</strong></td><td><strong>Waving</strong></td><td><strong>Running</strong></td><td><strong>Waiting</strong></td><td><strong>Review</strong></td></tr>
<tr><th>Preview</th><td><img src="https://q.dog/assets/previews/firefly--lingxiaotian/webp/idle.webp" alt="Firefly Idle" width="120" height="130"></td><td><img src="https://q.dog/assets/previews/firefly--lingxiaotian/webp/waving.webp" alt="Firefly Waving" width="120" height="130"></td><td><img src="https://q.dog/assets/previews/firefly--lingxiaotian/webp/running-right.webp" alt="Firefly Running" width="120" height="130"></td><td><img src="https://q.dog/assets/previews/firefly--lingxiaotian/webp/waiting.webp" alt="Firefly Waiting" width="120" height="130"></td><td><img src="https://q.dog/assets/previews/firefly--lingxiaotian/webp/review.webp" alt="Firefly Review" width="120" height="130"></td></tr>
<tr><th>View all actions</th><td colspan="5"><a href="https://q.dog/pets/firefly--lingxiaotian">View all actions →</a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/acheron--lingxiaotian"><img src="https://q.dog/assets/previews/acheron--lingxiaotian/thumbnail.png" alt="Acheron Preview" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/acheron--lingxiaotian">Acheron</a></strong><br>Author: <a href="https://github.com/legeling">@legeling</a> · Category: Game Characters · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- acheron--lingxiaotian</code><br><br><a href="https://q.dog/pets/acheron--lingxiaotian">View all actions →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/aggron-3d--dnnyngyen">Aggron (3D)</a></strong><br>Author: <a href="https://github.com/dnnyngyen">@dnnyngyen</a> · Category: Game Characters · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- aggron-3d--dnnyngyen</code><br><br><a href="https://q.dog/pets/aggron-3d--dnnyngyen">View all actions →</a></td><td width="180" align="center"><a href="https://q.dog/pets/aggron-3d--dnnyngyen"><img src="https://q.dog/assets/previews/aggron-3d--dnnyngyen/thumbnail.png" alt="Aggron (3D) Preview" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/arlecchino--lingxiaotian"><img src="https://q.dog/assets/previews/arlecchino--lingxiaotian/thumbnail.png" alt="Arlecchino Preview" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/arlecchino--lingxiaotian">Arlecchino</a></strong><br>Author: <a href="https://github.com/legeling">@legeling</a> · Category: Game Characters · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- arlecchino--lingxiaotian</code><br><br><a href="https://q.dog/pets/arlecchino--lingxiaotian">View all actions →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/barboach-3d--dnnyngyen">Barboach (3D)</a></strong><br>Author: <a href="https://github.com/dnnyngyen">@dnnyngyen</a> · Category: Game Characters · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- barboach-3d--dnnyngyen</code><br><br><a href="https://q.dog/pets/barboach-3d--dnnyngyen">View all actions →</a></td><td width="180" align="center"><a href="https://q.dog/pets/barboach-3d--dnnyngyen"><img src="https://q.dog/assets/previews/barboach-3d--dnnyngyen/thumbnail.png" alt="Barboach (3D) Preview" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/black-swan--lingxiaotian"><img src="https://q.dog/assets/previews/black-swan--lingxiaotian/thumbnail.png" alt="Black Swan Preview" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/black-swan--lingxiaotian">Black Swan</a></strong><br>Author: <a href="https://github.com/legeling">@legeling</a> · Category: Game Characters · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- black-swan--lingxiaotian</code><br><br><a href="https://q.dog/pets/black-swan--lingxiaotian">View all actions →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/buba--yurcek">Buba</a></strong><br>Author: @yurcek · Category: Game Characters · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- buba--yurcek</code><br><br><a href="https://q.dog/pets/buba--yurcek">View all actions →</a></td><td width="180" align="center"><a href="https://q.dog/pets/buba--yurcek"><img src="https://q.dog/assets/previews/buba--yurcek/thumbnail.png" alt="Buba Preview" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/castorice--lingxiaotian"><img src="https://q.dog/assets/previews/castorice--lingxiaotian/thumbnail.png" alt="Castorice Preview" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/castorice--lingxiaotian">Castorice</a></strong><br>Author: <a href="https://github.com/legeling">@legeling</a> · Category: Game Characters · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- castorice--lingxiaotian</code><br><br><a href="https://q.dog/pets/castorice--lingxiaotian">View all actions →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/charizard--dnnyngyen">Charizard</a></strong><br>Author: <a href="https://github.com/dnnyngyen">@dnnyngyen</a> · Category: Game Characters · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- charizard--dnnyngyen</code><br><br><a href="https://q.dog/pets/charizard--dnnyngyen">View all actions →</a></td><td width="180" align="center"><a href="https://q.dog/pets/charizard--dnnyngyen"><img src="https://q.dog/assets/previews/charizard--dnnyngyen/thumbnail.png" alt="Charizard Preview" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/chen--chenxin-dlut"><img src="https://q.dog/assets/previews/chen--chenxin-dlut/thumbnail.png" alt="Ch'en Preview" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/chen--chenxin-dlut">Ch'en</a></strong><br>Author: <a href="https://github.com/chenxin-dlut">@chenxin-dlut</a> · Category: Game Characters · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- chen--chenxin-dlut</code><br><br><a href="https://q.dog/pets/chen--chenxin-dlut">View all actions →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/cyrene--lingxiaotian">Cyrene</a></strong><br>Author: <a href="https://github.com/legeling">@legeling</a> · Category: Game Characters · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- cyrene--lingxiaotian</code><br><br><a href="https://q.dog/pets/cyrene--lingxiaotian">View all actions →</a></td><td width="180" align="center"><a href="https://q.dog/pets/cyrene--lingxiaotian"><img src="https://q.dog/assets/previews/cyrene--lingxiaotian/thumbnail.png" alt="Cyrene Preview" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/dimo-stand--god-wu"><img src="https://q.dog/assets/previews/dimo-stand--god-wu/thumbnail.png" alt="Dimo Preview" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/dimo-stand--god-wu">Dimo</a></strong><br>Author: @god-wu · Category: Game Characters · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- dimo-stand--god-wu</code><br><br><a href="https://q.dog/pets/dimo-stand--god-wu">View all actions →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/doro--lingxiaotian">Doro</a></strong><br>Author: <a href="https://github.com/legeling">@legeling</a> · Category: Game Characters · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- doro--lingxiaotian</code><br><br><a href="https://q.dog/pets/doro--lingxiaotian">View all actions →</a></td><td width="180" align="center"><a href="https://q.dog/pets/doro--lingxiaotian"><img src="https://q.dog/assets/previews/doro--lingxiaotian/thumbnail.png" alt="Doro Preview" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/eevee--dnnyngyen"><img src="https://q.dog/assets/previews/eevee--dnnyngyen/thumbnail.png" alt="Eevee Preview" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/eevee--dnnyngyen">Eevee</a></strong><br>Author: <a href="https://github.com/dnnyngyen">@dnnyngyen</a> · Category: Game Characters · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- eevee--dnnyngyen</code><br><br><a href="https://q.dog/pets/eevee--dnnyngyen">View all actions →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/feixiao--lingxiaotian">Feixiao</a></strong><br>Author: <a href="https://github.com/legeling">@legeling</a> · Category: Game Characters · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- feixiao--lingxiaotian</code><br><br><a href="https://q.dog/pets/feixiao--lingxiaotian">View all actions →</a></td><td width="180" align="center"><a href="https://q.dog/pets/feixiao--lingxiaotian"><img src="https://q.dog/assets/previews/feixiao--lingxiaotian/thumbnail.png" alt="Feixiao Preview" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/furina--lingxiaotian"><img src="https://q.dog/assets/previews/furina--lingxiaotian/thumbnail.png" alt="Furina Preview" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/furina--lingxiaotian">Furina</a></strong><br>Author: <a href="https://github.com/legeling">@legeling</a> · Category: Game Characters · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- furina--lingxiaotian</code><br><br><a href="https://q.dog/pets/furina--lingxiaotian">View all actions →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/ganyu--chenxin-dlut">Ganyu</a></strong><br>Author: <a href="https://github.com/chenxin-dlut">@chenxin-dlut</a> · Category: Game Characters · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- ganyu--chenxin-dlut</code><br><br><a href="https://q.dog/pets/ganyu--chenxin-dlut">View all actions →</a></td><td width="180" align="center"><a href="https://q.dog/pets/ganyu--chenxin-dlut"><img src="https://q.dog/assets/previews/ganyu--chenxin-dlut/thumbnail.png" alt="Ganyu Preview" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/hu-tao--lingxiaotian"><img src="https://q.dog/assets/previews/hu-tao--lingxiaotian/thumbnail.png" alt="Hu Tao Preview" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/hu-tao--lingxiaotian">Hu Tao</a></strong><br>Author: <a href="https://github.com/legeling">@legeling</a> · Category: Game Characters · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- hu-tao--lingxiaotian</code><br><br><a href="https://q.dog/pets/hu-tao--lingxiaotian">View all actions →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/hyacine--kurisu">Hyacine</a></strong><br>Author: <a href="https://github.com/kurisu994">@kurisu994</a> · Category: Game Characters · Version: v2<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- hyacine--kurisu</code><br><br><a href="https://q.dog/pets/hyacine--kurisu">View all actions →</a></td><td width="180" align="center"><a href="https://q.dog/pets/hyacine--kurisu"><img src="https://q.dog/assets/previews/hyacine--kurisu/thumbnail.png" alt="Hyacine Preview" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/isaac--foggy-whale"><img src="https://q.dog/assets/previews/isaac--foggy-whale/thumbnail.png" alt="Isaac Preview" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/isaac--foggy-whale">Isaac</a></strong><br>Author: <a href="https://github.com/Foggy-whale">@Foggy-whale</a> · Category: Game Characters · Version: v2<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- isaac--foggy-whale</code><br><br><a href="https://q.dog/pets/isaac--foggy-whale">View all actions →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/kamisato-ayaka--lingxiaotian">Kamisato Ayaka</a></strong><br>Author: <a href="https://github.com/legeling">@legeling</a> · Category: Game Characters · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- kamisato-ayaka--lingxiaotian</code><br><br><a href="https://q.dog/pets/kamisato-ayaka--lingxiaotian">View all actions →</a></td><td width="180" align="center"><a href="https://q.dog/pets/kamisato-ayaka--lingxiaotian"><img src="https://q.dog/assets/previews/kamisato-ayaka--lingxiaotian/thumbnail.png" alt="Kamisato Ayaka Preview" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/klee--chenxin-dlut"><img src="https://q.dog/assets/previews/klee--chenxin-dlut/thumbnail.png" alt="Klee Preview" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/klee--chenxin-dlut">Klee</a></strong><br>Author: <a href="https://github.com/chenxin-dlut">@chenxin-dlut</a> · Category: Game Characters · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- klee--chenxin-dlut</code><br><br><a href="https://q.dog/pets/klee--chenxin-dlut">View all actions →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/kuro-chibi--kuroneko-night">Kuro Chibi</a></strong><br>Author: <a href="https://github.com/KuroNeko-night">@KuroNeko-night</a> · Category: Game Characters · Version: v2<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- kuro-chibi--kuroneko-night</code><br><br><a href="https://q.dog/pets/kuro-chibi--kuroneko-night">View all actions →</a></td><td width="180" align="center"><a href="https://q.dog/pets/kuro-chibi--kuroneko-night"><img src="https://q.dog/assets/previews/kuro-chibi--kuroneko-night/thumbnail.png" alt="Kuro Chibi Preview" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/lappland--chenxin-dlut"><img src="https://q.dog/assets/previews/lappland--chenxin-dlut/thumbnail.png" alt="Lappland Preview" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/lappland--chenxin-dlut">Lappland</a></strong><br>Author: <a href="https://github.com/chenxin-dlut">@chenxin-dlut</a> · Category: Game Characters · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- lappland--chenxin-dlut</code><br><br><a href="https://q.dog/pets/lappland--chenxin-dlut">View all actions →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/little-black-mage--libertis">Little Black Mage</a></strong><br>Author: @libertis · Category: Game Characters · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- little-black-mage--libertis</code><br><br><a href="https://q.dog/pets/little-black-mage--libertis">View all actions →</a></td><td width="180" align="center"><a href="https://q.dog/pets/little-black-mage--libertis"><img src="https://q.dog/assets/previews/little-black-mage--libertis/thumbnail.png" alt="Little Black Mage Preview" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/march-7th--chenxin-dlut"><img src="https://q.dog/assets/previews/march-7th--chenxin-dlut/thumbnail.png" alt="March 7th Preview" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/march-7th--chenxin-dlut">March 7th</a></strong><br>Author: <a href="https://github.com/chenxin-dlut">@chenxin-dlut</a> · Category: Game Characters · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- march-7th--chenxin-dlut</code><br><br><a href="https://q.dog/pets/march-7th--chenxin-dlut">View all actions →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/miyabi--eric-terminal">Miyabi</a></strong><br>Author: <a href="https://codex-pets.net/users/eric-terminal">@eric-terminal</a> · Category: Game Characters · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- miyabi--eric-terminal</code><br><br><a href="https://q.dog/pets/miyabi--eric-terminal">View all actions →</a></td><td width="180" align="center"><a href="https://q.dog/pets/miyabi--eric-terminal"><img src="https://q.dog/assets/previews/miyabi--eric-terminal/thumbnail.png" alt="Miyabi Preview" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/nahida--lingxiaotian"><img src="https://q.dog/assets/previews/nahida--lingxiaotian/thumbnail.png" alt="Nahida Preview" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/nahida--lingxiaotian">Nahida</a></strong><br>Author: <a href="https://github.com/legeling">@legeling</a> · Category: Game Characters · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- nahida--lingxiaotian</code><br><br><a href="https://q.dog/pets/nahida--lingxiaotian">View all actions →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/navia--lingxiaotian">Navia</a></strong><br>Author: <a href="https://github.com/legeling">@legeling</a> · Category: Game Characters · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- navia--lingxiaotian</code><br><br><a href="https://q.dog/pets/navia--lingxiaotian">View all actions →</a></td><td width="180" align="center"><a href="https://q.dog/pets/navia--lingxiaotian"><img src="https://q.dog/assets/previews/navia--lingxiaotian/thumbnail.png" alt="Navia Preview" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/paimon--lingxiaotian"><img src="https://q.dog/assets/previews/paimon--lingxiaotian/thumbnail.png" alt="Paimon Preview" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/paimon--lingxiaotian">Paimon</a></strong><br>Author: <a href="https://github.com/legeling">@legeling</a> · Category: Game Characters · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- paimon--lingxiaotian</code><br><br><a href="https://q.dog/pets/paimon--lingxiaotian">View all actions →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/phoebe--chenxin-dlut">Phoebe</a></strong><br>Author: <a href="https://github.com/chenxin-dlut">@chenxin-dlut</a> · Category: Game Characters · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- phoebe--chenxin-dlut</code><br><br><a href="https://q.dog/pets/phoebe--chenxin-dlut">View all actions →</a></td><td width="180" align="center"><a href="https://q.dog/pets/phoebe--chenxin-dlut"><img src="https://q.dog/assets/previews/phoebe--chenxin-dlut/thumbnail.png" alt="Phoebe Preview" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/pikachu--dnnyngyen"><img src="https://q.dog/assets/previews/pikachu--dnnyngyen/thumbnail.png" alt="Pikachu Preview" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/pikachu--dnnyngyen">Pikachu</a></strong><br>Author: <a href="https://github.com/dnnyngyen">@dnnyngyen</a> · Category: Game Characters · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- pikachu--dnnyngyen</code><br><br><a href="https://q.dog/pets/pikachu--dnnyngyen">View all actions →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/raiden-shogun--lingxiaotian">Raiden Shogun</a></strong><br>Author: <a href="https://github.com/legeling">@legeling</a> · Category: Game Characters · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- raiden-shogun--lingxiaotian</code><br><br><a href="https://q.dog/pets/raiden-shogun--lingxiaotian">View all actions →</a></td><td width="180" align="center"><a href="https://q.dog/pets/raiden-shogun--lingxiaotian"><img src="https://q.dog/assets/previews/raiden-shogun--lingxiaotian/thumbnail.png" alt="Raiden Shogun Preview" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/reimu--lingxiaotian"><img src="https://q.dog/assets/previews/reimu--lingxiaotian/thumbnail.png" alt="Reimu Preview" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/reimu--lingxiaotian">Reimu</a></strong><br>Author: <a href="https://github.com/legeling">@legeling</a> · Category: Game Characters · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- reimu--lingxiaotian</code><br><br><a href="https://q.dog/pets/reimu--lingxiaotian">View all actions →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/remielle-dan--erlla">Remielle-Dan / Leimi</a></strong><br>Author: <a href="https://github.com/Erlla">@Erlla</a> · Category: Game Characters · Version: v2<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- remielle-dan--erlla</code><br><br><a href="https://q.dog/pets/remielle-dan--erlla">View all actions →</a></td><td width="180" align="center"><a href="https://q.dog/pets/remielle-dan--erlla"><img src="https://q.dog/assets/previews/remielle-dan--erlla/thumbnail.png" alt="Remielle-Dan / Leimi Preview" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/robin--lingxiaotian"><img src="https://q.dog/assets/previews/robin--lingxiaotian/thumbnail.png" alt="Robin Preview" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/robin--lingxiaotian">Robin</a></strong><br>Author: <a href="https://github.com/legeling">@legeling</a> · Category: Game Characters · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- robin--lingxiaotian</code><br><br><a href="https://q.dog/pets/robin--lingxiaotian">View all actions →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/ruan-mei--lingxiaotian">Ruan Mei</a></strong><br>Author: <a href="https://github.com/legeling">@legeling</a> · Category: Game Characters · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- ruan-mei--lingxiaotian</code><br><br><a href="https://q.dog/pets/ruan-mei--lingxiaotian">View all actions →</a></td><td width="180" align="center"><a href="https://q.dog/pets/ruan-mei--lingxiaotian"><img src="https://q.dog/assets/previews/ruan-mei--lingxiaotian/thumbnail.png" alt="Ruan Mei Preview" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/silver-wolf--lingxiaotian"><img src="https://q.dog/assets/previews/silver-wolf--lingxiaotian/thumbnail.png" alt="Silver Wolf Preview" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/silver-wolf--lingxiaotian">Silver Wolf</a></strong><br>Author: <a href="https://github.com/legeling">@legeling</a> · Category: Game Characters · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- silver-wolf--lingxiaotian</code><br><br><a href="https://q.dog/pets/silver-wolf--lingxiaotian">View all actions →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/sonetto--chenxin-dlut">Sonetto</a></strong><br>Author: <a href="https://github.com/chenxin-dlut">@chenxin-dlut</a> · Category: Game Characters · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- sonetto--chenxin-dlut</code><br><br><a href="https://q.dog/pets/sonetto--chenxin-dlut">View all actions →</a></td><td width="180" align="center"><a href="https://q.dog/pets/sonetto--chenxin-dlut"><img src="https://q.dog/assets/previews/sonetto--chenxin-dlut/thumbnail.png" alt="Sonetto Preview" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/sparkle--lingxiaotian"><img src="https://q.dog/assets/previews/sparkle--lingxiaotian/thumbnail.png" alt="Sparkle Preview" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/sparkle--lingxiaotian">Sparkle</a></strong><br>Author: <a href="https://github.com/legeling">@legeling</a> · Category: Game Characters · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- sparkle--lingxiaotian</code><br><br><a href="https://q.dog/pets/sparkle--lingxiaotian">View all actions →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/susuta--xiangzi529">Susuta</a></strong><br>Author: <a href="https://github.com/Xiangzi529">@Xiangzi529</a> · Category: Game Characters · Version: v2<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- susuta--xiangzi529</code><br><br><a href="https://q.dog/pets/susuta--xiangzi529">View all actions →</a></td><td width="180" align="center"><a href="https://q.dog/pets/susuta--xiangzi529"><img src="https://q.dog/assets/previews/susuta--xiangzi529/thumbnail.png" alt="Susuta Preview" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/tingyun--lingxiaotian"><img src="https://q.dog/assets/previews/tingyun--lingxiaotian/thumbnail.png" alt="Tingyun Preview" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/tingyun--lingxiaotian">Tingyun</a></strong><br>Author: <a href="https://github.com/legeling">@legeling</a> · Category: Game Characters · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- tingyun--lingxiaotian</code><br><br><a href="https://q.dog/pets/tingyun--lingxiaotian">View all actions →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/vertin--chenxin-dlut">Vertin</a></strong><br>Author: <a href="https://github.com/chenxin-dlut">@chenxin-dlut</a> · Category: Game Characters · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- vertin--chenxin-dlut</code><br><br><a href="https://q.dog/pets/vertin--chenxin-dlut">View all actions →</a></td><td width="180" align="center"><a href="https://q.dog/pets/vertin--chenxin-dlut"><img src="https://q.dog/assets/previews/vertin--chenxin-dlut/thumbnail.png" alt="Vertin Preview" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/yoimiya--chenxin-dlut"><img src="https://q.dog/assets/previews/yoimiya--chenxin-dlut/thumbnail.png" alt="Yoimiya Preview" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/yoimiya--chenxin-dlut">Yoimiya</a></strong><br>Author: <a href="https://github.com/chenxin-dlut">@chenxin-dlut</a> · Category: Game Characters · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- yoimiya--chenxin-dlut</code><br><br><a href="https://q.dog/pets/yoimiya--chenxin-dlut">View all actions →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/zani--chenxin-dlut">Zani</a></strong><br>Author: <a href="https://github.com/chenxin-dlut">@chenxin-dlut</a> · Category: Game Characters · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- zani--chenxin-dlut</code><br><br><a href="https://q.dog/pets/zani--chenxin-dlut">View all actions →</a></td><td width="180" align="center"><a href="https://q.dog/pets/zani--chenxin-dlut"><img src="https://q.dog/assets/previews/zani--chenxin-dlut/thumbnail.png" alt="Zani Preview" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/yae-miko--legeling"><img src="https://q.dog/assets/previews/yae-miko--legeling/thumbnail.png" alt="Yae Miko Preview" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/yae-miko--legeling">Yae Miko</a></strong><br>Author: <a href="https://github.com/legeling">@legeling</a> · Category: Game Characters · Version: v2<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- yae-miko--legeling</code><br><br><a href="https://q.dog/pets/yae-miko--legeling">View all actions →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/dnf-female-ammo--qunboo">女弹药Q</a></strong><br>Author: <a href="https://github.com/QunBoo">@QunBoo</a> · Category: Game Characters · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- dnf-female-ammo--qunboo</code><br><br><a href="https://q.dog/pets/dnf-female-ammo--qunboo">View all actions →</a></td><td width="180" align="center"><a href="https://q.dog/pets/dnf-female-ammo--qunboo"><img src="https://q.dog/assets/previews/dnf-female-ammo--qunboo/thumbnail.png" alt="女弹药Q Preview" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/new-covenant-exusiai--chenxin-dlut"><img src="https://q.dog/assets/previews/new-covenant-exusiai--chenxin-dlut/thumbnail.png" alt="Exusiai the New Covenant Preview" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/new-covenant-exusiai--chenxin-dlut">Exusiai the New Covenant</a></strong><br>Author: <a href="https://github.com/chenxin-dlut">@chenxin-dlut</a> · Category: Game Characters · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- new-covenant-exusiai--chenxin-dlut</code><br><br><a href="https://q.dog/pets/new-covenant-exusiai--chenxin-dlut">View all actions →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/regulus-star-antimony--chenxin-dlut">Regulus</a></strong><br>Author: <a href="https://github.com/chenxin-dlut">@chenxin-dlut</a> · Category: Game Characters · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- regulus-star-antimony--chenxin-dlut</code><br><br><a href="https://q.dog/pets/regulus-star-antimony--chenxin-dlut">View all actions →</a></td><td width="180" align="center"><a href="https://q.dog/pets/regulus-star-antimony--chenxin-dlut"><img src="https://q.dog/assets/previews/regulus-star-antimony--chenxin-dlut/thumbnail.png" alt="Regulus Preview" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/youmu--ai-generated"><img src="https://q.dog/assets/previews/youmu--ai-generated/thumbnail.png" alt="魂魄妖梦 Preview" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/youmu--ai-generated">魂魄妖梦</a></strong><br>Author: @ai-generated · Category: Game Characters · Version: v2<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- youmu--ai-generated</code><br><br><a href="https://q.dog/pets/youmu--ai-generated">View all actions →</a></td></tr>
</table>

### Anime Characters

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/zero-two--mingqingmozhao">Zero Two</a></strong><br>Author: @mingqingmozhao · Category: Anime Characters · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- zero-two--mingqingmozhao</code><br><br><a href="https://q.dog/pets/zero-two--mingqingmozhao">View all actions →</a></td><td width="180" align="center"><a href="https://q.dog/pets/zero-two--mingqingmozhao"><img src="https://q.dog/assets/previews/zero-two--mingqingmozhao/thumbnail.png" alt="Zero Two Preview" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/anya--chenxin-dlut"><img src="https://q.dog/assets/previews/anya--chenxin-dlut/thumbnail.png" alt="Anya Preview" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/anya--chenxin-dlut">Anya</a></strong><br>Author: <a href="https://github.com/chenxin-dlut">@chenxin-dlut</a> · Category: Anime Characters · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- anya--chenxin-dlut</code><br><br><a href="https://q.dog/pets/anya--chenxin-dlut">View all actions →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/asuka--maxg24">Asuka</a></strong><br>Author: <a href="https://codex-pets.net/users/maxg24">@maxg24</a> · Category: Anime Characters · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- asuka--maxg24</code><br><br><a href="https://q.dog/pets/asuka--maxg24">View all actions →</a></td><td width="180" align="center"><a href="https://q.dog/pets/asuka--maxg24"><img src="https://q.dog/assets/previews/asuka--maxg24/thumbnail.png" alt="Asuka Preview" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/chibi-rei-pet--bendy"><img src="https://q.dog/assets/previews/chibi-rei-pet--bendy/thumbnail.png" alt="Rei Ayanami Preview" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/chibi-rei-pet--bendy">Rei Ayanami</a></strong><br>Author: @Bendy · Category: Anime Characters · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- chibi-rei-pet--bendy</code><br><br><a href="https://q.dog/pets/chibi-rei-pet--bendy">View all actions →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/chotu--makriman">Chotu</a></strong><br>Author: <a href="https://github.com/makriman">@makriman</a> · Category: Anime Characters · Version: v2<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- chotu--makriman</code><br><br><a href="https://q.dog/pets/chotu--makriman">View all actions →</a></td><td width="180" align="center"><a href="https://q.dog/pets/chotu--makriman"><img src="https://q.dog/assets/previews/chotu--makriman/thumbnail.png" alt="Chotu Preview" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/conan--chenxin-dlut"><img src="https://q.dog/assets/previews/conan--chenxin-dlut/thumbnail.png" alt="Conan Edogawa Preview" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/conan--chenxin-dlut">Conan Edogawa</a></strong><br>Author: <a href="https://github.com/chenxin-dlut">@chenxin-dlut</a> · Category: Anime Characters · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- conan--chenxin-dlut</code><br><br><a href="https://q.dog/pets/conan--chenxin-dlut">View all actions →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/doraemon--xueshi">Doraemon</a></strong><br>Author: <a href="https://codex-pets.net/users/xueshi">@xueshi</a> · Category: Anime Characters · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- doraemon--xueshi</code><br><br><a href="https://q.dog/pets/doraemon--xueshi">View all actions →</a></td><td width="180" align="center"><a href="https://q.dog/pets/doraemon--xueshi"><img src="https://q.dog/assets/previews/doraemon--xueshi/thumbnail.png" alt="Doraemon Preview" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/elaina--nyakku-shigure"><img src="https://q.dog/assets/previews/elaina--nyakku-shigure/thumbnail.png" alt="Elaina Preview" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/elaina--nyakku-shigure">Elaina</a></strong><br>Author: <a href="https://codex-pets.net/users/nyakku-shigure">@nyakku-shigure</a> · Category: Anime Characters · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- elaina--nyakku-shigure</code><br><br><a href="https://q.dog/pets/elaina--nyakku-shigure">View all actions →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/eren--ash-sw">Eren</a></strong><br>Author: <a href="https://codex-pets.net/users/ash-sw">@ash-sw</a> · Category: Anime Characters · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- eren--ash-sw</code><br><br><a href="https://q.dog/pets/eren--ash-sw">View all actions →</a></td><td width="180" align="center"><a href="https://q.dog/pets/eren--ash-sw"><img src="https://q.dog/assets/previews/eren--ash-sw/thumbnail.png" alt="Eren Preview" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/frieren--lingxiaotian"><img src="https://q.dog/assets/previews/frieren--lingxiaotian/thumbnail.png" alt="Frieren Preview" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/frieren--lingxiaotian">Frieren</a></strong><br>Author: <a href="https://github.com/legeling">@legeling</a> · Category: Anime Characters · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- frieren--lingxiaotian</code><br><br><a href="https://q.dog/pets/frieren--lingxiaotian">View all actions →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/gojo--lilokhalikfa">Gojo</a></strong><br>Author: <a href="https://codex-pets.net/users/lilokhalikfa">@lilokhalikfa</a> · Category: Anime Characters · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- gojo--lilokhalikfa</code><br><br><a href="https://q.dog/pets/gojo--lilokhalikfa">View all actions →</a></td><td width="180" align="center"><a href="https://q.dog/pets/gojo--lilokhalikfa"><img src="https://q.dog/assets/previews/gojo--lilokhalikfa/thumbnail.png" alt="Gojo Preview" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/ikaros--icarus-alpha"><img src="https://q.dog/assets/previews/ikaros--icarus-alpha/thumbnail.png" alt="Ikaros Preview" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/ikaros--icarus-alpha">Ikaros</a></strong><br>Author: <a href="https://codex-pets.net/users/icarus-alpha">@icarus-alpha</a> · Category: Anime Characters · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- ikaros--icarus-alpha</code><br><br><a href="https://q.dog/pets/ikaros--icarus-alpha">View all actions →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/isekaijoucho--siiverash">Isekaijoucho</a></strong><br>Author: <a href="https://github.com/SiIverAsh">@SiIverAsh</a> · Category: Anime Characters · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- isekaijoucho--siiverash</code><br><br><a href="https://q.dog/pets/isekaijoucho--siiverash">View all actions →</a></td><td width="180" align="center"><a href="https://q.dog/pets/isekaijoucho--siiverash"><img src="https://q.dog/assets/previews/isekaijoucho--siiverash/thumbnail.png" alt="Isekaijoucho Preview" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/jolyne-cujoh--d2682787206-sys"><img src="https://q.dog/assets/previews/jolyne-cujoh--d2682787206-sys/thumbnail.png" alt="Jolyne Cujoh Preview" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/jolyne-cujoh--d2682787206-sys">Jolyne Cujoh</a></strong><br>Author: <a href="https://github.com/d2682787206-sys">@d2682787206-sys</a> · Category: Anime Characters · Version: v2<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- jolyne-cujoh--d2682787206-sys</code><br><br><a href="https://q.dog/pets/jolyne-cujoh--d2682787206-sys">View all actions →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/kaiju-no-8--terry878">Kaiju No. 8</a></strong><br>Author: @TERRY878 · Category: Anime Characters · Version: v2<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- kaiju-no-8--terry878</code><br><br><a href="https://q.dog/pets/kaiju-no-8--terry878">View all actions →</a></td><td width="180" align="center"><a href="https://q.dog/pets/kaiju-no-8--terry878"><img src="https://q.dog/assets/previews/kaiju-no-8--terry878/thumbnail.png" alt="Kaiju No. 8 Preview" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/kid--chenxin-dlut"><img src="https://q.dog/assets/previews/kid--chenxin-dlut/thumbnail.png" alt="Kaito Kid Preview" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/kid--chenxin-dlut">Kaito Kid</a></strong><br>Author: <a href="https://github.com/chenxin-dlut">@chenxin-dlut</a> · Category: Anime Characters · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- kid--chenxin-dlut</code><br><br><a href="https://q.dog/pets/kid--chenxin-dlut">View all actions →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/kid-goku--julianhuang">Kid Goku</a></strong><br>Author: <a href="https://codex-pets.net/users/julianhuang">@julianhuang</a> · Category: Anime Characters · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- kid-goku--julianhuang</code><br><br><a href="https://q.dog/pets/kid-goku--julianhuang">View all actions →</a></td><td width="180" align="center"><a href="https://q.dog/pets/kid-goku--julianhuang"><img src="https://q.dog/assets/previews/kid-goku--julianhuang/thumbnail.png" alt="Kid Goku Preview" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/levi--emrecb"><img src="https://q.dog/assets/previews/levi--emrecb/thumbnail.png" alt="Levi Preview" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/levi--emrecb">Levi</a></strong><br>Author: <a href="https://codex-pets.net/users/emrecb">@emrecb</a> · Category: Anime Characters · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- levi--emrecb</code><br><br><a href="https://q.dog/pets/levi--emrecb">View all actions →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/luffy-gear-5--jordsshmords1">Luffy Gear 5</a></strong><br>Author: <a href="https://codex-pets.net/users/jordsshmords1">@jordsshmords1</a> · Category: Anime Characters · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- luffy-gear-5--jordsshmords1</code><br><br><a href="https://q.dog/pets/luffy-gear-5--jordsshmords1">View all actions →</a></td><td width="180" align="center"><a href="https://q.dog/pets/luffy-gear-5--jordsshmords1"><img src="https://q.dog/assets/previews/luffy-gear-5--jordsshmords1/thumbnail.png" alt="Luffy Gear 5 Preview" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/mahiro--lingxiaotian"><img src="https://q.dog/assets/previews/mahiro--lingxiaotian/thumbnail.png" alt="Mahiro Preview" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/mahiro--lingxiaotian">Mahiro</a></strong><br>Author: <a href="https://github.com/legeling">@legeling</a> · Category: Anime Characters · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- mahiro--lingxiaotian</code><br><br><a href="https://q.dog/pets/mahiro--lingxiaotian">View all actions →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/makima-coat--yuyuabc1">Makima (Coat)</a></strong><br>Author: <a href="https://github.com/yuyuabc1">@yuyuabc1</a> · Category: Anime Characters · Version: v2<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- makima-coat--yuyuabc1</code><br><br><a href="https://q.dog/pets/makima-coat--yuyuabc1">View all actions →</a></td><td width="180" align="center"><a href="https://q.dog/pets/makima-coat--yuyuabc1"><img src="https://q.dog/assets/previews/makima-coat--yuyuabc1/thumbnail.png" alt="Makima (Coat) Preview" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/makimamini--1sh1ro"><img src="https://q.dog/assets/previews/makimamini--1sh1ro/thumbnail.png" alt="Makima Preview" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/makimamini--1sh1ro">Makima</a></strong><br>Author: @1sh1ro · Category: Anime Characters · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- makimamini--1sh1ro</code><br><br><a href="https://q.dog/pets/makimamini--1sh1ro">View all actions →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/makisekurisu--m1gr4ine">Makise Kurisu</a></strong><br>Author: @m1gr4ine · Category: Anime Characters · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- makisekurisu--m1gr4ine</code><br><br><a href="https://q.dog/pets/makisekurisu--m1gr4ine">View all actions →</a></td><td width="180" align="center"><a href="https://q.dog/pets/makisekurisu--m1gr4ine"><img src="https://q.dog/assets/previews/makisekurisu--m1gr4ine/thumbnail.png" alt="Makise Kurisu Preview" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/mihari--hyoni1129"><img src="https://q.dog/assets/previews/mihari--hyoni1129/thumbnail.png" alt="Mihari Preview" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/mihari--hyoni1129">Mihari</a></strong><br>Author: <a href="https://github.com/Hyoni1129">@Hyoni1129</a> · Category: Anime Characters · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- mihari--hyoni1129</code><br><br><a href="https://q.dog/pets/mihari--hyoni1129">View all actions →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/mikoto--lingxiaotian">Mikoto</a></strong><br>Author: <a href="https://github.com/legeling">@legeling</a> · Category: Anime Characters · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- mikoto--lingxiaotian</code><br><br><a href="https://q.dog/pets/mikoto--lingxiaotian">View all actions →</a></td><td width="180" align="center"><a href="https://q.dog/pets/mikoto--lingxiaotian"><img src="https://q.dog/assets/previews/mikoto--lingxiaotian/thumbnail.png" alt="Mikoto Preview" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/miku--lingxiaotian"><img src="https://q.dog/assets/previews/miku--lingxiaotian/thumbnail.png" alt="Miku Preview" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/miku--lingxiaotian">Miku</a></strong><br>Author: <a href="https://github.com/legeling">@legeling</a> · Category: Anime Characters · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- miku--lingxiaotian</code><br><br><a href="https://q.dog/pets/miku--lingxiaotian">View all actions →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/misaka-network--ldl1234">Misaka Network</a></strong><br>Author: <a href="https://github.com/ldl1234">@ldl1234</a> · Category: Anime Characters · Version: v2<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- misaka-network--ldl1234</code><br><br><a href="https://q.dog/pets/misaka-network--ldl1234">View all actions →</a></td><td width="180" align="center"><a href="https://q.dog/pets/misaka-network--ldl1234"><img src="https://q.dog/assets/previews/misaka-network--ldl1234/thumbnail.png" alt="Misaka Network Preview" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/nimbus--soraberu"><img src="https://q.dog/assets/previews/nimbus--soraberu/thumbnail.png" alt="Nimbus Preview" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/nimbus--soraberu">Nimbus</a></strong><br>Author: <a href="https://codex-pets.net/users/soraberu">@soraberu</a> · Category: Anime Characters · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- nimbus--soraberu</code><br><br><a href="https://q.dog/pets/nimbus--soraberu">View all actions →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/rem--l1">Rem</a></strong><br>Author: <a href="https://codex-pets.net/users/l1">@l1</a> · Category: Anime Characters · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- rem--l1</code><br><br><a href="https://q.dog/pets/rem--l1">View all actions →</a></td><td width="180" align="center"><a href="https://q.dog/pets/rem--l1"><img src="https://q.dog/assets/previews/rem--l1/thumbnail.png" alt="Rem Preview" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/rinami--siiverash"><img src="https://q.dog/assets/previews/rinami--siiverash/thumbnail.png" alt="Rinami Himesaki Preview" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/rinami--siiverash">Rinami Himesaki</a></strong><br>Author: <a href="https://github.com/SiIverAsh">@SiIverAsh</a> · Category: Anime Characters · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- rinami--siiverash</code><br><br><a href="https://q.dog/pets/rinami--siiverash">View all actions →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/roxy-pixel--gravity">Roxy Pixel</a></strong><br>Author: @gravity · Category: Anime Characters · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- roxy-pixel--gravity</code><br><br><a href="https://q.dog/pets/roxy-pixel--gravity">View all actions →</a></td><td width="180" align="center"><a href="https://q.dog/pets/roxy-pixel--gravity"><img src="https://q.dog/assets/previews/roxy-pixel--gravity/thumbnail.png" alt="Roxy Pixel Preview" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/saber--petdex-zhenyou-ling"><img src="https://q.dog/assets/previews/saber--petdex-zhenyou-ling/thumbnail.png" alt="Saber Preview" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/saber--petdex-zhenyou-ling">Saber</a></strong><br>Author: @真宵 绫. · Category: Anime Characters · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- saber--petdex-zhenyou-ling</code><br><br><a href="https://q.dog/pets/saber--petdex-zhenyou-ling">View all actions →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/gintoki-pixel--yuu-m">Sakata Gintoki</a></strong><br>Author: @Yuu M. · Category: Anime Characters · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- gintoki-pixel--yuu-m</code><br><br><a href="https://q.dog/pets/gintoki-pixel--yuu-m">View all actions →</a></td><td width="180" align="center"><a href="https://q.dog/pets/gintoki-pixel--yuu-m"><img src="https://q.dog/assets/previews/gintoki-pixel--yuu-m/thumbnail.png" alt="Sakata Gintoki Preview" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/shinchan--chenxin-dlut"><img src="https://q.dog/assets/previews/shinchan--chenxin-dlut/thumbnail.png" alt="Shin-chan Preview" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/shinchan--chenxin-dlut">Shin-chan</a></strong><br>Author: <a href="https://github.com/chenxin-dlut">@chenxin-dlut</a> · Category: Anime Characters · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- shinchan--chenxin-dlut</code><br><br><a href="https://q.dog/pets/shinchan--chenxin-dlut">View all actions →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/takamatsu-tomori--a1wace-dev">Takamatsu Tomori</a></strong><br>Author: @A1wace-dev · Category: Anime Characters · Version: v2<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- takamatsu-tomori--a1wace-dev</code><br><br><a href="https://q.dog/pets/takamatsu-tomori--a1wace-dev">View all actions →</a></td><td width="180" align="center"><a href="https://q.dog/pets/takamatsu-tomori--a1wace-dev"><img src="https://q.dog/assets/previews/takamatsu-tomori--a1wace-dev/thumbnail.png" alt="Takamatsu Tomori Preview" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/violet--lazenca"><img src="https://q.dog/assets/previews/violet--lazenca/thumbnail.png" alt="Violet Preview" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/violet--lazenca">Violet</a></strong><br>Author: <a href="https://codex-pets.net/users/lazenca">@lazenca</a> · Category: Anime Characters · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- violet--lazenca</code><br><br><a href="https://q.dog/pets/violet--lazenca">View all actions →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/wakaba-mutsumi--carambola">Wakaba Mutsumi</a></strong><br>Author: @Carambola · Category: Anime Characters · Version: v2<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- wakaba-mutsumi--carambola</code><br><br><a href="https://q.dog/pets/wakaba-mutsumi--carambola">View all actions →</a></td><td width="180" align="center"><a href="https://q.dog/pets/wakaba-mutsumi--carambola"><img src="https://q.dog/assets/previews/wakaba-mutsumi--carambola/thumbnail.png" alt="Wakaba Mutsumi Preview" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/inosuke-hashibira--wangfan002"><img src="https://q.dog/assets/previews/inosuke-hashibira--wangfan002/thumbnail.png" alt="Inosuke Hashibira Preview" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/inosuke-hashibira--wangfan002">Inosuke Hashibira</a></strong><br>Author: @wangfan002 · Category: Anime Characters · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- inosuke-hashibira--wangfan002</code><br><br><a href="https://q.dog/pets/inosuke-hashibira--wangfan002">View all actions →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/nangong-wan--bpup">Nangong Wan</a></strong><br>Author: <a href="https://github.com/bpup">@bpup</a> · Category: Anime Characters · Version: v2<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- nangong-wan--bpup</code><br><br><a href="https://q.dog/pets/nangong-wan--bpup">View all actions →</a></td><td width="180" align="center"><a href="https://q.dog/pets/nangong-wan--bpup"><img src="https://q.dog/assets/previews/nangong-wan--bpup/thumbnail.png" alt="Nangong Wan Preview" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/zenitsu-agatsuma--wangfan002"><img src="https://q.dog/assets/previews/zenitsu-agatsuma--wangfan002/thumbnail.png" alt="Zenitsu Agatsuma Preview" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/zenitsu-agatsuma--wangfan002">Zenitsu Agatsuma</a></strong><br>Author: @wangfan002 · Category: Anime Characters · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- zenitsu-agatsuma--wangfan002</code><br><br><a href="https://q.dog/pets/zenitsu-agatsuma--wangfan002">View all actions →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/giyu-tomioka--wangfan002">Giyu Tomioka</a></strong><br>Author: @wangfan002 · Category: Anime Characters · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- giyu-tomioka--wangfan002</code><br><br><a href="https://q.dog/pets/giyu-tomioka--wangfan002">View all actions →</a></td><td width="180" align="center"><a href="https://q.dog/pets/giyu-tomioka--wangfan002"><img src="https://q.dog/assets/previews/giyu-tomioka--wangfan002/thumbnail.png" alt="Giyu Tomioka Preview" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/muichiro-tokito--wangfan002"><img src="https://q.dog/assets/previews/muichiro-tokito--wangfan002/thumbnail.png" alt="Muichiro Tokito Preview" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/muichiro-tokito--wangfan002">Muichiro Tokito</a></strong><br>Author: @wangfan002 · Category: Anime Characters · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- muichiro-tokito--wangfan002</code><br><br><a href="https://q.dog/pets/muichiro-tokito--wangfan002">View all actions →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/tanjiro-kamado--wangfan002">Tanjiro Kamado</a></strong><br>Author: @wangfan002 · Category: Anime Characters · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- tanjiro-kamado--wangfan002</code><br><br><a href="https://q.dog/pets/tanjiro-kamado--wangfan002">View all actions →</a></td><td width="180" align="center"><a href="https://q.dog/pets/tanjiro-kamado--wangfan002"><img src="https://q.dog/assets/previews/tanjiro-kamado--wangfan002/thumbnail.png" alt="Tanjiro Kamado Preview" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/nezuko-kamado--wangfan002"><img src="https://q.dog/assets/previews/nezuko-kamado--wangfan002/thumbnail.png" alt="Nezuko Kamado Preview" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/nezuko-kamado--wangfan002">Nezuko Kamado</a></strong><br>Author: @wangfan002 · Category: Anime Characters · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- nezuko-kamado--wangfan002</code><br><br><a href="https://q.dog/pets/nezuko-kamado--wangfan002">View all actions →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/shinobu-kocho--wangfan002">Shinobu Kocho</a></strong><br>Author: @wangfan002 · Category: Anime Characters · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- shinobu-kocho--wangfan002</code><br><br><a href="https://q.dog/pets/shinobu-kocho--wangfan002">View all actions →</a></td><td width="180" align="center"><a href="https://q.dog/pets/shinobu-kocho--wangfan002"><img src="https://q.dog/assets/previews/shinobu-kocho--wangfan002/thumbnail.png" alt="Shinobu Kocho Preview" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/bocchi--lingxiaotian"><img src="https://q.dog/assets/previews/bocchi--lingxiaotian/thumbnail.png" alt="Bocchi Preview" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/bocchi--lingxiaotian">Bocchi</a></strong><br>Author: <a href="https://github.com/legeling">@legeling</a> · Category: Anime Characters · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- bocchi--lingxiaotian</code><br><br><a href="https://q.dog/pets/bocchi--lingxiaotian">View all actions →</a></td></tr>
</table>

### Original Characters

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/aiko--chenxin-dlut">Aiko</a></strong><br>Author: <a href="https://github.com/chenxin-dlut">@chenxin-dlut</a> · Category: Original Characters · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- aiko--chenxin-dlut</code><br><br><a href="https://q.dog/pets/aiko--chenxin-dlut">View all actions →</a></td><td width="180" align="center"><a href="https://q.dog/pets/aiko--chenxin-dlut"><img src="https://q.dog/assets/previews/aiko--chenxin-dlut/thumbnail.png" alt="Aiko Preview" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/diana--am"><img src="https://q.dog/assets/previews/diana--am/thumbnail.png" alt="Diana Preview" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/diana--am">Diana</a></strong><br>Author: @am · Category: Original Characters · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- diana--am</code><br><br><a href="https://q.dog/pets/diana--am">View all actions →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/hajimi--zeyuwang1999">Hajimi</a></strong><br>Author: <a href="https://github.com/zeyuwang1999">@zeyuwang1999</a> · Category: Original Characters · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- hajimi--zeyuwang1999</code><br><br><a href="https://q.dog/pets/hajimi--zeyuwang1999">View all actions →</a></td><td width="180" align="center"><a href="https://q.dog/pets/hajimi--zeyuwang1999"><img src="https://q.dog/assets/previews/hajimi--zeyuwang1999/thumbnail.png" alt="Hajimi Preview" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/hamo--haipengzzz"><img src="https://q.dog/assets/previews/hamo--haipengzzz/thumbnail.png" alt="Hamo Preview" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/hamo--haipengzzz">Hamo</a></strong><br>Author: <a href="https://github.com/haipengzzz">@haipengzzz</a> · Category: Original Characters · Version: v2<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- hamo--haipengzzz</code><br><br><a href="https://q.dog/pets/hamo--haipengzzz">View all actions →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/hana2--initiatione">Hana2</a></strong><br>Author: <a href="https://github.com/initiatione">@initiatione</a> · Category: Original Characters · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- hana2--initiatione</code><br><br><a href="https://q.dog/pets/hana2--initiatione">View all actions →</a></td><td width="180" align="center"><a href="https://q.dog/pets/hana2--initiatione"><img src="https://q.dog/assets/previews/hana2--initiatione/thumbnail.png" alt="Hana2 Preview" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/iris--yau-427"><img src="https://q.dog/assets/previews/iris--yau-427/thumbnail.png" alt="Iris Preview" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/iris--yau-427">Iris</a></strong><br>Author: <a href="https://github.com/Yau-427">@Yau-427</a> · Category: Original Characters · Version: v2<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- iris--yau-427</code><br><br><a href="https://q.dog/pets/iris--yau-427">View all actions →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/jesse-the-fox--itjesse">JesseTheFox</a></strong><br>Author: <a href="https://github.com/ITJesse">@ITJesse</a> · Category: Original Characters · Version: v2<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- jesse-the-fox--itjesse</code><br><br><a href="https://q.dog/pets/jesse-the-fox--itjesse">View all actions →</a></td><td width="180" align="center"><a href="https://q.dog/pets/jesse-the-fox--itjesse"><img src="https://q.dog/assets/previews/jesse-the-fox--itjesse/thumbnail.png" alt="JesseTheFox Preview" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/joker--oytyo"><img src="https://q.dog/assets/previews/joker--oytyo/thumbnail.png" alt="Joker Preview" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/joker--oytyo">Joker</a></strong><br>Author: @oytyo · Category: Original Characters · Version: v2<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- joker--oytyo</code><br><br><a href="https://q.dog/pets/joker--oytyo">View all actions →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/linnea--nyakku-shigure">Linnea</a></strong><br>Author: @nyakku-shigure · Category: Original Characters · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- linnea--nyakku-shigure</code><br><br><a href="https://q.dog/pets/linnea--nyakku-shigure">View all actions →</a></td><td width="180" align="center"><a href="https://q.dog/pets/linnea--nyakku-shigure"><img src="https://q.dog/assets/previews/linnea--nyakku-shigure/thumbnail.png" alt="Linnea Preview" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/mika--rotl24"><img src="https://q.dog/assets/previews/mika--rotl24/thumbnail.png" alt="Mika Preview" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/mika--rotl24">Mika</a></strong><br>Author: <a href="https://github.com/ROTl24">@ROTl24</a> · Category: Original Characters · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- mika--rotl24</code><br><br><a href="https://q.dog/pets/mika--rotl24">View all actions →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/minty--somnusochi">Minty</a></strong><br>Author: <a href="https://github.com/Somnusochi">@Somnusochi</a> · Category: Original Characters · Version: v2<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- minty--somnusochi</code><br><br><a href="https://q.dog/pets/minty--somnusochi">View all actions →</a></td><td width="180" align="center"><a href="https://q.dog/pets/minty--somnusochi"><img src="https://q.dog/assets/previews/minty--somnusochi/thumbnail.png" alt="Minty Preview" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/ruruka--ltmcliao-cmyk"><img src="https://q.dog/assets/previews/ruruka--ltmcliao-cmyk/thumbnail.png" alt="RuRuKa Preview" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/ruruka--ltmcliao-cmyk">RuRuKa</a></strong><br>Author: <a href="https://github.com/ltmcliao-cmyk">@ltmcliao-cmyk</a> · Category: Original Characters · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- ruruka--ltmcliao-cmyk</code><br><br><a href="https://q.dog/pets/ruruka--ltmcliao-cmyk">View all actions →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/shian-helper--mistyshen">Shian</a></strong><br>Author: <a href="https://github.com/mistyShen">@mistyShen</a> · Category: Original Characters · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- shian-helper--mistyshen</code><br><br><a href="https://q.dog/pets/shian-helper--mistyshen">View all actions →</a></td><td width="180" align="center"><a href="https://q.dog/pets/shian-helper--mistyshen"><img src="https://q.dog/assets/previews/shian-helper--mistyshen/thumbnail.png" alt="Shian Preview" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/yier--gbn666"><img src="https://q.dog/assets/previews/yier--gbn666/thumbnail.png" alt="Yi Er Preview" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/yier--gbn666">Yi Er</a></strong><br>Author: <a href="https://github.com/gbn666">@gbn666</a> · Category: Original Characters · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- yier--gbn666</code><br><br><a href="https://q.dog/pets/yier--gbn666">View all actions →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/yume-boundary--andy-meow">Yume</a></strong><br>Author: @andy-meow · Category: Original Characters · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- yume-boundary--andy-meow</code><br><br><a href="https://q.dog/pets/yume-boundary--andy-meow">View all actions →</a></td><td width="180" align="center"><a href="https://q.dog/pets/yume-boundary--andy-meow"><img src="https://q.dog/assets/previews/yume-boundary--andy-meow/thumbnail.png" alt="Yume Preview" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/yuzubou--keseras34938976"><img src="https://q.dog/assets/previews/yuzubou--keseras34938976/thumbnail.png" alt="Yuzubou Preview" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/yuzubou--keseras34938976">Yuzubou</a></strong><br>Author: <a href="https://github.com/Keseras34938976">@Keseras34938976</a> · Category: Original Characters · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- yuzubou--keseras34938976</code><br><br><a href="https://q.dog/pets/yuzubou--keseras34938976">View all actions →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/gudong--rank">咕咚</a></strong><br>Author: @Rank · Category: Original Characters · Version: v2<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- gudong--rank</code><br><br><a href="https://q.dog/pets/gudong--rank">View all actions →</a></td><td width="180" align="center"><a href="https://q.dog/pets/gudong--rank"><img src="https://q.dog/assets/previews/gudong--rank/thumbnail.png" alt="咕咚 Preview" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/liubao--killyer"><img src="https://q.dog/assets/previews/liubao--killyer/thumbnail.png" alt="榴宝 Preview" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/liubao--killyer">榴宝</a></strong><br>Author: @killyer · Category: Original Characters · Version: v2<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- liubao--killyer</code><br><br><a href="https://q.dog/pets/liubao--killyer">View all actions →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/feibi--vanfff">菲比</a></strong><br>Author: @vanfff · Category: Original Characters · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- feibi--vanfff</code><br><br><a href="https://q.dog/pets/feibi--vanfff">View all actions →</a></td><td width="180" align="center"><a href="https://q.dog/pets/feibi--vanfff"><img src="https://q.dog/assets/previews/feibi--vanfff/thumbnail.png" alt="菲比 Preview" width="160" height="173"></a></td></tr>
</table>

### Mascots

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/aemeath-mini--cunuo"><img src="https://q.dog/assets/previews/aemeath-mini--cunuo/thumbnail.png" alt="Aemeath Mini Preview" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/aemeath-mini--cunuo">Aemeath Mini</a></strong><br>Author: <a href="https://github.com/cuNuo">@cuNuo</a> · Category: Mascots · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- aemeath-mini--cunuo</code><br><br><a href="https://q.dog/pets/aemeath-mini--cunuo">View all actions →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/apu--xchangee">Apu</a></strong><br>Author: <a href="https://github.com/xchangee">@xchangee</a> · Category: Mascots · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- apu--xchangee</code><br><br><a href="https://q.dog/pets/apu--xchangee">View all actions →</a></td><td width="180" align="center"><a href="https://q.dog/pets/apu--xchangee"><img src="https://q.dog/assets/previews/apu--xchangee/thumbnail.png" alt="Apu Preview" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/claude--xiangking"><img src="https://q.dog/assets/previews/claude--xiangking/thumbnail.png" alt="Claude Preview" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/claude--xiangking">Claude</a></strong><br>Author: <a href="https://github.com/xiangking">@xiangking</a> · Category: Mascots · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- claude--xiangking</code><br><br><a href="https://q.dog/pets/claude--xiangking">View all actions →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/twinkle-twinkle--twinkletwinkle">Dashun's Twinkle Twinkle</a></strong><br>Author: @twinkletwinkle · Category: Mascots · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- twinkle-twinkle--twinkletwinkle</code><br><br><a href="https://q.dog/pets/twinkle-twinkle--twinkletwinkle">View all actions →</a></td><td width="180" align="center"><a href="https://q.dog/pets/twinkle-twinkle--twinkletwinkle"><img src="https://q.dog/assets/previews/twinkle-twinkle--twinkletwinkle/thumbnail.png" alt="Dashun's Twinkle Twinkle Preview" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/diaoyi-baobao--d1a0y1bb"><img src="https://q.dog/assets/previews/diaoyi-baobao--d1a0y1bb/thumbnail.png" alt="Diaoyi Baobao Preview" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/diaoyi-baobao--d1a0y1bb">Diaoyi Baobao</a></strong><br>Author: <a href="https://github.com/D1a0y1bb">@D1a0y1bb</a> · Category: Mascots · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- diaoyi-baobao--d1a0y1bb</code><br><br><a href="https://q.dog/pets/diaoyi-baobao--d1a0y1bb">View all actions →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/gpt-muse--opask">GPT-muse</a></strong><br>Author: @opask · Category: Mascots · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- gpt-muse--opask</code><br><br><a href="https://q.dog/pets/gpt-muse--opask">View all actions →</a></td><td width="180" align="center"><a href="https://q.dog/pets/gpt-muse--opask"><img src="https://q.dog/assets/previews/gpt-muse--opask/thumbnail.png" alt="GPT-muse Preview" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/lulu--yogazz"><img src="https://q.dog/assets/previews/lulu--yogazz/thumbnail.png" alt="Lulu Preview" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/lulu--yogazz">Lulu</a></strong><br>Author: <a href="https://github.com/YoGazz">@YoGazz</a> · Category: Mascots · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- lulu--yogazz</code><br><br><a href="https://q.dog/pets/lulu--yogazz">View all actions →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/saki--rookie-09">Saki</a></strong><br>Author: <a href="https://github.com/rookie-09">@rookie-09</a> · Category: Mascots · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- saki--rookie-09</code><br><br><a href="https://q.dog/pets/saki--rookie-09">View all actions →</a></td><td width="180" align="center"><a href="https://q.dog/pets/saki--rookie-09"><img src="https://q.dog/assets/previews/saki--rookie-09/thumbnail.png" alt="Saki Preview" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/wally--wally025"><img src="https://q.dog/assets/previews/wally--wally025/thumbnail.png" alt="Wally Preview" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/wally--wally025">Wally</a></strong><br>Author: <a href="https://github.com/wally025">@wally025</a> · Category: Mascots · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- wally--wally025</code><br><br><a href="https://q.dog/pets/wally--wally025">View all actions →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/zhengyin--noonwake">Zhengyin</a></strong><br>Author: <a href="https://pets.usefulmint.com/?utm_source=awesome_codex_pet&utm_medium=directory&utm_campaign=founding_five&utm_content=zhengyin_listing">@noonwake-ai</a> · Category: Mascots · Version: v2<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- zhengyin--noonwake</code><br><br><a href="https://q.dog/pets/zhengyin--noonwake">View all actions →</a></td><td width="180" align="center"><a href="https://q.dog/pets/zhengyin--noonwake"><img src="https://q.dog/assets/previews/zhengyin--noonwake/thumbnail.png" alt="Zhengyin Preview" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/happynailong--aquaxyy"><img src="https://q.dog/assets/previews/happynailong--aquaxyy/thumbnail.png" alt="大笑奶龙 Preview" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/happynailong--aquaxyy">大笑奶龙</a></strong><br>Author: @aquaxyy · Category: Mascots · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- happynailong--aquaxyy</code><br><br><a href="https://q.dog/pets/happynailong--aquaxyy">View all actions →</a></td></tr>
</table>

### Animals

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/becky--natewanggg">Becky</a></strong><br>Author: <a href="https://github.com/NateWanggg">@NateWanggg</a> · Category: Animals · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- becky--natewanggg</code><br><br><a href="https://q.dog/pets/becky--natewanggg">View all actions →</a></td><td width="180" align="center"><a href="https://q.dog/pets/becky--natewanggg"><img src="https://q.dog/assets/previews/becky--natewanggg/thumbnail.png" alt="Becky Preview" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/bubu--gbn666"><img src="https://q.dog/assets/previews/bubu--gbn666/thumbnail.png" alt="Bubu Preview" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/bubu--gbn666">Bubu</a></strong><br>Author: <a href="https://github.com/gbn666">@gbn666</a> · Category: Animals · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- bubu--gbn666</code><br><br><a href="https://q.dog/pets/bubu--gbn666">View all actions →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/corgi-companion--cxian0928-afk">Corgi Companion</a></strong><br>Author: <a href="https://github.com/cxian0928-afk">@cxian0928-afk</a> · Category: Animals · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- corgi-companion--cxian0928-afk</code><br><br><a href="https://q.dog/pets/corgi-companion--cxian0928-afk">View all actions →</a></td><td width="180" align="center"><a href="https://q.dog/pets/corgi-companion--cxian0928-afk"><img src="https://q.dog/assets/previews/corgi-companion--cxian0928-afk/thumbnail.png" alt="Corgi Companion Preview" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/desk-otter--zihualiu1997"><img src="https://q.dog/assets/previews/desk-otter--zihualiu1997/thumbnail.png" alt="Desk Otter Preview" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/desk-otter--zihualiu1997">Desk Otter</a></strong><br>Author: <a href="https://github.com/zihualiu1997">@zihualiu1997</a> · Category: Animals · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- desk-otter--zihualiu1997</code><br><br><a href="https://q.dog/pets/desk-otter--zihualiu1997">View all actions →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/diandian--lllucasxu">Diandian</a></strong><br>Author: <a href="https://github.com/LLLucasXU">@LLLucasXU</a> · Category: Animals · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- diandian--lllucasxu</code><br><br><a href="https://q.dog/pets/diandian--lllucasxu">View all actions →</a></td><td width="180" align="center"><a href="https://q.dog/pets/diandian--lllucasxu"><img src="https://q.dog/assets/previews/diandian--lllucasxu/thumbnail.png" alt="Diandian Preview" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/dudu-bubu--clembuilds"><img src="https://q.dog/assets/previews/dudu-bubu--clembuilds/thumbnail.png" alt="Dudu & Bubu Preview" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/dudu-bubu--clembuilds">Dudu & Bubu</a></strong><br>Author: @clembuilds · Category: Animals · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- dudu-bubu--clembuilds</code><br><br><a href="https://q.dog/pets/dudu-bubu--clembuilds">View all actions →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/ella-wave--sehjk">Ella Wave</a></strong><br>Author: @sehjk · Category: Animals · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- ella-wave--sehjk</code><br><br><a href="https://q.dog/pets/ella-wave--sehjk">View all actions →</a></td><td width="180" align="center"><a href="https://q.dog/pets/ella-wave--sehjk"><img src="https://q.dog/assets/previews/ella-wave--sehjk/thumbnail.png" alt="Ella Wave Preview" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/fleta--natewanggg"><img src="https://q.dog/assets/previews/fleta--natewanggg/thumbnail.png" alt="Fleta Preview" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/fleta--natewanggg">Fleta</a></strong><br>Author: <a href="https://github.com/NateWanggg">@NateWanggg</a> · Category: Animals · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- fleta--natewanggg</code><br><br><a href="https://q.dog/pets/fleta--natewanggg">View all actions →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/frankie--aygunvarol">Frankie</a></strong><br>Author: <a href="https://github.com/AygunVarol">@AygunVarol</a> · Category: Animals · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- frankie--aygunvarol</code><br><br><a href="https://q.dog/pets/frankie--aygunvarol">View all actions →</a></td><td width="180" align="center"><a href="https://q.dog/pets/frankie--aygunvarol"><img src="https://q.dog/assets/previews/frankie--aygunvarol/thumbnail.png" alt="Frankie Preview" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/jiji--yena"><img src="https://q.dog/assets/previews/jiji--yena/thumbnail.png" alt="Jiji Preview" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/jiji--yena">Jiji</a></strong><br>Author: @yena · Category: Animals · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- jiji--yena</code><br><br><a href="https://q.dog/pets/jiji--yena">View all actions →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/kiko--untko">Kiko</a></strong><br>Author: <a href="https://github.com/untko">@untko</a> · Category: Animals · Version: v2<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- kiko--untko</code><br><br><a href="https://q.dog/pets/kiko--untko">View all actions →</a></td><td width="180" align="center"><a href="https://q.dog/pets/kiko--untko"><img src="https://q.dog/assets/previews/kiko--untko/thumbnail.png" alt="Kiko Preview" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/kimoju--andiac"><img src="https://q.dog/assets/previews/kimoju--andiac/thumbnail.png" alt="Kimoju Preview" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/kimoju--andiac">Kimoju</a></strong><br>Author: @andiac · Category: Animals · Version: v2<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- kimoju--andiac</code><br><br><a href="https://q.dog/pets/kimoju--andiac">View all actions →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/lil-swole--gg0805">Lil Swole</a></strong><br>Author: <a href="https://github.com/gg0805">@gg0805</a> · Category: Animals · Version: v2<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- lil-swole--gg0805</code><br><br><a href="https://q.dog/pets/lil-swole--gg0805">View all actions →</a></td><td width="180" align="center"><a href="https://q.dog/pets/lil-swole--gg0805"><img src="https://q.dog/assets/previews/lil-swole--gg0805/thumbnail.png" alt="Lil Swole Preview" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/little-sheep--mingdong"><img src="https://q.dog/assets/previews/little-sheep--mingdong/thumbnail.png" alt="Little Sheep Preview" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/little-sheep--mingdong">Little Sheep</a></strong><br>Author: @MingDong · Category: Animals · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- little-sheep--mingdong</code><br><br><a href="https://q.dog/pets/little-sheep--mingdong">View all actions →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/mai--dwdestiny">Mai</a></strong><br>Author: <a href="https://github.com/DwDestiny">@DwDestiny</a> · Category: Animals · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- mai--dwdestiny</code><br><br><a href="https://q.dog/pets/mai--dwdestiny">View all actions →</a></td><td width="180" align="center"><a href="https://q.dog/pets/mai--dwdestiny"><img src="https://q.dog/assets/previews/mai--dwdestiny/thumbnail.png" alt="Mai Preview" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/mellow-duck--sally-entr"><img src="https://q.dog/assets/previews/mellow-duck--sally-entr/thumbnail.png" alt="Mellow Duck Preview" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/mellow-duck--sally-entr">Mellow Duck</a></strong><br>Author: @sally-entr · Category: Animals · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- mellow-duck--sally-entr</code><br><br><a href="https://q.dog/pets/mellow-duck--sally-entr">View all actions →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/mimi--spacebody">Mimi</a></strong><br>Author: <a href="https://github.com/Spacebody">@Spacebody</a> · Category: Animals · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- mimi--spacebody</code><br><br><a href="https://q.dog/pets/mimi--spacebody">View all actions →</a></td><td width="180" align="center"><a href="https://q.dog/pets/mimi--spacebody"><img src="https://q.dog/assets/previews/mimi--spacebody/thumbnail.png" alt="Mimi Preview" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/moomew-coder-cat--ping"><img src="https://q.dog/assets/previews/moomew-coder-cat--ping/thumbnail.png" alt="MooMew Coder Preview" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/moomew-coder-cat--ping">MooMew Coder</a></strong><br>Author: @ping · Category: Animals · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- moomew-coder-cat--ping</code><br><br><a href="https://q.dog/pets/moomew-coder-cat--ping">View all actions →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/panda--jason-bai">Panda</a></strong><br>Author: <a href="https://github.com/Jason-Bai">@Jason-Bai</a> · Category: Animals · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- panda--jason-bai</code><br><br><a href="https://q.dog/pets/panda--jason-bai">View all actions →</a></td><td width="180" align="center"><a href="https://q.dog/pets/panda--jason-bai"><img src="https://q.dog/assets/previews/panda--jason-bai/thumbnail.png" alt="Panda Preview" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/pixel-duck--flamurmaliqi"><img src="https://q.dog/assets/previews/pixel-duck--flamurmaliqi/thumbnail.png" alt="Pixel Duck Preview" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/pixel-duck--flamurmaliqi">Pixel Duck</a></strong><br>Author: <a href="https://github.com/FlamurMaliqi">@FlamurMaliqi</a> · Category: Animals · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- pixel-duck--flamurmaliqi</code><br><br><a href="https://q.dog/pets/pixel-duck--flamurmaliqi">View all actions →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/rook--klubbyte">Rook</a></strong><br>Author: @klubbyte · Category: Animals · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- rook--klubbyte</code><br><br><a href="https://q.dog/pets/rook--klubbyte">View all actions →</a></td><td width="180" align="center"><a href="https://q.dog/pets/rook--klubbyte"><img src="https://q.dog/assets/previews/rook--klubbyte/thumbnail.png" alt="Rook Preview" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/miu-meo--lemon-z"><img src="https://q.dog/assets/previews/miu-meo--lemon-z/thumbnail.png" alt="SalaryCat Preview" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/miu-meo--lemon-z">SalaryCat</a></strong><br>Author: @lemon-z · Category: Animals · Version: v2<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- miu-meo--lemon-z</code><br><br><a href="https://q.dog/pets/miu-meo--lemon-z">View all actions →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/salary-cat--zuochunjie">SalaryCat</a></strong><br>Author: <a href="https://github.com/Zuochunjie">@Zuochunjie</a> · Category: Animals · Version: v2<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- salary-cat--zuochunjie</code><br><br><a href="https://q.dog/pets/salary-cat--zuochunjie">View all actions →</a></td><td width="180" align="center"><a href="https://q.dog/pets/salary-cat--zuochunjie"><img src="https://q.dog/assets/previews/salary-cat--zuochunjie/thumbnail.png" alt="SalaryCat Preview" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/teddy--danieloleary"><img src="https://q.dog/assets/previews/teddy--danieloleary/thumbnail.png" alt="Teddy Preview" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/teddy--danieloleary">Teddy</a></strong><br>Author: <a href="https://github.com/danieloleary">@danieloleary</a> · Category: Animals · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- teddy--danieloleary</code><br><br><a href="https://q.dog/pets/teddy--danieloleary">View all actions →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/tian-hua-hua--d1a0y1bb">Tian Hua Hua</a></strong><br>Author: <a href="https://github.com/D1a0y1bb">@D1a0y1bb</a> · Category: Animals · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- tian-hua-hua--d1a0y1bb</code><br><br><a href="https://q.dog/pets/tian-hua-hua--d1a0y1bb">View all actions →</a></td><td width="180" align="center"><a href="https://q.dog/pets/tian-hua-hua--d1a0y1bb"><img src="https://q.dog/assets/previews/tian-hua-hua--d1a0y1bb/thumbnail.png" alt="Tian Hua Hua Preview" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/usachi--jack"><img src="https://q.dog/assets/previews/usachi--jack/thumbnail.png" alt="乌萨奇 Preview" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/usachi--jack">乌萨奇</a></strong><br>Author: @jack · Category: Animals · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- usachi--jack</code><br><br><a href="https://q.dog/pets/usachi--jack">View all actions →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/dai-dai-nai-you--1wphantom">呆呆奶油</a></strong><br>Author: @1wphantom · Category: Animals · Version: v2<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- dai-dai-nai-you--1wphantom</code><br><br><a href="https://q.dog/pets/dai-dai-nai-you--1wphantom">View all actions →</a></td><td width="180" align="center"><a href="https://q.dog/pets/dai-dai-nai-you--1wphantom"><img src="https://q.dog/assets/previews/dai-dai-nai-you--1wphantom/thumbnail.png" alt="呆呆奶油 Preview" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/tuantuan--jbbom"><img src="https://q.dog/assets/previews/tuantuan--jbbom/thumbnail.png" alt="团团 Preview" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/tuantuan--jbbom">团团</a></strong><br>Author: <a href="https://github.com/JbBom">@JbBom</a> · Category: Animals · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- tuantuan--jbbom</code><br><br><a href="https://q.dog/pets/tuantuan--jbbom">View all actions →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/duodong--froggie">多栋</a></strong><br>Author: @froggie · Category: Animals · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- duodong--froggie</code><br><br><a href="https://q.dog/pets/duodong--froggie">View all actions →</a></td><td width="180" align="center"><a href="https://q.dog/pets/duodong--froggie"><img src="https://q.dog/assets/previews/duodong--froggie/thumbnail.png" alt="多栋 Preview" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/naiwa--sandytruant"><img src="https://q.dog/assets/previews/naiwa--sandytruant/thumbnail.png" alt="奶蛙 Preview" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/naiwa--sandytruant">奶蛙</a></strong><br>Author: <a href="https://github.com/sandytruant">@sandytruant</a> · Category: Animals · Version: v2<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- naiwa--sandytruant</code><br><br><a href="https://q.dog/pets/naiwa--sandytruant">View all actions →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/xiaoba-cat--jack">小八猫</a></strong><br>Author: @jack · Category: Animals · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- xiaoba-cat--jack</code><br><br><a href="https://q.dog/pets/xiaoba-cat--jack">View all actions →</a></td><td width="180" align="center"><a href="https://q.dog/pets/xiaoba-cat--jack"><img src="https://q.dog/assets/previews/xiaoba-cat--jack/thumbnail.png" alt="小八猫 Preview" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/xiaomai--brian-3"><img src="https://q.dog/assets/previews/xiaomai--brian-3/thumbnail.png" alt="小麦 XiaoMai Preview" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/xiaomai--brian-3">小麦 XiaoMai</a></strong><br>Author: @brian-3 · Category: Animals · Version: v2<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- xiaomai--brian-3</code><br><br><a href="https://q.dog/pets/xiaomai--brian-3">View all actions →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/koukou-penguin--hoody">扣扣企鹅</a></strong><br>Author: @hoody · Category: Animals · Version: v2<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- koukou-penguin--hoody</code><br><br><a href="https://q.dog/pets/koukou-penguin--hoody">View all actions →</a></td><td width="180" align="center"><a href="https://q.dog/pets/koukou-penguin--hoody"><img src="https://q.dog/assets/previews/koukou-penguin--hoody/thumbnail.png" alt="扣扣企鹅 Preview" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/capybara-lulu--jiushu"><img src="https://q.dog/assets/previews/capybara-lulu--jiushu/thumbnail.png" alt="水豚噜噜 Preview" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/capybara-lulu--jiushu">水豚噜噜</a></strong><br>Author: @jiushu · Category: Animals · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- capybara-lulu--jiushu</code><br><br><a href="https://q.dog/pets/capybara-lulu--jiushu">View all actions →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/niumou--jarvis-2">牛哞</a></strong><br>Author: @jarvis-2 · Category: Animals · Version: v2<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- niumou--jarvis-2</code><br><br><a href="https://q.dog/pets/niumou--jarvis-2">View all actions →</a></td><td width="180" align="center"><a href="https://q.dog/pets/niumou--jarvis-2"><img src="https://q.dog/assets/previews/niumou--jarvis-2/thumbnail.png" alt="牛哞 Preview" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/zichao-xiong--z-kzhang"><img src="https://q.dog/assets/previews/zichao-xiong--z-kzhang/thumbnail.png" alt="自嘲熊 Preview" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/zichao-xiong--z-kzhang">自嘲熊</a></strong><br>Author: @z-kzhang · Category: Animals · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- zichao-xiong--z-kzhang</code><br><br><a href="https://q.dog/pets/zichao-xiong--z-kzhang">View all actions →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/wucanrou--ch">金渐层（午餐肉）</a></strong><br>Author: <a href="https://github.com/huanchu0213-ui">@huanchu0213-ui</a> · Category: Animals · Version: v2<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- wucanrou--ch</code><br><br><a href="https://q.dog/pets/wucanrou--ch">View all actions →</a></td><td width="180" align="center"><a href="https://q.dog/pets/wucanrou--ch"><img src="https://q.dog/assets/previews/wucanrou--ch/thumbnail.png" alt="金渐层（午餐肉） Preview" width="160" height="173"></a></td></tr>
</table>

### Fantasy Creatures

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/goblin--rkwap"><img src="https://q.dog/assets/previews/goblin--rkwap/thumbnail.png" alt="Goblin Preview" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/goblin--rkwap">Goblin</a></strong><br>Author: @rkwap · Category: Fantasy Creatures · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- goblin--rkwap</code><br><br><a href="https://q.dog/pets/goblin--rkwap">View all actions →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/luna-angel-cat--neve">luna_angel cat</a></strong><br>Author: @neve · Category: Fantasy Creatures · Version: v2<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- luna-angel-cat--neve</code><br><br><a href="https://q.dog/pets/luna-angel-cat--neve">View all actions →</a></td><td width="180" align="center"><a href="https://q.dog/pets/luna-angel-cat--neve"><img src="https://q.dog/assets/previews/luna-angel-cat--neve/thumbnail.png" alt="luna_angel cat Preview" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/night-neko--netizenxuan"><img src="https://q.dog/assets/previews/night-neko--netizenxuan/thumbnail.png" alt="Night Neko Preview" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/night-neko--netizenxuan">Night Neko</a></strong><br>Author: <a href="https://github.com/netizenXuan">@netizenXuan</a> · Category: Fantasy Creatures · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- night-neko--netizenxuan</code><br><br><a href="https://q.dog/pets/night-neko--netizenxuan">View all actions →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/starcorn--alterhq">Starcorn</a></strong><br>Author: <a href="https://github.com/alterhq">@alterhq</a> · Category: Fantasy Creatures · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- starcorn--alterhq</code><br><br><a href="https://q.dog/pets/starcorn--alterhq">View all actions →</a></td><td width="180" align="center"><a href="https://q.dog/pets/starcorn--alterhq"><img src="https://q.dog/assets/previews/starcorn--alterhq/thumbnail.png" alt="Starcorn Preview" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/xian-xiao-lu--qingyunagi"><img src="https://q.dog/assets/previews/xian-xiao-lu--qingyunagi/thumbnail.png" alt="Xian Xiao Lu Preview" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/xian-xiao-lu--qingyunagi">Xian Xiao Lu</a></strong><br>Author: <a href="https://github.com/qingyunAGI">@qingyunAGI</a> · Category: Fantasy Creatures · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- xian-xiao-lu--qingyunagi</code><br><br><a href="https://q.dog/pets/xian-xiao-lu--qingyunagi">View all actions →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/yuanzai--gaming33">Yuanzai</a></strong><br>Author: <a href="https://github.com/Gaming33">@Gaming33</a> · Category: Fantasy Creatures · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- yuanzai--gaming33</code><br><br><a href="https://q.dog/pets/yuanzai--gaming33">View all actions →</a></td><td width="180" align="center"><a href="https://q.dog/pets/yuanzai--gaming33"><img src="https://q.dog/assets/previews/yuanzai--gaming33/thumbnail.png" alt="Yuanzai Preview" width="160" height="173"></a></td></tr>
</table>

### Robots

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/chispa--giiilberto-nm"><img src="https://q.dog/assets/previews/chispa--giiilberto-nm/thumbnail.png" alt="Chispa Preview" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/chispa--giiilberto-nm">Chispa</a></strong><br>Author: @giiilberto-nm · Category: Robots · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- chispa--giiilberto-nm</code><br><br><a href="https://q.dog/pets/chispa--giiilberto-nm">View all actions →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/codenono--dq02">CodeNoNo</a></strong><br>Author: <a href="https://github.com/Dqd02">@Dqd02</a> · Category: Robots · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- codenono--dq02</code><br><br><a href="https://q.dog/pets/codenono--dq02">View all actions →</a></td><td width="180" align="center"><a href="https://q.dog/pets/codenono--dq02"><img src="https://q.dog/assets/previews/codenono--dq02/thumbnail.png" alt="CodeNoNo Preview" width="160" height="173"></a></td></tr>
</table>

### Human Avatars

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/azuma--tairazuma"><img src="https://q.dog/assets/previews/azuma--tairazuma/thumbnail.png" alt="Azuma Preview" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/azuma--tairazuma">Azuma</a></strong><br>Author: @tairazuma · Category: Human Avatars · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- azuma--tairazuma</code><br><br><a href="https://q.dog/pets/azuma--tairazuma">View all actions →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/tangdouren--carl312">Tangdouren</a></strong><br>Author: <a href="https://github.com/Carl-312">@Carl-312</a> · Category: Human Avatars · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- tangdouren--carl312</code><br><br><a href="https://q.dog/pets/tangdouren--carl312">View all actions →</a></td><td width="180" align="center"><a href="https://q.dog/pets/tangdouren--carl312"><img src="https://q.dog/assets/previews/tangdouren--carl312/thumbnail.png" alt="Tangdouren Preview" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/guga--circus"><img src="https://q.dog/assets/previews/guga--circus/thumbnail.png" alt="咕嘎 Preview" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/guga--circus">咕嘎</a></strong><br>Author: @circus · Category: Human Avatars · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- guga--circus</code><br><br><a href="https://q.dog/pets/guga--circus">View all actions →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/fengge--qzl1-stack">峰哥</a></strong><br>Author: <a href="https://github.com/qzl1-stack">@qzl1-stack</a> · Category: Human Avatars · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- fengge--qzl1-stack</code><br><br><a href="https://q.dog/pets/fengge--qzl1-stack">View all actions →</a></td><td width="180" align="center"><a href="https://q.dog/pets/fengge--qzl1-stack"><img src="https://q.dog/assets/previews/fengge--qzl1-stack/thumbnail.png" alt="峰哥 Preview" width="160" height="173"></a></td></tr>
</table>

### Memes

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/drill-cat--qimi"><img src="https://q.dog/assets/previews/drill-cat--qimi/thumbnail.png" alt="Drill Cat Preview" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/drill-cat--qimi">Drill Cat</a></strong><br>Author: <a href="https://github.com/qishichuan">@qishichuan</a> · Category: Memes · Version: v2<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- drill-cat--qimi</code><br><br><a href="https://q.dog/pets/drill-cat--qimi">View all actions →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/hami--tat">Hami</a></strong><br>Author: <a href="https://github.com/TATcc">@TATcc</a> · Category: Memes · Version: v2<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- hami--tat</code><br><br><a href="https://q.dog/pets/hami--tat">View all actions →</a></td><td width="180" align="center"><a href="https://q.dog/pets/hami--tat"><img src="https://q.dog/assets/previews/hami--tat/thumbnail.png" alt="Hami Preview" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/katana-cheems--thankyou-cheems"><img src="https://q.dog/assets/previews/katana-cheems--thankyou-cheems/thumbnail.png" alt="Katana Cheems Preview" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/katana-cheems--thankyou-cheems">Katana Cheems</a></strong><br>Author: <a href="https://github.com/Thankyou-Cheems">@Thankyou-Cheems</a> · Category: Memes · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- katana-cheems--thankyou-cheems</code><br><br><a href="https://q.dog/pets/katana-cheems--thankyou-cheems">View all actions →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/hance-woniu--korn">旱厕蜗牛</a></strong><br>Author: @korn · Category: Memes · Version: v2<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- hance-woniu--korn</code><br><br><a href="https://q.dog/pets/hance-woniu--korn">View all actions →</a></td><td width="180" align="center"><a href="https://q.dog/pets/hance-woniu--korn"><img src="https://q.dog/assets/previews/hance-woniu--korn/thumbnail.png" alt="旱厕蜗牛 Preview" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/maodie--octane0411"><img src="https://q.dog/assets/previews/maodie--octane0411/thumbnail.png" alt="耄耋 Preview" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/maodie--octane0411">耄耋</a></strong><br>Author: <a href="https://github.com/Octane0411">@Octane0411</a> · Category: Memes · Version: v2<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- maodie--octane0411</code><br><br><a href="https://q.dog/pets/maodie--octane0411">View all actions →</a></td></tr>
</table>

### Objects & Props

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/spellbook--seymour">Spellbook</a></strong><br>Author: @seymour · Category: Objects & Props · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- spellbook--seymour</code><br><br><a href="https://q.dog/pets/spellbook--seymour">View all actions →</a></td><td width="180" align="center"><a href="https://q.dog/pets/spellbook--seymour"><img src="https://q.dog/assets/previews/spellbook--seymour/thumbnail.png" alt="Spellbook Preview" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/tiny-crt--chochou"><img src="https://q.dog/assets/previews/tiny-crt--chochou/thumbnail.png" alt="Tiny CRT Preview" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/tiny-crt--chochou">Tiny CRT</a></strong><br>Author: @chochou · Category: Objects & Props · Version: v1<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- tiny-crt--chochou</code><br><br><a href="https://q.dog/pets/tiny-crt--chochou">View all actions →</a></td></tr>
</table>

### Others

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/twilight-sparkle--wuye3790">紫悦</a></strong><br>Author: <a href="https://github.com/WuYe3790">@WuYe3790</a> · Category: Others · Version: v2<br><br><strong>Install</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- twilight-sparkle--wuye3790</code><br><br><a href="https://q.dog/pets/twilight-sparkle--wuye3790">View all actions →</a></td><td width="180" align="center"><a href="https://q.dog/pets/twilight-sparkle--wuye3790"><img src="https://q.dog/assets/previews/twilight-sparkle--wuye3790/thumbnail.png" alt="紫悦 Preview" width="160" height="173"></a></td></tr>
</table>

## Request or Submit a Pet

Missing a favorite character? Open the [free community request page](https://q.dog/request). Submitting is free, no spritesheet is required, and a community contributor may volunteer to make the pet. Requests are not acceptance or delivery promises.

Contributors can start with the [website contribution guide](https://q.dog/guide). It offers three paths without making every contributor download this large asset repository:

1. **Request a pet** — Codex checks for duplicates, gathers references and requirements, then opens a labeled request issue.
2. **Create or submit your own pet** — Codex can start from references or existing files, complete and validate the three-file package, then use the GitHub API to create a focused branch and pull request without a full clone.
3. **Advanced pull request** — experienced contributors can work in a GitHub Codespace, a partial clone, or their preferred Git workflow.

The repository skill at [`.agents/skills/submit-codex-pet`](./.agents/skills/submit-codex-pet) teaches compatible AI agents how to choose the right route. When credentials or repository write access are unavailable, it falls back to a labeled submission issue instead of losing the contributor's work.

Advanced contributors should add exactly one final package:

```text
pets/
└── pet-slug--author-slug/
    ├── submission.json
    ├── pet.json
    └── spritesheet.webp
```

Use `pet-slug--author-slug` so multiple authors can ship variants of the same character. A v1 submission may omit `spriteVersionNumber` and must provide a `1536x1872` WebP. A v2 submission must set `spriteVersionNumber: 2` and provide a `1536x2288` WebP.

The v2 runtime manifest looks like:

```json
{
  "id": "pet-slug--author-slug",
  "displayName": "Pet Name",
  "description": "One short sentence.",
  "spriteVersionNumber": 2,
  "spritesheetPath": "spritesheet.webp"
}
```

Generated previews and README listings are produced by CI:

```bash
python -m pip install -r requirements.txt
npm run validate:pr
npm run lint
```

Contributor PRs should only include `submission.json`, `pet.json`, and `spritesheet.webp`. Do not submit prompts, references, QA folders, contact sheets, videos, decoded frames, or Hatch Pet run directories. Maintainers or CI regenerate previews, README listings, and `pets.json` after merge, but preview binaries are not kept as tracked Git assets.

## Make a Pet

- [.agents/skills/submit-codex-pet](./.agents/skills/submit-codex-pet) — request community production, create or submit your own pet through the GitHub API, or prepare an advanced PR
- [.agents/skills/hatch-pet-v1](./.agents/skills/hatch-pet-v1) — preserve or repair a legacy 8x9 v1 pet
- [.agents/skills/hatch-pet-v2](./.agents/skills/hatch-pet-v2) — create or upgrade an 8x11 v2 pet with 16 look directions

Choose the skill explicitly. For an upgrade, give `$hatch-pet-v2` the existing installed `pet.json` and `spritesheet.webp`; approved rows 0–8 are retained rather than regenerated.

## Documentation

- English: [docs/en](./docs/en)
- 简体中文: [docs/zh-CN](./docs/zh-CN)
- 한국어: [docs/ko](./docs/ko)
- 日本語: [docs/ja](./docs/ja)
- Español: [docs/es](./docs/es)
- Web gallery source: [web/](./web)
- Stats worker: [worker/](./worker)
- Contribution guide: [CONTRIBUTING.md](./CONTRIBUTING.md)

## Star History

[![GitHub star history for QDog](./assets/community/star-history.svg)](https://github.com/burgleaf/qdog-community/stargazers)

The chart is refreshed daily from GitHub's stargazer data. [Star the repository](https://github.com/burgleaf/qdog-community) to help more people discover these pets.

## Contributors

<a href="https://github.com/burgleaf/qdog-community/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=burgleaf/qdog-community" alt="QDog contributors">
</a>

Thanks to everyone who contributes pets, code, documentation, reviews, and ideas.

## License

- Code and scripts: [MIT](./LICENSE)
- Pet assets and generated previews: [CC BY-NC 4.0](./ASSETS-LICENSE.md), unless a pet folder says otherwise
