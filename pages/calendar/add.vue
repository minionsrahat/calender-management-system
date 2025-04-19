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
                <option v-for="category in getCalendarCategories" :key="category.value" :value="category.value">
                  {{ category.label }}
                </option>
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
          <div class="mb-6 flex items-center">
            <label class="block text-lg ml-2 font-medium text-gray-700 mb-2">Public Holidays (Federal/State)</label>
            <button
                type="button"
                @click="openModal('holidays')"
                class="bg-blue-600 ml-2 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
            >
              View Public Holidays
            </button>
          </div>
          <div class="mb-6">
            <label class="block text-lg font-medium text-gray-700 mb-4">Term Break Duration</label>
            <div class="mb-4">
              <h3 class="text-md font-semibold text-gray-800 mb-2">Term 1</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                    type="date"
                    v-model="calendar.term1.start"
                    class="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                    placeholder="Start Date"
                />
                <input
                    type="date"
                    v-model="calendar.term1.end"
                    class="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                    placeholder="End Date"
                />
              </div>
            </div>

            <div>
              <h3 class="text-md font-semibold text-gray-800 mb-2">Term 2</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                    type="date"
                    v-model="calendar.term2.start"
                    class="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                    placeholder="Start Date"
                />
                <input
                    type="date"
                    v-model="calendar.term2.end"
                    class="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                    placeholder="End Date"
                />
              </div>
            </div>
          </div>

          <div class="mb-6">
            <label class="block text-lg font-medium text-gray-700 mb-4">Holiday Events</label>

            <div v-for="(event, index) in calendar.holidayEvents" :key="index" class="mb-4">
              <h3 class="text-md font-semibold text-gray-800 mb-2">Event {{ index + 1 }}</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                    type="text"
                    v-model="event.name"
                    class="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                    placeholder="Event Name"
                />
                <input
                    type="date"
                    v-model="event.date"
                    class="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                    placeholder="Event Date"
                />
              </div>
            </div>
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
                <option v-for="day in getDays" :key="day.value" :value="day.value">
                  {{ day.label }}
                </option>
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
                <option v-for="day in getDays" :key="day.value" :value="day.value">
                  {{ day.label }}
                </option>
              </select>
            </div>
          </div>
          <div class="mb-6 flex items-center">
            <label class="block text-lg  ml-2 font-medium text-gray-700 mb-2 ml-2">List of States</label>
            <button
                type="button"
                @click="openModal('states')"
                class="bg-blue-600 ml-2 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
            >States Update
            </button>
          </div>
          <div class="mb-6 flex items-center ">
            <label class="block text-lg font-medium text-gray-700 mb-2"> Agencies</label>
            <button
                type="button"
                @click="openModal('agencies')"
                class=" ml-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
            >
              Agency Update
            </button>
          </div>
        </div>


      </div>

    </form>

    <BaseModal
        :visible="showModal"
        :title="modalTitle"
        :content-type="selectedContent"
        @close="showModal = false"
        @select="handleSelect"
    />

    <div class="mt-8 flex justify-center space-x-4">
      <button
          @click="submitCalendar"
          class="bg-green-600 text-white px-6 py-3 rounded-lg shadow hover:bg-green-700"
      >
        Add Calendar
      </button>
      <button
          @click="resetCalendar"
          class="bg-gray-300 text-gray-800 px-6 py-3 rounded-lg shadow hover:bg-gray-400"
      >
        Reset
      </button>
    </div>

    <div
        v-if="isSuccess"
        class="mt-6 p-4 bg-green-100 text-green-700 rounded-lg text-center"
    >
      Calendar successfully updated!
    </div>
  </div>
</template>

<script setup>
import BaseModal from '@/components/BaseModal.vue'
import { useCalendarOptionsStore } from '@/stores/calendarOptions'
import { storeToRefs } from 'pinia'
const optionsStore = useCalendarOptionsStore()
const { getDays, getCalendarCategories } = storeToRefs(optionsStore)

import { ref } from 'vue'

const calendar = ref({
  name: '',
  category: '',
  shiftType: '',
  variationType: '',
  description: '',
  restLeaveStart: '',
  restLeaveEnd: '',
  weeklyRestDay: '',
  weeklyHoliday: '',
  term1: { start: '', end: '' },
  term2: { start: '', end: '' },
  holidayEvents: [
    { name: '', date: '' },
    { name: '', date: '' },
    { name: '', date: '' },
  ],
  states: [],
  agencies: [],
  publicHolidays: []
})


const showModal = ref(false)
const selectedContent = ref('')
const modalTitle = ref('')

function openModal(type) {
  selectedContent.value = type
  modalTitle.value = {
    agencies: 'Agency List',
    states: 'State List',
    holidays: 'Public Holiday List',
  }[type]
  showModal.value = true
}
function handleSelect(payload) {
  if (selectedContent.value === 'states') {
    calendar.value.states = payload
  } else if (selectedContent.value === 'agencies') {
    calendar.value.agencies = payload
  }
}

const isSuccess = ref(false)

function resetCalendar() {
  calendar.value = {
    name: '',
    category: '',
    shiftType: '',
    variationType: '',
    description: '',
    restLeaveStart: '',
    restLeaveEnd: '',
    weeklyRestDay: '',
    weeklyHoliday: '',
    term1: { start: '', end: '' },
    term2: { start: '', end: '' },
    holidayEvents: [
      { name: '', date: '' },
      { name: '', date: '' },
      { name: '', date: '' },
    ],
    states: [],
    agencies: [],
    publicHolidays: []
  }
  isSuccess.value = false
}



function submitCalendar() {
  setTimeout(() => {
    isSuccess.value = true
  }, 1000)
}

</script>

<style >
input, select, button {
  transition: border-color 0.2s ease-in-out;
}

input:focus, select:focus {
  border-color: #1D4ED8;
}

button:hover {
  transform: scale(1.05);
}
</style>
