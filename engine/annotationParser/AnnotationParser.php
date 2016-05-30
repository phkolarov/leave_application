<?php
/**
 * Created by PhpStorm.
 * User: Filip
 * Date: 26.5.2016 г.
 * Time: 09:48 ч.
 */

namespace engine\annotationParser;


class AnnotationParser
{

    public static function Parse($class, $methodName)
    {

        if(!is_null($class) && !is_null($methodName)){
            $reflector = new \ReflectionClass($class);
            $method = $reflector->getMethod($methodName);
            $pattern = '/@[A-Z]+/';
            $annotations = preg_match_all($pattern, $method->getDocComment(), $matches);

            if (count($matches[0]) > 0) {

                foreach ($matches[0] as $match) {

                    switch ($match) {
                        case "@AUTHENTICATE":
                            self::authentication();
                            break;
                        case "@ADMINISTRATOR":
                            var_dump("ADMINISTRATOR");
                            break;
                        case "@MODERATOR":
                            self::moderator();
                            break;
                        default:
                            //throw new \Exception('Invalid annotation');
                    }
                }
            }
        }else {

            ob_end_clean();
            header("Location: /leave_application/user/login");
            die();
        }
    }

    private static function authentication()
    {
        if(!isset($_SESSION['session'])){
            ob_end_clean();
            header("Location: /leave_application/user/login");
            die();
        }
    }

    public static function moderator(){

        if(!isset($_COOKIE['isAdmin']) && $_COOKIE['isAdmin']){
            ob_end_clean();
            header("Location: /leave_application/user/index");
            die();
        }
    }
}