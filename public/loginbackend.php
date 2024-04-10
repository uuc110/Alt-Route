<?php
// Start the session
session_start();

// Check if the user is already logged in
if (isset($_SESSION['username'])) {
  // Redirect the user to the home page
  header("Location: home.php");
  exit;
}

// Get the username and password from the login form
$username = $_POST['username'];
$password = $_POST['password'];

// Check if the username and password are correct
if ($username == 'admin' && $password == 'password') {
  // Set the session variable to indicate that the user is logged in
  $_SESSION['username'] = $username;

  // Redirect the user to the home page
  header("Location: home.php");
  exit;
} else {
  // Display an error message
  echo "Invalid username or password";
}
?>
