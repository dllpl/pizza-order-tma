<script setup>
defineProps({
    order: {
        type: Array,
        required: true
    },
    total: {
        type: Number,
        required: true
    }
})

</script>

<template>
    <div class="flex flex-col h-full justify-between">
        <div>
            <ul>
                <li v-for="(pizza, index) in order" :key="index" class="mb-2 text-gray-900 dark:text-gray-100">
                    {{ pizza.name }} - {{ pizza.price }} ₽ ({{ pizza.count }})
                </li>
            </ul>
        </div>
        <div class="text-gray-900 dark:text-gray-100 text-xl font-bold">
            <div class="mb-2">
                Итого: {{ total }} ₽
            </div>
        </div>
    </div>
</template>
