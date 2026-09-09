# QDog 宠物蛋基因码与 AI 孵化方案

日期：2026-09-08  
状态：基础孵化 MVP 已实现；平台适配保留为未来扩展  
协议代号：QDog Genome v1（QDG1）  
范围：`qdog-server` 负责发行、资产与孵化状态；`qdog-community/web` 负责揭晓、SVG 展示与用户入口；基础孵化产物保持平台无关，Codex 的 hatch-pet-v2 只是可选平台适配器之一。

## 1. 一句话方案

每枚宠物蛋同时拥有两个不同用途的代码：

- **兑换码**：沿用现有不可读的 `QD-XXXX-XXXX-XXXX`，公开发放、一次性兑换，不包含可猜测属性。
- **基因码**：兑换后才向拥有者揭晓，核心是用户期望的 9 位固定属性码 `BCPXXXXXX`；规范格式为 `QDG1-XXX-XXX-XXX-CC`，它唯一决定蛋的 SVG 外观和宠物孵化约束。

完整闭环：

```text
安全随机发行兑换码
  → 兑换后揭晓 QDG1 基因码
  → 纯函数生成固定 SVG 宠物蛋
  → 基因码解码为结构化孵化约束
  → LLM 生成一次性的原创宠物 Identity Manifest
  → 图像模型生成一张平台无关的基础宠物形象
  → 持久化基础宠物，后续读取不重新生成
  → 用户按需选择 Codex 或其他平台适配器
```

这个拆分兼容当前产品：今日 50 枚蛋在兑换前仍隐藏属性；基因码不是授权凭证，知道别人的基因码不能领取或操作其资产。完成基础孵化不自动产生高成本动画图集，只有用户明确选择目标平台时才执行对应构建。

### 当前实现边界（2026-09-09）

- 当前项目未公开，按本轮开发要求通过 `0006_qdog_genome_hatching.sql` 重置宠物蛋相关表；账户、身份和会话表不受影响，不承担旧蛋数据迁移。
- 当前基础孵化直接把服务端严格解码后的九项属性编译为版本化提示词，调用 `gpt-image-2` 生成一张透明 PNG；暂不额外调用文本 LLM 生成 Identity Manifest，以减少一次模型成本。
- D1 保存幂等状态、提示词哈希、模型和尝试次数，私有 R2 保存图片。同一资产重复点击复用已完成图片；失败最多尝试三次。
- 本轮不实现任何平台适配器、spritesheet 或 `hatch-pet-v2` 绑定。未来平台构建只能消费已固化的基础宠物，并作为独立接口和任务实现。

## 2. 为什么不直接把 `BCPXXXXXX` 当兑换码

当前 `qdog-server` 使用 `QD-XXXX-XXXX-XXXX` 作为一次性公开兑换码，并把 traits 隐藏到兑换成功后。若把属性直接放进公开兑换码，会产生三个问题：

1. 任何人都能在兑换前读出属性，用户会挑码和抢特定组合。
2. 9 位属性空间适合表达设计，不适合充当不可预测的安全凭证。
3. 属性协议升级会被兑换、数据库和展示格式绑死。

因此，兑换码回答“谁有权领取”，基因码回答“这是什么蛋”。两者必须分离。

## 3. QDG1 基因码格式

### 3.1 规范表示

```text
QDG1-BCP-DTC-GHU-F3
│    └──── 9 位属性载荷 ────┘ └校验码
└ 协议名 + 主版本
```

- `QDG1`：协议和语义版本。未来修改枚举语义时必须升为 `QDG2`，不得重解释旧码。
- `BCPDTCGHU`：9 位核心属性，分组仅为可读性；数据库保存无连字符的大写形式也可以。
- `F3`：两位校验码，只用于发现输错，不是签名，也不能用于鉴权。
- 解析器只接受规范格式 `QDG1-XXX-XXX-XXX-CC` 或完全无分隔的紧凑格式；仅允许去除字符串首尾 ASCII 空白并转大写，不接受任意内部空格或错误分组。
- 属性字符在**各自位置内**解释，同一个字母可以在不同位置表达不同语义。

校验算法：

1. 用 UTF-8 编码 ASCII 字符串 `QDG1:` 与 9 位 payload，计算 `SHA-256("QDG1:" + payload)`。
2. 把摘要视为大端 bit stream，读取最前面的 10 bit。
3. 每 5 bit 映射到 `23456789ABCDEFGHJKLMNPQRSTUVWXYZ`，得到两位校验码。

