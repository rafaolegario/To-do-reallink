<?php
  require_once 'domain/application/To-do-list/repositories/tasks-repository.php';
  require_once 'domain/entities/Task.php';

  class GetAllTasksUseCase {
    private $taskRepository;

    public function __construct(TasksRepository $taskRepository) {
      $this->taskRepository = $taskRepository;
    }

    public function execute() {
      $tasks = $this->taskRepository->getAll();
      return ['Tasks' => $tasks];
    }
  }
?>