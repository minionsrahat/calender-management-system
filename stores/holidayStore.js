import { defineStore } from 'pinia'

export const useHolidayStore = defineStore('holiday', {
    state: () => ({
        holidays: []
    }),
    actions: {
        async fetchHolidays() {
            const data = await $fetch('/api/public-holidays')
            this.holidays = data
        }
    },
    getters: {
        getHolidays(state) {
            return state.holidays
        }
    }
})
