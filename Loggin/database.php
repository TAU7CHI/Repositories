<?php


$host="localhost";
$dbname="login";
$username="root";
$password="";


$mysqli=new mysqli(hostname: $host,
username: $username,password: $password,database:$dbname);


if($mysqli->connect_errno){
   die("connectiion error ");
}