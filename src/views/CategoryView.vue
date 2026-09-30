<script setup>
import { computed } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { useVocabStore } from '@/stores/vocab'
import { useSpeak } from '@/composables/useSpeak'

const route = useRoute()
const router = useRouter()
const store = useVocabStore()
const { speak } = useSpeak()

const id = route.params.id
const category = computed(() => store.getCategory(id))
const words = computed(() => store.getWords(id))

const theme = {
  pink: { deep: '#ff85a1', soft: '#fff0f5', grad: 'linear-gradient(135deg,#ffd1dc,#ffb3c8)' },
  mint: { deep: '#5ec9a0', soft: '#eafaf2', grad: 'linear-gradient(135deg,#c7f0db,#9fe8c6)' },
  lavender: { deep: '#9b7ede', soft: '#f4eeff', grad: 'linear-gradient(135deg,#e3d4ff,#c9b3ff)' },
  lemon: { deep: '#f0b429', soft: '#fffaf0', grad: 'linear-gradient(135deg,#fff3bf,#ffe69c)' },
  peach: { deep: '#ff9b6a', soft: '#fff1ea', grad: 'linear-gradient(135deg,#ffdcc4,#ffb589)' }
}
const t = computed(() => theme[category.value?.color] || theme.pink)

function startPractice(mode) {
  router.push(`/practice/${id}/${mode}`)
}

function goStudy(word) {
  // 点击单词跳转到学习卡片，并把该词作为首个展示（query.word）
  router.push({ path: `/study/${id}`, query: { word } })
}

function learned(word) {
  const rec = store.progress[id]?.[word.word]
  return !!(rec && rec.learned)
}
</script>

<template>
  <section v-if="category" class="cat-view pop-in">
    <RouterLink to="/" class="back">← 返回首页</RouterLink>

    <div class="head" :style="{ background: t.grad, '--deep': t.deep }">
      <span class="head-emoji">{{ category.emoji }}</span>
      <div>
        <h1 class="head-name">{{ category.name }}</h1>
        <p class="head-desc">{{ category.desc }}</p>
      </div>
    </div>

    <div class="actions">
      <button class="btn btn-mint" @click="startPractice('word')">🔤 单词填空</button>
      <button class="btn btn-lav" @click="startPractice('sentence')">📝 语句填空</button>
      <RouterLink :to="`/study/${id}`" class="btn btn-peach">📖 学习卡片</RouterLink>
      <span class="count">共 {{ words.length }} 个单词 · 已掌握 {{ store.categoryProgress(id).learned }}</span>
    </div>

    <div class="word-list">
      <div
        v-for="w in words"
        :key="w.word"
        class="word-item pop-in"
        :class="{ done: learned(w) }"
        :style="{ '--soft': t.soft, '--deep': t.deep }"
        @click="goStudy(w.word)"
        role="button"
        tabindex="0"
        @keyup.enter="goStudy(w.word)"
      >
        <div class="wi-left">
          <div class="wi-word-row">
            <span class="wi-word">{{ w.word }}</span>
            <button class="mini-speak" @click.stop="speak(w.word)" title="听发音">🔊</button>
          </div>
          <div class="wi-phon">{{ w.phonetic }}</div>
          <div class="wi-mean">{{ w.meaning }}</div>
        </div>
        <div class="wi-right">
          <span v-if="learned(w)" class="badge">已掌握 ✓</span>
          <span v-else class="badge dim">学习中</span>
        </div>
      </div>
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
.head {
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 24px 26px;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
}
.head-emoji {
  font-size: 52px;
  filter: drop-shadow(0 3px 3px rgba(0, 0, 0, 0.08));
}
.head-name {
  font-size: 30px;
  color: var(--deep);
}
.head-desc {
  margin: 6px 0 0;
  color: #6b5b73;
  font-size: 14px;
}

.actions {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
  margin: 22px 0 20px;
}
.count {
  color: var(--ink-soft);
  font-size: 13.5px;
  font-weight: 700;
}

.word-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
}
.word-item {
  background: var(--soft);
  border-radius: 20px;
  padding: 16px 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: var(--shadow-soft);
  transition: transform 0.15s ease;
  cursor: pointer;
}
.word-item:active {
  transform: scale(0.98);
}
.word-item:hover {
  transform: translateY(-3px);
}
.word-item.done {
  outline: 2px dashed var(--deep);
  outline-offset: -5px;
}
.wi-word {
  font-family: 'Baloo 2', sans-serif;
  font-weight: 700;
  font-size: 19px;
  color: var(--deep);
}
.wi-word-row {
  display: flex;
  align-items: center;
  gap: 8px;
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
  transition: transform 0.15s ease;
}
.mini-speak:hover {
  transform: scale(1.12);
}
.wi-phon {
  color: var(--ink-soft);
  font-size: 13px;
  margin: 2px 0 6px;
}
.wi-mean {
  font-size: 13.5px;
  color: var(--ink);
}
.badge {
  background: #fff;
  color: var(--deep);
  font-size: 12px;
  font-weight: 800;
  padding: 5px 12px;
  border-radius: 999px;
  white-space: nowrap;
}
.badge.dim {
  color: var(--ink-soft);
}

.empty {
  text-align: center;
  padding: 60px 0;
}

@media (max-width: 620px) {
  .word-list {
    grid-template-columns: 1fr;
  }
}
</style>
