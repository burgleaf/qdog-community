# 宠物资产 AI UI 设计（诚实 MVP）

日期：2026-08-30  
状态：设计已定界，尚未实现页面  
范围：只覆盖 qdog-server **当前已实现**的 HTTP 契约；不虚构孵化、详情、交易或支付接口。

相关契约：

- [qdog-server/.docs/api/README.md](../../../qdog-server/.docs/api/README.md)
- [qdog-server/.docs/api/auth.md](../../../qdog-server/.docs/api/auth.md)
- [qdog-server/.docs/api/pet-eggs.md](../../../qdog-server/.docs/api/pet-eggs.md)
- [qdog-server/.docs/api/assets.md](../../../qdog-server/.docs/api/assets.md)

---

## 1. 背景与一句话结论

QDog 社区站是无登录的静态宠物画廊；可信资产后端已经能发宠物蛋、一次性领取、列出背包。两端尚未接线。

**结论：在 `web/` 增加一条内部路由 `/lab`，走登录 → 抽兑换码 → 领取 → 背包可视化；「AI 孵化」只把蛋的 `id` 与 traits 编进 hatch-pet-v2 prompt，用现有 Codex 深链打开。浏览器不生成图，也不把产物写回服务端。**

这不是 q.dog 新导航，也不是付费扭蛋。在 CORS、Cookie Domain、OAuth 和临时登录拆除之前，不进入公开面。

---

## 2. 两仓库现状对照

两套系统目前没有代码耦合、没有共享 schema、没有共同前端。

| | qdog-community `web/` | qdog-server |
| --- | --- | --- |
| 产品 | 免费社区 Codex 宠物画廊 | 可信宠物数字资产平台后端 |
| 身份 | 无站点登录；点赞/关注靠 IP 哈希 + `localStorage` | 临时共享账户 `wangbin` + HttpOnly `session` Cookie（7 天） |
| 核心闭环 | 逛画廊 → 预览/Playground → 一键安装到本机 Codex | 登录 → 抽码 → 领取 → `GET /assets` |
| 「抽」 | 首页 Hero 扭蛋是**目录随机发现**：纯前端、免费、无消耗、无账号 | `POST /pet-eggs/codes` 是**兑换码抽奖**（development 必中 / production 5%） |
| 「AI」 | `/guide` 与 SubmissionMenu：复制 prompt / `codex://` 深链；站点本身不生成 | 无生成、无孵化、无图片、无 spritesheet |
| 资产权威 | 安装落在本机 `~/.codex/pets/`；目录权威是 Git 里的三件套 | 背包所有权以 D1 `pet_egg_assets.owner_account_id` 为准，不是链上 NFT |
| 背包内容 | 无 | 只有 `type: "pet_egg"` + 不可变 `traits` |
| 部署 | Next.js `output: "export"` → Cloudflare Pages；SEO 检查禁止全站 `_worker.js` | Cloudflare Workers + Hono + D1 + KV；无 CORS / Origin / CSRF |
| 统计写入 | `resource.q.dog` 只写 install/like/follow/request-support | 与社区统计 Worker 无关 |

当前可用接口只有：

| 方法 | 路径 | 认证 | 成功 |
| --- | --- | --- | --- |
| `GET` | `/health` | 否 | `200 { status, service }` |
| `POST` | `/auth/login` | 否 | `200 { account }` + `Set-Cookie: session` |
| `GET` | `/auth/me` | 是 | `200 { account }` |
| `POST` | `/auth/logout` | 是 | `204` + 清 Cookie |
| `POST` | `/pet-eggs/codes` | 否 | `200 no_reward` 或 `201 issued` |
| `POST` | `/pet-eggs/claim` | 是 | `201 { asset }` |
| `GET` | `/assets` | 是 | `200 { assets }`，无分页 |

明确未实现、调用为 `404`、**不得当作契约**的路径：`POST /auth/register`、OAuth callback、分页、`GET /assets/:id`、孵化、交易、支付。

