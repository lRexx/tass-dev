<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Mail_model extends CI_Model
{
	
	public function __construct()
	{
		parent::__construct();
	}

        public function	sendMail($title,$to,$body, $subject)
        {
          $param = $this->getMailSmtp();
    			 //TASS
    			$config = array(
                    'protocol' => 'smtp',
                    'smtp_host' => 'coferba.com.ar',
                    'smtp_user' => $param['0']['value'], 
                    'smtp_pass' => $param['1']['value'], 
                    'smtp_port' => '465',
                    'mailtype' => 'html',
                    'wordwrap' => TRUE,
                    'charset' => 'utf-8',
                    'smtp_timeout' => 30,
                    'smtp_crypto'  => 'ssl'
    			);
    			 //LOCAL
    			#$config = array(
    			#	'protocol'  => 'smtp',
    			#	'smtp_host' => 'ssl://smtp.googlemail.com',
    			#	'smtp_port' => 465,
    			#	'smtp_user' => 'rexx84@gmail.com',
    			#	'smtp_pass' => 'Sofia.1407',
    			#	'mailtype'  => 'html',
    			#	'charset'   => 'utf-8'
    			#);

            $this->load->library('email', $config);
            $this->email->set_newline("\r\n");
            $this->email->from($param['0']['value']);
            $this->email->subject($subject);


            $body = "
            <!DOCTYPE html>
            <html lang='es'>
            <head>
            </head>
            <body style='  text-align: center;'>
           <img width='100%' src='https://win-social.com/img/Asset_1.png'>
           <br>

           <br>
            <div style=' 
            margin-left:auto;
            margin-right:auto;
            font-size: 22px;
            color: #656464;
            font-family: sans-serif;
            text-align: justify;'>
           ".$body."
           </div>
           <br>
            <img width='100%' src='https://win-social.com/img/Asset_2.png'> 
            </body>
            </html>";

            /**
             * <img src='https://win-social.com/win_page/img/Asset_1.png'> 
            <div>
            ".$body."
            </div>
             */
          
            $this->email->message($body);
            $this->email->to($to);
		        $this->email->send();

				
			      $r = $this->email->print_debugger();
			
				    return "Enviado";
            return $r; 
            }


            //Get the main parameter of the system mail stored in the DB
            private function getMailSmtp()
            {
                $param = null;
                
                
                        $query =  $this->db->select("*")->from("tb_sys_param")->get();
                        if ($query->num_rows() > 0) {
                            $param = $query->result_array();
                        }
                        return $param;
            }
        
    }
    ?>
