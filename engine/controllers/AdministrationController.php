<?php
/**
 * Created by PhpStorm.
 * User: Filip
 * Date: 26.5.2016 г.
 * Time: 15:33 ч.
 */

namespace engine\controllers;


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

        var_dump("officialHolidays");
        $this->view->render();

    }

    public function officialLeaveReport(){

        $this->view->render();

    }

    public function requestReport(){
        $this->view->render();

    }

    public function usersList(){

        var_dump("usersList");
        $this->view->render();

    }


}