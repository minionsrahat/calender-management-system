import fs from 'fs'
import path from 'path'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const filePath = path.resolve('server/mocker/calendar.json')
    try {
        const data = fs.readFileSync(filePath, 'utf-8')
        const calendars = JSON.parse(data)
        const newCalendar = {
            id: Date.now(),
            ...body
        }
        calendars.push(newCalendar)
        fs.writeFileSync(filePath, JSON.stringify(calendars, null, 2), 'utf-8')

        return {
            success: true,
            message: 'Calendar added successfully',
            data: newCalendar
        }
    } catch (error) {
        return {
            success: false,
            message: 'Failed to save calendar',
            error: error.message
        }
    }
})
