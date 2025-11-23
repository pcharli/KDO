<template>
  <div>
    <!-- Mes souhaits -->
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-bold">Mes souhaits</h2>
      <button v-if="!showModal" @click="showModal = true" class="bg-green-600 text-white px-3 py-1 rounded">Ajouter</button>
    </div>

     <!-- Modale ajout -->
    <AddWishModal v-if="showModal" @close="showModal = false" @add="addWish" />

    <MyWishes :wishes="myWishes" @delete-wish="deleteWish" />

    <!-- Souhaits des autres -->
    <h2 class="text-xl font-bold mt-6 mb-2">Souhaits des autres</h2>
    <AllWishes :wishes="otherWishes" @reserve="reserveWish" @unreserve="unreserveWish" />

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useWishesStore } from '../stores/wishesStore'
import { useUserStore } from '../stores/userStore'

import MyWishes from './MyWishes.vue'
import AllWishes from './AllWishes.vue'
import AddWishModal from './AddWishModal.vue'

const showModal = ref(false)
const wishesStore = useWishesStore()
const userStore = useUserStore()

onMounted(() => {
  wishesStore.loadWishes()
})

// Mes souhaits (array pour réactivité)
const myWishes = computed(() => {
  if (!userStore.currentUser) return []
  return Object.entries(wishesStore.wishes)
    .filter(([id, w]) => w.userId === userStore.currentUser.id)
    .map(([id, w]) => ({ id, ...w }))
})

// Souhaits des autres
const otherWishes = computed(() => {
  if (!userStore.currentUser) return []
  return Object.entries(wishesStore.wishes)
    .filter(([id, w]) => w.userId !== userStore.currentUser.id)
    .map(([id, w]) => ({ id, ...w }))
})

const addWish = async (wish) => {
  await wishesStore.addWish(wish)
  showModal.value = false
}

const deleteWish = async (id) => {
  await wishesStore.deleteWish(id)
}

const reserveWish = async (id) => {
  await wishesStore.reserveWish(id)
}

const unreserveWish = async (id) => {
  await wishesStore.unreserveWish(id)
}
</script>

<style>
/* Styles optionnels */
</style>
