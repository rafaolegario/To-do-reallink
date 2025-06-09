import { useEffect, useState } from 'react'

import AddTask from './components/AddTask'
import ListTasks, { type Task } from './components/ListTasks'
import FilterTask from './components/FilterTask'
import SideBar from './components/SideBar'
import { getAllTasks } from './http/get-all-tasks'
import { updateTask } from './http/update-task'


function App() {
  const [tasks, setTasks] = useState<Task[]>([])

  const [activeTab, setActiveTab] =  useState<'add' | 'filter'>('add')
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all');

  useEffect(() => {
  const fetchTasks = async () => {
    const data = await getAllTasks()
    if (data) setTasks(data)  
  }
    fetchTasks()
  }, [])

  async function saveTask(task: Task) {
    setTasks(prevTasks =>
    prevTasks.map(t => (t.id === task.id ? task : t))
    )
    await updateTask(task)
  }


  return (
    <div className='w-screen h-screen bg-[#1e1e1e] flex flex-col md:flex-row items-center justify-center p-2 gap-4'>

      <div className='w-full md:max-w-[600px] h-full md:h-[90vh] bg-[#252526] p-6 rounded-lg shadow-lg flex flex-col gap-4 overflow-hidden'>
        <h1 className='text-3xl font-bold text-[#d4d4d4] text-center'>To do List - Reallink</h1>
        
        {activeTab === 'add' && (
          <>
            <AddTask />
            <ListTasks tasks={tasks} filter='all' saveTask={saveTask} />
          </>
        )}

        {activeTab === 'filter' && (
          <div className='text-[#d4d4d4]'>
            <FilterTask onChange={setFilter} />
            <ListTasks tasks={tasks} filter={filter} saveTask={saveTask} />
          </div>
        )}
      </div>

      <SideBar setActiveTab={setActiveTab} activeTab={activeTab} />

    </div>
  )
}

export default App
