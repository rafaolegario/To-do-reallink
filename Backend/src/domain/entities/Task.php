<?php
  class Task {
    private $title;
    private $description;
    private $status;

    public function __construct($id, $title, $description) {
      $this->title = $title;
      $this->description = $description;
      $this->status = 'pending';
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

    public function setTitle($title) {
      $this->title = $title;
    }
    public function setDescription($description) {
      $this->description = $description;
    }
    public function setStatus($status) {
      if ($status === 'pending' || $status === 'completed') {
        $this->status = $status;
      }else {
        throw new InvalidArgumentException("Invalid status: $status");
      }
    }
  }
?>