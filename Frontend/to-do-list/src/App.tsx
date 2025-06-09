import { useState } from 'react'
import './App.css'
import AddTask from './components/AddTask'
import ListTasks, { type Task } from './components/ListTasks'
import { FaPen, FaFilter } from 'react-icons/fa'
import FilterTask from './components/FilterTask'

function App() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: 'Sample Task',
      description: 'This is a sample task description',
      status: 'pending',
    },
    {
      id: 2,
      title: 'Another Task',
      description: 'This is another task description',
      status: 'completed',
    },
    {
      id: 3,
      title: 'Third Task',
      description: 'This is the third task description',
      status: 'pending',
    },
    {
      id: 4,
      title: 'Fourth Task',
      description: 'This is the fourth task description',
      status: 'completed',
    },
    {
      id: 5,
      title: 'Fifth Task',
      description: 'This is the fifth task description',
      status: 'pending',
    },
    {
      id: 6,
      title: 'Sixth Task',
      description: 'This is the sixth task description',
      status: 'pending',
    },
      {
      id: 5,
      title: 'Fifth Task',
      description: 'This is the fifth task description',
      status: 'pending',
    },
    {
      id: 6,
      title: 'Sixth Task',
      description: 'This is the sixth task description',
      status: 'pending',
    },
      {
      id: 5,
      title: 'Fifth Task',
      description: 'This is the fifth task description',
      status: 'pending',
    },
    {
      id: 6,
      title: 'Sixth Task',
      description: 'This is the sixth task description',
      status: 'pending',
    },
      {
      id: 5,
      title: 'Fifth Task',
      description: 'This is the fifth task description',
      status: 'pending',
    },
    {
      id: 6,
      title: 'Sixth Task',
      description: 'This is the sixth task description',
      status: 'pending',
    }
  ])
  const [activeTab, setActiveTab] = useState<'add' | 'filter'>('add')
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all');

  return (
    <div className='w-screen h-screen bg-[#1e1e1e] flex flex-row  justify-center p-6'>

      <div className='w-[600px] h-[600px] bg-[#252526] p-6 rounded-lg shadow-lg flex flex-col gap-4 mr-6'>
        <h1 className='text-3xl font-bold text-[#d4d4d4] text-center'>To do List - Reallink</h1>
        
        {activeTab === 'add' && (
          <>
            <AddTask />
            <ListTasks tasks={tasks} filter='all' />
          </>
        )}

        {activeTab === 'filter' && (
          <div className='text-[#d4d4d4]'>
            <FilterTask onChange={setFilter} />
            <ListTasks tasks={tasks} filter={filter} />
          </div>
        )}
      </div>
       <div className='h-[600px] flex flex-col items-center gap-4 bg-[#252526] p-4 rounded-xl'>
        <button 
          onClick={() => setActiveTab('add')}
          className={`p-3 rounded-full hover:bg-[#3c3c3c] cursor-pointer ${activeTab === 'add' ? 'bg-[#007acc] text-white' : 'text-[#d4d4d4]'}`}
        >
          <FaPen size={20} />
        </button>
        <button
          onClick={() => setActiveTab('filter')}
          className={`p-3 rounded-full hover:bg-[#3c3c3c] cursor-pointer ${activeTab === 'filter' ? 'bg-[#007acc] text-white' : 'text-[#d4d4d4]'}`}
        >
          <FaFilter size={20} />
        </button>
      </div>
    </div>
  )
}

export default App
