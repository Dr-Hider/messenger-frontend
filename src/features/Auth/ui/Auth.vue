<script setup lang="ts">
import { ref, onMounted } from 'vue'
import LoginModal from './LoginModal.vue'

const showModal = ref(false)
const authenticated = ref(false)
const displayName = ref('')
const id = ref (0)
const buttonText = ref('Войти')

onMounted(async () => {
    await checkAuth()
})

function openModal() {
    showModal.value = true
}

function closeModal() {
    showModal.value = false
}

async function checkAuth() {
    if (localStorage.getItem("id") !== "-1") {
        authenticated.value = true
        displayName.value = localStorage.getItem("displayName") ?? ""
        id.value = Number(localStorage.getItem("id") ?? "0")
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
        class="text-md md:text-xl mr-4 md:mr-8 mb-0.5 md:mb-1">{{ displayName }} ({{ id }})</p>

        <button class="bg-white hover:bg-neutral-500 rounded-lg text-black p-1.5 md:p-2 cursor-pointer"
        type="button"
        @click="openModal">{{ buttonText }}</button>
    </div>

    <LoginModal v-if="showModal && !authenticated" @modal-closed="closeModal" @logged-in="checkAuth" />
</template>
