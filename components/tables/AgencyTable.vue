<template>
  <DxDataGrid
      :data-source="agencies"
      :show-borders="true"
      :column-auto-width="true"
      @selection-changed="onSelectionChanged"
      :selection="{ mode: 'multiple', showCheckBoxesMode: 'always' }"
      key-expr="id"
  >
    <DxColumn dataField="name" caption="Agency Name" />
  </DxDataGrid>
</template>

<script setup>
import { DxDataGrid, DxColumn } from 'devextreme-vue/data-grid'
import { onMounted, computed } from 'vue'
import { useAgencyStore } from '@/stores/agencyStore'

const emit = defineEmits(['selected'])

const agencyStore = useAgencyStore()

const agencies = computed(() => agencyStore.getAllAgencies)

onMounted(() => {
  console.log('AgencyTable mounted')
  console.log(agencyStore.fetchAgencies())
})

function onSelectionChanged(e) {
  emit('selected', e.selectedRowsData)
}
</script>
