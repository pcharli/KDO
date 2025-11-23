import { defineStore } from 'pinia'

const BASE = 'https://ingrwf12-default-rtdb.europe-west1.firebasedatabase.app/kdo/'

export const useUserStore = defineStore('user', {
  state: () => ({
    currentUser: null,
    users: {} // liste complète des utilisateurs
  }),

  actions: {
    async fetchUsers() {
      const res = await fetch(BASE + 'users.json')
      const json = await res.json()

      // Si json est null → on force un objet vide
      this.users = json && typeof json === 'object' ? json : {}
    },

    async login(name, passcode) {
      // Chargement de la liste des users
      await this.fetchUsers()

      const data = this.users

      // Rechercher si l'utilisateur existe
      let existingUser = null
      for (const key in data) {
        const u = data[key]
        if (u.name === name && u.passcode === passcode) {
          existingUser = { id: key, ...u }
          break
        }
      }

      // Si l’utilisateur n'existe pas → on le crée
      if (!existingUser) {
        const newUser = { name, passcode }
        const postRes = await fetch(BASE + 'users.json', {
          method: 'POST',
          body: JSON.stringify(newUser),
          headers: { 'Content-Type': 'application/json' }
        })

        const postData = await postRes.json()

        existingUser = { id: postData.name, ...newUser }

        // Mise à jour locale
        this.users[existingUser.id] = newUser
      }

      // Connexion
      this.currentUser = existingUser
    },

    logout() {
      this.currentUser = null
    }
  }
})
