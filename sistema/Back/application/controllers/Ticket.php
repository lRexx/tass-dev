<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
require APPPATH . '/libraries/REST_Controller.php';

class Ticket extends REST_Controller {

	public  function __construct()
 	{
 		parent::__construct();
 		$this->load->model('ticket_model');
 	}

 	/* SERVICIO QUE CREA UN TICKET */
	public function index_post()
	{

		$rs = $this->ticket_model->add($this->post('ticket'));        
                if(!is_null($rs))
                {
                	$this->response(array('response' => $rs),200);
                }
                else
                {
                	$this->response(array('error' => "ERROR INESPERADO"),500);
                }
               
    }
    
    /* SERVICIO QUE CANCELA UN TICKET */
    public function cancel_get($id, $idU, $reasonForCancelTicket) {
        if (!$id) {
            $this->response(NULL, 404);
        }

        $rs = null;
        $rs = $this->ticket_model->cancel($id, $idU, $reasonForCancelTicket);

        if (!is_null($rs)) {
            $this->response($rs, 200);
        } else {
            $this->response(array('error' => 'NO HAY RESULTADOS'), 404);
        }
    }
    public function cancelTicket_post() {

        $rs = $this->ticket_model->cancelTicket($this->post('ticket'));
        if (!is_null($rs)) {
            $this->response("Cancelado", 200);
        } else {
            $this->response(array('error' => 'NO HAY RESULTADOS'), 404);
        }
    }
    /* SERVICIO SOLICITAR LA CANCELACION DE UN TICKET */
    public function requestCancel_get($id) {
        if (!$id) {
            $this->response(NULL, 404);
        }

        $rs = null;
        $rs = $this->ticket_model->requestCancel($id);

        if (!is_null($rs)) {
            $this->response($rs, 200);
        } else {
            $this->response(array('error' => 'NO HAY RESULTADOS'), 404);
        }
    }
    /* SERVICIO CAMBIAR STATUS DE UN TICKET */
    public function changueStatus_get($id, $idStatus) {
        if (!$id) {
            $this->response(NULL, 404);
        }

        $rs = null;
        $rs = $this->ticket_model->changueStatus($id, $idStatus);

        if (!is_null($rs)) {
            $this->response($rs, 200);
        } else {
            $this->response(array('error' => 'NO HAY RESULTADOS'), 404);
        }
    }
    /* SERVICIO retorna el detalle de   UN ticket POR ID */
    public function find_get($id) {
        if (!$id) {
            $this->response(NULL, 404);
        }

        $rs = null;
        $rs = $this->ticket_model->find($id);

        if (!is_null($rs)) {
            $this->response($rs, 200);
        } else {
            $this->response(array('error' => 'NO HAY RESULTADOS'), 404);
        }
    }

     /* APRUEBA TICKET */
     public function aprobated_get($id, $idU) {
        if (!$id || !$idU) {
            $this->response(NULL, 404);
        }

        $rs = null;
        $rs = $this->ticket_model->aprobated($id, $idU);

        if (!is_null($rs)) {
            $this->response($rs, 200);
        } else {
            $this->response(array('error' => 'NO HAY RESULTADOS'), 404);
        }
    }

    public function verificateTicketByIdUser_get($id) {
        if (!$id) {
            $this->response(NULL, 404);
        }

        $rs = null;
        $rs = $this->ticket_model->verificateTicketByidUser($id);

        if (!is_null($rs)) {
            $this->response($rs, 200);
        } else {
            $this->response(array('error' => 'NO HAY RESULTADOS'), 404);
        }
    }
    public function verificateTicketBeforeCancel_get($id) {
        if (!$id) {
            $this->response(NULL, 404);
        }

        $rs = null;
        $rs = $this->ticket_model->verificateTicketBeforeCancel($id);

        if (!is_null($rs)) {
            $this->response($rs, 200);
        } else {
            $this->response(array('error' => 'NO HAY RESULTADOS'), 404);
        }
    }





         /* SERVICIO GET QUE OBTIENE TODO LOS TIKECT REGISTRADOS */
            public function all_post() {

                $filiter = $this->post();
                //print_r($filiter);
                $rs = $this->ticket_model->get(null,$filiter);        
                if(!is_null($rs))
                {
                        $this->response(array('response' => $rs),200);
                }
                else
                {
                    $this->response(array('error' => 'NO HAY RESULTADOS'), 404);
                }
            }


