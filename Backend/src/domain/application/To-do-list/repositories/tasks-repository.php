<?php
  require_once 'domain/entities/Task.php';
  // Define a interface TasksRepository que especifica os métodos que devem ser implementados por qualquer repositório de tarefas
  interface TasksRepository {
    // Declaração dos métodos que devem ser implementados
    public function create(Task $task): void;
    public function findById(int $id): ?Task;
    public function getAll(): array;
    public function update(Task $task, int $id): void;
    public function delete(int $id): void;
  }
?>