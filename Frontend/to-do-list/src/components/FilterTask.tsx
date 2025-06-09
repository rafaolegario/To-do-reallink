function FilterTask({ onChange }: { onChange: (value: 'all' | 'completed' | 'pending') => void }) {
  return (
    <div className="filter-task w-full flex justify-center items-center">
      <select
        className="bg-gray-800 text-white p-2 rounded shadow-lg hover:shadow-xl transition-shadow w-full"
        onChange={(e) => onChange(e.target.value as 'all' | 'completed' | 'pending')}
      >
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="pending">Pending</option>
      </select>
    </div>
  );
}

export default FilterTask;
