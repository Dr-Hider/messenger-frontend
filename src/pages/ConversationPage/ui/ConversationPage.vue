<script setup lang="ts">
import { ref, computed } from 'vue'
import { MessagesBox, sendMessage, useConversationSocket } from '~/features/Conversations'

const route = useRoute()
const props = defineProps<{
    conversationId?: number
}>()

const parsedId = Number(route.params.id)
const id = computed(() => {
    if (props.conversationId && props.conversationId > 0) {
        return props.conversationId
    }
    return Number.isSafeInteger(parsedId) && parsedId > 0 ? parsedId : -1
})

const messageText = ref('')
const isSending = ref(false)

const { sendTyping } = useConversationSocket(id)

let lastTypingTime = 0
function handleTyping() {
    const now = Date.now()
    // Throttle typing event to at most once every 2 seconds
    if (now - lastTypingTime > 2000) {
        lastTypingTime = now
        sendTyping()
    }
}

async function handleSend() {
    const text = messageText.value.trim()
    if (!text || isSending.value || id.value <= 0) return

    isSending.value = true
    try {
        const ok = await sendMessage(id.value, text)
        if (ok) {
            messageText.value = ''
        }
    } finally {
        isSending.value = false
    }
}
</script>

<template>
    <main class="flex-1 min-h-0 flex flex-col items-center p-4 overflow-hidden w-full">
        <MessagesBox :conversationId="id" />
        <div class="shrink-0 flex flex-row w-3xs md:w-2xl gap-2 mt-3 pb-1">
            <input
                v-model="messageText"
                class="flex-1 border border-neutral-700 bg-neutral-900 text-white rounded-xl p-2.5 focus:outline-none focus:border-blue-500"
                type="text"
                placeholder="Сообщение..."
                :disabled="isSending"
                @input="handleTyping"
                @keydown.enter="handleSend"
            >
            <button
                class="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium px-4 py-2 rounded-xl transition-colors cursor-pointer"
                type="button"
                :disabled="isSending || !messageText.trim()"
                @click="handleSend"
            >
                {{ isSending ? '...' : 'Отпр.' }}
            </button>
        </div>
    </main>
</template>
