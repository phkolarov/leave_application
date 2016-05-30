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

    public function __construct()
    {
        $baseUrl = "http://192.168.4.96/VacationsWebAPI/api/";
        $this->setBaseUrl($baseUrl);
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

        if(is_array($inputData)){
            $data = $inputData;
        }

        if ($method == "GET") {

            $result = @file_get_contents($url);

            if ($result === FALSE) {
                return false;
            } else {
                return $result;
            }

        } else if ($method == "POST") {

            $options = array(
                'http' => array(
                    'header' => "Content-type: application/json\r\n",
                    'method' => 'POST',
                    'content' => http_build_query($data)
                )
            );

            $context = stream_context_create($options);
            $result = @file_get_contents($url, false, $context);


            if ($result === FALSE) {
                return false;
            } else {
                return $result;
            }
        } else {
            throw new \Exception('Request method type is not implement!');
        }
    }


}