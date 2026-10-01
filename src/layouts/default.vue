<script setup lang="ts">
import Header from '~/widgets/header/ui/Header.vue'
import Footer from '~/widgets/footer/ui/Footer.vue'
</script>

<template>
    <div>
        <Header></Header>
        <slot></slot>
        <Footer></Footer>
    </div>
</template>
