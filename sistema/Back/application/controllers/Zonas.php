<?php if (! defined('BASEPATH'))
    exit('No direct script access allowed');
require APPPATH . '/libraries/REST_Controller.php';

class Zonas extends REST_Controller {
    public function __construct() {
        parent::__construct();
        $this->load->model('zonas_model');
    }

    public function add_post() {

        $zona = null;
        $zona = $this->zonas_model->addZona($this->post('zona'));

        if ($zona == 1) {
            $this->response([ 'response' => "Registro exitoso" ], 200);
        } else {
            if ($zona == 0) {
                $this->response([ 'error' => "ERROR INESPERADO" ], 500);
            } else {
                if ($zona == 2) {
                    $this->response([ 'response' => "Elemento ya se encuentra registrado" ], 203);
                }
            }
        }
    }

    public function edit_post() {

        $zona = null;
        $zona = $this->zonas_model->editZona($this->post('zona'));

        if ($zona == 1) {
            $this->response([ 'response' => "Actualización exitosa" ], 200);
        } else {
            if ($zona == 0) {
                $this->response([ 'error' => "ERROR INESPERADO" ], 500);
            }
        }
    }

    public function delete_delete($id) {
        $zona = null;
        $zona = $this->zonas_model->deletZona($id);

        if ($zona == 1) {
            $this->response([ 'response' => "Eliminación exitosa" ], 200);
        } else {
            if ($zona == 0) {
                $this->response([ 'error' => "ERROR INESPERADO" ], 500);
            }
        }
    }

    public function listar_get() {

        $zona = null;
        $zona = $this->zonas_model->listarZona();

        if (! is_null($zona)) {
            $this->response($zona, 200);
        } else {
            $this->response([ 'error' => 'NO HAY RESULTADOS' ], 404);
        }
    }
}

?>