<script setup>
defineProps({
    darkMode: Boolean,
});

const {user} = useTgWebAppStore().dataUnsafe

const phone = computed(() => {
    let contactData = useTgWebAppStore().contactData
    if(contactData) {
        return contactData.phone_number.slice(0, 5)
    } else {
        return ''
    }
})

</script>
<template>
    <div class="flex justify-between items-center mb-4">
        <span class="text-black dark:text-white">
            {{user.first_name}} {{user.last_name}} {{phone.slice(0, 5)}}
        </span>
        <button @click="$emit('toggle-dark-mode')">
            {{ darkMode ? '🌝' : '🌚' }}
        </button>
    </div>
</template>
