import fs from 'fs'
import path from 'path'

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')
    const filePath = path.resolve('server/mocker/calendar.json')

    try {
        const data = fs.readFileSync(filePath, 'utf-8')
        const calendars = JSON.parse(data)
        const calendar = calendars.find(c => c.id == id)

        if (!calendar) {
            throw new Error('Calendar not found')
        }

        return { success: true, data: calendar }
    } catch (error) {
        return { success: false, message: error.message }
    }
})
