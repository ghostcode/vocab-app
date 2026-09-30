<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { useVocabStore } from '@/stores/vocab'
import { useSpeak } from '@/composables/useSpeak'

const route = useRoute()
const router = useRouter()
const store = useVocabStore()
const { speak } = useSpeak()

const id = computed(() => route.params.id)
const focusWord = computed(() => route.query.word) // 从词库页点单词带入，首次进入优先展示
const category = computed(() => store.getCategory(id.value))
const allWords = computed(() => store.getWords(id.value))

const theme = {
  pink: { deep: '#ff85a1', soft: '#fff0f5', grad: 'linear-gradient(135deg,#ffd1dc,#ffb3c8)' },
  mint: { deep: '#5ec9a0', soft: '#eafaf2', grad: 'linear-gradient(135deg,#c7f0db,#9fe8c6)' },
  lavender: { deep: '#9b7ede', soft: '#f4eeff', grad: 'linear-gradient(135deg,#e3d4ff,#c9b3ff)' },
  lemon: { deep: '#f0b429', soft: '#fffaf0', grad: 'linear-gradient(135deg,#fff3bf,#ffe69c)' },
  peach: { deep: '#ff9b6a', soft: '#fff1ea', grad: 'linear-gradient(135deg,#ffdcc4,#ffb589)' }
}
const t = computed(() => theme[category.value?.color] || theme.pink)

// 学习顺序：未掌握的优先，全部掌握则打乱全部
let queue = []
const currentIndex = ref(0)
const flipped = ref(false)
const finished = ref(false)
const knownCount = ref(0)

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function buildQueue(focus = false) {
  const unlearned = allWords.value.filter((w) => !store.progress[id.value]?.[w.word]?.learned)
  let base = shuffle(unlearned.length ? unlearned : allWords.value)
  // 从词库页点单词进入时，把该词提到首位
  if (focus && focusWord.value && allWords.value.some((w) => w.word === focusWord.value)) {
    const fw = allWords.value.find((w) => w.word === focusWord.value)
    base = [fw, ...base.filter((w) => w.word !== focusWord.value)]
  }
  queue = base
  currentIndex.value = 0
  flipped.value = false
  finished.value = false
  knownCount.value = 0
}

const current = computed(() => queue[currentIndex.value] || null)
const total = computed(() => queue.length)
const percent = computed(() =>
  total.value ? Math.round(((currentIndex.value + (finished.value ? 1 : 0)) / total.value) * 100) : 0
)

function flip() {
  flipped.value = !flipped.value
  if (flipped.value && current.value) speak(current.value.word)
}

function mark(known) {
  if (!current.value) return
  store.recordAnswer(id.value, current.value.word, known)
  if (known) knownCount.value += 1
  if (currentIndex.value + 1 >= total.value) {
    finished.value = true
  } else {
    currentIndex.value += 1
    flipped.value = false
  }
}

function restart() {
  buildQueue(false)
}
function switchMode() {
  router.push(`/practice/${id.value}/word`)
}

onMounted(() => buildQueue(true))
</script>

<template>
  <section v-if="category && current" class="study pop-in" :style="{ '--deep': t.deep, '--soft': t.soft }">
    <RouterLink :to="`/category/${id}`" class="back">← 返回词库</RouterLink>

    <div class="top-row">
      <span class="mode-tag">📖 学习卡片</span>
      <span class="prog-text">第 {{ Math.min(currentIndex + 1, total) }} / {{ total }} 张</span>
    </div>
    <div class="bar">
      <div class="bar-fill" :style="{ width: percent + '%' }"></div>
    </div>

    <!-- 翻转卡片 -->
    <div class="card-scene">
      <div class="flip-card" :class="{ flipped }" @click="flip">
        <!-- 正面 -->
        <div class="face front">
          <div class="front-word">{{ current.word }}</div>
          <div class="front-phon">{{ current.phonetic }}</div>
          <button class="speak-btn" @click.stop="speak(current.word)" title="听发音">🔊</button>
          <div class="tap-tip">轻触卡片翻看释义 👆</div>
        </div>
        <!-- 背面 -->
        <div class="face back">
          <div class="back-mean">{{ current.meaning }}</div>
          <div class="back-ex">{{ current.example }}</div>
          <div class="back-excn">{{ current.exampleCn }}</div>
        </div>
      </div>
    </div>

    <!-- 操作 -->
    <div class="ops">
      <button class="btn btn-mint" @click="mark(true)">😊 我认识</button>
      <button class="btn btn-peach" @click="mark(false)">🌱 还不熟</button>
    </div>
  </section>

  <!-- 结算 -->
  <section v-else-if="category && finished" class="result pop-in" :style="{ '--deep': t.deep, '--soft': t.soft }">
    <RouterLink :to="`/category/${id}`" class="back">← 返回词库</RouterLink>
    <div class="result-emoji">🌟</div>
    <h1 class="result-title">学习完成！</h1>
    <div class="score-ring" :style="{ background: t.grad }">
      <div class="score-num">{{ total ? Math.round((knownCount / total) * 100) : 0 }}%</div>
      <div class="score-sub">{{ knownCount }} / {{ total }} 已认识</div>
    </div>
    <p class="result-msg">今天的甜甜单词，又啃下了一块 🍰</p>
    <div class="result-ops">
      <button class="btn" @click="restart">🔁 再学一轮</button>
      <button class="btn btn-lav" @click="switchMode">✏️ 去自测</button>
      <RouterLink :to="`/category/${id}`" class="btn btn-ghost">📚 回到词库</RouterLink>
    </div>
  </section>

  <section v-else class="empty pop-in">
    <p>没有找到这个词库 😢</p>
    <RouterLink to="/" class="btn">回到首页</RouterLink>
  </section>
