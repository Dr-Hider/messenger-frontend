<script setup lang="ts">
import { ref, onMounted } from 'vue'
import CreateModal from './CreateModal.vue'
import { getMyConversations } from '../lib/getMyConversations'
import ConversationCard from './ConversationCard.vue'
import type { MyConversation } from '../types/conversations'

const showCreateModal = ref(false)
const data = ref<MyConversation[]>([])
const authenticated = ref(false)

onMounted(async () => {
    if (localStorage.getItem("id") !== "-1") {
        authenticated.value = true
    }
    await updateData()
})

function openCreateModal() {
    showCreateModal.value = true
}

function closeCreateModal() {
    showCreateModal.value = false
}

async function updateData() {
    data.value = (await getMyConversations()).conversations
}
</script>

<template>
    <section class="flex-1 min-h-0 overflow-y-auto flex flex-col items-center gap-5 p-4 w-full">
        <button v-if="authenticated"
        class="bg-white hover:bg-neutral-500 rounded-lg text-black p-1.5 md:p-2 cursor-pointer"
        type="button"
        @click="openCreateModal">Создать чат</button>

        <CreateModal v-if="showCreateModal"
        @modal-closed="closeCreateModal" @created="updateData"/>

        <ConversationCard v-if="data.length > 0"
        v-for="item in data"
        :key="item.conversationId"
        :conversationId="item.conversationId"
        :lastMessage="item.lastMessage"
        :unreadCount="item.unreadCount" />

        <p v-else-if="authenticated"
        class="text-neutral-400 text-5xl text-center">Сообщения не найдены</p>

        <p v-else
        class="text-neutral-400 text-5xl text-center">
            Авторизируйтесь<br>
            для использования<br>
            мессенджера
        </p>
    </section>
</template>
