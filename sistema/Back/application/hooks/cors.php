<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Cors {
    public function __construct() {}

    public function enable_cors() {
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
        header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            die();
        }
    }
}