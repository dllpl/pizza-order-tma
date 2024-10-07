<script setup>
defineProps({
    darkMode: Boolean,
});

const {user} = useTgWebAppStore().dataUnsafe

const contactData = useTgWebAppStore().contactData

</script>
<template>
    <div class="flex justify-between items-center mb-4">
        <span class="text-black dark:text-white">
            {{contactData?.first_name}} {{contactData?.last_name}} {{contactData?.phone_number}}
        </span>
        <button @click="$emit('toggle-dark-mode')">
            {{ darkMode ? '🌝' : '🌚' }}
        </button>
    </div>
</template>
