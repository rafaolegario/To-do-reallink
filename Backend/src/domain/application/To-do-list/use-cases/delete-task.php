<?php
  require_once 'src/domain/application/To-do-list/repositories/tasks-repository.php';
  require_once 'src/domain/entities/Task.php';

  class DeleteTaskUseCase {
    private $taskRepository;

    public function __construct(TasksRepository $taskRepository) {
      $this->taskRepository = $taskRepository;
    }

    public function execute($id) {
      $task = $this->taskRepository->findById($id);

      if(!$task){
        throw new InvalidArgumentException("Task with id: $id not found.");
      }

      $this->taskRespository->delete($id);

      return ['message' => 'Task deleted with success'];

    }
  }
?>