资产公开形状：

```json
{
  "id": "a1c1d575-32f3-47f7-a6b4-e92d659fd90f",
  "type": "pet_egg",
  "traits": "color:red|size:small|shape:oval|material:crystal",
  "acquiredAt": 1788092400000
}
```

`traits` 在兑换码发行时随机生成，领取后不可变。格式为 `color:…|size:…|shape:…|material:…`。`POST /pet-eggs/codes` 的 `content` 服务端只存 SHA-256 digest，**不参与 traits 抽样，不能当成许愿改外观**。

内部阶段全员共用 seed 账户 `wangbin`。背包是该共享账户的列表，不是多用户隔离验证。

---

## 3. 产品边界与非目标

### 3.1 这是什么

内部孵化工作台：维护者在本地同时跑 `qdog-server` 与 `web` 开发服务器，走通「蛋进背包 → 用 AI 按 traits 做一只私有造型」。

用户能完成的唯一闭环：

```text
登录 wangbin
  → 抽兑换码（可反复抽；未中奖只消费 nonce）
  → 中奖则看到一次性明文码（3 天内可领）
  → 领取写入当前 session 账户背包
  → 蛋卡按 traits 做 CSS/SVG 可视化
  → 「用 AI 孵化」打开 Codex / 复制 hatch-pet-v2 prompt
```

### 3.2 非目标

不要做、不要在 UI 上假装已经存在：

- 孵化 HTTP API、R2 上传、孵化进度、把 Codex 产物写回背包
- `GET /assets/:id`、资产详情路由、分页
- 交易、支付、分成、稀有度、金币、消耗性抽卡经济
- 把首页 Hero 扭蛋改成消耗蛋码或接入 `/pet-eggs/codes`
- 把 `/lab` 放进 `SiteHeader` 公开导航，或做 SEO / 五语全翻
- 多用户隔离、个人主页、「我的作品」云端同步
- 在浏览器内调用 imagegen / 组装 spritesheet
- 把 lab 做成挂在 qdog-server 上的第二套前端（会分叉设计系统；server 约束禁止依赖 community `web/`）

### 3.3 语言与入口

- 文案先做 **zh + en**，复用现有 `LocaleProvider`；ko / ja / es 可回退英文，不作为本阶段工作量
- 入口不进顶栏。`NEXT_PUBLIC_ASSET_LAB=1` 时允许访问 `/lab`；未设置时路由可存在但显示「未启用」短说明，避免误当成公开产品
- `/lab` 使用 `robots noindex`

---

## 4. 用户闭环与页面

YAGNI：**一个路由** `/lab`。不建 `/lab/login`、`/lab/assets`、`/lab/[id]`。没有详情 API，客户端也不要伪造详情页。

实现时放在 [`web/app/lab/page.tsx`](../../web/app/lab/page.tsx)，主体为客户端组件（session、抽取、背包都是运行时状态）。

### 4.1 未登录

页面上半是工作台说明（内部、共享账户、蛋不是画廊宠物），下半是登录表：

- 用户名：可预填 `wangbin`，仍提交到 `POST /auth/login`
- 密码：本地 `.dev.vars` 的 `TEMPORARY_LOGIN_PASSWORD`，不写进仓库、不进前端默认值
- 提交中禁用按钮；失败只展示 `invalid_credentials` / `invalid_input` / `internal_error` 的映射文案
- 进入页面时先 `GET /auth/me`：`200` 则视为已登录，`401` 则留在登录态

### 4.2 已登录：单页三区

顶栏（工作台内，不是改 `SiteHeader`）：

- `account.displayName`
- 固定警示：当前是内部共享账户，全员同一背包，不是个人资产隔离
- 登出：`POST /auth/logout`，成功后回到未登录态

主区三块，自上而下（宽屏可抽取 | 待领取 并排，背包占满下一行）：

