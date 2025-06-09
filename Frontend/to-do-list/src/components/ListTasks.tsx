import { FaEye, FaPen, FaTrash } from "react-icons/fa";

export type Task = {
  id: number
  title: string
  description: string
  status: 'pending' | 'completed'
};

interface ListTasksProps {
  tasks: Task[]
  filter?: 'all' | 'completed' | 'pending'
  saveTask?: (task: Task) => void
}

function ListTasks(props: ListTasksProps) {

  const filteredTasks = props.filter === 'all'
    ? props.tasks
    : props.tasks.filter(task => task.status === props.filter)

  return (
    <div className="  h-[85%] list-tasks overflow-auto mt-3">
      <ul className="bg-transparent p-4 rounded shadow-lg">
        {filteredTasks.map(task => (
          <li
            key={task.id}
            className={`bg-gray-800 p-2 mb-2 rounded shadow hover:shadow-lg transition-shadow flex items-center justify-between ${task.status === 'completed' ? 'line-through text-gray-500 bg-green-900' : 'text-white'} `}
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={task.status === 'completed'}
                onChange={() => {
                  if (props.saveTask) {
                    props.saveTask({ ...task, status: task.status === 'completed' ? 'pending' : 'completed' });
                  }
                }}
               
              />
              <h3 className="font-bold">{task.title}</h3>
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
