<script setup>
import {XCircleIcon} from "@heroicons/vue/24/outline/index.js";
defineProps({
    show: Boolean,
    title: String,
});
</script>
<template>
      <div v-if="show" class="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center" @click.self="$emit('close')">
          <div class="bg-white dark:bg-gray-900 p-6 rounded-lg w-full max-w-lg mx-4">
              <div class="flex justify-between items-center mb-4">
                  <h2 class="text-xl font-bold text-gray-900 dark:text-gray-100">{{ title }}</h2>
                  <button @click="$emit('close')" class="text-gray-900 dark:text-gray-100"><XCircleIcon class="size-10"/></button>
              </div>
              <div>
                  <slot></slot>
              </div>
          </div>

      </div>
</template>
