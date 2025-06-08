<?php
  require_once 'domain/application/To-do-list/repositories/tasks-repository.php';
  require_once 'domain/entities/Task.php';

  class EditTaskUseCase {
    private $taskRepository;

    // Injeção de dependência via construtor: recebe uma implementação da interface TasksRepository
    public function __construct(TasksRepository $taskRepository) {
      $this->taskRepository = $taskRepository;
    }

    // Método que executa a edição de uma tarefa
    public function execute($id, $title, $description, $status) {
      // Valida os dados de entrada (título e descrição não podem ser vazios)
      if (empty($title) || empty($description) || empty($status)) {
        throw new InvalidArgumentException("Title, description and status cannot be empty.");
      }

      // Verifica se o status é válido
      if($status !== 'pending' && $status !== 'completed') {
        throw new InvalidArgumentException("Status must be 'pending' or 'completed'.");
      }

      // Chama o método 'findById' do repositório para buscar a tarefa existente
      $task = $this->taskRepository->findById($id);

      // Se a tarefa não for encontrada, lança uma exceção
      if(!$task){
        throw new InvalidArgumentException("Task with id: $id not found.");
      }

      // Atualiza os atributos da tarefa com os novos valores
      $task->setTitle($title);
      $task->setDescription($description);
      $task->setStatus($status);

      // Chama o método 'update' do repositório para salvar as alterações
      $this->taskRepository->update($task, $id);
      
      // Retorna uma mensagem de sucesso e o objeto tarefa atualizado
      return [
        'message' => 'Task edited with success',
        'task' => $task, 
      ];

    }
  }
?>