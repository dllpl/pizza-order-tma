<script setup>
import { MainButton } from 'vue-tg'
import { ClosingConfirmation } from 'vue-tg'

const darkMode = ref(true)
const showOrder = ref(false)
const order = ref([])
const orderStep = ref(0)
const pizzas = [
    {
        image: 'https://img.freepik.com/free-vector/slice-pizza-melted-floating-cartoon-vector-icon-illustration-food-object-icon-isolated-flat_138676-12745.jpg',
        name: 'Маргарита',
        price: 400
    },
    {
        image: 'https://img.freepik.com/free-vector/pizza-slice-melted-floating-cartoon-vector-icon-illustration-food-object-icon-isolated-flat-vector_138676-10422.jpg',
        name: 'Пепперони',
        price: 450
    },
    {
        image: 'https://img.freepik.com/free-vector/cute-smiling-pizza-slice-cartoon-vector-icon-illustration-food-object-icon-concept-isolated-premium_138676-4839.jpg',
        name: 'Гавайская',
        price: 500
    },
    {
        image: 'https://img.freepik.com/free-vector/pizza-slice-melted-cartoon-vector-icon-illustration-food-object-icon-concept-isolated-premium_138676-4663.jpg',
        name: 'Четыре сыра',
        price: 550
    },
    {
        image: 'https://img.freepik.com/free-vector/cute-pizza-slice-melted-with-thumbs-up-cartoon-vector-icon-illustration-food-object-icon-isolated_138676-5546.jpg',
        name: 'Мясная',
        price: 600
    },
    {
        image: 'https://img.freepik.com/free-vector/flying-slice-pizza-cartoon-vector-illustration-fast-food-concept-isolated-vector-flat-cartoon-style_138676-1934.jpg',
        name: 'Овощная',
        price: 350
    },
];

const contactData = useTgWebAppStore().contactData

const orderProcess = async (step) => {
    step++
    switch (step) {
        case 1:
            openOrderModal()
            orderStep.value++
            break
        case 2:
            orderStep.value++
            break
        case 3:

            const res = await useTgWebAppStore().authenticateBiometric()

            if(res.ok) {
                await $fetch('/api/order', {
                    method: 'POST',
                    body: {
                        order: order.value,
                        total: total.value,
                        contactData: contactData,
                        unsafeData: contactData.unsafe
                    }
                })

                useTgWebAppStore().webAppData.close()
            }

        default:
            break
    }
}

const updateContactData = (data) => {
    console.log(data)
}

const toggleDarkMode = () => {
    darkMode.value = !darkMode.value;
};

const openOrderModal = () => {
    showOrder.value = true;
    disableScroll();
};

const orderNow = async () => {
    alert('Заказ оформлен');
};

const closeModal = () => {
    showOrder.value = false;
    orderStep.value = 0;
    enableScroll();
}

const total = computed(() => {
    return order.value.reduce((total, pizza) => total + pizza.price * pizza.count, 0);
})
const updateOrder = (pizza) => {
    const existingPizza = order.value.find(p => p.name === pizza.name);
    if (pizza.action === 'add') {
        if (existingPizza) {
            existingPizza.count++
        } else {
            order.value.push({...pizza, count: 1});
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

const mainButtonText = computed(() => {
    if (order.value.length > 0 && !showOrder.value) {
        return 'Заказать'
    } else {
        return 'Оформить'
    }
})

</script>
<template>
    <div :class="darkMode ? 'dark' : ''">
        <div class="p-4 bg-tg-background dark:bg-gray-900 min-h-screen">
            <Header :darkMode="darkMode" @toggle-dark-mode="toggleDarkMode" @open-modal="openOrderModal"/>

            <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                <PizzaCard v-for="(pizza, index) in pizzas" :key="index" :image="pizza.image" :name="pizza.name"
                           :price="pizza.price" @update-order="updateOrder" :order="order"/>
            </div>

            <Modal :show="showOrder" title="Заказ" @close="closeModal">
                <Order v-if="orderStep === 1" :order="order" :total="total"/>
                <Contacts v-if="orderStep === 2" :contactData="contactData" @updateContactData="updateContactData"/>
            </Modal>
        </div>
        <MainButton :text="mainButtonText" @click="orderProcess(orderStep)" :visible="order.length > 0"/>
        <ClosingConfirmation />
    </div>
</template>
