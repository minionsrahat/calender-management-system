import shifts from '~/server/mocker/shifts.json'

export default defineEventHandler(() => {
    return {
        status: true,
        data: shifts
    }
})
