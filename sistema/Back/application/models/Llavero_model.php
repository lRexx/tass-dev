<?php if (!defined('BASEPATH')) exit('No direct script access allowed');
require_once APPPATH . "third_party/PHPExcel/PHPExcel.php";
require_once APPPATH . "third_party/PHPExcel/PHPExcel/IOFactory.php";

class Llavero_model extends CI_Model
{

	public function __construct()
	{
		parent::__construct();
//		$this->load->library('excel');

	}


	public function get()
	{
		$quuery = null;
		$rs = null;

		$quuery = $this->db->select("*")->from("tb_keychain")->get();


		if ($quuery->num_rows() > 0) {
			$rs = $quuery->result_array();
			return $rs;
		}
		return null;
	}

	public function find_by_code($code)
	{
		$quuery = null;
		$rs = null;

		$quuery = $this->db->select("*")->from("tb_keychain")->where('codigo', $code)->get();

		if ($quuery->num_rows() > 0) {
			$rs = $quuery->result_array()[0];
			return $rs;
		}
		return null;
	}

	public function getByDeparment($idDepartmenKf = null)
	{
		if (is_null($idDepartmenKf)) {
			$this->response(null, 404);
		}
		$quuery = null;
		$rs = null;

		$quuery = $this->db->select("*")->from("tb_keychain")->where('idDepartmenKf', $idDepartmenKf)->get();

		if ($quuery->num_rows() > 0) {
			$rs = $quuery->result_array();
			return $rs;
		}
		return null;
	}

	public function add($items, $is_multiple = true)
	{
		$errors_multiple = null;
		if ($is_multiple) {
			for ($i = 0; $i < count($items['departamento']); $i++) {
				if (!is_null($this->find_by_code($items['codigo'][$i]))) {
					$errors_multiple[] = $items['codigo'][$i];
				} else {
					$this->db->insert('tb_keychain', [
							"dptoContact" => $items['departamento'][$i],
							"cantKeyChain" => $items['cantidad'][$i],
							"idProductKf" => $items['tipo'][$i],
							"modelo" => $items['modelo'][$i],
							"codigo" => $items['codigo'][$i],
//					"idDepartmenKf" => $item['']
						]
					);
				}
			}
			if (!is_null($errors_multiple) > 0) {
				return $errors_multiple;
			}
		} else {
			if (!is_null($this->find_by_code($items['codigo']))) {
				return 2;
			} else {
				$this->db->insert('tb_keychain', [
						"dptoContact" => $items['dptoContact'],
						"cantKeyChain" => $items['cantKeyChain'],
						"idProductKf" => $items['idProductKf'],
						"modelo" => $items['modelo'],
						"codigo" => $items['codigo'],
						"idDepartmenKf" => $items['idDepartmenKf']
					]
				);
			}

		}

		if ($this->db->affected_rows() === 1) {
			return 1;
		} else {
			return 0;
		}

	}

	public function edit($item)
	{
		$quuery = $this->db->select("*")->from("tb_keychain")->where("idKeychain", $item['idKeychain'])->get();
		if ($quuery->num_rows() > 0) {
			$this->db->set(
				[
					"dptoContact" => $item['dptoContact'],
					"cantKeyChain" => $item['cantKeyChain'],
					"idProductKf" => $item['idProductKf'],
					"modelo" => $item['modelo'],
					"codigo" => $item['codigo'],
					"idDepartmenKf" => $item['idDepartmenKf']
				]
			)->where("idKeychain", $item['idKeychain'])->update("tb_keychain");

			if ($this->db->affected_rows() === 1) {
				return 1;
			} else {
				return 0;
			}
		} else {
			return 3;
		}
	}