1. **抽取**
   - 单一主按钮「抽一枚蛋」
   - 不暴露 `content` 输入。请求体固定 `content: "qdog-lab-draw"`，避免用户以为许愿能改外观
   - `timestamp`：`Date.now()`（Unix 毫秒）
   - `nonce`：每次点击 `crypto.randomUUID()`
   - `200 { result: "no_reward" }`：短提示「未中奖」，可立即再抽
   - `201 { result: "issued", code, expiresAt }`：码写入待领取区
   - 抽取不要求登录（对齐 API）。未登录抽中同样进入待领取；点「领取」时若无 session，先登录再领

2. **待领取**
   - 兑换码明文只在 `201` 响应出现一次。必须立刻写入 `sessionStorage`，key 建议 `qdog-lab-unclaimed-codes`
   - 每条记录：`{ code, expiresAt, issuedAt }`
   - 展示完整 43 位码、复制、倒计时（到 `expiresAt`）、领取按钮
   - 领取成功：从 sessionStorage 删除该码，并把返回的 `asset` 并入背包列表（随后仍以 `GET /assets` 为准再拉一次）
   - 本地倒计时到点或领取返回 `pet_egg_code_unavailable`：从列表移除；不猜测是过期、已领还是未知码
   - 空态：「没有待领取的兑换码」

3. **背包**
   - 登录后与每次领取成功后调用 `GET /assets`
   - 按接口已有顺序渲染（`acquiredAt` 降序，其次 `id` 降序）；前端不再排序
   - 空态对应 `{ "assets": [] }`：「背包里还没有蛋」
   - 无分页 UI。当前契约没有 cursor / limit
   - 每张蛋卡见第 6 节；主 CTA「用 AI 孵化」见第 7 节

### 4.3 对话框

「用 AI 孵化」打开 `role="dialog"` 的面板（复用画廊扭蛋已有的焦点/Escape/遮罩习惯，但不要复用 Hero 扭蛋文案）：

- 只读展示解析后的四维 traits 与截断 `id`
- 只读展示将发送给 Codex 的完整 prompt
- 按钮：复制 prompt、Open in Codex（`codex://new?prompt=`）
- 不提供「开始生成」「上传结果」「标记已孵化」——没有对应 API

### 4.4 状态机（页面级）

```text
booting          GET /auth/me
  ├─ anonymous   可抽码；领取会要求登录
  └─ signed_in   可抽码、领取、拉背包、登出

draw             idle | drawing | no_reward | issued_error
claim            idle | claiming
bag              idle | loading | error
hatchDialog      closed | open(asset)
```

不要为「孵化中」做假进度。Codex 在站外运行，本页无法观测。

---

## 5. 与 API 字段 / 错误码的一一映射

客户端建议：`web/lib/asset-api.ts`，所有请求 `credentials: "include"`，`Content-Type: application/json`。禁止在 body、query、header 里传 account id。

基址：开发时用同源前缀 `/asset-api`（见第 8 节），不要在浏览器里直打 `127.0.0.1:8787`。

### 5.1 登录 `POST /auth/login`

请求：`{ "username": string, "password": string }`（均非空）。

成功 `200`：用 `account` 更新顶栏；不必展示 `id` / 空邮箱。

| HTTP | error | UI |
| --- | --- | --- |
| 400 | `invalid_request` | 「请求格式无效」 |
| 400 | `invalid_input` | 「请输入用户名和密码」 |
| 401 | `invalid_credentials` | 「用户名或密码错误」（不区分哪一项） |
| 500 | `internal_error` | 「服务暂时不可用」 |

### 5.2 当前用户 `GET /auth/me`

无 body。`200` → 已登录；`401 unauthorized` → 匿名。不要把 401 弹成全页错误。

### 5.3 登出 `POST /auth/logout`

无 body。成功 `204`。`401` 视为已登出。清空内存中的 account 与背包；**保留** sessionStorage 里的待领取码（码本身不绑定账户，领取才绑定）。

