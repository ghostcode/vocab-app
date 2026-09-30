import { defineStore } from 'pinia'
import { categories, wordData } from '@/data/words'

const STORAGE_KEY = 'macaron-vocab-progress'

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch (e) {
    return {}
  }
}

export const useVocabStore = defineStore('vocab', {
  state: () => ({
    categories,
    wordData,
    progress: loadProgress() // { [categoryId]: { [word]: { correct, wrong, learned } } }
  }),
  getters: {
    getCategory: (state) => (id) => state.categories.find((c) => c.id === id),
    getWords: (state) => (id) => state.wordData[id] || [],
    categoryProgress(state) {
      return (id) => {
        const list = state.wordData[id] || []
        const rec = state.progress[id] || {}
        const learned = list.filter((w) => rec[w.word] && rec[w.word].learned).length
        return {
          total: list.length,
          learned,
          percent: list.length ? Math.round((learned / list.length) * 100) : 0
        }
      }
    }
  },
  actions: {
    recordAnswer(categoryId, word, isCorrect) {
      if (!this.progress[categoryId]) this.progress[categoryId] = {}
      const rec = this.progress[categoryId][word] || { correct: 0, wrong: 0, learned: false }
      if (isCorrect) {
        rec.correct += 1
        if (rec.correct >= 2) rec.learned = true
      } else {
        rec.wrong += 1
        rec.learned = false
      }
      this.progress[categoryId][word] = rec
      this.persist()
    },
    persist() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.progress))
      } catch (e) {
        /* ignore */
      }
    },
    resetCategory(categoryId) {
      if (this.progress[categoryId]) {
        delete this.progress[categoryId]
        this.persist()
      }
    }
  }
})
