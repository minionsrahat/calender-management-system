<template>
  <div class="min-h-screen flex flex-col">

    <header class="bg-blue-600 text-white py-4 px-6 shadow">
      <nav class="flex justify-between items-center">
        <h1 class="text-lg font-bold">📅 Calendar App</h1>
        <ul class="flex gap-4">
          <li><NuxtLink to="/" class="hover:underline">Home</NuxtLink></li>
          <li><NuxtLink to="/calendar/add" class="hover:underline">Add Calendar</NuxtLink></li>
          <li><NuxtLink to="/calendar/list" class="hover:underline">Calendar List</NuxtLink></li>
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
<script setup lang="ts">
</script>