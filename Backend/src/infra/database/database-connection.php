<?php
namespace App\Database;

use PDO;
use Dotenv\Dotenv;

class Database {
  private static ?PDO $pdo = null;

  public static function connect(): PDO {
    if (!self::$pdo) {
        $dotenv = Dotenv::createImmutable(__DIR__ . '/../../../');
        $dotenv->load();

        $host = $_ENV['DB_HOST'];
        $port = $_ENV['DB_PORT'];
        $db   = $_ENV['DB_DATABASE'];
        $user = $_ENV['DB_USERNAME'];
        $pass = $_ENV['DB_PASSWORD'];

        $dbUrl = "mysql:host=$host;port=$port;dbname=$db;charset=utf8mb4";

        self::$pdo = new PDO($dbUrl, $user, $pass, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]);
      }

    return self::$pdo;
  }
}
