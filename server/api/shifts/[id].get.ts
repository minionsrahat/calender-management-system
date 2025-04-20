import shifts from '~/server/mocker/shifts.json'

export default defineEventHandler((event) => {
    const id = parseInt(event.context.params.id)
    const shift = shifts.find(s => s.id === id)

    if (!shift) {
        return { status: false, message: 'Shift not found' }
    }

    return {
        status: true,
        data: shift
    }
})
