import fs from 'fs'
import path from 'path'

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')
    const updatedCalendar = await readBody(event)
    const filePath = path.resolve('server/mocker/calendar.json')
    try {
        const data = fs.readFileSync(filePath, 'utf-8')
        let calendars = JSON.parse(data)
        const index = calendars.findIndex(c => c.id == id)
        calendars[index] = { ...updatedCalendar, id: parseInt(id) }
        fs.writeFileSync(filePath, JSON.stringify(calendars, null, 2), 'utf-8');
        console.log("File updated successfully");
        return { success: true, data: calendars[index] }
    } catch (error) {
        return { success: false, message: error.message }
    }
})
