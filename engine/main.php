<?php
/**
 * Created by PhpStorm.
 * User: Filip
 * Date: 20.5.2016 г.
 * Time: 13:58 ч.
 */

namespace engine;

use engine\annotationParser\AnnotationParser;

include_once('engine/annotationParser/AnnotationParser.php');

class LeaveApp
{
    private $controller;
    private $action;

    public function __construct()
    {
        $requestURL = str_replace("leave_application","",$_SERVER['REQUEST_URI']);
        $CAObject = $this->methodParser($requestURL);

        if(count(($CAObject))> 1){

            $this->controller = $CAObject[0];
            $this->action = $CAObject[1];
        }else if(count(($CAObject)) == 1){

            $this->controller = $CAObject[0];
        }
    }

    public function run()
    {

        $controllerClassName = "\\engine\\controllers\\". ucfirst($this->controller)."Controller";

        $view = new viewLoader\view(lcfirst($this->controller),$this->action);

        $controller = new $controllerClassName($view);

        if(method_exists($controller,$this->action)) {
            AnnotationParser::Parse($controller, $this->action);
        }

        if(isset($_COOKIE['session'])){

            var_dump($_COOKIE);
            $this->mainMenuLoader();
        }

        if(method_exists($controller,$this->action)){

            $methodName = $this->action;
            $controller->$methodName();
        }else{

            $controller->index();
        }
    }

    private function mainMenuLoader()
    {
        $templateName = "main_menu.php";

        if (file_exists("templates/partials/" . $templateName)) {
            $template = file_get_contents("templates/partials/" . $templateName);

            ob_start();
            echo ($template);
            $php_output = ob_get_contents();
            //ob_end_clean();

        } else {
            throw new \Exception("LELE NQMA MENU!!!");
        }
    }

    private function methodParser($requestUrl)
    {
        $urlParams = (explode('/', $requestUrl));
        $urlParams = array_values(array_filter($urlParams));
        $methodAction = [];


            if(count($urlParams) == 1){

                $methodAction[0] = $urlParams[0];
                $methodAction[1] = "index";
            }else if(count($urlParams) > 1){

                $methodAction[0] = $urlParams[0];
                $methodAction[1] = $urlParams[1];
            }else{

                if(isset($_COOKIE['session'])){

                    $methodAction[0] = "home";
                    $methodAction[1] = "index";
                }else{

                    $methodAction[0] = "user";
                    $methodAction[1] = "login";
                }

            }

        return $methodAction;
    }
}



