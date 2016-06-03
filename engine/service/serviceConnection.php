<?php
/**
 * Created by PhpStorm.
 * User: Filip
 * Date: 25.5.2016 г.
 * Time: 10:05 ч.
 */

namespace engine\service;


class serviceConnection
{

    private $baseUrl;
    private $session;


    public function __construct($session = null)
    {
        $baseUrl = "http://192.168.4.96/VacationsWebAPI/api/";
        $this->setBaseUrl($baseUrl);
        $this->setSession($session);
    }

    /**
     * @return mixed
     */
    public function getSession()
    {
        return $this->session;
    }

    /**
     * @param mixed $session
     */
    public function setSession($session)
    {
        $this->session = $session;
    }

    /**
     * @return mixed
     */
    public function getBaseUrl()
    {
        return $this->baseUrl;
    }

    /**
     * @param mixed $baseUrl
     */
    public function setBaseUrl($baseUrl)
    {
        $this->baseUrl = $baseUrl;
    }

    public function getData($uri)
    {

        $requestDataObject = $this->requestCreator($uri, "GET");
        return json_decode($requestDataObject);


    }

    public function postData($uri, $data)
    {
        $requestDataObject = $this->requestCreator($uri, "POST", $data);
        return json_decode($requestDataObject);
    }

    private function requestCreator($uri, $method, $inputData = null)
    {

        $url = $this->getBaseUrl() . $uri;
        $data = array('key1' => 'value1', 'key2' => 'value2');
        $result = null;

        if (is_array($inputData)) {
            $data = json_encode($inputData);
        }

        //  Initiate curl
        $ch = curl_init();


        curl_setopt($ch, CURLOPT_NOBODY,1);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array("Content-type: application/json", "SessionId: ". $this->session));
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);

        if($method == 'POST'){

            curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_URL, $url);

        }else if($method == 'GET'){



        }

        $result = curl_exec($ch);

        curl_close($ch);

        // Will dump a beauty json :3
        var_dump(json_decode($result, true));

        if ($result === FALSE) {
            return false;
        } else {
            return $result;
        }

//        $options = array(
//            CURLOPT_URL            => $url,
//            CURLOPT_RETURNTRANSFER => true,
//            CURLOPT_HEADER         => true,
//            CURLOPT_HTTPHEADER     => array("Content-type: application/json", "SessionId: ". $this->session),
//            CURLOPT_POST           => true,
//            CURLOPT_POSTFIELDS     => $data,
//            CURLOPT_SSL_VERIFYPEER => false,
//            CURLOPT_FOLLOWLOCATION => true,
//            CURLOPT_ENCODING       => "",
//            CURLOPT_AUTOREFERER    => true,
//            CURLOPT_CONNECTTIMEOUT => 120,
//            CURLOPT_TIMEOUT        => 120,
//            CURLOPT_MAXREDIRS      => 10,
//        );
//
//        curl_setopt_array( $curl, $options );



//        if ($method == "GET") {
//
//            $result = @file_get_contents($url);
//
//            if ($result === FALSE) {
//                return false;
//            } else {
//                return $result;
//            }
//
//        }
// else if ($method == "POST") {
//
//            $options = array(
//                'http' => array(
//                    'header' => "Content-type: application/json\r\n",
//                    'method' => 'POST',
//                    'SessionId' => $this->session,
//                    'content' => http_build_query(jso)
//                )
//            );
//
//            $context = stream_context_create($options);
//            $result = file_get_contents($url, false, $context);
//
//
//            if ($result === FALSE) {
//                return false;
//            } else {
//                return $result;
//            }
//        } else {
//            throw new \Exception('Request method type is not implement!');
//        }
    }


}