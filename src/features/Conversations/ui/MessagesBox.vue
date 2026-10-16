<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'
import { getMessages } from '../lib/getMessages'
import { useConversationSocket } from '../lib/useConversationSocket'
import type { Message } from '../types/conversations'

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

const messages = ref<Message[]>([])
const currentUserId = ref<number | null>(null)
const typingText = ref<string | null>(null)
let typingTimer: ReturnType<typeof setTimeout> | null = null
const containerRef = ref<HTMLDivElement | null>(null)

function scrollToBottom() {
    nextTick(() => {
        if (containerRef.value) {
            containerRef.value.scrollTop = containerRef.value.scrollHeight
        }
    })
    setTimeout(() => {
        if (containerRef.value) {
            containerRef.value.scrollTop = containerRef.value.scrollHeight
        }
    }, 50)
}

function isNearBottom(): boolean {
    if (!containerRef.value) return true
    const { scrollTop, scrollHeight, clientHeight } = containerRef.value
    return scrollHeight - scrollTop - clientHeight < 150
}

useConversationSocket(id, {
    onNewMessage(newMessage) {
        if (!messages.value.some((m) => m.id === newMessage.id)) {
            messages.value.push(newMessage)
            scrollToBottom()
        }
    },
    onMessageDeleted(event) {
        messages.value = messages.value.filter((m) => m.id !== event.messageId)
    },
    onUserTyping(event) {
        // Ignore typing events from ourselves
        if (currentUserId.value && event.userId === currentUserId.value) {
            return
        }

        const shouldScroll = isNearBottom()
        typingText.value = 'Собеседник печатает...'
        if (shouldScroll) {
            scrollToBottom()
        }

        if (typingTimer) clearTimeout(typingTimer)
        typingTimer = setTimeout(() => {
            typingText.value = null
        }, 3000)
    }
})

onMounted(async () => {
    const rawId = localStorage.getItem('id')
    if (rawId && rawId !== '-1') {
        currentUserId.value = Number(rawId)
    }

    if (id.value > 0) {
        const response = await getMessages(id.value)
        // Backend returns messages descending (newest first).
        // Reverse them so the chat flows chronologically (oldest at top, newest at bottom).
        messages.value = (response.messages || []).slice().reverse()
        scrollToBottom()
    }
})
</script>

<template>
    <div
        ref="containerRef"
        class="bg-neutral-800 rounded-2xl flex flex-col gap-2 p-4 w-3xs md:w-2xl flex-1 min-h-0 overflow-y-auto"
    >
        <div v-if="messages.length > 0" class="mt-auto" />

        <div
            v-for="message in messages"
            :key="message.id"
            class="flex flex-col hover:bg-neutral-700/60 p-3 md:p-4 rounded-xl transition-colors"
        >
            <p class="text-sm font-semibold text-blue-400">
                {{ message.sender?.displayName || 'Пользователь' }}
            </p>
            <div class="flex flex-row items-baseline gap-4 mt-1">
                <p class="text-white wrap-break-word flex-1">{{ message.text }}</p>
                <p class="ml-auto text-xs text-neutral-400 whitespace-nowrap">
                    {{
                        new Date(message.createdAt)
                            .toLocaleString('ru-RU', {
                                day: '2-digit',
                                month: '2-digit',
                                year: '2-digit',
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: false,
                                timeZone: 'UTC'
                            })
                            .replace(',', '')
                    }}
                </p>
            </div>
        </div>

        <p v-if="messages.length === 0" class="text-neutral-400 text-center my-auto py-6">
            Нет сообщений
        </p>

        <p v-if="typingText" class="text-xs text-neutral-400 italic px-2 py-1 shrink-0 animate-pulse">
            {{ typingText }}
        </p>
    </div>
</template>
