<?php
/**
 * Created by PhpStorm.
 * User: Filip
 * Date: 26.5.2016 г.
 * Time: 15:31 ч.
 */

namespace engine\controllers;


class ReportsController extends Controller
{

    public function index(){

        var_dump("ReportsController");
    }


    public function officialHolidays(){

        $this->view->add = "officialReport TEST";
        $this->view->render();
        var_dump("officialReport");
    }


    public function myOfficialVacations(){

        $this->view->add = "unofficialReport TEST";
        $this->view->render();
        var_dump("unofficialReport");
    }
}
