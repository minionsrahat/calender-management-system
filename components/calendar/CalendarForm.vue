<template>
  <div class="max-w-5xl mx-auto p-8 bg-white rounded-xl shadow-xl space-y-10">
    <div class="text-center">
      <h2 class="text-4xl font-bold text-blue-700 mb-2">📅 Calendar Configuration</h2>
      <p class="text-gray-500 text-lg">Manage your calendar setup including shifts, holidays, and agencies</p>
    </div>

    <form @submit.prevent="submitCalendar" class="space-y-6">
    <div class="space-y-6">
      <div class="border-b border-gray-300 pb-2 flex items-center gap-3">
        <span class="text-2xl text-blue-600">🛠️</span>
        <h3 class="text-2xl font-semibold text-gray-700">Basic Information</h3>
      </div>
      <div class=" rounded-xl p-6 shadow-sm space-y-6">

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label for="calendarName" class="block text-lg font-medium text-gray-700 mb-2">Calendar Name</label>
            <input
                v-model="calendar.name"
                type="text"
                id="calendarName"
                class="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g. Office Calendar 2025"
                required
            />
          </div>
          <div>
            <label for="category" class="block text-lg font-medium text-gray-700 mb-2">Calendar Category</label>
            <select
                v-model="calendar.category"
                id="category"
                class="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
            >
              <option disabled value="">Select a category</option>
              <option v-for="category in getCalendarCategories" :key="category.value" :value="category.value">
                {{ category?.label }}
              </option>
            </select>
          </div>
        </div>


        <div>
          <label class="block text-lg font-medium text-gray-700 mb-2">Calendar Variation</label>
          <div class="flex gap-8">
            <label class="inline-flex items-center">
              <input type="radio" class="form-radio text-blue-600" value="Group A" v-model="calendar.variationType" />
              <span class="ml-2 text-gray-700">Group A</span>
            </label>
            <label class="inline-flex items-center">
              <input type="radio" class="form-radio text-blue-600" value="Group B" v-model="calendar.variationType" />
              <span class="ml-2 text-gray-700">Group B</span>
            </label>
          </div>
        </div>

        <div>
          <label for="description" class="block text-lg font-medium text-gray-700 mb-2">Description</label>
          <input
              v-model="calendar.description"
              type="text"
              id="description"
              class="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Short description of the calendar"
          />
        </div>

        <div class="w-full">
          <div class="flex flex-col md:flex-row md:items-end md:gap-12 gap-4">
            <div class="flex-1">
              <label for="shiftType" class="block text-lg font-medium text-gray-700 mb-2">Shift Type</label>
              <select
                  id="shiftType"
                  v-model="calendar.shiftType"
                  class="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
              >
                <option disabled value="">Select shift type</option>
                <option v-for="shift in shifts" :key="shift.id" :value="shift.id">
                  {{ shift.name }}
                </option>
              </select>
            </div>

            <div>
              <button
                  type="button"
                  @click="openModal('shifts')"
                  class="border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white font-bold py-2 px-4 rounded transition duration-200"
              >
                🏢 List of Shifts
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
    <hr class="border-t border-gray-300" />
    <div class="space-y-6">
      <div class="border-b border-gray-300 pb-2 flex items-center gap-3">
        <span class="text-2xl text-yellow-500">🌴</span>
        <h3 class="text-2xl font-semibold text-gray-700">Holiday & Term Breaks</h3>
      </div>
      <div class="rounded-xl p-6 shadow-sm space-y-6">

        <div>
          <label class="block text-lg font-medium text-gray-700 mb-2">Rest Leave Duration</label>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="date" v-model="calendar.restLeaveStart" class="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
            <input type="date" v-model="calendar.restLeaveEnd" class="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          </div>
        </div>

        <div>
          <h4 class="text-md font-semibold mb-2">Term 1</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="date" v-model="calendar.term1.start" class="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
            <input type="date" v-model="calendar.term1.end" class="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          </div>

          <h4 class="text-md font-semibold mt-6 mb-2">Term 2</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="date" v-model="calendar.term2.start" class="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
            <input type="date" v-model="calendar.term2.end" class="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          </div>
        </div>


        <div>
          <label class="block text-lg font-medium text-gray-700 mb-4">Holiday Events</label>
          <div v-for="(event, index) in calendar.holidayEvents" :key="index" class="mb-4">
            <h3 class="text-md font-semibold text-gray-800 mb-2">Event {{ index + 1 }}</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" v-model="event.name" class="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"placeholder="Event Name" />
              <input type="date" v-model="event.date" class="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <hr class="border-t border-gray-300" />
    <div class="space-y-6">
      <div class="border-b border-gray-300 pb-2 flex items-center gap-3">
        <span class="text-2xl text-green-600">⚙️</span>
        <h3 class="text-2xl font-semibold text-gray-700">Additional Settings</h3>
      </div>
      <div class="rounded-xl p-6 shadow-sm space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label for="weeklyRestDay" class="block text-lg font-medium text-gray-700 mb-2">Weekly Rest Day</label>
            <select v-model="calendar.weeklyRestDay" class="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option disabled value="">Select Rest Day</option>
              <option v-for="day in getDays" :key="day.value" :value="day.value">
                {{ day.label }}
              </option>
            </select>
          </div>
          <div>
            <label for="weeklyHoliday" class="block text-lg font-medium text-gray-700 mb-2">Weekly Holiday</label>
            <select v-model="calendar.weeklyHoliday"  class="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option disabled value="">Select Holiday</option>
              <option v-for="day in getDays" :key="day.value" :value="day.value">
                {{ day.label }}
              </option>
            </select>
          </div>
        </div>

        <div class="flex flex-row justify-between">
          <button type="button" @click="openModal('holidays')" class="border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white font-bold py-2 px-4 rounded transition duration-200">🎉 View Public Holidays</button>
          <button type="button" @click="openModal('states')"     class="border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white font-bold py-2 px-4 rounded transition duration-200">🏙️ Update States</button>
          <button type="button" @click="openModal('agencies')" class="border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white font-bold py-2 px-4 rounded transition duration-200">🏢 Update Agencies</button>

        </div>
      </div>
    </div>
    <div class="flex justify-center gap-4 mt-10">
      <button type="submit" class="border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white font-bold py-2 px-4 rounded transition duration-200">✅
      {{ calendarId ? 'Update Calendar' : 'Add Calendar' }}</button>

      <button type="button" v-if="!calendarId" @click="resetCalendar" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded transition duration-200"
      >♻️ Reset</button>
    </div>
  </form>


    <!-- Modal -->
    <BaseModal
        :visible="showModal"
        :title="modalTitle"
        :content-type="selectedContent"
        @close="showModal = false"
    />
  </div>
