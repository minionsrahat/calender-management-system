<template>
  <DxDataGrid
      :data-source="states"
      :show-borders="true"
      :column-auto-width="true"
      :selection="{ mode: 'multiple', showCheckBoxesMode: 'always' }"
      :selected-row-keys="selectedKeys"
      @selection-changed="onSelectionChanged"
      key-expr="id"
  >
    <DxColumn dataField="name" caption="State Name" />
  </DxDataGrid>
</template>

<script setup>
import { computed } from 'vue'
import { DxDataGrid, DxColumn } from 'devextreme-vue/data-grid'
import { useStateStore } from '@/stores/stateStore'

const store = useStateStore()

const states = computed(() => store.getStates)
const selectedKeys = computed(() => store.selectedStateIds)

function onSelectionChanged(e) {
  store.updateSelectedStates(e.selectedRowKeys)
}
</script>