随机输错通过校验的概率是 `1 / 1024`。所有实现必须以本文第 5 节的示例作为兼容测试向量。

### 3.2 九个固定位置与完整枚举

| 位  | 维度                 | SVG 职责                    | 枚举（代码 = 含义）                                                                                                                                                                                                                            |
| --- | -------------------- | --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | 主色 `color`         | 主填充、光晕基色            | `R` 红 red；`O` 橙 orange；`Y` 黄 yellow；`G` 绿 green；`B` 蓝 blue；`C` 青 cyan；`P` 紫 purple；`M` 品红 magenta；`W` 白 white；`K` 黑 black；`N` 棕 brown；`S` 银 silver                                                                     |
| 2   | 材质 `material`      | 高光、纹理、透明度          | `C` 水晶 crystal；`P` 陶瓷 porcelain；`M` 金属 metal；`W` 木质 wood；`S` 岩石 stone；`G` 玻璃 glass；`J` 果冻 jelly；`F` 绒毛 fur；`L` 叶片 leaf；`H` 全息 hologram；`V` 熔岩 volcanic；`N` 星云 nebula                                        |
| 3   | 画风 `style`         | 描边、几何精度、滤镜        | `P` 像素 pixel；`C` Q 版 chibi；`A` 动画 anime；`V` 体素 voxel；`W` 水彩 watercolor；`I` 水墨 ink；`R` 复古 retro；`F` 扁平 flat；`L` 低多边形 low-poly；`H` 赛博全息 holo-tech；`K` 黏土 clay；`S` 绘本 storybook                             |
| 4   | 生物原型 `archetype` | 蛋壳徽记、基础轮廓提示      | `M` 兽类 mammal；`A` 鸟类 avian；`R` 爬行类 reptile；`Q` 水生 aquatic；`I` 虫类 insect；`B` 植物 botanical；`G` 魔像 golem；`S` 精灵 spirit；`D` 龙 dragon；`X` 异星 alien；`O` 软泥 ooze；`H` 混合体 hybrid                                   |
| 5   | 元素 `element`       | 外圈粒子和能量符号          | `F` 火 fire；`W` 水 water；`E` 土 earth；`A` 风 air；`N` 自然 nature；`I` 冰 ice；`T` 雷 thunder；`L` 光 light；`D` 影 shadow；`C` 宇宙 cosmic；`M` 钢 metal；`V` 虚空 void                                                                    |
| 6   | 性格 `temperament`   | 蛋面表情、孵化后的动作倾向  | `B` 勇敢 brave；`G` 温柔 gentle；`C` 好奇 curious；`M` 淘气 mischievous；`L` 忠诚 loyal；`S` 害羞 shy；`W` 睿智 wise；`P` 爱玩 playful；`R` 叛逆 rebellious；`D` 梦幻 dreamy；`K` 沉静 calm；`E` 活力 energetic                                |
| 7   | 标志特征 `signature` | 蛋顶或蛋身的可见附件        | `N` 无附件 none；`H` 角 horns；`W` 翼 wings；`C` 水晶冠 crystal crest；`A` 触角 antennae；`L` 叶披风 leaf mantle；`F` 火焰羽 flame plume；`O` 悬浮球 orbiting orb；`S` 围巾 scarf；`G` 护目镜 goggles；`B` 背包 backpack；`R` 王冠 royal crown |
| 8   | 纹样 `pattern`       | 裁切在蛋壳内的图案层        | `S` 纯色 solid；`T` 条纹 stripes；`P` 斑点 spots；`G` 渐变 gradient；`C` 星座 constellation；`R` 符文 runes；`M` 马赛克 mosaic；`F` 火纹 flames；`W` 波纹 waves；`L` 藤叶 vines；`K` 裂纹 cracks；`H` 电路 circuit                             |
| 9   | 栖息地 `habitat`     | SVG 底座/背景，也约束世界观 | `F` 森林 forest；`O` 海洋 ocean；`D` 沙漠 desert；`M` 山地 mountain；`C` 云海 cloudscape；`V` 火山 volcano；`I` 冰原 icefield；`U` 都市 urban；`R` 遗迹 ruins；`S` 星域 starfield；`W` 湿地 wetland；`A` 奥术实验室 arcane lab                 |

v1 每一位恰好 12 个取值，理论组合数为：

```text
12^9 = 5,159,780,352
```

