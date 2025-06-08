<?php

  require_once 'infra/database/repositories/mysql-repository.php';
  require_once 'domain/application/To-do-list/use-cases/create-task.php';
  require_once 'domain/application/To-do-list/use-cases/get-all-tasks.php';
  require_once 'domain/application/To-do-list/use-cases/get-task.php';
  require_once 'domain/application/To-do-list/use-cases/edit-task.php';
  require_once 'domain/application/To-do-list/use-cases/delete-task.php';


 class TaskController {
    // Propriedades para o repositório e casos de uso
    private MysqlRepository $taskRepo;
    private CreateTaskUseCase $createTaskUseCase;
    private GetAllTasksUseCase $getAllTasksUseCase;
    private GetTaskUseCase $getTaskUseCase;
    private EditTaskUseCase $editTaskUseCase;
    private DeleteTaskUseCase $deleteTaskUseCase;

    // Construtor instancia o repositório e passa para os casos de uso
    public function __construct() {
        $this->taskRepo = new MysqlRepository();
        $this->createTaskUseCase = new CreateTaskUseCase($this->taskRepo);
        $this->getAllTasksUseCase = new GetAllTasksUseCase($this->taskRepo);
        $this->getTaskUseCase = new GetTaskUseCase($this->taskRepo);
        $this->editTaskUseCase = new EditTaskUseCase($this->taskRepo);
        $this->deleteTaskUseCase = new DeleteTaskUseCase($this->taskRepo);
    }

    // Método para criar tarefa
    public function create($title, $description) {
        // Validação simples: título e descrição não podem estar vazios
        if (empty($title) || empty($description)) {
            http_response_code(400); // Bad Request
            echo json_encode(['error' => 'Title and description cannot be empty.']);
            return; // interrompe execução em caso de erro
        }
        // Executa o caso de uso para criar tarefa
        $result = $this->createTaskUseCase->execute($title, $description);

        header('Content-Type: application/json');
        echo json_encode($result); // retorna o resultado em JSON
    }

    // Método para listar todas as tarefas
    public function getAll() {
        $result = $this->getAllTasksUseCase->execute();
        header('Content-Type: application/json');
        // Retorna o resultado da listagem
        echo json_encode($result);
    }

    // Método para buscar uma tarefa pelo ID
    public function get($id) {
        if (empty($id)) {
            http_response_code(400);
            echo json_encode(['error' => 'ID cannot be empty.']);
            return;
        }
        $result = $this->getTaskUseCase->execute($id);
        header('Content-Type: application/json');
        // Retorna o resultado da busca
        echo json_encode($result);
    }

    // Método para editar uma tarefa existente
    public function edit($id, $title, $description, $status) {
        // Valida ID, título e descrição
        if (empty($id) || empty($title) || empty($description)) {
            http_response_code(400);
            echo json_encode(['error' => 'ID, title and description cannot be empty.']);
            return;
        }

        // Valida o status para aceitar somente 'pending' ou 'completed'
        if (!in_array($status, ['pending', 'completed'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Status must be either "pending" or "completed".']);
            return;
        }
        
        // Remove espaços em branco extras
        $title = trim($title);
        $description = trim($description);

        // Executa o caso de uso de edição
        $result = $this->editTaskUseCase->execute($id, $title, $description, $status);
        header('Content-Type: application/json');
        // Retorna o resultado da edição
        echo json_encode($result);
    }

    // Método para deletar uma tarefa pelo ID
    public function delete($id) {
        if (empty($id)) {
            http_response_code(400);
            echo json_encode(['error' => 'ID cannot be empty.']);
            return;
        }
        $result = $this->deleteTaskUseCase->execute($id);
        header('Content-Type: application/json');
        // Retorna o resultado da exclusão
        echo json_encode($result);
    }
}
?>
