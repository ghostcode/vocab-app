# 🍬 糖豆背单词 · 马卡龙单词本

一个可爱、甜美的在线背单词网站，支持 **四级 / 六级 / 托福 / 雅思** 四大词库，提供 **学习卡片、单词填空、语句填空** 三种模式，并带真人发音与学习进度追踪。

> 用 ❤ 与马卡龙配色做出来的小单词本 🌈

---

## ✨ 功能特性

- **四大词库**：大学英语四级、六级、托福 TOEFL、雅思 IELTS，每个词库 20 个精选常用单词（共 80 词），含音标、中文释义、英文例句及中文翻译。
- **三种学习模式**
  - 📖 **学习卡片**：翻转卡先学后测，正面看单词+听发音，点一下翻到背面看释义与例句；用"我认识 / 还不熟"记录掌握情况。
  - 🔤 **单词填空**：给出中文释义，写出对应英文单词，支持首字母提示。
  - 📝 **语句填空**：例句中挖空，结合句意与中文翻译填入单词。
- **🔊 真人发音**：基于浏览器 Web Speech API，词库页、各练习页、学习卡片均可一键朗读单词或例句（en-US 语音）。
- **📊 进度追踪**：学习记录本地保存（localStorage），连续答对 2 次自动标记为"已掌握"，首页与词库页实时显示掌握进度条。
- **🎀 马卡龙可爱风**：粉 / 薄荷 / 薰衣草 / 柠檬四套马卡龙配色，圆角卡片、弹跳入场动画、圆润字体与甜甜文案。

---

## 🛠 技术栈

| 类别 | 选型 |
| --- | --- |
| 框架 | [Vue 3](https://vuejs.org/)（Composition API + `<script setup>`） |
| 构建工具 | [Vite 5](https://vitejs.dev/) |
| 状态管理 | [Pinia](https://pinia.vuejs.org/) |
| 路由 | [Vue Router 4](https://router.vuejs.org/) |
| 语音 | 浏览器原生 Web Speech API（SpeechSynthesis） |
| 样式 | 原生 CSS + CSS 变量（马卡龙主题），可爱字体 ZCOOL KuaiLe / Baloo 2 / Nunito |

---

## 📁 目录结构

```
vocab-app/
├── index.html              # 入口 HTML（含 Google Fonts 引入）
├── vite.config.js          # Vite 配置（@ 别名指向 src）
├── package.json
└── src/
    ├── main.js             # 应用入口：挂载 Pinia + Router
    ├── App.vue             # 整体布局（顶栏 + 页脚）
    ├── router/
    │   └── index.js        # 路由：首页 / 词库 / 练习 / 学习卡片
    ├── stores/
    │   └── vocab.js        # Pinia：词库数据 + 进度（localStorage 持久化）
    ├── composables/
    │   └── useSpeak.js     # Web Speech API 朗读封装
    ├── data/
    │   └── words.js        # 四大词库单词数据
    ├── styles/
    │   └── global.css      # 马卡龙主题变量 + 通用样式
    └── views/
        ├── HomeView.vue        # 首页：词库选择 + 总进度
        ├── CategoryView.vue    # 词库页：单词列表 + 发音 + 三种模式入口
        ├── PracticeView.vue    # 单词填空 / 语句填空
        └── StudyView.vue       # 学习卡片（翻转卡）
```

---

## 🚀 快速开始

> 需要 Node.js 18+ 环境。

```bash
# 安装依赖
npm install

# 启动开发服务器（默认 http://localhost:5173）
npm run dev

# 构建生产版本（输出到 dist/）
npm run build

# 本地预览构建产物（默认 http://localhost:4173）
npm run preview
```

---

## 🧩 自定义与扩展

### 1. 增加 / 修改单词
编辑 `src/data/words.js`。每个单词对象结构如下：

```js
{
  word: 'abandon',                       // 英文单词
  phonetic: '/əˈbændən/',                // 音标
  meaning: 'v. 抛弃，放弃',              // 中文释义
  example: 'They had to abandon the plan.', // 英文例句
  exampleCn: '他们不得不放弃这个计划。'   // 例句中文翻译
}
```

新增词库只需在 `categories` 数组追加一项（指定 `id` / `name` / `short` / `emoji` / `color` / `desc`），并在 `wordData` 中以相同 `id` 为键放入单词数组。`color` 支持 `pink` / `mint` / `lavender` / `lemon` 四种马卡龙主题。

### 2. 调整"已掌握"判定
在 `src/stores/vocab.js` 的 `recordAnswer` 中修改：目前规则为 **连续答对 2 次** 标记为已掌握，答错则清零。

### 3. 修改配色
全局马卡龙色板定义在 `src/styles/global.css` 的 `:root` 变量中，可统一调整。

---

## 📝 说明

- 发音功能依赖浏览器内置语音引擎，建议在 Chrome / Edge 等现代浏览器中使用；若设备无英文语音则自动降级（无声）。
- 学习进度保存在浏览器本地（localStorage），更换设备或清除浏览器数据会重置进度。

---

用 ❤ 与马卡龙配色做出来的小单词本，祝背词愉快 🌟
