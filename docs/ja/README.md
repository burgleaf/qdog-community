<div align="center">

# QDog

[English](../../README.md) | [简体中文](../zh-CN/README.md) | [한국어](../ko/README.md) | 日本語 | [Español](../es/README.md)

<h2><a href="https://q.dog/ja">QDog で無料のコミュニティ Codex ペットを探してインストール →</a></h2>

<p><strong>QDog は、コミュニティが制作した無料の Codex ペットギャラリーです。アニメーションを確認し、リポジトリを複製せずにお気に入りをインストールできます。まだないキャラクターはコミュニティへ制作をリクエストできます。</strong></p>

<p><a href="https://q.dog/ja"><strong>ペットを見る</strong></a> · <a href="https://q.dog/ja/install"><strong>インストール</strong></a> · <a href="https://q.dog/ja/request"><strong>キャラクターをリクエスト</strong></a></p>

<a href="https://q.dog/ja"><img src="../../assets/cover/qdog-cover.png" alt="QDog ギャラリーを開く"></a>

![pets: 183](https://img.shields.io/badge/pets-183-2ea44f) ![categories: 11](https://img.shields.io/badge/categories-11-0969da) ![languages: en | zh--CN | ko | ja | es](https://img.shields.io/badge/languages-en%20%7C%20zh--CN%20%7C%20ko%20%7C%20ja%20%7C%20es-8250df) ![code: MIT](https://img.shields.io/badge/code-MIT-111111) ![assets: CC BY--NC 4.0](https://img.shields.io/badge/assets-CC%20BY--NC%204.0-f97316) ![install: one command](https://img.shields.io/badge/install-one%20command-111111) [![Pet previews](https://github.com/burgleaf/qdog-community/actions/workflows/pet-previews.yml/badge.svg)](https://github.com/burgleaf/qdog-community/actions/workflows/pet-previews.yml)

</div>

このリポジトリは [QDog](https://q.dog/ja) のソースカタログです。インストール可能なペット、作者と出典、コレクション情報、検証ツール、貢献履歴を管理しています。

## 特徴

- **ワンコマンドでインストール** — クローンや手動設定なしで macOS / Linux / Windows に対応
- **無料コミュニティギャラリー** — アニメーション、コレクション、作者ページ、週間ランキング、いいね、共有機能
- **無料のキャラクターリクエスト** — spritesheet がなくてもキャラクターと参考資料を投稿可能。制作や採用は保証されません
- **AI ファーストの投稿フロー** — Codex でペットの制作、修正、検証、投稿が可能

各ペットは次の 3 ファイルだけで構成されます。

```text
pets/<pet-slug>--<author-slug>/
├── submission.json
├── pet.json
└── spritesheet.webp
```

`submission.json.name` は必須のフォールバック名です。翻訳名は投稿者が明示的に提供した場合のみ使用し、サイトがキャラクター名を自動翻訳することはありません。

## ペットのバージョン

| Version | Atlas               | Runtime metadata                      | 用途                               |
| ------- | ------------------- | ------------------------------------- | ---------------------------------- |
| v1      | `1536x1872`, 8 × 9  | omit `spriteVersionNumber` or set `1` | 従来の標準アニメーション           |
| v2      | `1536x2288`, 8 × 11 | `spriteVersionNumber: 2`              | 標準アニメーションと 16 方向の視線 |

## クイックインストール

リポジトリのクローンは不要です。利用するシェルに合ったコマンドを選んでください。

```bash
# macOS / Linux
curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- firefly--lingxiaotian
```

```powershell
# Windows PowerShell
powershell -NoProfile -ExecutionPolicy Bypass -Command "iwr -UseB https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.ps1 | iex; Install-CodexPet firefly--lingxiaotian"
```

## ペット一覧

### ゲームキャラクター

<table>
<tr><th>名前</th><td colspan="5"><strong>★ おすすめペット</strong> · <a href="https://q.dog/pets/firefly--lingxiaotian">Firefly</a> · 作者: <a href="https://github.com/legeling">@legeling</a> · カテゴリー: ゲームキャラクター · バージョン: v1</td></tr>
<tr><th>インストール</th><td colspan="5"><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- firefly--lingxiaotian</code></td></tr>
<tr><th>アクション</th><td><strong>待機</strong></td><td><strong>手を振る</strong></td><td><strong>走る</strong></td><td><strong>待機中</strong></td><td><strong>レビュー</strong></td></tr>
<tr><th>プレビュー</th><td><img src="https://q.dog/assets/previews/firefly--lingxiaotian/webp/idle.webp" alt="Firefly 待機" width="120" height="130"></td><td><img src="https://q.dog/assets/previews/firefly--lingxiaotian/webp/waving.webp" alt="Firefly 手を振る" width="120" height="130"></td><td><img src="https://q.dog/assets/previews/firefly--lingxiaotian/webp/running-right.webp" alt="Firefly 走る" width="120" height="130"></td><td><img src="https://q.dog/assets/previews/firefly--lingxiaotian/webp/waiting.webp" alt="Firefly 待機中" width="120" height="130"></td><td><img src="https://q.dog/assets/previews/firefly--lingxiaotian/webp/review.webp" alt="Firefly レビュー" width="120" height="130"></td></tr>
<tr><th>すべてのアクションを見る</th><td colspan="5"><a href="https://q.dog/pets/firefly--lingxiaotian">すべてのアクションを見る →</a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/acheron--lingxiaotian"><img src="https://q.dog/assets/previews/acheron--lingxiaotian/thumbnail.png" alt="Acheron プレビュー" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/acheron--lingxiaotian">Acheron</a></strong><br>作者: <a href="https://github.com/legeling">@legeling</a> · カテゴリー: ゲームキャラクター · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- acheron--lingxiaotian</code><br><br><a href="https://q.dog/pets/acheron--lingxiaotian">すべてのアクションを見る →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/aggron-3d--dnnyngyen">Aggron (3D)</a></strong><br>作者: <a href="https://github.com/dnnyngyen">@dnnyngyen</a> · カテゴリー: ゲームキャラクター · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- aggron-3d--dnnyngyen</code><br><br><a href="https://q.dog/pets/aggron-3d--dnnyngyen">すべてのアクションを見る →</a></td><td width="180" align="center"><a href="https://q.dog/pets/aggron-3d--dnnyngyen"><img src="https://q.dog/assets/previews/aggron-3d--dnnyngyen/thumbnail.png" alt="Aggron (3D) プレビュー" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/arlecchino--lingxiaotian"><img src="https://q.dog/assets/previews/arlecchino--lingxiaotian/thumbnail.png" alt="Arlecchino プレビュー" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/arlecchino--lingxiaotian">Arlecchino</a></strong><br>作者: <a href="https://github.com/legeling">@legeling</a> · カテゴリー: ゲームキャラクター · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- arlecchino--lingxiaotian</code><br><br><a href="https://q.dog/pets/arlecchino--lingxiaotian">すべてのアクションを見る →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/barboach-3d--dnnyngyen">Barboach (3D)</a></strong><br>作者: <a href="https://github.com/dnnyngyen">@dnnyngyen</a> · カテゴリー: ゲームキャラクター · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- barboach-3d--dnnyngyen</code><br><br><a href="https://q.dog/pets/barboach-3d--dnnyngyen">すべてのアクションを見る →</a></td><td width="180" align="center"><a href="https://q.dog/pets/barboach-3d--dnnyngyen"><img src="https://q.dog/assets/previews/barboach-3d--dnnyngyen/thumbnail.png" alt="Barboach (3D) プレビュー" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/black-swan--lingxiaotian"><img src="https://q.dog/assets/previews/black-swan--lingxiaotian/thumbnail.png" alt="Black Swan プレビュー" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/black-swan--lingxiaotian">Black Swan</a></strong><br>作者: <a href="https://github.com/legeling">@legeling</a> · カテゴリー: ゲームキャラクター · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- black-swan--lingxiaotian</code><br><br><a href="https://q.dog/pets/black-swan--lingxiaotian">すべてのアクションを見る →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/buba--yurcek">Buba</a></strong><br>作者: @yurcek · カテゴリー: ゲームキャラクター · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- buba--yurcek</code><br><br><a href="https://q.dog/pets/buba--yurcek">すべてのアクションを見る →</a></td><td width="180" align="center"><a href="https://q.dog/pets/buba--yurcek"><img src="https://q.dog/assets/previews/buba--yurcek/thumbnail.png" alt="Buba プレビュー" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/castorice--lingxiaotian"><img src="https://q.dog/assets/previews/castorice--lingxiaotian/thumbnail.png" alt="Castorice プレビュー" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/castorice--lingxiaotian">Castorice</a></strong><br>作者: <a href="https://github.com/legeling">@legeling</a> · カテゴリー: ゲームキャラクター · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- castorice--lingxiaotian</code><br><br><a href="https://q.dog/pets/castorice--lingxiaotian">すべてのアクションを見る →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/charizard--dnnyngyen">Charizard</a></strong><br>作者: <a href="https://github.com/dnnyngyen">@dnnyngyen</a> · カテゴリー: ゲームキャラクター · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- charizard--dnnyngyen</code><br><br><a href="https://q.dog/pets/charizard--dnnyngyen">すべてのアクションを見る →</a></td><td width="180" align="center"><a href="https://q.dog/pets/charizard--dnnyngyen"><img src="https://q.dog/assets/previews/charizard--dnnyngyen/thumbnail.png" alt="Charizard プレビュー" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/chen--chenxin-dlut"><img src="https://q.dog/assets/previews/chen--chenxin-dlut/thumbnail.png" alt="Chen プレビュー" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/chen--chenxin-dlut">Chen</a></strong><br>作者: <a href="https://github.com/chenxin-dlut">@chenxin-dlut</a> · カテゴリー: ゲームキャラクター · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- chen--chenxin-dlut</code><br><br><a href="https://q.dog/pets/chen--chenxin-dlut">すべてのアクションを見る →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/cyrene--lingxiaotian">Cyrene</a></strong><br>作者: <a href="https://github.com/legeling">@legeling</a> · カテゴリー: ゲームキャラクター · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- cyrene--lingxiaotian</code><br><br><a href="https://q.dog/pets/cyrene--lingxiaotian">すべてのアクションを見る →</a></td><td width="180" align="center"><a href="https://q.dog/pets/cyrene--lingxiaotian"><img src="https://q.dog/assets/previews/cyrene--lingxiaotian/thumbnail.png" alt="Cyrene プレビュー" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/dimo-stand--god-wu"><img src="https://q.dog/assets/previews/dimo-stand--god-wu/thumbnail.png" alt="Dimo プレビュー" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/dimo-stand--god-wu">Dimo</a></strong><br>作者: @god-wu · カテゴリー: ゲームキャラクター · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- dimo-stand--god-wu</code><br><br><a href="https://q.dog/pets/dimo-stand--god-wu">すべてのアクションを見る →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/doro--lingxiaotian">Doro</a></strong><br>作者: <a href="https://github.com/legeling">@legeling</a> · カテゴリー: ゲームキャラクター · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- doro--lingxiaotian</code><br><br><a href="https://q.dog/pets/doro--lingxiaotian">すべてのアクションを見る →</a></td><td width="180" align="center"><a href="https://q.dog/pets/doro--lingxiaotian"><img src="https://q.dog/assets/previews/doro--lingxiaotian/thumbnail.png" alt="Doro プレビュー" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/eevee--dnnyngyen"><img src="https://q.dog/assets/previews/eevee--dnnyngyen/thumbnail.png" alt="Eevee プレビュー" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/eevee--dnnyngyen">Eevee</a></strong><br>作者: <a href="https://github.com/dnnyngyen">@dnnyngyen</a> · カテゴリー: ゲームキャラクター · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- eevee--dnnyngyen</code><br><br><a href="https://q.dog/pets/eevee--dnnyngyen">すべてのアクションを見る →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/feixiao--lingxiaotian">Feixiao</a></strong><br>作者: <a href="https://github.com/legeling">@legeling</a> · カテゴリー: ゲームキャラクター · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- feixiao--lingxiaotian</code><br><br><a href="https://q.dog/pets/feixiao--lingxiaotian">すべてのアクションを見る →</a></td><td width="180" align="center"><a href="https://q.dog/pets/feixiao--lingxiaotian"><img src="https://q.dog/assets/previews/feixiao--lingxiaotian/thumbnail.png" alt="Feixiao プレビュー" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/furina--lingxiaotian"><img src="https://q.dog/assets/previews/furina--lingxiaotian/thumbnail.png" alt="Furina プレビュー" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/furina--lingxiaotian">Furina</a></strong><br>作者: <a href="https://github.com/legeling">@legeling</a> · カテゴリー: ゲームキャラクター · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- furina--lingxiaotian</code><br><br><a href="https://q.dog/pets/furina--lingxiaotian">すべてのアクションを見る →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/ganyu--chenxin-dlut">Ganyu</a></strong><br>作者: <a href="https://github.com/chenxin-dlut">@chenxin-dlut</a> · カテゴリー: ゲームキャラクター · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- ganyu--chenxin-dlut</code><br><br><a href="https://q.dog/pets/ganyu--chenxin-dlut">すべてのアクションを見る →</a></td><td width="180" align="center"><a href="https://q.dog/pets/ganyu--chenxin-dlut"><img src="https://q.dog/assets/previews/ganyu--chenxin-dlut/thumbnail.png" alt="Ganyu プレビュー" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/hu-tao--lingxiaotian"><img src="https://q.dog/assets/previews/hu-tao--lingxiaotian/thumbnail.png" alt="Hu Tao プレビュー" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/hu-tao--lingxiaotian">Hu Tao</a></strong><br>作者: <a href="https://github.com/legeling">@legeling</a> · カテゴリー: ゲームキャラクター · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- hu-tao--lingxiaotian</code><br><br><a href="https://q.dog/pets/hu-tao--lingxiaotian">すべてのアクションを見る →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/hyacine--kurisu">Hyacine</a></strong><br>作者: <a href="https://github.com/kurisu994">@kurisu994</a> · カテゴリー: ゲームキャラクター · バージョン: v2<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- hyacine--kurisu</code><br><br><a href="https://q.dog/pets/hyacine--kurisu">すべてのアクションを見る →</a></td><td width="180" align="center"><a href="https://q.dog/pets/hyacine--kurisu"><img src="https://q.dog/assets/previews/hyacine--kurisu/thumbnail.png" alt="Hyacine プレビュー" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/isaac--foggy-whale"><img src="https://q.dog/assets/previews/isaac--foggy-whale/thumbnail.png" alt="Isaac プレビュー" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/isaac--foggy-whale">Isaac</a></strong><br>作者: <a href="https://github.com/Foggy-whale">@Foggy-whale</a> · カテゴリー: ゲームキャラクター · バージョン: v2<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- isaac--foggy-whale</code><br><br><a href="https://q.dog/pets/isaac--foggy-whale">すべてのアクションを見る →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/kamisato-ayaka--lingxiaotian">Kamisato Ayaka</a></strong><br>作者: <a href="https://github.com/legeling">@legeling</a> · カテゴリー: ゲームキャラクター · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- kamisato-ayaka--lingxiaotian</code><br><br><a href="https://q.dog/pets/kamisato-ayaka--lingxiaotian">すべてのアクションを見る →</a></td><td width="180" align="center"><a href="https://q.dog/pets/kamisato-ayaka--lingxiaotian"><img src="https://q.dog/assets/previews/kamisato-ayaka--lingxiaotian/thumbnail.png" alt="Kamisato Ayaka プレビュー" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/klee--chenxin-dlut"><img src="https://q.dog/assets/previews/klee--chenxin-dlut/thumbnail.png" alt="Klee プレビュー" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/klee--chenxin-dlut">Klee</a></strong><br>作者: <a href="https://github.com/chenxin-dlut">@chenxin-dlut</a> · カテゴリー: ゲームキャラクター · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- klee--chenxin-dlut</code><br><br><a href="https://q.dog/pets/klee--chenxin-dlut">すべてのアクションを見る →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/kuro-chibi--kuroneko-night">Kuro Chibi</a></strong><br>作者: <a href="https://github.com/KuroNeko-night">@KuroNeko-night</a> · カテゴリー: ゲームキャラクター · バージョン: v2<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- kuro-chibi--kuroneko-night</code><br><br><a href="https://q.dog/pets/kuro-chibi--kuroneko-night">すべてのアクションを見る →</a></td><td width="180" align="center"><a href="https://q.dog/pets/kuro-chibi--kuroneko-night"><img src="https://q.dog/assets/previews/kuro-chibi--kuroneko-night/thumbnail.png" alt="Kuro Chibi プレビュー" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/lappland--chenxin-dlut"><img src="https://q.dog/assets/previews/lappland--chenxin-dlut/thumbnail.png" alt="Lappland プレビュー" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/lappland--chenxin-dlut">Lappland</a></strong><br>作者: <a href="https://github.com/chenxin-dlut">@chenxin-dlut</a> · カテゴリー: ゲームキャラクター · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- lappland--chenxin-dlut</code><br><br><a href="https://q.dog/pets/lappland--chenxin-dlut">すべてのアクションを見る →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/little-black-mage--libertis">Little Black Mage</a></strong><br>作者: @libertis · カテゴリー: ゲームキャラクター · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- little-black-mage--libertis</code><br><br><a href="https://q.dog/pets/little-black-mage--libertis">すべてのアクションを見る →</a></td><td width="180" align="center"><a href="https://q.dog/pets/little-black-mage--libertis"><img src="https://q.dog/assets/previews/little-black-mage--libertis/thumbnail.png" alt="Little Black Mage プレビュー" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/march-7th--chenxin-dlut"><img src="https://q.dog/assets/previews/march-7th--chenxin-dlut/thumbnail.png" alt="March 7th プレビュー" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/march-7th--chenxin-dlut">March 7th</a></strong><br>作者: <a href="https://github.com/chenxin-dlut">@chenxin-dlut</a> · カテゴリー: ゲームキャラクター · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- march-7th--chenxin-dlut</code><br><br><a href="https://q.dog/pets/march-7th--chenxin-dlut">すべてのアクションを見る →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/miyabi--eric-terminal">Miyabi</a></strong><br>作者: <a href="https://codex-pets.net/users/eric-terminal">@eric-terminal</a> · カテゴリー: ゲームキャラクター · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- miyabi--eric-terminal</code><br><br><a href="https://q.dog/pets/miyabi--eric-terminal">すべてのアクションを見る →</a></td><td width="180" align="center"><a href="https://q.dog/pets/miyabi--eric-terminal"><img src="https://q.dog/assets/previews/miyabi--eric-terminal/thumbnail.png" alt="Miyabi プレビュー" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/nahida--lingxiaotian"><img src="https://q.dog/assets/previews/nahida--lingxiaotian/thumbnail.png" alt="Nahida プレビュー" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/nahida--lingxiaotian">Nahida</a></strong><br>作者: <a href="https://github.com/legeling">@legeling</a> · カテゴリー: ゲームキャラクター · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- nahida--lingxiaotian</code><br><br><a href="https://q.dog/pets/nahida--lingxiaotian">すべてのアクションを見る →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/navia--lingxiaotian">Navia</a></strong><br>作者: <a href="https://github.com/legeling">@legeling</a> · カテゴリー: ゲームキャラクター · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- navia--lingxiaotian</code><br><br><a href="https://q.dog/pets/navia--lingxiaotian">すべてのアクションを見る →</a></td><td width="180" align="center"><a href="https://q.dog/pets/navia--lingxiaotian"><img src="https://q.dog/assets/previews/navia--lingxiaotian/thumbnail.png" alt="Navia プレビュー" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/paimon--lingxiaotian"><img src="https://q.dog/assets/previews/paimon--lingxiaotian/thumbnail.png" alt="Paimon プレビュー" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/paimon--lingxiaotian">Paimon</a></strong><br>作者: <a href="https://github.com/legeling">@legeling</a> · カテゴリー: ゲームキャラクター · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- paimon--lingxiaotian</code><br><br><a href="https://q.dog/pets/paimon--lingxiaotian">すべてのアクションを見る →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/phoebe--chenxin-dlut">Phoebe</a></strong><br>作者: <a href="https://github.com/chenxin-dlut">@chenxin-dlut</a> · カテゴリー: ゲームキャラクター · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- phoebe--chenxin-dlut</code><br><br><a href="https://q.dog/pets/phoebe--chenxin-dlut">すべてのアクションを見る →</a></td><td width="180" align="center"><a href="https://q.dog/pets/phoebe--chenxin-dlut"><img src="https://q.dog/assets/previews/phoebe--chenxin-dlut/thumbnail.png" alt="Phoebe プレビュー" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/pikachu--dnnyngyen"><img src="https://q.dog/assets/previews/pikachu--dnnyngyen/thumbnail.png" alt="Pikachu プレビュー" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/pikachu--dnnyngyen">Pikachu</a></strong><br>作者: <a href="https://github.com/dnnyngyen">@dnnyngyen</a> · カテゴリー: ゲームキャラクター · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- pikachu--dnnyngyen</code><br><br><a href="https://q.dog/pets/pikachu--dnnyngyen">すべてのアクションを見る →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/raiden-shogun--lingxiaotian">Raiden Shogun</a></strong><br>作者: <a href="https://github.com/legeling">@legeling</a> · カテゴリー: ゲームキャラクター · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- raiden-shogun--lingxiaotian</code><br><br><a href="https://q.dog/pets/raiden-shogun--lingxiaotian">すべてのアクションを見る →</a></td><td width="180" align="center"><a href="https://q.dog/pets/raiden-shogun--lingxiaotian"><img src="https://q.dog/assets/previews/raiden-shogun--lingxiaotian/thumbnail.png" alt="Raiden Shogun プレビュー" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/reimu--lingxiaotian"><img src="https://q.dog/assets/previews/reimu--lingxiaotian/thumbnail.png" alt="Reimu プレビュー" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/reimu--lingxiaotian">Reimu</a></strong><br>作者: <a href="https://github.com/legeling">@legeling</a> · カテゴリー: ゲームキャラクター · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- reimu--lingxiaotian</code><br><br><a href="https://q.dog/pets/reimu--lingxiaotian">すべてのアクションを見る →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/remielle-dan--erlla">Remielle-Dan / Leimi</a></strong><br>作者: <a href="https://github.com/Erlla">@Erlla</a> · カテゴリー: ゲームキャラクター · バージョン: v2<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- remielle-dan--erlla</code><br><br><a href="https://q.dog/pets/remielle-dan--erlla">すべてのアクションを見る →</a></td><td width="180" align="center"><a href="https://q.dog/pets/remielle-dan--erlla"><img src="https://q.dog/assets/previews/remielle-dan--erlla/thumbnail.png" alt="Remielle-Dan / Leimi プレビュー" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/robin--lingxiaotian"><img src="https://q.dog/assets/previews/robin--lingxiaotian/thumbnail.png" alt="Robin プレビュー" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/robin--lingxiaotian">Robin</a></strong><br>作者: <a href="https://github.com/legeling">@legeling</a> · カテゴリー: ゲームキャラクター · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- robin--lingxiaotian</code><br><br><a href="https://q.dog/pets/robin--lingxiaotian">すべてのアクションを見る →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/ruan-mei--lingxiaotian">Ruan Mei</a></strong><br>作者: <a href="https://github.com/legeling">@legeling</a> · カテゴリー: ゲームキャラクター · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- ruan-mei--lingxiaotian</code><br><br><a href="https://q.dog/pets/ruan-mei--lingxiaotian">すべてのアクションを見る →</a></td><td width="180" align="center"><a href="https://q.dog/pets/ruan-mei--lingxiaotian"><img src="https://q.dog/assets/previews/ruan-mei--lingxiaotian/thumbnail.png" alt="Ruan Mei プレビュー" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/silver-wolf--lingxiaotian"><img src="https://q.dog/assets/previews/silver-wolf--lingxiaotian/thumbnail.png" alt="Silver Wolf プレビュー" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/silver-wolf--lingxiaotian">Silver Wolf</a></strong><br>作者: <a href="https://github.com/legeling">@legeling</a> · カテゴリー: ゲームキャラクター · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- silver-wolf--lingxiaotian</code><br><br><a href="https://q.dog/pets/silver-wolf--lingxiaotian">すべてのアクションを見る →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/sonetto--chenxin-dlut">Sonetto</a></strong><br>作者: <a href="https://github.com/chenxin-dlut">@chenxin-dlut</a> · カテゴリー: ゲームキャラクター · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- sonetto--chenxin-dlut</code><br><br><a href="https://q.dog/pets/sonetto--chenxin-dlut">すべてのアクションを見る →</a></td><td width="180" align="center"><a href="https://q.dog/pets/sonetto--chenxin-dlut"><img src="https://q.dog/assets/previews/sonetto--chenxin-dlut/thumbnail.png" alt="Sonetto プレビュー" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/sparkle--lingxiaotian"><img src="https://q.dog/assets/previews/sparkle--lingxiaotian/thumbnail.png" alt="Sparkle プレビュー" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/sparkle--lingxiaotian">Sparkle</a></strong><br>作者: <a href="https://github.com/legeling">@legeling</a> · カテゴリー: ゲームキャラクター · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- sparkle--lingxiaotian</code><br><br><a href="https://q.dog/pets/sparkle--lingxiaotian">すべてのアクションを見る →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/susuta--xiangzi529">Susuta</a></strong><br>作者: <a href="https://github.com/Xiangzi529">@Xiangzi529</a> · カテゴリー: ゲームキャラクター · バージョン: v2<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- susuta--xiangzi529</code><br><br><a href="https://q.dog/pets/susuta--xiangzi529">すべてのアクションを見る →</a></td><td width="180" align="center"><a href="https://q.dog/pets/susuta--xiangzi529"><img src="https://q.dog/assets/previews/susuta--xiangzi529/thumbnail.png" alt="Susuta プレビュー" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/tingyun--lingxiaotian"><img src="https://q.dog/assets/previews/tingyun--lingxiaotian/thumbnail.png" alt="Tingyun プレビュー" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/tingyun--lingxiaotian">Tingyun</a></strong><br>作者: <a href="https://github.com/legeling">@legeling</a> · カテゴリー: ゲームキャラクター · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- tingyun--lingxiaotian</code><br><br><a href="https://q.dog/pets/tingyun--lingxiaotian">すべてのアクションを見る →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/vertin--chenxin-dlut">Vertin</a></strong><br>作者: <a href="https://github.com/chenxin-dlut">@chenxin-dlut</a> · カテゴリー: ゲームキャラクター · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- vertin--chenxin-dlut</code><br><br><a href="https://q.dog/pets/vertin--chenxin-dlut">すべてのアクションを見る →</a></td><td width="180" align="center"><a href="https://q.dog/pets/vertin--chenxin-dlut"><img src="https://q.dog/assets/previews/vertin--chenxin-dlut/thumbnail.png" alt="Vertin プレビュー" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/yoimiya--chenxin-dlut"><img src="https://q.dog/assets/previews/yoimiya--chenxin-dlut/thumbnail.png" alt="Yoimiya プレビュー" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/yoimiya--chenxin-dlut">Yoimiya</a></strong><br>作者: <a href="https://github.com/chenxin-dlut">@chenxin-dlut</a> · カテゴリー: ゲームキャラクター · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- yoimiya--chenxin-dlut</code><br><br><a href="https://q.dog/pets/yoimiya--chenxin-dlut">すべてのアクションを見る →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/zani--chenxin-dlut">Zani</a></strong><br>作者: <a href="https://github.com/chenxin-dlut">@chenxin-dlut</a> · カテゴリー: ゲームキャラクター · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- zani--chenxin-dlut</code><br><br><a href="https://q.dog/pets/zani--chenxin-dlut">すべてのアクションを見る →</a></td><td width="180" align="center"><a href="https://q.dog/pets/zani--chenxin-dlut"><img src="https://q.dog/assets/previews/zani--chenxin-dlut/thumbnail.png" alt="Zani プレビュー" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/yae-miko--legeling"><img src="https://q.dog/assets/previews/yae-miko--legeling/thumbnail.png" alt="八重神子 プレビュー" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/yae-miko--legeling">八重神子</a></strong><br>作者: <a href="https://github.com/legeling">@legeling</a> · カテゴリー: ゲームキャラクター · バージョン: v2<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- yae-miko--legeling</code><br><br><a href="https://q.dog/pets/yae-miko--legeling">すべてのアクションを見る →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/dnf-female-ammo--qunboo">女弹药Q</a></strong><br>作者: <a href="https://github.com/QunBoo">@QunBoo</a> · カテゴリー: ゲームキャラクター · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- dnf-female-ammo--qunboo</code><br><br><a href="https://q.dog/pets/dnf-female-ammo--qunboo">すべてのアクションを見る →</a></td><td width="180" align="center"><a href="https://q.dog/pets/dnf-female-ammo--qunboo"><img src="https://q.dog/assets/previews/dnf-female-ammo--qunboo/thumbnail.png" alt="女弹药Q プレビュー" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/new-covenant-exusiai--chenxin-dlut"><img src="https://q.dog/assets/previews/new-covenant-exusiai--chenxin-dlut/thumbnail.png" alt="新约能天使 プレビュー" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/new-covenant-exusiai--chenxin-dlut">新约能天使</a></strong><br>作者: <a href="https://github.com/chenxin-dlut">@chenxin-dlut</a> · カテゴリー: ゲームキャラクター · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- new-covenant-exusiai--chenxin-dlut</code><br><br><a href="https://q.dog/pets/new-covenant-exusiai--chenxin-dlut">すべてのアクションを見る →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/regulus-star-antimony--chenxin-dlut">星锑</a></strong><br>作者: <a href="https://github.com/chenxin-dlut">@chenxin-dlut</a> · カテゴリー: ゲームキャラクター · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- regulus-star-antimony--chenxin-dlut</code><br><br><a href="https://q.dog/pets/regulus-star-antimony--chenxin-dlut">すべてのアクションを見る →</a></td><td width="180" align="center"><a href="https://q.dog/pets/regulus-star-antimony--chenxin-dlut"><img src="https://q.dog/assets/previews/regulus-star-antimony--chenxin-dlut/thumbnail.png" alt="星锑 プレビュー" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/youmu--ai-generated"><img src="https://q.dog/assets/previews/youmu--ai-generated/thumbnail.png" alt="魂魄妖梦 プレビュー" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/youmu--ai-generated">魂魄妖梦</a></strong><br>作者: @ai-generated · カテゴリー: ゲームキャラクター · バージョン: v2<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- youmu--ai-generated</code><br><br><a href="https://q.dog/pets/youmu--ai-generated">すべてのアクションを見る →</a></td></tr>
</table>

### アニメキャラクター

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/zero-two--mingqingmozhao">02</a></strong><br>作者: @mingqingmozhao · カテゴリー: アニメキャラクター · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- zero-two--mingqingmozhao</code><br><br><a href="https://q.dog/pets/zero-two--mingqingmozhao">すべてのアクションを見る →</a></td><td width="180" align="center"><a href="https://q.dog/pets/zero-two--mingqingmozhao"><img src="https://q.dog/assets/previews/zero-two--mingqingmozhao/thumbnail.png" alt="02 プレビュー" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/anya--chenxin-dlut"><img src="https://q.dog/assets/previews/anya--chenxin-dlut/thumbnail.png" alt="Anya プレビュー" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/anya--chenxin-dlut">Anya</a></strong><br>作者: <a href="https://github.com/chenxin-dlut">@chenxin-dlut</a> · カテゴリー: アニメキャラクター · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- anya--chenxin-dlut</code><br><br><a href="https://q.dog/pets/anya--chenxin-dlut">すべてのアクションを見る →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/asuka--maxg24">Asuka</a></strong><br>作者: <a href="https://codex-pets.net/users/maxg24">@maxg24</a> · カテゴリー: アニメキャラクター · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- asuka--maxg24</code><br><br><a href="https://q.dog/pets/asuka--maxg24">すべてのアクションを見る →</a></td><td width="180" align="center"><a href="https://q.dog/pets/asuka--maxg24"><img src="https://q.dog/assets/previews/asuka--maxg24/thumbnail.png" alt="Asuka プレビュー" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/chibi-rei-pet--bendy"><img src="https://q.dog/assets/previews/chibi-rei-pet--bendy/thumbnail.png" alt="Chibi Rei Pet プレビュー" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/chibi-rei-pet--bendy">Chibi Rei Pet</a></strong><br>作者: @Bendy · カテゴリー: アニメキャラクター · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- chibi-rei-pet--bendy</code><br><br><a href="https://q.dog/pets/chibi-rei-pet--bendy">すべてのアクションを見る →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/chotu--makriman">Chotu</a></strong><br>作者: <a href="https://github.com/makriman">@makriman</a> · カテゴリー: アニメキャラクター · バージョン: v2<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- chotu--makriman</code><br><br><a href="https://q.dog/pets/chotu--makriman">すべてのアクションを見る →</a></td><td width="180" align="center"><a href="https://q.dog/pets/chotu--makriman"><img src="https://q.dog/assets/previews/chotu--makriman/thumbnail.png" alt="Chotu プレビュー" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/conan--chenxin-dlut"><img src="https://q.dog/assets/previews/conan--chenxin-dlut/thumbnail.png" alt="Conan プレビュー" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/conan--chenxin-dlut">Conan</a></strong><br>作者: <a href="https://github.com/chenxin-dlut">@chenxin-dlut</a> · カテゴリー: アニメキャラクター · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- conan--chenxin-dlut</code><br><br><a href="https://q.dog/pets/conan--chenxin-dlut">すべてのアクションを見る →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/doraemon--xueshi">Doraemon</a></strong><br>作者: <a href="https://codex-pets.net/users/xueshi">@xueshi</a> · カテゴリー: アニメキャラクター · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- doraemon--xueshi</code><br><br><a href="https://q.dog/pets/doraemon--xueshi">すべてのアクションを見る →</a></td><td width="180" align="center"><a href="https://q.dog/pets/doraemon--xueshi"><img src="https://q.dog/assets/previews/doraemon--xueshi/thumbnail.png" alt="Doraemon プレビュー" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/elaina--nyakku-shigure"><img src="https://q.dog/assets/previews/elaina--nyakku-shigure/thumbnail.png" alt="Elaina プレビュー" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/elaina--nyakku-shigure">Elaina</a></strong><br>作者: <a href="https://codex-pets.net/users/nyakku-shigure">@nyakku-shigure</a> · カテゴリー: アニメキャラクター · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- elaina--nyakku-shigure</code><br><br><a href="https://q.dog/pets/elaina--nyakku-shigure">すべてのアクションを見る →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/eren--ash-sw">Eren</a></strong><br>作者: <a href="https://codex-pets.net/users/ash-sw">@ash-sw</a> · カテゴリー: アニメキャラクター · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- eren--ash-sw</code><br><br><a href="https://q.dog/pets/eren--ash-sw">すべてのアクションを見る →</a></td><td width="180" align="center"><a href="https://q.dog/pets/eren--ash-sw"><img src="https://q.dog/assets/previews/eren--ash-sw/thumbnail.png" alt="Eren プレビュー" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/frieren--lingxiaotian"><img src="https://q.dog/assets/previews/frieren--lingxiaotian/thumbnail.png" alt="Frieren プレビュー" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/frieren--lingxiaotian">Frieren</a></strong><br>作者: <a href="https://github.com/legeling">@legeling</a> · カテゴリー: アニメキャラクター · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- frieren--lingxiaotian</code><br><br><a href="https://q.dog/pets/frieren--lingxiaotian">すべてのアクションを見る →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/gojo--lilokhalikfa">Gojo</a></strong><br>作者: <a href="https://codex-pets.net/users/lilokhalikfa">@lilokhalikfa</a> · カテゴリー: アニメキャラクター · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- gojo--lilokhalikfa</code><br><br><a href="https://q.dog/pets/gojo--lilokhalikfa">すべてのアクションを見る →</a></td><td width="180" align="center"><a href="https://q.dog/pets/gojo--lilokhalikfa"><img src="https://q.dog/assets/previews/gojo--lilokhalikfa/thumbnail.png" alt="Gojo プレビュー" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/ikaros--icarus-alpha"><img src="https://q.dog/assets/previews/ikaros--icarus-alpha/thumbnail.png" alt="Ikaros プレビュー" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/ikaros--icarus-alpha">Ikaros</a></strong><br>作者: <a href="https://codex-pets.net/users/icarus-alpha">@icarus-alpha</a> · カテゴリー: アニメキャラクター · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- ikaros--icarus-alpha</code><br><br><a href="https://q.dog/pets/ikaros--icarus-alpha">すべてのアクションを見る →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/isekaijoucho--siiverash">Isekaijoucho</a></strong><br>作者: <a href="https://github.com/SiIverAsh">@SiIverAsh</a> · カテゴリー: アニメキャラクター · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- isekaijoucho--siiverash</code><br><br><a href="https://q.dog/pets/isekaijoucho--siiverash">すべてのアクションを見る →</a></td><td width="180" align="center"><a href="https://q.dog/pets/isekaijoucho--siiverash"><img src="https://q.dog/assets/previews/isekaijoucho--siiverash/thumbnail.png" alt="Isekaijoucho プレビュー" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/jolyne-cujoh--d2682787206-sys"><img src="https://q.dog/assets/previews/jolyne-cujoh--d2682787206-sys/thumbnail.png" alt="Jolyne Cujoh プレビュー" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/jolyne-cujoh--d2682787206-sys">Jolyne Cujoh</a></strong><br>作者: <a href="https://github.com/d2682787206-sys">@d2682787206-sys</a> · カテゴリー: アニメキャラクター · バージョン: v2<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- jolyne-cujoh--d2682787206-sys</code><br><br><a href="https://q.dog/pets/jolyne-cujoh--d2682787206-sys">すべてのアクションを見る →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/kaiju-no-8--terry878">Kaiju No. 8</a></strong><br>作者: @TERRY878 · カテゴリー: アニメキャラクター · バージョン: v2<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- kaiju-no-8--terry878</code><br><br><a href="https://q.dog/pets/kaiju-no-8--terry878">すべてのアクションを見る →</a></td><td width="180" align="center"><a href="https://q.dog/pets/kaiju-no-8--terry878"><img src="https://q.dog/assets/previews/kaiju-no-8--terry878/thumbnail.png" alt="Kaiju No. 8 プレビュー" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/kid--chenxin-dlut"><img src="https://q.dog/assets/previews/kid--chenxin-dlut/thumbnail.png" alt="Kid プレビュー" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/kid--chenxin-dlut">Kid</a></strong><br>作者: <a href="https://github.com/chenxin-dlut">@chenxin-dlut</a> · カテゴリー: アニメキャラクター · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- kid--chenxin-dlut</code><br><br><a href="https://q.dog/pets/kid--chenxin-dlut">すべてのアクションを見る →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/kid-goku--julianhuang">Kid Goku</a></strong><br>作者: <a href="https://codex-pets.net/users/julianhuang">@julianhuang</a> · カテゴリー: アニメキャラクター · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- kid-goku--julianhuang</code><br><br><a href="https://q.dog/pets/kid-goku--julianhuang">すべてのアクションを見る →</a></td><td width="180" align="center"><a href="https://q.dog/pets/kid-goku--julianhuang"><img src="https://q.dog/assets/previews/kid-goku--julianhuang/thumbnail.png" alt="Kid Goku プレビュー" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/levi--emrecb"><img src="https://q.dog/assets/previews/levi--emrecb/thumbnail.png" alt="Levi プレビュー" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/levi--emrecb">Levi</a></strong><br>作者: <a href="https://codex-pets.net/users/emrecb">@emrecb</a> · カテゴリー: アニメキャラクター · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- levi--emrecb</code><br><br><a href="https://q.dog/pets/levi--emrecb">すべてのアクションを見る →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/luffy-gear-5--jordsshmords1">Luffy Gear 5</a></strong><br>作者: <a href="https://codex-pets.net/users/jordsshmords1">@jordsshmords1</a> · カテゴリー: アニメキャラクター · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- luffy-gear-5--jordsshmords1</code><br><br><a href="https://q.dog/pets/luffy-gear-5--jordsshmords1">すべてのアクションを見る →</a></td><td width="180" align="center"><a href="https://q.dog/pets/luffy-gear-5--jordsshmords1"><img src="https://q.dog/assets/previews/luffy-gear-5--jordsshmords1/thumbnail.png" alt="Luffy Gear 5 プレビュー" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/mahiro--lingxiaotian"><img src="https://q.dog/assets/previews/mahiro--lingxiaotian/thumbnail.png" alt="Mahiro プレビュー" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/mahiro--lingxiaotian">Mahiro</a></strong><br>作者: <a href="https://github.com/legeling">@legeling</a> · カテゴリー: アニメキャラクター · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- mahiro--lingxiaotian</code><br><br><a href="https://q.dog/pets/mahiro--lingxiaotian">すべてのアクションを見る →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/makima-coat--yuyuabc1">Makima (Coat)</a></strong><br>作者: <a href="https://github.com/yuyuabc1">@yuyuabc1</a> · カテゴリー: アニメキャラクター · バージョン: v2<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- makima-coat--yuyuabc1</code><br><br><a href="https://q.dog/pets/makima-coat--yuyuabc1">すべてのアクションを見る →</a></td><td width="180" align="center"><a href="https://q.dog/pets/makima-coat--yuyuabc1"><img src="https://q.dog/assets/previews/makima-coat--yuyuabc1/thumbnail.png" alt="Makima (Coat) プレビュー" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/makimamini--1sh1ro"><img src="https://q.dog/assets/previews/makimamini--1sh1ro/thumbnail.png" alt="MakimaMini プレビュー" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/makimamini--1sh1ro">MakimaMini</a></strong><br>作者: @1sh1ro · カテゴリー: アニメキャラクター · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- makimamini--1sh1ro</code><br><br><a href="https://q.dog/pets/makimamini--1sh1ro">すべてのアクションを見る →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/makisekurisu--m1gr4ine">Makise Kurisu</a></strong><br>作者: @m1gr4ine · カテゴリー: アニメキャラクター · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- makisekurisu--m1gr4ine</code><br><br><a href="https://q.dog/pets/makisekurisu--m1gr4ine">すべてのアクションを見る →</a></td><td width="180" align="center"><a href="https://q.dog/pets/makisekurisu--m1gr4ine"><img src="https://q.dog/assets/previews/makisekurisu--m1gr4ine/thumbnail.png" alt="Makise Kurisu プレビュー" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/mihari--hyoni1129"><img src="https://q.dog/assets/previews/mihari--hyoni1129/thumbnail.png" alt="Mihari プレビュー" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/mihari--hyoni1129">Mihari</a></strong><br>作者: <a href="https://github.com/Hyoni1129">@Hyoni1129</a> · カテゴリー: アニメキャラクター · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- mihari--hyoni1129</code><br><br><a href="https://q.dog/pets/mihari--hyoni1129">すべてのアクションを見る →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/mikoto--lingxiaotian">Mikoto</a></strong><br>作者: <a href="https://github.com/legeling">@legeling</a> · カテゴリー: アニメキャラクター · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- mikoto--lingxiaotian</code><br><br><a href="https://q.dog/pets/mikoto--lingxiaotian">すべてのアクションを見る →</a></td><td width="180" align="center"><a href="https://q.dog/pets/mikoto--lingxiaotian"><img src="https://q.dog/assets/previews/mikoto--lingxiaotian/thumbnail.png" alt="Mikoto プレビュー" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/miku--lingxiaotian"><img src="https://q.dog/assets/previews/miku--lingxiaotian/thumbnail.png" alt="Miku プレビュー" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/miku--lingxiaotian">Miku</a></strong><br>作者: <a href="https://github.com/legeling">@legeling</a> · カテゴリー: アニメキャラクター · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- miku--lingxiaotian</code><br><br><a href="https://q.dog/pets/miku--lingxiaotian">すべてのアクションを見る →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/misaka-network--ldl1234">Misaka Network</a></strong><br>作者: <a href="https://github.com/ldl1234">@ldl1234</a> · カテゴリー: アニメキャラクター · バージョン: v2<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- misaka-network--ldl1234</code><br><br><a href="https://q.dog/pets/misaka-network--ldl1234">すべてのアクションを見る →</a></td><td width="180" align="center"><a href="https://q.dog/pets/misaka-network--ldl1234"><img src="https://q.dog/assets/previews/misaka-network--ldl1234/thumbnail.png" alt="Misaka Network プレビュー" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/nimbus--soraberu"><img src="https://q.dog/assets/previews/nimbus--soraberu/thumbnail.png" alt="Nimbus プレビュー" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/nimbus--soraberu">Nimbus</a></strong><br>作者: <a href="https://codex-pets.net/users/soraberu">@soraberu</a> · カテゴリー: アニメキャラクター · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- nimbus--soraberu</code><br><br><a href="https://q.dog/pets/nimbus--soraberu">すべてのアクションを見る →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/rem--l1">Rem</a></strong><br>作者: <a href="https://codex-pets.net/users/l1">@l1</a> · カテゴリー: アニメキャラクター · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- rem--l1</code><br><br><a href="https://q.dog/pets/rem--l1">すべてのアクションを見る →</a></td><td width="180" align="center"><a href="https://q.dog/pets/rem--l1"><img src="https://q.dog/assets/previews/rem--l1/thumbnail.png" alt="Rem プレビュー" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/rinami--siiverash"><img src="https://q.dog/assets/previews/rinami--siiverash/thumbnail.png" alt="Rinami Himesaki プレビュー" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/rinami--siiverash">Rinami Himesaki</a></strong><br>作者: <a href="https://github.com/SiIverAsh">@SiIverAsh</a> · カテゴリー: アニメキャラクター · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- rinami--siiverash</code><br><br><a href="https://q.dog/pets/rinami--siiverash">すべてのアクションを見る →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/roxy-pixel--gravity">Roxy Pixel</a></strong><br>作者: @gravity · カテゴリー: アニメキャラクター · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- roxy-pixel--gravity</code><br><br><a href="https://q.dog/pets/roxy-pixel--gravity">すべてのアクションを見る →</a></td><td width="180" align="center"><a href="https://q.dog/pets/roxy-pixel--gravity"><img src="https://q.dog/assets/previews/roxy-pixel--gravity/thumbnail.png" alt="Roxy Pixel プレビュー" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/saber--petdex-zhenyou-ling"><img src="https://q.dog/assets/previews/saber--petdex-zhenyou-ling/thumbnail.png" alt="Saber プレビュー" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/saber--petdex-zhenyou-ling">Saber</a></strong><br>作者: @真宵 绫. · カテゴリー: アニメキャラクター · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- saber--petdex-zhenyou-ling</code><br><br><a href="https://q.dog/pets/saber--petdex-zhenyou-ling">すべてのアクションを見る →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/gintoki-pixel--yuu-m">Sakata Gintoki</a></strong><br>作者: @Yuu M. · カテゴリー: アニメキャラクター · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- gintoki-pixel--yuu-m</code><br><br><a href="https://q.dog/pets/gintoki-pixel--yuu-m">すべてのアクションを見る →</a></td><td width="180" align="center"><a href="https://q.dog/pets/gintoki-pixel--yuu-m"><img src="https://q.dog/assets/previews/gintoki-pixel--yuu-m/thumbnail.png" alt="Sakata Gintoki プレビュー" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/shinchan--chenxin-dlut"><img src="https://q.dog/assets/previews/shinchan--chenxin-dlut/thumbnail.png" alt="Shinchan プレビュー" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/shinchan--chenxin-dlut">Shinchan</a></strong><br>作者: <a href="https://github.com/chenxin-dlut">@chenxin-dlut</a> · カテゴリー: アニメキャラクター · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- shinchan--chenxin-dlut</code><br><br><a href="https://q.dog/pets/shinchan--chenxin-dlut">すべてのアクションを見る →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/takamatsu-tomori--a1wace-dev">Takamatsu Tomori</a></strong><br>作者: @A1wace-dev · カテゴリー: アニメキャラクター · バージョン: v2<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- takamatsu-tomori--a1wace-dev</code><br><br><a href="https://q.dog/pets/takamatsu-tomori--a1wace-dev">すべてのアクションを見る →</a></td><td width="180" align="center"><a href="https://q.dog/pets/takamatsu-tomori--a1wace-dev"><img src="https://q.dog/assets/previews/takamatsu-tomori--a1wace-dev/thumbnail.png" alt="Takamatsu Tomori プレビュー" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/violet--lazenca"><img src="https://q.dog/assets/previews/violet--lazenca/thumbnail.png" alt="Violet プレビュー" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/violet--lazenca">Violet</a></strong><br>作者: <a href="https://codex-pets.net/users/lazenca">@lazenca</a> · カテゴリー: アニメキャラクター · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- violet--lazenca</code><br><br><a href="https://q.dog/pets/violet--lazenca">すべてのアクションを見る →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/wakaba-mutsumi--carambola">Wakaba Mutsumi</a></strong><br>作者: @Carambola · カテゴリー: アニメキャラクター · バージョン: v2<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- wakaba-mutsumi--carambola</code><br><br><a href="https://q.dog/pets/wakaba-mutsumi--carambola">すべてのアクションを見る →</a></td><td width="180" align="center"><a href="https://q.dog/pets/wakaba-mutsumi--carambola"><img src="https://q.dog/assets/previews/wakaba-mutsumi--carambola/thumbnail.png" alt="Wakaba Mutsumi プレビュー" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/inosuke-hashibira--wangfan002"><img src="https://q.dog/assets/previews/inosuke-hashibira--wangfan002/thumbnail.png" alt="伊之助 Q版 丰富动作 プレビュー" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/inosuke-hashibira--wangfan002">伊之助 Q版 丰富动作</a></strong><br>作者: @wangfan002 · カテゴリー: アニメキャラクター · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- inosuke-hashibira--wangfan002</code><br><br><a href="https://q.dog/pets/inosuke-hashibira--wangfan002">すべてのアクションを見る →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/nangong-wan--bpup">南宫婉</a></strong><br>作者: <a href="https://github.com/bpup">@bpup</a> · カテゴリー: アニメキャラクター · バージョン: v2<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- nangong-wan--bpup</code><br><br><a href="https://q.dog/pets/nangong-wan--bpup">すべてのアクションを見る →</a></td><td width="180" align="center"><a href="https://q.dog/pets/nangong-wan--bpup"><img src="https://q.dog/assets/previews/nangong-wan--bpup/thumbnail.png" alt="南宫婉 プレビュー" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/zenitsu-agatsuma--wangfan002"><img src="https://q.dog/assets/previews/zenitsu-agatsuma--wangfan002/thumbnail.png" alt="善逸 Q版 丰富动作 プレビュー" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/zenitsu-agatsuma--wangfan002">善逸 Q版 丰富动作</a></strong><br>作者: @wangfan002 · カテゴリー: アニメキャラクター · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- zenitsu-agatsuma--wangfan002</code><br><br><a href="https://q.dog/pets/zenitsu-agatsuma--wangfan002">すべてのアクションを見る →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/giyu-tomioka--wangfan002">富冈义勇 Q版 丰富动作</a></strong><br>作者: @wangfan002 · カテゴリー: アニメキャラクター · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- giyu-tomioka--wangfan002</code><br><br><a href="https://q.dog/pets/giyu-tomioka--wangfan002">すべてのアクションを見る →</a></td><td width="180" align="center"><a href="https://q.dog/pets/giyu-tomioka--wangfan002"><img src="https://q.dog/assets/previews/giyu-tomioka--wangfan002/thumbnail.png" alt="富冈义勇 Q版 丰富动作 プレビュー" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/muichiro-tokito--wangfan002"><img src="https://q.dog/assets/previews/muichiro-tokito--wangfan002/thumbnail.png" alt="时透无一郎 Q版 空灵动作 プレビュー" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/muichiro-tokito--wangfan002">时透无一郎 Q版 空灵动作</a></strong><br>作者: @wangfan002 · カテゴリー: アニメキャラクター · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- muichiro-tokito--wangfan002</code><br><br><a href="https://q.dog/pets/muichiro-tokito--wangfan002">すべてのアクションを見る →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/tanjiro-kamado--wangfan002">炭治郎 Q版 丰富动作</a></strong><br>作者: @wangfan002 · カテゴリー: アニメキャラクター · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- tanjiro-kamado--wangfan002</code><br><br><a href="https://q.dog/pets/tanjiro-kamado--wangfan002">すべてのアクションを見る →</a></td><td width="180" align="center"><a href="https://q.dog/pets/tanjiro-kamado--wangfan002"><img src="https://q.dog/assets/previews/tanjiro-kamado--wangfan002/thumbnail.png" alt="炭治郎 Q版 丰富动作 プレビュー" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/nezuko-kamado--wangfan002"><img src="https://q.dog/assets/previews/nezuko-kamado--wangfan002/thumbnail.png" alt="祢豆子 Q版 丰富动作 プレビュー" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/nezuko-kamado--wangfan002">祢豆子 Q版 丰富动作</a></strong><br>作者: @wangfan002 · カテゴリー: アニメキャラクター · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- nezuko-kamado--wangfan002</code><br><br><a href="https://q.dog/pets/nezuko-kamado--wangfan002">すべてのアクションを見る →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/shinobu-kocho--wangfan002">蝴蝶忍 Q版 华丽动作</a></strong><br>作者: @wangfan002 · カテゴリー: アニメキャラクター · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- shinobu-kocho--wangfan002</code><br><br><a href="https://q.dog/pets/shinobu-kocho--wangfan002">すべてのアクションを見る →</a></td><td width="180" align="center"><a href="https://q.dog/pets/shinobu-kocho--wangfan002"><img src="https://q.dog/assets/previews/shinobu-kocho--wangfan002/thumbnail.png" alt="蝴蝶忍 Q版 华丽动作 プレビュー" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/bocchi--lingxiaotian"><img src="https://q.dog/assets/previews/bocchi--lingxiaotian/thumbnail.png" alt="Bocchi プレビュー" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/bocchi--lingxiaotian">Bocchi</a></strong><br>作者: <a href="https://github.com/legeling">@legeling</a> · カテゴリー: アニメキャラクター · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- bocchi--lingxiaotian</code><br><br><a href="https://q.dog/pets/bocchi--lingxiaotian">すべてのアクションを見る →</a></td></tr>
</table>

### オリジナルキャラクター

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/aiko--chenxin-dlut">Aiko</a></strong><br>作者: <a href="https://github.com/chenxin-dlut">@chenxin-dlut</a> · カテゴリー: オリジナルキャラクター · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- aiko--chenxin-dlut</code><br><br><a href="https://q.dog/pets/aiko--chenxin-dlut">すべてのアクションを見る →</a></td><td width="180" align="center"><a href="https://q.dog/pets/aiko--chenxin-dlut"><img src="https://q.dog/assets/previews/aiko--chenxin-dlut/thumbnail.png" alt="Aiko プレビュー" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/diana--am"><img src="https://q.dog/assets/previews/diana--am/thumbnail.png" alt="Diana プレビュー" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/diana--am">Diana</a></strong><br>作者: @am · カテゴリー: オリジナルキャラクター · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- diana--am</code><br><br><a href="https://q.dog/pets/diana--am">すべてのアクションを見る →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/hajimi--zeyuwang1999">Hajimi</a></strong><br>作者: <a href="https://github.com/zeyuwang1999">@zeyuwang1999</a> · カテゴリー: オリジナルキャラクター · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- hajimi--zeyuwang1999</code><br><br><a href="https://q.dog/pets/hajimi--zeyuwang1999">すべてのアクションを見る →</a></td><td width="180" align="center"><a href="https://q.dog/pets/hajimi--zeyuwang1999"><img src="https://q.dog/assets/previews/hajimi--zeyuwang1999/thumbnail.png" alt="Hajimi プレビュー" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/hamo--haipengzzz"><img src="https://q.dog/assets/previews/hamo--haipengzzz/thumbnail.png" alt="Hamo プレビュー" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/hamo--haipengzzz">Hamo</a></strong><br>作者: <a href="https://github.com/haipengzzz">@haipengzzz</a> · カテゴリー: オリジナルキャラクター · バージョン: v2<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- hamo--haipengzzz</code><br><br><a href="https://q.dog/pets/hamo--haipengzzz">すべてのアクションを見る →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/hana2--initiatione">Hana2</a></strong><br>作者: <a href="https://github.com/initiatione">@initiatione</a> · カテゴリー: オリジナルキャラクター · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- hana2--initiatione</code><br><br><a href="https://q.dog/pets/hana2--initiatione">すべてのアクションを見る →</a></td><td width="180" align="center"><a href="https://q.dog/pets/hana2--initiatione"><img src="https://q.dog/assets/previews/hana2--initiatione/thumbnail.png" alt="Hana2 プレビュー" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/iris--yau-427"><img src="https://q.dog/assets/previews/iris--yau-427/thumbnail.png" alt="Iris プレビュー" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/iris--yau-427">Iris</a></strong><br>作者: <a href="https://github.com/Yau-427">@Yau-427</a> · カテゴリー: オリジナルキャラクター · バージョン: v2<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- iris--yau-427</code><br><br><a href="https://q.dog/pets/iris--yau-427">すべてのアクションを見る →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/jesse-the-fox--itjesse">JesseTheFox</a></strong><br>作者: <a href="https://github.com/ITJesse">@ITJesse</a> · カテゴリー: オリジナルキャラクター · バージョン: v2<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- jesse-the-fox--itjesse</code><br><br><a href="https://q.dog/pets/jesse-the-fox--itjesse">すべてのアクションを見る →</a></td><td width="180" align="center"><a href="https://q.dog/pets/jesse-the-fox--itjesse"><img src="https://q.dog/assets/previews/jesse-the-fox--itjesse/thumbnail.png" alt="JesseTheFox プレビュー" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/joker--oytyo"><img src="https://q.dog/assets/previews/joker--oytyo/thumbnail.png" alt="Joker プレビュー" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/joker--oytyo">Joker</a></strong><br>作者: @oytyo · カテゴリー: オリジナルキャラクター · バージョン: v2<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- joker--oytyo</code><br><br><a href="https://q.dog/pets/joker--oytyo">すべてのアクションを見る →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/linnea--nyakku-shigure">Linnea</a></strong><br>作者: @nyakku-shigure · カテゴリー: オリジナルキャラクター · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- linnea--nyakku-shigure</code><br><br><a href="https://q.dog/pets/linnea--nyakku-shigure">すべてのアクションを見る →</a></td><td width="180" align="center"><a href="https://q.dog/pets/linnea--nyakku-shigure"><img src="https://q.dog/assets/previews/linnea--nyakku-shigure/thumbnail.png" alt="Linnea プレビュー" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/mika--rotl24"><img src="https://q.dog/assets/previews/mika--rotl24/thumbnail.png" alt="Mika プレビュー" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/mika--rotl24">Mika</a></strong><br>作者: <a href="https://github.com/ROTl24">@ROTl24</a> · カテゴリー: オリジナルキャラクター · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- mika--rotl24</code><br><br><a href="https://q.dog/pets/mika--rotl24">すべてのアクションを見る →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/minty--somnusochi">Minty</a></strong><br>作者: <a href="https://github.com/Somnusochi">@Somnusochi</a> · カテゴリー: オリジナルキャラクター · バージョン: v2<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- minty--somnusochi</code><br><br><a href="https://q.dog/pets/minty--somnusochi">すべてのアクションを見る →</a></td><td width="180" align="center"><a href="https://q.dog/pets/minty--somnusochi"><img src="https://q.dog/assets/previews/minty--somnusochi/thumbnail.png" alt="Minty プレビュー" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/ruruka--ltmcliao-cmyk"><img src="https://q.dog/assets/previews/ruruka--ltmcliao-cmyk/thumbnail.png" alt="RuRuKa プレビュー" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/ruruka--ltmcliao-cmyk">RuRuKa</a></strong><br>作者: <a href="https://github.com/ltmcliao-cmyk">@ltmcliao-cmyk</a> · カテゴリー: オリジナルキャラクター · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- ruruka--ltmcliao-cmyk</code><br><br><a href="https://q.dog/pets/ruruka--ltmcliao-cmyk">すべてのアクションを見る →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/shian-helper--mistyshen">Shian</a></strong><br>作者: <a href="https://github.com/mistyShen">@mistyShen</a> · カテゴリー: オリジナルキャラクター · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- shian-helper--mistyshen</code><br><br><a href="https://q.dog/pets/shian-helper--mistyshen">すべてのアクションを見る →</a></td><td width="180" align="center"><a href="https://q.dog/pets/shian-helper--mistyshen"><img src="https://q.dog/assets/previews/shian-helper--mistyshen/thumbnail.png" alt="Shian プレビュー" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/yier--gbn666"><img src="https://q.dog/assets/previews/yier--gbn666/thumbnail.png" alt="Yi Er プレビュー" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/yier--gbn666">Yi Er</a></strong><br>作者: <a href="https://github.com/gbn666">@gbn666</a> · カテゴリー: オリジナルキャラクター · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- yier--gbn666</code><br><br><a href="https://q.dog/pets/yier--gbn666">すべてのアクションを見る →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/yume-boundary--andy-meow">Yume</a></strong><br>作者: @andy-meow · カテゴリー: オリジナルキャラクター · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- yume-boundary--andy-meow</code><br><br><a href="https://q.dog/pets/yume-boundary--andy-meow">すべてのアクションを見る →</a></td><td width="180" align="center"><a href="https://q.dog/pets/yume-boundary--andy-meow"><img src="https://q.dog/assets/previews/yume-boundary--andy-meow/thumbnail.png" alt="Yume プレビュー" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/yuzubou--keseras34938976"><img src="https://q.dog/assets/previews/yuzubou--keseras34938976/thumbnail.png" alt="Yuzubou プレビュー" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/yuzubou--keseras34938976">Yuzubou</a></strong><br>作者: <a href="https://github.com/Keseras34938976">@Keseras34938976</a> · カテゴリー: オリジナルキャラクター · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- yuzubou--keseras34938976</code><br><br><a href="https://q.dog/pets/yuzubou--keseras34938976">すべてのアクションを見る →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/gudong--rank">咕咚</a></strong><br>作者: @Rank · カテゴリー: オリジナルキャラクター · バージョン: v2<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- gudong--rank</code><br><br><a href="https://q.dog/pets/gudong--rank">すべてのアクションを見る →</a></td><td width="180" align="center"><a href="https://q.dog/pets/gudong--rank"><img src="https://q.dog/assets/previews/gudong--rank/thumbnail.png" alt="咕咚 プレビュー" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/liubao--killyer"><img src="https://q.dog/assets/previews/liubao--killyer/thumbnail.png" alt="榴宝 プレビュー" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/liubao--killyer">榴宝</a></strong><br>作者: @killyer · カテゴリー: オリジナルキャラクター · バージョン: v2<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- liubao--killyer</code><br><br><a href="https://q.dog/pets/liubao--killyer">すべてのアクションを見る →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/feibi--vanfff">菲比</a></strong><br>作者: @vanfff · カテゴリー: オリジナルキャラクター · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- feibi--vanfff</code><br><br><a href="https://q.dog/pets/feibi--vanfff">すべてのアクションを見る →</a></td><td width="180" align="center"><a href="https://q.dog/pets/feibi--vanfff"><img src="https://q.dog/assets/previews/feibi--vanfff/thumbnail.png" alt="菲比 プレビュー" width="160" height="173"></a></td></tr>
</table>

### マスコット

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/aemeath-mini--cunuo"><img src="https://q.dog/assets/previews/aemeath-mini--cunuo/thumbnail.png" alt="Aemeath Mini プレビュー" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/aemeath-mini--cunuo">Aemeath Mini</a></strong><br>作者: <a href="https://github.com/cuNuo">@cuNuo</a> · カテゴリー: マスコット · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- aemeath-mini--cunuo</code><br><br><a href="https://q.dog/pets/aemeath-mini--cunuo">すべてのアクションを見る →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/apu--xchangee">Apu</a></strong><br>作者: <a href="https://github.com/xchangee">@xchangee</a> · カテゴリー: マスコット · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- apu--xchangee</code><br><br><a href="https://q.dog/pets/apu--xchangee">すべてのアクションを見る →</a></td><td width="180" align="center"><a href="https://q.dog/pets/apu--xchangee"><img src="https://q.dog/assets/previews/apu--xchangee/thumbnail.png" alt="Apu プレビュー" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/claude--xiangking"><img src="https://q.dog/assets/previews/claude--xiangking/thumbnail.png" alt="Claude プレビュー" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/claude--xiangking">Claude</a></strong><br>作者: <a href="https://github.com/xiangking">@xiangking</a> · カテゴリー: マスコット · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- claude--xiangking</code><br><br><a href="https://q.dog/pets/claude--xiangking">すべてのアクションを見る →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/twinkle-twinkle--twinkletwinkle">Dashun's Twinkle Twinkle</a></strong><br>作者: @twinkletwinkle · カテゴリー: マスコット · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- twinkle-twinkle--twinkletwinkle</code><br><br><a href="https://q.dog/pets/twinkle-twinkle--twinkletwinkle">すべてのアクションを見る →</a></td><td width="180" align="center"><a href="https://q.dog/pets/twinkle-twinkle--twinkletwinkle"><img src="https://q.dog/assets/previews/twinkle-twinkle--twinkletwinkle/thumbnail.png" alt="Dashun's Twinkle Twinkle プレビュー" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/diaoyi-baobao--d1a0y1bb"><img src="https://q.dog/assets/previews/diaoyi-baobao--d1a0y1bb/thumbnail.png" alt="Diaoyi Baobao プレビュー" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/diaoyi-baobao--d1a0y1bb">Diaoyi Baobao</a></strong><br>作者: <a href="https://github.com/D1a0y1bb">@D1a0y1bb</a> · カテゴリー: マスコット · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- diaoyi-baobao--d1a0y1bb</code><br><br><a href="https://q.dog/pets/diaoyi-baobao--d1a0y1bb">すべてのアクションを見る →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/gpt-muse--opask">GPT-muse</a></strong><br>作者: @opask · カテゴリー: マスコット · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- gpt-muse--opask</code><br><br><a href="https://q.dog/pets/gpt-muse--opask">すべてのアクションを見る →</a></td><td width="180" align="center"><a href="https://q.dog/pets/gpt-muse--opask"><img src="https://q.dog/assets/previews/gpt-muse--opask/thumbnail.png" alt="GPT-muse プレビュー" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/lulu--yogazz"><img src="https://q.dog/assets/previews/lulu--yogazz/thumbnail.png" alt="Lulu プレビュー" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/lulu--yogazz">Lulu</a></strong><br>作者: <a href="https://github.com/YoGazz">@YoGazz</a> · カテゴリー: マスコット · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- lulu--yogazz</code><br><br><a href="https://q.dog/pets/lulu--yogazz">すべてのアクションを見る →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/saki--rookie-09">Saki</a></strong><br>作者: <a href="https://github.com/rookie-09">@rookie-09</a> · カテゴリー: マスコット · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- saki--rookie-09</code><br><br><a href="https://q.dog/pets/saki--rookie-09">すべてのアクションを見る →</a></td><td width="180" align="center"><a href="https://q.dog/pets/saki--rookie-09"><img src="https://q.dog/assets/previews/saki--rookie-09/thumbnail.png" alt="Saki プレビュー" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/wally--wally025"><img src="https://q.dog/assets/previews/wally--wally025/thumbnail.png" alt="Wally プレビュー" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/wally--wally025">Wally</a></strong><br>作者: <a href="https://github.com/wally025">@wally025</a> · カテゴリー: マスコット · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- wally--wally025</code><br><br><a href="https://q.dog/pets/wally--wally025">すべてのアクションを見る →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/zhengyin--noonwake">Zhengyin</a></strong><br>作者: <a href="https://pets.usefulmint.com/?utm_source=awesome_codex_pet&utm_medium=directory&utm_campaign=founding_five&utm_content=zhengyin_listing">@noonwake-ai</a> · カテゴリー: マスコット · バージョン: v2<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- zhengyin--noonwake</code><br><br><a href="https://q.dog/pets/zhengyin--noonwake">すべてのアクションを見る →</a></td><td width="180" align="center"><a href="https://q.dog/pets/zhengyin--noonwake"><img src="https://q.dog/assets/previews/zhengyin--noonwake/thumbnail.png" alt="Zhengyin プレビュー" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/happynailong--aquaxyy"><img src="https://q.dog/assets/previews/happynailong--aquaxyy/thumbnail.png" alt="大笑奶龙 プレビュー" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/happynailong--aquaxyy">大笑奶龙</a></strong><br>作者: @aquaxyy · カテゴリー: マスコット · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- happynailong--aquaxyy</code><br><br><a href="https://q.dog/pets/happynailong--aquaxyy">すべてのアクションを見る →</a></td></tr>
</table>

### 動物の仲間

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/becky--natewanggg">Becky</a></strong><br>作者: <a href="https://github.com/NateWanggg">@NateWanggg</a> · カテゴリー: 動物の仲間 · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- becky--natewanggg</code><br><br><a href="https://q.dog/pets/becky--natewanggg">すべてのアクションを見る →</a></td><td width="180" align="center"><a href="https://q.dog/pets/becky--natewanggg"><img src="https://q.dog/assets/previews/becky--natewanggg/thumbnail.png" alt="Becky プレビュー" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/bubu--gbn666"><img src="https://q.dog/assets/previews/bubu--gbn666/thumbnail.png" alt="Bubu プレビュー" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/bubu--gbn666">Bubu</a></strong><br>作者: <a href="https://github.com/gbn666">@gbn666</a> · カテゴリー: 動物の仲間 · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- bubu--gbn666</code><br><br><a href="https://q.dog/pets/bubu--gbn666">すべてのアクションを見る →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/corgi-companion--cxian0928-afk">Corgi Companion</a></strong><br>作者: <a href="https://github.com/cxian0928-afk">@cxian0928-afk</a> · カテゴリー: 動物の仲間 · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- corgi-companion--cxian0928-afk</code><br><br><a href="https://q.dog/pets/corgi-companion--cxian0928-afk">すべてのアクションを見る →</a></td><td width="180" align="center"><a href="https://q.dog/pets/corgi-companion--cxian0928-afk"><img src="https://q.dog/assets/previews/corgi-companion--cxian0928-afk/thumbnail.png" alt="Corgi Companion プレビュー" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/desk-otter--zihualiu1997"><img src="https://q.dog/assets/previews/desk-otter--zihualiu1997/thumbnail.png" alt="Desk Otter プレビュー" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/desk-otter--zihualiu1997">Desk Otter</a></strong><br>作者: <a href="https://github.com/zihualiu1997">@zihualiu1997</a> · カテゴリー: 動物の仲間 · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- desk-otter--zihualiu1997</code><br><br><a href="https://q.dog/pets/desk-otter--zihualiu1997">すべてのアクションを見る →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/diandian--lllucasxu">Diandian</a></strong><br>作者: <a href="https://github.com/LLLucasXU">@LLLucasXU</a> · カテゴリー: 動物の仲間 · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- diandian--lllucasxu</code><br><br><a href="https://q.dog/pets/diandian--lllucasxu">すべてのアクションを見る →</a></td><td width="180" align="center"><a href="https://q.dog/pets/diandian--lllucasxu"><img src="https://q.dog/assets/previews/diandian--lllucasxu/thumbnail.png" alt="Diandian プレビュー" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/dudu-bubu--clembuilds"><img src="https://q.dog/assets/previews/dudu-bubu--clembuilds/thumbnail.png" alt="Dudu & Bubu プレビュー" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/dudu-bubu--clembuilds">Dudu & Bubu</a></strong><br>作者: @clembuilds · カテゴリー: 動物の仲間 · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- dudu-bubu--clembuilds</code><br><br><a href="https://q.dog/pets/dudu-bubu--clembuilds">すべてのアクションを見る →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/ella-wave--sehjk">Ella Wave</a></strong><br>作者: @sehjk · カテゴリー: 動物の仲間 · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- ella-wave--sehjk</code><br><br><a href="https://q.dog/pets/ella-wave--sehjk">すべてのアクションを見る →</a></td><td width="180" align="center"><a href="https://q.dog/pets/ella-wave--sehjk"><img src="https://q.dog/assets/previews/ella-wave--sehjk/thumbnail.png" alt="Ella Wave プレビュー" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/fleta--natewanggg"><img src="https://q.dog/assets/previews/fleta--natewanggg/thumbnail.png" alt="Fleta プレビュー" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/fleta--natewanggg">Fleta</a></strong><br>作者: <a href="https://github.com/NateWanggg">@NateWanggg</a> · カテゴリー: 動物の仲間 · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- fleta--natewanggg</code><br><br><a href="https://q.dog/pets/fleta--natewanggg">すべてのアクションを見る →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/frankie--aygunvarol">Frankie</a></strong><br>作者: <a href="https://github.com/AygunVarol">@AygunVarol</a> · カテゴリー: 動物の仲間 · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- frankie--aygunvarol</code><br><br><a href="https://q.dog/pets/frankie--aygunvarol">すべてのアクションを見る →</a></td><td width="180" align="center"><a href="https://q.dog/pets/frankie--aygunvarol"><img src="https://q.dog/assets/previews/frankie--aygunvarol/thumbnail.png" alt="Frankie プレビュー" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/jiji--yena"><img src="https://q.dog/assets/previews/jiji--yena/thumbnail.png" alt="Jiji プレビュー" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/jiji--yena">Jiji</a></strong><br>作者: @yena · カテゴリー: 動物の仲間 · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- jiji--yena</code><br><br><a href="https://q.dog/pets/jiji--yena">すべてのアクションを見る →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/kiko--untko">Kiko</a></strong><br>作者: <a href="https://github.com/untko">@untko</a> · カテゴリー: 動物の仲間 · バージョン: v2<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- kiko--untko</code><br><br><a href="https://q.dog/pets/kiko--untko">すべてのアクションを見る →</a></td><td width="180" align="center"><a href="https://q.dog/pets/kiko--untko"><img src="https://q.dog/assets/previews/kiko--untko/thumbnail.png" alt="Kiko プレビュー" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/kimoju--andiac"><img src="https://q.dog/assets/previews/kimoju--andiac/thumbnail.png" alt="Kimoju プレビュー" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/kimoju--andiac">Kimoju</a></strong><br>作者: @andiac · カテゴリー: 動物の仲間 · バージョン: v2<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- kimoju--andiac</code><br><br><a href="https://q.dog/pets/kimoju--andiac">すべてのアクションを見る →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/lil-swole--gg0805">Lil Swole</a></strong><br>作者: <a href="https://github.com/gg0805">@gg0805</a> · カテゴリー: 動物の仲間 · バージョン: v2<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- lil-swole--gg0805</code><br><br><a href="https://q.dog/pets/lil-swole--gg0805">すべてのアクションを見る →</a></td><td width="180" align="center"><a href="https://q.dog/pets/lil-swole--gg0805"><img src="https://q.dog/assets/previews/lil-swole--gg0805/thumbnail.png" alt="Lil Swole プレビュー" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/little-sheep--mingdong"><img src="https://q.dog/assets/previews/little-sheep--mingdong/thumbnail.png" alt="Little Sheep プレビュー" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/little-sheep--mingdong">Little Sheep</a></strong><br>作者: @MingDong · カテゴリー: 動物の仲間 · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- little-sheep--mingdong</code><br><br><a href="https://q.dog/pets/little-sheep--mingdong">すべてのアクションを見る →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/mai--dwdestiny">Mai</a></strong><br>作者: <a href="https://github.com/DwDestiny">@DwDestiny</a> · カテゴリー: 動物の仲間 · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- mai--dwdestiny</code><br><br><a href="https://q.dog/pets/mai--dwdestiny">すべてのアクションを見る →</a></td><td width="180" align="center"><a href="https://q.dog/pets/mai--dwdestiny"><img src="https://q.dog/assets/previews/mai--dwdestiny/thumbnail.png" alt="Mai プレビュー" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/mellow-duck--sally-entr"><img src="https://q.dog/assets/previews/mellow-duck--sally-entr/thumbnail.png" alt="Mellow Duck プレビュー" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/mellow-duck--sally-entr">Mellow Duck</a></strong><br>作者: @sally-entr · カテゴリー: 動物の仲間 · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- mellow-duck--sally-entr</code><br><br><a href="https://q.dog/pets/mellow-duck--sally-entr">すべてのアクションを見る →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/mimi--spacebody">Mimi</a></strong><br>作者: <a href="https://github.com/Spacebody">@Spacebody</a> · カテゴリー: 動物の仲間 · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- mimi--spacebody</code><br><br><a href="https://q.dog/pets/mimi--spacebody">すべてのアクションを見る →</a></td><td width="180" align="center"><a href="https://q.dog/pets/mimi--spacebody"><img src="https://q.dog/assets/previews/mimi--spacebody/thumbnail.png" alt="Mimi プレビュー" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/moomew-coder-cat--ping"><img src="https://q.dog/assets/previews/moomew-coder-cat--ping/thumbnail.png" alt="MooMew Coder プレビュー" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/moomew-coder-cat--ping">MooMew Coder</a></strong><br>作者: @ping · カテゴリー: 動物の仲間 · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- moomew-coder-cat--ping</code><br><br><a href="https://q.dog/pets/moomew-coder-cat--ping">すべてのアクションを見る →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/panda--jason-bai">Panda</a></strong><br>作者: <a href="https://github.com/Jason-Bai">@Jason-Bai</a> · カテゴリー: 動物の仲間 · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- panda--jason-bai</code><br><br><a href="https://q.dog/pets/panda--jason-bai">すべてのアクションを見る →</a></td><td width="180" align="center"><a href="https://q.dog/pets/panda--jason-bai"><img src="https://q.dog/assets/previews/panda--jason-bai/thumbnail.png" alt="Panda プレビュー" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/pixel-duck--flamurmaliqi"><img src="https://q.dog/assets/previews/pixel-duck--flamurmaliqi/thumbnail.png" alt="Pixel Duck プレビュー" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/pixel-duck--flamurmaliqi">Pixel Duck</a></strong><br>作者: <a href="https://github.com/FlamurMaliqi">@FlamurMaliqi</a> · カテゴリー: 動物の仲間 · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- pixel-duck--flamurmaliqi</code><br><br><a href="https://q.dog/pets/pixel-duck--flamurmaliqi">すべてのアクションを見る →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/rook--klubbyte">Rook</a></strong><br>作者: @klubbyte · カテゴリー: 動物の仲間 · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- rook--klubbyte</code><br><br><a href="https://q.dog/pets/rook--klubbyte">すべてのアクションを見る →</a></td><td width="180" align="center"><a href="https://q.dog/pets/rook--klubbyte"><img src="https://q.dog/assets/previews/rook--klubbyte/thumbnail.png" alt="Rook プレビュー" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/miu-meo--lemon-z"><img src="https://q.dog/assets/previews/miu-meo--lemon-z/thumbnail.png" alt="SalaryCat プレビュー" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/miu-meo--lemon-z">SalaryCat</a></strong><br>作者: @lemon-z · カテゴリー: 動物の仲間 · バージョン: v2<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- miu-meo--lemon-z</code><br><br><a href="https://q.dog/pets/miu-meo--lemon-z">すべてのアクションを見る →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/salary-cat--zuochunjie">SalaryCat</a></strong><br>作者: <a href="https://github.com/Zuochunjie">@Zuochunjie</a> · カテゴリー: 動物の仲間 · バージョン: v2<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- salary-cat--zuochunjie</code><br><br><a href="https://q.dog/pets/salary-cat--zuochunjie">すべてのアクションを見る →</a></td><td width="180" align="center"><a href="https://q.dog/pets/salary-cat--zuochunjie"><img src="https://q.dog/assets/previews/salary-cat--zuochunjie/thumbnail.png" alt="SalaryCat プレビュー" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/teddy--danieloleary"><img src="https://q.dog/assets/previews/teddy--danieloleary/thumbnail.png" alt="Teddy プレビュー" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/teddy--danieloleary">Teddy</a></strong><br>作者: <a href="https://github.com/danieloleary">@danieloleary</a> · カテゴリー: 動物の仲間 · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- teddy--danieloleary</code><br><br><a href="https://q.dog/pets/teddy--danieloleary">すべてのアクションを見る →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/tian-hua-hua--d1a0y1bb">Tian Hua Hua</a></strong><br>作者: <a href="https://github.com/D1a0y1bb">@D1a0y1bb</a> · カテゴリー: 動物の仲間 · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- tian-hua-hua--d1a0y1bb</code><br><br><a href="https://q.dog/pets/tian-hua-hua--d1a0y1bb">すべてのアクションを見る →</a></td><td width="180" align="center"><a href="https://q.dog/pets/tian-hua-hua--d1a0y1bb"><img src="https://q.dog/assets/previews/tian-hua-hua--d1a0y1bb/thumbnail.png" alt="Tian Hua Hua プレビュー" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/usachi--jack"><img src="https://q.dog/assets/previews/usachi--jack/thumbnail.png" alt="乌萨奇 プレビュー" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/usachi--jack">乌萨奇</a></strong><br>作者: @jack · カテゴリー: 動物の仲間 · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- usachi--jack</code><br><br><a href="https://q.dog/pets/usachi--jack">すべてのアクションを見る →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/dai-dai-nai-you--1wphantom">呆呆奶油</a></strong><br>作者: @1wphantom · カテゴリー: 動物の仲間 · バージョン: v2<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- dai-dai-nai-you--1wphantom</code><br><br><a href="https://q.dog/pets/dai-dai-nai-you--1wphantom">すべてのアクションを見る →</a></td><td width="180" align="center"><a href="https://q.dog/pets/dai-dai-nai-you--1wphantom"><img src="https://q.dog/assets/previews/dai-dai-nai-you--1wphantom/thumbnail.png" alt="呆呆奶油 プレビュー" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/tuantuan--jbbom"><img src="https://q.dog/assets/previews/tuantuan--jbbom/thumbnail.png" alt="团团 プレビュー" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/tuantuan--jbbom">团团</a></strong><br>作者: <a href="https://github.com/JbBom">@JbBom</a> · カテゴリー: 動物の仲間 · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- tuantuan--jbbom</code><br><br><a href="https://q.dog/pets/tuantuan--jbbom">すべてのアクションを見る →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/duodong--froggie">多栋</a></strong><br>作者: @froggie · カテゴリー: 動物の仲間 · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- duodong--froggie</code><br><br><a href="https://q.dog/pets/duodong--froggie">すべてのアクションを見る →</a></td><td width="180" align="center"><a href="https://q.dog/pets/duodong--froggie"><img src="https://q.dog/assets/previews/duodong--froggie/thumbnail.png" alt="多栋 プレビュー" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/naiwa--sandytruant"><img src="https://q.dog/assets/previews/naiwa--sandytruant/thumbnail.png" alt="奶蛙 プレビュー" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/naiwa--sandytruant">奶蛙</a></strong><br>作者: <a href="https://github.com/sandytruant">@sandytruant</a> · カテゴリー: 動物の仲間 · バージョン: v2<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- naiwa--sandytruant</code><br><br><a href="https://q.dog/pets/naiwa--sandytruant">すべてのアクションを見る →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/xiaoba-cat--jack">小八猫</a></strong><br>作者: @jack · カテゴリー: 動物の仲間 · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- xiaoba-cat--jack</code><br><br><a href="https://q.dog/pets/xiaoba-cat--jack">すべてのアクションを見る →</a></td><td width="180" align="center"><a href="https://q.dog/pets/xiaoba-cat--jack"><img src="https://q.dog/assets/previews/xiaoba-cat--jack/thumbnail.png" alt="小八猫 プレビュー" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/xiaomai--brian-3"><img src="https://q.dog/assets/previews/xiaomai--brian-3/thumbnail.png" alt="小麦 XiaoMai プレビュー" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/xiaomai--brian-3">小麦 XiaoMai</a></strong><br>作者: @brian-3 · カテゴリー: 動物の仲間 · バージョン: v2<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- xiaomai--brian-3</code><br><br><a href="https://q.dog/pets/xiaomai--brian-3">すべてのアクションを見る →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/koukou-penguin--hoody">扣扣企鹅</a></strong><br>作者: @hoody · カテゴリー: 動物の仲間 · バージョン: v2<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- koukou-penguin--hoody</code><br><br><a href="https://q.dog/pets/koukou-penguin--hoody">すべてのアクションを見る →</a></td><td width="180" align="center"><a href="https://q.dog/pets/koukou-penguin--hoody"><img src="https://q.dog/assets/previews/koukou-penguin--hoody/thumbnail.png" alt="扣扣企鹅 プレビュー" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/capybara-lulu--jiushu"><img src="https://q.dog/assets/previews/capybara-lulu--jiushu/thumbnail.png" alt="水豚噜噜 プレビュー" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/capybara-lulu--jiushu">水豚噜噜</a></strong><br>作者: @jiushu · カテゴリー: 動物の仲間 · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- capybara-lulu--jiushu</code><br><br><a href="https://q.dog/pets/capybara-lulu--jiushu">すべてのアクションを見る →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/niumou--jarvis-2">牛哞</a></strong><br>作者: @jarvis-2 · カテゴリー: 動物の仲間 · バージョン: v2<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- niumou--jarvis-2</code><br><br><a href="https://q.dog/pets/niumou--jarvis-2">すべてのアクションを見る →</a></td><td width="180" align="center"><a href="https://q.dog/pets/niumou--jarvis-2"><img src="https://q.dog/assets/previews/niumou--jarvis-2/thumbnail.png" alt="牛哞 プレビュー" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/zichao-xiong--z-kzhang"><img src="https://q.dog/assets/previews/zichao-xiong--z-kzhang/thumbnail.png" alt="自嘲熊 プレビュー" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/zichao-xiong--z-kzhang">自嘲熊</a></strong><br>作者: @z-kzhang · カテゴリー: 動物の仲間 · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- zichao-xiong--z-kzhang</code><br><br><a href="https://q.dog/pets/zichao-xiong--z-kzhang">すべてのアクションを見る →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/wucanrou--ch">金渐层（午餐肉）</a></strong><br>作者: <a href="https://github.com/huanchu0213-ui">@huanchu0213-ui</a> · カテゴリー: 動物の仲間 · バージョン: v2<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- wucanrou--ch</code><br><br><a href="https://q.dog/pets/wucanrou--ch">すべてのアクションを見る →</a></td><td width="180" align="center"><a href="https://q.dog/pets/wucanrou--ch"><img src="https://q.dog/assets/previews/wucanrou--ch/thumbnail.png" alt="金渐层（午餐肉） プレビュー" width="160" height="173"></a></td></tr>
</table>

### ファンタジー生物

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/goblin--rkwap"><img src="https://q.dog/assets/previews/goblin--rkwap/thumbnail.png" alt="Goblin プレビュー" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/goblin--rkwap">Goblin</a></strong><br>作者: @rkwap · カテゴリー: ファンタジー生物 · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- goblin--rkwap</code><br><br><a href="https://q.dog/pets/goblin--rkwap">すべてのアクションを見る →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/luna-angel-cat--neve">luna_angel cat</a></strong><br>作者: @neve · カテゴリー: ファンタジー生物 · バージョン: v2<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- luna-angel-cat--neve</code><br><br><a href="https://q.dog/pets/luna-angel-cat--neve">すべてのアクションを見る →</a></td><td width="180" align="center"><a href="https://q.dog/pets/luna-angel-cat--neve"><img src="https://q.dog/assets/previews/luna-angel-cat--neve/thumbnail.png" alt="luna_angel cat プレビュー" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/night-neko--netizenxuan"><img src="https://q.dog/assets/previews/night-neko--netizenxuan/thumbnail.png" alt="Night Neko プレビュー" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/night-neko--netizenxuan">Night Neko</a></strong><br>作者: <a href="https://github.com/netizenXuan">@netizenXuan</a> · カテゴリー: ファンタジー生物 · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- night-neko--netizenxuan</code><br><br><a href="https://q.dog/pets/night-neko--netizenxuan">すべてのアクションを見る →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/starcorn--alterhq">Starcorn</a></strong><br>作者: <a href="https://github.com/alterhq">@alterhq</a> · カテゴリー: ファンタジー生物 · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- starcorn--alterhq</code><br><br><a href="https://q.dog/pets/starcorn--alterhq">すべてのアクションを見る →</a></td><td width="180" align="center"><a href="https://q.dog/pets/starcorn--alterhq"><img src="https://q.dog/assets/previews/starcorn--alterhq/thumbnail.png" alt="Starcorn プレビュー" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/xian-xiao-lu--qingyunagi"><img src="https://q.dog/assets/previews/xian-xiao-lu--qingyunagi/thumbnail.png" alt="Xian Xiao Lu プレビュー" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/xian-xiao-lu--qingyunagi">Xian Xiao Lu</a></strong><br>作者: <a href="https://github.com/qingyunAGI">@qingyunAGI</a> · カテゴリー: ファンタジー生物 · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- xian-xiao-lu--qingyunagi</code><br><br><a href="https://q.dog/pets/xian-xiao-lu--qingyunagi">すべてのアクションを見る →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/yuanzai--gaming33">Yuanzai</a></strong><br>作者: <a href="https://github.com/Gaming33">@Gaming33</a> · カテゴリー: ファンタジー生物 · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- yuanzai--gaming33</code><br><br><a href="https://q.dog/pets/yuanzai--gaming33">すべてのアクションを見る →</a></td><td width="180" align="center"><a href="https://q.dog/pets/yuanzai--gaming33"><img src="https://q.dog/assets/previews/yuanzai--gaming33/thumbnail.png" alt="Yuanzai プレビュー" width="160" height="173"></a></td></tr>
</table>

### ロボット

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/chispa--giiilberto-nm"><img src="https://q.dog/assets/previews/chispa--giiilberto-nm/thumbnail.png" alt="Chispa プレビュー" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/chispa--giiilberto-nm">Chispa</a></strong><br>作者: @giiilberto-nm · カテゴリー: ロボット · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- chispa--giiilberto-nm</code><br><br><a href="https://q.dog/pets/chispa--giiilberto-nm">すべてのアクションを見る →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/codenono--dq02">CodeNoNo</a></strong><br>作者: <a href="https://github.com/Dqd02">@Dqd02</a> · カテゴリー: ロボット · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- codenono--dq02</code><br><br><a href="https://q.dog/pets/codenono--dq02">すべてのアクションを見る →</a></td><td width="180" align="center"><a href="https://q.dog/pets/codenono--dq02"><img src="https://q.dog/assets/previews/codenono--dq02/thumbnail.png" alt="CodeNoNo プレビュー" width="160" height="173"></a></td></tr>
</table>

### 人物アバター

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/azuma--tairazuma"><img src="https://q.dog/assets/previews/azuma--tairazuma/thumbnail.png" alt="Azuma プレビュー" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/azuma--tairazuma">Azuma</a></strong><br>作者: @tairazuma · カテゴリー: 人物アバター · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- azuma--tairazuma</code><br><br><a href="https://q.dog/pets/azuma--tairazuma">すべてのアクションを見る →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/tangdouren--carl312">Tangdouren</a></strong><br>作者: <a href="https://github.com/Carl-312">@Carl-312</a> · カテゴリー: 人物アバター · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- tangdouren--carl312</code><br><br><a href="https://q.dog/pets/tangdouren--carl312">すべてのアクションを見る →</a></td><td width="180" align="center"><a href="https://q.dog/pets/tangdouren--carl312"><img src="https://q.dog/assets/previews/tangdouren--carl312/thumbnail.png" alt="Tangdouren プレビュー" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/guga--circus"><img src="https://q.dog/assets/previews/guga--circus/thumbnail.png" alt="咕嘎 プレビュー" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/guga--circus">咕嘎</a></strong><br>作者: @circus · カテゴリー: 人物アバター · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- guga--circus</code><br><br><a href="https://q.dog/pets/guga--circus">すべてのアクションを見る →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/fengge--qzl1-stack">峰哥</a></strong><br>作者: <a href="https://github.com/qzl1-stack">@qzl1-stack</a> · カテゴリー: 人物アバター · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- fengge--qzl1-stack</code><br><br><a href="https://q.dog/pets/fengge--qzl1-stack">すべてのアクションを見る →</a></td><td width="180" align="center"><a href="https://q.dog/pets/fengge--qzl1-stack"><img src="https://q.dog/assets/previews/fengge--qzl1-stack/thumbnail.png" alt="峰哥 プレビュー" width="160" height="173"></a></td></tr>
</table>

### ミーム

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/drill-cat--qimi"><img src="https://q.dog/assets/previews/drill-cat--qimi/thumbnail.png" alt="Drill Cat プレビュー" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/drill-cat--qimi">Drill Cat</a></strong><br>作者: <a href="https://github.com/qishichuan">@qishichuan</a> · カテゴリー: ミーム · バージョン: v2<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- drill-cat--qimi</code><br><br><a href="https://q.dog/pets/drill-cat--qimi">すべてのアクションを見る →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/hami--tat">Hami</a></strong><br>作者: <a href="https://github.com/TATcc">@TATcc</a> · カテゴリー: ミーム · バージョン: v2<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- hami--tat</code><br><br><a href="https://q.dog/pets/hami--tat">すべてのアクションを見る →</a></td><td width="180" align="center"><a href="https://q.dog/pets/hami--tat"><img src="https://q.dog/assets/previews/hami--tat/thumbnail.png" alt="Hami プレビュー" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/katana-cheems--thankyou-cheems"><img src="https://q.dog/assets/previews/katana-cheems--thankyou-cheems/thumbnail.png" alt="Katana Cheems プレビュー" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/katana-cheems--thankyou-cheems">Katana Cheems</a></strong><br>作者: <a href="https://github.com/Thankyou-Cheems">@Thankyou-Cheems</a> · カテゴリー: ミーム · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- katana-cheems--thankyou-cheems</code><br><br><a href="https://q.dog/pets/katana-cheems--thankyou-cheems">すべてのアクションを見る →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/hance-woniu--korn">旱厕蜗牛</a></strong><br>作者: @korn · カテゴリー: ミーム · バージョン: v2<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- hance-woniu--korn</code><br><br><a href="https://q.dog/pets/hance-woniu--korn">すべてのアクションを見る →</a></td><td width="180" align="center"><a href="https://q.dog/pets/hance-woniu--korn"><img src="https://q.dog/assets/previews/hance-woniu--korn/thumbnail.png" alt="旱厕蜗牛 プレビュー" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/maodie--octane0411"><img src="https://q.dog/assets/previews/maodie--octane0411/thumbnail.png" alt="耄耋 プレビュー" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/maodie--octane0411">耄耋</a></strong><br>作者: <a href="https://github.com/Octane0411">@Octane0411</a> · カテゴリー: ミーム · バージョン: v2<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- maodie--octane0411</code><br><br><a href="https://q.dog/pets/maodie--octane0411">すべてのアクションを見る →</a></td></tr>
</table>

### オブジェクトと小道具

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/spellbook--seymour">Spellbook</a></strong><br>作者: @seymour · カテゴリー: オブジェクトと小道具 · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- spellbook--seymour</code><br><br><a href="https://q.dog/pets/spellbook--seymour">すべてのアクションを見る →</a></td><td width="180" align="center"><a href="https://q.dog/pets/spellbook--seymour"><img src="https://q.dog/assets/previews/spellbook--seymour/thumbnail.png" alt="Spellbook プレビュー" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/tiny-crt--chochou"><img src="https://q.dog/assets/previews/tiny-crt--chochou/thumbnail.png" alt="Tiny CRT プレビュー" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/tiny-crt--chochou">Tiny CRT</a></strong><br>作者: @chochou · カテゴリー: オブジェクトと小道具 · バージョン: v1<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- tiny-crt--chochou</code><br><br><a href="https://q.dog/pets/tiny-crt--chochou">すべてのアクションを見る →</a></td></tr>
</table>

### その他

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/twilight-sparkle--wuye3790">紫悦</a></strong><br>作者: <a href="https://github.com/WuYe3790">@WuYe3790</a> · カテゴリー: その他 · バージョン: v2<br><br><strong>インストール</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- twilight-sparkle--wuye3790</code><br><br><a href="https://q.dog/pets/twilight-sparkle--wuye3790">すべてのアクションを見る →</a></td><td width="180" align="center"><a href="https://q.dog/pets/twilight-sparkle--wuye3790"><img src="https://q.dog/assets/previews/twilight-sparkle--wuye3790/thumbnail.png" alt="紫悦 プレビュー" width="160" height="173"></a></td></tr>
</table>

## リクエストと投稿

欲しいキャラクターが見つからない場合は、無料のコミュニティリクエストを送信できます。自分のペットを投稿する場合は、最終パッケージを 3 ファイルだけにし、`npm run validate:pr` と `npm run lint` を実行してください。

- [Codex pet request](https://q.dog/ja/request)
- [Contribution guide](https://q.dog/guide)
- [`.agents/skills/submit-codex-pet`](../../.agents/skills/submit-codex-pet)

## ドキュメント

- English: [docs/en](../en)
- 简体中文: [docs/zh-CN](../zh-CN)
- 한국어: [docs/ko](../ko)
- 日本語: [docs/ja](../ja)
- Español: [docs/es](../es)

## ライセンス

- コードとスクリプト: [MIT](../../LICENSE)
- ペット素材と生成プレビュー: [CC BY-NC 4.0](../../ASSETS-LICENSE.md), unless a pet package states otherwise
