const inputAddEl = document.querySelector('#task-input-txt')
const buttonAddTaskEl = document.querySelector('#add-btn')
const taskListEl = document.querySelector('.task-container')
const noTasksEl = document.querySelector('.no-tasks')

buttonAddTaskEl.addEventListener('click', () => {
    const value = inputAddEl.value
    createTask(value)
})

function deleteTask(id) {
    fetch('http://localhost:3333/api/tasks/' + id, { method: 'DELETE' })
        .then(() => {
            getAllTasks()
        })
}

function createTask(value) {
    fetch('http://localhost:3333/api/tasks/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: value, checked: false })
    })
        .then(() => {
            getAllTasks()
        })
}

function updateTask(id, name, checked) {
    fetch('http://localhost:3333/api/tasks/' + id, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: name, checked: checked })
    })
        .then(() => {
            getAllTasks()
        })
}

function mountTask(task) {
    const taskEl = document.createElement('label')
    const deleteButtonEl = document.createElement('button')
    const checkboxEl = document.createElement('input')
    const nameEl = document.createElement('p')
    const divCheckboxTask = document.createElement('div')
    const divTimeDelete = document.createElement('div')

    taskEl.className = 'task-wrapper'
    divCheckboxTask.className = 'task-wrapper-inner'
    divTimeDelete.className = 'task-wrapper-inner'

    deleteButtonEl.className = 'trash-btn'
    deleteButtonEl.innerHTML = '<span><i class="fa-regular fa-trash-can"></i></span>'
    deleteButtonEl.addEventListener('click', () => {
        deleteTask(task.id)
    })
    checkboxEl.type = 'checkbox'
    checkboxEl.name = 'task-' + task.id
    checkboxEl.checked = task.checked
    checkboxEl.addEventListener('change', () => {
        updateTask(task.id, task.name, checkboxEl.checked)
    })
    nameEl.innerHTML = task.name

    divCheckboxTask.appendChild(checkboxEl)
    divCheckboxTask.appendChild(nameEl)
    divTimeDelete.appendChild(deleteButtonEl)

    taskEl.appendChild(divCheckboxTask)
    taskEl.appendChild(divTimeDelete)

    taskListEl.appendChild(taskEl)
}

function getAllTasks() {
    fetch('http://localhost:3333/api/tasks')
        .then(response => response.json())
        .then(data => {
            if (!data || data.lenth === 0) {
                taskListEl.innerHTML = '<p class="no-tasks active">Nenhuma tarefa cadastrada</p>'
            } else {
                taskListEl.innerHTML = ''
                data.forEach(mountTask)
            }
        })
}

getAllTasks()