<template>
  <div v-if="modelValue" class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
    <div class="bg-white p-6 rounded shadow w-96">
      <h2 class="text-lg font-bold mb-4">Modifier ce souhait</h2>

      <form @submit.prevent="save">
        <input
          v-model="form.title"
          placeholder="Titre"
          class="w-full border rounded p-2 mb-2"
          required
        />

        <textarea
          v-model="form.description"
          placeholder="Description"
          class="w-full border rounded p-2 mb-2"
        ></textarea>

        <input
          v-model="form.link"
          placeholder="Lien (facultatif)"
          class="w-full border rounded p-2 mb-4"
        />

        <div class="flex justify-end gap-2">
          <button @click="close" type="button" class="px-3 py-1 rounded bg-gray-300">
            Annuler
          </button>
          <button type="submit" class="px-3 py-1 rounded bg-blue-600 text-white">
            Enregistrer
          </button>
        </div>
      </form>

    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue"

const props = defineProps({
  modelValue: Boolean,
  wish: Object
})

const emits = defineEmits(["update:modelValue", "save"])

const form = ref({
  title: "",
  description: "",
  link: ""
})

watch(
  () => props.wish,
  (w) => {
    if (w) form.value = { ...w }
  },
  { immediate: true }
)

function close() {
  emits("update:modelValue", false)
}

function save() {
  emits("save", form.value)
  close()
}
</script>
