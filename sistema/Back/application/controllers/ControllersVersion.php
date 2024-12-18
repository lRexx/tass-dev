<?php if (! defined('BASEPATH'))
    exit('No direct script access allowed');
require APPPATH.'/libraries/REST_Controller.php';

class ControllersVersion extends REST_Controller {
    public function __construct() {
        parent::__construct();
        $this->load->model('Version_model');
    }
    public function get_get() {

        $rs = $this->Version_model->get_versions();

        if (! is_null($rs)) {
            //$this->response($rs, 200);
            $this->response([ 'versions' => $rs ], 200);
        } else {
            $this->response([ 'error' => 'NO HAY RESULTADOS' ], 404);
        }
    }
}