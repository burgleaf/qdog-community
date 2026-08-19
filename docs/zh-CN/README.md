<div align="center">

# QDog

[English](../../README.md) | 简体中文 | [한국어](../ko/README.md) | [日本語](../ja/README.md) | [Español](../es/README.md)

<h2><a href="https://q.dog">免费浏览并安装 Codex 小宠物：QDog →</a></h2>

<p><strong>QDog 是免费的社区小宠物画廊。</strong>像逛宠物商店一样查看完整动画并一键安装；没有喜欢的角色时，还可以免费提交申请，社区贡献者可能会志愿制作。</p>

<p><a href="https://q.dog"><strong>挑选宠物</strong></a> · <a href="https://q.dog/zh/install"><strong>安装宠物</strong></a> · <a href="https://q.dog/zh/request"><strong>申请喜欢的角色</strong></a></p>

<a href="https://q.dog"><img src="../../assets/cover/qdog-cover.png" alt="进入 QDog 精品画廊"></a>

![pets: 183](https://img.shields.io/badge/pets-183-2ea44f) ![categories: 11](https://img.shields.io/badge/categories-11-0969da) ![languages: en | zh--CN | ko | ja | es](https://img.shields.io/badge/languages-en%20%7C%20zh--CN%20%7C%20ko%20%7C%20ja%20%7C%20es-8250df) ![code: MIT](https://img.shields.io/badge/code-MIT-111111) ![assets: CC BY--NC 4.0](https://img.shields.io/badge/assets-CC%20BY--NC%204.0-f97316) ![install: one command](https://img.shields.io/badge/install-one%20command-111111) [![Pet previews](https://github.com/burgleaf/qdog-community/actions/workflows/pet-previews.yml/badge.svg)](https://github.com/burgleaf/qdog-community/actions/workflows/pet-previews.yml)

</div>

本仓库是 [QDog](https://q.dog) 背后的宠物目录，负责保存可安装成品、作者与来源信息、合集元数据、校验工具和贡献记录。挑选与安装宠物时，请优先使用网站。

## 亮点

- **一条命令安装** — 不需要克隆仓库，macOS / Linux / Windows 全平台支持
- **免费社区画廊** — [QDog](https://q.dog) 提供完整动作预览、合集、作者主页、基于安装与点赞的每周榜单、便捷分享和社区统计
- **免费角色申请** — 不需要自己制作 spritesheet；提交角色和参考资料后，社区贡献者可能会志愿制作，但不承诺交付
- **AI 优先投稿** — 贡献者可在 Codex 中制作、修复并提交自己的宠物，熟悉 Git 的用户也可以直接提交 PR
- **非商用原则** — 正式许可证可选；没有正式许可证时必须明确禁止商用

每只宠物都是一个很小的可分享包：

```text
pets/<pet-slug>--<author-slug>/
├── submission.json
├── pet.json
└── spritesheet.webp
```

预览图会作为本地或 CI 构建产物生成到 `assets/previews/<pet-id>/`，不会塞进宠物目录。

仓库级作品系列与主题系列统一维护在 `collections.json`：`kind: franchise` 表示来自同一原作的作品系列，`kind: theme` 表示按题材、风格或伙伴类型组织的跨作品主题系列。宠物通过 `submission.json.collections` 声明归属，目录与网站都会从这些元数据自动生成。归属信息会立即记录，但只有达到至少 3 只宠物的合集才会在网站公开展示。

`submission.json.name` 是必填的默认名称。投稿者可以省略 `localized_names`，只使用一种语言；也可以选择双语，并同时填写 `localized_names.en` 与 `localized_names.zh`。网站会跟随访客选择的语言展示，不会擅自生成翻译。

## Pet 版本

| 版本 | 图集                      | 运行时元数据                          | 用途                           |
| ---- | ------------------------- | ------------------------------------- | ------------------------------ |
| v1   | `1536x1872`，8 列 × 9 行  | 省略 `spriteVersionNumber` 或设为 `1` | 已有的标准动作宠物             |
| v2   | `1536x2288`，8 列 × 11 行 | 设置 `spriteVersionNumber: 2`         | 标准动作加 16 个顺时针环视方向 |

两个版本都可以安装。维护已有九行动画时使用 v1；需要环视动作的新宠物或升级宠物使用 v2。

## 快速安装

无需 clone，按你的系统选一条命令：

```bash
# macOS / Linux
curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- firefly--lingxiaotian
```

```powershell
# Windows PowerShell
powershell -NoProfile -ExecutionPolicy Bypass -Command "iwr -UseB https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.ps1 | iex; Install-CodexPet firefly--lingxiaotian"
```

```bash
# 任何能跑 Node.js 的环境
npx awesome-codex-pet firefly--lingxiaotian
```

列出可安装的宠物：

```bash
curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- --list
```

默认安装位置：

- macOS / Linux：`~/.codex/pets/<pet-id>/`
- Windows：`%USERPROFILE%\.codex\pets\<pet-id>\`

可通过 `CODEX_HOME` 自定义安装路径，或者设置 `AWESOME_CODEX_PET_NO_STATS=1` 关闭匿名安装计数。

## 升级已有 v1 宠物

1. 打开 Codex 的**设置 → 宠物**。
2. 找到已安装的自定义宠物，点击**更新**。
3. Codex 会打开 Hatch Pet 任务。当前 v2 流程会校验并保留原有九行动画，只生成四个方向锚点和 16 个环视方向，然后写出带 `spriteVersionNumber: 2` 的十一行图集。
4. 接受替换前，检查生成的 contact sheet 和方向预览。

这里的**更新**是 AI 辅助的 v1 → v2 转换，不是本仓库发出了新版下载通知。它只更新 `~/.codex/pets/` 下的本地包，不会自动修改或提交 GitHub 仓库里的版本。

## 宠物收录

### 游戏角色

<table>
<tr><th>名称</th><td colspan="5"><strong>★ 精选宠物</strong> · <a href="https://q.dog/pets/firefly--lingxiaotian">流萤</a> · 作者: <a href="https://github.com/legeling">@legeling</a> · 分类: 游戏角色 · 版本: v1</td></tr>
<tr><th>安装</th><td colspan="5"><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- firefly--lingxiaotian</code></td></tr>
<tr><th>动作</th><td><strong>待机</strong></td><td><strong>挥手</strong></td><td><strong>奔跑</strong></td><td><strong>等待</strong></td><td><strong>审阅</strong></td></tr>
<tr><th>预览</th><td><img src="https://q.dog/assets/previews/firefly--lingxiaotian/webp/idle.webp" alt="流萤 待机" width="120" height="130"></td><td><img src="https://q.dog/assets/previews/firefly--lingxiaotian/webp/waving.webp" alt="流萤 挥手" width="120" height="130"></td><td><img src="https://q.dog/assets/previews/firefly--lingxiaotian/webp/running-right.webp" alt="流萤 奔跑" width="120" height="130"></td><td><img src="https://q.dog/assets/previews/firefly--lingxiaotian/webp/waiting.webp" alt="流萤 等待" width="120" height="130"></td><td><img src="https://q.dog/assets/previews/firefly--lingxiaotian/webp/review.webp" alt="流萤 审阅" width="120" height="130"></td></tr>
<tr><th>查看完整动作</th><td colspan="5"><a href="https://q.dog/pets/firefly--lingxiaotian">查看完整动作 →</a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/acheron--lingxiaotian"><img src="https://q.dog/assets/previews/acheron--lingxiaotian/thumbnail.png" alt="黄泉 预览" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/acheron--lingxiaotian">黄泉</a></strong><br>作者: <a href="https://github.com/legeling">@legeling</a> · 分类: 游戏角色 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- acheron--lingxiaotian</code><br><br><a href="https://q.dog/pets/acheron--lingxiaotian">查看完整动作 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/aggron-3d--dnnyngyen">Aggron (3D)</a></strong><br>作者: <a href="https://github.com/dnnyngyen">@dnnyngyen</a> · 分类: 游戏角色 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- aggron-3d--dnnyngyen</code><br><br><a href="https://q.dog/pets/aggron-3d--dnnyngyen">查看完整动作 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/aggron-3d--dnnyngyen"><img src="https://q.dog/assets/previews/aggron-3d--dnnyngyen/thumbnail.png" alt="Aggron (3D) 预览" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/arlecchino--lingxiaotian"><img src="https://q.dog/assets/previews/arlecchino--lingxiaotian/thumbnail.png" alt="阿蕾奇诺 预览" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/arlecchino--lingxiaotian">阿蕾奇诺</a></strong><br>作者: <a href="https://github.com/legeling">@legeling</a> · 分类: 游戏角色 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- arlecchino--lingxiaotian</code><br><br><a href="https://q.dog/pets/arlecchino--lingxiaotian">查看完整动作 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/barboach-3d--dnnyngyen">Barboach (3D)</a></strong><br>作者: <a href="https://github.com/dnnyngyen">@dnnyngyen</a> · 分类: 游戏角色 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- barboach-3d--dnnyngyen</code><br><br><a href="https://q.dog/pets/barboach-3d--dnnyngyen">查看完整动作 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/barboach-3d--dnnyngyen"><img src="https://q.dog/assets/previews/barboach-3d--dnnyngyen/thumbnail.png" alt="Barboach (3D) 预览" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/black-swan--lingxiaotian"><img src="https://q.dog/assets/previews/black-swan--lingxiaotian/thumbnail.png" alt="黑天鹅 预览" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/black-swan--lingxiaotian">黑天鹅</a></strong><br>作者: <a href="https://github.com/legeling">@legeling</a> · 分类: 游戏角色 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- black-swan--lingxiaotian</code><br><br><a href="https://q.dog/pets/black-swan--lingxiaotian">查看完整动作 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/buba--yurcek">Buba</a></strong><br>作者: @yurcek · 分类: 游戏角色 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- buba--yurcek</code><br><br><a href="https://q.dog/pets/buba--yurcek">查看完整动作 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/buba--yurcek"><img src="https://q.dog/assets/previews/buba--yurcek/thumbnail.png" alt="Buba 预览" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/castorice--lingxiaotian"><img src="https://q.dog/assets/previews/castorice--lingxiaotian/thumbnail.png" alt="遐蝶 预览" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/castorice--lingxiaotian">遐蝶</a></strong><br>作者: <a href="https://github.com/legeling">@legeling</a> · 分类: 游戏角色 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- castorice--lingxiaotian</code><br><br><a href="https://q.dog/pets/castorice--lingxiaotian">查看完整动作 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/charizard--dnnyngyen">Charizard</a></strong><br>作者: <a href="https://github.com/dnnyngyen">@dnnyngyen</a> · 分类: 游戏角色 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- charizard--dnnyngyen</code><br><br><a href="https://q.dog/pets/charizard--dnnyngyen">查看完整动作 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/charizard--dnnyngyen"><img src="https://q.dog/assets/previews/charizard--dnnyngyen/thumbnail.png" alt="Charizard 预览" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/chen--chenxin-dlut"><img src="https://q.dog/assets/previews/chen--chenxin-dlut/thumbnail.png" alt="陈 预览" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/chen--chenxin-dlut">陈</a></strong><br>作者: <a href="https://github.com/chenxin-dlut">@chenxin-dlut</a> · 分类: 游戏角色 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- chen--chenxin-dlut</code><br><br><a href="https://q.dog/pets/chen--chenxin-dlut">查看完整动作 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/cyrene--lingxiaotian">昔涟</a></strong><br>作者: <a href="https://github.com/legeling">@legeling</a> · 分类: 游戏角色 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- cyrene--lingxiaotian</code><br><br><a href="https://q.dog/pets/cyrene--lingxiaotian">查看完整动作 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/cyrene--lingxiaotian"><img src="https://q.dog/assets/previews/cyrene--lingxiaotian/thumbnail.png" alt="昔涟 预览" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/dimo-stand--god-wu"><img src="https://q.dog/assets/previews/dimo-stand--god-wu/thumbnail.png" alt="Dimo 预览" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/dimo-stand--god-wu">Dimo</a></strong><br>作者: @god-wu · 分类: 游戏角色 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- dimo-stand--god-wu</code><br><br><a href="https://q.dog/pets/dimo-stand--god-wu">查看完整动作 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/doro--lingxiaotian">桃乐丝（Doro）</a></strong><br>作者: <a href="https://github.com/legeling">@legeling</a> · 分类: 游戏角色 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- doro--lingxiaotian</code><br><br><a href="https://q.dog/pets/doro--lingxiaotian">查看完整动作 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/doro--lingxiaotian"><img src="https://q.dog/assets/previews/doro--lingxiaotian/thumbnail.png" alt="桃乐丝（Doro） 预览" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/eevee--dnnyngyen"><img src="https://q.dog/assets/previews/eevee--dnnyngyen/thumbnail.png" alt="Eevee 预览" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/eevee--dnnyngyen">Eevee</a></strong><br>作者: <a href="https://github.com/dnnyngyen">@dnnyngyen</a> · 分类: 游戏角色 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- eevee--dnnyngyen</code><br><br><a href="https://q.dog/pets/eevee--dnnyngyen">查看完整动作 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/feixiao--lingxiaotian">飞霄</a></strong><br>作者: <a href="https://github.com/legeling">@legeling</a> · 分类: 游戏角色 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- feixiao--lingxiaotian</code><br><br><a href="https://q.dog/pets/feixiao--lingxiaotian">查看完整动作 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/feixiao--lingxiaotian"><img src="https://q.dog/assets/previews/feixiao--lingxiaotian/thumbnail.png" alt="飞霄 预览" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/furina--lingxiaotian"><img src="https://q.dog/assets/previews/furina--lingxiaotian/thumbnail.png" alt="芙宁娜 预览" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/furina--lingxiaotian">芙宁娜</a></strong><br>作者: <a href="https://github.com/legeling">@legeling</a> · 分类: 游戏角色 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- furina--lingxiaotian</code><br><br><a href="https://q.dog/pets/furina--lingxiaotian">查看完整动作 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/ganyu--chenxin-dlut">甘雨</a></strong><br>作者: <a href="https://github.com/chenxin-dlut">@chenxin-dlut</a> · 分类: 游戏角色 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- ganyu--chenxin-dlut</code><br><br><a href="https://q.dog/pets/ganyu--chenxin-dlut">查看完整动作 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/ganyu--chenxin-dlut"><img src="https://q.dog/assets/previews/ganyu--chenxin-dlut/thumbnail.png" alt="甘雨 预览" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/hu-tao--lingxiaotian"><img src="https://q.dog/assets/previews/hu-tao--lingxiaotian/thumbnail.png" alt="胡桃 预览" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/hu-tao--lingxiaotian">胡桃</a></strong><br>作者: <a href="https://github.com/legeling">@legeling</a> · 分类: 游戏角色 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- hu-tao--lingxiaotian</code><br><br><a href="https://q.dog/pets/hu-tao--lingxiaotian">查看完整动作 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/hyacine--kurisu">风堇</a></strong><br>作者: <a href="https://github.com/kurisu994">@kurisu994</a> · 分类: 游戏角色 · 版本: v2<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- hyacine--kurisu</code><br><br><a href="https://q.dog/pets/hyacine--kurisu">查看完整动作 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/hyacine--kurisu"><img src="https://q.dog/assets/previews/hyacine--kurisu/thumbnail.png" alt="风堇 预览" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/isaac--foggy-whale"><img src="https://q.dog/assets/previews/isaac--foggy-whale/thumbnail.png" alt="Isaac 预览" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/isaac--foggy-whale">Isaac</a></strong><br>作者: <a href="https://github.com/Foggy-whale">@Foggy-whale</a> · 分类: 游戏角色 · 版本: v2<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- isaac--foggy-whale</code><br><br><a href="https://q.dog/pets/isaac--foggy-whale">查看完整动作 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/kamisato-ayaka--lingxiaotian">神里绫华</a></strong><br>作者: <a href="https://github.com/legeling">@legeling</a> · 分类: 游戏角色 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- kamisato-ayaka--lingxiaotian</code><br><br><a href="https://q.dog/pets/kamisato-ayaka--lingxiaotian">查看完整动作 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/kamisato-ayaka--lingxiaotian"><img src="https://q.dog/assets/previews/kamisato-ayaka--lingxiaotian/thumbnail.png" alt="神里绫华 预览" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/klee--chenxin-dlut"><img src="https://q.dog/assets/previews/klee--chenxin-dlut/thumbnail.png" alt="可莉 预览" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/klee--chenxin-dlut">可莉</a></strong><br>作者: <a href="https://github.com/chenxin-dlut">@chenxin-dlut</a> · 分类: 游戏角色 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- klee--chenxin-dlut</code><br><br><a href="https://q.dog/pets/klee--chenxin-dlut">查看完整动作 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/kuro-chibi--kuroneko-night">Kuro Q版</a></strong><br>作者: <a href="https://github.com/KuroNeko-night">@KuroNeko-night</a> · 分类: 游戏角色 · 版本: v2<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- kuro-chibi--kuroneko-night</code><br><br><a href="https://q.dog/pets/kuro-chibi--kuroneko-night">查看完整动作 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/kuro-chibi--kuroneko-night"><img src="https://q.dog/assets/previews/kuro-chibi--kuroneko-night/thumbnail.png" alt="Kuro Q版 预览" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/lappland--chenxin-dlut"><img src="https://q.dog/assets/previews/lappland--chenxin-dlut/thumbnail.png" alt="拉普兰德 预览" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/lappland--chenxin-dlut">拉普兰德</a></strong><br>作者: <a href="https://github.com/chenxin-dlut">@chenxin-dlut</a> · 分类: 游戏角色 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- lappland--chenxin-dlut</code><br><br><a href="https://q.dog/pets/lappland--chenxin-dlut">查看完整动作 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/little-black-mage--libertis">Little Black Mage</a></strong><br>作者: @libertis · 分类: 游戏角色 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- little-black-mage--libertis</code><br><br><a href="https://q.dog/pets/little-black-mage--libertis">查看完整动作 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/little-black-mage--libertis"><img src="https://q.dog/assets/previews/little-black-mage--libertis/thumbnail.png" alt="Little Black Mage 预览" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/march-7th--chenxin-dlut"><img src="https://q.dog/assets/previews/march-7th--chenxin-dlut/thumbnail.png" alt="三月七 预览" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/march-7th--chenxin-dlut">三月七</a></strong><br>作者: <a href="https://github.com/chenxin-dlut">@chenxin-dlut</a> · 分类: 游戏角色 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- march-7th--chenxin-dlut</code><br><br><a href="https://q.dog/pets/march-7th--chenxin-dlut">查看完整动作 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/miyabi--eric-terminal">星见雅</a></strong><br>作者: <a href="https://codex-pets.net/users/eric-terminal">@eric-terminal</a> · 分类: 游戏角色 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- miyabi--eric-terminal</code><br><br><a href="https://q.dog/pets/miyabi--eric-terminal">查看完整动作 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/miyabi--eric-terminal"><img src="https://q.dog/assets/previews/miyabi--eric-terminal/thumbnail.png" alt="星见雅 预览" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/nahida--lingxiaotian"><img src="https://q.dog/assets/previews/nahida--lingxiaotian/thumbnail.png" alt="纳西妲 预览" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/nahida--lingxiaotian">纳西妲</a></strong><br>作者: <a href="https://github.com/legeling">@legeling</a> · 分类: 游戏角色 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- nahida--lingxiaotian</code><br><br><a href="https://q.dog/pets/nahida--lingxiaotian">查看完整动作 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/navia--lingxiaotian">娜维娅</a></strong><br>作者: <a href="https://github.com/legeling">@legeling</a> · 分类: 游戏角色 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- navia--lingxiaotian</code><br><br><a href="https://q.dog/pets/navia--lingxiaotian">查看完整动作 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/navia--lingxiaotian"><img src="https://q.dog/assets/previews/navia--lingxiaotian/thumbnail.png" alt="娜维娅 预览" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/paimon--lingxiaotian"><img src="https://q.dog/assets/previews/paimon--lingxiaotian/thumbnail.png" alt="派蒙 预览" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/paimon--lingxiaotian">派蒙</a></strong><br>作者: <a href="https://github.com/legeling">@legeling</a> · 分类: 游戏角色 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- paimon--lingxiaotian</code><br><br><a href="https://q.dog/pets/paimon--lingxiaotian">查看完整动作 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/phoebe--chenxin-dlut">菲比</a></strong><br>作者: <a href="https://github.com/chenxin-dlut">@chenxin-dlut</a> · 分类: 游戏角色 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- phoebe--chenxin-dlut</code><br><br><a href="https://q.dog/pets/phoebe--chenxin-dlut">查看完整动作 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/phoebe--chenxin-dlut"><img src="https://q.dog/assets/previews/phoebe--chenxin-dlut/thumbnail.png" alt="菲比 预览" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/pikachu--dnnyngyen"><img src="https://q.dog/assets/previews/pikachu--dnnyngyen/thumbnail.png" alt="Pikachu 预览" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/pikachu--dnnyngyen">Pikachu</a></strong><br>作者: <a href="https://github.com/dnnyngyen">@dnnyngyen</a> · 分类: 游戏角色 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- pikachu--dnnyngyen</code><br><br><a href="https://q.dog/pets/pikachu--dnnyngyen">查看完整动作 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/raiden-shogun--lingxiaotian">雷电将军</a></strong><br>作者: <a href="https://github.com/legeling">@legeling</a> · 分类: 游戏角色 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- raiden-shogun--lingxiaotian</code><br><br><a href="https://q.dog/pets/raiden-shogun--lingxiaotian">查看完整动作 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/raiden-shogun--lingxiaotian"><img src="https://q.dog/assets/previews/raiden-shogun--lingxiaotian/thumbnail.png" alt="雷电将军 预览" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/reimu--lingxiaotian"><img src="https://q.dog/assets/previews/reimu--lingxiaotian/thumbnail.png" alt="博丽灵梦 预览" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/reimu--lingxiaotian">博丽灵梦</a></strong><br>作者: <a href="https://github.com/legeling">@legeling</a> · 分类: 游戏角色 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- reimu--lingxiaotian</code><br><br><a href="https://q.dog/pets/reimu--lingxiaotian">查看完整动作 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/remielle-dan--erlla">蕾米埃尔·丹 / 蕾米</a></strong><br>作者: <a href="https://github.com/Erlla">@Erlla</a> · 分类: 游戏角色 · 版本: v2<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- remielle-dan--erlla</code><br><br><a href="https://q.dog/pets/remielle-dan--erlla">查看完整动作 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/remielle-dan--erlla"><img src="https://q.dog/assets/previews/remielle-dan--erlla/thumbnail.png" alt="蕾米埃尔·丹 / 蕾米 预览" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/robin--lingxiaotian"><img src="https://q.dog/assets/previews/robin--lingxiaotian/thumbnail.png" alt="知更鸟 预览" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/robin--lingxiaotian">知更鸟</a></strong><br>作者: <a href="https://github.com/legeling">@legeling</a> · 分类: 游戏角色 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- robin--lingxiaotian</code><br><br><a href="https://q.dog/pets/robin--lingxiaotian">查看完整动作 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/ruan-mei--lingxiaotian">阮·梅</a></strong><br>作者: <a href="https://github.com/legeling">@legeling</a> · 分类: 游戏角色 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- ruan-mei--lingxiaotian</code><br><br><a href="https://q.dog/pets/ruan-mei--lingxiaotian">查看完整动作 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/ruan-mei--lingxiaotian"><img src="https://q.dog/assets/previews/ruan-mei--lingxiaotian/thumbnail.png" alt="阮·梅 预览" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/silver-wolf--lingxiaotian"><img src="https://q.dog/assets/previews/silver-wolf--lingxiaotian/thumbnail.png" alt="银狼 预览" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/silver-wolf--lingxiaotian">银狼</a></strong><br>作者: <a href="https://github.com/legeling">@legeling</a> · 分类: 游戏角色 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- silver-wolf--lingxiaotian</code><br><br><a href="https://q.dog/pets/silver-wolf--lingxiaotian">查看完整动作 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/sonetto--chenxin-dlut">十四行诗</a></strong><br>作者: <a href="https://github.com/chenxin-dlut">@chenxin-dlut</a> · 分类: 游戏角色 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- sonetto--chenxin-dlut</code><br><br><a href="https://q.dog/pets/sonetto--chenxin-dlut">查看完整动作 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/sonetto--chenxin-dlut"><img src="https://q.dog/assets/previews/sonetto--chenxin-dlut/thumbnail.png" alt="十四行诗 预览" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/sparkle--lingxiaotian"><img src="https://q.dog/assets/previews/sparkle--lingxiaotian/thumbnail.png" alt="花火 预览" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/sparkle--lingxiaotian">花火</a></strong><br>作者: <a href="https://github.com/legeling">@legeling</a> · 分类: 游戏角色 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- sparkle--lingxiaotian</code><br><br><a href="https://q.dog/pets/sparkle--lingxiaotian">查看完整动作 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/susuta--xiangzi529">羞羞獭</a></strong><br>作者: <a href="https://github.com/Xiangzi529">@Xiangzi529</a> · 分类: 游戏角色 · 版本: v2<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- susuta--xiangzi529</code><br><br><a href="https://q.dog/pets/susuta--xiangzi529">查看完整动作 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/susuta--xiangzi529"><img src="https://q.dog/assets/previews/susuta--xiangzi529/thumbnail.png" alt="羞羞獭 预览" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/tingyun--lingxiaotian"><img src="https://q.dog/assets/previews/tingyun--lingxiaotian/thumbnail.png" alt="停云 预览" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/tingyun--lingxiaotian">停云</a></strong><br>作者: <a href="https://github.com/legeling">@legeling</a> · 分类: 游戏角色 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- tingyun--lingxiaotian</code><br><br><a href="https://q.dog/pets/tingyun--lingxiaotian">查看完整动作 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/vertin--chenxin-dlut">维尔汀</a></strong><br>作者: <a href="https://github.com/chenxin-dlut">@chenxin-dlut</a> · 分类: 游戏角色 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- vertin--chenxin-dlut</code><br><br><a href="https://q.dog/pets/vertin--chenxin-dlut">查看完整动作 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/vertin--chenxin-dlut"><img src="https://q.dog/assets/previews/vertin--chenxin-dlut/thumbnail.png" alt="维尔汀 预览" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/yoimiya--chenxin-dlut"><img src="https://q.dog/assets/previews/yoimiya--chenxin-dlut/thumbnail.png" alt="宵宫 预览" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/yoimiya--chenxin-dlut">宵宫</a></strong><br>作者: <a href="https://github.com/chenxin-dlut">@chenxin-dlut</a> · 分类: 游戏角色 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- yoimiya--chenxin-dlut</code><br><br><a href="https://q.dog/pets/yoimiya--chenxin-dlut">查看完整动作 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/zani--chenxin-dlut">赞妮</a></strong><br>作者: <a href="https://github.com/chenxin-dlut">@chenxin-dlut</a> · 分类: 游戏角色 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- zani--chenxin-dlut</code><br><br><a href="https://q.dog/pets/zani--chenxin-dlut">查看完整动作 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/zani--chenxin-dlut"><img src="https://q.dog/assets/previews/zani--chenxin-dlut/thumbnail.png" alt="赞妮 预览" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/yae-miko--legeling"><img src="https://q.dog/assets/previews/yae-miko--legeling/thumbnail.png" alt="八重神子 预览" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/yae-miko--legeling">八重神子</a></strong><br>作者: <a href="https://github.com/legeling">@legeling</a> · 分类: 游戏角色 · 版本: v2<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- yae-miko--legeling</code><br><br><a href="https://q.dog/pets/yae-miko--legeling">查看完整动作 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/dnf-female-ammo--qunboo">女弹药Q</a></strong><br>作者: <a href="https://github.com/QunBoo">@QunBoo</a> · 分类: 游戏角色 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- dnf-female-ammo--qunboo</code><br><br><a href="https://q.dog/pets/dnf-female-ammo--qunboo">查看完整动作 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/dnf-female-ammo--qunboo"><img src="https://q.dog/assets/previews/dnf-female-ammo--qunboo/thumbnail.png" alt="女弹药Q 预览" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/new-covenant-exusiai--chenxin-dlut"><img src="https://q.dog/assets/previews/new-covenant-exusiai--chenxin-dlut/thumbnail.png" alt="新约能天使 预览" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/new-covenant-exusiai--chenxin-dlut">新约能天使</a></strong><br>作者: <a href="https://github.com/chenxin-dlut">@chenxin-dlut</a> · 分类: 游戏角色 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- new-covenant-exusiai--chenxin-dlut</code><br><br><a href="https://q.dog/pets/new-covenant-exusiai--chenxin-dlut">查看完整动作 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/regulus-star-antimony--chenxin-dlut">星锑</a></strong><br>作者: <a href="https://github.com/chenxin-dlut">@chenxin-dlut</a> · 分类: 游戏角色 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- regulus-star-antimony--chenxin-dlut</code><br><br><a href="https://q.dog/pets/regulus-star-antimony--chenxin-dlut">查看完整动作 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/regulus-star-antimony--chenxin-dlut"><img src="https://q.dog/assets/previews/regulus-star-antimony--chenxin-dlut/thumbnail.png" alt="星锑 预览" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/youmu--ai-generated"><img src="https://q.dog/assets/previews/youmu--ai-generated/thumbnail.png" alt="魂魄妖梦 预览" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/youmu--ai-generated">魂魄妖梦</a></strong><br>作者: @ai-generated · 分类: 游戏角色 · 版本: v2<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- youmu--ai-generated</code><br><br><a href="https://q.dog/pets/youmu--ai-generated">查看完整动作 →</a></td></tr>
</table>

### 动漫角色

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/zero-two--mingqingmozhao">02</a></strong><br>作者: @mingqingmozhao · 分类: 动漫角色 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- zero-two--mingqingmozhao</code><br><br><a href="https://q.dog/pets/zero-two--mingqingmozhao">查看完整动作 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/zero-two--mingqingmozhao"><img src="https://q.dog/assets/previews/zero-two--mingqingmozhao/thumbnail.png" alt="02 预览" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/anya--chenxin-dlut"><img src="https://q.dog/assets/previews/anya--chenxin-dlut/thumbnail.png" alt="阿尼亚 预览" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/anya--chenxin-dlut">阿尼亚</a></strong><br>作者: <a href="https://github.com/chenxin-dlut">@chenxin-dlut</a> · 分类: 动漫角色 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- anya--chenxin-dlut</code><br><br><a href="https://q.dog/pets/anya--chenxin-dlut">查看完整动作 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/asuka--maxg24">明日香</a></strong><br>作者: <a href="https://codex-pets.net/users/maxg24">@maxg24</a> · 分类: 动漫角色 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- asuka--maxg24</code><br><br><a href="https://q.dog/pets/asuka--maxg24">查看完整动作 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/asuka--maxg24"><img src="https://q.dog/assets/previews/asuka--maxg24/thumbnail.png" alt="明日香 预览" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/chibi-rei-pet--bendy"><img src="https://q.dog/assets/previews/chibi-rei-pet--bendy/thumbnail.png" alt="绫波丽 预览" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/chibi-rei-pet--bendy">绫波丽</a></strong><br>作者: @Bendy · 分类: 动漫角色 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- chibi-rei-pet--bendy</code><br><br><a href="https://q.dog/pets/chibi-rei-pet--bendy">查看完整动作 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/chotu--makriman">Chotu</a></strong><br>作者: <a href="https://github.com/makriman">@makriman</a> · 分类: 动漫角色 · 版本: v2<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- chotu--makriman</code><br><br><a href="https://q.dog/pets/chotu--makriman">查看完整动作 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/chotu--makriman"><img src="https://q.dog/assets/previews/chotu--makriman/thumbnail.png" alt="Chotu 预览" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/conan--chenxin-dlut"><img src="https://q.dog/assets/previews/conan--chenxin-dlut/thumbnail.png" alt="江户川柯南 预览" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/conan--chenxin-dlut">江户川柯南</a></strong><br>作者: <a href="https://github.com/chenxin-dlut">@chenxin-dlut</a> · 分类: 动漫角色 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- conan--chenxin-dlut</code><br><br><a href="https://q.dog/pets/conan--chenxin-dlut">查看完整动作 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/doraemon--xueshi">哆啦A梦</a></strong><br>作者: <a href="https://codex-pets.net/users/xueshi">@xueshi</a> · 分类: 动漫角色 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- doraemon--xueshi</code><br><br><a href="https://q.dog/pets/doraemon--xueshi">查看完整动作 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/doraemon--xueshi"><img src="https://q.dog/assets/previews/doraemon--xueshi/thumbnail.png" alt="哆啦A梦 预览" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/elaina--nyakku-shigure"><img src="https://q.dog/assets/previews/elaina--nyakku-shigure/thumbnail.png" alt="伊蕾娜 预览" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/elaina--nyakku-shigure">伊蕾娜</a></strong><br>作者: <a href="https://codex-pets.net/users/nyakku-shigure">@nyakku-shigure</a> · 分类: 动漫角色 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- elaina--nyakku-shigure</code><br><br><a href="https://q.dog/pets/elaina--nyakku-shigure">查看完整动作 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/eren--ash-sw">艾伦</a></strong><br>作者: <a href="https://codex-pets.net/users/ash-sw">@ash-sw</a> · 分类: 动漫角色 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- eren--ash-sw</code><br><br><a href="https://q.dog/pets/eren--ash-sw">查看完整动作 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/eren--ash-sw"><img src="https://q.dog/assets/previews/eren--ash-sw/thumbnail.png" alt="艾伦 预览" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/frieren--lingxiaotian"><img src="https://q.dog/assets/previews/frieren--lingxiaotian/thumbnail.png" alt="芙莉莲 预览" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/frieren--lingxiaotian">芙莉莲</a></strong><br>作者: <a href="https://github.com/legeling">@legeling</a> · 分类: 动漫角色 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- frieren--lingxiaotian</code><br><br><a href="https://q.dog/pets/frieren--lingxiaotian">查看完整动作 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/gojo--lilokhalikfa">五条悟</a></strong><br>作者: <a href="https://codex-pets.net/users/lilokhalikfa">@lilokhalikfa</a> · 分类: 动漫角色 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- gojo--lilokhalikfa</code><br><br><a href="https://q.dog/pets/gojo--lilokhalikfa">查看完整动作 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/gojo--lilokhalikfa"><img src="https://q.dog/assets/previews/gojo--lilokhalikfa/thumbnail.png" alt="五条悟 预览" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/ikaros--icarus-alpha"><img src="https://q.dog/assets/previews/ikaros--icarus-alpha/thumbnail.png" alt="伊卡洛斯 预览" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/ikaros--icarus-alpha">伊卡洛斯</a></strong><br>作者: <a href="https://codex-pets.net/users/icarus-alpha">@icarus-alpha</a> · 分类: 动漫角色 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- ikaros--icarus-alpha</code><br><br><a href="https://q.dog/pets/ikaros--icarus-alpha">查看完整动作 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/isekaijoucho--siiverash">Isekaijoucho</a></strong><br>作者: <a href="https://github.com/SiIverAsh">@SiIverAsh</a> · 分类: 动漫角色 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- isekaijoucho--siiverash</code><br><br><a href="https://q.dog/pets/isekaijoucho--siiverash">查看完整动作 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/isekaijoucho--siiverash"><img src="https://q.dog/assets/previews/isekaijoucho--siiverash/thumbnail.png" alt="Isekaijoucho 预览" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/jolyne-cujoh--d2682787206-sys"><img src="https://q.dog/assets/previews/jolyne-cujoh--d2682787206-sys/thumbnail.png" alt="徐伦 预览" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/jolyne-cujoh--d2682787206-sys">徐伦</a></strong><br>作者: <a href="https://github.com/d2682787206-sys">@d2682787206-sys</a> · 分类: 动漫角色 · 版本: v2<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- jolyne-cujoh--d2682787206-sys</code><br><br><a href="https://q.dog/pets/jolyne-cujoh--d2682787206-sys">查看完整动作 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/kaiju-no-8--terry878">怪獸8號</a></strong><br>作者: @TERRY878 · 分类: 动漫角色 · 版本: v2<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- kaiju-no-8--terry878</code><br><br><a href="https://q.dog/pets/kaiju-no-8--terry878">查看完整动作 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/kaiju-no-8--terry878"><img src="https://q.dog/assets/previews/kaiju-no-8--terry878/thumbnail.png" alt="怪獸8號 预览" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/kid--chenxin-dlut"><img src="https://q.dog/assets/previews/kid--chenxin-dlut/thumbnail.png" alt="怪盗基德 预览" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/kid--chenxin-dlut">怪盗基德</a></strong><br>作者: <a href="https://github.com/chenxin-dlut">@chenxin-dlut</a> · 分类: 动漫角色 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- kid--chenxin-dlut</code><br><br><a href="https://q.dog/pets/kid--chenxin-dlut">查看完整动作 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/kid-goku--julianhuang">小悟空</a></strong><br>作者: <a href="https://codex-pets.net/users/julianhuang">@julianhuang</a> · 分类: 动漫角色 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- kid-goku--julianhuang</code><br><br><a href="https://q.dog/pets/kid-goku--julianhuang">查看完整动作 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/kid-goku--julianhuang"><img src="https://q.dog/assets/previews/kid-goku--julianhuang/thumbnail.png" alt="小悟空 预览" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/levi--emrecb"><img src="https://q.dog/assets/previews/levi--emrecb/thumbnail.png" alt="利威尔 预览" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/levi--emrecb">利威尔</a></strong><br>作者: <a href="https://codex-pets.net/users/emrecb">@emrecb</a> · 分类: 动漫角色 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- levi--emrecb</code><br><br><a href="https://q.dog/pets/levi--emrecb">查看完整动作 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/luffy-gear-5--jordsshmords1">五档路飞</a></strong><br>作者: <a href="https://codex-pets.net/users/jordsshmords1">@jordsshmords1</a> · 分类: 动漫角色 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- luffy-gear-5--jordsshmords1</code><br><br><a href="https://q.dog/pets/luffy-gear-5--jordsshmords1">查看完整动作 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/luffy-gear-5--jordsshmords1"><img src="https://q.dog/assets/previews/luffy-gear-5--jordsshmords1/thumbnail.png" alt="五档路飞 预览" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/mahiro--lingxiaotian"><img src="https://q.dog/assets/previews/mahiro--lingxiaotian/thumbnail.png" alt="绪山真寻 预览" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/mahiro--lingxiaotian">绪山真寻</a></strong><br>作者: <a href="https://github.com/legeling">@legeling</a> · 分类: 动漫角色 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- mahiro--lingxiaotian</code><br><br><a href="https://q.dog/pets/mahiro--lingxiaotian">查看完整动作 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/makima-coat--yuyuabc1">玛奇玛（外套）</a></strong><br>作者: <a href="https://github.com/yuyuabc1">@yuyuabc1</a> · 分类: 动漫角色 · 版本: v2<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- makima-coat--yuyuabc1</code><br><br><a href="https://q.dog/pets/makima-coat--yuyuabc1">查看完整动作 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/makima-coat--yuyuabc1"><img src="https://q.dog/assets/previews/makima-coat--yuyuabc1/thumbnail.png" alt="玛奇玛（外套） 预览" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/makimamini--1sh1ro"><img src="https://q.dog/assets/previews/makimamini--1sh1ro/thumbnail.png" alt="玛奇玛 预览" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/makimamini--1sh1ro">玛奇玛</a></strong><br>作者: @1sh1ro · 分类: 动漫角色 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- makimamini--1sh1ro</code><br><br><a href="https://q.dog/pets/makimamini--1sh1ro">查看完整动作 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/makisekurisu--m1gr4ine">牧濑红莉栖</a></strong><br>作者: @m1gr4ine · 分类: 动漫角色 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- makisekurisu--m1gr4ine</code><br><br><a href="https://q.dog/pets/makisekurisu--m1gr4ine">查看完整动作 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/makisekurisu--m1gr4ine"><img src="https://q.dog/assets/previews/makisekurisu--m1gr4ine/thumbnail.png" alt="牧濑红莉栖 预览" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/mihari--hyoni1129"><img src="https://q.dog/assets/previews/mihari--hyoni1129/thumbnail.png" alt="Mihari 预览" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/mihari--hyoni1129">Mihari</a></strong><br>作者: <a href="https://github.com/Hyoni1129">@Hyoni1129</a> · 分类: 动漫角色 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- mihari--hyoni1129</code><br><br><a href="https://q.dog/pets/mihari--hyoni1129">查看完整动作 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/mikoto--lingxiaotian">御坂美琴</a></strong><br>作者: <a href="https://github.com/legeling">@legeling</a> · 分类: 动漫角色 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- mikoto--lingxiaotian</code><br><br><a href="https://q.dog/pets/mikoto--lingxiaotian">查看完整动作 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/mikoto--lingxiaotian"><img src="https://q.dog/assets/previews/mikoto--lingxiaotian/thumbnail.png" alt="御坂美琴 预览" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/miku--lingxiaotian"><img src="https://q.dog/assets/previews/miku--lingxiaotian/thumbnail.png" alt="初音未来 预览" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/miku--lingxiaotian">初音未来</a></strong><br>作者: <a href="https://github.com/legeling">@legeling</a> · 分类: 动漫角色 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- miku--lingxiaotian</code><br><br><a href="https://q.dog/pets/miku--lingxiaotian">查看完整动作 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/misaka-network--ldl1234">御坂网络</a></strong><br>作者: <a href="https://github.com/ldl1234">@ldl1234</a> · 分类: 动漫角色 · 版本: v2<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- misaka-network--ldl1234</code><br><br><a href="https://q.dog/pets/misaka-network--ldl1234">查看完整动作 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/misaka-network--ldl1234"><img src="https://q.dog/assets/previews/misaka-network--ldl1234/thumbnail.png" alt="御坂网络 预览" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/nimbus--soraberu"><img src="https://q.dog/assets/previews/nimbus--soraberu/thumbnail.png" alt="筋斗云悟空 预览" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/nimbus--soraberu">筋斗云悟空</a></strong><br>作者: <a href="https://codex-pets.net/users/soraberu">@soraberu</a> · 分类: 动漫角色 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- nimbus--soraberu</code><br><br><a href="https://q.dog/pets/nimbus--soraberu">查看完整动作 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/rem--l1">蕾姆</a></strong><br>作者: <a href="https://codex-pets.net/users/l1">@l1</a> · 分类: 动漫角色 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- rem--l1</code><br><br><a href="https://q.dog/pets/rem--l1">查看完整动作 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/rem--l1"><img src="https://q.dog/assets/previews/rem--l1/thumbnail.png" alt="蕾姆 预览" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/rinami--siiverash"><img src="https://q.dog/assets/previews/rinami--siiverash/thumbnail.png" alt="Rinami Himesaki 预览" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/rinami--siiverash">Rinami Himesaki</a></strong><br>作者: <a href="https://github.com/SiIverAsh">@SiIverAsh</a> · 分类: 动漫角色 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- rinami--siiverash</code><br><br><a href="https://q.dog/pets/rinami--siiverash">查看完整动作 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/roxy-pixel--gravity">Roxy Pixel</a></strong><br>作者: @gravity · 分类: 动漫角色 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- roxy-pixel--gravity</code><br><br><a href="https://q.dog/pets/roxy-pixel--gravity">查看完整动作 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/roxy-pixel--gravity"><img src="https://q.dog/assets/previews/roxy-pixel--gravity/thumbnail.png" alt="Roxy Pixel 预览" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/saber--petdex-zhenyou-ling"><img src="https://q.dog/assets/previews/saber--petdex-zhenyou-ling/thumbnail.png" alt="阿尔托莉雅 预览" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/saber--petdex-zhenyou-ling">阿尔托莉雅</a></strong><br>作者: @真宵 绫. · 分类: 动漫角色 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- saber--petdex-zhenyou-ling</code><br><br><a href="https://q.dog/pets/saber--petdex-zhenyou-ling">查看完整动作 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/gintoki-pixel--yuu-m">坂田银时</a></strong><br>作者: @Yuu M. · 分类: 动漫角色 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- gintoki-pixel--yuu-m</code><br><br><a href="https://q.dog/pets/gintoki-pixel--yuu-m">查看完整动作 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/gintoki-pixel--yuu-m"><img src="https://q.dog/assets/previews/gintoki-pixel--yuu-m/thumbnail.png" alt="坂田银时 预览" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/shinchan--chenxin-dlut"><img src="https://q.dog/assets/previews/shinchan--chenxin-dlut/thumbnail.png" alt="野原新之助 预览" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/shinchan--chenxin-dlut">野原新之助</a></strong><br>作者: <a href="https://github.com/chenxin-dlut">@chenxin-dlut</a> · 分类: 动漫角色 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- shinchan--chenxin-dlut</code><br><br><a href="https://q.dog/pets/shinchan--chenxin-dlut">查看完整动作 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/takamatsu-tomori--a1wace-dev">高松灯</a></strong><br>作者: @A1wace-dev · 分类: 动漫角色 · 版本: v2<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- takamatsu-tomori--a1wace-dev</code><br><br><a href="https://q.dog/pets/takamatsu-tomori--a1wace-dev">查看完整动作 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/takamatsu-tomori--a1wace-dev"><img src="https://q.dog/assets/previews/takamatsu-tomori--a1wace-dev/thumbnail.png" alt="高松灯 预览" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/violet--lazenca"><img src="https://q.dog/assets/previews/violet--lazenca/thumbnail.png" alt="薇尔莉特 预览" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/violet--lazenca">薇尔莉特</a></strong><br>作者: <a href="https://codex-pets.net/users/lazenca">@lazenca</a> · 分类: 动漫角色 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- violet--lazenca</code><br><br><a href="https://q.dog/pets/violet--lazenca">查看完整动作 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/wakaba-mutsumi--carambola">若叶睦</a></strong><br>作者: @Carambola · 分类: 动漫角色 · 版本: v2<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- wakaba-mutsumi--carambola</code><br><br><a href="https://q.dog/pets/wakaba-mutsumi--carambola">查看完整动作 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/wakaba-mutsumi--carambola"><img src="https://q.dog/assets/previews/wakaba-mutsumi--carambola/thumbnail.png" alt="若叶睦 预览" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/inosuke-hashibira--wangfan002"><img src="https://q.dog/assets/previews/inosuke-hashibira--wangfan002/thumbnail.png" alt="嘴平伊之助 预览" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/inosuke-hashibira--wangfan002">嘴平伊之助</a></strong><br>作者: @wangfan002 · 分类: 动漫角色 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- inosuke-hashibira--wangfan002</code><br><br><a href="https://q.dog/pets/inosuke-hashibira--wangfan002">查看完整动作 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/nangong-wan--bpup">南宫婉</a></strong><br>作者: <a href="https://github.com/bpup">@bpup</a> · 分类: 动漫角色 · 版本: v2<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- nangong-wan--bpup</code><br><br><a href="https://q.dog/pets/nangong-wan--bpup">查看完整动作 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/nangong-wan--bpup"><img src="https://q.dog/assets/previews/nangong-wan--bpup/thumbnail.png" alt="南宫婉 预览" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/zenitsu-agatsuma--wangfan002"><img src="https://q.dog/assets/previews/zenitsu-agatsuma--wangfan002/thumbnail.png" alt="我妻善逸 预览" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/zenitsu-agatsuma--wangfan002">我妻善逸</a></strong><br>作者: @wangfan002 · 分类: 动漫角色 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- zenitsu-agatsuma--wangfan002</code><br><br><a href="https://q.dog/pets/zenitsu-agatsuma--wangfan002">查看完整动作 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/giyu-tomioka--wangfan002">富冈义勇</a></strong><br>作者: @wangfan002 · 分类: 动漫角色 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- giyu-tomioka--wangfan002</code><br><br><a href="https://q.dog/pets/giyu-tomioka--wangfan002">查看完整动作 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/giyu-tomioka--wangfan002"><img src="https://q.dog/assets/previews/giyu-tomioka--wangfan002/thumbnail.png" alt="富冈义勇 预览" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/muichiro-tokito--wangfan002"><img src="https://q.dog/assets/previews/muichiro-tokito--wangfan002/thumbnail.png" alt="时透无一郎 预览" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/muichiro-tokito--wangfan002">时透无一郎</a></strong><br>作者: @wangfan002 · 分类: 动漫角色 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- muichiro-tokito--wangfan002</code><br><br><a href="https://q.dog/pets/muichiro-tokito--wangfan002">查看完整动作 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/tanjiro-kamado--wangfan002">灶门炭治郎</a></strong><br>作者: @wangfan002 · 分类: 动漫角色 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- tanjiro-kamado--wangfan002</code><br><br><a href="https://q.dog/pets/tanjiro-kamado--wangfan002">查看完整动作 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/tanjiro-kamado--wangfan002"><img src="https://q.dog/assets/previews/tanjiro-kamado--wangfan002/thumbnail.png" alt="灶门炭治郎 预览" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/nezuko-kamado--wangfan002"><img src="https://q.dog/assets/previews/nezuko-kamado--wangfan002/thumbnail.png" alt="灶门祢豆子 预览" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/nezuko-kamado--wangfan002">灶门祢豆子</a></strong><br>作者: @wangfan002 · 分类: 动漫角色 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- nezuko-kamado--wangfan002</code><br><br><a href="https://q.dog/pets/nezuko-kamado--wangfan002">查看完整动作 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/shinobu-kocho--wangfan002">蝴蝶忍</a></strong><br>作者: @wangfan002 · 分类: 动漫角色 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- shinobu-kocho--wangfan002</code><br><br><a href="https://q.dog/pets/shinobu-kocho--wangfan002">查看完整动作 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/shinobu-kocho--wangfan002"><img src="https://q.dog/assets/previews/shinobu-kocho--wangfan002/thumbnail.png" alt="蝴蝶忍 预览" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/bocchi--lingxiaotian"><img src="https://q.dog/assets/previews/bocchi--lingxiaotian/thumbnail.png" alt="后藤独 预览" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/bocchi--lingxiaotian">后藤独</a></strong><br>作者: <a href="https://github.com/legeling">@legeling</a> · 分类: 动漫角色 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- bocchi--lingxiaotian</code><br><br><a href="https://q.dog/pets/bocchi--lingxiaotian">查看完整动作 →</a></td></tr>
</table>

### 原创角色

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/aiko--chenxin-dlut">爱子</a></strong><br>作者: <a href="https://github.com/chenxin-dlut">@chenxin-dlut</a> · 分类: 原创角色 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- aiko--chenxin-dlut</code><br><br><a href="https://q.dog/pets/aiko--chenxin-dlut">查看完整动作 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/aiko--chenxin-dlut"><img src="https://q.dog/assets/previews/aiko--chenxin-dlut/thumbnail.png" alt="爱子 预览" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/diana--am"><img src="https://q.dog/assets/previews/diana--am/thumbnail.png" alt="Diana 预览" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/diana--am">Diana</a></strong><br>作者: @am · 分类: 原创角色 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- diana--am</code><br><br><a href="https://q.dog/pets/diana--am">查看完整动作 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/hajimi--zeyuwang1999">Hajimi</a></strong><br>作者: <a href="https://github.com/zeyuwang1999">@zeyuwang1999</a> · 分类: 原创角色 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- hajimi--zeyuwang1999</code><br><br><a href="https://q.dog/pets/hajimi--zeyuwang1999">查看完整动作 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/hajimi--zeyuwang1999"><img src="https://q.dog/assets/previews/hajimi--zeyuwang1999/thumbnail.png" alt="Hajimi 预览" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/hamo--haipengzzz"><img src="https://q.dog/assets/previews/hamo--haipengzzz/thumbnail.png" alt="Hamo 预览" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/hamo--haipengzzz">Hamo</a></strong><br>作者: <a href="https://github.com/haipengzzz">@haipengzzz</a> · 分类: 原创角色 · 版本: v2<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- hamo--haipengzzz</code><br><br><a href="https://q.dog/pets/hamo--haipengzzz">查看完整动作 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/hana2--initiatione">Hana2</a></strong><br>作者: <a href="https://github.com/initiatione">@initiatione</a> · 分类: 原创角色 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- hana2--initiatione</code><br><br><a href="https://q.dog/pets/hana2--initiatione">查看完整动作 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/hana2--initiatione"><img src="https://q.dog/assets/previews/hana2--initiatione/thumbnail.png" alt="Hana2 预览" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/iris--yau-427"><img src="https://q.dog/assets/previews/iris--yau-427/thumbnail.png" alt="Iris 预览" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/iris--yau-427">Iris</a></strong><br>作者: <a href="https://github.com/Yau-427">@Yau-427</a> · 分类: 原创角色 · 版本: v2<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- iris--yau-427</code><br><br><a href="https://q.dog/pets/iris--yau-427">查看完整动作 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/jesse-the-fox--itjesse">阿博</a></strong><br>作者: <a href="https://github.com/ITJesse">@ITJesse</a> · 分类: 原创角色 · 版本: v2<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- jesse-the-fox--itjesse</code><br><br><a href="https://q.dog/pets/jesse-the-fox--itjesse">查看完整动作 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/jesse-the-fox--itjesse"><img src="https://q.dog/assets/previews/jesse-the-fox--itjesse/thumbnail.png" alt="阿博 预览" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/joker--oytyo"><img src="https://q.dog/assets/previews/joker--oytyo/thumbnail.png" alt="Joker 预览" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/joker--oytyo">Joker</a></strong><br>作者: @oytyo · 分类: 原创角色 · 版本: v2<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- joker--oytyo</code><br><br><a href="https://q.dog/pets/joker--oytyo">查看完整动作 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/linnea--nyakku-shigure">Linnea</a></strong><br>作者: @nyakku-shigure · 分类: 原创角色 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- linnea--nyakku-shigure</code><br><br><a href="https://q.dog/pets/linnea--nyakku-shigure">查看完整动作 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/linnea--nyakku-shigure"><img src="https://q.dog/assets/previews/linnea--nyakku-shigure/thumbnail.png" alt="Linnea 预览" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/mika--rotl24"><img src="https://q.dog/assets/previews/mika--rotl24/thumbnail.png" alt="Mika 预览" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/mika--rotl24">Mika</a></strong><br>作者: <a href="https://github.com/ROTl24">@ROTl24</a> · 分类: 原创角色 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- mika--rotl24</code><br><br><a href="https://q.dog/pets/mika--rotl24">查看完整动作 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/minty--somnusochi">Minty</a></strong><br>作者: <a href="https://github.com/Somnusochi">@Somnusochi</a> · 分类: 原创角色 · 版本: v2<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- minty--somnusochi</code><br><br><a href="https://q.dog/pets/minty--somnusochi">查看完整动作 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/minty--somnusochi"><img src="https://q.dog/assets/previews/minty--somnusochi/thumbnail.png" alt="Minty 预览" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/ruruka--ltmcliao-cmyk"><img src="https://q.dog/assets/previews/ruruka--ltmcliao-cmyk/thumbnail.png" alt="RuRuKa 预览" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/ruruka--ltmcliao-cmyk">RuRuKa</a></strong><br>作者: <a href="https://github.com/ltmcliao-cmyk">@ltmcliao-cmyk</a> · 分类: 原创角色 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- ruruka--ltmcliao-cmyk</code><br><br><a href="https://q.dog/pets/ruruka--ltmcliao-cmyk">查看完整动作 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/shian-helper--mistyshen">Shian</a></strong><br>作者: <a href="https://github.com/mistyShen">@mistyShen</a> · 分类: 原创角色 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- shian-helper--mistyshen</code><br><br><a href="https://q.dog/pets/shian-helper--mistyshen">查看完整动作 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/shian-helper--mistyshen"><img src="https://q.dog/assets/previews/shian-helper--mistyshen/thumbnail.png" alt="Shian 预览" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/yier--gbn666"><img src="https://q.dog/assets/previews/yier--gbn666/thumbnail.png" alt="Yi Er 预览" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/yier--gbn666">Yi Er</a></strong><br>作者: <a href="https://github.com/gbn666">@gbn666</a> · 分类: 原创角色 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- yier--gbn666</code><br><br><a href="https://q.dog/pets/yier--gbn666">查看完整动作 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/yume-boundary--andy-meow">Yume</a></strong><br>作者: @andy-meow · 分类: 原创角色 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- yume-boundary--andy-meow</code><br><br><a href="https://q.dog/pets/yume-boundary--andy-meow">查看完整动作 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/yume-boundary--andy-meow"><img src="https://q.dog/assets/previews/yume-boundary--andy-meow/thumbnail.png" alt="Yume 预览" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/yuzubou--keseras34938976"><img src="https://q.dog/assets/previews/yuzubou--keseras34938976/thumbnail.png" alt="Yuzubou 预览" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/yuzubou--keseras34938976">Yuzubou</a></strong><br>作者: <a href="https://github.com/Keseras34938976">@Keseras34938976</a> · 分类: 原创角色 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- yuzubou--keseras34938976</code><br><br><a href="https://q.dog/pets/yuzubou--keseras34938976">查看完整动作 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/gudong--rank">咕咚</a></strong><br>作者: @Rank · 分类: 原创角色 · 版本: v2<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- gudong--rank</code><br><br><a href="https://q.dog/pets/gudong--rank">查看完整动作 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/gudong--rank"><img src="https://q.dog/assets/previews/gudong--rank/thumbnail.png" alt="咕咚 预览" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/liubao--killyer"><img src="https://q.dog/assets/previews/liubao--killyer/thumbnail.png" alt="榴宝 预览" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/liubao--killyer">榴宝</a></strong><br>作者: @killyer · 分类: 原创角色 · 版本: v2<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- liubao--killyer</code><br><br><a href="https://q.dog/pets/liubao--killyer">查看完整动作 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/feibi--vanfff">菲比</a></strong><br>作者: @vanfff · 分类: 原创角色 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- feibi--vanfff</code><br><br><a href="https://q.dog/pets/feibi--vanfff">查看完整动作 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/feibi--vanfff"><img src="https://q.dog/assets/previews/feibi--vanfff/thumbnail.png" alt="菲比 预览" width="160" height="173"></a></td></tr>
</table>

### 吉祥物

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/aemeath-mini--cunuo"><img src="https://q.dog/assets/previews/aemeath-mini--cunuo/thumbnail.png" alt="Aemeath Mini 预览" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/aemeath-mini--cunuo">Aemeath Mini</a></strong><br>作者: <a href="https://github.com/cuNuo">@cuNuo</a> · 分类: 吉祥物 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- aemeath-mini--cunuo</code><br><br><a href="https://q.dog/pets/aemeath-mini--cunuo">查看完整动作 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/apu--xchangee">Apu</a></strong><br>作者: <a href="https://github.com/xchangee">@xchangee</a> · 分类: 吉祥物 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- apu--xchangee</code><br><br><a href="https://q.dog/pets/apu--xchangee">查看完整动作 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/apu--xchangee"><img src="https://q.dog/assets/previews/apu--xchangee/thumbnail.png" alt="Apu 预览" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/claude--xiangking"><img src="https://q.dog/assets/previews/claude--xiangking/thumbnail.png" alt="Claude 预览" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/claude--xiangking">Claude</a></strong><br>作者: <a href="https://github.com/xiangking">@xiangking</a> · 分类: 吉祥物 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- claude--xiangking</code><br><br><a href="https://q.dog/pets/claude--xiangking">查看完整动作 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/twinkle-twinkle--twinkletwinkle">Dashun's Twinkle Twinkle</a></strong><br>作者: @twinkletwinkle · 分类: 吉祥物 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- twinkle-twinkle--twinkletwinkle</code><br><br><a href="https://q.dog/pets/twinkle-twinkle--twinkletwinkle">查看完整动作 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/twinkle-twinkle--twinkletwinkle"><img src="https://q.dog/assets/previews/twinkle-twinkle--twinkletwinkle/thumbnail.png" alt="Dashun's Twinkle Twinkle 预览" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/diaoyi-baobao--d1a0y1bb"><img src="https://q.dog/assets/previews/diaoyi-baobao--d1a0y1bb/thumbnail.png" alt="Diaoyi Baobao 预览" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/diaoyi-baobao--d1a0y1bb">Diaoyi Baobao</a></strong><br>作者: <a href="https://github.com/D1a0y1bb">@D1a0y1bb</a> · 分类: 吉祥物 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- diaoyi-baobao--d1a0y1bb</code><br><br><a href="https://q.dog/pets/diaoyi-baobao--d1a0y1bb">查看完整动作 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/gpt-muse--opask">GPT-muse</a></strong><br>作者: @opask · 分类: 吉祥物 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- gpt-muse--opask</code><br><br><a href="https://q.dog/pets/gpt-muse--opask">查看完整动作 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/gpt-muse--opask"><img src="https://q.dog/assets/previews/gpt-muse--opask/thumbnail.png" alt="GPT-muse 预览" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/lulu--yogazz"><img src="https://q.dog/assets/previews/lulu--yogazz/thumbnail.png" alt="Lulu 预览" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/lulu--yogazz">Lulu</a></strong><br>作者: <a href="https://github.com/YoGazz">@YoGazz</a> · 分类: 吉祥物 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- lulu--yogazz</code><br><br><a href="https://q.dog/pets/lulu--yogazz">查看完整动作 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/saki--rookie-09">Saki</a></strong><br>作者: <a href="https://github.com/rookie-09">@rookie-09</a> · 分类: 吉祥物 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- saki--rookie-09</code><br><br><a href="https://q.dog/pets/saki--rookie-09">查看完整动作 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/saki--rookie-09"><img src="https://q.dog/assets/previews/saki--rookie-09/thumbnail.png" alt="Saki 预览" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/wally--wally025"><img src="https://q.dog/assets/previews/wally--wally025/thumbnail.png" alt="Wally 预览" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/wally--wally025">Wally</a></strong><br>作者: <a href="https://github.com/wally025">@wally025</a> · 分类: 吉祥物 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- wally--wally025</code><br><br><a href="https://q.dog/pets/wally--wally025">查看完整动作 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/zhengyin--noonwake">正音</a></strong><br>作者: <a href="https://pets.usefulmint.com/?utm_source=awesome_codex_pet&utm_medium=directory&utm_campaign=founding_five&utm_content=zhengyin_listing">@noonwake-ai</a> · 分类: 吉祥物 · 版本: v2<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- zhengyin--noonwake</code><br><br><a href="https://q.dog/pets/zhengyin--noonwake">查看完整动作 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/zhengyin--noonwake"><img src="https://q.dog/assets/previews/zhengyin--noonwake/thumbnail.png" alt="正音 预览" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/happynailong--aquaxyy"><img src="https://q.dog/assets/previews/happynailong--aquaxyy/thumbnail.png" alt="大笑奶龙 预览" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/happynailong--aquaxyy">大笑奶龙</a></strong><br>作者: @aquaxyy · 分类: 吉祥物 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- happynailong--aquaxyy</code><br><br><a href="https://q.dog/pets/happynailong--aquaxyy">查看完整动作 →</a></td></tr>
</table>

### 动物伙伴

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/becky--natewanggg">Becky</a></strong><br>作者: <a href="https://github.com/NateWanggg">@NateWanggg</a> · 分类: 动物伙伴 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- becky--natewanggg</code><br><br><a href="https://q.dog/pets/becky--natewanggg">查看完整动作 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/becky--natewanggg"><img src="https://q.dog/assets/previews/becky--natewanggg/thumbnail.png" alt="Becky 预览" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/bubu--gbn666"><img src="https://q.dog/assets/previews/bubu--gbn666/thumbnail.png" alt="Bubu 预览" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/bubu--gbn666">Bubu</a></strong><br>作者: <a href="https://github.com/gbn666">@gbn666</a> · 分类: 动物伙伴 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- bubu--gbn666</code><br><br><a href="https://q.dog/pets/bubu--gbn666">查看完整动作 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/corgi-companion--cxian0928-afk">Corgi Companion</a></strong><br>作者: <a href="https://github.com/cxian0928-afk">@cxian0928-afk</a> · 分类: 动物伙伴 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- corgi-companion--cxian0928-afk</code><br><br><a href="https://q.dog/pets/corgi-companion--cxian0928-afk">查看完整动作 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/corgi-companion--cxian0928-afk"><img src="https://q.dog/assets/previews/corgi-companion--cxian0928-afk/thumbnail.png" alt="Corgi Companion 预览" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/desk-otter--zihualiu1997"><img src="https://q.dog/assets/previews/desk-otter--zihualiu1997/thumbnail.png" alt="Desk Otter 预览" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/desk-otter--zihualiu1997">Desk Otter</a></strong><br>作者: <a href="https://github.com/zihualiu1997">@zihualiu1997</a> · 分类: 动物伙伴 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- desk-otter--zihualiu1997</code><br><br><a href="https://q.dog/pets/desk-otter--zihualiu1997">查看完整动作 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/diandian--lllucasxu">Diandian</a></strong><br>作者: <a href="https://github.com/LLLucasXU">@LLLucasXU</a> · 分类: 动物伙伴 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- diandian--lllucasxu</code><br><br><a href="https://q.dog/pets/diandian--lllucasxu">查看完整动作 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/diandian--lllucasxu"><img src="https://q.dog/assets/previews/diandian--lllucasxu/thumbnail.png" alt="Diandian 预览" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/dudu-bubu--clembuilds"><img src="https://q.dog/assets/previews/dudu-bubu--clembuilds/thumbnail.png" alt="Dudu & Bubu 预览" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/dudu-bubu--clembuilds">Dudu & Bubu</a></strong><br>作者: @clembuilds · 分类: 动物伙伴 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- dudu-bubu--clembuilds</code><br><br><a href="https://q.dog/pets/dudu-bubu--clembuilds">查看完整动作 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/ella-wave--sehjk">Ella Wave</a></strong><br>作者: @sehjk · 分类: 动物伙伴 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- ella-wave--sehjk</code><br><br><a href="https://q.dog/pets/ella-wave--sehjk">查看完整动作 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/ella-wave--sehjk"><img src="https://q.dog/assets/previews/ella-wave--sehjk/thumbnail.png" alt="Ella Wave 预览" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/fleta--natewanggg"><img src="https://q.dog/assets/previews/fleta--natewanggg/thumbnail.png" alt="Fleta 预览" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/fleta--natewanggg">Fleta</a></strong><br>作者: <a href="https://github.com/NateWanggg">@NateWanggg</a> · 分类: 动物伙伴 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- fleta--natewanggg</code><br><br><a href="https://q.dog/pets/fleta--natewanggg">查看完整动作 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/frankie--aygunvarol">Frankie</a></strong><br>作者: <a href="https://github.com/AygunVarol">@AygunVarol</a> · 分类: 动物伙伴 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- frankie--aygunvarol</code><br><br><a href="https://q.dog/pets/frankie--aygunvarol">查看完整动作 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/frankie--aygunvarol"><img src="https://q.dog/assets/previews/frankie--aygunvarol/thumbnail.png" alt="Frankie 预览" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/jiji--yena"><img src="https://q.dog/assets/previews/jiji--yena/thumbnail.png" alt="Jiji 预览" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/jiji--yena">Jiji</a></strong><br>作者: @yena · 分类: 动物伙伴 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- jiji--yena</code><br><br><a href="https://q.dog/pets/jiji--yena">查看完整动作 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/kiko--untko">Kiko</a></strong><br>作者: <a href="https://github.com/untko">@untko</a> · 分类: 动物伙伴 · 版本: v2<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- kiko--untko</code><br><br><a href="https://q.dog/pets/kiko--untko">查看完整动作 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/kiko--untko"><img src="https://q.dog/assets/previews/kiko--untko/thumbnail.png" alt="Kiko 预览" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/kimoju--andiac"><img src="https://q.dog/assets/previews/kimoju--andiac/thumbnail.png" alt="Kimoju 预览" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/kimoju--andiac">Kimoju</a></strong><br>作者: @andiac · 分类: 动物伙伴 · 版本: v2<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- kimoju--andiac</code><br><br><a href="https://q.dog/pets/kimoju--andiac">查看完整动作 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/lil-swole--gg0805">Lil Swole</a></strong><br>作者: <a href="https://github.com/gg0805">@gg0805</a> · 分类: 动物伙伴 · 版本: v2<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- lil-swole--gg0805</code><br><br><a href="https://q.dog/pets/lil-swole--gg0805">查看完整动作 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/lil-swole--gg0805"><img src="https://q.dog/assets/previews/lil-swole--gg0805/thumbnail.png" alt="Lil Swole 预览" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/little-sheep--mingdong"><img src="https://q.dog/assets/previews/little-sheep--mingdong/thumbnail.png" alt="Little Sheep 预览" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/little-sheep--mingdong">Little Sheep</a></strong><br>作者: @MingDong · 分类: 动物伙伴 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- little-sheep--mingdong</code><br><br><a href="https://q.dog/pets/little-sheep--mingdong">查看完整动作 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/mai--dwdestiny">Mai</a></strong><br>作者: <a href="https://github.com/DwDestiny">@DwDestiny</a> · 分类: 动物伙伴 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- mai--dwdestiny</code><br><br><a href="https://q.dog/pets/mai--dwdestiny">查看完整动作 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/mai--dwdestiny"><img src="https://q.dog/assets/previews/mai--dwdestiny/thumbnail.png" alt="Mai 预览" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/mellow-duck--sally-entr"><img src="https://q.dog/assets/previews/mellow-duck--sally-entr/thumbnail.png" alt="Mellow Duck 预览" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/mellow-duck--sally-entr">Mellow Duck</a></strong><br>作者: @sally-entr · 分类: 动物伙伴 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- mellow-duck--sally-entr</code><br><br><a href="https://q.dog/pets/mellow-duck--sally-entr">查看完整动作 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/mimi--spacebody">Mimi</a></strong><br>作者: <a href="https://github.com/Spacebody">@Spacebody</a> · 分类: 动物伙伴 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- mimi--spacebody</code><br><br><a href="https://q.dog/pets/mimi--spacebody">查看完整动作 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/mimi--spacebody"><img src="https://q.dog/assets/previews/mimi--spacebody/thumbnail.png" alt="Mimi 预览" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/moomew-coder-cat--ping"><img src="https://q.dog/assets/previews/moomew-coder-cat--ping/thumbnail.png" alt="MooMew Coder 预览" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/moomew-coder-cat--ping">MooMew Coder</a></strong><br>作者: @ping · 分类: 动物伙伴 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- moomew-coder-cat--ping</code><br><br><a href="https://q.dog/pets/moomew-coder-cat--ping">查看完整动作 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/panda--jason-bai">Panda</a></strong><br>作者: <a href="https://github.com/Jason-Bai">@Jason-Bai</a> · 分类: 动物伙伴 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- panda--jason-bai</code><br><br><a href="https://q.dog/pets/panda--jason-bai">查看完整动作 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/panda--jason-bai"><img src="https://q.dog/assets/previews/panda--jason-bai/thumbnail.png" alt="Panda 预览" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/pixel-duck--flamurmaliqi"><img src="https://q.dog/assets/previews/pixel-duck--flamurmaliqi/thumbnail.png" alt="Pixel Duck 预览" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/pixel-duck--flamurmaliqi">Pixel Duck</a></strong><br>作者: <a href="https://github.com/FlamurMaliqi">@FlamurMaliqi</a> · 分类: 动物伙伴 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- pixel-duck--flamurmaliqi</code><br><br><a href="https://q.dog/pets/pixel-duck--flamurmaliqi">查看完整动作 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/rook--klubbyte">Rook</a></strong><br>作者: @klubbyte · 分类: 动物伙伴 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- rook--klubbyte</code><br><br><a href="https://q.dog/pets/rook--klubbyte">查看完整动作 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/rook--klubbyte"><img src="https://q.dog/assets/previews/rook--klubbyte/thumbnail.png" alt="Rook 预览" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/miu-meo--lemon-z"><img src="https://q.dog/assets/previews/miu-meo--lemon-z/thumbnail.png" alt="月薪喵 预览" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/miu-meo--lemon-z">月薪喵</a></strong><br>作者: @lemon-z · 分类: 动物伙伴 · 版本: v2<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- miu-meo--lemon-z</code><br><br><a href="https://q.dog/pets/miu-meo--lemon-z">查看完整动作 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/salary-cat--zuochunjie">月薪喵</a></strong><br>作者: <a href="https://github.com/Zuochunjie">@Zuochunjie</a> · 分类: 动物伙伴 · 版本: v2<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- salary-cat--zuochunjie</code><br><br><a href="https://q.dog/pets/salary-cat--zuochunjie">查看完整动作 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/salary-cat--zuochunjie"><img src="https://q.dog/assets/previews/salary-cat--zuochunjie/thumbnail.png" alt="月薪喵 预览" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/teddy--danieloleary"><img src="https://q.dog/assets/previews/teddy--danieloleary/thumbnail.png" alt="Teddy 预览" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/teddy--danieloleary">Teddy</a></strong><br>作者: <a href="https://github.com/danieloleary">@danieloleary</a> · 分类: 动物伙伴 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- teddy--danieloleary</code><br><br><a href="https://q.dog/pets/teddy--danieloleary">查看完整动作 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/tian-hua-hua--d1a0y1bb">Tian Hua Hua</a></strong><br>作者: <a href="https://github.com/D1a0y1bb">@D1a0y1bb</a> · 分类: 动物伙伴 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- tian-hua-hua--d1a0y1bb</code><br><br><a href="https://q.dog/pets/tian-hua-hua--d1a0y1bb">查看完整动作 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/tian-hua-hua--d1a0y1bb"><img src="https://q.dog/assets/previews/tian-hua-hua--d1a0y1bb/thumbnail.png" alt="Tian Hua Hua 预览" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/usachi--jack"><img src="https://q.dog/assets/previews/usachi--jack/thumbnail.png" alt="乌萨奇 预览" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/usachi--jack">乌萨奇</a></strong><br>作者: @jack · 分类: 动物伙伴 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- usachi--jack</code><br><br><a href="https://q.dog/pets/usachi--jack">查看完整动作 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/dai-dai-nai-you--1wphantom">呆呆奶油</a></strong><br>作者: @1wphantom · 分类: 动物伙伴 · 版本: v2<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- dai-dai-nai-you--1wphantom</code><br><br><a href="https://q.dog/pets/dai-dai-nai-you--1wphantom">查看完整动作 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/dai-dai-nai-you--1wphantom"><img src="https://q.dog/assets/previews/dai-dai-nai-you--1wphantom/thumbnail.png" alt="呆呆奶油 预览" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/tuantuan--jbbom"><img src="https://q.dog/assets/previews/tuantuan--jbbom/thumbnail.png" alt="团团 预览" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/tuantuan--jbbom">团团</a></strong><br>作者: <a href="https://github.com/JbBom">@JbBom</a> · 分类: 动物伙伴 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- tuantuan--jbbom</code><br><br><a href="https://q.dog/pets/tuantuan--jbbom">查看完整动作 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/duodong--froggie">多栋</a></strong><br>作者: @froggie · 分类: 动物伙伴 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- duodong--froggie</code><br><br><a href="https://q.dog/pets/duodong--froggie">查看完整动作 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/duodong--froggie"><img src="https://q.dog/assets/previews/duodong--froggie/thumbnail.png" alt="多栋 预览" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/naiwa--sandytruant"><img src="https://q.dog/assets/previews/naiwa--sandytruant/thumbnail.png" alt="奶蛙 预览" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/naiwa--sandytruant">奶蛙</a></strong><br>作者: <a href="https://github.com/sandytruant">@sandytruant</a> · 分类: 动物伙伴 · 版本: v2<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- naiwa--sandytruant</code><br><br><a href="https://q.dog/pets/naiwa--sandytruant">查看完整动作 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/xiaoba-cat--jack">小八猫</a></strong><br>作者: @jack · 分类: 动物伙伴 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- xiaoba-cat--jack</code><br><br><a href="https://q.dog/pets/xiaoba-cat--jack">查看完整动作 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/xiaoba-cat--jack"><img src="https://q.dog/assets/previews/xiaoba-cat--jack/thumbnail.png" alt="小八猫 预览" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/xiaomai--brian-3"><img src="https://q.dog/assets/previews/xiaomai--brian-3/thumbnail.png" alt="小麦 XiaoMai 预览" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/xiaomai--brian-3">小麦 XiaoMai</a></strong><br>作者: @brian-3 · 分类: 动物伙伴 · 版本: v2<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- xiaomai--brian-3</code><br><br><a href="https://q.dog/pets/xiaomai--brian-3">查看完整动作 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/koukou-penguin--hoody">扣扣企鹅</a></strong><br>作者: @hoody · 分类: 动物伙伴 · 版本: v2<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- koukou-penguin--hoody</code><br><br><a href="https://q.dog/pets/koukou-penguin--hoody">查看完整动作 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/koukou-penguin--hoody"><img src="https://q.dog/assets/previews/koukou-penguin--hoody/thumbnail.png" alt="扣扣企鹅 预览" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/capybara-lulu--jiushu"><img src="https://q.dog/assets/previews/capybara-lulu--jiushu/thumbnail.png" alt="水豚噜噜 预览" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/capybara-lulu--jiushu">水豚噜噜</a></strong><br>作者: @jiushu · 分类: 动物伙伴 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- capybara-lulu--jiushu</code><br><br><a href="https://q.dog/pets/capybara-lulu--jiushu">查看完整动作 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/niumou--jarvis-2">牛哞</a></strong><br>作者: @jarvis-2 · 分类: 动物伙伴 · 版本: v2<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- niumou--jarvis-2</code><br><br><a href="https://q.dog/pets/niumou--jarvis-2">查看完整动作 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/niumou--jarvis-2"><img src="https://q.dog/assets/previews/niumou--jarvis-2/thumbnail.png" alt="牛哞 预览" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/zichao-xiong--z-kzhang"><img src="https://q.dog/assets/previews/zichao-xiong--z-kzhang/thumbnail.png" alt="自嘲熊 预览" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/zichao-xiong--z-kzhang">自嘲熊</a></strong><br>作者: @z-kzhang · 分类: 动物伙伴 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- zichao-xiong--z-kzhang</code><br><br><a href="https://q.dog/pets/zichao-xiong--z-kzhang">查看完整动作 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/wucanrou--ch">金渐层（午餐肉）</a></strong><br>作者: <a href="https://github.com/huanchu0213-ui">@huanchu0213-ui</a> · 分类: 动物伙伴 · 版本: v2<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- wucanrou--ch</code><br><br><a href="https://q.dog/pets/wucanrou--ch">查看完整动作 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/wucanrou--ch"><img src="https://q.dog/assets/previews/wucanrou--ch/thumbnail.png" alt="金渐层（午餐肉） 预览" width="160" height="173"></a></td></tr>
</table>

### 幻想生物

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/goblin--rkwap"><img src="https://q.dog/assets/previews/goblin--rkwap/thumbnail.png" alt="Goblin 预览" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/goblin--rkwap">Goblin</a></strong><br>作者: @rkwap · 分类: 幻想生物 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- goblin--rkwap</code><br><br><a href="https://q.dog/pets/goblin--rkwap">查看完整动作 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/luna-angel-cat--neve">luna_angel cat</a></strong><br>作者: @neve · 分类: 幻想生物 · 版本: v2<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- luna-angel-cat--neve</code><br><br><a href="https://q.dog/pets/luna-angel-cat--neve">查看完整动作 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/luna-angel-cat--neve"><img src="https://q.dog/assets/previews/luna-angel-cat--neve/thumbnail.png" alt="luna_angel cat 预览" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/night-neko--netizenxuan"><img src="https://q.dog/assets/previews/night-neko--netizenxuan/thumbnail.png" alt="Night Neko 预览" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/night-neko--netizenxuan">Night Neko</a></strong><br>作者: <a href="https://github.com/netizenXuan">@netizenXuan</a> · 分类: 幻想生物 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- night-neko--netizenxuan</code><br><br><a href="https://q.dog/pets/night-neko--netizenxuan">查看完整动作 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/starcorn--alterhq">Starcorn</a></strong><br>作者: <a href="https://github.com/alterhq">@alterhq</a> · 分类: 幻想生物 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- starcorn--alterhq</code><br><br><a href="https://q.dog/pets/starcorn--alterhq">查看完整动作 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/starcorn--alterhq"><img src="https://q.dog/assets/previews/starcorn--alterhq/thumbnail.png" alt="Starcorn 预览" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/xian-xiao-lu--qingyunagi"><img src="https://q.dog/assets/previews/xian-xiao-lu--qingyunagi/thumbnail.png" alt="Xian Xiao Lu 预览" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/xian-xiao-lu--qingyunagi">Xian Xiao Lu</a></strong><br>作者: <a href="https://github.com/qingyunAGI">@qingyunAGI</a> · 分类: 幻想生物 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- xian-xiao-lu--qingyunagi</code><br><br><a href="https://q.dog/pets/xian-xiao-lu--qingyunagi">查看完整动作 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/yuanzai--gaming33">Yuanzai</a></strong><br>作者: <a href="https://github.com/Gaming33">@Gaming33</a> · 分类: 幻想生物 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- yuanzai--gaming33</code><br><br><a href="https://q.dog/pets/yuanzai--gaming33">查看完整动作 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/yuanzai--gaming33"><img src="https://q.dog/assets/previews/yuanzai--gaming33/thumbnail.png" alt="Yuanzai 预览" width="160" height="173"></a></td></tr>
</table>

### 机器人

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/chispa--giiilberto-nm"><img src="https://q.dog/assets/previews/chispa--giiilberto-nm/thumbnail.png" alt="Chispa 预览" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/chispa--giiilberto-nm">Chispa</a></strong><br>作者: @giiilberto-nm · 分类: 机器人 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- chispa--giiilberto-nm</code><br><br><a href="https://q.dog/pets/chispa--giiilberto-nm">查看完整动作 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/codenono--dq02">CodeNoNo</a></strong><br>作者: <a href="https://github.com/Dqd02">@Dqd02</a> · 分类: 机器人 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- codenono--dq02</code><br><br><a href="https://q.dog/pets/codenono--dq02">查看完整动作 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/codenono--dq02"><img src="https://q.dog/assets/previews/codenono--dq02/thumbnail.png" alt="CodeNoNo 预览" width="160" height="173"></a></td></tr>
</table>

### 人物头像

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/azuma--tairazuma"><img src="https://q.dog/assets/previews/azuma--tairazuma/thumbnail.png" alt="Azuma 预览" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/azuma--tairazuma">Azuma</a></strong><br>作者: @tairazuma · 分类: 人物头像 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- azuma--tairazuma</code><br><br><a href="https://q.dog/pets/azuma--tairazuma">查看完整动作 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/tangdouren--carl312">Tangdouren</a></strong><br>作者: <a href="https://github.com/Carl-312">@Carl-312</a> · 分类: 人物头像 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- tangdouren--carl312</code><br><br><a href="https://q.dog/pets/tangdouren--carl312">查看完整动作 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/tangdouren--carl312"><img src="https://q.dog/assets/previews/tangdouren--carl312/thumbnail.png" alt="Tangdouren 预览" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/guga--circus"><img src="https://q.dog/assets/previews/guga--circus/thumbnail.png" alt="咕嘎 预览" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/guga--circus">咕嘎</a></strong><br>作者: @circus · 分类: 人物头像 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- guga--circus</code><br><br><a href="https://q.dog/pets/guga--circus">查看完整动作 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/fengge--qzl1-stack">峰哥</a></strong><br>作者: <a href="https://github.com/qzl1-stack">@qzl1-stack</a> · 分类: 人物头像 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- fengge--qzl1-stack</code><br><br><a href="https://q.dog/pets/fengge--qzl1-stack">查看完整动作 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/fengge--qzl1-stack"><img src="https://q.dog/assets/previews/fengge--qzl1-stack/thumbnail.png" alt="峰哥 预览" width="160" height="173"></a></td></tr>
</table>

### 网络梗图

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/drill-cat--qimi"><img src="https://q.dog/assets/previews/drill-cat--qimi/thumbnail.png" alt="电钻咪 预览" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/drill-cat--qimi">电钻咪</a></strong><br>作者: <a href="https://github.com/qishichuan">@qishichuan</a> · 分类: 网络梗图 · 版本: v2<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- drill-cat--qimi</code><br><br><a href="https://q.dog/pets/drill-cat--qimi">查看完整动作 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/hami--tat">哈基米</a></strong><br>作者: <a href="https://github.com/TATcc">@TATcc</a> · 分类: 网络梗图 · 版本: v2<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- hami--tat</code><br><br><a href="https://q.dog/pets/hami--tat">查看完整动作 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/hami--tat"><img src="https://q.dog/assets/previews/hami--tat/thumbnail.png" alt="哈基米 预览" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/katana-cheems--thankyou-cheems"><img src="https://q.dog/assets/previews/katana-cheems--thankyou-cheems/thumbnail.png" alt="Katana Cheems 预览" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/katana-cheems--thankyou-cheems">Katana Cheems</a></strong><br>作者: <a href="https://github.com/Thankyou-Cheems">@Thankyou-Cheems</a> · 分类: 网络梗图 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- katana-cheems--thankyou-cheems</code><br><br><a href="https://q.dog/pets/katana-cheems--thankyou-cheems">查看完整动作 →</a></td></tr>
</table>

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/hance-woniu--korn">旱厕蜗牛</a></strong><br>作者: @korn · 分类: 网络梗图 · 版本: v2<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- hance-woniu--korn</code><br><br><a href="https://q.dog/pets/hance-woniu--korn">查看完整动作 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/hance-woniu--korn"><img src="https://q.dog/assets/previews/hance-woniu--korn/thumbnail.png" alt="旱厕蜗牛 预览" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/maodie--octane0411"><img src="https://q.dog/assets/previews/maodie--octane0411/thumbnail.png" alt="耄耋 预览" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/maodie--octane0411">耄耋</a></strong><br>作者: <a href="https://github.com/Octane0411">@Octane0411</a> · 分类: 网络梗图 · 版本: v2<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- maodie--octane0411</code><br><br><a href="https://q.dog/pets/maodie--octane0411">查看完整动作 →</a></td></tr>
</table>

### 物件与道具

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/spellbook--seymour">Spellbook</a></strong><br>作者: @seymour · 分类: 物件与道具 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- spellbook--seymour</code><br><br><a href="https://q.dog/pets/spellbook--seymour">查看完整动作 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/spellbook--seymour"><img src="https://q.dog/assets/previews/spellbook--seymour/thumbnail.png" alt="Spellbook 预览" width="160" height="173"></a></td></tr>
</table>

<table>
<tr><td width="180" align="center"><a href="https://q.dog/pets/tiny-crt--chochou"><img src="https://q.dog/assets/previews/tiny-crt--chochou/thumbnail.png" alt="Tiny CRT 预览" width="160" height="173"></a></td><td valign="top"><strong><a href="https://q.dog/pets/tiny-crt--chochou">Tiny CRT</a></strong><br>作者: @chochou · 分类: 物件与道具 · 版本: v1<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- tiny-crt--chochou</code><br><br><a href="https://q.dog/pets/tiny-crt--chochou">查看完整动作 →</a></td></tr>
</table>

### 其他

<table>
<tr><td valign="top"><strong><a href="https://q.dog/pets/twilight-sparkle--wuye3790">紫悦</a></strong><br>作者: <a href="https://github.com/WuYe3790">@WuYe3790</a> · 分类: 其他 · 版本: v2<br><br><strong>安装</strong><br><code>curl -fsSL https://raw.githubusercontent.com/burgleaf/qdog-community/main/scripts/install-pet.sh | bash -s -- twilight-sparkle--wuye3790</code><br><br><a href="https://q.dog/pets/twilight-sparkle--wuye3790">查看完整动作 →</a></td><td width="180" align="center"><a href="https://q.dog/pets/twilight-sparkle--wuye3790"><img src="https://q.dog/assets/previews/twilight-sparkle--wuye3790/thumbnail.png" alt="紫悦 预览" width="160" height="173"></a></td></tr>
</table>

## 申请或投稿

没有喜欢的角色时，请打开[免费社区制作申请页](https://q.dog/zh/request)。提交申请不收费，不需要自己准备 spritesheet，社区贡献者可能会志愿认领并制作；申请不代表承诺收录或交付。

贡献者可以从[网站上的制作与投稿指南](https://q.dog/guide)开始。为了避免每位投稿者都下载体积较大的素材仓库，我们提供三条路径：

1. **请求制作宠物** — Codex 先检查重复项、收集参考和制作要求，再创建带标签的请求 Issue。
2. **制作或提交自己的宠物** — Codex 可以从参考图现场制作，也可以接收现成文件；完成三件套制作与校验后，通过 GitHub API 创建专用分支和 PR，无需完整克隆。
3. **高级 PR** — 熟悉 Git 的贡献者可以使用 GitHub Codespaces、部分克隆或自己的 Git 工作流。

仓库内的 [`.agents/skills/submit-codex-pet`](../../.agents/skills/submit-codex-pet) 会指导兼容的 AI 选择正确路径。若缺少凭据或仓库写入权限，它会退回到带标签的成品投稿 Issue，不会让投稿内容丢失。

高级贡献者只需添加一个最终成品包：

```text
pets/
└── pet-slug--author-slug/
    ├── submission.json
    ├── pet.json
    └── spritesheet.webp
```

目录名使用 `pet-slug--author-slug`，这样同一个角色的不同作者版本可以并存。v1 投稿可以省略 `spriteVersionNumber`，WebP 必须是 `1536x1872`；v2 投稿必须设置 `spriteVersionNumber: 2`，WebP 必须是 `1536x2288`。

v2 的运行时清单示例：

```json
{
  "id": "pet-slug--author-slug",
  "displayName": "Pet 名称",
  "description": "一句简短描述。",
  "spriteVersionNumber": 2,
  "spritesheetPath": "spritesheet.webp"
}
```

预览图和 README 收录表都由 CI 自动生成：

```bash
python -m pip install -r requirements.txt
npm run validate:pr
npm run lint
```

贡献者 PR 只需提交 `submission.json`、`pet.json` 和 `spritesheet.webp`。不要提交 prompts、参考图、QA 目录、contact sheet、视频、解码帧或 Hatch Pet 运行目录。预览图、README 收录和 `pets.json` 由维护者或 CI 在合并后统一生成，但预览二进制不会长期作为 Git 跟踪文件保留。

## 制作 Pet

- [.agents/skills/submit-codex-pet](../../.agents/skills/submit-codex-pet) — 请求社区制作、通过 GitHub API 制作或提交自己的宠物，或准备高级 PR
- [.agents/skills/hatch-pet-v1](../../.agents/skills/hatch-pet-v1) — 保留或修复旧版 8x9 v1 宠物
- [.agents/skills/hatch-pet-v2](../../.agents/skills/hatch-pet-v2) — 创建或升级带 16 个环视方向的 8x11 v2 宠物

调用时要显式选择 skill。升级已有宠物时，把现有的 `pet.json` 和 `spritesheet.webp` 交给 `$hatch-pet-v2`；通过审核的第 0–8 行会被保留，不会重新生成。

## 文档

- English: [docs/en](../en)
- 简体中文: [docs/zh-CN](./)
- 한국어: [docs/ko](../ko)
- 日本語: [docs/ja](../ja)
- Español: [docs/es](../es)
- 在线画廊源码: [web/](../../web)
- 统计 Worker: [worker/](../../worker)
- 贡献指南: [CONTRIBUTING.md](./CONTRIBUTING.md)

## 星标历史

[![QDog 的 GitHub 星标历史](../../assets/community/star-history.svg)](https://github.com/burgleaf/qdog-community/stargazers)

图表每天根据 GitHub 星标数据自动更新。欢迎[为仓库点亮 Star](https://github.com/burgleaf/qdog-community)，让更多人发现这些精品宠物。

## 贡献者

<a href="https://github.com/burgleaf/qdog-community/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=burgleaf/qdog-community" alt="QDog 贡献者">
</a>

感谢每一位贡献宠物、代码、文档、审核与创意的朋友。

## 许可说明

- 代码和脚本：[MIT](../../LICENSE)
- 宠物资产和自动生成预览：[CC BY-NC 4.0](../../ASSETS-LICENSE.md)，除非具体宠物目录另有说明
