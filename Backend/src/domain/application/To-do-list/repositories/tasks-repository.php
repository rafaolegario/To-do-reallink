<?php
  require_once 'domain/entities/Task.php';

  interface TasksRepository {
    public function create(Task $task): void;
    public function findById(int $id): ?Task;
    public function getAll(): array;
    public function update(Task $task, int $id): void;
    public function delete(int $id): void;
  }
?>