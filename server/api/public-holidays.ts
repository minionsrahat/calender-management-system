import holidays from '../mocker/public-holidays.json'

export default defineEventHandler(async () => {
    return holidays
})
