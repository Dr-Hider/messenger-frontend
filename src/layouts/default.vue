<script setup lang="ts">
import { Header } from '~/widgets/Header'
import { Footer } from '~/widgets/Footer'
</script>

<template>
    <div class="h-dvh flex flex-col text-sm md:text-lg text-white bg-neutral-900 overflow-hidden">
        <Header class="shrink-0" />
        <slot></slot>
    </div>
</template>
