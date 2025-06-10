import { FaClipboardList, FaFilter } from "react-icons/fa";

function SideBar({
  setActiveTab,
  activeTab,
}: {
  setActiveTab: (value: "add" | "filter") => void;
  activeTab: "add" | "filter";
}) {
  return (
    <div className="flex md:flex-col flex-row gap-4 bg-[#252526] p-4 rounded-xl">
      <button
        onClick={() => setActiveTab("add")}
        className={`relative p-3 rounded-full group hover:bg-[#3c3c3c] cursor-pointer ${
          activeTab === "add" ? "bg-[#007acc] text-white" : "text-[#d4d4d4]"
        }`}
      >
        <FaClipboardList size={25} />
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex bg-gray-700 text-white text-sm px-2 py-1 rounded whitespace-nowrap">
          Criar tarefa
        </span>
      </button>
      <button
        onClick={() => setActiveTab("filter")}
        className={`relative p-3 rounded-full group hover:bg-[#3c3c3c] cursor-pointer ${
          activeTab === "filter" ? "bg-[#007acc] text-white" : "text-[#d4d4d4]"
        }`}
      >
        <FaFilter size={25} />

        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex bg-gray-700 text-white text-sm px-2 py-1 rounded whitespace-nowrap">
          Filtra tarefas
        </span>
      </button>
    </div>
  );
}

export default SideBar;
