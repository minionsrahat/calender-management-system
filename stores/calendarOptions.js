// stores/calendarOptions.js
import { defineStore } from 'pinia'

export const useCalendarOptionsStore = defineStore('calendarOptions', {
    state: () => ({
        days: [
            { label: 'Sunday', value: 'sunday' },
            { label: 'Monday', value: 'monday' },
            { label: 'Tuesday', value: 'tuesday' },
            { label: 'Wednesday', value: 'wednesday' },
            { label: 'Thursday', value: 'thursday' },
            { label: 'Friday', value: 'friday' },
            { label: 'Saturday', value: 'saturday' }
        ],
        categories: [
            { label: 'Office Working Hours', value: 'office' },
            { label: 'Non-Office Working Hours', value: 'non-office' },
            { label: 'Different Working Hours', value: 'different' }
        ]
    }),

    getters: {
        getDays: (state) => state.days,
        getCalendarCategories: (state) => state.categories,
        findCalendarCategoryLabelByValue: (state) => (value) => {
            const category = state.categories.find((cat) => cat.value === value)
            return category ? category.label : null
        }
    }
})
