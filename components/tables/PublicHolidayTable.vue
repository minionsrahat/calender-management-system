<template>
  <DxDataGrid
      :data-source="holidays"
      :show-borders="true"
      :column-auto-width="true"
      :search-panel="{ visible: true, width: 240, placeholder: 'Search...' }"
  >
    <DxPaging :enabled="true" :page-size="15" />
    <DxPager
        :visible="true"
        :allowed-page-sizes="[15, 30, 20]"
        :show-page-size-selector="true"
        :show-info="true"
        :show-navigation-buttons="true"
    />
    <DxColumn dataField="date" caption="Date" />
    <DxColumn dataField="day" caption="Day" />
    <DxColumn dataField="holidayname" caption="Holiday Name" />
  </DxDataGrid>
</template>

<script setup>
import { onMounted } from 'vue'
import {DxDataGrid, DxColumn, DxPager, DxPaging} from 'devextreme-vue/data-grid'
import { useHolidayStore } from '@/stores/holidayStore'

const store = useHolidayStore()

onMounted(() => {
  store.fetchHolidays()
})

const holidays = store.getHolidays
</script>
