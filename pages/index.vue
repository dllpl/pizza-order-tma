<template>
    <div :class="darkMode ? 'dark' : ''">
        <div class="container mx-auto p-4 bg-gray-100 dark:bg-gray-900 min-h-screen">
            <div class="flex justify-between items-center mb-4">
                <button
                        @click="showOrder = !showOrder"
                        class="bg-blue-500 dark:bg-blue-700 text-white rounded px-4 py-2">Оформить заказ</button>
                <button
                        @click="toggleDarkMode"
                        class="bg-gray-500 dark:bg-gray-700 text-white rounded px-4 py-2">
                    {{ darkMode ? 'Светлая тема' : 'Темная тема' }}
                </button>
            </div>
            <div v-if="showOrder" class="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
                <div class="bg-white dark:bg-gray-800 p-6 rounded-lg">
                    <h2 class="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">Ваш заказ:</h2>
                    <ul>
                        <li v-for="(pizza, index) in order" :key="index" class="mb-2 text-gray-900 dark:text-gray-100">
                            {{ pizza.name }} - {{ pizza.price }} ₽ ({{ pizza.count }})
                        </li>
                    </ul>
                    <button
                            @click="showOrder = false"
                            class="mt-4 bg-red-500 dark:bg-red-700 text-white rounded px-4 py-2">Закрыть</button>
                </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
                <PizzaCard
                        v-for="(pizza, index) in pizzas"
                        :key="index"
                        :image="pizza.image"
                        :name="pizza.name"
                        :price="pizza.price"
                        @update-order="updateOrder"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import PizzaCard from '~/components/PizzaCard.vue'

const darkMode = ref(false)

function toggleDarkMode() {
    darkMode.value = !darkMode.value
}

const showOrder = ref(false)
const order = ref([])

const pizzas = [
    { image: 'https://via.placeholder.com/150', name: 'Маргарита', price: 400 },
    { image: 'https://via.placeholder.com/150', name: 'Пепперони', price: 450 },
    { image: 'https://via.placeholder.com/150', name: 'Гавайская', price: 500 },
    { image: 'https://via.placeholder.com/150', name: 'Четыре сыра', price: 550 },
    { image: 'https://via.placeholder.com/150', name: 'Мясная', price: 600 },
    { image: 'https://via.placeholder.com/150', name: 'Овощная', price: 350 },
]

function updateOrder(pizza) {
    const existingPizza = order.value.find(p => p.name === pizza.name)
    if (pizza.action === 'add') {
        if (existingPizza) {
            existingPizza.count++
        } else {
            order.value.push({ ...pizza, count: 1 })
        }
    } else if (pizza.action === 'remove') {
        if (existingPizza.count > 1) {
            existingPizza.count--
        } else {
            order.value = order.value.filter(p => p.name !== pizza.name)
        }
    }
}
</script>
