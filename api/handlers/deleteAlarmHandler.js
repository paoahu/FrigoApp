import logic from "../logic/index.js"
import { errors } from "com"

const { NotFoundError, SystemError, ContentError } = errors

export default async (req, res) => {

    try {
        const { userId, alarmId } = req.params

        if (!userId || !alarmId) {
            return res.status(400).json({ error: "BadRequest", message: "alarmId and userId are required" })
        }

        let productAlarm = await logic.deleteAlarm(userId, alarmId)

        res.status(200).json({ message: `Alarm '${productAlarm}' deleted successfully` })

    } catch (error) {

        let status = 400
        if (error instanceof SystemError) {
            status = 500
        } else if (error instanceof NotFoundError) {
            status = 404
        } else if (error instanceof ContentError) {
            status = 406
        }

        res.status(status).json({ error: error.constructor.name, message: error.message })
        
    }
}