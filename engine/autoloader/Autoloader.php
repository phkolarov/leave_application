<?php
/**
 * Created by PhpStorm.
 * User: Filip
 * Date: 25.5.2016 г.
 * Time: 12:47 ч.
 */

namespace engine\autoloader;


class Autoloader
{
    public static function init()
    {
        spl_autoload_register(function ($class) {

            $pathParams = explode("\\", $class);
            $path = implode(DIRECTORY_SEPARATOR, $pathParams);
            $classPath = str_replace("\\", "/",$path);

            if(file_exists( $classPath . '.php')){
                require_once $classPath . '.php';
            }else{
                throw new \Exception("Invalid controller");
            }
        });
    }
}