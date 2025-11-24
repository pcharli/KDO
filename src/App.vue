<template>
  <div class="min-h-screen bg-gray-100">
    <header class="bg-white shadow p-4 flex justify-between items-center">
      <div class="left">
      <h1 class="text-xl font-bold">🎁 Wishlist Familiale</h1>
      <div v-if="userStore.currentUser">
        <span class="mr-4 font-medium">Bonjour, {{ userStore.currentUser.name }}</span>
        <button @click="logout" class="bg-red-500 text-white px-3 py-1 rounded">
          Déconnexion
        </button>
      </div>
      </div>

      <nav class="flex gap-4" v-if="userStore.currentUser">
        <router-link to="/">Souhaits</router-link>
        <router-link to="/reserved">Réservations</router-link>
      </nav>
    </header>

    <main class="p-4 max-w-4xl mx-auto">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { useUserStore } from './stores/userStore'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

const logout = () => {
  userStore.logout()
  router.push('/login')
}
</script>

<style>
/* Styles globaux optionnels */
</style>