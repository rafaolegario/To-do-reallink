<?php
  require_once 'domain/application/To-do-list/repositories/tasks-repository.php';
  require_once 'domain/entities/Task.php';

  class GetAllTasksUseCase {
    private $taskRepository;

    // Injeção de dependência via construtor: recebe uma implementação da interface TasksRepository
    public function __construct(TasksRepository $taskRepository) {
      $this->taskRepository = $taskRepository;
    }

    // Método que executa a seleção de todas as tarefas
    public function execute() {
      // Chama o método 'getAll' do repositório para buscar todas as tarefas
      $tasks = $this->taskRepository->getAll();
      
      // Se não houver tarefas, retorna uma mensagem indicando que não foram encontradas
      if (empty($tasks)) {
        return ['message' => 'No tasks found'];
      }
      
      // Se houver tarefas, retorna um array com as tarefas
      return ['Tasks' => $tasks];
    }
  }
?>