<?php
/**
 * Created by PhpStorm.
 * User: Filip
 * Date: 25.5.2016 г.
 * Time: 09:59 ч.
 */

namespace engine\controllers;

use engine\repositories\UserRepository;


class UserController extends Controller
{
    /**
     * @AUTHENTICATE
     *
     */
    public function index()
    {

        var_dump("user index");
    }

    /**
     * @AUTHENTICATE
     * @MODERATOR
     */
    public function test()
    {

        var_dump("test");
    }

    public function login()
    {
        $this->view->test = "TEST";
        $this->view->render();
    }

    public function signIn()
    {
        if (isset($_POST['username']) && isset($_POST['password'])) {


            $username = $_POST['username'];
            $password = $_POST['password'];

            $userRepo = new UserRepository();

            $user = $userRepo->userLogin($username, $password);

            if ($user) {

                //ob_end_clean();
                //ob_start();

                $_SESSION['session'] = $user->getSession();
                $_COOKIE['session'] = $user->getSession();
                setcookie('session', $user->getSession(), time() + 60 * 60 * 24 * 30, '/');

                $_COOKIE['username'] = $user->getUsername();
                setcookie('username', $user->getUsername(), time() + 60 * 60 * 24 * 30, '/');

                $_COOKIE['userID'] = $user->getId();
                setcookie('userID', $user->getId(), time() + 60 * 60 * 24 * 30, '/');

                $_COOKIE['name'] = $user->getName();
                setcookie('name', $user->getName(), time() + 60 * 60 * 24 * 30, '/');

                $_COOKIE['role'] = $user->getRole();
                setcookie('role', $user->getRole(), time() + 60 * 60 * 24 * 30, '/');

                $_COOKIE['isActive'] = $user->getIsActive();
                setcookie('isActive', $user->getIsActive(), time() + 60 * 60 * 24 * 30, '/');


                if ($user->getRole() == "admin") {

                    $_SESSION['isAdmin'] = true;
                    $_COOKIE['isAdmin'] = true;
                }
                ob_end_clean();
                header("Location: /leave_application/home/index");
                exit;

            } else {
                ob_end_clean();
                header("Location: /leave_application/user/login");
                exit;

            }
        }
    }

    public function logout()
    {

        if (isset($_COOKIE['session'])) {

            unset($_COOKIE['session']);
            unset($_SESSION['session']);
            setcookie('session', null, -1, '/');
            unset($_COOKIE['username']);
            setcookie('username', null, -1, '/');
            unset($_COOKIE['password']);
            setcookie('password', null, -1, '/');
            unset($_COOKIE['userID']);
            setcookie('userID', null, -1, '/');
            unset($_COOKIE['isAdmin']);
            setcookie('isAdmin', null, -1, '/');

            header("Location: /leave_application/user/login");
            exit;
        }
    }


    public function changeUserParams()
    {
        $userRepo = new UserRepository();
        $password = hash('sha512', $_POST['password']);
        $names = $_POST['names'];
        $userId = $_COOKIE['userID'];
        $email = $_POST['email'];
        $username = $_COOKIE['username'];

        $result = $userRepo->changeUserParams($userId,$username,$names,$email,$password);
        $jsonOutput = json_decode($result);

        if(isset($jsonOutput->result)){

            header("Location: /leave_application/user/profile/changeParams&isValid=true");
            exit;
        }else{
            header("Location: /leave_application/user/profile/changeParams&isValid=false");
            exit;
        }
    }

    public function profile(){


        $this->view->render();
    }
}