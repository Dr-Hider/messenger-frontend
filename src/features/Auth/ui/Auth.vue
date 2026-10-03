<script setup lang="ts">
import { ref, onMounted } from 'vue'
import LoginModal from './LoginModal.vue'
import { getMe } from '../lib/getMe.ts'

const showModal = ref(false)
const authenticated = ref(false)
const displayName = ref('')
const buttonText = ref('Войти')

onMounted(async () => {
    await checkAuth()
})

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
    <div class="flex flex-row m-4 ml-auto items-center">
        <img v-if="authenticated"
        class="size-7 md:size-8 md:mr-1"
        src="~/assets/svg/person/person.svg">

        <p v-if="authenticated"
        class="text-md md:text-xl mr-4 md:mr-8 mb-0.5 md:mb-1">{{ displayName }}</p>

        <button class="bg-white hover:bg-neutral-500 rounded-lg text-black p-1.5 md:p-2 cursor-pointer"
        type="button"
        @click="open">{{ buttonText }}</button>
    </div>

    <LoginModal v-if="showModal && !authenticated" @modal-closed="close" @login="checkAuth" />
</template>
