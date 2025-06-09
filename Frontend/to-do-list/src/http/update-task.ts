import type { Task } from "../components/ListTasks"

export async function updateTask(task: Task) {
  const request = {
    title: task.title,
    description: task.description,
    status: task.status
  }

  const response = await fetch(`http://localhost:8000/tasks/${task.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request)

  })

  if(!response.ok){
    throw new Error('Erro ao salvar task')
  }

}