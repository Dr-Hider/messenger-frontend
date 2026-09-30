<script setup lang="ts">
import { ref } from 'vue'

const apiUrl = useRuntimeConfig().public.apiBase

const showModal = ref(false)
const registerMode = ref(false)

const loginInput = ref('')
const passwordInput = ref('')
const passwordRepeat = ref('')

function open() {
    showModal.value = true
}

function close() {
    showModal.value = false
}

function loginClick() {
    registerMode.value = false
}

function registerClick() {
    registerMode.value = true
}

function submitForm() {
    if (registerMode) {
        register()
    }
    else {
        login()
    }
}

async function login() {

}

async function register() {
    const register_response = fetch(`${apiUrl}/api/v1/`)
}
</script>

<template>
    <button class="bg-white rounded-lg text-black p-2 m-6 ml-auto cursor-pointer"
    type="button"
    @click="open">Авторизоваться</button>

    <div v-if="showModal"
    class="absolute inset-0 bg-black/50 flex items-center justify-center">
        <div class="flex flex-col gap-8 items-center bg-neutral-900 p-8 rounded-xl">
            <img class="ml-auto cursor-pointer"
            src="~/assets/svg/close/close.svg"
            @click="close">

            <div class="flex flex-row gap-4 text-white">
                <button class="cursor-pointer"
                :class="{'underline': !registerMode}"
                type="button"
                @click="loginClick">Войти</button>

                <button class="cursor-pointer"
                :class="{'underline': registerMode}"
                type="button"
                @click="registerClick">Регистрация</button>
            </div>

            <form class="flex flex-col gap-2.5 items-center text-white"
            @submit.prevent="">
                <input v-model="loginInput"
                class="border border-white rounded-2xl p-2.5"
                type="text"
                placeholder="Логин">

                <input v-model="passwordInput"
                class="border border-white rounded-2xl p-2.5"
                type="password"
                placeholder="Пароль">

                <input v-model="passwordRepeat"
                v-if="registerMode"
                class="border border-white rounded-2xl p-2.5"
                type="password"
                placeholder="Подтверждение пароля">
                
                <button class="bg-blue-900 rounded-3xl p-2 cursor-pointer"
                type="submit">Войти</button>
            </form>
        </div>
    </div>
</template>