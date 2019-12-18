<?php
    $login_normal = "user";
	$login_admin = "admin";
    $password = "ajax";

    if (isset($_POST['login'], $_POST['password'])){
        session_start();
        if($_POST['login'] == $login_normal && $_POST['password'] == $password){
            $_SESSION['user'] = $login_normal;
            echo "Success user";
        } else if ($_POST['login'] == $login_admin && $_POST['password'] == $password){
            $_SESSION['user'] = $login_admin;
            echo "Success admin";
        } else{
            echo "Failed";
        }

    } else {
        session_start();
        if($_SESSION['user'] === 'admin'){
            echo "Success admin";
        } else {
            echo "Success user";
        }
    }