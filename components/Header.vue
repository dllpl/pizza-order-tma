<template>
    <div class="flex justify-between items-center mb-4">
        <button @click="$emit('open-modal')" class="bg-tg-light dark:bg-tg-dark text-white rounded px-4 py-2">🧺</button>
        <span class="text-black dark:text-white">{{test.userData?.contact?.first_name}} {{test.userData?.contact?.last_name}}</span>
        <button @click="$emit('toggle-dark-mode')" class="bg-gray-500 dark:bg-gray-700 text-white rounded px-4 py-2">
            {{ darkMode ? '🌝' : '🌚' }}
        </button>
    </div>
</template>

<script setup>
defineProps({
    darkMode: Boolean,
});

const test = useTgWebAppStore()

// alert(JSON.stringify(userData))
</script>
