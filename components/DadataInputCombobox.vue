<script setup>
const props = defineProps({
    type: {
        type: String,
        required: true
    },
    limit: {
        type: Number,
        required: true
    }
})
import {
    Combobox,
    ComboboxButton,
    ComboboxInput,
    ComboboxLabel,
    ComboboxOption,
    ComboboxOptions,
    TransitionRoot
} from "@headlessui/vue"

import {CheckIcon, ChevronUpDownIcon, XCircleIcon} from '@heroicons/vue/20/solid'

const selected = ref('')
const query = ref('')
const filteredData = ref([])

watch(() => query.value, async () => {
    if(query.value.length) {
        const result = await $fetch(`https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/${props.type}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Token ' + 'a963decbb7de0685da0de94aa3655786ea5a336d',
            },
            body: {
                query: query.value,
                count: props.limit,
            }
        })
        filteredData.value = result.suggestions
    } else {
        filteredData.value = []
    }
})
const transformedText = value => value.slice(-30)

</script>
<template>
    <Combobox v-model="selected">
        <ComboboxInput name="address" id="address" as="textarea"
                       :displayValue="(item) => item.value"
                       @change="query = $event.target.value"
                       class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                       placeholder=" " required/>
        <ComboboxButton class="absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon v-if="selected.length === 0" class="h-5 w-5 text-gray-400" aria-hidden="true"/>
            <XCircleIcon v-else class="h-5 w-5 text-gray-400" aria-hidden="true" @click="selected = ''"/>
        </ComboboxButton>
        <ComboboxLabel
                for="address"
                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Куда доставить
        </ComboboxLabel>
        <TransitionRoot
                leave="transition ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                @after-leave="query = ''"
        >
            <ComboboxOptions
                    v-if="filteredData.length"
                    class="absolute bottom-20 max-h-40 w-full overflow-auto bg-white dark:bg-gray-700 py-1 text-base"
            >
                <div
                        v-if="!filteredData.length && query !== ''"
                        class="relative cursor-default select-none px-4 py-2 text-gray-700 z-10"
                >
                    Нет подходящих вариантов
                </div>

                <ComboboxOption
                        v-for="item in filteredData"
                        as="template"
                        :key="item.data.fias_id"
                        :value="item"
                        v-slot="{ selected, active }"
                >
                    <li
                            class="relative cursor-default select-none py-2 pl-3 pr-4 z-10"
                            :class="{
                              'bg-tg-default text-white': active,
                              'text-white': !active,
                            }"
                    >
                <span
                        class="block truncate"
                        :class="{ 'font-medium': selected, 'font-normal': !selected }"
                >
                  {{ transformedText(item.value) }}
                </span>
                    </li>
                </ComboboxOption>
            </ComboboxOptions>
        </TransitionRoot>
    </Combobox>
</template>
