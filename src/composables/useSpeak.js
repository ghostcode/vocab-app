// 语音朗读 composable —— 基于浏览器原生 Web Speech API
// 让背单词时可以听到真人发音，帮助记忆。

export function useSpeak() {
  const supported =
    typeof window !== 'undefined' && 'speechSynthesis' in window

  // 朗读英文文本；opts: { lang, rate, pitch }
  function speak(text, opts = {}) {
    if (!supported || !text) return
    try {
      window.speechSynthesis.cancel() // 停止上一条，避免堆叠
      const u = new SpeechSynthesisUtterance(text)
      u.lang = opts.lang || 'en-US'
      u.rate = opts.rate ?? 0.92
      u.pitch = opts.pitch ?? 1
      // 尽量挑选英文语音
      const voices = window.speechSynthesis.getVoices()
      const en = voices.find((v) => /^en/i.test(v.lang))
      if (en) u.voice = en
      window.speechSynthesis.speak(u)
    } catch (e) {
      /* 部分环境不支持，静默降级 */
    }
  }

  return { speak, supported }
}
