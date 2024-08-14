<script setup>
const props = defineProps({
    contacts: {
        type: Object,
        required: false,
    },
    geo: {
        type: [Object, Boolean],
        required: false
    },
})

const address = ref('')

if (props.geo) {
    const {data} = await useFetch('https://suggestions.dadata.ru/suggestions/api/4_1/rs/geolocate/address', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Token ' + 'a963decbb7de0685da0de94aa3655786ea5a336d',
        },
        body: {
            lat: props.geo.latitude,
            lon: props.geo.longitude,
            count: 1,
            radius_meters: 50
        }
    })

    address.value = await data.value.suggestions[0].value
}

</script>

<template>
    <form class="max-w-md mx-auto">
        <div class="grid grid-cols-2 gap-4 md:grid-cols-2 md:gap-6">
            <div class="relative z-0 w-full mb-5 group">
                <input v-model="contacts.contact.first_name" type="text" name="first_name" id="first_name"
                       class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                       placeholder=" " required/>
                <label for="first_name"
                       class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Имя</label>
            </div>
            <div class="relative z-0 w-full mb-5 group">
                <input v-model="contacts.contact.last_name" type="text" name="last_name" id="last_name"
                       class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                       placeholder=" " required/>
                <label for="last_name"
                       class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Фамилия</label>
            </div>
        </div>
        <div class="relative z-0 w-full mb-5 group">
            <input v-model="contacts.contact.phone_number" type="tel" name="phone" id="phone"
                   class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                   placeholder=" " required/>
            <label for="phone"
                   class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Номер
                телефона</label>
        </div>
        <div class="relative z-0 w-full mb-5 group">
            <DadataInputCombobox type="address" :limit="5"/>
        </div>

        <div class="relative z-0 w-full mb-5 group">


            <!--            <Combobox/>-->
        </div>


    </form>
</template>
