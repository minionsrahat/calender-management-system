<template>
  <DxPopup
      :visible="visible"
      :show-title="true"
      :title="title"
      :width="800"
      :height="600"
      :close-on-outside-click="true"
      :show-close-button="true"
      @hiding="$emit('close')"
  >
    <template #default>
      <div class="px-4 py-2">
        <component :is="currentComponent" />
      </div>
    </template>
  </DxPopup>
</template>

<script setup>
import { computed } from 'vue'
import { DxPopup } from 'devextreme-vue/popup'

import AgencyTable from '~/components/tables/AgencyTable.vue'
import PublicHolidayTable from '~/components/tables/PublicHolidayTable.vue'
import StateTable from "~/components/tables/StateTable.vue";
import ShiftTable from "~/components/tables/ShiftTable.vue";

const props = defineProps({
  visible: Boolean,
  title: String,
  contentType: String,
})

const componentMap = {
  agencies: AgencyTable,
  holidays: PublicHolidayTable,
  states: StateTable,
  shifts: ShiftTable,
}

const currentComponent = computed(() => componentMap[props.contentType] || null)
</script>
