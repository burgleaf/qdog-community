# QDog Community 的 Cloudflare 部署

本手册将此仓库部署为 QDog Community，并使用以下固定标识：

| 项目        | 值                                           |
| ----------- | -------------------------------------------- |
| GitHub 仓库 | `https://github.com/burgleaf/qdog-community` |
| Pages 主站  | `https://q.dog`                              |
| Pages 项目  | `qdog-community`                             |
| Worker 名称 | `qdog-community-stats`                       |
| Worker 入口 | `https://resource.q.dog`                     |
| D1 数据库名 | `qdog-community-stats-db`                    |

## 架构和域名职责

- `q.dog` 是 Pages 静态站、SEO canonical URL 和所有公开页面的唯一主域名。
- `resource.q.dog` 是 Cloudflare Worker 的入口，仅处理安装、点赞、作者关注和请求支持等显式统计写入。
- 宠物制作申请由浏览器直接打开 GitHub Issue Form；表单数据不经过 Worker、D1 或 R2。
- `www.q.dog` 是兼容入口。建议在 Cloudflare Bulk Redirects 中永久重定向到 `https://q.dog`，同时保留路径和查询参数。

## 部署前条件

1. 你拥有 `q.dog`，且 DNS Zone 已添加到准备部署的同一个 Cloudflare 账号。
2. GitHub 仓库为 `burgleaf/qdog-community`，默认生产分支为 `main`。
3. GitHub Actions 可以向 `main` 推送自动生成的 README 和 `pets.json`。若分支保护禁止这一行为，需要为 `github-actions[bot]` 配置 bypass，或先调整自动提交策略。
4. 本地准备 Node.js 20+、Python 3 和 npm。首次初始化 Worker 时还需要本地安装/调用 Wrangler。

## 一次性创建 Cloudflare 资源

### 1. 创建 D1 数据库

在仓库的 `worker/` 目录运行：

```bash
npm ci
npx wrangler login
npx wrangler d1 create qdog-community-stats-db
```

复制命令输出中的数据库 ID，替换 `worker/wrangler.toml` 内的占位符：

```toml
database_id = "REPLACE_WITH_YOUR_D1_DATABASE_ID"
```

在填入真实 ID 前，任何远程 Worker、D1 导出或 Pages 部署都应视为不可执行。不要猜测、复用或保留原项目的数据库 ID。

### 2. 设置 Worker 哈希盐

生成一个新的随机值，并将其作为 Cloudflare Worker Secret 写入：

```bash
cd worker
openssl rand -hex 32 | npx wrangler secret put HASH_SALT
```

`HASH_SALT` 用于对匿名请求、点赞和关注的去重信息进行加盐哈希。不要将该值提交到 Git、GitHub Secrets 的日志输出、`.dev.vars` 或部署文档。

## GitHub Secrets

在 GitHub 仓库的 **Settings → Secrets and variables → Actions** 添加：

| Secret                     | 必需 | 说明                                                        |
| -------------------------- | ---- | ----------------------------------------------------------- |
| `CLOUDFLARE_ACCOUNT_ID`    | 是   | 承载 `q.dog` Zone、Pages、Worker 和 D1 的 Cloudflare 账号。 |
| `CLOUDFLARE_API_TOKEN`     | 是   | CI 直传 Pages、迁移/导出 D1 与部署 Worker 所需的 Token。    |
| `INDEXNOW_KEY`             | 否   | 开启 IndexNow 提交时使用；缺失时部署会明确跳过，不会失败。  |
| `GOOGLE_SITE_VERIFICATION` | 否   | Google Search Console 验证令牌。                            |
| `BING_SITE_VERIFICATION`   | 否   | Bing Webmaster 验证令牌。                                   |

初次部署可使用 Cloudflare 的 Worker 编辑预设 Token，并将其严格限制到目标账号；若手动创建 Token，确保它具备 Pages、Workers 和 D1 所需的编辑权限。生产环境宜按 Pages 与 Worker 拆分最小权限 Token，但现有工作流默认使用同一个 `CLOUDFLARE_API_TOKEN`。

