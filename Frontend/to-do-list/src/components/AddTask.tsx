function AddTask(){
  return (
    <div className="add-task">
      <form>
        <input type="text" placeholder="Task Title" required />
        <textarea placeholder="Task Description" required></textarea>
        <button type="submit">Add Task</button>
      </form>
    </div>
  )
}

export default AddTask;