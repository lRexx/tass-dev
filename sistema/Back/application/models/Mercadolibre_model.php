<?php if (!defined('BASEPATH'))
	exit('No direct script access allowed');

class Mercadolibre_model extends CI_Model
{

	public function __construct()
	{
		parent::__construct();
		/*TICKET*/ $this->load->model('Ticket_model');
	}

	public function createMPLink($data)
	{	
		$data               = json_decode(json_encode($data));
		$external_reference = $data->idTicket."_".(rand() * 8) . "_" . (time() * 4);
		try {
			$uri = 'https://devtass.sytes.net/mpago/index.php';
			//$uri   = 'https://www.libreando.com.ar/mpago/index.php'; //solo server
			$param = [
				"clienteid" 		 => '8877359900700578' ,
				"clientesecret" 	 => 'al5TAYSIdZPx2lzzU64DFgSX67SDrhsr' ,
				#"Authorization" 	 => "Bearer TEST-8877359900700578-012401-cc12a648254efb51f0c30f4b394955f6-1177407195",
				"currency_id" 		 => "ARG",
				"unit_price" 		 => $data->monto ,
				"id" 				 => $data->idTicket ,
				"title" 			 => $data->ticket_number ,
				//"uri"         	 => "http://localhost:8000/api/v1/addInfoPagoMercadoLibre",
				"notification_url" 	 => $data->linkDeNotificacion ,
				//"uri"           	 => "http://bioonix.com/libreando/libreando/backend/public/api/v1/addInfoPagoMercadoLibre",  //solo server
				"description" 		 => $data->description,
				"quantity" 			 => $data->quantity,
				"external_reference" => $external_reference ,
				"back_url" 			 => $data->back_url ,
			];
			//print_r($param);
			$post_url;
			$headers = [
				'Content-Type: application/json' ,
			];

			$curl = curl_init();
			curl_setopt_array($curl , [
				CURLOPT_URL => $uri ,
				CURLOPT_RETURNTRANSFER => true ,
				CURLOPT_ENCODING => "" ,
				CURLOPT_MAXREDIRS => 10 ,
				CURLOPT_TIMEOUT => 30 ,
				CURLOPT_CUSTOMREQUEST => "POST" ,
				CURLOPT_POSTFIELDS => json_encode($param) ,
				CURLOPT_HTTPHEADER => [
					"accept: application/json" ,
				] ,
			]);

			$response = curl_exec($curl);
			$err      = curl_error($curl);
			curl_close($curl);
			//print_r($response);
			if ($err){
				return json_encode([
					'message' => 'Ha ocurrido un error al registrar el pago, cod err 404' ,
					'status' => 404 ,
					'data' => $err
				]);
			} else {
					$ticketObj = null;
					$ticketObj['history']['idUserKf'] 			= "1";
					$ticketObj['history']['idTicketKf']  		= $data->idTicket;
					$ticketObj['history']['descripcion'] 		= "";
					$ticketObj['history']['idCambiosTicketKf'] 	= "5";
					$this->Ticket_model->addTicketTimeline($ticketObj);
				return json_encode([
					'message' => 'Datos registrados exitosamente' ,
					'status' => 200 ,
					'data' => json_decode($response, true, JSON_UNESCAPED_SLASHES)
				]);
			}
		} catch (\Exception $e) {
			return json_encode([
				'message' => 'Ha ocurrido un error al registrar el pago' ,
				'status' => 404 ,
				'data' => $e
			]);
		}
	}

