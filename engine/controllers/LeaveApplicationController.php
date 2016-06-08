<?php
/**
 * Created by PhpStorm.
 * User: Filip
 * Date: 26.5.2016 г.
 * Time: 15:31 ч.
 */

namespace engine\controllers;


class LeaveApplicationController extends Controller
{

    public function index(){

        var_dump("LeaveAppController");
    }


    public function addOfficialLeaveApplication(){


        $this->view->add = "OFFICIAL TEST";
        $this->view->render();

    }

    public function addUnofficialLeaveApplication(){

        $this->view->add = "UNOFFICIAL TEST";
        $this->view->render();

    }

    public function pendingRequests(){


        $this->view->add = "PENDING TEST";
        $this->view->render();

    }



}