## 首次部署顺序

1. 确认 `worker/wrangler.toml` 已填入真实 D1 ID，且 `resource.q.dog` 在同一个 Cloudflare Zone。
2. 将本仓库配置改动推送至 `main`。
3. 在 GitHub Actions 手动运行 **Deploy Stats Worker**。该工作流会运行 Worker 测试、D1 migration、pet/request catalog 同步并部署 Worker。
4. 在 GitHub Actions 手动运行 **Deploy Web to Cloudflare Pages**，或重新运行 `Pet previews` 中的 Pages 部署 job。它会生成预览、从 D1 导出 `web/public/stats.json`、构建 `web/out`，再上传至 `qdog-community` Pages 项目。
5. 在 Cloudflare Pages 项目的 **Custom domains** 中添加 `q.dog`。CI 也会尝试附加该域名；首次配置 DNS/证书时以 Dashboard 的验证状态为准。
6. 若首次 Pages job 在 Worker migration 之前执行而失败，先完成步骤 3，再重新运行 Pages job。不要通过提交伪造 `stats.json` 绕过 D1 初始化。

## DNS 与重定向

- `q.dog`：绑定到 Cloudflare Pages 项目 `qdog-community`。
- `resource.q.dog`：由 `worker/wrangler.toml` 的 custom-domain route 绑定到 `qdog-community-stats` Worker。
- `www.q.dog`：在 Cloudflare Bulk Redirects 中建立 `https://www.q.dog/*` → `https://q.dog/$1`，并开启保留路径和查询参数。
- `qdog-community.pages.dev`：同样建议重定向至 `https://q.dog`，避免搜索引擎收录重复域名。

不要为主站重定向添加 Pages `_worker.js`。该项目是静态导出站点；用 Pages Functions 处理每一个静态资源请求会破坏这一边界，并增加不必要的运行成本。

## 可选：启用 IndexNow

部署脚本不再包含原项目的 IndexNow key。要启用 QDog 的提交功能：

```bash
KEY="$(openssl rand -hex 16)"
printf '%s\n' "$KEY" > "web/public/${KEY}.txt"
```

将新文件提交到仓库，并把相同值设置为 GitHub Secret `INDEXNOW_KEY`。下次 Pages 部署会先验证 `https://q.dog/<KEY>.txt`，再提交 `sitemap.xml` 中属于 `q.dog` 的 URL。未配置该 Secret 时，工作流会安全跳过该步骤。

## 部署前本地验证

从仓库根目录运行：

```bash
npm ci
npm run readmes
npm run previews
npm run validate
npm run lint
```

再分别验证 Web 和 Worker：

```bash
cd web
npm ci
npm run lint
npm run build

cd ../worker
npm ci
npm test
npx wrangler deploy --dry-run
```

`wrangler deploy --dry-run` 在 D1 ID 仍是占位符时必然失败；这是预期的保护机制，先完成 D1 创建和配置再运行该检查。

## 上线后验证

```bash
curl -I https://q.dog
curl -I https://q.dog/robots.txt
curl -I https://q.dog/sitemap.xml
```

还应在浏览器中检查：

- `q.dog` 页面、中文入口、宠物详情和安装页均使用 `q.dog` 的 canonical URL；
- 点赞、作者关注、安装记录和请求支持请求发送到 `resource.q.dog`；
- 制作申请表单只预填并跳转 GitHub Issue Form，不会请求 `resource.q.dog` 或上传图片；
- `www.q.dog` 和 `qdog-community.pages.dev` 都重定向至 `q.dog`；
- GitHub Actions 的 Pages 构建不再引用旧站点或旧统计端点。

## 官方参考

- [Cloudflare Pages：通过 CI 直接上传预构建产物](https://developers.cloudflare.com/pages/how-to/use-direct-upload-with-continuous-integration/)
- [Cloudflare Workers：GitHub Actions 部署](https://developers.cloudflare.com/workers/ci-cd/external-cicd/github-actions/)

以上 Cloudflare 流程已根据官方文档重新表述。
