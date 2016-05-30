<?php
/**
 * Created by PhpStorm.
 * User: Filip
 * Date: 25.5.2016 г.
 * Time: 09:45 ч.
 */

namespace engine\models;

class User
{
    private $id;

    private $name;

    private $username;

    private $password;

    private $session;

    private $email;

    private $role;

    private $isActive;

    private $vacantionDays;

    private $vacantionMinutes;


    public function __construct($id,$username, $password, $name, $session,$email ,$vacantionDays = null,$vacantionMinutes = null,$role,$isActive)
    {
        $this->setId($id);
        $this->setUsername($username);
        $this->setPassword($password);
        $this->setName($username);
        $this->setSession($session);
        $this->setEmail($email);
        $this->setVacantionDays($vacantionDays);
        $this->setVacantionMinutes($vacantionMinutes);
        $this->setRole($role);
        $this->setIsActive($isActive);
    }

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @param mixed $id
     */
    public function setId($id)
    {
        $this->id = $id;
    }

    /**
     * @return mixed
     */
    public function getVacantionDays()
    {
        return $this->vacantionDays;
    }

    /**
     * @param mixed $vacantionDays
     */
    public function setVacantionDays($vacantionDays)
    {
        $this->vacantionDays = $vacantionDays;
    }

    /**
     * @return mixed
     */
    public function getVacantionMinutes()
    {
        return $this->vacantionMinutes;
    }

    /**
     * @param mixed $vacantionMinutes
     */
    public function setVacantionMinutes($vacantionMinutes)
    {
        $this->vacantionMinutes = $vacantionMinutes;
    }

    /**
     * @return mixed
     */
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * @param mixed $email
     */
    public function setEmail($email)
    {
        $this->email = $email;
    }

    /**
     * @return mixed
     */
    public function getRole()
    {
        return $this->role;
    }

    /**
     * @param mixed $role
     */
    public function setRole($role)
    {
        $this->role = $role;
    }

    /**
     * @return mixed
     */
    public function getIsActive()
    {
        return $this->isActive;
    }

    /**
     * @param mixed $isActive
     */
    public function setIsActive($isActive)
    {
        $this->isActive = $isActive;
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
    public function getName()
    {
        return $this->name;
    }

    /**
     * @param mixed $name
     */
    public function setName($name)
    {
        $this->name = $name;
    }

    /**
     * @return mixed
     */
    public function getUsername()
    {
        return $this->username;
    }

    /**
     * @param mixed $username
     */
    public function setUsername($username)
    {
        $this->username = $username;
    }

    /**
     * @return mixed
     */
    public function getPassword()
    {
        return $this->password;
    }

    /**
     * @param mixed $password
     */
    public function setPassword($password)
    {
        $this->password = $password;
    }
}