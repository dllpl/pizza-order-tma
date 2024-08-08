<template>
    <div class="border rounded-lg flex flex-col items-center bg-white dark:bg-gray-800 dark:border-gray-700">
        <img :src="image" alt="Pizza" class="w-full object-cover mb-4 rounded-t-lg" loading="lazy">
        <h2 class="text-lg font-bold mb-2 text-black dark:text-white">{{ name }}</h2>
        <p class="text-gray-700 dark:text-gray-300 mb-4">{{ price }} ₽</p>
        <div class="flex items-center mb-4">
            <button
                    v-if="count > 0"
                    @click="decrement"
                    class="bg-red-500 text-white rounded md:px-4 px-5 py-1">-</button>
            <span v-if="count > 0" class="mx-2 text-black dark:text-white">{{ count }}</span>
            <button
                    @click="increment"
                    class="bg-tg-light text-white rounded md:px-4 px-5 py-1">+</button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
    image: String,
    name: String,
    price: Number,
})

const count = ref(0)

const emit = defineEmits(['update-order'])

function increment() {
    count.value++
    emit('update-order', { name: props.name, price: props.price, action: 'add' })
}

function decrement() {
    if (count.value > 0) {
        count.value--
        emit('update-order', { name: props.name, price: props.price, action: 'remove' })
    }
}
</script>
