import calendars from '~/server/mocker/calendar.json'
export default defineEventHandler(() => {
    return {
        status: true,
        data: calendars
    }
})
