<?php
  require_once 'domain/application/To-do-list/repositories/tasks-repository.php';
  require_once 'domain/entities/Task.php';

  class CreateTaskUseCase {
    private $taskRepository;

    // Injeção de dependência via construtor: recebe uma implementação da interface TasksRepository
    public function __construct(TasksRepository $taskRepository) {
      $this->taskRepository = $taskRepository;
    }

    // Método que executa a criação de uma tarefa
    public function execute($title, $description) {
      // Valida os dados de entrada (título e descrição não podem ser vazios)
      if (empty($title) || empty($description)) {
        throw new InvalidArgumentException("Title and description cannot be empty.");
      }

      // Cria um novo objeto Task com os dados fornecidos
      $task = new Task(null,$title, $description);

      // Chama o método 'create' do repositório para salvar a tarefa
      $this->taskRepository->create($task);

      // Retorna o objeto tarefa criado
      return $task;
    }
  }
?>