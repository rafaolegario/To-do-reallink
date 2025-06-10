import { useCallback, useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import ListTasks, { type Task } from "./components/ListTasks";
import FilterTask from "./components/FilterTask";
import SideBar from "./components/SideBar";
import { getAllTasks } from "./http/get-all-tasks";
import { updateTask } from "./http/update-task";
import { createTask } from "./http/create-task";
import { deleteTask } from "./http/delete-task";
import toast, { Toaster } from "react-hot-toast";

function App() {
  // Estado para armazenar lista de tarefas
  const [tasks, setTasks] = useState<Task[]>([]);

  // Estado para controlar aba ativa do sidebar: 'add' ou 'filter'
  const [activeTab, setActiveTab] = useState<"add" | "filter">("add");

  // Estado para armazenar filtro selecionado: todas, concluídas ou pendentes
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");

  // Busca as tarefas na API ao montar o componente
  useEffect(() => {
    (async () => {
      const data = await getAllTasks();
      if (data) setTasks(data);
    })();
  }, []);

  // Função para criar uma nova tarefa
  async function OnAddTask(task: { title: string; description: string }) {
    try {
      const newTask = await createTask(task);
      if (newTask) {
        toast.success("Tarefa criada com sucesso");
        setTasks((prev) => [...prev, newTask]);
      }
    } catch {
      toast.error("Erro ao criar tarefa");
    }
  }

  // Função para atualizar tarefa (edit, status, etc)
  const OnSaveTask = useCallback(async (task: Task) => {
    try {
      await updateTask(task);
      toast.success("Tarefa salva");
      // Atualiza a lista substituindo a tarefa editada
      setTasks((prev) => prev.map((t) => (t.id === task.id ? task : t)));
    } catch {
      toast.error("Erro ao salvar");
    }
  }, []);

  // Função para deletar uma tarefa
  const OnDeleteTask = useCallback(async (taskId: number) => {
    try {
      await deleteTask(taskId);
      toast.success("Tarefa deletada");
      // Remove a tarefa deletada da lista
      setTasks((prev) => prev.filter((t) => t.id !== taskId));
    } catch {
      toast.error("Erro ao deletar");
    }
  }, []);

  return (
    <div className="w-screen h-screen bg-[#1e1e1e] flex flex-col md:flex-row items-center justify-center p-2 gap-4">
      {/* Toast notifications */}
      <Toaster position="bottom-center" reverseOrder={false} />

      <div
        id="app"
        className="w-screen h-screen bg-[#1e1e1e] flex flex-col md:flex-row items-center justify-center p-2 gap-4"
      >
        {/* Container principal da aplicação */}
        <div className="w-full md:max-w-[600px] h-full md:h-[90vh] bg-[#252526] p-6 rounded-lg shadow-lg flex flex-col gap-4 overflow-hidden">
          <h1 className="text-3xl font-bold text-[#d4d4d4] text-center">
            To do List - Reallink
          </h1>

          {/* Renderiza área de criação ou filtro de tarefas conforme aba ativa */}
          {activeTab === "add" ? (
            <>
              {/* Componente para adicionar tarefas */}
              <AddTask OnAddTask={OnAddTask} />
              {/* Lista de tarefas sem filtro */}
              <ListTasks
                tasks={tasks}
                filter="all"
                OnSaveTask={OnSaveTask}
                OnDeleteTask={OnDeleteTask}
              />
            </>
          ) : (
            <div className="text-[#d4d4d4]">
              {/* Componente para selecionar filtro */}
              <FilterTask onChange={setFilter} />
              {/* Lista de tarefas com filtro aplicado */}
              <ListTasks
                tasks={tasks}
                filter={filter}
                OnSaveTask={OnSaveTask}
                OnDeleteTask={OnDeleteTask}
              />
            </div>
          )}
        </div>

        {/* Sidebar para escolher entre adicionar ou filtrar tarefas */}
        <SideBar setActiveTab={setActiveTab} activeTab={activeTab} />
      </div>
    </div>
  );
}

export default App;
