<?php
/**
 * Created by PhpStorm.
 * User: Filip
 * Date: 25.5.2016 г.
 * Time: 10:47 ч.
 */

namespace engine\repositories;

use engine\models\User;
use engine\service\serviceConnection;

require_once('engine/service/serviceConnection.php');
require_once('engine/models/User.php');

class UserRepository
{

    public function userLogin($username, $password)
    {
        $hashedPassword = hash('sha512', $password);
        $loginUri = "User/AuthorizeUser?UserName=$username&Password=$hashedPassword";
        $connection = new serviceConnection();
        $empty = array("null" => "null");
        $data = $connection->postData($loginUri, $empty);
        $tempObject = json_decode($data);

        if (isset($tempObject->result)) {

            $dObject = $tempObject->result->user;

            return new User($dObject->ID,
                $dObject->UserName,
                null,
                $dObject->FullName,
                $dObject->SessionId,
                $dObject->Email,
                $dObject->OfficialVacationDays,
                $dObject->VacationMinutes,
                $dObject->Role,
                $dObject->isActive);

        } else {
            return false;
        }
    }

    public function addUser($username, $name, $session, $email, $inPassword, $userRoleOptions, $isActive)
    {
        $password = hash('sha512', $inPassword);
        $role = $userRoleOptions == 1 ? "user" : "admin";
        $active = $isActive == 1 ? "true" : "false";

        $saveUserUrl = "User/AddUser";
        $userObject = array(

            "UserName" => $username,
            "Password" => $password,
            "FullName" => $name,
            "Email" => $email,
            "VacationMinutes" => '0',
            "OfficialVacationDays" => '0',
            "Role" => $role,
            "isActive" => $active
        );


        $connection = new serviceConnection($session);
        $data = $connection->postData($saveUserUrl, $userObject);
        $tempObject = json_decode($data);


        if (isset($tempObject->result)) {

            header("Location: /leave_application/administration/usersList/added=true");
        } else {

            header("Location: /leave_application/administration/usersList/added=false");
        }

    }

    public function changeUserParams($userId, $username, $names, $email, $password)
    {


        $changeUserUrl = "User/EditUser";
        $session = $_COOKIE['session'];

        $userObject = array(
            "ID" => $userId,
            "UserName" => $username,
            "Password" => $password,
            "FullName" => $names,
            "Email" => $email,
            "VacationMinutes" => 0,
            "OfficialVacationDays" => 0,
            "Role" => $_COOKIE['userID'],
            "isActive" => true
        );

        $connection = new serviceConnection($session);
        $data = $connection->postData($changeUserUrl, $userObject);

        return $data;
    }

}