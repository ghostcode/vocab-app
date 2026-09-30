<script setup>
import { RouterLink } from 'vue-router'
import { useVocabStore } from '@/stores/vocab'

const store = useVocabStore()

const theme = {
  pink: { grad: 'linear-gradient(135deg,#ffd1dc,#ffb3c8)', deep: '#ff85a1', soft: '#fff0f5' },
  mint: { grad: 'linear-gradient(135deg,#c7f0db,#9fe8c6)', deep: '#5ec9a0', soft: '#eafaf2' },
  lavender: { grad: 'linear-gradient(135deg,#e3d4ff,#c9b3ff)', deep: '#9b7ede', soft: '#f4eeff' },
  lemon: { grad: 'linear-gradient(135deg,#fff3bf,#ffe69c)', deep: '#f0b429', soft: '#fffaf0' }
}

function cardStyle(c) {
  const t = theme[c.color]
  return {
    background: t.grad,
    '--deep': t.deep,
    '--soft': t.soft
  }
}
</script>

<template>
  <section class="home pop-in">
    <div class="hero">
      <div class="hero-title">
        <span class="spark">✨</span>
        挑一个词库，开始今天的甜甜背诵
        <span class="spark">✨</span>
      </div>
      <p class="hero-sub">四级 · 六级 · 托福 · 雅思，四种口味随你选 🍬</p>
    </div>

    <div class="card-grid">
      <RouterLink
        v-for="c in store.categories"
        :key="c.id"
        :to="`/category/${c.id}`"
        class="cat-card pop-in"
        :style="cardStyle(c)"
      >
        <div class="cat-top">
          <span class="cat-emoji">{{ c.emoji }}</span>
          <span class="cat-progress-pill">
            已掌握 {{ store.categoryProgress(c.id).learned }}/{{ store.categoryProgress(c.id).total }}
          </span>
        </div>
        <h2 class="cat-short">{{ c.short }}</h2>
        <div class="cat-name">{{ c.name }}</div>
        <p class="cat-desc">{{ c.desc }}</p>

        <div class="bar">
          <div class="bar-fill" :style="{ width: store.categoryProgress(c.id).percent + '%' }"></div>
        </div>
        <div class="cat-go">进入词库 →</div>
      </RouterLink>
    </div>
  </section>
</template>

<style scoped>
.hero {
  text-align: center;
  margin: 8px 0 30px;
}
.hero-title {
  font-family: 'ZCOOL KuaiLe', sans-serif;
  font-size: 28px;
  color: var(--ink);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
}
.spark {
  font-size: 22px;
}
.hero-sub {
  margin-top: 10px;
  color: var(--ink-soft);
  font-size: 15px;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 22px;
}
.cat-card {
  text-decoration: none;
  color: var(--ink);
  border-radius: var(--radius);
  padding: 22px 24px 18px;
  box-shadow: var(--shadow);
  position: relative;
  overflow: hidden;
  transition: transform 0.18s ease, box-shadow 0.18s ease;
  display: flex;
  flex-direction: column;
  min-height: 188px;
}
.cat-card::after {
  content: '';
  position: absolute;
  right: -30px;
  bottom: -30px;
  width: 110px;
  height: 110px;
  background: rgba(255, 255, 255, 0.4);
  border-radius: 50%;
}
.cat-card:hover {
  transform: translateY(-6px) rotate(-0.6deg);
  box-shadow: 0 16px 36px rgba(255, 145, 180, 0.28);
}
.cat-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 6px;
}
.cat-emoji {
  font-size: 38px;
  filter: drop-shadow(0 3px 3px rgba(0, 0, 0, 0.08));
}
.cat-progress-pill {
  background: rgba(255, 255, 255, 0.75);
  color: var(--deep);
  font-size: 12px;
  font-weight: 700;
  padding: 4px 12px;
  border-radius: 999px;
}
.cat-short {
  font-family: 'ZCOOL KuaiLe', sans-serif;
  font-size: 40px;
  color: var(--deep);
  margin: 4px 0 2px;
  line-height: 1;
}
.cat-name {
  font-weight: 800;
  font-size: 15px;
  color: var(--deep);
}
.cat-desc {
  margin: 10px 0 14px;
  font-size: 13.5px;
  color: #6b5b73;
  opacity: 0.85;
  z-index: 1;
}
.bar {
  height: 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.6);
  overflow: hidden;
}
.bar-fill {
  height: 100%;
  border-radius: 999px;
  background: var(--deep);
  transition: width 0.5s ease;
}
.cat-go {
  margin-top: 12px;
  font-weight: 800;
  color: var(--deep);
  font-size: 14px;
  z-index: 1;
}

@media (max-width: 620px) {
  .card-grid {
    grid-template-columns: 1fr;
  }
  .hero-title {
    font-size: 22px;
  }
}
</style>
