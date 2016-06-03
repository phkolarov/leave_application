<?php
/**
 * Created by PhpStorm.
 * User: Filip
 * Date: 26.5.2016 г.
 * Time: 15:33 ч.
 */

namespace engine\controllers;


use engine\repositories\UserRepository;

class AdministrationController extends Controller
{
    public function index(){

        var_dump("ADMINISTRATION");
        $this->view->render();
    }


    public function editRemainingLeave(){

        var_dump("editRemainingLeave");
        $this->view->render();

    }


    public function officialHolidays(){

        $this->view->render();

    }

    public function officialLeaveReport(){

        $this->view->render();

    }

    public function requestReport(){
        $this->view->render();

    }

    public function usersList(){

        $this->view->render();
    }

    public function addUser(){


        if(($_COOKIE['role'] == 'admin') && isset($_COOKIE['session'])){

            if( isset($_POST['names']) &&
                isset($_POST['username']) &&
                isset($_POST['email']) &&
                isset($_POST['password']) &&
                isset($_POST['userRoleOptions']) &&
                isset($_POST['isActive'])){

                $username = $_POST['username'];
                $name = $_POST['names'];
                $session = $_COOKIE['session'];
                $email = $_POST['email'];
                $password = $_POST['password'];
                $userRoleOptions = $_POST['userRoleOptions'];
                $isActive = $_POST['isActive'];
                $user = new UserRepository();



                $user->addUser($username,$name,$session,$email,$password,$userRoleOptions, $isActive);


            }
        }else{

            header("Location: /leave_application/administration/usersList/added=false");
        }

    }

}