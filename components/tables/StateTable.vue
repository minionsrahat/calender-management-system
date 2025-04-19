<template>
  <DxDataGrid
      :data-source="states"
      :show-borders="true"
      :column-auto-width="true"
      :selection="{ mode: 'multiple' }"
      @selection-changed="onSelectionChanged"
  >
    <DxColumn dataField="id" caption="ID" />
    <DxColumn dataField="name" caption="State Name" />
  </DxDataGrid>
</template>

<script setup>
import { onMounted } from 'vue'
import { DxDataGrid, DxColumn } from 'devextreme-vue/data-grid'
import { useStateStore } from '@/stores/stateStore'

const emit = defineEmits(['statesSelected'])
const store = useStateStore()
const states =computed(() => store.getStates)

function onSelectionChanged(e) {
  console.log('Selected States:', e.selectedRowsData)
  emit('statesSelected', e.selectedRowsData)
}
</script>
