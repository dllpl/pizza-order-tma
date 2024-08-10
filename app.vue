<template>
    <div>
        <NuxtPage/>

        <ClosingConfirmation/>
        <ExpandedViewport/>
        <SettingsButton/>
    </div>
</template>
<script setup>
import {
    ClosingConfirmation,
    ExpandedViewport, SettingsButton,
} from 'vue-tg'

useTgWebAppStore().init()
</script>
