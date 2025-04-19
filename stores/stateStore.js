import { defineStore } from 'pinia'

export const useStateStore = defineStore('state', {
    state: () => ({
        states: []
    }),
    actions: {
        async fetchStates() {
            this.states = await $fetch('/api/states')
        }
    },
    getters: {
        getStates(state) {
            return state.states
        }
    }
})
