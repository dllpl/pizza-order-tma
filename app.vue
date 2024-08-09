<template>
    <div>
        <NuxtPage/>
        <ClosingConfirmation/>
    </div>
</template>
<script setup>
import {ClosingConfirmation} from 'vue-tg'

useTgWebAppStore().init()
</script>
