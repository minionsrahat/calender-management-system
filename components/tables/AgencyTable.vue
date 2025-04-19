<template>
  <DxDataGrid
      :data-source="agencies"
      :show-borders="true"
      :column-auto-width="true"
      :selection="{ mode: 'multiple', showCheckBoxesMode: 'always' }"
      :selected-row-keys="selectedKeys"
      @selection-changed="onSelectionChanged"
      key-expr="id"
  >
    <DxColumn dataField="name" caption="Agency Name" />
  </DxDataGrid>
</template>

<script setup>
import { DxDataGrid, DxColumn } from 'devextreme-vue/data-grid'
import { computed } from 'vue'
import { useAgencyStore } from '@/stores/agencyStore'

const agencyStore = useAgencyStore()

const agencies = computed(() => agencyStore.getAllAgencies)
const selectedKeys = computed(() => agencyStore.selectedAgencyIds)

function onSelectionChanged(e) {
  agencyStore.updateSelectedAgencies(e.selectedRowKeys)
}
</script>