### 5.4 抽码 `POST /pet-eggs/codes`

```json
{
  "content": "qdog-lab-draw",
  "timestamp": 0,
  "nonce": "00000000-0000-4000-8000-000000000000"
}
```

实现时 `timestamp` 为当前 Unix 毫秒，`nonce` 为每次新 UUID（版本位 1–8 的 UUID 即可，`crypto.randomUUID()` 满足）。

| 结果 | UI |
| --- | --- |
| 200 `{ result: "no_reward" }` | 未中奖提示 |
| 201 `{ result: "issued", code, expiresAt }` | 写入待领取；`code` 恰好 43 位 `[A-Za-z0-9_-]` |
| 400 `invalid_request` / `invalid_input` | 开发错误，展示通用失败 |
| 400 `request_expired` | 「本机时间与服务器相差超过五分钟，请校对时间后重试」 |
| 409 `request_already_processed` | 「这次抽取已处理，请再抽一次」（换新 nonce） |
| 500 `internal_error` | 通用失败 |

抽码按钮在 `drawing` 时禁用。不要重试同一 nonce。

### 5.5 领取 `POST /pet-eggs/claim`

请求：`{ "code": "<43 位>" }`。

成功 `201 { asset }`：asset 形状与背包项相同。

| HTTP | error | UI |
| --- | --- | --- |
| 401 | `unauthorized` | 切到登录表，保留待领取列表 |
| 400 | `invalid_input` | 「兑换码格式无效」 |
| 409 | `pet_egg_code_unavailable` | 「这枚码无法领取」（不区分未知 / 已领 / 过期 / 未激活） |
| 500 | `internal_error` | 通用失败 |

### 5.6 背包 `GET /assets`

无 query、无 body。`401`：切匿名并清空背包展示。`200`：渲染 `assets` 数组；不要请求不存在的 `/assets/:id`。

### 5.7 健康检查

`/lab` **不依赖** `GET /health` 作为门禁。代理或 server 挂了时，业务请求失败即可。健康检查留给开发者用 REST Client。

---

## 6. traits 视觉语言

解析规则：按 `|` 切开，再按第一个 `:` 分成 key/value。缺键或未知值时，该维使用中性默认（灰、medium、round、ceramic），卡片上仍显示原始 `traits` 字符串，避免静默丢数据。

| 维度 | 取值 | 视觉 |
| --- | --- | --- |
| color | `red` `blue` `green` `gold` `purple` | 蛋主体填充。建议映射到现有暖色 token 附近的实色，而不是新开一套彩虹主题：red `#c4473a`，blue `#3d6ea8`，green `#3f7a4c`，gold `#c9a227`，purple `#6b4c9a` |
| size | `small` `medium` `large` | 蛋图形缩放约 `0.78 / 1 / 1.22`，卡片外壳尺寸不变 |
| shape | `oval` `round` `angular` | SVG：椭圆；近圆；圆角六边/切角卵形 |
| material | `crystal` `ceramic` `metal` `wood` | 叠层而非换形状：crystal 高光+半透明；ceramic 哑光；metal 硬高光条；wood 细条纹 |

约束：

- 用 CSS/SVG，不用 AI、不用远程贴图
- 尊重 `prefers-reduced-motion`
- 暗色模式只降低饱和/提高对比，不改 traits 语义色
- 卡片次信息：`type` 对用户显示为「宠物蛋」；`id` 显示前 8 位 + 复制全文；`acquiredAt` 用 locale 日期时间

这套可视化的职责是让四维差异可扫读，不是品牌插画。AI 造型发生在 Codex 里，不发生在这张卡上。

---

## 7. AI 孵化 prompt 与 Codex 深链

「AI」在本 MVP 里只做一件事：把已领取蛋编成 hatch-pet-v2 任务说明，走现有 [`buildCodexUrl`](../../web/lib/codex-links.ts)。

