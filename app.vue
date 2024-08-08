<template>
    <div>
        <NuxtPage/>
        <ClosingConfirmation/>
    </div>
</template>
<script setup>
import {ClosingConfirmation} from 'vue-tg'

const tgWebApp = useTgWebAppStore()

tgWebApp.setWebAppData()

// tgWebApp.setUserData()
//
//
//
// tgWebApp.setGeo()



</script>
