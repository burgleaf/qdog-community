<div align="center">

# QDog

[English](../../README.md) | [简体中文](../zh-CN/README.md) | 한국어 | [日本語](../ja/README.md) | [Español](../es/README.md)

<h2><a href="https://q.dog">QDog에서 무료 커뮤니티 Codex 펫을 둘러보고 설치하세요 →</a></h2>

<p><strong>QDog은 무료 커뮤니티 펫 갤러리입니다.</strong> 펫 상점처럼 완성된 애니메이션을 둘러보고, 저장소를 복제하지 않아도 마음에 드는 펫을 설치할 수 있습니다. 원하는 캐릭터가 없다면 커뮤니티에 제작을 요청할 수 있습니다.</p>

<p><a href="https://q.dog"><strong>펫 둘러보기</strong></a> · <a href="https://q.dog/install"><strong>펫 설치하기</strong></a> · <a href="https://q.dog/request"><strong>캐릭터 요청하기</strong></a></p>

<a href="https://q.dog"><img src="../../assets/cover/qdog-cover.png" alt="QDog 갤러리 열기"></a>

![pets: 182](https://img.shields.io/badge/pets-182-2ea44f) ![categories: 11](https://img.shields.io/badge/categories-11-0969da) ![languages: en | zh--CN | ko | ja | es](https://img.shields.io/badge/languages-en%20%7C%20zh--CN%20%7C%20ko%20%7C%20ja%20%7C%20es-8250df) ![code: MIT](https://img.shields.io/badge/code-MIT-111111) ![assets: CC BY--NC 4.0](https://img.shields.io/badge/assets-CC%20BY--NC%204.0-f97316) ![install: one command](https://img.shields.io/badge/install-one%20command-111111) [![Pet previews](https://github.com/burgleaf/qdog-community/actions/workflows/pet-previews.yml/badge.svg)](https://github.com/burgleaf/qdog-community/actions/workflows/pet-previews.yml)

</div>

이 저장소는 [QDog](https://q.dog)의 원본 카탈로그입니다. 설치 가능한 펫 패키지, 제작자 정보, 컬렉션 메타데이터, 검증 도구, 기여 이력을 관리합니다. 펫을 둘러보고 설치하려면 웹사이트를 먼저 이용하세요.

## 주요 기능

- **한 줄 설치** — 저장소 복제나 수동 설정 없이 macOS / Linux / Windows에서 설치
- **무료 커뮤니티 갤러리** — [QDog](https://q.dog)에서 완성된 애니메이션 미리 보기, 컬렉션, 제작자 프로필, 설치 수와 좋아요를 기준으로 한 주간 순위, 공유, 커뮤니티 통계 제공
- **무료 캐릭터 요청** — spritesheet를 만들지 않아도 캐릭터와 참고 자료를 제출할 수 있으며, 커뮤니티 제작자가 자원할 수 있습니다. 제작을 보장하지는 않습니다.
- **AI 우선 기여** — Codex로 펫을 만들고, 고치고, 제출할 수 있으며, 숙련된 기여자는 직접 PR을 열 수 있습니다.
- **열린 라이선스** — 코드에는 MIT, 펫 자산에는 CC BY-NC 4.0 적용

각 펫은 공유할 수 있는 작은 패키지입니다.

```text
pets/<pet-slug>--<author-slug>/
├── submission.json
├── pet.json
└── spritesheet.webp
```

미리 보기 이미지는 로컬 또는 CI 빌드 결과로 `assets/previews/<pet-id>/`에 생성되며, 펫 폴더 안에는 넣지 않습니다.

저장소에서 정의한 시리즈와 컬렉션은 `collections.json`에 있습니다. `kind: franchise`는 같은 원작의 펫을, `kind: theme`는 주제나 스타일이 이어지는 여러 원작의 펫을 나타냅니다. 펫은 `submission.json.collections`에 slug를 적어 소속을 선언하며, 카탈로그와 웹사이트는 이 메타데이터로 생성됩니다. 소속 정보는 바로 기록되지만, 컬렉션은 펫이 3개 이상일 때만 웹사이트에 공개됩니다.

`submission.json.name`은 필수 기본 이름입니다. 제작자는 `localized_names`를 생략해 한 언어만 사용할 수 있고, `localized_names.en`과 `localized_names.zh`를 함께 제공해 이중 언어 이름을 지원할 수도 있습니다. 웹사이트는 방문자가 선택한 언어를 따르며 이름을 임의로 번역하지 않습니다.

## 펫 버전

| 버전 | 아틀라스                | 런타임 메타데이터                   | 용도                                  |
| ---- | ----------------------- | ----------------------------------- | ------------------------------------- |
| v1   | `1536x1872`, 8열 × 9행  | `spriteVersionNumber` 생략 또는 `1` | 기존 표준 애니메이션 펫               |
| v2   | `1536x2288`, 8열 × 11행 | `spriteVersionNumber: 2`            | 표준 애니메이션과 16개 시계 방향 시선 |

두 버전 모두 설치할 수 있습니다. 기존 9행 펫을 관리할 때는 v1을 사용하고, 시선 방향이 필요한 새 펫이나 업그레이드 펫에는 v2를 사용하세요.

## 빠른 설치

저장소를 복제할 필요가 없습니다. 사용하는 셸에 맞는 명령을 선택하세요.

```bash
# macOS / Linux
curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- firefly--lingxiaotian
```

```powershell
# Windows PowerShell
powershell -NoProfile -ExecutionPolicy Bypass -Command "iwr -UseB https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.ps1 | iex; Install-CodexPet firefly--lingxiaotian"
```

```bash
# Node.js를 실행할 수 있는 모든 환경
npx awesome-codex-pet firefly--lingxiaotian
```

설치 가능한 펫 목록 보기:

```bash
curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- --list
```

기본 설치 위치:

- macOS / Linux: `~/.codex/pets/<pet-id>/`
- Windows: `%USERPROFILE%\.codex\pets\<pet-id>\`

`CODEX_HOME`으로 설치 위치를 바꾸거나 `AWESOME_CODEX_PET_NO_STATS=1`을 설정해 익명 설치 집계를 끌 수 있습니다.

## 기존 v1 펫 업그레이드

1. Codex에서 **Settings → Pets**를 엽니다.
2. 설치한 사용자 펫을 찾아 **Update**를 선택합니다.
3. Codex가 Hatch Pet 작업을 엽니다. 현재 v2 흐름은 기존 9개 애니메이션 행을 검증하고 보존한 뒤, 네 방향 기준점과 16개 시선 방향을 생성하여 `spriteVersionNumber: 2`가 설정된 11행 아틀라스를 작성합니다.
4. 교체를 수락하기 전에 생성된 contact sheet와 방향 미리 보기를 검토합니다.

**Update** 동작은 이 저장소의 다운로드 알림이 아니라 AI가 돕는 v1-to-v2 변환입니다. `~/.codex/pets/` 아래의 로컬 패키지만 갱신하며 GitHub 저장소 사본을 자동으로 수정하거나 제출하지 않습니다.

## 펫 목록

### 게임 캐릭터

<table>
<tr><th>이름</th><td colspan="5"><strong>★ 추천 펫</strong> · <a href="https://q.dog/pets/firefly--lingxiaotian">Firefly</a> · 제작자: <a href="https://github.com/legeling">@legeling</a> · 카테고리: 게임 캐릭터 · 버전: v1</td></tr>
<tr><th>설치</th><td colspan="5"><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- firefly--lingxiaotian</code></td></tr>
<tr><th>동작</th><td><strong>대기</strong></td><td><strong>인사</strong></td><td><strong>달리기</strong></td><td><strong>입력 대기</strong></td><td><strong>검토</strong></td></tr>
<tr><th>미리 보기</th><td><img src="https://q.dog/assets/previews/firefly--lingxiaotian/webp/idle.webp" alt="Firefly 대기" width="120" height="130"></td><td><img src="https://q.dog/assets/previews/firefly--lingxiaotian/webp/waving.webp" alt="Firefly 인사" width="120" height="130"></td><td><img src="https://q.dog/assets/previews/firefly--lingxiaotian/webp/running-right.webp" alt="Firefly 달리기" width="120" height="130"></td><td><img src="https://q.dog/assets/previews/firefly--lingxiaotian/webp/waiting.webp" alt="Firefly 입력 대기" width="120" height="130"></td><td><img src="https://q.dog/assets/previews/firefly--lingxiaotian/webp/review.webp" alt="Firefly 검토" width="120" height="130"></td></tr>
<tr><th>전체 동작 보기</th><td colspan="5"><a href="https://q.dog/pets/firefly--lingxiaotian">전체 동작 보기 →</a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/acheron--lingxiaotian"><img src="https://q.dog/assets/previews/acheron--lingxiaotian/thumbnail.png" alt="Acheron 미리 보기" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/acheron--lingxiaotian">Acheron</a></strong><br>제작자: <a href="https://github.com/legeling">@legeling</a> · 카테고리: 게임 캐릭터 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- acheron--lingxiaotian</code><br><br><a href="https://q.dog/pets/acheron--lingxiaotian">전체 동작 보기 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/aggron-3d--dnnyngyen">Aggron (3D)</a></strong><br>제작자: <a href="https://github.com/dnnyngyen">@dnnyngyen</a> · 카테고리: 게임 캐릭터 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- aggron-3d--dnnyngyen</code><br><br><a href="https://q.dog/pets/aggron-3d--dnnyngyen">전체 동작 보기 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/aggron-3d--dnnyngyen"><img src="https://q.dog/assets/previews/aggron-3d--dnnyngyen/thumbnail.png" alt="Aggron (3D) 미리 보기" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/arlecchino--lingxiaotian"><img src="https://q.dog/assets/previews/arlecchino--lingxiaotian/thumbnail.png" alt="Arlecchino 미리 보기" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/arlecchino--lingxiaotian">Arlecchino</a></strong><br>제작자: <a href="https://github.com/legeling">@legeling</a> · 카테고리: 게임 캐릭터 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- arlecchino--lingxiaotian</code><br><br><a href="https://q.dog/pets/arlecchino--lingxiaotian">전체 동작 보기 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/black-swan--lingxiaotian">Black Swan</a></strong><br>제작자: <a href="https://github.com/legeling">@legeling</a> · 카테고리: 게임 캐릭터 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- black-swan--lingxiaotian</code><br><br><a href="https://q.dog/pets/black-swan--lingxiaotian">전체 동작 보기 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/black-swan--lingxiaotian"><img src="https://q.dog/assets/previews/black-swan--lingxiaotian/thumbnail.png" alt="Black Swan 미리 보기" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/buba--yurcek"><img src="https://q.dog/assets/previews/buba--yurcek/thumbnail.png" alt="Buba 미리 보기" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/buba--yurcek">Buba</a></strong><br>제작자: @yurcek · 카테고리: 게임 캐릭터 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- buba--yurcek</code><br><br><a href="https://q.dog/pets/buba--yurcek">전체 동작 보기 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/castorice--lingxiaotian">Castorice</a></strong><br>제작자: <a href="https://github.com/legeling">@legeling</a> · 카테고리: 게임 캐릭터 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- castorice--lingxiaotian</code><br><br><a href="https://q.dog/pets/castorice--lingxiaotian">전체 동작 보기 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/castorice--lingxiaotian"><img src="https://q.dog/assets/previews/castorice--lingxiaotian/thumbnail.png" alt="Castorice 미리 보기" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/charizard--dnnyngyen"><img src="https://q.dog/assets/previews/charizard--dnnyngyen/thumbnail.png" alt="Charizard 미리 보기" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/charizard--dnnyngyen">Charizard</a></strong><br>제작자: <a href="https://github.com/dnnyngyen">@dnnyngyen</a> · 카테고리: 게임 캐릭터 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- charizard--dnnyngyen</code><br><br><a href="https://q.dog/pets/charizard--dnnyngyen">전체 동작 보기 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/chen--chenxin-dlut">Chen</a></strong><br>제작자: <a href="https://github.com/chenxin-dlut">@chenxin-dlut</a> · 카테고리: 게임 캐릭터 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- chen--chenxin-dlut</code><br><br><a href="https://q.dog/pets/chen--chenxin-dlut">전체 동작 보기 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/chen--chenxin-dlut"><img src="https://q.dog/assets/previews/chen--chenxin-dlut/thumbnail.png" alt="Chen 미리 보기" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/cyrene--lingxiaotian"><img src="https://q.dog/assets/previews/cyrene--lingxiaotian/thumbnail.png" alt="Cyrene 미리 보기" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/cyrene--lingxiaotian">Cyrene</a></strong><br>제작자: <a href="https://github.com/legeling">@legeling</a> · 카테고리: 게임 캐릭터 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- cyrene--lingxiaotian</code><br><br><a href="https://q.dog/pets/cyrene--lingxiaotian">전체 동작 보기 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/dimo-stand--god-wu">Dimo</a></strong><br>제작자: @god-wu · 카테고리: 게임 캐릭터 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- dimo-stand--god-wu</code><br><br><a href="https://q.dog/pets/dimo-stand--god-wu">전체 동작 보기 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/dimo-stand--god-wu"><img src="https://q.dog/assets/previews/dimo-stand--god-wu/thumbnail.png" alt="Dimo 미리 보기" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/doro--lingxiaotian"><img src="https://q.dog/assets/previews/doro--lingxiaotian/thumbnail.png" alt="Doro 미리 보기" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/doro--lingxiaotian">Doro</a></strong><br>제작자: <a href="https://github.com/legeling">@legeling</a> · 카테고리: 게임 캐릭터 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- doro--lingxiaotian</code><br><br><a href="https://q.dog/pets/doro--lingxiaotian">전체 동작 보기 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/eevee--dnnyngyen">Eevee</a></strong><br>제작자: <a href="https://github.com/dnnyngyen">@dnnyngyen</a> · 카테고리: 게임 캐릭터 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- eevee--dnnyngyen</code><br><br><a href="https://q.dog/pets/eevee--dnnyngyen">전체 동작 보기 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/eevee--dnnyngyen"><img src="https://q.dog/assets/previews/eevee--dnnyngyen/thumbnail.png" alt="Eevee 미리 보기" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/feixiao--lingxiaotian"><img src="https://q.dog/assets/previews/feixiao--lingxiaotian/thumbnail.png" alt="Feixiao 미리 보기" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/feixiao--lingxiaotian">Feixiao</a></strong><br>제작자: <a href="https://github.com/legeling">@legeling</a> · 카테고리: 게임 캐릭터 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- feixiao--lingxiaotian</code><br><br><a href="https://q.dog/pets/feixiao--lingxiaotian">전체 동작 보기 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/furina--lingxiaotian">Furina</a></strong><br>제작자: <a href="https://github.com/legeling">@legeling</a> · 카테고리: 게임 캐릭터 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- furina--lingxiaotian</code><br><br><a href="https://q.dog/pets/furina--lingxiaotian">전체 동작 보기 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/furina--lingxiaotian"><img src="https://q.dog/assets/previews/furina--lingxiaotian/thumbnail.png" alt="Furina 미리 보기" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/ganyu--chenxin-dlut"><img src="https://q.dog/assets/previews/ganyu--chenxin-dlut/thumbnail.png" alt="Ganyu 미리 보기" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/ganyu--chenxin-dlut">Ganyu</a></strong><br>제작자: <a href="https://github.com/chenxin-dlut">@chenxin-dlut</a> · 카테고리: 게임 캐릭터 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- ganyu--chenxin-dlut</code><br><br><a href="https://q.dog/pets/ganyu--chenxin-dlut">전체 동작 보기 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/hu-tao--lingxiaotian">Hu Tao</a></strong><br>제작자: <a href="https://github.com/legeling">@legeling</a> · 카테고리: 게임 캐릭터 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- hu-tao--lingxiaotian</code><br><br><a href="https://q.dog/pets/hu-tao--lingxiaotian">전체 동작 보기 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/hu-tao--lingxiaotian"><img src="https://q.dog/assets/previews/hu-tao--lingxiaotian/thumbnail.png" alt="Hu Tao 미리 보기" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/hyacine--kurisu"><img src="https://q.dog/assets/previews/hyacine--kurisu/thumbnail.png" alt="Hyacine 미리 보기" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/hyacine--kurisu">Hyacine</a></strong><br>제작자: <a href="https://github.com/kurisu994">@kurisu994</a> · 카테고리: 게임 캐릭터 · 버전: v2<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- hyacine--kurisu</code><br><br><a href="https://q.dog/pets/hyacine--kurisu">전체 동작 보기 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/isaac--foggy-whale">Isaac</a></strong><br>제작자: <a href="https://github.com/Foggy-whale">@Foggy-whale</a> · 카테고리: 게임 캐릭터 · 버전: v2<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- isaac--foggy-whale</code><br><br><a href="https://q.dog/pets/isaac--foggy-whale">전체 동작 보기 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/isaac--foggy-whale"><img src="https://q.dog/assets/previews/isaac--foggy-whale/thumbnail.png" alt="Isaac 미리 보기" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/kamisato-ayaka--lingxiaotian"><img src="https://q.dog/assets/previews/kamisato-ayaka--lingxiaotian/thumbnail.png" alt="Kamisato Ayaka 미리 보기" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/kamisato-ayaka--lingxiaotian">Kamisato Ayaka</a></strong><br>제작자: <a href="https://github.com/legeling">@legeling</a> · 카테고리: 게임 캐릭터 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- kamisato-ayaka--lingxiaotian</code><br><br><a href="https://q.dog/pets/kamisato-ayaka--lingxiaotian">전체 동작 보기 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/klee--chenxin-dlut">Klee</a></strong><br>제작자: <a href="https://github.com/chenxin-dlut">@chenxin-dlut</a> · 카테고리: 게임 캐릭터 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- klee--chenxin-dlut</code><br><br><a href="https://q.dog/pets/klee--chenxin-dlut">전체 동작 보기 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/klee--chenxin-dlut"><img src="https://q.dog/assets/previews/klee--chenxin-dlut/thumbnail.png" alt="Klee 미리 보기" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/kuro-chibi--kuroneko-night"><img src="https://q.dog/assets/previews/kuro-chibi--kuroneko-night/thumbnail.png" alt="Kuro Chibi 미리 보기" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/kuro-chibi--kuroneko-night">Kuro Chibi</a></strong><br>제작자: <a href="https://github.com/KuroNeko-night">@KuroNeko-night</a> · 카테고리: 게임 캐릭터 · 버전: v2<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- kuro-chibi--kuroneko-night</code><br><br><a href="https://q.dog/pets/kuro-chibi--kuroneko-night">전체 동작 보기 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/lappland--chenxin-dlut">Lappland</a></strong><br>제작자: <a href="https://github.com/chenxin-dlut">@chenxin-dlut</a> · 카테고리: 게임 캐릭터 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- lappland--chenxin-dlut</code><br><br><a href="https://q.dog/pets/lappland--chenxin-dlut">전체 동작 보기 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/lappland--chenxin-dlut"><img src="https://q.dog/assets/previews/lappland--chenxin-dlut/thumbnail.png" alt="Lappland 미리 보기" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/little-black-mage--libertis"><img src="https://q.dog/assets/previews/little-black-mage--libertis/thumbnail.png" alt="Little Black Mage 미리 보기" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/little-black-mage--libertis">Little Black Mage</a></strong><br>제작자: @libertis · 카테고리: 게임 캐릭터 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- little-black-mage--libertis</code><br><br><a href="https://q.dog/pets/little-black-mage--libertis">전체 동작 보기 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/march-7th--chenxin-dlut">March 7th</a></strong><br>제작자: <a href="https://github.com/chenxin-dlut">@chenxin-dlut</a> · 카테고리: 게임 캐릭터 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- march-7th--chenxin-dlut</code><br><br><a href="https://q.dog/pets/march-7th--chenxin-dlut">전체 동작 보기 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/march-7th--chenxin-dlut"><img src="https://q.dog/assets/previews/march-7th--chenxin-dlut/thumbnail.png" alt="March 7th 미리 보기" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/miyabi--eric-terminal"><img src="https://q.dog/assets/previews/miyabi--eric-terminal/thumbnail.png" alt="Miyabi 미리 보기" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/miyabi--eric-terminal">Miyabi</a></strong><br>제작자: <a href="https://codex-pets.net/users/eric-terminal">@eric-terminal</a> · 카테고리: 게임 캐릭터 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- miyabi--eric-terminal</code><br><br><a href="https://q.dog/pets/miyabi--eric-terminal">전체 동작 보기 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/nahida--lingxiaotian">Nahida</a></strong><br>제작자: <a href="https://github.com/legeling">@legeling</a> · 카테고리: 게임 캐릭터 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- nahida--lingxiaotian</code><br><br><a href="https://q.dog/pets/nahida--lingxiaotian">전체 동작 보기 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/nahida--lingxiaotian"><img src="https://q.dog/assets/previews/nahida--lingxiaotian/thumbnail.png" alt="Nahida 미리 보기" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/navia--lingxiaotian"><img src="https://q.dog/assets/previews/navia--lingxiaotian/thumbnail.png" alt="Navia 미리 보기" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/navia--lingxiaotian">Navia</a></strong><br>제작자: <a href="https://github.com/legeling">@legeling</a> · 카테고리: 게임 캐릭터 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- navia--lingxiaotian</code><br><br><a href="https://q.dog/pets/navia--lingxiaotian">전체 동작 보기 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/paimon--lingxiaotian">Paimon</a></strong><br>제작자: <a href="https://github.com/legeling">@legeling</a> · 카테고리: 게임 캐릭터 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- paimon--lingxiaotian</code><br><br><a href="https://q.dog/pets/paimon--lingxiaotian">전체 동작 보기 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/paimon--lingxiaotian"><img src="https://q.dog/assets/previews/paimon--lingxiaotian/thumbnail.png" alt="Paimon 미리 보기" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/phoebe--chenxin-dlut"><img src="https://q.dog/assets/previews/phoebe--chenxin-dlut/thumbnail.png" alt="Phoebe 미리 보기" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/phoebe--chenxin-dlut">Phoebe</a></strong><br>제작자: <a href="https://github.com/chenxin-dlut">@chenxin-dlut</a> · 카테고리: 게임 캐릭터 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- phoebe--chenxin-dlut</code><br><br><a href="https://q.dog/pets/phoebe--chenxin-dlut">전체 동작 보기 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/pikachu--dnnyngyen">Pikachu</a></strong><br>제작자: <a href="https://github.com/dnnyngyen">@dnnyngyen</a> · 카테고리: 게임 캐릭터 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- pikachu--dnnyngyen</code><br><br><a href="https://q.dog/pets/pikachu--dnnyngyen">전체 동작 보기 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/pikachu--dnnyngyen"><img src="https://q.dog/assets/previews/pikachu--dnnyngyen/thumbnail.png" alt="Pikachu 미리 보기" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/raiden-shogun--lingxiaotian"><img src="https://q.dog/assets/previews/raiden-shogun--lingxiaotian/thumbnail.png" alt="Raiden Shogun 미리 보기" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/raiden-shogun--lingxiaotian">Raiden Shogun</a></strong><br>제작자: <a href="https://github.com/legeling">@legeling</a> · 카테고리: 게임 캐릭터 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- raiden-shogun--lingxiaotian</code><br><br><a href="https://q.dog/pets/raiden-shogun--lingxiaotian">전체 동작 보기 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/reimu--lingxiaotian">Reimu</a></strong><br>제작자: <a href="https://github.com/legeling">@legeling</a> · 카테고리: 게임 캐릭터 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- reimu--lingxiaotian</code><br><br><a href="https://q.dog/pets/reimu--lingxiaotian">전체 동작 보기 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/reimu--lingxiaotian"><img src="https://q.dog/assets/previews/reimu--lingxiaotian/thumbnail.png" alt="Reimu 미리 보기" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/remielle-dan--erlla"><img src="https://q.dog/assets/previews/remielle-dan--erlla/thumbnail.png" alt="Remielle-Dan / Leimi 미리 보기" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/remielle-dan--erlla">Remielle-Dan / Leimi</a></strong><br>제작자: <a href="https://github.com/Erlla">@Erlla</a> · 카테고리: 게임 캐릭터 · 버전: v2<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- remielle-dan--erlla</code><br><br><a href="https://q.dog/pets/remielle-dan--erlla">전체 동작 보기 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/robin--lingxiaotian">Robin</a></strong><br>제작자: <a href="https://github.com/legeling">@legeling</a> · 카테고리: 게임 캐릭터 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- robin--lingxiaotian</code><br><br><a href="https://q.dog/pets/robin--lingxiaotian">전체 동작 보기 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/robin--lingxiaotian"><img src="https://q.dog/assets/previews/robin--lingxiaotian/thumbnail.png" alt="Robin 미리 보기" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/ruan-mei--lingxiaotian"><img src="https://q.dog/assets/previews/ruan-mei--lingxiaotian/thumbnail.png" alt="Ruan Mei 미리 보기" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/ruan-mei--lingxiaotian">Ruan Mei</a></strong><br>제작자: <a href="https://github.com/legeling">@legeling</a> · 카테고리: 게임 캐릭터 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- ruan-mei--lingxiaotian</code><br><br><a href="https://q.dog/pets/ruan-mei--lingxiaotian">전체 동작 보기 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/silver-wolf--lingxiaotian">Silver Wolf</a></strong><br>제작자: <a href="https://github.com/legeling">@legeling</a> · 카테고리: 게임 캐릭터 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- silver-wolf--lingxiaotian</code><br><br><a href="https://q.dog/pets/silver-wolf--lingxiaotian">전체 동작 보기 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/silver-wolf--lingxiaotian"><img src="https://q.dog/assets/previews/silver-wolf--lingxiaotian/thumbnail.png" alt="Silver Wolf 미리 보기" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/sonetto--chenxin-dlut"><img src="https://q.dog/assets/previews/sonetto--chenxin-dlut/thumbnail.png" alt="Sonetto 미리 보기" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/sonetto--chenxin-dlut">Sonetto</a></strong><br>제작자: <a href="https://github.com/chenxin-dlut">@chenxin-dlut</a> · 카테고리: 게임 캐릭터 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- sonetto--chenxin-dlut</code><br><br><a href="https://q.dog/pets/sonetto--chenxin-dlut">전체 동작 보기 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/sparkle--lingxiaotian">Sparkle</a></strong><br>제작자: <a href="https://github.com/legeling">@legeling</a> · 카테고리: 게임 캐릭터 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- sparkle--lingxiaotian</code><br><br><a href="https://q.dog/pets/sparkle--lingxiaotian">전체 동작 보기 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/sparkle--lingxiaotian"><img src="https://q.dog/assets/previews/sparkle--lingxiaotian/thumbnail.png" alt="Sparkle 미리 보기" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/susuta--xiangzi529"><img src="https://q.dog/assets/previews/susuta--xiangzi529/thumbnail.png" alt="Susuta 미리 보기" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/susuta--xiangzi529">Susuta</a></strong><br>제작자: <a href="https://github.com/Xiangzi529">@Xiangzi529</a> · 카테고리: 게임 캐릭터 · 버전: v2<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- susuta--xiangzi529</code><br><br><a href="https://q.dog/pets/susuta--xiangzi529">전체 동작 보기 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/tingyun--lingxiaotian">Tingyun</a></strong><br>제작자: <a href="https://github.com/legeling">@legeling</a> · 카테고리: 게임 캐릭터 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- tingyun--lingxiaotian</code><br><br><a href="https://q.dog/pets/tingyun--lingxiaotian">전체 동작 보기 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/tingyun--lingxiaotian"><img src="https://q.dog/assets/previews/tingyun--lingxiaotian/thumbnail.png" alt="Tingyun 미리 보기" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/vertin--chenxin-dlut"><img src="https://q.dog/assets/previews/vertin--chenxin-dlut/thumbnail.png" alt="Vertin 미리 보기" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/vertin--chenxin-dlut">Vertin</a></strong><br>제작자: <a href="https://github.com/chenxin-dlut">@chenxin-dlut</a> · 카테고리: 게임 캐릭터 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- vertin--chenxin-dlut</code><br><br><a href="https://q.dog/pets/vertin--chenxin-dlut">전체 동작 보기 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/yoimiya--chenxin-dlut">Yoimiya</a></strong><br>제작자: <a href="https://github.com/chenxin-dlut">@chenxin-dlut</a> · 카테고리: 게임 캐릭터 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- yoimiya--chenxin-dlut</code><br><br><a href="https://q.dog/pets/yoimiya--chenxin-dlut">전체 동작 보기 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/yoimiya--chenxin-dlut"><img src="https://q.dog/assets/previews/yoimiya--chenxin-dlut/thumbnail.png" alt="Yoimiya 미리 보기" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/zani--chenxin-dlut"><img src="https://q.dog/assets/previews/zani--chenxin-dlut/thumbnail.png" alt="Zani 미리 보기" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/zani--chenxin-dlut">Zani</a></strong><br>제작자: <a href="https://github.com/chenxin-dlut">@chenxin-dlut</a> · 카테고리: 게임 캐릭터 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- zani--chenxin-dlut</code><br><br><a href="https://q.dog/pets/zani--chenxin-dlut">전체 동작 보기 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/yae-miko--legeling">八重神子</a></strong><br>제작자: <a href="https://github.com/legeling">@legeling</a> · 카테고리: 게임 캐릭터 · 버전: v2<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- yae-miko--legeling</code><br><br><a href="https://q.dog/pets/yae-miko--legeling">전체 동작 보기 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/yae-miko--legeling"><img src="https://q.dog/assets/previews/yae-miko--legeling/thumbnail.png" alt="八重神子 미리 보기" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/dnf-female-ammo--qunboo"><img src="https://q.dog/assets/previews/dnf-female-ammo--qunboo/thumbnail.png" alt="女弹药Q 미리 보기" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/dnf-female-ammo--qunboo">女弹药Q</a></strong><br>제작자: <a href="https://github.com/QunBoo">@QunBoo</a> · 카테고리: 게임 캐릭터 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- dnf-female-ammo--qunboo</code><br><br><a href="https://q.dog/pets/dnf-female-ammo--qunboo">전체 동작 보기 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/new-covenant-exusiai--chenxin-dlut">新约能天使</a></strong><br>제작자: <a href="https://github.com/chenxin-dlut">@chenxin-dlut</a> · 카테고리: 게임 캐릭터 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- new-covenant-exusiai--chenxin-dlut</code><br><br><a href="https://q.dog/pets/new-covenant-exusiai--chenxin-dlut">전체 동작 보기 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/new-covenant-exusiai--chenxin-dlut"><img src="https://q.dog/assets/previews/new-covenant-exusiai--chenxin-dlut/thumbnail.png" alt="新约能天使 미리 보기" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/regulus-star-antimony--chenxin-dlut"><img src="https://q.dog/assets/previews/regulus-star-antimony--chenxin-dlut/thumbnail.png" alt="星锑 미리 보기" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/regulus-star-antimony--chenxin-dlut">星锑</a></strong><br>제작자: <a href="https://github.com/chenxin-dlut">@chenxin-dlut</a> · 카테고리: 게임 캐릭터 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- regulus-star-antimony--chenxin-dlut</code><br><br><a href="https://q.dog/pets/regulus-star-antimony--chenxin-dlut">전체 동작 보기 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/youmu--ai-generated">魂魄妖梦</a></strong><br>제작자: @ai-generated · 카테고리: 게임 캐릭터 · 버전: v2<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- youmu--ai-generated</code><br><br><a href="https://q.dog/pets/youmu--ai-generated">전체 동작 보기 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/youmu--ai-generated"><img src="https://q.dog/assets/previews/youmu--ai-generated/thumbnail.png" alt="魂魄妖梦 미리 보기" width="160" height="173"></a></td></tr>
</table>

### 애니메이션 캐릭터

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/zero-two--mingqingmozhao"><img src="https://q.dog/assets/previews/zero-two--mingqingmozhao/thumbnail.png" alt="02 미리 보기" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/zero-two--mingqingmozhao">02</a></strong><br>제작자: @mingqingmozhao · 카테고리: 애니메이션 캐릭터 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- zero-two--mingqingmozhao</code><br><br><a href="https://q.dog/pets/zero-two--mingqingmozhao">전체 동작 보기 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/anya--chenxin-dlut">Anya</a></strong><br>제작자: <a href="https://github.com/chenxin-dlut">@chenxin-dlut</a> · 카테고리: 애니메이션 캐릭터 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- anya--chenxin-dlut</code><br><br><a href="https://q.dog/pets/anya--chenxin-dlut">전체 동작 보기 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/anya--chenxin-dlut"><img src="https://q.dog/assets/previews/anya--chenxin-dlut/thumbnail.png" alt="Anya 미리 보기" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/asuka--maxg24"><img src="https://q.dog/assets/previews/asuka--maxg24/thumbnail.png" alt="Asuka 미리 보기" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/asuka--maxg24">Asuka</a></strong><br>제작자: <a href="https://codex-pets.net/users/maxg24">@maxg24</a> · 카테고리: 애니메이션 캐릭터 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- asuka--maxg24</code><br><br><a href="https://q.dog/pets/asuka--maxg24">전체 동작 보기 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/chibi-rei-pet--bendy">Chibi Rei Pet</a></strong><br>제작자: @Bendy · 카테고리: 애니메이션 캐릭터 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- chibi-rei-pet--bendy</code><br><br><a href="https://q.dog/pets/chibi-rei-pet--bendy">전체 동작 보기 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/chibi-rei-pet--bendy"><img src="https://q.dog/assets/previews/chibi-rei-pet--bendy/thumbnail.png" alt="Chibi Rei Pet 미리 보기" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/chotu--makriman"><img src="https://q.dog/assets/previews/chotu--makriman/thumbnail.png" alt="Chotu 미리 보기" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/chotu--makriman">Chotu</a></strong><br>제작자: <a href="https://github.com/makriman">@makriman</a> · 카테고리: 애니메이션 캐릭터 · 버전: v2<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- chotu--makriman</code><br><br><a href="https://q.dog/pets/chotu--makriman">전체 동작 보기 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/conan--chenxin-dlut">Conan</a></strong><br>제작자: <a href="https://github.com/chenxin-dlut">@chenxin-dlut</a> · 카테고리: 애니메이션 캐릭터 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- conan--chenxin-dlut</code><br><br><a href="https://q.dog/pets/conan--chenxin-dlut">전체 동작 보기 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/conan--chenxin-dlut"><img src="https://q.dog/assets/previews/conan--chenxin-dlut/thumbnail.png" alt="Conan 미리 보기" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/doraemon--xueshi"><img src="https://q.dog/assets/previews/doraemon--xueshi/thumbnail.png" alt="Doraemon 미리 보기" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/doraemon--xueshi">Doraemon</a></strong><br>제작자: <a href="https://codex-pets.net/users/xueshi">@xueshi</a> · 카테고리: 애니메이션 캐릭터 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- doraemon--xueshi</code><br><br><a href="https://q.dog/pets/doraemon--xueshi">전체 동작 보기 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/elaina--nyakku-shigure">Elaina</a></strong><br>제작자: <a href="https://codex-pets.net/users/nyakku-shigure">@nyakku-shigure</a> · 카테고리: 애니메이션 캐릭터 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- elaina--nyakku-shigure</code><br><br><a href="https://q.dog/pets/elaina--nyakku-shigure">전체 동작 보기 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/elaina--nyakku-shigure"><img src="https://q.dog/assets/previews/elaina--nyakku-shigure/thumbnail.png" alt="Elaina 미리 보기" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/eren--ash-sw"><img src="https://q.dog/assets/previews/eren--ash-sw/thumbnail.png" alt="Eren 미리 보기" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/eren--ash-sw">Eren</a></strong><br>제작자: <a href="https://codex-pets.net/users/ash-sw">@ash-sw</a> · 카테고리: 애니메이션 캐릭터 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- eren--ash-sw</code><br><br><a href="https://q.dog/pets/eren--ash-sw">전체 동작 보기 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/frieren--lingxiaotian">Frieren</a></strong><br>제작자: <a href="https://github.com/legeling">@legeling</a> · 카테고리: 애니메이션 캐릭터 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- frieren--lingxiaotian</code><br><br><a href="https://q.dog/pets/frieren--lingxiaotian">전체 동작 보기 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/frieren--lingxiaotian"><img src="https://q.dog/assets/previews/frieren--lingxiaotian/thumbnail.png" alt="Frieren 미리 보기" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/gojo--lilokhalikfa"><img src="https://q.dog/assets/previews/gojo--lilokhalikfa/thumbnail.png" alt="Gojo 미리 보기" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/gojo--lilokhalikfa">Gojo</a></strong><br>제작자: <a href="https://codex-pets.net/users/lilokhalikfa">@lilokhalikfa</a> · 카테고리: 애니메이션 캐릭터 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- gojo--lilokhalikfa</code><br><br><a href="https://q.dog/pets/gojo--lilokhalikfa">전체 동작 보기 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/ikaros--icarus-alpha">Ikaros</a></strong><br>제작자: <a href="https://codex-pets.net/users/icarus-alpha">@icarus-alpha</a> · 카테고리: 애니메이션 캐릭터 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- ikaros--icarus-alpha</code><br><br><a href="https://q.dog/pets/ikaros--icarus-alpha">전체 동작 보기 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/ikaros--icarus-alpha"><img src="https://q.dog/assets/previews/ikaros--icarus-alpha/thumbnail.png" alt="Ikaros 미리 보기" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/isekaijoucho--siiverash"><img src="https://q.dog/assets/previews/isekaijoucho--siiverash/thumbnail.png" alt="Isekaijoucho 미리 보기" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/isekaijoucho--siiverash">Isekaijoucho</a></strong><br>제작자: <a href="https://github.com/SiIverAsh">@SiIverAsh</a> · 카테고리: 애니메이션 캐릭터 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- isekaijoucho--siiverash</code><br><br><a href="https://q.dog/pets/isekaijoucho--siiverash">전체 동작 보기 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/jolyne-cujoh--d2682787206-sys">Jolyne Cujoh</a></strong><br>제작자: <a href="https://github.com/d2682787206-sys">@d2682787206-sys</a> · 카테고리: 애니메이션 캐릭터 · 버전: v2<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- jolyne-cujoh--d2682787206-sys</code><br><br><a href="https://q.dog/pets/jolyne-cujoh--d2682787206-sys">전체 동작 보기 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/jolyne-cujoh--d2682787206-sys"><img src="https://q.dog/assets/previews/jolyne-cujoh--d2682787206-sys/thumbnail.png" alt="Jolyne Cujoh 미리 보기" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/kaiju-no-8--terry878"><img src="https://q.dog/assets/previews/kaiju-no-8--terry878/thumbnail.png" alt="Kaiju No. 8 미리 보기" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/kaiju-no-8--terry878">Kaiju No. 8</a></strong><br>제작자: @TERRY878 · 카테고리: 애니메이션 캐릭터 · 버전: v2<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- kaiju-no-8--terry878</code><br><br><a href="https://q.dog/pets/kaiju-no-8--terry878">전체 동작 보기 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/kid--chenxin-dlut">Kid</a></strong><br>제작자: <a href="https://github.com/chenxin-dlut">@chenxin-dlut</a> · 카테고리: 애니메이션 캐릭터 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- kid--chenxin-dlut</code><br><br><a href="https://q.dog/pets/kid--chenxin-dlut">전체 동작 보기 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/kid--chenxin-dlut"><img src="https://q.dog/assets/previews/kid--chenxin-dlut/thumbnail.png" alt="Kid 미리 보기" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/kid-goku--julianhuang"><img src="https://q.dog/assets/previews/kid-goku--julianhuang/thumbnail.png" alt="Kid Goku 미리 보기" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/kid-goku--julianhuang">Kid Goku</a></strong><br>제작자: <a href="https://codex-pets.net/users/julianhuang">@julianhuang</a> · 카테고리: 애니메이션 캐릭터 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- kid-goku--julianhuang</code><br><br><a href="https://q.dog/pets/kid-goku--julianhuang">전체 동작 보기 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/levi--emrecb">Levi</a></strong><br>제작자: <a href="https://codex-pets.net/users/emrecb">@emrecb</a> · 카테고리: 애니메이션 캐릭터 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- levi--emrecb</code><br><br><a href="https://q.dog/pets/levi--emrecb">전체 동작 보기 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/levi--emrecb"><img src="https://q.dog/assets/previews/levi--emrecb/thumbnail.png" alt="Levi 미리 보기" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/luffy-gear-5--jordsshmords1"><img src="https://q.dog/assets/previews/luffy-gear-5--jordsshmords1/thumbnail.png" alt="Luffy Gear 5 미리 보기" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/luffy-gear-5--jordsshmords1">Luffy Gear 5</a></strong><br>제작자: <a href="https://codex-pets.net/users/jordsshmords1">@jordsshmords1</a> · 카테고리: 애니메이션 캐릭터 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- luffy-gear-5--jordsshmords1</code><br><br><a href="https://q.dog/pets/luffy-gear-5--jordsshmords1">전체 동작 보기 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/mahiro--lingxiaotian">Mahiro</a></strong><br>제작자: <a href="https://github.com/legeling">@legeling</a> · 카테고리: 애니메이션 캐릭터 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- mahiro--lingxiaotian</code><br><br><a href="https://q.dog/pets/mahiro--lingxiaotian">전체 동작 보기 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/mahiro--lingxiaotian"><img src="https://q.dog/assets/previews/mahiro--lingxiaotian/thumbnail.png" alt="Mahiro 미리 보기" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/makima-coat--yuyuabc1"><img src="https://q.dog/assets/previews/makima-coat--yuyuabc1/thumbnail.png" alt="Makima (Coat) 미리 보기" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/makima-coat--yuyuabc1">Makima (Coat)</a></strong><br>제작자: <a href="https://github.com/yuyuabc1">@yuyuabc1</a> · 카테고리: 애니메이션 캐릭터 · 버전: v2<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- makima-coat--yuyuabc1</code><br><br><a href="https://q.dog/pets/makima-coat--yuyuabc1">전체 동작 보기 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/makimamini--1sh1ro">MakimaMini</a></strong><br>제작자: @1sh1ro · 카테고리: 애니메이션 캐릭터 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- makimamini--1sh1ro</code><br><br><a href="https://q.dog/pets/makimamini--1sh1ro">전체 동작 보기 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/makimamini--1sh1ro"><img src="https://q.dog/assets/previews/makimamini--1sh1ro/thumbnail.png" alt="MakimaMini 미리 보기" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/makisekurisu--m1gr4ine"><img src="https://q.dog/assets/previews/makisekurisu--m1gr4ine/thumbnail.png" alt="Makise Kurisu 미리 보기" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/makisekurisu--m1gr4ine">Makise Kurisu</a></strong><br>제작자: @m1gr4ine · 카테고리: 애니메이션 캐릭터 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- makisekurisu--m1gr4ine</code><br><br><a href="https://q.dog/pets/makisekurisu--m1gr4ine">전체 동작 보기 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/mihari--hyoni1129">Mihari</a></strong><br>제작자: <a href="https://github.com/Hyoni1129">@Hyoni1129</a> · 카테고리: 애니메이션 캐릭터 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- mihari--hyoni1129</code><br><br><a href="https://q.dog/pets/mihari--hyoni1129">전체 동작 보기 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/mihari--hyoni1129"><img src="https://q.dog/assets/previews/mihari--hyoni1129/thumbnail.png" alt="Mihari 미리 보기" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/mikoto--lingxiaotian"><img src="https://q.dog/assets/previews/mikoto--lingxiaotian/thumbnail.png" alt="Mikoto 미리 보기" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/mikoto--lingxiaotian">Mikoto</a></strong><br>제작자: <a href="https://github.com/legeling">@legeling</a> · 카테고리: 애니메이션 캐릭터 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- mikoto--lingxiaotian</code><br><br><a href="https://q.dog/pets/mikoto--lingxiaotian">전체 동작 보기 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/miku--lingxiaotian">Miku</a></strong><br>제작자: <a href="https://github.com/legeling">@legeling</a> · 카테고리: 애니메이션 캐릭터 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- miku--lingxiaotian</code><br><br><a href="https://q.dog/pets/miku--lingxiaotian">전체 동작 보기 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/miku--lingxiaotian"><img src="https://q.dog/assets/previews/miku--lingxiaotian/thumbnail.png" alt="Miku 미리 보기" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/misaka-network--ldl1234"><img src="https://q.dog/assets/previews/misaka-network--ldl1234/thumbnail.png" alt="Misaka Network 미리 보기" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/misaka-network--ldl1234">Misaka Network</a></strong><br>제작자: <a href="https://github.com/ldl1234">@ldl1234</a> · 카테고리: 애니메이션 캐릭터 · 버전: v2<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- misaka-network--ldl1234</code><br><br><a href="https://q.dog/pets/misaka-network--ldl1234">전체 동작 보기 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/nimbus--soraberu">Nimbus</a></strong><br>제작자: <a href="https://codex-pets.net/users/soraberu">@soraberu</a> · 카테고리: 애니메이션 캐릭터 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- nimbus--soraberu</code><br><br><a href="https://q.dog/pets/nimbus--soraberu">전체 동작 보기 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/nimbus--soraberu"><img src="https://q.dog/assets/previews/nimbus--soraberu/thumbnail.png" alt="Nimbus 미리 보기" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/rem--l1"><img src="https://q.dog/assets/previews/rem--l1/thumbnail.png" alt="Rem 미리 보기" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/rem--l1">Rem</a></strong><br>제작자: <a href="https://codex-pets.net/users/l1">@l1</a> · 카테고리: 애니메이션 캐릭터 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- rem--l1</code><br><br><a href="https://q.dog/pets/rem--l1">전체 동작 보기 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/rinami--siiverash">Rinami Himesaki</a></strong><br>제작자: <a href="https://github.com/SiIverAsh">@SiIverAsh</a> · 카테고리: 애니메이션 캐릭터 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- rinami--siiverash</code><br><br><a href="https://q.dog/pets/rinami--siiverash">전체 동작 보기 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/rinami--siiverash"><img src="https://q.dog/assets/previews/rinami--siiverash/thumbnail.png" alt="Rinami Himesaki 미리 보기" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/roxy-pixel--gravity"><img src="https://q.dog/assets/previews/roxy-pixel--gravity/thumbnail.png" alt="Roxy Pixel 미리 보기" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/roxy-pixel--gravity">Roxy Pixel</a></strong><br>제작자: @gravity · 카테고리: 애니메이션 캐릭터 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- roxy-pixel--gravity</code><br><br><a href="https://q.dog/pets/roxy-pixel--gravity">전체 동작 보기 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/saber--petdex-zhenyou-ling">Saber</a></strong><br>제작자: @真宵 绫. · 카테고리: 애니메이션 캐릭터 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- saber--petdex-zhenyou-ling</code><br><br><a href="https://q.dog/pets/saber--petdex-zhenyou-ling">전체 동작 보기 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/saber--petdex-zhenyou-ling"><img src="https://q.dog/assets/previews/saber--petdex-zhenyou-ling/thumbnail.png" alt="Saber 미리 보기" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/gintoki-pixel--yuu-m"><img src="https://q.dog/assets/previews/gintoki-pixel--yuu-m/thumbnail.png" alt="Sakata Gintoki 미리 보기" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/gintoki-pixel--yuu-m">Sakata Gintoki</a></strong><br>제작자: @Yuu M. · 카테고리: 애니메이션 캐릭터 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- gintoki-pixel--yuu-m</code><br><br><a href="https://q.dog/pets/gintoki-pixel--yuu-m">전체 동작 보기 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/shinchan--chenxin-dlut">Shinchan</a></strong><br>제작자: <a href="https://github.com/chenxin-dlut">@chenxin-dlut</a> · 카테고리: 애니메이션 캐릭터 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- shinchan--chenxin-dlut</code><br><br><a href="https://q.dog/pets/shinchan--chenxin-dlut">전체 동작 보기 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/shinchan--chenxin-dlut"><img src="https://q.dog/assets/previews/shinchan--chenxin-dlut/thumbnail.png" alt="Shinchan 미리 보기" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/takamatsu-tomori--a1wace-dev"><img src="https://q.dog/assets/previews/takamatsu-tomori--a1wace-dev/thumbnail.png" alt="Takamatsu Tomori 미리 보기" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/takamatsu-tomori--a1wace-dev">Takamatsu Tomori</a></strong><br>제작자: @A1wace-dev · 카테고리: 애니메이션 캐릭터 · 버전: v2<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- takamatsu-tomori--a1wace-dev</code><br><br><a href="https://q.dog/pets/takamatsu-tomori--a1wace-dev">전체 동작 보기 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/violet--lazenca">Violet</a></strong><br>제작자: <a href="https://codex-pets.net/users/lazenca">@lazenca</a> · 카테고리: 애니메이션 캐릭터 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- violet--lazenca</code><br><br><a href="https://q.dog/pets/violet--lazenca">전체 동작 보기 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/violet--lazenca"><img src="https://q.dog/assets/previews/violet--lazenca/thumbnail.png" alt="Violet 미리 보기" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/wakaba-mutsumi--carambola"><img src="https://q.dog/assets/previews/wakaba-mutsumi--carambola/thumbnail.png" alt="Wakaba Mutsumi 미리 보기" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/wakaba-mutsumi--carambola">Wakaba Mutsumi</a></strong><br>제작자: @Carambola · 카테고리: 애니메이션 캐릭터 · 버전: v2<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- wakaba-mutsumi--carambola</code><br><br><a href="https://q.dog/pets/wakaba-mutsumi--carambola">전체 동작 보기 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/inosuke-hashibira--wangfan002">伊之助 Q版 丰富动作</a></strong><br>제작자: @wangfan002 · 카테고리: 애니메이션 캐릭터 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- inosuke-hashibira--wangfan002</code><br><br><a href="https://q.dog/pets/inosuke-hashibira--wangfan002">전체 동작 보기 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/inosuke-hashibira--wangfan002"><img src="https://q.dog/assets/previews/inosuke-hashibira--wangfan002/thumbnail.png" alt="伊之助 Q版 丰富动作 미리 보기" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/nangong-wan--bpup"><img src="https://q.dog/assets/previews/nangong-wan--bpup/thumbnail.png" alt="南宫婉 미리 보기" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/nangong-wan--bpup">南宫婉</a></strong><br>제작자: <a href="https://github.com/bpup">@bpup</a> · 카테고리: 애니메이션 캐릭터 · 버전: v2<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- nangong-wan--bpup</code><br><br><a href="https://q.dog/pets/nangong-wan--bpup">전체 동작 보기 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/zenitsu-agatsuma--wangfan002">善逸 Q版 丰富动作</a></strong><br>제작자: @wangfan002 · 카테고리: 애니메이션 캐릭터 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- zenitsu-agatsuma--wangfan002</code><br><br><a href="https://q.dog/pets/zenitsu-agatsuma--wangfan002">전체 동작 보기 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/zenitsu-agatsuma--wangfan002"><img src="https://q.dog/assets/previews/zenitsu-agatsuma--wangfan002/thumbnail.png" alt="善逸 Q版 丰富动作 미리 보기" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/giyu-tomioka--wangfan002"><img src="https://q.dog/assets/previews/giyu-tomioka--wangfan002/thumbnail.png" alt="富冈义勇 Q版 丰富动作 미리 보기" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/giyu-tomioka--wangfan002">富冈义勇 Q版 丰富动作</a></strong><br>제작자: @wangfan002 · 카테고리: 애니메이션 캐릭터 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- giyu-tomioka--wangfan002</code><br><br><a href="https://q.dog/pets/giyu-tomioka--wangfan002">전체 동작 보기 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/muichiro-tokito--wangfan002">时透无一郎 Q版 空灵动作</a></strong><br>제작자: @wangfan002 · 카테고리: 애니메이션 캐릭터 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- muichiro-tokito--wangfan002</code><br><br><a href="https://q.dog/pets/muichiro-tokito--wangfan002">전체 동작 보기 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/muichiro-tokito--wangfan002"><img src="https://q.dog/assets/previews/muichiro-tokito--wangfan002/thumbnail.png" alt="时透无一郎 Q版 空灵动作 미리 보기" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/tanjiro-kamado--wangfan002"><img src="https://q.dog/assets/previews/tanjiro-kamado--wangfan002/thumbnail.png" alt="炭治郎 Q版 丰富动作 미리 보기" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/tanjiro-kamado--wangfan002">炭治郎 Q版 丰富动作</a></strong><br>제작자: @wangfan002 · 카테고리: 애니메이션 캐릭터 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- tanjiro-kamado--wangfan002</code><br><br><a href="https://q.dog/pets/tanjiro-kamado--wangfan002">전체 동작 보기 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/nezuko-kamado--wangfan002">祢豆子 Q版 丰富动作</a></strong><br>제작자: @wangfan002 · 카테고리: 애니메이션 캐릭터 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- nezuko-kamado--wangfan002</code><br><br><a href="https://q.dog/pets/nezuko-kamado--wangfan002">전체 동작 보기 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/nezuko-kamado--wangfan002"><img src="https://q.dog/assets/previews/nezuko-kamado--wangfan002/thumbnail.png" alt="祢豆子 Q版 丰富动作 미리 보기" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/shinobu-kocho--wangfan002"><img src="https://q.dog/assets/previews/shinobu-kocho--wangfan002/thumbnail.png" alt="蝴蝶忍 Q版 华丽动作 미리 보기" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/shinobu-kocho--wangfan002">蝴蝶忍 Q版 华丽动作</a></strong><br>제작자: @wangfan002 · 카테고리: 애니메이션 캐릭터 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- shinobu-kocho--wangfan002</code><br><br><a href="https://q.dog/pets/shinobu-kocho--wangfan002">전체 동작 보기 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/bocchi--lingxiaotian">Bocchi</a></strong><br>제작자: <a href="https://github.com/legeling">@legeling</a> · 카테고리: 애니메이션 캐릭터 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- bocchi--lingxiaotian</code><br><br><a href="https://q.dog/pets/bocchi--lingxiaotian">전체 동작 보기 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/bocchi--lingxiaotian"><img src="https://q.dog/assets/previews/bocchi--lingxiaotian/thumbnail.png" alt="Bocchi 미리 보기" width="160" height="173"></a></td></tr>
</table>

### 오리지널 캐릭터

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/aiko--chenxin-dlut"><img src="https://q.dog/assets/previews/aiko--chenxin-dlut/thumbnail.png" alt="Aiko 미리 보기" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/aiko--chenxin-dlut">Aiko</a></strong><br>제작자: <a href="https://github.com/chenxin-dlut">@chenxin-dlut</a> · 카테고리: 오리지널 캐릭터 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- aiko--chenxin-dlut</code><br><br><a href="https://q.dog/pets/aiko--chenxin-dlut">전체 동작 보기 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/diana--am">Diana</a></strong><br>제작자: @am · 카테고리: 오리지널 캐릭터 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- diana--am</code><br><br><a href="https://q.dog/pets/diana--am">전체 동작 보기 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/diana--am"><img src="https://q.dog/assets/previews/diana--am/thumbnail.png" alt="Diana 미리 보기" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/hajimi--zeyuwang1999"><img src="https://q.dog/assets/previews/hajimi--zeyuwang1999/thumbnail.png" alt="Hajimi 미리 보기" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/hajimi--zeyuwang1999">Hajimi</a></strong><br>제작자: <a href="https://github.com/zeyuwang1999">@zeyuwang1999</a> · 카테고리: 오리지널 캐릭터 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- hajimi--zeyuwang1999</code><br><br><a href="https://q.dog/pets/hajimi--zeyuwang1999">전체 동작 보기 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/hamo--haipengzzz">Hamo</a></strong><br>제작자: <a href="https://github.com/haipengzzz">@haipengzzz</a> · 카테고리: 오리지널 캐릭터 · 버전: v2<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- hamo--haipengzzz</code><br><br><a href="https://q.dog/pets/hamo--haipengzzz">전체 동작 보기 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/hamo--haipengzzz"><img src="https://q.dog/assets/previews/hamo--haipengzzz/thumbnail.png" alt="Hamo 미리 보기" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/hana2--initiatione"><img src="https://q.dog/assets/previews/hana2--initiatione/thumbnail.png" alt="Hana2 미리 보기" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/hana2--initiatione">Hana2</a></strong><br>제작자: <a href="https://github.com/initiatione">@initiatione</a> · 카테고리: 오리지널 캐릭터 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- hana2--initiatione</code><br><br><a href="https://q.dog/pets/hana2--initiatione">전체 동작 보기 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/iris--yau-427">Iris</a></strong><br>제작자: <a href="https://github.com/Yau-427">@Yau-427</a> · 카테고리: 오리지널 캐릭터 · 버전: v2<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- iris--yau-427</code><br><br><a href="https://q.dog/pets/iris--yau-427">전체 동작 보기 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/iris--yau-427"><img src="https://q.dog/assets/previews/iris--yau-427/thumbnail.png" alt="Iris 미리 보기" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/jesse-the-fox--itjesse"><img src="https://q.dog/assets/previews/jesse-the-fox--itjesse/thumbnail.png" alt="JesseTheFox 미리 보기" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/jesse-the-fox--itjesse">JesseTheFox</a></strong><br>제작자: <a href="https://github.com/ITJesse">@ITJesse</a> · 카테고리: 오리지널 캐릭터 · 버전: v2<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- jesse-the-fox--itjesse</code><br><br><a href="https://q.dog/pets/jesse-the-fox--itjesse">전체 동작 보기 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/joker--oytyo">Joker</a></strong><br>제작자: @oytyo · 카테고리: 오리지널 캐릭터 · 버전: v2<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- joker--oytyo</code><br><br><a href="https://q.dog/pets/joker--oytyo">전체 동작 보기 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/joker--oytyo"><img src="https://q.dog/assets/previews/joker--oytyo/thumbnail.png" alt="Joker 미리 보기" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/linnea--nyakku-shigure"><img src="https://q.dog/assets/previews/linnea--nyakku-shigure/thumbnail.png" alt="Linnea 미리 보기" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/linnea--nyakku-shigure">Linnea</a></strong><br>제작자: @nyakku-shigure · 카테고리: 오리지널 캐릭터 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- linnea--nyakku-shigure</code><br><br><a href="https://q.dog/pets/linnea--nyakku-shigure">전체 동작 보기 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/mika--rotl24">Mika</a></strong><br>제작자: <a href="https://github.com/ROTl24">@ROTl24</a> · 카테고리: 오리지널 캐릭터 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- mika--rotl24</code><br><br><a href="https://q.dog/pets/mika--rotl24">전체 동작 보기 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/mika--rotl24"><img src="https://q.dog/assets/previews/mika--rotl24/thumbnail.png" alt="Mika 미리 보기" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/minty--somnusochi"><img src="https://q.dog/assets/previews/minty--somnusochi/thumbnail.png" alt="Minty 미리 보기" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/minty--somnusochi">Minty</a></strong><br>제작자: <a href="https://github.com/Somnusochi">@Somnusochi</a> · 카테고리: 오리지널 캐릭터 · 버전: v2<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- minty--somnusochi</code><br><br><a href="https://q.dog/pets/minty--somnusochi">전체 동작 보기 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/ruruka--ltmcliao-cmyk">RuRuKa</a></strong><br>제작자: <a href="https://github.com/ltmcliao-cmyk">@ltmcliao-cmyk</a> · 카테고리: 오리지널 캐릭터 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- ruruka--ltmcliao-cmyk</code><br><br><a href="https://q.dog/pets/ruruka--ltmcliao-cmyk">전체 동작 보기 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/ruruka--ltmcliao-cmyk"><img src="https://q.dog/assets/previews/ruruka--ltmcliao-cmyk/thumbnail.png" alt="RuRuKa 미리 보기" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/shian-helper--mistyshen"><img src="https://q.dog/assets/previews/shian-helper--mistyshen/thumbnail.png" alt="Shian 미리 보기" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/shian-helper--mistyshen">Shian</a></strong><br>제작자: <a href="https://github.com/mistyShen">@mistyShen</a> · 카테고리: 오리지널 캐릭터 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- shian-helper--mistyshen</code><br><br><a href="https://q.dog/pets/shian-helper--mistyshen">전체 동작 보기 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/yier--gbn666">Yi Er</a></strong><br>제작자: <a href="https://github.com/gbn666">@gbn666</a> · 카테고리: 오리지널 캐릭터 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- yier--gbn666</code><br><br><a href="https://q.dog/pets/yier--gbn666">전체 동작 보기 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/yier--gbn666"><img src="https://q.dog/assets/previews/yier--gbn666/thumbnail.png" alt="Yi Er 미리 보기" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/yume-boundary--andy-meow"><img src="https://q.dog/assets/previews/yume-boundary--andy-meow/thumbnail.png" alt="Yume 미리 보기" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/yume-boundary--andy-meow">Yume</a></strong><br>제작자: @andy-meow · 카테고리: 오리지널 캐릭터 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- yume-boundary--andy-meow</code><br><br><a href="https://q.dog/pets/yume-boundary--andy-meow">전체 동작 보기 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/yuzubou--keseras34938976">Yuzubou</a></strong><br>제작자: <a href="https://github.com/Keseras34938976">@Keseras34938976</a> · 카테고리: 오리지널 캐릭터 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- yuzubou--keseras34938976</code><br><br><a href="https://q.dog/pets/yuzubou--keseras34938976">전체 동작 보기 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/yuzubou--keseras34938976"><img src="https://q.dog/assets/previews/yuzubou--keseras34938976/thumbnail.png" alt="Yuzubou 미리 보기" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/gudong--rank"><img src="https://q.dog/assets/previews/gudong--rank/thumbnail.png" alt="咕咚 미리 보기" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/gudong--rank">咕咚</a></strong><br>제작자: @Rank · 카테고리: 오리지널 캐릭터 · 버전: v2<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- gudong--rank</code><br><br><a href="https://q.dog/pets/gudong--rank">전체 동작 보기 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/liubao--killyer">榴宝</a></strong><br>제작자: @killyer · 카테고리: 오리지널 캐릭터 · 버전: v2<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- liubao--killyer</code><br><br><a href="https://q.dog/pets/liubao--killyer">전체 동작 보기 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/liubao--killyer"><img src="https://q.dog/assets/previews/liubao--killyer/thumbnail.png" alt="榴宝 미리 보기" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/feibi--vanfff"><img src="https://q.dog/assets/previews/feibi--vanfff/thumbnail.png" alt="菲比 미리 보기" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/feibi--vanfff">菲比</a></strong><br>제작자: @vanfff · 카테고리: 오리지널 캐릭터 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- feibi--vanfff</code><br><br><a href="https://q.dog/pets/feibi--vanfff">전체 동작 보기 →</a></td></tr>
</table>

### 마스코트

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/aemeath-mini--cunuo">Aemeath Mini</a></strong><br>제작자: <a href="https://github.com/cuNuo">@cuNuo</a> · 카테고리: 마스코트 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- aemeath-mini--cunuo</code><br><br><a href="https://q.dog/pets/aemeath-mini--cunuo">전체 동작 보기 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/aemeath-mini--cunuo"><img src="https://q.dog/assets/previews/aemeath-mini--cunuo/thumbnail.png" alt="Aemeath Mini 미리 보기" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/apu--xchangee"><img src="https://q.dog/assets/previews/apu--xchangee/thumbnail.png" alt="Apu 미리 보기" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/apu--xchangee">Apu</a></strong><br>제작자: <a href="https://github.com/xchangee">@xchangee</a> · 카테고리: 마스코트 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- apu--xchangee</code><br><br><a href="https://q.dog/pets/apu--xchangee">전체 동작 보기 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/claude--xiangking">Claude</a></strong><br>제작자: <a href="https://github.com/xiangking">@xiangking</a> · 카테고리: 마스코트 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- claude--xiangking</code><br><br><a href="https://q.dog/pets/claude--xiangking">전체 동작 보기 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/claude--xiangking"><img src="https://q.dog/assets/previews/claude--xiangking/thumbnail.png" alt="Claude 미리 보기" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/twinkle-twinkle--twinkletwinkle"><img src="https://q.dog/assets/previews/twinkle-twinkle--twinkletwinkle/thumbnail.png" alt="Dashun's Twinkle Twinkle 미리 보기" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/twinkle-twinkle--twinkletwinkle">Dashun's Twinkle Twinkle</a></strong><br>제작자: @twinkletwinkle · 카테고리: 마스코트 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- twinkle-twinkle--twinkletwinkle</code><br><br><a href="https://q.dog/pets/twinkle-twinkle--twinkletwinkle">전체 동작 보기 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/diaoyi-baobao--d1a0y1bb">Diaoyi Baobao</a></strong><br>제작자: <a href="https://github.com/D1a0y1bb">@D1a0y1bb</a> · 카테고리: 마스코트 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- diaoyi-baobao--d1a0y1bb</code><br><br><a href="https://q.dog/pets/diaoyi-baobao--d1a0y1bb">전체 동작 보기 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/diaoyi-baobao--d1a0y1bb"><img src="https://q.dog/assets/previews/diaoyi-baobao--d1a0y1bb/thumbnail.png" alt="Diaoyi Baobao 미리 보기" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/gpt-muse--opask"><img src="https://q.dog/assets/previews/gpt-muse--opask/thumbnail.png" alt="GPT-muse 미리 보기" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/gpt-muse--opask">GPT-muse</a></strong><br>제작자: @opask · 카테고리: 마스코트 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- gpt-muse--opask</code><br><br><a href="https://q.dog/pets/gpt-muse--opask">전체 동작 보기 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/lulu--yogazz">Lulu</a></strong><br>제작자: <a href="https://github.com/YoGazz">@YoGazz</a> · 카테고리: 마스코트 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- lulu--yogazz</code><br><br><a href="https://q.dog/pets/lulu--yogazz">전체 동작 보기 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/lulu--yogazz"><img src="https://q.dog/assets/previews/lulu--yogazz/thumbnail.png" alt="Lulu 미리 보기" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/saki--rookie-09"><img src="https://q.dog/assets/previews/saki--rookie-09/thumbnail.png" alt="Saki 미리 보기" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/saki--rookie-09">Saki</a></strong><br>제작자: <a href="https://github.com/rookie-09">@rookie-09</a> · 카테고리: 마스코트 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- saki--rookie-09</code><br><br><a href="https://q.dog/pets/saki--rookie-09">전체 동작 보기 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/wally--wally025">Wally</a></strong><br>제작자: <a href="https://github.com/wally025">@wally025</a> · 카테고리: 마스코트 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- wally--wally025</code><br><br><a href="https://q.dog/pets/wally--wally025">전체 동작 보기 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/wally--wally025"><img src="https://q.dog/assets/previews/wally--wally025/thumbnail.png" alt="Wally 미리 보기" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/zhengyin--noonwake"><img src="https://q.dog/assets/previews/zhengyin--noonwake/thumbnail.png" alt="Zhengyin 미리 보기" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/zhengyin--noonwake">Zhengyin</a></strong><br>제작자: <a href="https://pets.usefulmint.com/?utm_source=awesome_codex_pet&utm_medium=directory&utm_campaign=founding_five&utm_content=zhengyin_listing">@noonwake-ai</a> · 카테고리: 마스코트 · 버전: v2<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- zhengyin--noonwake</code><br><br><a href="https://q.dog/pets/zhengyin--noonwake">전체 동작 보기 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/happynailong--aquaxyy">大笑奶龙</a></strong><br>제작자: @aquaxyy · 카테고리: 마스코트 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- happynailong--aquaxyy</code><br><br><a href="https://q.dog/pets/happynailong--aquaxyy">전체 동작 보기 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/happynailong--aquaxyy"><img src="https://q.dog/assets/previews/happynailong--aquaxyy/thumbnail.png" alt="大笑奶龙 미리 보기" width="160" height="173"></a></td></tr>
</table>

### 동물 친구

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/becky--natewanggg"><img src="https://q.dog/assets/previews/becky--natewanggg/thumbnail.png" alt="Becky 미리 보기" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/becky--natewanggg">Becky</a></strong><br>제작자: <a href="https://github.com/NateWanggg">@NateWanggg</a> · 카테고리: 동물 친구 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- becky--natewanggg</code><br><br><a href="https://q.dog/pets/becky--natewanggg">전체 동작 보기 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/bubu--gbn666">Bubu</a></strong><br>제작자: <a href="https://github.com/gbn666">@gbn666</a> · 카테고리: 동물 친구 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- bubu--gbn666</code><br><br><a href="https://q.dog/pets/bubu--gbn666">전체 동작 보기 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/bubu--gbn666"><img src="https://q.dog/assets/previews/bubu--gbn666/thumbnail.png" alt="Bubu 미리 보기" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/corgi-companion--cxian0928-afk"><img src="https://q.dog/assets/previews/corgi-companion--cxian0928-afk/thumbnail.png" alt="Corgi Companion 미리 보기" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/corgi-companion--cxian0928-afk">Corgi Companion</a></strong><br>제작자: <a href="https://github.com/cxian0928-afk">@cxian0928-afk</a> · 카테고리: 동물 친구 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- corgi-companion--cxian0928-afk</code><br><br><a href="https://q.dog/pets/corgi-companion--cxian0928-afk">전체 동작 보기 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/desk-otter--zihualiu1997">Desk Otter</a></strong><br>제작자: <a href="https://github.com/zihualiu1997">@zihualiu1997</a> · 카테고리: 동물 친구 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- desk-otter--zihualiu1997</code><br><br><a href="https://q.dog/pets/desk-otter--zihualiu1997">전체 동작 보기 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/desk-otter--zihualiu1997"><img src="https://q.dog/assets/previews/desk-otter--zihualiu1997/thumbnail.png" alt="Desk Otter 미리 보기" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/diandian--lllucasxu"><img src="https://q.dog/assets/previews/diandian--lllucasxu/thumbnail.png" alt="Diandian 미리 보기" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/diandian--lllucasxu">Diandian</a></strong><br>제작자: <a href="https://github.com/LLLucasXU">@LLLucasXU</a> · 카테고리: 동물 친구 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- diandian--lllucasxu</code><br><br><a href="https://q.dog/pets/diandian--lllucasxu">전체 동작 보기 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/dudu-bubu--clembuilds">Dudu & Bubu</a></strong><br>제작자: @clembuilds · 카테고리: 동물 친구 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- dudu-bubu--clembuilds</code><br><br><a href="https://q.dog/pets/dudu-bubu--clembuilds">전체 동작 보기 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/dudu-bubu--clembuilds"><img src="https://q.dog/assets/previews/dudu-bubu--clembuilds/thumbnail.png" alt="Dudu & Bubu 미리 보기" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/ella-wave--sehjk"><img src="https://q.dog/assets/previews/ella-wave--sehjk/thumbnail.png" alt="Ella Wave 미리 보기" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/ella-wave--sehjk">Ella Wave</a></strong><br>제작자: @sehjk · 카테고리: 동물 친구 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- ella-wave--sehjk</code><br><br><a href="https://q.dog/pets/ella-wave--sehjk">전체 동작 보기 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/fleta--natewanggg">Fleta</a></strong><br>제작자: <a href="https://github.com/NateWanggg">@NateWanggg</a> · 카테고리: 동물 친구 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- fleta--natewanggg</code><br><br><a href="https://q.dog/pets/fleta--natewanggg">전체 동작 보기 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/fleta--natewanggg"><img src="https://q.dog/assets/previews/fleta--natewanggg/thumbnail.png" alt="Fleta 미리 보기" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/frankie--aygunvarol"><img src="https://q.dog/assets/previews/frankie--aygunvarol/thumbnail.png" alt="Frankie 미리 보기" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/frankie--aygunvarol">Frankie</a></strong><br>제작자: <a href="https://github.com/AygunVarol">@AygunVarol</a> · 카테고리: 동물 친구 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- frankie--aygunvarol</code><br><br><a href="https://q.dog/pets/frankie--aygunvarol">전체 동작 보기 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/jiji--yena">Jiji</a></strong><br>제작자: @yena · 카테고리: 동물 친구 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- jiji--yena</code><br><br><a href="https://q.dog/pets/jiji--yena">전체 동작 보기 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/jiji--yena"><img src="https://q.dog/assets/previews/jiji--yena/thumbnail.png" alt="Jiji 미리 보기" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/kiko--untko"><img src="https://q.dog/assets/previews/kiko--untko/thumbnail.png" alt="Kiko 미리 보기" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/kiko--untko">Kiko</a></strong><br>제작자: <a href="https://github.com/untko">@untko</a> · 카테고리: 동물 친구 · 버전: v2<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- kiko--untko</code><br><br><a href="https://q.dog/pets/kiko--untko">전체 동작 보기 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/kimoju--andiac">Kimoju</a></strong><br>제작자: @andiac · 카테고리: 동물 친구 · 버전: v2<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- kimoju--andiac</code><br><br><a href="https://q.dog/pets/kimoju--andiac">전체 동작 보기 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/kimoju--andiac"><img src="https://q.dog/assets/previews/kimoju--andiac/thumbnail.png" alt="Kimoju 미리 보기" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/lil-swole--gg0805"><img src="https://q.dog/assets/previews/lil-swole--gg0805/thumbnail.png" alt="Lil Swole 미리 보기" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/lil-swole--gg0805">Lil Swole</a></strong><br>제작자: <a href="https://github.com/gg0805">@gg0805</a> · 카테고리: 동물 친구 · 버전: v2<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- lil-swole--gg0805</code><br><br><a href="https://q.dog/pets/lil-swole--gg0805">전체 동작 보기 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/little-sheep--mingdong">Little Sheep</a></strong><br>제작자: @MingDong · 카테고리: 동물 친구 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- little-sheep--mingdong</code><br><br><a href="https://q.dog/pets/little-sheep--mingdong">전체 동작 보기 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/little-sheep--mingdong"><img src="https://q.dog/assets/previews/little-sheep--mingdong/thumbnail.png" alt="Little Sheep 미리 보기" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/mai--dwdestiny"><img src="https://q.dog/assets/previews/mai--dwdestiny/thumbnail.png" alt="Mai 미리 보기" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/mai--dwdestiny">Mai</a></strong><br>제작자: <a href="https://github.com/DwDestiny">@DwDestiny</a> · 카테고리: 동물 친구 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- mai--dwdestiny</code><br><br><a href="https://q.dog/pets/mai--dwdestiny">전체 동작 보기 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/mellow-duck--sally-entr">Mellow Duck</a></strong><br>제작자: @sally-entr · 카테고리: 동물 친구 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- mellow-duck--sally-entr</code><br><br><a href="https://q.dog/pets/mellow-duck--sally-entr">전체 동작 보기 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/mellow-duck--sally-entr"><img src="https://q.dog/assets/previews/mellow-duck--sally-entr/thumbnail.png" alt="Mellow Duck 미리 보기" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/mimi--spacebody"><img src="https://q.dog/assets/previews/mimi--spacebody/thumbnail.png" alt="Mimi 미리 보기" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/mimi--spacebody">Mimi</a></strong><br>제작자: <a href="https://github.com/Spacebody">@Spacebody</a> · 카테고리: 동물 친구 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- mimi--spacebody</code><br><br><a href="https://q.dog/pets/mimi--spacebody">전체 동작 보기 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/moomew-coder-cat--ping">MooMew Coder</a></strong><br>제작자: @ping · 카테고리: 동물 친구 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- moomew-coder-cat--ping</code><br><br><a href="https://q.dog/pets/moomew-coder-cat--ping">전체 동작 보기 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/moomew-coder-cat--ping"><img src="https://q.dog/assets/previews/moomew-coder-cat--ping/thumbnail.png" alt="MooMew Coder 미리 보기" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/panda--jason-bai"><img src="https://q.dog/assets/previews/panda--jason-bai/thumbnail.png" alt="Panda 미리 보기" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/panda--jason-bai">Panda</a></strong><br>제작자: <a href="https://github.com/Jason-Bai">@Jason-Bai</a> · 카테고리: 동물 친구 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- panda--jason-bai</code><br><br><a href="https://q.dog/pets/panda--jason-bai">전체 동작 보기 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/pixel-duck--flamurmaliqi">Pixel Duck</a></strong><br>제작자: <a href="https://github.com/FlamurMaliqi">@FlamurMaliqi</a> · 카테고리: 동물 친구 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- pixel-duck--flamurmaliqi</code><br><br><a href="https://q.dog/pets/pixel-duck--flamurmaliqi">전체 동작 보기 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/pixel-duck--flamurmaliqi"><img src="https://q.dog/assets/previews/pixel-duck--flamurmaliqi/thumbnail.png" alt="Pixel Duck 미리 보기" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/rook--klubbyte"><img src="https://q.dog/assets/previews/rook--klubbyte/thumbnail.png" alt="Rook 미리 보기" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/rook--klubbyte">Rook</a></strong><br>제작자: @klubbyte · 카테고리: 동물 친구 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- rook--klubbyte</code><br><br><a href="https://q.dog/pets/rook--klubbyte">전체 동작 보기 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/miu-meo--lemon-z">SalaryCat</a></strong><br>제작자: @lemon-z · 카테고리: 동물 친구 · 버전: v2<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- miu-meo--lemon-z</code><br><br><a href="https://q.dog/pets/miu-meo--lemon-z">전체 동작 보기 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/miu-meo--lemon-z"><img src="https://q.dog/assets/previews/miu-meo--lemon-z/thumbnail.png" alt="SalaryCat 미리 보기" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/salary-cat--zuochunjie"><img src="https://q.dog/assets/previews/salary-cat--zuochunjie/thumbnail.png" alt="SalaryCat 미리 보기" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/salary-cat--zuochunjie">SalaryCat</a></strong><br>제작자: <a href="https://github.com/Zuochunjie">@Zuochunjie</a> · 카테고리: 동물 친구 · 버전: v2<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- salary-cat--zuochunjie</code><br><br><a href="https://q.dog/pets/salary-cat--zuochunjie">전체 동작 보기 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/teddy--danieloleary">Teddy</a></strong><br>제작자: <a href="https://github.com/danieloleary">@danieloleary</a> · 카테고리: 동물 친구 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- teddy--danieloleary</code><br><br><a href="https://q.dog/pets/teddy--danieloleary">전체 동작 보기 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/teddy--danieloleary"><img src="https://q.dog/assets/previews/teddy--danieloleary/thumbnail.png" alt="Teddy 미리 보기" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/tian-hua-hua--d1a0y1bb"><img src="https://q.dog/assets/previews/tian-hua-hua--d1a0y1bb/thumbnail.png" alt="Tian Hua Hua 미리 보기" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/tian-hua-hua--d1a0y1bb">Tian Hua Hua</a></strong><br>제작자: <a href="https://github.com/D1a0y1bb">@D1a0y1bb</a> · 카테고리: 동물 친구 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- tian-hua-hua--d1a0y1bb</code><br><br><a href="https://q.dog/pets/tian-hua-hua--d1a0y1bb">전체 동작 보기 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/usachi--jack">乌萨奇</a></strong><br>제작자: @jack · 카테고리: 동물 친구 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- usachi--jack</code><br><br><a href="https://q.dog/pets/usachi--jack">전체 동작 보기 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/usachi--jack"><img src="https://q.dog/assets/previews/usachi--jack/thumbnail.png" alt="乌萨奇 미리 보기" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/dai-dai-nai-you--1wphantom"><img src="https://q.dog/assets/previews/dai-dai-nai-you--1wphantom/thumbnail.png" alt="呆呆奶油 미리 보기" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/dai-dai-nai-you--1wphantom">呆呆奶油</a></strong><br>제작자: @1wphantom · 카테고리: 동물 친구 · 버전: v2<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- dai-dai-nai-you--1wphantom</code><br><br><a href="https://q.dog/pets/dai-dai-nai-you--1wphantom">전체 동작 보기 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/tuantuan--jbbom">团团</a></strong><br>제작자: <a href="https://github.com/JbBom">@JbBom</a> · 카테고리: 동물 친구 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- tuantuan--jbbom</code><br><br><a href="https://q.dog/pets/tuantuan--jbbom">전체 동작 보기 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/tuantuan--jbbom"><img src="https://q.dog/assets/previews/tuantuan--jbbom/thumbnail.png" alt="团团 미리 보기" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/duodong--froggie"><img src="https://q.dog/assets/previews/duodong--froggie/thumbnail.png" alt="多栋 미리 보기" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/duodong--froggie">多栋</a></strong><br>제작자: @froggie · 카테고리: 동물 친구 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- duodong--froggie</code><br><br><a href="https://q.dog/pets/duodong--froggie">전체 동작 보기 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/naiwa--sandytruant">奶蛙</a></strong><br>제작자: <a href="https://github.com/sandytruant">@sandytruant</a> · 카테고리: 동물 친구 · 버전: v2<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- naiwa--sandytruant</code><br><br><a href="https://q.dog/pets/naiwa--sandytruant">전체 동작 보기 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/naiwa--sandytruant"><img src="https://q.dog/assets/previews/naiwa--sandytruant/thumbnail.png" alt="奶蛙 미리 보기" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/xiaoba-cat--jack"><img src="https://q.dog/assets/previews/xiaoba-cat--jack/thumbnail.png" alt="小八猫 미리 보기" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/xiaoba-cat--jack">小八猫</a></strong><br>제작자: @jack · 카테고리: 동물 친구 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- xiaoba-cat--jack</code><br><br><a href="https://q.dog/pets/xiaoba-cat--jack">전체 동작 보기 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/xiaomai--brian-3">小麦 XiaoMai</a></strong><br>제작자: @brian-3 · 카테고리: 동물 친구 · 버전: v2<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- xiaomai--brian-3</code><br><br><a href="https://q.dog/pets/xiaomai--brian-3">전체 동작 보기 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/xiaomai--brian-3"><img src="https://q.dog/assets/previews/xiaomai--brian-3/thumbnail.png" alt="小麦 XiaoMai 미리 보기" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/koukou-penguin--hoody"><img src="https://q.dog/assets/previews/koukou-penguin--hoody/thumbnail.png" alt="扣扣企鹅 미리 보기" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/koukou-penguin--hoody">扣扣企鹅</a></strong><br>제작자: @hoody · 카테고리: 동물 친구 · 버전: v2<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- koukou-penguin--hoody</code><br><br><a href="https://q.dog/pets/koukou-penguin--hoody">전체 동작 보기 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/capybara-lulu--jiushu">水豚噜噜</a></strong><br>제작자: @jiushu · 카테고리: 동물 친구 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- capybara-lulu--jiushu</code><br><br><a href="https://q.dog/pets/capybara-lulu--jiushu">전체 동작 보기 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/capybara-lulu--jiushu"><img src="https://q.dog/assets/previews/capybara-lulu--jiushu/thumbnail.png" alt="水豚噜噜 미리 보기" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/niumou--jarvis-2"><img src="https://q.dog/assets/previews/niumou--jarvis-2/thumbnail.png" alt="牛哞 미리 보기" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/niumou--jarvis-2">牛哞</a></strong><br>제작자: @jarvis-2 · 카테고리: 동물 친구 · 버전: v2<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- niumou--jarvis-2</code><br><br><a href="https://q.dog/pets/niumou--jarvis-2">전체 동작 보기 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/zichao-xiong--z-kzhang">自嘲熊</a></strong><br>제작자: @z-kzhang · 카테고리: 동물 친구 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- zichao-xiong--z-kzhang</code><br><br><a href="https://q.dog/pets/zichao-xiong--z-kzhang">전체 동작 보기 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/zichao-xiong--z-kzhang"><img src="https://q.dog/assets/previews/zichao-xiong--z-kzhang/thumbnail.png" alt="自嘲熊 미리 보기" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/wucanrou--ch"><img src="https://q.dog/assets/previews/wucanrou--ch/thumbnail.png" alt="金渐层（午餐肉） 미리 보기" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/wucanrou--ch">金渐层（午餐肉）</a></strong><br>제작자: <a href="https://github.com/huanchu0213-ui">@huanchu0213-ui</a> · 카테고리: 동물 친구 · 버전: v2<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- wucanrou--ch</code><br><br><a href="https://q.dog/pets/wucanrou--ch">전체 동작 보기 →</a></td></tr>
</table>

### 판타지 생물

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/goblin--rkwap">Goblin</a></strong><br>제작자: @rkwap · 카테고리: 판타지 생물 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- goblin--rkwap</code><br><br><a href="https://q.dog/pets/goblin--rkwap">전체 동작 보기 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/goblin--rkwap"><img src="https://q.dog/assets/previews/goblin--rkwap/thumbnail.png" alt="Goblin 미리 보기" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/luna-angel-cat--neve"><img src="https://q.dog/assets/previews/luna-angel-cat--neve/thumbnail.png" alt="luna_angel cat 미리 보기" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/luna-angel-cat--neve">luna_angel cat</a></strong><br>제작자: @neve · 카테고리: 판타지 생물 · 버전: v2<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- luna-angel-cat--neve</code><br><br><a href="https://q.dog/pets/luna-angel-cat--neve">전체 동작 보기 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/night-neko--netizenxuan">Night Neko</a></strong><br>제작자: <a href="https://github.com/netizenXuan">@netizenXuan</a> · 카테고리: 판타지 생물 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- night-neko--netizenxuan</code><br><br><a href="https://q.dog/pets/night-neko--netizenxuan">전체 동작 보기 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/night-neko--netizenxuan"><img src="https://q.dog/assets/previews/night-neko--netizenxuan/thumbnail.png" alt="Night Neko 미리 보기" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/starcorn--alterhq"><img src="https://q.dog/assets/previews/starcorn--alterhq/thumbnail.png" alt="Starcorn 미리 보기" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/starcorn--alterhq">Starcorn</a></strong><br>제작자: <a href="https://github.com/alterhq">@alterhq</a> · 카테고리: 판타지 생물 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- starcorn--alterhq</code><br><br><a href="https://q.dog/pets/starcorn--alterhq">전체 동작 보기 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/xian-xiao-lu--qingyunagi">Xian Xiao Lu</a></strong><br>제작자: <a href="https://github.com/qingyunAGI">@qingyunAGI</a> · 카테고리: 판타지 생물 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- xian-xiao-lu--qingyunagi</code><br><br><a href="https://q.dog/pets/xian-xiao-lu--qingyunagi">전체 동작 보기 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/xian-xiao-lu--qingyunagi"><img src="https://q.dog/assets/previews/xian-xiao-lu--qingyunagi/thumbnail.png" alt="Xian Xiao Lu 미리 보기" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/yuanzai--gaming33"><img src="https://q.dog/assets/previews/yuanzai--gaming33/thumbnail.png" alt="Yuanzai 미리 보기" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/yuanzai--gaming33">Yuanzai</a></strong><br>제작자: <a href="https://github.com/Gaming33">@Gaming33</a> · 카테고리: 판타지 생물 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- yuanzai--gaming33</code><br><br><a href="https://q.dog/pets/yuanzai--gaming33">전체 동작 보기 →</a></td></tr>
</table>

### 로봇

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/chispa--giiilberto-nm">Chispa</a></strong><br>제작자: @giiilberto-nm · 카테고리: 로봇 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- chispa--giiilberto-nm</code><br><br><a href="https://q.dog/pets/chispa--giiilberto-nm">전체 동작 보기 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/chispa--giiilberto-nm"><img src="https://q.dog/assets/previews/chispa--giiilberto-nm/thumbnail.png" alt="Chispa 미리 보기" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/codenono--dq02"><img src="https://q.dog/assets/previews/codenono--dq02/thumbnail.png" alt="CodeNoNo 미리 보기" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/codenono--dq02">CodeNoNo</a></strong><br>제작자: <a href="https://github.com/Dqd02">@Dqd02</a> · 카테고리: 로봇 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- codenono--dq02</code><br><br><a href="https://q.dog/pets/codenono--dq02">전체 동작 보기 →</a></td></tr>
</table>

### 인물 아바타

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/azuma--tairazuma">Azuma</a></strong><br>제작자: @tairazuma · 카테고리: 인물 아바타 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- azuma--tairazuma</code><br><br><a href="https://q.dog/pets/azuma--tairazuma">전체 동작 보기 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/azuma--tairazuma"><img src="https://q.dog/assets/previews/azuma--tairazuma/thumbnail.png" alt="Azuma 미리 보기" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/tangdouren--carl312"><img src="https://q.dog/assets/previews/tangdouren--carl312/thumbnail.png" alt="Tangdouren 미리 보기" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/tangdouren--carl312">Tangdouren</a></strong><br>제작자: <a href="https://github.com/Carl-312">@Carl-312</a> · 카테고리: 인물 아바타 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- tangdouren--carl312</code><br><br><a href="https://q.dog/pets/tangdouren--carl312">전체 동작 보기 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/guga--circus">咕嘎</a></strong><br>제작자: @circus · 카테고리: 인물 아바타 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- guga--circus</code><br><br><a href="https://q.dog/pets/guga--circus">전체 동작 보기 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/guga--circus"><img src="https://q.dog/assets/previews/guga--circus/thumbnail.png" alt="咕嘎 미리 보기" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/fengge--qzl1-stack"><img src="https://q.dog/assets/previews/fengge--qzl1-stack/thumbnail.png" alt="峰哥 미리 보기" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/fengge--qzl1-stack">峰哥</a></strong><br>제작자: <a href="https://github.com/qzl1-stack">@qzl1-stack</a> · 카테고리: 인물 아바타 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- fengge--qzl1-stack</code><br><br><a href="https://q.dog/pets/fengge--qzl1-stack">전체 동작 보기 →</a></td></tr>
</table>

### 밈

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/drill-cat--qimi">Drill Cat</a></strong><br>제작자: <a href="https://github.com/qishichuan">@qishichuan</a> · 카테고리: 밈 · 버전: v2<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- drill-cat--qimi</code><br><br><a href="https://q.dog/pets/drill-cat--qimi">전체 동작 보기 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/drill-cat--qimi"><img src="https://q.dog/assets/previews/drill-cat--qimi/thumbnail.png" alt="Drill Cat 미리 보기" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/hami--tat"><img src="https://q.dog/assets/previews/hami--tat/thumbnail.png" alt="Hami 미리 보기" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/hami--tat">Hami</a></strong><br>제작자: <a href="https://github.com/TATcc">@TATcc</a> · 카테고리: 밈 · 버전: v2<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- hami--tat</code><br><br><a href="https://q.dog/pets/hami--tat">전체 동작 보기 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/katana-cheems--thankyou-cheems">Katana Cheems</a></strong><br>제작자: <a href="https://github.com/Thankyou-Cheems">@Thankyou-Cheems</a> · 카테고리: 밈 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- katana-cheems--thankyou-cheems</code><br><br><a href="https://q.dog/pets/katana-cheems--thankyou-cheems">전체 동작 보기 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/katana-cheems--thankyou-cheems"><img src="https://q.dog/assets/previews/katana-cheems--thankyou-cheems/thumbnail.png" alt="Katana Cheems 미리 보기" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/hance-woniu--korn"><img src="https://q.dog/assets/previews/hance-woniu--korn/thumbnail.png" alt="旱厕蜗牛 미리 보기" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/hance-woniu--korn">旱厕蜗牛</a></strong><br>제작자: @korn · 카테고리: 밈 · 버전: v2<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- hance-woniu--korn</code><br><br><a href="https://q.dog/pets/hance-woniu--korn">전체 동작 보기 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/maodie--octane0411">耄耋</a></strong><br>제작자: <a href="https://github.com/Octane0411">@Octane0411</a> · 카테고리: 밈 · 버전: v2<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- maodie--octane0411</code><br><br><a href="https://q.dog/pets/maodie--octane0411">전체 동작 보기 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/maodie--octane0411"><img src="https://q.dog/assets/previews/maodie--octane0411/thumbnail.png" alt="耄耋 미리 보기" width="160" height="173"></a></td></tr>
</table>

### 사물과 소품

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/spellbook--seymour"><img src="https://q.dog/assets/previews/spellbook--seymour/thumbnail.png" alt="Spellbook 미리 보기" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/spellbook--seymour">Spellbook</a></strong><br>제작자: @seymour · 카테고리: 사물과 소품 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- spellbook--seymour</code><br><br><a href="https://q.dog/pets/spellbook--seymour">전체 동작 보기 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/tiny-crt--chochou">Tiny CRT</a></strong><br>제작자: @chochou · 카테고리: 사물과 소품 · 버전: v1<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- tiny-crt--chochou</code><br><br><a href="https://q.dog/pets/tiny-crt--chochou">전체 동작 보기 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/tiny-crt--chochou"><img src="https://q.dog/assets/previews/tiny-crt--chochou/thumbnail.png" alt="Tiny CRT 미리 보기" width="160" height="173"></a></td></tr>
</table>

### 기타

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/twilight-sparkle--wuye3790"><img src="https://q.dog/assets/previews/twilight-sparkle--wuye3790/thumbnail.png" alt="紫悦 미리 보기" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/twilight-sparkle--wuye3790">紫悦</a></strong><br>제작자: <a href="https://github.com/WuYe3790">@WuYe3790</a> · 카테고리: 기타 · 버전: v2<br><br><strong>설치</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- twilight-sparkle--wuye3790</code><br><br><a href="https://q.dog/pets/twilight-sparkle--wuye3790">전체 동작 보기 →</a></td></tr>
</table>

## 펫 요청 또는 제출

원하는 캐릭터가 없다면 [무료 커뮤니티 요청 페이지](https://q.dog/request)를 여세요. 요청은 무료이며 spritesheet가 없어도 됩니다. 커뮤니티 제작자가 제작을 자원할 수 있지만, 요청이 수록이나 제작을 보장하지는 않습니다.

기여를 시작하려면 [웹사이트 기여 가이드](https://q.dog/guide)를 확인하세요. 모든 기여자가 큰 자산 저장소를 내려받지 않아도 되도록 세 가지 경로를 제공합니다.

1. **펫 요청** — Codex가 중복을 확인하고 참고 자료와 요구 사항을 수집한 뒤, 라벨이 지정된 요청 issue를 엽니다.
2. **내 펫 만들기 또는 제출하기** — Codex는 참고 자료나 기존 파일에서 시작해 세 파일 패키지를 완성하고 검증한 뒤, 전체 복제 없이 GitHub API로 전용 브랜치와 PR을 만듭니다.
3. **고급 PR** — 숙련된 기여자는 GitHub Codespaces, 부분 복제 또는 선호하는 Git 작업 흐름을 사용할 수 있습니다.

저장소의 [`.agents/skills/submit-codex-pet`](../../.agents/skills/submit-codex-pet) 스킬은 호환되는 AI agent가 올바른 경로를 선택하도록 돕습니다. 인증 정보나 저장소 쓰기 권한이 없으면, 기여물을 잃지 않도록 라벨이 지정된 제출 issue로 대체합니다.

고급 기여자는 최종 패키지 하나만 추가해야 합니다.

```text
pets/
└── pet-slug--author-slug/
    ├── submission.json
    ├── pet.json
    └── spritesheet.webp
```

여러 제작자가 같은 캐릭터의 변형을 함께 제공할 수 있도록 `pet-slug--author-slug` 형식을 사용합니다. v1 제출물은 `spriteVersionNumber`를 생략할 수 있으며 `1536x1872` WebP를 제공해야 합니다. v2 제출물은 `spriteVersionNumber: 2`와 `1536x2288` WebP를 제공해야 합니다.

v2 런타임 매니페스트는 다음과 같습니다.

```json
{
  "id": "pet-slug--author-slug",
  "displayName": "펫 이름",
  "description": "한 문장의 짧은 설명.",
  "spriteVersionNumber": 2,
  "spritesheetPath": "spritesheet.webp"
}
```

미리 보기와 README 목록은 CI가 생성합니다.

```bash
python -m pip install -r requirements.txt
npm run validate:pr
npm run lint
```

기여자 PR에는 `submission.json`, `pet.json`, `spritesheet.webp`만 포함해야 합니다. prompt, 참고 자료, QA 폴더, contact sheet, 동영상, 디코드 프레임, Hatch Pet 실행 디렉터리는 제출하지 마세요. 유지 관리자나 CI가 병합 뒤 미리 보기, README 목록, `pets.json`을 다시 생성하며 미리 보기 바이너리는 장기간 Git 추적 파일로 유지하지 않습니다.

## 펫 만들기

- [.agents/skills/submit-codex-pet](../../.agents/skills/submit-codex-pet) — 커뮤니티 제작을 요청하거나 GitHub API로 내 펫을 만들고 제출하고, 고급 PR을 준비합니다.
- [.agents/skills/hatch-pet-v1](../../.agents/skills/hatch-pet-v1) — 기존 8x9 v1 펫을 보존하거나 수리합니다.
- [.agents/skills/hatch-pet-v2](../../.agents/skills/hatch-pet-v2) — 16개 시선 방향을 포함한 8x11 v2 펫을 만들거나 업그레이드합니다.

스킬 버전을 명시적으로 선택하세요. 기존 펫을 업그레이드할 때는 `$hatch-pet-v2`에 설치된 `pet.json`과 `spritesheet.webp`를 제공합니다. 승인된 0–8행은 새로 생성하지 않고 보존됩니다.

## 문서

- English: [docs/en](../en)
- 简体中文: [docs/zh-CN](../zh-CN)
- 한국어: [docs/ko](./)
- 日本語: [docs/ja](../ja)
- Español: [docs/es](../es)
- 웹 갤러리 소스: [web/](../../web)
- 통계 Worker: [worker/](../../worker)
- 기여 가이드(영어): [CONTRIBUTING.md](../../CONTRIBUTING.md)

## Star 기록

[![QDog의 GitHub Star 기록](../../assets/community/star-history.svg)](https://github.com/burgleaf/qdog-community/stargazers)

이 차트는 GitHub stargazer 데이터로 매일 갱신됩니다. 더 많은 사람이 이 펫을 발견할 수 있도록 [저장소에 Star를 남겨 주세요](https://github.com/burgleaf/qdog-community).

## 기여자

<a href="https://github.com/burgleaf/qdog-community/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=burgleaf/qdog-community" alt="QDog 기여자">
</a>

펫, 코드, 문서, 검토, 아이디어를 기여해 주신 모든 분께 감사드립니다.

## 라이선스

- 코드와 스크립트: [MIT](../../LICENSE)
- 펫 자산과 생성된 미리 보기: 각 펫 폴더에 별도 표기가 없다면 [CC BY-NC 4.0](../../ASSETS-LICENSE.md)