建议新增 `getEggHatchPrompt(asset, locale)`，不要复用 `getPetSubmissionPrompt` / `getPetRequestPrompt`。

### 7.1 Prompt 原则

- 语言跟随 locale（zh 全程中文，en 全程英文）
- 明确调用 hatch-pet-v2（或仓库 `.agents/skills/hatch-pet-v2`），产出 8×11 图集与 `pet.json.spriteVersionNumber: 2`
- 外观必须可读体现 color / size / shape / material，禁止无视 traits 另起炉灶
- 原创形象，不要仿现有画廊角色或把蛋「变成」某个已收录 slug
- 带上 `asset.id` 作为本地备注，便于用户对照背包
- **默认不要创建 GitHub Issue / PR**。这是个人资产孵化，不是社区投稿；若用户之后要投稿，再去 `/guide`

### 7.2 中文稿模板

实现时可按此结构生成，字段从解析后的 traits 填入：

```text
请全程使用中文，使用 hatch-pet-v2 技能，根据这枚已领取的宠物蛋生成一只原创 Codex v2 宠物。

蛋资产 ID: <id>
Traits: color=<color> size=<size> shape=<shape> material=<material>
领取时间: <ISO 或本地化 acquiredAt>

要求：
- 外观必须让人能看出上述四个维度，不要另起与蛋无关的角色
- 原创形象，不要仿 QDog 画廊里已有角色，也不要使用版权角色
- 产出 8x11 spritesheet（1536x2288）和 pet.json，spriteVersionNumber 为 2
- 这是个人资产孵化，不要创建 GitHub Issue 或 Pull Request，除非我之后明确要求投稿
```

Open in Codex：`buildCodexUrl(prompt)`。复制：`navigator.clipboard.writeText(prompt)`。

### 7.3 与 `/guide` 的边界

| | `/guide` + SubmissionMenu | `/lab` 孵化对话框 |
| --- | --- | --- |
| 意图 | 给社区请求或投稿一只宠物 | 把背包里这枚蛋孵成私有造型 |
| 输入 | 用户概念 / 参考图 / 仓库 URL | 服务端已冻结的 traits + asset id |
| 默认是否开 GitHub | 是（Issue / PR） | 否 |
| 产物去向 | 社区 `pets/<slug>--<author>/` 三件套 | 用户本地 Codex pet；**本阶段不写回 D1** |

画廊 Hero 扭蛋与 lab 抽码也必须在文案上拆开：前者是「随机发现目录里的宠物」，后者是「抽取一枚带 traits 的蛋资产」。不要共用 `gacha*` 文案键。

---

## 8. 本地 Cookie 代理约束

### 8.1 为什么不能直连

- session Cookie 为 host-only、`Path=/`、`HttpOnly`、`SameSite=Lax`；production 另加 `Secure`
- 身份只认这枚 Cookie，禁止前端自带 account id
- qdog-server **尚未实现 CORS / Origin / CSRF**
- `q.dog` 是静态 Pages，没有 BFF；`web/next.config.ts` 为 `output: "export"`，生产构建没有 rewrite

因此：浏览器从 `localhost:3000` 直打 `127.0.0.1:8787` 时，`Set-Cookie` 不会落到站点源，后续 `GET /assets` 必然 `401`。

### 8.2 推荐本地方案

仅在 `next dev`（`PHASE_DEVELOPMENT_SERVER`）增加 rewrite：

```text
浏览器  →  http://localhost:3000/asset-api/*  →  http://127.0.0.1:8787/*
```

要求：

- 转发请求头 `Cookie` 与响应头 `Set-Cookie`
- 前端 `fetch("/asset-api/auth/login", { credentials: "include", ... })`
- 登录成功后 Cookie 属于 `localhost`（经代理改写源），同源后续请求会带上
- 不在静态 `next build` / Pages 部署里启用该 rewrite（export 也无法生效）

环境变量：

