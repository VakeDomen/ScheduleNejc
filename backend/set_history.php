<?php
// TODO: this is setup for when data is stored in the database
include 'data.php';

$schedule = explode(",", $_GET['schedule']);
$year = $_GET['year'];
$data[$year] = $schedule;

// TODO: execute 'save to database' on $data

header('Content-Type: application/json');
echo json_encode(NULL);