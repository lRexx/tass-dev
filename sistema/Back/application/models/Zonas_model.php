<?php if (! defined('BASEPATH'))
    exit('No direct script access allowed');

class Zonas_model extends CI_Model {
    public function __construct() {
        parent::__construct();
    }

    public function addZona($item) {
        $this->db->insert('tb_zonas', [
                'n_zona'      => $item['n_zona'],
                'descripcion' => $item['descripcion'],
                'costo_envio' => $item['costo_envio'],
                'valor_envio' => $item['valor_envio'],
            ]
        );

        if ($this->db->affected_rows() === 1) {
            return 1;
        } else {
            return 0;
        }
    }

    public function editZona($item) {

        $this->db->set(
            [ 'n_zona'      => $item['n_zona'],
              'descripcion' => $item['descripcion'],
              'costo_envio' => $item['costo_envio'],
              'valor_envio' => $item['valor_envio'],
            ]
        )->where("idZona", $item['idZona'])->update("tb_zonas");

        if ($this->db->affected_rows() === 1) {
            return 1;
        } else {
            return 0;
        }
    }

    public function deletZona($id) {
        $this->db->set([ 'status' => 0 ])->where("idZona", $id)->update("tb_zonas");

        return true;
    }

    public function listarZona() {
        $query = $this->db->select("*")->from("tb_zonas")
            ->where('status', 1)
            ->get();
        $r     = $query->result_array();
         if ($query->num_rows() > 0) {
            foreach ($r as $key => $item) {
                if ($item['status'] == 1) {
                    $r[$key]['status_descripcion'] = 'Activo';
                } else {
                    $r[$key]['status_descripcion'] = 'Inactivo';
                }
            }
        }
        if ($query->num_rows() > 0) {
            $rs = $r;
        }

        return $rs;

    }
}

?>