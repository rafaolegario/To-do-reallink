import { useNavigate, useSearchParams } from "react-router-dom"; 
import { getTask } from "../http/get-task"; 
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import type { Task } from "./ListTasks"; 

function ViewTask() {
  const navigate = useNavigate(); // Hook para redirecionar o usuário
  const [searchParams] = useSearchParams(); // Hook para acessar os parâmetros da URL
  const taskId = searchParams.get("taskId"); // Obtém o ID da tarefa da query string

  const [task, setTask] = useState<Task | null>(null); // Estado que guarda os dados da tarefa

  // Faz a requisição da tarefa assim que o componente é montado ou taskId muda
  useEffect(() => {
    async function fetchTask() {
      try {
        const taskData = await getTask(Number(taskId)); // Busca a tarefa com o ID obtido da URL
        setTask(taskData); // Atualiza o estado com os dados recebidos
      } catch (error) {
        console.error("Erro ao buscar tarefa:", error); // Trata erros de requisição
      }
    }

    fetchTask();
  }, [taskId]); // Dependência: sempre que taskId mudar, executa novamente

  // Se os dados da tarefa ainda não foram carregados
  if (!task) {
    return (
      <div className="w-screen h-screen bg-[#1e1e1e] flex flex-col md:flex-row items-center justify-center p-2 gap-4"></div>
    );
  }

  // Renderização do conteúdo quando a tarefa foi carregada
  return (
    <div className="w-screen h-screen bg-[#1e1e1e] flex flex-col md:flex-row items-center justify-center p-2 gap-4">
      {/* Container do card da tarefa */}
      <div className="w-full md:max-w-[600px] h-full md:h-[90vh] bg-[#252526] p-6 rounded-lg shadow-lg flex flex-col gap-4 overflow-hidden">
        
        {/* Botão de voltar */}
        <div className="flex justify-center relative mb-8">
          <button
            onClick={() => navigate(-1)} // Volta para a página anterior
            className="absolute group top-12 left-0 p-2 text-white bg-blue-500 rounded-lg cursor-pointer hover:bg-blue-600 transition-colors"
          >
            <FaArrowLeft size={18} />
            {/* Tooltip do botão voltar */}
            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex bg-gray-700 text-white text-sm px-2 py-1 rounded whitespace-nowrap">
              Voltar
            </span>
          </button>
        </div>

        {/* Título da aplicação */}
        <h1 className="text-3xl font-bold text-[#d4d4d4] text-center">
          To do List - Reallink
        </h1>

        {/* Conteúdo com os detalhes da tarefa */}
        <div className="w-full h-full flex flex-col items-center bg-[#1e1e1e] text-white p-4">
          <h2 className="text-4xl font-bold mb-4">Detalhes da Tarefa:</h2>
          <p className="mb-4 text-3xl font-bold text-center">{task?.title}</p>
          <p className="mb-4 text-2xl text-center">{task?.description}</p>
          <p
            className={`mb-2 p-1 text-2xl text-black font-bold ${
              task?.status === "completed" ? "bg-green-500" : "bg-yellow-500"
            }`}
          >
            Status: {task?.status === "completed" ? "Concluída" : "Pendente"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ViewTask;
