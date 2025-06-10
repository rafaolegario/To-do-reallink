import { FaEye, FaPen, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import EditTask from "./EditTask";
import { useState } from "react";

export type Task = {
  id: number;
  title: string;
  description: string;
  status: "pending" | "completed";
};

interface ListTasksProps {
  tasks: Task[];
  filter?: "all" | "completed" | "pending";
  OnSaveTask?: (task: Task) => void;
  OnDeleteTask?: (taskId: number) => void;
}

function ListTasks(props: ListTasksProps) {
  const filteredTasks =
    props.filter === "all"
      ? props.tasks
      : props.tasks.filter((task) => task.status === props.filter);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTaskToEdit, setSelectedTaskToEdit] = useState<Task | null>(
    null
  );

  const navigate = useNavigate();

  function onSeeDetailsClick(taskId: number) {
    const queryParams = new URLSearchParams();
    queryParams.set("taskId", taskId.toString());
    navigate(`/task?${queryParams.toString()}`);
  }

  function onEditTaskClick(task: Task) {
    setSelectedTaskToEdit(task);
    setIsEditModalOpen(true);
  }

  function onCloseEditModal() {
    setIsEditModalOpen(false);
    setSelectedTaskToEdit(null);
  }

  return (
    <div className="  h-[85%] list-tasks overflow-auto mt-3 z-20">
      <ul className="bg-transparent p-2 mt-3">
        {filteredTasks.map((task) => (
          <li
            key={task.id}
            className={`bg-gray-800 p-3 pr-9 mb-2 rounded shadow hover:shadow-lg transition-shadow flex items-center justify-between ${
              task.status === "completed"
                ? "line-through text-gray-500 bg-green-900"
                : "text-white"
            } `}
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                className="mr-2 w-4 h-4 accent-[#007acc] cursor-pointer"
                checked={task.status === "completed"}
                onChange={() => {
                  if (props.OnSaveTask) {
                    props.OnSaveTask({
                      ...task,
                      status:
                        task.status === "completed" ? "pending" : "completed",
                    });
                  }
                }}
              />
              <h3 className="font-bold text-lg truncate max-w-xs">
                {task.title}
              </h3>
            </div>
            <div className="flex items-center gap-4 text-white">
              <button
                onClick={() => onSeeDetailsClick(task.id)}
                className="relative group cursor-pointer hover:text-[#007acc]"
              >
                <FaEye size={18} />
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex bg-gray-700 text-white text-sm px-2 py-1 rounded whitespace-nowrap">
                  Ver detalhes
                </span>
              </button>
              <button
                onClick={() => onEditTaskClick(task)}
                className="relative group cursor-pointer hover:text-[#007acc]"
              >
                <FaPen size={18} />
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex bg-gray-700 text-white text-sm px-2 py-1 rounded whitespace-nowrap">
                  Editar tarefa
                </span>
              </button>
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
