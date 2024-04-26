export class TasksController {
    constructor() {
        this.tasks = [{
            id: 1,
            checked: false,
            name: "Teste 1"
        }, {
            id: 2,
            checked: false,
            name: "Teste 2"
        }]
        this.lastId = 2
    }

    getAllTasks = (req, res) => {
        return res.json(this.tasks)
    }

    createTask = (req, res) => {
        const task = req.body

        this.lastId++
        task.id = this.lastId
        this.tasks.push(task)

        return res.json(task)
    }

    updateTask = (req, res) => {
        const id = Number(req.params.id)
        const taskReq = req.body

        const taskUpdated = this.tasks.find(task => task.id === id)
        taskUpdated.name = taskReq.name ? taskReq.name : taskUpdated.name
        taskUpdated.checked = typeof taskReq.checked == 'boolean' ? taskReq.checked : taskUpdated.checked

        return res.json(taskUpdated)
    }

    deleteTask = (req, res) => {
        const id = Number(req.params.id)

        this.tasks = this.tasks.filter(task => task.id != id)

        return res.json({ ok: true })
    }
}
