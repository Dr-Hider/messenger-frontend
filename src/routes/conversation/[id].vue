<script setup lang="ts">
import { ConversationPage } from '~/pages/ConversationPage'
import { getConversation } from '~/features/Conversations'

const route = useRoute()
const parsedId = Number(route.params.id)

const id = Number.isSafeInteger(parsedId) && parsedId > 0 ? parsedId : -1

const title = (await getConversation(id)).title

useHead({
    title: `MIN — ${title}`
})
</script>

<template>
    <ConversationPage
    :conversationId="id" />
</template>
