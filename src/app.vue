<script setup lang="ts">
import { getMe } from './features/Auth'
import { onMounted } from 'vue'

onMounted(async () => {
  const me = await getMe()
  if (me.id !== -1) {
    localStorage.setItem("id", me.id.toString())
    localStorage.setItem("displayName", me.displayName)
  }
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
