<script setup lang="ts">
import { Header } from '~/widgets/Header'
import { Footer } from '~/widgets/Footer'
</script>

<template>
    <div class="min-h-dvh text-sm md:text-lg text-white bg-neutral-900">
        <Header />
        <slot></slot>
    </div>
</template>
