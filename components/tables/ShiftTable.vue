<template>
  <div class="grid grid-cols-12 gap-4 px-4">

    <div class="col-span-12 md:col-start-4 md:col-span-6">
      <div class="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 class="text-lg font-bold mb-4 text-center">Select Shift</h2>
        <div>
          <label for="shiftSelect" class="block text-sm font-medium text-gray-700 mb-1">Shift</label>
          <select
              id="shiftSelect"
              v-model="selectedShiftId"
              @change="loadShiftDays"
              class="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select Shift</option>
            <option
                v-for="shift in shifts"
                :key="shift.id"
                :value="shift.id"
            >
              {{ shift.name }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <div class="col-span-12 ">
      <div class="bg-white p-4 rounded-lg shadow-md">
        <h3 class="text-md font-semibold mb-2">Shift Days</h3>
        <DxDataGrid
            :data-source="shiftDays"
            :show-borders="true"
            key-expr="day"
            @row-updated="onShiftDayUpdated"
        >
          <DxColumn dataField="day" caption="Day" :allowEditing="false" />
          <DxColumn dataField="start" caption="Start Time" />
          <DxColumn dataField="end" caption="End Time" />

          <DxEditing
              :allow-updating="true"
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
import { DxDataGrid, DxColumn, DxEditing } from 'devextreme-vue/data-grid'

const shifts = ref([])
const selectedShiftId = ref('')
const shiftDays = ref([])

onMounted(() => {
  fetchShifts()
})

async function fetchShifts() {
  try {
    const res = await $fetch('/api/shifts')
    shifts.value = res.data
  } catch (err) {
    console.error('Error fetching shifts:', err)
  }
}

async function loadShiftDays() {
  if (!selectedShiftId.value) {
    shiftDays.value = []
    return
  }

  try {
    const res = await $fetch(`/api/shifts/${selectedShiftId.value}`)
    shiftDays.value = res.data.days || []
  } catch (err) {
    console.error('Error loading shift details:', err)
  }
}

async function onShiftDayUpdated(e) {
  try {
    const updatedShift = {
      id: selectedShiftId.value,
      days: shiftDays.value
    }

    await $fetch(`/api/shifts/${selectedShiftId.value}`, {
      method: 'PUT',
      body: updatedShift
    })

    console.log('Shift updated successfully.')
  } catch (err) {
    console.error('Error updating shift:', err)
  }
}
</script>
