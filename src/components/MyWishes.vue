<template>
  <ul class="space-y-2">
    <li v-for="(w, id) in wishes" :key="id" class="p-3 border rounded flex justify-between items-center">
      <div>
        <b>{{ w.title }}</b><br>
        <span class="text-gray-600 text-sm">{{ w.description }}</span>
        <div v-if="w.link" class="text-blue-500 text-sm"><a :href="w.link" target="_blank">Lien</a></div>
      </div>

      <!-- update btn-->
       <button
  v-if="!w.reservedBy"
  @click="$emit('edit', w)"
  class="bg-blue-500 text-white px-2 py-1 rounded text-sm mr-2"
>
  Modifier
</button>

      <!-- Si le souhait n'est pas réservé -->
<button
  v-if="!w.reservedBy"
  @click="$emit('delete-wish', w.id)"
  class="bg-red-500 text-white px-2 py-1 rounded text-sm"
>
  Supprimer
</button>

<!-- Si réservé et que ce n'est pas un admin -->
<span v-else class="text-gray-500 text-sm italic">
  Ce souhait est réservé — suppression impossible
</span>
    </li>
  </ul>
</template>

<script setup>
defineProps({
  wishes: Object
})
</script>

<style>
/* Styles optionnels */
</style>
