import shifts from '~/server/mocker/shifts.json'
import { writeFileSync } from 'fs'
import { join } from 'path'

export default defineEventHandler(async (event) => {
    const id = parseInt(event.context.params.id)
    const body = await readBody(event)

    const index = shifts.findIndex(s => s.id === id)

    if (index === -1) {
        return {
            status: false,
            message: 'Shift not found',
        }
    }
    if (Array.isArray(body.days)) {
        shifts[index].days = body.days
    }
    const filePath = join(process.cwd(), '~/server/mocker/shifts.json')
    writeFileSync(filePath, JSON.stringify(shifts, null, 2))

    return {
        status: true,
        message: 'Shift updated successfully',
        data: shifts[index],
    }
})
