<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class User_model extends CI_Model
{

	public function __construct ()
	{
		parent::__construct();
		/*MAIL*/
		$this->load->model('mail_model');
	}

	public function auth ($user)
	{
		//se inicia sesion por mail o por dni
		//echo(sha1(md5($user['passwordUser'])));

		//return sha1(md5($user['']));

		/* verificamos el usuario  */
		$this->db->select("*")->from("tb_user");
		//$this->db->join('tb_clients', 'tb_clients.idClient = tb_user.idAddresKf', 'left');
		//$this->db->join('tb_company', 'tb_company.idCompany = tb_user.idCompanyKf', 'left');
        $this->db->join('tb_profile', 'tb_profile.idProfile = tb_user.idProfileKf', 'left');
        $this->db->join('tb_profiles', 'tb_profiles.idProfiles = tb_user.idSysProfileFk', 'left');
        $this->db->join('tb_status', 'tb_status.idStatusTenant = tb_user.idStatusKf', 'left');
		$this->db->join('tb_client_departament', 'tb_client_departament.idClientDepartament = tb_user.idDepartmentKf', 'left');
		$this->db->join('tb_category_departament', 'tb_category_departament.idCategoryDepartament = tb_client_departament.idCategoryDepartamentFk', 'left');
		$this->db->join('tb_typetenant', 'tb_typetenant.idTypeTenant = tb_user.idTypeTenantKf', 'left');
        $this->db->join('tb_type_attendant', 'tb_type_attendant.idTyepeAttendant = tb_user.idTyepeAttendantKf', 'left');
		$this->db->where("passwordUser =", sha1(md5($user['passwordUser'])));
		$this->db->group_start();
		$this->db->where("emailUser", $user['fullNameUser']);
		$this->db->or_where("dni", $user['fullNameUser']);
		$this->db->group_end();
		$query = $this->db->get();


		if ($query->num_rows() == 1) {

			$user = $query->row_array();
				$idProfile = null;
				$idProfile = $user['idProfileKf'];
				$idProfiles = $user['idSysProfileFk'];
				$query2    = null;
				if (isset($idProfiles) && !is_null($idProfiles) && $idProfiles > 0) {
					// Buscamos los perfiles de sistema //
					$this->db->select("*")->from("tb_profiles");
					$quuery = $this->db->where("tb_profiles.idProfiles =", $idProfiles)->get();
					if ($quuery->num_rows() === 1) {
						$rs = $quuery->row_array();
	
						$this->db->select("*")->from("tb_profiles_modules");
						$this->db->join('tb_modules', 'tb_modules.idModule = tb_profiles_modules.idModuleFk', 'inner');
						$quuery = $this->db->where("tb_profiles_modules.idProfilesFk =", $idProfiles)->get();
	
						$rs2 = $quuery->result_array();
	
						$user['modules'] = $rs2;
					}
					if (($idProfile == 2) && ($user['idTypeTenantKf'] == null || $user['idTypeTenantKf'] == '') || ($idProfile == 4) && (($user['idTypeTenantKf'] == null || $user['idTypeTenantKf'] == '') || ($user['idTypeTenantKf'] != null && $user['idTypeTenantKf'] != ''))) {
						$query2 = $this->db->select("*")->from("tb_clients");
						$query2 = $this->db->where('idClient', $user['idCompanyKf']);
						$query2 = $this->db->get();
						if ($query2->num_rows() > 0) {
							$user['company'] = $query2->result_array();
						}
					}
					if ($idProfile == 5 || ($idProfile == 4 && $user['idTypeTenantKf'] == 2) || ($idProfile == 6 && $user['idTyepeAttendantKf'] != 1 && $user['idTypeTenantKf'] == 2)) {
						$query2 = $this->db->select("*")->from("tb_clients");
						$query2 = $this->db->where('idClient', $user['idAddresKf']);
						$query2 = $this->db->get();
						if ($query2->num_rows() > 0) {
							$user['building'] = $query2->result_array();
						}
					}
					if ($idProfile == 6 && $user['idTyepeAttendantKf'] != null && ($user['idTypeTenantKf'] == null || $user['idTypeTenantKf'] != null)) {
						$query2    = null;
						$query2 = $this->db->select("*")->from("tb_clients");
						$query2 = $this->db->where('idClient', $user['idAddresKf']);
						$query2 = $this->db->get();
						if ($query2->num_rows() > 0) {
							$user['building'] = $query2->result_array();
						}
					}
					if (($idProfile == 4 || $idProfile == 6) && $user['idTypeTenantKf'] == 1) {
						$query2 = $this->db->select("*")->from("tb_clients");
						$query2 = $this->db->where('idClient', $user['idAddresKf']);
						$query2 = $this->db->get();
						if ($query2->num_rows() > 0) {
							$user['building'] = $query2->result_array();
						}
					}
					if ($idProfile == 3 || ($idProfile == 4 && $user['idTypeTenantKf'] == 1) || ($idProfile == 6 && $user['idTypeTenantKf'] == 1)) {
						$query2 = $this->db->select("*")->from("tb_client_departament");
						$query2 = $this->db->join('tb_category_departament', 'tb_category_departament.idCategoryDepartament = tb_client_departament.idCategoryDepartamentFk', 'left');
						$query2 = $this->db->join('tb_clients', ' tb_clients.idClient= tb_client_departament.idClientFk', 'left');
						$query2 = $this->db->where('idUserKf', $user['idUser']);
						$query2 = $this->db->get();
						if ($query2->num_rows() > 0) {
							$user['deptos'] = $query2->result_array();
						}
					}
					if ($idProfile == 5 || ($idProfile == 4 && $user['idTypeTenantKf'] == 2) || ($idProfile == 6 && $user['idTyepeAttendantKf'] != 1 && $user['idTypeTenantKf'] == 2)) {
						$query2 = $this->db->select("*")->from("tb_client_departament");
						$query2 = $this->db->join('tb_category_departament', 'tb_category_departament.idCategoryDepartament = tb_client_departament.idCategoryDepartamentFk', 'left');
						$query2 = $this->db->join('tb_clients', ' tb_clients.idClient= tb_client_departament.idClientFk', 'left');
						$query2 = $this->db->where('idClientDepartament', $user['idDepartmentKf']);
						$query2 = $this->db->get();
						if ($query2->num_rows() > 0) {
							$user['deptos'] = $query2->result_array();
						}
					}
				}
			return $user;
		} else {
			return null;
		}
	}


	// GET DE USUARIO NO ASOCIADOS A NINGUN DEPARTAMENTO//
	public function usernoregister ($id)
	{
		$query = null;
		$rs    = [];
		$arrList1 = null;
		$arrList2 = null;

		$sqlOwner = "
			SELECT DISTINCT * from tb_user as t1
			LEFT JOIN tb_profile ON tb_profile.idProfile = t1.idProfileKf
			LEFT JOIN tb_profiles ON tb_profiles.idProfiles = t1.idSysProfileFk 
			LEFT JOIN tb_typetenant ON tb_typetenant.idTypeTenant = t1.idTypeTenantKf 
			LEFT JOIN tb_status ON tb_status.idStatusTenant = t1.idStatusKf 
			LEFT JOIN tb_type_attendant ON tb_type_attendant.idTyepeAttendant = t1.idTyepeAttendantKf 
			where idUser NOT in
			(SELECT distinct idUserKf as id from tb_client_departament as tbaux1 where tbaux1.idClientDepartament=$id AND
			tbaux1.idUserKf != '' )
			AND t1.idStatusKf != -1 AND t1.idTypeTenantKf in (1);";
		$sqlTenant = "
			SELECT DISTINCT * from tb_user as t1
			LEFT JOIN tb_profile ON tb_profile.idProfile = t1.idProfileKf
			LEFT JOIN tb_profiles ON tb_profiles.idProfiles = t1.idSysProfileFk 
			LEFT JOIN tb_typetenant ON tb_typetenant.idTypeTenant = t1.idTypeTenantKf 
			LEFT JOIN tb_status ON tb_status.idStatusTenant = t1.idStatusKf
			LEFT JOIN tb_type_attendant ON tb_type_attendant.idTyepeAttendant = t1.idTyepeAttendantKf 
			WHERE ISNULL(t1.idDepartmentKf) AND t1.idStatusKf != -1 AND t1.idTypeTenantKf in (2);";

			$query1 = $this->db->query($sqlOwner);
			$query2 = $this->db->query($sqlTenant);
		if ($query1->num_rows() > 0 || $query2->num_rows() > 0) {
			 $arrList1 = $query1->result_array();
			 
			 $arrList2 = $query2->result_array();
			 
			 $rs = array_merge($arrList1,$arrList2);
			return $rs;
		}

		return null;


	}
	public function attendantsNotBuildingAssigned(){
		$query = null;
		$rs    = [];
        /* LISTADO DE ENCARGADOS */
        $this->db->select("*")->from("tb_user");
        $this->db->join('tb_profile', 'tb_profile.idProfile = tb_user.idProfileKf', 'left');
        $this->db->join('tb_profiles', 'tb_profiles.idProfiles = tb_user.idSysProfileFk', 'left');
        $this->db->join('tb_status', 'tb_status.idStatusTenant = tb_user.idStatusKf', 'left');
        $this->db->join('tb_clients', 'tb_clients.idClient = tb_user.idAddresKf', 'left');
        $this->db->join('tb_type_attendant', 'tb_type_attendant.idTyepeAttendant = tb_user.idTyepeAttendantKf', 'left');
        $this->db->join('tb_typetenant', 'tb_typetenant.idTypeTenant = tb_user.idTypeTenantKf', 'left');
        $where = "tb_user.idProfileKf = 6 AND ISNULL(tb_user.idAddresKf)";
        $this->db->where($where);
        $query = $this->db->order_by("tb_user.idUser", "ASC")->get();
		if ($query->num_rows() > 0) {
			$rs = $query->result_array();
			return $rs;
		}
		return null;
	}

	// GET DE LISTADO BUSQUEDA DE USUARIO //
	public function get ($id = null, $searchFilter = null)
	{
		$quuery = null;
		$rs     = null;
		// SI RECIBIMOS EL ID DE EL USUARIO //
		if (!is_null($id)) {
			$this->db->select("*")->from("tb_user");
			$this->db->join('tb_profile', 'tb_profile.idProfile = tb_user.idProfileKf', 'left');
			$this->db->join('tb_profiles', 'tb_profiles.idProfiles = tb_user.idSysProfileFk', 'left');
			$this->db->join('tb_status', 'tb_status.idStatusTenant = tb_user.idStatusKf', 'left');
			$this->db->join('tb_client_departament', 'tb_client_departament.idClientDepartament = tb_user.idDepartmentKf', 'left');
			$this->db->join('tb_category_departament', 'tb_category_departament.idCategoryDepartament = tb_client_departament.idCategoryDepartamentFk', 'left');
			$this->db->join('tb_typetenant', 'tb_typetenant.idTypeTenant = tb_user.idTypeTenantKf', 'left');
			$this->db->join('tb_type_attendant', 'tb_type_attendant.idTyepeAttendant = tb_user.idTyepeAttendantKf', 'left');
			$this->db->where("tb_user.idStatusKf !=", -1);
			$quuery = $this->db->where("tb_user.idUser = ", $id)->get();

			if ($quuery->num_rows() == 1) {

				$user = $quuery->row_array();
					$idProfile = null;
					$idProfile = $user['idProfileKf'];
					$idProfiles = $user['idSysProfileFk'];
					$query2    = null;
					if (isset($idProfiles) && !is_null($idProfiles) && $idProfiles > 0) {
						// Buscamos los perfiles de sistema //
						$this->db->select("*")->from("tb_profiles");
						$quuery = $this->db->where("tb_profiles.idProfiles =", $idProfiles)->get();
						if ($quuery->num_rows() === 1) {
							$rs = $quuery->row_array();
		
							$this->db->select("*")->from("tb_profiles_modules");
							$this->db->join('tb_modules', 'tb_modules.idModule = tb_profiles_modules.idModuleFk', 'inner');
							$quuery = $this->db->where("tb_profiles_modules.idProfilesFk =", $idProfiles)->get();
		
							$rs2 = $quuery->result_array();
		
							$user['modules'] = $rs2;
						}
						if (($idProfile == 2) && ($user['idTypeTenantKf'] == null || $user['idTypeTenantKf'] == '') || ($idProfile == 4) && (($user['idTypeTenantKf'] == null || $user['idTypeTenantKf'] == '') || ($user['idTypeTenantKf'] != null && $user['idTypeTenantKf'] != ''))) {
							$query2 = $this->db->select("*")->from("tb_clients");
							$query2 = $this->db->where('idClient', $user['idCompanyKf']);
							$query2 = $this->db->get();
							if ($query2->num_rows() > 0) {
								$user['company'] = $query2->result_array();
							}
						}
						if ($idProfile == 5 || ($idProfile == 4 && $user['idTypeTenantKf'] == 2) || ($idProfile == 6 && $user['idTyepeAttendantKf'] != 1 && $user['idTypeTenantKf'] == 2)) {
							$query2 = $this->db->select("*")->from("tb_clients");
							$query2 = $this->db->where('idClient', $user['idAddresKf']);
							$query2 = $this->db->get();
							if ($query2->num_rows() > 0) {
								$user['building'] = $query2->result_array();
							}
						}
						if ($idProfile == 6 && $user['idTyepeAttendantKf'] != null && ($user['idTypeTenantKf'] == null || $user['idTypeTenantKf'] != null)) {
							$query2    = null;
							$query2 = $this->db->select("*")->from("tb_clients");
							$query2 = $this->db->where('idClient', $user['idAddresKf']);
							$query2 = $this->db->get();
							if ($query2->num_rows() > 0) {
								$user['building'] = $query2->result_array();
							}
						}
						if (($idProfile == 4 || $idProfile == 6) && $user['idTypeTenantKf'] == 1) {
							$query2 = $this->db->select("*")->from("tb_clients");
							$query2 = $this->db->where('idClient', $user['idAddresKf']);
							$query2 = $this->db->get();
							if ($query2->num_rows() > 0) {
								$user['building'] = $query2->result_array();
							}
						}
						if ($idProfile == 3 || ($idProfile == 4 && $user['idTypeTenantKf'] == 1) || ($idProfile == 6 && $user['idTypeTenantKf'] == 1)) {
							$query2 = $this->db->select("*")->from("tb_client_departament");
							$query2 = $this->db->join('tb_category_departament', 'tb_category_departament.idCategoryDepartament = tb_client_departament.idCategoryDepartamentFk', 'left');
							$query2 = $this->db->join('tb_clients', ' tb_clients.idClient= tb_client_departament.idClientFk', 'left');
							$query2 = $this->db->where('idUserKf', $user['idUser']);
							$query2 = $this->db->get();
							if ($query2->num_rows() > 0) {
								$user['deptos'] = $query2->result_array();
							}
						}
						if ($idProfile == 5 || ($idProfile == 4 && $user['idTypeTenantKf'] == 2) || ($idProfile == 6 && $user['idTyepeAttendantKf'] != 1 && $user['idTypeTenantKf'] == 2)) {
							$query2 = $this->db->select("*")->from("tb_client_departament");
							$query2 = $this->db->join('tb_category_departament', 'tb_category_departament.idCategoryDepartament = tb_client_departament.idCategoryDepartamentFk', 'left');
							$query2 = $this->db->join('tb_clients', ' tb_clients.idClient= tb_client_departament.idClientFk', 'left');
							$query2 = $this->db->where('idClientDepartament', $user['idDepartmentKf']);
							$query2 = $this->db->get();
							if ($query2->num_rows() > 0) {
								$user['deptos'] = $query2->result_array();
							}
						}
					}
				return $user;
			}
		} else {
			$this->db->select("*")->from("tb_user");
			$this->db->join('tb_profile', 'tb_profile.idProfile = tb_user.idProfileKf', 'left');
			$this->db->join('tb_profiles', 'tb_profiles.idProfiles = tb_user.idSysProfileFk', 'left');
			$this->db->join('tb_status', 'tb_status.idStatusTenant = tb_user.idStatusKf', 'left');
			$this->db->join('tb_client_departament', 'tb_client_departament.idClientDepartament = tb_user.idDepartmentKf', 'left');
			$this->db->join('tb_category_departament', 'tb_category_departament.idCategoryDepartament = tb_client_departament.idCategoryDepartamentFk', 'left');
			$this->db->join('tb_typetenant', 'tb_typetenant.idTypeTenant = tb_user.idTypeTenantKf', 'left');
			$this->db->join('tb_type_attendant', 'tb_type_attendant.idTyepeAttendant = tb_user.idTyepeAttendantKf', 'left');
			$this->db->where("tb_user.idStatusKf !=", -1);


			/* Busqueda por filtro */
			if (!is_null($searchFilter['searchFilter'])) {
				$this->db->like('tb_user.fullNameUser', $searchFilter['searchFilter']);
				$this->db->or_like('tb_user.emailUser', $searchFilter['searchFilter']);
				$this->db->or_like('tb_user.phoneNumberUser', $searchFilter['searchFilter']);
				$this->db->or_like('tb_user.phoneLocalNumberUser', $searchFilter['searchFilter']);
			}


			// Si recibimos un limite //
			if ($searchFilter['topFilter'] > 0) {
				$this->db->limit($searchFilter['topFilter']);
			}
			$quuery = $this->db->order_by("tb_user.idUser", "ASC")->get();
			if ($query->num_rows() > 0) {
				$user = $query->result_array();
				foreach ($user as $key => $item) {
					$idProfile = null;
					$idProfile = $item['idProfileKf'];
					$idProfiles = $item['idSysProfileFk'];
					$query2    = null;
					if (isset($idProfiles) && !is_null($idProfiles) && $idProfiles > 0) {
						// Buscamos los perfiles de sistema //
						$this->db->select("*")->from("tb_profiles");
						$quuery = $this->db->where("tb_profiles.idProfiles =", $idProfiles)->get();
						if ($quuery->num_rows() === 1) {
							$rs = $quuery->row_array();
		
							$this->db->select("*")->from("tb_profiles_modules");
							$this->db->join('tb_modules', 'tb_modules.idModule = tb_profiles_modules.idModuleFk', 'inner');
							$quuery = $this->db->where("tb_profiles_modules.idProfilesFk =", $idProfiles)->get();
		
							$rs2 = $quuery->result_array();
		
							$user[$key]['modules'] = $rs2;
						}
						if (($idProfile == 2) && ($item['idTypeTenantKf'] == null || $item['idTypeTenantKf'] == '') || ($idProfile == 4) && (($item['idTypeTenantKf'] == null || $item['idTypeTenantKf'] == '') || ($item['idTypeTenantKf'] != null && $item['idTypeTenantKf'] != ''))) {
							$query2 = $this->db->select("*")->from("tb_clients");
							$query2 = $this->db->where('idClient', $item['idCompanyKf']);
							$query2 = $this->db->get();
							if ($query2->num_rows() > 0) {
								$user[$key]['company'] = $query2->result_array();
							}
						}
						if ($idProfile == 5 || ($idProfile == 4 && $item['idTypeTenantKf'] == 2) || ($idProfile == 6 && $item['idTyepeAttendantKf'] != 1 && $item['idTypeTenantKf'] == 2)) {
							$query2 = $this->db->select("*")->from("tb_clients");
							$query2 = $this->db->where('idClient', $item['idAddresKf']);
							$query2 = $this->db->get();
							if ($query2->num_rows() > 0) {
								$user[$key]['building'] = $query2->result_array();
							}
						}
						if ($idProfile == 6 && $item['idTyepeAttendantKf'] != null && ($item['idTypeTenantKf'] == null || $item['idTypeTenantKf'] != null)) {
							$query2    = null;
							$query2 = $this->db->select("*")->from("tb_clients");
							$query2 = $this->db->where('idClient', $item['idAddresKf']);
							$query2 = $this->db->get();
							if ($query2->num_rows() > 0) {
								$user[$key]['building'] = $query2->result_array();
							}
						}
						if (($idProfile == 4 || $idProfile == 6) && $item['idTypeTenantKf'] == 1) {
							$query2 = $this->db->select("*")->from("tb_clients");
							$query2 = $this->db->where('idClient', $item['idAddresKf']);
							$query2 = $this->db->get();
							if ($query2->num_rows() > 0) {
								$user[$key]['building'] = $query2->result_array();
							}
						}
						if ($idProfile == 3 || ($idProfile == 4 && $item['idTypeTenantKf'] == 1) || ($idProfile == 6 && $item['idTypeTenantKf'] == 1)) {
							$query2 = $this->db->select("*")->from("tb_client_departament");
							$query2 = $this->db->join('tb_category_departament', 'tb_category_departament.idCategoryDepartament = tb_client_departament.idCategoryDepartamentFk', 'left');
							$query2 = $this->db->join('tb_clients', ' tb_clients.idClient= tb_client_departament.idClientFk', 'left');
							$query2 = $this->db->where('idUserKf', $item['idUser']);
							$query2 = $this->db->get();
							if ($query2->num_rows() > 0) {
								$user[$key]['deptos'] = $query2->result_array();
							}
						}
						if ($idProfile == 5 || ($idProfile == 4 && $item['idTypeTenantKf'] == 2) || ($idProfile == 6 && $item['idTyepeAttendantKf'] != 1 && $item['idTypeTenantKf'] == 2)) {
							$query2 = $this->db->select("*")->from("tb_client_departament");
							$query2 = $this->db->join('tb_category_departament', 'tb_category_departament.idCategoryDepartament = tb_client_departament.idCategoryDepartamentFk', 'left');
							$query2 = $this->db->join('tb_clients', ' tb_clients.idClient= tb_client_departament.idClientFk', 'left');
							$query2 = $this->db->where('idClientDepartament', $item['idDepartmentKf']);
							$query2 = $this->db->get();
							if ($query2->num_rows() > 0) {
								$user[$key]['deptos'] = $query2->result_array();
							}
						}
					}
				}
				return $user;
			}
			return null;
		}
	}


	/* AGRAGR NUEVO USUARIO DE CUALQUIER TIPO */
	public function add ($user)
	{

		if ($this->findUserByEmail($user['dni']) == null) {
			$tokenMail            = $this->generateRandomString();
			$ramdonPwd            = $this->get_random_password();
			$isDepartmentApproved = null;
			$idStatusKfByAdmin    = null;
			if (@$user['idTypeTenantKf'] != 1 && @$user['idDepartmentKf'] && (@$user['isCreateByAdmin'] || @$user['isCreateByOwner'])) {
				$isDepartmentApproved = 1;
			} else {
				$isDepartmentApproved = null;
			}
			if (@$user['idTyepeAttendantKf'] != 0 && @$user['isCreateByAdmin']) {
				$idStatusKfByAdmin = 1;
			} else {
				$idStatusKfByAdmin = 0;
			}
			/* CREAMOS UN USUARIO */
			$this->db->insert('tb_user', array(
					'fullNameUser'          => $user['fullNameUser'],
					'emailUser'             => $user['emailUser'],
					'phoneNumberUser'       => $user['phoneNumberUser'],
					'phoneLocalNumberUser'  => @$user['phoneLocalNumberUser'],
					'idAddresKf'            => @$user['idAddresKf'],
					'passwordUser'          => sha1(md5($ramdonPwd)),
					'idProfileKf'           => $user['idProfileKf'],
					'idTypeTenantKf'        => $user['idTypeTenantKf'],
					'idStatusKf'            => 0,
					'idCompanyKf'           => @$user['idCompanyKf'],
					'idTyepeAttendantKf'    => @$user['idTyepeAttendantKf'],
					'descOther'             => @$user['descOther'],
					'idDepartmentKf'        => @$user['idDepartmentKf'],
					'isDepartmentApproved'  => $isDepartmentApproved,
					'isEdit'                => @$user['isEdit'],
					'requireAuthentication' => @$user['requireAuthentication'],
					'resetPasword'          => 1,
					'tokenMail'             => $tokenMail,
					'dni'                   => $user['dni'],
					'idSysProfileFk'        => @$user['idSysProfileFk']
				)
			);


			if ($this->db->affected_rows() === 1) {
				$idUser = $this->db->insert_id();
				// VALIDAMOS SI EL USER ESTA SIENDO CREADO POR UN ADMIN //
				if (@$user['isCreateByAdmin']) {

					$this->db->set(
						array(
							'isConfirmatedMail' => 1,
							'idStatusKf'        => 1
						)
					)->where("idUser", $idUser)->update("tb_user");
				}
				// ENVIAMOS EL MAIL DE CONFIRMAR REGISTRO //
				/*MAIL*/
				$title = "Mail de confirmacion de TASS Seguridad";
				$subject = "Registro de usuario exitoso";
				$currentURL = $this->get_the_current_url(); //for simple URL

				$body = '
            Usuario:' . $user['emailUser'] . '
            <BR>' . 'Clave:' . $ramdonPwd . '<br>' . '
            <a href=' . $currentURL . 'validate/' . $tokenMail . '>Pulse aqui para Confirmar mail</a>';

				$this->mail_model->sendMail($title, $user['emailUser'], $body, $subject);
				//*****************/

				$idUser = $this->db->insert_id();


				// Validamos que es de tipo coferba //
				if ($user['idProfileKf'] == 1) {


				}

				return $idUser;
			} else {
				return null;
			}
		} else {
			return -1;
		}
	}

	public function get_random_password ($chars_min = 6, $chars_max = 8, $use_upper_case = false, $include_numbers = 'yes', $include_special_chars = false)
	{
		$length    = rand($chars_min, $chars_max);
		$selection = 'aeuoyibcdfghjklmnpqrstvwxz';
		if ($include_numbers) {
			$selection .= "1234567890";
		}
		if ($include_special_chars) {
			$selection .= "!@\"#$%&[]{}?|";
		}

		$password = "";
		for ($i = 0; $i < $length; $i++) {
			$current_letter = $use_upper_case ? (rand(0, 1) ? strtoupper($selection[(rand() % strlen($selection))]) : $selection[(rand() % strlen($selection))]) : $selection[(rand() % strlen($selection))];
			$password       .= $current_letter;
		}

		return $password;
	}


	/* EDITAR CLAVES  */
	public function updatePass ($user)
	{
		$recoverRamdonPwd = null;
		$recoverRamdonPwd = $this->get_random_password();
		$this->db->set(
			array(
				'passwordUser' => sha1(md5($recoverRamdonPwd)),
				'resetPasword' => 1
			)
		)->where("emailUser", $user['emailUser'])
		->where("dni", $user['dni'])
		->update("tb_user");

		/*MAIL*/
		$title = "Mail de Clave de Acceso a Coferba";
		$body  = "Se Restablecio su clave de acceso!<br> Usuario: " . $user['emailUser'] . "<br> Clave: " . $recoverRamdonPwd . " <br> Le Recomendamos luego de acceder cambie su clave!";
		$m     = $this->mail_model->sendMail($title, $user['emailUser'], $body, $title);


		if ($this->db->affected_rows() === 1) {

			return true;
		} else {
			return false;
		}
	}

	function generateRandomString ($length = 10)
	{
		$characters       = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
		$charactersLength = strlen($characters);
		$randomString     = '';
		for ($i = 0; $i < $length; $i++) {
			$randomString .= $characters[rand(0, $charactersLength - 1)];
		}
		return $randomString;
	}


	public function get_the_current_url ()
	{

		$protocol     = ((isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] == "on") ? "https" : "http");
		$base_url     = $protocol . "://" . $_SERVER['HTTP_HOST'];
		$complete_url = $base_url . $_SERVER["REQUEST_URI"];

		return $complete_url;

	}


	public function updatecompany ($user)
	{

		$this->db->set(
			array(
				'nameCompany'   => $user['nameCompany'],
				'mail_services' => $user['mail_services'],
				'mail_request'  => $user['mail_request'],
				'mail_admin'    => $user['mail_admin'],
				'isEdit'        => $user['isEdit']
			)
		)->where("idCompany", $user['idCompany'])->update("tb_company");


		if ($this->db->affected_rows() === 1) {

			return true;
		} else {
			return false;
		}
	}


	/* EDITAR DATOS DE UN USUARIO */
	public function update ($user)
	{

		$this->db->set(
			array(
				'fullNameUser'          => $user['fullNameUser'],
				'emailUser'             => $user['emailUser'],
				'phoneNumberUser'       => $user['phoneNumberUser'],
				'phoneLocalNumberUser'  => $user['phoneLocalNumberUser'],
				'idAddresKf'            => $user['idAddresKf'],
				'idProfileKf'           => $user['idProfileKf'],
				'idCompanyKf'           => $user['idCompanyKf'],
				'idTyepeAttendantKf'    => @$user['idTyepeAttendantKf'],
				'descOther'             => @$user['descOther'],
				'idDepartmentKf'        => @$user['idDepartmentKf'],
				'idTypeTenantKf'        => $user['idTypeTenantKf'],
				'requireAuthentication' => @$user['requireAuthentication'],
				'isDepartmentApproved'  => @$user['isDepartmentApproved'],
				'isEdit'                => @$user['isEdit'],
				'idSysProfileFk'        => @$user['idSysProfileFk'],
				'dni'                   => $user['dni'],
			)
		)->where("idUser", $user['idUser'])->update("tb_user");


		if ($this->db->affected_rows() >= 0) {

			if (@$user['isEditUser']) {

				$this->db->set(
					array(
						'passwordUser' => sha1(md5($user['passwordUser'])),
						'resetPasword' => 0
					)
				)->where("idUser", $user['idUser'])->update("tb_user");
			}

			return true;
		} else {
			return false;
		}
	}


	/*BUSCAR USUARIO POR EL EMAIL*/
	public function findUserByEmail ($mail)
	{

		$user = null;
		//
		$this->db->select("tb_user.*,tb_profile.nameProfile,tb_profiles.name,tb_typetenant.typeTenantName,tb_status.statusTenantName,tb_client_departament.departament,tb_client_departament.floor,tb_type_attendant.nameTypeAttendant")->from("tb_user");
		$this->db->join('tb_profile', 'tb_profile.idProfile = tb_user.idProfileKf', 'left');
		$this->db->join('tb_profiles', 'tb_profiles.idProfiles = tb_user.idSysProfileFk', 'left');
        $this->db->join('tb_typetenant', 'tb_typetenant.idTypeTenant = tb_user.idTypeTenantKf', 'left');
		$this->db->join('tb_status', 'tb_status.idStatusTenant = tb_user.idStatusKf', 'left');
		$this->db->join('tb_client_departament', 'tb_client_departament.idClientDepartament = tb_user.idDepartmentKf', 'left');
		$this->db->join('tb_category_departament', 'tb_category_departament.idCategoryDepartament = tb_client_departament.idCategoryDepartamentFk', 'left');
		$this->db->join('tb_type_attendant', 'tb_type_attendant.idTyepeAttendant = tb_user.idTyepeAttendantKf', 'left');
		//$this->db->join('tb_clients', 'tb_clients.idClient = tb_user.idAddresKf', 'left');
		//$this->db->join('tb_company', 'tb_company.idCompany = tb_user.idCompanyKf', 'left');
		$this->db->where("tb_user.emailUser", $mail);
		$this->db->or_where("tb_user.dni", $mail);

		$query = $this->db->order_by("tb_user.idUser", "ASC")->get();

		if ($query->num_rows() > 0) {
			$user = $query->result_array();
			foreach ($user as $key => $item) {
				$idProfile = null;
				$idProfile = $item['idProfileKf'];
				$idProfiles = $item['idSysProfileFk'];
				$query2    = null;
				if (isset($idProfiles) && !is_null($idProfiles) && $idProfiles > 0) {
					// Buscamos los perfiles de sistema //
					$this->db->select("*")->from("tb_profiles");
					$quuery = $this->db->where("tb_profiles.idProfiles =", $idProfiles)->get();
					if ($quuery->num_rows() === 1) {
						$rs = $quuery->row_array();
	
						$this->db->select("*")->from("tb_profiles_modules");
						$this->db->join('tb_modules', 'tb_modules.idModule = tb_profiles_modules.idModuleFk', 'inner');
						$quuery = $this->db->where("tb_profiles_modules.idProfilesFk =", $idProfiles)->get();
	
						$rs2 = $quuery->result_array();
	
						$user[$key]['modules'] = $rs2;
					}
					if (($idProfile == 2) && ($item['idTypeTenantKf'] == null || $item['idTypeTenantKf'] == '') || ($idProfile == 4) && (($item['idTypeTenantKf'] == null || $item['idTypeTenantKf'] == '') || ($item['idTypeTenantKf'] != null && $item['idTypeTenantKf'] != ''))) {
						$query2 = $this->db->select("*")->from("tb_clients");
						$query2 = $this->db->where('idClient', $item['idCompanyKf']);
						$query2 = $this->db->get();
						if ($query2->num_rows() > 0) {
							$user[$key]['company'] = $query2->result_array();
						}
					}
					if ($idProfile == 5 || ($idProfile == 4 && $item['idTypeTenantKf'] == 2) || ($idProfile == 6 && $item['idTyepeAttendantKf'] != 1 && $item['idTypeTenantKf'] == 2)) {
						$query2 = $this->db->select("*")->from("tb_clients");
						$query2 = $this->db->where('idClient', $item['idAddresKf']);
						$query2 = $this->db->get();
						if ($query2->num_rows() > 0) {
							$user[$key]['building'] = $query2->result_array();
						}
					}
					if ($idProfile == 6 && $item['idTyepeAttendantKf'] != null && ($item['idTypeTenantKf'] == null || $item['idTypeTenantKf'] != null)) {
						$query2    = null;
						$query2 = $this->db->select("*")->from("tb_clients");
						$query2 = $this->db->where('idClient', $item['idAddresKf']);
						$query2 = $this->db->get();
						if ($query2->num_rows() > 0) {
							$user[$key]['building'] = $query2->result_array();
						}
					}
					if (($idProfile == 4 || $idProfile == 6) && $item['idTypeTenantKf'] == 1) {
						$query2 = $this->db->select("*")->from("tb_clients");
						$query2 = $this->db->where('idClient', $item['idAddresKf']);
						$query2 = $this->db->get();
						if ($query2->num_rows() > 0) {
							$user[$key]['building'] = $query2->result_array();
						}
					}
					if ($idProfile == 3 || ($idProfile == 4 && $item['idTypeTenantKf'] == 1) || ($idProfile == 6 && $item['idTypeTenantKf'] == 1)) {
						$query2 = $this->db->select("*")->from("tb_client_departament");
						$query2 = $this->db->join('tb_category_departament', 'tb_category_departament.idCategoryDepartament = tb_client_departament.idCategoryDepartamentFk', 'left');
						$query2 = $this->db->join('tb_clients', ' tb_clients.idClient= tb_client_departament.idClientFk', 'left');
						$query2 = $this->db->where('idUserKf', $item['idUser']);
						$query2 = $this->db->get();
						if ($query2->num_rows() > 0) {
							$user[$key]['deptos'] = $query2->result_array();
						}
					}
					if ($idProfile == 5 || ($idProfile == 4 && $item['idTypeTenantKf'] == 2) || ($idProfile == 6 && $item['idTyepeAttendantKf'] != 1 && $item['idTypeTenantKf'] == 2)) {
						$query2 = $this->db->select("*")->from("tb_client_departament");
						$query2 = $this->db->join('tb_category_departament', 'tb_category_departament.idCategoryDepartament = tb_client_departament.idCategoryDepartamentFk', 'left');
						$query2 = $this->db->join('tb_clients', ' tb_clients.idClient= tb_client_departament.idClientFk', 'left');
						$query2 = $this->db->where('idClientDepartament', $item['idDepartmentKf']);
						$query2 = $this->db->get();
						if ($query2->num_rows() > 0) {
							$user[$key]['deptos'] = $query2->result_array();
						}
					}
				}
			}
			return $user;
		} else {
			return null;
		}
	}


	/* LISTADO DE FILTROS */
	public function getFilterForm ()
	{

		$query            = null;
		$profile          = null;
		$profiles         = null;
		$status           = null;
		$type             = null;
		$typeattendant    = null;
		$companykeychains = null;

		/* LISTADO DE TIPOS DE PERFIL */
		$query = $this->db->select("*")->from("tb_profile")->get();
		if ($query->num_rows() > 0) {
			$profile = $query->result_array();
		}
		/* LISTADO DE TIPOS DE PERFILES & ROLES */
		$query = $this->db->select("*")->from("tb_profiles")->get();
		if ($query->num_rows() > 0) {
			$profiles = $query->result_array();
		}
		/* LISTADO DE TIPOS DE STATUS */
		$query = $this->db->select("*")->from("tb_status")->get();
		if ($query->num_rows() > 0) {
			$status = $query->result_array();
		}
		/* LISTADO DE TIPOS DE HABITANTES */
		$query = $this->db->select("*")->from("tb_typetenant")->get();
		if ($query->num_rows() > 0) {
			$typeTenant = $query->result_array();
		}
		/* LISTADO DE TIPOS DE ENCARGADOS */
		$query = $this->db->select("*")->from("tb_type_attendant")->get();
		if ($query->num_rows() > 0) {
			$typeattendant = $query->result_array();
		}


		$filter = array(
			'status'  		=> $status,
			'profile' 		=> $profile,
			'profiles' 		=> $profiles,
			'typeTenant'	=> $typeTenant,
			'typeattendant' => $typeattendant
		);

		return $filter;
	}


	/* LISTADO DE PARAMETROS */
	public function getCompany ()
	{

		$query   = null;
		$company = null;

		$query = $this->db->select("*")->from("tb_company")->get();
		if ($query->num_rows() > 0) {
			$company = $query->result_array();
		}

		return $company;
	}


	/* LISTADO DE PARAMETROS */
	public function getParam ()
	{

		$query = null;
		$param = null;

		$query = $this->db->select("*")->from("tb_sys_param")->get();
		if ($query->num_rows() > 0) {
			$param = $query->result_array();
		}


		return $param;
	}


	/* LISTADO DE PARAMETROS */
	public function getdeliveryType ()
	{

		$query = null;
		$param = null;

		$query = $this->db->select("*")->from("tb_type_delivery")->get();
		if ($query->num_rows() > 0) {
			$param = $query->result_array();
		}

		return $param;
	}


	/* LISTADO DE FILTROS */
	public function mailsmtp ()
	{

		$param = null;


		$query = $this->db->select("*")->from("tb_sys_param")->get();
		if ($query->num_rows() > 0) {
			$param = $query->result_array();
		}


		return $param;
	}


	/* EDITAR DATOS DE UN EMPRESA */
	public function updateMailSmtp ($mail)
	{

		$this->db->set(
			array(
				'value' => $mail['email']
			)
		)->where("idParam", 1)->update("tb_sys_param");

		$this->db->set(
			array(
				'value' => $mail['pass']
			)
		)->where("idParam", 2)->update("tb_sys_param");

		if ($this->db->affected_rows() === 1) {
			return true;
		} else {
			return false;
		}
	}

	/* UPDATE PARAM */
	public function updateParam ($param)
	{

		$this->db->set(
			array(
				'value' => $param['value']
			)
		)->where("idParam", $param['idParam'])->update("tb_sys_param");


		if ($this->db->affected_rows() === 1) {
			return true;
		} else {
			return false;
		}
	}


	public function validate ($tokenMail)
	{

		$this->db->set(
			array(
				'isConfirmatedMail' => 1,
				'idStatusKf'        => 1
			)
		)->where("tokenMail", $tokenMail)->update("tb_user");


		if ($this->db->affected_rows() === 1) {
			return true;
		} else {
			return false;
		}
	}


	public function changueStatus ($id, $idStatus)
	{
		$this->db->set(
			array(
				'idStatusKf' => $idStatus
			)
		)->where("idUser", $id)->update("tb_user");


		/*if ($idStatus == 1) {

			$query = $this->db->select("*")->from("tb_user")
				->where("idUser =", $id)->get();
			if ($query->num_rows() > 0) {
				$to = $query->row_array();

				/*MAIL
				$title = "Nuevo Acceso a Coferba";
				$body  = "Ya Puede Disfrutar de Nuestros servicios!";
				$this->mail_model->sendMail($title, $to['emailUser'], $body);
			}


		}*/
		if ($this->db->affected_rows() === 1) {
			return true;
		} else {
			return false;
		}
	}


	/* ESTATUS DE UN USUARIO */
	public function changueStatusUser ($id, $idStatus)
	{
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


	// GET DE LISTADO ENCARGADOS POR ID DIRECCION //
	public function attendantByIdDirecction ($id)
	{
		$quuery = null;
		$rs     = null;


		$this->db->select("*")->from("tb_user");
		$this->db->join('tb_profile', 'tb_profile.idProfile = tb_user.idProfileKf', 'left');
		$this->db->join('tb_profiles', 'tb_profiles.idProfiles = tb_user.idSysProfileFk', 'left');
		$this->db->join('tb_status', 'tb_status.idStatusTenant = tb_user.idStatusKf', 'left');
		$this->db->join('tb_typetenant', 'tb_typetenant.idTypeTenant = tb_user.idTypeTenantKf', 'left');
		$this->db->join('tb_client_departament', 'tb_client_departament.idClientDepartament = tb_user.idDepartmentKf', 'left');
		$this->db->join('tb_category_departament', 'tb_category_departament.idCategoryDepartament = tb_client_departament.idCategoryDepartamentFk', 'left');	
		$this->db->join('tb_type_attendant', 'tb_type_attendant.idTyepeAttendant = tb_user.idTyepeAttendantKf', 'left');
		$this->db->where("tb_user.idAddresKf =", $id);
		$this->db->where("tb_user.idProfileKf =", 6);


		$quuery = $this->db->order_by("tb_user.fullNameUser", "asc")->get();


		if ($quuery->num_rows() > 0) {
			return $quuery->result_array();
		}
		return null;
	}

	// GET DE LISTADO ENCARGADOS POR ID DIRECCION QUE NO SON PROPIETARIO O INQUILINO. //
	public function attendantsOnlyByIdDirection ($id)
	{
		$quuery = null;
		$rs     = null;
		$extrawhere  = null;
		$atten = [];
		
		$this->db->select("*")->from("tb_user");
		$this->db->join('tb_profile', 'tb_profile.idProfile = tb_user.idProfileKf', 'left');
		$this->db->join('tb_profiles', 'tb_profiles.idProfiles = tb_user.idSysProfileFk', 'left');
		$this->db->join('tb_status', 'tb_status.idStatusTenant = tb_user.idStatusKf', 'left');
		$this->db->join('tb_type_attendant', 'tb_type_attendant.idTyepeAttendant = tb_user.idTyepeAttendantKf', 'left');
		$this->db->where("tb_user.idAddresKf =", $id);
		$this->db->where("tb_user.idTypeTenantKf =", null);
		$this->db->where("tb_user.idProfileKf =", 6);


		$quuery = $this->db->order_by("tb_user.fullNameUser", "asc")->get();


		if ($quuery->num_rows() > 0) {
			$rs = $quuery->result_array();
			foreach ($rs as $key => $item) {
				$idUser = $item['idUser'];
				$query2    = null;
				$query2 = $this->db->select("*")->from("tb_keychain");
				$query2 = $this->db->where('idUserKf', $idUser);
				$query2 = $this->db->get();
				if ($query2->num_rows() === 0) {
					array_push($atten, $item);
				}
			}
			return $atten;
		}
		return null;
	}

	// VERIFICAMOS SI EL EDIFICIO TIENE UN ENCARGADO TITULAR ASOCIADO //
	public function chekBuildingTitularAttendant ($id)
	{
		$quuery = null;
		$rs     = null;


		$this->db->select("*")->from("tb_user");
		$this->db->where("tb_user.idTyepeAttendantKf =", 2);
		$this->db->where("tb_user.idProfileKf =", 6);
        $quuery = $this->db->where("tb_user.idAddresKf =", $id)->get();

		if ($quuery->num_rows() > 0) {
			return true;
		}
		return null;

	}

    /* LISTADO DE FILTROS */
    public function getListOfUsers ()
    {
        $where       	= null;
        $users  		= null;
        $owners     	= null;
        $tenants     	= null;
        $owners_tenants = null;
        $attendants  	= null;
        $companyUser 	= null;
        $sysUser     	= null;
        /* LISTADO DE USUARIOS */
        $this->db->select("*")->from("tb_user");
        $this->db->join('tb_profile', 'tb_profile.idProfile = tb_user.idProfileKf', 'left');
        $this->db->join('tb_profiles', 'tb_profiles.idProfiles = tb_user.idSysProfileFk', 'left');
        $this->db->join('tb_status', 'tb_status.idStatusTenant = tb_user.idStatusKf', 'left');
		$this->db->join('tb_client_departament', 'tb_client_departament.idClientDepartament = tb_user.idDepartmentKf', 'left');
		$this->db->join('tb_category_departament', 'tb_category_departament.idCategoryDepartament = tb_client_departament.idCategoryDepartamentFk', 'left');
		$this->db->join('tb_typetenant', 'tb_typetenant.idTypeTenant = tb_user.idTypeTenantKf', 'left');
        $this->db->join('tb_type_attendant', 'tb_type_attendant.idTyepeAttendant = tb_user.idTyepeAttendantKf', 'left');
        $query = $this->db->order_by("tb_user.dateCreated", "DESC")->get();
		if ($query->num_rows() > 0) {
			$users = $query->result_array();
			foreach ($users as $key => $item) {
				$idProfile = null;
				$idProfile = $item['idProfileKf'];
				$query2    = null;
				if (($idProfile == 2) && ($item['idTypeTenantKf'] == null || $item['idTypeTenantKf'] == '') || ($idProfile == 4) && (($item['idTypeTenantKf'] == null || $item['idTypeTenantKf'] == '') || ($item['idTypeTenantKf'] != null && $item['idTypeTenantKf'] != ''))) {
					$query2 = $this->db->select("*")->from("tb_clients");
					$query2 = $this->db->where('idClient', $item['idCompanyKf']);
					$query2 = $this->db->get();
					if ($query2->num_rows() > 0) {
						$users[$key]['company'] = $query2->result_array();
					}
				}
				if ($idProfile == 5 || ($idProfile == 4 && $item['idTypeTenantKf'] == 2) || ($idProfile == 6 && $item['idTyepeAttendantKf'] != 1 && $item['idTypeTenantKf'] == 2)) {
					$query2 = $this->db->select("*")->from("tb_clients");
					$query2 = $this->db->where('idClient', $item['idAddresKf']);
					$query2 = $this->db->get();
					if ($query2->num_rows() > 0) {
						$users[$key]['building'] = $query2->result_array();
					}
				}
				if ($idProfile == 6 && $item['idTyepeAttendantKf'] != null && ($item['idTypeTenantKf'] == null || $item['idTypeTenantKf'] != null)) {
					$query2    = null;
					$query2 = $this->db->select("*")->from("tb_clients");
					$query2 = $this->db->where('idClient', $item['idAddresKf']);
					$query2 = $this->db->get();
					if ($query2->num_rows() > 0) {
						$users[$key]['building'] = $query2->result_array();
					}
				}
				if (($idProfile == 4 || $idProfile == 6) && $item['idTypeTenantKf'] == 1) {
					$query2 = $this->db->select("*")->from("tb_clients");
					$query2 = $this->db->where('idClient', $item['idAddresKf']);
					$query2 = $this->db->get();
					if ($query2->num_rows() > 0) {
						$users[$key]['building'] = $query2->result_array();
					}
				}
				if ($idProfile == 3 || ($idProfile == 4 && $item['idTypeTenantKf'] == 1) || ($idProfile == 6 && $item['idTypeTenantKf'] == 1)) {
					$query2 = $this->db->select("*")->from("tb_client_departament");
					$query2 = $this->db->join('tb_category_departament', 'tb_category_departament.idCategoryDepartament = tb_client_departament.idCategoryDepartamentFk', 'left');
					$query2 = $this->db->join('tb_clients', ' tb_clients.idClient= tb_client_departament.idClientFk', 'left');
					$query2 = $this->db->where('idUserKf', $item['idUser']);
					$query2 = $this->db->get();
					if ($query2->num_rows() > 0) {
						$users[$key]['deptos'] = $query2->result_array();
					}
				}
				if ($idProfile == 5 || ($idProfile == 4 && $item['idTypeTenantKf'] == 2) || ($idProfile == 6 && $item['idTyepeAttendantKf'] != 1 && $item['idTypeTenantKf'] == 2)) {
					$query2 = $this->db->select("*")->from("tb_client_departament");
					$query2 = $this->db->join('tb_category_departament', 'tb_category_departament.idCategoryDepartament = tb_client_departament.idCategoryDepartamentFk', 'left');
					$query2 = $this->db->join('tb_clients', ' tb_clients.idClient= tb_client_departament.idClientFk', 'left');
					$query2 = $this->db->where('idClientDepartament', $item['idDepartmentKf']);
					$query2 = $this->db->get();
					if ($query2->num_rows() > 0) {
						$users[$key]['deptos'] = $query2->result_array();
					}
				}
			}
		}
        /* LISTADO DE HABITANTES */
        $this->db->select("*")->from("tb_user");
        $this->db->join('tb_profile', 'tb_profile.idProfile = tb_user.idProfileKf', 'left');
        $this->db->join('tb_profiles', 'tb_profiles.idProfiles = tb_user.idSysProfileFk', 'left');
        $this->db->join('tb_status', 'tb_status.idStatusTenant = tb_user.idStatusKf', 'left');
        $this->db->join('tb_clients', 'tb_clients.idClient = tb_user.idAddresKf', 'left');
        $this->db->join('tb_type_attendant', 'tb_type_attendant.idTyepeAttendant = tb_user.idTyepeAttendantKf', 'left');
        $this->db->join('tb_typetenant', 'tb_typetenant.idTypeTenant = tb_user.idTypeTenantKf', 'left');
        $where="idProfileKf = 3 OR idProfileKf = 5 OR (idProfileKf = 6 AND idTypeTenantKf IN (1,2))";
        $this->db->where($where);
        $query = $this->db->order_by("tb_user.idUser", "DESC")->get();
		if ($query->num_rows() > 0) {
			$owners_tenants = $query->result_array();
			foreach ($owners_tenants as $key => $item) {
				$idProfile = null;
				$idProfile = $item['idProfileKf'];
				$query2    = null;
				if ($idProfile == 2 || $idProfile == 4) {
					$query2 = $this->db->select("*")->from("tb_clients");
					$query2 = $this->db->where('idClient', $item['idCompanyKf']);
					$query2 = $this->db->get();
					if ($query2->num_rows() > 0) {
						$owners_tenants[$key]['company'] = $query2->result_array();
					}
				}
				if ($idProfile == 5 || ($idProfile == 6 && $item['idTypeTenantKf'] == 2)) {
					$query2 = $this->db->select("*")->from("tb_clients");
					$query2 = $this->db->where('idClient', $item['idAddresKf']);
					$query2 = $this->db->get();
					if ($query2->num_rows() > 0) {
						$owners_tenants[$key]['building'] = $query2->result_array();
					}
				}
			}
		}
        /* LISTADO DE PROPIETARIOS */
        $this->db->select("*")->from("tb_user");
        $this->db->join('tb_profile', 'tb_profile.idProfile = tb_user.idProfileKf', 'left');
        $this->db->join('tb_profiles', 'tb_profiles.idProfiles = tb_user.idSysProfileFk', 'left');
        $this->db->join('tb_status', 'tb_status.idStatusTenant = tb_user.idStatusKf', 'left');
        $this->db->join('tb_type_attendant', 'tb_type_attendant.idTyepeAttendant = tb_user.idTyepeAttendantKf', 'left');
        $where = "idProfileKf = 3 OR (idProfileKf = 6 AND idTypeTenantKf IN (1))";
        $this->db->where($where);
        $query = $this->db->order_by("tb_user.idUser", "DESC")->get();
		if ($query->num_rows() > 0) {
			$owners = $query->result_array();
			foreach ($owners as $key => $item) {
				$idProfile = null;
				$idProfile = $item['idProfileKf'];
				$query2    = null;
				if ($idProfile == 2 || $idProfile == 4) {
					$query2 = $this->db->select("*")->from("tb_clients");
					$query2 = $this->db->where('idClient', $item['idCompanyKf']);
					$query2 = $this->db->get();
					if ($query2->num_rows() > 0) {
						$owners[$key]['company'] = $query2->result_array();
					}
				}
				if ($idProfile == 5 || ($idProfile == 6 && $item['idTypeTenantKf'] == 2)) {
					$query2 = $this->db->select("*")->from("tb_clients");
					$query2 = $this->db->where('idClient', $item['idAddresKf']);
					$query2 = $this->db->get();
					if ($query2->num_rows() > 0) {
						$owners[$key]['building'] = $query2->result_array();
					}
				}
			}
		}
        /* LISTADO DE INQUILINOS */
        $this->db->select("*")->from("tb_user");
        $this->db->join('tb_profile', 'tb_profile.idProfile = tb_user.idProfileKf', 'left');
        $this->db->join('tb_profiles', 'tb_profiles.idProfiles = tb_user.idSysProfileFk', 'left');
        $this->db->join('tb_status', 'tb_status.idStatusTenant = tb_user.idStatusKf', 'left');
        $this->db->join('tb_clients', 'tb_clients.idClient = tb_user.idAddresKf', 'left');
        $this->db->join('tb_type_attendant', 'tb_type_attendant.idTyepeAttendant = tb_user.idTyepeAttendantKf', 'left');
        $where = "idProfileKf = 5 OR (idProfileKf = 6 AND idTypeTenantKf IN (2))";
        $this->db->where($where);
        $query = $this->db->order_by("tb_user.idUser", "DESC")->get();
		if ($query->num_rows() > 0) {
			$tenants = $query->result_array();
			foreach ($tenants as $key => $item) {
				$idProfile = null;
				$idProfile = $item['idProfileKf'];
				$query2    = null;
				if ($idProfile == 2 || $idProfile == 4) {
					$query2 = $this->db->select("*")->from("tb_clients");
					$query2 = $this->db->where('idClient', $item['idCompanyKf']);
					$query2 = $this->db->get();
					if ($query2->num_rows() > 0) {
						$tenants[$key]['company'] = $query2->result_array();
					}
				}
				if ($idProfile == 5 || ($idProfile == 6 && $item['idTypeTenantKf'] == 2)) {
					$query2 = $this->db->select("*")->from("tb_clients");
					$query2 = $this->db->where('idClient', $item['idAddresKf']);
					$query2 = $this->db->get();
					if ($query2->num_rows() > 0) {
						$tenants[$key]['building'] = $query2->result_array();
					}
				}
			}
		}
        /* LISTADO DE ENCARGADOS */
        $this->db->select("*")->from("tb_user");
        $this->db->join('tb_profile', 'tb_profile.idProfile = tb_user.idProfileKf', 'left');
        $this->db->join('tb_profiles', 'tb_profiles.idProfiles = tb_user.idSysProfileFk', 'left');
        $this->db->join('tb_status', 'tb_status.idStatusTenant = tb_user.idStatusKf', 'left');
        $this->db->join('tb_clients', 'tb_clients.idClient = tb_user.idAddresKf', 'left');
        $this->db->join('tb_type_attendant', 'tb_type_attendant.idTyepeAttendant = tb_user.idTyepeAttendantKf', 'left');
        $this->db->join('tb_typetenant', 'tb_typetenant.idTypeTenant = tb_user.idTypeTenantKf', 'left');
        $where = "idProfileKf = 6";
        $this->db->where($where);
        $query = $this->db->order_by("tb_user.idUser", "ASC")->get();
		if ($query->num_rows() > 0) {
			$attendants = $query->result_array();
			foreach ($attendants as $key => $item) {
				$idProfile = null;
				$idProfile = $item['idProfileKf'];
				$query2    = null;
				if ($idProfile == 2 || $idProfile == 4) {
					$query2 = $this->db->select("*")->from("tb_clients");
					$query2 = $this->db->where('idClient', $item['idCompanyKf']);
					$query2 = $this->db->get();
					if ($query2->num_rows() > 0) {
						$attendants[$key]['company'] = $query2->result_array();
					}
				}
				if ($idProfile == 5 || ($idProfile == 6 && $item['idTypeTenantKf'] == 2)) {
					$query2 = $this->db->select("*")->from("tb_clients");
					$query2 = $this->db->where('idClient', $item['idAddresKf']);
					$query2 = $this->db->get();
					if ($query2->num_rows() > 0) {
						$attendants[$key]['building'] = $query2->result_array();
					}
				}
			}
		}
        /* LISTADO DE ADMIN DE CONSORCIOS Y USUARIOS DE EMPRESAS */
        $this->db->select("*")->from("tb_user");
        $this->db->join('tb_profile', 'tb_profile.idProfile = tb_user.idProfileKf', 'left');
        $this->db->join('tb_profiles', 'tb_profiles.idProfiles = tb_user.idSysProfileFk', 'left');
        $this->db->join('tb_status', 'tb_status.idStatusTenant = tb_user.idStatusKf', 'left');
        $this->db->join('tb_clients', 'tb_clients.idClient = tb_user.idCompanyKf', 'left');
        $this->db->where("idProfileKf", 2);
        $this->db->or_where("idProfileKf", 4);
        $query = $this->db->order_by("tb_user.idUser", "DESC")->get();
		if ($query->num_rows() > 0) {
			$companyUser = $query->result_array();
			foreach ($companyUser as $key => $item) {
				$idProfile = null;
				$idProfile = $item['idProfileKf'];
				$query2    = null;
				if ($idProfile == 2 || $idProfile == 4) {
					$query2 = $this->db->select("*")->from("tb_clients");
					$query2 = $this->db->where('idClient', $item['idCompanyKf']);
					$query2 = $this->db->get();
					if ($query2->num_rows() > 0) {
						$companyUser[$key]['company'] = $query2->result_array();
					}
				}
				if ($idProfile == 5 || ($idProfile == 6 && $item['idTypeTenantKf'] == 2)) {
					$query2 = $this->db->select("*")->from("tb_clients");
					$query2 = $this->db->where('idClient', $item['idAddresKf']);
					$query2 = $this->db->get();
					if ($query2->num_rows() > 0) {
						$companyUser[$key]['building'] = $query2->result_array();
					}
				}
			}
		}
        /* LISTADO DE USUARIOS DE SISTEMA */
        $this->db->select("*")->from("tb_user");
        $this->db->join('tb_profile', 'tb_profile.idProfile = tb_user.idProfileKf', 'left');
        $this->db->join('tb_profiles', 'tb_profiles.idProfiles = tb_user.idSysProfileFk', 'left');
        $this->db->join('tb_status', 'tb_status.idStatusTenant = tb_user.idStatusKf', 'left');
        $where = "idProfileKf = 1";
        $this->db->where($where);
        $query = $this->db->order_by("tb_user.idUser", "ASC")->get();
		if ($query->num_rows() > 0) {
			$sysUser = $query->result_array();
			foreach ($sysUser as $key => $item) {
				$idProfile = null;
				$idProfile = $item['idProfileKf'];
				$query2    = null;
				if ($idProfile == 2 || $idProfile == 4) {
					$query2 = $this->db->select("*")->from("tb_clients");
					$query2 = $this->db->where('idClient', $item['idCompanyKf']);
					$query2 = $this->db->get();
					if ($query2->num_rows() > 0) {
						$sysUser[$key]['company'] = $query2->result_array();
					}
				}
				if ($idProfile == 5 || ($idProfile == 6 && $item['idTypeTenantKf'] == 2)) {
					$query2 = $this->db->select("*")->from("tb_clients");
					$query2 = $this->db->where('idClient', $item['idAddresKf']);
					$query2 = $this->db->get();
					if ($query2->num_rows() > 0) {
						$sysUser[$key]['building'] = $query2->result_array();
					}
				}
			}
		}

        $lists = array(
            'clientUser'      	=> $users,
            'users'  	  		=> $users,
            'owners'      		=> $owners,
            'tenants'     		=> $tenants,
            'owners_tenants'	=> $owners_tenants,
            'attendants'  		=> $attendants,
            'companyUser' 		=> $companyUser,
            'sysUser'     		=> $sysUser

        );

        return $lists;
    }
	public function getUsersByCompanyClientId ($id){
        $users 	= null;
        /* LISTADO DE USUARIOS */
        $this->db->select("*")->from("tb_user");
        $this->db->join('tb_profile', 'tb_profile.idProfile = tb_user.idProfileKf', 'left');
        $this->db->join('tb_profiles', 'tb_profiles.idProfiles = tb_user.idSysProfileFk', 'left');
        $this->db->join('tb_status', 'tb_status.idStatusTenant = tb_user.idStatusKf', 'left');
		$this->db->join('tb_client_departament', 'tb_client_departament.idClientDepartament = tb_user.idDepartmentKf', 'left');
		$this->db->join('tb_category_departament', 'tb_category_departament.idCategoryDepartament = tb_client_departament.idCategoryDepartamentFk', 'left');
		$this->db->join('tb_typetenant', 'tb_typetenant.idTypeTenant = tb_user.idTypeTenantKf', 'left');
        $this->db->join('tb_type_attendant', 'tb_type_attendant.idTyepeAttendant = tb_user.idTyepeAttendantKf', 'left');
		$this->db->where("tb_user.idCompanyKf =", $id);
        $query = $this->db->order_by("tb_user.dateCreated", "DESC")->get();
		if ($query->num_rows() > 0) {
			$users = $query->result_array();
		}else{
			$users 	= null;
		}

        return $users;
	}

}

?>
