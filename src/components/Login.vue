<template>
  <div class="max-w-md mx-auto mt-20 bg-white shadow rounded-xl p-6">
    <h1 class="text-2xl font-bold mb-6 text-center">Connexion</h1>

    <div class="mb-4">
      <label class="block mb-1">Prénom</label>
      <input v-model="name" class="w-full border p-2 rounded" />
    </div>

    <div class="mb-4">
      <label class="block mb-1">Passcode</label>
      <input type="password" v-model="passcode" class="w-full border p-2 rounded" />
    </div>

    <button @click="submitLogin" class="w-full bg-blue-600 text-white py-2 rounded">Se connecter</button>

    <p v-if="error" class="text-red-500 mt-2 text-center">{{ error }}</p>
    <p>Pas encore de compte ? Créez-le en saisissant un login et mot de passe maintenant !</p>
  </div>
  
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '../stores/userStore'
import { useRouter } from 'vue-router'

const name = ref('')
const passcode = ref('')
const error = ref('')

const userStore = useUserStore()
const router = useRouter()

const submitLogin = async () => {
  if (!name.value || !passcode.value) {
    error.value = 'Veuillez remplir tous les champs.'
    return
  }

  try {
    await userStore.login(name.value, passcode.value)
    error.value = ''
    router.push('/') // ⬅️ Redirection après login
  } catch (e) {
    console.error(e)
    error.value = 'Erreur lors de la connexion.'
  }
}
</script>

<style>
/* optionnel */
</style>