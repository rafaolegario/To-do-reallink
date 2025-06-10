export async function deleteTask(taskId: number) {
  const response = await fetch(`http://localhost:8000/tasks/${taskId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error('Erro ao deletar task')
  }
}