	public function addVarios($file)
	{ //recibe excel y lo decodifica

		$uploaddir = 'uploads/';
		$path = $_FILES['excel']['name'];
		$ext = pathinfo($path, PATHINFO_EXTENSION);
		$user_img = time() . rand() . '.' . $ext;
		$uploadfile = $uploaddir . time() . '_' . str_replace(" ", "", $path);
//		$this->response($uploadfile, 200);
		if ($file["excel"]["name"]) {
			move_uploaded_file($file["excel"]["tmp_name"], "$uploadfile");
		}

		$archivo_plantilla = null;
		$ruta = $uploadfile;
		if (!file_exists($ruta)) {
			return "No existe el archivo";
		}
		$objReader = new PHPExcel_Reader_Excel2007();
		$objPHPExcel = new PHPExcel();
		$archivo_valido = false;
		try {
			$inputFileType = PHPExcel_IOFactory::identify($ruta);
			if ($inputFileType == "Excel2007") {
				$archivo_valido = true;
				$objPHPExcel = PHPExcel_IOFactory::load($ruta);
			}
		} catch (Exception $e) {
			echo "Error! no es una plantilla de excel valida<br>";
			$archivo_valido = false;
		}
//$objFecha = new PHPExcel_Shared_Date();
		if ($archivo_valido) {
			$locale = 'es_es';
			$validLocale = PHPExcel_Settings::setLocale($locale);
			if (!$validLocale) {
				echo "Unable to set locale to " . $locale . " - reverting to en_us";
			}
			$dptoContact = null;
			$cantKeyChain = null;
			$tipo = null;
			$modelo = null;
			$codigo = null;
			$a = null;
			$fila = 6; //ajuste de inicio
			$pivote = null;
			$salida = true;
			for ($fila; $salida; $fila++) {
				if (
					$objPHPExcel->getActiveSheet()->getCell('A' . $fila)->getValue() != "" ||
					$objPHPExcel->getActiveSheet()->getCell('B' . $fila)->getValue() != "" ||
					$objPHPExcel->getActiveSheet()->getCell('C' . $fila)->getValue() != "" ||
					$objPHPExcel->getActiveSheet()->getCell('D' . $fila)->getValue() != "" ||
					$objPHPExcel->getActiveSheet()->getCell('E' . $fila)->getValue() != ""
				) {
					if ($objPHPExcel->getActiveSheet()->getCell('A' . $fila)->getValue() != "") {
						$pivote['departamento'] = (string)$objPHPExcel->getActiveSheet()->getCell('A' . $fila)->getValue();
						$pivote['cantidad'] = (string)$objPHPExcel->getActiveSheet()->getCell('B' . $fila)->getValue();
					}
					$a['departamento'][] = $pivote['departamento'];
					$a['cantidad'][] = $pivote['cantidad'];
					$a['tipo'][] = (string)$objPHPExcel->getActiveSheet()->getCell('C' . $fila)->getValue();
					$a['modelo'][] = (string)$objPHPExcel->getActiveSheet()->getCell('D' . $fila)->getValue();
					$a['codigo'][] = (string)$objPHPExcel->getActiveSheet()->getCell('E' . $fila)->getValue();
//					$a['llena'][] = $fila;
				} else {
					if ($objPHPExcel->getActiveSheet()->getCell('A' . ($fila + 1))->getValue() == "" ||
						$objPHPExcel->getActiveSheet()->getCell('B' . ($fila + 1))->getValue() == "" ||
						$objPHPExcel->getActiveSheet()->getCell('C' . ($fila + 1))->getValue() == "" ||
						$objPHPExcel->getActiveSheet()->getCell('D' . ($fila + 1))->getValue() == "" ||
						$objPHPExcel->getActiveSheet()->getCell('E' . ($fila + 1))->getValue() == "") {
						//si hay mas de una fila vacia entonces salgo
						$salida = false;
					}
				}
			}
			return $this->add($a);

		} else {
			echo "Error! no es una plantilla de excel valida<br>";
		}

//		$this->db->insert('tb_keychain', [
//				"dptoContact" => $item['dptoContact'],
//				"cantKeyChain" => $item['cantKeyChain'],
//				"idProductKf" => $item['idProductKf'],
//				"modelo" => $item['modelo'],
//				"codigo" => $item['codigo'],
//				"idDepartmenKf" => $item['idDepartmenKf']
//			]
//		);
//		if ($this->db->affected_rows() === 1) {
//			return 1;
//		} else {
//			return 0;
//		}

	}

}
