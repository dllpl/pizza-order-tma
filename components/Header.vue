<template>
    <div class="flex justify-between items-center mb-4">
        <span class="text-black dark:text-white">
            Привет, {{store.initDataUnsafe?.user?.first_name}} {{store.initDataUnsafe?.user?.last_name}}, выбери пицку
        </span>
        <button @click="$emit('toggle-dark-mode')">
            {{ darkMode ? '🌝' : '🌚' }}
        </button>
    </div>
</template>

<script setup>

defineProps({
    darkMode: Boolean,
});

const store = useTgWebAppStore()

// watch(() => initDataUnsafe, () => {
//     console.log(initDataUnsafe)
// })

// alert(JSON.stringify(userData))
</script>
