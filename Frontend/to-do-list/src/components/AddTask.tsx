import type { FormEvent } from "react";

// Define a interface das props que o componente recebe
interface AddTaskProps {
  OnAddTask?: (task: { title: string; description: string }) => void;
}

function AddTask({ OnAddTask }: AddTaskProps) {
  // Função que lida com o envio do formulário
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Obtém os valores dos campos do formulário
    const form = e.currentTarget;
    const title = (
      form.elements.namedItem("title") as HTMLInputElement
    ).value.trim();
    const description = (
      form.elements.namedItem("description") as HTMLTextAreaElement
    ).value.trim();

    // Validação dos campos
    if (!title || !description) {
      alert("O título e descrição não podem ser vazios");
      return;
    }

    // Chama a função passada via props com os dados da nova tarefa
    OnAddTask?.({
      title,
      description,
    });
    
    form.reset(); // Limpa o formulário após o envio
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