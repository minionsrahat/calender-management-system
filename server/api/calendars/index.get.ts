import fs from 'fs'
import path from 'path'

export default defineEventHandler(async (event) => {
    const filePath = path.resolve('server/mocker/calendar.json')
    try {
        const data = fs.readFileSync(filePath, 'utf-8')
        const calendars = JSON.parse(data)


        return { success: true, data: calendars }
    } catch (error) {
        return { success: false, message: error.message }
    }
})