	public function getPaymentMPDetails($id)
	{	
		$MP_TOKEN="TEST-8877359900700578-012401-cc12a648254efb51f0c30f4b394955f6-1177407195";
		if (!$id) {
           return null;
        }
		try {
			$paymentUpdated = null;
			$uri = "https://api.mercadopago.com/v1/payments/".$id;
			//print_r($id." ");
			//print_r($MP_TOKEN);
			//print($uri.'/'.$id."\n");
			$authorization 	= "Authorization: Bearer " . $MP_TOKEN;
			//print($authorization."\n");
			$headers 		= array("Content-Type: application/json", "Accept: application/json" , $authorization );
			//print_r($headers);
			$curl = curl_init();
			curl_setopt_array($curl , [
				CURLOPT_URL 			=> $uri,
				CURLOPT_RETURNTRANSFER 	=> true ,
				CURLOPT_ENCODING 		=> "charset=utf-8" ,
				CURLOPT_MAXREDIRS 		=> 10 ,
				CURLOPT_TIMEOUT 		=> 30 ,
				CURLOPT_CUSTOMREQUEST 	=> 'GET',
				CURLOPT_SSL_VERIFYPEER 	=> false,
				CURLOPT_SSL_VERIFYHOST 	=> false,
				CURLOPT_HTTPAUTH 		=> 1,
				CURLOPT_VERBOSE 		=> true,
				CURLOPT_STDERR 			=> fopen('curl_mp.log', 'a+'),
				CURLOPT_HTTPHEADER 		=> $headers,
			]);
			//print_r($curl);
			$response  		 = curl_exec($curl);
			$err       		 = curl_error($curl);
			$httpcode  		 = curl_getinfo($curl, CURLINFO_HTTP_CODE);
			$rs_decode 		 = json_decode($response, true, JSON_UNESCAPED_SLASHES);
			$response_decode = json_decode(json_encode($rs_decode));
			curl_close($curl);
			if($httpcode == 200 && $response_decode->status == "approved" && $response_decode->status_detail == "accredited") {
				$lastPaymentAddedQuery = null;
				$lastPaymentAddedQuery = $this->paymentById($response_decode->external_reference);
				$lastPaymentAddedQuery_decode=json_decode(json_encode($lastPaymentAddedQuery[0]));
				//print_r($lastPaymentAddedQuery_decode);
				if (is_null($lastPaymentAddedQuery_decode->mp_payment_id) || $lastPaymentAddedQuery_decode->mp_payment_id == 0){
					//print("El pago no se encuentra registado");
					$dataObj = null;
					$dataObj['data']['collection_status'] 	 = $response_decode->status;
					$dataObj['data']['status_detail'] 	 	 = $response_decode->status_detail;
					$dataObj['data']['payment_id'] 		 	 = $response_decode->id;
					$dataObj['data']['payment_type'] 		 = $response_decode->payment_type_id;
					$dataObj['data']['merchant_order_id'] 	 = $response_decode->order->id;
					$dataObj['data']['site_id'] 			 = "MLA";
					$dataObj['data']['processing_mode'] 	 = $response_decode->processing_mode;
					$dataObj['data']['merchant_account_id']  = $response_decode->merchant_account_id;
					$dataObj['data']['external_reference']   = $response_decode->external_reference;
					$idTicketKf = $lastPaymentAddedQuery_decode->idTicketKf;
					$rsPaymentUpdated = $this->updatePayment($dataObj['data']);
					$ticketObj = null;
					$changeStatusRs=null;
					$ticketObj['history']['idUserKf'] 	 		= "1";
					$ticketObj['history']['idTicketKf']  		= $idTicketKf;
					$ticketObj['history']['descripcion'] 		= "Pago del pedido has sido aprobado y acreditado";
					$ticketObj['history']['idCambiosTicketKf'] 	= "4";
					$changeStatusRs = $this->Ticket_model->changueStatus($idTicketKf,"8");
					$this->Ticket_model->addTicketTimeline($ticketObj);
					if ($changeStatusRs){
						$ticketObj = null;
						$ticketObj['history']['idUserKf'] 			= "1";
						$ticketObj['history']['idTicketKf']  		= $idTicketKf;
						$ticketObj['history']['descripcion'] 		= "";
						$ticketObj['history']['idCambiosTicketKf'] 	= "13";
					}
					$this->Ticket_model->addTicketTimeline($ticketObj);
					if($rsPaymentUpdated){
						$lastPaymentUpdated = null;
						$lastPaymentUpdated = $this->paymentById($response_decode->external_reference);
						$paymentUpdated 	= json_decode(json_encode($lastPaymentUpdated[0]));
					}
				}else{
					$paymentUpdated = "El pago ya se encuentra registado en el sistema.";
				}
				return json_encode([
					'message' 	=> 'Conexion con la API de Mercado Pago Exitosa' ,
					'status' 	=> $httpcode ,
					'data' 		=> $paymentUpdated
				]);
			}else if($httpcode == 200 && ($response_decode->status != "approved" || $response_decode->status_detail != "accredited")) {
				return json_encode([
					'message' 	=> 'Pago no se encuentra aprobado o acreditado, verificar en Mercado Pago.' ,
					'status' 	=> $httpcode ,
					'data' 		=> $response_decode->message,
				]);
			}else if($httpcode == 401) {
				return json_encode([
					'message' 	=> 'Token invalido para autenticar con la API de Mercado Pago' ,
					'status' 	=> $httpcode ,
					'data' 		=> $response_decode->message,
				]);
			}else if($httpcode == 404) {
				return json_encode([
					'message' 	=> $response_decode->message ,
					'status' 	=> $httpcode,
					'data' 		=> $response_decode->error,
				]);
			}
		} catch (\Exception $e) {
			return json_encode([
				'message' 	=> 'Ha ocurrido un error con la API de Mercado Pago' ,
				'status' 	=> $httpcode ,
				'data' 		=> $e
			]);
		}
	}

