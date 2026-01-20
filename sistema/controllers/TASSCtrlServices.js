/**
* Services Controller
**/
var services = angular.module("module.Services", ["tokenSystem", "services.Customers", "services.Address", "ui.select", "services.Utilities", "services.Service", "services.Contracts", "services.Products", "services.User", "services.Keys",]);
services.directive('moveToList', function() {
    return {
      restrict: 'A',
      link: function(scope, element, attribute) {
        element.bind('keydown', function(event) {
          var keycodes = [13, 40]
          if (keycodes.indexOf(event.keyCode) > -1) {
            event.stopPropagation();
            event.preventDefault();
            // On press of 'Down arrow' key
            if (event.keyCode == 40 || event.keyCode == 13) {
              scope.$apply();
              angular.element(scope.listItemsSelector).eq(0).trigger('focus');
            }
          }
        });
      },
      scope: {
        inputSelector: '=',
        listItemsSelector: '='
      }
    }
});
services.directive('navigateListItems', function() {
return {
    restrict: 'A',
    link: function(scope, element, attribute) {
    function moveBackToInput() {
        angular.element(scope.inputSelector).trigger('focus');
        scope.$apply();
    }

    element.bind('keydown', function(event) {
        var keycodes = [9, 13, 27, 38, 40];
        if (keycodes.indexOf(event.keyCode) > -1) {
        event.stopPropagation();
        event.preventDefault();
        // On press of 'Esc' key
        if (event.keyCode == 27) {
            moveBackToInput();
        }
        var items = angular.element(scope.listItemsSelector);
        navigateItems(scope, event, element, items);
        }
    });
    },
    scope: {
    inputSelector: '=',
    listItemsSelector: '='
    }
}

function navigateItems(scope, e, current, items) {
    var index = items.index(angular.element(current));
    //console.log(current);
    //console.log(index);
    // On press of 'Tab' and 'Down arrow' key
    if (event.keyCode == 38) {
    index = index - 1;
    if (index >= 0) {
        items.eq(index).trigger('focus');
    }else{
        angular.element(scope.inputSelector).trigger('focus');
        scope.$apply();
    }
    }
    // On press of 'Shift Tab' and 'Up arrow' key
    else if (event.keyCode == 40) {
    index = index + 1;
    //console.log("index: "+index);
    //console.log("items: "+items.length);
    if (index < items.length) {
        //console.log(items.eq(index).trigger('focus'));
        items.eq(index).trigger('focus');
    }else{
        items.eq(0).trigger('focus');
    }
    }
}
});
services.filter('toDate', function() {
    return function(input) {
        if (!input) return input;
        console.log(input);
        var regex = /^\d{2}\/\d{2}\/\d{4}$/;
        if (! regex.test(input)) {
            var date = new Date(input);
            // Obtener los componentes de la fecha
            var day = date.getDate();
            var month = date.getMonth() + 1; // Los meses son 0-indexados
            var year = date.getFullYear();

            // Formatear el día y el mes con dos dígitos
            day = day < 10 ? '0' + day : day;
            month = month < 10 ? '0' + month : month;
        }else{
            // Dividir la fecha por '/'
            var parts = input.split('/');

            // Extraer día, mes y año (el mes se resta en 1 porque los meses son 0-indexados)
            var day = parseInt(parts[0], 10);
            var month = parseInt(parts[1], 10);
            var year = parseInt(parts[2], 10);

            // Crear y devolver el objeto Date
            var date =
            console
        }
    };
});
services.controller('ServicesCtrl', function($scope, $location, $q, DateService, uibDateParser, $routeParams, blockUI, $timeout, inform, serviceServices, CustomerServices, ContractServices, addressServices, KeysServices, $filter, ProductsServices, userServices, tokenSystem, $window, serverHost, UtilitiesServices, APP_SYS, BSS, BSS_FONT){
    console.log(APP_SYS.app_name+" Modulo Services");
    if (!$scope.sysToken || !$scope.sysLoggedUser ){
        $location.path("/login");
    }


    const sysDate = new Date();
    const fullSysDate = sysDate.toLocaleString('es-AR', { day: 'numeric', month: 'numeric', year:'numeric' });
    //console.log(newDate);
    //$scope.localDate = DateService.createDateInTimeZone(dateStr, APP_SYS.timezone);
    //console.log($scope.localDate);
    //currentMoney.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' });
    const sysYear  = sysDate.toLocaleString('es-AR', { year: 'numeric'}).toString().substr(2,2);
    const sysMonth = sysDate.toLocaleString('es-AR', { month: 'numeric'});
    const sysDay   = sysDate.toLocaleString('es-AR', { day: 'numeric'});
    const regexProtocol = /^(https?:\/\/)/;
    const regexPort = /:(\d+)$/;
    $scope.customerSearch={'searchFilter':'', 'typeClient':'', 'isInDebt':false, 'isStockInBuilding': false, 'isStockInOffice': false, 'strict':false};
    $scope.getSelectedCustomerData = tokenSystem.getTokenStorage(7);
    $scope.formats = ['dd-MM-yyyy', 'dd/MM/yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[2];
    $scope.inputTokenCode = "";
    $scope.tmpVars ={};
    $scope.service = {
        'customer':{},
        'list':{'zones':{}},
        'new':{'isHasLockingScrew':'0','numbOfLicenceRemains':'', 'numbOfLicenceSet':'', 'people':{}},
        'users':{'fullName':'','emailUser':'', 'phone':'', 'idOS':'', 'profileUser':'', 'sysUser':{'selected':undefined}},
        'update':{'idServiceAsociateFk':[]},
        'serviceItems':{},
        'tipo_conexion_remoto':[{}],
        'dvr':{'selected':undefined},
        'batteries':{'selected':undefined},
        'cameras':{'selected':undefined},
        'modem':{'selected':undefined},
        'router':{'selected':undefined},
        'crtlAccess':{'selected':undefined},
        'lockedIt':{'selected':undefined},
        'lockedIt2':{'selected':undefined},
        'entranceReader':{'selected':undefined},
        'powerSupply':{'selected':undefined},
        'exitReader':{'selected':undefined},
        'emergencyButton':{'selected':undefined},
        'TurnOffKey':{'selected':undefined},
        'alarmPanel':{'selected':undefined},
        'alarmKeyboard':{'selected':undefined},
        'sysUser':{'selected':undefined},
        'sensor':{'selected':undefined},
        'adicional':{},
        'aditional_alarm':{'sysUser':{'selected':undefined}}
    };
    $scope.contract = {
        'new':{},
        'update':{},
        'info':{},
        'select':{'main':{},'date':{}, 'codes':{}}
    };
    $scope.skipTicketValidationTmp = false;
    $scope.skipTicketValidation = false;
    $scope.contractSelected={};
    $scope.open_start_date = function() {
        $scope.popup_start_date.opened = true;
      };
      $scope.popup_start_date = {
        opened: false
      };
      $scope.open_end_date = function() {
        $scope.popup_end_date.opened = true;
      };
      $scope.popup_end_date = {
        opened: false
      };
      $scope.open_serviceProductExpDate = function() {
        $scope.popup_serviceProductExpDate.opened = true;
      };
      $scope.popup_serviceProductExpDate = {
        opened: false
      };
      $scope.open1 = function() {
        $scope.popup1.opened = true;
      };
      $scope.popup1 = {
        opened: false
      };
      $scope.open4 = function() {
        $scope.popup4.opened = true;
      };
      $scope.popup4 = {
        opened: false
      };
      $scope.open5 = function() {
        $scope.popup5.opened = true;
      };
      $scope.popup5 = {
        opened: false
      };
     $scope.open_activation_date = function() {
        $scope.popup_activation_date.opened = true;
      };
      $scope.popup_activation_date = {
        opened: false
      };
      $scope.events =
        {
          status: 'full'
        };
    $scope.events =
    {
      status: 'full'
    };
    $scope.select = {'filterTypeOfClient': {}, 'filterCustomerIdFk':{'selected':undefined}};
    $scope.customerSearch={'name':'','searchFilter':'', 'typeClient':'', 'isInDebt':false, 'isStockInBuilding': false, 'isStockInOffice': false, 'strict':false};
    /*DATE PICKER*/
    $scope.formats = ['dd-MM-yyyy', 'dd/MM/yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[1];
    $scope.altInputFormats = ['M!/d!/yyyy'];
    $timeout(function() {
        $scope.getCustomerListFn("registered", ""); //LOAD CUSTOMER LIST
    }, 500);
    blockUI.stop();
    $("#customerSearch").focus();
    $scope.data_param={'user':{}};
    $scope.switchCustomersFn = function(opt1, obj1, opt2){
        var cObj = !obj1 || obj1==undefined ? null : obj1;
        switch (opt1){
        /******************************
        *     CUSTOMERS CONTRACTS     *
        ******************************/
            case "loadCustomerFields":
                $scope.loadCustomerFieldsFn(cObj)
            break;
            case "contract":
                switch (opt2){
                    case "new_contract_windows":
                        //$scope.defArrForCustomersFn();
                        $('#RegisterCustomerContract').modal({backdrop: 'static', keyboard: false});
                        $scope.preLoadServicesArrFn();
                        var current_date = new Date()
                        var date = moment.tz(current_date, "YYYY-MM-DD", "America/Argentina/Buenos_Aires");
                        var newDate = date.toDate();
                        $scope.contract.new.dateOfSign = moment(newDate).format('DD/MM/YYYY');
                        var parsedDate = moment($scope.contract.new.dateOfSign, 'DD/MM/YYYY');
                        var short_date = parsedDate.format('DDMMYY');
                        $scope.contract.new.dateCodeDigits       = short_date;
                        $scope.contract.new.idClientFk=cObj.idClient;
                    break;
                    case "assign_contract_new_service":
                        $('#newServiceUnit').modal({backdrop: 'static', keyboard: false});
                        $scope.service.new={'serviceItems':{},'serviceType':''};
                    break;
                    case "assign_contract_update_service":
                        $('#updateServiceUnit').modal({backdrop: 'static', keyboard: false});
                        $scope.service.update={'serviceItems':{},'serviceType':""};
                    break;
                    case "add":
                        $scope.customerContractFn(null, 'create');
                    break;
                    case "edit":
                        $scope.customerContractFn(cObj, 'edit');
                    break;
                    case "update":
                        console.log("Updating Contract")
                        $scope.customerContractFn(null, 'update');
                    break;
                    case "info":
                        $scope.customerContractFn(cObj, 'info');
                    break;
                    case "approveContractWindow":
                        $scope.contract.activateDate={}
                        $scope.contract.activateDate=cObj;
                        if ($scope.contract.activateDate.fechaFirmaActivacion!='' && $scope.contract.activateDate.fechaFirmaActivacion!=null &&
                        $scope.contract.activateDate.fechaFirmaActivacion!=undefined){
                            $scope.modalConfirmation('contract_enable', 0, cObj)
                        }else{
                            $('#activationDateContractWindows').modal('show');
                            var currentDate        = new Date();
                            var rawDate            = moment(currentDate).toDate();
                            var formatedDate       = moment(rawDate).format('YYYY-MM-DD');
                            var date = moment.tz(formatedDate, "YYYY-MM-DD", "America/Argentina/Buenos_Aires");
                            var newDate = date.toDate();
                            //$scope.contract.activateDate.tmpFechaFirmaActivacion = moment(newDate).format('DD/MM/YYYY');
                            $scope.contract.activateDate.tmpFechaFirmaActivacion = newDate;
                        }
                    break;
                    case "activateDate":
                        $scope.customerContractFn(cObj, 'activateDate');
                    break;
                    case "enable":
                        $scope.customerContractFn(cObj, 'enable');
                    break;
                    case "disable":
                        $scope.customerContractFn(cObj, 'disable');
                    break;
                    case "init_terminationContract":
                        $scope.inputTokenCode = "";
                        blockUI.start('Iniciando verificación del contrato: '+cObj.numeroContrato);
                        $scope.contractSelected = {'idContrato':'','idStatusFk':'','idClientFk':'','numeroContrato':'','services':[], 'maintenanceType':''};
                        $scope.contract.update                      = cObj;
                        $scope.preLoadServicesArrFn();
                        for (var key in $scope.contract.update.services){
                            $scope.addServiceArrFn("load", $scope.contract.update.services[key]);
                        }
                        $timeout(function() {
                            $scope.serviceDataFn(cObj, 'init_terminateContract');
                            console.log($scope.contract.update);
                            console.log($scope.list_services_tmp);
                        }, 1500);
                    break;
                    case "requiredInputForContractTermination":
                        $scope.contractSelected = {'idContrato':'','idStatusFk':'','idClientFk':'','numeroContrato':'','services':[], 'maintenanceType':''};
                        $scope.contractSelected.idContrato          = cObj.idContrato;
                        $scope.contractSelected.idStatusFk          = cObj.idStatusFk;
                        $scope.contractSelected.idClientFk          = cObj.idClientFk;
                        $scope.contractSelected.numeroContrato      = cObj.numeroContrato;
                        $scope.contractSelected.services            = cObj.services;
                        $scope.contractSelected.maintenanceType     = cObj.maintenanceType;
                        $scope.contractSelected.terminateDate       = "";
                        $scope.contractSelected.terminationReason   = "";
                        blockUI.start('Complete los datos a continuación para finalizar. ');
                        $timeout(function() {
                            blockUI.stop();
                            $('#requiredInputForContractTermination').modal({backdrop: 'static', keyboard: false});
                            console.log($scope.contractSelected);
                        }, 2000);
                    break;
                    case "complete_terminateContract":
                        console.log(cObj);
                        //$scope.customerContractFn(cObj, 'remove');
                        $timeout(function() {
                            $scope.serviceDataFn(cObj, 'removeContractAndServicesMulti');
                            blockUI.stop();
                        }, 1500);
                    break;

                    /******************************
                    *   CONTRACTS UNDERLOCK SYS   *
                    ******************************/
                    case "underLock-assign":
                        $scope.contract.sysUnderLock     = {};
                        $('#underLockSystem').modal('show');
                        $scope.contract.sysUnderLock.idContrato      = cObj.idContrato;
                        $scope.contract.sysUnderLock.idClientFk      = cObj.idClientFk
                        $scope.contract.sysUnderLock.numeroContrato  = cObj.numeroContrato;
                        $scope.contract.sysUnderLock.new = true;
                        //console.log($scope.contract.sysUnderLock);
                    break;
                    case "underLock-add":
                        $scope.customerContractFn(cObj, 'underLock-add');
                    break;
                    case "underLock-edit":
                        $scope.contract.sysUnderLock = {};
                        $scope.contract.sysUnderLock.idSystemUnderLock        = cObj.idSystemUnderLock;
                        $scope.contract.sysUnderLock.isSystemUnderLock        = cObj.isSystemUnderLock;
                        $scope.contract.sysUnderLock.idContrato               = cObj.idContrato;
                        $scope.contract.sysUnderLock.idClientFk               = cObj.idClientFk;
                        $scope.contract.sysUnderLock.numeroContrato           = cObj.numeroContrato;
                        $scope.contract.sysUnderLock.companyHasKeys           = cObj.companyHasKeys==1?true:false;
                        $scope.contract.sysUnderLock.customerHasKeys          = cObj.customerHasKeys==1?true:false;
                        $scope.contract.sysUnderLock.comment_systemUnderLock  = cObj.comment_systemUnderLock;
                        $('#underLockSystem').modal('show');
                        $scope.contract.sysUnderLock.new    = false;
                        $scope.contract.sysUnderLock.update = true;
                        console.log($scope.contract.sysUnderLock);
                    break;
                    case "underLock-update":
                        $scope.customerContractFn(cObj, 'underLock-update');
                    break;
                    case "underLock-show":
                        //$scope.customerContractFn(cObj, 'disable');
                    break;
                }
            break;
        /******************************
        *     CUSTOMERS SERVICES      *
        ******************************/

            case "services":
                switch (opt2){
                    case "start_new_service":
                        $scope.isNewCustomerService=true;
                        $scope.isUpdateCustomerService=false;
                        $scope.isListCustomerService=false;
                        $('#SelectServiceWindows').modal('hide');
                        //$scope.defArrForCustomersFn();
                        blockUI.start('Nuevo Servicio '+cObj.serviceName);
                            $scope.getProductsList4ServiceFn();
                        //console.log(cObj)
                        $timeout(function() {
                            blockUI.message('Cargando productos...');
                            $scope.serviceDataFn(cObj, 'start');
                        }, 1500);
                        //$scope.contract.new.idClient=cObj.idClient;
                    break;
                    case "add_new_service":
                        blockUI.start('Creando Nuevo '+cObj.serviceName);
                        $timeout(function() {
                            $scope.serviceDataFn(cObj, 'add');
                        }, 1500);
                    break;
                    case "edit":
                        $scope.isNewCustomerService=false;
                        $scope.isUpdateCustomerService=true;
                        $scope.isListCustomerService=false;
                        //$scope.defArrForCustomersFn();
                        $scope.getCustomerListFn("all", 2);
                        $scope.getProductsList4ServiceFn();
                        $scope.cleanServiceInputsFn();
                        blockUI.start('Cargando datos del servicio '+cObj.clientTypeServices);
                        $timeout(function() {
                            $scope.serviceDataFn(cObj, 'edit');
                        }, 1500);
                    break;
                    case "update":
                        blockUI.start('Actualizando datos del servicio '+cObj.clientTypeServices);
                        $timeout(function() {
                            $scope.serviceDataFn(cObj, 'update');
                        }, 1500);
                    break;
                    case "select_contract_first":
                        if ($scope.rsContractsListByCustomerIdData.length>0){
                            $('#SelectContractFirst').modal('show');
                            $scope.tmpContractList=cObj.contratos;
                            console.log($scope.tmpContractList);
                            inform.add('Selecciona un contrato para continuar. ',{
                            ttl:4000, type: 'success'
                            });
                        }else{
                            inform.add('Debe registrar un contrato para crear un nuevo servicio. ',{
                            ttl:4000, type: 'info'
                            });
                        }
                    break;
                    case "select_service_windows":
                        $('#SelectContractFirst').on('hidden.bs.modal', function () {
                            $('#SelectServiceWindows').modal('show');
                        });
                        $('#SelectContractFirst').modal('hide');
                        //$('#SelectServiceWindows').modal('show');
                        $scope.tmpServiceList=cObj;
                        console.log($scope.tmpServiceList);
                        inform.add('Selecciona un servicio para continuar. ',{
                            ttl:5000, type: 'success'
                        });
                    break;
                    case "userDVR":
                        $scope.isNewCustomerService=false;
                        $scope.isUpdateCustomerService=false;
                        $scope.isListCustomerService=true;
                        $scope.cleanServiceInputsFn();
                        blockUI.start('Cargando Usuarios del DVR en el servicio '+cObj.clientTypeServices);
                        $timeout(function() {
                            $scope.serviceDataFn(cObj, 'userDVR');
                        }, 1500);
                    break;
                    case "userLicense":
                        $scope.isNewCustomerService=false;
                        $scope.isUpdateCustomerService=false;
                        $scope.isListCustomerService=true;
                        $scope.cleanServiceInputsFn();
                        blockUI.start('Cargando Licencias de usuario del servicio '+cObj.clientTypeServices);
                        $timeout(function() {
                            $scope.serviceDataFn(cObj, 'userLicense');
                        }, 1500);
                    break;
                    case "listCameras":
                        $scope.isNewCustomerService=false;
                        $scope.isUpdateCustomerService=false;
                        $scope.isListCustomerService=true;
                        $scope.cleanServiceInputsFn();
                        blockUI.start('Cargando Listado de cameras del servicio '+cObj.clientTypeServices);
                        $timeout(function() {
                            $scope.serviceDataFn(cObj, 'listCameras');
                        }, 1500);
                    break;
                    case "init_terminateService":
                        $scope.cleanServiceInputsFn();
                        $scope.service.update={'terminateDate': undefined,'reasonType': undefined,'terminationReason': undefined};
                        $scope.contractSelected=undefined;
                        $scope.inputTokenCode = "";
                        blockUI.start('Iniciando verificación del servicio '+cObj.clientTypeServices);
                        $timeout(function() {
                            $scope.serviceDataFn(cObj, 'init_terminateService');
                        }, 1500);
                    break;
                    case "requiredInputForServiceTermination":
                        blockUI.start('Complete los datos a continuación para finalizar. ');
                        $timeout(function() {
                            blockUI.stop();
                            $('#requiredInputForServiceTermination').modal({backdrop: 'static', keyboard: false});
                            console.log($scope.service.update);
                            console.log($scope.service.update.idContracAssociated_SE_array);
                        }, 2000);
                    break;
                    case "complete_terminateService":
                        $scope.service.update.terminationApprovedByIdUserKf = $scope.data_param.user.idUser;
                        $scope.service.update.idContratoFk                  = $scope.service.update.idContracAssociated_SE;
                        $scope.service.update.idContracAssociatedFk         = $scope.service.update.idContracAssociated_SE;
                        $scope.service.update.tipo_conexion_remoto          = $scope.service.update.tb_tipo_conexion_remoto_array;
                        $scope.service.update.adicional_alarmar             = $scope.service.update.adicional;
                        $scope.service.update.sensores_de_alarmas           = $scope.service.update.tb_sensors_alarm_array;
                        $scope.service.update.baterias_instaladas           = $scope.service.update.tb_alarm_batery_array;
                        blockUI.start('Servicio dado de baja.');
                        $timeout(function() {
                            console.log($scope.service.update);
                            $scope.updateCustomerServiceFn($scope.service.update);
                            $scope.inputTokenCode = "";
                            blockUI.stop();
                        }, 1500);
                        $timeout(function() {
                            $scope.setTokenCompletedFn($scope.token_param.token.tokenCode);
                        }, 2000);
                    break;
                    case "getUsersByLicense":
                        $scope.service.sysUser.selected = undefined;
                        $scope.service.users.idUser = "";
                        $scope.service.users.fullName = "";
                        $scope.service.users.email = "";
                        $scope.service.users.phone = "";
                        $scope.service.users.nameProfile = "";
                        $scope.rsList={'sysUsers':[]};
                        console.log($scope.rsList);
                        console.log(cObj);
                        var idDetinationOfLicenseFk = cObj.users.idDetinationOfLicenseFk
                        var idDepartmentSelected    = cObj.users.idDetinationOfLicenseFk=="1"?cObj.license_departments.selected.idDepto:"";
                        var idClientKf              = $scope.customerFound.idClient;
                        var userByLicense = {
                            "idDetinationOfLicenseFk":idDetinationOfLicenseFk,
                            "idDepartmentSelected": idDepartmentSelected,
                            "idClientKf": idClientKf,
                            "idUserSelected": ""
                        }
                        console.log(userByLicense);
                        $scope.getUsersByLicenseFn(userByLicense);
                    break;
                    case "getUsersForAttByClient":
                        $scope.service.aditional_alarm.sysUser={'selected': undefined};
                        $scope.service.aditional_alarm.telefono         = "";
                        $scope.rsList={'sysUsers':[]};
                        console.log($scope.rsList);
                        console.log(cObj);
                        console.log("$scope.customerFound.idClient: "+$scope.customerFound.idClient);
                        $scope.getUsersByClientFn($scope.customerFound.idClient);
                    break;
                    case "getUsersForNoticeByClient":
                        $scope.service.aditional_alarm.sysPeopleNoticeUser={'selected': undefined};
                        $scope.rsList={'sysUsers':[]};
                        console.log($scope.rsList);
                        console.log(cObj);
                        console.log("$scope.customerFound.idClient: "+$scope.customerFound.idClient);
                        $scope.getUsersByClientFn($scope.customerFound.idClient);
                    break;
                }
            break;
            case "general":
                switch (opt2){
                    case "get_approved_users":
                        var currentDate                 = cObj.terminateDate;
                        var rawDate                     = moment(currentDate).toDate();
                        var formatedDate                = moment(rawDate).format('YYYY-MM-DD');
                        if ($scope.contractSelected!=undefined){
                            $scope.contractSelected.dateDown = formatedDate;
                        }else{
                            $scope.service.update.dateDown   = formatedDate;
                            console.log($scope.service.update);
                        }
                        blockUI.start('Seleccione el usuario que recibira el codigo de confirmación para aprobar la baja del servicio/contrato. ');
                        $scope.getListAuthorizedUsersFn();
                        $timeout(function() {
                            $('#getApprovedUser').modal({backdrop: 'static', keyboard: false});
                            blockUI.stop();
                        }, 2000);
                    break;
                    case "request_approval_code":
                        $scope.data_param={'user':{}};
                        $scope.data_param.user.idUser               = cObj.idUser;
                        $scope.data_param.user.emailUser            = cObj.emailUser;
                        $scope.data_param.user.fullNameUser         = cObj.fullNameUser ;
                        $scope.data_param.user.clientName           = $scope.customerFound.name;
                        $scope.data_param.user.idClientKf           = $scope.customerFound.idClient;
                        $scope.data_param.user.idUserApproverKf     = cObj.idUser;
                        $scope.data_param.user.idUserRequestorKf    = $scope.sysLoggedUser.idUser;
                        $scope.addAuthorizationTokenFn($scope.data_param);
                        //$timeout(function() {
                        //    console.log("Token generated: "+$scope.generatedTokenCode);
                        //    blockUI.stop();
                        //}, 2000);
                    break;
                    case "approve_termination":
                        blockUI.start('Se ha enviado un codigo de aprobación al usuario: '+$scope.data_param.user.emailUser);
                        $timeout(function() {
                            $('#confirmCodeModal').modal({backdrop: 'static', keyboard: false});
                            $('#confirmCodeModal').on('shown.bs.modal', function () {
                                $scope.inputTokenCode = "";
                                $('#checkCode').focus();
                            })
                            blockUI.stop();
                        }, 2000);
                    break;
                    case "validate_token_code":
                        $scope.token_param={'token':{}};
                        $scope.token_param.token.tokenCode            = cObj;
                        $scope.token_param.token.idUserRequestorKf    = $scope.sysLoggedUser.idUser;
                        userServices.validateAuthorizationToken($scope.token_param).then(function(response){
                            console.log(response);
                            if(response.status==200){
                                inform.add('Codigo ingresado, ha sido validado satisfactoriamente.',{
                                    ttl:10000, type: 'success'
                                });
                                blockUI.start('Completando baja del servicio');
                                console.log($scope.contractSelected);
                                $timeout(function() {
                                    if ($scope.contractSelected==undefined || $scope.contractSelected==null){
                                        $('#serviceDownDetails').modal('hide');
                                        $('#requiredInputForServiceTermination').modal('hide');
                                        $scope.switchCustomersFn('services', null, 'complete_terminateService');
                                    }else{
                                        $('#contractDownDetails').modal('hide');
                                        $('#requiredInputForContractTermination').modal('hide');
                                        $scope.switchCustomersFn('contract', $scope.contract.update, 'complete_terminateContract');
                                    }
                                    $('#confirmCodeModal').modal('hide');
                                    blockUI.stop();
                                }, 2000);
                            }if(response.status==404){
                                $scope.token_param={'token':{}};
                                $scope.inputTokenCode = "";
                                inform.add('Codigo ingresado, no es correcto, intente nuevamente.',{
                                    ttl:5000, type: 'warning'
                                });
                            }
                        });
                    break;
                }
            break;

            default:
            case "customers":
                switch (opt2){
                    case "isStockInBuilding":
                        console.log(cObj);
                        $scope.setClientHasStockInBuildingFn(cObj);
                    break;
                    case "isStockInOffice":
                        console.log(cObj);
                        $scope.setClientHasStockInOfficeFn(cObj);
                    break;
                    case "new_enableInitialKeys":
                        console.log(cObj);
                        $scope.customer={'update':{}};
                        if(cObj.initial_delivery.length==1){
                            $scope.customer.update = cObj.initial_delivery[0];
                            // Convertir la cadena a un objeto Date usando Moment-Timezone
                            var date = moment.tz(cObj.initial_delivery[0].expirationDate, "YYYY-MM-DD", "America/Argentina/Buenos_Aires");
                            var newDate = date.toDate();
                            $scope.customer.update.expirationDate   = newDate;
                            $scope.customer.update.initial_qtty     = cObj.initial_delivery[0].initial_qtty;
                            $scope.customer.update.initial_price    = cObj.initial_delivery[0].initial_price;
                        }
                        $('#enableInitialKeys').modal('toggle');
                    break;
                    case "add_enableInitialKeys":
                        $scope.customer.update.idClientKf           = cObj.idClient;
                        $scope.customer.update.created_by_idUserKf  = $scope.sysLoggedUser.idUser;
                        $scope.customer.update.initial_qtty = $scope.customer.update.initial_qtty==undefined || $scope.customer.update.initial_qtty==''?0:$scope.customer.update.initial_qtty;
                        var date_selected   = $scope.customer.update.expirationDate;
                        var expirationDate  = new Date(date_selected);
                        $scope.customer.update.expirationDate       = expirationDate.getFullYear()+"-"+(expirationDate.getMonth()+1)+"-"+expirationDate.getDate()+" " +"23:59:59"
                        console.log($scope.customer.update);
                        $scope.addInitialDeliveryFn($scope.customer.update);
                    break;
                    case "update_enableInitialKeys":
                        $scope.customer.update.updated_by_idUserKf = $scope.sysLoggedUser.idUser;
                        $scope.customer.update.initial_qtty = $scope.customer.update.initial_qtty==undefined || $scope.customer.update.initial_qtty==''?0:$scope.customer.update.initial_qtty;
                        var date_selected   = $scope.customer.update.expirationDate;
                        var expirationDate  = new Date(date_selected);
                        $scope.customer.update.expirationDate     = expirationDate.getFullYear()+"-"+(expirationDate.getMonth()+1)+"-"+expirationDate.getDate()+" " +"23:59:59"
                        console.log($scope.customer.update);
                        $scope.updateInitialDeliveryFn($scope.customer.update);
                    break;
                    case "list_attendants":
                        $('#attendantList').modal({backdrop: 'static', keyboard: true});
                    break;
                }
            break;
        }
    }
      /**
      * Pagination Functions
      **/
       $scope.pagedItems    = [];
       $scope.itemPerPage=0;
       $scope.loadPagination = function(item, orderBy, itemsByPage){
           var rowList=[];
           var rowId=null;
           for (var key in item){
             if (item[key].idClient!=undefined && typeof item[key].idClient === 'string'){
               rowId=Number(item[key].idClient);
               item[key].idClient=rowId;
               rowList.push(item[key]);
             }else if (item[key].idUser!=undefined && typeof item[key].idUser === 'string'){
               rowId=Number(item[key].idUser);
               item[key].idUser=rowId;
               rowList.push(item[key]);
             }else if (item[key].idUserFk!=undefined && typeof item[key].idUserFk === 'string'){
               rowId=Number(item[key].idUserFk);
               item[key].idUserFk=rowId;
               rowList.push(item[key]);
             }else if (item[key].idProduct!=undefined && typeof item[key].idProduct === 'string'){
               rowId=Number(item[key].idProduct);
               item[key].idProduct=rowId;
               rowList.push(item[key]);
             }else if (item[key].idDepartmentFk!=undefined && typeof item[key].idProduct === 'string'){
               rowId=Number(item[key].idDepartmentFk);
               item[key].idDepartmentFk=rowId;
               rowList.push(item[key]);
             }else{
               rowList.push(item[key]);
             }
           }
           //console.log(rowList);
           var sortingOrder     = orderBy;
           var itemsPerPage     = itemsByPage;
           $scope.sortingOrder  = sortingOrder;
           $scope.reverse       = false;
           $scope.filteredItems = [];
           $scope.groupedItems  = [];
           $scope.itemsPerPage  = itemsPerPage;
           $scope.pagedItems    = [];
           $scope.currentPage   = 0;
           $scope.items         = [];
           $scope.items         = rowList;
           $scope.itemPerPage   = $scope.itemsPerPage;
           $scope.search();
       }
       // init the filtered items
       $scope.search = function (qvalue1, qvalue2, qvalue3, qvalue4, qvalue5, qvalue6, vStrict) {
               //console.log("[search]-->qvalue1: "+qvalue1);
               //console.log("[search]-->qvalue2: "+qvalue2);
               //console.log("[search]-->qvalue3: "+qvalue3);
               //console.log("[search]-->qvalue4: "+qvalue4);
               //console.log("[search]-->qvalue5: "+qvalue5);
               //console.log("[search]-->qvalue6: "+qvalue6);
               //console.log("[search]-->vStrict: "+vStrict);
               $scope.filteredItems = $filter("filter")($scope.items, qvalue1, vStrict);
               if (qvalue2!=undefined && qvalue2!='' && qvalue2!=null){$scope.filteredItems = $filter("filter")($scope.filteredItems, qvalue2, vStrict);}
               if (qvalue3!=undefined && qvalue3!='' && qvalue3!=null){$scope.filteredItems = $filter("filter")($scope.filteredItems, qvalue3, vStrict);}
               if (qvalue4!=undefined && qvalue4!='' && qvalue4!=null){$scope.filteredItems = $filter("filter")($scope.filteredItems, qvalue4, vStrict);}
               if (qvalue5!=undefined && qvalue5!='' && qvalue5!=null){$scope.filteredItems = $filter("filter")($scope.filteredItems, qvalue5, vStrict);}
               if (qvalue6!=undefined && qvalue6!='' && qvalue6!=null){$scope.filteredItems = $filter("filter")($scope.filteredItems, qvalue6, vStrict);}
           //console.log($scope.filteredItems);
           // take care of the sorting order
           if ($scope.sortingOrder !== '') {
               $scope.filteredItems = $filter("orderBy")($scope.filteredItems, $scope.sortingOrder, $scope.reverse);
               //console.log($scope.filteredItems);
           }
           $scope.currentPage = 0;
           // now group by pages
           $scope.groupToPages();
       };
       // Group Items By Pages
       $scope.groupToPages = function (itemPerPage) {
           var itemsPerPage = itemPerPage==undefined || itemPerPage==null?$scope.itemsPerPage:itemPerPage;
           $scope.pagedItems = [];
           for (var i = 0; i < $scope.filteredItems.length; i++) {
               if (i % itemsPerPage === 0) {
                   //console.log("entro al if");
                   $scope.pagedItems[Math.floor(i / itemsPerPage)] = [ $scope.filteredItems[i] ];
               } else {
                   //console.log("entro al else");
                   $scope.pagedItems[Math.floor(i / itemsPerPage)].push($scope.filteredItems[i]);
               }
               //console.log($scope.pagedItems[Math.floor(i / itemsPerPage)]);
           }
           //console.log($scope.pagedItems.length);
           //console.log("PAGINATION LOADED");
       };
       //Previous Page
       $scope.prevPage = function () {
           if ($scope.currentPage > 0) {
               $scope.currentPage--;
           }
       };
       //Next Page
       $scope.nextPage = function () {
           if ($scope.currentPage < $scope.pagedItems.length - 1) {
               $scope.currentPage++;
           }
       };
       //Last Page
       $scope.lastPage = function(){
           $scope.currentPage=($scope.pagedItems.length-1);
       }
       //First Page
       $scope.firstPage = function () {
           $scope.currentPage=($scope.pagedItems.length-$scope.pagedItems.length);
       };

       // change sorting order
       $scope.sort_by = function(newSortingOrder) {
           if ($scope.sortingOrder == newSortingOrder)
               $scope.reverse = !$scope.reverse;

           $scope.sortingOrder = newSortingOrder;

           // icon setup
           //$('th i').each(function(){
           //    // icon reset
           //    $(this).removeClass().addClass('icon-sort');
           //});
           if ($scope.reverse)
               $('th.'+newSortingOrder+' i').removeClass().addClass('icon-chevron-up');
           else
               $('th.'+newSortingOrder+' i').removeClass().addClass('icon-chevron-down');
       };
       $scope.sort = function(keyname){
           $scope.sortKey = keyname;   //set the sortKey to the param passed
           $scope.reverse = !$scope.reverse; //if true make it false and vice versa
       }



    /********************************************************************************************************************************************
    *                                                                                                                                           *
    *                                                                                                                                           *
    *                                             F U N C I O N E S    D E   C L I E N T E S                                                    *
    *                                                                                                                                           *
    *                                                                                                                                           *
    ********************************************************************************************************************************************/
          /**************************************************
          *                                                 *
          *                SET INITIAL DELIERY              *
          *                                                 *
          **************************************************/
          $scope.addInitialDeliveryFn = function(obj){
            //console.log(obj);
            CustomerServices.addInitialDelivery(obj).then(function(response){
                console.log(response);
                if(response.status==200){
                      inform.add('Entrega Inicial habilitada satisfactoriamente.',{
                          ttl:15000, type: 'success'
                      });
                      $('#enableInitialKeys').modal('hide');
                }if(response.status==404 || response.status==500){
                    inform.add('Ocurrio un error con la Entrega Inicial, contacta al soporte.',{
                        ttl:15000, type: 'danger'
                    });
                }
            });
          }
          /**************************************************
          *                                                 *
          *             UPDATE INITIAL DELIERY              *
          *                                                 *
          **************************************************/
          $scope.updateInitialDeliveryFn = function(obj){
            //console.log(obj);
            CustomerServices.updateInitialDelivery(obj).then(function(response){
                console.log(response);
                if(response.status==200){
                      inform.add('Entrega Inicial actualizada satisfactoriamente.',{
                          ttl:15000, type: 'success'
                      });
                      $('#enableInitialKeys').modal('hide');
                }if(response.status==404 || response.status==500){
                    inform.add('Ocurrio un error con la Entrega Inicial, contacta al soporte.',{
                        ttl:15000, type: 'danger'
                    });
                }
            });
          }
    /********************************************************************************************************************************************
    *                                                                                                                                           *
    *                                                                                                                                           *
    *                                             F U N C I O N E S    D E   S E R V I C I O S                                                  *
    *                                                                                                                                           *
    *                                                                                                                                           *
    ********************************************************************************************************************************************/
                /**************************************************
                *                                                 *
                *                 USER  SERVICES                  *
                *  [userLists]: clientUser, attendants, tenants   *
                *               sysUser, companyUser              *
                **************************************************/
                    $scope.rsList = {};
                    $scope.getUserLists = function(opt, group){
                        userServices.userLists().then(function(response) {
                            if (opt!=undefined && group!=undefined){
                            //console.log("[getUserList] ==> "+opt+" : "+group);
                            $scope.rsList = response;
                            if(opt==1){
                                switch (group){
                                case "1":
                                    $scope.loadPagination($scope.rsList.sysUser, "idUser", "7");
                                break;
                                case "2":
                                    $scope.loadPagination($scope.rsList.companyUser, "idUser",  "7");
                                break;
                                case "3":
                                    $scope.loadPagination($scope.rsList.owners, "idUser",  "7");
                                break;
                                case "4":
                                    $scope.loadPagination($scope.rsList.companyUser, "idUser",  "7");
                                break;
                                case "5":
                                    $scope.loadPagination($scope.rsList.tenants, "idUser",  "7");
                                break;
                                case "6":
                                    $scope.loadPagination($scope.rsList.attendants, "idUser",  "7");
                                break;
                                case "owners_tenants":
                                    $scope.loadPagination($scope.rsList.owners_tenants, "idUser",  "7");
                                break;
                                case "users":
                                    $scope.loadPagination($scope.rsList.users, "idUser",  "7");
                                break;
                                case "clients":
                                    $scope.loadPagination($scope.rsList.clientUser, "idUser",  "7");
                                break;
                                }
                            }
                            //console.log($scope.rsList.tenants);
                            }
                        });
                    };
                /**************************************************
                 *                                                 *
                 *                SET CLIENT IN DEBT               *
                 *                                                 *
                 **************************************************/
                    $scope.authorizedUserListRs = null;
                    $scope.getListAuthorizedUsersFn = function(){
                        //console.log(obj);
                        userServices.getListAuthorizedUsers().then(function(response){
                            console.log(response);
                            if(response.status==200){
                                $scope.authorizedUserListRs = response.data;
                            }if(response.status==404 || response.status==500){
                                $scope.authorizedUserListRs = [];
                                inform.add('No se encontraron usuarios habilitados para aprobación de baja, contacta con soporte.',{
                                    ttl:15000, type: 'danger'
                                });
                            }
                        });
                    }
                /**************************************************
                 *                                                 *
                 *                REQUEST TOKEN CODE               *
                 *                                                 *
                 **************************************************/
                    $scope.addAuthorizationTokenFn = function(user){
                        //console.log(obj);
                        userServices.addAuthorizationToken(user).then(function(response){
                            console.log(response);
                            if(response.status==200){
                                inform.add('Token de seguridad ha sido generado satisfactoriamente.',{
                                    ttl:10000, type: 'success'
                                });
                                $scope.switchCustomersFn('general', $scope.service.update, 'approve_termination');
                                $('#getApprovedUser').modal('hide');
                            }if(response.status==500){
                                inform.add('Ocurrio un error generando y enviando el codigo de seguridad, contacta con soporte.',{
                                    ttl:15000, type: 'danger'
                                });
                            }
                        });
                    }
                /**************************************************
                 *                                                 *
                 *                SET TOKEN COMPLETED              *
                 *                                                 *
                 **************************************************/
                    $scope.setTokenCompletedFn = function(token){
                        //console.log(obj);
                        userServices.setTokenCompleted(token).then(function(response){
                            if(response.status==200){
                                console.log(response.data);
                            }if(response.status==500){
                                inform.add('Ocurrio un error en función "setTokenCompletedFn", contacta con soporte.',{
                                    ttl:15000, type: 'danger'
                                });
                            }
                        });
                    }
                /**************************************************
                *                                                 *
                *                 LIST PRODUCTS                   *
                *                                                 *
                **************************************************/
                    $scope.rsProductsData = [];
                    $scope.getProductsFn = function(search){
                        ProductsServices.list(search).then(function(data){
                            $scope.rsProductsData = data;
                            //console.log($scope.rsProfileData);
                        });
                    };$scope.getProductsFn("");

                /**************************************************
                *                                                 *
                *           CLASSIFICATION PRODUCTS               *
                *                                                 *
                **************************************************/
                    $scope.rsClasProductsData = {};
                    $scope.getProductClassificationFn = function(){
                        ProductsServices.getProductClassification().then(function(data){
                            $scope.rsClasProductsData = data;
                            //$scope.loadPagination($scope.rsClasProductsData, "idProductClassification");
                            //console.log($scope.rsClasProductsData);
                        });
                    };$scope.getProductClassificationFn();

                /**************************************************
                *                                                 *
                *             OPEN DEVICES PRODUCTS               *
                *                                                 *
                **************************************************/
                    $scope.rsOpenDeviceProductsData = [];
                    $scope.getDiviceOpening = function(){
                        ProductsServices.getDiviceOpening().then(function(data){
                            $scope.rsOpenDeviceProductsData = data;
                            //$scope.loadPagination($scope.rsOpenDeviceProductsData, "idProductClassification");
                            //console.log($scope.rsOpenDeviceProductsData);
                        });
                    };$scope.getDiviceOpening();
                    $scope.list_id_divice=[];
                    $scope.list_divices=[];
                    $scope.isDeviceExist=null;
                    $scope.addDeviceOpeningFn = function (obj){
                        if ($scope.list_divices.length<=0){
                            //console.log("length is equal 0 or less 0");
                            $scope.list_id_divice.push({'idDiviceOpeningFk':obj.idDiviceOpening});
                            $scope.list_divices.push({'idDiviceOpeningFk':obj.idDiviceOpening, 'diviceOpening':obj.diviceOpening});

                        }else{
                            for (var key in  $scope.list_id_divice){
                            // console.log(key);
                            //console.log("Validando: "+$scope.list_id_divice[key].idDiviceOpeningFk+" == "+obj.idDiviceOpening);
                                if ( $scope.list_id_divice[key].idDiviceOpeningFk==obj.idDiviceOpening){
                                inform.add("El Dispositivo "+obj.diviceOpening+" Ya se encuentra agregado.",{
                                    ttl:5000, type: 'success'
                                });
                                $scope.isDeviceExist=true;
                                break;
                                //console.log($scope.isDeviceExist);
                                }else{
                                $scope.isDeviceExist=false;
                                //console.log($scope.isDeviceExist);
                                }
                            }
                            if(!$scope.isDeviceExist){
                                //console.log("ADD_NO_EXIST");
                                $scope.list_id_divice.push({'idDiviceOpeningFk':obj.idDiviceOpening});
                                $scope.list_divices.push({'idDiviceOpeningFk':obj.idDiviceOpening, 'diviceOpening':obj.diviceOpening});
                            }
                        }
                        //console.log("OBJ A ADICIONAR:");
                        //console.log(obj);
                        //console.log("list_id_divice:");
                        //console.log($scope.list_id_divice);
                        //console.log("list_divices:");
                        //console.log($scope.list_divices);
                    }
                    $scope.removeDeviceOpeningFn = function (obj){
                        for (var key in  $scope.list_id_divice){
                            if ( $scope.list_id_divice[key].idDiviceOpeningFk==obj.idDiviceOpeningFk){
                                $scope.list_divices.splice(key,1);
                                $scope.list_id_divice.splice(key,1);
                            }
                        }
                        //console.log("OBJ A ELIMINAR:");
                        //console.log(obj);
                        //console.log("list_id_divice:");
                        //console.log($scope.list_id_divice);
                        //console.log("list_divices:");
                        //console.log($scope.list_divices);
                    }
                    $scope.removeAllDevices = function(){
                    for (var key in  $scope.list_divices){
                        $scope.list_divices.splice(key,1);
                        $scope.list_id_divice.splice(key,1);
                    }
                    }
                /**
                * Modal Confirmation function
                **/
                    $scope.modalConfirmation = function(opt, confirm, obj, obj2){
                        $scope.swMenu = opt;
                        $scope.vConfirm = confirm;
                        var tmpOpt=$scope.div2Open;
                        //console.log(tmpOpt);
                        $scope.mess2show="";
                            switch ($scope.swMenu){
                            case "removeu":
                                if (confirm==0){
                                    if ($scope.sysLoggedUser.idProfileKf==1 && obj.idUser!=0){
                                    if (obj.idProfileKf){$scope.mess2show="El usuario ("+obj.fullNameUser+") bajo el perfil de "+obj.nameProfile+" sera Eliminado.     Confirmar?";}
                                        $scope.idUserKf   =  obj.idUser;
                                        $scope.argObj = obj;
                                        console.log('Usuario a eliminar ID: '+$scope.idUserKf+' BAJO EL NOMBRE: '+obj.fullNameUser);
                                        console.log("============================================================================")
                                        console.log($scope.argObj);
                                    }
                                $('#confirmRequestModal').modal('toggle');
                                }else if (confirm==1){
                                    $scope.deleteUser($scope.argObj);
                                $('#confirmRequestModal').modal('hide');
                                }
                            break;
                            case "removeSysProf":
                                if (confirm==0){
                                    if ($scope.sysLoggedUser.idProfileKf==1 && obj.idProfiles!=0){
                                    $scope.idSysProf = obj.idProfiles;
                                    $scope.mess2show="El Perfil "+obj.name+" sera Eliminado.     Confirmar?";
                                        console.log('Usuario a eliminar ID: '+obj.idProfiles+' BAJO EL NOMBRE: '+obj.name);
                                        console.log("============================================================================")
                                        console.log(obj);
                                    }
                                $('#confirmRequestModal').modal('toggle');
                                }else if (confirm==1){
                                    $scope.deleteSysProfileFn($scope.idSysProf);
                                $('#confirmRequestModal').modal('hide');
                                }
                            break;
                            case "removeProduct":
                                if (confirm==0){
                                    if ($scope.sysLoggedUser.idProfileKf==1 && obj.idProduct!=0){
                                    $scope.idProducto = obj.idProduct;
                                    $scope.mess2show="El Producto "+obj.descriptionProduct+" sera Eliminado.     Confirmar?";
                                        console.log('Producto a eliminar ID: '+obj.idProduct+' DESCRIPCION: '+obj.descriptionProduct);
                                        console.log("============================================================================")
                                        console.log(obj);
                                    }
                                $('#confirmRequestModal').modal('toggle');
                                }else if (confirm==1){
                                    $scope.deleteProductFn($scope.idProducto);
                                $('#confirmRequestModal').modal('hide');
                                }
                            break;
                            case "closeCustomerWindow":
                                if (confirm==0){
                                    if ($scope.isNewCustomer==true){
                                        $scope.mess2show="Se perderan todos los datos cargados para el registro del Cliente, esta seguro que desea cancelar?";
                                    }else{
                                        $scope.mess2show="Se perderan todos las modificaciones realizadas en el registro actual, esta seguro que desea cancelar la modificacion?";
                                    }
                                    $('#confirmRequestModal').modal('show');
                                }else if (confirm==1){
                                    $('#confirmRequestModal').modal('hide');
                                    $('#customerParticularAddress').modal('hide');
                                    $('#BuildingUnit').modal('hide');
                                    $('#functionalUnit').modal('hide');
                                    $("#AddressLatLon").modal('hide');
                                    $('#RegisterModalCustomer').modal('hide');
                                    $('#UpdateModalCustomer').modal('hide');
                                    $('#changeModalAdmin').modal('hide');
                                    $scope.switchCustomersFn('dashboard','', 'registered');
                                }
                            break;
                            case "closeServiceWindow":
                                console.log(obj);
                                if (obj!=undefined && obj.idReasonTypeKf!=undefined && obj.dateDown!=undefined && obj.idReasonTypeKf!=null && obj.dateDown!=null){
                                    confirm=1;
                                }
                                if (confirm==0){
                                    if ($scope.isNewCustomerService==true){
                                        $scope.serviceNew=obj;
                                        console.log($scope.serviceNew);
                                        $scope.mess2show="Se perderan todos los datos cargados para el registro del servicio, esta seguro que desea cancelar?";
                                        $scope.getListContractServicesFn($scope.serviceNew.idContratoFk, null);
                                    }else{
                                        $scope.serviceUpdate=obj;
                                        $scope.mess2show="Se perderan todos las modificaciones realizadas en el registro actual, esta seguro que desea cancelar la modificacion?";
                                        $scope.getListContractServicesFn($scope.serviceUpdate.idContratoFk, null);
                                    }
                                    $('#confirmRequestModal').modal('show');
                                }else if (confirm==1){
                                    $('#confirmRequestModal').modal('hide');
                                    $('#RegisterCtrlAccessService').modal('hide');
                                    $('#RegisterInternetService').modal('hide');
                                    $('#RegisterTotemService').modal('hide');
                                    $('#RegisterCamerasService').modal('hide');
                                    $('#RegisterAlarmService').modal('hide');
                                    $('#RegisterAppMonitorService').modal('hide');
                                    $('#updateCtrlAccessService').modal('hide');
                                    $('#updateInternetService').modal('hide');
                                    $('#updateTotemService').modal('hide');
                                    $('#updateCamerasService').modal('hide');
                                    $('#updateAlarmService').modal('hide');
                                    $('#updateAppMonitorService').modal('hide');

                                    //$scope.loadPagination($scope.rsCustomerListData, "idClient", "10");
                                }
                            break;
                            case "removeParticularAddress":
                                if (confirm==0){
                                    $scope.removeParticularAddress=obj;
                                    if(obj.idTipoInmuebleFk=="1"){
                                        $scope.mess2show="El departamento: "+obj.depto+" en la direccion "+obj.address+" sera Eliminado.     Confirmar?";
                                    }else if(obj.idTipoInmuebleFk=="2"){
                                        $scope.mess2show="La casa en la direccion: "+obj.address+" sera Eliminado.     Confirmar?";
                                    }else{
                                        $scope.mess2show="El local en la direccion: "+obj.address+" sera Eliminado.     Confirmar?";
                                    }

                                        console.log('Direccion a eliminar ID: '+obj.idAddressParticular+' Direccion: '+obj.address);
                                        console.log("============================================================================")
                                        //console.log(obj);
                                $('#confirmRequestModal').modal('toggle');
                                }else if (confirm==1){
                                    $scope.removeParticularAddressFn($scope.removeParticularAddress);
                                $('#confirmRequestModal').modal('hide');
                                }
                            break;
                            case "removePhoneNum":
                                if (confirm==0){
                                    $scope.removePhoneNum=obj;
                                        $scope.mess2show="El telefono "+obj.phoneContact+" de contacto ["+obj.phoneTag+"] sera Eliminado.     Confirmar?";

                                        console.log('Telefono a eliminar ID: '+obj.idClientPhoneFk+' Telefono: '+obj.phoneContact);
                                        console.log("============================================================================")
                                        //console.log(obj);
                                $('#confirmRequestModal').modal('toggle');
                                }else if (confirm==1){
                                    $scope.removePhoneNumFn($scope.removePhoneNum);
                                $('#confirmRequestModal').modal('hide');
                                }
                            break;
                            case "removeMail":
                                if (confirm==0){
                                    $scope.removeMail=obj;
                                        $scope.mess2show="El correo "+obj.mailContact+" de tipo ["+obj.typeName+"] sera Eliminado.     Confirmar?";

                                        console.log('Correo a eliminar ID: '+obj.idClientMail+' Telefono: '+obj.mailContact);
                                        console.log("============================================================================")
                                        //console.log(obj);
                                $('#confirmRequestModal').modal('toggle');
                                }else if (confirm==1){
                                    $scope.removeMailFn($scope.removeMail);
                                $('#confirmRequestModal').modal('hide');
                                }
                            break;
                            case "removeAuthUser":
                                if (confirm==0){
                                    $scope.removeAuthUser=obj;
                                        $scope.mess2show="El usuario "+obj.fullNameUser+" sera removido de los usuarios autorizados.     Confirmar?";

                                        console.log('Usuario a remover ID: '+obj.idUserFk);
                                        console.log("============================================================================");
                                        //console.log(obj);
                                $('#confirmRequestModal').modal('toggle');
                                }else if (confirm==1){
                                    $scope.removeAuthUserFn($scope.removeAuthUser);
                                $('#confirmRequestModal').modal('hide');
                                }
                            break;
                            case "removeZone":
                                if (confirm==0){
                                    $scope.removeZone=obj;
                                        $scope.mess2show="La zona ("+obj.n_zona+") "+obj.descripcion+" sera eliminada.     Confirmar?";

                                        console.log('Zona a remover ID: '+obj.idZona);
                                        console.log("============================================================================");
                                        //console.log(obj);
                                $('#confirmRequestModal').modal('toggle');
                                }else if (confirm==1){
                                    $scope.deleteZoneFn($scope.removeZone);
                                $('#confirmRequestModal').modal('hide');
                                }
                            break;
                            case "removeDepto":
                                if (confirm==0){
                                    $scope.removeDepto=obj;
                                    var deptoUpper =obj.departament;
                                    var floorUpper =obj.floor;
                                    switch(obj.idCategoryDepartamentFk){
                                        case "1":
                                        $scope.mess2show="El departamento   : "+deptoUpper.toString().toUpperCase()+"    Piso: "+floorUpper.toString().toUpperCase()+" sera eliminado.     Confirmar?";
                                        break;
                                        case "2":
                                        $scope.mess2show="La Cochera   : "+deptoUpper.toString().toUpperCase()+"    Piso: "+floorUpper.toString().toUpperCase()+" sera eliminada.     Confirmar?";
                                        break;
                                        case "3":
                                        $scope.mess2show="La Baulera   : "+deptoUpper.toString().toUpperCase()+"    Piso: "+floorUpper.toString().toUpperCase()+" sera eliminada.     Confirmar?";
                                        break;
                                        case "4":
                                        $scope.mess2show="El Local   : "+deptoUpper.toString().toUpperCase()+"    Piso: "+floorUpper.toString().toUpperCase()+" sera eliminado.     Confirmar?";
                                        break;
                                        case "5":
                                        $scope.mess2show="La unidad Porteria   : "+deptoUpper.toString().toUpperCase()+"    Piso: "+floorUpper.toString().toUpperCase()+"  sera eliminada.     Confirmar?";
                                        break;
                                        case "6":
                                        $scope.mess2show="El departamento   : "+deptoUpper.toString().toUpperCase()+"    Piso: "+floorUpper.toString().toUpperCase()+" sera eliminado.     Confirmar?";
                                        break;
                                    }
                                        console.log('Depto a remover ID: '+obj.idDepto);
                                        console.log("============================================================================");
                                        //console.log(obj);
                                $('#confirmRequestModal').modal('toggle');
                                }else if (confirm==1){
                                    $scope.deleteSelectedDeptoMultiFn($scope.removeDepto);
                                $('#confirmRequestModal').modal('hide');
                                }
                            break;
                            case "newService":
                                if (confirm==0){
                                    $scope.addService=obj;
                                        $scope.mess2show="El servicio "+obj.serviceName+" en el contrato "+obj.contractNumb+" sera creado.     Confirmar?";

                                        console.log("servicio a crear  : "+obj.serviceName);
                                        console.log("Numero de contrato: "+obj.contractNumb);
                                        console.log("============================================================================");
                                        //console.log(obj);
                                $('#confirmRequestModal').modal('toggle');
                                }else if (confirm==1){
                                    $scope.switchCustomersFn('services', $scope.addService, 'add_new_service');
                                $('#confirmRequestModal').modal('hide');
                                }
                            break;
                            case "updateService":
                                if (confirm==0){
                                    $scope.updateService=obj;
                                        $scope.mess2show="El servicio "+obj.clientTypeServices+" en el contrato "+obj.numeroContrato+" sera actualizado.     Confirmar?";

                                        console.log("servicio a actualizar  : "+obj.clientTypeServices);
                                        console.log("Numero de contrato: "+obj.numeroContrato);
                                        console.log("============================================================================");
                                        //console.log(obj);
                                $('#confirmRequestModal').modal('toggle');
                                }else if (confirm==1){
                                    $scope.switchCustomersFn('services', $scope.updateService, 'update');
                                $('#confirmRequestModal').modal('hide');
                                }
                            break;
                            case "updateSysUser":
                                if (confirm==0){
                                    if ($scope.sysLoggedUser.idProfileKf==1 && obj.idUser!=0){
                                        if (obj.idProfileKf){
                                            $scope.mess2show="El usuario ("+obj.fullNameUser+") bajo el perfil de "+obj.nameProfile+" sera Actualizado.     Confirmar?";
                                        }
                                        $scope.idUserKf   =  obj.idUser;
                                        $scope.argObj = obj;
                                        console.log('Usuario a eliminar ID: '+$scope.idUserKf+' BAJO EL NOMBRE: '+obj.fullNameUser);
                                        console.log("============================================================================")
                                        console.log($scope.argObj);
                                    }
                                $('#confirmRequestModal').modal('toggle');
                                }else if (confirm==1){
                                    $scope.sysUpdateUserFn($scope.argObj);
                                $('#confirmRequestModal').modal('hide');
                                }
                            break;
                            case "sign_and_enable_contract":
                                if (confirm==0){
                                $scope.mess2show="El contrato "+obj.numeroContrato+" sera Aprobado y Activado en la fecha: "+$scope.contract.tmpFechaFirma+".     Confirmar?";
                                $scope.argObj={};
                                $scope.argObj = obj;
                                console.log('Contrato a Aprovar y Activar ID: '+obj.idContrato+' Contrato: '+obj.numeroContrato);
                                console.log("============================================================================")
                                console.log($scope.argObj);
                                $('#activationDateContractWindows').modal('hide');
                                $('#confirmRequestModal').modal('toggle');
                                }else if (confirm==1){
                                    $scope.switchCustomersFn('contract', $scope.argObj, 'activateDate');
                                    $('#confirmRequestModal').modal('hide');
                                }
                            break;
                            case "activate_and_enable_contract":
                                if (confirm==0){
                                $scope.mess2show="El contrato "+obj.numeroContrato+" sera Aprobado y Activado en la fecha: "+$scope.contract.tmpFechaFirma+".     Confirmar?";
                                $scope.argObj={};
                                $scope.argObj = obj;
                                console.log('Contrato a Aprovar y Activar ID: '+obj.idContrato+' Contrato: '+obj.numeroContrato);
                                console.log("============================================================================")
                                console.log($scope.argObj);
                                $('#activationDateContractWindows').modal('hide');
                                $('#confirmRequestModal').modal('toggle');
                                }else if (confirm==1){
                                    $scope.switchCustomersFn('contract', $scope.argObj, 'activateDate');
                                    $('#confirmRequestModal').modal('hide');
                                }
                            break;
                            case "contract_enable":
                                if (confirm==0){
                                $scope.mess2show="El contrato "+obj.numeroContrato+" sera activado.     Confirmar?";
                                $scope.argObj={};
                                $scope.argObj = obj;
                                console.log('Contrato a habilitar ID: '+obj.idContrato+' Contrato: '+obj.numeroContrato);
                                console.log("============================================================================")
                                console.log($scope.argObj);
                                $('#confirmRequestModal').modal('toggle');
                                }else if (confirm==1){
                                    $scope.switchCustomersFn('contract', $scope.argObj, 'enable');
                                    $('#confirmRequestModal').modal('hide');
                                }
                            break;
                            case "contract_disable":
                                if (confirm==0){
                                $scope.mess2show="El contrato "+obj.numeroContrato+" sera desactivado. por favor confirmar, Confirmar?";
                                $scope.argObj={};
                                $scope.argObj = obj;
                                console.log('Contrato a desahibilitar ID: '+obj.idContrato+' Contrato: '+obj.numeroContrato);
                                console.log("============================================================================")
                                console.log($scope.argObj);
                                $('#confirmRequestModal').modal('toggle');
                                }else if (confirm==1){
                                    $scope.switchCustomersFn('contract', $scope.argObj, 'disable');
                                    $('#confirmRequestModal').modal('hide');
                                }
                            break;
                            case "contract_remove":
                                if (confirm==0){
                                $scope.mess2show="Se procedera a la Baja del contrato "+obj.numeroContrato+" por favor confirmar, Confirmar?";
                                $scope.argObj={};
                                $scope.argObj = obj;
                                console.log('Contrato a dar de baja ID: '+obj.idContrato+' Contrato: '+obj.numeroContrato);
                                console.log("============================================================================")
                                console.log($scope.argObj);
                                $('#confirmRequestModal').modal('toggle');
                                }else if (confirm==1){
                                    $scope.switchCustomersFn('contract', $scope.argObj, 'init_terminationContract');
                                    $('#confirmRequestModal').modal('hide');
                                }
                            break;
                            case "contract_remove_service_item":
                                if (confirm==0){
                                $scope.mess2show="El item "+obj2.itemName+" de servicio "+obj.serviceName+" sera removido.     Confirmar?";
                                $scope.argObj={};
                                $scope.argObj2={};
                                $scope.argObj = obj;
                                $scope.argObj2 = obj2;
                                console.log('item del Servicio a Remover: '+obj.itemName+' Servicio: '+obj.serviceName);
                                console.log("============================================================================")
                                console.log($scope.argObj);
                                $('#confirmRequestModal').modal('toggle');
                                }else if (confirm==1){
                                    $scope.removeServiceItemFn($scope.argObj, $scope.argObj2);
                                    $('#confirmRequestModal').modal('hide');
                                }
                            break;
                            case "service_remove":
                                if (confirm==0){
                                    $scope.mess2show="El servicio "+obj.clientTypeServices+" ["+obj.idClientServices+"] del contratio N° "+obj2.numeroContrato+" sera removido.     Confirmar?";
                                    $scope.argObj={};
                                    $scope.argObj2={};
                                    $scope.argObj = obj;
                                    $scope.argObj2 = obj2;
                                    console.log('Servicio a Remover: '+obj.clientTypeServices+' id: '+obj.idClientServices);
                                    console.log("============================================================================")
                                    console.log($scope.argObj);
                                    $('#confirmRequestModal').modal('toggle');
                                    }else if (confirm==1){
                                        $scope.switchCustomersFn('services',$scope.argObj,'init_terminateService');
                                        $('#confirmRequestModal').modal('hide');
                                    }
                            break;
                            case "add_enable_initial_keys":
                                if (confirm==0){
                                    $scope.customerDetail=obj;
                                      $scope.mess2show="Datos para Entrega Inicial al Cliente "+obj.name+" ["+obj.ClientType+"].     Confirmar?";
                                      console.log("============================================================================");
                                      console.log("Entrega Inicial.");
                                      console.log("============================================================================");
                                      console.log("ID del Cliente             : "+obj.idClient);
                                      console.log("Dirección del consorcio    : "+obj.address);
                                      console.log("============================================================================");
                                    $('#confirmRequestModalCustom').modal({backdrop: 'static', keyboard: false});
                                    //$('#confirmRequestModalCustom').modal('toggle');
                                }else if (confirm==1){
                                    //console.log($scope.customerDetail);
                                    $scope.switchCustomersFn('customers',$scope.customerDetail,'add_enableInitialKeys');
                                    $('#confirmRequestModalCustom').modal('hide');
                                }else if (confirm<0){
                                    $scope.customer={};
                                }
                            break;
                            case "update_enable_initial_keys":
                                if (confirm==0){
                                    $scope.customerDetail=obj;
                                      $scope.mess2show="Actualizar Datos para Entrega Inicial al Cliente "+obj.name+" ["+obj.ClientType+"].     Confirmar?";
                                      console.log("============================================================================");
                                      console.log("Actualizar Entrega Inicial.");
                                      console.log("============================================================================");
                                      console.log("ID del Cliente             : "+obj.idClient);
                                      console.log("Dirección del consorcio    : "+obj.address);
                                      console.log("============================================================================");
                                    $('#confirmRequestModalCustom').modal({backdrop: 'static', keyboard: false});
                                    //$('#confirmRequestModalCustom').modal('toggle');
                                }else if (confirm==1){
                                    //console.log($scope.customerDetail);
                                    $scope.switchCustomersFn('customers',$scope.customerDetail,'update_enableInitialKeys');
                                    $('#confirmRequestModalCustom').modal('hide');
                                }else if (confirm<0){
                                    $scope.customer={};
                                }
                            break;
                            case "addNewDVRUser":
                                if (confirm==0){
                                    $scope.serviceUser=obj;
                                    var idProfile   = obj.profile==null || obj.profile==undefined?obj.userProfile:obj.profile;
                                      $scope.mess2show="Un nuevo usuario sera agregado al DVR,     Confirmar?";
                                      console.log("============================================================================");
                                      console.log("Nuevo Usuario DVR.");
                                      console.log("============================================================================");
                                      console.log("Usuario   : "+obj.name);
                                      console.log("Perfil    : "+idProfile);
                                      console.log("============================================================================");
                                    $('#confirmRequestModalCustom').modal({backdrop: 'static', keyboard: false});
                                    //$('#confirmRequestModalCustom').modal('toggle');
                                }else if (confirm==1){
                                    //console.log($scope.customerDetail);
                                    $scope.processServiceUserDVRFn($scope.serviceUser);
                                    $('#confirmRequestModalCustom').modal('hide');
                                }else if (confirm<0){
                                    $scope.customer={};
                                }

                            break;
                            case "skipTicketValidation":
                                if (confirm==0){
                                    $scope.argObj=obj;
                                    console.log("skipTicketValidationTmp: "+$scope.argObj);

                                    if($scope.contract.update.skipTicketValidationTmp){
                                        $scope.mess2show="Deshabilitar la validación de los tickets asociados al contrato,     Confirmar?";
                                    }else{
                                        $scope.mess2show="Habilitar la validación de los tickets asociados al contrato,     Confirmar?";
                                    }
                                    $('#confirmRequestModalCustom').modal({backdrop: 'static', keyboard: false});
                                }else if (confirm==1){
                                    console.log("skipTicketValidationTmp: "+$scope.argObj);
                                    $scope.skipTicketValidation=1;

                                    if($scope.contract.update.skipTicketValidationTmp){
                                        inform.add('Validación deshabilitada, continuar con la baja del contrato. ',{
                                                ttl:8000, type: 'warning'
                                        });
                                        $scope.skipTicketValidation=1;
                                    }else{
                                        inform.add('Validación habilitada, procesar los pedidos asociados antes de continuar con la baja del contrato. ',{
                                                ttl:8000, type: 'warning'
                                        });
                                        $scope.skipTicketValidation=0;
                                    }
                                    $('#confirmRequestModalCustom').modal('hide');
                                }else if (confirm==null){

                                    if ($scope.skipTicketValidation==0 || $scope.skipTicketValidation==null){
                                        $scope.contract.update.skipTicketValidationTmp=false
                                    }else{
                                        $scope.contract.update.skipTicketValidationTmp=true
                                    }
                                }
                            break;
                            default:
                        }
                    }
            /**************************************************
            *                                                 *
            *          COLLAPSE / EXPAND TABLE ROWS           *
            *                                                 *
            **************************************************/
                $scope.tableRowExpanded          = false;
                $scope.tableRowIndexCurrExpanded = "";
                $scope.tableRowIndexPrevExpanded = "";
                $scope.dayDataCollapseFn = function () {
                    $scope.tableRowExpanded          = false;
                    $scope.tableRowIndexCurrExpanded = "";
                    $scope.tableRowIndexPrevExpanded = "";
                    $scope.vIndex=null;
                    $scope.dayDataCollapse = [true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true];
                    };
                $scope.dayDataCollapse = [];
                $scope.vIndex=null;
                $scope.selectTableRow = function (value, idItem, opt) {
                    $scope.vIndex = value;
                    $scope.idDeptoKf = idItem;
                    console.log("[selectTableRow]->idItem: "+idItem);
                    if ($scope.dayDataCollapse === 'undefined') {
                        $scope.dayDataCollapse = $scope.dayDataCollapseFn();
                        console.log("dayDataCollapse:");
                        console.log($scope.dayDataCollapse);
                    } else {
                        //console.log("dayDataCollapse != undefined");
                        //console.log($scope.dayDataCollapse);
                        //console.log('Variable tableRowExpanded: '+$scope.tableRowExpanded);
                        //console.log('Variable tableRowIndexCurrExpanded: '+$scope.tableRowIndexCurrExpanded);
                        if ($scope.tableRowExpanded === false && $scope.tableRowIndexCurrExpanded === "") {
                            //console.log("ROWEXPANDED FALSE")
                            $scope.tableRowIndexPrevExpanded = "";
                            $scope.tableRowExpanded = true;
                            $scope.tableRowIndexCurrExpanded = $scope.vIndex;
                            $scope.dayDataCollapse[$scope.vIndex] = false;
                            //console.log('Id del idItem: '+idItem+' / Index Id de la tabla: ' +$scope.vIndex);
                            if(opt=="depto"){$scope.searchTenant('listTenant', idItem);}
                            if(opt=="service"){$scope.getListContractServicesFn(idItem, null);}
                            //console.log("===================================")
                        } else if ($scope.tableRowExpanded === true) {
                                //console.log("ROWEXPANDED TRUE")
                            if ($scope.tableRowIndexCurrExpanded === $scope.vIndex) {
                                //console.log("tableRowIndexCurrExpanded == vIndex")
                                $scope.tableRowExpanded = false;
                                $scope.tableRowIndexCurrExpanded = "";
                                //console.log('Id del idItem: '+idItem+' / Index Id de la tabla: ' +$scope.vIndex);
                                $scope.dayDataCollapse[$scope.vIndex] = true;
                                $scope.vIndex =null;
                                //console.log("===================================")
                            } else {
                                //console.log("tableRowIndexCurrExpanded != vIndex")
                                //console.log('Id del idItem: '+idItem+' / Index Id de la tabla: ' +$scope.vIndex);
                                $scope.tableRowIndexPrevExpanded = $scope.tableRowIndexCurrExpanded;
                                $scope.tableRowIndexCurrExpanded = $scope.vIndex;
                                if(opt=="depto"){$scope.searchTenant('listTenant', idItem);}
                                if(opt=="service"){$scope.getListContractServicesFn(idItem, null);}
                                $scope.dayDataCollapse[$scope.tableRowIndexPrevExpanded] = true;
                                $scope.dayDataCollapse[$scope.tableRowIndexCurrExpanded] = false;
                                //console.log("===================================")
                            }
                        }
                    }
                };
            /**************************************************/
            /******************************
            *    UTIL FOR CUSTOMER DATA   *
            ******************************/
                    $scope.customersSearch={
                        "searchFilter":null,
                        "isNotCliente":"0",
                        "idClientTypeFk":null,
                        "isInDebt": null,
                        "start":"1",
                        "limit":"10",
                        "strict": null
                    }
                /**************************************************
                *                                                 *
                *             LIST CUSTOMER SERVICE               *
                *                                                 *
                **************************************************/
                    $scope.getCustomersListRs = {'customerList':null, 'totalNumberOfCustomer':0}
                    $scope.setCustomersListRs = {}
                    $scope.getCustomerLisServiceFn = function(searchFilter, isNotCliente, idClientTypeFk, isInDebt, start, limit, strict){
                        console.log($scope.customerSearch);
                        console.log(idClientTypeFk);
                        var searchFilter    = searchFilter!=undefined && searchFilter!="" && searchFilter!=null?searchFilter:null;
                        var isNotCliente    = isNotCliente!=undefined && isNotCliente!=null?isNotCliente:"0";
                        var idClientTypeFk  = idClientTypeFk!=undefined && idClientTypeFk!="" && idClientTypeFk!=null?idClientTypeFk:null;
                        var isInDebt        = isInDebt!=false && isInDebt!=undefined && isInDebt!=null?1:null;
                        var start           = start!=undefined && start!=null && (!isInDebt && !strict)?start:"";
                        var limit           = limit!=undefined && limit!=null && (!isInDebt && !strict)?limit:"";
                        var strict          = strict!=false && strict!=undefined && strict!=null?strict:null;
                        $scope.getCustomersListRs = {'customerList':null, 'totalNumberOfCustomer':0}
                        $scope.customersSearch={
                        "searchFilter":searchFilter,
                        "isNotCliente":isNotCliente,
                        "idClientTypeFk":idClientTypeFk,
                        "isInDebt":isInDebt,
                        "start":start,
                        "limit":limit,
                        "strict":strict
                        };
                        console.log($scope.customersSearch);
                        return CustomerServices.getCustomerListLimit($scope.customersSearch).then(function(response){
                        //console.info(response);
                        if(response.status==200){
                            return response.data;
                        }else if(response.status==404){
                            return response;
                        }
                        });
                    }
                /**************************************************
                 *                                                 *
                 *         LIST ADMINISTRATION CUSTOMERS           *
                 *                                                 *
                 **************************************************/
                    $scope.getAdminCustomersListFn = function() {
                        $scope.getCustomerLisServiceFn(null,"0",1, null, "","",null).then(function(data) {
                            $scope.rsCustomerAdminListData = data.customers;
                        }, function(err) {
                            $scope.customersSearch.idClientTypeFk = null;
                        });
                    };//$scope.getAdminCustomersListFn();
                    $scope.getCustomerBusinessNameByIdFn = function(clientId){
                        //console.log("getCustomerBusinessNameByIdFn: "+clientId);
                        var arrCompanySelect = [];
                        if (clientId!=undefined){
                          CustomerServices.getCustomersById(clientId).then(function(response){
                            if(response.status==200){
                              //console.log(response.data);
                              arrCompanySelect.push({'idClient':response.data.idClient, 'businessName':response.data.businessName});
                            }
                          });
                        }else{
                            inform.add('Client Id, no recibido. ',{
                              ttl:4000, type: 'warning'
                            });
                        }
                        //console.log(arrCompanySelect);
                        return arrCompanySelect;
                      }
                    $scope.getZoneNameFn = function(zoneId){
                        //console.log("getZoneNameFn: "+zoneId);
                        $scope.zoneInfo={}
                        //console.log($scope.rsZonesData);
                        for (var key in  $scope.rsZonesData){
                            if ($scope.rsZonesData[key].idZona==zoneId){
                                $scope.zoneInfo.n_zona=$scope.rsZonesData[key].n_zona;
                                $scope.zoneInfo.descripcion=$scope.rsZonesData[key].descripcion;
                                break;
                            }
                        }
                    //console.log($scope.zoneInfo);
                    return $scope.zoneInfo;
                    }
            /**************************************************
            *                                                 *
            *           LIST CUSTOMER REGISTERED              *
            *                                                 *
            **************************************************/
                $scope.rsCustomerListData = [];
                $scope.rsCustomerAdminListData = [];
                $scope.rsFrmCustomerListData = [];
                $scope.rsCustomerListByTypeData = [];
                $scope.rsCustomerSelectData = [];
                $scope.customersRawData=[];
                $scope.getCustomerListFn = function(optSwitch, opt){
                    $scope.rsCustomerListData = [];
                    $scope.rsFrmCustomerListData = [];
                    $scope.rsCustomerListByTypeData = [];
                    $scope.rsCustomerSelectData = [];
                };
            /**************************************************
            *                                                 *
            *              GET CUSTOMERS CONTRACT             *
            *                                                 *
            **************************************************/
             $scope.rsContractsListByCustomerIdData=[];
             $scope.rsContractNotFound=false;
             $scope.getContractsByCustomerIdFn=function(idClient, opt){
                 $scope.rsContractsListByCustomerIdData=[];
                 ContractServices.getContractListByCustomerId(idClient).then(function(data){
                     $scope.rsJsonData = data;
                     //console.log($scope.rsJsonData);
                     if($scope.rsJsonData.status==200){
                        $scope.rsContractNotFound=false;
                        $scope.rsContractsListByCustomerIdData=$scope.rsJsonData.data;
                        if(opt=="assign"){$scope.customerFound.contratos=$scope.rsContractsListByCustomerIdData;}
                     }else{
                        $scope.rsContractsListByCustomerIdData=[];
                        $scope.rsContractNotFound=true;
                        inform.add('No se existen contratos asociados al cliente. ',{
                                ttl:2000, type: 'warning'
                        });
                     }
                     //console.log($scope.rsContractsListByCustomerIdData);
                 });
             }
             $scope.filterTypeOfMaintenance = function(item){
                      return item.idTypeMaintenance != "3"
              };
              /**************************************************
              *                                                 *
              *         LIST OF ATTENDANTS BY ID ADDRESS        *
              *                                                 *
              **************************************************/
              $scope.attendantListByClient = [];
              $scope.getAttendantListFn = function(idClient){
                  $scope.attendantListByClient = [];
                  userServices.attendantsOnlyList(idClient).then(function(response) {
                      if(response.status==200){
                          $scope.attendantListByClient = response.data;
                          $scope.attendantFound=true;
                      }else if (response.status==404){
                          $scope.attendantFound=false;
                          $scope.attendantListByClient = [];
                          if ($scope.isRequest!="costs"){
                              inform.add('No se encontraron Encargados asociados al consorcio seleccionado. ',{
                                  ttl:5000, type: 'info'
                              });
                          }
                      }else if (response.status==500){
                          $scope.attendantFound=false;
                          inform.add('[Error]: '+response.status+', Ocurrio error intenta de nuevo o contacta el area de soporte. ',{
                              ttl:5000, type: 'danger'
                          });
                      }
                  });

              }
            /**************************************************
            *                                                 *
            *                 SEARCH CUSTOMERS                *
            *                                                 *
            **************************************************/
                $scope.searchCustomerFound=false;
                $scope.findCustomerFn=function(string, typeClient, strict){
                    if(event.keyCode === 40 || event.which === 40){
                        console.log(event.which);
                    }
                    var output=[];
                    var i=0;
                    if (string!=undefined && string!=""){
                        $scope.getCustomerLisServiceFn(string, "0", typeClient, null, 0, 0, strict).then(function(response) {
                            if(response.status==undefined){
                              $scope.listCustomerFound = response.customers;
                              //$scope.pagination.totalCount = response.customers.length;
                              console.info($scope.listCustomerFound);
                            }else if(response.status==404){
                              $scope.listCustomerFound = [];
                              //$scope.pagination.totalCount  = 0;
                            }
                          }, function(err) {
                            $scope.listCustomerFound = [];
                            //$scope.pagination.totalCount  = 0;
                          });
                    }
                console.info($scope.listCustomerFound);
                }
                $scope.customerFound={};
                $scope.loadCustomerFieldsFn=function(obj){
                    $scope.customerFound={};
                    $scope.rsAllServicesListOfCustomer=[];
                    console.log("===============================");
                    console.log("|  SERVICE CUSTOMER SELECTED  |");
                    console.log("===============================");
                    console.log(obj);
                    $scope.customerFound=obj;
                    if (obj.billing_information==undefined || obj.billing_information.length==0){
                        console.log("UNDEFINED");
                        inform.add("El Consorcio "+obj.name+ "no posee Datos de Facturación.",{
                                ttl:10000, type: 'danger'
                        });
                    }else{
                        $scope.customerFound.billing_information_details=obj.billing_information[0];
                    }
                    $scope.customerSearch.name=obj.name;
                    //COMPANY RELATED
                    if($scope.customerFound.idClientType=="2"){
                        if ($scope.customerFound.idClientAdminFk!=null && $scope.customerFound.idClientAdminFk!=undefined){
                          var arrCompany=[]
                          arrCompany=$scope.getCustomerBusinessNameByIdFn($scope.customerFound.idClientAdminFk);
                          //console.log(arrCompany);
                          $timeout(function() {
                            if (arrCompany.length==1){
                                $scope.customerFound.companyBusinessName=arrCompany[0].businessName;
                            }
                          }, 500);
                        }else{
                            inform.add("El Consorcio "+obj.name+ " no se encuentra asociado a una Administración.",{
                                    ttl:10000, type: 'danger'
                            });
                        }
                        $timeout(function() {
                            $scope.getAttendantListFn($scope.customerFound.idClient);
                        }, 700);
                    }
                    if ($scope.customerFound.idClientType=="4"){
                        if ($scope.customerFound.idClientCompaniFk!=null && $scope.customerFound.idClientCompaniFk!=undefined){
                        var companyBusinessName = $scope.customerFound.idClientCompaniFk;
                            var arrCompany=[]
                            arrCompany=$scope.getCustomerBusinessNameByIdFn($scope.customerFound.idClientCompaniFk);
                            //console.log(arrCompany);
                            $timeout(function() {
                              if (arrCompany.length==1){
                                  $scope.customerFound.companyBusinessName=arrCompany[0].businessName;
                              }
                            }, 500);
                        }else{
                        inform.add("La Sucursal "+obj.name+ " no se encuentra asociada a una Empresa/Administracion.",{
                                ttl:10000, type: 'danger'
                        });
                        }
                    }
                    $scope.customerFound.IsInDebtTmp=obj.IsInDebt==1?true:false;
                    $scope.customerFound.isStockInBuildingTmp=obj.isStockInBuilding==1?true:false;
                    $scope.customerFound.isStockInOfficeTmp=obj.isStockInOffice==1?true:false;
                    $scope.customerFound.servicesStatustURL = serverHost+"/status/services/"+$scope.customerFound.idClient;
                    console.log($scope.customerFound.idClient);
                    var zonaInfo=$scope.getZoneNameFn($scope.customerFound.idZonaFk);
                    $scope.getContractsByCustomerIdFn($scope.customerFound.idClient,'assign');
                    $scope.dayDataCollapseFn();
                    $timeout(function() {
                        if ($scope.rsContractsListByCustomerIdData.length>0){
                            $scope.getListCustomersServicesFn($scope.customerFound.idClient, null);
                            //SERVICE LIST BY EACH CONTRACT LISTED BY THE CUSTOMER
                            $scope.rsAllServicesListOfCustomer = $scope.getListContractServices2Fn($scope.rsContractsListByCustomerIdData);
                        }
                    }, 1000);
                    $scope.customerFound.zona=zonaInfo.n_zona==undefined?null:zonaInfo;
                    $scope.listCustomerFound=null;
                    $scope.searchCustomerFound=true;
                    //$scope.loadPagination($scope.list_tmp_services, "id", "10");
                    //$scope.loadPagination($scope.list_tmp_contracts, "id", "10");
                    //console.log($scope.customerFound);

                }
                /**************************************************
                *                                                 *
                *      CHECK IF THERE IS LOCAL STORAGE DATA       *
                *                                                 *
                **************************************************/
                    console.log($scope.getSelectedCustomerData);
                    if ($scope.getSelectedCustomerData) {
                        $scope.searchCustomerFound=true;
                        $scope.loadCustomerFieldsFn($scope.getSelectedCustomerData);
                        tokenSystem.destroyTokenStorage(6);
                    }


                $scope.checkDoor = function(door){
                    if (door.idAccessControlDoor=="7"){
                        if ($scope.service.update.serviceItems!=undefined){
                            $scope.service.update.serviceItems.qtty=1;
                        }else{
                            $scope.service.new.serviceItems.qtty=1;
                        }

                    }
                }

            /**************************************************
            *                                                 *
            *           SERVICES CONTRACTS CUSTOMERS          *
            *                                                 *
            **************************************************/

                $scope.list_services_tmp=[];
                $scope.list_customer_contracts=[];
                $scope.isServiceExist=false;
                $scope.isServiceItemExist=false;
                $scope.preLoadServicesArrFn = function(){
                    var i=0;
                    $scope.list_services_tmp=[];
                    for (var srvs in $scope.rsServiceTypeData){
                        $scope.list_services_tmp.push({'id':(i+1), 'idServiceType':$scope.rsServiceTypeData[srvs].idClientTypeServices, 'serviceName':$scope.rsServiceTypeData[srvs].clientTypeServices, 'serviceItems':[]});
                        i++;
                    }
                }
                $scope.addServiceArrFn = function (opt, obj){
                    //console.log("Option: "+opt);
                    console.log(obj);
                    if (opt=="new"){
                        /*Validate if the type of service is access control or internet */
                        if (obj.serviceType.idClientTypeServices=="1" || obj.idServiceType=="1"){
                            var itemName=obj.serviceItems.accCrtlDoor.titulo;
                        }else if (obj.serviceType.idClientTypeServices=="2" || obj.idServiceType=="2"){
                            var itemName=obj.serviceItems.internetType.nombre;
                        }else if ((obj.serviceType.idClientTypeServices>="3" || obj.idServiceType<="3") && (obj.serviceType.idClientTypeServices<="4" || obj.idServiceType<="4")){
                            var itemName="CAMARAS";
                        }else{
                            var itemName=obj.serviceType.clientTypeServices==undefined?obj.serviceName:obj.serviceType.clientTypeServices;
                        }
                        for (var srvs in $scope.list_services_tmp){
                            if ($scope.list_services_tmp[srvs].idServiceType==obj.serviceType.idClientTypeServices){
                                if ($scope.list_services_tmp[srvs].serviceItems!=undefined && $scope.list_services_tmp[srvs].serviceItems.length>=0){
                                    for (var item in  $scope.list_services_tmp[srvs].serviceItems){
                                        if ($scope.list_services_tmp[srvs].serviceItems[item].idServiceTypeFk==obj.serviceType.idClientTypeServices && $scope.list_services_tmp[srvs].  serviceItems[item].qtty==obj.serviceItems.qtty){
                                            console.log("obj.serviceType.idClientTypeServices: "+obj.serviceType.idClientTypeServices+ " (Encontrado)");
                                        if (obj.serviceType.idClientTypeServices=="5" || obj.serviceType.idClientTypeServices=="6"){
                                            var ptag= itemName.toUpperCase();
                                            inform.add("El Servicio: "+ptag+", ya ha sido agregado.",{
                                            ttl:5000, type: 'warning'
                                            });
                                            $scope.isServiceItemExist=true;
                                            break;
                                        }else if (obj.serviceType.idClientTypeServices=="1" || obj.serviceType.idClientTypeServices=="2"){
                                            console.log("obj.serviceType.idClientTypeServices == 1 OR 2 : "+obj.serviceType.idClientTypeServices+ " (Encontrado)");
                                            if (obj.serviceType.idClientTypeServices=="1" && $scope.list_services_tmp[srvs].serviceItems[item].idAccCrtlDoor!=7 &&
                                            $scope.list_services_tmp[srvs].serviceItems[item].idAccCrtlDoor==obj.serviceItems.accCrtlDoor.idAccessControlDoor){
                                                console.log("obj.serviceItems.accCrtlDoor.idAccessControlDoor: "+obj.serviceItems.accCrtlDoor.idAccessControlDoor+ " (Encontrado)");
                                                var ptag= itemName.toUpperCase();
                                                inform.add("La puerta : "+ptag+", ya esta asociada al servicio control de acceso.",{
                                                    ttl:5000, type: 'warning'
                                                });
                                                $scope.isServiceItemExist=true;
                                                break;
                                            }else if (obj.serviceType.idClientTypeServices=="2" && $scope.list_services_tmp[srvs].serviceItems[item].itemName==obj.serviceItems.internetType.nombre){
                                                console.log("obj.serviceItems.internetType.nombre: "+obj.serviceItems.internetType.nombre+ " (Encontrado)");
                                                var ptag= itemName.toUpperCase();
                                                inform.add("El dispositivo: "+ptag+", ya ha sido agregado.",{
                                                    ttl:5000, type: 'warning'
                                                });
                                                $scope.isServiceItemExist=true;
                                                break;
                                            }else{
                                                console.log("obj.serviceType.idClientTypeServices == 1 OR 2 : "+obj.serviceType.idClientTypeServices+ " (No Encontrado)");

                                                $scope.isServiceItemExist=false;
                                            }
                                        }else{
                                            $scope.isServiceItemExist=false;
                                        }
                                        }else{
                                        $scope.isServiceItemExist=false;
                                        }
                                    }
                                }else{
                                    $scope.isServiceItemExist=false;
                                }

                                var idItemNumb=0;
                                var itemAclaration=null;
                                var itemAclaration=obj.serviceType.idClientTypeServices=="1" && obj.serviceItems.accCrtlDoor.idAccessControlDoor=="7"?obj.serviceItems.itemAclaracion:null;
                                var itemQtty=obj.serviceType.idClientTypeServices=="1" || obj.serviceType.idClientTypeServices=="3" || obj.serviceType.idClientTypeServices=="4"?obj.serviceItems.qtty:1;
                                if (obj.serviceType.idClientTypeServices=="1"){
                                    var idServiceItem=obj.serviceItems.accCrtlDoor.idAccessControlDoor;
                                }else if (obj.serviceType.idClientTypeServices=="2"){
                                    var idServiceItem=obj.serviceItems.internetType.idTipoServicioInternet;
                                }else{
                                    var idServiceItem=null;
                                }
                                if (!$scope.isServiceItemExist && ($scope.list_services_tmp[srvs].serviceItems==undefined || $scope.list_services_tmp[srvs].serviceItems.length<=0)){
                                    //console.log("scope.isServiceItemExist: "+$scope.isServiceItemExist+" Y $scope.list_services_tmp[srvs].serviceItems.length: "+$scope.list_services_tmp[srvs].serviceItems.length);
                                    idItemNumb=0;

                                    $scope.list_services_tmp[srvs].serviceItems.push({'id':(idItemNumb+1), 'qtty':itemQtty, 'idAccCrtlDoor':idServiceItem,'itemName':itemName, 'itemAclaracion':itemAclaration, 'idServiceTypeFk':obj.serviceType.idClientTypeServices});

                                }else if((!$scope.isServiceItemExist) && $scope.list_services_tmp[srvs].serviceItems.length>0){
                                    //console.log("scope.isServiceItemExist: "+$scope.isServiceItemExist+" Y $scope.list_services_tmp[srvs].serviceItems.length: "+$scope.list_services_tmp[srvs].serviceItems.length);
                                    for (var item in  $scope.list_services_tmp[srvs].serviceItems){idItemNumb=$scope.list_services_tmp[srvs].serviceItems[item].id;}

                                    $scope.list_services_tmp[srvs].serviceItems.push({'id':(idItemNumb+1), 'qtty':itemQtty, 'idAccCrtlDoor':idServiceItem,'itemName':itemName, 'itemAclaracion':itemAclaration, 'idServiceTypeFk':obj.serviceType.idClientTypeServices});
                                }
                                if ((!$scope.isServiceItemExist && $scope.list_services_tmp[srvs].serviceItems.length>=0 && obj.serviceType.idClientTypeServices!="5" && obj.serviceType.idClientTypeServices!="6" && !$scope.isServiceItemExist) || ((!$scope.isServiceItemExist || $scope.isServiceItemExist) && $scope.list_services_tmp[srvs].serviceItems.length>=0 && (obj.serviceType.idClientTypeServices=="3" || obj.serviceType.idClientTypeServices=="4"))){
                                    inform.add("El item: "+itemName+" del servicio: "+obj.serviceType.clientTypeServices+", ha sido agregado.",{
                                            ttl:5000, type: 'success'
                                    });
                                }else if ((obj.serviceType.idClientTypeServices=="5" || obj.serviceType.idClientTypeServices=="6") && !$scope.isServiceItemExist){
                                    inform.add("El Servicio: "+obj.serviceType.clientTypeServices+" ha sido agregado.",{
                                        ttl:5000, type: 'success'
                                    });
                                }
                            }
                        }
                        //$scope.service.new.serviceItems.accCrtlDoor=null;
                        //$scope.service.new.serviceItems.qtty=null;
                        console.log($scope.list_services_tmp);
                        $scope.validateServiceListItemsFn();
                    }else if (opt=="load"){
                        for (var srvs in $scope.list_services_tmp){
                        if($scope.list_services_tmp[srvs].idServiceType==obj.idServiceType){
                            $scope.list_services_tmp[srvs].idServiciosDelContrato=obj.idServiciosDelContrato;
                            $scope.list_services_tmp[srvs].item_available=obj.item_available;
                            $scope.list_services_tmp[srvs].item_contracted=obj.item_contracted;
                            $scope.list_services_tmp[srvs].items_available=obj.idServiceType=="1" || obj.idServiceType=="3" || obj.idServiceType=="4"?obj.items_available:null;
                            $scope.list_services_tmp[srvs].items_contracted=obj.idServiceType=="1" || obj.idServiceType=="3" || obj.idServiceType=="4"?obj.items_contracted:null;
                            $scope.list_services_tmp[srvs].item_used=obj.item_used;
                            $scope.list_services_tmp[srvs].serviceName=obj.serviceName;
                            if (obj.service_items==undefined){
                            $scope.list_services_tmp[srvs].serviceItems=[];
                            }else{
                                $scope.list_services_tmp[srvs].serviceItems=obj.service_items;
                            }
                            var idItemNumb=0;
                            for(var item in $scope.list_services_tmp[srvs].serviceItems){
                            $scope.list_services_tmp[srvs].serviceItems[item].id=(idItemNumb+1);
                            if ($scope.list_services_tmp[srvs].serviceItems[item].idServiceTypeFk=="1" && ($scope.list_services_tmp[srvs].serviceItems[item].qtty==null || $scope.list_services_tmp[srvs].serviceItems[item].qtty=="")){
                                $scope.list_services_tmp[srvs].serviceItems[item].qtty=1;
                            }
                            $scope.list_services_tmp[srvs].serviceItems[item].serviceItemEdit=false;
                            idItemNumb++;
                            }
                            //console.log($scope.list_services_tmp[srvs]);
                            break;
                        }
                        }
                        console.log($scope.list_services_tmp);
                        $scope.validateServiceListItemsFn();
                    }
                    //console.log($scope.list_services_tmp);
                }
                $scope.closeServicePanel=function(){
                    $scope.searchCustomerFound=false;
                    $scope.customerSearch={Name:''};
                    $scope.customerFound={};
                    $('#customerSearch').focus();
                    $scope.getCustomerListFn("registered", "");
                    $scope.customerSearch.typeClient=null;
                }

                $scope.removeServiceItemFn = function(obj, item){
                    //console.log(obj);
                    var objArr     = $scope.list_services_tmp;
                    var indexObj   = objArr.map(function(o){return o.id;});
                    var objIndex   = indexObj.indexOf(obj.id);
                    //console.log("$scope.list_services_tmp.id: "+objIndex);
                    var objItem     = $scope.list_services_tmp[objIndex].serviceItems;
                    var arrItem     = objItem.map(function(i){return i.id;});
                    var indexItem   = arrItem.indexOf(item.id);
                    //console.log("$scope.list_services_tmp.serviceItems.id: "+indexItem);

                    $scope.list_services_tmp[objIndex].serviceItems.splice(indexItem, 1);
                        if (obj.idServiceType!="5" && obj.idServiceType!="6"){
                            inform.add("El item: "+item.itemName+" del servicio: "+obj.serviceName+", ha sido eliminado.",{
                                ttl:5000, type: 'success'
                            });
                        }else{
                            inform.add("El Servicio: "+obj.serviceName+" ha sido eliminado.",{
                                    ttl:5000, type: 'success'
                            });
                        }
                    if($scope.list_services_tmp[objIndex].serviceItems.length==0){
                        $scope.list_services_tmp[objIndex].item_available=null;
                        $scope.list_services_tmp[objIndex].item_contracted=null;
                        $scope.list_services_tmp[objIndex].items_available=null;
                        $scope.list_services_tmp[objIndex].items_contracted=null;
                        $scope.list_services_tmp[objIndex].item_used=null;
                    }
                    $scope.validateServiceListItemsFn();
                    console.log($scope.list_services_tmp);
                }
                $scope.serviceItemListOk=false;
                $scope.validateServiceListItemsFn = function(){
                    for (var srvs in $scope.list_services_tmp){
                        if ($scope.list_services_tmp[srvs].serviceItems!=undefined && $scope.list_services_tmp[srvs].serviceItems.length>0){
                        $scope.serviceItemListOk=true;
                        break;
                        }else{
                        $scope.serviceItemListOk=false;
                        }
                    }
                }
                $scope.newitemAclaracion="";
                $scope.contractServiceItemEditFn = function(opt, srvs, obj){
                    switch(opt){
                        case "edit":
                            if (obj.idAccCrtlDoor!="7"){
                                //console.log(srvs);
                                //console.log(item);
                                $('#itemQttyEdit').focus();
                                $scope.serviceItems={'qtty':null};
                                obj.serviceItemEdit=true;
                            }else{
                                console.log(srvs);
                                console.log(obj);
                                $scope.newitemAclaracion="";
                                $scope.itemAclaracionEdit=true;
                                obj.itemAclaracionEdit=true;
                            }

                        break;
                        case "assign":
                            if (obj.idAccCrtlDoor!="7"){
                                //console.log(srvs);
                                //console.log(obj);
                                var itemQtty=obj.qtty==null?0:parseInt(obj.qtty);
                                //console.log("Actual cantidad: "+itemQtty);
                                //console.log("nueva cantidad: "+$scope.serviceItems.qtty);
                                obj.qtty=Number(itemQtty) + Number(parseInt($scope.serviceItems.qtty));
                                obj.serviceItemEdit=false;
                                inform.add("Servicio ["+srvs.serviceName+"]: la cantidad de "+obj.itemName+" ha sido incrementado satisfactoriamente.",{
                                    ttl:5000, type: 'success'
                                });
                                inform.add("Recuerde al finalizar los cambios en el contrato, hacer click en \"Actualizar\" para guardar los cambios. ",{
                                    ttl:15000, type: 'info'
                                });
                                console.log($scope.list_services_tmp);
                            }else{
                                console.log(srvs);
                                console.log(obj);
                                console.log($scope.list_services_tmp[0].newitemAclaracion);
                                obj.itemAclaracion=$scope.list_services_tmp[0].newitemAclaracion;
                                inform.add("Servicio ["+srvs.serviceName+"]: la aclaración de la puerta "+obj.itemName+" ha sido modificada satisfactoriamente.",{
                                    ttl:5000, type: 'success'
                                });
                                inform.add("Recuerde al finalizar los cambios en el contrato, hacer click en \"Actualizar\" para guardar los cambios. ",{
                                    ttl:15000, type: 'info'
                                });
                                $scope.itemAclaracionEdit=false;
                                obj.itemAclaracionEdit=false;
                                $scope.list_services_tmp[0].newitemAclaracion="";
                                console.log($scope.list_services_tmp);
                            }
                        break;
                    }

                }

            /**************************************************
            *                                                 *
            *                CUSTOMERS CONTRACT               *
            *                                                 *
            **************************************************/
                /***********************************
                *       GETTING CONTRACT DATA      *
                ************************************/
                    $scope.customerContractFn = function(contract, opt){
                        switch(opt){
                            case "create": //NEW CUSTOMER CONRACT
                                $scope.contract.new.services             = $scope.list_services_tmp;
                                $scope.contract.new.idStatusFk           = 0;
                                var currentDate        = moment($scope.contract.new.dateOfSign, 'DD/MM/YYYY').format('YYYY-MM-DD');
                                console.log(typeof currentDate);
                                var rawDate            = moment(currentDate).toDate();
                                console.log(typeof rawDate);
                                var formatedDate       = moment(rawDate).format('YYYY-MM-DD');
                                console.log(typeof formatedDate);
                                $scope.contract.new.fechaFirmaVigencia   = formatedDate;
                                $scope.contract.new.fechaFirma = null;
                                var parsedDate = moment($scope.contract.new.dateOfSign, 'DD/MM/YYYY');
                                var short_date = parsedDate.format('DDMMYY');
                                $scope.contract.new.dateCodeDigits       = short_date;
                                $scope.contract.new.numeroContrato       = $scope.contract.new.idClientFk+"-"+$scope.contract.new.code+"-"+$scope.contract.new.dateCodeDigits;
                                console.log($scope.contract.new);
                                $scope.addCustomerContractFn($scope.contract.new);
                            break;
                            case "edit": //UPDATE CUSTOMER CONRACT
                                $scope.contract.update=contract;
                                blockUI.start('Cargando contrato: '+contract.numeroContrato);
                                $scope.preLoadServicesArrFn();
                                for (var key in $scope.contract.update.services){
                                    $scope.addServiceArrFn("load", $scope.contract.update.services[key]);
                                }
                                $timeout(function() {
                                    $('#UpdateCustomerContract').modal('show');
                                    blockUI.stop();
                                }, 1500);
                                //console.log($scope.contract.update);
                            break;
                            case "update": //UPDATE CUSTOMER CONRACT
                                $scope.contract.update.services             = $scope.list_services_tmp;
                                console.log($scope.contract.update);
                                $scope.updateCustomerContractFn($scope.contract.update);
                            break;
                            case "info": //INFO CUSTOMER CONRACT
                                $scope.contract.info=contract;
                                blockUI.start('Cargando contrato: '+contract.numeroContrato);
                                $scope.preLoadServicesArrFn();
                                for (var key in $scope.contract.info.services){
                                    $scope.addServiceArrFn("load", $scope.contract.info.services[key]);
                                }
                                $timeout(function() {
                                    $('#detailsCustomerContract').modal('show');
                                    blockUI.stop();
                                }, 1500);
                                //console.log($scope.contract.update);
                            break;
                            case "activateDate": //ENABLE CUSTOMER CONRACT
                                contract.idStatusFk = 1;
                                var rawDate                   = moment($scope.contract.activateDate.tmpFechaFirmaActivacion).toDate();
                                contract.fechaFirmaActivacion = moment(rawDate).format('YYYY-MM-DD');
                                console.log(contract);
                                $scope.setSignDateContractFn(contract);
                            break;
                            case "enable": //ENABLE CUSTOMER CONRACT
                                contract.idStatusFk=1
                                console.log(contract);
                                $scope.changeStatusCustomerContractFn(contract);
                            break;
                            case "disable": //DISABLE CUSTOMER CONRACT
                                contract.idStatusFk=0
                                //console.log(contract);
                                $scope.changeStatusCustomerContractFn(contract);
                            break;
                            case "remove": //DISABLE CUSTOMER CONRACT
                                contract.idStatusFk=-1
                                //console.log(contract);
                                $scope.changeStatusCustomerContractFn(contract);
                            break;
                            case "underLock-add": //ADD UNDER LOCK SYSTEM CONRACT
                                $scope.contract.underLock=contract;
                                if(contract.isSystemUnderLock=="0"){
                                    $scope.contract.underLock.companyHasKeys  = null;
                                    $scope.contract.underLock.customerHasKeys = null;
                                    $scope.contract.underLock.comment_systemUnderLock=null;
                                }else{
                                    $scope.contract.underLock.companyHasKeys  = contract.companyHasKeys==true?1:0;
                                    $scope.contract.underLock.customerHasKeys = contract.customerHasKeys==true?1:0;
                                }
                                //console.log($scope.contract.underLock);
                                $scope.addUnderLockSystemContractFn($scope.contract.underLock);
                            break;
                            case "underLock-update": //ADD UNDER LOCK SYSTEM CONRACT
                                $scope.contract.underLock=contract;
                                if(contract.isSystemUnderLock=="0"){
                                    $scope.contract.underLock.companyHasKeys  = null;
                                    $scope.contract.underLock.customerHasKeys = null;
                                    $scope.contract.underLock.comment_systemUnderLock=null;
                                }else{
                                    $scope.contract.underLock.companyHasKeys  = contract.companyHasKeys==true?1:0;
                                    $scope.contract.underLock.customerHasKeys = contract.customerHasKeys==true?1:0;
                                }
                                console.log($scope.contract.underLock);
                                $scope.updateUnderLockSystemContractFn($scope.contract.underLock);
                            break;
                            default:
                        }
                    }
                /***********************************
                *   ADDING NEW CUSTOMER CONTRACT   *
                ************************************/
                    $scope.addCustomerContractFn = function(contrato){
                        ContractServices.addContract(contrato).then(function(data){
                            $scope.rsJsonData = data;
                            //console.log($scope.rsJsonData);
                            if($scope.rsJsonData.status==200){
                                console.log("Customer Contract Successfully Created");
                                inform.add('El contrato del cliente ha sido realizado con exito. ',{
                                    ttl:2000, type: 'success'
                                });
                                $('#RegisterCustomerContract').modal('hide');
                            }else if($scope.rsJsonData.status==203){
                                console.log("Customer contract already exist, contact administrator");
                                inform.add('INFO: El contracto del Cliente ya se encuentra registrado. ',{
                                    ttl:2000, type: 'warning'
                                });
                                //$('#RegisterModalCustomer').modal('hide');
                            }else if($scope.rsJsonData.status==500){
                                console.log("Customer contract not Created, contact administrator");
                                inform.add('Error: [500] Contacta al area de soporte. ',{
                                    ttl:2000, type: 'danger'
                                });
                                //$('#RegisterModalCustomer').modal('hide');
                            }
                                $scope.getContractsByCustomerIdFn(contrato.idClientFk);
                                //$scope.isNewCustomer=false;
                                //$scope.isUpdateCustomer=false;
                            //console.log($scope.rsLocations_API_Data);
                        });
                    };
                /***********************************
                *     UPDATE CUSTOMER CONTRACT     *
                ************************************/
                    $scope.updateCustomerContractFn = function(contrato){
                        ContractServices.updateContract(contrato).then(function(data){
                            $scope.rsJsonData = data;
                            //console.log($scope.rsJsonData);
                            if($scope.rsJsonData.status==200){
                                console.log("Customer Contract Successfully Updated");
                                inform.add('El contrato del cliente ha sido actualizado con exito. ',{
                                    ttl:2000, type: 'success'
                                });
                                $('#UpdateCustomerContract').modal('hide');
                            }else if($scope.rsJsonData.status==500){
                                console.log("Customer contract not Created, contact administrator");
                                inform.add('Error: [500] Contacta al area de soporte. ',{
                                    ttl:2000, type: 'danger'
                                });
                            }
                                $scope.getContractsByCustomerIdFn(contrato.idClientFk);
                        });
                    };
                /***********************************
                *   SET ACTIVATION DATE CONTRACT   *
                ************************************/
                    $scope.setSignDateContractFn = function(contrato){
                        ContractServices.activationDateContract(contrato).then(function(data){
                            $scope.rsJsonData = data;
                            //console.log($scope.rsJsonData);
                            if($scope.rsJsonData.status==200){
                                console.log("Customer Contract Successfully Created");
                                inform.add('Asignada fecha de firma del contrato y habilitado satisfactoriamente. ',{
                                    ttl:2000, type: 'success'
                                });
                                $('#activationDateContractWindows').modal('hide');
                            }else if($scope.rsJsonData.status==500){
                                console.log("Customer contract not Created, contact administrator");
                                inform.add('Error: [500] Contacta al area de soporte. ',{
                                    ttl:2000, type: 'danger'
                                });
                                $('#activationDateContractWindows').modal('hide');
                            }
                            $scope.getContractsByCustomerIdFn(contrato.idClientFk);
                        });
                    };
                /***********************************
                *  CHANGE STATUS CUSTOMER CONTRACT *
                ************************************/
                    $scope.changeStatusCustomerContractFn = function(contrato){
                        ContractServices.changeStatusContract(contrato.idContrato, contrato.idStatusFk).then(function(data){
                            $scope.rsJsonData = data;
                            //console.log($scope.rsJsonData);
                            if($scope.rsJsonData.status==200){
                                if (contrato.idStatusFk==1){
                                console.log("Customer Contract Successfully Enabled");
                                inform.add('El contrato del cliente ha sido activado con exito. ',{
                                        ttl:3000, type: 'success'
                                });
                                }else{
                                console.log("Customer Contract Successfully Disabled");
                                inform.add('El contrato del cliente ha sido desactivado con exito. ',{
                                        ttl:3000, type: 'info'
                                });
                                }
                            }else if($scope.rsJsonData.status==500){
                                console.log("Customer contract not Created, contact administrator");
                                inform.add('Error: [500] Contacta al area de soporte. ',{
                                    ttl:3000, type: 'danger'
                                });
                            }
                                $scope.getContractsByCustomerIdFn(contrato.idClientFk);
                        });
                    };
                /***********************************
                *  ADD UNDER LOCK SYSTEM CONTRACT  *
                ************************************/
                    $scope.addUnderLockSystemContractFn = function(contrato){
                        ContractServices.addUnderLockSystemContract(contrato).then(function(data){
                            $scope.rsJsonData = data;
                            //console.log($scope.rsJsonData);
                            if($scope.rsJsonData.status==200){
                                console.log("UnderLock System Contract Successfully Created");
                                inform.add('El Sistema bajo llave ha sido asignado con exito. ',{
                                    ttl:2000, type: 'success'
                                });
                                $('#underLockSystem').modal('hide');
                            }else if($scope.rsJsonData.status==203){
                                console.log("UnderLock System Contract Successfully already exist, contact administrator");
                                inform.add('INFO: El contracto ya tiene un sistema bajo llave registrado. ',{
                                    ttl:2000, type: 'warning'
                                });
                                //$('#RegisterModalCustomer').modal('hide');
                            }else if($scope.rsJsonData.status==500){
                                console.log("UnderLock System Contract not Created, contact administrator");
                                inform.add('Error: [500] Contacta al area de soporte. ',{
                                    ttl:2000, type: 'danger'
                                });
                                //$('#RegisterModalCustomer').modal('hide');
                            }
                                $scope.getContractsByCustomerIdFn(contrato.idClientFk);
                                //$scope.isNewCustomer=false;
                                //$scope.isUpdateCustomer=false;
                            //console.log($scope.rsLocations_API_Data);
                        });
                    };
                /************************************
                * UPDATE UNDER LOCK SYSTEM CONTRACT *
                *************************************/
                    $scope.updateUnderLockSystemContractFn = function(contrato){
                        ContractServices.updateUnderLockSystemContract(contrato).then(function(data){
                            $scope.rsJsonData = data;
                            console.log(contrato);
                            if($scope.rsJsonData.status==200){
                                console.log("UnderLock System Contract Successfully Updated");
                                inform.add('El Sistema bajo llave ha sido actualizado con exito. ',{
                                    ttl:2000, type: 'success'
                                });
                                $('#underLockSystem').modal('hide');
                            }else if($scope.rsJsonData.status==500){
                                console.log("UnderLock System Contract not Updated, contact administrator");
                                inform.add('Error: [500] Contacta al area de soporte. ',{
                                    ttl:2000, type: 'danger'
                                });
                            }
                                $scope.getContractsByCustomerIdFn(contrato.idClientFk);
                        });
                    };
            /**************************************************
            *                                                 *
            *              LOAD CUSTOMERS CONTRACT            *
            *                                                 *
            **************************************************/
                $scope.editContractWindowFn = function(item){
                    console.log(item);
                    $scope.contract.update=item;
                    blockUI.start('Cargando contrato: '+item.numeroContrato);
                    $scope.preLoadServicesArrFn();
                    for (var key in $scope.contract.update.services){
                        $scope.addServiceArrFn("update", $scope.contract.update.services[key]);
                    }
                    $timeout(function() {
                        $('#UpdateCustomerContract').modal('show');
                        blockUI.stop();
                    }, 1500);
                    //blockUI.stop();
                    console.log($scope.contract.update);
                }
            /**************************************************
            *                                                 *
            *       GET DVR AND CAMERAS FROM SERVICES         *
            *                                                 *
            **************************************************/
                $scope.list_dvr=[];
                $scope.list_dvr_cameras=[];
                $scope.resources={};
                $scope.getResourcesFromServiceFn=function(servicesList, opt){
                    $scope.resources={'dvr':[], 'cameras':[]};
                    //console.log(servicesList);
                    for (var service in servicesList){
                        if (servicesList[service].idClientTypeServices=="4"){
                        for (var contract in $scope.rsContractsListByCustomerIdData){
                            if ($scope.rsContractsListByCustomerIdData[contract].idContrato==servicesList[service].idContracAssociated_SE){
                            var numeroContrato = $scope.rsContractsListByCustomerIdData[contract].numeroContrato;
                            }
                        }
                        var resourcesDVR     = servicesList[service].idDvr_nvrFk_array;
                        var resourcesCAMERAS = servicesList[service].tb_cameras_array;
                        //LOAD DVR
                        for (var dvr in resourcesDVR){
                            $scope.list_dvr.push({'idClientServices':servicesList[service].idClientServicesFk,'numeroContrato':numeroContrato, 'idProduct':resourcesDVR[dvr].idProduct, 'brand':resourcesDVR[dvr].brand, 'descriptionProduct': resourcesDVR[dvr].descriptionProduct, 'model': resourcesDVR[dvr].model, 'idProductClassificationFk': resourcesDVR[dvr].idProductClassificationFk, 'idStatusFk': resourcesDVR[dvr].idStatusFk});
                            $scope.resources.dvr.push({'idClientServices':servicesList[service].idClientServicesFk,'numeroContrato':numeroContrato, 'idProduct':resourcesDVR[dvr].idProduct, 'brand':resourcesDVR[dvr].brand, 'descriptionProduct': resourcesDVR[dvr].descriptionProduct, 'model': resourcesDVR[dvr].model, 'idProductClassificationFk': resourcesDVR[dvr].idProductClassificationFk, 'idStatusFk': resourcesDVR[dvr].idStatusFk});
                        }
                        //LOAD CAMERAS
                        for (var item in $scope.resources.dvr){
                            if ($scope.resources.dvr[item].idClientServices==servicesList[service].idClientServicesFk){
                            for (var camera in resourcesCAMERAS){
                                $scope.list_dvr_cameras.push({'idCamera':resourcesCAMERAS[camera].idCamera, 'idCameraProduct':resourcesCAMERAS[camera].idProductFk, 'coveredArea':resourcesCAMERAS[camera].coveredArea, 'locationCamera': resourcesCAMERAS[camera].locationCamera, 'portCamera': resourcesCAMERAS[camera].portCamera, 'idClientServicesFk':servicesList[service].idClientServicesFk});
                                $scope.resources.cameras.push({'idCamera':resourcesCAMERAS[camera].idCamera, 'idCameraProduct':resourcesCAMERAS[camera].idProductFk, 'coveredArea':resourcesCAMERAS[camera].coveredArea, 'locationCamera': resourcesCAMERAS[camera].locationCamera, 'portCamera': resourcesCAMERAS[camera].portCamera, 'idClientServicesFk':servicesList[service].idClientServicesFk});
                            }
                            }
                        }
                        }
                    }
                    //console.log($scope.resources);
                    //console.log($scope.list_dvr);
                    //console.log($scope.list_dvr_cameras);
                }
                $scope.filterContractAvailableItems = function (obj) {
                    return function (item) {
                        if (((item.idServiceTypeFk!="2" && item.idServiceTypeFk!="5" && item.idServiceTypeFk!="6") && (item.qtty==null || item.qtty!=null) && (item.available>=1 || item.available!="0")) || ((item.idServiceTypeFk!="1" && item.idServiceTypeFk!="3" && item.idServiceTypeFk!="4") && (item.qtty==null || item.qtty!=null) && (item.used == "0" || item.used == 0))) {
                            return true;
                        }
                        return false;
                    };
                };
                function isValidDateFormat(dateStr) {
                    // Expresión regular para el formato "dd/MM/yyyy"
                    var regex = /^\d{2}\/\d{2}\/\d{4}$/;
                    return regex.test(dateStr);
                }
                function formatDate(datetime, format) {
                    console.log(typeof datetime);
                    console.log(datetime instanceof Date);
                    console.log(datetime);
                    // Crear un objeto Date a partir de la cadena datetime
                    console.log("isValidDateFormat: "+isValidDateFormat(datetime));
                    if (! isValidDateFormat(datetime)) {
                        var date = new Date(datetime)
                        // Obtener los componentes de la fecha
                        var day     = date.getDate();
                        var month   = date.getMonth() + 1; // Los meses son 0-indexados
                        var year    = date.getFullYear();

                        // Formatear el día y el mes con dos dígitos
                        day     = day < 10 ? '0' + day : day;
                        month   = month < 10 ? '0' + month : month;
                        console.log(day + '/' + month + '/' + year);
                    }else{
                        // Dividir la fecha por '/'
                        var parts = datetime.split('/');

                        // Extraer día, mes y año (el mes se resta en 1 porque los meses son 0-indexados)
                        var year = parseInt(parts[0], 10);
                        var month = parseInt(parts[1], 10);
                        var day = parseInt(parts[2], 10);

                        // Crear y devolver el objeto Date
                        var date = new Date(year, month, day);
                        console.log(date);
                    }
                    switch (format){
                        case "dd/MM/yyyy":
                            console.log("Formatear la fecha en 'dd/MM/yyyy'");
                            var rawDate = moment.tz('2024-06-23', "YYYY-MM-DD", "America/Argentina/Buenos_Aires");
                            rawDate.hour(21);    // Establecer las 15 horas (3 PM)
                            rawDate.minute(0);  // Establecer 30 minutos
                            rawDate.second(0);   // Establecer 0 segundos
                            var newDate = rawDate.toDate()
                            console.log("newDate           : "+ newDate);
                            console.log("newDate typeof    : "+ typeof newDate);
                            console.log("newDate instanceof: "+ newDate instanceof Date);
                            console.log("===================================================")
                            console.log("date              : "+ date);
                            console.log("date typeof       : "+ typeof date);
                            console.log("date instanceof   : "+ date instanceof Date);
                            if (newDate === date){
                                console.log("Equal")
                                var formattedDate = "23/06/2024";
                            }else{
                                console.log("Not Equal")
                                var formattedDate = newDate;
                            }

                        break;
                        case "yyyy/MM/dd":
                            console.log("Formatear la fecha en 'yyyy/MM/dd'");
                            var formattedDate = year + '-' + month + '-' + day;
                        break;
                    }
                    console.log(formattedDate);
                    console.log(typeof formattedDate);
                    console.log(formattedDate instanceof Date);
                    return formattedDate;
                }
            /**************************************************
            *                                                 *
            *            ABM SERVICES ADD/UPDATE/ETC          *
            *                                                 *
            **************************************************/
                $scope.rsContractServiceData=[];
                $scope.rsCustomerContractListData=[];
                $scope.rsContractItemListData=[];
                $scope.isProductDetailExist=false;
                $scope.serviceDataFn=function(service, switchOption){
                    //console.log(service);
                    /***********************************
                     *         ABM SWITCH SERVICE       *
                     ************************************/
                    switch(switchOption){
                    /***********************************
                     *   START PROCESS FOR NEW SERVICE  *
                     ************************************/
                        case "start":
                            obj=service;
                            console.log(obj);
                            $scope.cleanServiceInputsFn();
                            ContractServices.getSelectedServiceByIdContract(obj.idContratoFk, obj.idServiceType).then(function(data){
                            $scope.rsJsonData = data;
                            console.log($scope.rsJsonData);
                            $timeout(function() {
                                if($scope.rsJsonData.status==200){
                                    $scope.rsContractServiceData=$scope.rsJsonData.data[0];
                                    //console.log($scope.rsContractServiceData);
                                    switch (obj.idServiceType){
                                    case "1"://StartCtrlAccessService
                                        if ($scope.rsContractServiceData.idStatusFk=="1"){
                                        if ($scope.rsContractServiceData.services[0].service_items!=undefined){
                                            if ($scope.rsContractServiceData.services[0].item_available>=1){
                                            $('#RegisterCtrlAccessService').modal({backdrop: 'static', keyboard: false});
                                            $('#RegisterCtrlAccessService').on('shown.bs.modal', function () {
                                                $('#service_door').focus();
                                            });
                                            for (var key in $scope.rsTypeOfMaintenanceData){
                                                if ($scope.rsContractServiceData.maintenanceType==$scope.rsTypeOfMaintenanceData[key].idTypeMaintenance){
                                                    //$scope.service.new.idTypeMaintenanceFk         = $scope.rsContractServiceData.maintenanceType=="3"?0:$scope.rsTypeOfMaintenanceData[key].idTypeMaintenance;
                                                    $scope.service.new.idTypeMaintenanceFk           = $scope.rsTypeOfMaintenanceData[key].idTypeMaintenance;
                                                    $scope.service.new.idTypeMaintenanceFkConstract  = $scope.rsTypeOfMaintenanceData[key].idTypeMaintenance;
                                                    $scope.service.new.MntType              = $scope.rsTypeOfMaintenanceData[key].typeMaintenance;
                                                }
                                            }
                                            $scope.service.new.serviceName              = $scope.rsContractServiceData.services[0].serviceName;
                                            $scope.service.new.idClientFk               = $scope.rsContractServiceData.idClientFk;
                                            $scope.service.new.serviceAvailability      = $scope.rsContractServiceData.services[0].disponible;
                                            $scope.rsContractItemListData               = $scope.rsContractServiceData.services[0].service_items;
                                            $scope.rsCustomerContractListData           = $scope.rsContractsListByCustomerIdData;
                                            $scope.service.new.idContratoFk             = $scope.rsContractServiceData.idContrato;
                                            $scope.service.new.contractNumb             = $scope.rsContractServiceData.numeroContrato;
                                            $scope.service.new.idTipeServiceFk          = $scope.rsContractServiceData.services[0].idServiceType;
                                            $scope.service.new.idServiceType            = $scope.service.new.idTipeServiceFk;
                                            // Convertir la cadena a un objeto Date usando Moment-Timezone
                                            var current_date = new Date()
                                            var date = moment.tz(current_date, "YYYY-MM-DD", "America/Argentina/Buenos_Aires");
                                            var newDate = date.toDate();
                                            $scope.service.new.dateUp                   = newDate;
                                            inform.add('Contrato: '+$scope.rsContractServiceData.numeroContrato+' Nuevo servicio [Control de Acceso]. ',{
                                                ttl:5000, type: 'info'
                                            });
                                            inform.add('servicio [Control de Acceso]: el contrato tiene '+$scope.rsContractServiceData.services[0].item_available+' tipo de puerta disponibles. ',{
                                                ttl:25000, type: 'info'
                                            });
                                            //console.log($scope.service);
                                            }else{
                                            inform.add('Servicio [Control de Acceso]: El contrato no tiene Puertas disponibles para asignar a un servicio. ',{
                                                ttl:5000, type: 'warning'
                                            });
                                            }
                                        }else{
                                            inform.add('Servicio [Control de Acceso]: No contratado. ',{
                                            ttl:5000, type: 'danger'
                                            });
                                        }
                                        }else{
                                            inform.add('Servicio [Control de Acceso]: Servicio no disponible, verifique el estatus del contrato.',{
                                            ttl:5000, type: 'info'
                                            });
                                            inform.add('Contrato: '+$scope.rsContractServiceData.numeroContrato+' inactivo. ',{
                                            ttl:5000, type: 'danger'
                                            });
                                        }
                                        console.log($scope.service.new);
                                    break;
                                    case "2"://StartInternetService
                                        if ($scope.rsContractServiceData.idStatusFk=="1"){
                                        if ($scope.rsContractServiceData.services[0].service_items!=undefined){
                                            if ($scope.rsContractServiceData.services[0].item_available>=1){
                                            $('#RegisterInternetService').modal({backdrop: 'static', keyboard: false});
                                            $('#RegisterInternetService').on('shown.bs.modal', function () {
                                                $('#service_internetType').focus();
                                            });
                                            for (var key in $scope.rsTypeOfMaintenanceData){
                                                if ($scope.rsContractServiceData.maintenanceType==$scope.rsTypeOfMaintenanceData[key].idTypeMaintenance){
                                                    //$scope.service.new.idTypeMaintenanceFk         = $scope.rsContractServiceData.maintenanceType=="3"?0:$scope.rsTypeOfMaintenanceData[key].idTypeMaintenance;
                                                    $scope.service.new.idTypeMaintenanceFk           = $scope.rsTypeOfMaintenanceData[key].idTypeMaintenance;
                                                    $scope.service.new.idTypeMaintenanceFkConstract  = $scope.rsTypeOfMaintenanceData[key].idTypeMaintenance;
                                                    $scope.service.new.MntType              = $scope.rsTypeOfMaintenanceData[key].typeMaintenance;
                                                }
                                            }
                                            $scope.service.new.serviceName      = $scope.rsContractServiceData.services[0].serviceName;
                                            $scope.service.new.idClientFk       = $scope.rsContractServiceData.idClientFk;
                                            $scope.rsContractItemListData       = $scope.rsContractServiceData.services[0].service_items;
                                            $scope.rsCustomerContractListData   = $scope.rsContractsListByCustomerIdData;
                                            $scope.service.new.idContratoFk     = $scope.rsContractServiceData.idContrato;
                                            $scope.service.new.contractNumb     = $scope.rsContractServiceData.numeroContrato;
                                            $scope.service.new.idTipeServiceFk  = $scope.rsContractServiceData.services[0].idServiceType;
                                            $scope.service.new.idServiceType    = $scope.service.new.idTipeServiceFk;
                                            // Convertir la cadena a un objeto Date usando Moment-Timezone
                                            var current_date = new Date()
                                            var date = moment.tz(current_date, "YYYY-MM-DD", "America/Argentina/Buenos_Aires");
                                            var newDate = date.toDate();
                                            $scope.service.new.dateUp                   = newDate;
                                                //$scope.service.idContracAssociated_SE=
                                            inform.add('Contrato: '+$scope.rsContractServiceData.numeroContrato+' Nuevo servicio [Internet]. ',{
                                                ttl:5000, type: 'info'
                                            });
                                            inform.add('servicio [Internet]: el contrato tiene '+$scope.rsContractServiceData.services[0].item_available+' tipo de internet disponibles. ',{
                                                ttl:25000, type: 'info'
                                            });
                                            //console.log($scope.service);
                                            }else{
                                            inform.add('Servicio [Internet]: El contrato no tiene internet disponibles para asignar a un servicio. ',{
                                                ttl:5000, type: 'warning'
                                            });
                                            }
                                        }else{
                                            inform.add('Servicio [Internet]: No contratado. ',{
                                            ttl:5000, type: 'danger'
                                            });
                                        }
                                        }else{
                                            inform.add('servicio [Internet]: Servicio no disponible, verifique el estatus del contrato.',{
                                            ttl:5000, type: 'info'
                                            });
                                            inform.add('Contrato '+$scope.rsContractServiceData.numeroContrato+' inactivo. ',{
                                            ttl:5000, type: 'danger'
                                            });
                                        }
                                    break;
                                    case "3"://StartTotemService
                                        if ($scope.rsContractServiceData.idStatusFk=="1"){
                                        if ($scope.rsContractServiceData.services[0].service_items!=undefined){
                                            if ($scope.rsContractServiceData.services[0].item_available>=1){
                                            $('#RegisterTotemService').modal({backdrop: 'static', keyboard: false});
                                            $('#RegisterTotemService').on('shown.bs.modal', function () {
                                                $('#service_name').focus();
                                                    $scope.getUserLists();
                                            });
                                            for (var key in $scope.rsTypeOfMaintenanceData){
                                                if ($scope.rsContractServiceData.maintenanceType==$scope.rsTypeOfMaintenanceData[key].idTypeMaintenance){
                                                    //$scope.service.new.idTypeMaintenanceFk         = $scope.rsContractServiceData.maintenanceType=="3"?0:$scope.rsTypeOfMaintenanceData[key].idTypeMaintenance;
                                                    $scope.service.new.idTypeMaintenanceFk           = $scope.rsTypeOfMaintenanceData[key].idTypeMaintenance;
                                                    $scope.service.new.idTypeMaintenanceFkConstract  = $scope.rsTypeOfMaintenanceData[key].idTypeMaintenance;
                                                    $scope.service.new.MntType              = $scope.rsTypeOfMaintenanceData[key].typeMaintenance;
                                                }
                                            }
                                            $scope.service.new.serviceName=$scope.rsContractServiceData.services[0].serviceName;
                                            $scope.service.new.idClientFk=$scope.rsContractServiceData.idClientFk;
                                            $scope.rsContractItemListData=$scope.rsContractServiceData.services[0].service_items;
                                            $scope.rsCustomerContractListData=$scope.rsContractsListByCustomerIdData;
                                            $scope.service.new.idContratoFk=$scope.rsContractServiceData.idContrato;
                                            $scope.service.new.contractNumb=$scope.rsContractServiceData.numeroContrato;
                                            $scope.service.new.idTipeServiceFk=$scope.rsContractServiceData.services[0].idServiceType;
                                            $scope.service.new.idServiceType=$scope.service.new.idTipeServiceFk;
                                            $scope.service.cameras_available=$scope.rsContractServiceData.services[0].items_available;
                                            $scope.service.cameras_contracted=$scope.rsJsonData.data[0].services[0].items_contracted;
                                            // Convertir la cadena a un objeto Date usando Moment-Timezone
                                            var current_date = new Date()
                                            var date = moment.tz(current_date, "YYYY-MM-DD", "America/Argentina/Buenos_Aires");
                                            var newDate = date.toDate();
                                            $scope.service.new.dateUp                   = newDate;
                                                //$scope.service.idContracAssociated_SE=
                                            inform.add('Contrato: '+$scope.rsContractServiceData.numeroContrato+' Nuevo servicio [Totem]. ',{
                                                ttl:5000, type: 'info'
                                            });
                                            inform.add('servicio [Totem]: el contrato tiene '+$scope.rsContractServiceData.services[0].items_available+' camaras disponibles . ',{
                                                ttl:25000, type: 'info'
                                            });
                                            //console.log($scope.service);
                                            }else{
                                            inform.add('servicio [Totem]: El contrato no tiene camaras disponibles para asignar a un servicio. ',{
                                                ttl:5000, type: 'warning'
                                            });
                                            }
                                        }else{
                                            inform.add('servicio [Totem]: No contratado. ',{
                                            ttl:5000, type: 'danger'
                                            });
                                        }
                                        }else{
                                            inform.add('servicio [Totem]: Servicio no disponible, verifique el estatus del contrato.',{
                                            ttl:5000, type: 'info'
                                            });
                                            inform.add('Contrato '+$scope.rsContractServiceData.numeroContrato+' inactivo. ',{
                                            ttl:5000, type: 'danger'
                                            });
                                        }
                                    break;
                                    case "4"://StartCamerasService
                                        if ($scope.rsContractServiceData.idStatusFk=="1"){
                                        if ($scope.rsContractServiceData.services[0].service_items!=undefined){
                                            if ($scope.rsContractServiceData.services[0].item_available>=1){
                                            $('#RegisterCamerasService').modal({backdrop: 'static', keyboard: false});
                                            $('#RegisterCamerasService').on('shown.bs.modal', function () {
                                                $('#service_name').focus();
                                                    $scope.getUserLists();
                                            });
                                            for (var key in $scope.rsTypeOfMaintenanceData){
                                                if ($scope.rsContractServiceData.maintenanceType==$scope.rsTypeOfMaintenanceData[key].idTypeMaintenance){
                                                    //$scope.service.new.idTypeMaintenanceFk         = $scope.rsContractServiceData.maintenanceType=="3"?0:$scope.rsTypeOfMaintenanceData[key].idTypeMaintenance;
                                                    $scope.service.new.idTypeMaintenanceFk           = $scope.rsTypeOfMaintenanceData[key].idTypeMaintenance;
                                                    $scope.service.new.idTypeMaintenanceFkConstract  = $scope.rsTypeOfMaintenanceData[key].idTypeMaintenance;
                                                    $scope.service.new.MntType              = $scope.rsTypeOfMaintenanceData[key].typeMaintenance;
                                                }
                                            }
                                            $scope.service.new.serviceName=$scope.rsContractServiceData.services[0].serviceName;
                                            $scope.service.new.idClientFk=$scope.rsContractServiceData.idClientFk;
                                            $scope.rsContractItemListData=$scope.rsContractServiceData.services[0].service_items;
                                            $scope.rsCustomerContractListData=$scope.rsContractsListByCustomerIdData;
                                            $scope.service.new.idContratoFk=$scope.rsContractServiceData.idContrato;
                                            $scope.service.new.contractNumb=$scope.rsContractServiceData.numeroContrato;
                                            $scope.service.new.idTipeServiceFk=$scope.rsContractServiceData.services[0].idServiceType;
                                            $scope.service.new.idServiceType=$scope.service.new.idTipeServiceFk;
                                            $scope.service.cameras_available=$scope.rsContractServiceData.services[0].items_available;
                                            $scope.service.cameras_contracted=$scope.rsJsonData.data[0].services[0].items_contracted;
                                            // Convertir la cadena a un objeto Date usando Moment-Timezone
                                            var current_date = new Date()
                                            var date = moment.tz(current_date, "YYYY-MM-DD", "America/Argentina/Buenos_Aires");
                                            var newDate = date.toDate();
                                            $scope.service.new.dateUp                   = newDate;
                                                //$scope.service.idContracAssociated_SE=
                                            inform.add('Contrato: '+$scope.rsContractServiceData.numeroContrato+' Nuevo servicio [Camaras]. ',{
                                                ttl:5000, type: 'info'
                                            });
                                            inform.add('servicio [Camaras]: el contrato tiene '+$scope.rsContractServiceData.services[0].items_available+' camaras disponibles . ',{
                                                ttl:25000, type: 'info'
                                            });
                                            //console.log($scope.service);
                                            }else{
                                            inform.add('servicio [Camaras]: El contrato no tiene camaras disponibles para asignar a un servicio. ',{
                                                ttl:5000, type: 'warning'
                                            });
                                            }
                                        }else{
                                            inform.add('servicio [Camaras]: No contratado. ',{
                                            ttl:5000, type: 'danger'
                                            });
                                        }
                                        }else{
                                            inform.add('Servicio [Camaras]: Servicio no disponible, verifique el estatus del contrato.',{
                                            ttl:5000, type: 'info'
                                            });
                                            inform.add('Contrato '+$scope.rsContractServiceData.numeroContrato+' inactivo. ',{
                                            ttl:5000, type: 'danger'
                                            });
                                        }
                                    break;
                                    case "5"://StartAlarmService
                                        if ($scope.rsContractServiceData.idStatusFk=="1"){
                                        if ($scope.rsContractServiceData.services[0].service_items!=undefined){
                                            if ($scope.rsContractServiceData.services[0].item_available>=1){
                                            $('#RegisterAlarmService').modal({backdrop: 'static', keyboard: false});
                                            $('#RegisterAlarmService').on('shown.bs.modal', function () {
                                                $('#service_name').focus();
                                                    $scope.getUserLists();
                                            });
                                            for (var key in $scope.rsTypeOfMaintenanceData){
                                                if ($scope.rsContractServiceData.maintenanceType==$scope.rsTypeOfMaintenanceData[key].idTypeMaintenance){
                                                    //$scope.service.new.idTypeMaintenanceFk         = $scope.rsContractServiceData.maintenanceType=="3"?0:$scope.rsTypeOfMaintenanceData[key].idTypeMaintenance;
                                                    $scope.service.new.idTypeMaintenanceFk           = $scope.rsTypeOfMaintenanceData[key].idTypeMaintenance;
                                                    $scope.service.new.idTypeMaintenanceFkConstract  = $scope.rsTypeOfMaintenanceData[key].idTypeMaintenance;
                                                    $scope.service.new.MntType              = $scope.rsTypeOfMaintenanceData[key].typeMaintenance;
                                                }
                                            }
                                            $scope.service.new.serviceName        = $scope.rsContractServiceData.services[0].serviceName;
                                            $scope.service.new.idClientFk         = $scope.rsContractServiceData.idClientFk;
                                            $scope.service.idClientTypeFk         = $scope.customerFound.idClientTypeFk;
                                            $scope.rsContractItemListData         = $scope.rsContractServiceData.services[0].service_items;
                                            $scope.rsCustomerContractListData     = $scope.rsContractsListByCustomerIdData;
                                            $scope.service.new.idContratoFk       = $scope.rsContractServiceData.idContrato;
                                            $scope.service.new.contractNumb       = $scope.rsContractServiceData.numeroContrato;
                                            $scope.service.new.idTipeServiceFk    = $scope.rsContractServiceData.services[0].idServiceType;
                                            $scope.service.new.idServiceType      = $scope.service.new.idTipeServiceFk;
                                            $scope.service.new.numbOfLicence      = 0;
                                            // Convertir la cadena a un objeto Date usando Moment-Timezone
                                            var current_date = new Date()
                                            var date = moment.tz(current_date, "YYYY-MM-DD", "America/Argentina/Buenos_Aires");
                                            var newDate = date.toDate();
                                            $scope.service.new.dateUp                   = newDate;
                                            $scope.getResourcesFromServiceFn($scope.rsAllServicesListOfCustomer, "dvr");
                                            $scope.getTypeAlarmClientListFn();
                                            $scope.getAlarmServiceAditionalsListFn();
                                            $scope.getTypeConnectionListFn();
                                            $scope.getTransmissionFormatListFn();
                                            if ($scope.service.idClientTypeFk=="2"){
                                                $scope.getBuildingsDeptosFn($scope.service.new.idClientFk);
                                            }else if ($scope.service.idClientTypeFk=="5"){
                                                $scope.service.new.list_address_particular=$scope.customerFound.list_address_particular;
                                                //$scope.service.idContracAssociated_SE=
                                            }
                                            inform.add('Contrato: '+$scope.rsContractServiceData.numeroContrato+' Nuevo servicio [Alarma]. ',{
                                                ttl:5000, type: 'info'
                                            });
                                            //console.log($scope.service);
                                            }else{
                                            inform.add('Servicio [Alarma]: Ya ha sido asignado a un servicio. ',{
                                                ttl:5000, type: 'warning'
                                            });
                                            }
                                        }else{
                                            inform.add('Servicio [Alarma]: No contratado. ',{
                                            ttl:5000, type: 'danger'
                                            });
                                        }
                                        }else{
                                            inform.add('Servicio [Alarma]: Servicio no disponible, verifique el estatus del contrato.',{
                                            ttl:5000, type: 'info'
                                            });
                                            inform.add('Contrato '+$scope.rsContractServiceData.numeroContrato+' inactivo. ',{
                                            ttl:5000, type: 'danger'
                                            });
                                        }
                                    break;
                                    case "6"://StartAppMonitorService
                                        if ($scope.rsContractServiceData.idStatusFk=="1"){
                                        if ($scope.rsContractServiceData.services[0].service_items!=undefined){
                                            if ($scope.rsContractServiceData.services[0].item_available>=1){
                                            $('#RegisterAppMonitorService').modal({backdrop: 'static', keyboard: false});
                                            $('#RegisterAppMonitorService').on('shown.bs.modal', function () {
                                                $('#service_name').focus();
                                                    $scope.getUserLists();
                                            });
                                            for (var key in $scope.rsTypeOfMaintenanceData){
                                                if ($scope.rsContractServiceData.maintenanceType==$scope.rsTypeOfMaintenanceData[key].idTypeMaintenance){
                                                    //$scope.service.new.idTypeMaintenanceFk         = $scope.rsContractServiceData.maintenanceType=="3"?0:$scope.rsTypeOfMaintenanceData[key].idTypeMaintenance;
                                                    $scope.service.new.idTypeMaintenanceFk           = $scope.rsTypeOfMaintenanceData[key].idTypeMaintenance;
                                                    $scope.service.new.idTypeMaintenanceFkConstract  = $scope.rsTypeOfMaintenanceData[key].idTypeMaintenance;
                                                    $scope.service.new.MntType              = $scope.rsTypeOfMaintenanceData[key].typeMaintenance;
                                                }
                                            }
                                            $scope.isCollapsed                  = false;
                                            $scope.service.new.serviceName      = $scope.rsContractServiceData.services[0].serviceName;
                                            $scope.service.new.idClientFk       = $scope.rsContractServiceData.idClientFk;
                                            $scope.service.idClientTypeFk       = $scope.customerFound.idClientTypeFk;
                                            $scope.rsContractItemListData       = $scope.rsContractServiceData.services[0].service_items;
                                            $scope.rsCustomerContractListData   = $scope.rsContractsListByCustomerIdData;
                                            $scope.service.new.idContratoFk     = $scope.rsContractServiceData.idContrato;
                                            $scope.service.new.contractNumb     = $scope.rsContractServiceData.numeroContrato;
                                            $scope.service.new.idTipeServiceFk  = $scope.rsContractServiceData.services[0].idServiceType;
                                            $scope.service.new.idServiceType    = $scope.service.new.idTipeServiceFk;
                                            $scope.service.idApplicationFk      = "2"
                                            $scope.service.new.numbOfLicence    = 0;
                                            // Convertir la cadena a un objeto Date usando Moment-Timezone
                                            var current_date = new Date()
                                            var date = moment.tz(current_date, "YYYY-MM-DD", "America/Argentina/Buenos_Aires");
                                            var newDate = date.toDate();
                                            $scope.service.new.dateUp                   = newDate;
                                            if ($scope.service.idClientTypeFk=="2"){
                                                $scope.getBuildingsDeptosFn($scope.service.new.idClientFk);
                                            }else if ($scope.service.idClientTypeFk=="5"){
                                                $scope.service.new.list_address_particular=$scope.customerFound.list_address_particular;
                                                //$scope.service.idContracAssociated_SE=
                                            }
                                            inform.add('Contrato: '+$scope.rsContractServiceData.numeroContrato+' Nuevo servicio [App Monitor]. ',{
                                                ttl:5000, type: 'info'
                                            });
                                            //console.log($scope.service);
                                            }else{
                                            inform.add('Servicio [Alarma]: Ya ha sido asignado a un servicio. . ',{
                                                ttl:5000, type: 'warning'
                                            });
                                            }
                                        }else{
                                            inform.add('Servicio [Alarma]: No contratado. ',{
                                            ttl:5000, type: 'danger'
                                            });
                                        }
                                        }else{
                                            inform.add('Servicio [Alarma]: Servicio no disponible, verifique el estatus del contrato.',{
                                            ttl:5000, type: 'info'
                                            });
                                            inform.add('Contrato '+$scope.rsContractServiceData.numeroContrato+' inactivo. ',{
                                            ttl:5000, type: 'danger'
                                            });
                                        }
                                    break;
                                    default:
                                        $('#SelectServiceWindows').modal('hide');
                                    }
                                }else{
                                $scope.rsContractServiceData=[];
                                }
                            }, 1500);
                            });
                            blockUI.stop();
                        break;
                    /***********************************
                     *     GET DATA FOR ADD SERVICE     *
                     ************************************/
                        case "add":
                            $scope.addNewService=service;
                            switch(service.idServiceType){
                                case "1": //ADD CONTROL ACCESS
                                    $timeout(function() {
                                    $scope.addNewService.idContracAssociated_SE   = service.idContratoFk;
                                    $scope.addNewService.idAccessControlFk        = $scope.service.crtlAccess.selected.idProduct;
                                    $scope.addNewService.lock                     = $scope.service.lockedIt.selected.idProduct;
                                    $scope.addNewService.idInputReaderFk          = $scope.service.entranceReader.selected.idProduct;
                                    $scope.addNewService.ouputReader              = service.isOuputButom==undefined || !service.isOuputButom?$scope.service.exitReader.selected.idProduct:null;
                                    $scope.addNewService.ouputButom               = service.isOuputButom?$scope.service.exitReader.selected.idProduct:null;
                                    $scope.addNewService.idFontFk                 = $scope.service.powerSupply.selected.idProduct;
                                    $scope.addNewService.idEmergencyButtonFk      = $scope.service.emergencyButton.selected.idProduct;
                                    $scope.addNewService.idShutdownKeyFk          = $scope.service.TurnOffKey.selected.idProduct;
                                    $scope.addNewService.battery_install          = $scope.list_batteries;
                                    $scope.addNewService.open_devices             = $scope.list_open_devices;
                                    $scope.addNewService.isOuputReader            = service.isOuputButom?null:'1';
                                    $scope.addNewService.isOuputButom             = service.isOuputButom?'1':null;
                                    $scope.addNewService.dateDown                 = null;
                                    $scope.addNewService.isBlocklingScrew         = service.isBlocklingScrew==0||service.isBlocklingScrew==undefined?0:1;
                                    //$scope.addNewService.locationGabinet          = service.locationGabinet!='' && service.locationGabinet!=undefined?$scope.locationGabine:null;
                                    $scope.addNewService.acaration2               = service.isBlocklingScrew==0||service.isBlocklingScrew==undefined?null:service.lockingScrewComment;
                                    if (service.isHasInternetConnect==undefined || !service.isHasInternetConnect){
                                        $scope.addNewService.portNumberRouter=null;
                                        $scope.addNewService.portHttp=null;
                                        $scope.addNewService.addressClient=null;
                                        $scope.addNewService.user=null;
                                        $scope.addNewService.pass=null;
                                        $scope.addNewService.addressVpn=null;
                                        $scope.addNewService.portVpn=null;
                                        $scope.addNewService.useVpn=null;
                                        $scope.addNewService.passVpn=null;
                                    }

                                    $scope.addNewService.adicional=$scope.list_productsDetails;
                                    blockUI.message('Guardando Servicio '+service.serviceName);
                                    }, 1500);
                                    $timeout(function() {
                                        console.log(JSON.stringify($scope.addNewService));
                                        $scope.addCustomerServiceFn($scope.addNewService);
                                    }, 1500);
                                        $('#RegisterCtrlAccessService').modal('hide');
                                    blockUI.stop();
                                break;
                                case "2": //ADD INTERNET
                                    $scope.addNewService.idContracAssociated_SE   = service.idContratoFk;
                                    $scope.addNewService.idRouterInternetFk       = service.idTypeInternetFk<="2"?$scope.service.router.selected.idProduct:null;
                                    $scope.addNewService.idModemInternetFk        = $scope.service.modem.selected.idProduct;
                                    $scope.addNewService.macAddress               = service.idTypeInternetFk<="2"?service.macAddr:null;
                                    $scope.addNewService.port                     = service.idTypeInternetFk<="2"?service.port:null;
                                    $scope.addNewService.userWifi                 = service.idTypeInternetFk<="2"?service.userWifi:null;
                                    $scope.addNewService.passWifi                 = service.idTypeInternetFk<="2"?service.passWifi:null;
                                    $scope.addNewService.userAdmin                = service.idTypeInternetFk<="2"?service.userAdmin:null;
                                    $scope.addNewService.passAdmin                = service.idTypeInternetFk<="2"?service.passAdmin:null;
                                    $scope.addNewService.numberLine               = service.idTypeInternetFk<="2"?null:service.numberLine;
                                    $scope.addNewService.numberChip               = service.idTypeInternetFk<="2"?null:service.numberChip;
                                    $scope.addNewService.dateDown                 = null;
                                    $scope.addNewService.isDown                   = null;
                                    $scope.addNewService.idServiceAsociateFk      = service.idServiceAsociateFk==null?[]:service.idServiceAsociateFk;
                                    $timeout(function() {
                                    $scope.addNewService.adicional=$scope.list_productsDetails;
                                    blockUI.message('Guardando Servicio '+service.serviceName);
                                    }, 1500);
                                    $timeout(function() {
                                        console.log($scope.addNewService);
                                        console.log(JSON.stringify($scope.addNewService));
                                        $scope.addCustomerServiceFn($scope.addNewService);
                                    }, 1500);
                                        $('#RegisterInternetService').modal('hide');
                                    blockUI.stop();
                                break;
                                case "3"://ADD TOTEM
                                    $timeout(function() {
                                        $scope.addNewService.idContracAssociated_SE   = service.idContratoFk;
                                        $scope.addNewService.idDvr_nvrFk              = $scope.service.dvr.selected.idProduct;
                                        $scope.addNewService.backup_energy            = $scope.list_batteries;
                                        $scope.addNewService.cameras                  = $scope.list_cameras;
                                        $scope.addNewService.maxCamera                = $scope.service.maxCamera;
                                        $scope.addNewService.dateDown                 = null;
                                        $scope.addNewService.item_SE                  = null;
                                        $scope.addNewService.clients                  = $scope.list_user;
                                        if (service.isHasInternetConnect==undefined || !service.isHasInternetConnect){
                                        $scope.addNewService.portNumberRouter=null;
                                        $scope.addNewService.portHttp=null;
                                        $scope.addNewService.addressClientInter=null;
                                        $scope.addNewService.addressVpn=null;
                                        $scope.addNewService.namePort=null;
                                        $scope.addNewService.port=null;
                                        $scope.addNewService.namePort1=null;
                                        $scope.addNewService.nroPort1=null;
                                        $scope.addNewService.namePort2=null;
                                        $scope.addNewService.nroPort2=null;
                                        }
                                        var productIdNumber=0;
                                        for (var item in $scope.list_productsDetails){productIdNumber=($scope.list_productsDetails[item].idProductDetail+1);}
                                        for (var key in $scope.list_batteries){
                                        $scope.list_productsDetails.push({'idProductDetail':productIdNumber,'idProductoFk':$scope.list_batteries[key].idBatteryFk, 'numberSerieFabric':$scope.list_batteries[key].numberSerieFabric, 'numberSerieInternal':$scope.list_batteries[key].numberSerieInternal,'dateExpiration':$scope.list_batteries[key].dateExpiration, 'optAux':null});
                                        productIdNumber++;
                                        }
                                        $scope.addNewService.adicional=$scope.list_productsDetails;
                                        blockUI.message('Guardando Servicio '+service.serviceName);
                                        }, 1500);
                                        $timeout(function() {
                                        console.log($scope.addNewService);
                                        console.log(JSON.stringify($scope.addNewService));
                                        //$scope.addCustomerServiceFn($scope.addNewService);
                                    }, 1500);
                                    $('#RegisterTotemService').modal('hide');
                                    blockUI.stop();
                                break;
                                case "4"://ADD CAMERAS
                                    $timeout(function() {
                                        $scope.addNewService.idContracAssociated_SE   = service.idContratoFk;
                                        $scope.addNewService.idDvr_nvrFk              = $scope.service.dvr.selected.idProduct;
                                        $scope.addNewService.backup_energy            = $scope.list_batteries;
                                        $scope.addNewService.cameras                  = $scope.list_cameras;
                                        $scope.addNewService.maxCamera                = $scope.service.maxCamera;
                                        $scope.addNewService.dateDown                 = null;
                                        $scope.addNewService.clients                  = $scope.list_user;
                                        if (service.isHasInternetConnect==undefined || !service.isHasInternetConnect){
                                        $scope.addNewService.portNumberRouter=null;
                                        $scope.addNewService.portHttp=null;
                                        $scope.addNewService.addressClient=null;
                                        $scope.addNewService.user=null;
                                        $scope.addNewService.pass=null;
                                        $scope.addNewService.addressVpn=null;
                                        $scope.addNewService.useVpn=null;
                                        $scope.addNewService.passVpn=null;
                                        $scope.addNewService.namePort=null;
                                        $scope.addNewService.port=null;
                                        $scope.addNewService.namePort1=null;
                                        $scope.addNewService.nroPort1=null;
                                        $scope.addNewService.namePort2=null;
                                        $scope.addNewService.nroPort2=null;
                                        }
                                        var productIdNumber=0;
                                        for (var item in $scope.list_productsDetails){productIdNumber=($scope.list_productsDetails[item].idProductDetail+1);}
                                            for (var key in $scope.list_batteries){
                                                $scope.list_productsDetails.push({'idProductDetail':productIdNumber,'idProductoFk':$scope.list_batteries[key].idBatteryFk, 'numberSerieFabric':$scope.list_batteries[key].numberSerieFabric, 'numberSerieInternal':$scope.list_batteries[key].numberSerieInternal,'dateExpiration':$scope.list_batteries[key].dateExpiration, 'optAux':null});
                                                productIdNumber++;
                                            }
                                        $scope.addNewService.adicional=$scope.list_productsDetails;
                                        blockUI.message('Guardando Servicio '+service.serviceName);
                                        }, 1500);
                                        $timeout(function() {
                                            console.log(JSON.stringify($scope.addNewService));
                                            $scope.addCustomerServiceFn($scope.addNewService);
                                        }, 1500);
                                        $('#RegisterCamerasService').modal('hide');
                                        blockUI.stop();
                                break;
                                case "5"://ADD ALARM
                                    $scope.baterias_instaladas=[];
                                    $timeout(function() {
                                        $scope.addNewService.tipo_conexion_remoto       = $scope.tipo_conexion_remoto;
                                        $scope.addNewService.adicional_alarmar          = $scope.aditional_alarm;
                                        $scope.addNewService.sensores_de_alarmas        = $scope.list_sensors;
                                        $scope.addNewService.idContracAssociatedFk      = service.idContratoFk;
                                        $scope.addNewService.companyMonitor             = service.idCompanyMonitorFK;
                                        $scope.addNewService.numberPay                  = service.numberCustomer;
                                        $scope.addNewService.panelAlarm                 = $scope.service.alarmPanel.selected.idProduct;
                                        $scope.addNewService.keyboardAlarm              = $scope.service.alarmKeyboard.selected.idProduct;
                                        $scope.addNewService.countZoneIntaled           = $scope.service.zonesQttyInstalled;
                                        $scope.addNewService.idTypeConectionRemote      = service.idTipoConexionRemoto;
                                        $scope.addNewService.observation                = service.observation==null || service.observation==undefined?null:service.observation;
                                        $scope.addNewService.installationPassword       = service.installationPassword;
                                        $scope.addNewService.masterUserPassword         = service.masterUserPassword;
                                        $scope.addNewService.userPassword1ForDisabling  = service.userPassword1ForDisabling;
                                        var productIdNumber=0;
                                        for (var key in $scope.list_batteries){
                                        $scope.baterias_instaladas.push({'idProductoFk':$scope.list_batteries[key].idBatteryFk, 'nroFabric':$scope.list_batteries[key].numberSerieFabric, 'nroInternal':$scope.list_batteries[key].numberSerieInternal,'dateExpired':$scope.list_batteries[key].dateExpiration, 'isControlSchedule':$scope.list_batteries[key].isControlSchedule});
                                        }
                                        $scope.addNewService.baterias_instaladas        = $scope.baterias_instaladas;
                                        $scope.addNewService.adicional                  = $scope.list_productsDetails;
                                        blockUI.message('Guardando Servicio '+service.serviceName);
                                    }, 1500);
                                    $timeout(function() {
                                        console.log(JSON.stringify($scope.addNewService));
                                        $scope.addCustomerServiceFn($scope.addNewService);
                                    }, 1500);
                                        $('#RegisterAlarmService').modal('hide');
                                    blockUI.stop();
                                break;
                                case "6"://ADD APP MONITOR
                                    $timeout(function() {
                                        $scope.addNewService.idContracAssociated_SE   = service.idContratoFk;
                                        $scope.addNewService.dateDown                 = null;
                                        $scope.addNewService.licenses                 = $scope.list_user_licence;
                                        $scope.addNewService.countNewLicense          = $scope.service.numbOfLicenceSet;
                                        $scope.addNewService.idApplicationFk          = $scope.service.idApplicationFk;
                                        $scope.addNewService.passwordApp              = $scope.service.passwordApp!=undefined && $scope.service.passwordApp!=null && $scope.service.idApplicationFk=="1"?$scope.service.passwordApp:null;
                                        $scope.addNewService.adicional={};
                                        blockUI.message('Guardando Servicio '+service.serviceName);
                                        }, 1500);
                                        $timeout(function() {
                                            console.log(JSON.stringify($scope.addNewService));
                                            $scope.addCustomerServiceFn($scope.addNewService);
                                        }, 1500);
                                        $('#RegisterAppMonitorService').modal('hide');
                                        blockUI.stop();
                                break;
                            }
                        break;
                    /***********************************
                     *    LOAD DATA FOR UPDATE SERVICE  *
                     ************************************/
                        case "edit":
                            obj=service;
                            console.log(obj);
                            $scope.service.update=service;
                            switch(service.idTipeServiceFk){
                                case "1": //LOAD CONTROL ACCESS
                                    $timeout(function() {
                                        $scope.checkDoorType($scope.service.update.idDoorFk);
                                        $scope.service.update.idContratoFk         = service.idContracAssociated_SE;
                                        $scope.service.update.numeroContrato       = service.idContracAssociated_SE_array[0].numeroContrato;
                                        $scope.service.crtlAccess.selected         = service.idAccessControlFk==undefined || service.idAccessControlFk==null?null:service.idAccessControlFk_array[0];
                                        $scope.service.lockedIt.selected           = service.lock==undefined || service.lock==null?undefined:service.lock_array[0];
                                        $scope.service.lockedIt2.selected          = service.lock2==undefined || service.lock2==null?undefined:service.lock2_array[0];
                                        $scope.service.entranceReader.selected     = service.idInputReaderFk==undefined || service.idInputReaderFk==null?null:service.idInputReaderFk_array[0];
                                        $scope.service.exitReader.selected         = service.ouputReader==undefined || service.ouputReader==null?null:service.ouputReader_array[0];
                                        $scope.service.powerSupply.selected        = service.idFontFk==undefined || service.idFontFk==null?null:service.idFontFk_array[0];
                                        $scope.service.emergencyButton.selected    = service.idEmergencyButtonFk==undefined || service.idEmergencyButtonFk==null?null:service.idEmergencyButtonFk_array[0];
                                        $scope.service.TurnOffKey.selected         = service.idShutdownKeyFk==undefined || service.idShutdownKeyFk==null?null:service.idShutdownKeyFk_array[0];
                                        $scope.service.update.idTypeMaintenanceFk  = service.idTypeMaintenanceFk_array[0].idTypeMaintenance;
                                        $scope.service.update.MntType              = service.idTypeMaintenanceFk_array[0].typeMaintenance;
                                        const itHasHttpProto                       = service.addressVpn!=null && service.addressVpn!=undefined?regexProtocol.test(service.addressVpn):null;
                                        const itHasPortInURL                       = service.addressVpn!=null && service.addressVpn!=undefined?regexPort.test(service.addressVpn):null;
                                        const vpnPortDefined                       = service.portVpn!="" && service.portVpn!=null && service.portVpn!=undefined?service.portVpn:"80";
                                        if (itHasPortInURL && itHasPortInURL!=null){
                                            const urlVpn = service.addressVpn;
                                            const matchUrl = urlVpn.match(regexPort);
                                            console.log(matchUrl);
                                            const extractedPort = matchUrl[1];
                                            console.log(extractedPort);
                                                if (extractedPort != vpnPortDefined) {
                                                    inform.add("La dirección VPN contiene un puerto ("+extractedPort+") diferente al puerto VPN ("+vpnPortDefined+") especificado en el campo o al puerto por defecto (80).",{
                                                        ttl:6000, type: 'warning'
                                                    });
                                                }
                                        }
                                        if (!itHasHttpProto && itHasHttpProto!=null){
                                            if (!itHasPortInURL || itHasPortInURL==null){
                                                $scope.service.update.urlVpn           = "http://"+service.addressVpn+":"+vpnPortDefined;
                                            }else{
                                                $scope.service.update.urlVpn           = "http://"+service.addressVpn;
                                            }
                                        }else if (itHasHttpProto){
                                            if (!itHasPortInURL || itHasPortInURL==null){
                                                $scope.service.update.urlVpn           = service.addressVpn+":"+vpnPortDefined;
                                            }else{
                                                $scope.service.update.urlVpn           = service.addressVpn;
                                            }
                                        }else{
                                            $scope.service.update.urlVpn = undefined;
                                        }
                                        var isBlocklingScrew                       = service.isBlocklingScrew==0||service.isBlocklingScrew==undefined?false:true;
                                        $scope.service.update.isBlocklingScrew     = service.isBlocklingScrew;
                                        var productIdNumber = 1;
                                        // Convertir la cadena a un objeto Date usando Moment-Timezone
                                        var date = moment.tz(service.dateUp, "YYYY-MM-DD", "America/Argentina/Buenos_Aires");
                                        var newDate = date.toDate();
                                        $scope.service.update.dateUp = newDate;
                                        for (var key in service.adicional){
                                            //console.log("Verificando idProductFk adicional:"+service.adicional[key].idProductoFk);
                                            for (var prduct in $scope.rsProductsData){
                                            //console.log("Verificando idProductFk Product table:"+$scope.rsProductsData[prduct].idProduct);
                                            if (service.adicional[key].idProductoFk==$scope.rsProductsData[prduct].idProduct){
                                                const classification = $scope.rsProductsData[prduct].classification!=null && $scope.rsProductsData[prduct].classification!=undefined?$scope.rsProductsData[prduct].classification:null;
                                                $scope.list_productsDetails.push({'idProductDetail':productIdNumber,'idProductoFk':service.adicional[key].idProductoFk, 'classification':classification,'numberSerieFabric':service.adicional[key].numberSerieFabric, 'numberSerieInternal':service.adicional[key].numberSerieInternal,'dateExpiration':service.adicional[key].dateExpiration, 'optAux':service.adicional[key].optAux});
                                                $scope.typeOfProductsFn("set", $scope.rsProductsData[prduct].idProductClassificationFk, productIdNumber, service.adicional[key].optAux);
                                                productIdNumber++;
                                                break;
                                            }
                                            }
                                        }
                                        console.log($scope.list_productsDetails);
                                        //console.log($scope.productListType);
                                        //LIST BATTERIES INSTALLED
                                        //console.log($scope.list_batteries);
                                        var productIdNumber = 1;
                                        for (var battery in service.tb_battery_install_access_control_array){
                                            for (var prduct in $scope.rsProductsData){
                                            if (service.tb_battery_install_access_control_array[battery].idBatteryFk==$scope.rsProductsData[prduct].idProduct){
                                                $scope.list_batteries.push({'idProductIndex':productIdNumber,'idBatteryFk':service.tb_battery_install_access_control_array[battery].idBatteryFk,'descriptionProduct':$scope.rsProductsData[prduct].descriptionProduct, 'model':$scope.rsProductsData[prduct].model, 'brand': $scope.rsProductsData[prduct].brand,'isNumberSerieInternal':$scope.rsProductsData[prduct].isNumberSerieInternal,'isNumberSerieFabric':$scope.rsProductsData[prduct].isNumberSerieFabric,'isDateExpiration':$scope.rsProductsData[prduct].isDateExpiration, 'numberSerieFabric':service.tb_battery_install_access_control_array[battery].numberSerieFabric, 'numberSerieInternal':service.tb_battery_install_access_control_array[battery].numberSerieInternal,'dateExpiration':service.tb_battery_install_access_control_array[battery].dateExpiration, 'idProductClassification':$scope.rsProductsData[prduct].idProductClassificationFk, 'classification': null, 'description':null, 'isNew':0});
                                                productIdNumber++;
                                                break;
                                            }
                                            }
                                        }
                                        //LIST OPEN DEVICES
                                        //console.log($scope.list_open_devices);
                                        var productIdNumber = 1;
                                        for (var device in service.tb_open_devices_access_control_array){
                                            for (var prduct in $scope.rsProductsData){
                                            if (service.tb_open_devices_access_control_array[device].idOpenDevice==$scope.rsProductsData[prduct].idProduct){
                                                $scope.list_open_devices.push({'idProductIndex':productIdNumber,'idOpenDevice':service.tb_open_devices_access_control_array[device].idOpenDevice,'descriptionProduct':$scope.rsProductsData[prduct].descriptionProduct, 'model':$scope.rsProductsData[prduct].model, 'brand': $scope.rsProductsData[prduct].brand,'isNumberSerieInternal':$scope.rsProductsData[prduct].isNumberSerieInternal,'isNumberSerieFabric':$scope.rsProductsData[prduct].isNumberSerieFabric,'isDateExpiration':$scope.rsProductsData[prduct].isDateExpiration, 'numberSerieFabric':service.tb_open_devices_access_control_array[device].numberSerieFabric, 'numberSerieInternal':service.tb_open_devices_access_control_array[device].numberSerieInternal,'dateExpiration':service.tb_open_devices_access_control_array[device].dateExpiration, 'idProductClassification':$scope.rsProductsData[prduct].idProductClassificationFk, 'classification': $scope.rsProductsData[prduct].classification, 'description':null, 'isNew':0});
                                                productIdNumber++;
                                                break;
                                            }
                                            }
                                        }
                                        $scope.rsCustomerContractListData            = $scope.rsContractsListByCustomerIdData;
                                        $scope.rsContractItemListData                = $scope.getSelectedServiceByIdContractFn($scope.service.update.idContratoFk, $scope.service.update.idClientTypeServices);
                                        $scope.service.update.isHasInternetConnect   = $scope.service.update.portNumberRouter!=undefined && $scope.service.update.portHttp!=undefined?true: false;
                                        console.log("list_batteries: ");
                                        console.log($scope.list_batteries);
                                        console.log("list_open_devices: ");
                                        console.log($scope.list_open_devices);
                                        console.log("service.update: ");
                                        console.log($scope.service.update);
                                        $('#updateCtrlAccessService').modal({backdrop: 'static', keyboard: false});
                                        $('#updateCtrlAccessService').on('shown.bs.modal', function () {});
                                    }, 500);
                                    blockUI.stop();
                                break;
                                case "2": //LOAD INTERNET
                                    //SET THE SELECTED SERVICES ASOCIATED WITH THE INTERNET SERVICE
                                    $scope.$watch('service.update.idServiceAsociateFk_array', function(nowSelected){
                                        $scope.service.update.idServiceAsociateFk= [];
                                        if( ! nowSelected ){
                                            return;
                                        }
                                        angular.forEach(nowSelected, function(val){
                                            $scope.service.update.idServiceAsociateFk.push( val.idClientServices );
                                        });
                                    });
                                    console.log($scope.service.update.idServiceAsociateFk);
                                    $timeout(function() {
                                        $scope.service.update.idContratoFk        = service.idContracAssociated_SE;
                                        $scope.service.update.numeroContrato      = service.idContracAssociated_SE_array!=null?service.idContracAssociated_SE_array[0].numeroContrato:null;
                                        $scope.service.modem.selected             = service.idModemInternetFk_array!=undefined?service.idModemInternetFk_array[0]:null;
                                        $scope.service.router.selected            = service.idTypeInternetFk<="2" && service.idRouterInternetFk_array!=undefined && service.idRouterInternetFk_array.length==1?service.idRouterInternetFk_array[0]:null;
                                        $scope.service.update.idInternetCompanyFk = service.idInternetCompanyFk_array!=undefined?service.idInternetCompanyFk_array[0].idInternetCompany:null;
                                        $scope.service.update.idServiceFk         = service.idServiceFk_array!=undefined?service.idServiceFk_array[0].idTypeInternet:null;
                                        $scope.list_productsDetails = [];
                                        $scope.service.update.idTypeMaintenanceFk = service.idTypeMaintenanceFk_array!=undefined?service.idTypeMaintenanceFk_array[0].idTypeMaintenance:null;
                                        $scope.service.update.MntType             = service.idTypeMaintenanceFk_array!=undefined?service.idTypeMaintenanceFk_array[0].typeMaintenance:null;
                                        $scope.service.update.battery_install     = service.tb_battery_install_access_control_array;
                                        $scope.service.update.open_devices        = service.tb_open_devices_access_control_array;
                                        // Convertir la cadena a un objeto Date usando Moment-Timezone
                                        var date = moment.tz(service.dateUp, "YYYY-MM-DD", "America/Argentina/Buenos_Aires");
                                        var newDate = date.toDate();
                                        $scope.service.update.dateUp = newDate;
                                        var productIdNumber = 1;
                                        for (var key in service.adicional){
                                            for (var prduct in $scope.rsProductsData){
                                                if (service.adicional[key].idProductoFk==$scope.rsProductsData[prduct].idProduct){
                                                    $scope.list_productsDetails.push({'idProductDetail':productIdNumber,'idProductoFk':service.adicional[key].idProductoFk, 'numberSerieFabric':service.adicional[key].numberSerieFabric, 'numberSerieInternal':service.adicional[key].numberSerieInternal,'dateExpiration':service.adicional[key].dateExpiration, 'optAux':service.adicional[key].optAux});
                                                    $scope.typeOfProductsFn("set", $scope.rsProductsData[prduct].idProductClassification, productIdNumber, service.adicional[key].optAux);
                                                    productIdNumber++;
                                                    break;
                                                }
                                            }
                                        }
                                        console.log($scope.list_productsDetails);
                                        //console.log($scope.productListType);
                                        $scope.rsCustomerContractListData          = $scope.rsContractsListByCustomerIdData;
                                        $scope.rsContractItemListData              = $scope.getSelectedServiceByIdContractFn($scope.service.update.idContratoFk, $scope.service.update.idClientTypeServices);

                                        console.log($scope.service.update);
                                        $('#updateInternetService').modal({backdrop: 'static', keyboard: false});
                                        $('#updateInternetService').on('shown.bs.modal', function () {});
                                    }, 500);
                                    blockUI.stop();
                                break;
                                case "3": //LOAD TOTEM
                                    ContractServices.getSelectedServiceByIdContract(service.idContracAssociated_SE, service.idTipeServiceFk).then(function(data){
                                        $scope.rsJsonData = data;
                                        console.log($scope.rsJsonData);
                                        if($scope.rsJsonData.status==200){
                                            $scope.service.cameras_available=$scope.rsJsonData.data[0].services[0].items_available;
                                            $scope.service.cameras_contracted=$scope.rsJsonData.data[0].services[0].items_contracted;
                                        }
                                    });

                                $timeout(function() {
                                    $scope.service.update.idContratoFk         = service.idContracAssociated_SE;
                                    $scope.service.update.numeroContrato       = service.idContracAssociated_SE_array[0].numeroContrato;
                                    $scope.service.dvr.selected                = service.idDvr_nvrFk_array[0];
                                    $scope.service.maxCamera                   = service.maxCamera;
                                    $scope.service.update.idTypeMaintenanceFk  = service.idTypeMaintenanceFk_array[0].idTypeMaintenance;
                                    $scope.service.update.MntType              = service.idTypeMaintenanceFk_array[0].typeMaintenance;
                                    // Convertir la cadena a un objeto Date usando Moment-Timezone
                                    var date = moment.tz(service.dateUp, "YYYY-MM-DD", "America/Argentina/Buenos_Aires");
                                    var newDate = date.toDate();
                                    $scope.service.update.dateUp = newDate;
                                    var productIdNumber = 1;
                                    var productIndexNumb = 1;
                                    for (var key in service.adicional){
                                    for (var prduct in $scope.rsProductsData){
                                        if (service.adicional[key].idProductoFk==$scope.rsProductsData[prduct].idProduct){
                                        $scope.list_productsDetails.push({'idProductDetail':productIdNumber,'idProductoFk':service.adicional[key].idProductoFk, 'numberSerieFabric':service.adicional[key].numberSerieFabric, 'numberSerieInternal':service.adicional[key].numberSerieInternal,'dateExpiration':service.adicional[key].dateExpiration, 'optAux':service.adicional[key].optAux});
                                        $scope.typeOfProductsFn("set", $scope.rsProductsData[prduct].idProductClassification, productIdNumber, service.adicional[key].optAux);
                                        productIdNumber++;
                                        }
                                        for (var batery in service.tb_backup_energy_totem_array){
                                        if (service.adicional[key].idProductoFk==$scope.rsProductsData[prduct].idProduct && service.tb_backup_energy_totem_array[batery].idBatteryFk==service.adicional[key].idProductoFk){
                                            $scope.list_batteries.push({'idProductIndex':productIndexNumb,'idBatteryFk':service.tb_backup_energy_totem_array[batery].idBatteryFk,'descriptionProduct':$scope.rsProductsData[prduct].descriptionProduct, 'model':$scope.rsProductsData[prduct].model, 'brand': $scope.rsProductsData[prduct].brand,'isNumberSerieInternal':$scope.rsProductsData[prduct].isNumberSerieInternal,'isNumberSerieFabric':$scope.rsProductsData[prduct].isNumberSerieFabric,'isDateExpiration':$scope.rsProductsData[prduct].isDateExpiration, 'numberSerieFabric':service.adicional[key].numberSerieFabric, 'numberSerieInternal':service.adicional[key].numberSerieInternal,'dateExpiration':service.adicional[key].dateExpiration, 'idProductClassification':service.tb_backup_energy_totem_array[batery].idProductClassificationFk, 'classification': $scope.rsProductsData[prduct].classification, 'description':$scope.rsProductsData[prduct].descriptionProduct, 'isNew':0});
                                            productIndexNumb++;
                                        }
                                        }
                                    }
                                    }
                                    //LOAD DVR USERS
                                    $scope.getUserLists();
                                    var idListItem = 1;
                                    for (var dvrUser in service.tb_client_totem_array){
                                    $scope.list_user.push({'idItem':idListItem,'idClientFk':service.tb_client_totem_array[dvrUser].idClientFk,'name':service.tb_client_totem_array[dvrUser].name, 'user':service.tb_client_totem_array[dvrUser].user, 'pass':service.tb_client_totem_array[dvrUser].pass, 'profile':service.tb_client_totem_array[dvrUser].userProfile, 'userProfile':service.tb_client_totem_array[dvrUser].userProfile, 'qrCode':service.tb_client_totem_array[dvrUser].qrBase64, 'qrBase64':service.tb_client_totem_array[dvrUser].qrBase64});
                                    idListItem++;
                                    }
                                    //LOAD CAMERAS
                                    for (var camera in service.tb_cameras_totem_array){
                                    for (var prduct in $scope.rsProductsData){
                                        if ($scope.rsProductsData[prduct].idProduct==service.tb_cameras_totem_array[camera].idProductFk){
                                        $scope.list_cameras.push({'idProductFk':service.tb_cameras_totem_array[camera].idProductFk, 'idCameraFk':service.tb_cameras_totem_array[camera].idProductFk,'portCamera':parseInt(service.tb_cameras_totem_array[camera].portCamera), 'coveredArea':service.tb_cameras_totem_array[camera].coveredArea, 'locationCamera': service.tb_cameras_totem_array[camera].locationCamera, 'descriptionProduct':$scope.rsProductsData[prduct].descriptionProduct, 'model':$scope.rsProductsData[prduct].model, 'brand': $scope.rsProductsData[prduct].brand,'isNumberSerieInternal':$scope.rsProductsData[prduct].isNumberSerieInternal,'isNumberSerieFabric':$scope.rsProductsData[prduct].isNumberSerieFabric,'isDateExpiration':$scope.rsProductsData[prduct].isDateExpiration, 'numberSerieFabric':service.tb_cameras_totem_array[camera].nroFabricCamera, 'numberSerieInternal':service.tb_cameras_totem_array[camera].nroSerieCamera,'dateExpiration':service.tb_cameras_totem_array[camera].dateExpireCamera, 'idProductClassification':$scope.rsProductsData[prduct].idProductClassification, 'classification': $scope.rsProductsData[prduct].classification, 'nroSerieCamera':service.tb_cameras_totem_array[camera].nroSerieCamera,'nroFabricCamera':service.tb_cameras_totem_array[camera].nroFabricCamera,'dateExpireCamera':service.tb_cameras_totem_array[camera].dateExpireCamera, 'isNew':0});
                                        break;
                                        }
                                    }
                                    }
                                    console.log($scope.list_cameras);
                                    //console.log($scope.list_productsDetails);
                                    //console.log($scope.productListType);
                                    //LIST BATTERIES INSTALLED
                                    //console.log($scope.list_batteries);
                                    $scope.rsCustomerContractListData            = $scope.rsContractsListByCustomerIdData;
                                    $scope.service.update.isHasInternetConnect   = $scope.service.update.numberPortRouter!=undefined && $scope.service.update.portHttpInter!=undefined?true: false;
                                    if ($scope.service.update.isHasInternetConnect){
                                    $scope.service.update.namePort = service.namePortInter;
                                    $scope.service.update.port     = service.numberPortInter;
                                    $scope.service.update.nroPort1 = service.numberPort1;
                                    $scope.service.update.nroPort2 = service.numberPort2;
                                    }
                                console.log($scope.service.update);
                                $('#updateTotemService').modal({backdrop: 'static', keyboard: false});
                                $('#updateTotemService').on('shown.bs.modal', function () {});
                                }, 500);
                                blockUI.stop();
                            break;
                                case "4": //LOAD CAMERAS
                                    ContractServices.getSelectedServiceByIdContract(service.idContracAssociated_SE, service.idTipeServiceFk).then(function(data){
                                        $scope.rsJsonData = data;
                                        console.log($scope.rsJsonData);
                                        if($scope.rsJsonData.status==200){
                                            $scope.service.cameras_available=$scope.rsJsonData.data[0].services[0].items_available;
                                            $scope.service.cameras_contracted=$scope.rsJsonData.data[0].services[0].items_contracted;
                                        }
                                    });
                                    $timeout(function() {
                                        $scope.service.update.idContratoFk         = service.idContracAssociated_SE;
                                        $scope.service.update.numeroContrato       = service.idContracAssociated_SE_array[0].numeroContrato;
                                        $scope.service.dvr.selected                = service.idDvr_nvrFk_array[0];
                                        $scope.service.maxCamera                   = service.maxCamera;
                                        $scope.service.update.idTypeMaintenanceFk  = service.idTypeMaintenanceFk_array[0].idTypeMaintenance;
                                        $scope.service.update.MntType              = service.idTypeMaintenanceFk_array[0].typeMaintenance;
                                        // Convertir la cadena a un objeto Date usando Moment-Timezone
                                        var date = moment.tz(service.dateUp, "YYYY-MM-DD", "America/Argentina/Buenos_Aires");
                                        var newDate = date.toDate();
                                        $scope.service.update.dateUp = newDate;
                                        var productIdNumber = 1;
                                        var productIndexNumb = 1;
                                        //LOAD ADICITIONAL
                                        for (var key in service.adicional){
                                            for (var prduct in $scope.rsProductsData){
                                                if (service.adicional[key].idProductoFk==$scope.rsProductsData[prduct].idProduct){
                                                    $scope.list_productsDetails.push({'idProductDetail':productIdNumber,'idProductoFk':service.adicional[key].idProductoFk, 'numberSerieFabric':service.adicional[key].numberSerieFabric, 'numberSerieInternal':service.adicional[key].numberSerieInternal,'dateExpiration':service.adicional[key].dateExpiration, 'optAux':service.adicional[key].optAux});
                                                    $scope.typeOfProductsFn("set", $scope.rsProductsData[prduct].idProductClassification, productIdNumber, service.adicional[key].optAux);
                                                    productIdNumber++;
                                                }
                                                for (var batery in service.tb_backup_energy_array){
                                                    if (service.adicional[key].idProductoFk==$scope.rsProductsData[prduct].idProduct && service.tb_backup_energy_array[batery].idBatteryFk==service.    adicional[key].idProductoFk){
                                                    $scope.list_batteries.push({'idProductIndex':productIndexNumb,'idBatteryFk':service.tb_backup_energy_array[batery].idBatteryFk, 'descriptionProduct':$scope.rsProductsData[prduct].descriptionProduct, 'model':$scope.rsProductsData[prduct].model, 'brand': $scope.rsProductsData   [prduct].brand,'isNumberSerieInternal':$scope.rsProductsData[prduct].isNumberSerieInternal,'isNumberSerieFabric':$scope.rsProductsData[prduct].    isNumberSerieFabric,'isDateExpiration':$scope.rsProductsData[prduct].isDateExpiration, 'numberSerieFabric':service.adicional[key].numberSerieFabric,    'numberSerieInternal':service.adicional[key].numberSerieInternal,'dateExpiration':service.adicional[key].dateExpiration,   'idProductClassification':service.tb_backup_energy_array[batery].idProductClassificationFk, 'classification': $scope.rsProductsData[prduct].  classification, 'description':$scope.rsProductsData[prduct].descriptionProduct, 'isNew':0});
                                                    productIndexNumb++;
                                                    }
                                                }
                                            }
                                        }
                                        //LOAD DVR USERS
                                        $scope.getUserLists();
                                        var idListItem = 1;
                                        for (var dvrUser in service.tb_client_camera_array){
                                            $scope.list_user.push({'idItem':idListItem,'idClientFk':service.tb_client_camera_array[dvrUser].idClientFk,'name':service.tb_client_camera_array[dvrUser].name, 'user':service.tb_client_camera_array[dvrUser].user, 'pass':service.tb_client_camera_array[dvrUser].pass, 'profile':service.tb_client_camera_array[dvrUser].userProfile, 'userProfile':service.tb_client_camera_array[dvrUser].userProfile, 'qrCode':service.tb_client_camera_array[dvrUser].qrBase64, 'qrBase64':service.tb_client_camera_array[dvrUser].qrBase64});
                                            idListItem++;
                                        }
                                        console.log($scope.list_user);
                                        //LOAD CAMERAS
                                        for (var camera in service.tb_cameras_array){
                                            for (var prduct in $scope.rsProductsData){
                                                if ($scope.rsProductsData[prduct].idProduct==service.tb_cameras_array[camera].idProductFk){
                                                    $scope.list_cameras.push({'idProductFk':service.tb_cameras_array[camera].idProductFk, 'idCameraFk':service.tb_cameras_array[camera].idProductFk,'portCamera':parseInt(service.tb_cameras_array[camera].portCamera), 'coveredArea':service.tb_cameras_array[camera].coveredArea, 'locationCamera': service.tb_cameras_array[camera].locationCamera, 'descriptionProduct':$scope.rsProductsData[prduct].descriptionProduct, 'model':$scope.rsProductsData[prduct].model, 'brand': $scope.rsProductsData[prduct].brand,'isNumberSerieInternal':$scope.rsProductsData[prduct].isNumberSerieInternal,'isNumberSerieFabric':$scope.rsProductsData[prduct].isNumberSerieFabric,'isDateExpiration':$scope.rsProductsData[prduct].isDateExpiration, 'numberSerieFabric':service.tb_cameras_array[camera].nroFabricCamera, 'numberSerieInternal':service.tb_cameras_array[camera].nroSerieCamera,'dateExpiration':service.tb_cameras_array[camera].dateExpireCamera, 'idProductClassification':$scope.rsProductsData[prduct].idProductClassification, 'classification': $scope.rsProductsData[prduct].classification, 'nroSerieCamera':service.tb_cameras_array[camera].nroSerieCamera,'nroFabricCamera':service.tb_cameras_array[camera].nroFabricCamera,'dateExpireCamera':service.tb_cameras_array[camera].dateExpireCamera, 'isNew':0});
                                                    break;
                                                }
                                            }
                                        }
                                        console.log($scope.list_cameras);
                                        //console.log($scope.list_productsDetails);
                                        //console.log($scope.productListType);
                                        //LIST BATTERIES INSTALLED
                                        //console.log($scope.list_batteries);
                                        $scope.rsCustomerContractListData            = $scope.rsContractsListByCustomerIdData;
                                        $scope.service.update.isHasInternetConnect   = $scope.service.update.numberPortRouter!=undefined && $scope.service.update.portHttp!=undefined?true: false;
                                        console.log($scope.service.update);
                                        $('#updateCamerasService').modal({backdrop: 'static', keyboard: false});
                                        $('#updateCamerasService').on('shown.bs.modal', function () {});
                                    }, 500);
                                    blockUI.stop();
                                break;
                                case "5": //LOAD ALARM
                                    $scope.getResourcesFromServiceFn($scope.rsAllServicesListOfCustomer, "dvr");
                                    $scope.getTypeAlarmClientListFn();
                                    $scope.getAlarmServiceAditionalsListFn();
                                    $scope.getTypeConnectionListFn();
                                    $scope.getTransmissionFormatListFn();
                                    $scope.switchCustomersFn('services', service, 'getUsersForAttByClient', '');
                                    $timeout(function() {
                                        $scope.service.update.idContratoFk          = service.idContracAssociated_SE;
                                        $scope.service.update.numeroContrato        = service.idContracAssociated_SE_array[0].numeroContrato;
                                        $scope.service.alarmPanel.selected          = service.panelAlarm_array[0];
                                        $scope.service.alarmKeyboard.selected       = service.keyboardAlarm_array[0];
                                        $scope.service.zonesQttyInstalled           = service.countZoneIntaled;
                                        $scope.service.update.idTypeMaintenanceFk   = service.idTypeMaintenanceFk_array==undefined?null:service.idTypeMaintenanceFk_array[0].idTypeMaintenance;
                                        $scope.service.update.MntType               = service.idTypeMaintenanceFk_array==undefined?null:service.idTypeMaintenanceFk_array[0].typeMaintenance;
                                        $scope.service.update.idCompanyMonitorFK    = service.companyMonitor;
                                        $scope.service.update.idTipoConexionRemoto  = service.idTypeConectionRemote;
                                        $scope.moduleConnectionType                 = service.idTypeConectionRemote;
                                        $scope.service.update.numberCustomer        = service.numberPay;
                                        $scope.service.update.idDatoAdicionalAlarma = service.idDatoAdicionalAlarma;
                                        $scope.service.idClientTypeFk               = $scope.customerFound.idClientTypeFk;
                                        // Convertir la cadena a un objeto Date usando Moment-Timezone
                                        var date = moment.tz(service.dateUp, "YYYY-MM-DD", "America/Argentina/Buenos_Aires");
                                        var newDate = date.toDate();
                                        $scope.service.update.dateUp = newDate;
                                        if ($scope.service.idClientTypeFk=="2"){
                                        $scope.getBuildingsDeptosFn($scope.service.update.idClientFk);
                                        }else if ($scope.service.idClientTypeFk=="5"){
                                        $scope.service.list_address_particular=$scope.customerFound.list_address_particular;
                                        //$scope.service.idContracAssociated_SE=
                                        }
                                        var productIdNumber = 1;
                                        var productIndexNumb = 1;
                                        //LOAD ADITIONAL
                                        for (var key in service.adicional){
                                        for (var prduct in $scope.rsProductsData){
                                            if (service.adicional[key].idProductoFk==$scope.rsProductsData[prduct].idProduct){
                                            $scope.list_productsDetails.push({'idProductDetail':productIdNumber,'idProductoFk':service.adicional[key].idProductoFk, 'numberSerieFabric':service.adicional[key].numberSerieFabric, 'numberSerieInternal':service.adicional[key].numberSerieInternal,'dateExpiration':service.adicional[key].dateExpiration, 'optAux':service.adicional[key].optAux});
                                            $scope.typeOfProductsFn("set", $scope.rsProductsData[prduct].idProductClassification, productIdNumber, service.adicional[key].optAux);
                                            productIdNumber++;
                                            }
                                        }
                                        }
                                        //LOAD BATTERIES
                                        for (var batery in service.tb_alarm_batery_array){
                                            for (var prduct in $scope.rsProductsData){
                                                if (service.tb_alarm_batery_array[batery].idProductoFk==$scope.rsProductsData[prduct].idProduct){
                                                $scope.list_batteries.push({'idProductIndex':productIndexNumb,'idBatteryFk':service.tb_alarm_batery_array[batery].idProductoFk,'descriptionProduct':$scope.rsProductsData[prduct].descriptionProduct, 'model':$scope.rsProductsData[prduct].model, 'brand': $scope.rsProductsData[prduct].brand,'isNumberSerieInternal':$scope.rsProductsData[prduct].isNumberSerieInternal,'isNumberSerieFabric':$scope.rsProductsData[prduct].isNumberSerieFabric,'isDateExpiration':$scope.rsProductsData[prduct].isDateExpiration, 'numberSerieFabric':service.tb_alarm_batery_array[batery].nroFabric, 'numberSerieInternal':service.tb_alarm_batery_array[batery].nroInternal,'dateExpiration':service.tb_alarm_batery_array[batery].dateExpired, 'idProductClassification':$scope.rsProductsData[prduct].idProductClassificationFk, 'classification': $scope.rsProductsData[prduct].classification, 'description':$scope.rsProductsData[prduct].descriptionProduct, 'isNew':0});
                                                productIndexNumb++;
                                                }
                                            }
                                        }
                                        //LOAD SENSORS
                                        if (service.tb_sensors_alarm_array!=undefined && service.tb_sensors_alarm_array.length>=1){
                                            for (var sensor in service.tb_sensors_alarm_array){
                                                for (var prduct in $scope.rsProductsData){
                                                if (service.tb_sensors_alarm_array[sensor].idSensorProduct==$scope.rsProductsData[prduct].idProduct){
                                                    var sensorSelected = $scope.rsProductsData[prduct];
                                                }
                                                }
                                                if (service.tb_sensors_alarm_array[sensor].idCameraFk!=null){
                                                //console.log("[sensor].idCameraFk: "+service.tb_sensors_alarm_array[sensor].idCameraFk);
                                                //console.log("[sensor].idDvr: "+service.tb_sensors_alarm_array[sensor].idDvr);
                                                for (var camera in $scope.resources.cameras){
                                                    //console.log("[camera].idCamera: "+$scope.resources.cameras[camera].idCamera);
                                                    //console.log("[camera].idCameraProduct: "+$scope.resources.cameras[camera].idCameraProduct);
                                                    if (service.tb_sensors_alarm_array[sensor].idCameraFk == $scope.resources.cameras[camera].idCamera){
                                                    //console.log("Camara encontrada:");
                                                    //console.log($scope.resources.cameras[camera]);
                                                    var portCamera = $scope.resources.cameras[camera].portCamera;
                                                    for (var dvr in $scope.resources.dvr){
                                                        if (service.tb_sensors_alarm_array[sensor].idDvr==$scope.resources.dvr[dvr].idProduct && $scope.resources.cameras[camera].idClientServicesFk==$scope.resources.dvr[dvr].idClientServices){
                                                        var dvrSelected = $scope.resources.dvr[dvr];
                                                        }
                                                    }
                                                    }
                                                }
                                                }else{
                                                    var dvrSelected   = null;
                                                    var portCamera    = null;
                                                }
                                                var nroZoneTamper = service.tb_sensors_alarm_array[sensor].nroZoneTamper!=null?parseInt(service.tb_sensors_alarm_array[sensor].nroZoneTamper):null;
                                                $scope.list_sensors.push({'idSensor':service.tb_sensors_alarm_array[sensor].idSensorProduct,'sensorDetails':sensorSelected,'numberZoneSensor':parseInt(service.tb_sensors_alarm_array[sensor].numberZoneSensor),'area':service.tb_sensors_alarm_array[sensor].area, 'isWirelessSensor':parseInt(service.tb_sensors_alarm_array[sensor].isWirelessSensor), 'nroZoneTamper':nroZoneTamper, 'locationLon':service.tb_sensors_alarm_array[sensor].locationLon, 'idDvr':service.tb_sensors_alarm_array[sensor].idDvr, 'dvrDetails':dvrSelected, 'idCameraFk':service.tb_sensors_alarm_array[sensor].idCameraFk, 'portCamera':portCamera, 'nroInterno':service.tb_sensors_alarm_array[sensor].nroInterno, 'nroFrabric':service.tb_sensors_alarm_array[sensor].nroFrabric});
                                            }
                                            console.log($scope.list_sensors);
                                        }else{
                                            inform.add('El servicio no tiene Sensores asociados. ',{
                                            ttl:10000, type: 'info'
                                            });
                                        }
                                        //LOAD ADITIONAL ALARM
                                        if (service.tb_datos_adicionales_alarmas_array!=undefined && service.tb_datos_adicionales_alarmas_array.length>=1){
                                            $scope.service.aditional_alarm=service.tb_datos_adicionales_alarmas_array[0];
                                            $scope.service.aditional_alarm.sysUser={'selected':undefined};
                                            //ATTENDANT SELETECTED
                                            if (service.tb_datos_adicionales_alarmas_array[0].fk_idEncargado!=null && service.tb_datos_adicionales_alarmas_array[0].fk_idEncargado!=''){
                                                $scope.service.isSysUser=true;
                                                for (var key in $scope.rsList.sysUsers){
                                                if (service.tb_datos_adicionales_alarmas_array[0].fk_idEncargado==$scope.rsList.sysUsers[key].idUser){
                                                    $scope.service.aditional_alarm.sysUser.selected=$scope.rsList.sysUsers[key];
                                                    //console.log($scope.service.aditional_alarm.sysUser.selected);
                                                    break;
                                                }
                                                }
                                            }
                                            //ADITIONAL SERVICES ASOCIATED
                                            if (service.tb_datos_adicionales_alarmas_array!=undefined && service.tb_datos_adicionales_alarmas_array.length>=1){
                                                $scope.aditional_service_alarm=JSON.parse(service.tb_datos_adicionales_alarmas_array[0].fk_idServiciosAdicionales);
                                                for (var item in $scope.aditional_service_alarm){
                                                for (var key in $scope.rsAlarmServiceAditionalsListData){
                                                    if ($scope.rsAlarmServiceAditionalsListData[key].idAlarmServicesAditionals==$scope.aditional_service_alarm[item]){
                                                    $scope.rsAlarmServiceAditionalsListData[key].selected=true;
                                                    break;
                                                    }
                                                }
                                                }
                                            }
                                            //SCHEDULE
                                            if (service.tb_datos_adicionales_alarmas_array[0].tb_franja_horaria_alarmas_array!=undefined){
                                                $scope.tmpVars.list_schedule_atention=service.tb_datos_adicionales_alarmas_array[0].tb_franja_horaria_alarmas_array!=undefined || service.tb_datos_adicionales_alarmas_array[0].tb_franja_horaria_alarmas_array.length>=1?service.tb_datos_adicionales_alarmas_array[0].tb_franja_horaria_alarmas_array:null;
                                                if ($scope.tmpVars.list_schedule_atention!=null){
                                                $scope.list_schedule_atention=[];
                                                for (var i = 0; i < $scope.tmpVars.list_schedule_atention.length; i++) {
                                                    if($scope.tmpVars.list_schedule_atention[i].day==$scope.list_schedule[i].day){
                                                    //Load the data to the list that will be render in the frontend
                                                    $scope.list_schedule[i].fronAm    = $scope.tmpVars.list_schedule_atention[i].fronAm;
                                                    $scope.list_schedule[i].toAm      = $scope.tmpVars.list_schedule_atention[i].toAm;
                                                    $scope.list_schedule[i].fronPm    = $scope.tmpVars.list_schedule_atention[i].fronPm;
                                                    $scope.list_schedule[i].toPm      = $scope.tmpVars.list_schedule_atention[i].toPm;
                                                    $scope.list_schedule[i].selected  = true;
                                                    //Load the data to a temp array to handle the schedule
                                                    $scope.list_schedule_atention.push({
                                                        'id_franja_horaria':$scope.tmpVars.list_schedule_atention[i].idScheduleAtention,
                                                        'fk_idDatoAdicionalAlarma':$scope.tmpVars.list_schedule_atention[i].fk_idDatoAdicionalAlarma,
                                                        'day':$scope.tmpVars.list_schedule_atention[i].day,
                                                        'fronAm':$scope.tmpVars.list_schedule_atention[i].fronAm,
                                                        'toAm':$scope.tmpVars.list_schedule_atention[i].toAm,
                                                        'fronPm':$scope.tmpVars.list_schedule_atention[i].fronPm,
                                                        'toPm':$scope.tmpVars.list_schedule_atention[i].toPm});
                                                    }
                                                }
                                                }
                                            }else{
                                                //inform.add('No estan asignadas las franjas de horario en Datos Adicionales. ',{
                                                //  ttl:10000, type: 'info'
                                                //});
                                            }
                                            //PERSONAS PARA DAR AVISO
                                            if(service.tb_datos_adicionales_alarmas_array[0].tb_personas_para_dar_aviso_alarmas_array!=undefined){
                                                var list_people_notice=[];
                                                list_people_notice = service.tb_datos_adicionales_alarmas_array[0].tb_personas_para_dar_aviso_alarmas_array!=undefined || service.tb_datos_adicionales_alarmas_array[0].tb_personas_para_dar_aviso_alarmas_array.length>=1?service.tb_datos_adicionales_alarmas_array[0].tb_personas_para_dar_aviso_alarmas_array:null;
                                                var itemNumber=0;
                                                for (var key in list_people_notice){
                                                $scope.list_people_notice.push({'id':(itemNumber+1),'fk_idUserSystema':list_people_notice[key].fk_idUserSystema,'nombre_apellido':list_people_notice[key].nombre_apellido, 'vinculo':list_people_notice[key].vinculo, 'palabra_clave':list_people_notice[key].palabra_clave, 'telefono':list_people_notice[key].telefono, 'numero_del_usuario':list_people_notice[key].numero_del_usuario, 'opt':'getnotice'});
                                                itemNumber++;
                                                }
                                            }else{
                                                //inform.add('No hay usuarios/personas en la lista para dar aviso en Datos Adicionales. ',{
                                                //  ttl:10000, type: 'info'
                                                //});
                                            }
                                            if(service.tb_datos_adicionales_alarmas_array[0].tb_personas_para_verificar_en_lugar_array!=undefined){
                                                //PERSONAS PARA VERFICICAR EN EL LUGAR
                                                var list_people_verify=[];
                                                list_people_verify = service.tb_datos_adicionales_alarmas_array[0].tb_personas_para_verificar_en_lugar_array!=undefined || service.tb_datos_adicionales_alarmas_array[0].tb_personas_para_verificar_en_lugar_array.length>=1?service.tb_datos_adicionales_alarmas_array[0].tb_personas_para_verificar_en_lugar_array:null;
                                                var itemNumber=0;
                                                for (var key in list_people_verify){
                                                $scope.list_people_verify.push({'id':(itemNumber+1),'fk_idUserSystema':list_people_verify[key].fk_idUserSystema,'nombre_apellido':list_people_verify[key].nombre_apellido, 'vinculo':list_people_verify[key].vinculo, 'palabra_clave':list_people_verify[key].palabra_clave, 'telefono':list_people_verify[key].telefono, 'numero_del_usuario':list_people_verify[key].numero_del_usuario, 'opt':'verifyplace'});
                                                itemNumber++;
                                                }
                                            }else{
                                                //inform.add('No hay usuarios/personas en la lista para verificar en el lugar en Datos Adicionales. ',{
                                                //  ttl:10000, type: 'info'
                                                //});
                                            }
                                            //console.log($scope.service.aditional_alarm);
                                            $scope.addAditionalAlarmFn($scope.service.aditional_alarm);
                                        }else{
                                            inform.add('El servicio no tiene Datos Adicionales asociados. ',{
                                            ttl:10000, type: 'info'
                                            });
                                        }
                                        //LOAD CONECTION REMOTE TYPE
                                        $scope.tipo_conexion_remoto_tmp={};
                                        if(service.tb_tipo_conexion_remoto_array!=undefined && service.tb_tipo_conexion_remoto_array.length>=1){
                                            for (var connType in service.tb_tipo_conexion_remoto_array){
                                                for (var prduct in $scope.rsProductsData){
                                                    if (service.tb_tipo_conexion_remoto_array[connType].moduleIp==$scope.rsProductsData[prduct].idProduct && service.tb_tipo_conexion_remoto_array[connType].moduleGprs==undefined){
                                                    $scope.tipo_conexion_remoto_tmp=service.tb_tipo_conexion_remoto_array[connType];
                                                    $scope.tipo_conexion_remoto_tmp.idTipoConexionRemoto="2";
                                                    $scope.tipo_conexion_remoto_tmp.ipAlarmModule={'selected':undefined};
                                                    $scope.tipo_conexion_remoto_tmp.ipAlarmModule.selected=$scope.rsProductsData[prduct];
                                                    break;
                                                    }else if (service.tb_tipo_conexion_remoto_array[connType].moduleGprs==$scope.rsProductsData[prduct].idProduct && service.tb_tipo_conexion_remoto_array[connType].moduleIp==undefined){
                                                    $scope.tipo_conexion_remoto_tmp=service.tb_tipo_conexion_remoto_array[connType];
                                                    $scope.tipo_conexion_remoto_tmp.idTipoConexionRemoto="3";
                                                    $scope.tipo_conexion_remoto_tmp.gprsAlarmModule={'selected':undefined};
                                                    $scope.tipo_conexion_remoto_tmp.gprsAlarmModule.selected=$scope.rsProductsData[prduct];
                                                    break;
                                                    }else if (service.tb_tipo_conexion_remoto_array[connType].moduleIp==undefined && service.tb_tipo_conexion_remoto_array[connType].moduleGprs==undefined){
                                                    //console.log(service.tb_tipo_conexion_remoto_array[connType]);
                                                    $scope.tipo_conexion_remoto_tmp=service.tb_tipo_conexion_remoto_array[connType];
                                                    $scope.tipo_conexion_remoto_tmp.idTipoConexionRemoto="1";
                                                    break;
                                                    }
                                                }
                                                for (var type in $scope.rsTypeConnectionListData){
                                                    console.log($scope.rsTypeConnectionListData[type])
                                                    if($scope.rsTypeConnectionListData[type].idTipoConexionRemoto==$scope.tipo_conexion_remoto_tmp.idTipoConexionRemoto){
                                                        $scope.rsTypeConnectionListData[type].selected=true;
                                                    }
                                                }
                                                //console.log($scope.tipo_conexion_remoto_tmp);
                                                $scope.addServiceModuleConnectionDetailsFn($scope.tipo_conexion_remoto_tmp, $scope.tipo_conexion_remoto_tmp.idTipoConexionRemoto, 'new')
                                            }
                                        }else{
                                            inform.add('El servicio no tiene un Tipo de conexion asociado. ',{
                                            ttl:10000, type: 'info'
                                            });
                                        }
                                        $scope.rsCustomerContractListData            = $scope.rsContractsListByCustomerIdData;
                                        console.log($scope.service.update);
                                    $('#updateAlarmService').modal({backdrop: 'static', keyboard: false});
                                    $('#updateAlarmService').on('shown.bs.modal', function () {});
                                    }, 500);
                                    blockUI.stop();
                                break;
                                case "6": //LOAD APP MONITOR
                                    $timeout(function() {
                                        $scope.service.update.idContratoFk        = service.idContracAssociated_SE;
                                        $scope.service.update.numeroContrato      = service.idContracAssociated_SE_array[0].numeroContrato;
                                        $scope.isCollapsed                        = true;
                                        $scope.service.update.idTypeMaintenanceFk = service.idTypeMaintenanceFk_array[0].idTypeMaintenance;
                                        $scope.service.update.MntType             = service.idTypeMaintenanceFk_array[0].typeMaintenance;
                                        $scope.service.idApplicationFk            = service.idApplicationFk_array[0].idApplication;
                                        $scope.service.sucribeNumber              = service.sucribeNumber;
                                        $scope.service.passwordApp                = service.passwdApp;
                                        $scope.rsCustomerContractListData         = $scope.rsContractsListByCustomerIdData;
                                        $scope.rsContractItemListData             = $scope.getSelectedServiceByIdContractFn($scope.service.update.idContratoFk, $scope.service.update.idClientTypeServices);
                                        $scope.service.idClientTypeFk             = $scope.customerFound.idClientTypeFk;
                                        $scope.service.numbOfNewLicence           = parseInt(service.countNewLicense);
                                        // Convertir la cadena a un objeto Date usando Moment-Timezone
                                        var date = moment.tz(service.dateUp, "YYYY-MM-DD", "America/Argentina/Buenos_Aires");
                                        var newDate = date.toDate();
                                        $scope.service.update.dateUp = newDate;
                                        if ($scope.service.idClientTypeFk=="2"){
                                            $scope.getBuildingsDeptosFn($scope.service.update.idClientFk);
                                        }else if ($scope.service.idClientTypeFk=="5"){
                                            $scope.service.update.list_address_particular=$scope.customerFound.list_address_particular;
                                            //$scope.service.idContracAssociated_SE=
                                        }
                                        $scope.changeLicencesFn("set");
                                        $scope.getUserLists();
                                        $scope.list_user_licence_tmp=[];
                                        $scope.list_user_licence_idDepartmentList={'idDepto':'', 'Depto':'', 'idBuilding':'', 'Building':''};
                                        for (var key in service.tb_user_license_array){
                                            $scope.list_user_licence_idDepartmentList.idDepto     = service.tb_user_license_array[key].idDepto;
                                            $scope.list_user_licence_idDepartmentList.Depto       = service.tb_user_license_array[key].Depto;
                                            $scope.list_user_licence_idDepartmentList.idBuilding  = service.tb_user_license_array[key].idBuilding;
                                            $scope.list_user_licence_idDepartmentList.Building    = service.tb_user_license_array[key].Building;
                                            $scope.list_user_licence_tmp.push({'idDetinationOfLicenseFk':service.tb_user_license_array[key].idDetinationOfLicenseFk, 'idUserFk':service.tb_user_license_array[key].idUserFk,'fullName':service.tb_user_license_array[key].fullName, 'idDepartmentFk':service.tb_user_license_array[key].idDepartmentFk,'idDepartmentList': $scope.list_user_licence_idDepartmentList, 'idParticularAddressFk':service.tb_user_license_array[key].idParticularAddressFk, 'email':service.tb_user_license_array[key].email, 'phone':service.tb_user_license_array[key].phone, 'keyword':service.tb_user_license_array[key].keyword, 'idOS':service.tb_user_license_array[key].idOS, 'profileUser':service.tb_user_license_array[key].profileUser, 'userNumbPasswd':service.tb_user_license_array[key].numberUserPassword, 'nameProfile':service.tb_user_license_array[key].nameProfile});
                                            //console.log($scope.list_user_licence_tmp);
                                            $scope.processUserLicenceFn($scope.list_user_licence_tmp[key], 'edit');
                                        }
                                        console.log($scope.service.update);
                                        $('#updateAppMonitorService').modal({backdrop: 'static', keyboard: false});
                                    }, 500);
                                    blockUI.stop();
                                break;
                            }
                        break;
                        case "update":
                            obj=service;
                            switch(service.idTipeServiceFk){
                                case "1": //UPDATE CONTROL ACCESS
                                    $timeout(function() {
                                        $scope.service.update.idContracAssociated_SE   = service.idContratoFk;
                                        $scope.service.update.idAccessControlFk        = $scope.service.crtlAccess.selected.idProduct;
                                        $scope.service.update.lock                     = $scope.service.lockedIt.selected.idProduct;
                                        $scope.service.update.lock2                    = $scope.service.lockedIt2.selected!=undefined?$scope.service.lockedIt2.selected.idProduct:null;
                                        $scope.service.update.idInputReaderFk          = $scope.service.entranceReader.selected.idProduct;
                                        $scope.service.update.ouputReader              = service.isOuputButom==undefined || !service.isOuputButom?$scope.service.exitReader.selected.idProduct:null;
                                        $scope.service.update.ouputButom               = service.isOuputButom?$scope.service.exitReader.selected.idProduct:null;
                                        $scope.service.update.idFontFk                 = $scope.service.powerSupply.selected.idProduct;
                                        $scope.service.update.idEmergencyButtonFk      = $scope.service.emergencyButton.selected.idProduct;
                                        $scope.service.update.idShutdownKeyFk          = $scope.service.TurnOffKey.selected.idProduct;
                                        $scope.service.update.isOuputReader            = service.isOuputButom?null:'1';
                                        $scope.service.update.isOuputButom             = service.isOuputButom?'1':null;
                                        var rawDate                      = moment(service.dateUp).toDate();
                                        $scope.service.update.dateUp     = moment(rawDate).format('YYYY-MM-DD');
                                        console.log("list_batteries: ");
                                        console.log($scope.list_batteries);
                                        console.log("list_open_devices: ");
                                        console.log($scope.list_open_devices);
                                        $scope.service.update.battery_install=[];
                                        $scope.service.update.battery_install=$scope.list_batteries;
                                        $scope.service.update.adicional=[];
                                        $scope.service.update.adicional=$scope.list_productsDetails;
                                        $scope.service.update.open_devices=[];
                                        $scope.service.update.open_devices=$scope.list_open_devices;
                                        blockUI.message('Guardando Servicio '+service.clientTypeServices);
                                    }, 1500);
                                    $timeout(function() {
                                        console.log($scope.service.update);
                                        $scope.updateCustomerServiceFn($scope.service.update);
                                    }, 1500);
                                    $('#updateCtrlAccessService').modal('hide');
                                    blockUI.stop();
                                break;
                                case "2": //UPDATE INTERNET
                                    $timeout(function() {
                                        var productIdNumber=0;
                                        blockUI.message('Guardando Servicio '+service.clientTypeServices);
                                        service.idContracAssociated_SE   = service.idContratoFk;
                                        service.idRouterInternetFk       = service.idTypeInternetFk<="2"?$scope.service.router.selected.idProduct:null;
                                        service.idModemInternetFk        = $scope.service.modem.selected.idProduct;
                                        service.macAddress               = service.idTypeInternetFk<="2"?service.macAddress:null;
                                        service.port                     = service.idTypeInternetFk<="2"?service.port:null;
                                        service.userWifi                 = service.idTypeInternetFk<="2"?service.userWifi:null;
                                        service.passWifi                 = service.idTypeInternetFk<="2"?service.passWifi:null;
                                        service.userAdmin                = service.idTypeInternetFk<="2"?service.userAdmin:null;
                                        service.passAdmin                = service.idTypeInternetFk<="2"?service.passAdmin:null;
                                        service.numberLine               = service.idTypeInternetFk<="2"?null:service.numberLine;
                                        service.numberChip               = service.idTypeInternetFk<="2"?null:service.numberChip;
                                        service.adicional=[];
                                        var rawDate                      = moment(service.dateUp).toDate();
                                        service.dateUp                   = moment(rawDate).format('YYYY-MM-DD');
                                        service.adicional                = $scope.list_productsDetails;
                                        blockUI.message('Guardando Servicio '+service.clientTypeServices);
                                        }, 1500);
                                        $timeout(function() {
                                            console.log(service);
                                            $scope.updateCustomerServiceFn(service);
                                        }, 1500);
                                        $('#updateInternetService').modal('hide');
                                    blockUI.stop();
                                break;
                                case "3": //UPDATE TOTEM
                                    $timeout(function() {
                                        service.idDvr_nvrFk           = $scope.service.dvr.selected.idProduct;
                                        service.backup_energy         = [];
                                        service.backup_energy         = $scope.list_batteries;
                                        service.cameras               = [];
                                        service.cameras               = $scope.list_cameras;
                                        service.maxCamera             = $scope.service.maxCamera;
                                        service.clients               = [];
                                        service.clients               = $scope.list_user;
                                        if (service.isHasInternetConnect==undefined || !service.isHasInternetConnect){
                                            service.numberPortRouter    = null;
                                            service.portHttpInter       = null;
                                            service.numberPortInter     = null;
                                            service.addressClientInter  = null;
                                            service.addreesVpn          = null;
                                            service.namePort            = null;
                                            service.port                = null;
                                            service.namePort1           = null;
                                            service.nroPort1            = null;
                                            service.namePort2           = null;
                                            service.nroPort2            = null;
                                        }else{
                                            service.namePortInter       = service.namePort;
                                            service.numberPortInter     = service.port;
                                            service.numberPort1         = service.nroPort1;
                                            service.numberPort2         = service.nroPort2;
                                        }
                                        var productIdNumber=0;

                                        for (var item in $scope.list_productsDetails){productIdNumber=($scope.list_productsDetails[item].idProductDetail+1);}
                                        for (var key in $scope.list_batteries){
                                            if ($scope.list_batteries[key].isNew==1){
                                            $scope.list_productsDetails.push({'idProductDetail':productIdNumber,'idProductoFk':$scope.list_batteries[key].idBatteryFk, 'numberSerieFabric':$scope.list_batteries[key].numberSerieFabric, 'numberSerieInternal':$scope.list_batteries[key].numberSerieInternal,'dateExpiration':$scope.list_batteries[key].dateExpiration, 'optAux':null});
                                            productIdNumber++;
                                            }
                                        }
                                        service.adicional=[];
                                        service.adicional=$scope.list_productsDetails;
                                        var rawDate                = moment(service.dateUp).toDate();
                                        service.dateUp             = moment(rawDate).format('YYYY-MM-DD');
                                        blockUI.message('Guardando Servicio '+service.clientTypeServices);
                                    }, 1500);
                                    $timeout(function() {
                                        console.log(service);
                                        $scope.updateCustomerServiceFn(service);
                                    }, 1500);
                                    $('#updateTotemService').modal('hide');
                                    blockUI.stop();
                                break;
                                case "4": //UPDATE CAMERAS
                                    $timeout(function() {
                                        service.idDvr_nvrFk           = $scope.service.dvr.selected.idProduct;
                                        service.backup_energy         = [];
                                        service.backup_energy         = $scope.list_batteries;
                                        service.cameras               = [];
                                        service.cameras               = $scope.list_cameras;
                                        service.maxCamera             = $scope.service.maxCamera;
                                        service.clients               = [];
                                        service.clients               = $scope.list_user;
                                        if (service.isHasInternetConnect==undefined || !service.isHasInternetConnect){
                                            service.numberPortRouter    = null;
                                            service.portHttpInter       = null;
                                            service.numberPortInter     = null;
                                            service.addressClientInter  = null;
                                            service.addreesVpn          = null;
                                            service.namePort            = null;
                                            service.port                = null;
                                            service.namePort1           = null;
                                            service.nroPort1            = null;
                                            service.namePort2           = null;
                                            service.nroPort2            = null;
                                        }else{
                                            service.namePortInter       = service.namePort;
                                            service.numberPortInter     = service.port;
                                            service.numberPort1         = service.nroPort1;
                                            service.numberPort2         = service.nroPort2;
                                        }
                                        var productIdNumber=0;

                                        for (var item in $scope.list_productsDetails){productIdNumber=($scope.list_productsDetails[item].idProductDetail+1);}
                                        for (var key in $scope.list_batteries){
                                            if ($scope.list_batteries[key].isNew==1){
                                            $scope.list_productsDetails.push({'idProductDetail':productIdNumber,'idProductoFk':$scope.list_batteries[key].idBatteryFk, 'numberSerieFabric':$scope.list_batteries[key].numberSerieFabric, 'numberSerieInternal':$scope.list_batteries[key].numberSerieInternal,'dateExpiration':$scope.list_batteries[key].dateExpiration, 'optAux':null});
                                            productIdNumber++;
                                            }
                                        }
                                        service.adicional=[];
                                        service.adicional=$scope.list_productsDetails;
                                        var rawDate                = moment(service.dateUp).toDate();
                                        service.dateUp             = moment(rawDate).format('YYYY-MM-DD');
                                        blockUI.message('Guardando Servicio '+service.clientTypeServices);
                                    }, 1500);
                                    $timeout(function() {
                                        console.log(service);
                                        $scope.updateCustomerServiceFn(service);
                                    }, 1500);
                                    $('#updateCamerasService').modal('hide');
                                    blockUI.stop();
                                break;
                                case "5": //UPDATE ALARM
                                    $scope.baterias_instaladas=[];
                                    $timeout(function() {
                                        service.tipo_conexion_remoto       = $scope.tipo_conexion_remoto;
                                        service.adicional_alarmar          = $scope.aditional_alarm;
                                        service.sensores_de_alarmas        = $scope.list_sensors;
                                        service.idContracAssociatedFk      = service.idContratoFk;
                                        service.companyMonitor             = service.idCompanyMonitorFK;
                                        service.numberPay                  = service.numberCustomer;
                                        service.panelAlarm                 = $scope.service.alarmPanel.selected.idProduct;
                                        service.keyboardAlarm              = $scope.service.alarmKeyboard.selected.idProduct;
                                        service.countZoneIntaled           = $scope.service.zonesQttyInstalled;
                                        service.idTypeConectionRemote      = service.idTipoConexionRemoto;
                                        var productIdNumber=0;
                                        for (var key in $scope.list_batteries){
                                        $scope.baterias_instaladas.push({'idProductoFk':$scope.list_batteries[key].idBatteryFk, 'nroFabric':$scope.list_batteries[key].numberSerieFabric, 'nroInternal':$scope.list_batteries[key].numberSerieInternal,'dateExpired':$scope.list_batteries[key].dateExpiration, 'isControlSchedule':$scope.list_batteries[key].isControlSchedule});
                                        }
                                        service.baterias_instaladas        = $scope.baterias_instaladas;
                                        service.adicional                  = $scope.list_productsDetails;
                                        var rawDate                        = moment(service.dateUp).toDate();
                                        service.dateUp                     = moment(rawDate).format('YYYY-MM-DD');
                                        blockUI.message('Guardando Servicio '+service.serviceName);
                                    }, 1500);
                                    $timeout(function() {
                                        console.log(service);
                                        $scope.updateCustomerServiceFn(service);
                                    }, 1500);
                                        $('#updateAlarmService').modal('hide');
                                    blockUI.stop();
                                break;
                                case "6": //UPDATE APP MONITOR
                                    $scope.updateService = {};
                                    $timeout(function() {
                                        $scope.updateService.name                       = $scope.service.update.name
                                        $scope.updateService.idContracAssociated_SE     = obj.idContracAssociated_SE
                                        $scope.updateService.dateDown                   = $scope.service.update.dateDown;
                                        $scope.updateService.idTypeMaintenanceFk        = $scope.service.update.idTypeMaintenanceFk;
                                        $scope.updateService.idCompanyMonitorFK         = $scope.service.update.idCompanyMonitorFK;
                                        $scope.updateService.sucribeNumber              = $scope.service.update.sucribeNumber;
                                        $scope.updateService.idApplicationFk            = $scope.service.idApplicationFk;
                                        $scope.updateService.passwordApp                = $scope.service.passwordApp!=undefined && $scope.service.passwordApp!=null && $scope.service.idApplicationFk=="1"?$scope.service.passwordApp:null;
                                        $scope.updateService.countNewLicense            = $scope.service.numbOfLicenceSet;
                                        $scope.updateService.observation                = $scope.service.update.observation;
                                        $scope.updateService.licenses                   = [];
                                        $scope.updateService.licenses                   = $scope.list_user_licence;
                                        $scope.updateService.adicional                  = {};
                                        $scope.updateService.idClientTypeServices       = obj.idClientTypeServices;
                                        $scope.updateService.idClientServicesSmartPanic = obj.idClientServicesSmartPanic;
                                        $scope.updateService.idClientFk                 = obj.idClientFk;
                                        $scope.updateService.idContratoFk               = obj.idContratoFk;
                                        $scope.updateService.idServicesFk               = obj.idServicesFk;
                                        $scope.updateService.idTipeServiceFk            = obj.idTipeServiceFk;
                                        $scope.updateService.clientTypeServices         = obj.clientTypeServices;
                                        var rawDate                                 = moment($scope.service.update.dateUp).toDate();
                                        var dateUpTmp                               = moment(rawDate).format('YYYY-MM-DD');
                                        $scope.updateService.dateUp                 = dateUpTmp;
                                        blockUI.message('Guardando Servicio '+obj.clientTypeServices);
                                    }, 1500);
                                    $timeout(function() {
                                        console.log($scope.updateService);
                                        $scope.updateCustomerServiceFn($scope.updateService);
                                    }, 1500);
                                    $('#updateAppMonitorService').modal('hide');
                                    blockUI.stop();
                                break;
                            }
                        break;
                        case "userLicense":
                            $scope.isCollapsed                        = true;
                            $scope.service.list=service;
                            $timeout(function() {
                                    $scope.service.idClientTypeFk             = $scope.customerFound.idClientTypeFk;
                                    $scope.service.idApplicationFk            = service.idApplicationFk;
                                    $scope.service.numbOfNewLicence           = parseInt(service.countNewLicense);
                                    $scope.changeLicencesFn("set");
                                    if ($scope.service.idClientTypeFk=="2"){
                                        $scope.getBuildingsDeptosFn($scope.service.list.idClientFk);
                                    }else if ($scope.service.idClientTypeFk=="5"){
                                        $scope.service.list.list_address_particular=$scope.customerFound.list_address_particular;
                                        //$scope.service.idContracAssociated_SE=
                                    }
                                    $scope.list_user_licence_tmp=[];
                                    $scope.list_user_licence_idDepartmentList={'idDepto':'', 'Depto':'', 'idBuilding':'', 'Building':''};
                                    for (var key in service.tb_user_license_array){
                                        $scope.list_user_licence_idDepartmentList.idDepto     = service.tb_user_license_array[key].idDepto;
                                        $scope.list_user_licence_idDepartmentList.Depto       = service.tb_user_license_array[key].Depto;
                                        $scope.list_user_licence_idDepartmentList.idBuilding  = service.tb_user_license_array[key].idBuilding;
                                        $scope.list_user_licence_idDepartmentList.Building    = service.tb_user_license_array[key].Building;
                                        $scope.list_user_licence_tmp.push({'idDetinationOfLicenseFk':service.tb_user_license_array[key].idDetinationOfLicenseFk, 'idUserFk':service.tb_user_license_array[key].idUserFk,'fullName':service.tb_user_license_array[key].fullName, 'idDepartmentFk':service.tb_user_license_array[key].idDepartmentFk,'idDepartmentList': $scope.list_user_licence_idDepartmentList, 'idParticularAddressFk':service.tb_user_license_array[key].idParticularAddressFk, 'email':service.tb_user_license_array[key].email, 'phone':service.tb_user_license_array[key].phone, 'keyword':service.tb_user_license_array[key].keyword, 'idOS':service.tb_user_license_array[key].idOS, 'profileUser':service.tb_user_license_array[key].profileUser, 'userNumbPasswd':service.tb_user_license_array[key].numberUserPassword, 'nameProfile':service.tb_user_license_array[key].nameProfile});
                                        //console.log($scope.list_user_licence_tmp);
                                        $scope.processUserLicenceFn($scope.list_user_licence_tmp[key], 'edit');
                                    }
                            }, 500);
                            console.log($scope.service.list);
                            blockUI.stop();
                            $('#serviceUserLicenseList').modal({backdrop: 'static', keyboard: false});
                        break;
                        case "userDVR":
                            $scope.service.list=service;
                            $timeout(function() {
                                    $scope.service.idClientTypeFk = $scope.customerFound.idClientTypeFk;
                                    //LOAD DVR USERS
                                    $scope.list_user=[];
                                    $scope.list_user_tmp=service.idTipeServiceFk=="3"?service.tb_client_totem_array:service.tb_client_camera_array;
                                    var idListItem = 1;
                                    for (var dvrUser in $scope.list_user_tmp){
                                        $scope.list_user.push({'idItem':idListItem,'idClientFk':$scope.list_user_tmp[dvrUser].idClientFk,'name':$scope.list_user_tmp[dvrUser].name, 'user':$scope.list_user_tmp[dvrUser].user, 'pass':$scope.list_user_tmp[dvrUser].pass, 'profile':$scope.list_user_tmp[dvrUser].userProfile, 'userProfile':$scope.list_user_tmp[dvrUser].userProfile, 'qrCode':$scope.list_user_tmp[dvrUser].qrBase64, 'qrBase64':$scope.list_user_tmp[dvrUser].qrBase64});
                                        idListItem++;
                                    }
                            }, 500);
                            console.log($scope.service.list);
                            blockUI.stop();
                            $('#serviceUsersDVRList').modal({backdrop: 'static', keyboard: false});
                        break;
                        case "listCameras":
                            $scope.service.update=service;
                            $timeout(function() {
                                $scope.service.maxCamera                   = service.maxCamera;
                                $scope.service.cameraList = service.tb_cameras_totem_array==undefined?service.tb_cameras_array:service.tb_cameras_totem_array;
                                //LOAD CAMERAS
                                for (var camera in $scope.service.cameraList){
                                for (var prduct in $scope.rsProductsData){
                                    if ($scope.rsProductsData[prduct].idProduct==$scope.service.cameraList[camera].idProductFk){
                                    $scope.list_cameras.push({'idProductFk':$scope.service.cameraList[camera].idProductFk, 'idCameraFk':$scope.service.cameraList[camera].idProductFk,'portCamera':parseInt($scope.service.cameraList[camera].portCamera), 'coveredArea':$scope.service.cameraList[camera].coveredArea, 'locationCamera': $scope.service.cameraList[camera].locationCamera, 'descriptionProduct':$scope.rsProductsData[prduct].descriptionProduct, 'model':$scope.rsProductsData[prduct].model, 'brand': $scope.rsProductsData[prduct].brand,'isNumberSerieInternal':$scope.rsProductsData[prduct].isNumberSerieInternal,'isNumberSerieFabric':$scope.rsProductsData[prduct].isNumberSerieFabric,'isDateExpiration':$scope.rsProductsData[prduct].isDateExpiration, 'numberSerieFabric':$scope.service.cameraList[camera].nroFabricCamera, 'numberSerieInternal':$scope.service.cameraList[camera].nroSerieCamera,'dateExpiration':$scope.service.cameraList[camera].dateExpireCamera, 'idProductClassification':$scope.rsProductsData[prduct].idProductClassification, 'classification': $scope.rsProductsData[prduct].classification, 'nroSerieCamera':$scope.service.cameraList[camera].nroSerieCamera,'nroFabricCamera':$scope.service.cameraList[camera].nroFabricCamera,'dateExpireCamera':$scope.service.cameraList[camera].dateExpireCamera, 'isNew':0});
                                    break;
                                    }
                                }
                                }
                            }, 500);
                            console.log($scope.service.update);
                            blockUI.stop();
                            $('#serviceCamerasList').modal({backdrop: 'static', keyboard: false});
                        break;
                        case "init_terminateService":
                            $scope.rsTicketData           = [];
                            $scope.rsServiceData          = [];
                            $scope.rsInternetServiceData  = [];
                            $scope.rsKeysData             = [];
                            $scope.service.update=service;
                            switch ($scope.service.update.nameDataBase){
                                case "tb_client_services_access_control":
                                    blockUI.message('Verificando si existen Pedidos Activos Asociados.');
                                    $timeout(function() {
                                        $scope.checkTicketsActiveByServiceFn($scope.service.update);
                                    }, 1500);
                                    blockUI.message('Verificando si servicio se encuentra asociado a otro.');
                                    $timeout(function() {
                                        $scope.checkServicesAssociatedByServiceFn($scope.service.update);
                                    }, 3000);
                                    blockUI.message('Verificando si existen Llaveros Asociados.');
                                    $timeout(function() {
                                        $scope.checkKeysAssigned2DepartmentByServiceFn($scope.service.update);
                                    }, 4500);
                                break;
                                case "tb_client_services_internet":
                                    blockUI.message('Verificando si posee servicios asociados.');
                                    $timeout(function() {
                                        $scope.checkInternetServicesAssociatedByServiceFn($scope.service.update);
                                    }, 3000);
                                break;
                                case "tb_client_services_totem":
                                case "tb_client_services_camera":
                                case "tb_client_services_alarms":
                                case "tb_client_services_smart_panic":
                                    blockUI.message('Verificando si servicio se encuentra asociado a otro.');
                                    $timeout(function() {
                                        $scope.checkServicesAssociatedByServiceFn($scope.service.update);
                                    }, 3000);
                                break;
                            }
                            $timeout(function() {
                                blockUI.stop();
                                $('#serviceDownDetails').modal({backdrop: 'static', keyboard: false});
                                console.log($scope.service.update);
                            }, 5000);

                            //$('#serviceCamerasList').modal({backdrop: 'static', keyboard: false});
                        break;
                        case "init_terminateContract":
                            $scope.rsTicketData           = [];
                            $scope.rsServiceData          = [];
                            $scope.rsInternetServiceData  = [];
                            $scope.rsKeysData             = [];
                            blockUI.message('Obteniendo servicios asociados al contrato.');
                            $scope.getListContractServicesFn(service.idContrato, null);
                            $timeout(function() {
                                console.log($scope.rsServicesListByContractsIdData);
                            }, 2000);
                            $timeout(function() {
                                console.log($scope.rsServicesListByContractsIdData);
                                if ($scope.rsServicesListByContractsIdData.length>=1){
                                    $scope.rsTicketDataTmp  = [];
                                    $scope.rsServiceDataTmp = [];
                                    $scope.rsInternetServiceDataTmp = 0;
                                    $scope.rsKeysDataTmp    = [];
                                    var assignedServices = [];
                                    angular.forEach($scope.rsServicesListByContractsIdData,function(serv){
                                        var deferredService = $q.defer();
                                        assignedServices.push(deferredService.promise);
                                        $timeout(function() {
                                            deferredService.resolve();
                                            switch (serv.nameDataBase){
                                                case "tb_client_services_access_control":
                                                    blockUI.message('Verificando si existen Pedidos Activos Asociados.');
                                                    serviceServices.checkTicketsActiveByService(serv.idServicesFk).then(function(response_ticket){
                                                        if(response_ticket.status==200){
                                                            $scope.rsTicketDataTmp=$scope.rsTicketDataTmp.concat(response_ticket.data.ticket_active);
                                                        }else if (response_ticket.status==404){
                                                            //$scope.rsTicketDataTmp = [];
                                                        }else if (response_ticket.status==500){
                                                            //$scope.rsTicketDataTmp = [];
                                                        }
                                                    });
                                                    //blockUI.message('Verificando si servicio se encuentra asociado a otro.');
                                                    //serviceServices.checkServicesAssociatedByService(serv.idServicesFk).then(function(response_service){
                                                    //    if(response_service.status==200){
                                                    //        $scope.rsServiceDataTmp=$scope.rsServiceDataTmp.concat(response_service.data.service_associated);
                                                    //    }else if (response_service.status==404){
                                                    //        //$scope.rsTicketDataTmp = [];
                                                    //    }else if (response_service.status==500){
                                                    //        //$scope.rsTicketDataTmp = [];
                                                    //    }
                                                    //});
                                                    blockUI.message('Verificando si existen Llaveros Asociados.');
                                                    KeysServices.checkKeysAssigned2DepartmentByService(serv.idServicesFk).then(function(response_keys){
                                                        if(response_keys.status==200){
                                                            $scope.rsKeysDataTmp=$scope.rsKeysDataTmp.concat(response_keys.data.keys_assigned);
                                                        }else if (response_keys.status==404){
                                                            //$scope.rsTicketDataTmp = [];
                                                        }else if (response_keys.status==500){
                                                            //$scope.rsTicketDataTmp = [];
                                                        }
                                                    });
                                                break;
                                                case "tb_client_services_internet":
                                                    blockUI.message('Verificando si posee servicios asociados.');
                                                    serviceServices.checkInternetServicesAssociatedByService(serv.idClientServicesFk).then(function(response_internet){
                                                        if(response_internet.status==200){
                                                            $scope.rsInternetServiceDataTmp=Number($scope.rsInternetServiceDataTmp) + Number(response_internet.data.service_associated);
                                                        }else if (response_internet.status==404){
                                                            //$scope.rsTicketDataTmp = [];
                                                        }else if (response_internet.status==500){
                                                            //$scope.rsTicketDataTmp = [];
                                                        }
                                                    });
                                                break;
                                                case "tb_client_services_totem":
                                                case "tb_client_services_camera":
                                                case "tb_client_services_alarms":
                                                case "tb_client_services_smart_panic":
                                                    //blockUI.message('Verificando si servicio se encuentra asociado a otro.');
                                                    //serviceServices.checkServicesAssociatedByService(serv.idServicesFk).then(function(response_service_2){
                                                    //    if(response_service_2.status==200){
                                                    //        $scope.rsServiceDataTmp=(($scope.rsServiceDataTmp+response_service_2.data.service_associated));
                                                    //    }else if (response_service_2.status==404){
                                                    //        //$scope.rsTicketDataTmp = [];
                                                    //    }else if (response_service_2.status==500){
                                                    //        //$scope.rsTicketDataTmp = [];
                                                    //    }
                                                    //});
                                                break;
                                            }
                                        }, 1000);
                                    });

                                    $q.all(assignedServices).then(function () {
                                        $timeout(function() {
                                            blockUI.stop();
                                            $scope.rsTicketData           = $scope.rsTicketDataTmp;
                                            $scope.rsServiceData          = $scope.rsServiceDataTmp;
                                            $scope.rsInternetServiceData  = $scope.rsInternetServiceDataTmp;
                                            $scope.rsKeysData             = $scope.rsKeysDataTmp;
                                            console.log("$scope.rsTicketData : ");
                                            console.log($scope.rsTicketData);
                                            console.log("$scope.rsServiceData: ");
                                            console.log($scope.rsServiceData);
                                            console.log("$scope.rsInternetServiceData: ");
                                            console.log($scope.rsInternetServiceData);
                                            console.log("$scope.rsKeysData   : ");
                                            console.log($scope.rsKeysData);
                                            $('#contractDownDetails').modal({backdrop: 'static', keyboard: false});
                                        }, 1500);
                                    });
                                }else{
                                    blockUI.message('El Contrato no tiene servicio asociados activos.');
                                    inform.add('El Contrato no tiene servicio asociados activos. ',{
                                        ttl:2000, type: 'success'
                                    });
                                    $timeout(function() {
                                        $scope.switchCustomersFn('contract', service, 'requiredInputForContractTermination');
                                        blockUI.stop();
                                    }, 3000);
                                }
                            }, 2500);
                        break;
                        case "removeContractAndServicesMulti":
                            blockUI.start('Dando de baja los servicios asociados al contrato.');
                            $timeout(function() {
                                console.log($scope.rsServicesListByContractsIdData);
                                if ($scope.rsServicesListByContractsIdData.length>=1){
                                    console.log($scope.rsServicesListByContractsIdData);
                                    $scope.rsInternetServiceDataTmp = 0;
                                    var assignedServices = [];
                                    angular.forEach($scope.rsServicesListByContractsIdData,function(serv){
                                        var deferredService = $q.defer();
                                        assignedServices.push(deferredService.promise);
                                        $timeout(function() {
                                            deferredService.resolve();
                                            serv.terminationApprovedByIdUserKf = $scope.data_param.user.idUser;
                                            serv.idContratoFk                  = serv.idContracAssociated_SE;
                                            serv.terminationReason             = $scope.contractSelected.terminationReason;
                                            serv.reasonType                    = $scope.contractSelected.reasonType;
                                            serv.idContracAssociatedFk         = serv.idContracAssociated_SE;
                                            switch(serv.idClientTypeServices){
                                                case "1"://CONTROL ACCESS
                                                    serv.battery_install            = serv.tb_battery_install_access_control_array;
                                                    serv.adicional                  = serv.adicional;
                                                    serv.open_devices               = serv.tb_open_devices_access_control_array;
                                                break;
                                                case "2"://INTERNET
                                                    serv.adicional               = serv.adicional;
                                                break;
                                                case "3"://TOTEM
                                                    serv.isHasInternetConnect    = serv.numberPortRouter!=undefined && serv.portHttpInter!=undefined?true: false;
                                                    serv.backup_energy           = serv.tb_backup_energy_totem_array;
                                                    serv.cameras                 = serv.tb_cameras_totem_array;
                                                    serv.clients                 = serv.tb_client_totem_array;
                                                    serv.adicional               = serv.adicional;
                                                    if (serv.isHasInternetConnect==undefined || !serv.isHasInternetConnect){
                                                        serv.numberPortRouter    = serv.numberPortRouter;
                                                        serv.portHttpInter       = serv.portHttpInter;
                                                        serv.numberPortInter     = serv.numberPortInter;
                                                        serv.addressClientInter  = serv.addressClientInter;
                                                        serv.addreesVpn          = serv.addreesVpn;
                                                        serv.namePort            = serv.namePort;
                                                        serv.port                = serv.numberPortInter;
                                                        serv.namePort1           = serv.namePort1;
                                                        serv.nroPort1            = serv.nroPort1;
                                                        serv.namePort2           = serv.namePort2;
                                                        serv.nroPort2            = serv.nroPort2;
                                                    }else{
                                                        serv.namePort            = serv.namePort;
                                                        serv.port                = serv.numberPortInter;
                                                        serv.nroPort1            = serv.nroPort1;
                                                        serv.nroPort2            = serv.nroPort2;
                                                    }
                                                break;
                                                case "4"://CAMERAS
                                                    serv.isHasInternetConnect    = serv.numberPortRouter!=undefined && serv.portHttp!=undefined?true: false;
                                                    serv.backup_energy           = serv.tb_backup_energy_array;
                                                    serv.cameras                 = serv.tb_cameras_array;
                                                    serv.adicional               = serv.adicional;
                                                    serv.clients                 = serv.tb_client_camera_array;
                                                    if (serv.isHasInternetConnect==undefined || !serv.isHasInternetConnect){
                                                        serv.numberPortRouter    = serv.numberPortRouter;
                                                        serv.portHttpInter       = serv.portHttpInter;
                                                        serv.numberPortInter     = serv.numberPortInter;
                                                        serv.addressClientInter  = serv.addressClientInter;
                                                        serv.addreesVpn          = serv.addreesVpn;
                                                        serv.namePort            = serv.namePort;
                                                        serv.port                = serv.numberPortInter;
                                                        serv.namePort1           = serv.namePort1;
                                                        serv.nroPort1            = serv.nroPort1;
                                                        serv.namePort2           = serv.namePort2;
                                                        serv.nroPort2            = serv.nroPort2;
                                                    }else{
                                                        serv.namePortInter       = serv.namePort;
                                                        serv.numberPortInter     = serv.numberPortInter;
                                                        serv.numberPort1         = serv.nroPort1;
                                                        serv.numberPort2         = serv.nroPort2;
                                                    }
                                                break;
                                                case "5"://ALARM
                                                    serv.idTipoConexionRemoto       = serv.idTypeConectionRemote;
                                                    serv.tipo_conexion_remoto       = serv.tb_tipo_conexion_remoto_array;
                                                    serv.adicional_alarmar          = serv.tb_datos_adicionales_alarmas_array;
                                                    serv.adicional_alarmar[0].franja_horarias                           = serv.tb_datos_adicionales_alarmas_array[0].tb_franja_horaria_alarmas_array;
                                                    serv.adicional_alarmar[0].personas_para_dar_aviso                   = serv.tb_datos_adicionales_alarmas_array[0].tb_personas_para_dar_aviso_alarmas_array;
                                                    serv.adicional_alarmar[0].personas_para_verificar_en_el_lugar       = serv.tb_datos_adicionales_alarmas_array[0].tb_personas_para_verificar_en_lugar_array;
                                                    serv.sensores_de_alarmas        = serv.tb_sensors_alarm_array;
                                                    serv.baterias_instaladas        = serv.tb_alarm_batery_array;
                                                    serv.adicional                  = serv.adicional;
                                                    for (var alarm in serv.sensores_de_alarmas){
                                                        serv.sensores_de_alarmas[alarm].idSensor = serv.sensores_de_alarmas[alarm].idSensorsAlarm;
                                                    }
                                                break;
                                                case "6"://SMART PANIC
                                                    serv.licenses                   = serv.tb_user_license_array;
                                                    serv.passwordApp                = serv.passwdApp;
                                                break;
                                            }

                                            blockUI.message('Servicio dado de baja.');
                                            $timeout(function() {
                                                if (serv.dateDown==null || serv.dateDown==""){
                                                    serv.dateDown              = $scope.contractSelected.dateDown;
                                                    console.log(serv);
                                                    $scope.updateCustomerServiceFn(serv);
                                                }
                                                blockUI.stop();
                                            }, 1500);
                                        }, 1000);
                                    });

                                    $q.all(assignedServices).then(function () {
                                        $timeout(function() {
                                            $scope.contract.update.terminationApprovedByIdUserKf = $scope.data_param.user.idUser;
                                            $scope.contract.update.idStatusFk                    = "-1";
                                            $scope.contract.update.dateDown                      = $scope.contractSelected.dateDown;
                                            $scope.contract.update.terminationReason             = $scope.contractSelected.terminationReason;
                                            $scope.contract.update.reasonType                    = $scope.contractSelected.reasonType;
                                            blockUI.message('Contrato dado de baja.');
                                            console.log($scope.contract.update);
                                            console.log($scope.list_services_tmp);
                                            $scope.customerContractFn($scope.contract, 'update');
                                            $scope.inputTokenCode = "";
                                            blockUI.stop();
                                        }, 1500);
                                        $timeout(function() {
                                            $scope.setTokenCompletedFn($scope.token_param.token.tokenCode);
                                        }, 2000);
                                    });
                                }else{
                                    blockUI.start('El Contrato no tiene servicio asociados activos.');
                                    inform.add('El Contrato no tiene servicio asociados activos. ',{
                                        ttl:2000, type: 'success'
                                    });
                                    $timeout(function() {
                                        $scope.contract.update.terminationApprovedByIdUserKf = $scope.data_param.user.idUser;
                                        $scope.contract.update.idStatusFk                    = "-1";
                                        $scope.contract.update.dateDown                      = $scope.contractSelected.dateDown;
                                        $scope.contract.update.terminationReason             = $scope.contractSelected.terminationReason;
                                        blockUI.message('Contrato dado de baja.');
                                        console.log($scope.contract.update);
                                        console.log($scope.list_services_tmp);
                                        $scope.customerContractFn($scope.contract, 'update');
                                        $scope.inputTokenCode = "";
                                        blockUI.stop();
                                    }, 1500);
                                    $timeout(function() {
                                        $scope.setTokenCompletedFn($scope.token_param.token.tokenCode);
                                    }, 2000);
                                }
                            }, 2500);
                        break;
                        case "getUsersByLicense":
                            //$scope.service.sysUser.selected=undefined;
                            console.log(obj);
                        break;
                    }
                }
                /***********************************
                *   ADDING NEW CUSTOMER SERVICE    *
                ************************************/
                    $scope.addCustomerServiceFn = function(service){
                        serviceServices.addService(service).then(function(data){
                            $scope.rsJsonData = data;
                            //console.log($scope.rsJsonData);
                            if($scope.rsJsonData.status==200){
                                console.log("Customer Service Successfully Created");
                                inform.add('El Servicio del cliente ha sido creado con exito. ',{
                                    ttl:2000, type: 'success'
                                });
                                $scope.getListCustomersServicesFn(service.idClientFk, null);
                                $scope.getListContractServicesFn(service.idContratoFk, null);
                                $scope.getContractsByCustomerIdFn(service.idClientFk,'assign');
                            }else if($scope.rsJsonData.status==500){
                                console.log("Customer Service not Created, contact administrator");
                                inform.add('Error: [500] Contacta al area de soporte. ',{
                                    ttl:2000, type: 'danger'
                                });
                            }
                                //$scope.getContractsByCustomerIdFn(contrato.idClientFk);
                                //$scope.isNewCustomer=false;
                                //$scope.isUpdateCustomer=false;
                            //console.log($scope.rsLocations_API_Data);
                        });
                    };
                /***********************************
                *   UPDATING A CUSTOMER SERVICE    *
                ************************************/
                    $scope.updateCustomerServiceFn = function(service){
                        serviceServices.updateService(service).then(function(data){
                            $scope.rsJsonData = data;
                            //console.log($scope.rsJsonData);
                            if($scope.rsJsonData.status==200){
                                console.log("Customer Service Update Successfully");
                                inform.add('Servicio '+service.clientTypeServices+' del ha sido actualizado con exito. ',{
                                    ttl:2000, type: 'success'
                                });
                                $scope.getListCustomersServicesFn(service.idClientFk, null);
                                $scope.getListContractServicesFn(service.idContratoFk, null);
                                $scope.getContractsByCustomerIdFn(service.idClientFk,'assign');
                            }else if($scope.rsJsonData.status==500){
                                console.log("Customer Service not updated, contact administrator");
                                inform.add('Error: [500] Contacta al area de soporte. ',{
                                    ttl:2000, type: 'danger'
                                });
                            }
                                //$scope.getContractsByCustomerIdFn(contrato.idClientFk);
                                //$scope.isNewCustomer=false;
                                //$scope.isUpdateCustomer=false;
                            //console.log($scope.rsLocations_API_Data);
                        });
                        $scope.cleanServiceInputsFn();
                    };
                /***************************************
                *   CHECK TICKET ACTIVE BY SERVICE ID  *
                ****************************************/
                    $scope.rsTicketData = [];
                    $scope.checkTicketsActiveByServiceFn = function(service){
                        $scope.rsTicketData = []
                        serviceServices.checkTicketsActiveByService(service.idServicesFk).then(function(response){
                            console.log(response);
                            if(response.status==200){
                                console.log("The service is associated with Internet Service.");
                                inform.add('El Servicio Tickets activos asociados. ',{
                                    ttl:6000, type: 'warning'
                                });
                                $scope.rsTicketData = response.data.ticket_active;
                            }else if(response.status==404){
                                console.log("Service do not internet service related.");
                                inform.add('El Servicio no tiene tickets activos asociados. ',{
                                    ttl:6000, type: 'success'
                                });
                                $scope.rsTicketData = []
                            }else if(response.status==500){
                                console.log("Customer Service not Created, contact administrator");
                                inform.add('Error: [500] Contacta al area de soporte. ',{
                                    ttl:2000, type: 'danger'
                                });
                                $scope.rsTicketData = []
                            }
                                //$scope.getContractsByCustomerIdFn(contrato.idClientFk);
                                //$scope.isNewCustomer=false;
                                //$scope.isUpdateCustomer=false;
                            //console.log($scope.rsLocations_API_Data);
                        });
                    };
                /*****************************************
                *   CHECK KEYS ASSOCIATED BY SERVICE ID  *
                ******************************************/
                    $scope.checkKeysAssigned2DepartmentByServiceFn = function(service){
                        $scope.rsKeysData = [];
                        KeysServices.checkKeysAssigned2DepartmentByService(service.idServicesFk).then(function(response){
                            console.log(response);
                            if(response.status==200){
                                console.log("The service has one o more keys associated.");
                                inform.add('El Servicio posee llaveros asociados a departamentos del consorcio. ',{
                                    ttl:6000, type: 'warning'
                                });
                                $scope.rsKeysData = response.data.keys_assigned;
                            }else if(response.status==404){
                                console.log("Service do not have keys associated.");
                                inform.add('El Servicio no posee llaveros asociados en el edificio. ',{
                                    ttl:6000, type: 'success'
                                });
                                $scope.rsKeysData = [];
                            }else if(response.status==500){
                                console.log("Customer Service not Created, contact administrator");
                                inform.add('Error: [500] Contacta al area de soporte. ',{
                                    ttl:2000, type: 'danger'
                                });
                                $scope.rsKeysData = [];
                            }
                                //$scope.getContractsByCustomerIdFn(contrato.idClientFk);
                                //$scope.isNewCustomer=false;
                                //$scope.isUpdateCustomer=false;
                            //console.log($scope.rsLocations_API_Data);
                        });
                    };
                /**************************************************************
                *   CHECK Service Associated with other server BY SERVICE ID  *
                ***************************************************************/
                    $scope.checkServicesAssociatedByServiceFn = function(service){
                        $scope.rsServiceData = [];
                        serviceServices.checkServicesAssociatedByService(service.idClientServicesFk).then(function(response){
                            console.log(response);
                            if(response.status==200){
                                console.log("The service has one o more service active associated.");
                                inform.add('El Servicio posee servicios activos asociados. ',{
                                    ttl:6000, type: 'warning'
                                });
                                $scope.rsServiceData = response.data.service_associated;
                            }else if(response.status==404){
                                console.log("Service do not have service active associated.");
                                inform.add('El Servicio no posee servicios activos asociados. ',{
                                    ttl:6000, type: 'success'
                                });
                                $scope.rsServiceData = [];
                            }else if(response.status==500){
                                console.log("Customer Service not Created, contact administrator");
                                inform.add('Error: [500] Contacta al area de soporte. ',{
                                    ttl:2000, type: 'danger'
                                });
                                $scope.rsServiceData = [];
                            }
                                //$scope.getContractsByCustomerIdFn(contrato.idClientFk);
                                //$scope.isNewCustomer=false;
                                //$scope.isUpdateCustomer=false;
                            //console.log($scope.rsLocations_API_Data);
                        });
                    };
                /**************************************************************
                *   CHECK Service Associated with other server BY SERVICE ID  *
                ***************************************************************/
                    $scope.checkInternetServicesAssociatedByServiceFn = function(service){
                        $scope.rsServiceData = [];
                        serviceServices.checkInternetServicesAssociatedByService(service.idClientServicesFk).then(function(response){
                            console.log(response);
                            if(response.status==200){
                                console.log("The service has one o more service active associated.");
                                inform.add('El Servicio esta asociado a ('+response.data.service_associated+') servicios actualmente. ',{
                                    ttl:6000, type: 'warning'
                                });
                                $scope.rsServiceData = response.data.service_associated;
                            }else if(response.status==404){
                                console.log("Service do not have service active associated.");
                                inform.add('El Servicio no posee otros servicios activos asociados. ',{
                                    ttl:6000, type: 'success'
                                });
                                $scope.rsServiceData = [];
                            }else if(response.status==500){
                                console.log("Customer Service not Created, contact administrator");
                                inform.add('Error: [500] Contacta al area de soporte. ',{
                                    ttl:2000, type: 'danger'
                                });
                                $scope.rsServiceData = [];
                            }
                                //$scope.getContractsByCustomerIdFn(contrato.idClientFk);
                                //$scope.isNewCustomer=false;
                                //$scope.isUpdateCustomer=false;
                            //console.log($scope.rsLocations_API_Data);
                        });
                    };
            /**************************************************
            *            HIDE SELF INTERNETSERVICES           *
            *     USED IN CREATE & UPDATE INTERNET SERVICE    *
            **************************************************/
                $scope.filterAssociatedServices = function(item){
                    //alert($scope.select.idCompanyKf);
                    //console.log(item);
                    return item.idTipeServiceFk != '2';
                };
            /**************************************************
            *                                                 *
            *              GET CONTRACT SERVICES              *
            *                                                 *
            **************************************************/
                $scope.rsServicesListByContractsIdData=[];
                $scope.getListContractServicesFn=function(idContract, opt){
                    serviceServices.getServiceListByIdContract(idContract).then(function(data){
                        $scope.rsJsonData = data;
                        //console.log($scope.rsJsonData.data);
                        if($scope.rsJsonData.status==200){
                            $scope.rsServicesListByContractsIdData=$scope.rsJsonData.data;
                            if(opt=="assign"){$scope.customerFound.contratos=$scope.rsServicesListByContractsIdData;}
                        }else{
                            $scope.rsServicesListByContractsIdData=[];
                        }
                        //console.log($scope.rsServicesListByContractsIdData);
                    });
                }
                $scope.getListContractServices2Fn=function(contracts){
                    var rsJsonData = [];
                    for (var contract in contracts){
                        //console.log("Customer Service List by contract id: "+contracts[contract].idContrato)
                        serviceServices.getServiceListByIdContract(contracts[contract].idContrato).then(function(response){
                        //console.log(response.data);
                        if(response.status==200){
                            for (var item in response.data){
                                rsJsonData.push(response.data[item]);
                            }
                        }
                        });
                    }
                    return rsJsonData;
                }
            /**************************************************
            *                                                 *
            *       GET SELECTED SERVICE BY ID CONTRACT       *
            *                                                 *
            **************************************************/
                $scope.getSelectedServiceByIdContractFn=function(idContract, idTypeServices){
                    var arrSelectedService = [];
                    ContractServices.getSelectedServiceByIdContract(idContract, idTypeServices).then(function(response){
                        $scope.rsJsonData = response;
                        //console.log($scope.rsJsonData.data);
                        if($scope.rsJsonData.status==200){
                            for (var item in $scope.rsJsonData.data[0].services[0].service_items){
                                arrSelectedService.push($scope.rsJsonData.data[0].services[0].service_items[item]);
                            }
                        }else{
                            arrSelectedService=[];
                        }
                    });
                    return arrSelectedService;
                }
            /**************************************************
            *                                                 *
            *           GET CUSTOMER SERVICES LIST            *
            *                                                 *
            **************************************************/
                $scope.rsServicesListByCustomerIdData=[];
                $scope.getListCustomersServicesFn=function(idCustomer, opt){
                    $scope.rsServicesListByCustomerIdData=[];
                    serviceServices.getServiceListByIdCustomer(idCustomer).then(function(data){
                        $scope.rsJsonData = data;
                        //console.log($scope.rsJsonData);
                        if($scope.rsJsonData.status==200){
                            $scope.rsServicesListByCustomerIdData=$scope.rsJsonData.data;
                            if(opt=="assign"){$scope.customerFound.contratos=$scope.rsServicesListByCustomerIdData;}
                        }else{
                            $scope.rsServicesListByCustomerIdData=[];
                            if($scope.rsContractNotFound==false){
                                inform.add('No se existen servicios asociados al cliente. ',{
                                    ttl:2000, type: 'warning'
                                });
                            }
                        }
                        //console.log($scope.rsServicesListByCustomerIdData);

                    });

                };
            /**************************************************
            *                                                 *
            *        CHANGE BETWEEN CUSTOMER CONTRACT         *
            *                                                 *
            **************************************************/
                $scope.contrato=[];
                $scope.switchContractService = function(obj){
                    console.log(obj);
                    if (obj.idContratoFk!=undefined){
                        blockUI.start('Cambiando Contrato ');
                        $('#RegisterCtrlAccessService').modal('hide');
                        $('#RegisterInternetService').modal('hide');
                        $('#RegisterTotemService').modal('hide');
                        $('#RegisterCamerasService').modal('hide');
                        $('#RegisterAlarmService').modal('hide');
                        $('#RegisterAppMonitorService').modal('hide');
                        $timeout(function() {
                            $scope.switchCustomersFn('services', obj, 'start_new_service');
                            //$scope.getSelectedServiceByIdContractFn(obj.idContractFk, obj.idTipeServiceFk);
                        }, 1500);
                        blockUI.stop();
                    }else{
                        inform.add('Selecciona un contrato, para poder generar el servicio.',{
                        ttl:5000, type: 'warning'
                        });
                        $scope.service.new.MntType='';
                    }
                }
            /**************************************************
            *                                                 *
            *                GET TYPE OF CONTRACTS            *
            *                                                 *
            **************************************************/
                $scope.rsTypeOfContractsData = [];
                $scope.getTypeOfContractsFn = function(){
                    UtilitiesServices.typeOfContracts().then(function(response){
                        if(response.status==200){
                        $scope.rsTypeOfContractsData = response.data;
                        }
                    });
                };$scope.getTypeOfContractsFn();
            /**************************************************
            *                                                 *
            *           GET TYPE OF TypeMaintenance           *
            *                                                 *
            **************************************************/
                $scope.rsTypeOfMaintenanceData = [];
                $scope.getTypeOfMaintenanceFn = function(){
                    UtilitiesServices.typeOfMaintenance().then(function(response){
                        if(response.status==200){
                            $scope.rsTypeOfMaintenanceData = response.data;
                        }
                    });
                };$scope.getTypeOfMaintenanceFn();
            /**************************************************
            *                                                 *
            *             GET INTERNET COMPANIES              *
            *                                                 *
            **************************************************/
                $scope.rsInternetCompanyListData = [];
                $scope.getInternetCompanyListFn = function(){
                UtilitiesServices.internetCompanyList().then(function(response){
                    if(response.status==200){
                    $scope.rsInternetCompanyListData = response.data;
                    }
                });
                };$scope.getInternetCompanyListFn();
            /**************************************************
            *                                                 *
            *                GET INTERNET PLANS               *
            *                                                 *
            **************************************************/
                $scope.rsInternetPlanListData = [];
                $scope.getInternetPlanListFn = function(){
                UtilitiesServices.internetPlanList().then(function(response){
                    if(response.status==200){
                    $scope.rsInternetPlanListData = response.data;
                    }
                });
                }; $scope.getInternetPlanListFn();
            /**************************************************
            *                                                 *
            *                GET MONITOR COMPANIES            *
            *                                                 *
            **************************************************/
                $scope.rsMonitorCompanyListData = [];
                $scope.getMonitorCompanyListFn = function(){
                UtilitiesServices.monitorCompanyList().then(function(response){
                    if(response.status==200){
                    $scope.rsMonitorCompanyListData = response.data;
                    }
                });
                };$scope.getMonitorCompanyListFn()
            /**************************************************
            *                                                 *
            *           GET APP MONITOR APPLICATION           *
            *                                                 *
            **************************************************/
                $scope.rsAppMonitorApplicationListData = [];
                $scope.getAppMonitorApplicationListFn = function(){
                    UtilitiesServices.appMonitorApplicationList().then(function(response){
                        if(response.status==200){
                        $scope.rsAppMonitorApplicationListData = response.data;
                        }
                    });
                };$scope.getAppMonitorApplicationListFn();
            /**************************************************
            *                                                 *
            *                 GET TOTEM MODELS                *
            *                                                 *
            **************************************************/
                $scope.rsTotemModelListData = [];
                $scope.getTotemModelListFn = function(){
                    UtilitiesServices.totemModelList().then(function(response){
                        if(response.status==200){
                        $scope.rsTotemModelListData = response.data;
                        }
                    });
                };$scope.getTotemModelListFn();
            /**************************************************
            *                                                 *
            *              GET TYPE OF SERVICES               *
            *                                                 *
            **************************************************/
                $scope.rsServiceTypeData = {};
                $scope.getTypeOfServicesFn = function(){
                    serviceServices.getTypeOfServices().then(function(data){
                        $scope.rsServiceTypeData = data;
                    });
                };$scope.getTypeOfServicesFn();
            /**************************************************
            *                                                 *
            *            GET ACCESS CRTL DOOR LIST            *
            *                                                 *
            **************************************************/
                $scope.rsAccCrtlDoorListData = {};
                $scope.getAccessCtrlDoorListFn = function(){
                    serviceServices.accessCtrlDoors().then(function(data){
                        $scope.rsAccCrtlDoorListData = data;
                    });
                };$scope.getAccessCtrlDoorListFn();
                $scope.checkDoorType = function(obj){
                    console.info(obj);
                    if (obj=="7"){
                        for (var door in $scope.rsContractItemListData){
                        if ($scope.rsContractItemListData[door].idAccCrtlDoor == obj){
                            $scope.service.aclarationDoorOthers=$scope.rsContractItemListData[door].itemAclaracion;
                        }
                        }
                    }
                };
            /**************************************************
            *                                                 *
            *               Add Product Details               *
            *                                                 *
            **************************************************/
                $scope.productListType={
                    'CONTROL_DE_ACCESOS':null,
                    'CERRADURA':null,
                    'CERRADURA2':null,
                    'LECTOR_ENT':null,
                    'LECTOR_SAL':null,
                    'FUENTE':null,
                    'BATERIA':null,
                    'PULSADOR_EMERG':null,
                    'TECLA_APAG':null, 'DVR':null, 'NVR':null, 'UPS':null,
                    'CAMARA':null, 'PANEL_ALARM':null, 'TECLADO_ALARM':null,
                    'SENSOR_ALARM':null, 'MODULO_IP_ALARM':null,'MODULO_GPRS_ALARM':null, 'ROUTER':null, 'MODEM':null, 'DISP_APERTURA':null, 'PULSADOR_SALIDA':null, 'PRODUCT_EXIT': null, 'RECORD_DEVICE': null
                };
                $scope.productsList4Service=[]
                $scope.list_productsDetails=[];
                /***********************************
                *     ADD PRODUCT DETAIL SINGLE    *
                ************************************/
                    $scope.addProductDetailsFn = function(obj, optAux){
                        console.log(obj);
                        var numberSerieFabric   = obj.numberSerieFabric==undefined || obj.numberSerieFabric==null?null:obj.numberSerieFabric;
                        var numberSerieInternal = obj.numberSerieInternal==undefined || obj.numberSerieInternal==null?null:obj.numberSerieInternal;
                        var dateExpiration      = obj.dateExpiration==undefined || obj.dateExpiration==null?null:obj.dateExpiration;
                        var classification      = $scope.productSelected.classification!=undefined && $scope.productSelected.classification!=null && $scope.productSelected.classification!=""?$scope.productSelected.classification:'';
                        var tmpAux              = $scope.productSelected.idProductClassificationFk=="2" || $scope.productSelected.idProductClassificationFk=="3" || $scope.productSelected.idProductClassificationFk=="20"?optAux:null;
                        if ($scope.list_productsDetails.length==0){
                            var productIdNumber=0;
                        }else{
                            for (var item in $scope.list_productsDetails){productIdNumber=($scope.list_productsDetails[item].idProductDetail+1);}
                        }
                        if(!$scope.productDetailsAssigned){
                            $scope.list_productsDetails.push({'idProductDetail':productIdNumber,'idProductoFk':obj.idProductoFk, 'classification':classification, 'numberSerieFabric':numberSerieFabric, 'numberSerieInternal':numberSerieInternal,'dateExpiration':dateExpiration, 'optAux':tmpAux});
                            $("#serviceProductDetails").modal('hide');
                            inform.add("Datos adicionales del producto han sido asociados correctamente.",{
                            ttl:5000, type: 'success'
                            });
                        }
                            $scope.typeOfProductsFn("set", $scope.productSelected.idProductClassificationFk, productIdNumber, tmpAux);
                            //set serial numbers for conexion module in the Alarm Service
                            if ($scope.productSelected.idProductClassificationFk=="15" || $scope.productSelected.idProductClassificationFk=="16"){
                            for (var item in $scope.list_productsDetails){
                                if ((($scope.service.module.ipAlarmModule.selected!=undefined && $scope.service.module.ipAlarmModule.selected.idProduct==$scope.list_productsDetails[item].idProductoFk) || ($scope.service.module.gprsAlarmModule.selected!=undefined && $scope.service.module.gprsAlarmModule.selected.idProduct==$scope.list_productsDetails[item].idProductoFk)) && $scope.list_productsDetails[item].idProductDetail!=null){
                                    $scope.service.module.nroSerieInternal  = $scope.list_productsDetails[item].numberSerieFabric;
                                    $scope.service.module.nroSerieFrabric   = $scope.list_productsDetails[item].numberSerieInternal;
                                    break;
                                }
                            }
                            }
                            $scope.service.adicional={};
                            $scope.productSelected={};
                            console.log($scope.list_productsDetails);
                    }
                /***********************************
                *   REMOVE PRODUCT DETAIL SINGLE   *
                ************************************/
                    $scope.removeProductDetailsFn = function(obj, idProductDetail, optAux){
                        console.log("removeProductDetailsFn");
                        console.log(obj);
                        console.log($scope.list_productsDetails);
                        console.log(idProductDetail);
                        console.log(optAux);
                        $scope.productSelected  = obj;
                        var tmpAux=($scope.productSelected.idProductClassificationFk=="2" || $scope.productSelected.idProductClassification=="2") || ($scope.productSelected.idProductClassificationFk=="3" || $scope.productSelected.idProductClassification=="3") || ($scope.productSelected.idProductClassificationFk=="20" || $scope.productSelected.idProductClassification=="20")?optAux:null;
                        var objItem             = $scope.list_productsDetails;
                        var arrItem             = objItem.map(function(i){return i.idProductDetail;});
                        var indexItem           = arrItem.indexOf(idProductDetail);

                        $scope.list_productsDetails.splice(indexItem, 1);

                        $scope.typeOfProductsFn("remove", $scope.productSelected.idProductClassificationFk, null, tmpAux);
                        $scope.productDetailsAssigned=false;
                        if ($scope.productSelected.idProductClassification!="5"){
                            inform.add("Datos adicionales del producto han sido removidos correctamente.",{
                            ttl:5000, type: 'warning'
                            });
                        }
                        if ($scope.productSelected.idProductClassificationFk=="15" || $scope.productSelected.idProductClassificationFk=="16"){
                            $scope.service.module.nroSerieInternal  = "";
                            $scope.service.module.nroSerieFrabric    = "";
                        }
                        console.log($scope.list_productsDetails);
                    }
                /***********************************
                *    GET PRODUCT DETAIL SINGLE     *
                ************************************/
                    $scope.productSelected={};
                    $scope.productDetailsAssigned=false;
                    $scope.compServiceProductDetailsFn=function(obj, idProductDetail, optAux){
                        console.log(obj);
                        console.log($scope.list_productsDetails);
                        console.log("---------------------");
                        console.log($scope.productListType)
                        console.log("---------------------");
                        console.log("idProductDetail: "+idProductDetail);
                        console.log("optAux: "+optAux);
                        if ($scope.list_productsDetails.length>0){
                            console.log($scope.list_productsDetails);
                            for (var item in $scope.list_productsDetails){
                                if (obj.idProduct==$scope.list_productsDetails[item].idProductoFk && idProductDetail!=null && optAux==$scope.list_productsDetails[item].optAux){
                                    $scope.productSelected=obj;
                                    $scope.productSelected.classification         = $scope.list_productsDetails[item].classification;
                                    //console.log($scope.list_productsDetails[item]);
                                    $scope.service.adicional.idProductoFk         = $scope.list_productsDetails[item].idProductoFk;
                                    $scope.service.adicional.numberSerieFabric    = $scope.list_productsDetails[item].numberSerieFabric;
                                    $scope.service.adicional.numberSerieInternal  = $scope.list_productsDetails[item].numberSerieInternal;
                                    $scope.service.adicional.dateExpiration       = $scope.list_productsDetails[item].dateExpiration;
                                    $scope.productSelected.optAux                 = optAux;
                                    $scope.service.adicional.optAux               = optAux;
                                    $scope.productDetailsAssigned=true;
                                    //console.log($scope.list_productsDetails);
                                    break;
                                }else{
                                    $scope.productDetailsAssigned           = false;
                                    $scope.service.adicional                = {};
                                    $scope.productSelected                  = obj;
                                    $scope.productSelected.classification   = obj.classification;
                                    $scope.productSelected.optAux           = optAux;
                                    $scope.service.adicional                = {'idProductoFk':''};
                                    $scope.service.adicional.idProductoFk   = $scope.productSelected.idProduct;
                                    $scope.service.adicional.optAux         = optAux;
                                }
                            }
                        }else{
                            $scope.productSelected                  = obj;
                            $scope.productSelected.classification   = obj.classification;
                            $scope.service.adicional                = {'idProductoFk':''};
                            $scope.service.adicional.idProductoFk   = $scope.productSelected.idProduct;
                            $scope.service.adicional.optAux         = optAux;
                            $scope.productSelected.optAux           = optAux;
                        }
                        $("#serviceProductDetails").modal({backdrop: 'static', keyboard: false});
                        $('#serviceProductDetails').on('shown.bs.modal', function () {
                            $('#serviceProductInternalSerial').focus();
                            //console.log($scope.service.adicional);
                            //console.log($scope.productSelected);
                        });
                    }
                /***********************************
                *     TYPE OF PRODUCT FUNCTION     *
                ************************************/
                    $scope.typeOfProductsFn = function(opt, idType, idProd, optAux){
                    console.log("opt: '"+opt+"' idType: "+idType+" idProd: "+idProd+" optAux: "+optAux);
                        switch(idType){
                            case "1":
                                if (opt=="set"){
                                    $scope.productListType.CONTROL_DE_ACCESOS=idProd;
                                //console.log("set: "+idProd+" to $scope.productListType.CONTROL_DE_ACCESOS: "+idProd);
                                }else{
                                    $scope.productListType.CONTROL_DE_ACCESOS=idProd;
                                    $scope.service.crtlAccess.selected=undefined;
                                }

                            break;
                            case "2":
                                if (opt=="set"){
                                    if (optAux=="lockedIt2"){
                                        //onsole.log("set: "+idProd+" to $scope.productListType.CERRADURA2: "+idProd);
                                        $scope.productListType.CERRADURA2=idProd;
                                    }else{
                                        //console.log("set: "+idProd+" to $scope.productListType.CERRADURA: "+idProd);
                                        $scope.productListType.CERRADURA=idProd;
                                    }
                                }else{
                                    if (optAux=="lockedIt2"){
                                        //console.log("remove: "+idProd+" to $scope.productListType.CERRADURA2: "+idProd);
                                        $scope.productListType.CERRADURA2=idProd;
                                        $scope.service.lockedIt2.selected=undefined;
                                    }else{
                                        //console.log("set: "+idProd+" to $scope.productListType.CERRADURA: "+idProd);
                                        $scope.productListType.CERRADURA=idProd;
                                        $scope.service.lockedIt.selected=undefined;
                                    }
                                }
                            break;
                            case "3":
                                if (opt=="set"){
                                    if (optAux=="entrance"){
                                        //onsole.log("set: "+idProd+" to $scope.productListType.LECTOR_ENT: "+idProd);
                                        $scope.productListType.LECTOR_ENT=idProd;
                                    }else{
                                        //console.log("set: "+idProd+" to $scope.productListType.PRODUCT_EXIT: "+idProd);
                                        $scope.productListType.PRODUCT_EXIT=idProd;
                                    }
                                }else{
                                    if (optAux=="entrance"){
                                        //console.log("remove: "+idProd+" to $scope.productListType.LECTOR_ENT: "+idProd);
                                        $scope.productListType.LECTOR_ENT=idProd;
                                        $scope.service.entranceReader.selected=undefined;
                                    }else{
                                        //console.log("set: "+idProd+" to $scope.productListType.PRODUCT_EXIT: "+idProd);
                                        $scope.productListType.PRODUCT_EXIT=idProd;
                                        $scope.service.exitReader.selected=undefined;
                                    }
                                }
                            break;
                            case "4":
                                if (opt=="set"){
                                    $scope.productListType.FUENTE=idProd;
                                }else{
                                    $scope.productListType.FUENTE=idProd;
                                    $scope.service.powerSupply.selected=undefined;
                                }
                            break;
                            case "5":
                                $scope.productListType.BATERIA=idProd;
                            break;
                            case "6":
                                if (opt=="set"){
                                    $scope.productListType.PULSADOR_EMERG=idProd;
                                }else{
                                    $scope.productListType.PULSADOR_EMERG=idProd;
                                    $scope.service.emergencyButton.selected=undefined;
                                }
                            break;
                            case "7":
                                if (opt=="set"){
                                    $scope.productListType.TECLA_APAG=idProd;
                                }else{
                                    $scope.productListType.TECLA_APAG=idProd;
                                    $scope.service.TurnOffKey.selected=undefined;
                                }
                            break;
                            case "8":
                                if (opt=="set"){
                                    $scope.productListType.RECORD_DEVICE=idProd;
                                }else{
                                    $scope.productListType.RECORD_DEVICE=idProd;
                                    $scope.service.dvr.selected=undefined;
                                }
                            break;
                            case "9":
                                if (opt=="set"){
                                    $scope.productListType.RECORD_DEVICE=idProd;
                                }else{
                                    $scope.productListType.RECORD_DEVICE=idProd;
                                    $scope.service.dvr.selected=undefined;
                                }
                            break;
                            case "12":
                                if (opt=="set"){
                                    $scope.productListType.PANEL_ALARM=idProd;
                                }else{
                                    $scope.productListType.PANEL_ALARM=idProd;
                                    $scope.service.alarmPanel.selected=undefined;
                                }
                            break;
                            case "13":
                                if (opt=="set"){
                                    $scope.productListType.TECLADO_ALARM=idProd;
                                }else{
                                    $scope.productListType.TECLADO_ALARM=idProd;
                                    $scope.service.alarmKeyboard.selected=undefined;
                                }
                            break;
                            case "14":
                            break;
                            case "15":
                                if (opt=="set"){
                                    $scope.productListType.MODULO_IP_ALARM=idProd;
                                }else{
                                    $scope.productListType.MODULO_IP_ALARM=idProd;
                                    $scope.service.module.ipAlarmModule.selected=undefined;
                                }
                            break;
                            case "16":
                                if (opt=="set"){
                                    $scope.productListType.MODULO_GPRS_ALARM=idProd;
                                }else{
                                    $scope.productListType.MODULO_GPRS_ALARM=idProd;
                                    $scope.service.module.gprsAlarmModule.selected=undefined;
                                }
                            break;
                            case "17":
                                if (opt=="set"){
                                    $scope.productListType.ROUTER=idProd;
                                }else{
                                    $scope.productListType.ROUTER=idProd;
                                    $scope.service.dvr.selected=undefined;
                                    $scope.service.router.selected=undefined;
                                }
                            break;
                            case "18":
                                if (opt=="set"){
                                    $scope.productListType.MODEM=idProd;
                                }else{
                                    $scope.productListType.MODEM=idProd;
                                    $scope.service.modem.selected=undefined;
                                }
                            break;
                            case "20":
                                if (opt=="set"){
                                    $scope.productListType.PRODUCT_EXIT=idProd;
                                }else{
                                    $scope.productListType.PRODUCT_EXIT=idProd;
                                    $scope.service.exitReader.selected=undefined;
                                }
                            break;
                        }
                        console.log($scope.productListType);
                    }
            /**************************************************
            *                                                 *
            *        GET PRODUCT LIST BY CLASSIFICATION       *
            *                                                 *
            **************************************************/
                    $scope.productListByType={
                    'CONTROL_DE_ACCESOS':[],
                    'CERRADURA':[],
                    'CERRADURA2':[],
                    'LECTOR':[],
                    'FUENTE':[],
                    'BATERIA':[],
                    'PULSADOR_EMERG':[],
                    'TECLA_APAG':[], 'DVR':[], 'NVR':[], 'UPS':[],
                    'CAMARA':[], 'PANEL_ALARM':[], 'TECLADO_ALARM':[],
                    'SENSOR_ALARM':[], 'MODULO_IP_ALARM':[],'MODULO_GPRS_ALARM':[], 'ROUTER':[], 'MODEM':[], 'DISP_APERTURA':[], 'BACKUP_ENERGIA':[], 'PULSADOR_SALIDA':[], 'PRODUCT_EXIT':[], 'RECORD_DEVICE':[]
                    };
                    $scope.rsProductsList4ServiceData = [];
                    $scope.getProductsList4ServiceFn = function(){
                        ProductsServices.listProducts4Service().then(function(data){
                            $scope.rsProductsList4ServiceData = data;
                            if ($scope.rsProductsList4ServiceData.status==200){
                                $scope.productListByType.CONTROL_DE_ACCESOS = $scope.rsProductsList4ServiceData.data[0].products;
                                $scope.productListByType.CERRADURA          = $scope.rsProductsList4ServiceData.data[1].products;
                                $scope.productListByType.CERRADURA2         = $scope.rsProductsList4ServiceData.data[1].products;
                                $scope.productListByType.LECTOR             = $scope.rsProductsList4ServiceData.data[2].products;
                                $scope.productListByType.FUENTE             = $scope.rsProductsList4ServiceData.data[3].products;
                                $scope.productListByType.BATERIA            = $scope.rsProductsList4ServiceData.data[4].products;
                                $scope.productListByType.PULSADOR_EMERG     = $scope.rsProductsList4ServiceData.data[5].products;
                                $scope.productListByType.TECLA_APAG         = $scope.rsProductsList4ServiceData.data[6].products;
                                $scope.productListByType.DVR                = $scope.rsProductsList4ServiceData.data[7].products;
                                $scope.productListByType.NVR                = $scope.rsProductsList4ServiceData.data[8].products;
                                $scope.productListByType.UPS                = $scope.rsProductsList4ServiceData.data[9].products;
                                $scope.productListByType.CAMARA             = $scope.rsProductsList4ServiceData.data[10].products;
                                $scope.productListByType.PANEL_ALARM        = $scope.rsProductsList4ServiceData.data[11].products;
                                $scope.productListByType.TECLADO_ALARM      = $scope.rsProductsList4ServiceData.data[12].products;
                                $scope.productListByType.SENSOR_ALARM       = $scope.rsProductsList4ServiceData.data[13].products;
                                $scope.productListByType.MODULO_IP_ALARM    = $scope.rsProductsList4ServiceData.data[14].products;
                                $scope.productListByType.MODULO_GPRS_ALARM  = $scope.rsProductsList4ServiceData.data[15].products;
                                $scope.productListByType.ROUTER             = $scope.rsProductsList4ServiceData.data[16].products;
                                $scope.productListByType.MODEM              = $scope.rsProductsList4ServiceData.data[17].products;
                                $scope.productListByType.DISP_APERTURA      = $scope.rsProductsList4ServiceData.data[18].products;
                                $scope.productListByType.PULSADOR_SALIDA    = $scope.rsProductsList4ServiceData.data[19].products;
                                $scope.productListByType.PRODUCT_EXIT       = $scope.productListByType.LECTOR;
                                //MERGE THE BATERIAS AND UPS INTO ONE ARRAY TO LIST IN FRONT
                                $scope.productListByType.BACKUP_ENERGIA=[];
                                for(var key in $scope.productListByType.BATERIA){
                                    $scope.productListByType.BACKUP_ENERGIA.push($scope.productListByType.BATERIA[key]);
                                }
                                for(var key in $scope.productListByType.UPS){
                                    $scope.productListByType.BACKUP_ENERGIA.push($scope.productListByType.UPS[key]);
                                }
                                //MERGE THE DVR AND NVR INTO ONE ARRAY TO LIST IN FRONT
                                $scope.productListByType.RECORD_DEVICE=[];
                                for(var key in $scope.productListByType.DVR){
                                    $scope.productListByType.RECORD_DEVICE.push($scope.productListByType.DVR[key]);
                                }
                                for(var key in $scope.productListByType.NVR){
                                    $scope.productListByType.RECORD_DEVICE.push($scope.productListByType.NVR[key]);
                                }
                                //$scope.productListByType.BACKUP_ENERGIA.push({})
                                console.log($scope.productListByType);
                            }else{
                                console.log("Error verificar servicio.")
                            }
                            //console.log($scope.productListByType.PULSADOR_EMERG);
                        });
                    };
                    $scope.switchProducList=function(opt){
                        //console.log(opt);
                        switch (opt){
                            case false:
                                $scope.productListByType.PRODUCT_EXIT=$scope.productListByType.LECTOR;
                            break;
                            case true:
                                $scope.productListByType.PRODUCT_EXIT=$scope.productListByType.PULSADOR_SALIDA;
                            break;
                        }
                    }
            /**************************************************
            *                                                 *
            *              Add item List Product              *
            *                                                 *
            **************************************************/
                $scope.list_batteries=[];
                $scope.battery_install=[];
                $scope.list_cameras=[];
                $scope.list_cameras_ports=[];
                $scope.list_sensors=[];
                $scope.list_sensors_zones=[];
                $scope.list_tampers_zones=[];
                $scope.list_open_devices=[];
                /***********************************
                *    LOAD MODAL WINDOWS DETAILS    *
                ************************************/
                    $scope.loadDetailModalWindow = function(obj){
                        $scope.service.adicional={};
                        $scope.productSelected=obj;
                        console.log(obj);
                        $scope.service.adicional.idProductoFk=$scope.productSelected.idProduct;
                        $scope.productDetailsAssigned=false;
                        if (($scope.service.new!=undefined && $scope.service.new.idTipeServiceFk!='3' && $scope.service.new.idTipeServiceFk!='4' && $scope.service.new.idTipeServiceFk!='5') || ($scope.service.update!=undefined && $scope.service.update.idTipeServiceFk!='3' && $scope.service.update.idTipeServiceFk!='4' && $scope.service.update.idTipeServiceFk!='5')){
                        $("#serviceProductDetails").modal({backdrop: 'static', keyboard: false});
                        $('#serviceProductDetails').on('shown.bs.modal', function () {
                            $('#serviceProductInternalSerial').focus();
                        });
                        }else if ((($scope.service.new!=undefined && ($scope.service.new.idTipeServiceFk=='3' || $scope.service.new.idTipeServiceFk=='4')) || ($scope.service.update!=undefined && ($scope.service.update.idTipeServiceFk=='3' || $scope.service.update.idTipeServiceFk=='4'))) && obj.idProductClassificationFk!='11'){
                        $("#serviceProductDetails").modal({backdrop: 'static', keyboard: false});
                        $('#serviceProductDetails').on('shown.bs.modal', function () {
                            $('#serviceProductInternalSerial').focus();
                        });
                        }else if ((($scope.service.new!=undefined && ($scope.service.new.idTipeServiceFk=='3' || $scope.service.new.idTipeServiceFk=='4')) || ($scope.service.update!=undefined && ($scope.service.update.idTipeServiceFk=='3' || $scope.service.update.idTipeServiceFk=='4'))) && obj.idProductClassificationFk=='11'){
                        if ($scope.service.dvr.selected==undefined || ($scope.service.maxCamera==undefined || $scope.service.maxCamera<=0)){
                            inform.add("Debe seleccionar un DVR/NVR y/o completar el campo 'Maximo de Camaras' antes de cargar una camara.",{
                            ttl:5000, type: 'warning'
                            });
                            $scope.service.cameras.selected=undefined;
                        }else if ($scope.service.dvr.selected!=undefined && ($scope.service.maxCamera!=undefined && $scope.service.maxCamera>=1)){
                            if($scope.list_cameras.length==$scope.service.maxCamera && ($scope.list_cameras.length<=$scope.service.cameras_available || $scope.list_cameras.length<=$scope.service.cameras_contracted)){
                            inform.add("La cantidad de camaras cargadas ("+$scope.list_cameras.length+") es igual al maximo de canales del DVR/NVR Seleccionado ("+$scope.service.maxCamera+")",{
                            ttl:5000, type: 'warning'
                            });
                            }else if (($scope.list_cameras.length>=$scope.service.cameras_available && $scope.list_cameras.length==$scope.service.cameras_contracted) && $scope.list_cameras.length<=$scope.service.maxCamera){
                            var cameras_available=$scope.service.cameras_available==0 || $scope.service.cameras_available<$scope.service.cameras_contracted?$scope.service.cameras_contracted:$scope.service.cameras_available;
                            var total_cameras_availables=$scope.list_cameras.length<cameras_available?(Number(cameras_available)-Number($scope.list_cameras.length)):(Number($scope.list_cameras.length)-Number(cameras_available));
                            inform.add("Cantidad de Camaras disponibles ("+total_cameras_availables+"), aumente la cantidad de camaras del contrato.",{
                            ttl:5000, type: 'warning'
                            });
                            }else if($scope.list_cameras.length<$scope.service.maxCamera && ($scope.list_cameras.length<$scope.service.cameras_available || $scope.list_cameras.length<$scope.service.cameras_contracted)){
                                $("#serviceProductDetails").modal({backdrop: 'static', keyboard: false});
                                $('#serviceProductDetails').on('shown.bs.modal', function () {
                                $('#serviceCameraPort').focus();
                                });
                                $scope.createPortList("filter");
                            }
                        }
                        }else if ((($scope.service.new!=undefined && $scope.service.new.idTipeServiceFk=='5') || ($scope.service.update!=undefined && $scope.service.update.idTipeServiceFk=='5'))  && obj.idProductClassificationFk=='14'){
                        if ($scope.service.zonesQttyInstalled==undefined || $scope.service.zonesQttyInstalled<=0){
                            inform.add("Debe completar el campo 'Cantidad De Zonas Instaladas' o colocar un valor mayor a 0 para crear una zona.",{
                            ttl:5000, type: 'warning'
                            });
                            $('#serviceZonasCantInstaladas').focus();
                            $scope.service.sensor.selected=undefined;
                        }else if($scope.service.sensor.selected!=undefined && ($scope.service.zonesQttyInstalled!=undefined && $scope.service.zonesQttyInstalled>=1)){
                            $scope.service.sensor.zones={'zoneNumber':'','areaCovered':'','zoneLocation':'','zoneCameras':'','isWirelessAvailable':true,'isWireless':false, 'internalSerialNumber':'','fabricSerialNumber':''};
                            $scope.service.dvr.selected=undefined;
                            $scope.createPortList("filter");
                            if ($scope.list_sensors_zones.length==0){
                            inform.add("La cantidad de Zonas ("+$scope.service.zonesQttyInstalled+") a instalar ya han sido asignadas a los sensores creados, aumente la cantidad de zonas para asignar a nuevos sensores.",{
                            ttl:5000, type: 'warning'
                            });
                            $('#serviceZonasCantInstaladas').focus();
                            $scope.service.sensor.selected=undefined
                            }else{
                            $("#serviceModuleZonesDetails").modal({backdrop: 'static', keyboard: false});
                            $('#serviceModuleZonesDetails').on('shown.bs.modal', function () {
                                $('#serviceZoneNumbSensor').focus();
                            });
                            }
                        }
                        }if ((($scope.service.new!=undefined && $scope.service.new.idTipeServiceFk=='5') || ($scope.service.update!=undefined && $scope.service.update.idTipeServiceFk=='5')) && obj.idProductClassificationFk!='14'){
                        $("#serviceProductDetails").modal({backdrop: 'static', keyboard: false});
                        $('#serviceProductDetails').on('shown.bs.modal', function () {
                            $('#serviceProductInternalSerial').focus();
                        });
                        }
                        //console.log($scope.productSelected);
                        //console.log($scope.service.new);
                    }
                /***********************************
                *    CREATE PORT LIST FUNCTION     *
                ************************************/
                    $scope.createPortList=function(opt){
                        if (($scope.service.new!=undefined && ($scope.service.new.idTipeServiceFk=='3' || $scope.service.new.idTipeServiceFk=='4')) || ($scope.service.update!=undefined && ($scope.service.update.idTipeServiceFk=='3' || $scope.service.update.idTipeServiceFk=='4'))){
                        if (opt=="all" || (opt=="filter" && $scope.list_cameras.length==0)){
                            console.log("creating the port list all");
                            $scope.list_cameras_ports=[];
                            $scope.service.maxCameraTmp=$scope.service.maxCamera;
                            for (var i=1; i<=$scope.service.maxCamera; i++){
                                $scope.list_cameras_ports.push({'id':i-1, 'port': i});
                            }
                            console.log($scope.list_cameras_ports);
                        }else{
                            //console.log("creating the port list with the availables slots");
                            //console.log("$scope.service.maxCameraTmp: "+$scope.service.maxCameraTmp);
                            //console.log("$scope.service.maxCamera: "+$scope.service.maxCamera);

                            $scope.list_cameras_ports=[];
                            $scope.service.maxCameraTmp=$scope.service.maxCamera;
                            for (var i=1; i<=$scope.service.maxCamera; i++){
                                $scope.list_cameras_ports.push({'id':i-1, 'port': i});
                            }
                            //console.log("$scope.list_cameras_ports:");
                            //console.log($scope.list_cameras_ports);
                            for (var key in $scope.list_cameras){
                            //console.log("Port used: "+$scope.list_cameras[key].portCamera);
                            for (var port in $scope.list_cameras_ports){
                                //console.log("validating with port: "+$scope.list_cameras_ports[port].port);
                                if ($scope.list_cameras_ports[port].port==$scope.list_cameras[key].portCamera){
                                //console.log("Delete the port ["+$scope.list_cameras_ports[port].port+"] used from the list");
                                var objItem             = $scope.list_cameras_ports;
                                var arrItem             = objItem.map(function(o){return o.id;});
                                var indexItem           = arrItem.indexOf($scope.list_cameras_ports[port].id);
                                //console.log("Port: "+$scope.list_cameras_ports[port].port+" Deleted");
                                $scope.list_cameras_ports.splice(indexItem, 1);
                                }else{
                                //console.log("Port: "+$scope.list_cameras_ports[port].port+" Not Deleted");
                                }
                            }
                            }
                            //console.log("$scope.list_cameras_ports:");
                            //console.log($scope.list_cameras_ports);
                        }
                        }else if (($scope.service.new!=undefined && $scope.service.new.idTipeServiceFk=='5') || ($scope.service.update!=undefined && $scope.service.update.idTipeServiceFk=='5')){
                        if (opt=="all" || (opt=="filter" && $scope.list_sensors.length==0)){
                            //console.log("creating the Zone list");
                            $scope.list_sensors_zones=[];
                            $scope.list_sensors_zones_tmp=[];
                            for (var i=1; i<=$scope.service.zonesQttyInstalled; i++){
                                $scope.list_sensors_zones.push({'id':i-1, 'zone': i});
                                $scope.list_sensors_zones_tmp.push({'id':i-1, 'zone': i});
                            }
                            //console.log($scope.list_sensors_zones);
                            //console.log("creating the Tamper list");
                            $scope.list_tampers_zones=[];
                            $scope.list_tampers_zones_tmp=[];
                            $scope.service.zonesQttyInstalledTmp=$scope.service.zonesQttyInstalled;
                            for (var i=1; i<=$scope.service.zonesQttyInstalled; i++){
                                $scope.list_tampers_zones.push({'id':i-1, 'tamper': i});
                                $scope.list_tampers_zones_tmp.push({'id':i-1, 'tamper': i});
                            }
                            //console.log("creating Camera list");
                            //$scope.resources.cameras=[];
                            //for (var item in $scope.resources.dvr){
                            //    for (var camera in $scope.list_dvr_cameras){
                            //      if ($scope.resources.dvr[item].idClientServices==$scope.list_dvr_cameras[camera].idClientServicesFk){
                            //      $scope.resources.cameras.push({'idCamera':$scope.list_dvr_cameras[camera].idCamera, 'idCameraProduct':$scope.list_dvr_cameras[camera].idProductFk, 'coveredArea':$scope.list_dvr_cameras[camera].coveredArea, 'locationCamera': $scope.list_dvr_cameras[camera].locationCamera, 'portCamera': $scope.list_dvr_cameras[camera].portCamera, 'idClientServicesFk':$scope.resources.dvr[item].idClientServices});
                            //    }
                            //  }
                            //}
                        }else if($scope.list_sensors.length>0){
                            $scope.list_sensors_zones_tmp=[];
                            $scope.list_sensors_zones=[];
                            $scope.list_tampers_zones=[];
                            $scope.list_tampers_zones_tmp=[];
                            $scope.service.zonesQttyInstalledTmp=$scope.service.zonesQttyInstalled;
                            //console.log("Assigning new values");
                            for (var i=1; i<=$scope.service.zonesQttyInstalled; i++){
                            $scope.list_sensors_zones.push({'id':i-1, 'zone': i});
                            $scope.list_sensors_zones_tmp.push({'id':i-1, 'zone': i});
                            $scope.list_tampers_zones.push({'id':i-1, 'tamper': i});
                            $scope.list_tampers_zones_tmp.push({'id':i-1, 'tamper': i});
                            }
                            //console.log($scope.list_sensors_zones);
                            //console.log($scope.list_sensors_zones_tmp);
                            for (var key in $scope.list_sensors){
                                //console.log("list_sensors Zone used: "+$scope.list_sensors[key].numberZoneSensor);
                                //if($scope.list_sensors[key].nroZoneTamper!=null && $scope.list_sensors[key].nroZoneTamper!=undefined){
                                //  $scope.service.sensor.zones.isWirelessAvailable=false;
                                //}else{
                                //  $scope.service.sensor.zones.isWirelessAvailable=true;
                                //}
                                //console.log("isWirelessAvailable: "+$scope.service.sensor.zones.isWirelessAvailable);
                            //SENSORS
                            for (var zone in $scope.list_sensors_zones){
                                //console.log("$scope.list_sensors_zones[zone].zone validating "+$scope.list_sensors_zones[zone].zone);
                                if ($scope.list_sensors_zones[zone].zone==$scope.list_sensors[key].numberZoneSensor){
                                //console.log("list_sensors_zones Sensor: "+$scope.list_sensors_zones[zone].zone+" es igual que list_sensors Sensor: "+$scope.list_sensors[key].numberZoneSensor);
                                //console.log("Eliminando Sensor: "+$scope.list_sensors[key].numberZoneSensor+" con numero de tamper "+$scope.list_sensors[key].nroZoneTamper);
                                $scope.deleteSensorZones($scope.list_sensors_zones[zone].id);
                                }
                                if ($scope.list_sensors_zones[zone].zone==$scope.list_sensors[key].nroZoneTamper){
                                //console.log("list_sensors_zones Sensor: "+$scope.list_sensors_zones[zone].zone+" es igual que list_sensors Sensor Tamper: "+$scope.list_sensors[key].nroZoneTamper);
                                //console.log("Eliminando Sensor: "+$scope.list_sensors[key].nroZoneTamper+" asociado al numero de tamper "+$scope.list_sensors[key].nroZoneTamper);
                                $scope.deleteSensorZones($scope.list_sensors_zones[zone].id);
                                }
                                //console.log($scope.list_sensors_zones);
                            }
                            //TAMPERS
                            for (var tamper in $scope.list_tampers_zones){
                                if ($scope.list_tampers_zones[tamper].tamper==$scope.list_sensors[key].numberZoneSensor){
                                //console.log("list_tampers_zones Tamper: "+$scope.list_tampers_zones[tamper].tamper+" es igual que list_sensors Sensor Tamper: "+$scope.list_sensors[key].nroZoneTamper);
                                //console.log("Eliminando de list_tampers_zones el Tamper: "+$scope.list_tampers_zones[tamper].tamper+" asociado al numero de tamper "+$scope.list_sensors[key].nroZoneTamper);
                                $scope.deleteTamperZones($scope.list_tampers_zones[tamper].id);
                                }
                            }
                            }
                            $scope.list_sensors_zones=$scope.list_sensors_zones_tmp;
                            $scope.list_tampers_zones=$scope.list_tampers_zones_tmp;
                            /*idCameraFk zoneCameras*/
                            //for (var key in $scope.list_sensors){
                            //  console.log("Camera Assigned: "+$scope.list_sensors[key].idCameraFk);
                            //  for (var camera in $scope.resources.cameras){
                            //    console.log("validating with Camera Zone: "+$scope.resources.cameras[camera].idCamera);
                            //    if ($scope.resources.cameras[camera].idCamera==$scope.list_sensors[key].idCameraFk && $scope.resources.cameras[camera].idClientServicesFk==$scope.service.dvr.selected.idClientServices){
                            //      console.log("Delete the Camera Zone used from the list");
                            //      var objItem             = $scope.resources.cameras;
                            //      var arrItem             = objItem.map(function(o){return o.idCamera;});
                            //      var indexItem           = arrItem.indexOf($scope.resources.cameras[camera].idCamera);
                            //      $scope.resources.cameras.splice(indexItem, 1);
                            //    }
                            //  }
                            //}
                        }
                        }
                    }
                    $scope.deleteTamperZones = function(item){
                        for (var zone in $scope.list_tampers_zones_tmp){
                        if ($scope.list_tampers_zones_tmp[zone].id==item){
                            //console.log("Delete the tamper ["+(item+1)+"] used from the list list_tampers_zones_tmp");
                            var objItem             = $scope.list_tampers_zones_tmp;
                            var arrItem             = objItem.map(function(o){return o.id;});
                            var indexItem           = arrItem.indexOf(item);
                            //console.log($scope.list_tampers_zones_tmp[indexItem]);
                            $scope.list_tampers_zones_tmp.splice(indexItem, 1);
                        }else{
                            //console.log("The Tamper ["+(item+1)+"] has been deleted already from list_tampers_zones_tmp");
                        }
                        }
                    }
                    $scope.deleteSensorZones = function(item){

                        for (var zone in $scope.list_sensors_zones_tmp){
                        if ($scope.list_sensors_zones_tmp[zone].id==item){
                            //console.log("Delete the Zone ["+(item+1)+"] used from the list list_sensors_zones_tmp");
                            var objItem             = $scope.list_sensors_zones_tmp;
                            var arrItem             = objItem.map(function(o){return o.id;});
                            var indexItem           = arrItem.indexOf(item);
                            //console.log($scope.list_sensors_zones_tmp[indexItem]);
                            $scope.list_sensors_zones_tmp.splice(indexItem, 1);
                        }else{
                            //console.log("The Zone ["+(item+1)+"] has been deleted already from list_sensors_zones_tmp");
                        }
                        }
                    }
                /***********************************
                *    ADD SUB ITEMLIST FUNCTION     *
                ************************************/
                    $scope.addSubItemDetailsFn=function(objSelect, objDetail){
                        console.log(objSelect)
                        //console.log(objDetail)
                        if (objSelect.idProductClassificationFk!='11' && objSelect.idProductClassificationFk!='19'){//BATTERIES
                            var numberSerieFabric = objDetail.numberSerieFabric==undefined || objDetail.numberSerieFabric==null?null:objDetail.numberSerieFabric;
                            var numberSerieInternal = objDetail.numberSerieInternal==undefined || objDetail.numberSerieInternal==null?null:objDetail.numberSerieInternal;
                            var dateExpiration = objDetail.dateExpiration==undefined || objDetail.dateExpiration==null?null:objDetail.dateExpiration;
                            var productIndexNumb=($scope.list_batteries.length+1);
                            $scope.list_batteries.push({'idProductIndex':productIndexNumb,'idBatteryFk':objSelect.idProduct,'descriptionProduct':objSelect.descriptionProduct, 'model':objSelect.model, 'brand': objSelect.brand,'isNumberSerieInternal':objSelect.isNumberSerieInternal,'isNumberSerieFabric':objSelect.isNumberSerieFabric,'isDateExpiration':objSelect.isDateExpiration, 'numberSerieFabric':numberSerieFabric, 'numberSerieInternal':numberSerieInternal,'dateExpiration':dateExpiration, 'idProductClassification':objSelect.idProductClassification, 'classification': objSelect.classification, 'description':objSelect.classification, 'isNew':1});
                            $scope.productSelected={};
                            $scope.service.batteries.selected=undefined;
                            console.log($scope.list_batteries);
                        }else if(objSelect.idProductClassificationFk=='11'){//CAMERAS
                            var numberSerieFabric = objDetail.numberSerieFabric==undefined || objDetail.numberSerieFabric==null?null:objDetail.numberSerieFabric;
                            var numberSerieInternal = objDetail.numberSerieInternal==undefined || objDetail.numberSerieInternal==null?null:objDetail.numberSerieInternal;
                            var dateExpiration = objDetail.dateExpiration==undefined?null:objDetail.dateExpiration;
                            $scope.list_cameras.push({'idProductFk':objSelect.idProduct, 'idCameraFk':objSelect.idProduct,'portCamera':objDetail.portCamera, 'coveredArea':objDetail.coveredArea, 'locationCamera': objDetail.locationCamera, 'descriptionProduct':objSelect.descriptionProduct, 'model':objSelect.model, 'brand': objSelect.brand,'isNumberSerieInternal':objSelect.isNumberSerieInternal,'isNumberSerieFabric':objSelect.isNumberSerieFabric,'isDateExpiration':objSelect.isDateExpiration, 'numberSerieFabric':numberSerieFabric, 'numberSerieInternal':numberSerieInternal,'dateExpiration':dateExpiration, 'idProductClassification':objSelect.idProductClassification, 'classification': objSelect.classification, 'nroSerieCamera':numberSerieInternal,'nroFabricCamera':numberSerieFabric,'dateExpireCamera':dateExpiration, 'isNew':1});
                            $scope.productSelected={};
                            $scope.service.cameras.selected=undefined;
                            console.log($scope.list_cameras);
                        }else if(objSelect.idProductClassificationFk=='19'){// OPEN DEVICES
                            var numberSerieFabric = objDetail.numberSerieFabric==undefined || objDetail.numberSerieFabric==null?null:objDetail.numberSerieFabric;
                            var numberSerieInternal = objDetail.numberSerieInternal==undefined || objDetail.numberSerieInternal==null?null:objDetail.numberSerieInternal;
                            var dateExpiration = objDetail.dateExpiration==undefined?null:objDetail.dateExpiration;
                            var productIndexNumb=($scope.list_batteries.length+1);
                            $scope.list_open_devices.push({'idProductIndex':productIndexNumb,'idOpenDevice':objSelect.idProduct, 'descriptionProduct':objSelect.descriptionProduct, 'model':objSelect.model, 'brand': objSelect.brand,'isNumberSerieInternal':objSelect.isNumberSerieInternal,'isNumberSerieFabric':objSelect.isNumberSerieFabric,'isDateExpiration':objSelect.isDateExpiration, 'idProductClassification':objSelect.idProductClassification, 'classification': objSelect.classification, 'numberSerieInternal':numberSerieInternal,'numberSerieFabric':numberSerieFabric,'dateExpiration':dateExpiration, 'isNew':1});
                            $scope.productSelected={};
                            $scope.service.openDevices.selected=undefined;
                            console.log($scope.list_open_devices);
                        }

                        $("#serviceProductDetails").modal('hide');
                        //adicional={};
                    }
                /***********************************
                *  LOAD/GET SUB ITEMLIST FUNCTION  *
                ************************************/
                    $scope.subItemServiceProductDetailsFn = function(obj){
                        $scope.service.adicional={};
                        $scope.productSelected={};
                        $scope.productSelected=obj;
                        $scope.service.adicional=obj;
                        console.log(obj);
                        $scope.productDetailsAssigned=true;
                        if ($scope.productSelected.idProductClassificationFk!='11' && $scope.productSelected.idProductClassificationFk!='19'){
                            $scope.createPortList("all");
                        }
                        //console.log($scope.service.adicional);
                        //console.log($scope.productSelected);
                        $("#serviceProductDetails").modal({backdrop: 'static', keyboard: false});
                    }
                /***********************************
                *   REMOVE SUB ITEMLIST FUNCTION   *
                ************************************/
                    $scope.removeSubItemProductDetailsFn = function (obj){
                        console.log("removeSubItemProductDetailsFn");
                        console.log(obj);
                        if (obj.idProductClassification!='11' && obj.idProductClassification!='19'){//BATTERIES
                            var objItem             = $scope.list_batteries;
                            var arrItem             = objItem.map(function(i){return i.idProductIndex;});
                            var indexItem           = arrItem.indexOf(obj.idProductIndex);
                            $scope.list_batteries.splice(indexItem, 1);
                            $scope.productDetailsAssigned=false;
                            $scope.service.adicional={};
                            $scope.productSelected={};
                            //console.log($scope.list_batteries);
                            if ($scope.isUpdateCustomerService){
                                for (var item in $scope.list_productsDetails){
                                    if ($scope.list_productsDetails[item].idProductoFk==obj.idBatteryFk){
                                        console.log("productDetail Deleted:");
                                        console.log($scope.list_productsDetails[item]);
                                        $scope.removeProductDetailsFn(obj, $scope.list_productsDetails[item].idProductDetail, $scope.list_productsDetails[item].optAux);
                                        console.log("----------------------");
                                        break;
                                    }
                                }
                            }
                        }else if(obj.idProductClassification=='11'){//CAMERAS
                            var objItem             = $scope.list_cameras;
                            var arrItem             = objItem.map(function(i){return i.portCamera;});
                            var indexItem           = arrItem.indexOf(obj.portCamera);
                            //console.log(indexItem);
                            $scope.list_cameras.splice(indexItem, 1);
                            $scope.productDetailsAssigned=false;
                            $scope.service.adicional={};
                            $scope.productSelected={};
                            //console.log($scope.list_cameras);
                            //console.log($scope.list_cameras_ports);
                        }else if(obj.idProductClassification=='19'){// OPEN DEVICES
                            var objItem             = $scope.list_open_devices;
                            var arrItem             = objItem.map(function(i){return i.idOpenDevice;});
                            var indexItem           = arrItem.indexOf(obj.idOpenDevice);
                            //console.log(indexItem);
                            $scope.list_open_devices.splice(indexItem, 1);
                            $scope.productDetailsAssigned=false;
                            $scope.service.adicional={};
                            $scope.productSelected={};
                            //console.log($scope.list_open_devices);
                        }
                        inform.add("Producto: ("+obj.descriptionProduct+") ha sido removido correctamente.",{
                        ttl:5000, type: 'warning'
                        });
                    }

            /**************************************************
            *                                                 *
            *               CLEAR SERVICE INPUTS              *
            *                                                 *
            **************************************************/
                $scope.cleanServiceInputsFn = function(){
                    //console.log("===============================");
                    //console.log("| SERVICE INPUT CLEAR COMPLETE |");
                    //console.log("===============================");
                    $scope.service = {
                                        'dvr':{'selected':undefined},
                                        'cameras':{'selected':undefined},
                                        'modem':{'selected':undefined},
                                        'router':{'selected':undefined},
                                        'sysUser':{'selected':undefined},
                                        'license_departments':{'selected':undefined},
                                        'crtlAccess':{'selected':undefined},
                                        'lockedIt':{'selected':undefined},
                                        'lockedIt2':{'selected':undefined},
                                        'entranceReader':{'selected':undefined},
                                        'powerSupply':{'selected':undefined},
                                        'exitReader':{'selected':undefined},
                                        'batteries':{'selected':undefined},
                                        'emergencyButton':{'selected':undefined},
                                        'TurnOffKey':{'selected':undefined},
                                        'sensor':{'selected':undefined},
                                        'alarmPanel':{'selected':undefined},
                                        'alarmKeyboard':{'selected':undefined},
                                        'openDevices':{'selected':undefined},
                                        'aditional':{},
                                        'numbOfLicenceRemains':0,
                                        'numbOfLicenceSet':0,
                                        'numbOfNewLicence':0,
                                        'aditional_alarm':{},
                                        'sensor':{'zones':{'zoneNumber':'','areaCovered':'','zoneLocation':'','zoneCameras':'','isWirelessAvailable':true,'isWireless':false, 'internalSerialNumber':'','fabricSerialNumber':''}},
                                        'module':{'ipAlarmModule':{'selected':undefined}, 'gprsAlarmModule':{'selected':undefined}}
                    };
                    if ($scope.isNewCustomerService){
                        $scope.service.new={
                                            'idContratoFk':'',
                                            'name':'',
                                            'MntType':'',
                                            'dateUp':'',
                                            'dateDown':'',
                                            'location': '',
                                            'maxCamera':'',
                                            'zonesQttyInstalled':'',
                                            'isHasInternetConnect':0,
                                            'numberPortRouter':'',
                                            'addessClient':null,
                                            'portHttp':'',
                                            'addressVpn':'',
                                            'namePort1':'',
                                            'nroPort1':'',
                                            'namePort2':'',
                                            'nroPort2':'',
                                            'generalComments':'',
                                            'idDoorFk':'',
                                            'aclaration':'',
                                            'locationGabinet':'',
                                            'isBlocklingScrew':'',
                                            'lockingScrewComment':'',
                                            'locationEmergencyButton':'',
                                            'locationOffKey':'',
                                            'portNumberRouter':'',
                                            'idTipoConexionRemoto':'',
                                            'installationPassword':'',
                                            'user':'',
                                            'pass':'',
                                            'useVpn':'',
                                            'passVpn':'',
                                            'isSysUser':0,
                                            'people':{},
                                            'isSysUser': false
                        };
                    }
                    if ($scope.isUpdateCustomerService){
                        $scope.service.update = {
                                            'idContratoFk':'',
                                            'name':'',
                                            'MntType':'',
                                            'dateUp':'',
                                            'dateDown':'',
                                            'location': '',
                                            'maxCamera':'',
                                            'zonesQttyInstalled':'',
                                            'isHasInternetConnect':0,
                                            'numberPortRouter':'',
                                            'addessClient':null,
                                            'portHttp':'',
                                            'addressVpn':'',
                                            'namePort1':'',
                                            'nroPort1':'',
                                            'namePort2':'',
                                            'nroPort2':'',
                                            'generalComments':'',
                                            'idDoorFk':'',
                                            'aclaration':'',
                                            'locationGabinet':'',
                                            'isBlocklingScrew':'',
                                            'lockingScrewComment':'',
                                            'locationEmergencyButton':'',
                                            'locationOffKey':'',
                                            'portNumberRouter':'',
                                            'idTipoConexionRemoto':'',
                                            'installationPassword':'',
                                            'user':'',
                                            'pass':'',
                                            'useVpn':'',
                                            'passVpn':'',
                                            'isSysUser':0,
                                            'isSysUser': false
                        };
                    }
                    $scope.aditional_alarm=[];
                    $scope.aditional_service_alarm = [];
                    $scope.service.adicional={};
                    $scope.list_batteries=[];
                    $scope.battery_install=[];
                    $scope.list_open_devices=[];
                    $scope.list_cameras=[];
                    $scope.list_cameras_ports=[];
                    $scope.list_sensors=[];
                    $scope.list_sensors_zones=[];
                    $scope.list_tampers_zones=[];
                    $scope.rsContractServiceData=[];
                    $scope.rsCustomerContractListData=[];
                    $scope.rsContractItemListData=[];
                    $scope.list_productsDetails=[];
                    $scope.list_phones=[];
                    $scope.previewData=[];
                    $scope.list_user_licence=[];
                    $scope.list_depto_user_licence = [];
                    $scope.list_company_user_licence = [];
                    $scope.list_particular_user_licence = [];
                    $scope.list_user=[];
                    $scope.list_tampers=[];
                    $scope.list_people_notice=[];
                    $scope.list_people_verify=[];
                    $scope.service.zones=[];
                    $scope.tipo_conexion_remoto=[];
                    $scope.productDetailsAssigned=false;
                }
            /**************************************************
            *                                                 *
            *            CAMERAS SERVICE USERS DVR            *
            *                                                 *
            **************************************************/
                /***********************************
                *    LOADING USER WINDOWS FORM     *
                ************************************/
                    $scope.list_user=[];
                    $scope.isSysUserExist=false;
                    $scope.loadServiceUserWindowFn=function(obj){
                    $scope.previewData=[];
                    $scope.invalidTypeOf=false;
                    $scope.fileTypeOf=null;
                    //console.log(obj);
                    $scope.service.users={}
                        if ($scope.service.isSysUser){
                            if ($scope.list_user.length>0){
                            for (var key in  $scope.list_user){
                                if ($scope.list_user[key].idClientFk==obj.idUser){
                                inform.add("El usuario: "+obj.fullNameUser+", ya se encuentra agregado como usuario de DVR.",{
                                    ttl:5000, type: 'success'
                                });
                                $scope.service.sysUser.selected=undefined;
                                $scope.isSysUserExist=true;
                                break;
                                }else{
                                $scope.isSysUserExist=false;
                                }
                            }
                            }
                            if (!$scope.isSysUserExist){
                            console.log("$scope.isSysUserExist: "+$scope.isSysUserExist);
                                $('#serviceUserDetails').modal({backdrop: 'static', keyboard: false});
                                $scope.service.users.idUser=obj.idUser;
                                $scope.service.users.name=obj.fullNameUser;
                                $('#serviceUser').focus();
                            }
                        }else{
                            $('#serviceUserDetails').modal({backdrop: 'static', keyboard: false});
                            $('#serviceUserName').focus();
                            $scope.service.users.idUser=null;
                            $scope.service.users.name='';
                        }
                        $scope.isDVRUserEdit = false;
                    }
                /***********************************
                *       LOAD USER DVR SELECTED     *
                ************************************/
                    $scope.isDVRUserEdit = false;
                    $scope.loadSelectedUserDVRFn = function(obj){
                        $scope.previewData = [];
                        $scope.service.users = {'idItem':'', 'name':'','user':'', 'pass':'', 'profile':'', 'userProfile':'', 'qrCode':'', 'qrBase64':''};
                        $scope.service.users.idItem          = obj.idItem;
                        $scope.service.users.name            = obj.name;
                        $scope.service.users.user            = obj.user;
                        $scope.service.users.pass            = obj.pass;
                        $scope.service.users.profile         = obj.profile;
                        $scope.service.users.userProfile    = obj.profile;
                        $scope.service.users.qrCode          = obj.qrBase64==null?obj.qrCode:obj.qrBase64;
                        $scope.service.users.qrBase64        = obj.qrBase64==null?obj.qrCode:obj.qrBase64;
                        $scope.isDVRUserEdit = true;
                        $('#serviceUserDetails').modal({backdrop: 'static', keyboard: false});
                        console.log($scope.service.users);
                    }
                /***********************************
                *     ADDING USER DATA DETAILS     *
                ************************************/
                    $scope.qrCodeImageDetails={};
                    $scope.processServiceUserDVRFn=function(obj){
                        console.log(obj);
                        var idUser      = obj.idUser==null  || obj.idUser==undefined?obj.idClientFk:obj.idUser;
                        var idProfile   = obj.profile==null || obj.profile==undefined?obj.userProfile:obj.profile;
                        //var qrCode      = obj.qrCode==null  || obj.qrCode==undefined?obj.qrBase64:obj.qrCode;
                        var qrCode      = BSS.imageQR_Default;
                        var idListItem  = $scope.list_user.length==0?1:($scope.list_user_licence.length+1);
                        if ($scope.list_user.length==0 || !$scope.isDVRUserEdit){
                            $scope.list_user.push({'idItem':idListItem,'idClientFk':idUser,'name':obj.name, 'user':obj.user, 'pass':obj.pass, 'profile':idProfile, 'userProfile':idProfile, 'qrCode':qrCode, 'qrBase64':qrCode});
                            inform.add("Usuario DVR: "+obj.user+" ha sido cargado correctamente.",{
                            ttl:5000, type: 'success'
                            });
                        }else{
                            for (var key in $scope.list_user){
                                if ($scope.list_user[key].idItem==obj.idItem){
                                    $scope.list_user[key].name          = obj.name;
                                    $scope.list_user[key].user          = obj.user;
                                    $scope.list_user[key].pass          = obj.pass;
                                    $scope.list_user[key].profile       = obj.profile;
                                    $scope.list_user[key].userProfile   = obj.profile;
                                    $scope.list_user[key].qrCode        = obj.qrCode;
                                    $scope.list_user[key].qrBase64      = obj.qrCode;
                                    inform.add("Usuario DVR: "+obj.user+" ha sido actualizado correctamente.",{
                                    ttl:5000, type: 'success'
                                    });
                                    break;
                                }
                            }
                        }

                        $scope.qrCodeImageDetails=$scope.previewData;
                        $scope.previewData=[];
                            $('#serviceUserDetails').modal('hide');
                            if (obj.idUser!=null){$scope.service.sysUser.selected=undefined;};



                        //console.log($scope.list_user);
                        if ($scope.isUpdateCustomerService){
                            $scope.switchCustomersFn('services', $scope.service.update, 'update');
                        }
                    }
                /***********************************
                *     REMOVE USER DATA DETAILS     *
                ************************************/
                    $scope.removeServiceUserDetailsFn=function(obj){
                        var objItem             = $scope.list_user;
                        var arrItem             = objItem.map(function(i){return i.idClientFk;});
                        var indexItem           = arrItem.indexOf(obj.idClientFk);
                        $scope.list_user.splice(indexItem, 1);
                            inform.add("Usuario DVR: "+obj.user+" ha sido removido correctamente.",{
                            ttl:5000, type: 'success'
                            });
                    }
                /***********************************
                *  LOAD QR CODE USER DATA DETAILS  *
                ************************************/
                    $scope.previewData=[];
                    $scope.invalidTypeOf=false;
                    $scope.fileTypeOf=null;
                    $scope.loadAttachedFilesFn = function(element) {
                        $scope.service.users.qrBase64=null;
                        console.log(element);
                        var formData = new FormData();
                        $scope.previewData = [];
                        /**************************************
                         *  PREVIEW QR CODE USER DATA DETAILS  *
                         **************************************/
                        $scope.previewFile = function (file){
                            var reader = new FileReader();
                            var obj = new FormData().append('file', file);
                                reader.onload = function(event) {
                                    var src = event.target.result;
                                    var size = ((file.size/(1024*1024)) > 1)? (file.size/(1024*1024)) + ' mB' : (file.size/1024)+' kB';
                                    $scope.image_source = event.target.result
                                    $scope.$apply(function($scope) {
                                    $scope.files = element.files;
                                    $scope.previewData.push({'name':file.name,'size':size,'type':file.type,'src':src,'data':obj});
                                    $scope.service.users.qrCode=src;
                                    });
                                    console.log($scope.previewData);
                                }
                                reader.readAsDataURL(file);
                        }
                        var file = "";
                        $scope.processAttachedFilesFn = function (e){
                            //console.info(e);
                            for(var i=0;i<e.length;i++){
                            file = e[i];
                            var type =  '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
                            if('|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1){
                                $scope.previewFile(file);
                                $scope.fileTypeOf=file.type;
                                $scope.invalidTypeOf=false;
                            }else{
                                console.log(file.name + " is not supported");
                                $scope.service.users.qrCode='';
                                $scope.previewData = [];
                                $scope.fileTypeOf=type;
                                $scope.invalidTypeOf=true;
                            }
                            }
                            console.log("FileType: "+$scope.fileTypeOf+" & invalidType: "+$scope.invalidTypeOf+" & fileList: "+$scope.previewData.length);
                        }
                        //console.log(element.files);
                        $scope.processAttachedFilesFn(element.files);
                    }
                /***********************************
                *      VERIFY INTERNET CHECKBOX    *
                ************************************/
                    $scope.verifyCheckBoxFn = function(obj){
                        if ($scope.isNewCustomerService){
                        if(obj){
                            $scope.service.new.namePort="RTSP";
                            $scope.service.new.port="554";

                            $scope.service.new.namePort1="HTTPS"
                            $scope.service.new.nroPort1="443";

                            $scope.service.new.namePort2="SERVIDOR";
                            $scope.service.new.nroPort2="8000";
                        }else{
                            $scope.service.new.namePort=null;
                            $scope.service.new.port=null;

                            $scope.service.new.namePort1=null;
                            $scope.service.new.nroPort1=null;

                            $scope.service.new.namePort2=null;
                            $scope.service.new.nroPort2=null;
                        }
                        }else if ($scope.isUpdateCustomerService){
                        if(obj){
                            $scope.service.update.namePort="RTSP";
                            $scope.service.update.port="554";

                            $scope.service.update.namePort1="HTTPS"
                            $scope.service.update.nroPort1="443";

                            $scope.service.update.namePort2="SERVIDOR";
                            $scope.service.update.nroPort2="8000";
                        }else{
                            $scope.service.update.namePort=null;
                            $scope.service.update.port=null;

                            $scope.service.update.namePort1=null;
                            $scope.service.update.nroPort1=null;

                            $scope.service.update.namePort2=null;
                            $scope.service.update.nroPort2=null;
                        }
                        }
                    }
                /***********************************
                *  VERIFY LIST OF CAMERAS CHECKBOX *
                ************************************/
                    $scope.verifyCameraLengthFn = function(ArrObjList, amount){
                    console.log(ArrObjList.length+' = '+amount)
                        if(ArrObjList.length!=0 && amount>=1 && ArrObjList.length<amount){
                        inform.add('La cantidad de camaras/totem es menor al maximo establecido, completar para continuar.',{
                                    ttl:6000, type: 'warning'
                        });
                        }
                    }
                /***********************************
                *   GENERATE PDF FILE & DOWNLOAD   *
                ************************************/
                    //console.log("imageQR_Default: "+BSS.imageQR_Default);
                    $scope.selectApp = function(user, service){
                        $('#selectPDFType').modal({backdrop: 'static', keyboard: false});
                        $scope.userSelected = user;
                        $scope.serviceSelected = service;
                    }

                    $scope.generatePDF = function(user, service, appType){
                        $('#selectPDFType').modal('hide');
                        var blobUrlObject = null;
                        console.log("isListCustomerService: "+$scope.isListCustomerService+" isNewCustomerService: "+$scope.isNewCustomerService+" isUpdateCustomerService: "+$scope.isUpdateCustomerService);
                        if (($scope.isNewCustomerService && $scope.service.new.isHasInternetConnect) || ($scope.isUpdateCustomerService && $scope.service.update.isHasInternetConnect==true) || ($scope.isListCustomerService)){
                            var serviceProcess=null;
                            if($scope.isNewCustomerService){
                            serviceProcess=service.new
                            }else if ($scope.isUpdateCustomerService){
                            serviceProcess=service.update
                            }else{
                            serviceProcess=service.list;
                            }
                            console.log(user);
                            console.log(serviceProcess);
                            if ((serviceProcess.idTipeServiceFk=="4" && (serviceProcess.addessClient==null || serviceProcess.addessClient=="") && (serviceProcess.nroPort2==null || serviceProcess.nroPort2=="")) || (serviceProcess.idTipeServiceFk=="3" && (serviceProcess.addressClientInter==null || serviceProcess.addressClientInter=="") && (serviceProcess.numberPort2==null || serviceProcess.numberPort2==""))){
                                inform.add("Error al generar PDF completar campos requeridos de conexion a internet.",{
                                ttl:5000, type: 'warning'
                                });
                            }else{
                                blockUI.start('Generando PDF del usuario '+user.name);
                                $timeout(function() {
                                blobUrlObject = createPDF(user, serviceProcess);
                                }, 1000);
                                $timeout(function() {
                                blockUI.message('Cargando PDF del usuario '+user.name);
                                }, 2000);
                                $timeout(function() {
                                $('#pdfViewerWindow').modal('show');
                                PDFObject.embed(blobUrlObject, "#pdfObjectViewer");
                                blockUI.stop();
                                }, 3000);
                                function createPDF(user, service) {
                                var doc = null
                                console.log(service);
                                var clientAddr1     = $scope.customerFound.address;
                                var clientAddr2     = service.idTipeServiceFk=="4"?service.addessClient:service.addressClientInter;
                                var connectionPort  = service.idTipeServiceFk=="4"?service.nroPort2:service.numberPort2;
                                var username        = user.user;
                                var password        = user.pass;
                                //var imageData64     = user.qrBase64;
                                var appSelected     = appType=='dmss'?'DMSS':'HIKCONNECT';
                                console.log(connectionPort);
                                // Don't forget, that there are CORS-Restrictions. So if you want to run it without a Server in your Browser you need to transform the image to a dataURL
                                // Use http://dataurl.net/#dataurlmaker
                                var doc = new jsPDF({
                                    orientation: 'p',
                                    unit: 'mm',
                                    format: 'letter',
                                    compress: false,
                                    putOnlyUsedFonts:true,
                                    lineHeight: 1.1,
                                    floatPrecision: 16 // or "smart", default is 16
                                });
                                doc.addFileToVFS('Roboto-Regular.ttf',BSS_FONT.Roboto_Regular);
                                doc.addFont('Roboto-Regular.ttf', 'Roboto', 'regular');
                                console.log(":::::::::::::BSS_FONT.Roboto_Regular:::::::::::::");
                                //console.log(BSS_FONT.Roboto_Regular);
                                console.log(doc.getFontList());
                                console.log(doc.internal.fonts);
                                doc.setProperties({
                                    name: 'hoja_acceso_usuario'+user.name+'.pdf',
                                    title: 'HOJA DE DATOS DE ACCESO',
                                    subject: 'PROGRAMAS DE VISUALIZACIÓN',
                                    author: 'BSS SEGURIDAD',
                                    keywords: 'security, bss, service, web',
                                    creator: 'MEEE'
                                });
                                    //doc.setLineWidth(0.1);
                                    //doc.setDrawColor(199, 199, 199);
                                    //doc.line(5, 30, 180, 30);
                                    //doc.setFont('Roboto-Bold');
                                    //doc.setTextColor(0,0,0);
                                    //doc.setFontSize(25);
                                    //doc.text(48, 45, "HOJA DE DATOS DE ACCESO");
                                    //doc.setFont('Roboto-Thin');
                                    //doc.setTextColor(0,0,0);
                                    //doc.setFontSize(16);
                                    //doc.text("PARA CONFIGURAR LOS PROGRAMAS DE VISUALIZACIÓN", 33, 52);
                                    //var imageData =""
                                    //doc.addImage(imageData, "jpg", 170, 6, 40, 17);
                                    //doc.setFont('Roboto-Regular');
                                    //doc.setTextColor(0,0,0);
                                    //doc.setFontSize(12);
                                    //var reportTitle = "Cuando el Manual de instalación y configuración correspondiente se lo indique, complete los siguientes datos:";
                                    //var splitTitle = doc.splitTextToSize(reportTitle, 170);
                                    //doc.text(splitTitle, 15, 70);
                                    doc.addImage(BSS.imageBG_Default, "png", 0, 0, 0, 0);
                                    /********************************************/
                                    //doc.setFont('Roboto-Bold');
                                    //doc.setTextColor(0,0,0);
                                    //doc.setFontSize(18);
                                    //FIELD1
                                    //doc.setFillColor(243,184,53);
                                    //doc.rect(15, 90, 65, 10, 'F');
                                    //doc.text(18, 97, "DATO 1 o Nickname:");
                                    // /FIELD1
                                    //FIELD2
                                    //doc.setFillColor(243,184,53);
                                    //doc.rect(15, 110, 65, 10, 'F');
                                    //doc.text(18, 117, "DATO 2 o Address:");
                                    // /FIELD2
                                    //FIELD3
                                    //doc.setFillColor(243,184,53);
                                    //doc.rect(15, 130, 65, 10, 'F');
                                    //doc.text(18, 137, "DATO 3 o Port:");
                                    // /FIELD3
                                    //FIELD4
                                    //doc.setFillColor(243,184,53);
                                    //doc.rect(15, 150, 65, 10, 'F');
                                    //doc.text(18, 157, "DATO 4 o Username:");
                                    // /FIELD4
                                    //FIELD5
                                    //doc.setFillColor(243,184,53);
                                    //doc.rect(15, 170, 65, 10, 'F');
                                    //doc.text(18, 177, "DATO 5 o Password:");
                                    // /FIELD5
                                    //FIELD6
                                    //doc.setFillColor(243,184,53);
                                    //doc.rect(15, 190, 65, 10, 'F');
                                    //doc.text(18, 197, "CODIGO QR:");
                                    // /FIELD6
                                    /********************************************/
                                    doc.setFont('helvetica', 'normal');
                                    doc.text('ÁÉÍÓÚ áéíóú ñ Ñ €', 20, 40);
                                    doc.setTextColor(0,0,0);
                                    doc.setFontSize(16);
                                    //VALUE1
                                    doc.text(90, 89, clientAddr1);
                                    // /VALUE1
                                    //VALUE2
                                    doc.text(90, 107, clientAddr2);
                                    // /VALUE2
                                    //VALUE3
                                    doc.text(90, 125, connectionPort);
                                    // /VALUE3
                                    //VALUE4
                                    doc.text(90, 142, username);
                                    // /VALUE4
                                    //VALUE5
                                    doc.text(90, 160, password);
                                    // /VALUE5
                                    //VALUE6
                                    //doc.setFillColor(243,184,53);
                                    //doc.rect(88, 190,54, 54, 'F');
                                    //var imageQR = imageData64;
                                    doc.addImage(BSS.imageQR_Default, "png", 138, 183, 50, 50);
                                    doc.setFont('helvetica', 'normal');
                                    doc.setTextColor(0,0,0);
                                    doc.setFontSize(13);
                                    //VALUE1
                                    doc.text(7, 190, "PARA VISUALIZAR TUS CÁMARAS escaneá el código QR y");
                                    doc.setFontSize(12);
                                    // /VALUE1
                                    //VALUE2
                                    doc.text(7, 199, "descargá de nuestra web el instructivo PDF "+appSelected);
                                    // /VALUE2
                                    //VALUE3
                                    doc.text(7, 208, "para aprender cómo configurar la app.");
                                    // /VALUE3
                                    //VALUE4
                                    doc.text(7, 217, "También tendrás información de las consultas más habituales.");
                                    // /VALUE4
                                    doc.setTextColor(0,120,157);
                                    //VALUE5
                                    doc.text(7, 226,"https://bss.com.ar/camaras-de-seguridad");

                                    doc.setTextColor(0,0,0);
                                    doc.text(7, 235, "Ante cualquier duda escribinos por Whatsapp o Instagram.");
                                    // /VALUE6
                                    //doc.setLineWidth(0.1);
                                    //doc.setDrawColor(199, 199, 199);
                                    //doc.line(5, 260, 180, 260);
                                    var imageData2 =""
                                    //doc.addImage(imageData2, "jpg", 6, 267, 12, 5);
                                    //doc.setLineWidth(0.1);
                                    //doc.setDrawColor(233,184,53);
                                    //doc.setFont('Roboto-Thin');
                                    //doc.setTextColor(0,0,0);
                                    //doc.setFontSize(8);
                                    //doc.line(22, 262, 22, 274);
                                    //doc.text(24, 265, "Carlos Calvo 3430 (C1230ABH)");
                                    //doc.text(24, 269, "Ciudad Autónoma de Buenos Aires /Tel: +5411 5031-1207");
                                    //doc.text(24, 273, "info@seguridadtass.com.ar / www.seguridadtass.com.ar");
                                    //doc.addPage();
                                    //doc.addPage();
                                    //doc.addPage();
                                    //doc.addPage();
                                    var pageCount = doc.internal.getNumberOfPages(); //Total Page Number
                                    //for(i = 0; i < pageCount; i++) {
                                    //    doc.setPage(i);
                                    //    let pageCurrent = doc.internal.getCurrentPageInfo().pageNumber; //Current Page
                                    //    doc.setFont('Roboto-Bold');
                                    //    doc.setTextColor(243,184,53);
                                    //    doc.setFontSize(20);
                                    //    doc.text('| '+pageCurrent, 170, 270);
                                    //}
                                    return doc.output('bloburl');
                                    //doc.save("TASS.pdf");
                                }
                            }
                        }else{
                            inform.add("Para generar el archivo PDF debe completar los datos de conexion a internet.",{
                            ttl:5000, type: 'warning'
                            });
                        }
                    }
            /**************************************************
            *                                                 *
            *           APP MONITOR SERVICE FUNCTIONS         *
            *                                                 *
            **************************************************/
                $scope.loadServiceLicenceWindowFn = function(){
                    if ($scope.list_user_licence.length<=0 && $scope.service.numbOfLicenceRemains<=0){
                        inform.add("Debe asignar la cantidad de nuevas licencias.",{
                            ttl:5000, type: 'warning'
                        });
                    }else if ($scope.service.numbOfLicenceRemains>=1){
                        $('#serviceLicenceDetails').modal({backdrop: 'static', keyboard: false});
                        $scope.service.users = {'fullName':'','email':'', 'phone':'', 'idOS':'', 'profileUser':'', 'userNumbPasswd':'', 'idDepartmentFk':'', 'idParticularAddressFk':'', 'idDetinationOfLicenseFk':null};
                        $scope.service.sysUser={'selected':undefined};
                        $scope.service.license_departments={'selected':undefined};
                        //$scope.service.idApplicationFk = null;
                        $scope.service.isSysUser=false;
                        $scope.service.isUserLicenceEdit = false;
                        $('#serviceUserLicenceName').focus();
                        $scope.rsJsonUser={};
                    }else{
                        inform.add("Ya ha asignado el total de las nuevas licencias.",{
                            ttl:5000, type: 'warning'
                        });

                    }
                }
                /***********************************
                *    LOAD USER LICENSE SELECTED    *
                ************************************/
                    $scope.loadSelectedUserLicenceFn = function(obj){
                        $scope.userLicenceSelected={};
                        $scope.userLicenceSelected=obj;
                        $scope.service.sysUser={'selected':undefined};
                        $scope.service.license_departments={'selected':undefined};
                        $scope.service.users = {'fullName':'','email':'', 'phone':'', 'idOS':'', 'profileUser':'', 'userNumbPasswd':'', 'idDepartmentFk':'', 'idDetinationOfLicenseFk':null};
                        $scope.service.users.fullName                 = obj.fullName;
                        $scope.service.users.email                    = obj.email;
                        $scope.service.users.phone                    = obj.phone;
                        $scope.service.users.keyword                  = obj.keyword;
                        $scope.service.users.idOS                     = obj.idOS;
                        $scope.service.users.profileUser              = obj.profileUser;
                        $scope.service.users.idDepartmentFk           = obj.idDepartmentFk;
                        $scope.service.users.depto                    = obj.depto;
                        $scope.service.users.idParticularAddressFk    = obj.idParticularAddressFk;
                        $scope.service.sysUser.selected               = obj.idUserFk?{idUser: obj.idUserFk, fullNameUser: obj.fullName}:undefined;
                        $scope.service.license_departments.selected   = obj.idDetinationOfLicenseFk=="1"?{idDepto: obj.idDepartmentFk, Depto: obj.depto}:undefined;
                        $scope.service.users.idDetinationOfLicenseFk  = obj.idDetinationOfLicenseFk;
                        $scope.service.users.userNumbPasswd           = obj.userNumbPasswd;
                        $scope.service.users.idListItem               = obj.idListItem;
                        $scope.service.users.idUserFk                 = obj.idUserFk;
                        $scope.service.users.nameProfile              = obj.nameProfile;
                        $scope.service.isSysUser=obj.idUserFk?true:false;
                        $('#serviceLicenceDetails').modal({backdrop: 'static', keyboard: false});
                        $scope.service.isUserLicenceEdit = true;
                        console.log($scope.service.users);
                    }
                /***********************************
                *      SET QTTY OF NEW LICENCE     *
                ************************************/
                    $scope.setNewLicencesFn = function (item){
                        inform.add("Habilitadas: "+item+" nuevas licencias.",{
                            ttl:5000, type: 'success'
                        });
                        $scope.changeLicencesFn("set");
                    }
                    $scope.changeLicencesFn = function (opt){
                        switch (opt){
                            case "set":
                                if ($scope.service.numbOfLicenceSet==0){
                                    $scope.service.numbOfLicenceSet=$scope.service.numbOfNewLicence;
                                    if ($scope.isUpdateCustomerService || $scope.isListCustomerService){
                                        $scope.service.numbOfLicenceRemains=$scope.service.numbOfLicenceSet-$scope.list_user_licence.length;
                                        console.log("$scope.list_user_licence.length: "+$scope.list_user_licence.length);
                                        console.log("$scope.service.numbOfLicenceSet: "+$scope.service.numbOfLicenceSet);
                                        console.log("$scope.service.numbOfLicenceRemains: "+$scope.service.numbOfLicenceRemains);
                                    }else{
                                        $scope.service.numbOfLicenceRemains=$scope.service.numbOfLicenceSet;
                                    }
                                }else{
                                    $scope.service.numbOfLicenceSet=$scope.service.numbOfLicenceSet+$scope.service.numbOfNewLicence;
                                    $scope.service.numbOfLicenceRemains=$scope.service.numbOfLicenceSet-$scope.list_user_licence.length;
                                    console.log("$scope.service.numbOfLicenceSet:"+$scope.service.numbOfLicenceSet);
                                }
                            break;
                            case "change":
                                $scope.service.numbOfLicenceRemains=$scope.service.numbOfLicenceSet-$scope.list_user_licence.length;
                                console.log("$scope.service.numbOfLicenceSet:"+$scope.service.numbOfLicenceSet);
                            break;
                            case "remove":
                                $scope.service.numbOfLicenceRemains=$scope.service.numbOfLicenceRemains+1;
                            break;
                        }

                    }
                /***********************************
                *         GET USER BY LICENCE      *
                ************************************/
                    $scope.getUsersByLicenseFn = function(obj){
                        serviceServices.getUsersByLicense(obj).then(function(data){
                            if(data.status==200){
                                $scope.rsList.sysUsers = data.data;
                            }else{
                                $scope.rsList.sysUsers = [];
                            }
                        });
                    };
                /***********************************
                *         GET USER BY Client      *
                ************************************/
                    $scope.getUsersByClientFn = function(obj){
                        serviceServices.getUsersByClient(obj).then(function(response){
                            console.log(response);
                            if(response.status==200){
                                $scope.rsList.sysUsers = response.data.data;
                            }else{
                                $scope.rsList.sysUsers = [];
                            }
                        });
                    };
                /***********************************
                *    SOURCE LICENCE DESTINATION    *
                ************************************/
                    $scope.rsDestinationLicenceListData = {};
                    $scope.getDestinationLicenceListFn = function(){
                        UtilitiesServices.detinationLicense().then(function(data){
                            if(data.status==200){
                            $scope.rsDestinationLicenceListData = data.data;
                            }
                        });
                    };
                /***********************************
                *  LICENCE USER OPERATING SYSTEM   *
                ************************************/
                    $scope.rsTypeOperatingSystemListData = {};
                    $scope.getOperatingSystemListFn = function(){
                        UtilitiesServices.typeOperatingSystem().then(function(data){
                            if(data.status==200){
                            $scope.rsTypeOperatingSystemListData = data.data;
                            }
                        });
                    };
                /***********************************
                *   LICENCE USER SYSTEM SELECTED   *
                ************************************/
                    $scope.list_user_licence=[];
                    $scope.rsJsonUser={};
                    $scope.loadSeletedSysUserFields = function(obj){
                        $scope.rsJsonUser={};
                        $scope.service.users.fullName    = '';
                        $scope.service.users.email       = '';
                        $scope.service.users.phone       = '';
                        $scope.service.users.nameProfile = '';
                        if ($scope.list_user_licence.length>0){
                            for (var key in  $scope.list_user_licence){
                                if ($scope.list_user_licence[key].idUserFk==obj.idUser){
                                inform.add("El usuario: "+obj.fullNameUser+", ya le ha sido asignada una licencia.",{
                                    ttl:5000, type: 'success'
                                });
                                $scope.isSysUserExist=true;
                                break;
                                }else{
                                $scope.isSysUserExist=false;
                                }
                            }
                        }
                        if ($scope.list_user_licence.length==0 || !$scope.isSysUserExist){
                            console.log("$scope.list_user_licence.length: "+$scope.list_user_licence.length);
                            console.log("$scope.isSysUserExist: "+$scope.isSysUserExist);
                            $scope.rsJsonUser=obj;
                            $scope.service.users.idUser                   = obj.idUser;
                            $scope.service.users.fullName                 = obj.fullNameUser;
                            $scope.service.users.email                    = obj.emailUser;
                            $scope.service.users.phone                    = obj.phoneNumberUser;
                            $scope.service.users.nameProfile              = obj.nameProfile;

                            $('#serviceLicenceSecretWord').focus();
                        }else{
                            $scope.service.isSysUser=false;
                            $scope.service.sysUser.selected=undefined;
                            $scope.service.users.fullName    = '';
                            $scope.service.users.email       = '';
                            $scope.service.users.phone       = '';
                            $scope.service.users.nameProfile = '';
                            $scope.rsJsonUser={};
                        }

                    };
                /***********************************
                *        PROCESS LICENCE USER      *
                ************************************/
                    $scope.list_depto_user_licence = [];
                    $scope.list_company_user_licence = [];
                    $scope.list_particular_user_licence = [];
                    $scope.processUserLicenceFn = function(obj, opt){
                        console.log(obj);
                        if (!$scope.service.isUserLicenceEdit && (obj.idUser!=undefined || obj.idUser!=null) && ($scope.rsJsonUser.phoneNumberUser!=obj.phone)){
                            $scope.rsJsonUser.phoneNumberUser=$scope.service.users.phone;
                            console.log($scope.rsJsonUser);
                            $scope.modalConfirmation('updateSysUser', 0, $scope.rsJsonUser);
                        }else if ($scope.service.isUserLicenceEdit && (obj.idUser!=undefined || obj.idUser!=null) && obj.idUser!=obj.idUserFk && ($scope.rsJsonUser.phoneNumberUser!=obj.phone)){
                            $scope.rsJsonUser.phoneNumberUser=$scope.service.users.phone;
                            console.log($scope.rsJsonUser);
                            $scope.modalConfirmation('updateSysUser', 0, $scope.rsJsonUser);
                        }else if ($scope.service.isUserLicenceEdit && (obj.idUser==undefined || obj.idUser==null) && $scope.userLicenceSelected.phone!=obj.phone){
                            for (var usr in $scope.rsList.sysUsers){
                                if ($scope.rsList.sysUsers[usr].idUser == obj.idUserFk){
                                    console.log($scope.rsJsonUser);
                                $scope.modalConfirmation('updateSysUser', 0, $scope.rsList.sysUsers[usr]);
                                break;
                                }
                            }
                        }
                        var idUserFk              = null;
                        var idDepartmentFk        = "";
                        var depto                 = "";
                        var idParticularAddressFk = null;
                        var idDetinationOfLicenseFk = null;
                        var idDepartmentList = null;
                        var userNumbPasswd = obj.userNumbPasswd!=undefined && obj.userNumbPasswd!=null?obj.userNumbPasswd:null;
                        $scope.idClientFkOpt=$scope.service.idClientTypeFk

                        //console.log("Client Type: "+$scope.idClientFkOpt);
                        if ($scope.idClientFkOpt!=null){
                            switch (opt){
                                case "new":
                                case "edit":
                                    if ($scope.service.isSysUser && obj.idUser){
                                        idUserFk          =  obj.idUser;
                                    }else if(($scope.service.isSysUser || !$scope.service.isSysUser) && (obj.idUser==null || obj.idUser==undefined) && obj.idUserFk){
                                        idUserFk          = obj.idUserFk;
                                        $scope.service.isSysUser=true;
                                    }else{
                                        idUserFk          = null;
                                        $scope.service.isSysUser=false;
                                    }
                                    var idListItem            = $scope.list_user_licence.length==0?1:($scope.list_user_licence.length+1);
                                    switch ($scope.idClientFkOpt){
                                        case "1":
                                        case "3":
                                        case "4":
                                        idParticularAddressFk   = null;
                                        idDepartmentFk          = null;
                                        depto                   = null;
                                        idDetinationOfLicenseFk = null;
                                        idDepartmentList        = null;
                                        $scope.list_company_user_licence.push({'idListItem':idListItem, 'idUserFk':idUserFk,'fullName':obj.fullName, 'nameProfile': obj.nameProfile, 'email':obj.email, 'idDetinationOfLicenseFk':idDetinationOfLicenseFk, 'userNumbPasswd': userNumbPasswd, 'idDepartmentList':idDepartmentList, 'idDepartmentFk':idDepartmentFk, 'depto':depto, 'idParticularAddressFk':idParticularAddressFk, 'phone':obj.phone, 'keyword':obj.keyword, 'idOS':obj.idOS, 'profileUser':obj.profileUser});
                                        break;
                                        case "2":
                                        idParticularAddressFk = null;
                                        //console.log("Destination License: "+obj.idDetinationOfLicenseFk);
                                        switch (obj.idDetinationOfLicenseFk){
                                            case "1":
                                                //console.log(obj)
                                                idDepartmentFk          = obj.idDetinationOfLicenseFk=="1" && $scope.service.license_departments.selected!=undefined?$scope.service.license_departments.selected.idDepto:obj.idDepartmentList.idDepto;
                                                depto                   = obj.idDetinationOfLicenseFk=="1" && $scope.service.license_departments.selected!=undefined?$scope.service.license_departments.selected.Depto:obj.idDepartmentList.Depto;
                                                idDetinationOfLicenseFk = obj.idDetinationOfLicenseFk;
                                                idDepartmentList        = $scope.service.license_departments.selected!=undefined?$scope.service.license_departments.selected:obj.idDepartmentList;
                                                $scope.list_depto_user_licence.push({'idListItem':idListItem, 'idUserFk':idUserFk,'fullName':obj.fullName, 'nameProfile': obj.nameProfile, 'email':obj.email, 'idDetinationOfLicenseFk':idDetinationOfLicenseFk, 'userNumbPasswd': userNumbPasswd, 'idDepartmentList':idDepartmentList, 'idDepartmentFk':idDepartmentFk, 'depto':depto, 'idParticularAddressFk':idParticularAddressFk, 'phone':obj.phone, 'keyword':obj.keyword, 'idOS':obj.idOS, 'profileUser':obj.profileUser});
                                                //console.log($scope.list_depto_user_licence);
                                                $scope.loadPagination($scope.list_depto_user_licence, "idDepartmentFk", "7");
                                            break;
                                            case "2":
                                            case "3":
                                                idDepartmentFk          = null;
                                                depto                   = null;
                                                idDetinationOfLicenseFk = obj.idDetinationOfLicenseFk;
                                                idDepartmentList        = null;
                                                $scope.list_company_user_licence.push({'idListItem':idListItem, 'idUserFk':idUserFk,'fullName':obj.fullName, 'nameProfile': obj.nameProfile, 'email':obj.email, 'idDetinationOfLicenseFk':idDetinationOfLicenseFk, 'userNumbPasswd': userNumbPasswd, 'idDepartmentList':idDepartmentList, 'idDepartmentFk':idDepartmentFk, 'depto':depto, 'idParticularAddressFk':idParticularAddressFk, 'phone':obj.phone, 'keyword':obj.keyword, 'idOS':obj.idOS, 'profileUser':obj.profileUser});
                                                //$scope.loadPagination($scope.list_company_user_licence, "idUserFk", "7");
                                                //console.log($scope.list_company_user_licence);
                                            break;
                                        }
                                        break;
                                        case "5":
                                            idDetinationOfLicenseFk = null;
                                            idDepartmentFk          = $scope.service.license_departments.selected!=undefined?$scope.service.license_departments.selected.idDepto:obj.idDepartmentList.idDepto;
                                            depto                   = $scope.service.license_departments.selected!=undefined?$scope.service.license_departments.selected.Depto:obj.idDepartmentList.Depto;
                                            idParticularAddressFk   = obj.idParticularAddressFk
                                            idDepartmentList        = null;
                                            $scope.list_particular_user_licence.push({'idListItem':idListItem, 'idUserFk':idUserFk,'fullName':obj.fullName, 'nameProfile': obj.nameProfile, 'email':obj.email, 'idDetinationOfLicenseFk':idDetinationOfLicenseFk, 'userNumbPasswd': userNumbPasswd, 'idDepartmentList':idDepartmentList, 'idDepartmentFk':idDepartmentFk, 'depto':depto, 'idParticularAddressFk':idParticularAddressFk, 'phone':obj.phone, 'keyword':obj.keyword, 'idOS':obj.idOS, 'profileUser':obj.profileUser});
                                        break;
                                    }
                                    $scope.list_user_licence.push({'idListItem':idListItem, 'idUserFk':idUserFk,'fullName':obj.fullName, 'nameProfile': obj.nameProfile, 'email':obj.email, 'idDetinationOfLicenseFk':idDetinationOfLicenseFk, 'userNumbPasswd': userNumbPasswd, 'idDepartmentList':idDepartmentList, 'idDepartmentFk':idDepartmentFk, 'depto':depto, 'idParticularAddressFk':idParticularAddressFk, 'phone':obj.phone, 'keyword':obj.keyword, 'idOS':obj.idOS, 'profileUser':obj.profileUser});
                                    //console.log($scope.list_user_licence);
                                    $('#serviceLicenceDetails').modal('hide');
                                    if (obj.idUser!=null){$scope.service.sysUser.selected=undefined;};
                                    if (opt=="new"){
                                        inform.add("Licencia ha sido cargada y asignada a "+obj.fullName+" satisfactoriamente.",{
                                        ttl:5000, type: 'success'
                                        });
                                    }
                                    $scope.changeLicencesFn("change");
                                break;
                                case "update":
                                    if ($scope.userLicenceSelected.idDetinationOfLicenseFk==obj.idDetinationOfLicenseFk){
                                        var idUserFk              = $scope.service.isSysUser && (obj.idUser!=undefined || obj.idUser!=null)? obj.idUser : obj.idUserFk;
                                        switch ($scope.idClientFkOpt){
                                        case "1":
                                        case "3":
                                        case "4":
                                            idParticularAddressFk   = null;
                                            idDepartmentFk          = null;
                                            depto                   = null;
                                            idDepartmentList        = null;
                                            idDetinationOfLicenseFk = null;
                                            for (var key in $scope.list_company_user_licence){
                                            if ($scope.list_company_user_licence[key].idListItem == obj.idListItem){
                                                $scope.list_company_user_licence[key].idListItem               = obj.idListItem;
                                                $scope.list_company_user_licence[key].idUserFk                 = idUserFk;
                                                $scope.list_company_user_licence[key].fullName                 = obj.fullName;
                                                $scope.list_company_user_licence[key].nameProfile              = obj.nameProfile;
                                                $scope.list_company_user_licence[key].email                    = obj.email;
                                                $scope.list_company_user_licence[key].idDetinationOfLicenseFk  = idDetinationOfLicenseFk;
                                                $scope.list_company_user_licence[key].idDepartmentFk           = idDepartmentFk
                                                $scope.list_company_user_licence[key].depto                    = depto;
                                                $scope.list_company_user_licence[key].idParticularAddressFk    = idParticularAddressFk;
                                                $scope.list_company_user_licence[key].phone                    = obj.phone;
                                                $scope.list_company_user_licence[key].keyword                  = obj.keyword;
                                                $scope.list_company_user_licence[key].userNumbPasswd           = obj.userNumbPasswd;
                                                $scope.list_company_user_licence[key].idOS                     = obj.idOS;
                                                $scope.list_company_user_licence[key].profileUser              = obj.profileUser;

                                                break;
                                            }
                                            }
                                        break;
                                        case "2":
                                            idParticularAddressFk = null;
                                            switch (obj.idDetinationOfLicenseFk){
                                            case "1":
                                                idDepartmentFk          = obj.idDetinationOfLicenseFk=="1" && obj.idDepartmentFk!=$scope.service.license_departments.selected.idDepto?$scope.service.license_departments.selected.idDepto:obj.idDepartmentFk;
                                                depto                   = obj.idDetinationOfLicenseFk=="1" && obj.depto!=$scope.service.license_departments.selected.Depto?$scope.service.license_departments.selected.Depto:obj.depto;
                                                idDepartmentList        = $scope.service.license_departments.selected!=undefined?$scope.service.license_departments.selected:null;
                                                idDetinationOfLicenseFk = obj.idDetinationOfLicenseFk;
                                                for (var key in $scope.list_depto_user_licence){
                                                if ($scope.list_depto_user_licence[key].idListItem == obj.idListItem){
                                                    $scope.list_depto_user_licence[key].idListItem               = obj.idListItem;
                                                    $scope.list_depto_user_licence[key].idUserFk                 = idUserFk;
                                                    $scope.list_depto_user_licence[key].fullName                 = obj.fullName;
                                                    $scope.list_depto_user_licence[key].nameProfile              = obj.nameProfile;
                                                    $scope.list_depto_user_licence[key].email                    = obj.email;
                                                    $scope.list_depto_user_licence[key].idDetinationOfLicenseFk  = idDetinationOfLicenseFk;
                                                    $scope.list_depto_user_licence[key].idDepartmentFk           = idDepartmentFk
                                                    $scope.list_depto_user_licence[key].depto                    = depto;
                                                    $scope.list_depto_user_licence[key].idDepartmentList         = idDepartmentList;
                                                    $scope.list_depto_user_licence[key].idParticularAddressFk    = idParticularAddressFk;
                                                    $scope.list_depto_user_licence[key].phone                    = obj.phone;
                                                    $scope.list_depto_user_licence[key].keyword                  = obj.keyword;
                                                    $scope.list_depto_user_licence[key].userNumbPasswd           = obj.userNumbPasswd;
                                                    $scope.list_depto_user_licence[key].idOS                     = obj.idOS;
                                                    $scope.list_depto_user_licence[key].profileUser              = obj.profileUser;
                                                    break;
                                                }
                                                }
                                                console.log($scope.list_depto_user_licence);
                                            break;
                                            case "2":
                                            case "3":
                                                idDepartmentFk          = null;
                                                depto                   = null;
                                                idDetinationOfLicenseFk = obj.idDetinationOfLicenseFk;
                                                for (var key in $scope.list_company_user_licence){
                                                if ($scope.list_company_user_licence[key].idListItem == obj.idListItem){
                                                    $scope.list_company_user_licence[key].idListItem               = obj.idListItem;
                                                    $scope.list_company_user_licence[key].idUserFk                 = idUserFk;
                                                    $scope.list_company_user_licence[key].fullName                 = obj.fullName;
                                                    $scope.list_company_user_licence[key].nameProfile              = obj.nameProfile;
                                                    $scope.list_company_user_licence[key].email                    = obj.email;
                                                    $scope.list_company_user_licence[key].idDetinationOfLicenseFk  = idDetinationOfLicenseFk;
                                                    $scope.list_company_user_licence[key].idDepartmentFk           = idDepartmentFk
                                                    $scope.list_company_user_licence[key].depto                    = depto;
                                                    $scope.list_company_user_licence[key].idParticularAddressFk    = idParticularAddressFk;
                                                    $scope.list_company_user_licence[key].phone                    = obj.phone;
                                                    $scope.list_company_user_licence[key].keyword                  = obj.keyword;
                                                    $scope.list_company_user_licence[key].userNumbPasswd           = obj.userNumbPasswd;
                                                    $scope.list_company_user_licence[key].idOS                     = obj.idOS;
                                                    $scope.list_company_user_licence[key].profileUser              = obj.profileUser;
                                                    break;
                                                }
                                                }
                                            break;
                                            }
                                        break;
                                        case "5":
                                            idDetinationOfLicenseFk = null;
                                            idDepartmentFk          = obj.idDepartmentList.idDepto!=undefined?obj.idDepartmentList.idDepto:null;
                                            depto                   = obj.idDepartmentList.Depto!=undefined?obj.idDepartmentList.Depto:null;
                                            idDepartmentList        = $scope.service.license_departments.selected!=undefined?$scope.service.license_departments.selected:null;
                                            idParticularAddressFk   = obj.idParticularAddressFk;
                                            for (var key in $scope.list_particular_user_licence){
                                            if ($scope.list_particular_user_licence[key].idListItem == obj.idListItem){
                                                $scope.list_particular_user_licence[key].idListItem               = obj.idListItem;
                                                $scope.list_particular_user_licence[key].idUserFk                 = idUserFk;
                                                $scope.list_particular_user_licence[key].fullName                 = obj.fullName;
                                                $scope.list_particular_user_licence[key].nameProfile              = obj.nameProfile;
                                                $scope.list_particular_user_licence[key].email                    = obj.email;
                                                $scope.list_particular_user_licence[key].idDetinationOfLicenseFk  = idDetinationOfLicenseFk;
                                                $scope.list_particular_user_licence[key].idDepartmentFk           = idDepartmentFk
                                                $scope.list_particular_user_licence[key].depto                    = depto;
                                                $scope.list_particular_user_licence[key].idDepartmentList         = idDepartmentList;
                                                $scope.list_particular_user_licence[key].idParticularAddressFk    = idParticularAddressFk;
                                                $scope.list_particular_user_licence[key].phone                    = obj.phone;
                                                $scope.list_particular_user_licence[key].keyword                  = obj.keyword;
                                                $scope.list_particular_user_licence[key].idOS                     = obj.idOS;
                                                $scope.list_particular_user_licence[key].profileUser              = obj.profileUser;
                                                break;
                                            }
                                            }
                                        break;
                                        }
                                        for (var key in $scope.list_user_licence){
                                        if ($scope.list_user_licence[key].idListItem == obj.idListItem){
                                            $scope.list_user_licence[key].idListItem               = obj.idListItem;
                                            $scope.list_user_licence[key].idUserFk                 = idUserFk;
                                            $scope.list_user_licence[key].fullName                 = obj.fullName;
                                            $scope.list_user_licence[key].nameProfile              = obj.nameProfile;
                                            $scope.list_user_licence[key].email                    = obj.email;
                                            $scope.list_user_licence[key].idDetinationOfLicenseFk  = idDetinationOfLicenseFk;
                                            $scope.list_user_licence[key].idDepartmentFk           = idDepartmentFk;
                                            $scope.list_user_licence[key].depto                    = depto;
                                            $scope.list_user_licence[key].idDepartmentList         = $scope.service.license_departments.selected!=undefined?$scope.service.license_departments.selected:null;
                                            $scope.list_user_licence[key].idParticularAddressFk    = idParticularAddressFk;
                                            $scope.list_user_licence[key].phone                    = obj.phone;
                                            $scope.list_user_licence[key].keyword                  = obj.keyword;
                                            $scope.list_user_licence[key].userNumbPasswd           = obj.userNumbPasswd;
                                            $scope.list_user_licence[key].idOS                     = obj.idOS;
                                            $scope.list_user_licence[key].profileUser              = obj.profileUser;
                                            break;
                                        }
                                        }
                                        //console.log($scope.list_user_licence);
                                        $('#serviceLicenceDetails').modal('hide');
                                        if (obj.idUser!=null){$scope.service.sysUser.selected=undefined;};
                                            inform.add("Datos de la licencia asignada a "+obj.fullName+" han sido actualizados satisfactoriamente.",{
                                            ttl:5000, type: 'success'
                                            });
                                    }else{
                                        $scope.removeUserLicenceFn($scope.userLicenceSelected);
                                        $timeout(function() {
                                            $scope.processUserLicenceFn(obj, 'new');
                                        }, 500);

                                    }
                                break;
                            }
                        }
                    }
                /***********************************
                *         REMOVE LICENCE USER      *
                ************************************/
                    $scope.removeUserLicenceFn=function(obj){
                        var objItem             = $scope.list_user_licence;
                        var arrItem             = objItem.map(function(i){return i.idListItem;});
                        var indexItem           = arrItem.indexOf(obj.idListItem);
                        $scope.list_user_licence.splice(indexItem, 1);
                        inform.add("Licencia asignada a "+obj.fullName+" ha sido removida correctamente.",{
                            ttl:5000, type: 'danger'
                        });
                        for (var key in $scope.list_depto_user_licence){
                            if ($scope.list_depto_user_licence[key].idListItem == obj.idListItem){
                            var objItem             = $scope.list_depto_user_licence;
                            var arrItem             = objItem.map(function(i){return i.idListItem;});
                            var indexItem           = arrItem.indexOf(obj.idListItem);
                            $scope.list_depto_user_licence.splice(indexItem, 1);
                            $scope.loadPagination($scope.list_depto_user_licence, "idDepartmentFk", "7");
                            break;
                            }
                        }
                        for (var key in $scope.list_company_user_licence){
                            if ($scope.list_company_user_licence[key].idListItem == obj.idListItem){
                            var objItem             = $scope.list_company_user_licence;
                            var arrItem             = objItem.map(function(i){return i.idListItem;});
                            var indexItem           = arrItem.indexOf(obj.idListItem);
                            $scope.list_company_user_licence.splice(indexItem, 1);
                            break;
                            }
                        }
                        for (var key in $scope.list_particular_user_licence){
                            if ($scope.list_particular_user_licence[key].idListItem == obj.idListItem){
                            var objItem             = $scope.list_particular_user_licence;
                            var arrItem             = objItem.map(function(i){return i.idListItem;});
                            var indexItem           = arrItem.indexOf(obj.idListItem);
                            $scope.list_particular_user_licence.splice(indexItem, 1);
                            break;
                            }
                        }
                        console.log($scope.list_depto_user_licence);
                        console.log($scope.list_company_user_licence);
                        console.log($scope.list_particular_user_licence);
                        console.log($scope.list_user_licence);
                        $scope.changeLicencesFn("remove");
                    }

            /**************************************************
            *                                                 *
            *             ALARM SERVICE FUNCTIONS             *
            *                                                 *
            **************************************************/
                /***********************************
                *  LOADING ADITIONAL WINDOWS FORM  *
                ************************************/
                    $scope.compServiceAlarmDetailsFn=function(){
                        $('#serviceAlarmDetails').modal({backdrop: 'static', keyboard: false});
                        if ($scope.isNewCustomerService){
                        $scope.service.aditional_alarm.sysUser={'selected':undefined};
                        }
                    }
                /***********************************
                *      GET TYPE ALARM CLIENT       *
                ************************************/
                    $scope.rsTypeAlarmClientListData = {};
                    $scope.getTypeAlarmClientListFn = function(){
                        UtilitiesServices.typeAlarmClientList().then(function(response){
                        if(response.status==200){
                            $scope.rsTypeAlarmClientListData = response.data;
                        }
                        });
                    };$scope.getTypeAlarmClientListFn();
                /***********************************
                *        GET CONNECTION TYPE       *
                ************************************/
                    $scope.rsTypeConnectionListData = {};
                    $scope.getTypeConnectionListFn = function(){
                        UtilitiesServices.typeConnectionList().then(function(response){
                        if(response.status==200){
                            $scope.rsTypeConnectionListData = response.data;
                            console.log($scope.rsTypeConnectionListData);
                        }
                        });
                    };
                /***********************************
                *      ALARM SERVICE ADITIONALS    *
                ************************************/
                    $scope.rsAlarmServiceAditionalsListData = {};
                    $scope.getAlarmServiceAditionalsListFn = function(){
                        UtilitiesServices.alarmServicesAditionalsList().then(function(response){
                        if(response.status==200){
                            $scope.rsAlarmServiceAditionalsListData = response.data;
                        }
                        });
                    };$scope.getAlarmServiceAditionalsListFn();
                /***********************************
                *       TRASMISSION FORMAT         *
                ************************************/
                    $scope.rsTransmissionFormatListData = {};
                    $scope.getTransmissionFormatListFn = function(){
                        UtilitiesServices.transmissionFormatList().then(function(response){
                        if(response.status==200){
                            $scope.rsTransmissionFormatListData = response.data;
                        }
                        });
                    };$scope.getTransmissionFormatListFn();
                /***********************************
                *    LOADING PEOPLE WINDOWS FORM   *
                ************************************/
                    $scope.list_people_notice=[];
                    $scope.list_people_verify=[];
                    $scope.isSysUserExist=false;
                    $scope.loadServicePeopleWindowFn=function(obj, opt){
                        $scope.service.people={};
                        switch (opt){
                        //PERSONAS PARA DAR AVISO
                        case "getnotice":
                            if ($scope.service.aditional_alarm.isSysPeopleNoticeUser){
                            if ($scope.list_people_notice.length>0){
                                for (var key in  $scope.list_people_notice){
                                if ($scope.list_people_notice[key].fk_idUserSystema==obj.idUser){
                                    inform.add("El usuario: "+obj.fullNameUser+", ya se encuentra agregado.",{
                                    ttl:5000, type: 'success'
                                    });
                                    $scope.isSysUserExist=true;
                                    break;
                                }else{
                                    $scope.isSysUserExist=false;
                                }
                                }
                            }
                            if (!$scope.isSysUserExist){
                                console.log("$scope.isSysUserExist: "+$scope.isSysUserExist);
                                $('#servicePeopleDetails').modal({backdrop: 'static', keyboard: false});
                                $scope.service.people.nombre_apellido=obj.fullNameUser;
                                $scope.service.people.telefono=obj.phoneNumberUser;
                                $scope.service.people.idUser=obj.idUser;
                            }
                            }else{
                            $('#servicePeopleDetails').modal({backdrop: 'static', keyboard: false});
                            $scope.service.people.nombre_apellido='';
                            $scope.service.people.telefono='';
                            }
                            $scope.service.people.tittle="Personas para dar aviso";
                            $scope.service.people.opt="getnotice";
                        break;
                        //PERSONAS PARA VERIFICAR EN EL LUGAR
                        case "verifyplace":
                            if ($scope.service.aditional_alarm.isSysPeopleVerifyUser){
                            if ($scope.list_people_verify.length>0){
                                for (var key in  $scope.list_people_verify){
                                if ($scope.list_people_verify[key].fk_idUserSystema==obj.idUser){
                                    inform.add("El usuario: "+obj.fullNameUser+", ya se encuentra agregado.",{
                                    ttl:5000, type: 'success'
                                    });
                                    $scope.isSysUserExist=true;
                                    break;
                                }else{
                                    $scope.isSysUserExist=false;
                                }
                                }
                            }
                            if (!$scope.isSysUserExist){
                                //console.log("$scope.isSysUserExist: "+$scope.isSysUserExist);
                                $('#servicePeopleDetails').modal({backdrop: 'static', keyboard: false});
                                $scope.service.people.nombre_apellido=obj.fullNameUser;
                                $scope.service.people.telefono=obj.phoneNumberUser;
                                $scope.service.people.idUser=obj.idUser;
                            }
                            }else{
                            $('#servicePeopleDetails').modal({backdrop: 'static', keyboard: false});
                            $scope.service.people.nombre_apellido='';
                            $scope.service.people.telefono='';
                            }
                            $scope.service.people.tittle="Personas para verificar en el lugar";
                            $scope.service.people.opt="verifyplace";
                        break;
                        }
                        $scope.service.people.action="new";
                    }
                /***********************************
                *     ADDING PEOPLE DATA DETAILS   *
                ************************************/
                    $scope.addServicePeopleUserDetailsFn=function(obj, opt){
                        //console.log(obj);
                        switch (opt){
                        case "getnotice":
                            var idUser = $scope.service.aditional_alarm.isSysPeopleNoticeUser?obj.idUser:null;
                            var numero_del_usuario = obj.numero_del_usuario==null || obj.numero_del_usuario==undefined?null:obj.numero_del_usuario;
                            if (idUser!=null){$scope.service.aditional_alarm.sysPeopleNoticeUser.selected=undefined;};
                            var itemNumber=($scope.list_people_notice.length+1)
                            $scope.list_people_notice.push({'id':itemNumber, 'fk_idUserSystema':idUser,'nombre_apellido':obj.nombre_apellido, 'vinculo':obj.vinculo, 'palabra_clave':obj.palabra_clave, 'telefono':obj.telefono, 'numero_del_usuario':numero_del_usuario, 'opt':'getnotice'});
                            //console.log($scope.list_people_notice);
                        break;
                        case "verifyplace":
                            var idUser = $scope.service.aditional_alarm.isSysPeopleVerifyUser?obj.idUser:null;
                            var numero_del_usuario = obj.numero_del_usuario==null || obj.numero_del_usuario==undefined?null:obj.numero_del_usuario;
                            if (idUser!=null){$scope.service.aditional_alarm.sysPeopleVerifyUser.selected=undefined;};
                            var itemNumber=($scope.list_people_verify.length+1)
                            $scope.list_people_verify.push({'id':itemNumber, 'fk_idUserSystema':idUser,'nombre_apellido':obj.nombre_apellido, 'vinculo':obj.vinculo, 'telefono':obj.telefono, 'numero_del_usuario':numero_del_usuario, 'opt':'verifyplace'});
                            //console.log($scope.list_people_verify);
                        break;
                        }
                        $('#servicePeopleDetails').modal('hide');

                        inform.add("Persona de contacto: "+obj.nombre_apellido+" ha sido cargado correctamente.",{
                            ttl:5000, type: 'success'
                        });
                    }
                /***********************************
                *     LOADING PEOPLE DATA DETAILS  *
                ************************************/
                    $scope.loadServicePeopleUserDetailsFn=function(obj, opt){
                        //console.log(obj);
                        switch (opt){
                        case "getnotice":
                            $scope.service.people={};
                            $scope.service.people=obj;
                            $scope.service.people.tittle="Personas para dar aviso";
                            $scope.service.people.opt="getnotice";
                        break;
                        case "verifyplace":
                            $scope.service.people={};
                            $scope.service.people=obj;
                            $scope.service.people.tittle="Personas para verificar en el lugar";
                            $scope.service.people.opt="verifyplace";
                        break;
                        }
                        $scope.service.people.action="update";
                        $('#servicePeopleDetails').modal('show');

                    }
                /***********************************
                *     UPDATE PEOPLE DATA DETAILS   *
                ************************************/
                    $scope.updateServicePeopleUserDetailsFn=function(obj, opt){
                        //console.log(obj);
                        switch (opt){
                        case "getnotice":
                            for (var people in $scope.list_people_notice){
                            if ($scope.list_people_notice[people].id==obj.id){
                                var numero_del_usuario = obj.numero_del_usuario==null || obj.numero_del_usuario==undefined?null:obj.numero_del_usuario;
                                $scope.list_people_notice[people].fk_idUserSystema    = obj.fk_idUserSystema;
                                $scope.list_people_notice[people].nombre_apellido     = obj.nombre_apellido;
                                $scope.list_people_notice[people].vinculo             = obj.vinculo;
                                $scope.list_people_notice[people].palabra_clave       = obj.palabra_clave;
                                $scope.list_people_notice[people].telefono            = obj.telefono;
                                $scope.list_people_notice[people].numero_del_usuario  = numero_del_usuario;
                                $scope.list_people_notice[people].opt                 = "getnotice";
                            }
                            }
                            //console.log($scope.list_people_notice);
                        break;
                        case "verifyplace":
                            var idUser = $scope.service.aditional_alarm.isSysPeopleVerifyUser?obj.idUser:null;
                            var numero_del_usuario = obj.numero_del_usuario==null || obj.numero_del_usuario==undefined?null:obj.numero_del_usuario;
                            if (idUser!=null){$scope.service.aditional_alarm.sysPeopleVerifyUser.selected=undefined;};
                            $scope.list_people_verify.push({'fk_idUserSystema':idUser,'nombre_apellido':obj.nombre_apellido, 'vinculo':obj.vinculo, 'telefono':obj.telefono, 'numero_del_usuario':numero_del_usuario, 'opt':'verifyplace'});
                            //console.log($scope.list_people_verify);
                        break;
                        }
                        $('#servicePeopleDetails').modal('hide');

                        inform.add("Persona de contacto: "+obj.nombre_apellido+" ha sido actualizado correctamente.",{
                            ttl:5000, type: 'success'
                        });
                    }
                /***********************************
                *     REMOVE PEOPLE DATA DETAILS   *
                ************************************/
                    $scope.removeServicePeopleUserDetailsFn = function (obj) {

                        let list;

                        switch (obj.opt) {
                            case "getnotice":
                                list = $scope.list_people_notice;
                                break;

                            case "verifyplace":
                                list = $scope.list_people_verify;
                                break;

                            default:
                                return;
                        }

                        const index = list.findIndex(item => item.id === obj.id);

                        if (index === -1) {
                            console.warn('No se encontró el elemento a eliminar', obj);
                            return;
                        }

                        list.splice(index, 1);

                        inform.add(
                            "Persona de contacto: " + obj.nombre_apellido + " ha sido removido correctamente.",
                            { ttl: 5000, type: 'success' }
                        );
                    };
                /***********************************
                *     LOAD USER PHONE NUMBER       *
                ************************************/
                    $scope.loadUserPhoneNumberFn = function(obj){
                        if (obj!=undefined){
                        inform.add("El Encargado: "+obj.fullNameUser+" ha sido seleccionado como responsable.",{
                            ttl:5000, type: 'success'
                        });
                        $scope.service.aditional_alarm.telefono='';
                        if (obj.phoneNumberUser){
                            $scope.service.aditional_alarm.telefono=obj.phoneNumberUser;
                        }else if(obj.phoneLocalNumberUser){
                            $scope.service.aditional_alarm.telefono=obj.phoneLocalNumberUser;
                        }else{
                            inform.add("El Encargado: "+obj.fullNameUser+" no posee telefonos registrados.",{
                                ttl:5000, type: 'warning'
                            });
                            $('#serviceAlarmPhone').focus();
                        }
                        }else{
                        $scope.service.aditional_alarm.telefono='';
                        inform.add("La información del Encargado ha sido removida de los datos adicionales del Servicio.",{
                            ttl:5000, type: 'info'
                        });
                        }
                    }
                /***********************************
                *    ADD ADITIONAL DATA DETAILS    *
                ************************************/
                    $scope.aditional_alarm=null;
                    $scope.addAditionalAlarmFn = function(obj){
                        $scope.aditional_alarm=[];
                        $scope.aditional_alarm.push({'franjas_horarias':{}, 'personas_para_dar_aviso':{}, 'personas_para_verificar_en_el_lugar':{}, 'fk_idServiciosAdicionales':{}});
                        $scope.orderScheduleTimeFn($scope.list_schedule_atention);
                        $scope.aditional_alarm[0]=obj;
                        //console.log($scope.aditional_alarm);
                        $scope.aditional_alarm[0].fk_idEncargado                        = $scope.service.aditional_alarm.sysUser.selected!=undefined && $scope.service.isSysUser?$scope.service.aditional_alarm.sysUser.selected.idUser:null;
                        $scope.aditional_alarm[0].franjas_horarias                      = $scope.list_schedule_time_orderBy;
                        $scope.aditional_alarm[0].personas_para_dar_aviso               = $scope.list_people_notice;
                        $scope.aditional_alarm[0].personas_para_verificar_en_el_lugar   = $scope.list_people_verify;
                        $scope.aditional_alarm[0].fk_idServiciosAdicionales             = $scope.aditional_service_alarm!=undefined && $scope.aditional_service_alarm.length>0?$scope.aditional_service_alarm:null;
                        $scope.aditional_alarm[0].observacion_general                   = obj.observacion_general==undefined || obj.observacion_general=='' || obj.observacion_general==null?null:obj.observacion_general;
                        $scope.aditional_alarm[0].typeOfClient_others                   = obj.typeOfClient_others==undefined || obj.typeOfClient_others=='' || obj.typeOfClient_others==null?null:obj.typeOfClient_others;
                        $scope.aditional_alarm[0].nombresEncargadoManual                = obj.nombresEncargadoManual==undefined || obj.nombresEncargadoManual=='' || obj.nombresEncargadoManual==null?null:obj.nombresEncargadoManual;
                        console.log($scope.aditional_alarm);
                        $("#serviceAlarmDetails").modal('hide');
                    }
                /***********************************
                *    ADD ADITIONAL SERVICES ID's   *
                ************************************/
                    $scope.aditional_service_alarm = [];
                    $scope.compAlarmServiceAditionalFn = function(item, value){
                        console.log("checkbox "+value+" is checked: "+item);
                        if (item){
                        $scope.aditional_service_alarm.push(value);
                        }else{
                        var objItem             = $scope.aditional_service_alarm;
                        var arrItem             = objItem.map(function(i){return i;});
                        var indexItem           = arrItem.indexOf(value);
                        $scope.aditional_service_alarm.splice(indexItem, 1);
                        }
                        console.log($scope.aditional_service_alarm);
                    }
                /***********************************
                *    LOAD ALARM MODULE CONEXION    *
                ************************************/
                    $scope.moduleConnectionType=null;
                    $scope.compServiceModuleConnectionDetailsFn=function(item, opt){
                        console.log(item);
                        $scope.service.module={
                                        'ipAlarmModule':{'selected':undefined},
                                        'gprsAlarmModule':{'selected':undefined},
                        };
                        if (item){
                        $scope.service.module.details=false;
                        $("#serviceModuleConnectionDetails").modal({backdrop: 'static', keyboard: false});
                            $scope.moduleConnectionType=opt;
                        $('#serviceModuleConnectionDetails').on('shown.bs.modal', function () {
                            if (item==true && $scope.moduleConnectionType=="1"){
                            $('#serviceCompaniaTelf').focus();
                            if ($scope.isUpdateCustomerService){$scope.service.update.idTipoConexionRemoto="1";}
                            }else if (item==true && $scope.moduleConnectionType=="2"){
                            $('#serviceIpAlarmModule').focus();
                            if ($scope.isUpdateCustomerService){$scope.service.update.idTipoConexionRemoto="2";}
                            }else if (item==true && $scope.moduleConnectionType=="3"){
                            $('#serviceGprsAlarmModule').focus();
                            if ($scope.isUpdateCustomerService){$scope.service.update.idTipoConexionRemoto="3";}
                            }
                        });
                        }else{
                        $scope.addServiceModuleConnectionDetailsFn(opt, 'remove', '');
                        }
                    }
                /***********************************
                *    GET ALARM MODULE CONEXION     *
                ************************************/
                    $scope.tipo_conexion_remoto=[];
                    $scope.addServiceModuleConnectionDetailsFn=function(obj, moduleType, opt){
                        switch (moduleType){
                        case "1"://Línea Telefónica
                            switch (opt){
                            case "new":
                                $scope.tipo_conexion_remoto.push({'idTipoConexionRemoto':moduleType,'data':obj});
                                if ($scope.isUpdateCustomerService){$scope.service.update.idTipoConexionRemoto=moduleType;}
                                console.log($scope.tipo_conexion_remoto);
                                $("#serviceModuleConnectionDetails").modal('hide');
                            break;
                            }
                        break;
                        case "2"://Módulo IP
                            switch (opt){
                            case "new":
                                $scope.tipo_modulo_ip=[];
                                $scope.tipo_modulo_ip.push({'data':{}});
                                //Remove the GPRS Details from list_productsDetails array
                                /*if (obj.gprsAlarmModule.selected!=undefined){
                                for (var item in $scope.list_productsDetails){
                                    if (obj.gprsAlarmModule.selected.idProduct==$scope.list_productsDetails[item].idProductoFk && $scope.list_productsDetails[item].idProductDetail!=null){
                                    $scope.removeProductDetailsFn(obj.gprsAlarmModule.selected, $scope.list_productsDetails[item].idProductDetail, '');
                                    break;
                                    }
                                }
                                }*/
                                $scope.tipo_modulo_ip[0].data                  = obj;
                                $scope.tipo_modulo_ip[0].data.moduleIp         = obj.ipAlarmModule.selected.idProduct;
                                $scope.tipo_modulo_ip[0].idTipoConexionRemoto  = moduleType;
                                $scope.tipo_conexion_remoto.push($scope.tipo_modulo_ip[0]);
                                if ($scope.isUpdateCustomerService){$scope.service.update.idTipoConexionRemoto=moduleType;}
                                console.log($scope.tipo_conexion_remoto);
                                $("#serviceModuleConnectionDetails").modal('hide');
                            break;
                            }
                        break;
                        case "3"://Módulo GPRS
                            switch (opt){
                            case "new":
                                $scope.tipo_modulo_gprs=[];
                                $scope.tipo_modulo_gprs.push({'data':{}});
                                /*if (obj.ipAlarmModule.selected!=undefined){
                                for (var item in $scope.list_productsDetails){
                                    if (obj.ipAlarmModule.selected.idProduct==$scope.list_productsDetails[item].idProductoFk && $scope.list_productsDetails[item].idProductDetail!=null){
                                    $scope.removeProductDetailsFn(obj.ipAlarmModule.selected, $scope.list_productsDetails[item].idProductDetail, '');
                                    break;
                                    }
                                }
                                }*/
                                $scope.tipo_modulo_gprs[0].data                  = obj;
                                $scope.tipo_modulo_gprs[0].data.moduleGprs       = obj.gprsAlarmModule.selected.idProduct;
                                $scope.tipo_modulo_gprs[0].idTipoConexionRemoto  = moduleType;
                                $scope.tipo_conexion_remoto.push($scope.tipo_modulo_gprs[0]);
                                if ($scope.isUpdateCustomerService){$scope.service.update.idTipoConexionRemoto=moduleType;}
                                console.log($scope.tipo_conexion_remoto);
                                $("#serviceModuleConnectionDetails").modal('hide');
                            break;
                            }
                        break;
                        case "edit":
                            for (var item in $scope.tipo_conexion_remoto){
                            if(obj.idTipoConexionRemoto ==  $scope.tipo_conexion_remoto[item].idTipoConexionRemoto){
                                $scope.tipo_conexion_remoto[item].data=obj;
                                if(obj.idTipoConexionRemoto=="2"){$scope.tipo_conexion_remoto[item].data.moduleIp   = obj.ipAlarmModule.selected.idProduct;}
                                if(obj.idTipoConexionRemoto=="3"){$scope.tipo_conexion_remoto[item].data.moduleGprs = obj.gprsAlarmModule.selected.idProduct;}
                                $scope.tipo_conexion_remoto[item].idTipoConexionRemoto=obj.idTipoConexionRemoto;
                                console.log($scope.tipo_conexion_remoto);
                                $("#serviceModuleConnectionDetails").modal('hide');
                                break;
                            }
                            }
                        break;
                        case "details":
                            for (var item in $scope.tipo_conexion_remoto){
                            if(obj.idTipoConexionRemoto ==  $scope.tipo_conexion_remoto[item].idTipoConexionRemoto){
                                $scope.service.module                        = $scope.tipo_conexion_remoto[item].data;
                                $scope.service.module.ipAlarmModule          = $scope.service.module.ipAlarmModule==undefined?{'selected':undefined}:$scope.service.module.ipAlarmModule;
                                $scope.service.module.gprsAlarmModule        = $scope.service.module.gprsAlarmModule==undefined?{'selected':undefined}:$scope.service.module.gprsAlarmModule;
                                $scope.service.module.details                = true;
                                $scope.service.module.idTipoConexionRemoto   = $scope.tipo_conexion_remoto[item].idTipoConexionRemoto;
                                $scope.moduleConnectionType                  = $scope.tipo_conexion_remoto[item].idTipoConexionRemoto;
                                console.log($scope.service.module);
                                break;
                            }
                            }
                            $("#serviceModuleConnectionDetails").modal({backdrop: 'static', keyboard: false});
                        break;
                        case "remove":
                            if ($scope.tipo_conexion_remoto.length>0){
                                var objItem             = $scope.tipo_conexion_remoto;
                                var arrItem             = objItem.map(function(i){return i.idTipoConexionRemoto;});
                                var indexItem           = arrItem.indexOf(obj.idTipoConexionRemoto);
                                //console.log(indexItem);
                                $scope.tipo_conexion_remoto.splice(indexItem, 1);
                                inform.add("Tipo de conexion remoto ha sido removido correctamente.",{
                                ttl:5000, type: 'warning'
                                });
                                console.log($scope.tipo_conexion_remoto);
                            }
                        break;
                        }
                    }
                /***********************************
                *       ADD ALARM SENSOR ZONE      *
                ************************************/
                    $scope.alarmSensorZoneFn = function(obj, opt){
                        switch (opt){
                        case "new":
                            console.log($scope.service.sensor.selected);
                            var idDvrFk          = $scope.service.dvr.selected!=undefined?$scope.service.dvr.selected.idProduct:null;
                            var dvrSelected      = $scope.service.dvr.selected!=undefined?$scope.service.dvr.selected:null;
                            var idCameraFk       = obj.zoneCameras!=undefined?obj.zoneCameras.idCamera:null;
                            var portCamera       = obj.zoneCameras!=undefined?obj.zoneCameras.portCamera:null;
                            var idSensorFk       = $scope.service.sensor.selected.idProduct;
                            var sensorSelected   = $scope.service.sensor.selected;
                            var nroZoneTamper    = obj.nroZoneTamper==undefined || obj.nroZoneTamper==null?null:obj.nroZoneTamper
                            var isWirelessSensor = obj.isWireless?1:0;
                            $scope.list_sensors.push({'idSensor':idSensorFk,'sensorDetails':sensorSelected,'numberZoneSensor':obj.zoneNumber,'area':obj.areaCovered, 'nroZoneTamper':nroZoneTamper, 'isWirelessSensor':isWirelessSensor,'locationLon':obj.zoneLocation, 'idDvr':idDvrFk, 'dvrDetails':dvrSelected, 'idCameraFk':idCameraFk, 'portCamera':portCamera, 'nroInterno':obj.internalSerialNumber, 'nroFrabric':obj.fabricSerialNumber});
                            //console.log($scope.list_sensors);
                            $("#serviceModuleZonesDetails").modal('hide');
                        break;
                        case "load_details":
                            $scope.service.sensor.detail={};
                            //console.log(obj)
                            $scope.service.dvr.selected=undefined;
                            $scope.service.sensor.detail=obj;
                            if (obj.isWirelessSensor==1){
                                $scope.service.sensor.detail.isWireless=true;
                            }else{
                                $scope.service.sensor.detail.isWireless=false;
                            }
                            console.log($scope.service.sensor.detail);
                            $scope.service.dvr.selected=obj.dvrDetails
                            $("#loadSelectedZoneDetails").modal({backdrop: 'static', keyboard: false});
                            $('#loadSelectedZoneDetails').on('shown.bs.modal', function () {
                                $('#close_window').focus();
                            });
                            $scope.createPortList("all");
                        break;
                        case "update":
                        break;
                        case "remove":
                            //console.log(obj);
                            var objItem             = $scope.list_sensors;
                            var arrItem             = objItem.map(function(i){return i.numberZoneSensor;});
                            var indexItem           = arrItem.indexOf(obj.numberZoneSensor);
                            //console.log(indexItem);
                            $scope.list_sensors.splice(indexItem, 1);
                            inform.add("Sensor: ("+obj.brand+") de la Zona N° "+obj.numberZoneSensor+" ha sido removido correctamente.",{
                            ttl:5000, type: 'warning'
                            });
                        break;
                        }
                    }
                /***********************************
                *       ADD ALARM SENSOR ZONE      *
                ************************************/
                    $scope.zoneFilter = function(item){
                        return $scope.service.sensor.zones.zoneNumber!=item.tamper;
                    }
});
