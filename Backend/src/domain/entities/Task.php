<?php
class Task implements JsonSerializable {
  private $id;
  private $title;
  private $description;
  private $status;

  public function __construct($id, $title, $description) {
    $this->id = $id;
    $this->title = $title;
    $this->description = $description;
    $this->status = 'pending';
  }

  // Getters
  public function getId() {
    return $this->id;
  }

  public function getTitle() {
    return $this->title;
  }

  public function getDescription() {
    return $this->description;
  }

  public function getStatus() {
    return $this->status;
  }

  // Setters
  public function setId($id) {
    $this->id = $id;
  }

  public function setTitle($title) {
    $this->title = $title;
  }

  public function setDescription($description) {
    $this->description = $description;
  }

  public function setStatus($status) {
    if ($status === 'pending' || $status === 'completed') {
      $this->status = $status;
    } else {
      throw new InvalidArgumentException("Invalid status: $status");
    }
  }

  // Para json_encode funcionar
  public function jsonSerialize(): mixed {
    return [
      'id' => $this->id,
      'title' => $this->title,
      'description' => $this->description,
      'status' => $this->status,
    ];
}

}
?>
