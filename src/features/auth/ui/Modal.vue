<script setup lang="ts">
import { ref } from 'vue'
import { register } from '../lib/register'
import { login } from '../lib/login'

const emits = defineEmits<{"modal-closed": []}>()

const registerMode = ref(false)

const loginInputLogin = ref('')
const loginInputPassword = ref('')

const registerInputLogin = ref('')
const registerInputEmail = ref('')
const registerInputNickname = ref('')
const registerInputPassword = ref('')

function closeEvent() {
    emits("modal-closed")
}

function loginClick() {
    registerMode.value = false
}

function registerClick() {
    registerMode.value = true
}

function submitLogin() {
    login(loginInputLogin.value, loginInputPassword.value)
}

function submitRegister() {
    register(registerInputLogin.value,
    registerInputEmail.value,
    registerInputNickname.value,
    registerInputPassword.value)
}
</script>

<template>
    <div class="absolute inset-0 bg-black/50 flex items-center justify-center">
        <div class="flex flex-col gap-8 items-center bg-neutral-900 p-8 rounded-xl">
            <img class="ml-auto cursor-pointer"
            src="~/assets/svg/close/close.svg"
            @click="closeEvent">

            <div class="flex flex-row gap-4 text-white">
                <button class="cursor-pointer"
                :class="{'underline': !registerMode}"
                type="button"
                @click="loginClick">Вход</button>

                <button class="cursor-pointer"
                :class="{'underline': registerMode}"
                type="button"
                @click="registerClick">Регистрация</button>
            </div>

            <form v-if="!registerMode"
            class="flex flex-col gap-2.5 items-center text-white"
            @submit.prevent="submitLogin">
                <input v-model="loginInputLogin"
                class="border border-white rounded-2xl p-2.5"
                type="text"
                placeholder="Логин/email">

                <input v-model="loginInputPassword"
                class="border border-white rounded-2xl p-2.5"
                type="password"
                placeholder="Пароль">
                
                <button class="bg-blue-900 rounded-3xl p-2 cursor-pointer"
                type="submit">Войти</button>
            </form>

            <form v-if="registerMode"
            class="flex flex-col gap-2.5 items-center text-white"
            @submit.prevent="submitRegister">
                <input v-model="registerInputLogin"
                class="border border-white rounded-2xl p-2.5"
                type="text"
                placeholder="Логин">

                <input v-model="registerInputEmail"
                class="border border-white rounded-2xl p-2.5"
                type="text"
                placeholder="email">

                <input v-model="registerInputNickname"
                class="border border-white rounded-2xl p-2.5"
                type="text"
                placeholder="Отображаемое имя">

                <input v-model="registerInputPassword"
                class="border border-white rounded-2xl p-2.5"
                type="password"
                placeholder="Пароль">
                
                <button class="bg-blue-900 rounded-3xl p-2 cursor-pointer"
                type="submit">Войти</button>
            </form>
        </div>
    </div>
</template>
