<template>
  <div>
    <h2 class="text-xl font-bold mb-4">Mes réservations</h2>

    <div v-if="reserved.length === 0" class="text-gray-500">
      Vous n'avez réservé aucun souhait.
    </div>

    <ul>
      <li
        v-for="w in reserved"
        :key="w.id"
        class="p-3 border rounded mb-2 flex flex-col gap-2"
      >
        <div class="flex justify-between items-center">
          <div>
            <b>{{ w.title }}</b> <span class="text-gray-500 text-sm">(pour {{ w.userName }})</span>
          </div>

          <button
            @click="unreserve(w.id)"
            class="bg-red-500 text-white px-2 py-1 rounded text-sm"
          >
            Annuler
          </button>
        </div>

        <div class="text-gray-600 text-sm">{{ w.description }}</div>

        <div v-if="w.link" class="text-blue-500 text-sm">
          <a :href="w.link" target="_blank">Lien</a>
        </div>

        <div class="flex items-center gap-2">
          <label class="text-sm">Prix:</label>
          <input
            type="number"
            min="0"
            v-model.number="w.price"
            @change="updatePrice(w)"
            class="border rounded p-1 w-24"
          /> €
        </div>
      </li>
    </ul>

    <div class="mt-4 font-bold text-lg">
      Coût total : {{ totalPrice }} €
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useWishesStore } from '../stores/wishesStore'
import { useUserStore } from '../stores/userStore'

const wishesStore = useWishesStore()
const userStore = useUserStore()

// Liste de mes réservations
const reserved = computed(() => {
  if (!userStore.currentUser || !wishesStore.wishes) return []
  return Object.entries(wishesStore.wishes)
    .filter(([id, w]) => w.reservedBy === userStore.currentUser.id)
    .map(([id, w]) => ({
      id,
      ...w,
      userName: userStore.users[w.userId]?.name || "Personne inconnue",
      price: w.price || 0
    }))
})

// Somme totale des prix
const totalPrice = computed(() => {
  return reserved.value.reduce((sum, w) => sum + (w.price || 0), 0)
})

// Annuler réservation
const unreserve = async (id) => {
  await wishesStore.unreserveWish(id)
}

// Mettre à jour le prix dans le store et Firebase
const updatePrice = async (wish) => {
  await wishesStore.updateWish(wish.id, { price: wish.price })
}
</script>
