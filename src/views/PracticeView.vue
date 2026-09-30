<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { useVocabStore } from '@/stores/vocab'
import { useSpeak } from '@/composables/useSpeak'

const route = useRoute()
const router = useRouter()
const store = useVocabStore()
const { speak } = useSpeak()

const id = route.params.id
const mode = route.params.mode // 'word' | 'sentence'
const category = computed(() => store.getCategory(id))
const allWords = computed(() => store.getWords(id))

const theme = {
  pink: { deep: '#ff85a1', soft: '#fff0f5', grad: 'linear-gradient(135deg,#ffd1dc,#ffb3c8)' },
  mint: { deep: '#5ec9a0', soft: '#eafaf2', grad: 'linear-gradient(135deg,#c7f0db,#9fe8c6)' },
  lavender: { deep: '#9b7ede', soft: '#f4eeff', grad: 'linear-gradient(135deg,#e3d4ff,#c9b3ff)' },
  lemon: { deep: '#f0b429', soft: '#fffaf0', grad: 'linear-gradient(135deg,#fff3bf,#ffe69c)' }
}
const t = computed(() => theme[category.value?.color] || theme.pink)

let queue = []
const currentIndex = ref(0)
const userInput = ref('')
const status = ref('idle') // idle | correct | wrong
const correctCount = ref(0)
const answered = ref(0)
const finished = ref(false)
const showHint = ref(false)

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function buildQueue() {
  // 优先抽取未掌握的单词，全部掌握则打乱全部
  const unlearned = allWords.value.filter((w) => !store.progress[id]?.[w.word]?.learned)
  queue = shuffle(unlearned.length ? unlearned : allWords.value)
  currentIndex.value = 0
  userInput.value = ''
  status.value = 'idle'
  correctCount.value = 0
  answered.value = 0
  finished.value = false
  showHint.value = false
}

const current = computed(() => queue[currentIndex.value] || null)

const blankParts = computed(() => {
  if (!current.value) return []
  const re = new RegExp('\\b' + current.value.word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'i')
  return current.value.example.split(re)
})