</template>

<script setup>
import { ref, watch, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import BaseModal from '@/components/BaseModal.vue'

const route = useRoute()
const calendarId = computed(() => route.params.id || null)

const optionsStore = useCalendarOptionsStore()
const agencyStore = useAgencyStore()
const stateStore = useStateStore()
const holidayStore = useHolidayStore()

const { getDays, getCalendarCategories } = storeToRefs(optionsStore)
const { getAllAgencies } = storeToRefs(agencyStore)
const { getStates } = storeToRefs(stateStore)
const { getHolidays } = storeToRefs(holidayStore)


const defaultCalendar = () => ({
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

const calendar = ref(defaultCalendar())
const shifts=ref([])
watch(() => getStates.value, (val) => (calendar.value.states = [...val]))
watch(() => getAllAgencies.value, (val) => (calendar.value.agencies = [...val]))
watch(() => getHolidays.value, (val) => (calendar.value.publicHolidays = [...val]))

const showModal = ref(false)
const selectedContent = ref('')
const modalTitle = ref('')
const router= useRouter()

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
  calendar.value[selectedContent.value] = payload
}

const resetCalendar = () => {
  calendar.value = defaultCalendar()
}
async function fetchShifts() {
  try {
    const res = await $fetch('/api/shifts')
    shifts.value = res.data
  } catch (err) {
    console.error('Error fetching shifts:', err)
  }
}


async function fetchCalendar(id) {
  try {
    const result = await $fetch(`/api/calendars/${id}`)
    if (result?.success) {
      calendar.value = result.data
      agencyStore.updateSelectedAgencies(result.data.agencies.filter(agency => agency.selected).map(agency => agency.id))
      stateStore.updateSelectedStates(result.data.states.filter(state => state.selected).map(agency => agency.id))
    }
  } catch (err) {
    console.error('Failed to fetch calendar:', err)
  }
}

async function submitCalendar() {
  try {
    const method = calendarId.value ? 'PUT' : 'POST'
    const url = calendarId.value ? `/api/calendars/${calendarId.value}` : '/api/calendars'
    const response = await $fetch(url, {
      method,
      body: JSON.parse(JSON.stringify(calendar.value))
    })
    if (response.success) {
     router.push('/calendar')
    } else {
      console.error('Error:', response.message)
    }
  } catch (err) {
    console.error('API Error:', err)
  }
}

onMounted(() => {
  if (calendarId.value) {
    fetchCalendar(calendarId.value)
  }
  fetchShifts()
})
</script>
