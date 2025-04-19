<template>
  <div class="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow">
    <h2 class="text-2xl font-semibold mb-4">Add New Calendar</h2>

    <form @submit.prevent="submitCalendar">
      <div class="mb-4">
        <label class="block text-sm font-medium mb-1">Calendar Name</label>
        <input v-model="calendar.name" type="text" class="w-full input" placeholder="e.g. Office Calendar 2025" />
      </div>

      <div class="mb-4">
        <label class="block text-sm font-medium mb-1">Category</label>
        <input v-model="calendar.category" type="text" class="w-full input" placeholder="e.g. Business" />
      </div>

      <div class="mb-4">
        <label class="block text-sm font-medium mb-1">Variation Type</label>
        <input v-model="calendar.variationType" type="text" class="w-full input" placeholder="e.g. Regular" />
      </div>

      <div class="mb-4">
        <label class="block text-sm font-medium mb-1">Weekly Rest Day</label>
        <select v-model="calendar.weeklyRest" class="w-full input">
          <option disabled value="">Select a day</option>
          <option v-for="day in days" :key="day" :value="day">{{ day }}</option>
        </select>
      </div>

      <div class="mb-4">
        <label class="block text-sm font-medium mb-1">Weekly Holiday</label>
        <select v-model="calendar.weeklyHoliday" class="w-full input">
          <option disabled value="">Select a day</option>
          <option v-for="day in days" :key="day" :value="day">{{ day }}</option>
        </select>
      </div>

      <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Save Calendar
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

const calendar = ref({
  name: '',
  category: '',
  variationType: '',
  weeklyRest: '',
  weeklyHoliday: ''
})

function submitCalendar() {
  console.log('Calendar Submitted:', calendar.value)

}
</script>

<style scoped>

</style>
