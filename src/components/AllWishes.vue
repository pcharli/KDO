<template>
  <div>
    <details v-for="(userWishes, userId) in groupedWishes" :key="userId" class="mb-4 border rounded p-2 bg-gray-50">
      <summary class="cursor-pointer font-bold">
        {{ userNames[userId] || 'Personne inconnue' }} ({{ userWishes.length }} souhait{{ userWishes.length > 1 ? 's' : '' }})
      </summary>
      <div class="mt-2 space-y-2">
        <div v-for="wish in userWishes" :key="wish.id" class="flex justify-between items-center border p-2 rounded bg-white">
          <div>
            <b>{{ wish.title }}</b><br>
            <span class="text-gray-600 text-sm">{{ wish.description }}</span>
            <div v-if="wish.link" class="text-blue-500 text-sm"><a :href="wish.link" target="_blank">Lien</a></div>
          </div>
          <div>
            <!-- Logique de réservation / annulation sécurisée -->
            <button v-if="!wish.reservedBy"
                    @click="$emit('reserve', wish.id)"
                    class="text-sm bg-blue-500 text-white px-2 py-1 rounded">
              Réserver
            </button>
            <button v-else-if="wish.reservedBy === currentUserId || isAdmin"
                    @click="$emit('unreserve', wish.id)"
                    class="text-sm bg-gray-500 text-white px-2 py-1 rounded">
              Annuler la réservation
            </button>
            <span v-else class="text-red-600 text-sm">Réservé</span>
          </div>
        </div>
      </div>
    </details>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useUserStore } from '../stores/userStore'

const props = defineProps({ wishes: Object })
const userStore = useUserStore()

const currentUserId = userStore.currentUser?.id
const isAdmin = userStore.currentUser?.isAdmin

// Transforme en tableau réactif
const wishesArray = computed(() => {
  return Object.entries(props.wishes || {}).map(([id, w]) => ({ id, ...w }))
})

// Grouper par userId
const groupedWishes = computed(() => {
  const map = {}
  wishesArray.value.forEach(w => {
    if (!map[w.userId]) map[w.userId] = []
    map[w.userId].push(w)
  })
  return map
})

// Crée une map userId -> nom
const userNames = computed(() => {
  const map = {}
  for (const id in userStore.users) {
    map[id] = userStore.users[id].name
  }
  return map
})
</script>