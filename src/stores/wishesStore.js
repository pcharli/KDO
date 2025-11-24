import { defineStore } from 'pinia'
import { useUserStore } from './userStore'

const API_BASE = 'https://ingrwf12-default-rtdb.europe-west1.firebasedatabase.app/kdo'

export const useWishesStore = defineStore('wishesStore', {
  state: () => ({
    wishes: {}
  }),

  actions: {
    async loadWishes() {
      const res = await fetch(`${API_BASE}/wishes.json`)
      const data = await res.json() || {}
      this.wishes = data
    },

    async addWish(wish) {
      const userStore = useUserStore()
      if (!userStore.currentUser) return

      const body = {
        ...wish,
        userId: userStore.currentUser.id,
        reservedBy: null
      }

      await fetch(`${API_BASE}/wishes.json`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' }
      })

      await this.loadWishes()
    },

    async deleteWish(id) {
      await fetch(`${API_BASE}/wishes/${id}.json`, { method: 'DELETE' })
      await this.loadWishes()
    },

    async reserveWish(id) {
      const userStore = useUserStore()
      if (!userStore.currentUser) return

      // PATCH sur le souhait existant pour mettre reservedBy
      if (!this.wishes[id]) return

      await fetch(`${API_BASE}/wishes/${id}.json`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reservedBy: userStore.currentUser.id })
      })

      await this.loadWishes()
    },

    async unreserveWish(id) {
      if (!this.wishes[id]) return

      await fetch(`${API_BASE}/wishes/${id}.json`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reservedBy: null })
      })

      await this.loadWishes()
    },

 async updateWish(id, updatedData) {
  if (!this.wishes[id]) {
    await this.loadWishes()
    if (!this.wishes[id]) {
      console.error("updateWish : id inexistant", id)
      return
    }
  }

  await fetch(`${API_BASE}/wishes/${id}.json`, {
    method: "PATCH",
    body: JSON.stringify(updatedData)
  })

  this.wishes[id] = { ...this.wishes[id], ...updatedData }
}


  }
})