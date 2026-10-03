<script setup lang="ts">
import { ref, onMounted } from 'vue'
import CreateModal from './CreateModal.vue'
import { getConversations } from '../lib/getConversations'

const showCreateModal = ref(false)

function openCreateModal() {
    showCreateModal.value = true
}

function closeCreateModal() {
    showCreateModal.value = false
}

onMounted(async () => {
    getConversations()
})
</script>

<template>
    <section>
        <button class="bg-white hover:bg-neutral-500 rounded-lg text-black p-1.5 md:p-2 cursor-pointer"
        type="button"
        @click="openCreateModal">Создать чат</button>
        <CreateModal v-if="showCreateModal"
        @modal-closed="closeCreateModal"/>
    </section>
</template>