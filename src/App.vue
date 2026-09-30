<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="app-shell">
    <header class="top-bar">
      <RouterLink to="/" class="brand">
        <span class="brand-logo">🍬</span>
        <span class="brand-name">糖豆背单词</span>
      </RouterLink>
      <RouterLink to="/" class="nav-link">首页</RouterLink>
    </header>

    <main class="page-wrap">
      <RouterView />
    </main>

    <footer class="foot">
      <span>用 ❤ 与马卡龙配色做出来的小单词本</span>
    </footer>
  </div>
</template>

<style scoped>
.app-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.top-bar {
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 14px 28px;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(8px);
  border-bottom: 2px solid #ffe3ec;
  position: sticky;
  top: 0;
  z-index: 20;
}
.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  margin-right: auto;
}
.brand-logo {
  font-size: 26px;
  filter: drop-shadow(0 2px 2px rgba(255, 150, 180, 0.4));
}
.brand-name {
  font-family: 'ZCOOL KuaiLe', 'Baloo 2', sans-serif;
  font-size: 22px;
  color: #ff85a1;
}
.nav-link {
  font-family: 'ZCOOL KuaiLe', sans-serif;
  font-size: 16px;
  color: #9b7ede;
  text-decoration: none;
  padding: 6px 16px;
  border-radius: 999px;
  background: #f3ecff;
  transition: transform 0.15s ease, background 0.15s ease;
}
.nav-link:hover {
  transform: translateY(-2px);
  background: #e7dbff;
}
.page-wrap {
  flex: 1;
  width: 100%;
  max-width: 980px;
  margin: 0 auto;
  padding: 28px 20px 48px;
  box-sizing: border-box;
}
.foot {
  text-align: center;
  padding: 18px;
  font-size: 13px;
  color: #c9a6c4;
  font-family: 'ZCOOL KuaiLe', sans-serif;
}
</style>
