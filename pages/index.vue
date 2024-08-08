<template>
    <div :class="darkMode ? 'dark' : ''">
        <div class="p-4 bg-tg-background dark:bg-gray-900 min-h-screen">
            <Header :darkMode="darkMode" @toggle-dark-mode="toggleDarkMode" @open-modal="openModal" />

            <Modal :show="showOrder" title="Заказ" @close="closeModal">
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
                        <button @click="closeModal" class="bg-tg-light dark:bg-tg-dark text-white rounded-lg px-4 py-2 w-full disabled:opacity-50" :disabled="!total">
                            Оформить
                        </button>
                    </div>
                </div>
            </Modal>

            <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                <PizzaCard v-for="(pizza, index) in pizzas" :key="index" :image="pizza.image" :name="pizza.name" :price="pizza.price" @update-order="updateOrder" />
            </div>
        </div>
    </div>
</template>

<script setup>
const darkMode = ref(true);
const showOrder = ref(false);
const order = ref([]);
const pizzas = [
    { image: 'https://img.freepik.com/free-vector/slice-pizza-melted-floating-cartoon-vector-icon-illustration-food-object-icon-isolated-flat_138676-12745.jpg', name: 'Маргарита', price: 400 },
    { image: 'https://img.freepik.com/free-vector/pizza-slice-melted-floating-cartoon-vector-icon-illustration-food-object-icon-isolated-flat-vector_138676-10422.jpg', name: 'Пепперони', price: 450 },
    { image: 'https://img.freepik.com/free-vector/cute-smiling-pizza-slice-cartoon-vector-icon-illustration-food-object-icon-concept-isolated-premium_138676-4839.jpg', name: 'Гавайская', price: 500 },
    { image: 'https://img.freepik.com/free-vector/pizza-slice-melted-cartoon-vector-icon-illustration-food-object-icon-concept-isolated-premium_138676-4663.jpg', name: 'Четыре сыра', price: 550 },
    { image: 'https://img.freepik.com/free-vector/cute-pizza-slice-melted-with-thumbs-up-cartoon-vector-icon-illustration-food-object-icon-isolated_138676-5546.jpg', name: 'Мясная', price: 600 },
    { image: 'https://img.freepik.com/free-vector/flying-slice-pizza-cartoon-vector-illustration-fast-food-concept-isolated-vector-flat-cartoon-style_138676-1934.jpg', name: 'Овощная', price: 350 },
];

const toggleDarkMode = () => {
    darkMode.value = !darkMode.value;
};

const openModal = () => {
    showOrder.value = true;
    disableScroll();
};

const closeModal = () => {
    showOrder.value = false;
    enableScroll();
};

const total = computed(() => {
    return order.value.reduce((total, pizza) => total + pizza.price * pizza.count, 0);
});

const updateOrder = (pizza) => {
    const existingPizza = order.value.find(p => p.name === pizza.name);
    if (pizza.action === 'add') {
        if (existingPizza) {
            existingPizza.count++;
        } else {
            order.value.push({ ...pizza, count: 1 });
        }
    } else if (pizza.action === 'remove') {
        if (existingPizza.count > 1) {
            existingPizza.count--;
        } else {
            order.value = order.value.filter(p => p.name !== pizza.name);
        }
    }
};

const disableScroll = () => {
    document.body.classList.add('overflow-hidden');
};

const enableScroll = () => {
    document.body.classList.remove('overflow-hidden');
};
</script>
