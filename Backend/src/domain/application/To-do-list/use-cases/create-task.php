<?php
  require_once 'src/domain/application/To-do-list/repositories/tasks-repository.php';
  require_once 'src/domain/entities/Task.php';

  class CreateTaskUseCase {
    private $taskRepository;

    public function __construct(TasksRepository $taskRepository) {
      $this->taskRepository = $taskRepository;
    }

    public function execute($title, $description) {
      if (empty($title) || empty($description)) {
        throw new InvalidArgumentException("Title and description cannot be empty.");
      }

      $task = new Task($title, $description);
      $this->taskRepository->create($task);
      return $task;
    }
  }
?>