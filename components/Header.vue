<template>
    <div class="flex justify-between items-center mb-4">
        <button @click="emitOpenModal" class="bg-tg-light dark:bg-tg-dark text-white rounded px-4 py-2">🧺</button>
        <button @click="emitToggleDarkMode" class="bg-gray-500 dark:bg-gray-700 text-white rounded px-4 py-2">
            {{ darkMode ? '🌝' : '🌚' }}
        </button>
    </div>
</template>

<script setup>
const props = defineProps({
    darkMode: Boolean,
});

const emit = defineEmits(['toggle-dark-mode', 'open-modal']);

const emitToggleDarkMode = () => {
    emit('toggle-dark-mode');
};

const emitOpenModal = () => {
    emit('open-modal');
};
</script>