| 变量 | 用途 |
| --- | --- |
| `NEXT_PUBLIC_ASSET_LAB=1` | 允许把 `/lab` 当工作台使用 |
| （可选）`ASSET_API_ORIGIN` | 仅 dev rewrite 目标，默认 `http://127.0.0.1:8787` |

本地启动顺序：qdog-server `npm run dev` → community `web` `npm run dev` → 打开 `/lab`。

### 8.3 明确不在本阶段做的部署

- 不把 `/lab` 配进 q.dog 公开导航或 sitemap 重点条目
- 不把 API 裸暴露给 `https://q.dog` 跨源调用
- 不把 lab HTML 塞进 qdog-server Worker

公开上线检查清单见第 10 节。

---

## 9. 与现有画廊扭蛋 / `/guide` 的边界

三件事名字都像「抽 / 做宠物」，产品上必须分开：

```text
首页 Hero 扭蛋     静态目录随机发现，结果是已收录 pet slug，动作是查看/安装
/guide 投稿        外链 Codex + GitHub，结果是社区三件套 PR/Issue
/lab 工作台        服务端蛋资产 + traits 可视化 + 私有 Codex 孵化 prompt
```

实现约束：

- 不要改 [`web/components/hero-section.tsx`](../../web/components/hero-section.tsx) 去打 `/pet-eggs/codes`
- 不要改 [`docs/zh-CN/GACHA.md`](../zh-CN/GACHA.md) 的免费发现语义
- lab 组件放在例如 `web/components/lab/`，不要塞进 `pet-gallery` / `gacha` 模块
- 点赞、安装统计、需求广场与 lab 无数据交集

---

## 10. 何时才能公开（检查清单）

下列全部满足之前，`/lab` 保持内部、本地、可开关：

1. **认证**：删除临时 `wangbin` 登录与 `TEMPORARY_LOGIN_PASSWORD`；真实 Google/GitHub OAuth（state/PKCE、callback Origin、账户绑定）已上线
2. **Cookie**：same-site 部署（例如 `q.dog` + `api.q.dog`）或同源反代；Cookie `Domain` 与 `Secure` 与站点方案一致
3. **浏览器安全**：CORS 允许的 Origin 白名单、CSRF 策略、抽码限速 / Turnstile / 调用方证明（开放抽取目前可换 nonce 重复抽）
4. **产品诚实**：UI 不再显示「共享账户」；背包按登录用户隔离，且文档与实现一致
5. **孵化若要变成平台能力**（可选，非本 MVP）：先有 hatch 状态机 migration、资产 `type` 扩展、R2 存放二进制、失败恢复；再谈进度 UI 与写回背包
6. **站点形态**：若仍要挂在 q.dog，必须解决静态 Pages 无法 BFF 的问题（同源反代或独立 same-site 前端），且不破坏「禁止全站 `_worker.js`」的 SEO 约束
7. **文案**：与 Hero 扭蛋、社区投稿彻底分词；五语与顶栏入口是公开阶段的事，不是现在

未完成清单而把 `/lab` 推进生产，等于把共享背包和可刷的抽码接口暴露给互联网。

---

## 附录 A. 建议的后续实现文件（本文不创建）

仅供实现阶段对照，不是本设计的交付物：

- `web/app/lab/page.tsx`
- `web/components/lab/lab-workbench.tsx`（登录 / 三区 / 顶栏）
- `web/components/lab/egg-asset-card.tsx`
- `web/components/lab/hatch-dialog.tsx`
- `web/lib/asset-api.ts`
- `web/lib/egg-traits.ts`（解析与视觉映射）
- `web/lib/codex-links.ts` 增加 `getEggHatchPrompt`
- `web/next.config.ts` 仅在 development phase 增加 `/asset-api` rewrite
- `web/lib/i18n.ts` 增加 zh/en 的 lab 文案键

本设计文档的完成定义：上述产品边界、页面、API 映射、视觉语言、深链原则与工程约束已经写清，并且**没有**修改 `web/` 或 qdog-server 代码。
