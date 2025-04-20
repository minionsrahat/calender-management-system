<template>
  <div class="grid grid-cols-12 gap-4 px-4">

    <!-- Search Category Card - 6 columns centered -->
    <div class="col-span-12 md:col-start-4 md:col-span-6">
      <div class="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 class="text-lg font-bold mb-4 text-center">Search Calendars</h2>
        <div>
          <label for="calendarCategory" class="block text-sm font-medium text-gray-700 mb-1">Calendar Category</label>
          <select
              id="calendarCategory"
              v-model="selectedCategory"
              @change="filterCalendars"
              class="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select Category</option>
            <option
                v-for="category in calendarCategories"
                :key="category.value"
                :value="category.value"
            >
              {{ category.label }}
            </option>
          </select>
        </div>
      </div>
    </div>


    <div class="col-span-12 md:col-start-3 md:col-span-8">
      <div class="bg-white p-4 rounded-lg shadow-md">
        <DxDataGrid
            :data-source="filteredCalendars"
            key-expr="id"
            :show-borders="true"
            @editing-start="onEditingStart"
            @row-removing="onRowRemoving"
        >
          <DxSearchPanel :visible="true" :highlight-case-sensitive="false" :width="240" placeholder="Search..." />
          <DxPaging :enabled="true" :page-size="15" />
          <DxPager
              :visible="true"
              :allowed-page-sizes="[15, 30, 20]"
              :show-page-size-selector="true"
              :show-info="true"
              :show-navigation-buttons="true"
          />
          <DxColumn dataField="name" caption="Calendar Name" />
          <DxColumn caption="Category"  :calculate-display-value="(rowData) =>findCalendarCategoryLabelByValue(rowData.category) "/>

          <DxEditing
              :allow-updating="true"
              :allow-deleting="true"
              mode="row"
              :use-icons="true"
          />
        </DxDataGrid>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import {DxDataGrid, DxColumn, DxButton, DxEditing, DxPager, DxSearchPanel, DxPaging} from 'devextreme-vue/data-grid'
import { storeToRefs } from 'pinia'
const router = useRouter()
const selectedCategory = ref('')
const calendarCategories = ref([])
const calendars = ref([])
const filteredCalendars = ref([])


const optionsStore = useCalendarOptionsStore()
const { getCalendarCategories,findCalendarCategoryLabelByValue } = storeToRefs(optionsStore)

onMounted(() => {
  calendarCategories.value = getCalendarCategories.value || []
  fetchCalendars()
})

async function fetchCalendars() {
  try {
    const response = await $fetch('/api/calendars')
    calendars.value = response.data
    filteredCalendars.value = response.data
  } catch (err) {
    console.error('Error fetching calendars:', err)
  }
}

function onEditingStart(e) {
  e.cancel = true
  const calendarId = e.data.id
  router.push(`/calendar/edit/${calendarId}`)
}

async function onRowRemoving(e) {
  const calendarId = e.data.id
  try {
    const res = await $fetch(`/api/calendars/${calendarId}`, { method: 'DELETE' })

    if (res.success) {
      await fetchCalendars()
    } else {
      alert(res.message || 'Failed to delete calendar.')
      e.cancel = true
    }
  } catch (error) {
    console.error('Error deleting calendar:', error)
    alert('Something went wrong while deleting the calendar.')
    e.cancel = true
  }
}


function filterCalendars() {
  if (selectedCategory.value) {
    filteredCalendars.value = calendars.value.filter(
        (calendar) => calendar.category === selectedCategory.value
    )
  } else {
    filteredCalendars.value = calendars.value
  }
}
</script>

<style scoped>
/* Optional styles */
</style>
