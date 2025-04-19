<template>
  <DxDataGrid
      :data-source="holidays"
      :show-borders="true"
      :column-auto-width="true"
      :search-panel="{ visible: true, width: 240, placeholder: 'Search...' }"
  >
    <DxColumn dataField="date" caption="Date" />
    <DxColumn dataField="day" caption="Day" />
    <DxColumn dataField="holidayname" caption="Holiday Name" />
  </DxDataGrid>
</template>

<script setup>
import { onMounted } from 'vue'
import { DxDataGrid, DxColumn } from 'devextreme-vue/data-grid'
import { useHolidayStore } from '@/stores/holidayStore'

const store = useHolidayStore()

onMounted(() => {
  store.fetchHolidays()
})

const holidays = store.getHolidays
</script>
