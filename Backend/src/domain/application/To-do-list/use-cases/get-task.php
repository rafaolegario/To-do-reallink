<?php
  require_once 'domain/application/To-do-list/repositories/tasks-repository.php';
  require_once 'domain/entities/Task.php';

  class GetTaskUseCase {
    private $taskRepository;

    // Injeção de dependência via construtor: recebe uma implementação da interface TasksRepository
    public function __construct(TasksRepository $taskRepository) {
      $this->taskRepository = $taskRepository;
    }

    // Método que executa a seleção de uma tarefa específica pelo ID
    public function execute($id) {
      
      // Chama o método 'findById' do repositório para buscar a tarefa existente
      $task = $this->taskRepository->findById($id);

      // Se a tarefa não for encontrada, lança uma exceção
      if(!$task){
        throw new InvalidArgumentException("Task with id: $id not found.");
      }

      // Retorna a tarefa encontrada
      return ['Task' => $task];

    }
  }
?>