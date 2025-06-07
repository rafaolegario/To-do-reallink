<?php
  require_once 'src/domain/application/repositories/tasks-repository.php';
  require_once 'src/domain/entities/Task.php';
  require_once 'src/infra/database/database-connection.php';

  class MysqlRepository implements TasksRepository {
    private PDO $db;

    public function __construct() {
      $this->db = Database::connect();
    }

    public function create($task){
      $query = $this->db->prepare("INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)");
      $query->execute([
        $task['title'],
        $task['description'],
        $task['status']
      ]);
    }

    public function findById($id){
      $query = $this->db->prepare("SELECT * FROM tasks WHERE id = ?");
      $query->execute([$id]);
      return $query->fetch();
    }

    public function getAll() {
      $query = $this->db->query("SELECT * FROM tasks");
      return $query->fetchAll();
    }

    public function delete($id){
      $query = $this->db->prepare("DELETE FROM tasks WHERE id = ?");
      $query->execute([$id]);
    }

    public function update($task, $id){
      $query = $this->db->prepare("UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?");
      $query->execute([
        $task['title'],
        $task['description'],
        $task['status'],
        $id
      ]);
    }


   
  }
?>