所有枚举特意设计为可组合语义，不设置“水生 + 火山不允许”之类的硬规则；这种反差可以孵化为熔岩蝾螈、蒸汽水母等更有记忆点的原创角色。

### 3.3 不占固定位置的派生属性

以下内容由基因码哈希稳定派生，不消耗属性位：

- 次色和高对比描边色
- 蛋形的局部宽高、裂纹旋转角、粒子位置
- SVG 中同一纹样的排列参数
- 默认大小和阴影强度
- LLM 生成任务的 deterministic seed

为了让当前只认识 5 色、4 材质、3 大小、3 形状的旧前端可降级展示，定义并版本化纯函数 `toLegacyTraitsV1(genome, visualSeed)`：

```text
color:
  R→red, O/Y/W/N→gold, G→green, B/C/S→blue, P/M/K→purple
material:
  C/G/N→crystal, P/S/J/F→ceramic, M/H/V→metal, W/L→wood
size:
  visualSeed[0] % 3 → small / medium / large
shape:
  pixel/voxel/low-poly → angular
  chibi/clay → round
  其余 → oval
```

API 返回的 legacy `traits` 必须只由这一个函数产生，并在 fixtures 中固定；前端不能自行做另一套近似映射。该投影只是回滚兼容，不承诺完整表现 QDG1 的 12 色与 12 材质。

以下内容不能只靠基因码推导，首次生成后必须持久化：

- 宠物名字、具体物种、背景故事和口头禅
- 基础宠物设定图、各平台适配产物及其元数据
- 图像模型版本、提示词版本与生成审计信息

v1 不编码“稀有度”。稀有度不是形象特征，容易被误解为质量或经济价值。如未来确有收藏展示需求，只能把它作为发行批次统计衍生值，不能改变宠物质量或用户权益。

## 4. 随机生成规则

### 4.1 基础算法

1. 使用服务端 Web Crypto CSPRNG，不使用 `Math.random()`。
2. v1 的九个位置独立均匀抽样，每项概率严格为 `1 / 12`。每次取一个无符号字节；若值大于等于 `252` 则丢弃重取，否则使用 `byte % 12`，避免模偏差。
3. 生成 payload 后计算规范基因码和 traits JSON，在同一个数据库事务中写入。
4. 数据库对非空 `genome_code` 建唯一索引；若碰撞则只为该 slot 重新生成，最多尝试固定次数，耗尽后让整次发行明确失败并告警。
5. 兑换码仍由独立随机源生成，不能由基因码反推。

当前发行仓储使用 `INSERT OR IGNORE`。实现 QDG1 时不能继续用它吞掉所有唯一约束错误：source id 的幂等冲突和 genome 的随机碰撞必须走不同分支。建议先查询缺失 slot，再对 source id 使用定向 `ON CONFLICT(id) DO NOTHING`；genome 唯一索引冲突必须向服务层返回并重抽。写入后重新读取当天 50 个 slot，确认无缺口且已存在行的 genome 从未被覆盖。

未来若调整概率，新增 `generatorProfile`（例如 `uniform-v1`、`season-autumn-v1`），但不能修改字母语义或 SVG 解释。活动主题通过生成权重影响发行分布，不应产生另一套解码规则。

### 4.2 可复现与真正随机的边界

- **发行是随机的**：用户不能从日期或序号预测下一枚蛋。
- **展示是确定的**：同一个合法基因码在同一 renderer 版本下生成逐字节一致的 SVG。
- **孵化结果是一次性固化的**：LLM 本身不保证跨模型逐 token 一致，因此第一次成功生成 Identity Manifest 后必须保存；重试图像阶段复用同一份 Manifest，不能重新“理解”基因码。

## 5. 完整示例与兼容测试向量

示例核心码：

```text
BCPDTCGHU
```

规范基因码：

```text
QDG1-BCP-DTC-GHU-F3
```

含义：

```json
{
  "version": 1,
  "color": "blue",
  "material": "crystal",
  "style": "pixel",
  "archetype": "dragon",
  "element": "thunder",
  "temperament": "curious",
  "signature": "goggles",
  "pattern": "circuit",
  "habitat": "urban"
}
```

创意孵化方向可以是：“一只生活在霓虹城市电塔上的蓝色水晶像素幼龙，性格好奇，戴护目镜，身体内有闪烁的雷电电路”。这是方向约束，不是要求模型复刻某个现有 IP。

所有服务端、前端和未来 CLI 至少共享以下 conformance tests：