	public function getNotificationFromMP($response)
	{
		$MP_TOKEN="TEST-8877359900700578-012401-cc12a648254efb51f0c30f4b394955f6-1177407195";
		//var_dump($response['data']);
		// ENVIAMOS EL MAIL DE CONFIRMAR REGISTRO //
		/*MAIL*/
		if($response['type'] != "test"){
			$title = "Webhook Payment Notification from MercadoPago to TASS - [". $response['type']."] - ID:".$response['data']['id'];
			$body = 'Api version: '.$response['api_version'].' <BR>' . 'Action: '.$response['action'].' <BR>' . 'Type: '.$response['type'].' <br>' . 'App ID: '.$response['application_id'].' <br>' . 'Date: '.$response['date_created'].' <br>' . 'Mode: '.$response['live_mode'].' <br>';
			$subject = "Webhook Payment Notification from MercadoPago to TASS - [". $response['type']."] - ID:".$response['data']['id'];
			$this->mail_model->sendMail($title, "rexx84@gmail.com", $body, $subject);
		}else{
			$title = "Webhook Payment Notification from MercadoPago to TASS [TEST] - ID: ".$response['data']['id'];
			$body = 'Api version: '.$response['api_version'].' <BR>' . 'Action: '.$response['action'].' <BR>' . 'Type: '.$response['type'].' <br>' . 'App ID: '.$response['application_id'].' <br>' . 'Date: '.$response['date_created'].' <br>' . 'Mode: '.$response['live_mode'].' <br>';
			$subject = "Webhook Payment Notification from MercadoPago to TASS [TEST] - ID: ".$response['data']['id'];
			$this->mail_model->sendMail($title, "rexx84@gmail.com", $body, $subject);
		}

		
		if ($response['type'] == "test"){
			return true;
		}else{
			$paymentDetails  		= $this->getPaymentMPDetails($response['data']['id']);
			$paymentDetails_final   = json_decode($paymentDetails, true, JSON_UNESCAPED_SLASHES);
			if ($paymentDetails_final['status'] == 200){
				return true;
			}else{
				return null;
			}
			//$lastPaymentAddedQuery = null;
			//$lastPaymentAddedQuery = $this->paymentById($response_decode->external_reference);
			//$lastPaymentAddedQuery_decode=json_decode(json_encode($lastPaymentAddedQuery[0]));
			//if (!is_null($lastPaymentAddedQuery_decode->mp_payment_id)){
			//	print($lastPaymentAddedQuery_decode->mp_payment_id);
			//}
			//$currentURL = $this->get_the_current_url(); //for simple URL

			//return $paymentDetails_final;
		}	
	}

    public function addPayment($data) {
		$idPaymentKf = null;
        $this->db->insert('tb_mp_payments', [
                'mp_preference_id'        => $data['id'],
                'mp_client_id'   		  => $data['client_id'],
                'mp_collector_id'         => $data['collector_id'],
                'mp_date_created'         => $data['date_created'],
                'mp_expires'              => $data['expires'],
                'mp_external_reference'   => $data['external_reference'],
                'mp_prod_init_point'      => $data['init_point'],
                'mp_dev_init_point'       => $data['sandbox_init_point'],
                'mp_operation_type'       => $data['operation_type'],
                'idTicketKf'              => $data['idTicketKf'],

        ]);

		if ($this->db->affected_rows() === 1) {
			$idPaymentKf = $this->db->insert_id();
			$this->db->set(
				array(
					'idPaymentKf' => $idPaymentKf
				)
			)->where("idTicket", $data['idTicketKf'])->update("tb_tickets_2");
			$lastPaymentAddedQuery = null;
			$lastPaymentAddedQuery = $this->paymentById($idPaymentKf);
			return $lastPaymentAddedQuery;
		}else{
			return null;
		}

    }

	public function updatePayment($data) {
		$idPaymentKf = null;
		$lastPaymentUpdatedQuery = null;
		$now        = new DateTime(null , new DateTimeZone('America/Argentina/Buenos_Aires'));
        $this->db->set(
            [
                'mp_collection_status'      => $data['collection_status'],
				'mp_status_detail'      	=> $data['status_detail'],
				'mp_payment_id'				=> $data['payment_id'],
				'mp_payment_type' 			=> $data['payment_type'],
                'mp_merchant_order_id'   	=> $data['merchant_order_id'],
                'mp_site_id'         		=> $data['site_id'],
                'mp_processing_mode'        => $data['processing_mode'],
                'mp_merchant_account_id'    => $data['merchant_account_id'],
				'sys_date_updated'			=> $now->format('Y-m-d H:i:s') ,
			]
		)->where("mp_external_reference", $data['external_reference'])->update("tb_mp_payments");
		if ($this->db->affected_rows() == 1) {
			//$lastPaymentUpdatedQuery = $this->paymentById($data['payment_id']);
			return true;
		}else{
			return null;
		}

    }

	/* GET PAYMENT BY ID */
	public function paymentById($id)
	{
		$query = null;
		$rs     = null;

		$this->db->select("*")->from("tb_mp_payments");
		$this->db->where("idPayment = " , $id);
		$this->db->or_where("mp_preference_id", $id);
		$this->db->or_where("mp_external_reference", $id);
		$query = $this->db->get();

		if ($query->num_rows() > 0){
			$rs = $query->result_array();
			return $rs;
		}else{
			return null;
		}
		
	}

}

?>
