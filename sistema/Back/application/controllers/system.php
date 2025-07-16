<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Backup extends CI_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->dbutil();
    }

    public function clean_old_logs($days = 30)
    {
        $log_path = APPPATH . 'logs/';
        $files = scandir($log_path);
        $now = time();

        foreach ($files as $file) {
            $full_path = $log_path . $file;
            if (is_file($full_path) && strpos($file, 'log-') === 0) {
                $file_time = filemtime($full_path);
                if ($now - $file_time > ($days * 86400)) {
                    unlink($full_path); // eliminar si es más viejo que X días
                }
            }
        }
    }
}