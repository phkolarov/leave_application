<?php
/**
 * Created by PhpStorm.
 * User: Filip
 * Date: 25.5.2016 г.
 * Time: 13:11 ч.
 */

namespace engine\controllers;


class Controller
{

    protected $view;
    protected $session;

    public function __construct($view,$session = null)
    {
        $this->view = $view;
        $this->session = $session;
    }

}