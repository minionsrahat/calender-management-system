import fs from 'fs'
import path from 'path'

export default defineEventHandler(async (event) => {
    const id = parseInt(getRouterParam(event, 'id'))
    const filePath = path.resolve('server/mocker/calendar.json')

    try {
        const data = fs.readFileSync(filePath, 'utf-8')
        const calendars = JSON.parse(data)

        const index = calendars.findIndex(c => c.id === id)

        if (index === -1) {
            return { success: false, message: 'Calendar not found' }
        }

        calendars.splice(index, 1)
        fs.writeFileSync(filePath, JSON.stringify(calendars, null, 2))

        return {
            success: true,
            message: 'Calendar deleted successfully',
        }
    } catch (error) {
        return {
            success: false,
            message: error.message,
        }
    }
})
