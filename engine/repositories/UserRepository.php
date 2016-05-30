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
        $data = $connection->postData($loginUri,null);
        $tempObject = json_decode($data);

        if(isset($tempObject->result)){

            $dObject = $tempObject->result->user;

            //$session = $token = hash('sha512', $password);
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


}