import { useCallback, useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import AddTask from "./components/AddTask";
import ListTasks, { type Task } from "./components/ListTasks";
import FilterTask from "./components/FilterTask";
import SideBar from "./components/SideBar";
import { getAllTasks } from "./http/get-all-tasks";
import { createTask } from "./http/create-task";
import { updateTask } from "./http/update-task";
import { deleteTask } from "./http/delete-task";


function App() {
  // Estados
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeTab, setActiveTab] = useState<"add" | "filter">("add");
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");

  // Busca tarefas
  const fetchTasks = useCallback(async () => {
    const data = await getAllTasks();
    if (data) setTasks(data);
  }, []);

  useEffect(() => { fetchTasks(); }, [fetchTasks]);

  // Handlers
  const handleAddTask = async (task: { title: string; description: string }) => {
    try {
      const newTask = await createTask(task);
      if (newTask) {
        toast.success("Tarefa criada com sucesso");
        setTasks(prev => [...prev, newTask]);
      }
    } catch {
      toast.error("Erro ao criar tarefa");
    }
  };

  const handleSaveTask = useCallback(async (task: Task) => {
    try {
      await updateTask(task);
      toast.success("Tarefa salva");
      setTasks(prev => prev.map(t => t.id === task.id ? task : t));
    } catch {
      toast.error("Erro ao salvar");
    }
  }, []);

  const handleDeleteTask = useCallback(async (taskId: number) => {
    try {
      await deleteTask(taskId);
      toast.success("Tarefa deletada");
      setTasks(prev => prev.filter(t => t.id !== taskId));
    } catch {
      toast.error("Erro ao deletar");
    }
  }, []);

  // Componentes renderizados condicionalmente
  const renderActiveTab = () => {
    switch (activeTab) {
      case "add":
        return (
          <>
            <AddTask OnAddTask={handleAddTask} />
            <ListTasks
              tasks={tasks}
              filter="all"
              OnSaveTask={handleSaveTask}
              OnDeleteTask={handleDeleteTask}
            />
          </>
        );
      case "filter":
        return (
          <div className="text-[#d4d4d4]">
            <FilterTask onChange={setFilter} />
            <ListTasks
              tasks={tasks}
              filter={filter}
              OnSaveTask={handleSaveTask}
              OnDeleteTask={handleDeleteTask}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="app-container">
      <Toaster position="bottom-center" reverseOrder={false} />
      
      <div className="main-content">
        <div className="task-container">
          <h1 className="app-title">To do List - Reallink</h1>
          {renderActiveTab()}
        </div>
        
        <SideBar 
          setActiveTab={setActiveTab} 
          activeTab={activeTab} 
        />
      </div>
    </div>
  );
}

export default App;