function normalize(s) {
  return (s || '')
    .trim()
    .toLowerCase()
    .replace(/[.,!?;:。"'’]/g, '')
    .replace(/\s+/g, ' ')
}

function submit() {
  if (!current.value || status.value !== 'idle') return
  if (!userInput.value.trim()) return
  const ok = normalize(userInput.value) === normalize(current.value.word)
  answered.value += 1
  status.value = ok ? 'correct' : 'wrong'
  if (ok) correctCount.value += 1
  store.recordAnswer(id, current.value.word, ok)
}

function skip() {
  if (!current.value || status.value !== 'idle') return
  answered.value += 1
  status.value = 'wrong'
  store.recordAnswer(id, current.value.word, false)
}

function next() {
  if (currentIndex.value + 1 >= queue.length) {
    finished.value = true
    return
  }
  currentIndex.value += 1
  userInput.value = ''
  status.value = 'idle'
  showHint.value = false
}

function restart() {
  buildQueue()
}

function switchMode() {
  router.push(`/practice/${id}/${mode === 'word' ? 'sentence' : 'word'}`)
}

const percent = computed(() =>
  queue.length ? Math.round(((currentIndex.value + (status.value !== 'idle' ? 1 : 0)) / queue.length) * 100) : 0
)

const resultMsg = computed(() => {
  const p = queue.length ? correctCount.value / queue.length : 0
  if (p === 1) return '完美通关！你就是单词小天才 🌟'
  if (p >= 0.8) return '超棒！只差一点点就全对啦 🍰'
  if (p >= 0.5) return '不错哦，继续加油会变更强 💪'
  return '没关系，多练几次就记住啦 🌈'
})

onMounted(buildQueue)
</script>

<template>
  <section v-if="category && current" class="practice pop-in" :style="{ '--deep': t.deep, '--soft': t.soft }">
    <RouterLink :to="`/category/${id}`" class="back">← 返回词库</RouterLink>

    <!-- 进度条 -->
    <div class="top-row">
      <span class="mode-tag">{{ mode === 'word' ? '🔤 单词填空' : '📝 语句填空' }}</span>
      <span class="prog-text">第 {{ Math.min(currentIndex + 1, queue.length) }} / {{ queue.length }} 题</span>
    </div>
    <div class="bar">
      <div class="bar-fill" :style="{ width: percent + '%' }"></div>
    </div>

    <!-- 题目卡片 -->
    <div class="q-card" :class="status">
      <!-- 单词填空模式 -->
      <template v-if="mode === 'word'">
        <div class="label">
          请根据释义写出英文单词：
          <button class="mini-speak" @click="speak(current.word)" title="听发音">🔊</button>
        </div>
        <div class="meaning">{{ current.meaning }}</div>
        <div class="phon">音标：{{ current.phonetic }}</div>
        <div v-if="showHint" class="hint">首字母提示：<b>{{ current.word[0].toUpperCase() }}</b>____（共 {{ current.word.length }} 个字母）</div>
      </template>

      <!-- 语句填空模式 -->
      <template v-else>
        <div class="label">
          根据句意，在横线处填入合适的单词：
          <button class="mini-speak" @click="speak(current.example)" title="听发音">🔊</button>
        </div>
        <div class="sentence">
          <template v-for="(part, i) in blankParts" :key="i">
            <span>{{ part }}</span>
            <span v-if="i < blankParts.length - 1" class="blank">____</span>
          </template>
        </div>
        <div class="phon">中文：{{ current.exampleCn }}</div>
      </template>

      <!-- 输入区 -->
      <div class="input-row" v-if="status === 'idle'">
        <input
          v-model="userInput"
          class="answer"
          type="text"
          autocomplete="off"
          :placeholder="mode === 'word' ? '输入英文单词…' : '填入横线处的单词…'"
          @keyup.enter="submit"
          ref="inp"
        />
        <button class="btn" @click="submit">提交</button>
      </div>

      <!-- 反馈区 -->
      <div v-else class="feedback" :class="status">
        <div class="fb-title">
          {{ status === 'correct' ? '🎉 答对了！' : '💡 再想想~' }}
        </div>
        <div class="fb-answer">
          正确答案：<b>{{ current.word }}</b>
          <span class="fb-phon">{{ current.phonetic }}</span>
        </div>
        <div class="fb-mean">{{ current.meaning }}</div>
        <div class="fb-ex">例句：{{ current.example }}</div>
      </div>

      <!-- 操作 -->
      <div class="ops">
        <button v-if="status === 'idle'" class="link-btn" @click="showHint = !showHint">💡 提示</button>
        <button v-if="status === 'idle'" class="link-btn" @click="skip">跳过此题</button>
        <button v-if="status !== 'idle'" class="btn" @click="next">
          {{ currentIndex + 1 >= queue.length ? '查看结果 🎀' : '下一题 →' }}
        </button>
      </div>
    </div>
  </section>

  <!-- 结算页 -->
  <section v-else-if="category && finished" class="result pop-in" :style="{ '--deep': t.deep, '--soft': t.soft }">
    <RouterLink :to="`/category/${id}`" class="back">← 返回词库</RouterLink>
    <div class="result-emoji">🎀</div>
    <h1 class="result-title">练习完成！</h1>
    <div class="score-ring" :style="{ background: t.grad }">
      <div class="score-num">{{ queue.length ? Math.round((correctCount / queue.length) * 100) : 0 }}%</div>
      <div class="score-sub">{{ correctCount }} / {{ queue.length }} 正确</div>
    </div>
    <p class="result-msg">{{ resultMsg }}</p>
    <div class="result-ops">
      <button class="btn" @click="restart">🔁 再来一次</button>
      <button class="btn btn-lav" @click="switchMode">🔄 换个练习</button>
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
  margin-bottom: 18px;
}
.bar-fill {
  height: 100%;
  border-radius: 999px;
  background: var(--deep);
  transition: width 0.4s ease;
}

.q-card {
  background: var(--soft);
  border-radius: var(--radius);
  padding: 26px 28px;
  box-shadow: var(--shadow);
  transition: box-shadow 0.2s ease;
}
.q-card.correct {
  box-shadow: 0 12px 34px rgba(94, 201, 160, 0.35);
}
.q-card.wrong {
  box-shadow: 0 12px 34px rgba(255, 155, 106, 0.32);
}
.label {
  color: var(--ink-soft);
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 10px;
}
.meaning {
  font-family: 'ZCOOL KuaiLe', sans-serif;
  font-size: 26px;
  color: var(--deep);
  margin-bottom: 8px;
}
.phon {
  color: var(--ink-soft);
  font-size: 14px;
  margin-top: 8px;
}
.mini-speak {
  background: #fff;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  font-size: 14px;
  box-shadow: var(--shadow-soft);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  margin-left: 8px;
  transition: transform 0.15s ease;
}
.mini-speak:hover {
  transform: scale(1.12);
}
.hint {
  margin-top: 12px;
  background: #fff;
  border-radius: 14px;
  padding: 10px 14px;
  font-size: 14px;
  color: var(--ink);
}
.sentence {
  font-size: 20px;
  line-height: 1.7;
  color: var(--ink);
  font-weight: 600;
}
.blank {
  display: inline-block;
  min-width: 70px;
  border-bottom: 3px dashed var(--deep);
  margin: 0 4px;
  text-align: center;
  color: var(--deep);
}

.input-row {
  display: flex;
  gap: 12px;
  margin-top: 22px;
}
.answer {
  flex: 1;
  border: 2px solid #fff;
  background: #fff;
  border-radius: 16px;
  padding: 14px 18px;
  font-size: 18px;
  color: var(--ink);
  box-shadow: var(--shadow-soft);
  transition: border-color 0.15s ease;
}
.answer:focus {
  border-color: var(--deep);
}

.feedback {
  margin-top: 20px;
  border-radius: 18px;
  padding: 16px 18px;
  background: #fff;
}
.feedback.correct {
  outline: 2px solid var(--mint-deep);
}
.feedback.wrong {
  outline: 2px solid var(--peach-deep);
}
.fb-title {
  font-family: 'ZCOOL KuaiLe', sans-serif;
  font-size: 22px;
}
.feedback.correct .fb-title {
  color: var(--mint-deep);
}
.feedback.wrong .fb-title {
  color: var(--peach-deep);
}
.fb-answer {
  margin-top: 8px;
  font-size: 17px;
  color: var(--ink);
}
.fb-phon {
  color: var(--ink-soft);
  font-size: 14px;
  margin-left: 8px;
}
.fb-mean {
  color: var(--ink);
  font-size: 14px;
  margin-top: 4px;
}
.fb-ex {
  color: var(--ink-soft);
  font-size: 13.5px;
  margin-top: 6px;
  font-style: italic;
}

.ops {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: 20px;
}
.link-btn {
  background: transparent;
  color: var(--deep);
  font-weight: 800;
  font-size: 14px;
  padding: 8px 4px;
}
.link-btn:hover {
  text-decoration: underline;
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
