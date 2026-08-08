# Awesome Codex Pet 项目指南

## 项目定位与边界

这是一个以 **pet 成品包为数据源** 的社区图鉴仓库。根目录负责 pet 收录、安装器、预览和 README/目录数据生成；`web/` 负责静态展示站；`worker/` 负责显式的统计与请求写入 API。修改时先确定变更属于哪一层，避免把展示逻辑、运行时资产和制作过程文件混在一起。

- 根目录的运行环境为 Node.js 20+ 与 Python 3；根工具通过 `npm` 执行。
- `web/` 是独立的 Next.js 15 + React 19 + Tailwind CSS 4 项目，使用 `output: "export"` 输出静态站点到 `web/out/`。不要引入依赖长期服务器运行时、图片优化服务或按请求渲染的实现。
- `worker/` 是 Cloudflare Worker；普通页面访问只读 `web/public/stats.json`，不应为常规页面浏览新增 Worker 调用。涉及 D1、R2、速率限制、哈希或上传校验时，维持现有的最小收集、私有存储与显式写入边界。
- 宠物制作 skill 位于 `.agents/skills/hatch-pet-v1/` 和 `.agents/skills/hatch-pet-v2/`；制作或维护 spritesheet 前先阅读相应版本的 `SKILL.md` 和契约文档。

## 目录与数据流

- `pets/<pet-slug>--<author-slug>/`：可安装的最终 pet 包，是目录与展示信息的权威来源。
- `categories.json`、`collections.json`、`requests.json`：分类、合集和请求的源数据。
- `scripts/`：安装、校验、预览、README、请求目录等生成逻辑；优先修改脚本或源数据，不手改其产物。
- `assets/previews/`：由 `scripts/generate-pet-previews.py` 生成的本地产物/部署产物，不纳入 Git。
- `README.md`、`docs/{zh-CN,ko,ja,es}/README.md`、`pets.json`：由 `scripts/generate-readmes.mjs` 从 pet 元数据和分类数据生成。
- `web/`：构建时通过 `prepare-site` 从仓库源数据准备站点数据；站点只打包所需缩略图与动画 WebP，不将全部 QA 预览打入 Pages。
- `worker/`：独立部署；其目录、迁移和本地状态只在明确修改 API/存储行为时处理。

## Pet 包不变量

每个 `pets/<id>/` 只能提交以下三个最终文件：

```text
submission.json
pet.json
spritesheet.webp
```

- 目录名必须是 `<pet-slug>--<author-slug>`；`submission.json.slug` 与 `pet.json.id` 都必须与目录名严格一致。
- `pet.json.spritesheetPath` 固定为 `spritesheet.webp`。不要将参考图、视频、联系表、提示词、解码帧或修复归档提交到 pet 包；`qa/` 仅允许本地保留。
- v1：`spriteVersionNumber` 可省略或为 `1`，图集必须为 `1536x1872`（8×9）。
- v2：必须设置 `spriteVersionNumber: 2`，图集必须为 `1536x2288`（8×11）；最后两行包含 16 个环视方向。
- 预览脚本使用固定的 `192x208` 单元和 8 列。变更图集版本、行含义或预览动作时，必须同步检查验证器、预览生成器、README 生成器及 Web 的消费逻辑。
- `submission.json` 的必填身份、作者、分类和许可字段必须完整。若提供 `localized_names`，`en` 与 `zh` 均必须为非空字符串；未提供时，界面必须回退 `name`，不得臆造翻译。
- 公开来源素材在没有明确再分发许可时不可直接收录；资产来源和非商业/自定义许可说明必须如实保留。

## 生成与验证

按改动范围执行最小但完整的验证；命令默认从仓库根目录运行。

| 改动                             | 必要操作                                                                                                 |
| -------------------------------- | -------------------------------------------------------------------------------------------------------- |
| 新增、删除或修改 pet 元数据/图集 | `npm run previews`、`npm run readmes`、`npm run validate`、`npm run lint`                                |
| 修改安装器                       | `npm run test:install`，并同时检查 `install-pet.sh`、`install-pet.ps1` 和 `install-pet.mjs` 的行为一致性 |
| 修改目录/去重判定                | `npm run test:duplicates`、`npm run validate`                                                            |
| 修改根 Markdown 或 JSON          | `npm run lint`；需要修正格式时使用 `npm run format` 后复查 diff                                          |
| 修改 `web/` 应用                 | 在 `web/` 运行 `npm run lint` 和 `npm run build`；只有 CI/干净检出场景才使用较宽松的 `npm run build:pr`  |
| 修改 Worker                      | 在 `worker/` 运行 `npm test` 与 `npx wrangler deploy --dry-run`，避免直接部署或操作远程数据              |

新 pet 完成后，确认生成的 README、中文 README 与 `pets.json` 中已经出现该 pet；运行时目录仍严格为三文件。`npm run validate` 使用 `--require-generated-assets`，因此 pet 变更后先生成预览和目录数据。

## 开发原则

- 改动前阅读被修改文件和相邻生成/消费逻辑；保持源数据、生成脚本和产物的因果关系清晰。
- 不为局部展示需求手工修改生成的 README、`pets.json` 或忽略的预览；应修改对应源数据或生成器并重新生成。
- 不将 `output/`、`assets/previews/`、`pets/*/qa/`、缓存、`web/out/`、`.next/`、`worker/.wrangler/` 或秘密文件纳入版本控制。若仅需保留本地过程产物，优先更新 `.gitignore`，不要删除用户未要求清理的文件。
- Web 页面需要同时维护中英文体验、静态可抓取的 metadata 与既有 SEO/导出检查；不要为了域名跳转增加 Pages `_worker.js`，也不要将构建期环境变量误作运行期设置。
- 涉及包依赖、部署配置、远程服务或数据迁移时属于高影响修改：先说明影响并取得用户确认；常规本地源码、生成与校验改动可直接执行。
- 除非用户明确要求，不创建提交、不推送、不修改远程部署或 Cloudflare 资源。
