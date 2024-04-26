import { TasksRepository } from "../repositories/tasks.repository.js"

export class TasksController {
    static instance

    constructor() {
        this.repository = new TasksRepository()
    }

    getAllTasks = async (req, res) => {
        const allTasks = await this.repository.getTasks()
        return res.json(allTasks)
    }

    createTask = async (req, res) => {
        const task = req.body

        const createdTask = await this.repository.createTask(task)

        return res.json(createdTask)
    }

    updateTask = async (req, res) => {
        const id = Number(req.params.id)
        const task = req.body

        const taskUpdated = await this.repository.updateTask({ id, ...task })

        return res.json(taskUpdated)
    }

    deleteTask = async (req, res) => {
        const id = Number(req.params.id)

        await this.repository.deleteTask(id)

        return res.json({ ok: true })
    }
}
