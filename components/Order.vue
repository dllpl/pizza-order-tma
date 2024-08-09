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

const orderNow = async () => {
    const userData = useTgWebAppStore().userData

    if(userData) {

    } else {
        useTgWebAppStore().setUserData()
    }

    console.log(userData)
}

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
            <button @click="orderNow"
                    class="bg-tg-light dark:bg-tg-dark text-white rounded-lg px-4 py-2 w-full disabled:opacity-50"
                    :disabled="!total">
                Оформить
            </button>
        </div>
    </div>
</template>
