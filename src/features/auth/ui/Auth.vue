<script setup lang="ts">
import { ref } from 'vue'
import LoginModal from './LoginModal.vue'
import { getMe } from '../lib/getMe.ts'

const showModal = ref(false)
const authenticated = ref(false)
const displayName = ref('')
const buttonText = ref('Войти')

await checkAuth()

function open() {
    showModal.value = true
}

function close() {
    showModal.value = false
}

async function checkAuth() {
    const me = await getMe()

    if (me.id !== -1) {
        authenticated.value = true
        displayName.value = me.displayName
        buttonText.value = "Выйти"
    }
}
</script>

<template>
    <div class="flex flex-row gap-2.5 m-6 ml-auto items-center">
        <img v-if="authenticated"
        class="size-8"
        src="~/assets/svg/person/person.svg">

        <p v-if="authenticated"
        class="text-white text-xl mb-1">{{ displayName }}</p>

        <button class="bg-white rounded-lg text-black p-2 ml-8 cursor-pointer"
        type="button"
        @click="open">{{ buttonText }}</button>
    </div>

    <LoginModal v-if="showModal && !authenticated" @modal-closed="close" @login="checkAuth" />
</template>
