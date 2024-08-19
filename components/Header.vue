<script setup>
defineProps({
    darkMode: Boolean,
});
</script>
<template>
    <div class="flex justify-between items-center mb-4">
        <span class="text-black dark:text-white">
            Имя Фамилия
        </span>
        <button @click="$emit('toggle-dark-mode')">
            {{ darkMode ? '🌝' : '🌚' }}
        </button>
    </div>
</template>
