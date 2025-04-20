<template>
  <div class="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-100 to-purple-100 text-center p-6">
    <div class="bg-white shadow-lg rounded-2xl p-10 max-w-2xl w-full">
      <h1 class="text-3xl font-bold text-gray-800 mb-4">Welcome to the Calendar Management System</h1>
      <p class="text-gray-600 text-md mb-6">
        Organize your schedules, configure shift timings, and manage holidays effortlessly. Your time, your way!
      </p>
      <NuxtLink to="/calendar/">
        <button class="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300">
          Manage Calendars
        </button>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
// No logic needed here for now
</script>
