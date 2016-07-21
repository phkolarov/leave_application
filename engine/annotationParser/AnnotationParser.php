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
                           self::administrator();
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

    private static function administrator()
    {

    }

    private static function authentication()
    {
        //ob_end_flush();

        if(!isset($_COOKIE['session'])){


            unset($_COOKIE['session']);
            unset($_SESSION['session']);
            setcookie('session', null, -1, '/');
            unset($_COOKIE['username']);
            setcookie('username', null, -1, '/');
            unset($_COOKIE['password']);
            setcookie('password', null, -1, '/');
            unset($_COOKIE['userID']);
            setcookie('userID', null, -1, '/');
            unset($_COOKIE['isAdmin']);
            setcookie('isAdmin', null, -1, '/');


            //header("Location: /leave_application/user/login");
            die();
        }
    }

    public static function moderator(){

        if((!isset($_COOKIE['role']) || $_COOKIE['role'] != 'admin') && isset($_COOKIE['session'])){
            ob_end_clean();
            header("Location: /leave_application/home/index/status?message=Невалидни права!");
            die();
        }
    }
}