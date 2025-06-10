import type { FormEvent } from "react";

interface AddTaskProps {
  OnAddTask?: (task: { title: string; description: string }) => void
}

function AddTask({ OnAddTask }: AddTaskProps) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const title = (form.elements.namedItem("title") as HTMLInputElement).value.trim()
    const description = (form.elements.namedItem("description") as HTMLTextAreaElement).value.trim()

    if (!title || !description) {
      alert('O título e descrição não podem ser vazios')
      return
    }

    OnAddTask?.({
      title,
      description
    })
    form.reset()
  };

  return (
    <div className="add-task">
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Título da tarefa"
          required
          className="p-2 rounded bg-gray-800 text-white border border-blue-500 outline-0"
        />
        <textarea
          name="description"
          placeholder="Descrição da tarefa"
          required
          className="p-2 rounded bg-gray-800 text-white resize-none border border-blue-500 outline-0"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 cursor-pointer"
        >
          Adicionar Tarefa
        </button>
      </form>
    </div>
  );
}

export default AddTask;
