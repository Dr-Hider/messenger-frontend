<script setup lang="ts">
import { Header } from '~/widgets/header'
import { Footer } from '~/widgets/footer'
</script>

<template>
    <div>
        <Header />
        <slot></slot>
    </div>
</template>
