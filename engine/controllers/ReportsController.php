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



    /**
     * @AUTHENTICATE
     */
    public function officialHolidays(){

        $this->view->add = "officialReport TEST";
        $this->view->render();
    }



    /**
     * @AUTHENTICATE
     */
    public function myOfficialVacations(){

        $this->view->add = "unofficialReport TEST";
        $this->view->render();
        var_dump("unofficialReport");
    }
}
