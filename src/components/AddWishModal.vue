<template>
  <div class="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
    <div class="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
      <h2 class="text-xl font-bold mb-4">Ajouter un souhait</h2>

      <div class="mb-3">
        <label class="block mb-1 font-medium">Titre</label>
        <input v-model="title" class="w-full border p-2 rounded" />
      </div>

      <div class="mb-3">
        <label class="block mb-1 font-medium">Description</label>
        <textarea v-model="description" class="w-full border p-2 rounded"></textarea>
      </div>

      <div class="mb-3">
        <label class="block mb-1 font-medium">Lien (optionnel)</label>
        <input v-model="link" class="w-full border p-2 rounded" />
      </div>

      <div class="flex justify-end space-x-2 mt-4">
        <button @click="$emit('close')" class="px-3 py-1 rounded border">Annuler</button>
        <button @click="send" class="px-3 py-1 rounded bg-green-600 text-white">Ajouter</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['close', 'add'])

const title = ref('')
const description = ref('')
const link = ref('')

const send = () => {
  if (!title.value) return

  emit('add', {
    title: title.value,
    description: description.value,
    link: link.value
  })
}
</script>

<style>
/* optionnel */
</style>