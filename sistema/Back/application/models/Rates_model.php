<?php if (! defined('BASEPATH'))
    exit('No direct script access allowed');

class Rates_model extends CI_Model {
    public function __construct() {
        parent::__construct();
    }

    public function add($item) {

        $this->db->insert('tb_technician_service_cost', [
                'idServiceTechnicianKf' => $item['idServiceTechnicianKf'],
                'idTipoMantenimientoKf' => $item['idTipoMantenimientoKf'],
                'cost' => $item['cost'],
            ]
        );
        if ($this->db->affected_rows() === 1) {
            return 1;
        } else {
            return 0;
        }
    }

    public function edit($item) {
        $now = new DateTime(null, new DateTimeZone('America/Argentina/Buenos_Aires'));
        $this->db->set(
            [
                'idServiceTechnicianKf' => $item['idServiceTechnicianKf'],
                'idTipoMantenimientoKf' => $item['idTipoMantenimientoKf'],
                'cost' => $item['cost'],
                'costUpdateDate' => $now->format('Y-m-d H:i:s'),
            ]
        )->where("idServiceTechnicianCost", $item['idServiceTechnicianCost'])->update("tb_technician_service_cost");

        if ($this->db->affected_rows() === 1) {
            return 1;
        } else {
            return 0;
        }
    }

    public function delete($id) {
        $this->db->set([ 'idStatusKf' => -1 ])->where("idServiceTechnicianCost", $id)->update("tb_technician_service_cost");
        return true;
    }

    public function listar() {
        $rs = [];
        $this->db->select("tb_technician_service_cost.*, tb_status.statusTenantName AS status_cost, tb_technician_services.description, tb_type_maintenance.typeMaintenance")->from("tb_technician_service_cost");
        $this->db->join('tb_technician_services', 'tb_technician_services.idServiceTechnician = tb_technician_service_cost.idServiceTechnicianKf', 'left');
        $this->db->join('tb_status', 'tb_status.idStatusTenant = tb_technician_service_cost.idStatusKf', 'left');
        $this->db->join('tb_type_maintenance', 'tb_type_maintenance.idTypeMaintenance = tb_technician_service_cost.idTipoMantenimientoKf', 'left');
        $query = $this->db->order_by('tb_technician_service_cost.idServiceTechnicianCost ASC')->get();
        $rs = $query->result_array();
         if ($query->num_rows() > 0) {
            return $rs;
        }

        return null;
    }

    public function listarByServiceTypeId($id) {
        $rs = [];
        $this->db->select("tb_technician_service_cost.*, tb_status.statusTenantName AS status_cost, tb_technician_services.description, tb_type_maintenance.typeMaintenance")->from("tb_technician_service_cost");
        $this->db->join('tb_technician_services', 'tb_technician_services.idServiceTechnician = tb_technician_service_cost.idServiceTechnicianKf', 'left');
        $this->db->join('tb_status', 'tb_status.idStatusTenant = tb_technician_service_cost.idStatusKf', 'left');
        $this->db->join('tb_type_maintenance', 'tb_type_maintenance.idTypeMaintenance = tb_technician_service_cost.idTipoMantenimientoKf', 'left');
        $this->db->where('tb_technician_service_cost.idServiceTechnicianKf', $id);
        $query = $this->db->order_by('tb_technician_service_cost.idServiceTechnicianCost ASC')->get();
        $rs = $query->result_array();
         if ($query->num_rows() > 0) {
            return $rs;
        }

        return null;
    }

    public function getServiceCostByCustomer($item) {
        $rs = [];
        $where = null;
        $where = "tb_technician_service_cost.cost = (SELECT MIN(cost+0) AS min FROM tb_technician_service_cost
        LEFT JOIN tb_technician_services ON tb_technician_services.idServiceTechnician = tb_technician_service_cost.idServiceTechnicianKf
        LEFT JOIN tb_type_maintenance ON tb_type_maintenance.idTypeMaintenance = tb_technician_service_cost.idTipoMantenimientoKf
        LEFT JOIN tb_contratos ON tb_contratos.maintenanceType = tb_type_maintenance.idTypeMaintenance
        LEFT JOIN tb_servicios_del_contrato_cabecera ON tb_servicios_del_contrato_cabecera.idContratoFk = tb_contratos.idContrato
        LEFT JOIN tb_servicios_del_contrato_cuerpo ON tb_servicios_del_contrato_cuerpo.idServiceTypeFk = tb_servicios_del_contrato_cabecera.idServiceType
        WHERE tb_contratos.idClientFk = ".$item['idCustomer']." AND tb_servicios_del_contrato_cabecera.idServiceType = ".$item['idServiceType']." AND tb_technician_services.idServiceTechnician = ".$item['idServiceTechnician'].") LIMIT 1";
        $this->db->select("*")->from("tb_technician_service_cost");
        $this->db->join('tb_technician_services', 'tb_technician_services.idServiceTechnician = tb_technician_service_cost.idServiceTechnicianKf', 'left');
        $this->db->join('tb_type_maintenance', 'tb_type_maintenance.idTypeMaintenance = tb_technician_service_cost.idTipoMantenimientoKf', 'left');
        $query = $this->db->where($where)->get();
        $rs = $query->result_array();
         if ($query->num_rows() === 1) {
            return $rs;
        }

        return null;
    }


}

?>