- `BCPDTCGHU` 编码结果必须是 `QDG1-BCP-DTC-GHU-F3`。
- 小写的规范格式与完全无分隔的紧凑格式规范化后得到同一结果。
- 任意一个 payload 字符或校验字符变化必须被拒绝，除非变化后恰好形成另一个合法码。
- 未知协议版本、非法位置字符、长度错误均返回稳定错误，不做猜测性修复。
- payload 中的字母 `I/O` 永远不会被静默猜成数字 `1/0`；UI 应指出错误所在位置并提供复制按钮，避免要求用户手抄。

## 6. 固定 SVG 宠物蛋渲染器

### 6.1 纯函数契约

```ts
renderEggSvg({ genomeCode, rendererVersion: 1 }): string
```

约束：

- 固定 `viewBox="0 0 320 360"`，不依赖系统字体、当前时间、网络资源或运行时随机数。
- `visualSeed = SHA-256("egg-svg-v1:" + canonicalGenomeCode)`。
- SVG 不包含脚本、事件处理器、外链图片、`foreignObject` 或用户原始文本。
- 所有 `clipPath`、gradient、mask 和 filter id 使用 `visualSeed` 前缀命名空间化，避免同页多枚 SVG 串用定义。
- 颜色、尺寸和透明度全部写入 SVG，自身不依赖外部 CSS 或 `currentColor`。
- 同一输入输出逐字节一致；测试同时保存 SHA-256 snapshot。
- `rendererVersion` 单独版本化。可以修复渲染器，但不得静默改变用户已有蛋的外观。
- 核心 SVG 的 `<title>` 使用语言无关的 `QDog pet egg <canonicalGenomeCode>`；本地化属性说明放在 SVG 外的页面文本中，避免 locale 改变 SVG 字节。

### 6.2 从后到前的图层

| 层            | 数据来源           | 表现                                                         |
| ------------- | ------------------ | ------------------------------------------------------------ |
| 0. 背景与底座 | habitat            | 森林叶影、海浪、城市网格等简化符号；不能使用远程贴图         |
| 1. 元素光晕   | element            | 火花、水滴、风线、闪电等 12 组固定 path 模板                 |
| 2. 蛋壳轮廓   | style + visualSeed | 像素风使用阶梯轮廓，低多边形使用折面，其余使用平滑卵形       |
| 3. 主填充     | color              | 12 套无障碍主色 palette；白/黄等浅色自动使用深描边           |
| 4. 材质       | material           | 水晶折射、金属高光、木纹、绒毛边缘、星云渐变等               |
| 5. 纹样       | pattern            | 纹样始终通过蛋壳 `clipPath` 裁切，密度由 visualSeed 稳定微调 |
| 6. 原型徽记   | archetype          | 兽爪、羽毛、鳞片、水滴、叶芽、龙首等抽象 sigil               |
| 7. 表情       | temperament        | 12 套眼睛和嘴形；不能只靠颜色表达性格                        |
| 8. 附件       | signature          | 角、翼、护目镜、围巾、背包等可以越过蛋壳轮廓                 |
| 9. 高光与阴影 | material + color   | 保证浅色、深色和暗色模式都有足够轮廓对比                     |

SVG 是“这枚蛋”的确定性封面，不是最终宠物。最终宠物必须继承九项语义，但可以把蛋壳附件转译为生物特征，例如蛋上的电路纹在孵化后成为发光鳞片。

## 7. LLM 孵化协议

### 7.1 不把裸字符串直接交给模型

服务端先严格校验并解码基因码，再构造结构化输入。模型不能决定某一位是什么意思，也不能覆盖 locked traits。

```json
{
  "protocolVersion": 1,
  "promptVersion": "hatch-identity-v1",
  "genomeCode": "QDG1-BCP-DTC-GHU-F3",
  "lockedTraits": {
    "color": "blue",
    "material": "crystal",
    "style": "pixel",
    "archetype": "dragon",
    "element": "thunder",
    "temperament": "curious",
    "signature": "goggles",
    "pattern": "circuit",
    "habitat": "urban"
  },
  "requirements": {
    "originalCharacter": true,
    "readableAt192px": true,
    "transparentBackground": true,
    "outputKind": "platform-neutral-base-pet",
    "platformConstraints": []
  }
}
```

### 7.2 两阶段生成

**阶段 A：平台无关的基础孵化（默认执行）**

这个阶段只生成“一只宠物是谁”，不生成任何平台的完整动画资源：

