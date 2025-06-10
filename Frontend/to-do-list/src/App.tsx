import { useEffect, useState } from 'react'
import AddTask from './components/AddTask'
import ListTasks, { type Task } from './components/ListTasks'
import FilterTask from './components/FilterTask'
import SideBar from './components/SideBar'
import { getAllTasks } from './http/get-all-tasks'
import { updateTask } from './http/update-task'
import { createTask } from './http/create-task'
import { deleteTask } from './http/delete-task'

function App() {
  const [tasks, setTasks] = useState<Task[]>([])

  const [activeTab, setActiveTab] =  useState<'add' | 'filter'>('add')
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all');

  async function fetchTasks() {
    const data = await getAllTasks()
    if (data) setTasks(data)  
  }

  useEffect(() => {fetchTasks()}, [])

  async function OnAddTask(task: {title: string, description: string}) {
    const newTask = await createTask(task)
    if (newTask) {
      setTasks(prev => [...prev, newTask])
    }
  }

  async function OnSaveTask(task: Task) {
    await updateTask(task)
    setTasks(prevTasks =>
    prevTasks.map(t => (t.id === task.id ? task : t))
    )
  }

  async function OnDeleteTask(taskId: number) {
    setTasks(prevTasks =>
    prevTasks.filter(t => t.id !== taskId)
    )
    await deleteTask(taskId)
  }

  return (
    <div className='w-screen h-screen bg-[#1e1e1e] flex flex-col md:flex-row items-center justify-center p-2 gap-4'>

      <div className='w-full md:max-w-[600px] h-full md:h-[90vh] bg-[#252526] p-6 rounded-lg shadow-lg flex flex-col gap-4 overflow-hidden'>
        <h1 className='text-3xl font-bold text-[#d4d4d4] text-center'>To do List - Reallink</h1>
        
        {activeTab === 'add' && (
          <>
            <AddTask OnAddTask={OnAddTask} />
            <ListTasks tasks={tasks} filter='all' OnSaveTask={OnSaveTask} OnDeleteTask={OnDeleteTask} />
          </>
        )}

        {activeTab === 'filter' && (
          <div className='text-[#d4d4d4]'>
            <FilterTask onChange={setFilter} />
            <ListTasks tasks={tasks} filter={filter} OnSaveTask={OnSaveTask} OnDeleteTask={OnDeleteTask} />
          </div>
        )}
      </div>

      <SideBar setActiveTab={setActiveTab} activeTab={activeTab} />

    </div>
  )
}

export default App
