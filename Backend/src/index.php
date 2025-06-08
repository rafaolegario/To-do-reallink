<?php

header('Content-Type: application/json');
require_once 'infra/controllers/task-controller.php';
require_once __DIR__ . '/../vendor/autoload.php';


$method = $_SERVER['REQUEST_METHOD'];
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
file_put_contents('log.txt', "Request URI: $uri\n", FILE_APPEND);

$controller = new TaskController();

switch ($method) {
  case 'GET':
    if ($uri === '/tasks') {
          $controller->getAll();
    } elseif (preg_match('/^\/tasks\/(\d+)$/', $uri, $matches)) {
          $id = $matches[1];
          $controller->get($id);
      } else {
          http_response_code(404);
          echo json_encode(['error' => 'Route not found']);
      }
    break;

    case 'POST':
        if ($uri === '/tasks') {
            $data = json_decode(file_get_contents('php://input'), true);
            $controller->create($data['title'] ?? '', $data['description'] ?? '');
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Route not found']);
        }
        break;

    case 'PUT':
        if (preg_match('/^\/tasks\/(\d+)$/', $uri, $matches)) {
            $id = $matches[1];
            $data = json_decode(file_get_contents('php://input'), true);
            $controller->edit(
                $id,
                $data['title'] ?? '',
                $data['description'] ?? '',
                $data['status'] ?? ''
            );
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Route not found']);
        }
        break;

    case 'DELETE':
        if (preg_match('/^\/tasks\/(\d+)$/', $uri, $matches)) {
            $id = $matches[1];
            $controller->delete($id);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Route not found']);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
}
