<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Tenant_model extends CI_Model
{
	
	public function __construct()
	{
        parent::__construct();
	}


	 // GET DE LISTADO BUSQUEDA DE INQUIILINO //
    public function get($id = null, $searchFilter = null) {
        $quuery = null;
        $rs = null;

        // SI RECIBIMOS EL ID DE EL USUARIO //
        if (!is_null($id)) 
        {

            $this->db->select("*")->from("tb_user");
            $this->db->join('tb_client_departament', 'tb_client_departament.idClientDepartament = tb_user.idDepartmentKf', 'left');
            $this->db->join('tb_typetenant', 'tb_typetenant.idTypeTenant = tb_user.idTyepeAttendantKf', 'left');
			$this->db->where("tb_user.idStatusKf !=", -1);
            $quuery = $this->db->where("tb_user.idUser = ", $id)->get();


            if ($quuery->num_rows() === 1) {
                $rs =  $quuery->row_array();
                return $rs;
            }
        } 
        else
         { 

            $this->db->select("*")->from("tb_user");
            $this->db->join('tb_client_departament', 'tb_client_departament.idClientDepartament = tb_user.idDepartmentKf', 'left');
            $this->db->join('tb_typetenant', 'tb_typetenant.idTypeTenant = tb_user.idTyepeAttendantKf', 'left');
			$this->db->where("tb_user.idStatusKf !=", -1);

            // Si recibimos id de administrador de cnosorcio  //
            if (@$searchFilter['idAdminR'] > 0) {
                $this->db->where('idDepartmentKf in (
                SELECT  idDepartment  FROM tb_client_departament WHERE idUserAdminRKf = '.$searchFilter['idAdminR'].' )',NULL, FALSE);
            } 

            if(@$searchFilter['idTypeTenantKf'] > 0)
            {
                 $this->db->where('tb_user.idTyepeAttendantKf', $searchFilter['idTypeTenantKf']);
            } 

            /* Busqueda por filtro */
            if (!is_null(@$searchFilter['searchFilter']) && @$searchFilter['searchFilter'] != "") 
            {
            	$this->db->like('tb_user.fullNameUser', $searchFilter['searchFilter']);
                $this->db->or_like('tb_user.phoneNumberUser', $searchFilter['searchFilter']);
                $this->db->or_like('tb_user.emailTenant', $searchFilter['searchFilter']);

				
				
				if(@$searchFilter['idDepartmentKf'] > 0)
				{
					 $this->db->or_where('tb_user.idDepartmentKf', $searchFilter['idDepartmentKf']);
                }
                
                
            }

            


            // Si recibimos un limite //
            if ($searchFilter['topFilter'] > 0) {
                $this->db->limit($searchFilter['topFilter']);
            } 

            $quuery = $this->db->order_by("tb_user.idUser", "DESC")->get();


            if ($quuery->num_rows() > 0) {
                return $quuery->result_array();
            }
            return null;
        }
    }


	
    /* AGREGRA NUEVO USUARIO EMPRESA */
    public function add($tenant) {

        /* CREAMOS UN USUARIO PARA ESE CLIENE */
        $this->db->insert('tb_user', array(
            'fullNameUser' => $tenant['fullNameUser'],
            'idTypeTenantKf' => $tenant['idTypeTenantKf'],
            'phoneNumberUser' => $tenant['phoneNumberUser'],
            'idDepartmentKf' => $tenant['idDepartmentKf'],
            'emailTenant' => $tenant['emailTenant'],
            'phoneLocalNumberUser' => $tenant['phoneLocalNumberUser'],
            'idStatusKf' => 1
                )
        );

        if ($this->db->affected_rows() === 1) {
            $id = $this->db->insert_id();
            return $id;
        } else {
            return null;
        }
    }


    /* LISTADO DE FILTROS */
    public function getFilterForm() {

        $department = null;
        $profile = null;
        $typetenant = null;


        $query =  $this->db->select("*")->from("tb_client_departament")->get();
        if ($query->num_rows() > 0) {
            $department = $query->result_array();
        }

        $query =  $this->db->select("*")->from("tb_typetenant")->get();
        if ($query->num_rows() > 0) {
            $typetenant = $query->result_array();
        }



        $filter = array(
            'department'  => $department,
            'typetenant' => $typetenant
        );

        return $filter;
    }

    /* LISTADO DE FILTROS */
    public function getTenanatByIdDepartament($id, $idType) {
        
                $tenant = null;

                if (@$idType > 0){
                    $this->db->select("*")->from("tb_user");
                    
                    if (@$id > 0){
                        $this->db->where("tb_user.idTypeTenantKf =", $idType);
                        $query = $this->db->where("tb_user.idDepartmentKf =", $id)->get();
                        
                    }else{
                        $query = $this->db->where("tb_user.idTyepeAttendantKf =", $idType)->get();
                    }
                   
                 }

                 if (@$idType < 1){
                    
                    if (@$id > 0){
                        $this->db->select("*")->from("tb_user");
                        $query = $this->db->where("tb_user.idDepartmentKf =", $id)->get();
                        
                    }else{
                        $query =  $this->db->select("*")->from("tb_user")->get();
                        
                    }
                 }
                  
                
                
            
                if ($query->num_rows() > 0) {
                    $tenant = $query->result_array();
                }
    
                $rs = array(
                    'tenant' => $tenant
                );
        
                return $rs;
    }


    
    public function allByIdDepartament($id) {
        
                $tenant = null;
                $extrawhere = "";
                $extrawheresubquery = "";
                $rs = null;

                if($id > 0){
                    $extrawhere = " where  t1.idDepartmentKf = ".$id."  or idUser in (select idUserKf from  tb_client_departament where idClientDepartament = ".$id." ) ";
                }
                
                $query = $query = $this->db->query(" select * from tb_user t1 ".$extrawhere);


    
            if($query->num_rows() > 0){
                $rs = $query->row_array();
                $tenant = $query->result_array();
            
                $rs = array(
                    'tenant' => $tenant
                );
            }
                return $rs;
    }
    

     /* LISTADO DE FILTROS */
     public function findByEmail($mail) {
        
                $tenant = null;
        
                $this->db->select("*")->from("tb_user");
                $query = $this->db->where("tb_user.emailUser =", $mail)->get();
                if ($query->num_rows() > 0) {
                    $tenant = $query->row_array();
                }

                return $tenant;
    }



    

     /* LISTADO DE FILTROS */
     public function getDepartamentByIdAdminR($id) {
        
                $tenant = null;
        
                $this->db->select("*")->from("tb_client_departament");
                $query = $this->db->where("tb_client_departament.idUserAdminRKf =", $id)->get();
                if ($query->num_rows() > 0) {
                    $tenant = $query->result_array();
                }
    
                $rs = array(
                    'tenant' => $tenant
                );
        
                return $rs;
    }
        


     /* EDITAR DATOS DE UN inquilino */
    public function update($tenant) {

        $this->db->set(
                array(
                    'fullNameUser' => $tenant['fullNameUser'],
		            'idTypeTenantKf' => $tenant['idTypeTenantKf'],
		            'phoneNumberUser' => $tenant['phoneNumberUser'],
		            'idDepartmentKf' => $tenant['idDepartmentKf'],
		            'emailTenant' => $tenant['emailTenant'],
                    'phoneLocalNumberUser' => $tenant['phoneLocalNumberUser']
                )
        )->where("idUser", $tenant['idUser'])->update("tb_user");

        
        if ($this->db->affected_rows() === 1) {
            return true;
        } else {
            return false;
        }
    }


     public function changueStatus($id, $idStatus) {
        $this->db->set(
                array(
                    'idStatusKf' => $idStatus
                )
        )->where("idUser", $id)->update("tb_user");


        if ($this->db->affected_rows() === 1) {
            return true;
        } else {
            return false;
        }
    }


}
?>
