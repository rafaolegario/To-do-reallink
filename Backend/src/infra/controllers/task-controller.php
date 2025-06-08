<?php
  require_once 'infra/database/repositories/mysql-repository.php';
  require_once 'domain/application/To-do-list/use-cases/create-task.php';
  require_once 'domain/application/To-do-list/use-cases/get-all-tasks.php';
  require_once 'domain/application/To-do-list/use-cases/get-task.php';
  require_once 'domain/application/To-do-list/use-cases/edit-task.php';
  require_once 'domain/application/To-do-list/use-cases/delete-task.php';

 class TaskController {
    private MysqlRepository $taskRepo;
    private CreateTaskUseCase $createTaskUseCase;
    private GetAllTasksUseCase $getAllTasksUseCase;
    private GetTaskUseCase $getTaskUseCase;
    private EditTaskUseCase $editTaskUseCase;
    private DeleteTaskUseCase $deleteTaskUseCase;

    public function __construct() {
        $this->taskRepo = new MysqlRepository();
        $this->createTaskUseCase = new CreateTaskUseCase($this->taskRepo);
        $this->getAllTasksUseCase = new GetAllTasksUseCase($this->taskRepo);
        $this->getTaskUseCase = new GetTaskUseCase($this->taskRepo);
        $this->editTaskUseCase = new EditTaskUseCase($this->taskRepo);
        $this->deleteTaskUseCase = new DeleteTaskUseCase($this->taskRepo);
    }

    public function create($title, $description) {
        if (empty($title) || empty($description)) {
            http_response_code(400);
            echo json_encode(['error' => 'Title and description cannot be empty.']);
            return;
        }
        $result = $this->createTaskUseCase->execute($title, $description);
        header('Content-Type: application/json');
        echo json_encode($result);
    }

    public function getAll() {
        $result = $this->getAllTasksUseCase->execute();
        header('Content-Type: application/json');
        echo json_encode($result);
    }

    public function get($id) {
        if (empty($id)) {
            http_response_code(400);
            echo json_encode(['error' => 'ID cannot be empty.']);
            return;
        }
        $result = $this->getTaskUseCase->execute($id);
        header('Content-Type: application/json');
        echo json_encode($result);
    }

    public function edit($id, $title, $description, $status) {
        if (empty($id) || empty($title) || empty($description)) {
            http_response_code(400);
            echo json_encode(['error' => 'ID, title and description cannot be empty.']);
            return;
        }

        if (!in_array($status, ['pending', 'completed'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Status must be either "pending" or "completed".']);
            return;
        }
        
        $title = trim($title);
        $description = trim($description);

        $result = $this->editTaskUseCase->execute($id, $title, $description, $status);
        header('Content-Type: application/json');
        echo json_encode($result);
    }

    public function delete($id) {
        if (empty($id)) {
            http_response_code(400);
            echo json_encode(['error' => 'ID cannot be empty.']);
            return;
        }
        $result = $this->deleteTaskUseCase->execute($id);
        header('Content-Type: application/json');
        echo json_encode($result);
    }
}
?>