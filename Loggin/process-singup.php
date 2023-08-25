<?php

// Check if name is provided
if (empty($_POST["name"])) {

  die("Name is required");
}

// Validate email format


if (!filter_var($_POST["email"], FILTER_VALIDATE_EMAIL)) {
  die("Valid Email is required");
}

// Check password length

if (strlen($_POST["password"]) < 8) {
  die("Password must be at least 8 characters");
}

// Check for at least one letter in the password

if (!preg_match("/[a-zA-Z]/", $_POST["password"])) {
  die("Password must be at least one letter");
}

// Check for at least one number in the password

if (!preg_match("/[0-9]/", $_POST["password"])) {
  die("Password must be at least one number");
}

// Check if password confirmation matches

if ($_POST["password"] !== $_POST["password_confirmation"]) {

  die("Password must match");
}

// Hash the password

$password_hash = password_hash($_POST["password"], PASSWORD_DEFAULT);

// Include the database connection

$mysqli = require __DIR__ . "/database.php";

$sql = "INSERT INTO user (name, email, password_hash) VALUES (?, ?, ?)";


$stmt = $mysqli->prepare($sql);

if (!$stmt) {
  die("SQL error: " . $mysqli->error);
}
// Check if the SQL statement preparation was successful

// Bind parameters to the prepared statement
$stmt->bind_param(
  "sss",
  $_POST["name"],
  $_POST["email"],
  $password_hash
);


// Execute the prepared statement
if ($stmt->execute()) {
  echo "Sign up successful";
} else {
  echo "Error: " . $stmt->error;
}

?>vv