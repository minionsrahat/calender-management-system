import { defineStore } from 'pinia'

export const useAgencyStore = defineStore('agency', {
    state: () => ({
        agencies: [],
    }),
    actions: {
        async fetchAgencies() {
            const data = await $fetch('/api/agencies')
            this.agencies = data
        },

        updateSelectedAgencies(selectedIds) {
            console.log('set selected agencies', selectedIds)
            this.agencies = this.agencies.map(agency => ({
                ...agency,
                selected: selectedIds.includes(agency.id)
            }))
        }
    },
    getters: {
        getAllAgencies: (state) => state.agencies,
        selectedAgencyIds: (state) => state.agencies
            .filter(agency => agency.selected)
            .map(agency => agency.id)
    }
})
