<?php
/**
 * Created by PhpStorm.
 * User: Filip
 * Date: 25.5.2016 г.
 * Time: 16:13 ч.
 */

namespace engine\controllers;


class HomeController extends Controller
{


    public function index(){

        $this->view->render();
        //var_dump($_COOKIE['session']);
    }
}