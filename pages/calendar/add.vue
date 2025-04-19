<template>
  <div class="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
    <h2 class="text-3xl font-semibold mb-6 text-center text-blue-600">Calendar Configuration</h2>

    <form @submit.prevent="submitCalendar" class="space-y-8">
      <div class="space-y-6">
        <h3 class="text-2xl font-semibold text-gray-700">Calendar Basic Information</h3>
        <div class="bg-white rounded-2xl shadow-lg p-6">
          <div class="mb-6 columns-2 gap-4">
            <div class="break-inside-avoid">
              <label for="calendarName" class="block text-lg font-medium text-gray-700 mb-2">Calendar Name</label>
              <input
                  v-model="calendar.name"
                  type="text"
                  id="calendarName"
                  class="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. Office Calendar 2025"
                  required
              />
            </div>
            <div class="break-inside-avoid">
              <label for="category" class="block text-lg font-medium text-gray-700 mb-2">Calendar Category</label>
              <select
                  v-model="calendar.category"
                  id="category"
                  class="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                  required
              >
                <option disabled value="">Select a category</option>
                <option value="office">Office Working Hours</option>
                <option value="non-office">Non-Office Working Hours</option>
                <option value="different">Different Working Hours</option>
              </select>
            </div>
          </div>
          <div class="mb-6">
            <label class="block text-lg font-medium text-gray-700 mb-2">Type of Calendar Variation</label>
            <div class="flex items-center space-x-6">
              <label class="inline-flex items-center">
                <input
                    type="radio"
                    class="form-radio text-blue-600"
                    value="Group A"
                    v-model="calendar.variationType"
                />
                <span class="ml-2 text-gray-700">Group A</span>
              </label>
              <label class="inline-flex items-center">
                <input
                    type="radio"
                    class="form-radio text-blue-600"
                    value="Group B"
                    v-model="calendar.variationType"
                />
                <span class="ml-2 text-gray-700">Group B</span>
              </label>
            </div>
          </div>
          <div class="mb-6">
            <label for="description" class="block text-lg font-medium text-gray-700 mb-2">Description</label>
            <input
                v-model="calendar.description"
                type="text"
                id="description"
                class="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                placeholder="Short description of the calendar"
            />
          </div>
          <div class="mb-6">
            <label for="shiftType" class="block text-lg font-medium text-gray-700 mb-2">Shift Type</label>
            <select
                id="shiftType"
                v-model="calendar.shiftType"
                class="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                required
            >
              <option disabled value="">Select shift type</option>
              <option value="5-days">5 Days a Week</option>
              <option value="2-days-off">2 Days Off</option>
            </select>
          </div>
        </div>

        <div class="bg-white rounded-2xl shadow-lg p-6 mt-8">
          <h2 class="text-xl font-semibold text-gray-800 mb-4">Holiday & Calendar Configuration</h2>

          <div class="mb-6">
            <label class="block text-lg font-medium text-gray-700 mb-2">Rest Leave Duration</label>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                  type="date"
                  v-model="calendar.restLeaveStart"
                  class="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                  placeholder="Start Date"
              />
              <input
                  type="date"
                  v-model="calendar.restLeaveEnd"
                  class="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                  placeholder="End Date"
              />
            </div>
          </div>
          <div class="mb-6">
            <label class="block text-lg font-medium text-gray-700 mb-2">Public Holidays (Federal/State)</label>
            <button
                type="button"
                @click="showPublicHolidaysModal = true"
                class="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
            >
              View Public Holidays
            </button>
          </div>
          <div class="mb-6">
            <label class="block text-lg font-medium text-gray-700 mb-2">Term Break Duration</label>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                  type="date"
                  v-model="calendar.termBreakStart"
                  class="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                  placeholder="Start Date"
              />
              <input
                  type="date"
                  v-model="calendar.termBreakEnd"
                  class="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                  placeholder="End Date"
              />
            </div>
          </div>
          <div class="mb-6">
            <label class="block text-lg font-medium text-gray-700 mb-2">Event Holidays</label>
            <button
                type="button"
                @click="showEventHolidaysModal = true"
                class="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
            >
              View Event Holidays
            </button>
          </div>

          <div class="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label for="weeklyRestDay" class="block text-lg font-medium text-gray-700 mb-2">Weekly Rest Day</label>
              <select
                  id="weeklyRestDay"
                  v-model="calendar.weeklyRestDay"
                  class="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
              >
                <option disabled value="">Select Rest Day</option>
                <option value="sunday">Sunday</option>
                <option value="monday">Monday</option>
                <option value="tuesday">Tuesday</option>
                <option value="wednesday">Wednesday</option>
                <option value="thursday">Thursday</option>
                <option value="friday">Friday</option>
                <option value="saturday">Saturday</option>
              </select>
            </div>

            <div>
              <label for="weeklyHoliday" class="block text-lg font-medium text-gray-700 mb-2">Weekly Holiday</label>
              <select
                  id="weeklyHoliday"
                  v-model="calendar.weeklyHoliday"
                  class="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
              >
                <option disabled value="">Select Holiday</option>
                <option value="sunday">Sunday</option>
                <option value="monday">Monday</option>
                <option value="tuesday">Tuesday</option>
                <option value="wednesday">Wednesday</option>
                <option value="thursday">Thursday</option>
                <option value="friday">Friday</option>
                <option value="saturday">Saturday</option>
              </select>
            </div>
          </div>

          <div class="mb-6 flex items-center ">
            <label class="block text-lg font-medium text-gray-700 mb-2">Local States / Agencies</label>
            <button
                type="button"
                @click="showStatesModal = true"
                class=" ml-3 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
            >
              Select States / Agencies
            </button>
          </div>
        </div>


      </div>

    </form>

    <!-- Success Message -->
    <div
        v-if="isSuccess"
        class="mt-6 p-4 bg-green-100 text-green-700 rounded-lg text-center"
    >
      Calendar successfully updated!
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

const calendar = ref({
  name: '',
  category: '',
  shiftType: '',
  weeklyRest: '',
  weeklyOff: '',
  publicHolidays: [{ name: '', type: '', startDate: '', endDate: '' }]
})

const isSuccess = ref(false)

function submitCalendar() {
  console.log('Calendar Submitted:', calendar.value)
  // Simulate success
  setTimeout(() => {
    isSuccess.value = true
  }, 1000)
}

function addHoliday() {
  calendar.value.publicHolidays.push({ name: '', type: '', startDate: '', endDate: '' })
}

function removeHoliday(index) {
  calendar.value.publicHolidays.splice(index, 1)
}
</script>

<style >
input, select, button {
  transition: border-color 0.2s ease-in-out;
}

input:focus, select:focus {
  border-color: #1D4ED8; /* Focus border color */
}

button:hover {
  transform: scale(1.05);
}
</style>
