import { FaEye, FaPen, FaTrash } from "react-icons/fa"; 
import { useNavigate } from "react-router-dom"; 
import EditTask from "./EditTask"; 
import { useState } from "react";

// Definição do tipo Task
export type Task = {
  id: number;
  title: string;
  description: string;
  status: "pending" | "completed"; // Status da tarefa
};

interface ListTasksProps {
  tasks: Task[]; // Lista de tarefas
  filter?: "all" | "completed" | "pending"; // Filtro opcional
  OnSaveTask?: (task: Task) => void; // Callback para salvar tarefa editada ou status alterado
  OnDeleteTask?: (taskId: number) => void; // Callback para deletar tarefa
}

function ListTasks(props: ListTasksProps) {
  // Filtra as tarefas conforme o filtro selecionado, ou mostra todas
  const filteredTasks =
    props.filter === "all"
      ? props.tasks
      : props.tasks.filter((task) => task.status === props.filter);

  // Estado para controlar se o modal de edição está aberto
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  // Estado para armazenar a tarefa selecionada para edição
  const [selectedTaskToEdit, setSelectedTaskToEdit] = useState<Task | null>(
    null
  );

  // Hook para navegação no React Router
  const navigate = useNavigate();

  // Função para navegar para a página de detalhes da tarefa
  function onSeeDetailsClick(taskId: number) {
    const queryParams = new URLSearchParams();
    queryParams.set("taskId", taskId.toString());
    navigate(`/task?${queryParams.toString()}`); // Navega para rota /task com query param
  }

  // Abre o modal de edição e define a tarefa selecionada
  function onEditTaskClick(task: Task) {
    setSelectedTaskToEdit(task);
    setIsEditModalOpen(true);
  }

  // Fecha o modal de edição e limpa a tarefa selecionada
  function onCloseEditModal() {
    setIsEditModalOpen(false);
    setSelectedTaskToEdit(null);
  }

  return (
    <div className="h-[85%] list-tasks overflow-auto mt-3 z-20">
      <ul className="bg-transparent p-2 mt-3">
        {/* Mapeia as tarefas filtradas */}
        {filteredTasks.map((task) => (
          <li
            key={task.id}
            // Aplica estilos diferentes se a tarefa estiver concluída
            className={`bg-gray-800 p-3 pr-9 mb-2 rounded shadow hover:shadow-lg transition-shadow flex items-center justify-between ${
              task.status === "completed"
                ? "line-through text-gray-500 bg-green-900"
                : "text-white"
            } `}
          >
            <div className="flex items-center">
              {/* Checkbox para marcar/desmarcar tarefa concluída */}
              <input
                type="checkbox"
                className="mr-2 w-4 h-4 accent-[#007acc] cursor-pointer"
                checked={task.status === "completed"}
                onChange={() => {
                  if (props.OnSaveTask) {
                    // Atualiza o status invertendo entre pending e completed
                    props.OnSaveTask({
                      ...task,
                      status:
                        task.status === "completed" ? "pending" : "completed",
                    });
                  }
                }}
              />
              {/* Título da tarefa com truncamento se for muito longo */}
              <h3 className="font-bold text-lg truncate max-w-xs">
                {task.title}
              </h3>
            </div>
            <div className="flex items-center gap-4 text-white">
              {/* Botão para ver detalhes */}
              <button
                onClick={() => onSeeDetailsClick(task.id)}
                className="relative group cursor-pointer hover:text-[#007acc]"
              >
                <FaEye size={18} />
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex bg-gray-700 text-white text-sm px-2 py-1 rounded whitespace-nowrap">
                  Ver detalhes
                </span>
              </button>
              {/* Botão para editar tarefa */}
              <button
                onClick={() => onEditTaskClick(task)}
                className="relative group cursor-pointer hover:text-[#007acc]"
              >
                <FaPen size={18} />
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex bg-gray-700 text-white text-sm px-2 py-1 rounded whitespace-nowrap">
                  Editar tarefa
                </span>
              </button>
              {/* Botão para deletar tarefa */}
              <button
                className="relative group cursor-pointer hover:text-[#007acc]"
                onClick={() => props.OnDeleteTask?.(task.id)}
              >
                <FaTrash size={18} />
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex bg-gray-700 text-white text-sm px-2 py-1 rounded whitespace-nowrap">
                  Deletar tarefa
                </span>
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Renderiza o modal de edição apenas se houver uma tarefa selecionada */}
      {selectedTaskToEdit && (
        <EditTask
          task={selectedTaskToEdit}
          isOpen={isEditModalOpen}
          onClose={onCloseEditModal}
          onSaveTask={props.OnSaveTask}
        />
      )}
    </div>
  );
}

export default ListTasks;
