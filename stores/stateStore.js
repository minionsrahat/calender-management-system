import { defineStore } from 'pinia'

export const useStateStore = defineStore('state', {
    state: () => ({
        states: []
    }),
    actions: {
        async fetchStates() {
            const data = await $fetch('/api/states')
            this.states = data
        },
        updateSelectedStates(selectedIds) {
            this.states = this.states.map(state => ({
                ...state,
                selected: selectedIds.includes(state.id)
            }))
        }
    },
    getters: {
        getStates(state) {
            return state.states
        },
        selectedStateIds(state) {
            return state.states
                .filter(state => state.selected)
                .map(state => state.id)
        }
    }
})
