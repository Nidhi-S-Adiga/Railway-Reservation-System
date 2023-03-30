<?php
// Retrieve form data
$name = $_POST['name'];
$email = $_POST['email'];
$age = $_POST['age'];
$gender = $_POST['gender'];
$date = $_POST['date'];
$source = $_POST['source'];
$destination = $_POST['destination'];
$train = $_POST['train'];
$time = $_POST['time'];
$amount = $_POST['amount'];
$seats = json_decode($_POST['seats']);

// Save selected seats to file
$file = fopen('seats.txt', 'a');
foreach ($seats as $seat) {
  fwrite($file, "$name \t$email \t$age \t$gender \t$date \t$source \t$destination \t$train \t$time \t$seat \t$amount\n");
}
fclose($file);

// Return response to client
echo "Seats reserved successfully!";
?>
