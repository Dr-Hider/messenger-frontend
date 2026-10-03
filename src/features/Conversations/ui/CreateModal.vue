<script setup lang="ts">
import { createConversation } from '../lib/createConversation';
const emits = defineEmits<{"modal-closed": []}>()

const inputTitle = ref('')
const inputType = ref('')
const inputVisibility = ref('')
const inputCompanionId = ref('')

function closeEvent() {
    emits("modal-closed")
}

async function submitCreate() {
    if (inputCompanionId.value !== "") {
        await createConversation(
            inputTitle.value,
            inputType.value,
            inputVisibility.value,
            Number(inputCompanionId.value)
        )
    }
}
</script>

<template>
    <div class="absolute inset-0 bg-black/50 flex items-center justify-center">
        <div class="flex flex-col gap-8 items-center bg-neutral-900 p-8 rounded-xl">
            <img class="ml-auto cursor-pointer"
            src="~/assets/svg/close/close.svg"
            @click="closeEvent">

            <form class="flex flex-col gap-2.5 items-center text-white"
            @submit.prevent="submitCreate">
                <input v-model="inputTitle"
                class="border border-white rounded-2xl p-2.5"
                type="text"
                placeholder="Название">

                <select v-model="inputType"
                class="border border-white rounded-2xl p-2.5 w-full">
                    <option value="">Тип</option>
                    <option value="DIRECT">Личный</option>
                    <option value="GROUP">Групповой</option>
                </select>

                <select v-model="inputVisibility"
                class="border border-white rounded-2xl p-2.5 w-full">
                    <option value="">Видимость</option>
                    <OPTION value="OPEN">Открытый</OPTION>
                    <option value="PRIVATE">Приватный</option>
                </select>

                <input v-model="inputCompanionId"
                class="border border-white rounded-2xl p-2.5"
                type="text"
                placeholder="id собеседника">
                
                <button class="bg-blue-900 hover:bg-blue-950 rounded-3xl p-2.5 cursor-pointer"
                type="submit">Создать</button>
            </form>
        </div>
    </div>
</template>