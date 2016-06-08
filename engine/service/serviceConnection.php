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
        $baseUrl = "http://external.euroins.bg/VacationsWebAPI/api/";
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
        $data = array();


        if (is_array($inputData)) {
            $data = json_encode($inputData);
        }


        //  Initiate curl
        $ch = curl_init();


        curl_setopt($ch, CURLOPT_NOBODY,1);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array("Content-type: application/json", "SessionId: ". $this->session));
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        if($method == 'POST'){

            curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_URL, $url);

        }else if($method == 'GET'){



        }

        $result = curl_exec($ch);
        var_dump($result);

        curl_close($ch);

        if ($result == FALSE) {
            return false;
        } else {
            return $result;
        }

    }


}