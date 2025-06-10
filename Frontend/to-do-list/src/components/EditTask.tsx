import { useEffect, useState } from "react";
import type { Task } from "./ListTasks";
import Modal from "react-modal";

Modal.setAppElement("#root");

interface EditTaskProps {
  task: Task;
  isOpen: boolean;
  onClose: () => void;
  onSaveTask?: (updatedTask: Task) => void;
}

function EditTask(props: EditTaskProps) {
  const [editedTitle, setEditedTitle] = useState(props.task.title);
  const [editedDescription, setEditedDescription] = useState(
    props.task.description
  );

  useEffect(() => {
    setEditedTitle(props.task.title);
    setEditedDescription(props.task.description);
  }, [props.task]);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    const updatedTask: Task = {
      ...props.task,
      title: editedTitle,
      description: editedDescription,
    };
    props.onSaveTask?.(updatedTask);
  }

  return (
    <Modal
      isOpen={props.isOpen}
      onRequestClose={props.onClose}
      contentLabel="Edit Task Modal"
      className="bg-gray-700 w-full p-6 rounded-lg max-w-md mx-auto mt-1 text-white shadow-xl border border-blue-500"
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      }}
    >
      <h2 className="text-2xl font-bold mb-4 text-center">Editar Tarefa</h2>
      <form onSubmit={handleSave} className="flex flex-col gap-4">
        <input
          type="text"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          placeholder="Título da tarefa"
          className="p-2 rounded bg-gray-800 text-white border border-blue-500 outline-0 focus:border-blue-700"
        />
        <textarea
          value={editedDescription}
          onChange={(e) => setEditedDescription(e.target.value)}
          placeholder="Descrição da tarefa"
          className="p-2 rounded bg-gray-800 text-white resize-none border border-blue-500 outline-0 focus:border-blue-700 h-24"
        />
        <div className="flex justify-end gap-3 mt-4">
          <button
            type="button"
            onClick={props.onClose}
            className="bg-gray-600 text-white p-2 rounded hover:bg-gray-700 transition-colors"
          >
            Fechar
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
          >
            Salvar Tarefa
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default EditTask;
