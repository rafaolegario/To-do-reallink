<?php
namespace App\Database; 

use PDO;
use Dotenv\Dotenv; 
// Importa as classes PDO (para conexão ao banco) e Dotenv (para carregar variáveis de ambiente)

class Database {
  private static ?PDO $pdo = null; 
  // Propriedade estática que vai guardar a conexão PDO 

  public static function connect(): PDO {
    if (!self::$pdo) { 
      // Se a conexão ainda não foi criada, cria uma nova

      $dotenv = Dotenv::createImmutable('/var/www');
      $dotenv->load(); 
      // Carrega as variáveis de ambiente do arquivo .env localizado em /var/www

      // Pega as variáveis de ambiente do banco:
      $host = $_ENV['DB_HOST'];
      $port = $_ENV['DB_PORT'];
      $db   = $_ENV['DB_DATABASE'];
      $user = $_ENV['DB_USERNAME'];
      $pass = $_ENV['DB_PASSWORD'];

      // Monta a DSN para conectar com o MySQL:
      $dbUrl = "mysql:host=$host;port=$port;dbname=$db;charset=utf8mb4";

      // Cria a conexão PDO com opções para lançar exceções em erros e buscar arrays associativos:
      self::$pdo = new PDO($dbUrl, $user, $pass, [
          PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
          PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
      ]);
    }

    return self::$pdo; 
    // Retorna a instância única da conexão PDO 
  }
}

?>