1. 角色导演 LLM 输出严格 JSON 的 `IdentityManifest`：原创名称、角色钩子、具体物种与身体结构、颜色和纹样落点、不可变识别特征、性格与通用行为语言。
2. 图像模型根据 Manifest 生成一张平台无关的透明背景基础宠物设定图，建议单张 `1024 × 1024` PNG/WebP；不要求多方向、逐帧动作或 spritesheet。
3. QA 检查九项 locked traits、角色原创性、小尺寸轮廓可读性和 Manifest/图片一致性。
4. 固化 `BasePetAsset = IdentityManifest + baseImage + generationLineage`。从此所有平台适配都复用这份基础资产，不从裸基因码重新创作。

首次模型原始响应必须先持久化。JSON Schema 校验失败时，修复请求只能输入这份原始响应并要求修复结构，不允许重新运行创作 prompt；这样才能实际约束“修格式但不换概念”。`hatchKey` 必须包含资产身份，推荐 `SHA-256("hatch-base-v1:" + eggAssetId + ":" + canonicalGenomeCode)`。

数据库 UNIQUE 只能阻止重复写入，不能阻止两个 Worker 在写入前同时调用 LLM。创建接口必须先原子插入 `queued` 行并通过 transactional outbox 发出任务；只有成功获得任务 lease 的消费者才能调用模型。消费者用 compare-and-swap 更新 `status`、`lease_token`、`lease_expires_at`，超时后才能由另一个消费者接管，并在每次外部调用后校验 lease 仍属于自己。基础 Manifest 与图片通过 QA 后保持不可变。

模型输出始终是不可信数据：Schema 限制每个字段的长度、控制字符、数组数量和 URL；UI、日志、文件名和后续 prompt 分别做上下文转义。模型不能直接提供可执行 SVG、脚本或存储 key。

**阶段 B：按需平台适配（用户选择后执行）**

平台适配不是孵化成功的必经步骤。每个平台以独立、版本化的 `PlatformProfile` 声明：

```json
{
  "id": "codex-sprite-v2",
  "platform": "codex",
  "adapterVersion": 1,
  "input": "base-pet-asset-v1",
  "output": {
    "format": "webp-spritesheet",
    "width": 1536,
    "height": 2288,
    "columns": 8,
    "rows": 11
  }
}
```

- 用户只查看、收藏或分享基础宠物时，不触发平台适配成本。
- 用户选择 Codex 后，`codex-sprite-v2` 适配器才根据 BasePetAsset 调用 `$hatch-pet-v2`，生成 `8 × 11` spritesheet 和 `spriteVersionNumber: 2`。
- 未来其他平台提供自己的 profile、动作、尺寸和输出格式，不需要修改 QDG1、基础 Manifest 或重新孵蛋。
- 同一基础宠物可以拥有多个平台构建；每个 `basePetId + profileId + adapterVersion` 幂等且单独计费、重试、QA 和版本化。
- 平台构建不得改变宠物身份、配色分区和标志特征，只能把基础形象翻译成目标平台的技术资产。

若 Codex 产物最终投稿到社区，只进入 `pets/<pet-slug>--<author-slug>/` 的 `submission.json`、`pet.json`、`spritesheet.webp` 三件套；prompt、Manifest、QA 和中间图留在资产服务或本地过程目录。

### 7.3 分层 QA 与成本控制

基础孵化 QA：

- 九个 locked traits 是否都能在角色视觉、通用行为或世界观中找到可解释体现。
- 基础图与 Manifest 是否保持同一角色的颜色分区、附件和身体结构。
- 是否无意生成了高度近似的已知 IP 或社区现有角色。

平台适配 QA 由 PlatformProfile 定义。例如 Codex profile 额外检查 `8 × 11` 尺寸、透明边缘、动画连续性和 16 个环视方向；这些要求不能反向污染基础孵化协议。

成本策略：默认只运行一次角色 LLM 和一次单图生成；多方向、动画和 spritesheet 在用户选择目标平台后才运行。UI 在启动平台构建前展示预计耗时、消耗和可重试范围，并始终复用已固化的 BasePetAsset。

不要求九项都变成“挂件”。性格适合通过动作表达，栖息地适合通过背景故事和行为细节表达，避免把宠物堆成视觉圣诞树。

## 8. 数据与 API 演进

### 8.1 非破坏性数据演进

不要再次用重置迁移删除现有蛋资产。SQLite/D1 不能用一条 `ADD COLUMN ... UNIQUE` 安全完成这个变化，迁移应先增加普通 nullable 列，再创建 partial unique index：

