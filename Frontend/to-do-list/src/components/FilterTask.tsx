// Componente para filtrar tarefas
function FilterTask({
  onChange, // Função passada via props que será chamada ao mudar o filtro
}: {
  onChange: (value: "all" | "completed" | "pending") => void; // Tipagem do callback de mudança
}) {
  return (
    <div className="filter-task w-full flex flex-col justify-center items-center">
      <h2 className="text-[#d4d4d4] font-bold mb-4 text-2xl">
        Filtrar tarefas:
      </h2>
      <select
        className="bg-gray-800 text-white p-2 rounded shadow-lg hover:shadow-xl transition-shadow w-full"
        // Quando o valor muda, chama a função onChange com o valor selecionado,
        // convertendo a string para o tipo específico esperado
        onChange={(e) =>
          onChange(e.target.value as "all" | "completed" | "pending")
        }
      >
        <option value="all">Todas tarefas</option>
        <option value="completed">Tarefas concluídas</option>
        <option value="pending">Tarefas pendentes</option>
      </select>
    </div>
  );
}

export default FilterTask;