</template>

<style scoped>
.back {
  display: inline-block;
  margin-bottom: 14px;
  color: var(--lavender-deep);
  font-weight: 700;
  text-decoration: none;
  font-size: 14px;
}
.top-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}
.mode-tag {
  background: var(--soft);
  color: var(--deep);
  font-weight: 800;
  font-size: 14px;
  padding: 6px 16px;
  border-radius: 999px;
}
.prog-text {
  color: var(--ink-soft);
  font-weight: 700;
  font-size: 14px;
}
.bar {
  height: 12px;
  border-radius: 999px;
  background: #fff;
  box-shadow: var(--shadow-soft);
  overflow: hidden;
  margin-bottom: 22px;
}
.bar-fill {
  height: 100%;
  border-radius: 999px;
  background: var(--deep);
  transition: width 0.4s ease;
}

/* 翻转卡 */
.card-scene {
  perspective: 1200px;
  display: flex;
  justify-content: center;
}
.flip-card {
  width: 100%;
  max-width: 460px;
  height: 280px;
  position: relative;
  cursor: pointer;
  transform-style: preserve-3d;
  transition: transform 0.55s cubic-bezier(0.4, 0.2, 0.2, 1);
}
.flip-card.flipped {
  transform: rotateY(180deg);
}
.face {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  text-align: center;
}
.front {
  background: var(--soft);
}
.front-word {
  font-family: 'Baloo 2', sans-serif;
  font-weight: 800;
  font-size: 40px;
  color: var(--deep);
}
.front-phon {
  color: var(--ink-soft);
  font-size: 17px;
  margin-top: 8px;
}
.speak-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: #fff;
  font-size: 22px;
  box-shadow: var(--shadow-soft);
  transition: transform 0.15s ease;
}
.speak-btn:hover {
  transform: scale(1.08);
}
.tap-tip {
  position: absolute;
  bottom: 16px;
  font-size: 13px;
  color: var(--ink-soft);
  font-weight: 700;
}
.back {
  background: linear-gradient(135deg, #ffffff, var(--soft));
  transform: rotateY(180deg);
}
.back-mean {
  font-family: 'ZCOOL KuaiLe', sans-serif;
  font-size: 24px;
  color: var(--deep);
  margin-bottom: 14px;
}
.back-ex {
  font-size: 15px;
  color: var(--ink);
  line-height: 1.6;
  font-style: italic;
}
.back-excn {
  font-size: 13.5px;
  color: var(--ink-soft);
  margin-top: 8px;
  line-height: 1.5;
}

.ops {
  display: flex;
  gap: 14px;
  justify-content: center;
  margin-top: 26px;
  flex-wrap: wrap;
}

/* 结算 */
.result {
  text-align: center;
  padding-top: 10px;
}
.result-emoji {
  font-size: 64px;
}
.result-title {
  font-size: 30px;
  color: var(--deep);
  margin: 6px 0 18px;
}
.score-ring {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  box-shadow: var(--shadow);
}
.score-num {
  font-family: 'Baloo 2', sans-serif;
  font-size: 46px;
  font-weight: 800;
  line-height: 1;
}
.score-sub {
  font-size: 14px;
  font-weight: 700;
  margin-top: 4px;
}
.result-msg {
  font-family: 'ZCOOL KuaiLe', sans-serif;
  font-size: 20px;
  color: var(--ink);
  margin: 18px 0 24px;
}
.result-ops {
  display: flex;
  gap: 14px;
  justify-content: center;
  flex-wrap: wrap;
}

.empty {
  text-align: center;
  padding: 60px 0;
}
</style>
