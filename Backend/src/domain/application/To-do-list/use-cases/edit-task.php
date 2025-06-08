<?php
  require_once 'domain/application/To-do-list/repositories/tasks-repository.php';
  require_once 'domain/entities/Task.php';

  class EditTaskUseCase {
    private $taskRepository;

    public function __construct(TasksRepository $taskRepository) {
      $this->taskRepository = $taskRepository;
    }

    public function execute($id, $title, $description, $status) {
      $task = $this->taskRepository->findById($id);

      if(!$task){
        throw new InvalidArgumentException("Task with id: $id not found.");
      }

      $task->setTitle($title);
      $task->setDescription($description);
      $task->setStatus($status);


      $this->taskRepository->update($task, $id);

      return [
        'message' => 'Task edited with success',
        'task' => $task, 
      ];

    }
  }
?>