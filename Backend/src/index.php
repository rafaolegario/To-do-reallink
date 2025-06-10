<?php



// Define que a resposta da API será no formato JSON
header('Content-Type: application/json');
// Permite requisições de qualquer origem (CORS) e define os métodos e cabeçalhos permitidos
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");


require_once 'infra/controllers/task-controller.php';
require_once __DIR__ . '/../vendor/autoload.php';

use Dotenv\Dotenv;

$dotenv = Dotenv::createImmutable('/var/www');
$dotenv->load();

// Obtém o método HTTP da requisição (GET, POST, PUT, DELETE, etc)
$method = $_SERVER['REQUEST_METHOD'];

// Obtém o caminho da URL (sem parâmetros) para roteamento das requisições
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Cria uma instância do controlador de tarefas
$controller = new TaskController();

if ($method === 'OPTIONS') {
  http_response_code(200);
  exit(); // Termina a execução aqui para requisições OPTIONS
}

// Roteamento baseado no método HTTP
switch ($method) {
  case 'GET':
    // Se a URI for "/tasks", retorna todas as tarefas
    if ($uri === '/tasks') {
      $controller->getAll();
    } 
    // Se a URI for "/tasks/{id}" (onde {id} é um número), retorna a tarefa específica
    elseif (preg_match('/^\/tasks\/(\d+)$/', $uri, $matches)) {
      $id = $matches[1];
      $controller->get($id);
    } 
    // Se não corresponder a nenhuma rota, retorna erro 404
    else {
      http_response_code(404);
      echo json_encode(['error' => 'Route not found']);
    }
    break;

  case 'POST':
    // Cria uma nova tarefa se a URI for "/tasks"
    if ($uri === '/tasks') {
      // Obtém os dados enviados no corpo da requisição e decodifica JSON
      $data = json_decode(file_get_contents('php://input'), true);
      // Chama o método para criar uma nova tarefa, passando título e descrição
      $controller->create($data['title'] ?? '', $data['description'] ?? '');
    } else {
      // Rota inválida para POST
      http_response_code(404);
      echo json_encode(['error' => 'Route not found']);
    }
    break;

  case 'PUT':
    // Atualiza uma tarefa específica se a URI for "/tasks/{id}"
    if (preg_match('/^\/tasks\/(\d+)$/', $uri, $matches)) {
      $id = $matches[1];
      // Obtém os dados enviados no corpo da requisição e decodifica JSON
      $data = json_decode(file_get_contents('php://input'), true);
      // Chama o método para editar a tarefa com os dados recebidos
      $controller->edit(
        $id,
        $data['title'] ?? '',
        $data['description'] ?? '',
        $data['status'] ?? ''
      );
    } else {
      // Rota inválida para PUT
      http_response_code(404);
      echo json_encode(['error' => 'Route not found']);
    }
    break;

  case 'DELETE':
    // Deleta uma tarefa específica se a URI for "/tasks/{id}"
    if (preg_match('/^\/tasks\/(\d+)$/', $uri, $matches)) {
      $id = $matches[1];
      $controller->delete($id);
    } else {
      // Rota inválida para DELETE
      http_response_code(404);
      echo json_encode(['error' => 'Route not found']);
    }
    break;

  // Caso o método HTTP não seja nenhum dos acima, retorna erro 405 (Método não permitido)
  default:
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}
