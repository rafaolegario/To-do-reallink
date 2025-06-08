<?php
require_once __DIR__ . '/../../../domain/application/To-do-list/repositories/tasks-repository.php';
require_once __DIR__ . '/../../../domain/entities/Task.php';
require_once __DIR__ . '/../../../infra/database/database-connection.php';

use App\Database\Database;


class MysqlRepository implements TasksRepository {
  private PDO $db;

  public function __construct() {
    $this->db = Database::connect();
  }

  public function create(Task $task): void {
    $query = $this->db->prepare("INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)");
    $query->execute([
      $task->getTitle(),
      $task->getDescription(),
      $task->getStatus()
    ]);
    $lastId = $this->db->lastInsertId();
    $task->setId($lastId);
  }

  public function findById(int $id): ?Task {
    $query = $this->db->prepare("SELECT * FROM tasks WHERE id = ?");
    $query->execute([$id]);
    $data = $query->fetch();

    if (!$data) {
      return null;
    }

    $task = new Task($data['id'], $data['title'], $data['description']);
    $task->setStatus($data['status']);
    return $task;
  }

  public function getAll(): array {
    $query = $this->db->query("SELECT * FROM tasks");
    $rows = $query->fetchAll();

    $tasks = [];
    foreach ($rows as $row) {
      $task = new Task($row['id'], $row['title'], $row['description']);
      $task->setStatus($row['status']);
      $tasks[] = $task;
    }
    return $tasks;
  }

  public function delete(int $id): void {
    $query = $this->db->prepare("DELETE FROM tasks WHERE id = ?");
    $query->execute([$id]);
  }

  public function update(Task $task, int $id): void {
    $query = $this->db->prepare("UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?");
    $query->execute([
      $task->getTitle(),
      $task->getDescription(),
      $task->getStatus(),
      $id
    ]);
  }
}
?>
