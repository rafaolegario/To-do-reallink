export async function getTask(taskId: number) {
  const response = await fetch(`http://localhost:8000/tasks/${taskId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar tasks");
  }
  const data = await response.json();

  return data.Task;
}