```text
pet_egg_codes.genome_code       TEXT NULL
pet_egg_codes.genome_version    INTEGER NULL
pet_egg_codes.generator_profile TEXT NULL
pet_egg_assets.egg_svg_version  INTEGER NULL

UNIQUE INDEX pet_egg_codes(genome_code)
  WHERE genome_code IS NOT NULL
```

再用 INSERT/UPDATE trigger 保证 `genome_code`、`genome_version`、`generator_profile` 要么全部为空（旧蛋），要么全部非空且版本受支持；新资产从有 genome 的 source code 创建时必须有 renderer version。应用层负责完整 QDG1 校验和 legacy traits 投影一致性，数据库负责防止半迁移状态、重复码与 Manifest 被成功后改写。迁移测试必须从包含已领取资产的现有 `0005` 数据库升级，不能只测试空库。

孵化过程使用独立表，不把大 JSON 和生成状态塞进 `pet_egg_assets`：

```text
pet_hatches
  id, egg_asset_id UNIQUE, hatch_key UNIQUE,
  status, prompt_version, manifest_schema_version,
  identity_manifest, raw_model_response,
  lease_token, lease_expires_at,
  base_image_asset_key,
  error_code, created_at, updated_at, completed_at

pet_hatch_attempts
  id, hatch_id, stage, attempt_number,
  provider, model, model_version, parameters_json, seed,
  started_at, completed_at, outcome, error_code

pet_hatch_outbox
  id, subject_type, subject_id, event_type,
  created_at, dispatched_at

pet_platform_builds
  id, hatch_id, profile_id, adapter_version,
  status, lease_token, lease_expires_at,
  output_manifest, output_asset_key,
  error_code, created_at, updated_at, completed_at,
  UNIQUE(hatch_id, profile_id, adapter_version)

pet_platform_build_attempts
  id, build_id, stage, attempt_number,
  provider, model, parameters_json,
  started_at, completed_at, outcome, error_code
```

基础孵化和平台构建使用两个独立状态机：

```text
egg_owned → queued → identity_ready → base_rendering → base_qa → base_ready
                 ↘ failed（可从最近的稳定产物重试）

base_ready ──用户选择 profile──→ queued → rendering → platform_qa → ready
                                      ↘ failed（不影响 base_ready）
```

旧资产的四维 `traits` 保持可读并标记 `genomeVersion: null`，不伪造一个 QDG1 码。新 UI 对旧蛋继续使用当前 SVG renderer。

### 8.2 API 兼容策略

当前列表接口在兑换前不返回 traits，这一点保持不变。领取成功和 `GET /assets` 对新蛋增加 additive 字段：

```json
{
  "id": "asset-id",
  "type": "pet_egg",
  "code": "QD-XXXX-XXXX-XXXX",
  "traits": "color:blue|size:medium|shape:angular|material:crystal",
  "genome": {
    "version": 1,
    "code": "QDG1-BCP-DTC-GHU-F3",
    "rendererVersion": 1,
    "legacyProjectionVersion": 1
  },
  "acquiredAt": 1788796800000
}
```

- 过渡期保留现有 `traits` 字符串，避免破坏当前前端；它由 genome 派生，仅用于旧客户端降级展示。
- 新客户端以 `genome.code` 为权威来源并在本地严格解码。
- `genome` 只出现在资产拥有者的认证响应里，不出现在公开每日列表。
- 所有孵化接口按 `egg_asset_id` 鉴权，绝不能按基因码鉴权。
- 开始孵化、查看状态、重试和读取结果均需幂等键与账户所有权校验。
- 基础孵化接口不接受 platform 参数；平台构建是独立操作，只接受服务端已注册的 `profileId`。
- 客户端先读取可用 PlatformProfile 列表，再由用户明确启动某个构建；创建基础宠物时不能隐式创建 Codex 构建。

## 9. 分步实施蓝图

依赖关系：

```text
步骤 1：协议核心与服务端发行
  ├─→ 步骤 2：前端 SVG 与揭晓体验
  └─→ 步骤 3：平台无关的基础宠物孵化
          └─→ 步骤 4：可选平台适配器
```

步骤 2 和步骤 3 可以在步骤 1 合并后并行；它们不应修改同一批文件。

### 步骤 1：QDG1 协议核心与服务端发行（qdog-server，PR 1）

上下文：当前服务仅随机生成 `color/size/shape/material` 字符串，并用独立的公开兑换码领取。目标是在不改变公开列表隐私和现有领取语义的前提下，为新发行蛋增加 QDG1。

