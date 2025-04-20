<template>
  <div class="min-h-screen flex flex-col">

    <header class="bg-blue-600 text-white py-4 px-6 shadow-md">
      <nav class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h1 class="text-2xl font-bold text-center sm:text-left">📅 Calendar App</h1>

        <ul class="flex justify-center gap-6 text-lg font-medium">
          <li>
            <NuxtLink to="/" class="hover:text-blue-200 transition duration-200">Home</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/calendar/add" class="hover:text-blue-200 transition duration-200">Add Calendar</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/calendar/" class="hover:text-blue-200 transition duration-200">Calendar List</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/shift/" class="hover:text-blue-200 transition duration-200">Shift Type List</NuxtLink>
          </li>
        </ul>
      </nav>
    </header>


    <main class="flex-1 p-6 bg-gray-100">
      <NuxtPage />
    </main>

    <footer class="bg-gray-800 text-white py-3 text-center">
      © 2025 Rahat Uddin Azad| All rights reserved.
    </footer>
  </div>
</template>
<script setup>
import { useAgencyStore } from '@/stores/agencyStore'
import {useHolidayStore} from "~/stores/holidayStore.js";
import {onMounted} from "vue";
import {useStateStore} from "~/stores/stateStore.js";
const agencyStore = useAgencyStore()
const holidayStore = useHolidayStore()
const stateStore = useStateStore()

onMounted(() => {
  agencyStore.fetchAgencies()
  holidayStore.fetchHolidays()
  stateStore.fetchStates()
})
</script>