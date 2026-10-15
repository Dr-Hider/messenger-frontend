<script setup lang="ts">
const route = useRoute()

const parsedId = Number(route.params.id)
const id = Number.isSafeInteger(parsedId) && parsedId > 0 ? parsedId : -1
</script>

<template>
    <p>ABOBA NUMBER {{ id }}</p>
</template>