任务：

- 实现枚举、规范化、encode/decode、校验码和 CSPRNG 生成器。
- 将枚举与 conformance vectors 保存为机器可读 JSON，增加本文测试向量、属性测试、rejection sampling 分布 sanity test 和非法输入测试。
- 新增非破坏性 D1 migration、partial unique index、跨列 trigger，并覆盖带既有资产的升级测试。
- 改造发行仓储，区分 source id 幂等冲突与 public/genome 随机碰撞，碰撞有界重抽且事务后断言 50 个关联 slot 完整。
- 新发行同时保存 genome 和旧客户端降级 traits；旧行保持原样。
- 在领取和资产 API 增加可选 `genome` 字段。

验证：`npm test`、`npm run types:check`，并验证公开 `GET /pet-eggs/daily` 响应不出现 genome 或 traits。

退出条件：重复发行幂等；50 枚新蛋都有唯一合法 QDG1；旧测试和旧资产读取通过。

回滚：停止生成 genome 并保留 nullable 列；不删除已发行数据，也不重解释已返回的码。

### 步骤 2：确定性 SVG 与资产 UI（qdog-community，PR 2）

上下文：当前 `PetEggVisual` 只支持四维 pipe traits。目标是增加 QDG1 renderer，同时完整保留旧蛋 fallback。

任务：

- 在 `web/lib/` 实现 QDG1 decoder 和无副作用 SVG model。
- 将 renderer 拆成九层并加入 12 × 9 的视觉映射。
- 对示例码保存 SVG snapshot hash，并测试重复渲染逐字节一致。
- 增加 108 个单项样本、pairwise 组合和 fuzz 渲染；重点覆盖浅色 + 透明材质 + light 元素、无附件、多 SVG 同页 id 隔离。
- 背包卡先显示蛋，展开后显示基因码与九项本地化属性。
- 新蛋使用 QDG1 renderer；旧蛋继续走当前四维 renderer。

验证：`npm --prefix web run lint`、`npm --prefix web run build:pr`，并做浅色、暗色、移动端、键盘和 reduced-motion 检查。

退出条件：示例码的 SVG 稳定；所有 108 个枚举和重点组合通过可视回归；同页多蛋无 SVG 定义串扰；公开每日列表仍不泄露属性。

回滚：通过前端 feature flag 回到旧 `PetEggVisual`；服务端 genome 数据不受影响。

### 步骤 3：基础宠物孵化（qdog-server，PR 3）

上下文：LLM 输出不天然可复现。当前 Worker 只有 D1 和每日 cron，没有 Queue、Workflow、R2 或模型 adapter。目标是先补齐异步执行与基础图片存储边界，让“同一枚蛋只形成一个平台无关的角色身份”，并允许从 LLM、单图或 QA 阶段安全重试。

任务：

- 先提交架构决策：生产自动孵化采用 Queue/Workflow + 对象存储和一个明确的模型 adapter；若暂不增加这些依赖，MVP 只能生成平台无关的结构化基础孵化 prompt 并通过 Codex 深链由用户启动，不得展示虚假的服务端进度。
- 定义和校验 `IdentityManifest` JSON Schema。
- 增加 `pet_hatches`、attempt、transactional outbox、所有权检查、先落库后入队、任务 lease、幂等创建、状态查询和受控重试。
- 将解码后的 locked traits 传给 LLM，不传未验证的用户 prompt。
- 只生成一张平台无关基础宠物图；持久化原始响应、prompt/model/schema 版本、生成参数、Manifest 和基础图引用。
- 加入限流、超时、错误码、内容安全和原创性检查。

验证：服务测试覆盖重复点击、队列重复投递、lease 竞争/过期接管、旧消费者晚回写、非所有者、模型超时、Schema 修复和从稳定状态重试。

退出条件：同一资产并发请求只入队一次、只产生一个 Manifest 和一张通过 QA 的基础图；lease 超时可接管且旧消费者不能回写；失败重试不会换角色；其他账户无法观察任务内容；过程不创建任何平台 spritesheet。

回滚：先停止新建任务，再暂停消费者并排空或冻结在途 lease；旧 worker 必须拒绝未知新状态。关闭 hatch feature flag 后已有蛋和 SVG 仍完全可用；孤儿对象按 hatch/attempt 记录延迟清理，不立即删除。

### 步骤 4：平台适配器注册与按需构建（跨仓库，PR 4+）

