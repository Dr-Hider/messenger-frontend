<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Message } from '../types/conversations'
import { getConversation } from '../lib/getConversation'

interface Props {
    conversationId: number
    lastMessage: Message
    unreadCount: number
}

const props = defineProps<Props>()

const title = ref('')
const lastMessageSender = ref('')
const lastMessageText = ref('')
const lastMessageCreatedAt = ref('')
const unreadCount = ref(props.unreadCount)

onMounted(async () => {
    const data = await getConversation(props.conversationId)
    title.value = data.title
    if (props.lastMessage.text === "no messages yet") {
        lastMessageText.value = "Нет сообщений"
    }
    else {
        lastMessageText.value = props.lastMessage.text
        lastMessageSender.value = props.lastMessage.sender.displayName
        lastMessageCreatedAt.value = props.lastMessage.createdAt
    }
})

function openConversation(id: number) {
    navigateTo(`/conversation/${id}`)
}
</script>

<template>
    <div class="flex flex-col bg-neutral-800 hover:bg-neutral-700 rounded-2xl w-3xs md:w-2xl p-5 cursor-pointer"
    @click="openConversation(conversationId)">
        <p><b>{{ title }}</b></p>
        <div v-if="lastMessageText === 'Нет сообщений'" class="flex flex-row">
            <p>{{ lastMessageText }}</p>
        </div>
        <div v-else class="flex flex-row gap-2">
            <p>{{ lastMessageSender }}:</p>
            <p>{{ lastMessageText }}</p>
            <p class="ml-auto"><b>{{ unreadCount }}</b></p>
        </div>
    </div>
</template>
