<?php
  require_once 'domain/application/To-do-list/repositories/tasks-repository.php';
  require_once 'domain/entities/Task.php';

  class GetTaskUseCase {
    private $taskRepository;

    public function __construct(TasksRepository $taskRepository) {
      $this->taskRepository = $taskRepository;
    }

    public function execute($id) {
      $task = $this->taskRepository->findById($id);

      if(!$task){
        throw new InvalidArgumentException("Task with id: $id not found.");
      }

      return ['Task' => $task];

    }
  }
?>