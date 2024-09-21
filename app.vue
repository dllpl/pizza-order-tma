<script setup>
console.log(false)
await useTgWebAppStore().init()
console.log(true)
</script>
<template>
    <NuxtPage/>
</template>
