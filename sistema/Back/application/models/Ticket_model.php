<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Ticket_model extends CI_Model
{
    
    public function __construct()
    {
        parent::__construct();
         /*MAIL*/ $this->load->model('mail_model');
		 /*TICKET*/ $this->load->model('Mercadolibre_model');
    }


	/*Dar de alta*/
	public function add2($ticket)
	{
		$idOtherDeliveryAddress = null;
		$idThirdPersonDelivery  = null;
		$ticketAdded = null;
		if (count(@$ticket['otherDeliveryAddress']) > 0){
			$this->db->insert('tb_ticket_other_delivery_address' , array(
				"address" 		=> @$ticket['otherDeliveryAddress']['address'] ,
				"number" 		=> @$ticket['otherDeliveryAddress']['number'] ,
				"floor" 		=> @$ticket['otherDeliveryAddress']['floor'] ,
				"idProvinceFk" 	=> @$ticket['otherDeliveryAddress']['idProvinceFk'] ,
				"idLocationFk" 	=> @$ticket['otherDeliveryAddress']['idLocationFk'] ,
			));
			$idOtherDeliveryAddress = $this->db->insert_id();
		}

		if (count(@$ticket['thirdPersonDelivery']) > 0){
			$this->db->insert('tb_ticket_third_person_delivery' , array(
				"fullName" 		=> @$ticket['thirdPersonDelivery']['fullName'] ,
				"dni" 			=> @$ticket['thirdPersonDelivery']['dni'] ,
				"movilPhone" 	=> @$ticket['thirdPersonDelivery']['movilPhone'] ,
				"address" 		=> @$ticket['thirdPersonDelivery']['address'] ,
				"number" 		=> @$ticket['thirdPersonDelivery']['number'] ,
				"floor" 		=> @$ticket['thirdPersonDelivery']['floor'] ,
				"idProvinceFk" 	=> @$ticket['thirdPersonDelivery']['idProvinceFk'] ,
				"idLocationFk" 	=> @$ticket['thirdPersonDelivery']['idLocationFk'] ,
			));
			$idThirdPersonDelivery = $this->db->insert_id();
		}

		/* BUSCVAMOS UN CODIGO PARA ASIGNARLO */
		$codTicket  = "";
		$getCodeSys = null;
		$query      = $this->db->select(" * ")->from("tb_sys_code")
			->where("idCode = " , 1)->get();


		if ($query->num_rows() > 0){
			$getCodeSys = $query->row_array();
			$codTicket  = $getCodeSys['description']." -".
				$this->formatCode($getCodeSys['code'] + 1);
		}

		$this->db->set(
			array(
				'code' => $getCodeSys['code'] + 1
			)
		)->where("idCode = " , 1)->update("tb_sys_code");


		/* CREAMOS UN TICKET */
		$now = new DateTime(null , new DateTimeZone('America/Argentina/Buenos_Aires'));
		$this->db->insert('tb_tickets_2' , array(
			'codTicket' 				=> trim($codTicket) ,
			'created_at'				=> $now,
			'idOtherDeliveryAddressKf' 	=> $idOtherDeliveryAddress ,
			'idThirdPersonDeliveryKf' 	=> $idThirdPersonDelivery ,
			'idTypeTicketKf' 			=> @$ticket['idTypeTicketKf'] ,
			'idTypeRequestFor' 			=> @$ticket['idTypeRequestFor'] ,
			'idUserMadeBy' 				=> @$ticket['idUserMadeBy'] ,
			'idUserRequestBy' 			=> @$ticket['idUserRequestBy'] ,
			'idBuildingKf' 				=> @$ticket['idBuildingKf'] ,
			'idDepartmentKf' 			=> @$ticket['idDepartmentKf'] ,
			'idTypeDeliveryKf' 			=> @$ticket['idTypeDeliveryKf'] ,
			'idWhoPickUp' 				=> @$ticket['idWhoPickUp'] ,
			'idUserDelivery' 			=> @$ticket['idUserDelivery'] ,
			'idDeliveryTo' 				=> @$ticket['idDeliveryTo'] ,
			'idDeliveryAddress' 		=> @$ticket['idDeliveryAddress'] ,
			'idTypePaymentKf' 			=> @$ticket['idTypePaymentKf'] ,
			'sendNotify' 				=> @$ticket['sendNotify'] ,
			'description' 				=> @$ticket['description'] ,
			'costService' 				=> @$ticket['costService'] ,
			'costKeys' 					=> @$ticket['costKeys'] ,
			'costDelivery' 				=> @$ticket['costDelivery'] ,
			'total' 					=> @$ticket['total'] ,
			'urlToken' 					=> @$ticket['urlToken'] ,
			'autoApproved' 				=> @$ticket['autoApproved'] ,
			'isNew' 					=> @$ticket['isNew'] ,
			'idStatusTicketKf' 			=> @$ticket['status'] ,

		));
		if ($this->db->affected_rows()===1){
			$idTicketKf = $this->db->insert_id();
			$now        = new DateTime(null , new DateTimeZone('America/Argentina/Buenos_Aires'));
			if (count(@$ticket['history']) > 0){
				//print_r($ticket['history']);
				foreach ($ticket['history'] as $key) {
					$this->db->insert('tb_ticket_changes_history' , array(
						"idUserKf" 			=> @$key['idUserKf'] ,
						"idTicketKf" 		=> $idTicketKf ,
						"created_at" 		=> $now->format('Y-m-d H:i:s') ,
						"descripcion" 		=> @$key['descripcion'] ,
						"idCambiosTicketKf" => @$key['idCambiosTicketKf']
					));
				}
			}
			if (count(@$ticket['keys']) > 0)/* CREAMOS la llave */{

				foreach ($ticket['keys'] as $key) {
					$this->db->insert('tb_ticket_keychain' , array(
						"idTicketKf" 		=> $idTicketKf ,
						//"idKeychainKf" 	=> @$ticket['keys']['idKeychainKf'] ,
						"idProductKf" 		=> @$key['idProductKf'] ,
						"idCategoryKf" 		=> @$key['idCategoryKf'] ,
						"idUserKf" 			=> @$key['idUserKf'] ,
						"idDepartmenKf" 	=> @$key['idDepartmenKf'] ,
						"isKeyTenantOnly" 	=> @$key['isKeyTenantOnly'] ,
						"idClientKf" 		=> @$key['idClientKf'] ,
						"idClientAdminKf" 	=> @$key['idClientAdminKf'] ,
						"created_at" 		=> $now->format('Y-m-d H:i:s')
					));
					if ($this->db->affected_rows()===1){
						$idKeychain = $this->db->insert_id();
						if (count($key['doors'] ) > 0)/* asociamos las puertas relacionadas a la llave */{
							foreach ($key['doors'] as $door) {
								$this->db->insert('tb_ticket_keychain_doors' , array(
									"idTicketKeychainKf" 		=> $idKeychain ,
									"idContractKf" 		 		=> @$door['idContrato'] ,
									"idAccessControlDoorKf"   	=> @$door['idAccessControlDoor'] ,
									"idServiceKf" 	 		 	=> @$door['idService'] ,
									"doorSelected" 	 		 	=> @$door['selected'] ,
								));
							}
			
						}
					}
				}

			}


				//			if (count(@$ticket['list_id_clients']) > 0) //para admnistradores
				//			{
				//				foreach ($ticket['list_id_clients'] as $valor) {
				//					$this->db->insert('tb_clients_tickets' , array(
				//						'idTicketKf' => $idTicketKf ,
				//						'idClientKf' => $valor
				//					));
				//				}
				//			}


				//			$to = "";

				//			$idUser = 0;
				//			if (@$ticket['idUserEnterpriceKf'] > 0){
				//				$idUser = @$ticket['idUserEnterpriceKf'];
				//			}

				//			if (@$ticket['idUserEnterpriceKf'] > 0){
				//				$idUser = @$ticket['idUserEnterpriceKf'];
				//			}

				//			if (@$ticket['idUserTenantKf'] > 0){
				//				$to['emailUser'] = @$ticket['emailUser'];
				//			}

				//			if ($idUser > 0){
				//				$query = $this->db->select(" * ")->from("tb_user")->where("idUser = " , @$idUser)->get();
				//				if ($query->num_rows() > 0){
				//					$to = $query->row_array();
				//				}
				//			}

				//			//echo $to['emailUser'];

				//			if ($to!=""){

				//				/*MAIL*/
				//				$title = "Nuevo Ticket Coferba(" . $codTicket . ")";
				//				$body  = "Tienes un Ticket que fue Recibido por Coferba, pronto Procesaran tu Solicitud!";
				//				$this->mail_model->sendMail($title , $to['emailUser'] , $body);

				//			}

				$lastTicketAddQuery = null;
				$lastTicketAddQuery = $this->ticketById($idTicketKf);
			return $lastTicketAddQuery;
		} else {
			return null;
		}
	}

	/*Dar de baja*/
	public function add3($ticket)
	{
		$idOtherDeliveryAddress = null;
		$idThirdPersonDelivery  = null;


		if ($ticket['autoApproved']==1){
			$status = 3; //aprobado
		} else {
			$status = 2; //pendiente de autotizacion
		}

		/* BUSCVAMOS UN CODIGO PARA ASIGNARLO */
		$codTicket  = "";
		$getCodeSys = null;
		$query      = $this->db->select(" * ")->from("tb_sys_code")
			->where("idCode = " , 1)->get();


		if ($query->num_rows() > 0){
			$getCodeSys = $query->row_array();
			$codTicket  = $getCodeSys['description']." -".
				$this->formatCode($getCodeSys['code'] + 1);
		}

		$this->db->set(
			array(
				'code' => $getCodeSys['code'] + 1
			)
		)->where("idCode = " , 1)->update("tb_sys_code");

		/* CREAMOS UN TICKET */
		$now = new DateTime(null , new DateTimeZone('America/Argentina/Buenos_Aires'));
		$this->db->insert('tb_tickets_2' , array(
			'codTicket' 				=> trim($codTicket) ,
			'created_at'				=> $now,
			'idOtherDeliveryAddressKf' 	=> $idOtherDeliveryAddress ,
			'idThirdPersonDeliveryKf'  	=> $idThirdPersonDelivery ,
			'idTypeTicketKf' 		   	=> @$ticket['idTypeTicketKf'] ,
			'idTypeRequestFor' 		   	=> @$ticket['idTypeRequestFor'] ,
			'idUserMadeBy' 			   	=> @$ticket['idUserMadeBy'] ,
			'idUserRequestBy' 			=> @$ticket['idUserRequestBy'] ,
			'idBuildingKf' 				=> @$ticket['idBuildingKf'] ,
			'idDepartmentKf'	 		=> @$ticket['idDepartmentKf'] ,
			'idTypeDeliveryKf' 			=> @$ticket['idTypeDeliveryKf'] ,
			'idWhoPickUp' 				=> @$ticket['idWhoPickUp'] ,
			'idUserDelivery' 			=> @$ticket['idUserDelivery'] ,
			'idDeliveryTo' 				=> @$ticket['idDeliveryTo'] ,
			'idDeliveryAddress' 		=> @$ticket['idDeliveryAddress'] ,
			'idTypePaymentKf' 			=> @$ticket['idTypePaymentKf'] ,
			'sendNotify' 				=> @$ticket['sendNotify'] ,
			'description' 				=> @$ticket['description'] ,
			'costService' 				=> @$ticket['costService'] ,
			'costKeys' 					=> @$ticket['costKeys'] ,
			'costDelivery' 				=> @$ticket['costDelivery'] ,
			'total' 					=> @$ticket['total'] ,
			'urlToken' 					=> @$ticket['urlToken'] ,
			'autoApproved' 				=> @$ticket['autoApproved'] ,
			'isNew' 					=> @$ticket['isNew'] ,
			'idStatusTicketKf' 			=> $status
		));
		if ($this->db->affected_rows()===1){
			$idTicketKf = $this->db->insert_id();
			$now        = new DateTime(null , new DateTimeZone('America/Argentina/Buenos_Aires'));
			if (count(@$ticket['history']) > 0){
				foreach ($ticket['history'] as $key) {
					$this->db->insert('tb_ticket_changes_history' , array(
						"idUserKf" 			=> @$ticket['history']['idUserKf'] ,
						"idTicketKf" 		=> $idTicketKf ,
						"created_at" 		=> $now->format('Y-m-d H:i:s') ,
						"descripcion" 		=> @$ticket['history']['descripcion'] ,
						"idCambiosTicketKf" => @$ticket['history']['idCambiosTicketKf'] ,
					));
				}
			}
			if (count(@$ticket['keys']) > 0)/* CREAMOS la llave */{
				$now = new DateTime(null , new DateTimeZone('America/Argentina/Buenos_Aires'));
				foreach ($ticket['keys'] as $key) {
					$this->db->insert('tb_ticket_keychain' , array(
						"idTicketKf" => $idTicketKf ,
						//"idKeychainKf" => @$ticket['keys']['idKeychainKf'] ,
						"idProductKf" 		=> @$key['idProductKf'] ,
						"idCategoryKf" 		=> @$key['idCategoryKf'] ,
						"idUserKf" 			=> @$key['idUserKf'] ,
						"idDepartmenKf" 	=> @$key['idDepartmenKf'] ,
						"isKeyTenantOnly"	=> @$key['isKeyTenantOnly'] ,
						"idClientKf" 		=> @$key['idClientKf'] ,
						"idClientAdminKf" 	=> @$key['idClientAdminKf'] ,
						"created_at" 		=> $now->format('Y-m-d H:i:s')
					));
				}

			}


			//			if (count(@$ticket['list_id_clients']) > 0) //para admnistradores
			//			{
			//				foreach ($ticket['list_id_clients'] as $valor) {
			//					$this->db->insert('tb_clients_tickets' , array(
			//						'idTicketKf' => $idTicketKf ,
			//						'idClientKf' => $valor
			//					));
			//				}
			//			}


			//			$to = "";

			//			$idUser = 0;
			//			if (@$ticket['idUserEnterpriceKf'] > 0){
			//				$idUser = @$ticket['idUserEnterpriceKf'];
			//			}

			//			if (@$ticket['idUserEnterpriceKf'] > 0){
			//				$idUser = @$ticket['idUserEnterpriceKf'];
			//			}

			//			if (@$ticket['idUserTenantKf'] > 0){
			//				$to['emailUser'] = @$ticket['emailUser'];
			//			}

			//			if ($idUser > 0){
			//				$query = $this->db->select(" * ")->from("tb_user")->where("idUser = " , @$idUser)->get();
			//				if ($query->num_rows() > 0){
			//					$to = $query->row_array();
			//				}
			//			}

			//			//echo $to['emailUser'];

			//			if ($to!=""){

			//				/*MAIL*/
			//				$title = "Nuevo Ticket Coferba(" . $codTicket . ")";
			//				$body  = "Tienes un Ticket que fue Recibido por Coferba, pronto Procesaran tu Solicitud!";
			//				$this->mail_model->sendMail($title , $to['emailUser'] , $body);

			//			}

			return true;
		} else {
			return null;
		}
	}


	private function formatCode($value)
	{
		$CODE = sprintf(" % 08d" , $value);
		return $CODE;
	}


	public function find($id)
	{


		$this->db->select(" *,DATEDIFF(ifnull(tb_tickets_2  . dateRecibedAdmin , now()) , tb_tickets_2  . dateCreated) as dayDif ,tb_tickets_2  . dateCreated as dateCratedTicket")->from("tb_tickets_2 ");
		$this->db->join('tb_user tenant' , 'tenant.idUser = tb_tickets_2 .idUserTenantKf' , 'left');
		$this->db->join('tb_typeticket' , 'tb_typeticket.idTypeTicket = tb_tickets_2 .idTypeTicketKf' , 'left');
		$this->db->join('tb_statusticket' , 'tb_statusticket.idTypeTicketKf = tb_tickets_2 .idStatusTicketKf' , 'left');
		$this->db->join('tb_type_delivery' , 'tb_type_delivery.idTypeDelivery = tb_tickets_2 .idTypeDeliveryKf' , 'left');
		$this->db->join('tb_reason_disabled_item' , 'tb_reason_disabled_item.idReasonDisabledItem = tb_tickets_2 .idReasonDisabledItemKf' , 'left');
		$this->db->join('tb_user a' , 'a.idUser = tb_tickets_2 .idUserCompany' , 'left');
		$this->db->join('tb_user b' , 'b.idUser = tb_tickets_2 .idOWnerKf' , 'left');
		$this->db->join('tb_user c' , 'c.idUser = tb_tickets_2 .idUserEnterpriceKf' , 'left');
		$this->db->join('tb_user d' , 'd.idUser = tb_tickets_2 .idUserAdminKf' , 'left');
		$this->db->join('tb_type_services' , 'tb_type_services.idTypeServices = tb_tickets_2 .idTypeServicesKf' , 'left');
		$this->db->join('tb_clients' , 'tb_clients.idClient = tb_tickets_2 .idAdressKf' , 'left');
		$this->db->join('tb_department' , 'tb_department.idUserTenantKf = tb_user.idUser' , 'left');
		$query = $this->db->where("tb_tickets_2  . idTicket = " , @$id)->get();


		if ($query->num_rows()==1){

			$user = $query->row_array();
			return $user;
		} else {
			return null;
		}
	}


	public function approve($ticket)
	{
		$id  = $ticket['idTicket'];
		$this->db->set(
			array(
				'idStatusTicketKf' => 3
			)
		)->where("idTicket" , $id)->update("tb_tickets_2");


		if ($this->db->affected_rows()===1){
			$now = new DateTime(null , new DateTimeZone('America/Argentina/Buenos_Aires'));
			if (count(@$ticket['history']) > 0){
				//print_r($ticket['history']);
				foreach ($ticket['history'] as $key) {
					$this->db->insert('tb_ticket_changes_history' , array(
						"idUserKf" 			=> @$key['idUserKf'] ,
						"idTicketKf" 		=> $id ,
						"created_at" 		=> $now->format('Y-m-d H:i:s') ,
						"descripcion" 		=> @$key['descripcion'] ,
						"idCambiosTicketKf" => @$key['idCambiosTicketKf']
					));
				}
			}
			return true;
		} else {
			return false;
		}
	}


	public function requestCancel($ticket)
	{
		$id = $ticket['idTicket'];
		$this->db->set(
			array(
				'isCancelRequested' => 1
			)
		)->where("idTicket" , $id)->update("tb_tickets_2");

		if ($this->db->affected_rows()===1){
			$now = new DateTime(null , new DateTimeZone('America/Argentina/Buenos_Aires'));
			if (count(@$ticket['history']) > 0){
				//print_r($ticket['history']);
				foreach ($ticket['history'] as $key) {
					$this->db->insert('tb_ticket_changes_history' , array(
						"idUserKf" 			=> @$key['idUserKf'] ,
						"idTicketKf" 		=> $id ,
						"created_at" 		=> $now->format('Y-m-d H:i:s') ,
						"descripcion" 		=> @$key['descripcion'] ,
						"idCambiosTicketKf" => @$key['idCambiosTicketKf']
					));
				}
			}
			return true;
		} else {
			return false;
		}
	}

	public function cancel($ticket)
	{
		$this->db->set(
			array(
				'idStatusTicketKfOld' => $ticket['idStatusTicketKf'] ,
				'idStatusTicketKf' => 6
			)
		)->where("idTicket" , $ticket['idTicket'])->update("tb_tickets_2");


		if ($this->db->affected_rows()===1){
			$now = new DateTime(null , new DateTimeZone('America/Argentina/Buenos_Aires'));
			if (count(@$ticket['history']) > 0){
				//print_r($ticket['history']);
				foreach ($ticket['history'] as $key) {
					$this->db->insert('tb_ticket_changes_history' , array(
						"idUserKf" 			=> @$key['idUserKf'] ,
						"idTicketKf" 		=> $id ,
						"created_at" 		=> $now->format('Y-m-d H:i:s') ,
						"descripcion" 		=> @$key['descripcion'] ,
						"idCambiosTicketKf" => @$key['idCambiosTicketKf']
					));
				}
			}
			return true;
		} else {
			return false;
		}
	}

	public function rejectedCancelTicket($ticket)
	{
		$id = $ticket['idTicket'];
		$this->db->set(
			array(
				'isCancelRequested' => null
			)
		)->where("idTicket" , $id)->update("tb_tickets_2");

		if ($this->db->affected_rows()===1){
			$now = new DateTime(null , new DateTimeZone('America/Argentina/Buenos_Aires'));
			if (count(@$ticket['history']) > 0){
				//print_r($ticket['history']);
				foreach ($ticket['history'] as $key) {
					$this->db->insert('tb_ticket_changes_history' , array(
						"idUserKf" 			=> @$key['idUserKf'] ,
						"idTicketKf" 		=> $id ,
						"created_at" 		=> $now->format('Y-m-d H:i:s') ,
						"descripcion" 		=> @$key['descripcion'] ,
						"idCambiosTicketKf" => @$key['idCambiosTicketKf']
					));
				}
			}
			return true;
		} else {
			return false;
		}
	}

	public function updateTmpTicket($ticket)
	{

		$this->db->set(
			array(
				'idUserHasChangeTicket' 		=> $ticket['idUserHasChangeTicket'] ,
				'idTypeDeliveryKf' 				=> $ticket['idTypeDeliveryKf'] ,
				'idWhoPickUp' 					=> $ticket['idWhoPickUp'] ,
				'idUserAttendantKfDelivery' 	=> $ticket['idUserAttendantKfDelivery'] ,
				'thirdPersonNames' 				=> $ticket['thirdPersonNames'] ,
				'thirdPersonPhone' 				=> $ticket['thirdPersonPhone'] ,
				'thirdPersonId' 				=> $ticket['thirdPersonId'] ,
				'totalService' 					=> $ticket['totalService'] ,
				'totalGestion' 					=> $ticket['totalGestion'] ,
				'totalLlave' 					=> $ticket['totalLlave'] ,
				'totalEnvio' 					=> $ticket['totalEnvio'] ,
				'isChangeDeliverylRequested' 	=> null
			)
		)->where("idTicket" , $ticket['idTicket'])->update("tb_tickets_2");

		if ($this->db->affected_rows()===1){
			return true;
		} else {
			return false;
		}
	}

	public function updatethirdPersonDelivery($ticket)
	{

		if (count(@$ticket['thirdPersonDelivery']) > 0){
			$this->db->set([
				"fullName" 		=> @$ticket['thirdPersonDelivery']['fullName'] ,
				"dni" 			=> @$ticket['thirdPersonDelivery']['dni'] ,
				"movilPhone" 	=> @$ticket['thirdPersonDelivery']['movilPhone'] ,
				"address" 		=> @$ticket['thirdPersonDelivery']['address'] ,
				"number" 		=> @$ticket['thirdPersonDelivery']['number'] ,
				"floor" 		=> @$ticket['thirdPersonDelivery']['floor'] ,
				"idProvinceFk" 	=> @$ticket['thirdPersonDelivery']['idProvinceFk'] ,
				"idLocationFk" 	=> @$ticket['thirdPersonDelivery']['idLocationFk']
			])->where("id" , @$ticket['thirdPersonDelivery']['id'])->update("tb_ticket_third_person_delivery");
		}


		if ($this->db->affected_rows()===1){
			if (count(@$ticket['history']) > 0){
				$now = new DateTime(null , new DateTimeZone('America/Argentina/Buenos_Aires'));
				$this->db->insert('tb_ticket_changes_history' , array(
					"idUserKf" 			=> @$ticket['history']['idUserKf'] ,
					"idTicketKf" 		=> $ticket['history']['id'] ,
					"created_at" 		=> $now->format('Y-m-d H:i:s') ,
					"descripcion" 		=> @$ticket['history']['descripcion'] ,
					"idCambiosTicketKf" => @$ticket['history']['idCambiosTicketKf'] ,
				));
			}
			return true;
		} else {
			return false;
		}
	}

	public function updateOtherDeliveryAddress($ticket)
	{
		if (count(@$ticket['otherDeliveryAddress']) > 0){
			$this->db->set([
				"address" 		=> @$ticket['otherDeliveryAddress']['address'] ,
				"number" 		=> @$ticket['otherDeliveryAddress']['number'] ,
				"floor" 		=> @$ticket['otherDeliveryAddress']['floor'] ,
				"idProvinceFk" 	=> @$ticket['otherDeliveryAddress']['idProvinceFk'] ,
				"idLocationFk" 	=> @$ticket['otherDeliveryAddress']['idLocationFk'] ,
			])->where("id" , @$ticket['otherDeliveryAddress']['id'])->update("tb_ticket_other_delivery_address");
		}

		if ($this->db->affected_rows()===1){
			if (count(@$ticket['history']) > 0){
				$now = new DateTime(null , new DateTimeZone('America/Argentina/Buenos_Aires'));
				$this->db->insert('tb_ticket_changes_history' , array(
					"idUserKf" 			=> @$ticket['history']['idUserKf'] ,
					"idTicketKf" 		=> $ticket['history']['id'] ,
					"created_at" 		=> $now->format('Y-m-d H:i:s') ,
					"descripcion" 		=> @$ticket['history']['descripcion'] ,
					"idCambiosTicketKf" => @$ticket['history']['idCambiosTicketKf'] ,
				));
			}
			return true;
		} else {
			return false;
		}
	}

	public function update($ticket)
	{
		if (@$ticket['idDeliveryTo']==1){
			$this->db->delete('tb_ticket_other_delivery_address' , ['id' => $ticket['otherDeliveryAddress']['id']]);
		}
		if (@$ticket['idDeliveryTo']==2){
			$this->db->set(
				array(
					"address" 		=> @$ticket['otherDeliveryAddress']['address'] ,
					"number" 		=> @$ticket['otherDeliveryAddress']['number'] ,
					"floor" 		=> @$ticket['otherDeliveryAddress']['floor'] ,
					"idProvinceFk" 	=> @$ticket['otherDeliveryAddress']['idProvinceFk'] ,
					"idLocationFk" 	=> @$ticket['otherDeliveryAddress']['idLocationFk']
				))->where("id" , $ticket['otherDeliveryAddress']['id'])->update("tb_ticket_other_delivery_address");
		}

		if (@$ticket['idWhoPickUp']!=3){
			$this->db->delete('tb_ticket_third_person_delivery' , ['id' => $ticket['thirdPersonDelivery']['id']]);
		}
		if (@$ticket['idWhoPickUp']==3){
			$this->db->set(
				array(
					"fullName" 		=> @$ticket['thirdPersonDelivery']['fullName'] ,
					"dni" 			=> @$ticket['thirdPersonDelivery']['dni'] ,
					"movilPhone" 	=> @$ticket['thirdPersonDelivery']['movilPhone'] ,
					"address" 		=> @$ticket['thirdPersonDelivery']['address'] ,
					"number" 		=> @$ticket['thirdPersonDelivery']['number'] ,
					"floor" 		=> @$ticket['thirdPersonDelivery']['floor'] ,
					"idProvinceFk" 	=> @$ticket['thirdPersonDelivery']['idProvinceFk'] ,
					"idLocationFk" 	=> @$ticket['thirdPersonDelivery']['idLocationFk']
				))->where("id" , $ticket['thirdPersonDelivery']['id'])->update("tb_ticket_third_person_delivery");
		}

		$this->db->set(
			array(
				'idTypeTicketKf' 	=> @$ticket['idTypeTicketKf'] ,
				'idTypeRequestFor' 	=> @$ticket['idTypeRequestFor'] ,
				'idUserMadeBy' 		=> @$ticket['idUserMadeBy'] ,
				'idUserRequestBy' 	=> @$ticket['idUserRequestBy'] ,
				'idBuildingKf' 		=> @$ticket['idBuildingKf'] ,
				'idDepartmentKf' 	=> @$ticket['idDepartmentKf'] ,
				'idTypeDeliveryKf' 	=> @$ticket['idTypeDeliveryKf'] ,
				'idWhoPickUp' 		=> @$ticket['idWhoPickUp'] ,
				'idUserDelivery' 	=> @$ticket['idUserDelivery'] ,
				'idDeliveryTo' 		=> @$ticket['idDeliveryTo'] ,
				'idDeliveryAddress'	=> @$ticket['idDeliveryAddress'] ,
				'idTypePaymentKf' 	=> @$ticket['idTypePaymentKf'] ,
				'sendNotify' 		=> @$ticket['sendNotify'] ,
				'description' 		=> @$ticket['description'] ,
				'costService' 		=> @$ticket['costService'] ,
				'costKeys' 			=> @$ticket['costKeys'] ,
				'costDelivery' 		=> @$ticket['costDelivery'] ,
				'total' 			=> @$ticket['total'] ,
				'urlToken' 			=> @$ticket['urlToken'] ,
				'autoApproved' 		=> @$ticket['autoApproved'] ,
				'isNew' 			=> @$ticket['isNew']
			)
		)->where("idTicket" , $ticket['idTicket'])->update("tb_tickets_2");

		if ($this->db->affected_rows()===1){
			return true;
		} else {
			return false;
		}
	}

	public function changueStatus($id, $idStatus)
	{
		//$id       = $ticket['id'];
		//$idStatus = $ticket['idStatus'];
		$this->db->set(
			array(
				'idStatusTicketKf' => $idStatus
			)
		)->where("idTicket" , $id)->update("tb_tickets_2");
		if ($this->db->affected_rows()===1){
			return true;
		} else {
			return false;
		}
	}

	public function addTicketTimeline($ticket)
	{
		if (count(@$ticket['history']) > 0){
			$now = new DateTime(null , new DateTimeZone('America/Argentina/Buenos_Aires'));
			$this->db->insert('tb_ticket_changes_history' , array(
				"idUserKf" 			=> @$ticket['history']['idUserKf'] ,
				"idTicketKf" 		=> $ticket['history']['idTicketKf'],
				"created_at" 		=> $now->format('Y-m-d H:i:s') ,
				"descripcion" 		=> @$ticket['history']['descripcion'] ,
				"idCambiosTicketKf" => @$ticket['history']['idCambiosTicketKf'] ,
			));
			if ($this->db->affected_rows()===1){
				return true;
			} else {
				return false;

			}
		}else{
			return false;
		}
	}
	public function add($ticket)
	{

		/* BUSCVAMOS UN CODIGO PARA ASIGNARLO */
		$codTicket  = "";
		$getCodeSys = null;
		$query      = $this->db->select(" * ")->from("tb_sys_code")
			->where("idCode = " , 1)->get();


		if ($query->num_rows() > 0){
			$getCodeSys = $query->row_array();
			$codTicket  = $getCodeSys['description'] . " - " .
				$this->formatCode($getCodeSys['code'] + 1);
		}

		$this->db->set(
			array(
				'code' => $getCodeSys['code'] + 1
			)
		)->where("idCode = " , 1)->update("tb_sys_code");

		/* CREAMOS UN TICKET */
		$this->db->insert('tb_tickets' , array(
				'codTicket' => $codTicket ,
				'idTypeTicketKf' => @$ticket['idTypeTicketKf'] ,
				'idProfileKf' => @$ticket['idProfileKf'] ,
				'totalService' => $ticket['totalService'] ,
				'totalGestion' => $ticket['totalGestion'] ,
				'totalLlave' => $ticket['totalLlave'] ,
				'totalEnvio' => $ticket['totalEnvio'] ,

				/***** ALTA / BAJA *****/
				'idUserTenantKf' => @$ticket['idUserTenantKf'] ,
				'idOWnerKf' => @$ticket['idOWnerKf'] ,
				'idUserCompany' => @$ticket['idUserCompany'] ,
				'idUserEnterpriceKf' => @$ticket['idUserEnterpriceKf'] ,
				'idUserAttendantKf' => @$ticket['idUserAttendantKf'] ,
				'idUserAdminKf' => @$ticket['idUserAdminKf'] ,
				'numberItemes' => @$ticket['numberItemes'] ,
				'descriptionComment' => @$ticket['description'] ,
				'idDepartmentKf ' => @$ticket['idDepartmentKf'] ,
				'idOtherKf' => @$ticket['idOtherKf'] ,  //ID DEL ENCARGADO DE TIPO OTRO
				'idTypeOfOptionKf' => @$ticket['idTypeOfOptionKf'] , /*ID DE OPCION DE SOLICITUD CUANDO ES REALIZADO PARA ENCARGADO/OTRO O CONSORCIO*/

				/***** ALTA *****/
				'idTypeOfKeysKf' => @json_encode($ticket['idTypeOfKeysKf']) ,
				/***** ALTA *****/

				/***** BAJA *****/
				'itemToDisabled' => @json_encode($ticket['itemToDisabled']) ,
				'idOpcionLowTicketKf' => @$ticket['idOpcionLowTicketKf'] ,
				'idReasonDisabledItemKf' => @$ticket['idReasonDisabledItemKf'] ,
				/***** BAJA *****/

				/***** SERVICIO *****/
				'descriptionOrder' => @$ticket['descriptionOrder'] ,
				'idTypeServicesKf' => @$ticket['idTypeServicesKf'] ,
				/***** SERVICIO *****/

				/***** ALTA / BAJA / SERVICIOS*****/
				'idCompanyKf' => @$ticket['idCompanyKf'] ,
				'idAdressKf' => @$ticket['idAdressKf'] ,
				/***** ALTA / BAJA / SERVICIOS*****/

				/***** CONSULTAS *****/
				'idTypeOuther' => @$ticket['idTypeOuther'] ,
				'mailContactConsult' => @$ticket['mailContactConsult'] ,
				'addressConsul' => @$ticket['addressConsul'] ,
				/***** CONSULTAS *****/

				/***** DELIVERY *****/
				'idTypeDeliveryKf' => @$ticket['idTypeDeliveryKf'] ,
				'idWhoPickUp' => @$ticket['idWhoPickUp'] ,
				'thirdPersonNames' => @$ticket['thirdPersonNames'] ,
				'thirdPersonPhone' => @$ticket['thirdPersonPhone'] ,
				'thirdPersonId' => @$ticket['thirdPersonId'] ,
				'idUserAttendantKfDelivery' => @$ticket['idUserAttKfDelive'] ,
				/***** DELIVERY *****/

				'sendUserNotification' => @$ticket['sendNotify'] ,
				'isNew' => @$ticket['isNew'] ,
				'urlToken' => @$ticket['urlToken'] ,
				'idStatusTicketKf' => 2
			)
		);


		if ($this->db->affected_rows()===1){
			$idTicketKf = $this->db->insert_id();


			if (count(@$ticket['list_id_clients']) > 0) //para admnistradores
			{
				foreach ($ticket['list_id_clients'] as $valor) {

					$this->db->insert('tb_clients_tickets' , array(
						'idTicketKf' => $idTicketKf ,
						'idClientKf' => $valor
					));
				}
			}


			$to = "";

			$idUser = 0;
			if (@$ticket['idUserEnterpriceKf'] > 0){
				$idUser = @$ticket['idUserEnterpriceKf'];
			}

			if (@$ticket['idUserEnterpriceKf'] > 0){
				$idUser = @$ticket['idUserEnterpriceKf'];
			}

			if (@$ticket['idUserTenantKf'] > 0){
				$to['emailUser'] = @$ticket['emailUser'];
			}

			if ($idUser > 0){
				$query = $this->db->select(" * ")->from("tb_user")->where("idUser = " , @$idUser)->get();
				if ($query->num_rows() > 0){
					$to = $query->row_array();
				}
			}

			//echo $to['emailUser'];

			if ($to!=""){

				/*MAIL*/
				$title = "Nuevo Ticket Coferba(" . $codTicket . ")";
				$body  = "Tienes un Ticket que fue Recibido por Coferba, pronto Procesaran tu Solicitud!";
				$this->mail_model->sendMail($title , $to['emailUser'] , $body);

			}


			return true;
		} else {
			return null;
		}
	}

	// GET DE LISTADO BUSQUEDA DE TICKETS //
	public function get($data)
	{
		/* El buscador debe buscar por
		    idTypeTicketKf
			idClientAdminFk
			idBuildingKf
			idStatusTicketKf
			idTypeDeliveryKf
			codTicket
			topfilter
			idClientCompaniFk
		*/
		$quuery = null;
		$rs     = null;


		$idUser = 0;

		if (!is_null($searchFilter['idUser'])){
			$idUser = $searchFilter['idUser'];
		} else {
			$idUser = $id;
		}

		// SI RECIBIMOS EL ID DE EL USUARIO //
		if ($idUser > 0){

			$this->db->select(" *,
            CASE  
                  WHEN idUserCompany > 0 THEN a . fullNameUser
                  WHEN idOWnerKf > 0 THEN b . fullNameUser
                  WHEN idUserEnterpriceKf > 0 THEN c . fullNameUser
                  WHEN idUserAdminKf > 0 THEN d . fullNameUser
                  WHEN idUserTenantKf > 0 THEN g . fullNameUser
                  ELSE '' 
                END as fullNameUser,
                 a . fullNameUser as FullNameUserCompany,
                 b . fullNameUser as FullNameUserOwner,
                 c . fullNameUser as FullNameUserEnterprice,
                 d . fullNameUser as FullNameUserAdmin,
                 g . fullNameUser as FullUserTenant,
                CASE  
                  WHEN idUserCompany > 0 THEN a . phoneNumberUser
                  WHEN idOWnerKf > 0 THEN b . phoneNumberUser
                  WHEN idUserEnterpriceKf > 0 THEN c . phoneNumberUser
                  WHEN idUserAdminKf > 0 THEN d . phoneNumberUser
                  WHEN idUserTenantKf > 0 THEN g . phoneNumberUser
                  ELSE '' 
                END as phoneNumberUser,
                CASE  
                  WHEN idUserCompany > 0 THEN aProf . nameProfile
                  WHEN idOWnerKf > 0 THEN bProf . nameProfile
                  WHEN idUserEnterpriceKf > 0 THEN cProf . nameProfile
                  WHEN idUserAdminKf > 0 THEN dProf . nameProfile
                  WHEN idUserTenantKf > 0 THEN gProf . nameProfile
                  ELSE '' 
                END as nameProfile,
                 aProf . nameProfile as profileUserCompany,
                 bProf . nameProfile as profileUserOwner,
                 cProf . nameProfile as profileUserEnterprice,
                 dProf . nameProfile as profileUserAdmin,
                 gProf . nameProfile as profileTenant,
                CASE  
                  WHEN idOtherKf > 0 THEN f . fullNameUser
                  WHEN idOtherKf < 1 THEN e . fullNameUser
                  ELSE ''
                END as nameAttendant,
                CASE  
                  WHEN idOtherKf > 0 THEN f . phoneNumberUser
                  WHEN idOtherKf < 1 THEN e . phoneNumberUser
                  ELSE '' 
                END as phoneAttendant,
                CASE  
                  WHEN idOtherKf > 0 THEN auxTypeA . nameTypeAttendant
                  WHEN idOtherKf < 1 THEN auxTypeB . nameTypeAttendant
                  ELSE '' 
                END as nameTypeAttendant,
                CASE  
                  WHEN idUserAttendantKfDelivery > 0 THEN h . fullNameUser
                  WHEN idUserAttendantKfDelivery < 1 THEN 'Sin delivery'
                  ELSE '' 
                END as nameAttendantDelivery,
                CASE  
                  WHEN tmp_idUserAttendantKfDelivery > 0 THEN k . fullNameUser
                  WHEN tmp_idUserAttendantKfDelivery < 1 THEN 'empty'
                  ELSE '' 
                END as tmp_nameAttendantDelivery,
                CASE  
                  WHEN idUserCancelTicket > 0 THEN m . fullNameUser
                  WHEN idUserCancelTicket < 1 THEN 'empty'
                  ELSE '' 
                END as nameUserCancelTicket,
                CASE  
                  WHEN tmp_idUserRequestChOrCancel > 0 THEN l . fullNameUser
                  WHEN tmp_idUserRequestChOrCancel < 1 THEN 'empty'
                  ELSE '' 
                END as tmp_nameUserRequestChOrCancel,
                CASE  
                  WHEN idTypeDeliveryKf > 0 THEN tmp_a . typeDelivery
                  WHEN idTypeDeliveryKf < 1 THEN 'empty'
                  ELSE '' 
                END as typeDelivery,
                CASE  
                  WHEN tmp_idTypeDeliveryKf > 0 THEN tmp_b . typeDelivery
                  WHEN tmp_idTypeDeliveryKf < 1 THEN 'empty'
                  ELSE '' 
                END as tmp_nameTypeDelivery,
                CASE  
                WHEN idUserApprovedTicket > 0 THEN j . fullNameUser
                WHEN idUserApprovedTicket < 1 THEN 'No aprobado'
                ELSE '' 
              END as nameUserApprovedTicket,
            DATEDIFF(ifnull(tb_tickets . dateRecibedAdmin , now()) , tb_tickets . dateCreated) as dayDif ,tb_tickets . dateCreated as dateCratedTicket")->from("tb_tickets");
			$this->db->join('tb_user a' , 'a.idUser = tb_tickets.idUserCompany' , 'left');
			$this->db->join('tb_statusticket' , 'tb_statusticket.idStatus = tb_tickets.idStatusTicketKf' , 'left');
			$this->db->join('tb_typeticket' , 'tb_typeticket.idTypeTicket = tb_tickets.idTypeTicketKf' , 'left');
			$this->db->join('tb_client_departament' , 'tb_client_departament.idClientDepartament = tb_tickets.idDepartmentKf' , 'left');
			$this->db->join('tb_user b' , 'b.idUser = tb_tickets.idOWnerKf' , 'left');
			$this->db->join('tb_type_delivery tmp_a' , 'tmp_a.idTypeDelivery = tb_tickets.idTypeDeliveryKf' , 'left');
			$this->db->join('tb_reason_disabled_item' , 'tb_reason_disabled_item.idReasonDisabledItem = tb_tickets.idReasonDisabledItemKf' , 'left');
			$this->db->join('tb_tmp_delivery_data deliverTmp' , 'deliverTmp.tmp_idTicketKf = tb_tickets.idTicket AND deliverTmp.tmp_isChOrCancelApplied is null AND (deliverTmp.tmp_isChApproved is null OR AND deliverTmp.tmp_isCancelApproved is null)' , 'left');
			$this->db->join('tb_type_delivery tmp_b' , 'tmp_b.idTypeDelivery = deliverTmp.tmp_idTypeDeliveryKf' , 'left');
			$this->db->join('tb_type_outher typeo' , 'typeo.idTypeOuther = tb_tickets.idTypeOuther' , 'left');
			$this->db->join('tb_clients' , 'tb_clients.idClient = tb_tickets.idAdressKf' , 'left');
			$this->db->join('tb_user c' , 'c.idUser = tb_tickets.idUserEnterpriceKf' , 'left');
			$this->db->join('tb_user d' , 'd.idUser = tb_tickets.idUserAdminKf' , 'left');
			$this->db->join('tb_user g' , 'g.idUser = tb_tickets.idUserTenantKf' , 'left');
			$this->db->join('tb_user f' , 'f.idUser = tb_tickets.idOtherKf' , 'left');
			$this->db->join('tb_user e' , 'e.idUser = tb_tickets.idUserAttendantKf' , 'left');
			$this->db->join('tb_user j' , 'j.idUser = tb_tickets.idUserApprovedTicket' , 'left');
			$this->db->join('tb_user k' , 'k.idUser = deliverTmp.tmp_idUserAttendantKfDelivery' , 'left');
			$this->db->join('tb_user l' , 'l.idUser = deliverTmp.tmp_idUserRequestChOrCancel' , 'left');
			$this->db->join('tb_user m' , 'm.idUser = tb_tickets.idUserCancelTicket' , 'left');
			$this->db->join('tb_opcion_low low' , 'low.idOpcionLowTicket = tb_tickets.idOpcionLowTicketKf' , 'left');
			$this->db->join('tb_type_attendant auxTypeA' , 'auxTypeA.idTyepeAttendant = f.idTyepeAttendantKf' , 'left');
			$this->db->join('tb_type_attendant auxTypeB' , 'auxTypeB.idTyepeAttendant = e.idTyepeAttendantKf' , 'left');
			$this->db->join('tb_user h' , 'h.idUser = tb_tickets.idUserAttendantKfDelivery' , 'left');
			//$this->db->join('tb_company', 'tb_company.idCompany = tb_tickets.idCompanyKf', 'left');
			//$this->db->join('tb_profile prof', 'prof.idProfile = tb_tickets.idProfileKf', 'left');
			$this->db->join('tb_profile aProf' , 'aProf.idProfile = a.idProfileKf' , 'left');
			$this->db->join('tb_profile bProf' , 'bProf.idProfile = b.idProfileKf' , 'left');
			$this->db->join('tb_profile cProf' , 'cProf.idProfile = c.idProfileKf' , 'left');
			$this->db->join('tb_profile dProf' , 'dProf.idProfile = d.idProfileKf' , 'left');
			$this->db->join('tb_profile eProf' , 'eProf.idProfile = d.idProfileKf' , 'left');
			$this->db->join('tb_profile fProf' , 'fProf.idProfile = d.idProfileKf' , 'left');
			$this->db->join('tb_profile gProf' , 'gProf.idProfile = g.idProfileKf' , 'left');


			if (@$searchFilter['idAdress'] > 0){
				$this->db->where("tb_clients . idClient = " , @$searchFilter['idAdress']);
			}

			if (@$searchFilter['idTypeTicketKf'] > 0){
				$this->db->where("tb_tickets . idTypeTicketKf = " , @$searchFilter['idTypeTicketKf']);
			}


			/* Busqueda por filtro */
			if (!is_null($searchFilter['searchFilter']) && strlen($searchFilter['searchFilter']) > 0){
				//$this->db->like('tb_user.fullNameUser', $searchFilter['searchFilter']);
				$this->db->where("
                            (a . fullNameUser like  '%" . $searchFilter['searchFilter'] . "%'
							or a . phoneNumberUser like  '%" . $searchFilter['searchFilter'] . "%'
							or a . emailUser like  '%" . $searchFilter['searchFilter'] . "%'
							or tb_tickets . codTicket like  '%" . $searchFilter['searchFilter'] . "%'
							or tb_clients . address like  '%" . $searchFilter['searchFilter'] . "%'
                    ) ");


			}

			if (@$searchFilter['idStatusTicketKf'] > 0){
				$this->db->where("tb_tickets . idStatusTicketKf = " , @$searchFilter['idStatusTicketKf']);
			} else {

				if (@$searchFilter['idStatusTicketKf']==null){
					$this->db->where("tb_tickets . idStatusTicketKf!=" , -1);

				} else {
					$this->db->where("tb_tickets . idStatusTicketKf = " , -1);

				}
			}


			if (@$searchFilter['idProfileKf']==3) // propietario
			{
				$this->db->where("tb_client_departament . idUserKf = " . @$searchFilter['idOWnerKf'] . " OR (b . idUser = " . $idUser . " or tb_tickets . idOWnerKf = " . @$searchFilter['idOWnerKf'] . ")" , null , false);
				$quuery = $this->db->order_by("tb_tickets . idTicket" , "DESC")->get();
			} else if (@$searchFilter['idProfileKf']==5) // Inquilino
			{
				$this->db->where("(g . idUser = " . $idUser . " or tb_tickets . idUserTenantKf = " . @$searchFilter['idUserTenantKf'] . ")" , null , false);
				$quuery = $this->db->order_by("tb_tickets . idTicket" , "DESC")->get();
			} else if (@$searchFilter['idProfileKf']==6) // Encargado
			{
				$this->db->where("(e . idUser = " . $idUser . " or tb_tickets . idUserAttendantKf = " . @$searchFilter['idUserAttendantKf'] . ")" , null , false);
				$quuery = $this->db->order_by("tb_tickets . idTicket" , "DESC")->get();
			} else if (@$searchFilter['idProfileKf']==2) // Empresa
			{
				$this->db->where("(e . idUser = " . $idUser . " or tb_tickets . idUserCompany = " . @$searchFilter['idUser'] . ")" , null , false);
				$quuery = $this->db->order_by("tb_tickets . idTicket" , "DESC")->get();
			} else {
				$this->db->where("a . idUser = " , $idUser);
				$quuery = $this->db->order_by("tb_tickets . idTicket" , "DESC")->get();
			}


			if ($quuery->num_rows()){

				foreach ($quuery->result() as &$row) {

					if ($row->idTypeOfKeysKf!=null){
						if (isset(json_decode(@$row->idTypeOfKeysKf)->keys)){

							$listidTypeOfKeysKf = array();
							foreach (json_decode(@$row->idTypeOfKeysKf)->keys as $row1) {

								if (isset($row1->idKeyKf)){
									$query = $this->db->select(" * ")->from("tb_company_type_keychains")
										->where("idKey = " , @$row1->idKeyKf)->get();

									if ($query->num_rows() > 0){
										$item = array(
											'data' => $query->row_array() ,
											'keyQty' => @$row1->keyQty
										);

										array_push($listidTypeOfKeysKf , $item);
									}
								}
							}
							$row->listidTypeOfKeysKf = $listidTypeOfKeysKf;

						}
					}


					if ($row->itemToDisabled!=null){
						if (isset(json_decode(@$row->itemToDisabled)->keys)){
							$listitemToDisabled = array();
							foreach (json_decode(@$row->itemToDisabled)->keys as $row1) {
								if (isset($row1->idKeyKf)){
									$query = $this->db->select(" * ")->
									from("tb_company_type_keychains")->
									where("idKey = " , @$row1->idKeyKf)->get();

									if ($query->num_rows() > 0){
										$item = array(
											'data' => $query->row_array() ,
											'keyCode' => @$row1->keyCode
										);
										array_push($listitemToDisabled , $item);

									}

								}
							}
							$row->listitemToDisabled = $listitemToDisabled;

						}
					}


				}

				return $quuery->result_array();
			}
		} else {
			$this->db->select(" *,
                CASE    
                  WHEN idUserCompany > 0 THEN a . fullNameUser        /* ID DEL EMPRESA */
                  WHEN idOWnerKf > 0 THEN b . fullNameUser            /* ID DEL PROPIETARIO */
                  WHEN idUserEnterpriceKf > 0 THEN c . fullNameUser   /* ID DEL ADMIN DEL CONSORCIO */
                  WHEN idUserAdminKf > 0 THEN d . fullNameUser        /* ID DEL ADMIN DEL SISTEMA */
                  WHEN idUserTenantKf > 0 THEN g . fullNameUser       /* ID DEL INQUILINO */
                  WHEN idUserAttendantKf > 0 THEN n . fullNameUser   /* ID DEL ENCARGADO */
                  ELSE '' 
                END as fullNameUser,
                 a . fullNameUser as FullNameUserCompany,
                 b . fullNameUser as FullNameUserOwner,
                 c . fullNameUser as FullNameUserEnterprice,
                 d . fullNameUser as FullNameUserAdmin,
                 g . fullNameUser as FullUserTenant,
                 n . fullNameUser as FullUserEncargado,
                CASE  
                  WHEN idUserCompany > 0 THEN a . phoneNumberUser
                  WHEN idOWnerKf > 0 THEN b . phoneNumberUser
                  WHEN idUserEnterpriceKf > 0 THEN c . phoneNumberUser
                  WHEN idUserAdminKf > 0 THEN d . phoneNumberUser
                  WHEN idUserTenantKf > 0 THEN g . phoneNumberUser
                  ELSE '' 
                END as phoneNumberUser,
                CASE  
                  WHEN idUserCompany > 0 THEN aProf . nameProfile
                  WHEN idOWnerKf > 0 THEN bProf . nameProfile
                  WHEN idUserEnterpriceKf > 0 THEN cProf . nameProfile
                  WHEN idUserAdminKf > 0 THEN dProf . nameProfile
                  WHEN idUserTenantKf > 0 THEN gProf . nameProfile
                  WHEN idUserAttendantKf > 0 THEN nProf . nameProfile
                  ELSE '' 
                END as nameProfile,
                 aProf . nameProfile as profileUserCompany,
                 bProf . nameProfile as profileUserOwner,
                 cProf . nameProfile as profileUserEnterprice,
                 dProf . nameProfile as profileUserAdmin,
                 gProf . nameProfile as profileTenant,
                 nProf . nameProfile as profileEncargado,
                CASE  
                  WHEN idOtherKf > 0 THEN f . fullNameUser
                  WHEN idOtherKf < 1 THEN e . fullNameUser
                  ELSE ''
                END as nameAttendant,
                CASE  
                  WHEN idOtherKf > 0 THEN f . phoneNumberUser
                  WHEN idOtherKf < 1 THEN e . phoneNumberUser
                  ELSE '' 
                END as phoneAttendant,
                CASE  
                  WHEN idOtherKf > 0 THEN auxTypeA . nameTypeAttendant
                  WHEN idOtherKf < 1 THEN auxTypeB . nameTypeAttendant
                  ELSE '' 
                END as nameTypeAttendant,
                CASE  
                  WHEN idUserAttendantKfDelivery > 0 THEN h . fullNameUser
                  WHEN idUserAttendantKfDelivery < 1 THEN 'Sin delivery'
                  ELSE '' 
                END as nameAttendantDelivery,
                CASE  
                  WHEN tmp_idUserAttendantKfDelivery > 0 THEN k . fullNameUser
                  WHEN tmp_idUserAttendantKfDelivery < 1 THEN 'empty'
                  ELSE '' 
                END as tmp_nameAttendantDelivery,
                CASE  
                  WHEN idUserCancelTicket > 0 THEN m . fullNameUser
                  WHEN idUserCancelTicket < 1 THEN 'empty'
                  ELSE '' 
                END as nameUserCancelTicket,
                CASE  
                  WHEN tmp_idUserRequestChOrCancel > 0 THEN l . fullNameUser
                  WHEN tmp_idUserRequestChOrCancel < 1 THEN 'empty'
                  ELSE '' 
                END as tmp_nameUserRequestChOrCancel,
                CASE  
                  WHEN idTypeDeliveryKf > 0 THEN tmp_a . typeDelivery
                  WHEN idTypeDeliveryKf < 1 THEN 'empty'
                  ELSE '' 
                END as typeDelivery,
                CASE  
                  WHEN tmp_idTypeDeliveryKf > 0 THEN tmp_b . typeDelivery
                  WHEN tmp_idTypeDeliveryKf < 1 THEN 'empty'
                  ELSE '' 
                END as tmp_nameTypeDelivery,
                CASE  
                WHEN idUserApprovedTicket > 0 THEN j . fullNameUser
                WHEN idUserApprovedTicket < 1 THEN 'No aprobado'
                ELSE '' 
              END as nameUserApprovedTicket

            ,DATEDIFF(ifnull(tb_tickets . dateRecibedAdmin , now()) , tb_tickets . dateCreated) as dayDif ,tb_tickets . dateCreated as dateCratedTicket")->from("tb_tickets");
			$this->db->join('tb_user g' , 'g.idUser = tb_tickets.idUserTenantKf' , 'left');
			$this->db->join('tb_typeticket' , 'tb_typeticket.idTypeTicket = tb_tickets.idTypeTicketKf' , 'left');
			$this->db->join('tb_statusticket' , 'tb_statusticket.idStatus = tb_tickets.idStatusTicketKf' , 'left');
			$this->db->join('tb_type_delivery tmp_a' , 'tmp_a.idTypeDelivery = tb_tickets.idTypeDeliveryKf' , 'left');
			$this->db->join('tb_reason_disabled_item' , 'tb_reason_disabled_item.idReasonDisabledItem = tb_tickets.idReasonDisabledItemKf' , 'left');
			$this->db->join('tb_tmp_delivery_data deliverTmp' , 'deliverTmp.tmp_idTicketKf = tb_tickets.idTicket AND deliverTmp.tmp_isChOrCancelApplied is null' , 'left');
			$this->db->join('tb_type_delivery tmp_b' , 'tmp_b.idTypeDelivery = deliverTmp.tmp_idTypeDeliveryKf' , 'left');
			$this->db->join('tb_type_outher typeo' , 'typeo.idTypeOuther = tb_tickets.idTypeOuther' , 'left');
			$this->db->join('tb_user e' , 'e.idUser = tb_tickets.idUserAttendantKf' , 'left');
			$this->db->join('tb_user f' , 'f.idUser = tb_tickets.idOtherKf' , 'left');
			$this->db->join('tb_user c' , 'c.idUser = tb_tickets.idUserEnterpriceKf' , 'left');
			$this->db->join('tb_user d' , 'd.idUser = tb_tickets.idUserAdminKf' , 'left');
			$this->db->join('tb_user a' , 'a.idUser = tb_tickets.idUserCompany' , 'left');
			$this->db->join('tb_user h' , 'h.idUser = tb_tickets.idUserAttendantKfDelivery' , 'left');
			$this->db->join('tb_user j' , 'j.idUser = tb_tickets.idUserApprovedTicket' , 'left');
			$this->db->join('tb_user k' , 'k.idUser = deliverTmp.tmp_idUserAttendantKfDelivery' , 'left');
			$this->db->join('tb_user l' , 'l.idUser = deliverTmp.tmp_idUserRequestChOrCancel' , 'left');
			$this->db->join('tb_user m' , 'm.idUser = tb_tickets.idUserCancelTicket' , 'left');
			$this->db->join('tb_user n' , 'n.idUser = tb_tickets.idUserAttendantKf' , 'left');
			$this->db->join('tb_opcion_low low' , 'low.idOpcionLowTicket = tb_tickets.idOpcionLowTicketKf' , 'left');
			$this->db->join('tb_type_attendant auxTypeA' , 'auxTypeA.idTyepeAttendant = f.idTyepeAttendantKf' , 'left');
			$this->db->join('tb_type_attendant auxTypeB' , 'auxTypeB.idTyepeAttendant = e.idTyepeAttendantKf' , 'left');
			$this->db->join('tb_client_departament tid' , 'tid.idClientDepartament = tb_tickets.idDepartmentKf' , 'left');
			//$this->db->join('tb_company', 'tb_company.idCompany = tb_tickets.idCompanyKf', 'left');
			//$this->db->join('tb_profile prof', 'prof.idProfile = tb_tickets.idProfileKf', 'left');
			$this->db->join('tb_profile aProf' , 'aProf.idProfile = a.idProfileKf' , 'left');
			$this->db->join('tb_profile cProf' , 'cProf.idProfile = c.idProfileKf' , 'left');
			$this->db->join('tb_profile dProf' , 'dProf.idProfile = d.idProfileKf' , 'left');
			$this->db->join('tb_profile gProf' , 'gProf.idProfile = g.idProfileKf' , 'left');
			$this->db->join('tb_profile nProf' , 'nProf.idProfile = n.idProfileKf' , 'left');

			if (@$searchFilter['idProfileKf']==1 || @$searchFilter['idProfileKf']==4 || @$searchFilter['idProfileKf']==2){

				$this->db->join('tb_user b' , 'b.idUser = tb_tickets.idOWnerKf' , 'left');
				$this->db->join('tb_profile bProf' , 'bProf.idProfile = b.idProfileKf' , 'left');

			} else {
				$this->db->join('tb_user b' , 'b.idUser = tb_tickets.idOWnerKf' , 'inner');
				$this->db->join('tb_profile bProf' , 'bProf.idProfile = b.idProfileKf' , 'left');
			}
			$this->db->join('tb_type_services' , 'tb_type_services.idTypeServices = tb_tickets.idTypeServicesKf' , 'left');
			$this->db->join('tb_clients' , 'tb_clients.idClient = tb_tickets.idAdressKf' , 'left');


			if (@$searchFilter['idProfileKf']!=1 && @$searchFilter['idProfileKf']!=4 && @$searchFilter['idProfileKf']!=2){
				$this->db->join('tb_client_departament tidu' , 'tidu.idUserKf = g.idUser' , 'left');
			}


			if (@$searchFilter['idCompanyKf'] > 0/* && @$searchFilter['idProfileKf'] != 4*/){
				$this->db->where("tb_tickets . idCompanyKf = " , @$searchFilter['idCompanyKf']);
				//$this->db->where("tb_tickets . idBranchKf > ", 0);
			}

			if (@$searchFilter['idTypeTicketKf'] > 0){
				$this->db->where("tb_tickets . idTypeTicketKf = " , @$searchFilter['idTypeTicketKf']);
			}


			if (@$searchFilter['idStatusTicketKf'] > 0){
				$this->db->where("tb_tickets . idStatusTicketKf = " , @$searchFilter['idStatusTicketKf']);
			} else {

				if (@$searchFilter['idStatusTicketKf']==null){
					$this->db->where("tb_tickets . idStatusTicketKf!=" , -1);

				} else {
					$this->db->where("tb_tickets . idStatusTicketKf = " , -1);

				}
			}

			if (@$searchFilter['idAdress'] > 0){
				$this->db->where("tb_clients . address = " , @$searchFilter['idAdress']);
			}


			/* verificamos el id de perfil */
			if (@$searchFilter['idProfileKf'] > 0){


				if (@$searchFilter['idProfileKf']==4) // admin consorcio
				{
					$this->db->where("tb_clients . address  IN(select idAdress from tb_addres where idCompanyKf = " . @$searchFilter['idCompanyKf'] . ")" , NULL , FALSE);

				}

				if (@$searchFilter['idProfileKf']==2) // empresa
				{
					$this->db->where("tb_clients . address  IN(select idAdress from tb_addres where idCompanyKf = " . @$searchFilter['idCompanyKf'] . ")" , NULL , FALSE);

				}
			}


			/* Busqueda por filtro */
			if (!is_null($searchFilter['searchFilter']) && strlen($searchFilter['searchFilter']) > 0){

				$this->db->where("
                            (a . fullNameUser like  '%" . $searchFilter['searchFilter'] . "%'
							or a . phoneNumberUser like  '%" . $searchFilter['searchFilter'] . "%'
							or a . emailUser like  '%" . $searchFilter['searchFilter'] . "%'
							or tb_tickets . codTicket like  '%" . $searchFilter['searchFilter'] . "%'
							or tb_tickets . descriptionOrder like  '%" . $searchFilter['searchFilter'] . "%'
							or tb_type_services . typeServices like  '%" . $searchFilter['searchFilter'] . "%'
							or tb_clients . address like  '%" . $searchFilter['searchFilter'] . "%'
                   ) ");


			}


			// Si recibimos un limite //
			if ($searchFilter['topFilter'] > 0){
				$this->db->limit($searchFilter['topFilter']);
			}

			$quuery = $this->db->order_by("tb_tickets . idTicket" , "DESC")->get();


			if ($quuery->num_rows()){

				foreach ($quuery->result() as &$row) {

					if ($row->idTypeOfKeysKf!=null){
						if (isset(json_decode(@$row->idTypeOfKeysKf)->keys)){

							$listidTypeOfKeysKf = array();
							foreach (json_decode(@$row->idTypeOfKeysKf)->keys as $row1) {

								if (isset($row1->idKeyKf)){
									$query = $this->db->select(" * ")->from("tb_company_type_keychains")
										->where("idKey = " , @$row1->idKeyKf)->get();

									if ($query->num_rows() > 0){
										$item = array(
											'data' => $query->row_array() ,
											'keyQty' => @$row1->keyQty
										);

										array_push($listidTypeOfKeysKf , $item);
									}
								}
							}
							$row->listidTypeOfKeysKf = $listidTypeOfKeysKf;

						}
					}


					if ($row->itemToDisabled!=null){
						if (isset(json_decode(@$row->itemToDisabled)->keys)){
							$listitemToDisabled = array();
							foreach (json_decode(@$row->itemToDisabled)->keys as $row1) {
								if (isset($row1->idKeyKf)){
									$query = $this->db->select(" * ")->
									from("tb_company_type_keychains")->
									where("idKey = " , @$row1->idKeyKf)->get();

									if ($query->num_rows() > 0){
										$item = array(
											'data' => $query->row_array() ,
											'keyCode' => @$row1->keyCode
										);
										array_push($listitemToDisabled , $item);

									}

								}
							}
							$row->listitemToDisabled = $listitemToDisabled;

						}
					}


				}


				return $quuery->result_array();
			}
			return null;
		}
	}

	public function get_new($data)
	{
		/* El buscador debe buscar por
		    @$data['idTypeTicketKf']
			@$data['idClientAdminFk']
			@$data['idBuildingKf']
			@$data['idStatusTicketKf']
			@$data['idTypeDeliveryKf']
			@$data['codTicket']
			@$data['idClientCompaniFk']
			@$data['idTypePaymentKf']
			@$data['topfilter']

			@$data['codTicket']!=''			||
			@$data['idBuildingKf']!=''		||
			@$data['idClientAdminFk']!=''	||
			@$data['idClientBranchFk']!=''	||
			@$data['idClientCompaniFk']!=''	||
			@$data['idStatusTicketKf']!=''	||
			@$data['idTypeDeliveryKf']!=''	||
			@$data['idTypePaymentKf']!=''	||
			@$data['idTypeTicketKf']!=''	||
			@$data['idUserMadeBy']!=''		||
			@$data['idUserRequestBy']!=''
			@$data['topfilter']

		*/
		$quuery = null;
		$rs     = array();
		//
		if(@$data['idProfileKf']=='1' && (@$data['idClientAdminFk']!='' || @$data['idClientCompaniFk']!='')){
			if ((((@$data['idClientAdminFk']!='' && @$data['idBuildingKf']=='') || (@$data['idClientAdminFk']!='' && @$data['idBuildingKf']!='')) && @$data['idClientCompaniFk']=='' && @$data['idClientBranchFk']=='') ||
				(((@$data['idClientCompaniFk']!='' && @$data['idClientBranchFk']=='') || (@$data['idClientCompaniFk']!='' && @$data['idClientBranchFk']!='')) && @$data['idClientAdminFk']=='' && @$data['idBuildingKf']=='')){
				$this->db->select("*");
				$this->db->from("tb_tickets_2");
				$rsA = [];
				if (@$data['idClientAdminFk']!=''){
					$this->db->where("idUserRequestBy = " , @$data['idClientAdminFk']);
				}else if(@$data['idClientCompaniFk']!=''){
					$this->db->where("idUserRequestBy = " , @$data['idClientCompaniFk']);
				}
				
				//ID USER OF WHO REQUEST THE TICKET
				if (@$data['idUserRequestBy']!=''){
					$this->db->where("idUserRequestBy = " , @$data['idUserRequestBy']);
				}
				//ID USER OF WHO MADE THE TICKET
				if (@$data['idUserMadeBy']!=''){
					$this->db->where("idUserMadeBy = " , @$data['idUserMadeBy']);
				}
				//TICKET TYPE
				if (@$data['idTypeTicketKf']!=''){
					$this->db->where("idTypeTicketKf = " , @$data['idTypeTicketKf']);
				}
				//TICKET STATUS
				if (@$data['idStatusTicketKf']!=''){
					if(@$data['idStatusTicketKf']=='10'){
						$this->db->where("isCancelRequested = " , "1");
					}else{
						$this->db->where("idStatusTicketKf = " , @$data['idStatusTicketKf']);
					}
				}
				//TICKET TYPE DELIVERY
				if (@$data['idTypeDeliveryKf']!=''){
					$this->db->where("idTypeDeliveryKf = " , @$data['idTypeDeliveryKf']);
				}
				//TICKET TYPE OF PAYMENT
				if (@$data['idTypePaymentKf']!=''){
					$this->db->where("idTypePaymentKf = " , @$data['idTypePaymentKf']);
				}
				if (@$data['codTicket']!=''){
					//$this->db->where("codTicket = " , @$data['codTicket']);
					$where = "codTicket LIKE '%".@$data['codTicket']."%'";
					$this->db->where($where);
				}
				if (@$data['topfilter']!=''){
					$this->db->limit($data['topfilter']);
				}
				$quuery = $this->db->order_by("idTicket" , "DESC")->get();
				if (count($quuery->result_array())>=1){
					foreach ($quuery->result_array() as $ticket) {
						array_push($rsA, $ticket);
					}
					//$rsA = $quuery->result_array();
					//print_r($rsA);
					//return $this->buscar_relaciones_ticket($quuery->result_array());
				}
				$rsB=array();
				$this->db->select("*")->from("tb_clients");
				if (@$data['idClientAdminFk']!='' && @$data['idBuildingKf']!='' && @$data['idClientCompaniFk']=='' && @$data['idClientBranchFk']==''){
					$this->db->where("idClient = " , @$data['idBuildingKf']);
					$buildingList = $this->db->where("idClientAdminFk = " , @$data['idClientAdminFk'])->get();
				}else if (@$data['idClientAdminFk']!='' && @$data['idBuildingKf']=='' && @$data['idClientCompaniFk']=='' && @$data['idClientBranchFk']==''){
					$buildingList = $this->db->where("idClientAdminFk = " , @$data['idClientAdminFk'])->get();
				}
				if (@$data['idClientCompaniFk']!='' && @$data['idClientBranchFk']!='' && @$data['idClientAdminFk']=='' && @$data['idBuildingKf']==''){
					$this->db->where("idClient = " , @$data['idClientBranchFk']);
					$buildingList = $this->db->where("idClientCompaniFk = " , @$data['idClientCompaniFk'])->get();
				}else if(@$data['idClientCompaniFk']!='' && @$data['idClientBranchFk']=='' && @$data['idClientAdminFk']=='' && @$data['idBuildingKf']==''){
					$buildingList = $this->db->where("idClientCompaniFk = " , @$data['idClientCompaniFk'])->get();
				}
				//print_r($buildingList->result_array());
				if (count($buildingList->result())>0){
					$i = 0;
					foreach ($buildingList->result() as &$row) {
						//print_r($row->idClient);
						$quuery = null;
						$this->db->select("*");
						$this->db->from("tb_tickets_2");
						if (@$data['idBuildingKf']!='' || @$data['idBuildingKf']==''){
							$this->db->where("idBuildingKf = " , $row->idClient);
						}
						if (@$data['idUserRequestBy']!=''){
							$this->db->or_where("idUserRequestBy = " , $row->idClient);
						}
						if (@$data['idClientBranchFk']!=''){
							$this->db->where("idUserRequestBy = " , $row->idClient);
						}
						//ID USER OF WHO MADE THE TICKET
						if (@$data['idUserMadeBy']!=''){
							$this->db->where("idUserMadeBy = " , @$data['idUserMadeBy']);
						}
						//TICKET TYPE
						if (@$data['idTypeTicketKf']!=''){
							$this->db->where("idTypeTicketKf = " , @$data['idTypeTicketKf']);
						}
						//TICKET STATUS
						if (@$data['idStatusTicketKf']!=''){
							if(@$data['idStatusTicketKf']=='10'){
								$this->db->where("isCancelRequested = " , "1");
							}else{
								$this->db->where("idStatusTicketKf = " , @$data['idStatusTicketKf']);
							}
						}
						//TICKET TYPE DELIVERY
						if (@$data['idTypeDeliveryKf']!=''){
							$this->db->where("idTypeDeliveryKf = " , @$data['idTypeDeliveryKf']);
						}
						//TICKET TYPE OF PAYMENT
						if (@$data['idTypePaymentKf']!=''){
							$this->db->where("idTypePaymentKf = " , @$data['idTypePaymentKf']);
						}
						if (@$data['codTicket']!=''){
							//$this->db->where("codTicket = " , @$data['codTicket']);
							$where = "codTicket LIKE '%".@$data['codTicket']."%'";
							$this->db->where($where);
						}
						if (@$data['topfilter']!=''){
							$this->db->limit($data['topfilter']);
						}
						$quuery = $this->db->order_by("idTicket" , "DESC")->get();
						//print(count($quuery->result_array())."\n");
						if (count($quuery->result_array())>=1){
							//print_r($quuery->result_array());
							//$rsB[$i] = $quuery->result_array();
							foreach ($quuery->result_array() as $ticket) {
								array_push($rsA, $ticket);
							}
						}
						$i++;
					}
				}
				//arsort($rsA);
				array_multisort(array_unique($rsA, SORT_DESC));
				if(count($rsA)>0){
					return $this->buscar_relaciones_ticket($rsA);
				}else{
					return null;
				}
				
			}
		}else if (@$data['idProfileKf']=='4' && !@$data['isHomeSelected']){
			$this->db->select("*");
			$this->db->from("tb_tickets_2");
			//ID USER OF WHO REQUEST THE TICKET
			if (@$data['idUserRequestBy']!=''){
				$this->db->where("idUserRequestBy = " , @$data['idUserRequestBy']);
			}
			//ID USER OF WHO MADE THE TICKET
			if (@$data['idUserMadeBy']!=''){
				$this->db->where("idUserMadeBy = " , @$data['idUserMadeBy']);
			}
			//TICKET TYPE
			if (@$data['idTypeTicketKf']!=''){
				$this->db->where("idTypeTicketKf = " , @$data['idTypeTicketKf']);
			}
			if (@$data['idBuildingKf']!=''){
				$this->db->where("idBuildingKf = " , @$data['idBuildingKf']);
			}
			//TICKET STATUS
			if (@$data['idStatusTicketKf']!=''){
				if(@$data['idStatusTicketKf']=='10'){
					$this->db->where("isCancelRequested = " , "1");
				}else{
					$this->db->where("idStatusTicketKf = " , @$data['idStatusTicketKf']);
				}
			}
			//TICKET TYPE DELIVERY
			if (@$data['idTypeDeliveryKf']!=''){
				$this->db->where("idTypeDeliveryKf = " , @$data['idTypeDeliveryKf']);
			}
			//TICKET TYPE OF PAYMENT
			if (@$data['idTypePaymentKf']!=''){
				$this->db->where("idTypePaymentKf = " , @$data['idTypePaymentKf']);
			}
			if (@$data['codTicket']!=''){
				$where = "codTicket LIKE '%".@$data['codTicket']."%'";
				$this->db->where($where);
			}
			if (@$data['topfilter']!=''){
				$this->db->limit($data['topfilter']);
			}
			$quuery = $this->db->order_by("idTicket" , "DESC")->get();
			if ($quuery->num_rows()){
				//print_r($quuery->result_array());
				return $this->buscar_relaciones_ticket($quuery->result_array());
			}
		}else if ((@$data['idProfileKf']=='3' || @$data['idProfileKf']=='5') || (@$data['idProfileKf']=='4' && @$data['isHomeSelected'] && (@$data['idTypeTenantKf']=='1' || @$data['idTypeTenantKf']=='2'))){
			$rsA = [];
			if (@$data['idProfileKf']=='3' || (@$data['idProfileKf']=='4' && @$data['idTypeTenantKf']=='1' && @$data['isHomeSelected'])){
				$this->db->select("*")->from("tb_client_departament");
				if (@$data['idBuildingKf']!=''){
					$this->db->where("idClientFk = " , @$data['idBuildingKf']);
					$rsList = $this->db->where("idUserKf = " , @$data['idUserRequestBy'])->get();
				}else{
					$rsList = $this->db->where("idUserKf = " , @$data['idUserRequestBy'])->get();
				}
			}else if (@$data['idProfileKf']=='5' || (@$data['idProfileKf']=='4' && @$data['idTypeTenantKf']=='2' && @$data['isHomeSelected'])){
				$this->db->select("*")->from("tb_user");
				$this->db->where("idTypeTenantKf = ", "2" );
				$rsList = $this->db->where("idDepartmentKf = " , @$data['idDepartmentKf'])->get();
			}
			if (count($rsList->result_array())>0){
				//print_r($rsList->result());
				$i = 0;
				foreach ($rsList->result() as &$row) {
					//echo $row->idDepartmentKf . "\n";
					//echo $row->idUser . "\n";
					$quuery = null;
					$this->db->select("*");
					$this->db->from("tb_tickets_2");
					if (@$data['idProfileKf']=='3' || (@$data['idProfileKf']=='4' && @$data['idTypeTenantKf']=='1' && @$data['isHomeSelected'])){
						if (@$data['idBuildingKf']!=''){
							$this->db->where("idBuildingKf = " , $row->idClientFk);
						}
						$this->db->where("idDepartmentKf = " , $row->idClientDepartament);
					}else if (@$data['idProfileKf']=='5' || (@$data['idProfileKf']=='4' && @$data['idTypeTenantKf']=='2' && @$data['isHomeSelected'])){
						//ID USER OF WHO REQUEST THE TICKET
						$whereT = "(idUserRequestBy = ".$row->idUser." OR idUserMadeBy = ".$row->idUser.")";
						$this->db->where($whereT);
						//ID USER OF WHO MADE THE TICKET
						//$this->db->or_where("idUserMadeBy = " , $row->idUser);
						$this->db->where("idDepartmentKf = " , $row->idDepartmentKf);
					}
					//TICKET TYPE
					if (@$data['idTypeTicketKf']!=''){
						$this->db->where("idTypeTicketKf = " , @$data['idTypeTicketKf']);
					}
					//TICKET STATUS
					if (@$data['idStatusTicketKf']!=''){
						if(@$data['idStatusTicketKf']=='10'){
							$this->db->where("isCancelRequested = " , "1");
						}else{
							$this->db->where("idStatusTicketKf = " , @$data['idStatusTicketKf']);
						}
					}
					//TICKET TYPE DELIVERY
					if (@$data['idTypeDeliveryKf']!=''){
						$this->db->where("idTypeDeliveryKf = " , @$data['idTypeDeliveryKf']);
					}
					//TICKET TYPE OF PAYMENT
					if (@$data['idTypePaymentKf']!=''){
						$this->db->where("idTypePaymentKf = " , @$data['idTypePaymentKf']);
					}
					if (@$data['codTicket']!=''){
						$where = "codTicket LIKE '%".@$data['codTicket']."%'";
						$this->db->where($where);
					}

					if (@$data['topfilter']!=''){
						$this->db->limit($data['topfilter']);
					}
					$quuery = $this->db->order_by("idTicket" , "DESC")->get();
					//print_r($quuery->result_array());
					if (count($quuery->result_array())>=1){
						//print_r("entro ". $i);
						//print_r($quuery->result_array());
						foreach ($quuery->result_array() as $ticket) {
							array_push($rsA, $ticket);
						}
						//$rsA[$i]=$quuery->result_array();
						//print_r($rsA);
					}
					$i++;
					
				}
			}
			array_multisort(array_unique($rsA, SORT_DESC));
			if(count($rsA)>0){
				return $this->buscar_relaciones_ticket($rsA);
			}else{
				return null;
			}
		}else{
			$this->db->select("*");
			$this->db->from("tb_tickets_2");
			//TICKET TYPE
			if (@$data['idTypeTicketKf']!=''){
				$this->db->where("idTypeTicketKf = " , @$data['idTypeTicketKf']);
			}
			//TICKET STATUS
			if (@$data['idStatusTicketKf']!=''){
				if(@$data['idStatusTicketKf']=='10'){
					$this->db->where("isCancelRequested = " , "1");
				}else{
					$this->db->where("idStatusTicketKf = " , @$data['idStatusTicketKf']);
				}
			}
			//TICKET TYPE DELIVERY
			if (@$data['idTypeDeliveryKf']!=''){
				$this->db->where("idTypeDeliveryKf = " , @$data['idTypeDeliveryKf']);
			}
			//TICKET TYPE OF PAYMENT
			if (@$data['idTypePaymentKf']!=''){
				$this->db->where("idTypePaymentKf = " , @$data['idTypePaymentKf']);
			}
			if (@$data['codTicket']!=''){
				//$this->db->where("codTicket = " , @$data['codTicket']);
				$where = "codTicket LIKE '%".@$data['codTicket']."%'";
				$this->db->where($where);
			}
			if (@$data['topfilter']!=''){
				$this->db->limit($data['topfilter']);
			}
			$quuery = $this->db->order_by("idTicket" , "DESC")->get();
			if ($quuery->num_rows()){
				//print_r($quuery->result_array());
				return $this->buscar_relaciones_ticket($quuery->result_array());
			}
		}

	}

	/* GET TICKET BY ID */
	public function ticketById($id)
	{
		$quuery = null;
		$rs     = null;

		$this->db->select("*")->from("tb_tickets_2");
		$quuery = $this->db->where("idTicket = " , $id)->get();

		if ($quuery->num_rows() > 0){
			$todo = $quuery->result_array();
			return $this->buscar_relaciones_ticket($todo);
		}
		return null;

	}

	public function buscar_relaciones_ticket($todo)
	{
		//var_dump($todo);
		foreach ($todo as $key => $ticket) {
			$this->db->select("*")->from("tb_category_keychain");
			$quuery                       = $this->db->where("idCategory = " , $ticket['idTypeRequestFor'])->get();
			$todo[$key]['typeRequestFor'] = @$quuery->result_array()[0];

			$this->db->select("*")->from("tb_typeticket");
			$quuery                   = $this->db->where("idTypeTicket = " , $ticket['idTypeTicketKf'])->get();
			$todo[$key]['typeticket'] = @$quuery->result_array()[0];

			$this->db->select("*")->from("tb_clients");
			$this->db->join('tb_zonas', 'tb_zonas.idZona = tb_clients.idZonaFk', 'left');
            $this->db->join('tb_location', 'tb_location.idLocation = tb_clients.idLocationFk', 'left');
            $this->db->join('tb_province', 'tb_province.idProvince = tb_clients.idProvinceFk', 'left');
			$quuery                 = $this->db->where("idClient = " , $ticket['idBuildingKf'])->get();
			$todo[$key]['building'] = @$quuery->result_array()[0];

			if ($ticket['idTypeRequestFor']==1){

				$this->db->select("*")->from("tb_client_departament");
				$quuery                   = $this->db->where("idClientDepartament = " , $ticket['idDepartmentKf'])->get();
				$todo[$key]['department'] = @$quuery->result_array()[0];

				$this->db->select("*")->from("tb_user");
				$this->db->join('tb_profile', 'tb_profile.idProfile = tb_user.idProfileKf', 'left');
				$this->db->join('tb_profiles', 'tb_profiles.idProfiles = tb_user.idSysProfileFk', 'left');
				$this->db->join('tb_status', 'tb_status.idStatusTenant = tb_user.idStatusKf', 'left');
				$this->db->join('tb_type_attendant', 'tb_type_attendant.idTyepeAttendant = tb_user.idTyepeAttendantKf', 'left');
				$quuery                   = $this->db->where("idUser = " , $ticket['idUserMadeBy'])->get();
				$todo[$key]['userMadeBy'] = @$quuery->result_array()[0];

				$this->db->select("*")->from("tb_user");
				$this->db->join('tb_profile', 'tb_profile.idProfile = tb_user.idProfileKf', 'left');
				$this->db->join('tb_profiles', 'tb_profiles.idProfiles = tb_user.idSysProfileFk', 'left');
				$this->db->join('tb_status', 'tb_status.idStatusTenant = tb_user.idStatusKf', 'left');
				$this->db->join('tb_type_attendant', 'tb_type_attendant.idTyepeAttendant = tb_user.idTyepeAttendantKf', 'left');
				$quuery                   = $this->db->where("idUser = " , $ticket['idUserRequestBy'])->get();
				$todo[$key]['userRequestBy'] = @$quuery->result_array()[0];

				$this->db->select("*")->from("tb_clients");
				$quuery                    = $this->db->where("idClient = " , $todo[$key]['building']['idClientAdminFk'])->get();
				$todo[$key]['clientAdmin'] = @$quuery->result_array()[0];

			} else if ($ticket['idTypeRequestFor']==2 || $ticket['idTypeRequestFor']==3 || $ticket['idTypeRequestFor']==4 || $ticket['idTypeRequestFor']==6){

				$this->db->select("*")->from("tb_user");
				$this->db->join('tb_profile', 'tb_profile.idProfile = tb_user.idProfileKf', 'left');
				$this->db->join('tb_profiles', 'tb_profiles.idProfiles = tb_user.idSysProfileFk', 'left');
				$this->db->join('tb_status', 'tb_status.idStatusTenant = tb_user.idStatusKf', 'left');
				$this->db->join('tb_type_attendant', 'tb_type_attendant.idTyepeAttendant = tb_user.idTyepeAttendantKf', 'left');
				$quuery                   = $this->db->where("idUser = " , $ticket['idUserMadeBy'])->get();
				$todo[$key]['userMadeBy'] = @$quuery->result_array()[0];

				$this->db->select("*")->from("tb_clients");
				$quuery                    = $this->db->where("idClient = " , $todo[$key]['building']['idClientAdminFk'])->get();
				$todo[$key]['clientAdmin'] = @$quuery->result_array()[0];

			
			}else {
				$this->db->select("*")->from("tb_user");
				$this->db->join('tb_profile', 'tb_profile.idProfile = tb_user.idProfileKf', 'left');
				$this->db->join('tb_profiles', 'tb_profiles.idProfiles = tb_user.idSysProfileFk', 'left');
				$this->db->join('tb_status', 'tb_status.idStatusTenant = tb_user.idStatusKf', 'left');
				$this->db->join('tb_type_attendant', 'tb_type_attendant.idTyepeAttendant = tb_user.idTyepeAttendantKf', 'left');
				$quuery                   = $this->db->where("idUser = " , $ticket['idUserMadeBy'])->get();
				$todo[$key]['userMadeBy'] = @$quuery->result_array()[0];

				$this->db->select("*")->from("tb_clients");
				$quuery                      = $this->db->where("idClient = " , $ticket['idUserRequestBy'])->get();
				$todo[$key]['clientCompani'] = @$quuery->result_array()[0];

				$this->db->select("*")->from("tb_clients");
				$quuery                    = $this->db->where("idClient = " , $ticket['idUserRequestBy'])->get();
				$todo[$key]['clientAdmin'] = @$quuery->result_array()[0];
	
			}
			$this->db->select("*")->from("tb_ticket_keychain");
			$this->db->join('tb_products' , 'tb_products.idProduct = tb_ticket_keychain.idProductKf' , 'left');
			$this->db->join('tb_user' , 'tb_user.idUser = tb_ticket_keychain.idUserKf' , 'left');
			$quuery             = $this->db->where("idTicketKf = " , $ticket['idTicket'])->get();
			$todo[$key]['keys'] = @$quuery->result_array();
				$i=0;
				foreach ($todo[$key]['keys'] as $item => $keychain) {
					$idKeyChain = $keychain['id'];
					$this->db->select("tb_contratos.idContrato, tb_client_services_access_control.idClientServicesAccessControl AS idService, tb_contratos.idStatusFk, tb_status.statusTenantName AS contractStatus, tb_servicios_del_contrato_cabecera.serviceName, tb_access_control_door.*, tb_ticket_keychain_doors.*")->from("tb_ticket_keychain_doors");
					$this->db->join('tb_ticket_keychain' , 'tb_ticket_keychain.id = tb_ticket_keychain_doors.idTicketKeychainKf' , 'left');
					$this->db->join('tb_contratos' , 'tb_contratos.idContrato = tb_ticket_keychain_doors.idContractKf' , 'left');
					$this->db->join('tb_servicios_del_contrato_cabecera', 'tb_servicios_del_contrato_cabecera.idContratoFk = tb_contratos.idContrato', 'left');
					$this->db->join('tb_servicios_del_contrato_cuerpo', 'tb_servicios_del_contrato_cuerpo.idServiciosDelContratoFk = tb_servicios_del_contrato_cabecera.idServiciosDelContrato', 'left');
					$this->db->join('tb_client_services_access_control', 'tb_client_services_access_control.idContracAssociated_SE = tb_contratos.idContrato', 'left');
					$this->db->join('tb_access_control_door', 'tb_access_control_door.idAccessControlDoor = tb_client_services_access_control.idDoorFk', 'left');
					$this->db->join('tb_status', 'tb_status.idStatusTenant = tb_contratos.idStatusFk', 'left');
					$where_string = "tb_ticket_keychain_doors.idTicketKeychainKf = $idKeyChain AND tb_contratos.idStatusFk = 1 AND tb_ticket_keychain_doors.doorSelected = 1 AND tb_servicios_del_contrato_cabecera.idServiceType = 1 
					GROUP BY tb_access_control_door.idAccessControlDoor,tb_servicios_del_contrato_cabecera.serviceName ORDER BY tb_access_control_door.idAccessControlDoor;";
					$quuery             = $this->db->where($where_string)->get();
					$todo[$key]['keys'][$i]['doors'] = @$quuery->result_array();
					$i++;
				}
			$this->db->select("*")->from("tb_type_delivery");
			$quuery                    = $this->db->where("idTypeDelivery = " , $ticket['idTypeDeliveryKf'])->get();
			$todo[$key]['typeDeliver'] = @$quuery->result_array()[0];

			$this->db->select("*")->from("tb_pick_receive");
			$quuery                  = $this->db->where("idWhoPickUp = " , $ticket['idWhoPickUp'])->get();
			$todo[$key]['whoPickUp'] = @$quuery->result_array()[0];

			$this->db->select("*")->from("tb_user");
			$this->db->join('tb_profile', 'tb_profile.idProfile = tb_user.idProfileKf', 'left');
			$this->db->join('tb_profiles', 'tb_profiles.idProfiles = tb_user.idSysProfileFk', 'left');
			$this->db->join('tb_status', 'tb_status.idStatusTenant = tb_user.idStatusKf', 'left');
			$this->db->join('tb_type_attendant', 'tb_type_attendant.idTyepeAttendant = tb_user.idTyepeAttendantKf', 'left');
			$quuery                     = $this->db->where("idUser = " , $ticket['idUserDelivery'])->get();
			$todo[$key]['userDelivery'] = @$quuery->result_array()[0];

			$this->db->select("*")->from("tb_ticket_delivery");
			$quuery                   = $this->db->where("id = " , $ticket['idDeliveryTo'])->get();
			$todo[$key]['deliveryTo'] = @$quuery->result_array()[0];

			$this->db->select("*")->from("tb_clients");
			$this->db->join('tb_zonas', 'tb_zonas.idZona = tb_clients.idZonaFk', 'left');
            $this->db->join('tb_location', 'tb_location.idLocation = tb_clients.idLocationFk', 'left');
            $this->db->join('tb_province', 'tb_province.idProvince = tb_clients.idProvinceFk', 'left');
			$quuery                        = $this->db->where("idClient = " , $ticket['idDeliveryAddress'])->get();
			$todo[$key]['deliveryAddress'] = @$quuery->result_array()[0];
			if ($ticket['idTypeDeliveryKf']=='1' && $todo[$key]['deliveryAddress']==null){
				$todo[$key]['deliveryAddress']['address']="Carlos Calvo 3430";
				$todo[$key]['deliveryAddress']['province']="Ciudad Autonoma de Buenos Aires";
				$todo[$key]['deliveryAddress']['location']="Boedo";
			}

			$this->db->select("*")->from("tb_ticket_other_delivery_address");
			$this->db->join('tb_location', 'tb_location.idLocation = tb_ticket_other_delivery_address.idLocationFk', 'left');
            $this->db->join('tb_province', 'tb_province.idProvince = tb_ticket_other_delivery_address.idProvinceFk', 'left');
			$quuery                             = $this->db->where("id = " , $ticket['idOtherDeliveryAddressKf'])->get();
			$todo[$key]['otherDeliveryAddress'] = @$quuery->result_array()[0];

			$this->db->select("*")->from("tb_ticket_third_person_delivery");
			$this->db->join('tb_location', 'tb_location.idLocation = tb_ticket_third_person_delivery.idLocationFk', 'left');
            $this->db->join('tb_province', 'tb_province.idProvince = tb_ticket_third_person_delivery.idProvinceFk', 'left');
			$quuery                            = $this->db->where("id = " , $ticket['idThirdPersonDeliveryKf'])->get();
			$todo[$key]['thirdPersonDelivery'] = @$quuery->result_array()[0];

			$this->db->select("*")->from("tb_ticket_payment_type");
			$quuery                      = $this->db->where("id = " , $ticket['idTypePaymentKf'])->get();
			$todo[$key]['typePaymentKf'] = @$quuery->result_array()[0];

			$this->db->select("*")->from("tb_statusticket");
			$quuery                     = $this->db->where("idStatus = " , $ticket['idStatusTicketKf'])->get();
			$todo[$key]['statusTicket'] = @$quuery->result_array()[0];

			$this->db->select("*")->from("tb_mp_payments");
			$quuery                     = $this->db->where("idPayment = " , $ticket['idPaymentKf'])->get();
			$todo[$key]['paymentDetails'] = @$quuery->result_array()[0];

			$this->db->select("*")->from("tb_ticket_changes_history");
			$this->db->join('tb_ticket_changes_category' , 'tb_ticket_changes_category.id = tb_ticket_changes_history.idCambiosTicketKf' , 'left');
			$this->db->join('tb_user', 'tb_user.idUser = tb_ticket_changes_history.idUserKf', 'left');
			$this->db->join('tb_profile', 'tb_profile.idProfile = tb_user.idProfileKf', 'left');
			$this->db->join('tb_profiles', 'tb_profiles.idProfiles = tb_user.idSysProfileFk', 'left');
			$this->db->join('tb_status', 'tb_status.idStatusTenant = tb_user.idStatusKf', 'left');
			$this->db->join('tb_type_attendant', 'tb_type_attendant.idTyepeAttendant = tb_user.idTyepeAttendantKf', 'left');
			$quuery                        = $this->db->where("idTicketKf = " , $ticket['idTicket'])->get();
			$todo[$key]['changes_history'] = @$quuery->result_array();
		}

		return $todo;
	}

	/* GET TICKET BY TOKEN */
	public function ticketByToken($token)
	{
		$quuery = null;
		$rs     = null;


		$this->db->select("
                         TK . idTicket         AS tk_id,
                         TK . codTicket        AS tk_cod,
                         TK . numberItemes     AS tk_qtty,
                         TK . dateCreated      AS tk_date_created,
                         TK . dateRecibedAdmin AS tk_date_approved,
                         TK . dateRecibeCompany AS tk_date_system,
                         TK . dateCancel       AS tk_date_cancel,
                         TK . idTypeTicketKf   AS tk_type_id,
                        CASE 
                             WHEN TK . idTypeTicketKf <= 2 THEN SUBSTR(TTK . typeTicketName , 1 , 4)
                             WHEN TK . idTypeTicketKf = 3  THEN SUBSTR(TTK . typeTicketName , 1 , 8)
                             WHEN TK . idTypeTicketKf = 4  THEN SUBSTR(TTK . typeTicketName , 20 , 9)
                             ELSE ''
                        END AS tk_type,
                         TK . idTypeOfOptionKf  AS tk_typeOfOption_id,
                         CASE 
                            WHEN TK . idTypeOfOptionKf = 1 THEN 'Solicitud para Encargado'
                            WHEN TK . idTypeOfOptionKf = 2 THEN 'Solicitud para Consorcio'
                            ELSE ''
                        END AS tk_typeOfOption,
                         TK . idTypeDeliveryKf AS tk_type_delivery_id,
                         TYD . typeDelivery    AS tk_type_delivery,
                         TK . idWhoPickUp      AS tk_who_pickup_id,
                         UPPER(TYR . nameWhoPickUp)   AS tk_who_pickup,
                         TK . thirdPersonNames AS tk_third_person_name,
                         TK . thirdPersonPhone AS tk_third_person_phone,
                         TK . thirdPersonId    AS tk_third_person_id,
                         TK . urlToken         AS tk_token,
                         TYOU . typeOuther     AS tk_type_qry,
                         TK . totalGestion     AS tk_mgmt,
                         TK . totalLlave       AS tk_keys,
                         TK . totalEnvio       AS tk_deliv,
                         TK . totalService     AS tk_total,
                         STK . statusName      AS tk_status,
                         SYSU . fullNameUser   AS u_system,
                         SYSP . nameProfile    AS p_system,
                         UO . fullNameUser     AS u_owner,
                         PUO . nameProfile     AS p_owner,
                         UO . emailUser        AS m_owner,
                         UT . fullNameUser     AS u_tenant,
                         PUT . nameProfile     AS p_tenant,
                         UT . emailUser        AS m_tenant,
                         CASE 
                            WHEN TK . idUserTenantKf > 0 AND TK . idOWnerKf IS NULL OR TK . idOWnerKf = 0 THEN UON . fullNameUser
                            ELSE ''
                         END AS notify_owner_names,
                         CASE 
                            WHEN TK . idUserTenantKf > 0 AND TK . idOWnerKf IS NULL OR TK . idOWnerKf = 0 THEN UON . emailUser
                         ELSE ''
                         END AS notify_owner_mail,
                         UADMC . fullNameUser  AS u_admc,
                         PADMC . nameProfile   AS p_admc,
                         UADMC . emailUser     AS m_admc,
                         UENT . fullNameUser   AS u_enterp,
                         PENT . nameProfile    AS p_enterp,
                         UENT . emailUser      AS m_enterp,
                         UATT . fullNameUser   AS u_atten,
                         PUATT . nameProfile   AS p_atten,
                         UATT . emailUser      AS m_atten,
                         UATTD . fullNameUser  AS u_attend,
                         PUATTD . nameProfile  AS p_attend,
                         UATTD . emailUser     AS m_attend,
                         RQA . nameAdress      AS rq_address,
                         RQD . departmentFloor AS rq_deparment,
                         RQC . nameCompany     AS rq_company,
                         RQC . mail_request    AS rq_mailRequest,
                         RQC . mail_services   AS rq_mailService,
                         RQC . mail_admin      AS rq_mailAdmin")->from("tb_tickets_2 TK");
		$this->db->join('tb_statusticket  STK   ' , 'STK.idStatus = TK.idStatusTicketKf' , 'left');
		$this->db->join('tb_typeticket    TTK   ' , 'TTK.idTypeTicket = TK.idTypeTicketKf ' , 'left');
		$this->db->join('tb_type_delivery TYD   ' , 'TYD.idTypeDelivery = TK.idTypeDeliveryKf ' , 'left');
		$this->db->join('tb_pick_receive  TYR   ' , 'TYR.idWhoPickUp = TK.idWhoPickUp ' , 'left');
		$this->db->join('tb_user          SYSU  ' , 'SYSU.idUser  = TK.idUserAdminKf' , 'left');
		$this->db->join('tb_user          UO    ' , 'UO.idUser  = TK.idOWnerKf' , 'left');
		$this->db->join('tb_user          UT    ' , 'UT.idUser  = TK.idUserTenantKf' , 'left');
		$this->db->join('tb_user          UENT  ' , 'UENT.idUser  = TK.idUserCompany' , 'left');
		$this->db->join('tb_user          UADMC ' , 'UADMC.idUser  = TK.idUserEnterpriceKf' , 'left');
		$this->db->join('tb_user          UATT  ' , 'UATT.idUser = TK.idUserAttendantKf ' , 'left');
		$this->db->join('tb_user          UATTD ' , 'UATTD.idUser = TK.idUserAttendantKfDelivery' , 'left');
		$this->db->join('tb_type_outher   TYOU  ' , 'TYOU.idTypeOuther = TK.idTypeOuther' , 'left');
		$this->db->join('tb_clients        RQA   ' , 'RQA.idClient = TK.idAdressKf' , 'left');
		$this->db->join('tb_client_departament    RQD   ' , 'RQD.idClientDepartament = TK.idDepartmentKf' , 'left');
		$this->db->join('tb_user          UON   ' , 'UON.idUser  = RQD.idUserKf' , 'left');
		//$this->db->join('tb_company       RQC   ', 'RQC.idCompany = TK.idCompanyKf', 'left');
		$this->db->join('tb_profile       SYSP  ' , 'SYSU.idProfileKf = SYSP.idProfile' , 'left');
		$this->db->join('tb_profile       PUO   ' , 'UO.idProfileKf = PUO.idProfile' , 'left');
		$this->db->join('tb_profile       PUT   ' , 'UT.idProfileKf = PUT.idProfile' , 'left');
		$this->db->join('tb_profile       PADMC ' , 'UADMC.idProfileKf = PADMC.idProfile ' , 'left');
		$this->db->join('tb_profile       PUATT ' , 'UATT.idProfileKf = PUATT.idProfile' , 'left');
		$this->db->join('tb_profile       PUATTD' , 'UATTD.idProfileKf = PUATTD.idProfile' , 'left');
		$this->db->join('tb_profile       PENT  ' , 'UENT.idProfileKf = PENT.idProfile ' , 'left');
		$quuery = $this->db->where("TK . urlToken = " , $token)->get();


		if ($quuery->num_rows() > 0){
			return $quuery->result_array();
		}
		return null;

	}

	/* LISTADO DE FILTROS */
	public function getFilterForm()
	{

		$reason_disabled_item = null;
		$typedelivery         = null;
		$typeouther           = null;
		$typeticket           = null;
		$tipeOpcion           = null;
		$statusticket         = null;
		/* LISTADO  */
		$query = $this->db->select(" * ")->from("tb_reason_disabled_item")->get();
		if ($query->num_rows() > 0){
			$reason_disabled_item = $query->result_array();
		}


		/* LISTADO DE TIPOS DE ENVIOS */
		$query = $this->db->select(" * ")->from("tb_type_delivery")->get();
		if ($query->num_rows() > 0){
			$typedelivery = $query->result_array();
		}
		/* LISTADO DE TIPOS DE SERVICIOS */
		$query = $this->db->select(" * ")->from("tb_type_services")->get();
		if ($query->num_rows() > 0){
			$typeservices = $query->result_array();
		}
		/* LISTADO DE TIPOS DE CONSULTAS */
		$query = $this->db->select(" * ")->from("tb_type_outher")->get();
		if ($query->num_rows() > 0){
			$typeouther = $query->result_array();
		}
		/* LISTADO DE TIPOS DE ENCARGADOS */
		$query = $this->db->select(" * ")->from("tb_type_attendant")->get();
		if ($query->num_rows() > 0){
			$typeattendant = $query->result_array();
		}

		/* LISTADO DE TIPOS DE TICKETS*/
		$query = $this->db->select(" * ")->from("tb_typeticket")->get();
		if ($query->num_rows() > 0){
			$typeticket = $query->result_array();
		}


		/* LISTADO */
		$query = $this->db->select(" * ")->from("tb_opcion_low")->get();
		if ($query->num_rows() > 0){
			$tipeOpcion = $query->result_array();
		}

		/* LISTADO DE ESTATUS DE TICKETS */
		$query = $this->db->select(" * ")->from("tb_statusticket")->get();
		if ($query->num_rows() > 0){
			$statusticket = $query->result_array();
		}

		$filter = array(
			'reason_disabled_item' => $reason_disabled_item ,
			'typedelivery' => $typedelivery ,
			'typeservices' => $typeservices ,
			'typeouther' => $typeouther ,
			'typeticket' => $typeticket ,
			'tipeOpcion' => $tipeOpcion ,
			'statusticket' => $statusticket

		);

		return $filter;
	}

	/* LISTADO DE TICKET CON CAMBIOS APROBADOS / NO APROBADOS */
	public function getTickets2Check($id)
	{
		$tickets_all = null;
		/* LISTADO DE DATOS TEMPORALES DE ENVIO O CANCELACION */
		$this->db->select(" * ")->from("tb_tickets_2 as ticket");
		$this->db->join('tb_tmp_delivery_data as tmp' , 'tmp.tmp_idTicketKf = ticket.idTicket' , 'left');
		$query = $this->db->where("ticket . idTicket = tmp . tmp_idTicketKf AND tmp . tmp_isChOrCancelApplied is null AND ((ticket . isCancelRequested = 1 AND ticket . idUserCancelTicket is null AND tmp . tmp_isCancelApproved = " . $id . ") OR (ticket . isChangeDeliverylRequested = 1 AND ticket . idUserHasChangeTicket is null AND tmp . tmp_isChApproved = " . $id . "))" , NULL , FALSE)->get();
		if ($query->num_rows() > 0){
			$tickets_all = $query->result_array();
		} else {
			$tickets_all = null;
		}
		$results = array(
			'tickets_all' => $tickets_all

		);

		return $results;
	}

	/* INDICA CAMBIO APLICADO SOBRE UN TICKET */
	public function changeApplied($id , $value)
	{
		$this->db->set(
			array(
				'tmp_isChOrCancelApplied' => $value ,
			)
		)->where("idTmpDeliveryData" , $id)->update("tb_tmp_delivery_data");


		if ($this->db->affected_rows()===1){
			return true;
		} else {
			return false;
		}
	}

	/* LISTADI DE TIPOS DE ENCARGADOS  */
	public function getTypeAttendant()
	{

		$typeAtendant = null;


		/* LISTADO DE CONDICIONES DE IVA */
		$query = $this->db->select(" * ")->from("tb_type_attendant")->order_by("tb_type_attendant . nameTypeAttendant" , "DESC")->get();
		if ($query->num_rows() > 0){
			$typeAtendant = $query->result_array();
		}


		return $typeAtendant;
	}


	/* VERIFICAR SI UN PROPIETARIO O INQUILINO POSEE UN TICKET SIN FINALIZAR  */
	public function verificateTicketByidUser($id)
	{

		$rs = null;

		$where = "NOT(idStatusTicketKf = '-1' OR idStatusTicketKf = '1' OR idStatusTicketKf = '6')";
		$query = $this->db->select(" * ")->from("tb_tickets_2")
			->where($where)->get();
		if ($query->num_rows() > 0){
			$rs = $query->num_rows();
		}


		return $rs;
	}

	/* VERIFICAR SI UN TICKET PUEDE SER CANCELADO  */
	public function verificateTicketBeforeCancel($id)
	{

		$rs = null;

		$where = "(SA_NRO_ORDER is null OR SA_NRO_ORDER = '') AND idStatusTicketKf <= '3' AND idTicket = $id";
		$query = $this->db->select(" * ")->from("tb_tickets_2")
			->where($where)->get();
		if ($query->num_rows() > 0){
			$rs = $query->num_rows();
		} else {
			$rs = 0;
		}


		return $rs;
	}

	public function addTmpDeliveryOrCancelData($ticket)
	{
		/* CREAMOS */
		$this->db->insert('tb_tmp_delivery_data' , array(
				'tmp_idTicketKf' => @$ticket['idTicketKf'] ,
				'tmp_idUserRequestChOrCancel' => @$ticket['idUserRequestChOrCancel'] ,
				'tmp_idTypeDeliveryKf' => @$ticket['idTypeDeliveryKf'] ,
				'tmp_idWhoPickUpKf' => @$ticket['idWhoPickUpKf'] ,
				'tmp_idUserAttendantKfDelivery' => @$ticket['idUserAttendantKfDelivery'] ,
				'tmp_thirdPersonNames' => @$ticket['thirdPersonNames'] ,
				'tmp_thirdPersonPhone' => @$ticket['thirdPersonPhone'] ,
				'tmp_thirdPersonId' => @$ticket['thirdPersonId'] ,
				'totalService' => @$ticket['totalService'] ,
				'totalGestion' => @$ticket['totalGestion'] ,
				'totalLlave' => @$ticket['totalLlave'] ,
				'totalEnvio' => @$ticket['totalEnvio'] ,
				'tmp_reasonForCancelTicket' => @$ticket['reasonForCancelTicket']
			)
		);
		if ($this->db->affected_rows()===1){
			return true;
		} else {
			return false;
		}
	}

    public function getTypeDelivery() {
        $quuery = null;
        $rs = null;

        $quuery =  $this->db->select("*")->from("tb_type_delivery")->get();
        if ($quuery->num_rows() > 0) {
            $rs = $quuery->result_array();
            return $rs;
        }
            return null;
     }

	 public function getStatusTicket() {

        $query = null;
        $rs    = null;

        $query = $this->db->select("*")->from("tb_statusticket")
            ->get();
        if ($query->num_rows() > 0) {
            $rs = $query->result_array();
        }

        return $rs;
    }
	public function getTypeTickets() {

        $query = null;
        $rs    = null;

        $query = $this->db->select("*")->from("tb_typeticket")
            ->get();
        if ($query->num_rows() > 0) {
            $rs = $query->result_array();
        }

        return $rs;
    }
	public function getPyamentsType() {

        $query = null;
        $rs    = null;

        $query = $this->db->select("*")->from("tb_ticket_payment_type")
            ->get();
        if ($query->num_rows() > 0) {
            $rs = $query->result_array();
        }

        return $rs;
    }
}
?>
