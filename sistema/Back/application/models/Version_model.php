<?php if (! defined('BASEPATH')) 
    exit('No direct script access allowed');

class Version_model extends CI_Model {
    public function __construct() {
        parent::__construct();
    }
    public function get_versions() {
        $main_app_path = realpath(APPPATH . '../../');
        $crt_path = realpath(APPPATH . '../../controllers');
        $svc_path = realpath(APPPATH . '../../common/services');
        // List of JavaScript files to monitor
        $files = [
            'sysApp'        => $main_app_path . '/sysApp.js',
            'tokenSystem'   => $svc_path . '/tokenSystem.js',
            'sUsers'        => $svc_path . '/sUsers.js',
            'sTickets'      => $svc_path . '/sTickets.js',
            'sAddress'      => $svc_path . '/sAddress.js',
            'sDepartments'  => $svc_path . '/sDepartments.js',
            'mailServices'  => $svc_path . '/mailServices.js',
            'sProfiles'     => $svc_path . '/sProfiles.js',
            'sProducts'     => $svc_path . '/sProducts.js',
            'sCustomers'    => $svc_path . '/sCustomers.js',
            'sUtilities'    => $svc_path . '/sUtilities.js',
            'sPagination'   => $svc_path . '/sPagination.js',
            'sServices'     => $svc_path . '/sServices.js',
            'sContracts'    => $svc_path . '/sContracts.js',
            'sKeys'         => $svc_path . '/sKeys.js',
            'CtrlMenu'      => $crt_path . '/TASSCtrlMenu.js',
            'CtrlMonitor'   => $crt_path . '/TASSCtrlMonitor.js',
            'CtrlProducts'  => $crt_path . '/TASSCtrlProducts.js',
            'CtrlKeys'      => $crt_path . '/TASSCtrlKeys.js',
            'CtrlTech'      => $crt_path . '/TASSCtrlTech.js',
            'CtrlCustomers' => $crt_path . '/TASSCtrlCustomers.js',
            'CtrlStatus'    => $crt_path . '/TASSCtrlStatus.js',
            'CtrlInfo'      => $crt_path . '/BSSCtrlInfo.js',
            'CtrlValidate'  => $crt_path . '/BSSCtrlValidate.js',
            'CtrlApprovals' => $crt_path . '/TASSCtrlApprovals.js',
            'CtrlServices'  => $crt_path . '/TASSCtrlServices.js',
            'CtrlUsers'     => $crt_path . '/TASSCtrlUsers.js',
            'CtrlBuildings' => $crt_path . '/TASSCtrlBuildings.js',
            'CtrlTickets'   => $crt_path . '/TASSCtrlTickets.js',
            'CtrlSystem'    => $crt_path . '/TASSCtrlSystem.js',
            'CtrlLogin'     => $crt_path . '/TASSCtrlLogin.js',
            'CtrlLogout'    => $crt_path . '/BSSCtrlLogout.js',
            'CtrlRegister'  => $crt_path . '/TASSCtrlRegister.js',
            'CtrlforgotPwd' => $crt_path . '/TASSCtrlforgotPwd.js',
            'CtrlNewPwd'    => $crt_path . '/TASSCtrlNewPwd.js',
        ];

        $versions = [];

        foreach ($files as $key => $path) {
            //print_r($path."\n");
            if (file_exists($path)) {
                $versions[$key] = md5_file($path); // Generate the hash
            } else {
                $versions[$key] = null; // File not found
            }
        }
        
        // Return all file versions
       /*return $this->output
             ->set_content_type('application/json')
             ->set_output(json_encode($versions));*/
       return $versions;
    }
}