            /* SERVICIO GET QUE OBTIENE TODO LOS USUARIOS REGISTRADOS */
            public function filter_get() {

                $filter = $this->ticket_model->getFilterForm();
                if (!is_null($filter)) {
                    $this->response($filter, 200);
                } else {
                    $this->response(array('error' => 'NO HAY RESULTADOS'), 404);
                }
            }

            /* SERVICIO GET QUE OBTIENE TODO LOS TICKETS REGISTRADOS CON CHANGES OR CANCEL */
            public function getTickets2Check_get($id) {

                $results = $this->ticket_model->getTickets2Check($id);
                if (!is_null($results)) {
                    $this->response($results, 200);
                } else {
                    $this->response(array('error' => 'NO HAY RESULTADOS'), 404);
                }
            }
             /* INDICA CAMBIO APLICADO SOBRE UN TICKET */
             public function changeApplied_get($id, $value) {
                if (!$id) {
                    $this->response(NULL, 404);
                }

                $rs = null;
                $rs = $this->ticket_model->changeApplied($id, $value);

                if (!is_null($rs)) {
                    $this->response($rs, 200);
                } else {
                    $this->response(array('error' => 'NO HAY RESULTADOS'), 404);
                }
            }

            /* SERVICIO GET QUE RESETEA LOS VALORES CUANDO UN CAMBIO O CANCELACION SON RECHAZADOS */
            public function rejectedChOrCanTicket_get($id, $typeValue) {

                $results = $this->ticket_model->rejectedChOrCanTicket($id, $typeValue);
                if (!is_null($results)) {
                    $this->response($results, 200);
                } else {
                    $this->response(array('error' => 'NO HAY RESULTADOS'), 404);
                }
            }

             /* SERVICIO GET QUE OBTIENE TODO LOS USUARIOS REGISTRADOS */
             public function typeAttendant_get() {

                $filter = $this->ticket_model->getTypeAttendant();
                if (!is_null($filter)) {
                    $this->response($filter, 200);
                } else {
                    $this->response(array('error' => 'NO HAY RESULTADOS'), 404);
                }
            }

            public function update_post() {

                $rs = $this->ticket_model->update($this->post('ticket'));
                if (!is_null($rs)) {
                    $this->response("Actualizado", 200);
                } else {
                    $this->response(array('error' => 'NO HAY RESULTADOS'), 404);
                }
            }
            public function updateTmpTicket_post() {

                $rs = $this->ticket_model->updateTmpTicket($this->post('ticket'));
                if (!is_null($rs)) {
                    $this->response("Datos temporal de envio actualizados", 200);
                } else {
                    $this->response(array('error' => 'NO HAY RESULTADOS'), 404);
                }
            }
            public function ticketById_get($id) {
                
          
                $rs = null;
                $rs = $this->ticket_model->ticketById($id);
      
                if (!is_null($rs)) {
                    $this->response($rs, 200);
                } else {
                  $this->response(array('error' => 'NO HAY RESULTADOS'), 404);
                }
            }
            public function ticketByToken_get($token) {
                
          
                $rs = null;
                $rs = $this->ticket_model->ticketByToken($token);
      
                if (!is_null($rs)) {
                    $this->response($rs, 200);
                } else {
                  $this->response(array('error' => 'NO HAY RESULTADOS'), 404);
                }
            }
            /* SERVICIO QUE CREA UN TEMPORAL DE LA DATA DE ENVIO O CANCELACION DE UN TICKET */
            public function addTmpDeliveryOrCancelData_post()
            {
                $rs = $this->ticket_model->addTmpDeliveryOrCancelData($this->post('ticket'));        
                        if(!is_null($rs))
                        {
                            $this->response(array('response' => $rs),200);
                        }
                        else
                        {
                            $this->response(array('error' => "ERROR INESPERADO"),500);
                        }
                       
            }
			
			
			/** SEND MAIL */
			public function sendMail_post(){
                $mailToV = null;
                $mailToV = $this->post('mailTo');
                if (is_null($mailToV) || $mailToV=='undefined'){
                    $this->response(array('error' => "DATOS INCOMPLETOS", 'code' => "203"),203);
                }else{
    				$rs = $this->mail_model->sendMail($this->post('title'),$this->post('mailTo'),$this->post('body'));
                        if(!is_null($rs))
                        {
                            $this->response(array('response' => $rs, 'code' => "200"),200);
                        }
                        else
                        {
                            $this->response(array('error' => "ERROR INESPERADO", 'code' => "500"),500);
                        }
                }
			}



}
?>
