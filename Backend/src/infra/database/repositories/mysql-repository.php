<?php

require_once __DIR__ . '/../../../domain/application/To-do-list/repositories/tasks-repository.php';
require_once __DIR__ . '/../../../domain/entities/Task.php';
require_once __DIR__ . '/../../../infra/database/database-connection.php';

use App\Database\Database;

class MysqlRepository implements TasksRepository {
  // Propriedade que guarda a conexão PDO com o banco MySQL
  private PDO $db;

  // No construtor, conecta ao banco usando o método estático Database::connect()
  public function __construct() {
    $this->db = Database::connect();
  }

  // Cria uma nova tarefa no banco
  public function create(Task $task): void {
    // Prepara query para inserir os dados da tarefa (title, description, status)
    $query = $this->db->prepare("INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)");
    // Executa passando os valores dos getters da entidade Task
    $query->execute([
      $task->getTitle(),
      $task->getDescription(),
      $task->getStatus()
    ]);
    // Obtém o último ID inserido e seta no objeto Task (sincroniza estado)
    $lastId = $this->db->lastInsertId();
    $task->setId($lastId);
  }

  // Busca uma tarefa pelo ID, retorna objeto Task ou null se não achar
  public function findById(int $id): ?Task {
    $query = $this->db->prepare("SELECT * FROM tasks WHERE id = ?");
    $query->execute([$id]);
    $data = $query->fetch();

    // Se não encontrou, retorna null
    if (!$data) {
      return null;
    }

    // Cria e retorna um objeto Task com os dados do banco
    $task = new Task($data['id'], $data['title'], $data['description']);
    $task->setStatus($data['status']);
    return $task;
  }

  // Retorna um array com todas as tarefas do banco
  public function getAll(): array {
    // Executa a query sem filtro para pegar todas as linhas
    $query = $this->db->query("SELECT * FROM tasks");
    $rows = $query->fetchAll();

    $tasks = [];
    // Para cada linha retornada, cria um objeto Task e adiciona ao array
    foreach ($rows as $row) {
      $task = new Task($row['id'], $row['title'], $row['description']);
      $task->setStatus($row['status']);
      $tasks[] = $task;
    }
    return $tasks;
  }

  // Deleta a tarefa pelo ID
  public function delete(int $id): void {
    $query = $this->db->prepare("DELETE FROM tasks WHERE id = ?");
    $query->execute([$id]);
  }

  // Atualiza a tarefa no banco pelo ID
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
