<?php
/**
 * Created by PhpStorm.
 * User: Filip
 * Date: 25.5.2016 г.
 * Time: 09:33 ч.
 */

namespace engine\viewLoader;


class view
{
    private $controllerName;
    private $actionName;

    public function __construct($controllerName,$actionName)
    {
            $this->controllerName = $controllerName;
            $this->actionName = $actionName;
    }

    public function render(){

        $fullViewFilePath = 'templates/'.$this->controllerName.'/'.$this->actionName.'.php';
        if(file_exists($fullViewFilePath)){

            echo '<div class="container content-wrapper">';
                require_once $fullViewFilePath;
            echo '</div>';

        }
    }
}