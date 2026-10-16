<script setup lang="ts">
import { Auth } from '~/features/Auth'

function clickLogo() {
    navigateTo("/")
}
</script>

<template>
    <header class="flex flex-row">
        <div class="flex flex-row mr-auto items-center cursor-pointer"
        @click="clickLogo">
            <img class="size-16 md:size-28"
            src="~/assets/svg/logo/logo.svg">
            <p class="hidden md:block font-[audiowide] text-3xl">MIN</p>
        </div>
        <Auth />
    </header>
</template>
