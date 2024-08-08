<template>
    <div>
        <NuxtPage/>
        <ClientOnly>
            <ClosingConfirmation/>
        </ClientOnly>
    </div>
</template>
<script setup>
import {ClosingConfirmation} from 'vue-tg'
</script>
