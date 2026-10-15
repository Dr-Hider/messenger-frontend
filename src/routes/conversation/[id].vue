<script setup lang="ts">
import { ConversationPage } from '~/pages/ConversationPage'

const route = useRoute()
const parsedId = Number(route.params.id)

const id = Number.isSafeInteger(parsedId) && parsedId > 0 ? parsedId : -1
</script>

<template>
    <ConversationPage
    :conversationId="id" />
</template>
