import { FaClipboardList, FaFilter } from "react-icons/fa"; 

// Componente Sidebar com props para tab ativa e função de mudança de tab
function SideBar({
  setActiveTab, // Função que define qual aba está ativa
  activeTab, // Aba atualmente ativa
}: {
  setActiveTab: (value: "add" | "filter") => void; // Tipagem da função de troca de aba
  activeTab: "add" | "filter"; // Tipagem da aba ativa
}) {
  return (
    <div className="flex md:flex-col flex-row gap-4 bg-[#252526] p-4 rounded-xl">
      
      {/* Botão de criar tarefa */}
      <button
        onClick={() => setActiveTab("add")} // Define aba ativa como "add"
        className={`relative p-3 rounded-full group hover:bg-[#3c3c3c] cursor-pointer ${
          activeTab === "add" ? "bg-[#007acc] text-white" : "text-[#d4d4d4]"
        }`}
      >
        <FaClipboardList size={25} /> {/* Ícone de tarefa */}
        {/* Tooltip que aparece ao passar o mouse */}
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex bg-gray-700 text-white text-sm px-2 py-1 rounded whitespace-nowrap">
          Criar tarefa
        </span>
      </button>

      {/* Botão de filtrar tarefas */}
      <button
        onClick={() => setActiveTab("filter")} // Define aba ativa como "filter"
        className={`relative p-3 rounded-full group hover:bg-[#3c3c3c] cursor-pointer ${
          activeTab === "filter" ? "bg-[#007acc] text-white" : "text-[#d4d4d4]"
        }`}
      >
        <FaFilter size={25} /> {/* Ícone de filtro */}
        {/* Tooltip que aparece ao passar o mouse */}
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex bg-gray-700 text-white text-sm px-2 py-1 rounded whitespace-nowrap">
          Filtra tarefas
        </span>
      </button>
    </div>
  );
}

export default SideBar;
