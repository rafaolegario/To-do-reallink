import { FaEye, FaPen, FaTrash } from "react-icons/fa";

export type Task = {
  id: number;
  title: string;
  description: string;
  status: 'pending' | 'completed';
};

function ListTasks(props: { tasks: Task[], filter?: 'all' | 'completed' | 'pending' }) {
  const { tasks, filter } = props;

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  return (
    <div className="list-tasks overflow-auto">
      <ul className="bg-transparent p-4 rounded shadow-lg">
        {filteredTasks.map(task => (
          <li
            key={task.id}
            className="bg-gray-800 p-2 mb-2 rounded shadow hover:shadow-lg transition-shadow flex items-center justify-between"
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={task.status === 'completed'}
                readOnly
              />
              <h3 className="font-bold text-white">{task.title}</h3>
            </div>
            <div className="flex items-center gap-4 text-white">
              <button className="cursor-pointer hover:text-[#007acc]"><FaEye size={18} /></button>
              <button className="cursor-pointer hover:text-[#007acc]"><FaPen size={18} /></button>
              <button className="cursor-pointer hover:text-[#007acc]"><FaTrash size={18} /></button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}


export default ListTasks;