上下文：BasePetAsset 是角色设计真相。平台技术契约不进入 QDG1 或基础孵化；每个平台用独立 profile 和 adapter 消费同一基础资产。

任务：

- 实现 PlatformProfile 注册表、可用平台查询、用户确认、独立计费/配额和幂等构建任务。
- 先把 `codex-sprite-v2` 作为第一个示范 adapter：从 BasePetAsset 生成方向锚点和动作说明，再按需调用 hatch-pet-v2。
- Codex adapter 增加自动尺寸、行数、透明通道和方向检查；其他 adapter 只执行自己的 profile QA。
- 小流量内部灰度，分别记录基础孵化与各平台构建的成功率、耗时和成本。
- 人工验收后再开放对应平台构建；社区投稿保持独立确认步骤。

验证：每个 profile 执行自己的 contract tests。Codex profile 的目标成品额外运行 `npm run previews`、`npm run readmes`、`npm run validate`、`npm run lint`，并保持 pet 目录三文件结构。

退出条件：不选平台时不会创建平台任务或产生平台成本；选择 Codex 后才生成符合 v2 的资源；新增其他平台无需修改 QDG1 或重新生成基础宠物；无过程产物进入正式 pet 包。

回滚：可单独关闭某个 PlatformProfile 并停止其新构建，基础孵化和其他平台不受影响；保留已完成资产，不删除用户蛋、Manifest、基础图或已完成平台产物。

## 10. 对抗性检查与常见失败模式

实施时必须拒绝这些捷径：

- 用 `Math.random()`、日期或递增 slot 生成可预测基因。
- 把 QDG1 基因码当成领取凭证或资源所有权证明。
- 让前端和服务端各自维护不同枚举却没有共享测试向量。
- 修改 QDG1 某个字母的含义而不升级协议版本。
- 在 SVG 中使用外链图片、脚本、用户 HTML 或不稳定系统字体。
- 每次查看或重试时重新让 LLM 创作角色，导致同一枚蛋不断变脸。
- 在基础孵化完成时自动运行 Codex 或任意平台构建。
- 为不同平台分别重新孵蛋，导致同一宠物在各平台变成不同角色。
- 把 hatch-pet-v2 字段写进 QDG1、Identity Manifest 或基础图片生成 prompt。
- 把“像素风”等 locked traits 只写进故事而不体现在角色视觉。
- 把所有九项都机械地画成饰品，导致轮廓不可读。
- 为了上线新协议而删除或伪造旧四维蛋的数据。
- 将 prompt、QA 视频、参考图或 Manifest 混入社区 pet 三件套。

## 11. 方案变更规则

- **改显示名称或翻译**：不升协议版本，但需更新所有语言和测试。
- **改某字符语义、增加/删除枚举、改变 payload 位数**：必须新建 `QDG2`。
- **仅改 SVG 画法**：升 `rendererVersion`；旧资产仍使用创建时记录的版本。
- **仅改 LLM 提示词或 Manifest Schema**：升 `promptVersion`，已有 Manifest 不自动重做。
- **新增或修改平台输出契约**：新增 `profileId` 或提升 `adapterVersion`，不升级 QDG1，也不重做 BasePetAsset。
- **步骤拆分或换序**：更新第 9 节依赖图；不得让前端先发布一个服务端尚不会返回的必填契约。
- **放弃孵化服务**：步骤 1–2 仍组成完整、可独立上线的“随机蛋 + 固定 SVG”产品。

## 12. 完成定义

- 任意合法 QDG1 能被服务端和前端解码为完全相同的九项属性。
- 示例 `QDG1-BCP-DTC-GHU-F3` 在所有实现中通过测试。
- 新蛋在兑换前不泄露 genome，兑换后显示固定 SVG 与完整属性。
- 同一基因码、同一 rendererVersion 输出逐字节一致的 SVG。
- 同一资产只固化一个平台无关的 Identity Manifest 和基础宠物图，图像失败重试不会改变角色身份。
- 基础孵化成功时不创建任何平台 spritesheet，用户不选择平台就不产生平台构建成本。
- 平台通过版本化 profile 独立扩展；选择 Codex profile 时才要求 hatch-pet-v2 的 `1536 × 2288`、`8 × 11` 和 16 个环视方向。
- 旧四维蛋继续可查看；数据库迁移不删除既有用户资产。
- 社区投稿仍只包含 `submission.json`、`pet.json`、`spritesheet.webp`。
