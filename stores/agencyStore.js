import { defineStore } from 'pinia'

export const useAgencyStore = defineStore('agency', {
    state: () => ({
        agencies: [],
    }),
    actions: {
        async fetchAgencies() {
            const data = await $fetch('/api/agencies')
            this.agencies = data
        }
    },
    getters: {
        getAllAgencies: (state) => state.agencies
    }
})
