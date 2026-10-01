<script setup lang="ts">
import { ref } from 'vue'
import Modal from './Modal.vue'

const showModal = ref(false)

function open() {
    showModal.value = true
}

function close() {
    showModal.value = false
}
</script>

<template>
    <button class="bg-white rounded-lg text-black p-2 m-6 ml-auto cursor-pointer"
    type="button"
    @click="open">Войти</button>

    <Modal v-if="showModal" @modal-closed="close" />
</template>
