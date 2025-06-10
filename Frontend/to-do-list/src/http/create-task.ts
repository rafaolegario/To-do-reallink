export async function createTask(task: { title: string; description: string }) {
  const request = {
    title: task.title,
    description: task.description,
  };

  const response = await fetch(`http://localhost:8000/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error("Erro ao criar task");
  }

  const data = await response.json();
  return data;
}
