/**
* Management Controller
**/
var mgmt = angular.module("module.Management", ["tokenSystem", "services.Keys", "services.Address", "services.Ticket", "services.Departments", "services.Contracts",  "services.Utilities", "services.Customers", "angular.filter", "services.User"]);

/*************************************************/
mgmt.filter('commaToDecimal', function(){
    return function(value) {
        return value ? parseFloat(value).toFixed(2).toString().replace('.', ',') : null;
    };
});
mgmt.filter('startFrom', function () {
  return function (input, start) {
    if (input) {
      start = +start;
      return input.slice(start);
    }
    return [];
  };
});
mgmt.filter('toDate', function() {
  return function(items) {
    return new Date(items);
  };
});
mgmt.filter('capitalize', function() {
  return function(input) {
    if (input && typeof input === 'string') {
      return input.charAt(0).toUpperCase() + input.slice(1);
    }
    return input;
  };
});
mgmt.run(function ($rootScope) {
  function triggerResize() {
    setTimeout(function () {
        $(window).trigger('resize');
    }, 100);
  }
  $rootScope.$on('$locationChangeSuccess', function () {
      triggerResize();
  });
});
mgmt.controller('MgmtCtrl', function($scope, $rootScope, $http, $location, $routeParams, $q, blockUI, $timeout, inform, ticketServices, KeysServices, DepartmentsServices, serviceServices, ContractServices, UtilitiesServices, addressServices, userServices, CustomerServices, tokenSystem, $window, $filter, serverHost, serverBackend, serverHeaders, APP_SYS){
  console.log(APP_SYS.app_name+" Modulo Gestion de pedidos");
    //console.log($scope.sysLoggedUser)
    //console.log($scope.sysToken)
    if (!$scope.sysToken || !$scope.sysLoggedUser ){
      $location.path("/login");
    }
    const sysDate = new Date();
    const fullSysDate = sysDate.toLocaleString('es-AR', { day: 'numeric', month: 'numeric', year:'numeric' });

    //currentMoney.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' });
    const sysYear         = sysDate.toLocaleString('es-AR', { year: 'numeric'});
    const sysMonth        = sysDate.toLocaleString('es-AR', { month: 'numeric'});
    const sysMonth2Digit  = String(sysDate.getMonth() + 1).padStart(2, '0');
    const sysDay          = sysDate.toLocaleString('es-AR', { day: 'numeric'});
    const regexProtocol = /^(https?:\/\/)/;
    const regexPort = /:(\d+)$/;
    $scope.filterAddressKf = {'selected':undefined};
    $scope.filterCompanyKf = {'selected':undefined};
      $scope.listTickt = 0;
      $scope.filters={typeClient:'', typeTicket: '', topDH: '', searchFilter:'', idCompany: '', idAddress: '', ticketStatus: ''};
      $scope.functions={'isKeysEnable': false, 'whereKeysAreEnable': null};
      $scope.dh = {'filterAddress': '', 'filterSearch': '', 'filterTop': '', 'filterProfile':'', 'filterTenantKf':''};
      $scope.ticket = {'administration':undefined, 'keysMethod':{'name':undefined}, 'building':undefined, 'idClientDepartament':undefined, 'radioButtonDepartment':undefined, 'radioButtonBuilding':undefined, 'optionTypeSelected': {}, 'keysMethod':{}, 'userRequestBy':{}, 'userNotify':null, 'keys':[], 'delivery':{'idTypeDeliveryKf':null, 'whoPickUp':null, 'zone':{}, 'thirdPerson':null, 'deliveryTo':{}, 'otherAddress':undefined}, 'cost':{'keys':0, 'delivery':0, 'service':0, 'total':0}};
      $scope.getCostByCustomer={'rate':{'idCustomer':null, 'idServiceType':null, 'idServiceTechnician':null}};
      $scope.costs={'keys':{'cost':0, 'manual':false}, 'delivery':{'cost':0, 'manual':false}, 'service':{'cost':0, 'manual':false}, 'total':0};
      $scope.customerSearch={'name':'','searchFilter':'', 'typeClient':'', 'isInDebt':false, 'isStockInBuilding': false, 'isStockInOffice': false, 'strict':false};
      $scope.keyTotalAllowed=50000;
      $scope.deliveryCostFree=0;
      $scope.update={'ticket':{}, 'user':{}};
      $scope.tmpKey={'new':{}};
      $scope.select={'checkList':{'selected':undefined}};
      /*DATE PICKER*/
      $scope.formats = ['dd-MM-yyyy', 'dd/MM/yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
      $scope.format = $scope.formats[1];
      $scope.altInputFormats = ['M!/d!/yyyy'];
      $scope.changeStatusTicketSingle=false;
      $scope.changeStatusTicketMulti=false;
      $scope.selectedTicketList = [];
      $scope.pagination = {
        'maxSize': 5,     // Limit number for pagination display number.
        'totalCount': 0,  // Total number of items in all pages. initialize as a zero
        'pageIndex': 1,   // Current page number. First page is 1.-->
        'pageSizeSelected': 100, // Maximum number of items per page.
        'totalCount':0
      }
      $scope.open1 = function() {
        $scope.popup1.opened = true;
      };
      $scope.popup1 = {
        opened: false
      };
      $scope.open2 = function() {
        $scope.popup2.opened = true;
      };
      $scope.popup2 = {
        opened: false
      };
      $scope.open3 = function() {
        $scope.popup3.opened = true;
      };
      $scope.popup3 = {
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
      $scope.open6 = function() {
        $scope.popup6.opened = true;
      };
      $scope.popup6 = {
        opened: false
      };
      $scope.events =
        {
          status: 'full'
        };
      $scope.getCreatedDayClass = function(date, mode) {
        //console.log($scope.listTickt);
        if (mode === 'day') {
          var dayToCheck = new Date(date).setHours(0,0,0,0);
          //console.log(new Date(date));
          for (var ticket in $scope.listTickt){
            var currentDay = new Date($scope.listTickt[ticket].created_at).setHours(0,0,0,0);
            //if ($scope.listTickt[ticket].idTicket=="306"){
            //  console.log(new Date($scope.listTickt[ticket].created_at));
            //}
            if (dayToCheck === currentDay) {
              //console.log(new Date($scope.listTickt[ticket].created_at));
              return 'full';
            }
          }
        }
        return '';
      }
      $scope.getDeliveredDayClass = function(date, mode) {
        //console.log($scope.listTickt);
        if (mode === 'day') {
          var dayToCheck = new Date(date).setHours(0,0,0,0);
          console.log(new Date(date));
          for (var ticket in $scope.listTickt){
            var currentDay = new Date($scope.listTickt[ticket].delivered_at).setHours(0,0,0,0);
            //if ($scope.listTickt[ticket].idTicket=="306"){
            //  console.log(new Date($scope.listTickt[ticket].delivered_at));
            //}
            if (dayToCheck === currentDay) {
              console.log(new Date($scope.listTickt[ticket].delivered_at));
              return 'full';
            }
          }
        }
        return '';
      }
    /*******************************************
    *    UPDATE PAYMENT DETAILS NEW REQUEST    *
    ********************************************/
     $scope.updatePaymentFn = function(payment){
      $scope.updatePaymentDetails = null;
      ticketServices.updatePayment(payment).then(function(response){
          console.log(response);
          if(response.status==200){
              console.log("Actualización de pago realizado satisfactoriamente");
              inform.add('Pago actualizado Satisfactoriamente. ',{
                    ttl:5000, type: 'success'
              });
              $scope.updatePaymentDetails = response.data.response[0];
              console.log($scope.updatePaymentDetails);
          }else if(response.status==500){
              $scope.updatePaymentDetails = null;
              console.log("Payment updating failed, contact administrator");
              inform.add('Error: [500] Contacta al area de soporte. ',{
                    ttl:5000, type: 'danger'
              });
          }
      });
    };

    $('.clickable-header').on('click', function (event) {
      // Prevent the default behavior (if it's an anchor tag)
      event.preventDefault();

      // Get the target collapse element from the data-target attribute
      var target = $(this).attr('data-target');

      // Manually toggle the collapse state using Bootstrap's collapse method
      $(target).collapse('toggle');
    });
    /************************************************************
    *                                                           *
    *   PARAMETER TO RECEIVED THE PAYMENT FROM MERCADO PAGO     *
    *                                                           *
    ************************************************************/
        //PARAMETERS SENT BY MERCADO PAGO AFTER THE PAYMENT
        //collection_id=1312069211
        //collection_status=approved
        //payment_id=1312069211
        //status=approved
        //external_reference=5600713224_6698484756
        //payment_type=credit_card
        //merchant_order_id=7425566493
        //preference_id=1177407195-2d407fa5-b370-48a3-88fa-83a870321138
        //site_id=MLA
        //processing_mode=aggregator
        //merchant_account_id=null
        /* USAGE: /login/auth/ticket/id/tokenId/token/secureToken */
        $scope.mp={"payment":{"data":{
        "collection_status": null,
        "payment_id":null,
        "payment_type":null,
        "merchant_order_id": null,
        "site_id": null,
        "processing_mode":null,
        "merchant_account_id": null,
        "preference_id": null,
        "external_reference":null,
        "status":null
        }}};
        if($routeParams.preference_id && $routeParams.payment_id){
          var ext_ref = $routeParams.external_reference;
          var idTicket = ext_ref.split("_");
          $scope.mp.payment.data.collection_status    = $routeParams.collection_status;
          $scope.mp.payment.data.payment_id           = $routeParams.payment_id;
          $scope.mp.payment.data.payment_type         = $routeParams.payment_type;
          $scope.mp.payment.data.merchant_order_id    = $routeParams.merchant_order_id;
          $scope.mp.payment.data.site_id              = $routeParams.site_id;
          $scope.mp.payment.data.processing_mode      = $routeParams.processing_mode;
          $scope.mp.payment.data.merchant_account_id  = $routeParams.merchant_account_id;
          $scope.mp.payment.data.preference_id        = $routeParams.preference_id;
          $scope.mp.payment.data.external_reference   = $routeParams.external_reference;
          $scope.mp.payment.data.idTicket             = idTicket[0];
          $scope.mp.payment.data.status               = $routeParams.status;
          console.log(" Payment Details:");
          console.log($scope.mp.payment.data);
          if ($scope.mp.payment.data.status=="approved"){
            inform.add('El pago recibido con el numero de Id:  '+$scope.mp.payment.data.payment_id,{
              ttl:5000, type: 'info'
            });
            $timeout(function() {
              $scope.updatePaymentFn($scope.mp.payment);
            }, 1000);
          }
        }

        $scope.importBillingTicketfiles= function() {
          document.getElementById('uploadBillingTicketfiles').click();
          //$('#uploadBillingTicketfiles ').trigger('click');
        };

        // Initialize the panel as collapsed
        $scope.panels = {
          panelBodyKeyStock: false,
          panelBodyForm: false,
          panelBodyExistingKeys: false,
          panelBodyNewKeys: false
        };
        // Function to toggle the panel state
        $scope.togglePanel = function(panelName) {
          $scope.panels[panelName] = !$scope.panels[panelName];
        };
    /**************************************************
    *                                                 *
    *                 MODAL CONFIRMATION              *
    *                                                 *
    **************************************************/
        $scope.argObj=null;
        $scope.modalConfirmation = function(opt, confirm, obj){
          $scope.swMenu = opt;
          $scope.vConfirm = confirm;
          $scope.mess2show="";
          $scope.messAction="";
          //console.log("$scope.swMenu: "+$scope.swMenu);
          switch ($scope.swMenu){
              case "closeWindow":
                  if (confirm==0){
                      if ($scope.isEditTicket==true){
                        $scope.mess2show="Se perderan todos los cambios realizado en el Pedido actual, esta seguro que desea cancelar?";
                      }else if ($scope.isNewUser==true){
                        $scope.mess2show="Se perderan todos los datos cargados del registro actual, esta seguro que desea cancelar?";
                      }else{
                        $scope.mess2show="Se perderan todas las modificaciones realizadas en el registro actual, esta seguro que desea cancelar la modificacion?";
                      }
                      $("#confirmRequestModal").modal('show');
                  }else if (confirm==1){
                      $("#confirmRequestModal").modal('hide');
                      $("#UpdateModalTicket").modal('hide');
                  }
              break;
              case "closeRequest":
                $("#showModalRequestStatus").modal('hide');
              break;
              case "closeTicketKeysModalDetails":
                $("#ticketKeysModalDetails").modal('hide');
              break;
              case "closeKeyDetails":
                $("#keyDetails").modal('hide');
              break;
              case "cancelSetMgmtKeys":
                if (confirm==0){
                  $scope.keyObj=obj;
                  console.log(obj)
                  $scope.mess2show="Se perderan todos los Llaveros cargados, esta seguro que desea cancelar?";
                  $('#confirmRequestModal').modal('show');
                }else if (confirm==1){
                  $('#ManageTicketKeysList').modal('hide');
                  $('#confirmRequestModal').modal('hide');
                  $scope.mainSwitchFn('cancelSetMgmtKeys',$scope.keyObj)
                }
              break;
              case "applySetMgmtKeys":
                if (confirm==0){
                  $scope.keyObj=obj;
                  console.log(obj);
                  $scope.mess2show=obj.mess2show
                  $('#confirmRequestModalCustom').modal({backdrop: 'static', keyboard: false});
                  $('#confirmRequestModalCustom').on('shown.bs.modal', function () {});
                }else if (confirm==1){
                  $('#ManageTicketKeysList').modal('hide');
                  $('#confirmRequestModalCustom').modal('hide');
                  $scope.mainSwitchFn('applySetMgmtKeys',$scope.keyObj)
                }
              break;
              case "isKeysEnable":
                if (confirm==0){
                  $scope.ticket.whereKeysAreEnableTmp = null;
                  $scope.keyObj=$scope.tkupdate;
                  console.log($scope.functions);
                  console.log($scope.keyObj);
                      //console.log(obj)
                      if($scope.functions.isKeysEnable=='1'){
                        if ($scope.functions.whereKeysAreEnable=='1'){
                          $scope.mess2show="Los Llaveros han sido habilitados de forma online,     Confirmar?";
                        }else{
                          $scope.mess2show="Los Llaveros han sido habilitados en el edificio,     Confirmar?";
                        }
                          console.log("============================================================================");
                          console.log("Los Llaveros han sido habilitados");
                          console.log("============================================================================");
                      }else{
                        if ($scope.functions.whereKeysAreEnable=='1'){
                          $scope.mess2show="Los Llaveros no han sido habilitados de forma online, seran habilitados en el Edificio,     Confirmar?";
                          $scope.ticket.whereKeysAreEnableTmp = "2"
                        }else{
                          $scope.mess2show="Los Llaveros no han sido habilitados en el edificio,      Confirmar?";
                        }
                          console.log("============================================================================");
                          console.log("Los Llaveros no han sido habilitados");
                          console.log("============================================================================");
                      }
                      console.log($scope.keyObj);
                      console.log($scope.functions);
                $('#confirmRequestModalCustom').modal('toggle');
                }else if (confirm==1){
                  if($scope.functions.isKeysEnable=='1'){
                      $scope.keyObj.isKeysEnable=1;
                  }else{
                      $scope.keyObj.isKeysEnable=0;
                  }
                  console.log($scope.keyObj);
                  console.log($scope.functions);
                  $scope.mainSwitchFn('apply_isKeysEnable',$scope.keyObj)
                $('#confirmRequestModalCustom').modal('hide');
                }else if (confirm==null){
                  if ($scope.keyObj.isKeysEnable==0 || $scope.keyObj.isKeysEnable==null){
                      $scope.functions.isKeysEnable=undefined
                  }
                }
              break;
              case "update":
                  if (confirm==0){
                      $scope.tenantObj=obj;
                          //console.log(obj)
                          $scope.mess2show="Se actualizaran los datos del usuario: "+$scope.tenantObj.fname+" "+$scope.tenantObj.lname+" por favor,     Confirmar?";
                          console.log("ID del Usuario a actualizar  : "+obj.idUser);
                          console.log("Nombres del Usuario a actualizar  : "+$scope.tenantObj.fname+" "+$scope.tenantObj.lname);
                          console.log("============================================================================");
                          //console.log(obj);
                  $('#confirmRequestModal').modal('toggle');
                  }else if (confirm==1){
                      $scope.switchUsersFn($scope.tenantObj, "update");
                  $('#confirmRequestModal').modal('hide');
                  }
              break;
              case "addNewKeyManual":
                if (confirm==0){
                    $scope.keyObj=obj;
                        console.log(obj)
                        $scope.mess2show="El llavero codigo: "+obj.codigo+" sera registrado en el sistema,     Confirmar?";
                        console.log("Llave a registrar  : "+obj.codigo);
                        console.log("============================================================================");
                        //console.log(obj);
                $('#confirmRequestModal').modal('toggle');
                }else if (confirm==1){
                    $scope.mainSwitchFn("addNewKeyManual", $scope.keyObj);
                $('#confirmRequestModal').modal('hide');
                }
              break;
              case "removeNewKey":
                if (confirm==0){
                  $scope.keyObj=obj;
                      console.log(obj)
                      $scope.mess2show="El Llavero: "+obj.codigo+" sera Eliminado de la lista,     Confirmar?";

                      console.log("Llave a eliminar  : "+obj.codigo);
                      console.log("============================================================================");
                      //console.log(obj);
                  $('#confirmRequestModal').modal('toggle');
                }else if (confirm==1){
                    $scope.mainSwitchFn("removeNewKey", $scope.keyObj);
                  $('#confirmRequestModal').modal('hide');
                }
              break;
              case "confirmSetMgmtKeys":
                if (confirm==0){
                    $scope.keyObj=obj;
                    console.log(obj)
                    $scope.mess2show="La llave con el codigo: "+obj.codigo+" sera registrada en el sistema,     Confirmar?";
                    console.log("Llave a registrar  : "+obj.codigo);
                    console.log("============================================================================");
                    //console.log(obj);
                    $('#confirmRequestModal').modal('toggle');
                  }else if (confirm==1){
                    $scope.mainSwitchFn("assignMgmtKeys", $scope.keyObj);
                    $('#confirmRequestModal').modal('hide');
                  }
              break;
              case "approve":
                if (confirm==0){
                      $scope.mess2show="El Pedido ["+obj.codTicket+"] sera Aprobado,     Confirmar?";
                      $scope.argObj = obj;
                      console.log('El Pedido '+obj.codTicket+' ID: '+obj.idTicket+' Sera Aprobado por el usuario: '+$scope.sysLoggedUser.fullNameUser);
                      console.log("============================================================================")
                      //console.log($scope.argObj);
                      $('#confirmRequestModal').modal('toggle');
                }else if (confirm==1){
                  $scope.argObj = $scope.argObj==null?obj:$scope.argObj;
                  $scope.mainSwitchFn('ticket_approve', $scope.argObj);
                  $('#confirmRequestModal').modal('hide');
                  //console.log($scope.argObj);
                }
              break;
              case "createMPLink":
                if (confirm==0){
                      $scope.mess2show="Sera generado el Link de pago al El Pedido ["+obj.codTicket+"],     Confirmar?";
                      $scope.argObj = obj;
                      console.log('Sera generado el Link de pago al El Pedido '+obj.codTicket+' ID: '+obj.idTicket);
                      console.log("============================================================================")
                      //console.log($scope.argObj);
                      $('#confirmRequestModal').modal('toggle');
                }else if (confirm==1){
                  $scope.argObj = $scope.argObj==null?obj:$scope.argObj;
                  $scope.mainSwitchFn('linkMP', $scope.argObj);
                  $('#confirmRequestModal').modal('hide');
                  //console.log($scope.argObj);
                }
              break;
              case "cancel_user":
                if (confirm==0){
                  $scope.mess2show="Solicitar la cancelación del Pedido ["+obj.codTicket+"], Esta seguro que desea realizar la solicitud,     Confirmar?";
                  $scope.argObj = obj;
                  console.log('Solicitud de cancelacion del Pedido '+obj.codTicket+' ID: '+obj.idTicket+' solicitado por el usuario: '+$scope.sysLoggedUser.fullNameUser);
                  console.log("============================================================================")
                  console.log($scope.argObj);
                  $('#confirmRequestModal').modal('toggle');
                }else if (confirm==1){
                  $('#confirmRequestModal').modal('hide');
                  $scope.mainSwitchFn('ticket_request_cancel', $scope.argObj, null)
                }
              break;
              case "reject_cancel_user":
                if (confirm==0){
                  $scope.mess2show="Rechaza la solicitud de cancelacion del Pedido ["+obj.codTicket+"],     Confirmar?";
                  $scope.argObj = obj;
                  console.log('Rechazar la solicitud de cancelacion del Pedido '+obj.codTicket+' ID: '+obj.idTicket+' solicitado por el usuario: '+$scope.sysLoggedUser.fullNameUser);
                  console.log("============================================================================")
                  console.log($scope.argObj);
                  $('#confirmRequestModal').modal('toggle');
                }else if (confirm==1){
                  $('#confirmRequestModal').modal('hide');
                  $scope.mainSwitchFn('ticket_reject_request_cancel', $scope.argObj, null)
                }
              break;
              case "cancel_sys":
                if (confirm==0){
                  $scope.mess2show="El Pedido ["+obj.codTicket+"] sera cancelado, Esta seguro que desea realizar esta acción,     Confirmar?";
                  $scope.argObj = obj;
                  console.log('El Ticket '+obj.codTicket+' ID: '+obj.idTicket+' Sera Cancelado por el usuario: '+$scope.sysLoggedUser.fullNameUser);
                  console.log("============================================================================")
                  console.log($scope.argObj);
                  $('#confirmRequestModal').modal('toggle');
                }else if (confirm==1){
                  $('#confirmRequestModal').modal('hide');
                  $scope.mainSwitchFn('approve_ticket_request_cancel', $scope.argObj, null)
                }
              break;
              case "apply_ticket_delivery_change":
                if (confirm==0){
                      $scope.mess2show="El Metodo de envio del pedido ["+obj.selected.codTicket+"] sera modificado, este cambio puede generar cargos adicionales, Esta seguro que desea realizar el cambio, Confirmar?";
                      $scope.argObj = obj;
                      console.log('El Metodo de envio del pedido '+obj.selected.codTicket+' ID: '+obj.selected.idTicket+' Solicitado por el usuario: '+$scope.sysLoggedUser.fullNameUser);
                      console.log("============================================================================")
                      console.log($scope.argObj);
                      $('#confirmRequestModal').modal('toggle');
                }else if (confirm==1){
                    $scope.mainSwitchFn('apply_ticket_delivery_change', $scope.argObj);
                    $('#confirmRequestModal').modal('hide');
                    //console.log($scope.argObj);
                }
              break;
              case "ticket_manual_payment":
                //ticket_manual_payment_add
                if (confirm==0){
                  $scope.mess2show="El Pago manual para pedido ["+obj.selected.codTicket+"] sera registrado, Esta seguro que desea realizar esta acción, Confirmar?";
                  $scope.argObj = obj;
                  console.log('El Pago manual para pedido '+obj.selected.codTicket+' ID: '+obj.selected.idTicket+' Solicitado por el usuario: '+$scope.sysLoggedUser.fullNameUser);
                  console.log("============================================================================")
                  console.log($scope.argObj);
                  $('#confirmRequestModal').modal('toggle');
            }else if (confirm==1){
                $scope.mainSwitchFn('ticket_manual_payment_add', $scope.argObj);
                $('#confirmRequestModal').modal('hide');
                //console.log($scope.argObj);
            }
              break;
              case "exportBillingExcelList":
                if (confirm==0){
                  $scope.mess2show="Sera iniciado el proceso de facturación y la descarga para el siguiente listado de pedidos, Confirmar?";
                  $scope.argObj = obj;
                  console.log("============================================================================")
                  console.log('Listado de pedidos a iniciar facturación y exportar ');
                  console.log("============================================================================")
                  console.log($scope.argObj);
                  $('#confirmRequestModal').modal('toggle');
                }else if (confirm==1){
                  $scope.mainSwitchFn('exportBillingExcelList', $scope.argObj);
                  $('#confirmRequestModal').modal('hide');
                  //console.log($scope.argObj);
                }
              break;
              case "exportOnInternalRouteExcelList":
                if (confirm==0){
                  console.log(obj);
                  $scope.selectedTicketList = [];
                  for (ticket in obj){
                    if (obj[ticket].selected == true){
                      $scope.selectedTicketList.push(obj[ticket]);
                    }
                  }
                  if ($scope.selectedTicketList.length>=1){
                    $scope.mess2show="Sera descargado el siguiente listado de ("+$scope.selectedTicketList.length+") pedidos en el formato de envío interno, Confirmar?";
                    $scope.argObj = $scope.selectedTicketList;
                    console.log("============================================================================")
                    console.log('Listado de pedidos a realizar envío interno');
                    console.log("============================================================================")
                    console.log($scope.argObj);
                    $('#confirmRequestModal').modal('toggle');
                  }else{
                    inform.add('Debe seleccionar al menos un pedido de la lista para generar y descargar el archivo.',{
                      ttl:5000, type: 'info'
                    });
                  }
                }else if (confirm==1){
                  $scope.mainSwitchFn('exportOnInternalRouteExcelList', $scope.argObj);
                  $('#confirmRequestModal').modal('hide');
                  //console.log($scope.argObj);
                }
              break;
              case "exportOnExternalRouteExcelList":
                if (confirm==0){
                  console.log(obj);
                  $scope.selectedTicketList = [];
                  for (ticket in obj){
                    if (obj[ticket].selected == true){
                      $scope.selectedTicketList.push(obj[ticket]);
                    }
                  }
                  if ($scope.selectedTicketList.length>=1){
                    $scope.mess2show="Sera descargado el siguiente listado de ("+$scope.selectedTicketList.length+") pedidos en el formato de envío externo, Confirmar?";
                    $scope.argObj = $scope.selectedTicketList;
                    console.log("============================================================================")
                    console.log('Listado de pedidos a realizar envío externo');
                    console.log("============================================================================")
                    console.log($scope.argObj);
                    $('#confirmRequestModal').modal('toggle');
                  }else{
                    inform.add('Debe seleccionar al menos un pedido de la lista para generar y descargar el archivo.',{
                      ttl:5000, type: 'info'
                    });
                  }
                }else if (confirm==1){
                  $scope.mainSwitchFn('exportOnExternalRouteExcelList', $scope.argObj);
                  $('#confirmRequestModal').modal('hide');
                  //console.log($scope.argObj);
                }
              break;
              case "ticket_refunds_complete":
                if (confirm==0){
                      $scope.mess2show="El pago de reintegro del pedido ["+$scope.tkupdate.codTicket+"] ha sido completado, Confirmar?";
                      $scope.argObj = obj;
                      console.log('El pago de reintegro del pedido '+$scope.tkupdate.codTicket+' ID: '+$scope.tkupdate.idTicket+' Solicitado por el usuario: '+$scope.sysLoggedUser.fullNameUser);
                      console.log("============================================================================")
                      console.log($scope.argObj);
                      $('#confirmRequestModal').modal('toggle');
                }else if (confirm==1){
                    $scope.mainSwitchFn('ticket_refunds_complete', $scope.argObj);
                    $('#confirmRequestModal').modal('hide');
                    //console.log($scope.argObj);
                }
              break;
              case "change_ticket_status_single":
                if (confirm==0){
                      $scope.mess2show="El estado del pedido ["+obj.codTicket+"] sera modificado, Esta seguro que desea realizar el cambio, Confirmar?";
                      $scope.argObj = obj;
                      console.log('El estado del pedido '+obj.codTicket+' ID: '+obj.idTicket+' Solicitado por el usuario: '+$scope.sysLoggedUser.fullNameUser);
                      console.log("============================================================================")
                      console.log($scope.argObj);
                      $('#confirmRequestModal').modal('toggle');
                }else if (confirm==1){
                    $scope.mainSwitchFn('apply_change_ticket_status_single', $scope.argObj);
                    $('#confirmRequestModal').modal('hide');
                    //console.log($scope.argObj);
                }
              break;
              case "change_ticket_status_multi":
                if (confirm==0){
                      $scope.mess2show="El estado de los pedidos seleccionados sera modificado, Esta seguro que desea realizar el cambio, Confirmar?";
                      $scope.argObj = obj;
                      console.log("============================================================================")
                      console.log($scope.argObj);
                      $('#confirmRequestModal').modal('toggle');
                }else if (confirm==1){
                    $scope.mainSwitchFn('apply_change_ticket_status_multi', $scope.argObj);
                    $('#confirmRequestModal').modal('hide');
                    //console.log($scope.argObj);
                }
              break;
              case "upload_billing_ticket":
                if (confirm==0){
                  $scope.mess2show="La factura ["+obj.name+"] sera cargada y asociada al ticket, Esta seguro que desea realizar la carga de la factura, Confirmar?";
                  $scope.argObj = obj;
                  console.log('Factura Nombre '+obj.name+' ID: '+obj.idTicket+' Solicitado por el usuario: '+$scope.sysLoggedUser.fullNameUser);
                  console.log("============================================================================")
                  console.log($scope.argObj);
                  $('#confirmRequestModal').modal('toggle');
              }else if (confirm==1){
                  $scope.mainSwitchFn('upload_billing_ticket', $scope.argObj);
                  $('#confirmRequestModal').modal('hide');
                  //console.log($scope.argObj);
              }
              break;
              case "deleteSingleFile":
                  if (confirm==0){
                  $scope.delFile=obj;
                  $scope.mess2show="El archivo "+obj.title+" sera eliminado.     Confirmar?";

                  console.log('Archivo a eliminar ID: '+obj.idClientFiles+' File: '+obj.title);
                  console.log("============================================================================")
                  $('#confirmRequestModal').modal('toggle');
                  }else if (confirm==1){
                      $scope.mainSwitchFn('deleteSingleFile', $scope.delFile);
                      $('#confirmRequestModal').modal('hide');
                  }
              break;
              case "closeModalRequestStatus":
                $('.circle-loader').toggleClass('load-complete');
                $('.checkmark').toggle();
                $('#showModalRequestStatus').modal('hide');
                $scope.ticketRegistered=null;
              break;
              case "approveDepto":
                if (confirm==0){
                    $scope.tenantObj=obj;
                        console.log(obj)
                        var department = obj.department.floor+'-'+obj.department.departament;
                        if (obj.userRequestBy.idTypeTenantKf=="1"){
                            $scope.mess2show="El Propietario: "+$scope.tenantObj.userRequestBy.fullNameUser+" sera autorizado al Departamento: "+department.toUpperCase()+",     Confirmar y Aprobar?";
                        }else{
                            $scope.mess2show="El Habitante: "+$scope.tenantObj.userRequestBy.fullNameUser+" sera autorizado al Departamento: "+department.toUpperCase()+",     Confirmar y Aprobar?";
                        }
                        console.log("ID del usuario a asociar y aprobar         : "+$scope.tenantObj.userRequestBy.idUser);
                        console.log("Nombres del Habitante a asociar y aprobar  : "+$scope.tenantObj.userRequestBy.fullNameUser);
                        console.log("============================================================================");
                        //console.log(obj);
                $('#confirmRequestModal').modal('toggle');
                }else if (confirm==1){
                  $scope.mainSwitchFn("approveDepto", $scope.tenantObj);
                  $('#confirmRequestModal').modal('hide');
                }
            break;
              default:
          }
        }
    /**************************************************
    *                                                 *
    *         LIST OF ATTENDANTS BY ID ADDRESS        *
    *                                                 *
    **************************************************/
        $scope.attendantListByAddress = [];
        $scope.getAttendantListFn = function(idAddress){
            $scope.attendantListByAddress = [];
            userServices.attendantsOnlyList(idAddress).then(function(response) {
                if(response.status==200){
                    $scope.attendantListByAddress = response.data;
                    $scope.attendantFound=true;
                }else if (response.status==404){
                    $scope.attendantFound=false;
                    $scope.attendantListByAddress = [];
                    inform.add('No se encontraron Encargados asociados al consorcio seleccionado. ',{
                        ttl:5000, type: 'info'
                    });
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
    *              GET STATUS TICKET LIST             *
    *                                                 *
    **************************************************/
        $scope.listStatusTicket=null;
        $scope.listStatusTicketChange=null;
        // Define the desired order of ids

        $scope.getTicketStatusTypeListFn = function(){
          ticketServices.getTicketStatusTypeList().then(function(response){
            if(response.status==200){
                const desiredOrder = ["2", "9", "3", "11", "8", "12", "4", "5", "7", "10","6", "-1", "1"];
                const dataList = response.data;
                const orderMap = {};
                desiredOrder.forEach((id, index) => {
                  orderMap[id] = index;
                });
                const sortedList = dataList.sort((a, b) => orderMap[a.idStatus] - orderMap[b.idStatus]);
                // Print the sorted list
                sortedList.forEach(item => {
                  console.log(`${item.idStatus}\t${item.statusName}`);
                });
                $scope.listStatusTicket  = sortedList;
                $scope.listStatusTicketChange = sortedList;
            }else if (response.status==404){
                inform.add('Ocurrio un error, contacte al area de soporte de BSS.',{
                    ttl:3000, type: 'danger'
                });
                    $scope.listStatusTicket       = null;
                    $scope.listStatusTicketChange = null;
            }else if (response.status==500){
                inform.add('Ocurrio un error, contacte al area de soporte de BSS.',{
                ttl:3000, type: 'danger'
                });
                $scope.listStatusTicket       = null;
                $scope.listStatusTicketChange = null;
            }
          });
        };$scope.getTicketStatusTypeListFn();
    /**************************************************
    *                                                 *
    *              GET TICKET TYPES LIST              *
    *                                                 *
    **************************************************/
      $scope.getTypeTicketListFn = function(){
        ticketServices.getTypeTicketList().then(function(response){
          if(response.status==200){
                  $scope.listTypeTicket = response.data;
          }else if (response.status==404){
              inform.add('Ocurrio un error, contacte al area de soporte de BSS.',{
                  ttl:3000, type: 'danger'
              });
                  $scope.listTypeTicket = undefined;
          }else if (response.status==500){
              inform.add('Ocurrio un error, contacte al area de soporte de BSS.',{
              ttl:3000, type: 'danger'
              });
              $scope.listTypeTicket = undefined;
          }
        });
      };$scope.getTypeTicketListFn();
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
    *              GET CUSTOMERS CONTRACT             *
    *                                                 *
    **************************************************/
      $scope.rsContractsListByCustomerIdData=[];
      $scope.rsContractNotFound=false;
      $scope.getContractsByCustomerIdFn=function(idClient){
          $scope.rsContractsListByCustomerIdData=[];
          ContractServices.getContractListByCustomerId(idClient).then(function(response){
              console.log(response);
              if(response.status==200){
                $scope.rsJsonData = []; // Use an array to store all enriched items
                $scope.rsContractNotFound=false;
                // Step 1: Create mapping objects for quick lookups
                var contractTypeMap = {};
                $scope.rsTypeOfContractsData.forEach(function(contract) {
                    contractTypeMap[contract.idTypeContrato] = contract.description;
                });
                console.log(contractTypeMap);
                var maintenanceTypeMap = {};
                $scope.rsTypeOfMaintenanceData.forEach(function(maintenance) {
                    maintenanceTypeMap[maintenance.idTypeMaintenance] = maintenance.typeMaintenance;
                });
                console.log(maintenanceTypeMap);
                response.data.forEach(function(item) {
                  if (item.idStatusFk == "1"){
                    // Add contract type description
                    //item.description = contractTypeMap[item.idTypeContrato] || 'Unknown Contract Type';
                    // Add maintenance type
                    item.typeMaintenance = maintenanceTypeMap[item.maintenanceType] || 'Unknown Maintenance Type';
                    // Push the enriched item to rsJsonData array
                    $scope.rsJsonData.push(item);
                  }
                });
                console.log($scope.rsJsonData);
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
        *                 LIST PRODUCTS                   *
        *                                                 *
        **************************************************/
        $scope.rsKeyProductsData = [];
        $scope.select={'products':{'selected':{}}};
        $scope.getKeysAssociatedToACustomerFn = function(idClient){
            //console.log("getKeysAssociatedToACustomerFn-->Service")
            CustomerServices.getKeysAssociatedToACustomerService(idClient).then(function(response){
                if(response.status==200){
                    $scope.rsKeyProductsData = response.data;
                    //console.info($scope.keyList);
                    $timeout(function() {
                        $scope.select.products.selected={'idStatusFk':$scope.rsKeyProductsData[0].idStatusFk,'contractStatus':$scope.rsKeyProductsData[0].contractStatus,'serviceName':$scope.rsKeyProductsData[0].serviceName,'idProduct':$scope.rsKeyProductsData[0].idProduct,'descriptionProduct':$scope.rsKeyProductsData[0].descriptionProduct,'codigoFabric':$scope.rsKeyProductsData[0].codigoFabric,'brand':$scope.rsKeyProductsData[0].brand,'model':$scope.rsKeyProductsData[0].model,'idProductClassificationFk':$scope.rsKeyProductsData[0].idProductClassificationFk,'isNumberSerieFabric':$scope.rsKeyProductsData[0].isNumberSerieFabric,'isNumberSerieInternal':$scope.rsKeyProductsData[0].isNumberSerieInternal,'isDateExpiration':$scope.rsKeyProductsData[0].isDateExpiration,'isControlSchedule':$scope.rsKeyProductsData[0].isControlSchedule,'isRequestNumber':$scope.rsKeyProductsData[0].isRequestNumber,'priceFabric':$scope.rsKeyProductsData[0].priceFabric,'classification':$scope.rsKeyProductsData[0].classification};
                        console.log($scope.select.products.selected);
                    }, 1700);
                }else if (response.status==404){
                    $scope.rsKeyProductsData = [];
                }else if (response.status==500){
                    $scope.rsKeyProductsData = [];
                    inform.add('[Error]: '+response.status+', Ocurrio error intenta de nuevo o contacta el area de soporte. ',{
                        ttl:5000, type: 'danger'
                    });
                }
            });

        }
    /**************************************************
    *                                                 *
    *                 LIST PRODUCTS                   *
    *                                                 *
    **************************************************/
        $scope.rsCustomerAccessControlDoors = [];
        $scope.getControlAccessDoorsAssociatedToACustomerFn = function(idClient){
            $scope.rsCustomerAccessControlDoors = [];
            console.log("Getting --> ControlAccessDoorsAssociatedToACustomerFn");
            CustomerServices.getControlAccessDoorsAssociatedToACustomerServices(idClient).then(function(response){
                console.log(response.data);
                if(response.status==200){
                    $scope.rsCustomerAccessControlDoors = response.data;
                    $scope.tkupdate.accessControlDoors = response.data;
                      for (var item in $scope.tkupdate.accessControlDoors){
                      const itHasHttpProto                       = $scope.tkupdate.accessControlDoors[item].controlAccessInternet.addressVpn!=null && $scope.tkupdate.accessControlDoors[item].controlAccessInternet.addressVpn!=undefined?regexProtocol.test($scope.tkupdate.accessControlDoors[item].controlAccessInternet.addressVpn):null;
                      const itHasPortInURL                       = $scope.tkupdate.accessControlDoors[item].controlAccessInternet.addressVpn!=null && $scope.tkupdate.accessControlDoors[item].controlAccessInternet.addressVpn!=undefined?regexPort.test($scope.tkupdate.accessControlDoors[item].controlAccessInternet.addressVpn):null;
                      const vpnPortDefined                       = $scope.tkupdate.accessControlDoors[item].controlAccessInternet.portVpn!="" && $scope.tkupdate.accessControlDoors[item].controlAccessInternet.portVpn!=null && $scope.tkupdate.accessControlDoors[item].controlAccessInternet.portVpn!=undefined?$scope.tkupdate.accessControlDoors[item].controlAccessInternet.portVpn:"80";
                      if (itHasPortInURL && itHasPortInURL!=null){
                          const urlVpn = $scope.tkupdate.accessControlDoors[item].controlAccessInternet.addressVpn;
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
                              $scope.tkupdate.accessControlDoors[item].controlAccessInternet.urlVpn           = "http://"+$scope.tkupdate.accessControlDoors[item].controlAccessInternet.addressVpn+":"+vpnPortDefined;
                          }else{
                              $scope.tkupdate.accessControlDoors[item].controlAccessInternet.urlVpn           = "http://"+$scope.tkupdate.accessControlDoors[item].controlAccessInternet.addressVpn;
                          }
                      }else if (itHasHttpProto){
                          if (!itHasPortInURL || itHasPortInURL==null){
                              $scope.tkupdate.accessControlDoors[item].controlAccessInternet.urlVpn           = $scope.tkupdate.accessControlDoors[item].controlAccessInternet.addressVpn+":"+vpnPortDefined;
                          }else{
                              $scope.tkupdate.accessControlDoors[item].controlAccessInternet.urlVpn           = $scope.tkupdate.accessControlDoors[item].controlAccessInternet.addressVpn;
                          }
                      }else{
                          $scope.tkupdate.accessControlDoors[item].urlVpn = undefined;
                      }
                    }
                }else if (response.status==404){
                    $scope.rsCustomerAccessControlDoors = [];
                    $scope.tkupdate.accessControlDoors  = [];
                }else if (response.status==500){
                    inform.add('[Error]: '+response.status+', Ocurrio error intenta de nuevo o contacta el area de soporte. ',{
                        ttl:5000, type: 'danger'
                    });
                }
            });
            //console.log($scope.rsCustomerAccessControlDoors);
        }
    /**************************************************
    *                                                 *
    *                  OPEN A TICKET                  *
    *                                                 *
    **************************************************/
      $scope.tkupdate = {};
      $scope.tktmporal = {};
      $scope.rsData = {};
      $scope.isEditTicket=false;
      $scope.openTicketFn = function(idTicket){
        //$scope.tkupdate  = obj;
        //$scope.tktmporal = obj;
        //ticketServices.ticketByToken(obj.urlToken);
        //console.log(obj);
        $scope.editComment=false;
        $scope.tkupdate = {};
        ticketServices.ticketById(idTicket).then(function(response){
            if(response.status==200){
              //console.log(response.data[0]);
              $scope.rsData.ticket = (response.data.tickets[0]);
              $scope.tkupdate = response.data.tickets[0];
              //$scope.getContractsByCustomerIdFn($scope.tkupdate.building.idClient);
              $scope.getKeysAssociatedToACustomerFn($scope.tkupdate.building.idClient);
              $scope.getControlAccessDoorsAssociatedToACustomerFn($scope.tkupdate.building.idClient);
              if ($scope.tkupdate.idTypeRequestFor=="1"){
                $scope.getDeptoListByAddress($scope.tkupdate.building.idClient);
                $scope.getKeysByDepartmentId($scope.tkupdate.department.idClientDepartament);
              }
              $scope.ticket.selected              = response.data.tickets[0];
              $scope.ticket.building              = $scope.tkupdate.building;
              $scope.ticket.administration        = $scope.tkupdate.clientAdmin;
              $scope.ticket.idClientDepartament   = $scope.tkupdate.department
              $scope.ticket.keysMethod            = $scope.tkupdate.keysMethod!=null?$scope.tkupdate.keysMethod:"{'name':''}";
              $scope.ticket.keysMethodSelected    = $scope.tkupdate.keysMethod!=null?$scope.tkupdate.keysMethod:null;
              $scope.customerFound                = $scope.tkupdate.building;
              //$scope.ticket.isKeysEnable          = $scope.tkupdate.isKeysEnable===null?"0":$scope.tkupdate.isKeysEnable;
              //$scope.functions.isKeysEnable       = $scope.tkupdate.isKeysEnable===null?"0":$scope.tkupdate.isKeysEnable;
              if ($scope.tkupdate.whereKeysAreEnable === null){
                if ($scope.tkupdate.building.isHasInternetOnline === null){
                  $scope.functions.whereKeysAreEnable = "2";
                  $scope.ticket.whereKeysAreEnable    = "2";
                }else{
                  $scope.functions.whereKeysAreEnable = "1";
                  $scope.ticket.whereKeysAreEnable    = "1";
                }
              }else{
                $scope.functions.whereKeysAreEnable = $scope.tkupdate.whereKeysAreEnable;
                $scope.ticket.whereKeysAreEnable    = $scope.tkupdate.whereKeysAreEnable;
              }
              console.log($scope.tkupdate);

              $scope.isEditTicket=true;
              $timeout(function() {
                console.log($scope.rsExistingKeyList);
                if ($scope.tkupdate.idMgmtMethodKf!=undefined && $scope.tkupdate.idMgmtMethodKf!=null){
                  for (var i = 0; i < $scope.rsExistingKeyList.length; i++) {
                    //rsNewKeychainList
                    if ($scope.rsExistingKeyList[i].idTicketKf!=null && $scope.rsExistingKeyList[i].idKeychainStatusKf!="-1" && $scope.rsExistingKeyList[i].idTicketKf == $scope.tkupdate.idTicket){
                      $scope.rsNewKeychainList.push($scope.rsExistingKeyList[i]);
                      $scope.list_new_keys.push($scope.rsExistingKeyList[i]);
                    }
                  }
                }
                console.log("ticket.keysMethod.name  : "+$scope.ticket.keysMethod.name);
                console.log("tkupdate.keys length    : "+$scope.tkupdate.keys.length);
                console.log("rsNewKeychainList length: "+$scope.rsNewKeychainList.length);
                console.log($scope.rsNewKeychainList);
                console.log("list_new_keys");
                console.log($scope.list_new_keys);
              }, 1000);
            }else if (response.status==404){
                $scope.rsData = {};
                $scope.tkupdate = {};
            }else if (response.status==500){
                $scope.rsData = {};
                $scope.tkupdate = {};
            }
        });
      }
      $scope.setOptionType = function(obj) {
        var elem = angular.element(obj.target);// or angular.element(obj.target);
        console.log(elem[0])
        if ($scope.tkupdate.keysMethod===null){$scope.tkupdate.keysMethod = {'name':''};}
        switch (elem[0].getAttribute("id")){
            case "stock":
                if ($scope.ticket.keysMethod.name==undefined){
                    $scope.ticket.keysMethod.name         = elem[0].getAttribute("id");
                    $scope.ticket.idMgmtMethodKf        = "1"
                    $scope.tkupdate.keysMethod.name       = elem[0].getAttribute("id");
                    $scope.ticket.optionTypeSelected.obj  = elem[0].getAttribute("id")
                    elem.removeClass('btn-primary').addClass("btn-success");
                    $scope.mainSwitchFn('keychainMulti', null, null);
                }else if ($scope.ticket.keysMethod.name!=elem[0].getAttribute("id")){
                    //document.getElementById("typeOption1").checked=false;
                    //document.getElementById("typeOption2").checked=false;
                    $scope.ticket.radioButtonBuilding     = undefined;
                    $scope.list_keys                      = [];
                    var removeElem                        = document.getElementById("manual")
                    //console.log(removeElem)
                    $scope.ticket.keysMethod.name         = elem[0].getAttribute("id");
                    $scope.ticket.idMgmtMethodKf        = "1"
                    $scope.tkupdate.keysMethod.name       = elem[0].getAttribute("id");
                    $scope.ticket.optionTypeSelected.obj  = elem[0].getAttribute("id")
                    elem.removeClass('btn-primary').addClass("btn-success");
                    $scope.mainSwitchFn('keychainMulti', null, null);
                }
            break;
            case "manual":
                if ($scope.ticket.keysMethod.name==undefined){
                    $scope.ticket.keysMethod.name         = elem[0].getAttribute("id");
                    $scope.ticket.idMgmtMethodKf        = "2"
                    $scope.tkupdate.keysMethod.name       = elem[0].getAttribute("id");
                    $scope.ticket.optionTypeSelected.obj  = elem[0].getAttribute("id")
                    elem.removeClass('btn-primary').addClass("btn-success");
                    $scope.mainSwitchFn('keychain_manual', null, null);
                }else if ($scope.ticket.keysMethod.name!=elem[0].getAttribute("id")){
                    //document.getElementById("typeTenant1").checked=false;
                    //document.getElementById("typeTenant2").checked=false;
                    $scope.ticket.radioButtonDepartment   = undefined;
                    $scope.ticket.idClientDepartament     = undefined;
                    $scope.selectedUser                   = undefined;
                    $scope.list_keys                      = [];
                    var removeElem                        = document.getElementById("stock")
                    $scope.ticket.keysMethod.name         = elem[0].getAttribute("id");
                    $scope.ticket.idMgmtMethodKf        = "2"
                    $scope.tkupdate.keysMethod.name       = elem[0].getAttribute("id");
                    $scope.ticket.optionTypeSelected.obj  = elem[0].getAttribute("id")
                    elem.removeClass('btn-primary').addClass("btn-success");
                    $scope.mainSwitchFn('keychain_manual', null, null);
                }
            break;
            default:
        }
        console.log($scope.ticket);
      };


    /**************************************************
    *                                                 *
    *           GET KEYS BY DEPARTMENT ID             *
    *                                                 *
    **************************************************/
      $scope.getKeysByDepartmentId = function(id){
        $scope.rsExistingKeyList = [];
        let keyDeptoList = []
        KeysServices.getKeyListByDepartmentId(id).then(function(response) {
          if(response.status==200){
            //console.log(response.data);
              keyDeptoList = response.data
              for (var i in keyDeptoList){
                //rsExistingKeyList
                //console.log(keyDeptoList[i]);
                if (keyDeptoList[i].idKeychainStatusKf!="-1"){
                  $scope.rsExistingKeyList.push(keyDeptoList[i]);
                }
              }
              $scope.tkupdate.existingKeys  = $scope.rsExistingKeyList;
          }else if (response.status==404){
              $scope.tkupdate.existingKeys  = [];
              $scope.rsExistingKeyList      = [];
          }else if (response.status==500){
            $scope.tkupdate.existingKeys    = [];
            $scope.rsExistingKeyList        = [];
          }
        });
      }
    /**************************************************
    *                                                 *
    *                GET DELIVERY TYPES               *
    *                                                 *
    **************************************************/
      $scope.typedelivery_filter = [];
      $scope.getDeliveryTypesFn_filter = function(obj){
          $scope.typedelivery_filter = [];
          ticketServices.typeDelivery().then(function(response){
              if(response.status==200){
                  $scope.typedelivery = response.data;
                  $scope.typedelivery_filter = response.data;
              }else if (response.status==404){
                  $scope.typedelivery_filter = [];
                  inform.add('No hay tipos de deliverys registrados, contacte al area de soporte de BSS.',{
                  ttl:5000, type: 'warning'
                  });
              }else if (response.status==500){
                  $scope.typedelivery_filter = [];
                  inform.add('[Error]: '+response.status+', Ha ocurrido un error en la comunicacion con el servidor, contacta el area de soporte. ',{
                  ttl:5000, type: 'danger'
                  });
              }
          });
      };
    /**************************************************
    *                                                 *
    *                GET DELIVERY TYPES               *
    *                                                 *
    **************************************************/
      $scope.listDeliveryCompanies_filter = [];
      $scope.getDeliveryCompaniesFn = function(obj){
          $scope.listDeliveryCompanies_filter = [];
          ticketServices.deliveryCompanies().then(function(response){
              if(response.status==200){
                  $scope.listDeliveryCompanies = response.data;
                  $scope.listDeliveryCompanies_filter = response.data;
              }else if (response.status==404){
                  $scope.listDeliveryCompanies_filter = [];
                  inform.add('No hay empresas de delivery registrados, contacte al area de soporte de BSS.',{
                  ttl:5000, type: 'warning'
                  });
              }else if (response.status==500){
                  $scope.listDeliveryCompanies_filter = [];
                  inform.add('[Error]: '+response.status+', Ha ocurrido un error en la comunicacion con el servidor, contacta el area de soporte. ',{
                  ttl:5000, type: 'danger'
                  });
              }
          });
      };
     /**************************************************
     *                                                 *
     *           REQUEST CANCELLATION TICKET           *
     *                                                 *
     **************************************************/
        $scope.sysRequestCancellationTicketFn = function(data){
          console.log(data);
            ticketServices.requestCancelTicket(data).then(function(response){
              console.log(response);
              if(response.status==200){
                console.log("CANCELLATION REQUEST CREATED SUCCESSFULLY");
                  inform.add('La solicitud de cancelación del pedido N°: '+data.ticket.codTicket+' ha sido registrada satisfactoriamente.',{
                    ttl:3000, type: 'success'
                  });
                  $scope.openTicketFn(data.ticket.idTicket);
                  $scope.mainSwitchFn('search', null);
                }else if(response.status==500){
                  console.log("Ticket Cancellation request has failed, contact administrator");
                  inform.add('Error: [500] Contacta al area de soporte. ',{
                        ttl:5000, type: 'danger'
                  });
                }
            });
        }
     /**************************************************
     *                                                 *
     *       REJECT REQUEST CANCELLATION TICKET        *
     *                                                 *
     **************************************************/
        $scope.sysRejectRequestCancellationTicketFn = function(data){
            console.log(data);
            ticketServices.rejectRequestCancelTicket(data).then(function(response){
              console.log(response);
              if(response.status==200){
                console.log("CANCELLATION REQUEST REJECTED SUCCESSFULLY");
                  inform.add('La solicitud de cancelación del pedido N°: '+data.ticket.codTicket+' ha sido rechazada.',{
                    ttl:3000, type: 'success'
                  });
                  $scope.openTicketFn(data.ticket.idTicket);
                  $scope.mainSwitchFn('search', null);
                }else if(response.status==500){
                  console.log("Reject ticket Cancellation request has failed, contact administrator");
                  inform.add('Error: [500] Contacta al area de soporte. ',{
                        ttl:5000, type: 'danger'
                  });
                }
            });
        }

     /**************************************************
     *                                                 *
     *               CANCELAR TICKET                   *
     *                                                 *
     **************************************************/
        $scope.sysCancelTicketFn = function(data){
          console.log(data);
          ticketServices.cancelTicket(data).then(function(response){
            console.log(response);
            if(response.status==200){
              console.log("TICKET CANCELED SUCCESSFULLY");
                inform.add('El pedido N°: '+data.ticket.codTicket+' ha sido cancelado.',{
                  ttl:3000, type: 'success'
                });
                $scope.openTicketFn(data.ticket.idTicket);
                $scope.mainSwitchFn('search', null);
              }else if(response.status==404){
                console.log("Ticket cancel process has failed, contact administrator");
                inform.add('Error: [404] CTicket no ha sido cancelado conctate el area de soporte. ',{
                      ttl:5000, type: 'danger'
                });
              }else if(response.status==500){
                console.log("Ticket cancel process has failed, contact administrator");
                inform.add('Error: [500] Contacta al area de soporte. ',{
                      ttl:5000, type: 'danger'
                });
              }
          });
        }

     /**************************************************
     *                                                 *
     *       VERIFICAR TICKET ANTES DE CANCELAR        *
     *                                                 *
     **************************************************/
        $scope.cancelOption = 0;
        $scope.sysCheckTicketBeforeCancelFn = function(ticketID, idUser){
          console.clear();
            ticketServices.checkTicketBeforeCancel(ticketID).then(function(data){
              $scope.ticketResult = data;
              if($scope.ticketResult==1){
                inform.add('Se procede a cancelar el Ticket.',{
                  ttl:3000, type: 'success'
                });
                $('#CancelNotificationModal').modal('show');
                $scope.cancelOption = 3;
              }else{
                $scope.cancelOption = 2;
                $('#CancelNotificationModal').modal('show');
                inform.add('Se inicia la cancelacion que sera enviada para aprobacion.',{
                  ttl:3000, type: 'warning'
                });
              }
            });
        }

     /**************************************************
     *                                                 *
     *        CANCELACION DE  TICKET RECHAZADA         *
     *                                                 *
     **************************************************/
        $scope.sysRejectedChgOrCancelTicketFn = function(rsData ){
            console.clear();
            ticketServices.rejectedChOrCanTicket(rsData.idTicket, rsData.isChgOrCancel).then(function(data){
              $scope.ticketResult = data;
              if($scope.ticketResult){
                  if(rsData.isChgOrCancel==1){
                    console.log("[sysRejectedCancelTicketFn] => TICKET CHANGE REJECTED SUCCESSFULLY");
                  }else if(rsData.isChgOrCancel==0){
                    console.log("[sysRejectedCancelTicketFn] => TICKET CANCEL REJECTED SUCCESSFULLY");
                  }
                $scope.dhboard();

              }else{
                inform.add('Ticket no ha sido cancelado conctate el area de soporte.',{
                  ttl:3000, type: 'warning'
                });
              }
            });
        }

      /**************************************************
      *                                                 *
      *              CHANGE STATUS TICKET               *
      *                                                 *
      **************************************************/
        $scope.sysChangueStatusFn = function(ticketId, statusId){
            ticketServices.changueStatus(ticketId, statusId).then(function(data){});
        }

     /**************************************************
     *                                                 *
     *          UPDATE TICKET DELIVERY DATA            *
     *                                                 *
     **************************************************/
        $scope.sysUpdateTmpTicketFn = function(data){
            console.clear();
            ticketServices.updateTmpTicket(data).then(function(data){
              $scope.ticketResult = data;
              if($scope.ticketResult){
                console.log("TICKET DELIVERY DATA UPDATED SUCCESSFULLY");
                inform.add('Envio actualizado satisfactoriamente.',{
                  ttl:3000, type: 'success'
                });
                $scope.dhboard();

              }else{
                inform.add('Ticket no ha sido actualizado conctate el area de soporte.',{
                  ttl:3000, type: 'warning'
                });
              }
            });
        }

     /**************************************************
     *                                                 *
     *          UPDATE TICKET DELIVERY DATA            *
     *                                                 *
     **************************************************/
        $scope.sysTmpChangeAppliedFn = function(id, value){
            ticketServices.changeApplied(id,value).then(function(data){});
        }

     /**************************************************
     *                                                 *
     *        TEMPORAL DELIVERY OR CANCEL DATA         *
     *                                                 *
     **************************************************/
        $scope.rsTemp = {};
        $scope.sysTempDelivCancelDataFn = function(option){
          switch (option){
            case 1:
              /* ASSIGN THE VALUES TO THE ROWS AFFECTED TO ADD THE TEMPORAL DATA */
              $scope.rsTemp.ticket                           = {};
              $scope.rsTemp.ticket.idTicketKf                = $scope.tkupdate.idTicket;
              $scope.rsTemp.ticket.idUserRequestChOrCancel   = $scope.sessionIdUser;
              $scope.rsTemp.ticket.totalGestion              = 0;
              $scope.rsTemp.ticket.totalLlave                = 0;
              $scope.rsTemp.ticket.totalEnvio                = 0;
              $scope.rsTemp.ticket.totalService              = $scope.tkupdate.totalService;
              $scope.rsTemp.ticket.idUserAttendantKfDelivery = $scope.tkupdate.idUserAttendantKfDelivery;
              $scope.rsTemp.ticket.thirdPersonNames          = $scope.tkupdate.thirdPersonNames ;
              $scope.rsTemp.ticket.thirdPersonPhone          = $scope.tkupdate.thirdPersonPhone ;
              $scope.rsTemp.ticket.thirdPersonId             = $scope.tkupdate.thirdPersonId    ;
              $scope.rsTemp.ticket.idTypeDeliveryKf          = $scope.tkupdate.idTypeDeliveryKf ;
              $scope.rsTemp.ticket.idWhoPickUpKf             = $scope.tkupdate.idWhoPickUpKf;
              $scope.tktmporal.isChangeDeliverylRequested    = 1;
              console.log($scope.rsTemp);
              $scope.sysAddDeliveryDataTmpFn($http, $scope, 1);
            break;
            case 2:
              $scope.rsTemp.ticket                           = {};
              $scope.rsTemp.ticket.idTicketKf                = $scope.tkupdate.idTicket;
              $scope.rsTemp.ticket.idUserRequestChOrCancel   = $scope.sessionIdUser;
              $scope.rsTemp.ticket.reasonForCancelTicket     = $scope.tkupdate.reasonForCancelTicket;
              $scope.tktmporal.isCancelRequested             = 1;
              console.log($scope.rsTemp);
              $scope.sysAddDeliveryDataTmpFn($http, $scope, 2);
            break;
            case 3:
              $scope.rsTemp.ticket                           = {};
              $scope.rsTemp.ticket.idTicket                  = $scope.tkupdate.idTicket;
              $scope.rsTemp.ticket.idUserCancelTicket        = $scope.sessionIdUser;
              $scope.rsTemp.ticket.reasonForCancelTicket     = $scope.tkupdate.reasonForCancelTicket;
              $scope.rsTemp.ticket.idStatusTicketKfOld       = $scope.tkupdate.idStatusTicketKf;
              $scope.sysChangueStatusFn($scope.rsTemp.ticket.idTicket, 6);
              $scope.sysCancelTicketFn($scope.rsTemp);
            break;
          }
        }
        $scope.sysAddDeliveryDataTmpFn = function($http, $scope, option){
          /* PRINT THE ARRAY BEFORE UPDATE */
              console.log($scope.rsTemp);
            ticketServices.tmpDeliveryData($scope.rsTemp).then(function(data){
              $scope.ticketResult = data;
              if($scope.ticketResult){
                console.log("TEMPORAL DELIVERY DATA ADDED SUCCESSFULLY");
                  if(option==1){
                  $scope.rsData.ticket.isChangeDeliverylRequested = $scope.tktmporal.isChangeDeliverylRequested;
                  $scope.rsData.ticket.idUserHasChangeTicket      = null;
                  }else if(option==2){
                  $scope.rsData.ticket.isCancelRequested = $scope.tktmporal.isCancelRequested;
                  console.log($scope.rsData);
                  }
                  ticketServices.updateTicket($scope.rsData).then(function(data){
                      $scope.ticketResult = data;
                      if($scope.ticketResult){
                        if(option==1){
                          console.log("[isChangeDeliverylRequested] HAS BEEN SET TO 1");
                          inform.add('Solicitud de modificacion de envio ha sido enviada satisfactoriamente.',{
                          ttl:3000, type: 'success'
                          });
                          $('#UpdateModalDelivery').modal('hide');
                          $('#UpdateModalTicket').modal('hide');
                        }else if(option==2){
                          $('#UpdateModalTicket').modal('hide');
                          $('#CancelNotificationModal').modal('hide');
                          inform.add('Solicitud de cancelacion enviada satisfactoriamente.',{
                          ttl:3000,
                          });
                        }

                        $scope.dhboard();
                      }else{
                        inform.add('Ticket no ha sido actualizado, conctacta a el area de soporte.',{
                          ttl:3000, type: 'warning'
                        });
                      }
                  });
              }else{
                inform.add('Ticket no ha sido actualizado, conctacta a el area de soporte.',{
                  ttl:3000, type: 'warning'
                });
              }
            });
        }

     /**************************************************
     *                                                 *
     *                  UPDATE COMMENT                 *
     *                                                 *
     **************************************************/
        $scope.sendTicketComment2Update = function(){
              /* ASSIGN THE VALUES TO THE ROWS AFFECTED TO SAVE */
              $scope.rsData.ticket.descriptionComment  = $scope.tkupdate.descriptionComment;
              $scope.rsData.ticket.isCommentOrDesccriptionChange = 1;

              /* PRINT THE ARRAY BEFORE UPDATE */
              console.log($scope.rsData);
              ticketServices.updateTicket($scope.rsData).then(function(data){
                $scope.ticketResult = data;
                if($scope.ticketResult){
                  console.log("TICKET UPDATED SUCCESSFULLY");
                  inform.add('El comentario sobre el ticket ha sido actualizado satisfactoriamente.',{
                    ttl:3000, type: 'success'
                  });
                  $scope.editComment = false;
                  $scope.dhboard();
                }else{
                  inform.add('Ticket no ha sido actualizado, conctacta a el area de soporte.',{
                    ttl:3000, type: 'warning'
                  });
                }
            });
        }

     /**************************************************
     *                                                 *
     *              UPDATE DESCRIPTION                 *
     *                                                 *
     **************************************************/
        $scope.sendTicketDescription2Update = function(){
              /* ASSIGN THE VALUES TO THE ROWS AFFECTED TO SAVE */
              $scope.rsData.ticket.descriptionOrder  = $scope.tkupdate.descriptionOrder;
              $scope.rsData.ticket.isCommentOrDesccriptionChange = 1;

              /* PRINT THE ARRAY BEFORE UPDATE */
              console.log($scope.rsData);
              ticketServices.updateTicket($scope.rsData).then(function(data){
                $scope.ticketResult = data;
                if($scope.ticketResult){
                  console.log("TICKET UPDATED SUCCESSFULLY");
                  inform.add('La descripción del servicio ha sido actualizado satisfactoriamente.',{
                    ttl:3000, type: 'success'
                  });
                  $scope.editDescript = false;
                  $scope.dhboard();
                }else{
                  inform.add('Ticket no ha sido actualizado, conctacta a el area de soporte.',{
                    ttl:3000, type: 'warning'
                  });
                }
            });
        }

      /**************************************************
      *                                                 *
      *               TICKET FILTER LIST                *
      *                                                 *
      **************************************************/
        $scope.ticketFiltered = function(){
          return function(item){
            if($scope.sysLoggedUser.idProfileKf!=1){
              while(item.sendUserNotification!=0){
                return true
              }
              return false;
            }else{
              return true;
            }
          }
        }

        $scope.removeFilterFn = function(option){
            switch(option){

              case 1:
                $scope.filterCompanyKf.selected=undefined;
                $scope.customerSearch.name=undefined;
                $scope.listOffices=[];
                $scope.filterAddressKf.selected=undefined;
                $scope.customerFound = {};
              break;
              case 2:
                if ($scope.customerFound.idClientTypeFk=="2" || $scope.customerFound.idClientTypeFk=="4"){
                  $scope.filterCompanyKf.selected=undefined;
                  $scope.customerSearch.name=undefined;
                  $scope.customerFound = {};
                }
                $scope.filterAddressKf.selected=undefined;
              break;
              case 3:
              break;
              case 4:
              break;
              case 5:
              break;
              case 6:
              break;
            }

        }
        $scope.systemChgValueFn = function(value, bol){
          switch(value){
            case "comment":
              $scope.editComment=bol;
              if(bol==true){
                $scope.tkupdate.descriptionCommentTmp=$scope.tkupdate.descriptionComment;
                $scope.tkupdate.descriptionComment="";
              }else{
                $scope.tkupdate.descriptionComment=$scope.tkupdate.descriptionCommentTmp;
              }
            break;
            case "descript":
              $scope.editDescript=bol;
              if(bol==true){
                $scope.tkupdate.descriptionOrderTmp=$scope.tkupdate.descriptionOrder;
                    $scope.tkupdate.descriptionOrder="";
              }else{
                $scope.tkupdate.descriptionOrder=$scope.tkupdate.descriptionOrderTmp;
              }
            break;
          }
        }
        $scope.rsTmp = {};
        $scope.rsJsonData = {};
        $scope.sysChkChangeOrCancel = function(value){
          $scope.rsJsonData = {};
          switch (value){
            case 0:
              /*TICKETS RECHAZADOS */
              ticketServices.getTickets2Check(0).then(function(data){
                $scope.rsJsonData = (data.tickets_all);
                //console.log($scope.rsJsonData);
                if($scope.rsJsonData){
                console.log("[sysChkChangeOrCancel] => Tickets with change or cancel rejected found");
                  var listOfTicketsLength = $scope.rsJsonData.length;
                  for (i = 0; i < listOfTicketsLength; i++) {
                    //console.log("for i: "+i);
                      if($scope.rsJsonData[i].isCancelRequested && $scope.rsJsonData[i].tmp_isCancelApproved==0){
                            $scope.rsTmp = {};
                            $scope.rsTmp.idTicket                    = $scope.rsJsonData[i].idTicket;
                            $scope.rsTmp.isChgOrCancel               = 0;

                            $scope.sysRejectedChgOrCancelTicketFn($scope.rsTmp);
                            console.log("[sysChkChangeOrCancel] => Cancel TIckets rejected Found => Updating tickets");
                            $scope.sysTmpChangeAppliedFn($scope.rsJsonData[i].idTmpDeliveryData,0);

                      }else if($scope.rsJsonData[i].isChangeDeliverylRequested && $scope.rsJsonData[i].tmp_isChApproved==0){
                            $scope.rsTmp = {};
                            $scope.rsTmp.idTicket                    = $scope.rsJsonData[i].idTicket;
                            $scope.rsTmp.isChgOrCancel               = 1;

                            $scope.sysRejectedChgOrCancelTicketFn($scope.rsTmp);
                            console.log("[sysChkChangeOrCancel] => Change TIckets Approved Found => Updating tickets");
                            $scope.sysTmpChangeAppliedFn($scope.rsJsonData[i].idTmpDeliveryData,0);
                      }
                  };
                }else{
                  console.log("[sysChkChangeOrCancel] => No changes or cancel Tickets rejected Found.");
                }
              });
            break;
            case 1:
              /*TICKETS APROBADOS */
              ticketServices.getTickets2Check(1).then(function(data){
                $scope.rsJsonData = (data.tickets_all);
                //console.log($scope.rsJsonData);
                if($scope.rsJsonData){
                console.log("[sysChkChangeOrCancel] => Tickets with change or cancel approved found");
                  var listOfTicketsLength = $scope.rsJsonData.length;
                  for (i = 0; i < listOfTicketsLength; i++) {
                    //console.log("for i: "+i);
                      if($scope.rsJsonData[i].isCancelRequested && $scope.rsJsonData[i].tmp_isCancelApproved==1){
                            $scope.rsTmp = {};
                            $scope.rsTmp.ticket                        = $scope.rsJsonData[i];
                            $scope.rsTmp.ticket.idTicket               = $scope.rsJsonData[i].idTicket;
                            $scope.rsTmp.ticket.idUserCancelTicket     = $scope.rsJsonData[i].tmp_idUserRequestChOrCancel;
                            $scope.rsTmp.ticket.reasonForCancelTicket  = $scope.rsJsonData[i].tmp_reasonForCancelTicket;

                            $scope.sysCancelTicketFn($scope.rsTmp);
                            console.log("[sysChkChangeOrCancel] => Cancel TIckets Approved Found => Updating tickets");
                            console.log($scope.rsTmp);
                            $scope.sysChangueStatusFn($scope.rsTmp.ticket.idTicket, 6);
                            $scope.sysTmpChangeAppliedFn($scope.rsJsonData[i].idTmpDeliveryData,1);

                      }else if($scope.rsJsonData[i].isChangeDeliverylRequested && $scope.rsJsonData[i].tmp_isChApproved==1){
                            $scope.rsTmp = {};
                            $scope.rsTmp.ticket                            = $scope.rsJsonData[i];
                            $scope.rsTmp.ticket.idTicket                    = $scope.rsJsonData[i].idTicket;
                            $scope.rsTmp.ticket.idUserHasChangeTicket       = $scope.rsJsonData[i].tmp_idUserRequestChOrCancel;
                            $scope.rsTmp.ticket.thirdPersonNames            = $scope.rsJsonData[i].tmp_thirdPersonNames;
                            $scope.rsTmp.ticket.thirdPersonPhone            = $scope.rsJsonData[i].tmp_thirdPersonPhone;
                            $scope.rsTmp.ticket.thirdPersonId               = $scope.rsJsonData[i].tmp_thirdPersonId;
                            $scope.rsTmp.ticket.idUserAttendantKfDelivery   = $scope.rsJsonData[i].tmp_idUserAttendantKfDelivery;
                            $scope.rsTmp.ticket.idTypeDeliveryKf            = $scope.rsJsonData[i].tmp_idTypeDeliveryKf;
                            $scope.rsTmp.ticket.totalService                = $scope.rsJsonData[i].tmp_totalService;
                            $scope.rsTmp.ticket.idWhoPickUpKf               = $scope.rsJsonData[i].tmp_idWhoPickUpKf;

                            $scope.sysUpdateTmpTicketFn($scope.rsTmp);
                            console.log("[sysChkChangeOrCancel] => Change TIckets Approved Found => Updating tickets");
                            console.log($scope.rsTmp);
                            $scope.sysTmpChangeAppliedFn($scope.rsJsonData[i].idTmpDeliveryData,1);
                      }
                  };
                }else{
                  console.log("[sysChkChangeOrCancel] => No changes or cancel Tickets Approved Found.");
                }
              });
            break;

          }
        }
    /**************************************************
    *                                                 *
    *                 Address By Owner id             *
    *                                                 *
    **************************************************/
        $scope.ListTenantAddress = [];
        $scope.getAddressByidTenantFn = function(idUser, idTypeTenant, idStatus){
          addressServices.getAddressByidTenant(idUser,idTypeTenant,idStatus).then(function(response){
                if(response.status==200){
                    $scope.ListTenantAddress = response.data;
                }else if (response.status==404){
                    $scope.ListTenantAddress = [];
                }else if (response.status==500){
                    $scope.ListTenantAddress = [];
                    inform.add('[Error]: '+response.status+', Ocurrio error intenta de nuevo o contacta el area de soporte. ',{
                        ttl:5000, type: 'danger'
                    });
                }
            });
        }
    /**************************************************
    *                                                 *
    *                GET DELIVERY TYPES               *
    *                                                 *
    **************************************************/
        $scope.typedelivery = [];
        $scope.getDeliveryTypesFn = function(){
            $scope.typedelivery = [];
            ticketServices.typeDelivery().then(function(response){
                if(response.status==200){
                    $scope.typedelivery = response.data;
                }else if (response.status==404){
                    $scope.typedelivery = [];
                    inform.add('No hay tipos de deliverys registrados, contacte al area de soporte de BSS.',{
                    ttl:5000, type: 'warning'
                    });
                }else if (response.status==500){
                    $scope.typedelivery = [];
                    inform.add('[Error]: '+response.status+', Ha ocurrido un error en la comunicacion con el servidor, contacta el area de soporte. ',{
                    ttl:5000, type: 'danger'
                    });
                }
            });
        };
    /**************************************************
    *                                                 *
    *                GET PAYMENTS TYPES               *
    *                                                 *
    **************************************************/
      $scope.paymentsType = [];
      $scope.getPaymentsTypeFn = function(){
          $scope.paymentsType = [];
          ticketServices.paymentsType().then(function(response){
              if(response.status==200){
                  $scope.paymentsType = response.data;
              }else if (response.status==404){
                  $scope.paymentsType = [];
                  inform.add('No hay tipos de Pagos registrados, contacte al area de soporte de BSS.',{
                  ttl:5000, type: 'warning'
                  });
              }else if (response.status==500){
                  $scope.paymentsType = [];
                  inform.add('[Error]: '+response.status+', Ha ocurrido un error en la comunicacion con el servidor, contacta el area de soporte. ',{
                  ttl:5000, type: 'danger'
                  });
              }
          });
      };
      $scope.manualPaymentsType = [];
      $scope.getManualPaymentsTypeFn = function(){
          $scope.manualPaymentsType = [];
          ticketServices.manualPaymentsType().then(function(response){
              if(response.status==200){
                  $scope.manualPaymentsType = response.data;
              }else if (response.status==404){
                  $scope.manualPaymentsType = [];
                  inform.add('No hay tipos de Pagos manuales registrados, contacte al area de soporte de BSS.',{
                  ttl:5000, type: 'warning'
                  });
              }else if (response.status==500){
                  $scope.manualPaymentsType = [];
                  inform.add('[Error]: '+response.status+', Ha ocurrido un error en la comunicacion con el servidor, contacta el area de soporte. ',{
                  ttl:5000, type: 'danger'
                  });
              }
          });
      };
    /**************************************************
    *                                                 *
    *   GET COST OF SERVICES BY CUSTOMER ID           *
    *                                                 *
    **************************************************/
      $scope.getServiceCostByCustomerFn = function(data){
        serviceServices.getServiceCostByCustomer(data).then(function(response) {
            if(response.status==200){
                $scope.ticket.cost.service = Number(response.data[0].cost);
                $scope.customerCosts=true;
            }else if (response.status==404){
                inform.add('El consorcio no presenta costos de servicios asociados, contacte al area de soporte de BSS.',{
                    ttl:3000, type: 'warning'
                });
                $scope.customerCosts=false;
                $scope.ticket.cost.service = 0;
            }else if (response.status==500){
                inform.add('Ocurrio un error, contacte al area de soporte de BSS.',{
                ttl:3000, type: 'danger'
                });
                $scope.ticket.cost.service = 0;
                $scope.customerCosts=false;
            }
        });
      }
      $scope.rsCustomerInterneServices = [];
      $scope.rsControlAccessAssociated = false;
      $scope.checkControlAccessStateFn = function(idClient){
          $scope.rsCustomerInterneServices = [];
          //console.log("Getting --> ControlAccessDoorsAssociatedToACustomerFn");
          CustomerServices.getCheckControlAccessState(idClient).then(function(response){
              if(response.status==200){
                  console.log(response.data);
                  if($scope.ticket.building!=undefined && (
                      (($scope.ticket.building.initial_delivery.length==0 || ($scope.ticket.building.initial_delivery.length==1 && $scope.ticket.building.initial_delivery[0].expiration_state!=undefined && !$scope.ticket.building.initial_delivery[0].expiration_state))) ||
                      ($scope.ticket.building.isStockInBuilding!=null && $scope.ticket.building.isStockInBuilding!='0')||
                      ($scope.ticket.building.isStockInOffice!=null && $scope.ticket.building.isStockInOffice!='0'))){
                      for (var srv in response.data){
                          console.info(response.data[srv])
                          if (response.data[srv].idServiceAsociateFk_array!=undefined && response.data[srv].idServiceAsociateFk_array.length>0){
                              console.info(response.data[srv].idServiceAsociateFk_array.length);
                              console.info(response.data[srv].idServiceAsociateFk_array);
                              console.info(response.data[srv].idServiceAsociateFk_array[0]);
                              for (var srva in response.data[srv].idServiceAsociateFk_array){
                                  console.info(response.data[srv].idServiceAsociateFk_array[srva])
                                  if (response.data[srv].idServiceAsociateFk_array[srva]!=null && response.data[srv].idServiceAsociateFk_array[srva][0].idClientServicesAccessControl!=undefined){
                                      $scope.getCostByCustomer.rate.deviceIsOnline="1";
                                      $scope.getCostByCustomer.rate.hasStock="1";
                                      console.log($scope.getCostByCustomer);
                                      $scope.getServiceCostByCustomerFn($scope.getCostByCustomer);
                                      $scope.rsControlAccessAssociated = true;
                                      break;
                                  }else{
                                      console.log($scope.getCostByCustomer);
                                      $scope.rsControlAccessAssociated = false;
                                  }
                              }
                              if (!$scope.rsControlAccessAssociated){
                                  $scope.getCostByCustomer.rate.deviceIsOnline="2";
                                  $scope.getCostByCustomer.rate.hasStock="1";
                                  //console.log($scope.getCostByCustomer);
                                  $scope.getServiceCostByCustomerFn($scope.getCostByCustomer);
                              }
                          }else{
                              $scope.getCostByCustomer.rate.deviceIsOnline="2";
                              //console.log($scope.getCostByCustomer);
                              $scope.getCostByCustomer.rate.hasStock="1";
                              $scope.getServiceCostByCustomerFn($scope.getCostByCustomer);
                          }
                          if ($scope.rsControlAccessAssociated){
                              break;
                          }
                      }
                  }else{
                      $scope.getCostByCustomer.rate.deviceIsOnline="2";
                      $scope.getCostByCustomer.rate.hasStock="0";
                      $scope.getServiceCostByCustomerFn($scope.getCostByCustomer);
                  }
              }else if (response.status==404){
                  console.log(response.data);
                  console.log($scope.ticket.building);
                  if($scope.ticket.building!=undefined && (
                      ($scope.ticket.building.initial_delivery.length==0 || ($scope.ticket.building.initial_delivery.length==1 && $scope.ticket.building.initial_delivery[0].expiration_state!=undefined && !$scope.ticket.building.initial_delivery[0].expiration_state)) ||
                      ($scope.ticket.building.isStockInBuilding=="1" && $scope.ticket.building.isStockInBuilding!=null && $scope.ticket.building.isStockInBuilding!='0')||
                      ($scope.ticket.building.isStockInOffice=="1" && $scope.ticket.building.isStockInOffice!=null && $scope.ticket.building.isStockInOffice!='0'))){
                      console.log($scope.ticket.building);
                      $scope.getCostByCustomer.rate.deviceIsOnline="2";
                      $scope.getCostByCustomer.rate.hasStock="1";
                      $scope.getServiceCostByCustomerFn($scope.getCostByCustomer);
                  }else{
                      console.log($scope.ticket.building);
                      $scope.getCostByCustomer.rate.deviceIsOnline="2";
                      $scope.getCostByCustomer.rate.hasStock="0";
                      $scope.getServiceCostByCustomerFn($scope.getCostByCustomer);
                  }
              }else if (response.status==500){
                  console.log(response.data);
                  inform.add('[Error]: '+response.status+', Ocurrio error intenta de nuevo o contacta el area de soporte. ',{
                      ttl:5000, type: 'danger'
                  });
              }
          });
          //console.log($scope.rsCustomerInterneServices);
      }
    /**************************************************
    *                                                 *
    *            GET ADMINISTRATION LIST              *
    *                                                 *
    **************************************************/
      $scope.getAdminListFn = function() {
        $scope.administrationList = [];
        $scope.globalGetCustomerListFn(null,"0",1,"","",null).then(function(data) {
          $scope.administrationList = data.customers;
        }, function(err) {
            $scope.administrationList = [];
        });
      };
    /**************************************************
    *                                                 *
    *            GET ADMINISTRATION LIST              *
    *                                                 *
    **************************************************/
      $scope.getCompaniesListFn = function() {
        $scope.companiesList = [];
        $scope.globalGetCustomerListFn(null,"0",3,"","",null).then(function(data) {
          $scope.companiesList = data.customers;
        }, function(err) {
            $scope.companiesList = [];
        });
      };
    /**************************************************
    *                                                 *
    *            GET CATEGORY KEYS CHAIN              *
    *                                                 *
    **************************************************/
      $scope.rsCategoryKeyChainsData = [];
      $scope.getCategoryKeyChainsFn = function(){
          UtilitiesServices.CategoryKeyChains().then(function(response){
              if(response.status==200){
                  $scope.rsCategoryKeyChainsData = response.data;
              }else{
                  $scope.rsCategoryKeyChainsData = [];
              }
          });
          //console.log($scope.rsCategoryKeyChainsData);
      };$scope.getCategoryKeyChainsFn("");
    /**************************************************
    *                                                 *
    *                 LIST ALL KEYS                   *
    *                                                 *
    **************************************************/
          $scope.rsAllKeychainListData = [];

          $scope.keychainSearch={
            "idClientKf":null,
            "idCategoryKf":null,
            "idKeychainStatusKf":null,
            "idDepartmenKf":null,
            "codeSearch":null,
            "create_at":null,
            "start":null,
            "limit":null,
            "strict":null,
            "totalCount":null,
          };
          $scope.isCodeExist      = null;
          $scope.isCodeNewExist   = null;
          $scope.getKeychainListFn = function(idClientKf,create_at,idCategoryKf,idKeychainStatusKf,idDepartmenKf,idReasonKf,codeSearch,start,limit,strict,totalCount,showFull,getTicketKeychainKf){
              $scope.rsNewKeychainList     = [];
              $scope.list_new_keys         = [];
              //console.log("idClientKf           : "+idClientKf);
              //console.log("create_at            : "+create_at);
              //console.log("idCategoryKf         : "+idCategoryKf);
              //console.log("idKeychainStatusKf   : "+idKeychainStatusKf);
              //console.log("idReasonKf           : "+idReasonKf);
              //console.log("codeSearch            : "+codeSearch);
              //console.log("start                : "+start);
              //console.log("limit                : "+limit);
              //console.log("strict               : "+strict);
              //console.log("totalCount           : "+totalCount);
              var idClientKf              = idClientKf!=undefined && idClientKf!=null?idClientKf:null;
              var idCategoryKf            = idCategoryKf!=undefined && idCategoryKf!="" && idCategoryKf!=null?idCategoryKf:null;
              var idKeychainStatusKf      = idKeychainStatusKf!=undefined && idKeychainStatusKf!="" && idKeychainStatusKf!=null?idKeychainStatusKf:null;
              var idDepartmenKf           = idDepartmenKf!=undefined && idDepartmenKf!="" && idDepartmenKf!=null?idDepartmenKf:null;
              var idReasonKf              = idReasonKf!=undefined && idReasonKf!="" && idReasonKf!=null?idReasonKf:null;
              var sysLoggedUserProfile    = $scope.sysLoggedUser.idProfileKf;
              var codeSearch              = codeSearch!=undefined && codeSearch!="" && codeSearch!=null?codeSearch:null;
              var create_at               = create_at!=undefined && create_at!="" && create_at!=null?create_at:null;
              var start                   = start!=undefined && start!=null && !strict?start:"";
              var limit                   = limit!=undefined && limit!=null && !strict?limit:"";
              var strict                  = strict!=false && strict!=undefined && strict!=null?strict:null;
              var totalCount              = totalCount!=false && totalCount!=undefined && totalCount!=null?totalCount:null;
              var getTicketKeychainKf     = getTicketKeychainKf!=undefined && getTicketKeychainKf!="" && getTicketKeychainKf!=null?getTicketKeychainKf:null;

              console.log("=================================================");
              console.log("                 getKeychainListFn               ");
              console.log("=================================================");
              console.log("idClientKf           : "+idClientKf);
              console.log("create_at            : "+create_at);
              console.log("idCategoryKf         : "+idCategoryKf);
              console.log("idKeychainStatusKf   : "+idKeychainStatusKf);
              console.log("idDepartmenKf        : "+idDepartmenKf);
              console.log("idReasonKf           : "+idReasonKf);
              console.log("codeSearch           : "+codeSearch);
              console.log("sysLoggedUserProfile : "+sysLoggedUserProfile);
              console.log("start                : "+start);
              console.log("limit                : "+limit);
              console.log("strict               : "+strict);
              console.log("totalCount           : "+totalCount);
              console.log("showFull             : "+showFull);
              console.log("getTicketKeychainKf  : "+getTicketKeychainKf);
              $scope.keychainSearch={
                  "idClientKf":idClientKf,
                  "idCategoryKf":idCategoryKf,
                  "idKeychainStatusKf":idKeychainStatusKf,
                  "idDepartmenKf":idDepartmenKf,
                  "idReasonKf":idReasonKf,
                  "codeSearch":codeSearch,
                  "sysLoggedUserProfile":sysLoggedUserProfile,
                  "create_at":create_at,
                  "start":start,
                  "limit":limit,
                  "strict":strict,
                  "totalCount":totalCount,
                  "getTicketKeychainKf":getTicketKeychainKf
                };
              KeysServices.getKeychainList($scope.keychainSearch).then(function(response){
                  console.log(response);
                  if(response.status==200){
                    if (showFull){
                      console.log(response.data);
                      var tk_selected = 0;
                      var Depto = $scope.tkupdate.department.floor+"-"+$scope.tkupdate.department.departament;
                      console.log("id Department:"+$scope.tkupdate.department.idClientDepartament);
                      console.log("Departamento:"+Depto);
                      $scope.rsAllKeychainListData   = response.data.tb_keychain;
                      //for (var tkey in $scope.tkupdate.keys){
                      //  for (var stock in $scope.rsAllKeychainListData){
                      //    if ($scope.tkupdate.keys[tkey].idProduct == $scope.rsAllKeychainListData[stock].idProductKf && tk_selected<$scope.tkupdate.keys.length){
                      //      $scope.rsAllKeychainListData[stock].selected = true;
                      //      tk_selected++;
                      //      console.log($scope.rsAllKeychainListData[stock]);
                      //    }
                      //  }
                      //}
                      for (var tkey in $scope.tkupdate.keys){
                        for (var stock in $scope.rsAllKeychainListData){
                          if ($scope.tkupdate.keys[tkey].idProduct == $scope.rsAllKeychainListData[stock].idProductKf && tk_selected<$scope.tkupdate.keys.length){
                            if ($scope.rsNewKeychainList.length==0){
                              for (var i = 0; i < $scope.rsExistingKeyList.length; i++) {
                                if ($scope.rsExistingKeyList[i].codigo==$scope.rsAllKeychainListData[stock].codigo){
                                  //inform.add("El Llavero con el Codigo: ["+$scope.rsAllKeychainListData[stock].codigo+"], ya existe en el Departamento "+$scope.rsExistingKeyList[i].Depto,{
                                  //  ttl:15000, type: 'warning'
                                  //});
                                  $scope.isCodeExist=true;
                                  break;
                                  //console.log($scope.isCodeExist);
                                }else{
                                  $scope.isCodeExist=false;
                                  //console.log($scope.isMailExist);
                                }
                              }
                            }
                            if ($scope.rsNewKeychainList.length>0){
                              for (var i = 0; i < $scope.rsNewKeychainList.length; i++) {
                                if ($scope.rsNewKeychainList[i].codigo==$scope.rsAllKeychainListData[stock].codigo){
                                  //inform.add("El Llavero con el Codigo: ["+obj.codigo+"], ya existe en en la nueva lista a asignar en el Departamento "+obj.Depto,{
                                  //  ttl:15000, type: 'warning'
                                  //});
                                  $scope.isCodeNewExist=true;
                                  break;
                                  //console.log($scope.isMailExist);
                                }else{
                                  $scope.isCodeNewExist=false;
                                  //console.log($scope.isMailExist);
                                }
                              }
                            }
                            console.log("isCodeExis: "+$scope.isCodeExis+" "+"isCodeNewExist: "+$scope.isCodeNewExist)
                            if(!$scope.isCodeExist && !$scope.isCodeNewExist){
                              console.log("ADD_NO_EXIST");
                              var idKeychainStatusKf = $scope.ticket.idMgmtMethodKf=='1'?$scope.rsAllKeychainListData[stock].idKeychainStatus:0
                              var statusKey = $scope.ticket.idMgmtMethodKf=='1'?'Activo':'Inactivo'
                              $scope.rsNewKeychainList.push({"idKeychain":$scope.rsAllKeychainListData[stock].idKeychain, "idProductKf":$scope.rsAllKeychainListData[stock].idProductKf,"descriptionProduct":$scope.rsAllKeychainListData[stock].descriptionProduct,"categoryKeychain":"Departamento","Depto":Depto, "codExt":$scope.rsAllKeychainListData[stock].codExt,"codigo":$scope.rsAllKeychainListData[stock].codigo,"idDepartmenKf":$scope.tkupdate.department.idClientDepartament,"idClientKf":$scope.rsAllKeychainListData[stock].idClientKf,"idUserKf":null,"idCategoryKf":"1","isKeyTenantOnly":null,"idClientAdminKf":null,"idKeychainStatusKf":idKeychainStatusKf, "statusKey":statusKey, "doors":{}});
                              $scope.list_new_keys.push({"idKeychain":$scope.rsAllKeychainListData[stock].idKeychain, "idProductKf":$scope.rsAllKeychainListData[stock].idProductKf,"descriptionProduct":$scope.rsAllKeychainListData[stock].descriptionProduct,"categoryKeychain":"Departamento","Depto":Depto, "codExt":$scope.rsAllKeychainListData[stock].codExt,"codigo":$scope.rsAllKeychainListData[stock].codigo,"idDepartmenKf":$scope.tkupdate.department.idClientDepartament,"idClientKf":$scope.rsAllKeychainListData[stock].idClientKf,"idUserKf":null,"idCategoryKf":"1","isKeyTenantOnly":null,"idClientAdminKf":null,"idKeychainStatusKf":idKeychainStatusKf, "statusKey":statusKey, "doors":{}});
                              $scope.rsAllKeychainListData[stock].selected = true;
                              tk_selected++;
                            }
                            for (var i = 0; i < $scope.tkupdate.keys.length; i++) {
                              // Ensure the index exists in rsNewKeychainList
                              if ($scope.rsNewKeychainList[i]) {
                                  // Set the doors property based on the index
                                  $scope.rsNewKeychainList[i].doors = $scope.tkupdate.keys[i].doors;
                              }
                              if ($scope.list_new_keys[i]) {
                                // Set the doors property based on the index
                                $scope.list_new_keys[i].doors = $scope.tkupdate.keys[i].doors;
                            }
                            }
                          }
                        }
                      }
                      if (response.data.totalCount!=undefined){
                          $scope.pagination.totalCount    = response.data.totalCount;
                      }
                      console.log($scope.rsNewKeychainList);
                      console.log($scope.tkupdate);
                      console.log($scope.rsAllKeychainListData);
                    }else{
                      $scope.rsAllKeychainListData   = response.data.tb_keychain;
                    }
                  }else if(response.status==404){
                      inform.add('[Info]: No se encontraron Llaveros en Stock. ',{
                          ttl:5000, type: 'info'
                          });
                          $scope.rsAllKeychainListData = [];
                  }else if(response.status==500){
                      inform.add('[Error]: '+response.status+', Ha ocurrido un error en la comunicacion con el servidor, contacta el area de soporte. ',{
                      ttl:5000, type: 'danger'
                      });
                      $scope.rsAllKeychainListData = [];
                  }
              });
          };
          $scope.rsAllKeychainProcessesData = [];
          $scope.keychainProcessSearch={
              "idTypeTicketKf":null,
              "idClientKf":null,
              "idCategoryKf":null,
              "create_at":null,
              "start":null,
              "limit":null,
              "strict":null,
              "totalCount":null,
            };
          $scope.getKeychainProcessFn = function(idTypeTicketKf,idClientKf,create_at,idCategoryKf,start,limit,strict,totalCount){

              //console.log("idTypeTicketKf : "+idTypeTicketKf);
              //console.log("idClientKf     : "+idClientKf);
              //console.log("create_at      : "+create_at);
              //console.log("idCategoryKf   : "+idCategoryKf);
              //console.log("start          : "+start);
              //console.log("limit          : "+limit);
              //console.log("strict         : "+strict);
              //console.log("totalCount     : "+totalCount);
              var idTypeTicketKf      = idTypeTicketKf!=undefined && idTypeTicketKf!="" && idTypeTicketKf!=null?idTypeTicketKf:null;
              var idClientKf          = idClientKf!=undefined && idClientKf!=null?idClientKf:null;
              var create_at           = create_at!=undefined && create_at!="" && create_at!=null?create_at:null;
              var idCategoryKf        = idCategoryKf!=undefined && idCategoryKf!="" && idCategoryKf!=null?idCategoryKf:null;
              var start               = start!=undefined && start!=null && !strict?start:"";
              var limit               = limit!=undefined && limit!=null && !strict?limit:"";
              var strict              = strict!=false && strict!=undefined && strict!=null?strict:null;
              var totalCount          = totalCount!=false && totalCount!=undefined && totalCount!=null?totalCount:null;
              console.log("=================================================");
              console.log("              getKeychainProcessFn               ");
              console.log("=================================================");
              console.log("idTypeTicketKf : "+idTypeTicketKf);
              console.log("idClientKf     : "+idClientKf);
              console.log("create_at      : "+create_at);
              console.log("idCategoryKf   : "+idCategoryKf);
              console.log("start          : "+start);
              console.log("limit          : "+limit);
              console.log("strict         : "+strict);
              console.log("totalCount     : "+totalCount)
              $scope.keychainProcessSearch={
                  "idTypeTicketKf":idTypeTicketKf,
                  "idClientKf":idClientKf,
                  "create_at":create_at,
                  "idCategoryKf":idCategoryKf,
                  "start":start,
                  "limit":limit,
                  "strict":strict,
                  "totalCount":totalCount,
                };
              KeysServices.getKeychainProcess($scope.keychainProcessSearch).then(function(response){
                  if(response.status==200){
                      $scope.rsAllKeychainProcessesData   = response.data.tb_keychain_process_events;
                      if (response.data.totalCount!=undefined){
                          $scope.pagination.totalCount    = response.data.totalCount;
                      }
                      console.log(response.data);
                  }else if(response.status==404){
                      inform.add('[Info]: No se encontraron registros. ',{
                          ttl:5000, type: 'info'
                          });
                          $scope.rsAllKeychainProcessesData = [];
                  }else if(response.status==500){
                      inform.add('[Error]: '+response.status+', Ha ocurrido un error en la comunicacion con el servidor, contacta el area de soporte. ',{
                      ttl:5000, type: 'danger'
                      });
                      $scope.rsAllKeychainProcessesData = [];
                  }
              });
          };
          $scope.pageChanged = function(){
              console.info($scope.pagination.pageIndex);
              console.log("$scope.sysContent: "+$scope.sysContent);
              console.log("$scope.select.codeSearch: "+$scope.select.codeSearch);
              var pagIndex         = ($scope.pagination.pageIndex-1)*($scope.pagination.pageSizeSelected);
              var idKeychainStatus = $scope.select.keychainStatus!=undefined && $scope.select.keychainStatus!=null && $scope.select.keychainStatus!=''?$scope.select.keychainStatus.idKeychainStatus:null;
              var codeSearch       = $scope.select.codeSearch!=undefined && $scope.select.codeSearch!=null && $scope.select.codeSearch!=''?$scope.select.codeSearch:null;
              var idReasonKf       = $scope.select.keychainStatus!=undefined && $scope.select.keychainStatus!=null && $scope.select.keychainStatus!='' && $scope.select.reasonKf!=undefined && $scope.select.reasonKf!=null && $scope.select.reasonKf!=''?$scope.select.reasonKf.idReasonDisabledItem:null;
              if ($scope.sysContent=='listKeys'){
                  $scope.getKeychainListFn($scope.customerFound.idClient,null, $scope.select.filterCategoryKey,idKeychainStatus,$scope.select.idDepartmenKf,idReasonKf,codeSearch,pagIndex,$scope.pagination.pageSizeSelected, false, false);
              }else{
                  $scope.getKeychainProcessFn($scope.select.idTypeTicketKf,$scope.customerFound.idClient,null,$scope.select.filterCategoryKey,pagIndex,$scope.pagination.pageSizeSelected, false, false);
              }

          }
    /**************************************************
    *                                                 *
    * DEPARTMENT LIST BY SELECTED ADDRESS AND TENANT  *
    *                                                 *
    **************************************************/
          $scope.getDeptoListByAddress = function (idAddress){
            if(idAddress!=undefined){
                $scope.ListDpto=[];
                var idStatusFk='-1';
                DepartmentsServices.byIdDireccion(idAddress, idStatusFk).then(function(response) {
                    if(response.status==200){
                        $scope.ListDpto = response.data;
                    }else if (response.status==404){
                        $scope.ListDpto = [];
                        inform.add('No hay departamentos en esta direccion para ser asociados, contacte al area de soporte de TASS.',{
                        ttl:5000, type: 'danger'
                        });
                    }
                });
            }
          };
    /**************************************************
    *            SHOW ONLY ADMIN AND COMPANY          *
    *                 CUSTOMER OPTIONS                *
    **************************************************/
      $scope.checkDeliveryMethod = function(item){
        if($scope.ticket.building!=undefined && ($scope.ticket.building.isStockInBuilding=='1' || (($scope.ticket.building.isStockInBuilding==null || $scope.ticket.building.isStockInBuilding=='0') && ($scope.ticket.building.isStockInOffice==null || $scope.ticket.building.isStockInOffice=='0')))){
            return item.idTypeDelivery != "1";
        }else{
            return item.idTypeDelivery;
        }

      };
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
            "strict":strict,
            "totalCount":null,
            };
            console.log($scope.customersSearch);
            return CustomerServices.getCustomerListLimit($scope.customersSearch).then(function(response){
            console.info(response);
            if(response.status==200){
                return response.data;
            }else if(response.status==404){
              inform.add('[Info]: '+response.data.error+'.',{
                ttl:5000, type: 'info'
              });
                return response;
            }
            });
        }
    /**************************************************
    *                                                 *
    *                 SEARCH CUSTOMERS                *
    *                                                 *
    **************************************************/
        $scope.getCustomerBusinessNameByIdFn = function(clientId){
          //console.log("getCustomerBusinessNameByIdFn: "+clientId);
          var arrCompanySelect = [];
          if (clientId!=undefined){
            CustomerServices.getCustomersById(clientId).then(function(response){
              if(response.status==200){
                //console.log(response.data);
                arrCompanySelect.push(response.data);
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
        $scope.searchCustomerFound=false;
        $scope.findCustomerFn=function(string, typeClient, strict){
          if(event.keyCode === 8 || event.which === 8){
            console.log("event.which: "+event.which);
            $scope.listOffices=[];
            $scope.filterCompanyKf.selected=undefined;
            $scope.filterAddressKf.selected=undefined;
          }else if(event.keyCode === 1 || event.which === 1 || event.keyCode === 13 || event.which === 13){
            console.log("Search:");
            console.log("string: "+string);
            console.log("typeClient: "+typeClient);
            console.log("strict: "+strict);
            $scope.listOffices=[];
            $scope.filterCompanyKf.selected=undefined;
            $scope.filterAddressKf.selected=undefined;
              var output=[];
              var i=0;
              if (string!=undefined && string!=""){
                  $scope.customerFound={};
                  $scope.getCustomerLisServiceFn(string, "0", typeClient, null, 0, 10, strict).then(function(response) {
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
              }else{
                $scope.customerFound={};
                $timeout(function() {
                  $scope.mainSwitchFn('search', null);
                  }, 1500);
                }
              console.info($scope.listCustomerFound);
            }

        }
        $scope.customerFound={};
        $scope.loadCustomerFieldsFn=function(obj){
            $scope.customerFound={};
            console.log("===============================");
            console.log("|  SERVICE CUSTOMER SELECTED  |");
            console.log("===============================");
            console.log(obj);
            $scope.filterCompanyKf.selected = undefined;
            $scope.customerFound=obj;
            $scope.customerSearch.name = obj.name;
            if (obj.idClientTypeFk=="1" || obj.idClientTypeFk=="3"){
              $scope.filterCompanyKf.selected=obj;
              $scope.getLisOfCustomersByIdFn(obj);
            }else if (obj.idClientTypeFk=="2"){
              if ($scope.customerFound.idClientAdminFk!=null && $scope.customerFound.idClientAdminFk!=undefined){
                var arrCompany=[]
                arrCompany=$scope.getCustomerBusinessNameByIdFn($scope.customerFound.idClientAdminFk);
                $timeout(function() {
                  if (arrCompany.length==1){
                      $scope.filterCompanyKf.selected=arrCompany[0];
                      console.log($scope.filterCompanyKf.selected);
                  }
                }, 500);
              }else{
                  inform.add("El Consorcio "+obj.name+ " no se encuentra asociado a una Administración.",{
                          ttl:10000, type: 'danger'
                  });
              }
              $scope.filterAddressKf.selected=obj;
            }else if (obj.idClientTypeFk=="4"){
              if ($scope.customerFound.idClientBranchFk!=null && $scope.customerFound.idClientBranchFk!=undefined){
                var arrCompany=[]
                arrCompany=$scope.getCustomerBusinessNameByIdFn($scope.customerFound.idClientBranchFk);

                $timeout(function() {
                  if (arrCompany.length==1){
                      $scope.filterCompanyKf.selected=arrCompany[0];
                      console.log($scope.filterCompanyKf.selected);
                  }
                }, 500);
              }else{
                  inform.add("El Consorcio "+obj.name+ " no se encuentra asociado a una Administración.",{
                          ttl:10000, type: 'danger'
                  });
              }
              $scope.filterAddressKf.selected=obj;
            }
            $scope.listCustomerFound=[];
            $timeout(function() {
              $scope.mainSwitchFn('search', null);
            }, 1500);


        }
    /**************************************************
    *                                                 *
    *                  GET LOCATION                   *
    *                   LOCAL API                     *
    *                                                 *
    **************************************************/
        $scope.rsLocations_Data = {};
        $scope.getLocationByIdFn = function(idProvince){
          console.log($scope.ticket);
            addressServices.getLocations(idProvince).then(function(data){
                $scope.rsLocations_All = data;
                //console.log($scope.rsLocations_Data);
            });
        };

    /**************************************************
    *                                                 *
    *               PROVINCE FILTER                   *
    *                                                 *
    **************************************************/
      $scope.provincesAllowed = function(item){
        return item.idProvince == "1" || item.idProvince == "2";
      }
    /**************************************************
    *                                                 *
    *       GET LIST OF CUSTOMER BY CUSTOMER ID       *
    *                                                 *
    **************************************************/
      $scope.listOffices=[];
      $scope.getLisOfCustomersByIdFn = function(obj){
        //console.log("getLisOfCustomersByIdFn: "+obj.idClient);
        $scope.listOffices=[];
        CustomerServices.getCustomersListByCustomerId(obj.idClient).then(function(response){
          //console.log(response);
          if(response.status==200){
            $scope.listOffices = response.data;
          }else{
            $scope.listOffices = [];
            inform.add('No hay Consorcios o Sucursales asociadas a la ('+obj.ClientType+') - '+obj.name+' , contacte al area de soporte de BSS.',{
              ttl:5000, type: 'info'
              });
          }
        });
      };
      $scope.onSelectCallback = function(){
        $scope.mainSwitchFn('search', null);
      }

      /**************************************************
      *                                                 *
      *  SLIDER RANGE FOR THE AMOUNT OF TICKET TO SHOW  *
      *                                                 *
      **************************************************/
        //https://angular-slider.github.io/angularjs-slider/index.html
        //https://github.com/angular-slider/angularjs-slider
        //https://jsfiddle.net/ValentinH/954eve2L/
        $scope.slider = {
          value: 10,
          options: {
            floor: 10,
            ceil: 100,
            step: 10,
            showTicksValues: true,
            onChange: function () {
              $scope.filters.topDH = $scope.slider.value;
              $scope.mainSwitchFn('search', null);
            },
            ticksTooltip: function(v) {
              return 'Mostrar: ' + v;
            },
            customValueToPosition: function(val, minVal, maxVal) {
              val = Math.sqrt(val);
              minVal = Math.sqrt(minVal);
              maxVal = Math.sqrt(maxVal);
              var range = maxVal - minVal;
              return (val - minVal) / range;
            },
            customPositionToValue: function(percent, minVal, maxVal) {
              minVal = Math.sqrt(minVal);
              maxVal = Math.sqrt(maxVal);
              var value = percent * (maxVal - minVal) + minVal;
              return Math.pow(value, 2);
            }
          }
        };

      /**************************************************
      *            HIDE PROFILES FUNCTION               *
      *         USED IN THE USER REGISTER FORM          *
      **************************************************/
        $scope.filterStatusTicket = function(item){
          //alert($scope.select.idCompanyKf);
          //console.log(item);
          //console.log($scope.ticket.idStatusTicketKf);
          if ($scope.changeStatusTicketSingle && !$scope.changeStatusTicketMulti && $scope.ticket.idStatusTicketKf!=undefined){
            var opt = $scope.ticket.idStatusTicketKf;
          }else if (!$scope.changeStatusTicketSingle && $scope.changeStatusTicketMulti && $scope.filters.ticketStatus!=undefined){
            var opt = $scope.filters.ticketStatus.idStatus;
          }
          switch (opt){
            case "8":
              //console.log($scope.ticket.idStatusTicketKf);
              //console.log($scope.ticket);
              if ($scope.changeStatusTicketSingle && !$scope.changeStatusTicketMulti){
                if ($scope.ticket.idTypeDeliveryKf=="1"){
                  return item.idStatus == 7;
                }else{
                  return item.idStatus == 4;
                }
              }else if (!$scope.changeStatusTicketSingle && $scope.changeStatusTicketMulti){
                if ($scope.filters.typDelivery!=undefined && $scope.filters.typDelivery.idTypeDelivery=="1"){
                  return item.idStatus == 7;
                }else{
                  return item.idStatus == 4;
                }
              }

            break;
            case "4":
              return item.idStatus == 5;
            case "5":
              return item.idStatus == 1;
            case "7":
              return item.idStatus == 1;
            //return item.idStatus == 4 ||  item.idStatus == 5;

          }

        };
        $scope.formatDate = function(date){
          var date = date.split("-").join("/");
          var dateOut = new Date(date);
          return dateOut;
        };
        /**************************************************
        *                                                 *
        *                   UPDATE USER                   *
        *                                                 *
        **************************************************/
          $scope.sysUpdateTenantFn = function(){
            //console.log($scope.update.user);
            userServices.updateUser($scope.update).then(function(response){
                if(response.status==200){
                    if($scope.update.user.typeTenantChange){
                        console.log("Usuario: "+$scope.update.user.fullNameUser+" Successfully updated");
                        inform.add('El Usuario: '+$scope.update.user.fullNameUser+' ha sido actualizado con exito. ',{
                            ttl:3000, type: 'success'
                        });
                        //OWNERS AND TENANTS
                        if(($scope.update.user.idProfileKf==3 || $scope.update.user.idProfileKf==4 || $scope.update.user.idProfileKf==6) && $scope.update.user.idTypeTenantKf==1 && $scope.update.user.idDeparment_Tmp){
                            blockUI.start('Asociando usuario al departamento seleccionado.');
                            $timeout(function() {
                                $scope.depto.department.idUserKf=$scope.update.user.idUser;
                                $scope.depto.department.idDepartment=$scope.update.user.idDeparment_Tmp;
                            }, 1500);
                            //console.log(response_tenantFound);
                            //OWNER
                            $timeout(function() {
                                blockUI.message('Asignando departamento del usuario.');
                                $scope.fnAssignDepto($scope.depto);
                            }, 2000);
                            $timeout(function() {
                                blockUI.message('Aprobando departamento del usuario.');
                                $scope.approveDepto($scope.update.user.idTypeTenantKf, $scope.depto.department.idDepartment, 1);
                            }, 2500);
                        }else if(($scope.update.user.idProfileKf==4 || $scope.update.user.idProfileKf==5 || $scope.update.user.idProfileKf==6) && $scope.update.user.idTypeTenantKf==2 && $scope.update.user.idDepartmentKf){
                            blockUI.start('Aprobando departamento del usuario.');
                            $timeout(function() {
                                $scope.depto.department.idUserKf        = $scope.update.user.idUser;
                                $scope.depto.department.idDepartment    = $scope.update.user.idDepartmentKf;
                            }, 1500);
                            $timeout(function() {
                                //TENANT
                                $scope.approveDepto($scope.update.user.idTypeTenantKf, $scope.depto.department.idUserKf, 1);
                            }, 2000);
                            $timeout(function() {
                              //TENANT
                              $scope.openTicketFn($scope.update.user.idTicket);
                              $scope.mainSwitchFn('search', null);
                              blockUI.stop();
                          }, 2500);

                        }
                    }
                }else if (response.status==404){
                        $timeout(function() {
                            inform.add('[Error]: '+response.status+', Ocurrio error intenta de nuevo o contacta el area de soporte. ',{
                            ttl:5000, type: 'warning'
                            });
                            blockUI.message('Usuario: '+$scope.update.user.fullNameUser+' no sido actualizado.');
                            blockUI.stop();
                        }, 1500);
                }else if(response.status==500){
                    $timeout(function() {
                        inform.add('[Error]: '+response.status+', Ha ocurrido un error en la comunicacion con el servidor, contacta el area de soporte. ',{
                        ttl:5000, type: 'danger'
                        });
                        blockUI.message('[Error]: '+response.status+', Ha ocurrido un error en la comunicacion con el servidor.');
                        blockUI.stop();
                    }, 1500);
                }
            });
          }
        /**************************************************
        *                                                 *
        *   ASSIGN DEPARTMENT TO THE CURRENT OWNER USER   *
        *                                                 *
        **************************************************/
          $scope.fnAssignDepto = function(userData){
            DepartmentsServices.assignDepto(userData).then(function(response) {
                if(response.status==200){
                    //inform.add('Departamento Asignado y pendiente por aprobacion por la administracion.',{
                    //ttl:3000, type: 'success'
                    //});
                }else if (response.status==404){
                    inform.add('Ocurrio un error, contacte al area de soporte de BSS.',{
                    ttl:3000, type: 'danger'
                    });
                }
            });
          }
        /**************************************************
        *                                                 *
        *   ASSIGN DEPARTMENT TO THE CURRENT OWNER USER   *
        *                                                 *
        **************************************************/
          $scope.findKeyByCodeFn = function(code,idClientKf){
            return KeysServices.findKeyByCode(code,idClientKf).then(function(response) {
                if(response.status==200 && response.data.codigo){
                    return 1;
                }else if (response.status==404){
                  return 0;
                }
            });
          }
        /**************************************************
        *                                                 *
        *  APPROVE DEPARTMENT TO AN OWNER OR TENANT USER  *
        *                                                 *
        **************************************************/
          $scope.approveDepto = function (type, id, idStatus) {
            switch (type){
            case 1:
            case "1"://OWNER
                console .log("Depto: "+id)
                DepartmentsServices.approveOwnerDepto(id).then(function(response) {
                    if(response.status==200){
                        inform.add('Departamento del propietario autorizado satisfactoriamente.',{
                        ttl:5000, type: 'success'
                        });
                        $timeout(function() {
                            blockUI.stop();
                        }, 1500);
                        //$scope.lisTenantByType($scope.idDeptoKf, null);
                    }else if (response.status==404){
                        inform.add('[Error]: '+response.status+', Ocurrio error intenta de nuevo o contacta el area de soporte. ',{
                        ttl:5000, type: 'warning'
                        });
                    }
                });
            break;
            case 2:
            case "2"://TENANT
                console .log("User: "+id)
                DepartmentsServices.approveTenantDepto(id, idStatus).then(function(response) {
                    if(response.status==200){
                        inform.add('Departamento del Habitante autorizado satisfactoriamente.',{
                        ttl:5000, type: 'success'
                        });
                        $timeout(function() {
                            blockUI.stop();
                        }, 1500);
                        //$scope.lisTenantByType($scope.idDeptoKf, null);
                    }else if (response.status==404){
                        inform.add('[Error]: '+response.status+', Ocurrio error intenta de nuevo o contacta el area de soporte. ',{
                        ttl:5000, type: 'warning'
                        });
                    }
                });
            break;
            }
          };

          function NaN2Zero(n){
            return isNaN( n ) ? 0 : n;
          }
    /**************************************************
    *                                                 *
    *            TICKETS MONITOR FUNCTION             *
    *                                                 *
    **************************************************/
      $scope.showCalender = false;
      $scope.thereIsKeyWithoutIdKeychain=false;
      $scope.monitor={'filters':{},'update':{},'edit':{}};
      $scope.filters={'paymentsType':'', 'typDelivery':'', 'ticketStatus':'', 'typeTicket':'', 'deliveryCompanyKf':'','isPaymentSucceeded': false,'isBillingInitiated':false, 'isHasRefundsOpen':false, 'isInitialDeliveryActive': false, 'isHasStockInBuilding': false, 'mgmtKeyMethod':''};
      $scope.monitor.filter={'idUserRequestBy':'', 'idUserMadeBy':'', 'idBuildingKf':'', 'idClientAdminFk':'', 'idClientCompaniFk':'', 'idClientBranchFk':'', 'topfilter':'', 'idTypeTicketKf':'', 'idStatusTicketKf':'', 'codTicket':'', 'idTypePaymentKf':'', 'idTypeDeliveryKf':'', 'dateCreatedFrom':'', 'dateCreatedTo':'', 'dateDeliveredFrom':'', 'dateDeliveredTo':'', 'isBillingUploaded':null, 'isBillingInitiated':null, 'isHasRefundsOpen':null, 'idDeliveryCompanyKf':'', 'isPaymentSucceeded':'', 'isInitialDeliveryActive':null};
      $scope.mainSwitchFn = function(opt, obj, obj2){
        switch (opt){
            case "dashboard":
              $scope.getDeliveryTypesFn_filter();
              $scope.getDeliveryCompaniesFn();
              $scope.getPaymentsTypeFn();
              $scope.getManualPaymentsTypeFn();
              switch ($scope.sysLoggedUser.idProfileKf){
                case "1":
                    //$scope.listCompany=[];
                    //var listCompany=[];
                    ////GET ADMIN CUSTOMERS
                    //$scope.globalGetCustomerListFn(null,"0",1,"","",null).then(function(data) {
                    //  angular.forEach(data.customers,function(admins){
                    //    var deferredAdmins = $q.defer();
                    //    listCompany.push(admins);
                    //    deferredAdmins.resolve();
                    //  });
                    //});
                    //$q.all(listCompany).then(function () {
                    //  //console.log(listCompany);
                    //});
                    ////GET COMPANY CUSTOMERS
                    //$scope.globalGetCustomerListFn(null,"0",3,"","",null).then(function(data) {
                    //  angular.forEach(data.customers,function(company){
                    //    var deferredCompany = $q.defer();
                    //    listCompany.push(company);
                    //    deferredCompany.resolve();
                    //  });
                    //});
                    //$q.all(listCompany).then(function () {
                    //  $scope.listCompany = listCompany;
                    //  //console.log($scope.listCompany);
                    //});
                  console.log($scope.sysLoggedUser);
                  $scope.filters.topDH="10";
                  $scope.monitor.filter.idProfileKf         = $scope.sysLoggedUser.idProfileKf;
                  $scope.monitor.filter.isBillingInitiated  = 1;
                  $scope.monitor.filter.isBillingUploaded   = null;
                  $scope.monitor.filter.isPaymentSucceeded  = null;
                  $scope.monitor.filter.topfilter           = $scope.filters.topDH;
                  $scope.monitor.filter.idMgmtMethodKf      = null;
                  $scope.listTickets($scope.monitor.filter);
                break;
                case "4":
                  console.log($scope.sysLoggedUser);
                  $scope.isHomeSelected=false;
                  $scope.getLisOfCustomersByIdFn($scope.sysLoggedUser.company[0]);
                  $scope.filters.topDH="10";
                  $scope.monitor.filter.idClientAdminFk     = $scope.sysLoggedUser.company[0].idClient;
                  $scope.monitor.filter.topfilter           = $scope.filters.topDH;
                  $scope.monitor.filter.idProfileKf         = $scope.sysLoggedUser.idProfileKf;
                  $scope.monitor.filter.idTypeTenantKf      = $scope.sysLoggedUser.idTypeTenantKf;
                  $scope.monitor.filter.idDepartmentKf      = $scope.sysLoggedUser.idTypeTenantKf=="2"?$scope.sysLoggedUser.idDepartmentKf:"";
                  $scope.monitor.filter.isHomeSelected      = $scope.isHomeSelected;
                  $scope.monitor.filter.isBillingInitiated  = 1;
                  $scope.monitor.filter.isPaymentSucceeded  = null;
                  $scope.listTickets($scope.monitor.filter);
                break;
                case "3":
                case "5":
                case "6":
                  switch ($scope.sysLoggedUser.idTypeTenantKf){
                    case "1":
                      $scope.filters.topDH="10";
                      $scope.getAddressByidTenantFn($scope.sysLoggedUser.idUser, $scope.sysLoggedUser.idTypeTenantKf, -1);
                      $scope.monitor.filter.idUserRequestBy        = $scope.sysLoggedUser.idUser;
                      $scope.monitor.filter.topfilter              = $scope.filters.topDH;
                      $scope.monitor.filter.idProfileKf            = $scope.sysLoggedUser.idProfileKf;
                      $scope.monitor.filter.idTypeTenantKf         = $scope.sysLoggedUser.idTypeTenantKf;
                      $scope.monitor.filter.isBillingInitiated     = 1;
                      $scope.monitor.filter.isPaymentSucceeded     = null;
                      $scope.listTickets($scope.monitor.filter);
                    break;
                    case "2":
                      $scope.filters.topDH="10";
                      $scope.getAddressByidTenantFn($scope.sysLoggedUser.idUser, $scope.sysLoggedUser.idTypeTenantKf, -1);
                      $scope.monitor.filter.idUserRequestBy        = $scope.sysLoggedUser.idUser;
                      $scope.monitor.filter.topfilter              = $scope.filters.topDH;
                      $scope.monitor.filter.idProfileKf            = $scope.sysLoggedUser.idProfileKf;
                      $scope.monitor.filter.idTypeTenantKf         = $scope.sysLoggedUser.idTypeTenantKf;
                      $scope.monitor.filter.idDepartmentKf         = $scope.sysLoggedUser.idDepartmentKf;
                      $scope.monitor.filter.isBillingInitiated     = 1;
                      $scope.monitor.filter.isPaymentSucceeded     = null;
                      $scope.listTickets($scope.monitor.filter);
                    break;
                  }
                break;
              }
            break;
            case "search":
              switch ($scope.sysLoggedUser.idProfileKf){
                case "1":
                  $scope.monitor.filter.idClientAdminFk         = $scope.filterCompanyKf.selected!=undefined && $scope.filterCompanyKf.selected.idClientTypeFk=="1"?$scope.filterCompanyKf.selected.idClient:"";
                  $scope.monitor.filter.idClientCompaniFk       = $scope.filterCompanyKf.selected!=undefined && $scope.filterCompanyKf.selected.idClientTypeFk=="3"?$scope.filterCompanyKf.selected.idClient:"";
                  $scope.monitor.filter.idBuildingKf            = $scope.filterAddressKf.selected!=undefined && $scope.filterCompanyKf.selected.idClientTypeFk=="1"?$scope.filterAddressKf.selected.idClient:"";
                  $scope.monitor.filter.idClientBranchFk        = $scope.filterAddressKf.selected!=undefined && $scope.filterCompanyKf.selected.idClientTypeFk=="3"?$scope.filterAddressKf.selected.idClient:"";
                  $scope.monitor.filter.topfilter               = $scope.filters.topDH;
                  $scope.monitor.filter.idProfileKf             = $scope.sysLoggedUser.idProfileKf;
                  $scope.monitor.filter.idTypeTicketKf          = !$scope.filters.typeTicket?"":$scope.filters.typeTicket.idTypeTicket;
                  $scope.monitor.filter.idStatusTicketKf        = !$scope.filters.ticketStatus?"":$scope.filters.ticketStatus.idStatus;
                  $scope.monitor.filter.idTypeDeliveryKf        = !$scope.filters.typDelivery?"":$scope.filters.typDelivery.idTypeDelivery;
                  $scope.monitor.filter.idTypePaymentKf         = $scope.filters.paymentsType=="" || $scope.filters.paymentsType==undefined?"":$scope.filters.paymentsType.id;
                  $scope.monitor.filter.isInitialDeliveryActive = $scope.filters.isInitialDeliveryActive?1:0;
                  $scope.monitor.filter.isHasStockInBuilding    = $scope.filters.isHasStockInBuilding?1:0;
                  $scope.monitor.filter.idMgmtMethodKf          = $scope.filters.mgmtKeyMethod?$scope.filters.mgmtKeyMethod:"";

                  //console.log($scope.filters.paymentsType);
                  if ((($scope.filters.paymentsType!='' && $scope.filters.paymentsType!=undefined && $scope.filters.paymentsType!=null && $scope.filters.paymentsType.id!=undefined) || ($scope.filters.paymentsType==undefined || $scope.filters.paymentsType==null || $scope.filters.paymentsType=='')) && ($scope.filters.ticketStatus!=undefined && $scope.filters.ticketStatus.idStatus!="3" && $scope.filters.ticketStatus.idStatus!="6") && $scope.filters.isPaymentSucceeded && ($scope.filters.isBillingUploaded)){
                      $scope.monitor.filter.isBillingUploaded      = 1;
                      $scope.filters.isBillingUploaded             = true
                  }else{
                      $scope.monitor.filter.isBillingUploaded      = 0;
                      $scope.filters.isBillingUploaded             = false
                  }
                  if ( // || ($scope.filters.paymentsType==undefined || $scope.filters.paymentsType==null || $scope.filters.paymentsType=='')
                      ((($scope.filters.paymentsType!=undefined && $scope.filters.paymentsType!=null && $scope.filters.paymentsType.id!='1' && $scope.filters.paymentsType.id!='2')) && (!$scope.filters.isPaymentSucceeded || $scope.filters.isPaymentSucceeded)) ||
                      ($scope.filters.paymentsType!=undefined && $scope.filters.paymentsType!=null && $scope.filters.paymentsType.id=="2" && $scope.filters.isPaymentSucceeded && $scope.filters.isBillingInitiated) ||
                      ($scope.filters.paymentsType!=undefined && $scope.filters.paymentsType!=null && $scope.filters.paymentsType.id=="1" && $scope.filters.isBillingInitiated)
                    ){
                      $scope.monitor.filter.isBillingInitiated     = 1;
                      //$scope.filters.isBillingInitiated            = true
                  }else{
                      $scope.monitor.filter.isBillingInitiated     = 0;
                      $scope.filters.isBillingInitiated            = false
                  }
                  if ($scope.filters.paymentsType!=undefined && $scope.filters.paymentsType!=null && $scope.filters.paymentsType.id!=undefined && $scope.filters.paymentsType.id=="2" && (($scope.filters.ticketStatus!=undefined && $scope.filters.ticketStatus.idStatus!="3" && $scope.filters.ticketStatus.idStatus!="6") || $scope.filters.ticketStatus==null) && $scope.filters.isPaymentSucceeded){
                      $scope.monitor.filter.isPaymentSucceeded     = 1;
                      $scope.filters.isPaymentSucceeded            = true
                  }else{
                      $scope.monitor.filter.isPaymentSucceeded     = 0;
                      $scope.filters.isPaymentSucceeded            = false
                  }
                  //$scope.monitor.filter.isHasRefundsOpen = $scope.filters.ticketStatus!=undefined && $scope.filters.ticketStatus.idStatus=="6" && $scope.filters.isHasRefundsOpen?1:0;
                  $scope.monitor.filter.isHasRefundsOpen        = $scope.filters.isHasRefundsOpen?1:0;
                  $scope.monitor.filter.idDeliveryCompanyKf     = !$scope.filters.deliveryCompanyKf?"":$scope.filters.deliveryCompanyKf.idDeliveryCompany;
                  //CREATED
                  if ($scope.filters.dateCreatedFrom!=null && $scope.filters.dateCreatedFrom!=undefined){
                    var FromDate  = new Date($scope.filters.dateCreatedFrom);
                    $scope.monitor.filter.dateCreatedFrom     = FromDate.getFullYear()+"-"+(FromDate.getMonth()+1)+"-"+FromDate.getDate()+" " +FromDate.getHours() + ":" + FromDate.getMinutes()+ ":" + FromDate.getSeconds();
                  }else{
                    $scope.monitor.filter.dateCreatedFrom     = "";
                  }
                  if ($scope.filters.dateCreatedTo!=null && $scope.filters.dateCreatedTo!=undefined){
                    var FromDate  = new Date($scope.filters.dateCreatedTo);
                    $scope.monitor.filter.dateCreatedTo     = FromDate.getFullYear()+"-"+(FromDate.getMonth()+1)+"-"+FromDate.getDate()+" " +"23:59:59";
                  }else{
                    $scope.monitor.filter.dateCreatedTo     = "";
                  }
                  //DELIVERY
                  if ($scope.filters.dateDeliveredFrom!=null && $scope.filters.dateDeliveredFrom!=undefined){
                    var FromDate  = new Date($scope.filters.dateDeliveredFrom);
                    $scope.monitor.filter.dateDeliveredFrom     = FromDate.getFullYear()+"-"+(FromDate.getMonth()+1)+"-"+FromDate.getDate()+" " +FromDate.getHours() + ":" + FromDate.getMinutes()+ ":" + FromDate.getSeconds();
                  }else{
                    $scope.monitor.filter.dateDeliveredFrom     = "";
                  }
                  if ($scope.filters.dateDeliveredTo!=null && $scope.filters.dateDeliveredTo!=undefined){
                    var FromDate  = new Date($scope.filters.dateDeliveredTo);
                    $scope.monitor.filter.dateDeliveredTo     = FromDate.getFullYear()+"-"+(FromDate.getMonth()+1)+"-"+FromDate.getDate()+" " +"23:59:59";;
                  }else{
                    $scope.monitor.filter.dateDeliveredTo     = "";
                  }
                  //console.log($scope.filters.searchFilter);
                  $scope.monitor.filter.codTicket             = $scope.filters.searchFilter!=undefined && $scope.filters.searchFilter!="" && $scope.filters.searchFilter!=null?$scope.filters.searchFilter:null;

                  console.log($scope.monitor.filter);
                  console.log($scope.filters);
                  $scope.listTickets($scope.monitor.filter);
                break;
                case "4":
                  $scope.monitor.filter.idBuildingKf           = $scope.filterAddressKf.selected!=undefined?$scope.filterAddressKf.selected.idClient:"";
                  $scope.monitor.filter.idClientAdminFk        = $scope.sysLoggedUser.company[0].idClient;
                  $scope.monitor.filter.topfilter              = $scope.filters.topDH;
                  $scope.monitor.filter.idTypeTicketKf         = !$scope.filters.typeTicket?"":$scope.filters.typeTicket.idTypeTicket;
                  $scope.monitor.filter.idStatusTicketKf       = !$scope.filters.ticketStatus?"":$scope.filters.ticketStatus.idStatus;
                  $scope.monitor.filter.idTypeDeliveryKf       = !$scope.filters.typDelivery?"":$scope.filters.typDelivery.idTypeDelivery;
                  $scope.monitor.filter.idTypePaymentKf        = !$scope.filters.paymentsType?"":$scope.filters.paymentsType.id;
                  $scope.monitor.filter.dateCreatedFrom        = $scope.filters.dateCreatedFrom;
                  $scope.monitor.filter.dateCreatedTo          = $scope.filters.dateCreatedTo;
                  $scope.monitor.filter.codTicket              = $scope.filters.searchFilter;
                  //CREATED
                  if ($scope.filters.dateCreatedFrom!=null && $scope.filters.dateCreatedFrom!=undefined){
                    var FromDate  = new Date($scope.filters.dateCreatedFrom);
                    $scope.monitor.filter.dateCreatedFrom    = FromDate.getFullYear()+"-"+(FromDate.getMonth()+1)+"-"+FromDate.getDate()+" " +FromDate.getHours() + ":" + FromDate.getMinutes()+ ":" + FromDate.getSeconds();
                  }else{
                    $scope.monitor.filter.dateCreatedFrom = "";
                  }
                  if ($scope.filters.dateCreatedTo!=null && $scope.filters.dateCreatedTo!=undefined){
                    var FromDate  = new Date($scope.filters.dateCreatedTo);
                    $scope.monitor.filter.dateCreatedTo    = FromDate.getFullYear()+"-"+(FromDate.getMonth()+1)+"-"+FromDate.getDate()+" " +"23:59:59";
                  }else{
                    $scope.monitor.filter.dateCreatedTo = "";
                  }
                  //DELIVERY
                  if ($scope.filters.dateDeliveredFrom!=null && $scope.filters.dateDeliveredFrom!=undefined){
                    var FromDate  = new Date($scope.filters.dateDeliveredFrom);
                    $scope.monitor.filter.dateDeliveredFrom    = FromDate.getFullYear()+"-"+(FromDate.getMonth()+1)+"-"+FromDate.getDate()+" " +FromDate.getHours() + ":" + FromDate.getMinutes()+ ":" + FromDate.getSeconds();
                  }else{
                    $scope.monitor.filter.dateDeliveredFrom = "";
                  }
                  if ($scope.filters.dateDeliveredTo!=null && $scope.filters.dateDeliveredTo!=undefined){
                    var FromDate  = new Date($scope.filters.dateDeliveredTo);
                    $scope.monitor.filter.dateDeliveredTo    = FromDate.getFullYear()+"-"+(FromDate.getMonth()+1)+"-"+FromDate.getDate()+" " +"23:59:59";;
                  }else{
                    $scope.monitor.filter.dateDeliveredTo = "";
                  }
                  console.log($scope.monitor.filter);
                  console.log($scope.filters);
                  $scope.listTickets($scope.monitor.filter);
                break;
                case "3":
                case "5":
                case "6":
                  switch ($scope.sysLoggedUser.idTypeTenantKf){
                    case "1":
                      $scope.monitor.filter.idUserRequestBy        = $scope.sysLoggedUser.idUser;
                      $scope.monitor.filter.idBuildingKf           = $scope.filterAddressKf.selected!=undefined?$scope.filterAddressKf.selected.idClient:"";
                      $scope.monitor.filter.topfilter              = $scope.filters.topDH;
                      $scope.monitor.filter.idTypeTicketKf         = !$scope.filters.typeTicket?"":$scope.filters.typeTicket.idTypeTicket;
                      $scope.monitor.filter.idStatusTicketKf       = !$scope.filters.ticketStatus?"":$scope.filters.ticketStatus.idStatus;
                      $scope.monitor.filter.idTypeDeliveryKf       = !$scope.filters.typDelivery?"":$scope.filters.typDelivery.idTypeDelivery;
                      $scope.monitor.filter.idTypePaymentKf        = !$scope.filters.paymentsType?"":$scope.filters.paymentsType.id;
                      $scope.monitor.filter.codTicket              = $scope.filters.searchFilter;
                      console.log($scope.monitor.filter);
                      console.log($scope.filters);
                    break;
                    case "2":
                      $scope.monitor.filter.idUserRequestBy        = $scope.sysLoggedUser.idUser;
                      $scope.monitor.filter.topfilter              = $scope.filters.topDH;
                      $scope.monitor.filter.idTypeTicketKf         = !$scope.filters.typeTicket?"":$scope.filters.typeTicket.idTypeTicket;
                      $scope.monitor.filter.idStatusTicketKf       = !$scope.filters.ticketStatus?"":$scope.filters.ticketStatus.idStatus;
                      $scope.monitor.filter.idTypeDeliveryKf       = !$scope.filters.typDelivery?"":$scope.filters.typDelivery.idTypeDelivery;
                      $scope.monitor.filter.idTypePaymentKf        = !$scope.filters.paymentsType?"":$scope.filters.paymentsType.id;
                      $scope.monitor.filter.codTicket              = $scope.filters.searchFilter;
                      console.log($scope.monitor.filter);
                      console.log($scope.filters);
                    break;
                  }
                  //CREATED
                  if ($scope.filters.dateCreatedFrom!=null && $scope.filters.dateCreatedFrom!=undefined){
                    var FromDate  = new Date($scope.filters.dateCreatedFrom);
                    $scope.monitor.filter.dateCreatedFrom    = FromDate.getFullYear()+"-"+(FromDate.getMonth()+1)+"-"+FromDate.getDate()+" " +FromDate.getHours() + ":" + FromDate.getMinutes()+ ":" + FromDate.getSeconds();
                  }else{
                    $scope.monitor.filter.dateCreatedFrom = "";
                  }
                  if ($scope.filters.dateCreatedTo!=null && $scope.filters.dateCreatedTo!=undefined){
                    var FromDate  = new Date($scope.filters.dateCreatedTo);
                    $scope.monitor.filter.dateCreatedTo    = FromDate.getFullYear()+"-"+(FromDate.getMonth()+1)+"-"+FromDate.getDate()+" " +"23:59:59";
                  }else{
                    $scope.monitor.filter.dateCreatedTo = "";
                  }
                  //DELIVERY
                  if ($scope.filters.dateDeliveredFrom!=null && $scope.filters.dateDeliveredFrom!=undefined){
                    var FromDate  = new Date($scope.filters.dateDeliveredFrom);
                    $scope.monitor.filter.dateDeliveredFrom    = FromDate.getFullYear()+"-"+(FromDate.getMonth()+1)+"-"+FromDate.getDate()+" " +FromDate.getHours() + ":" + FromDate.getMinutes()+ ":" + FromDate.getSeconds();
                  }else{
                    $scope.monitor.filter.dateDeliveredFrom = "";
                  }
                  if ($scope.filters.dateDeliveredTo!=null && $scope.filters.dateDeliveredTo!=undefined){
                    var FromDate  = new Date($scope.filters.dateDeliveredTo);
                    $scope.monitor.filter.dateDeliveredTo    = FromDate.getFullYear()+"-"+(FromDate.getMonth()+1)+"-"+FromDate.getDate()+" " +"23:59:59";;
                  }else{
                    $scope.monitor.filter.dateDeliveredTo = "";
                  }
                  $scope.listTickets($scope.monitor.filter);
                break;
              }
            break;
            case "openTicket":
              $scope.rsAllKeychainListData = [];
              $scope.ticket = {'administration':undefined, 'keysMethod':{'name':undefined}, 'building':undefined, 'idClientDepartament':undefined, 'radioButtonDepartment':undefined, 'radioButtonBuilding':undefined, 'optionTypeSelected': {}, 'keysMethod':{}, 'userRequestBy':{}, 'userNotify':null, 'keys':[], 'delivery':{'idTypeDeliveryKf':null, 'whoPickUp':null, 'zone':{}, 'thirdPerson':null, 'deliveryTo':{}, 'otherAddress':undefined}, 'cost':{'keys':0, 'delivery':0, 'service':0, 'total':0}};
              $scope.functions={'isKeysEnable': false, 'whereKeysAreEnable': null};
              $scope.rsNewKeychainList = [];
              $scope.list_new_keys = [];
              $scope.keys={"new":{}};
              $scope.isEditTicket=false;
              $scope.openTicketFn(obj.idTicket);
              $('#UpdateModalTicket').modal({backdrop: 'static', keyboard: false});
            break;
            case "getTicket":
              console.log(obj);
              $scope.openTicketFn(obj);
            break;
            case "closeApproval":
                if($scope.sysRouteParams!=undefined){
                    blockUI.start('Cerrando aprobación de Ticket/Depto.');
                    $timeout(function() {
                        $scope.sysRouteParams = null;
                        tokenSystem.destroyTokenStorage(7);
                        $scope.idDeptoKf = null;
                    }, 1500);
                    $timeout(function() {
                        $scope.switchBuildingFn("administration", null);
                        $location.path("/buildings");
                        blockUI.stop();
                    }, 2500);
                }
            break;
            case "mgmtPrecheck":
              if ($scope.tkupdate.idMgmtMethodKf){
                $scope.ticket.idMgmtMethodKf = $scope.tkupdate.idMgmtMethodKf;
                $('#ManageTicketKeysList').modal('show');
                var elemStock   = document.getElementById("stock");
                var elemManual  = document.getElementById("manual");
                var elem = "";
                if ($scope.ticket.keysMethod.name == "stock"){
                  $scope.mainSwitchFn('keychainMulti', null, null);
                  elem = elemStock;
                }else{
                  $scope.mainSwitchFn('keychain_manual', null, null);
                  //$scope.mainSwitchFn('setMgmtKeys', $scope.tkupdate, null);
                  elem = elemManual;
                }
                //check elem is not null
                if (elem) {
                  elem.classList.remove('btn-primary');
                  elem.classList.add('btn-success');
                }
              }else{
                $scope.mainSwitchFn('ticket_keyList', obj, null);
              }
            break;
            case "ticket_keyList":
              $scope.showKeyDoors = false;
              $scope.ticketKeyList = null;
              $scope.ticketKeyDoorList = null;
              $scope.ticketKeyList = obj;
              console.log($scope.ticketKeyList);
              if ($scope.ticket.keysMethod==undefined || $scope.ticket.keysMethod==null){
                $scope.getKeychainListFn($scope.tkupdate.building.idClient,null,"2","1",null,null,null,1,$scope.pagination.pageSizeSelected,false,true,0,1);
              }
              $('#ManageTicketKeysList').modal('show');
            break;
            case "ticket_refunds":
              $scope.refundsList = null;
              $scope.refundsList = obj;
              console.log($scope.refundsList);
              $('#refundsModalDetails').modal('show');
            break;
            case "ticket_refunds_complete":
              $scope.refund                           = {'ticket':{}};
              $scope.refund.ticket                    = obj;
              $scope.refund.ticket.idRefundTypeKf     = 2;
              $scope.refund.ticket.idRefundTypeKfNew  = 2;
              $scope.refund.ticket.history            = [];
              $scope.refund.ticket.history.push({'idUserKf': $scope.sysLoggedUser.idUser, 'descripcion': null, 'idCambiosTicketKf':"26"});
              console.log($scope.refund);
              $('#changeModalStatus').modal('hide');
              $('#refundsModalDetails').modal({backdrop: 'static', keyboard: false});
              console.log($scope.refund);
              $timeout(function() {
                $scope.completeTicketRefundFn($scope.refund);
              }, 2000);
            break;
            case "filtersWindow":
              $('#filterModalWindow').modal('show');
              $('#filterModalWindow').on('shown.bs.modal', function () {
                $scope.showCalender = true;
                $rootScope.$broadcast('rzSliderForceRender');
            });
            break;
            case "importKeyFileWindow":
                $scope.filesUploadList=[];
                $scope.fileList=[];
                $scope.fileListTmp=[];
                $('#attachKeyFile').modal({backdrop: 'static', keyboard: false});
                $('#attachKeyFile').on('shown.bs.modal', function () {
                    $('#uploadKeyFiles').focus();
                });
            break;
            case "addNewKeyMulti":
                console.log(obj);
                switch (obj.selected){
                  case true:
                    let Depto = $scope.tkupdate.department.floor+"-"+$scope.tkupdate.department.departament;
                    if ($scope.rsNewKeychainList.length<$scope.tkupdate.keys.length){
                      if ($scope.rsNewKeychainList.length==0){
                        for (var i = 0; i < $scope.rsExistingKeyList.length; i++) {
                          if ($scope.rsExistingKeyList[i].codigo==obj.codigo){
                            inform.add("El Llavero con el Codigo: ["+obj.codigo+"], ya existe en el Departamento "+Depto,{
                              ttl:15000, type: 'warning'
                            });
                            $scope.isCodeExist=true;
                            break;
                            //console.log($scope.isMailExist);
                          }else{
                            $scope.isCodeExist=false;
                            //console.log($scope.isMailExist);
                          }
                        }
                      }
                      if ($scope.rsNewKeychainList.length>0){
                        for (var i = 0; i < $scope.rsNewKeychainList.length; i++) {
                          if ($scope.rsNewKeychainList[i].codigo==obj.codigo){
                            inform.add("El Llavero con el Codigo: ["+obj.codigo+"], ya existe en en la nueva lista a asignar en el Departamento "+Depto,{
                              ttl:15000, type: 'warning'
                            });
                            $scope.isCodeNewExist=true;
                            break;
                            //console.log($scope.isMailExist);
                          }else{
                            $scope.isCodeNewExist=false;
                            //console.log($scope.isMailExist);
                          }
                        }
                      }
                      if(!$scope.isCodeExist && !$scope.isCodeNewExist){
                        console.log("ADD_NO_EXIST");
                        var idKeychainStatusKf = $scope.ticket.idMgmtMethodKf=='1'?obj.idKeychainStatus:0
                        var statusKey = $scope.ticket.idMgmtMethodKf=='1'?'Activo':'Inactivo'
                        $scope.rsNewKeychainList.push({"idKeychain":obj.idKeychain, "idProductKf":obj.idProductKf,"descriptionProduct":obj.descriptionProduct,"categoryKeychain":"Departamento","Depto":Depto, "codExt":obj.codExt,"codigo":obj.codigo,"idDepartmenKf":$scope.tkupdate.department.idClientDepartament,"idClientKf":obj.idClientKf,"idUserKf":null,"idCategoryKf":"1","isKeyTenantOnly":null,"idClientAdminKf":null,"idKeychainStatusKf":idKeychainStatusKf, "statusKey":statusKey, "doors":{}});
                        $scope.list_new_keys.push({"idKeychain":obj.idKeychain, "idProductKf":obj.idProductKf,"descriptionProduct":obj.descriptionProduct,"categoryKeychain":"Departamento","Depto":Depto, "codExt":obj.codExt,"codigo":obj.codigo,"idDepartmenKf":$scope.tkupdate.department.idClientDepartament,"idClientKf":obj.idClientKf,"idUserKf":null,"idCategoryKf":"1","isKeyTenantOnly":null,"idClientAdminKf":null,"idKeychainStatusKf":idKeychainStatusKf, "statusKey":statusKey, "doors":{}});
                        obj.selected = true;
                      }
                      for (var i = 0; i < $scope.tkupdate.keys.length; i++) {
                        // Ensure the index exists in rsNewKeychainList
                        if ($scope.rsNewKeychainList[i]) {
                            // Set the doors property based on the index
                            $scope.rsNewKeychainList[i].doors = $scope.tkupdate.keys[i].doors;
                        }
                      }
                      if ($scope.rsNewKeychainList.length==$scope.tkupdate.keys.length){
                        inform.add("Ya ha seleccionado la totalidad de los ("+$scope.tkupdate.keys.length+") llaveros que fueron solicitados en el pedido.",{
                          ttl:15000, type: 'success'
                        });
                      }
                    }else{
                      inform.add("Ya ha seleccionado los llaveros ("+$scope.tkupdate.keys.length+") solicitados en el pedido.",{
                        ttl:15000, type: 'info'
                      });
                      console.log(obj);
                      obj.selected = false;
                    }
                    console.log($scope.rsNewKeychainList);
                  break;
                  case false:
                    console.log(obj);
                    $scope.mainSwitchFn('removeNewKey', obj, null);
                  break;
                }
            break;
            case "addNewKeyManual":
                $scope.tmpKey = {"new":{'products':{'selected':{}}}}
                $scope.tmpKey.new=obj;
                console.log(obj);
                console.log($scope.tmpKey);
                console.log($scope.rsNewKeychainList);
                console.log($scope.list_new_keys);
                if ($scope.rsNewKeychainList.length<$scope.tkupdate.keys.length){
                  let deviceOpen = $scope.tmpKey.new.products.selected;
                  if ($scope.rsNewKeychainList.length>=0){
                    if ($scope.rsNewKeychainList.length>=1){
                      for (var i = 0; i < $scope.rsNewKeychainList.length; i++) {
                        if ($scope.rsNewKeychainList[i].codigo==$scope.tmpKey.new.codigo){
                          inform.add("El Llavero con el Codigo: ["+$scope.tmpKey.new.codigo+"], ya existe en en la nueva lista a asignar al Departamento "+$scope.tmpKey.new.Depto,{
                            ttl:15000, type: 'warning'
                          });
                          $scope.isCodeNewExist=true;
                          console.log($scope.isCodeNewExist);
                          break;
                        }else{
                          $scope.isCodeNewExist=false;
                          console.log($scope.isCodeNewExist);
                        }
                      }
                    }
                    $scope.findKeyByCodeFn($scope.tmpKey.new.codigo, $scope.tkupdate.building.idClient).then(function(isCodeExistInBuilding) {
                      switch (isCodeExistInBuilding){
                        case 1:
                          inform.add("El Llavero con el Codigo: ["+$scope.tmpKey.new.codigo+"], ya existe en el Edificio",{
                            ttl:15000, type: 'warning'
                          });
                          $scope.isCodeExist=true;
                          console.log("isCodeExistInBuilding: " + isCodeExistInBuilding);
                        break;
                        case 0:
                          $scope.isCodeExist=false;
                          console.log("isCodeExistInBuilding: " + isCodeExistInBuilding);
                        break;
                      }
                      if(!$scope.isCodeExist && !$scope.isCodeNewExist){
                        console.log("ADD_NO_EXIST");
                        $scope.rsNewKeychainList.push({"idProductKf":deviceOpen.idProduct,"idTicketKf": $scope.tkupdate.idTicket, "descriptionProduct":deviceOpen.descriptionProduct,"categoryKeychain":$scope.tmpKey.new.categoryKeychain,"Depto":$scope.tmpKey.new.Depto, "codExt":$scope.tmpKey.new.codigoExt,"codigo":$scope.tmpKey.new.codigo,"idDepartmenKf":$scope.tmpKey.new.department,"idClientKf":$scope.tkupdate.building.idClient,"idUserKf":null,"idCategoryKf":$scope.tmpKey.new.categoryKey,"isKeyTenantOnly":null,"idClientAdminKf":"","idKeychainStatusKf":"0", "statusKey":"Inactivo", "doors":{}});
                        $scope.rsExistingKeyList.push({"idProductKf":deviceOpen.idProduct,"idTicketKf": $scope.tkupdate.idTicketKf, "descriptionProduct":deviceOpen.descriptionProduct,"categoryKeychain":$scope.tmpKey.new.categoryKeychain,"Depto":$scope.tmpKey.new.Depto, "codExt":$scope.tmpKey.new.codigoExt,"codigo":$scope.tmpKey.new.codigo,"idDepartmenKf":$scope.tmpKey.new.department,"idClientKf":$scope.tkupdate.building.idClient,"idUserKf":null,"idCategoryKf":$scope.tmpKey.new.categoryKey,"isKeyTenantOnly":null,"idClientAdminKf":"","idKeychainStatusKf":"0", "statusKey":"Inactivo", "doors":{}});
                        $scope.list_new_keys.push({"idProductKf":deviceOpen.idProduct,"descriptionProduct":deviceOpen.descriptionProduct,"categoryKeychain":$scope.tmpKey.new.categoryKeychain,"Depto":$scope.tmpKey.new.Depto, "codExt":$scope.tmpKey.new.codigoExt,"codigo":$scope.tmpKey.new.codigo,"idDepartmenKf":$scope.tmpKey.new.department,"idClientKf":$scope.tkupdate.building.idClient,"idUserKf":null,"idCategoryKf":$scope.tmpKey.new.categoryKey,"isKeyTenantOnly":null,"idClientAdminKf":"","idKeychainStatusKf":"0", "statusKey":"Inactivo", "doors":{}});
                        console.log($scope.rsNewKeychainList);
                        if ($scope.ticket.keysMethodSelected!=null && $scope.ticket.keysMethodSelected!=undefined){
                          for (var key in  $scope.rsNewKeychainList){
                            console.log($scope.rsNewKeychainList[key]);
                            if ($scope.rsNewKeychainList[key].idKeychain==undefined){
                              $scope.thereIsKeyWithoutIdKeychain=true;
                              break;
                            }
                          }
                          console.info("$scope.thereIsKeyWithoutIdKeychain: "+$scope.thereIsKeyWithoutIdKeychain);
                        }
                        obj.codigo="";
                        obj.codigoExt="";
                      }else{
                        obj.codigo="";
                        obj.codigoExt="";
                      }
                    });
                  }
                  for (var i = 0; i < $scope.tkupdate.keys.length; i++) {
                    // Ensure the index exists in rsNewKeychainList
                    if ($scope.rsNewKeychainList[i]) {
                        // Set the doors property based on the index
                        $scope.rsNewKeychainList[i].doors = $scope.tkupdate.keys[i].doors;
                    }
                  }
                  if ($scope.rsNewKeychainList.length==$scope.tkupdate.keys.length){
                    inform.add("Ya ha cargado la totalidad de los ("+$scope.tkupdate.keys.length+") llaveros que fueron solicitados en el pedido.",{
                      ttl:15000, type: 'success'
                    });
                  }
                }else{
                  inform.add("Ya ha cargado los ("+$scope.tkupdate.keys.length+") llaveros solicitados en el pedido.",{
                    ttl:15000, type: 'info'
                  });
                }
                //update idKeychainKf in tb_ticket_keychain when the key from stock or manual is assigned

            break;
            case "removeNewKey":
                console.log(obj);
                let keySelected = obj;
                if (keySelected.idKeychain){
                  keySelected.idReasonKf          = "5";
                  keySelected.idKeychainStatusKf  = "-1";
                  keySelected.idTypeTicketKf      = 2;
                  keySelected.idKeychainKf        = null;
                  console.log({llavero:keySelected});
                  $scope.deleteKeyFn({llavero: keySelected});
                }
                for (var key in  $scope.rsNewKeychainList){
                  if ( $scope.rsNewKeychainList[key].codigo==obj.codigo){
                      $scope.rsNewKeychainList.splice(key,1);
                      $scope.list_new_keys.splice(key,1);
                  }
                }
                for (var key in  $scope.rsExistingKeyList){
                  if ( $scope.rsExistingKeyList[key].codigo==obj.codigo){
                      $scope.rsExistingKeyList.splice(key,1);
                  }
                }
                $scope.mainSwitchFn('keychain_manual', null, null);
            break;
            case "cancelSetMgmtKeys":
              $scope.keys                       = {"new":{'products':{'selected':{}}}}
              $scope.rsNewKeychainList          = [];
              $scope.list_new_keys              = [];
              $scope.isNewKeySingle             = false;
              $scope.isEditKey                  = false;
              $scope.isNewKeyMulti              = false;
              $scope.ticket.idMgmtMethodKf     = null;
              $scope.tkupdate.keysMethod         = {'name':''};
              $scope.ticket.keysMethod.name     = undefined;
              $scope.getKeysByDepartmentId($scope.tkupdate.department.idClientDepartament);
            break;
            case "uploadKeyFile":
                $scope.addMultiKeys(obj);
            break;
            case "upload_billing_ticket":
              console.log(obj);
              $scope.isUploadSingleFile = true;
              $scope.uploadSingleFile(obj)
            break;
            case "deleteSingleFile":
              console.log(obj);
              blockUI.start('Eliminando Factura del Pedido '+$scope.tkupdate.codTicket);
              $timeout(function() {
                $scope.deleteSingleFile(obj);
                blockUI.stop();
              }, 1500);
            break;
            case "exportExcelList":
              $scope.setRequestDefaultListAsArrayFn(obj);
            break;
            case "exportBillingExcelList":
              $scope.ticketList = 0;
              var assignedtickets = [];
              angular.forEach(obj,function(ticket){
                var deferredtickets = $q.defer();
                assignedtickets.push(deferredtickets.promise);
                $timeout(function() {
                  deferredtickets.resolve();
                  $scope.update.ticket.idTicket              = ticket.idTicket;
                  $scope.update.ticket.history               = [];
                  $scope.update.ticket.history.push({'idUserKf': $scope.sysLoggedUser.idUser, 'descripcion': null, 'idCambiosTicketKf':"22"});
                  $scope.setBillingInitiateFn($scope.update);
                }, 500)
              });
              $q.all(assignedtickets).then(function () {
                $scope.setRequestBillingListAsArrayFn(obj);
              });
            break;
            case "keyList_doors":
              $scope.ticketKeyDoorList = null;
              for (var key in obj){
                if (obj[key].doorSelected=="1"){
                  obj[key].selected=true;
                }
              }
              $scope.ticketKeyDoorList = obj;
              console.log($scope.ticketKeyDoorList);
              $scope.showKeyDoors = true;
              $('#doorKeysModalDetails').modal('show');
            break;
            case "keychainMulti":
              $scope.keys                  = {"new":{'products':{'selected':{}}}}
              $scope.rsNewKeychainList     = [];
              $scope.list_new_keys         = [];
              $scope.sysContent            = "";
              $scope.isNewKeySingle        = false;
              $scope.isEditKey             = false;
              $scope.isNewKeyMulti         = true;
              $scope.rsKeyListsData        = null;
              $scope.pagination.pageIndex  = 1;
              $scope.keychainSearch={
                "idClientKf":null,
                "idCategoryKf":null,
                "idKeychainStatusKf":null,
                "create_at":null,
                "start":null,
                "limit":null,
                "strict":null,
                "totalCount":null,
                "getTicketKeychainKf":null,
              };
              console.log($scope.tkupdate.building);
              $scope.select={'filterCategoryKey':'', 'reasonKf':{},'department':'', 'codeSearch':null, 'keychainStatus':{}, 'idTypeTicketKf':null,
              'companies':{'selected':undefined}, 'address':{'selected':undefined}, 'products':{'selected':undefined},
              'products_reserva':{'selected':undefined}, 'products_cocheras':{'selected':undefined}}
              $scope.getKeychainListFn($scope.tkupdate.building.idClient,null,"2","1",null,null,null,1,$scope.pagination.pageSizeSelected,false,true,1,1);
            break;
            case "keychain_manual":
              $scope.keys                       = {"new":{'products':{'selected':{}}}}
              if ($scope.tkupdate.idMgmtMethodKf == null){
                $scope.rsNewKeychainList          = [];
              }
              $scope.list_new_keys              = [];
              $scope.isNewKeySingle             = true;
              $scope.isEditKey                  = false;
              $scope.isNewKeyMulti              = false;
              $scope.keys.new.categoryKey       = $scope.tkupdate.keys[0].idCategoryKf;
              $scope.keys.new.categoryKeychain  = $scope.tkupdate.keys[0].categoryName;
              $scope.keys.new.products.selected = {'idProduct':$scope.tkupdate.keys[0].idProduct,'model':$scope.tkupdate.keys[0].model,'classification':$scope.tkupdate.keys[0].classification,'codigoFabric':$scope.tkupdate.keys[0].codigoFabric,'descriptionProduct':$scope.tkupdate.keys[0].descriptionProduct,'idProductClassification':$scope.tkupdate.keys[0].idProductClassification,'brand':$scope.tkupdate.keys[0].brand,'priceFabric':$scope.tkupdate.keys[0].priceFabric};
              $scope.keys.new.department        = $scope.tkupdate.idTypeRequestFor=="1"?$scope.tkupdate.department.idClientDepartament:null;
              $scope.keys.new.Depto             = $scope.tkupdate.idTypeRequestFor=="1"?$scope.tkupdate.department.floor+"-"+$scope.tkupdate.department.departament:null;
            break;
            case "keyDetails":
              $scope.isNewKeySingle = false;
              $scope.isEditKey      = false;
              $scope.isNewKeyMulti  = false;
              $scope.keys = {};
              //console.log(obj);
              $scope.keys.details=obj;
              $scope.keys.details.buildingAddress=obj.address;
              //console.log($scope.keys.details);
              $('#keyDetails').modal('show');
            break;
            case "internetDetails":
                console.log(obj.accessControlDoors);
                $('#CtrlAccessConexDetails').modal('show');
            break;
            case "setMgmtKeys":
              console.info("Source  : " +$scope.ticket.keysMethod.name);
              console.info("Internet: " +(obj.building.isHasInternetOnline === null ? "No" : "Si"));
              switch($scope.ticket.idMgmtMethodKf){
                case "1": //STOCK
                  $scope.functions.whereKeysAreEnable = null;
                  switch(obj.idTypeDeliveryKf){
                    case "1"://RETIRO EN OFICINA
                      $scope.tkupdate.mess2show="El Pedido pasara a \"Listo para Retirar\", por favor,     Confirmar?";
//                      $scope.tkupdate.idDeliveryCompanyKf=null;
                      console.log(obj)
                    break;
                    case "2"://RENTREGA EN DOMICILIO
                      if (obj.building.isStockInOffice == "1"){
                        $scope.tkupdate.idDeliveryCompanyKf="1";
                      }
                      $scope.tkupdate.mess2show="El Pedido pasara a \"Pendiente de entrega\", por favor,     Confirmar?";

                      console.log(obj)
                    break;
                  }
                break;
                case "2": //MANUAL
                  $scope.functions.whereKeysAreEnable = obj.building.isHasInternetOnline === null ? "2":"1";
                  switch(obj.idTypeDeliveryKf){
                    case "1": //RETIRO EN OFICINA
                      if(obj.building.isHasInternetOnline === null || obj.building.isHasInternetOnline != null){ //NO INTERNET OR WITH INTERNET
                        //$scope.tkupdate.idDeliveryCompanyKf="1";
                        $scope.tkupdate.mess2show="El Pedido quedara \"En Preparación\" pendiente de Habilitación/Activación de Llaveros, por favor, Confirmar?";
                      }
                      console.log(obj)
                    break;
                    case "2": //RENTREGA EN DOMICILIO
                      if(obj.building.isHasInternetOnline === null || obj.building.isHasInternetOnline != null){ //NO INTERNET OR WITH INTERNET
                        //$scope.tkupdate.idDeliveryCompanyKf="2";
                        $scope.tkupdate.mess2show="El Pedido quedara \"En Preparación\" pendiente de Habilitación/Activación de Llaveros, por favor, Confirmar?";
                      }
                      console.log(obj)
                    break;
                  }
                break;
              }
              console.info("Delivery: " +obj.typeDeliver.typeDelivery);
              console.info("msg     : " +$scope.mess2show);
              $scope.modalConfirmation('applySetMgmtKeys',0, $scope.tkupdate);
              //USAR ESTE CODIGO PARA PEDIDOS DE STOCK
              /*if(obj.building.isHasInternetOnline === null){
                if ($scope.tkupdate.building.isStockInOffice=='1'){
                  $scope.tkupdate.idDeliveryCompanyKf="2";
                }else if ($scope.tkupdate.building.isStockInBuilding=='1'){
                  $scope.tkupdate.idDeliveryCompanyKf="1";
                }
              }*/
            break;
            case "applySetMgmtKeys":
                $scope.thereIsKeyWithoutIdKeychain      = false;
                $scope.tkupdate.idMgmtMethodKf          = $scope.ticket.idMgmtMethodKf;
                $scope.tkupdate.newKeychainList         = $scope.rsNewKeychainList
                $scope.tkupdate.refund                  = [];
                $scope.tkupdate.history                 = [];
                switch($scope.tkupdate.idMgmtMethodKf){
                  case "1":
                    $scope.tkupdate.history.push({'idUserKf': $scope.sysLoggedUser.idUser, 'descripcion': null, 'idCambiosTicketKf':"28"});
                  break;
                  case "2":
                    $scope.tkupdate.history.push({'idUserKf': $scope.sysLoggedUser.idUser, 'descripcion': null, 'idCambiosTicketKf':"29"});
                  break;
                }
                $scope.tkupdate.history.push({'idUserKf': $scope.sysLoggedUser.idUser, 'descripcion': null, 'idCambiosTicketKf':"30"});
                $scope.tkupdate.history.push({'idUserKf': $scope.sysLoggedUser.idUser, 'descripcion': null, 'idCambiosTicketKf':"31"});
                console.log($scope.tkupdate);
                console.log($scope.rsNewKeychainList);
                $scope.isEditKey                        = false;
                $scope.isNewKeyMulti                    = false;
                //console.log(obj);
                var i = 0;
                var assignedKeys = [];
                angular.forEach($scope.rsNewKeychainList,function(key,i){
                  var deferredKeys = $q.defer();
                  assignedKeys.push(deferredKeys.promise);
                  $timeout(function() {
                      deferredKeys.resolve();
                      var keys = {
                        idProductKf         : key.idProductKf,
                        codExt              : key.codExt,
                        codigo              : key.codigo,
                        idDepartmenKf       : key.idDepartmenKf,
                        idClientKf          : key.idClientKf,
                        idUserKf            : key.idUserKf,
                        idCategoryKf        : key.idKeychain!=undefined?"1":key.idCategoryKf,
                        isKeyTenantOnly     : key.isKeyTenantOnly,
                        idClientAdminKf     : key.idClientAdminKf!='' && key.idClientAdminKf!=null && key.idClientAdminKf!=undefined?key.idClientAdminKf:null,
                        createdBy           : $scope.sysLoggedUser.idUser,
                        idTicketKf          : $scope.tkupdate.idTicket,
                        idTypeTicketKf      : $scope.tkupdate.idTypeTicketKf,
                        idKeychainStatusKf  : key.idKeychainStatusKf,
                        idTicketKeychain    : $scope.tkupdate.keys[i].idTicketKeychain
                      };


                      switch($scope.tkupdate.idMgmtMethodKf){
                        case "1":
                          console.log("Llavero a actualizar");
                          console.log("idKeychain     : "+keys.idKeychain);
                          console.log("Codigo         : "+keys.codigo);
                          console.log("idCategoryKf   : "+keys.idCategoryKf);
                          $scope.updateKeyFn({llavero: keys});
                        break;
                        case "2":
                          console.log("Llavero a agregar");
                          console.log("Codigo         : "+keys.codigo);
                          console.log("idCategoryKf   : "+keys.idCategoryKf);
                          $scope.addKeyFn({llavero: keys});
                        break;
                      }
                      console.log(keys);
                      deferredKeys.resolve();
                  }, 1000);
                });
                $q.all(assignedKeys).then(function () {
                  console.log("Ticket to Update: "+$scope.tkupdate.codTicket);
                  console.log($scope.tkupdate);
                  if ($scope.ticket.keysMethodSelected==null || $scope.ticket.keysMethodSelected==undefined){
                    $scope.updateUpRequestFn({ticket: $scope.tkupdate});
                  }
                });
                //$scope.addKeyFn($scope.keys);
            break;
            case "apply_isKeysEnable":
              console.log(obj);
              $scope.tkupdate.newKeychainList         = $scope.rsNewKeychainList
              $scope.tkupdate.whereKeysAreEnable      = $scope.ticket.whereKeysAreEnableTmp!=null?$scope.ticket.whereKeysAreEnableTmp:null;
              $scope.functions.whereKeysAreEnable     = $scope.ticket.whereKeysAreEnableTmp!=null?$scope.ticket.whereKeysAreEnableTmp:null;
              $scope.tkupdate.refund                  = [];
              $scope.tkupdate.history                 = [];
              $scope.tkupdate.history.push({'idUserKf': $scope.sysLoggedUser.idUser, 'descripcion': null, 'idCambiosTicketKf':"28"});
              $scope.tkupdate.history.push({'idUserKf': $scope.sysLoggedUser.idUser, 'descripcion': null, 'idCambiosTicketKf':"30"});
              $scope.tkupdate.history.push({'idUserKf': $scope.sysLoggedUser.idUser, 'descripcion': null, 'idCambiosTicketKf':"31"});
              console.log($scope.tkupdate);
              console.log($scope.rsNewKeychainList);
              $scope.isNewKeySingle                   = true;
              $scope.isEditKey                        = false;
              $scope.isNewKeyMulti                    = false;
              //console.log(obj);
              var i = 0;
              var assignedKeys = [];
              angular.forEach($scope.rsNewKeychainList,function(key,i){
                var deferredKeys = $q.defer();
                assignedKeys.push(deferredKeys.promise);
                $timeout(function() {
                    deferredKeys.resolve();
                    var keys = {
                      idProductKf         : key.idProductKf,
                      codExt              : key.codExt,
                      codigo              : key.codigo,
                      idDepartmenKf       : key.idDepartmenKf,
                      idClientKf          : key.idClientKf,
                      idUserKf            : key.idUserKf,
                      idCategoryKf        : key.idCategoryKf,
                      isKeyTenantOnly     : key.isKeyTenantOnly,
                      idClientAdminKf     : key.idClientAdminKf!='' && key.idClientAdminKf!=null && key.idClientAdminKf!=undefined?key.idClientAdminKf:null,
                      createdBy           : $scope.sysLoggedUser.idUser,
                      idTicketKf          : $scope.tkupdate.idTicket,
                      idTypeTicketKf      : $scope.tkupdate.idTypeTicketKf,
                      idKeychainStatusKf  : 1,
                      idTicketKeychain    : $scope.tkupdate.keys[i].idTicketKeychain
                    };
                    console.log("Llavero a actualizar: "+keys.codigo);
                    console.log(keys);
                    //$scope.addKeyFn({llavero: keys});
                    deferredKeys.resolve();
                }, 1000);
              });
              $q.all(assignedKeys).then(function () {
                console.log("Ticket to Update: "+$scope.tkupdate.codTicket);
                console.log($scope.tkupdate);
                //$scope.updateUpRequestFn({ticket: $scope.tkupdate});
              });

            break;
            case "checkAllList":
              console.log($scope.select.checkList.selected);
              if ($scope.select.checkList.selected){
                  for (var key in $scope.listTickt){
                      $scope.listTickt[key].selected=true;
                  }
              }else{
                  for (var key in $scope.listTickt){
                      $scope.listTickt[key].selected=false;
                  }
              }
              $scope.mainSwitchFn('check_list_item', $scope.listTickt);
          break;
            case "check_list_item":
              console.log(obj);
              for (var key in obj){
                  if (obj[key].selected){
                      $scope.listItemSelected=true;
                      break;
                  }else{
                      $scope.listItemSelected=false;
                  }
              }
            break;
            case "ticket_user":
              $('#userModalDetails').modal('show');
            break;
            case "ticket_delivery":
              $('#deliveryModalDetails').modal('show');
            break;
            case "ticket_payment":
              $('#paymentModalDetails').modal('show');
            break;
            case "ticket_manual_payment":
              $scope.ticket = {'administration':undefined, 'idTypeRequestFor':null, 'building':undefined, 'selected':{},'idClientDepartament':undefined, 'radioButtonDepartment':undefined, 'radioButtonBuilding':undefined, 'optionTypeSelected': {}, 'userRequestBy':{}, 'userNotify':null, 'keys':[], 'delivery':{'idTypeDeliveryKf':null, 'whoPickUp':null, 'zone':{}, 'thirdPerson':null, 'deliveryTo':{}, 'otherAddress':undefined}, 'cost':{'keys':0, 'delivery':0, 'service':0, 'total':0}};
              $scope.ticket.selected                              = obj;
              $scope.ticket.building                              = obj.building;
              $scope.ticket.administration                        = obj.clientAdmin;
              $scope.ticket.idClientDepartament                   = obj.department;
              $scope.ticket.userRequestBy                         = obj.userRequestBy;
              $scope.ticket.idTypeRequestFor                      = obj.idTypeRequestFor;
              $scope.getCostByCustomer.rate.idServiceType         = obj.idTypeTicketKf;
              $scope.getCostByCustomer.rate.idServiceTechnician   = "1";
              $scope.getCostByCustomer.rate.idCustomer            = obj.building.idClient;
              $scope.getCostByCustomer.rate.deviceIsOnline        = obj.building.isHasInternetOnline || obj.building.isHasInternetOnline==null || obj.building.isHasInternetOnline==undefined?"2":"1";
              $scope.list_keys                                    = $scope.ticket.selected.keys;
              var keyTotalAllowed        = Number($scope.keyTotalAllowed);
              var subTotalKeys           = Number($scope.ticket.selected.costKeys);
              console.log("Total key:"+subTotalKeys);
              console.log("Total key allowed:"+keyTotalAllowed);
              if (subTotalKeys>=keyTotalAllowed){
                $scope.deliveryCostFree = 1;
              }else{
                  $scope.deliveryCostFree = 0;
              }
              $('#registerManualPayment').modal({backdrop: 'static', keyboard: false});
              console.log($scope.ticket);
            break;
            case "ticket_manual_payment_add":
              console.log(obj);
              $scope.mp.payment.data.idTicketKf               = obj.selected.idTicket;
              $scope.mp.payment.data.client_id                = "8877359900700578";
              $scope.mp.payment.data.collector_id             = null;
              var manualPaymentDate = new Date(obj.manualPaymentDate);
              var date = moment.tz(manualPaymentDate, "YYYY-MM-DD", "America/Argentina/Buenos_Aires");
              var newPaymentDate = date.toDate();
              $scope.mp.payment.data.manualPaymentDate        = obj.manualPaymentDate;
              var current_date = new Date();
              var date = moment.tz(current_date, "YYYY-MM-DD", "America/Argentina/Buenos_Aires");
              var newDate = date.toDate();
              var dateTimeString =
                  String(current_date.getDate()).padStart(2, '0') +      // dd
                  String(current_date.getMonth() + 1).padStart(2, '0') + // mm (mes empieza en 0)
                  current_date.getFullYear() +                           // yyyy
                  String(current_date.getHours()).padStart(2, '0') +     // hh
                  String(current_date.getMinutes()).padStart(2, '0');    // mm
              $scope.mp.payment.data.date_created             = newDate;
              $scope.mp.payment.data.id                       = "90000"+dateTimeString;
              $scope.mp.payment.data.expires                  = null;
              $scope.mp.payment.data.external_reference       = obj.idManualPayment!="3"?obj.selected.idTicket+"_"+obj.manualPaymentNumber:obj.selected.idTicket+"_"+dateTimeString;
              $scope.mp.payment.data.init_point               = null;
              $scope.mp.payment.data.sandbox_init_point       = null;
              $scope.mp.payment.data.operation_type           = "regular_payment";
              $scope.mp.payment.data.paymentForDelivery       = false;
              $scope.mp.payment.data.manualPaymentDescription = obj.manualPaymentDescription;
              $scope.mp.payment.data.manualPaymentNumber      = obj.manualPaymentNumber;
              $scope.mp.payment.data.idManualPaymentTypeKf    = obj.idManualPayment;
              $scope.mp.payment.data.mp_payment_type          = obj.idManualPayment!="3"?"wire transfer":"deposit";
              $scope.mp.payment.data.mp_status_detail         = "accredited";
              $scope.mp.payment.data.mp_collection_status     = "approved";
              $scope.mp.payment.data.mp_payment_id            = obj.manualPaymentNumber;
              $scope.mp.payment.data.idUserKf                 = $scope.sysLoggedUser.idUser;
              $scope.mp.payment.data.isManualPayment          = true;
              console.log($scope.mp.payment.data);
                ticketServices.addPayment($scope.mp.payment).then(function(response){
                  console.log(response);
                  if(response.status==200){
                      console.log("Solicitud de Pago registrada satisfactoriamente");
                      inform.add('La solicitud de pago ha sido registrada Satisfactoriamente. ',{
                              ttl:5000, type: 'success'
                      });
                      $scope.update.ticket.idTicket              = obj.selected.idTicket;
                      $scope.update.ticket.idNewStatusKf         = "8";
                      $scope.update.ticket.delivery_schedule_at  = null;
                      $scope.update.ticket.delivered_at          = null
                      $scope.update.ticket.history               = [];
                      $scope.update.ticket.history.push({'idUserKf': $scope.sysLoggedUser.idUser, 'descripcion': "El pago ha sido registro de forma manual", 'idCambiosTicketKf':"4"});
                      $scope.update.ticket.history.push({'idUserKf': $scope.sysLoggedUser.idUser, 'descripcion': null, 'idCambiosTicketKf':"13"});
                      console.log($scope.update);
                      $timeout(function() {
                        $('#registerManualPayment').modal('hide');
                        $('#showModalRequestStatus').modal({backdrop: 'static', keyboard: false});
                        $scope.changeTicketStatusRequestFn($scope.update);
                      }, 2000);
                  }else if(response.status==500){
                      $scope.addPaymentDetailsFn = null;
                      console.log("Payment request has failed, contact administrator");
                      inform.add('Error: [500] Contacta al area de soporte. ',{
                              ttl:5000, type: 'danger'
                      });
                  }
                });
            break;
            case "ticket_delivery_change":
              $scope.ticket = {'administration':undefined, 'idTypeRequestFor':null, 'building':undefined, 'selected':{},'idClientDepartament':undefined, 'radioButtonDepartment':undefined, 'radioButtonBuilding':undefined, 'optionTypeSelected': {}, 'userRequestBy':{}, 'userNotify':null, 'keys':[], 'delivery':{'idTypeDeliveryKf':null, 'whoPickUp':null, 'zone':{}, 'thirdPerson':null, 'deliveryTo':{}, 'otherAddress':undefined}, 'cost':{'keys':0, 'delivery':0, 'service':0, 'total':0}};
              $scope.ticket.selected                              = obj;
              $scope.ticket.building                              = obj.building;
              $scope.ticket.administration                        = obj.clientAdmin;
              $scope.ticket.idClientDepartament                   = obj.department;
              $scope.ticket.userRequestBy                         = obj.userRequestBy;
              $scope.ticket.idTypeRequestFor                      = obj.idTypeRequestFor;
              $scope.getCostByCustomer.rate.idServiceType         = obj.idTypeTicketKf;
              $scope.getCostByCustomer.rate.idServiceTechnician   = "1";
              $scope.getCostByCustomer.rate.idCustomer            = obj.building.idClient;
              $scope.getCostByCustomer.rate.deviceIsOnline        = obj.building.isHasInternetOnline || obj.building.isHasInternetOnline==null || obj.building.isHasInternetOnline==undefined?"2":"1";
              $scope.list_keys                                    = $scope.ticket.selected.keys;
              $scope.getDeliveryTypesFn();
              $scope.checkControlAccessStateFn(obj.building.idClient);
              $scope.getAttendantListFn(obj.building.idClient);
              //$scope.getServiceCostByCustomerFn($scope.getCostByCustomer);
              $scope.mainSwitchFn('setWhoPickUpList', obj);
              var keyTotalAllowed        = Number($scope.keyTotalAllowed);
              var subTotalKeys           = Number($scope.ticket.selected.costKeys);
              //deliveryCostFree
              $scope.keysTotalPrice=subTotalKeys.toFixed(2);
              console.log("subTotalKeys: "+subTotalKeys+"\n"+"keyTotalAllowed :"+keyTotalAllowed);
              if (($scope.keysTotalPrice>=keyTotalAllowed) ||
                  ($scope.ticket.building!=undefined && $scope.ticket.building.isInitialDeliveryActive.length==1 && $scope.ticket.building.isInitialDeliveryActive[0].expiration_state!=undefined && !$scope.ticket.building.isInitialDeliveryActive[0].expiration_state)||
                  ($scope.ticket.building.isStockInBuilding=="1")){
                  $scope.deliveryCostFree = 1;
              }else{
                  $scope.deliveryCostFree = 0;
              }
              $('#UpdateModalDelivery').modal({backdrop: 'static', keyboard: false});
              console.log($scope.ticket);
            break;
            case "apply_ticket_delivery_change":
              if (obj.selected.idTypeDeliveryKf==obj.delivery.idTypeDeliveryKf && obj.selected.idDeliveryTo==obj.delivery.idDeliveryTo && obj.delivery.whoPickUp.idUser==obj.selected.idUserDelivery && obj.cost.delivery==obj.selected.costDelivery){
                inform.add('No hay cambio en su metodo de envío, intente nuevamente.',{
                  ttl:5000, type: 'info'
                });
              }else{
                  console.log(obj);
                  $scope.update.ticket.createNewMPLink                  = false;
                  $scope.update.ticket.createNewMPLinkForDelivery       = false;
                  $scope.update.ticket.idTicket                         = obj.selected.idTicket;
                  $scope.update.ticket.history                          = [];
                  $scope.otherDeliveryAddress                           = {};
                  $scope.thirdPersonDelivery                            = {};
                  $scope.costDelivery                                   = obj.selected.costDelivery!=null?Number(obj.selected.costDelivery):null;
                  $scope.subTotalDelivery                               = Number(obj.cost.delivery);
                  $scope.update.ticket.refund                           = [];
                  switch (obj.selected.idTypePaymentKf){
                    case "1":
                      if (obj.selected.idTypeDeliveryKf!=obj.delivery.idTypeDeliveryKf && obj.delivery.idTypeDeliveryKf=="1"){
                        $scope.update.ticket.history.push({'idUserKf': $scope.sysLoggedUser.idUser, 'descripcion': null, 'idCambiosTicketKf':"12"});
                        $scope.update.ticket.history.push({'idUserKf': "1", 'descripcion': null, 'idCambiosTicketKf':"16"});
                        inform.add('Cobro de ($ '+obj.selected.costDelivery+') por envío del pedido '+obj.codTicket+' no sera realizado, BSS Seguridad.',{
                          ttl:12000, type: 'info'
                        });
                      }else if (obj.selected.idTypeDeliveryKf!=obj.delivery.idTypeDeliveryKf && obj.delivery.idTypeDeliveryKf=="2"){
                        $scope.update.ticket.history.push({'idUserKf': $scope.sysLoggedUser.idUser, 'descripcion': null, 'idCambiosTicketKf':"12"});
                        $scope.update.ticket.history.push({'idUserKf': "1", 'descripcion': null, 'idCambiosTicketKf':"17"});
                        inform.add('Se adicionaran ($ '+obj.cost.delivery+'), por concepto de envío, al costo total de su pedido, BSS Seguridad.',{
                          ttl:6000, type: 'warning'
                        });
                        $scope.update.ticket.idStatusTicketKf       = "3";
                      }else if (obj.selected.idTypeDeliveryKf==obj.delivery.idTypeDeliveryKf && obj.selected.idDeliveryTo!=obj.delivery.idDeliveryTo && obj.cost.delivery!=undefined && obj.cost.delivery!=null && ($scope.costDelivery==null || $scope.costDelivery==0) && obj.cost.delivery>0){
                        $scope.update.ticket.history.push({'idUserKf': $scope.sysLoggedUser.idUser, 'descripcion': null, 'idCambiosTicketKf':"12"});
                        $scope.update.ticket.history.push({'idUserKf': "1", 'descripcion': null, 'idCambiosTicketKf':"17"});
                        inform.add('Se adicionaran ($ '+obj.cost.delivery+'), por concepto de envío, al costo total de su pedido, BSS Seguridad.',{
                          ttl:6000, type: 'warning'
                        });
                        $scope.update.ticket.idStatusTicketKf       = "3";
                      }else if (obj.selected.idTypeDeliveryKf==obj.delivery.idTypeDeliveryKf && obj.selected.idDeliveryTo!=obj.delivery.idDeliveryTo && obj.cost.delivery!=undefined && obj.cost.delivery!=null && $scope.costDelivery!=null && $scope.costDelivery>0 && obj.cost.delivery>0 && obj.cost.delivery>$scope.costDelivery){
                        $scope.update.ticket.history.push({'idUserKf': $scope.sysLoggedUser.idUser, 'descripcion': null, 'idCambiosTicketKf':"12"});
                        $scope.update.ticket.history.push({'idUserKf': "1", 'descripcion': null, 'idCambiosTicketKf':"17"});
                        $scope.subTotalDelivery = 0;
                        $scope.subTotalDeliveryCharged = 0;
                        $scope.subTotalDeliveryCharged = Number(obj.cost.delivery)-Number($scope.costDelivery);
                        $scope.subTotalDelivery = Number(obj.cost.delivery);
                        inform.add('Se adicionaran ($ '+$scope.subTotalDeliveryCharged+') de diferencia, por concepto de envío, al costo total de su pedido, BSS Seguridad.',{
                          ttl:6000, type: 'warning'
                        });
                        $scope.update.ticket.idStatusTicketKf       = "3";
                      }else if (obj.selected.idTypeDeliveryKf==obj.delivery.idTypeDeliveryKf && obj.selected.idDeliveryTo!=obj.delivery.idDeliveryTo && obj.cost.delivery!=undefined && obj.cost.delivery!=null && $scope.costDelivery!=null && $scope.costDelivery>0 && obj.cost.delivery>0 && obj.cost.delivery<$scope.costDelivery){
                        $scope.update.ticket.history.push({'idUserKf': $scope.sysLoggedUser.idUser, 'descripcion': null, 'idCambiosTicketKf':"12"});
                        $scope.update.ticket.history.push({'idUserKf': "1", 'descripcion': null, 'idCambiosTicketKf':"16"});
                        $scope.subTotalRefunDelivery = 0;
                        $scope.subTotalDelivery = 0;
                        $scope.subTotalDelivery = Number(obj.cost.delivery);
                        $scope.subTotalRefunDelivery = Number($scope.costDelivery)-Number(obj.cost.delivery);
                        inform.add('El pedido '+obj.codTicket+' tendra un descuento de ($ '+$scope.subTotalRefunDelivery+') por envío, BSS Seguridad.',{
                          ttl:12000, type: 'info'
                        });
                      }else if (obj.selected.idTypeDeliveryKf==obj.delivery.idTypeDeliveryKf && obj.selected.idDeliveryTo==obj.delivery.idDeliveryTo && obj.cost.delivery==obj.selected.costDelivery){
                        $scope.update.ticket.history.push({'idUserKf': $scope.sysLoggedUser.idUser, 'descripcion': null, 'idCambiosTicketKf':"12"});
                        inform.add('No se registran costos adicionales, por concepto de envío, al costo total de su pedido, BSS Seguridad.',{
                          ttl:6000, type: 'info'
                        });
                      }else{
                        $scope.update.ticket.history.push({'idUserKf': $scope.sysLoggedUser.idUser, 'descripcion': null, 'idCambiosTicketKf':"12"});
                        inform.add('El pedido no tendra una recarga extra por envío al nuevo domicilio seleccionado, BSS Seguridad.',{
                          ttl:6000, type: 'success'
                        });
                      }
                    break;
                    case "2":
                      if (obj.selected.idTypeDeliveryKf!=obj.delivery.idTypeDeliveryKf && obj.delivery.idTypeDeliveryKf=="1"){
                        if((obj.selected.paymentDetails!=undefined && obj.selected.paymentDetails!=null) && obj.selected.paymentDetails.mp_collection_status=='approved' && obj.selected.paymentDetails.mp_status_detail=='accredited'){
                          $scope.update.ticket.refund = [];
                          $scope.update.ticket.refund.push({'idTicketKf': obj.selected.idTicket, 'idRefundTypeKf':'1',  'description':'',  'refundAmount':obj.selected.costDelivery});
                          $scope.update.ticket.history.push({'idUserKf': $scope.sysLoggedUser.idUser, 'descripcion': null, 'idCambiosTicketKf':"12"});
                          $scope.update.ticket.history.push({'idUserKf': "1", 'descripcion': null, 'idCambiosTicketKf':"15"});
                          inform.add('Se realizara un reintegro de ($ '+obj.selected.costDelivery+'), del costo inicial de su pedido, BSS Seguridad.',{
                            ttl:6000, type: 'info'
                          });
                          $scope.update.ticket.idStatusTicketKf       = obj.selected.idStatusTicketKf;
                        }else{
                          $scope.update.ticket.history.push({'idUserKf': $scope.sysLoggedUser.idUser, 'descripcion': null, 'idCambiosTicketKf':"12"});
                          $scope.update.ticket.history.push({'idUserKf': "1", 'descripcion': null, 'idCambiosTicketKf':"16"});
                          inform.add('Se descontaran ($ '+obj.selected.costDelivery+'), del costo inicial de su pedido, BSS Seguridad.',{
                            ttl:6000, type: 'success'
                          });
                          if (($scope.costDelivery==null || $scope.costDelivery==0) && obj.cost.delivery==0){
                            $scope.update.ticket.createNewMPLink = false;
                          }else{
                            $scope.update.ticket.createNewMPLink = true;
                            inform.add('Nuevo link de pago sera generado para el pago de su pedido, BSS Seguridad.',{
                              ttl:6000, type: 'warning'
                            });
                          }
                          $scope.update.ticket.idStatusTicketKf       = obj.selected.idStatusTicketKf;
                        }
                      }else if (obj.selected.idTypeDeliveryKf!=obj.delivery.idTypeDeliveryKf && obj.delivery.idTypeDeliveryKf=="2"){
                        $scope.update.ticket.history.push({'idUserKf': $scope.sysLoggedUser.idUser, 'descripcion': null, 'idCambiosTicketKf':"12"});
                        if((obj.selected.paymentDetails!=undefined && obj.selected.paymentDetails!=null) && obj.selected.paymentDetails.mp_collection_status=='approved' && obj.selected.paymentDetails.mp_status_detail=='accredited'){
                            console.info(obj.cost);
                          if (obj.cost.delivery!=undefined && obj.cost.delivery!=null && obj.cost.delivery>0){
                            console.info("ENTRO");
                            console.info(obj.cost);
                            $scope.update.ticket.history.push({'idUserKf': "1", 'descripcion': null, 'idCambiosTicketKf':"17"});
                              inform.add('Nuevo link de pago por el monto de ($ '+obj.cost.delivery+'), sera generado por concepto de envío de su pedido, BSS Seguridad.',{
                                ttl:6000, type: 'warning'
                              });
                            $scope.update.ticket.createNewMPLinkForDelivery = true;
                            $scope.update.ticket.idStatusTicketKf = "3";
                            console.log($scope.update.ticket.idStatusTicketKf);
                          }else{
                            inform.add('El pedido no tendra una recarga extra por envío al nuevo domicilio seleccionado, BSS Seguridad.',{
                              ttl:6000, type: 'success'
                            });
                          }
                        }else{
                            $scope.update.ticket.history.push({'idUserKf': "1", 'descripcion': null, 'idCambiosTicketKf':"17"});
                            inform.add('Se adicionara el monto de ($ '+obj.cost.delivery+'), por concepto de envío de su pedido, BSS Seguridad.',{
                              ttl:6000, type: 'warning'
                            });
                            $scope.update.ticket.createNewMPLink = true;
                            console.log("SE MODIFICA STATUS POR VALOR ACTUAL");
                            console.log($scope.update.ticket.idStatusTicketKf);
                            $scope.update.ticket.idStatusTicketKf       = obj.selected.idStatusTicketKf;
                        }
                      }else if (obj.selected.idTypeDeliveryKf==obj.delivery.idTypeDeliveryKf && obj.selected.idDeliveryTo!=obj.delivery.idDeliveryTo && obj.cost.delivery!=undefined && obj.cost.delivery!=null && ($scope.costDelivery==null || $scope.costDelivery==0) && obj.cost.delivery>0){
                        if((obj.selected.paymentDetails!=undefined && obj.selected.paymentDetails!=null) && obj.selected.paymentDetails.mp_collection_status=='approved' && obj.selected.paymentDetails.mp_status_detail=='accredited'){
                          console.info(obj.cost);
                          //console.info(obj.cost);
                          $scope.update.ticket.history.push({'idUserKf': $scope.sysLoggedUser.idUser, 'descripcion': null, 'idCambiosTicketKf':"12"});
                          $scope.update.ticket.history.push({'idUserKf': "1", 'descripcion': null, 'idCambiosTicketKf':"17"});
                          inform.add('Nuevo link de pago por el monto de ($ '+obj.cost.delivery+'), sera generado por concepto de envío de su pedido, BSS Seguridad.',{
                            ttl:6000, type: 'warning'
                          });
                          $scope.update.ticket.createNewMPLinkForDelivery = true;
                          $scope.update.ticket.idStatusTicketKf = "3";
                        }else {
                          $scope.update.ticket.history.push({'idUserKf': $scope.sysLoggedUser.idUser, 'descripcion': null, 'idCambiosTicketKf':"12"});
                          $scope.update.ticket.history.push({'idUserKf': "1", 'descripcion': null, 'idCambiosTicketKf':"17"});
                          inform.add('Se adicionara monto de ($ '+obj.cost.delivery+'), por concepto de envío de su pedido, BSS Seguridad.',{
                            ttl:6000, type: 'warning'
                          });
                          $scope.update.ticket.createNewMPLink        = true;
                          console.log("SE MODIFICA STATUS POR VALOR ACTUAL");
                          console.log($scope.update.ticket.idStatusTicketKf);
                          $scope.update.ticket.idStatusTicketKf       = obj.selected.idStatusTicketKf;
                        }
                      }else if (obj.selected.idTypeDeliveryKf==obj.delivery.idTypeDeliveryKf && obj.selected.idDeliveryTo!=obj.delivery.idDeliveryTo && obj.cost.delivery!=undefined && obj.cost.delivery!=null && $scope.costDelivery!=null && $scope.costDelivery>0 && obj.cost.delivery>0 && obj.cost.delivery>$scope.costDelivery){
                        $scope.update.ticket.history.push({'idUserKf': $scope.sysLoggedUser.idUser, 'descripcion': null, 'idCambiosTicketKf':"12"});
                        $scope.update.ticket.history.push({'idUserKf': "1", 'descripcion': null, 'idCambiosTicketKf':"17"});
                        $scope.subTotalDelivery = 0;
                        $scope.subTotalDeliveryCharged = 0;
                        $scope.subTotalDeliveryCharged = Number(obj.cost.delivery)-Number($scope.costDelivery);
                        $scope.subTotalDelivery = Number(obj.cost.delivery);
                        if((obj.selected.paymentDetails!=undefined && obj.selected.paymentDetails!=null) && obj.selected.paymentDetails.mp_collection_status=='approved' && obj.selected.paymentDetails.mp_status_detail=='accredited'){
                          console.info(obj.cost);
                          //console.info(obj.cost);
                          inform.add('Nuevo link de pago por el monto de ($ '+$scope.subTotalDeliveryCharged+'), sera generado por concepto de envío de su pedido, BSS Seguridad.',{
                            ttl:6000, type: 'warning'
                          });
                          $scope.update.ticket.createNewMPLinkForDelivery = true;
                          $scope.update.ticket.idStatusTicketKf           = "3";
                        }else{
                          inform.add('Se adicionara un monto de ($ '+$scope.subTotalDeliveryCharged+'), por concepto de envío de su pedido, BSS Seguridad.',{
                            ttl:6000, type: 'warning'
                          });
                          console.log("SE MODIFICA STATUS POR VALOR ACTUAL");
                          console.log($scope.update.ticket.idStatusTicketKf);
                          $scope.update.ticket.idStatusTicketKf       = obj.selected.idStatusTicketKf;
                          $scope.update.ticket.createNewMPLink        = true;
                        }
                      }else if (obj.selected.idTypeDeliveryKf==obj.delivery.idTypeDeliveryKf && obj.selected.idDeliveryTo!=obj.delivery.idDeliveryTo && obj.cost.delivery!=undefined && obj.cost.delivery!=null && $scope.costDelivery!=null && $scope.costDelivery>0 && obj.cost.delivery>0 && obj.cost.delivery<$scope.costDelivery){
                        $scope.update.ticket.history.push({'idUserKf': $scope.sysLoggedUser.idUser, 'descripcion': null, 'idCambiosTicketKf':"12"});
                        $scope.update.ticket.history.push({'idUserKf': "1", 'descripcion': null, 'idCambiosTicketKf':"16"});
                        $scope.subTotalRefunDelivery  = 0;
                        $scope.subTotalDelivery       = 0;
                        $scope.subTotalDelivery       = Number(obj.cost.delivery);
                        $scope.subTotalRefunDelivery  = Number($scope.costDelivery)-Number(obj.cost.delivery);
                        inform.add('El pedido '+obj.codTicket+' tendra un descuento de ($ '+$scope.subTotalRefunDelivery+') por envío, BSS Seguridad.',{
                          ttl:12000, type: 'info'
                        });
                        if((obj.selected.paymentDetails!=undefined && obj.selected.paymentDetails!=null) && obj.selected.paymentDetails.mp_collection_status=='approved' && obj.selected.paymentDetails.mp_status_detail=='accredited'){
                          console.info(obj.cost);
                          //console.info(obj.cost);
                          $scope.update.ticket.refund.push({'idTicketKf': obj.selected.idTicket, 'idRefundTypeKf':'1',  'description':'',  'refundAmount':obj.selected.costDelivery});
                          inform.add('El pedido '+obj.codTicket+' tendra un descuento de ($ '+$scope.subTotalRefunDelivery+') por envío, BSS Seguridad.',{
                            ttl:12000, type: 'info'
                          });
                          $scope.update.ticket.createNewMPLinkForDelivery = false;
                          $scope.update.ticket.idStatusTicketKf = "3";
                        }else {
                          inform.add('Se descontara un total de ($ '+$scope.subTotalRefunDelivery+'), por diferencia de envío de su pedido, BSS Seguridad.',{
                            ttl:6000, type: 'warning'
                          });
                          $scope.update.ticket.createNewMPLink = true;
                          console.log("SE MODIFICA STATUS POR VALOR ACTUA");
                          console.log($scope.update.ticket.idStatusTicketKf);
                          $scope.update.ticket.idStatusTicketKf       = obj.selected.idStatusTicketKf;
                        }
                      }else if (obj.selected.idTypeDeliveryKf==obj.delivery.idTypeDeliveryKf && obj.selected.idDeliveryTo==obj.delivery.idDeliveryTo && obj.cost.delivery==obj.selected.costDelivery){
                        $scope.update.ticket.history.push({'idUserKf': $scope.sysLoggedUser.idUser, 'descripcion': null, 'idCambiosTicketKf':"12"});
                        inform.add('No se registran costos adicionales, por concepto de envío, al costo total de su pedido, BSS Seguridad.',{
                          ttl:6000, type: 'info'
                        });
                        console.log("SE MODIFICA STATUS POR VALOR ACTUA");
                        console.log($scope.update.ticket.idStatusTicketKf);
                        $scope.update.ticket.idStatusTicketKf       = obj.selected.idStatusTicketKf;
                      }else{
                        $scope.update.ticket.history.push({'idUserKf': $scope.sysLoggedUser.idUser, 'descripcion': null, 'idCambiosTicketKf':"12"});
                        inform.add('El pedido no tendra una recarga extra por envío al nuevo domicilio seleccionado, BSS Seguridad.',{
                          ttl:6000, type: 'success'
                        });
                        console.log("SE MODIFICA STATUS POR VALOR ACTUA");
                        console.log($scope.update.ticket.idStatusTicketKf);
                        $scope.update.ticket.idStatusTicketKf       = obj.selected.idStatusTicketKf;
                      }
                    break;
                  }
                  if(obj.selected.idTypeRequestFor!="2" && obj.selected.idTypeRequestFor!="4"){
                    if (obj.delivery.idTypeDeliveryKf=="1"){
                        //$scope.update.ticket.idStatusTicketKf          = obj.selected.idStatusTicketKf;
                        $scope.update.ticket.idDeliveryTo              = null
                        $scope.otherDeliveryAddress.id                 = obj.selected.otherDeliveryAddress!=undefined && obj.selected.otherDeliveryAddress!=null?obj.selected.otherDeliveryAddress.id:null;
                        $scope.update.ticket.otherDeliveryAddress      = {'id':$scope.otherDeliveryAddress.id, 'address':null,'number':null,'floor':null, 'idProvinceFk':null, 'idLocationFk':null};
                        if (obj.delivery.whoPickUp.id==undefined){
                            $scope.update.ticket.idWhoPickUp           = "1";
                            $scope.thirdPersonDelivery.id              = obj.selected.thirdPersonDelivery!=undefined && obj.selected.thirdPersonDelivery!=null?obj.selected.thirdPersonDelivery.id:null;
                            $scope.update.ticket.idUserDelivery        = obj.delivery.deliveryTo.idUser;
                            $scope.update.ticket.thirdPersonDelivery   = {'id':$scope.thirdPersonDelivery.id, 'fullName':null, 'movilPhone':null, 'address':null,'number':null,'floor':null, 'idProvinceFk':null, 'idLocationFk':null};
                        }else if (obj.delivery.whoPickUp.id==2){
                            $scope.update.ticket.idWhoPickUp           = obj.delivery.whoPickUp.id;
                            $scope.thirdPersonDelivery.id              = obj.selected.thirdPersonDelivery!=undefined && obj.selected.thirdPersonDelivery!=null?obj.selected.thirdPersonDelivery.id:null;
                            $scope.update.ticket.idUserDelivery        = obj.delivery.deliveryTo.idUser;
                            $scope.update.ticket.thirdPersonDelivery   = {'id':$scope.thirdPersonDelivery.id, 'fullName':null, 'movilPhone':null, 'dni':null, 'address':null,'number':null,'floor':null, 'idProvinceFk':null, 'idLocationFk':null};
                        }else{
                            $scope.update.ticket.idWhoPickUp           = obj.delivery.whoPickUp.id;
                            $scope.update.ticket.idUserDelivery        = null;
                            $scope.thirdPersonDelivery.id              = obj.selected.thirdPersonDelivery!=undefined && obj.selected.thirdPersonDelivery!=null?obj.selected.thirdPersonDelivery.id:null;
                            $scope.update.ticket.thirdPersonDelivery   = {'id':$scope.thirdPersonDelivery.id   ,'fullName':obj.delivery.thirdPerson.fullNameUser, 'movilPhone':obj.delivery.thirdPerson.movilPhone, 'dni':obj.delivery.thirdPerson.dni, 'address':null,'number':null,'floor':null, 'idProvinceFk':null, 'idLocationFk':null};
                        }
                    }else{
                        //$scope.update.ticket.idStatusTicketKf          = obj.selected.idStatusTicketKf;
                        $scope.update.ticket.idDeliveryTo              = obj.delivery.idDeliveryTo;
                        if (obj.delivery.whoPickUp.id==undefined && obj.delivery.idDeliveryTo==1){
                            $scope.update.ticket.idWhoPickUp           = "1";
                            $scope.otherDeliveryAddress.id             = obj.selected.otherDeliveryAddress!=undefined && obj.selected.otherDeliveryAddress!=null?obj.selected.otherDeliveryAddress.id:null;
                            $scope.thirdPersonDelivery.id              = obj.selected.thirdPersonDelivery!=undefined && obj.selected.thirdPersonDelivery!=null?obj.selected.thirdPersonDelivery.id:null;
                            $scope.update.ticket.otherDeliveryAddress  = {'id':$scope.otherDeliveryAddress.id, 'address':null,'number':null,'floor':null, 'idProvinceFk':null, 'idLocationFk':null};
                            $scope.update.ticket.thirdPersonDelivery   = {'id':$scope.thirdPersonDelivery.id, 'fullName':null, 'movilPhone':null, 'address':null,'number':null,'floor':null, 'idProvinceFk':null, 'idLocationFk':null};
                            $scope.update.ticket.idUserDelivery        = obj.delivery.deliveryTo.idUser;
                            $scope.update.ticket.idDeliveryAddress     = obj.building.idClient;
                        }else if(obj.delivery.whoPickUp.id==undefined && obj.delivery.idDeliveryTo==2){
                            $scope.update.ticket.idWhoPickUp           = 1;
                            $scope.otherDeliveryAddress.id             = obj.selected.otherDeliveryAddress!=undefined && obj.selected.otherDeliveryAddress!=null?obj.selected.otherDeliveryAddress.id:null;
                            $scope.update.ticket.otherDeliveryAddress  = {'id':$scope.otherDeliveryAddress.id, 'address':obj.delivery.otherAddress.streetName,'number':obj.delivery.otherAddress.streetNumber,'floor':obj.delivery.otherAddress.floor+"-"+obj.delivery.otherAddress.department, 'idProvinceFk':obj.delivery.otherAddress.province.selected.idProvince, 'idLocationFk':obj.delivery.otherAddress.location.selected.idLocation};
                            $scope.update.ticket.thirdPersonDelivery   = {'id':$scope.thirdPersonDelivery.id, 'fullName':null, 'movilPhone':null, 'address':null,'number':null,'floor':null, 'idProvinceFk':null, 'idLocationFk':null};
                            $scope.update.ticket.idUserDelivery        = obj.delivery.deliveryTo.idUser;
                        }else if(obj.delivery.whoPickUp.id==2 && obj.delivery.idDeliveryTo==null){
                            $scope.update.ticket.idWhoPickUp           = obj.delivery.whoPickUp.id;
                            $scope.otherDeliveryAddress.id             = obj.selected.otherDeliveryAddress!=undefined && obj.selected.otherDeliveryAddress!=null?obj.selected.otherDeliveryAddress.id:null;
                            $scope.thirdPersonDelivery.id              = obj.selected.thirdPersonDelivery!=undefined && obj.selected.thirdPersonDelivery!=null?obj.selected.thirdPersonDelivery.id:null;
                            $scope.update.ticket.idUserDelivery        = obj.delivery.deliveryTo.idUser;
                            $scope.update.ticket.otherDeliveryAddress  = {'id':$scope.otherDeliveryAddress.id, 'address':null,'number':null,'floor':null, 'idProvinceFk':null, 'idLocationFk':null};
                            $scope.update.ticket.thirdPersonDelivery   = {'id':$scope.thirdPersonDelivery.id, 'fullName':null, 'movilPhone':null, 'address':null,'number':null,'floor':null, 'idProvinceFk':null, 'idLocationFk':null};
                        }else if(obj.delivery.whoPickUp.id==3 && obj.delivery.idDeliveryTo==null){
                            $scope.update.ticket.idWhoPickUp           = obj.delivery.whoPickUp.id;
                            $scope.thirdPersonDelivery.id              = obj.selected.thirdPersonDelivery!=undefined && obj.selected.thirdPersonDelivery!=null?obj.selected.thirdPersonDelivery.id:null;
                            $scope.update.ticket.idUserDelivery        = null;
                            $scope.update.ticket.thirdPersonDelivery   = {'id':$scope.thirdPersonDelivery.id, 'fullName':obj.delivery.thirdPerson.fullNameUser, 'movilPhone':obj.delivery.thirdPerson.movilPhone, 'dni':obj.delivery.thirdPerson.dni, 'address':obj.delivery.thirdPerson.streetName,'number':obj.delivery.thirdPerson.streetNumber,'floor':obj.delivery.thirdPerson.floor+"-"+obj.delivery.thirdPerson.department, 'idProvinceFk':obj.delivery.thirdPerson.province.selected.idProvince, 'idLocationFk':obj.delivery.thirdPerson.location.selected.idLocation};
                            $scope.update.ticket.otherDeliveryAddress  = {'id':$scope.otherDeliveryAddress.id, 'address':null,'number':null,'floor':null, 'idProvinceFk':null, 'idLocationFk':null};
                        }
                    }
                  }
                  $scope.update.ticket.idTypeTicketKf         = obj.selected.idTypeTicketKf;
                  $scope.update.ticket.idTypeRequestFor       = obj.selected.idTypeRequestFor;
                  $scope.update.ticket.idUserMadeBy           = obj.selected.idUserMadeBy;
                  $scope.update.ticket.idUserRequestBy        = obj.selected.idUserRequestBy;
                  $scope.update.ticket.idBuildingKf           = obj.selected.idBuildingKf;
                  $scope.update.ticket.idDepartmentKf         = obj.selected.idDepartmentKf;
                  $scope.update.ticket.idTypeDeliveryKf       = obj.delivery.idTypeDeliveryKf;
                  //$scope.update.ticket.idWhoPickUp        = obj.selected.idWhoPickUp;
                  //$scope.update.ticket.idUserDelivery     = obj.selected.idUserDelivery;
                  //$scope.update.ticket.idDeliveryTo       = obj.selected.idDeliveryTo;
                  //$scope.update.ticket.idDeliveryAddress  = obj.selected.idDeliveryAddress;
                  $scope.update.ticket.idTypePaymentKf        = obj.selected.idTypePaymentKf;
                  $scope.update.ticket.sendNotify             = obj.selected.sendNotify;
                  $scope.update.ticket.description            = obj.selected.description;
                  $scope.update.ticket.urlToken               = obj.selected.urlToken;
                  $scope.update.ticket.autoApproved           = obj.selected.autoApproved;
                  $scope.update.ticket.isNew                  = obj.selected.isNew;
                  $scope.update.ticket.costService            = obj.selected.costService;
                  $scope.update.ticket.costKeys               = obj.selected.costKeys;
                  var subTotalKeys                            = NaN2Zero(Number(obj.selected.costKeys));
                  var subTotalService                         = NaN2Zero(Number(obj.selected.costService));
                  console.log("SE MODIFICA STATUS POR VALOR ACTUA");
                  console.log($scope.update.ticket.idStatusTicketKf);
                  //$scope.update.ticket.idStatusTicketKf     = obj.selected.idStatusTicketKf;
                  $scope.update.ticket.costDelivery           = $scope.subTotalDelivery;
                  subTotalCosts = NaN2Zero(Number(subTotalService))+NaN2Zero(Number(subTotalKeys))+NaN2Zero(Number($scope.subTotalDelivery));
                  $scope.update.ticket.total                  = subTotalCosts.toFixed(2);
                  $scope.update.ticket.idPaymentDeliveryKf    = obj.selected.idPaymentDeliveryKf!=null?obj.selected.idPaymentDeliveryKf:null;
                  $scope.update.ticket.isDeliveryHasChanged   = 1;
                  console.log($scope.update);
                  $('#UpdateModalDelivery').modal('hide');
                  $('#UpdateModalTicket').modal('hide');
                  $('#showModalRequestStatus').modal({backdrop: 'static', keyboard: false});
                  $timeout(function() {
                    $scope.updateUpRequestFn($scope.update);
                  }, 2000);
                  //$scope.ticket = {'administration':undefined, 'idTypeRequestFor':null, 'building':undefined, 'idClientDepartament':undefined, 'radioButtonDepartment':undefined, 'radioButtonBuilding':undefined, 'optionTypeSelected': {}, 'userRequestBy':{}, 'userNotify':null, 'keys':[], 'delivery':{'idTypeDeliveryKf':null, 'whoPickUp':null, 'zone':{}, 'thirdPerson':null, 'deliveryTo':{}, 'otherAddress':undefined}, 'cost':{'keys':0, 'delivery':0, 'service':0, 'total':0}};
                  //$scope.ticket.building              = obj.building;
                  //$scope.ticket.administration        = obj.clientAdmin;
                  //$scope.ticket.idClientDepartament   = obj.department;
                  //$scope.ticket.userRequestBy         = obj.userRequestBy;
                  //$scope.ticket.idTypeRequestFor      = obj.idTypeRequestFor;
                  //$scope.getDeliveryTypesFn();
                  //$scope.getAttendantListFn(obj.building.idClient);
                  //$scope.getCostByCustomer.rate.idCustomer=obj.building.idClient;
                  //$scope.getServiceCostByCustomerFn($scope.getCostByCustomer);
                  //$scope.mainSwitchFn('setWhoPickUpList', obj);
                  //$('#UpdateModalDelivery').modal({backdrop: 'static', keyboard: false});
                  //console.log($scope.ticket);
                  // - VALIDAR EL NUEVO TIPO DE DELIVERY SELECCIONADO.
                  // SI EL NUEVO DELIVERY CAMBIO DE RETIRO EN OFICINA A ENVIO A DOMICILIO TITULAR O TERCERO VALIDAR LO SIGUIENTE:
                  // - VALIDAR SI EL PEDIDO ESTA PAGADO O NO.
                  // - SI EL PEDIDO ESTA PAGADO Y SI EL CAMPO "costDelivery" tiene valor asignado restar al costo de envio en caso de que este sea mayor al actual y generar un link de pago adicional para cancelar la diferencia (Solo si el tipo de pago seleccionado es Mercado Pago) y si el costo es igual al existente no se genera link para pago.
                  // - SI EL PEDIDO NO ESTA PAGADO Y SI EL CAMPO "costDelivery" tiene valor asignado restar al costo de envio en caso de que este sea mayor al actual y generar un nuevo link de pago que contenga el nuevo costo del delivery (Solo si el tipo de pago seleccionado es Mercado Pago).
                  // SI EL NUEVO DELIVERY CAMBIO DE ENVIO A DOMICILIO A RETIRO EN OFICINA POR TITULAR O TERCERO VALIDAR LO SIGUIENTE:
                  // - SI EL PEDIDO ESTA PAGADO Y SI EL CAMPO "costDelivery" tiene valor asignado, consultar con Leandro para definir como se manejaran estos casos para la devolucion del monto por el costo del delivery.
              }
            break;
            case "ticket_approve":
                console.log(obj);
                $('#showModalRequestStatus').modal({backdrop: 'static', keyboard: false});
                $timeout(function() {
                  $scope.sysApproveTicketFn(obj);
                }, 2000);
            break;
            case "ticket_request_cancel":
              console.log(obj);
              $scope.data={'ticket':{'idTicket': null, 'codTicket':'', 'history': []}};
              $scope.data.ticket.idTicket            = obj.idTicket;
              $scope.data.ticket.codTicket           = obj.codTicket;
              $scope.data.ticket.idStatusTicketKfOld = obj.idStatusTicketKf;
              $scope.data.ticket.history.push({'idUserKf': $scope.sysLoggedUser.idUser, 'idTicketKf': obj.idTicket, 'descripcion': null, 'idCambiosTicketKf':"8"});
              $timeout(function() {
                $scope.sysRequestCancellationTicketFn($scope.data);
              }, 2000);
            break;
            case "approve_ticket_request_cancel":
              console.log(obj);
              $scope.update.ticket.idTicket   = obj.idTicket;
              $scope.update.ticket.codTicket  = obj.codTicket;
              $scope.update.ticket.history   = [];
              $scope.update.ticket.refund = [];
              if (obj.isCancelRequested=="1"){
                $scope.update.ticket.history.push({'idUserKf': $scope.sysLoggedUser.idUser, 'descripcion': null, 'idCambiosTicketKf':"23"});
                $scope.update.ticket.history.push({'idUserKf': $scope.sysLoggedUser.idUser, 'descripcion': null, 'idCambiosTicketKf':"7"});
              }else{
                $scope.update.ticket.history.push({'idUserKf': $scope.sysLoggedUser.idUser, 'descripcion': null, 'idCambiosTicketKf':"7"});
              }
              switch (obj.idTypePaymentKf){
                case "1":
                  if (obj.idTypeDeliveryKf!=null){
                    $scope.subTotalTotal = 0;
                    $scope.subTotalTotal = Number(obj.total)
                    $scope.update.ticket.removePaymentDelivery = false;
                    $scope.update.ticket.isHasRefundsOpen = 0;
                    inform.add('Cobro de ($ '+$scope.subTotalTotal+') por pedido '+obj.codTicket+' no sera realizado, BSS Seguridad.',{
                      ttl:12000, type: 'info'
                    });
                    //$scope.clientName=obj.name;
                    //$scope.msg1 = 'El cliente ';
                    //$scope.msg2 = ' esta inhabilitado para realizar pedidos';
                    //$scope.msg3 = 'Contacte con la administración y/o el area de soporte.';
                    //$('#customerNotificationModal').modal({backdrop: 'static', keyboard: true});
                  }
                break;
                case "2":
                  if (obj.idTypeDeliveryKf!=null){
                    if((obj.paymentDetails!=undefined && obj.paymentDetails!=null) && obj.paymentDetails.mp_collection_status=='approved' && obj.paymentDetails.mp_status_detail=='accredited'){
                      $scope.update.ticket.refund = [];
                      $scope.update.ticket.isHasRefundsOpen = 1;
                      if((obj.paymentDeliveryDetails!=undefined && obj.paymentDeliveryDetails!=null) && obj.isDeliveryHasChanged=="1" && obj.paymentDeliveryDetails.mp_collection_status=='approved' && obj.paymentDeliveryDetails.mp_status_detail=='accredited'){
                        $scope.subTotalTotal = Number(obj.total);
                        $scope.update.ticket.refund.push({'idTicketKf': obj.idTicket, 'idRefundTypeKf':'1', 'description':'', 'refundAmount':$scope.subTotalTotal});
                        $scope.update.ticket.history.push({'idUserKf': $scope.sysLoggedUser.idUser, 'descripcion': null, 'idCambiosTicketKf':"24"});
                        inform.add('Se realizara un reintegro de ($ '+$scope.subTotalTotal+'), del costo total del pedido '+obj.codTicket+', BSS Seguridad.',{
                          ttl:12000, type: 'info'
                        });
                      }else if((obj.paymentDeliveryDetails!=undefined && obj.paymentDeliveryDetails!=null) && obj.isDeliveryHasChanged=="1" && obj.paymentDeliveryDetails.mp_collection_status!='approved' && obj.paymentDeliveryDetails.mp_status_detail!='accredited'){
                        $scope.subTotalTotal = Number(obj.total)-Number(obj.costDelivery);
                        $scope.update.ticket.refund.push({'idTicketKf': obj.idTicket, 'idRefundTypeKf':'1', 'description':'', 'refundAmount':$scope.subTotalTotal});
                        $scope.update.ticket.history.push({'idUserKf': $scope.sysLoggedUser.idUser, 'descripcion': null, 'idCambiosTicketKf':"24"});
                        $scope.update.ticket.removePaymentDelivery = true;
                        inform.add('Se realizara un reintegro de ($ '+$scope.subTotalTotal+'), del costo del pedido '+obj.codTicket+', BSS Seguridad.',{
                          ttl:12000, type: 'info'
                        });
                      }else{
                        $scope.subTotalTotal = Number(obj.total);
                        $scope.update.ticket.refund.push({'idTicketKf': obj.idTicket, 'idRefundTypeKf':'1', 'description':'', 'refundAmount':$scope.subTotalTotal});
                        $scope.update.ticket.history.push({'idUserKf': $scope.sysLoggedUser.idUser, 'descripcion': null, 'idCambiosTicketKf':"24"});
                        $scope.update.ticket.removePaymentDelivery = false;
                        inform.add('Se realizara un reintegro de ($ '+$scope.subTotalTotal+'), del costo del pedido '+obj.codTicket+', BSS Seguridad.',{
                          ttl:12000, type: 'info'
                        });
                      }
                    }else{
                      $scope.subTotalTotal = Number(obj.total);
                      $scope.update.ticket.removePaymentDelivery = false;
                      $scope.update.ticket.isHasRefundsOpen = 0;
                      inform.add('Cobro de ($ '+$scope.subTotalTotal+') por pedido '+obj.codTicket+' no sera realizado, BSS Seguridad.',{
                        ttl:12000, type: 'info'
                      });
                    }
                  }
                break;
              }

            $scope.update.ticket.idTypeTicketKf          = obj.idTypeTicketKf;
            $scope.update.ticket.idTypeDeliveryKf        = obj.idTypeDeliveryKf;
            $scope.update.ticket.idTypePaymentKf         = obj.idTypePaymentKf;
            $scope.update.ticket.idStatusTicketKf        = obj.idStatusTicketKf;
            $scope.update.ticket.idPaymentDeliveryKf     = obj.idPaymentDeliveryKf;
              console.log($scope.update);
              $timeout(function() {
                $scope.sysCancelTicketFn($scope.update);
              }, 2000);
            break;
            case "ticket_reject_request_cancel":
              console.log(obj);
              console.log(obj);
              $scope.data={'ticket':{'idTicket': null, 'codTicket':'', 'history': []}};
              $scope.data.ticket.idTicket            = obj.idTicket;
              $scope.data.ticket.codTicket           = obj.codTicket;
              $scope.data.ticket.idStatusTicketKfOld = obj.idStatusTicketKfOld;
              $scope.data.ticket.history.push({'idUserKf': $scope.sysLoggedUser.idUser, 'idTicketKf': obj.idTicket, 'descripcion': null, 'idCambiosTicketKf':"14"});
              $timeout(function() {
                $scope.sysRejectRequestCancellationTicketFn($scope.data);
              }, 2000);
            break;
            case "change_ticket_status":
              console.log(obj);
              $scope.ticket = obj;
              if (obj.idTypeDeliveryKf=='2'){
                if (obj.idStatusTicketKf!='5'){
                  $scope.ticket.deliveryDate = new Date();
                }else{
                  if ($scope.ticket.delivery_schedule_at!=null){
                    $scope.ticket.deliveryDate = $scope.formatDate($scope.ticket.delivery_schedule_at);
                  }else{
                    $scope.ticket.deliveryDate = new Date();
                  }
                }
              }else{
                $scope.ticket.deliveryDate = new Date();
                if ($scope.ticket.idWhoPickUp=='1'){
                  $scope.ticket.dni = $scope.ticket.userDelivery.dni;
                  $scope.ticket.fullname = $scope.ticket.userDelivery.fullNameUser;
                }else if ($scope.ticket.idWhoPickUp=='3'){
                  $scope.ticket.dni = $scope.ticket.thirdPersonDelivery.dni;
                  $scope.ticket.fullname = $scope.ticket.thirdPersonDelivery.fullName;
                }

              }
              $scope.changeStatusTicketSingle=true;
              $scope.changeStatusTicketMulti=false;
              $('#changeModalStatus').modal({backdrop: 'static', keyboard: false});
            break;
            case "apply_change_ticket_status_single":
              $scope.update.ticket.idTicket              = obj.idTicket;
              $scope.update.ticket.idTypeDeliveryKf      = obj.idTypeDeliveryKf;
              $scope.update.ticket.retiredByDNI          = obj.newTicketStatus.idStatus=='1' && obj.idTypeDeliveryKf=='1'?obj.dni:null;
              $scope.update.ticket.retiredByFullName     = obj.newTicketStatus.idStatus=='1' && obj.idTypeDeliveryKf=='1'?obj.fullname:null;
              $scope.update.ticket.idNewStatusKf         = obj.newTicketStatus.idStatus;
              $scope.update.ticket.delivery_schedule_at  = obj.newTicketStatus.idStatus=='5' && obj.idTypeDeliveryKf=='2' && obj.deliveryDate!=undefined?obj.deliveryDate:null;
              $scope.update.ticket.delivered_at          = obj.newTicketStatus.idStatus=='1' && obj.deliveryDate!=undefined?obj.deliveryDate:null;
              $scope.update.ticket.idDeliveryCompanyKf   = obj.newTicketStatus.idStatus=='5' && obj.idTypeDeliveryKf=='2' && obj.deliveryDate!=undefined?obj.idDeliveryCompanyKf:null;
              $scope.update.ticket.history               = [];
              $scope.update.ticket.history.push({'idUserKf': $scope.sysLoggedUser.idUser, 'descripcion': null, 'idCambiosTicketKf':"9"});
              console.log($scope.update);
              $('#changeModalStatus').modal('hide');
              $('#showModalRequestStatus').modal({backdrop: 'static', keyboard: false});
              console.log($scope.update);
              $timeout(function() {
                $scope.changeTicketStatusRequestFn($scope.update);
              }, 2000);
            break;
            case "change_ticket_status_multi":
              $scope.selectedTicketList = [];
              for (ticket in obj){
                if (obj[ticket].selected == true){
                  $scope.selectedTicketList.push(obj[ticket]);
                }
              }
              if ($scope.selectedTicketList.length>=1){
                $scope.ticket = {};
                if (obj[0].idTypeDeliveryKf=='2'){
                  if (obj.idStatusTicketKf!='5'){
                    $scope.ticket.deliveryDate = new Date();
                  }else{
                    if ($scope.ticket.delivery_schedule_at!=null){
                      $scope.ticket.deliveryDate = $scope.formatDate($scope.ticket.delivery_schedule_at);
                    }else{
                      $scope.ticket.deliveryDate = new Date();
                    }
                  }
                  if (obj[0].idStatusTicketKf=='4' ){
                    $scope.ticket.idStatusTicketKf=obj[0].idStatusTicketKf;
                    $scope.ticket.idTypeDeliveryKf=obj[0].idTypeDeliveryKf;
                    $scope.ticket.deliveryDate = new Date();
                  }
                }else{
                  $scope.ticket.deliveryDate = new Date();
                  if ($scope.ticket.idWhoPickUp=='1'){
                    $scope.ticket.dni = $scope.ticket.userDelivery.dni;
                    $scope.ticket.fullname = $scope.ticket.userDelivery.fullNameUser;
                  }else if ($scope.ticket.idWhoPickUp=='3'){
                    $scope.ticket.dni = $scope.ticket.thirdPersonDelivery.dni;
                    $scope.ticket.fullname = $scope.ticket.thirdPersonDelivery.fullName;
                  }

                }
                $scope.changeStatusTicketSingle=false;
                $scope.changeStatusTicketMulti=true;
                $('#changeModalStatus').modal({backdrop: 'static', keyboard: false});
                inform.add('Han sido seleccionados  ('+$scope.selectedTicketList.length+') pedidos para el cambio de estatus, BSS Seguridad.',{
                  ttl:6000, type: 'info'
                });
              }else{
                inform.add('No han sido seleccionados pedidos para el cambio de estatus, BSS Seguridad.',{
                  ttl:6000, type: 'info'
                });
              }
            break;
            case "apply_change_ticket_status_multi":
              $scope.ticketList = 0;
              //console.log(obj);
              //console.log($scope.ticket);
              var assignedtickets = [];
              angular.forEach(obj,function(ticket){

                  var deferredtickets = $q.defer();
                  assignedtickets.push(deferredtickets.promise);
                  $timeout(function() {
                    deferredtickets.resolve();
                    $scope.update.ticket.idTicket              = ticket.idTicket;
                    $scope.update.ticket.idTypeDeliveryKf      = ticket.idTypeDeliveryKf;
                    $scope.update.ticket.retiredByDNI          = $scope.ticket.newTicketStatus.idStatus=='1' && ticket.idTypeDeliveryKf=='1'?ticket.dni:null;
                    $scope.update.ticket.retiredByFullName     = $scope.ticket.newTicketStatus.idStatus=='1' && ticket.idTypeDeliveryKf=='1'?ticket.fullname:null;
                    $scope.update.ticket.idNewStatusKf         = $scope.ticket.newTicketStatus.idStatus;
                    $scope.update.ticket.delivery_schedule_at  = $scope.ticket.newTicketStatus.idStatus=='5' && ticket.idTypeDeliveryKf=='2' && $scope.ticket.deliveryDate!=undefined?$scope.ticket.deliveryDate:null;
                    $scope.update.ticket.delivered_at          = $scope.ticket.newTicketStatus.idStatus=='1' && $scope.ticket.deliveryDate!=undefined?$scope.ticket.deliveryDate:null;
                    $scope.update.ticket.idDeliveryCompanyKf   = $scope.ticket.newTicketStatus.idStatus=='5' && ticket.idTypeDeliveryKf=='2' && $scope.ticket.deliveryDate!=undefined?$scope.ticket.idDeliveryCompanyKf:null;
                    $scope.update.ticket.history               = [];
                    $scope.update.ticket.history.push({'idUserKf': $scope.sysLoggedUser.idUser, 'descripcion': null, 'idCambiosTicketKf':"9"});
                    console.log(ticket);
                    ticketServices.changueStatus($scope.update).then(function(response){
                      //console.log(response);
                      if(response.status==200){
                        console.log("Request Successfully processed");
                        console.log($scope.update);
                        $scope.update={'ticket':{}};
                      }else if(response.status==500){
                        inform.add('Error: [500] Contacta al area de soporte. ',{
                              ttl:5000, type: 'danger'
                        });
                      }
                    });
                  }, 1500)
              });
              $q.all(assignedtickets).then(function () {
                inform.add('Los pedidos seleccionados ahora se encuentran en '+$scope.ticket.newTicketStatus.statusName+', BSS Seguridad.',{
                  ttl:6000, type: 'info'
                });
                $scope.mainSwitchFn('search', null);
                $('#changeModalStatus').modal('hide');
              });
            break;
            case "exportOnExternalRouteExcelList":
              $scope.setDeliveryExternalCompanyListAsArrayFn(obj);
            break;
            case "approveTicket":
              console.log(obj);
              $scope.ticketSelected=obj;

              if ((($scope.sysLoggedUser.idProfileKf==1 || $scope.sysLoggedUser.idProfileKf==4) && obj.department.isAprobatedAdmin!=1 && obj.department.idUserKf==obj.userRequestBy.idUser && (obj.userRequestBy.idProfileKf=='3' || obj.userRequestBy.idProfileKf=='4' || obj.userRequestBy.idProfileKf=='6') && obj.userRequestBy.idTypeTenantKf=='1') ||
                  (($scope.sysLoggedUser.idProfileKf==1 || $scope.sysLoggedUser.idProfileKf==4) && obj.userRequestBy.isDepartmentApproved==null && (obj.userRequestBy.idProfileKf=='4' || obj.userRequestBy.idProfileKf=='5' || obj.userRequestBy.idProfileKf=='6') && obj.userRequestBy.idTypeTenantKf=='2')){
                $scope.ticketSelected.approveDepto=true;
                $scope.modalConfirmation('approveDepto', 0, $scope.ticketSelected)
              }else{
                $scope.ticketSelected.approveDepto=false;
                $scope.modalConfirmation('approve', 0, $scope.ticketSelected)
              }
            break;
            case "approveDepto":
              console.log(obj);
              if (obj.userRequestBy.idTypeTenantKf=="1"){
                  console.log(obj.userRequestBy);
                  $scope.depto={'department':{'idDepartment':null, 'idUserKf':null}};
                  //OWNER
                  blockUI.start('Asociando usuario al departamento seleccionado.');
                  $timeout(function() {
                      $scope.depto.department.idUserKf     = obj.userRequestBy.idUser;
                      $scope.depto.department.idDepartment = obj.department.idClientDepartament;
                  }, 1500);
                  $timeout(function() {
                      blockUI.message('Asignando departamento del usuario.');
                      $scope.fnAssignDepto($scope.depto);
                  }, 2000);
                  $timeout(function() {
                      blockUI.message('Aprobando departamento del usuario.');
                      $scope.approveDepto(obj.userRequestBy.idTypeTenantKf, obj.department.idClientDepartament, 1);
                  }, 2500);
                  if (obj.approveDepto){
                    $timeout(function() {
                      $scope.modalConfirmation('approve',0, obj);
                    }, 3000);
                  }
                  $timeout(function() {
                    $scope.openTicketFn(obj.idTicket);
                    $scope.mainSwitchFn('search', null);
                    blockUI.stop();
                  }, 3500);
              }else if (obj.userRequestBy.idTypeTenantKf=="2"){
                  //TENANTS
                  console.log(obj.userRequestBy);
                  $scope.update.user={'fullNameUser':null, 'emailUser': null, 'phoneNumberUser': null, 'phoneLocalNumberUser': null, 'idAddresKf': null, 'idProfileKf': null, 'idTypeTenantKf': null, 'idCompanyKf': null, 'idTyepeAttendantKf': null, 'descOther': null, 'idDepartmentKf2':null, 'isEdit': null, 'requireAuthentication': null, 'dni': null, 'idSysProfileFk': null, 'isCreateByAdmin': null, 'typeTenantChange':false};
                  $scope.depto={'department':{'idDepartment':null, 'idUserKf':null}};
                  $scope.update.user                             = obj.userRequestBy;
                  $scope.update.user.idAddresKf                  = obj.idBuildingKf
                  $scope.update.user.idDepartmentKf              = obj.idDepartmentKf;
                  $scope.update.user.typeTenantChange            = true;
                  $scope.update.user.idTicket                    = obj.idTicket;
                  $timeout(function() {
                      //console.log($scope.update.user);
                      $scope.sysUpdateTenantFn();
                  }, 2500);
                  if (obj.approveDepto && $scope.sysRouteParams==undefined){
                    $timeout(function() {
                      $scope.modalConfirmation('approve',0, obj);
                    }, 3000);
                  }else{
                    $timeout(function() {
                      $scope.modalConfirmation('approve',1, obj);
                    }, 3000);
                  }
              }
            break;
            case "exportOnInternalRouteExcelList":
              $scope.setDeliveryInternalCompanyListAsArrayFn(obj);
            break;
            case "setWhoPickUpList":
              $scope.whoPickUpList = []; //
              if (obj.userRequestBy!=undefined && obj.userRequestBy!=null){
                  $scope.whoPickUpList.push(obj.userRequestBy);
              }
              if (obj.idTypeRequestFor=="1"){
                if (obj.userMadeBy!=undefined && obj.userMadeBy.idUser!=obj.userRequestBy.idUser) {
                  $scope.whoPickUpList.push(obj.userMadeBy);
                }
              }
              //for (var key in $scope.list_keys){
              //    if ($scope.list_keys[key].user!=null){
              //        $scope.whoPickUpList.push($scope.list_keys[key].user);
              //    }
              //}
              //if ($scope.ticket.optionTypeSelected.name=="building" && $scope.ticket.radioButtonBuilding!="4" && $scope.ticket.radioButtonBuilding!="5"){
              //    for (var key in $scope.ticket.companyUserList){
              //        $scope.whoPickUpList.push($scope.ticket.companyUserList[key]);
              //    }
              //}
              for (var key in $scope.whoPickUpList){
                  $scope.whoPickUpList[key].type="Usuarios";
              }
              $scope.whoPickUpList.push({'id': 2, 'fullNameUser': "Encargado", 'type':"Otros"});
              $scope.whoPickUpList.push({'id': 3, 'fullNameUser': "Tercera Persona", 'type':"Otros"});
              console.log($scope.whoPickUpList);
            break;
            case "checkWhoPickUp":
              console.log(obj);
              if ($scope.ticket.selected.paymentDetails!=undefined && $scope.ticket.selected.paymentDetails!=null && $scope.ticket.selected.paymentDetails.mp_collection_status==null && $scope.ticket.selected.paymentDetails.mp_status_detail==null){
                inform.add('Recuerde que puede haber costos adicionales deacuerdo al metodo de envío seleccionado.',{
                  ttl:5000, type: 'info'
              });
              }
                if(obj.whoPickUp!=undefined){
                    $scope.ticket.delivery.idDeliveryTo = null;
                    if (obj.whoPickUp.id=="3"){
                        $scope.selectedDeliveryAttendant    = undefined;
                        $scope.ticket.delivery.deliveryTo   = null
                        $scope.ticket.delivery.idDeliveryTo = null;
                        $scope.ticket.delivery.otherAddress = null;
                        if ($scope.ticket.delivery.idTypeDeliveryKf!=1 && $scope.ticket.delivery.thirdPerson!=undefined){
                            inform.add('Completar todos datos de la tercera persona:  '+$scope.ticket.delivery.thirdPerson.fullNameUser+' para continuar.',{
                                ttl:5000, type: 'warning'
                            });
                            $('#RegisterThirdPerson').modal({backdrop: 'static', keyboard: true});
                            if($scope.ticket.building.isStockInBuilding=='1' || (($scope.ticket.building.isStockInBuilding==null || $scope.ticket.building.isStockInBuilding=='0') && ($scope.ticket.building.isStockInOffice==null || $scope.ticket.building.isStockInOffice=='0'))){
                              let streetName = $scope.ticket.building.address;
                              let result = streetName.trim();
                              let street = result.substring(0,result.length - 4);
                              let number = result.substring(result.length - 4);
                              console.log("Street: "+street.trim().toString());
                              console.log("Number: "+number.trim().toString());
                              $scope.ticket.delivery.thirdPerson.streetName    = street.trim().toString();
                              $scope.ticket.delivery.thirdPerson.streetNumber  = number.trim().toString();
                              $scope.ticket.delivery.thirdPerson.province={'selected':{'idProvince':$scope.ticket.building.idProvince,'province':$scope.ticket.building.province,'idProvinceAPIGobFk':$scope.ticket.building.idProvinceAPIGobFk}};
                              $scope.ticket.delivery.thirdPerson.location={'selected':{'idLocation':$scope.ticket.building.idLocation,'location':$scope.ticket.building.location,'idProvinceFK':$scope.ticket.building.idProvinceFK}};
                            }
                            $('#third_address_streetName').focus();

                        }else{
                            $scope.ticket.delivery.thirdPerson={};
                            $('#RegisterThirdPerson').modal({backdrop: 'static', keyboard: true});
                            if($scope.ticket.building.isStockInBuilding=='1' || (($scope.ticket.building.isStockInBuilding==null || $scope.ticket.building.isStockInBuilding=='0') && ($scope.ticket.building.isStockInOffice==null || $scope.ticket.building.isStockInOffice=='0'))){
                              let streetName = $scope.ticket.building.address;
                              let result = streetName.trim();
                              let street = result.substring(0,result.length - 4);
                              let number = result.substring(result.length - 4);
                              console.log("Street: "+street.trim().toString());
                              console.log("Number: "+number.trim().toString());
                              $scope.ticket.delivery.thirdPerson.streetName    = street.trim().toString();
                              $scope.ticket.delivery.thirdPerson.streetNumber  = number.trim().toString();
                              $scope.ticket.delivery.thirdPerson.province={'selected':{'idProvince':$scope.ticket.building.idProvince,'province':$scope.ticket.building.province,'idProvinceAPIGobFk':$scope.ticket.building.idProvinceAPIGobFk}};
                              $scope.ticket.delivery.thirdPerson.location={'selected':{'idLocation':$scope.ticket.building.idLocation,'location':$scope.ticket.building.location,'idProvinceFK':$scope.ticket.building.idProvinceFK}};
                            }
                            $('#fullNameUser').focus();

                        }
                    }else if (obj.whoPickUp.id=="2"){
                        $scope.ticket.delivery.thirdPerson  = null;
                        $scope.ticket.delivery.deliveryTo   = null;
                        $scope.ticket.delivery.idDeliveryTo = null;
                        $scope.ticket.delivery.otherAddress = null;
                        $('#deliveryAttendantList').modal({backdrop: 'static', keyboard: true});
                    }else if (obj.whoPickUp.id==undefined && $scope.ticket.delivery.idTypeDeliveryKf==2 && (obj.idDeliveryTo==null || obj.idDeliveryTo==1)){
                        $scope.ticket.delivery.idDeliveryTo = null;
                        $scope.mainSwitchFn("selectDeliveryAddress",obj,null);
                    }else if (obj.whoPickUp.id==undefined && $scope.ticket.delivery.idTypeDeliveryKf==2 && (obj.idDeliveryTo==null || obj.idDeliveryTo==2)){
                        $scope.ticket.delivery.thirdPerson  = null;
                        $scope.ticket.delivery.idDeliveryTo = null;
                        if ($scope.ticket.delivery.otherAddress!=undefined){
                            inform.add('Completar todos datos de la dirección a la cual sera enviado el pedido, para continuar.',{
                                ttl:5000, type: 'warning'
                            });
                            $('#RegisterDeliveryToOtherAddress').modal({backdrop: 'static', keyboard: true});
                        }else{
                            $('#RegisterDeliveryToOtherAddress').modal({backdrop: 'static', keyboard: true});
                        }
                    }else{
                        $scope.mainSwitchFn('setDeliveryUser', obj.whoPickUp, null);
                    }
                }else{
                    $scope.ticket.delivery.deliveryTo=null; $scope.ticket.delivery.whoPickUp=null;
                }
            break;
            case "selectDeliveryAddress":
              $scope.selectedUserToDelivery = null;
              $scope.selectedUserToDelivery = obj.whoPickUp;
              console.log(obj);
              if ($scope.ticket.delivery.whoPickUp.id==undefined){
                  inform.add('Seleccionar/Indicar la direccion a la cual se hara la entrega del pedido.',{
                      ttl:5000, type: 'info'
                  });
                  $('#selectDeliveryAddress').modal({backdrop: 'static', keyboard: true});
              }
            break;
            case "setDeliveryAttendant":
              $scope.selectedDeliveryAttendant  = obj!=undefined?obj:undefined;
              $scope.ticket.delivery.deliveryTo = $scope.selectedDeliveryAttendant;
              $scope.ticket.delivery.thirdPerson = null;
              $scope.ticket.delivery.otherAddress = null;
              if ($scope.ticket.delivery.idTypeDeliveryKf==1){
                  inform.add('El encargado '+obj.fullNameUser+' retirara el pedido en la oficina.',{
                      ttl:5000, type: 'success'
                  });
              }else{
                  inform.add('El encargado '+obj.fullNameUser+' recibira el pedido en el domicilio.',{
                      ttl:5000, type: 'success'
                  });
              }
              $scope.mainSwitchFn('setCosts', null, null);
              $('#deliveryAttendantList').modal("hide");
            break;
            case "setDeliveryUser":
              if ($scope.ticket.delivery.idTypeDeliveryKf=="2" && $scope.ticket.delivery.idDeliveryTo!=2){
                  $scope.ticket.delivery.idDeliveryTo = 1;
                  $scope.ticket.delivery.thirdPerson = null;
                  $scope.ticket.delivery.otherAddress = null;
              }else if ($scope.ticket.delivery.idTypeDeliveryKf=="1"){
                  $scope.ticket.delivery.idDeliveryTo = null;
                  $scope.ticket.delivery.thirdPerson = null;
                  $scope.ticket.delivery.otherAddress = null;
              }
              if ($scope.ticket.delivery.idDeliveryTo!=null && $scope.ticket.delivery.idDeliveryTo==1){
                  $scope.ticket.delivery.otherAddress = null;
                  $scope.ticket.delivery.thirdPerson = null;
              }
              $scope.ticket.delivery.deliveryTo = obj;
              if ($scope.ticket.delivery.idTypeDeliveryKf==1){
                  inform.add('El '+obj.nameProfile+' '+obj.fullNameUser+' retirara el pedido en la oficina.',{
                      ttl:5000, type: 'success'
                  });
              }else{
                  inform.add('El '+obj.nameProfile+' '+obj.fullNameUser+' recibira el pedido en el domicilio.',{
                      ttl:5000, type: 'success'
                  });
              }
              $scope.mainSwitchFn('setCosts', null, null);
              $('#selectDeliveryAddress').modal("hide");
              $('#deliveryAttendantList').modal("hide");
            break;
            case "setDeliveryCompany":
              $scope.refund.ticket.history            = [];
              $scope.refund.ticket.history.push({'idUserKf': $scope.sysLoggedUser.idUser, 'descripcion': null, 'idCambiosTicketKf':"26"});
              console.info("Source  : " +$scope.ticket.keysMethod.name);
              console.info("Internet: " +(obj.building.isHasInternetOnline === null ? "No" : "Si"));
              switch($scope.ticket.idMgmtMethodKf){
                case "1": //STOCK
                  $scope.functions.whereKeysAreEnable = null;
                  switch(obj.idTypeDeliveryKf){
                    case "1"://RETIRO EN OFICINA
                      $scope.tkupdate.mess2show="El Pedido pasara a \"Listo para Retirar\", por favor,     Confirmar?";
//                      $scope.tkupdate.idDeliveryCompanyKf=null;
                      console.log(obj)
                    break;
                    case "2"://RENTREGA EN DOMICILIO
                      if (obj.building.isStockInOffice == "1"){
                        $scope.tkupdate.idDeliveryCompanyKf="1";
                      }
                      $scope.tkupdate.mess2show="El Pedido pasara a \"Pendiente de entrega\", por favor,     Confirmar?";

                      console.log(obj)
                    break;
                  }
                break;
                case "2": //MANUAL
                  $scope.functions.whereKeysAreEnable = obj.building.isHasInternetOnline === null ? "2":"1";
                  switch(obj.idTypeDeliveryKf){
                    case "1": //RETIRO EN OFICINA
                      if(obj.building.isHasInternetOnline === null || obj.building.isHasInternetOnline != null){ //NO INTERNET OR WITH INTERNET
                        //$scope.tkupdate.idDeliveryCompanyKf="1";
                        $scope.tkupdate.mess2show="El Pedido quedara \"En Preparación\" pendiente de Habilitación/Activación de Llaveros, por favor, Confirmar?";
                      }
                      console.log(obj)
                    break;
                    case "2": //RENTREGA EN DOMICILIO
                      if(obj.building.isHasInternetOnline === null || obj.building.isHasInternetOnline != null){ //NO INTERNET OR WITH INTERNET
                        //$scope.tkupdate.idDeliveryCompanyKf="2";
                        $scope.tkupdate.mess2show="El Pedido quedara \"En Preparación\" pendiente de Habilitación/Activación de Llaveros, por favor, Confirmar?";
                      }
                      console.log(obj)
                    break;
                  }
                break;
              }
              console.info("Delivery: " +obj.typeDeliver.typeDelivery);
              console.info("msg     : " +$scope.mess2show);
              $scope.modalConfirmation('applySetMgmtKeys',0, $scope.tkupdate);
              $('#selectDeliveryAddress').modal("hide");
              $('#deliveryAttendantList').modal("hide");
            break;
            case "deliveryToOtherAddress":
              console.log(obj);
              console.log(obj2);
              if ($scope.ticket.delivery.otherAddress==null){
                  $scope.ticket.delivery.otherAddress = {'streetName':undefined, 'streetNumber':undefined, 'floor':undefined, 'department':undefined, 'province':{'selected':undefined}, 'location':{'selected':undefined}};
              }
              //$scope.selectedUserToDelivery = null;
              console.log(obj2);
              $scope.ticket.delivery.idDeliveryTo = obj2!=undefined?obj2:null;
              $scope.selectedUserToDelivery = obj.whoPickUp!=undefined?obj.whoPickUp:obj;
              if ($scope.ticket.delivery.whoPickUp.id==undefined){
                  inform.add('Completar los campos de direccion a la cual se hara la entrega del pedido.',{
                      ttl:5000, type: 'info'
                  });
                  $('#selectDeliveryAddress').modal("hide");
                  $('#RegisterDeliveryToOtherAddress').modal({backdrop: 'static', keyboard: true});
              }
            break;
            case "setDeliveryToOtherAddress":
              console.log(obj);
              console.log(obj2);
              $scope.ticket.delivery.deliveryTo = obj2;
              $scope.ticket.delivery.otherAddress = obj;
              $('#RegisterDeliveryToOtherAddress').modal("hide");
              inform.add('El '+obj2.nameProfile+' '+obj2.fullNameUser+' recibira el pedido en el domicilio indicado.',{
                  ttl:5000, type: 'success'
              });
              $scope.mainSwitchFn('setCosts', null, null);
            break;
            case "checkThirdPersonLocation":
              UtilitiesServices.checkZonaByLocationAndCustomerId($scope.ticket.building.idClient, obj.idLocation).then(function(response) {
                  if(response.status==200){
                      $scope.ticket.delivery.zone = response.data[0]
                  }else if(response.status==404){
                      inform.add('El envio a la localidad seleccionada tendra un recargo extra, contacta al area de soporte de Bss.',{
                      ttl:8000, type: 'info'
                      });
                      $scope.ticket.delivery.zone = null;
                  }else if (response.status==500){
                      inform.add('[Error]: '+response.status+', Ocurrio error intenta de nuevo o contacta el area de soporte. ',{
                      ttl:5000, type: 'warning'
                      });
                  }
              });
            break;
            case "setThirdPersonData":
              //console.log(obj);
              if ($scope.ticket.delivery.idTypeDeliveryKf!=1){
                  var streetName = obj.streetName;
                  $scope.ticket.delivery.thirdPerson.address=streetName.toUpperCase()+' '+obj.streetNumber;
              }
              $scope.ticket.delivery.deliveryTo = $scope.ticket.delivery.thirdPerson;
              console.log($scope.ticket);
              $('#RegisterThirdPerson').modal("hide");
              if ($scope.ticket.delivery.idTypeDeliveryKf==1){
                  inform.add('El Pedido sera retirado por '+obj.fullNameUser+' en la oficina.',{
                      ttl:5000, type: 'success'
                  });
              }else{
                  inform.add('El Pedido sera entregado a '+obj.fullNameUser+' en el domicilio indicado.',{
                      ttl:5000, type: 'success'
                  });
              }
              $scope.mainSwitchFn('setCosts', null, null);
            break;
            case "setCosts":
                    //KEY COSTS
                        var subTotalKeys = 0;
                        if (!$scope.costs.keys.manual){
                            var subTotalKeys = 0;
                            for (var key in $scope.list_keys){
                                var keyCost = $scope.list_keys[key].priceFabric
                                if (subTotalKeys == 0){
                                    subTotalKeys = Number(keyCost);
                                }else{
                                    subTotalKeys = Number(subTotalKeys)+Number(keyCost);
                                }
                            }
                            $scope.ticket.cost.keys = subTotalKeys.toFixed(2);
                            $scope.costs.keys.cost  = subTotalKeys.toFixed(2);
                        }else{
                            subTotalKeys = $scope.costs.keys.cost;
                            subTotalKeys = $scope.ticket.cost.keys;
                        }
                    //DELIVERY COSTS
                        var subTotalDelivery = 0;
                        if (!$scope.costs.delivery.manual){
                            if ($scope.deliveryCostFree==0){
                                if((($scope.ticket.building.isStockInBuilding!=null && $scope.ticket.building.isStockInBuilding!='0') || ($scope.ticket.building.isStockInOffice!=null && $scope.ticket.building.isStockInOffice!='0'))){
                                    var subTotalDelivery = 0;
                                    if ($scope.ticket.delivery.idTypeDeliveryKf!=1){
                                        if (($scope.ticket.delivery.whoPickUp.id==undefined && $scope.ticket.delivery.idDeliveryTo!=null && $scope.ticket.delivery.idDeliveryTo==1) ||
                                            ($scope.ticket.delivery.idDeliveryTo==null && $scope.ticket.delivery.whoPickUp.id==2)){
                                            $scope.ticket.cost.delivery=$scope.ticket.building.valor_envio;
                                            subTotalDelivery = Number($scope.ticket.building.valor_envio);
                                            $scope.costs.delivery.cost=subTotalDelivery.toFixed(2);
                                        }else{
                                            $scope.ticket.cost.delivery=$scope.ticket.delivery.zone.valor_envio;
                                            subTotalDelivery = Number($scope.ticket.delivery.zone.valor_envio);
                                            $scope.costs.delivery.cost=subTotalDelivery.toFixed(2);
                                        }
                                    }else{
                                        $scope.ticket.cost.delivery = subTotalDelivery.toFixed(2);
                                        $scope.costs.delivery.cost  = subTotalDelivery.toFixed(2);
                                    }
                                }
                            }
                        }else{
                            subTotalDelivery=$scope.costs.delivery.cost;
                            subTotalDelivery=$scope.ticket.cost.delivery;
                        }
                    //SERVICE COSTS
                        var subTotalService = 0;
                        if (!$scope.costs.service.manual){
                            var subTotalService = 0;
                            subTotalService = Number($scope.ticket.cost.service);
                            $scope.costs.service.cost=subTotalService.toFixed(2);
                        }else{
                            subTotalService=$scope.costs.service.cost;
                            subTotalService=$scope.ticket.cost.service;
                        }
                //TOTAL COST
                var subTotalCosts = 0;
                $scope.ticket.cost.total = 0;
                console.log("subTotalService "+Number(subTotalService))
                console.log("subTotalKeys "+Number(subTotalKeys))
                console.log("subTotalDelivery "+Number(subTotalDelivery))
                subTotalCosts = Number(subTotalService)+Number(subTotalKeys)+Number(subTotalDelivery);
                $scope.ticket.cost.total = subTotalCosts.toFixed(2);
                $scope.costs.total       = subTotalCosts.toFixed(2);
                console.log($scope.costs);
            break;
            case "recalculateCosts":
                var subTotalKeys = $scope.ticket.cost.keys;
                var subTotalService = $scope.ticket.cost.service;
                var subTotalDelivery = $scope.ticket.cost.delivery;
                var subTotalCosts = 0;
                console.log("subTotalService  : "+Number(subTotalService))
                console.log("subTotalKeys     : "+Number(subTotalKeys))
                console.log("subTotalDelivery : "+Number(subTotalDelivery))
                var opt2 = obj2;
                switch (opt2){
                    case "service":
                        if (Number(subTotalService) != Number(obj)){
                            subTotalService=obj;
                            $scope.costs.service.cost   = subTotalService;
                            $scope.ticket.cost.service  = subTotalService;
                            $scope.costs.service.manual = true;
                        }
                    break;
                    case "keys":
                        if (Number(subTotalKeys) != Number(obj)){
                            subTotalKeys=obj;
                            $scope.costs.keys.cost    = subTotalKeys;
                            $scope.ticket.cost.keys   = subTotalKeys;
                            $scope.costs.keys.manual  = true;
                        }
                    break;
                    case "delivery":
                        if (Number(subTotalDelivery) != Number(obj)){
                            subTotalDelivery=obj;
                            $scope.costs.delivery.cost    = subTotalDelivery;
                            $scope.ticket.cost.delivery   = subTotalDelivery;
                            $scope.costs.delivery.manual  = true;
                        }
                    break;
                }
                subTotalCosts = NaN2Zero(Number(subTotalService))+NaN2Zero(Number(subTotalKeys))+NaN2Zero(Number(subTotalDelivery));

                $scope.ticket.cost.total = subTotalCosts.toFixed(2);
                $scope.costs.total       = subTotalCosts.toFixed(2);
                console.log($scope.costs);
            break;
            case "linkMP": // Payment Link Mercado Pago
                console.log("---------------------------------------");
                console.log("CREAR LINK DE PAGO PARA MERCADOPAGO");
                console.log("---------------------------------------");
                console.log("[New MP Payment Link]");
                console.log(obj);
                $scope.mp.link={'new':{'data':{}},'url':null}; //codTicket
                $scope.mp.link.new.data={'idPago': null,'monto':  null,'linkDeNotificacion':  null,'back_url':  null,'metadata': {}};
                $scope.mp.link.new.data.idTicket              = obj.idTicket;
                $scope.mp.link.new.data.ticket_number         = obj.codTicket;
                $scope.mp.link.new.data.monto                 = obj.createNewMPLinkForDelivery?Number(parseInt(obj.costDelivery)):Number(parseInt(obj.total));
                //$scope.mp.link.new.data.linkDeNotificacion    = serverHost+"/Back/index.php/MercadoLibre/getNotificationOfMP";
                //$scope.mp.link.new.data.back_url              = serverHost+"/monitor";
                $scope.mp.link.new.data.linkDeNotificacion    = serverHost+"/Back/index.php/MercadoLibre/getNotificationOfMP";
                $scope.mp.link.new.data.back_url              = "";
                $scope.mp.link.new.data.description           = obj.typeticket.TypeTicketName;
                $scope.mp.link.new.data.quantity              = obj.keys.length;
                $scope.mp.link.new.data.idPayment             = obj.idPaymentKf!=null || obj.idPaymentKf!=undefined?obj.idPaymentKf:null;
                $scope.mp.link.new.data.metadata.paymentFor   = obj.createNewMPLinkForDelivery?3:1;
                console.log($scope.mp.link);
                $scope.mpCreateLinkFn($scope.mp.link.new);
            break;
        }
      }

          /***********************************
          *         ADD SINGLE KEY           *
          ************************************/
            $scope.addKeyFn = function(llavero){
                KeysServices.addKey(llavero).then(function(response){
                    if(response.status==200){
                      llavero.llavero.idKeychainKf = response.data.response.idKeychainKf;
                      console.log(llavero);
                      ticketServices.updateTicketKeychain(llavero).then(function(response_ticke_keychain){
                        console.log(response_ticke_keychain);
                        if(response_ticke_keychain.status==200){
                            console.log("Key Successfully registered");
                            inform.add('El Llavero de codigo ('+llavero.llavero.codigo+'), ha sido registrado con exito. ',{
                                ttl:4000, type: 'success'
                            });
                            $scope.getKeysByDepartmentId($scope.tkupdate.department.idClientDepartament);
                            //$scope.getKeychainListFn($scope.customerFound.idClient,null,$scope.select.filterCategoryKey,$scope.select.idKeychainStatusKf,$scope.select.idDepartmenKf,$scope.select.reasonKf.idReasonDisabledItem,$scope.select.codeSearch,($scope.pagination.pageIndex-1),$scope.pagination.pageSizeSelected, false, true);
                        }else if(response_ticke_keychain.status==500){
                            console.log("There was an error adding the key, contact administrator");
                            inform.add('Error: [500] Contacta al area de soporte. ',{
                                ttl:5000, type: 'danger'
                            });
                        }
                      });
                    }else if(response.status==203){
                        console.log(response.data);
                        inform.add('Info: [203] El Codigo ('+llavero.llavero.codigo+'), del llavero, ya se encuentra registrado. ',{
                            ttl:5000, type: 'warning'
                        });
                    }else if(response.status==404){
                        console.log("not found, contact administrator");
                        inform.add('Error: [404] Contacta al area de soporte. ',{
                            ttl:5000, type: 'danger'
                        });
                    }else if(response.status==500){
                        console.log("There was an error adding the key, contact administrator");
                        inform.add('Error: [500] Contacta al area de soporte. ',{
                            ttl:5000, type: 'danger'
                        });
                    }
                });
            };
          /***********************************
          *         UPDATE SINGLE KEY        *
          ************************************/
              $scope.updateKeyFn = function(llavero){
                  KeysServices.updateKey(llavero).then(function(response){
                      if(response.status==200){
                        ticketServices.updateTicketKeychain(llavero).then(function(response_ticke_keychain){
                          console.log(response_ticke_keychain);
                          if(response_ticke_keychain.status==200){
                              console.log("Key Successfully updated");
                              $scope.getKeysByDepartmentId($scope.tkupdate.department.idClientDepartament);
                              //$scope.getKeychainListFn($scope.customerFound.idClient,null,$scope.select.filterCategoryKey,$scope.select.idKeychainStatusKf,$scope.select.idDepartmenKf,$scope.select.reasonKf.idReasonDisabledItem,$scope.select.codeSearch,($scope.pagination.pageIndex-1),$scope.pagination.pageSizeSelected, false, true);
                          }else if(response_ticke_keychain.status==500){
                              console.log("There was an error adding the key, contact administrator");
                              inform.add('Error: [500] Contacta al area de soporte. ',{
                                  ttl:5000, type: 'danger'
                              });
                          }
                        });
                      }else if(response.status==404){
                          console.log("not found, contact administrator");
                          inform.add('Error: [404] Contacta al area de soporte. ',{
                              ttl:5000, type: 'danger'
                          });
                      }else if(response.status==500){
                          console.log("the key has not been updated, contact administrator");
                          inform.add('Error: [500] Contacta al area de soporte. ',{
                              ttl:5000, type: 'danger'
                          });
                      }
                  });
              };
          /***********************************
          *         DELETE SINGLE KEY        *
          ************************************/
              $scope.deleteKeyFn = function(llavero){
                  KeysServices.deleteKey(llavero).then(function(response){
                      if(response.status==200){
                          ticketServices.updateTicketKeychain(llavero).then(function(response_ticke_keychain){
                              if(response_ticke_keychain.status==200){
                                  console.log("Key Successfully deleted");
                                  inform.add('Los datos del llavero ('+llavero.llavero.codigo+') han sido Eliminado con exito. ',{
                                      ttl:4000, type: 'success'
                                  });
                                  $scope.getKeysByDepartmentId($scope.tkupdate.department.idClientDepartament);
                                  $timeout(function() {
                                    console.log($scope.rsExistingKeyList);
                                    $scope.rsNewKeychainList = [];
                                    $scope.list_new_keys = [];
                                    if ($scope.tkupdate.idMgmtMethodKf!=undefined && $scope.tkupdate.idMgmtMethodKf!=null){
                                      for (var i = 0; i < $scope.rsExistingKeyList.length; i++) {
                                        //rsNewKeychainList
                                        if ($scope.rsExistingKeyList[i].idTicketKf!=null && $scope.rsExistingKeyList[i].idKeychainStatusKf!="-1" && $scope.rsExistingKeyList[i].idTicketKf == $scope.tkupdate.idTicket){
                                          $scope.rsNewKeychainList.push($scope.rsExistingKeyList[i]);
                                          $scope.list_new_keys.push($scope.rsExistingKeyList[i]);
                                        }
                                      }
                                    }
                                    console.log("ticket.keysMethod.name  : "+$scope.ticket.keysMethod.name);
                                    console.log("tkupdate.keys length    : "+$scope.tkupdate.keys.length);
                                    console.log("rsNewKeychainList length: "+$scope.rsNewKeychainList.length);
                                    console.log($scope.rsNewKeychainList);
                                    console.log("list_new_keys");
                                    console.log($scope.list_new_keys);
                                  }, 500);
                              }else if(response_ticke_keychain.status==500){
                                  console.log("the key has not been updated, contact administrator");
                                  inform.add('Error: [500] Contacta al area de soporte. ',{
                                      ttl:5000, type: 'danger'
                                  });
                              }
                          });
                      }else if(response.status==404){
                          console.log("not found, contact administrator");
                          inform.add('Error: [404] Contacta al area de soporte. ',{
                              ttl:5000, type: 'danger'
                          });
                      }else if(response.status==500){
                          console.log("There was an error removing the key, contact administrator");
                          inform.add('Error: [500] Contacta al area de soporte. ',{
                              ttl:5000, type: 'danger'
                          });
                      }
                  });
              };
          /***********************************
          *       ADD KEY PROCESS EVENT      *
          ************************************/
            $scope.addProcessEventFn = function(llavero){
                KeysServices.addProcessEvent(llavero).then(function(response){
                    if(response.status==200){
                        console.log("Alta de llavero completada satisfactoriamente.")
                    }else if(response.status==203){
                        console.log(response.data);
                        inform.add('Info: [203] El Codigo ('+llavero.llavero.codigo+'), del llavero, ya se encuentra registrado. ',{
                            ttl:5000, type: 'warning'
                        });
                    }else if(response.status==404){
                        console.log("not found, contact administrator");
                        inform.add('Error: [404] Contacta al area de soporte. ',{
                            ttl:5000, type: 'danger'
                        });
                    }else if(response.status==500){
                        console.log("There was an error adding the key, contact administrator");
                        inform.add('Error: [500] Contacta al area de soporte. ',{
                            ttl:5000, type: 'danger'
                        });
                    }
                });
            };
          /******************************
          *       UPDATE  REQUEST       *
          ******************************/
            $scope.ticketUpdated = null;
            $scope.updateUpRequestFn = function(pedido){
              console.log(pedido);
              $scope.ticketRegistered = null;
              ticketServices.updateUpRequest(pedido).then(function(response){
                  //console.log(response);
                  if(response.status==200){
                    $timeout(function() {
                      console.log("Request Successfully Updated");
                      inform.add('Pedido Actualizado Satisfactoriamente. ',{
                            ttl:5000, type: 'success'
                      });
                      $('.circle-loader').toggleClass('load-complete');
                      $('.checkmark').toggle();
                      $scope.ticketRegistered = response.data.response;
                      if (pedido.ticket.createNewMPLinkForDelivery!=undefined){
                        response.data.response.createNewMPLinkForDelivery=pedido.ticket.createNewMPLinkForDelivery;
                      }
                    }, 2500);
                    if((pedido.ticket.createNewMPLink || pedido.ticket.createNewMPLinkForDelivery) && response.data.response.idTypePaymentKf=="2"){
                      $timeout(function() {
                          $scope.mainSwitchFn("linkMP",response.data.response,null);
                      }, 2700);
                    }else{
                      $scope.openTicketFn(pedido.ticket.idTicket);
                      $timeout(function() {
                          $scope.mainSwitchFn('search', null);
                      }, 2000);
                    }

                  }else if(response.status==500){
                      $scope.ticketRegistered = null;
                    console.log("Ticketnot updated, contact administrator");
                    inform.add('Error: [500] Contacta al area de soporte. ',{
                          ttl:5000, type: 'danger'
                    });
                    $scope.mainSwitchFn('search', null);
                  }
                  //$('#showModalRequestStatus').modal('hide');
              });
            };

          /******************************
          *   CREATING MP PAYMENT LINK  *
          ******************************/
            $scope.mpCreateLinkFn = function(data){
              ticketServices.createMPLink(data).then(function(response){
                  console.log(response);
                  if(response.status==200 || response.status==201){
                    if (response.data[0].data!=undefined && response.data[0].data!=null && response.data[0].data!=""){
                        console.log("Request Successfully Created");
                        inform.add('Link de pago generado satisfactoriamente. ',{
                              ttl:5000, type: 'success'
                        });
                        $scope.mp.link.url      = response.data[0].data.response.sandbox_init_point;
                        $scope.mp.data          = response.data[0].data.response;
                        console.log($scope.mp.data);
                        $scope.addPaymentFn(response.data[0].data.response);
                      }else{
                        console.log("Request not successfully Created");
                        inform.add('Link de pago no ha sido generado satisfactoriamente. ',{
                              ttl:5000, type: 'danger'
                        });
                      }
                  }else if(response.status==500){
                      $scope.ticketRegistered = null;
                    console.log("MP Payment Link not Created, contact administrator");
                    inform.add('Error: [500] Contacta al area de soporte. ',{
                          ttl:5000, type: 'danger'
                    });
                    $scope.mainSwitchFn('search', null);
                  }
              });
            };
          /****************************
          *    ADD PAYMENT DETAILS    *
          ****************************/
            $scope.mp.payment={"data":{
                "idTicketKf": null,
                "client_id":null,
                "id": null,
                "collector_id": null,
                "date_created": null,
                "expires": null,
                "external_reference":null,
                "init_point": null,
                "sandbox_init_point": null,
                "operation_type":null
            }}
            $scope.addPaymentFn = function(payment){
                console.log($scope.mp);
                console.log(payment);
                $scope.mp.payment.data.idTicketKf         = $scope.mp.link.new.data.idTicket;
                $scope.mp.payment.data.client_id          = payment.client_id;
                $scope.mp.payment.data.id                 = payment.id;
                $scope.mp.payment.data.collector_id       = payment.collector_id;
                $scope.mp.payment.data.date_created       = payment.date_created;
                $scope.mp.payment.data.expires            = payment.expires;
                $scope.mp.payment.data.external_reference = payment.external_reference;
                $scope.mp.payment.data.init_point         = payment.init_point;
                $scope.mp.payment.data.sandbox_init_point = payment.sandbox_init_point;
                $scope.mp.payment.data.operation_type     = payment.operation_type;
                $scope.mp.payment.data.isManualPayment    = false;
                console.log($scope.mp.payment.data);
                $scope.mp.payment.data.paymentForDelivery = $scope.update.ticket.createNewMPLinkForDelivery?$scope.update.ticket.createNewMPLinkForDelivery:false;
                $scope.addPaymentDetailsFn = null;
                console.log($scope.mp.payment.data);
                ticketServices.addPayment($scope.mp.payment).then(function(response){
                    //console.log(response);
                    if(response.status==200){
                        console.log("Solicitud de Pago registrada satisfactoriamente");
                        inform.add('La solicitud de pago ha sido registrada Satisfactoriamente. ',{
                                ttl:5000, type: 'success'
                        });
                        $scope.addPaymentDetailsFn = response.data.response[0];
                    }else if(response.status==500){
                        $scope.addPaymentDetailsFn = null;
                        console.log("Payment request has failed, contact administrator");
                        inform.add('Error: [500] Contacta al area de soporte. ',{
                                ttl:5000, type: 'danger'
                        });
                    }
                    $scope.mainSwitchFn('search', null);
                });
            };
          /******************************
          *     COMPLET TICKET REFUND   *
          ******************************/
            $scope.ticketUpdated = null;
            $scope.completeTicketRefundFn = function(ticket){
              console.log(ticket);
              $scope.ticketRegistered = null;
              ticketServices.completeTicketRefund(ticket).then(function(response){
                  //console.log(response);
                  if(response.status==200){
                    $timeout(function() {
                      console.log("Request Successfully processed");
                      inform.add('Reintegro completado Satisfactori amente. ',{
                            ttl:5000, type: 'success'
                      });
                      $('.circle-loader').toggleClass('load-complete');
                      $('.checkmark').toggle();
                      $scope.ticketRegistered = response.data[0];
                      $scope.openTicketFn($scope.ticketRegistered.idTicket);
                      //$scope.filters.ticketStatus.idStatus = pedido.ticket.idNewStatusKf;
                      $scope.mainSwitchFn('search', null);
                    }, 2500);
                  }else if(response.status==500){
                      $scope.ticketRegistered = null;
                    console.log("Status no updated, contact administrator");
                    inform.add('Error: [500] Contacta al area de soporte. ',{
                          ttl:5000, type: 'danger'
                    });
                  }
                  $scope.mainSwitchFn('search', null);
                  //$('#showModalRequestStatus').modal('hide');
              });
            };
          /******************************
          *     CHANGE TICKET STATUS    *
          ******************************/
            $scope.ticketUpdated = null;
            $scope.changeTicketStatusRequestFn = function(pedido){
              console.log(pedido);
              $scope.ticketRegistered = null;
              ticketServices.changueStatus(pedido).then(function(response){
                  //console.log(response);
                  if(response.status==200){
                    $timeout(function() {
                      console.log("Request Successfully processed");
                      inform.add('Estado del pedido Actualizado Satisfactoriamente. ',{
                            ttl:5000, type: 'success'
                      });
                      $('.circle-loader').toggleClass('load-complete');
                      $('.checkmark').toggle();
                      $scope.ticketRegistered = response.data[0];
                      $scope.openTicketFn(pedido.ticket.idTicket);
                      //$scope.filters.ticketStatus.idStatus = pedido.ticket.idNewStatusKf;
                      $scope.mainSwitchFn('search', null);
                    }, 2500);
                  }else if(response.status==500){
                      $scope.ticketRegistered = null;
                    console.log("Status no updated, contact administrator");
                    inform.add('Error: [500] Contacta al area de soporte. ',{
                          ttl:5000, type: 'danger'
                    });
                  }
                  $scope.mainSwitchFn('search', null);
                  //$('#showModalRequestStatus').modal('hide');
              });
            };
          /******************************
          *  MULTI CHANGE TICKET STATUS *
          ******************************/
            $scope.changeTicketStatusRequestMultiFn = function(pedido){
              ticketServices.changueStatus(pedido).then(function(response){
                  //console.log(response);
                  if(response.status==200){
                    console.log("Request Successfully processed");
                  }else if(response.status==500){
                    inform.add('Error: [500] Contacta al area de soporte. ',{
                          ttl:5000, type: 'danger'
                    });
                  }
              });
            };
          /******************************
          *       APROBAR  TICKET       *
          ******************************/
            $scope.data={'ticket':{'idTicket': null,'history': []}};
            $scope.sysApproveTicketFn = function(ticket){
              console.clear();
              $scope.data={'ticket':{'idTicket': null, 'idTypePaymentKf':null, 'history': []}};
              $scope.data.ticket.idTicket         = ticket.idTicket;
              $scope.data.ticket.idTypePaymentKf  = ticket.idTypePaymentKf;
              $scope.data.ticket.history.push({'idUserKf': $scope.sysLoggedUser.idUser, 'idTicketKf': ticket.idTicket, 'descripcion': null, 'idCambiosTicketKf':"2"});
              if (ticket.idTypePaymentKf=="1"){
                $scope.data.ticket.history.push({'idUserKf': $scope.sysLoggedUser.idUser, 'idTicketKf': ticket.idTicket, 'descripcion': null, 'idCambiosTicketKf':"13"});
              }
              console.log($scope.data);
                ticketServices.approvedTicket($scope.data).then(function(response){
                  console.log(response);
                  if(response.status==200){
                    console.log("TICKET APPROVED SUCCESSFULLY");
                    inform.add('Ticket ha sido aprobado satisfactoriamente.',{
                      ttl:3000, type: 'success'
                    });
                    $timeout(function() {
                      if (ticket.idTypePaymentKf=="2" && ticket.idStatusTicketKf!=9 && ticket.idStatusTicketKf!=11){
                        $scope.mainSwitchFn("linkMP",response.data[0],null);
                      }
                      $scope.mainSwitchFn('search', null);
                  }, 2500);
                    $timeout(function() {

                        $('.circle-loader').toggleClass('load-complete');
                        $('.checkmark').toggle();
                        $scope.ticketRegistered = response.data[0];
                        $scope.openTicketFn($scope.ticketRegistered.idTicket);
                        //$scope.filters.ticketStatus.idStatus = $scope.ticketRegistered.idStatusTicketKf;
                        $scope.mainSwitchFn('search', null);
                    }, 3000);
                    if($scope.sysRouteParams!=undefined){
                      $timeout(function() {
                          $scope.sysRouteParams = null;
                          tokenSystem.destroyTokenStorage(7);
                          $scope.tkupdate = null;
                          $scope.mainSwitchFn('dashboard', null);
                          blockUI.stop();
                      }, 3200);
                  }
                    }else if(response.status==500){
                        $scope.ticketRegistered = null;
                      console.log("Ticket Approval has failed, contact administrator");
                      inform.add('Error: [500] Contacta al area de soporte. ',{
                            ttl:5000, type: 'danger'
                      });
                    }
                    $scope.mainSwitchFn('search', null);
                });
            }
          /******************************
          *    BILLING INITIATE TICKET  *
          ******************************/
            $scope.setBillingInitiateFn = function(ticket){
              ticketServices.seBillingInitiate(ticket).then(function(response){
                //console.log(response);
                if(response.status==404){
                  inform.add('Error: [404] Pedido no encontrado, contacta conc el area de soporte. ',{
                    ttl:5000, type: 'warning'
                  });
                }else if(response.status==500){
                    $scope.ticketRegistered = null;
                  inform.add('Error: [500] Server Error, contacta al area de soporte. ',{
                        ttl:5000, type: 'danger'
                  });
                }
              });
            }

          /****************************
          *        LIST TICKETS       *
          ****************************/
            $scope.listTickets = function(filter){
              console.info("List Tickets");
              /**********CHECK IF THERE ARE TMP DELIVERY OR CANCEL DATA APPROVED TO APPLY TO THE TICKETS ***********/
              //$scope.sysChkChangeOrCancel(0);
              //$scope.sysChkChangeOrCancel(1);
              /******************************
              *                             *
              *       FILTER VARIABLES      *
              *                             *
              ******************************/
              //$scope.filters.idTypeTicketKf= !$scope.filters.idTypeTicketKf ? 0 : $scope.filters.idTypeTicketKf;
              //$scope.dh.filterAddress = 0;

              //$scope.filters.idAddress   = ($scope.sessionidProfile==1 && (!$scope.filterCompanyKf.selected || !$scope.filterAddressKf.selected)) || (($scope.sessionidProfile!=1)  && !$scope.filterAddressKf.selected) ? "" : $scope.filterAddressKf.selected.idAdress;
              //$scope.dh.filterAddress    = $scope.filters.idAddress;
              //$scope.dh.filterSearch     = $scope.filters.searchFilter;
              //$scope.dh.filterTop        = $scope.filters.topDH;
              //$scope.dh.filterProfile    = $scope.sessionidProfile;
              //$scope.dh.filterTenantKf   = $scope.sessionidProfile==5 || ($scope.sessionidProfile==6 && $scope.sessionidTypeTenant==2) ? $scope.sessionIdUser :'';
              //if(($scope.sessionidProfile!=2  && $scope.sessionidProfile!=5) || ($scope.sessionidTypeTenant==6 && $scope.sessionidTypeTenant==1)){
              //  $scope.filters.idCompany   = !$scope.filterCompanyKf.selected? "" : $scope.filterCompanyKf.selected.idCompany;
              //}
              //$scope.dh.filterCompany    = $scope.sessionidProfile == 2 || $scope.sessionidProfile == 4 ? $scope.sessionidCompany : $scope.filters.idCompany;
              //$scope.dh.filterTypeTicket = !$scope.filters.typeTicket?"":$scope.filters.typeTicket.idTypeTicket;
              //$scope.dh.filterStatus     = !$scope.filters.ticketStatus?"":$scope.filters.ticketStatus.idStatus;
              //$scope.dh.filterOwnerKf    = $scope.sessionidProfile==3?$scope.sessionIdUser:'';
              //$scope.dh.filterIdUser     = $scope.sessionidProfile!=1 && $scope.sessionidProfile!=2 && $scope.sessionidProfile!=4?$scope.sessionIdUser:'';
              //$scope.dh.filterIdAtt      = ($scope.sessionidProfile==6 && $scope.sessionidTypeTenant==1) || ($scope.sessionidProfile==6 && $scope.sessionidTypeTenant==2)?$scope.sessionIdUser:'';
              ////console.log($scope.dh);
              //  $searchFilter=
              //  {
              //       idUserRequestBy     : $scope.dh.idUserRequestBy,
              //       idUserMadeBy        : $scope.dh.idUserMadeBy,
              //       idBuildingKf        : $scope.dh.filterAddress,
              //       idClientCompaniFk   : $scope.dh.filterCompany,
              //       idClientBranchFk    : $scope.dh.filterStatus,
              //       topFilter           : $scope.dh.filterTop,
              //       idTypeTicketKf      : $scope.dh.filterTypeTicket,
              //       idStatusTicketKf    : $scope.dh.filterStatus,
              //       codTicket           : $scope.dh.filterStatus,
              //       idTypePaymentKf     : $scope.dh.filterStatus,
              //       idTypeDeliveryKf    : $scope.dh.idTypeDeliveryKf,
              //
              //  }
                //console.log($scope.sessionIdUser);
                console.log(filter);
                $scope.listTicktTmp=null;
                $scope.listTickt = [];
                ticketServices.all(filter).then(function(response){
                  if(response.status==200){
                      /*$scope.listTicktTmp =  response.data.response.tickets;
                      if (filter.isInitialDeliveryActive==1){ //isInitialDeliveryActive
                        for(var i=0;i<$scope.listTicktTmp.length;i++){
                            //console.log($scope.listTicktTmp[i].building.isInitialDeliveryActive.length);
                            //console.log($scope.listTicktTmp[i].building.isInitialDeliveryActive[0].expiration_state);
                            if ($scope.listTicktTmp[i].building.isInitialDeliveryActive.length>=1 && $scope.listTicktTmp[i].building.isInitialDeliveryActive[0].expiration_state==false){
                              $scope.listTickt.push($scope.listTicktTmp[i]);
                            }
                        }
                          console.log($scope.listTickt);
                        //MP PAYMENT Succeeded
                      //}else if (filter.isPaymentSucceeded==1 && filter.idTypePaymentKf=="2"){
                      //  console.log("filter.isPaymentSucceeded: ",filter.isPaymentSucceeded);
                      //  console.log("filter.idTypePaymentKf   : ",filter.idTypePaymentKf);
                      //  for(var i=0;i<$scope.listTicktTmp.length;i++){
                      //      //console.log($scope.listTicktTmp[i].building.isInitialDeliveryActive.length);
                      //      //console.log($scope.listTicktTmp[i].building.isInitialDeliveryActive[0].expiration_state);
                      //      if ( $scope.listTicktTmp[i].idTypePaymentKf=='2' && $scope.listTicktTmp[i].idPaymentDeliveryKf==null && $scope.listTicktTmp[i].idStatusTicketKf!='6' && $scope.listTicktTmp[i].idStatusTicketKf!='3' && $scope.listTicktTmp[i].idPaymentKf!=null && $scope.listTicktTmp[i].idPaymentKf!=undefined && $scope.listTicktTmp[i].paymentDetails.mp_payment_id!=undefined && $scope.listTicktTmp[i].paymentDetails.mp_payment_id!=0 && $scope.listTicktTmp[i].paymentDetails.mp_payment_id!=null && $scope.listTicktTmp[i].paymentDetails.mp_status_detail=="accredited"){
                      //        $scope.listTickt.push($scope.listTicktTmp[i]);
                      //      }
                      //  }
                      //  console.log($scope.listTickt);
                      }else{*/
                        $scope.listTickt  = response.data.response.tickets;
                      //}
                        console.log($scope.listTickt);
                        $scope.dashboard = {'tickets':{}};
                        $scope.dashboard.tickets.total              = response.data.response.dashboard.total;
                        $scope.dashboard.tickets.approval_pending   = response.data.response.dashboard.Aprobación_Pendiente;
                        $scope.dashboard.tickets.canceled           = response.data.response.dashboard.Cancelado;
                        $scope.dashboard.tickets.completed          = response.data.response.dashboard.Entregado;
                        $scope.dashboard.tickets.pyment_pending     = response.data.response.dashboard.Pago_Pendiente;
                        $scope.dashboard.tickets.in_progress        = response.data.response.dashboard.En_preparacion;
                        $scope.dashboard.tickets.delivery_pending   = response.data.response.dashboard.Pendiente_de_entrega;
                        $scope.dashboard.tickets.in_transit         = response.data.response.dashboard.En_Ruta;
                        $scope.dashboard.tickets.pickup_ready       = response.data.response.dashboard.Listo_para_Retirar;
                        $scope.dashboard.tickets.canceled           = response.data.response.dashboard.Cancelado;
                        $scope.totalTickets = $scope.listTickt.length;

                  }else if (response.status==404){
                      inform.add('No se encontraron resultados verifique el filtro seleccionado o contacte al soporte de BSS.',{
                          ttl:3000, type: 'info'
                      });
                      $scope.listTickt =  [];
                      $scope.totalTickets = 0;
                  }else if (response.status==500){
                      inform.add('Ocurrio un error, contacte al area de soporte de BSS.',{
                      ttl:3000, type: 'danger'
                      });
                      $scope.listTickt =  [];
                      $scope.totalTickets = 0;
                  }
                  });
            }
            $scope.greaterThan = function(prop, val){
                return function(item){
                  if (item[prop] > val) return true;
                }
            }
            $scope.lessThan = function(prop, val){
              return function(item){
                if (item[prop] <= val) return true;
              }
            }
            $scope.differentThan = function(item){
              //console.info(item);
              if ($scope.sysToken && $scope.sysLoggedUser.idTypeTenantKf!=undefined){
                switch ($scope.sysLoggedUser.idTypeTenantKf){
                  case "1":
                    return (item.idTypeTicket != "3" && item.idTypeTicket != "4");
                  case "2":
                    return (item.idTypeTicket != "3" && item.idTypeTicket != "4");
                }
              }
            }
        /**************************************************
        *                                                 *
        *    EXPORT/IMPORT THE REQUEST FILE (EXCEL)       *
        *                                                 *
        **************************************************/
          /**************************************************
          *          SET DEFAULT ARRAY LIST FUNCTION        *
          ***************************************************/
            $scope.setRequestDefaultListAsArrayFn = function(obj){
              console.log(obj);
              $scope.sheetName = "Listado de Pedidos - "+sysDay+sysMonth2Digit+sysYear
              $scope.list_requests=[];

              for (var f in obj){
                var depto=obj[f].idTypeRequestFor==1?obj[f].department.departament:'';
                var floor=obj[f].idTypeRequestFor==1?obj[f].department.floor:'';
                var Departamento = obj[f].idTypeRequestFor==1?floor+" - "+depto.toUpperCase():'';
                var Envio = obj[f].typeDeliver!=undefined?obj[f].typeDeliver.typeDelivery:'';
                var Pago = obj[f].typePaymentKf!=undefined?obj[f].typePaymentKf.descripcion:'';
                var fullNameUser=obj[f].idUserRequestBy!=null && obj[f].userRequestBy.fullNameUser!=undefined?obj[f].userRequestBy.fullNameUser:"no asignado";
                $scope.list_requests.push({
                    //'idTicket':obj[f].idTicket,
                    'NumeroPedido':obj[f].codTicket,
                    'FechaPedido':obj[f].created_at,
                    'Consorcio':obj[f].building.address,
                    'Departamento':Departamento,
                    'SolicitadoPor':fullNameUser,
                    'CantidadLlaveros': obj[f].keys.length,
                    'Envio':Envio,
                    'Pago':Pago,
                    'Total':obj[f].total,
                    'Estado':obj[f].statusTicket.statusName
                });
              }
              console.log($scope.list_requests);
              $scope.buildXLS($scope.list_requests);
            }
          /**************************************************
          *          SET BILLING ARRAY LIST FUNCTION        *
          ***************************************************/
            $scope.setRequestBillingListAsArrayFn = function(obj){

              try {
                if (obj.length>=1){
                  $scope.sheetName = "Pedidos a Facturar -"+sysDay+sysMonth2Digit+sysYear
                  $scope.list_requests=[];
                  for (var f in obj){
                    //console.log(obj[f]);
                    var costDelivery  = null;
                    var costService   = null;
                    var priceFabric   = 0;
                    var floor         = obj[f].idTypeRequestFor=="1"?obj[f].department.floor:"";
                    var depto         = obj[f].idTypeRequestFor=="1"?obj[f].department.departament:obj[f].typeRequestFor.name;
                    var department    = obj[f].idTypeRequestFor=="1"?floor+" - "+depto.toUpperCase():depto.toUpperCase();
                    var codTicket     = obj[f].codTicket;
                    var fileName      = obj[f].idTicket+"_"+codTicket.substr(5)+".pdf";
                    var fullNameUser  = obj[f].idUserRequestBy!=null && obj[f].userRequestBy.fullNameUser!=undefined?obj[f].userRequestBy.fullNameUser:"no asignado";
                    var dniUser       = obj[f].idUserRequestBy!=null && obj[f].userRequestBy.dni!=undefined?obj[f].userRequestBy.dni:"no asignado";
                    costDelivery      = parseFloat(obj[f].costDelivery);
                    costService       = parseFloat(obj[f].costService);
                    priceFabric       = parseFloat(obj[f].keys[0].priceFabric);
                    if (obj[f].created_at!=null){

                        /*if(obj[f].keys.length>1){
                          var i = 1;
                          var costDelivery = null;
                          var costService  = null;
                          var CantidadLlaveros = 0;
                          var keyModel = null;
                          var priceFabric = 0;
                          var keyList = obj[f].keys;
                          for (var key = 0; key < obj[f].keys.length; key++) {
                            costDelivery = i == 1 ?obj[f].costDelivery:0;
                            costService  = i == 1 ?obj[f].costService:0;
                            //if (obj[f].keys[key].idDepartmenKf == obj[f].idDepartmentKf && obj[f].keys[key].idTicketKf == obj[f].idTicket){
                            //
                            //}
                            if (keyModel == null){
                              keyModel = obj[f].keys[key].model;
                              var j=1;
                            }else if (keyModel != obj[f].keys[key].model){
                              keyModel = obj[f].keys[key].model;
                              var j=1;
                            }
                            //console.log("keyModel: " +keyModel);
                            // Parsear el JSON
                            const data = keyList;
                            //console.log(data);
                            // Contar las coincidencias del valor de la key "model"
                            let occurrences = 0;

                            // Iterar sobre el array de objetos
                            data.forEach(item => {
                              if (item.model === keyModel) {
                                occurrences++;
                              }
                            });

                            //console.log("keyModel: " +keyModel);
                            //let occurrences = 0;
                            //const obj2 = JSON.parse(keyList);
                            //for (const item in obj2) {
                            //    if (obj2.hasOwnProperty(item) && obj2[item] === keyModel) {
                            //      occurrences++;
                            //    }
                            //}
                            if (occurrences==1 && j==occurrences){
                              CantidadLlaveros=1
                              //console.log("j:" +j);
                              //console.log("occurrences:" +occurrences);
                              //console.log("CantidadLlaveros:" +CantidadLlaveros)
                            }else if (occurrences>1 && j<occurrences){
                              CantidadLlaveros=0
                              //console.log("j:" +j);
                              //console.log("occurrences:" +occurrences);
                              //console.log("CantidadLlaveros:" +CantidadLlaveros)
                              j++;
                            }else if (occurrences>1 && j==occurrences){
                              CantidadLlaveros=occurrences
                              //console.log("j:" +j);
                              //console.log("occurrences:" +occurrences);
                              //console.log("CantidadLlaveros:" +CantidadLlaveros);
                            }
                            if(obj[f].idTypePaymentKf=="1"){
                                $scope.list_requests.push({
                                  'idTicket':obj[f].idTicket,
                                  'NumeroPedido':obj[f].codTicket,
                                  'FechaPedido':obj[f].created_at,
                                  'idClient': obj[f].idBuildingKf,
                                  'Consorcio':obj[f].building.address,
                                  'Departamento':department,
                                  'SolicitadoPor':fullNameUser,
                                  'dniSolicitante':dniUser,
                                  'CostoEnvio':costDelivery,
                                  'CostoGestion':costService,
                                  'CantidadLlaveros': CantidadLlaveros,
                                  'idProducto':obj[f].keys[key].idProduct,
                                  'Producto': obj[f].keys[key].model,
                                  'PrecioUnitario':obj[f].keys[key].priceFabric,
                                });
                            }else{
                                $scope.list_requests.push({
                                  'idTicket':obj[f].idTicket,
                                  'NumeroPedido':obj[f].codTicket,
                                  'FechaPedido':obj[f].created_at,
                                  'idClient': obj[f].idBuildingKf,
                                  'Consorcio':obj[f].building.address,
                                  'Departamento':department,
                                  'SolicitadoPor':fullNameUser,
                                  'dniSolicitante':dniUser,
                                  'CostoEnvio':costDelivery,
                                  'CostoGestion':costService,
                                  'CantidadLlaveros': CantidadLlaveros,
                                  'idProducto':obj[f].keys[key].idProduct,
                                  'Producto': obj[f].keys[key].model,
                                  'PrecioUnitario':obj[f].keys[key].priceFabric,
                                  'FacturaNombre':fileName
                                });
                            }
                            i++;
                          }
                          //console.log($scope.list_requests);
                        }else{*/
                          if(obj[f].idTypePaymentKf=="1"){
                            $scope.list_requests.push({
                              'idTicket':obj[f].idTicket,
                              'NumeroPedido':obj[f].codTicket,
                              'FechaPedido':obj[f].created_at,
                              'idClient': obj[f].idBuildingKf,
                              'Consorcio':obj[f].building.address,
                              'Departamento':department,
                              'SolicitadoPor':fullNameUser,
                              'dniSolicitante':dniUser,
                              'CostoEnvio':costDelivery,
                              'CostoGestion':costService,
                              'CantidadLlaveros': obj[f].keys.length,
                              'idProducto':obj[f].keys[0].idProduct,
                              'Producto': obj[f].keys[0].model,
                              'PrecioUnitario':priceFabric,
                            });
                          }else{
                            $scope.list_requests.push({
                              'idTicket':obj[f].idTicket,
                              'NumeroPedido':obj[f].codTicket,
                              'FechaPedido':obj[f].created_at,
                              'idClient': obj[f].idBuildingKf,
                              'Consorcio':obj[f].building.address,
                              'Departamento':department,
                              'SolicitadoPor':obj[f].userRequestBy.fullNameUser,
                              'dniSolicitante':dniUser,
                              'CostoEnvio':costDelivery,
                              'CostoGestion':costService,
                              'CantidadLlaveros': obj[f].keys.length,
                              'idProducto':obj[f].keys[0].idProduct,
                              'Producto': obj[f].keys[0].model,
                              'PrecioUnitario':priceFabric,
                              'FacturaNombre':fileName
                            });
                          }
                       // }
                    }
                  }
                  console.log($scope.list_requests);
                  $scope.buildXLS($scope.list_requests);
                }else{
                  inform.add('No se encontraron resultados verifique el filtro seleccionado o contacte al soporte de BSS.',{
                    ttl:5000, type: 'info'
                });
                }
              } catch (error) {
                console.error('Error processing request billing list:', error);
              }
            }
          /**************************************************
          *        SET DELIVERY ARRAY LIST FUNCTION         *
          ***************************************************/
            $scope.ubicacion_lat = null;
            $scope.ubicacion_lon = null;
            $scope.getAddressDetailsFn = function(addressName, idProvince){
              $scope.ubicacion_lat = null;
              $scope.ubicacion_lon = null;
              addressServices.getAddressByName(addressName, idProvince).then(function(data){
                console.log(data);
                if(data!=null){
                  $scope.ubicacion_lat = data.direcciones.ubicacion_lat;
                  $scope.ubicacion_lon = data.direcciones.ubicacion_lon;
                }else if(data==null){
                  $scope.ubicacion_lat = null;
                  $scope.ubicacion_lon = null;
                  inform.add('Direccion no encontrada en la API del Servicio de Normalizacion de Datos Geograficos. ',{
                      ttl:4000, type: 'danger'
                  });
                }else{
                  inform.add('Error Api Gob AR: '+data.message+'. ',{
                    ttl:4000, type: 'danger'
                  });
                }
              });
            }
            $scope.setDeliveryExternalCompanyListAsArrayFn = function(obj){
              console.log(obj);
              $scope.sheetName = "Hoja de Ruta -"+sysDay+sysMonth2Digit+sysYear
              $scope.list_requests=[];

              for (var f in obj){
                var location          = "";
                var city              = "";
                var address           = "";
                var taddress          = "";
                var emailAddr         = "";
                var phoneNumberUser   = "";
                var dni               = "";
                var ubicacion_lat     = "";
                var ubicacion_lon     = "";
                var whoReceive        = "";
                var addressLat        = obj[f].deliveryAddress!=null && obj[f].deliveryAddress!=undefined && obj[f].deliveryAddress.addressLat!=undefined?obj[f].deliveryAddress.addressLat:"No asignado";
                var addressLon        = obj[f].deliveryAddress!=null && obj[f].deliveryAddress!=undefined && obj[f].deliveryAddress.addressLon!=undefined?obj[f].deliveryAddress.addressLon:"No asignado";
                if (obj[f].idDeliveryTo=="1" && obj[f].idWhoPickUp=="1"){ //DELIVERY OWNER PERSON TO CURRENT ADDRESS
                  location        = obj[f].deliveryAddress.location;
                  city            = obj[f].deliveryAddress.province;
                  address         = obj[f].deliveryAddress.address;
                  emailAddr       = obj[f].userDelivery.emailUser;
                  phoneNumberUser = obj[f].userDelivery.phoneNumberUser;
                  dni             = obj[f].userDelivery.dni;
                  ubicacion_lat   = addressLat;
                  ubicacion_lon   = addressLon;
                  whoReceive      = obj[f].userDelivery.fullNameUser;
                }else if (obj[f].idDeliveryTo=="2" && obj[f].idWhoPickUp=="1"){ //DELIVERY OWNER PERSON TO DIFFERENT ADDRESS
                  location        = obj[f].otherDeliveryAddress.location;
                  city            = obj[f].otherDeliveryAddress.province;
                  taddress        = obj[f].otherDeliveryAddress.address;
                  address         = address.toUpperCase()+" "+obj[f].otherDeliveryAddress.number;
                  emailAddr       = obj[f].userDelivery.emailUser;
                  phoneNumberUser = obj[f].userDelivery.phoneNumberUser;
                  dni             = obj[f].userDelivery.dni;
                  $scope.getAddressDetailsFn(address, obj[f].otherDeliveryAddress.idProvinceFk);
                  ubicacion_lat   = $scope.ubicacion_lat;
                  ubicacion_lon   = $scope.ubicacion_lon;
                  whoReceive      = obj[f].userDelivery.fullNameUser;
                }else if (obj[f].idDeliveryTo==null && obj[f].idWhoPickUp=="2"){ //DELIVERY ENCARGADO PERSON TO CURRENT ADDRESS
                  location        = obj[f].building.location;
                  city            = obj[f].building.province;
                  address         = obj[f].building.address;
                  emailAddr       = obj[f].userDelivery.emailUser;
                  phoneNumberUser = obj[f].userDelivery.phoneNumberUser;
                  dni             = obj[f].userDelivery.dni;
                  ubicacion_lat   = addressLat;
                  ubicacion_lon   = addressLon;
                  whoReceive      = obj[f].userDelivery.fullNameUser;
                }else if (obj[f].idDeliveryTo==null && obj[f].idWhoPickUp=="3"){ //DELIVERY TO THIRD PERSON
                  location        = obj[f].thirdPersonDelivery.location;
                  city            = obj[f].thirdPersonDelivery.province;
                  taddress        = obj[f].thirdPersonDelivery.address;
                  address         = address.toUpperCase()+" "+obj[f].thirdPersonDelivery.number;
                  emailAddr       = obj[f].userRequestBy.emailUser;
                  phoneNumberUser = obj[f].thirdPersonDelivery.movilPhone;
                  dni             = obj[f].thirdPersonDelivery.dni;
                  $scope.getAddressDetailsFn(address, obj[f].thirdPersonDelivery.idProvinceFk);
                  ubicacion_lat   = $scope.ubicacion_lat;
                  ubicacion_lon   = $scope.ubicacion_lon;
                  whoReceive      = obj[f].userDelivery.fullName;
                }

                var codTicket     = obj[f].codTicket;
                $scope.list_requests.push({
                  //'idTicket':obj[f].idTicket,
                  'Alto (cm)':'',
                  'Ancho (cm)':'',
                  'Largo (cm)':'',
                  'Peso (kg)':'',
                  'Referencia externa':codTicket,
                  'OxLog': '',
                  'Nombre quien recibe':whoReceive,
                  '* Direccion de destino':address,
                  'Barrio/Comuna':location,
                  'Codigo Postal':'',
                  'Ciudad':city,
                  'Aclaraciones en destino':'',
                  'Email':emailAddr,
                  'Telefono':phoneNumberUser,
                  'Latitud':ubicacion_lat,
                  'Longuitud':ubicacion_lon,
                  'Retiro (si/no)': 'NO',
                  'Cambio (si/no)':'NO',
                  'DNI quien recibe':dni
              });
              }
              console.log($scope.list_requests);
              $scope.buildXLS($scope.list_requests);
            }
            $scope.setDeliveryInternalCompanyListAsArrayFn = function(obj){
              console.log(obj);
              $scope.sheetName = "Hoja de Ruta -"+sysDay+sysMonth2Digit+sysYear
              $scope.list_requests=[];

              for (var f in obj){
                var location          = "";
                var city              = "";
                var address           = "";
                var taddress          = "";
                var emailAddr         = "";
                var phoneNumberUser   = "";
                var dni               = "";
                var ubicacion_lat     = "";
                var ubicacion_lon     = "";
                var whoReceive        = "";
                if (obj[f].idDeliveryTo=="1" && obj[f].idWhoPickUp=="1"){ //DELIVERY OWNER PERSON TO CURRENT ADDRESS
                  location        = obj[f].deliveryAddress.location;
                  city            = obj[f].deliveryAddress.province;
                  address         = obj[f].deliveryAddress.address;
                  emailAddr       = obj[f].userDelivery.emailUser;
                  phoneNumberUser = obj[f].userDelivery.phoneNumberUser;
                  dni             = obj[f].userDelivery.dni;
                  ubicacion_lat   = obj[f].deliveryAddress.addressLat;
                  ubicacion_lon   = obj[f].deliveryAddress.addressLon;
                  whoReceive      = obj[f].userDelivery.fullNameUser;
                }else if (obj[f].idDeliveryTo=="2" && obj[f].idWhoPickUp=="1"){ //DELIVERY OWNER PERSON TO DIFFERENT ADDRESS
                  location        = obj[f].otherDeliveryAddress.location;
                  city            = obj[f].otherDeliveryAddress.province;
                  taddress        = obj[f].otherDeliveryAddress.address;
                  address         = address.toUpperCase()+" "+obj[f].otherDeliveryAddress.number;
                  emailAddr       = obj[f].userDelivery.emailUser;
                  phoneNumberUser = obj[f].userDelivery.phoneNumberUser;
                  dni             = obj[f].userDelivery.dni;
                  $scope.getAddressDetailsFn(address, obj[f].otherDeliveryAddress.idProvinceFk);
                  ubicacion_lat   = $scope.ubicacion_lat;
                  ubicacion_lon   = $scope.ubicacion_lon;
                  whoReceive      = obj[f].userDelivery.fullNameUser;
                }else if (obj[f].idDeliveryTo==null && obj[f].idWhoPickUp=="2"){ //DELIVERY ENCARGADO PERSON TO CURRENT ADDRESS
                  location        = obj[f].building.location;
                  city            = obj[f].building.province;
                  address         = obj[f].building.address;
                  emailAddr       = obj[f].userDelivery.emailUser;
                  phoneNumberUser = obj[f].userDelivery.phoneNumberUser;
                  dni             = obj[f].userDelivery.dni;
                  ubicacion_lat   = obj[f].deliveryAddress.addressLat;
                  ubicacion_lon   = obj[f].deliveryAddress.addressLon;
                  whoReceive      = obj[f].userDelivery.fullNameUser;
                }else if (obj[f].idDeliveryTo==null && obj[f].idWhoPickUp=="3"){ //DELIVERY TO THIRD PERSON
                  location        = obj[f].thirdPersonDelivery.location;
                  city            = obj[f].thirdPersonDelivery.province;
                  taddress        = obj[f].thirdPersonDelivery.address;
                  address         = address.toUpperCase()+" "+obj[f].thirdPersonDelivery.number;
                  emailAddr       = obj[f].userRequestBy.emailUser;
                  phoneNumberUser = obj[f].thirdPersonDelivery.movilPhone;
                  dni             = obj[f].thirdPersonDelivery.dni;
                  $scope.getAddressDetailsFn(address, obj[f].thirdPersonDelivery.idProvinceFk);
                  ubicacion_lat   = $scope.ubicacion_lat;
                  ubicacion_lon   = $scope.ubicacion_lon;
                  whoReceive      = obj[f].userDelivery.fullName;
                }

                var codTicket     = obj[f].codTicket;
                var codTicket     = obj[f].codTicket;
                $scope.list_requests.push({
                  'Referencia externa':codTicket,
                  'ALTA / BAJA': obj[f].typeticket.TypeTicketName,
                  'Nombre quien recibe':whoReceive,
                  'DNI quien recibe':dni,
                  'Direccion de destino':address,
                  'Barrio/Comuna':location,
                  'Aclaraciones en destino':''

                });
              }
              console.log($scope.list_requests);
              $scope.buildXLS($scope.list_requests);
            }
            function xdw(s) {
              var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
              var view = new Uint8Array(buf);  //create uint8array as viewer
              for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF; //convert to octet
              return buf;
            }
          /**************************************************
          *          SET DEPARTMENT ARRAY FUNCTION          *
          ***************************************************/
            var myArrList = null;
            var sheetName = null;
            var wb        = null;
            var workSheet = null;
            var wout      = null;
            var wopts     = null;
            $scope.buildXLS = function(obj) {
                myArrList = obj;
                sheetName = $scope.sheetName
                //console.log(myArrList);
                wb = XLSX.utils.book_new();
                wb.Props = {
                    Title: sheetName,
                    Subject: "BSS Seguridad",
                    Author: "BSS Seguridad",
                    CreatedDate: sysDate
                };
                wb.SheetNames.push(sheetName);
                workSheet = XLSX.utils.json_to_sheet(myArrList);
                // Apply styles to specific cells
                let cellAddress = "A1"; // Example: Style the first cell (A1)
                if (workSheet[cellAddress]) {
                    workSheet[cellAddress].s = {
                        alignment: {
                            horizontal: "center", // left, center, right
                            vertical: "center",
                            wrapText: true
                        },
                        font: {
                            bold: true,
                            color: { rgb: "FF0000" }, // Red text color
                            name: "Arial",
                            sz: 12 // Font size
                        },
                        fill: {
                            fgColor: { rgb: "FFFF00" } // Yellow background
                        },
                        border: {
                            top: { style: "thin", color: { rgb: "000000" } },
                            bottom: { style: "thin", color: { rgb: "000000" } },
                            left: { style: "thin", color: { rgb: "000000" } },
                            right: { style: "thin", color: { rgb: "000000" } }
                        }
                    };
                }
                //var ws_data = [['hello' , 'world']];
                //var ws = XLSX.utils.aoa_to_sheet(ws_data);
                wb.Sheets[sheetName] = workSheet;
                //if(!wb.A1.c) wb.A1.c = [];
                //wb.A1.c.push({a:"SheetJS", t:"This comment is visible"});
                wopts = { bookType:'xlsx', bookSST:false, type:'binary' };
                wout = XLSX.write(wb,wopts);
                //XLSX.utils.book_append_sheet(wb, workSheet, "test");
                //var wbout = XLSX.writeFile(wb, {bookType:'xlsx',type: "binary"});
                $scope.downloadXLS(wout);
            }
            $scope.downloadXLS = function(wout){
                saveAs(new Blob([xdw(wout)],{type:"application/octet-stream"}), sheetName+'.xlsx');
            }

      /**************************************************
      *                                                 *
      *                 UPLOAD TICKET FILES             *
      *                                                 *
      **************************************************/
          $scope.filesUploadList=[];
          $scope.fileList=[];
          $scope.fileListTmp=[];
          $scope.fileName=null;
          $scope.invalidTypeOf=false;
          $scope.fileTypeOf=null;
          $scope.isFileExist = null;
          /**************************************
          *       LOAD PDF FILES TO UPLOAD      *
          **************************************/
            $scope.loadPDFFilesFn = function(e) {
              $scope.fileListTmp=[];
              $scope.fileList=[];
              $scope.filesUploadList = [];
              console.log(e.files);
              var list = e;
              $scope.$applyAsync(function($scope) {
                  for(var i=0;i<list.files.length;i++){
                      file = list.files[i];
                      var fileName=file.name.replace(/ /g,"_");
                      var type =  '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
                      if('|pdf|'.indexOf(type) !== -1){
                          var codTicket = $scope.tkupdate.codTicket;
                          var name = $scope.tkupdate.idTicket+"_"+codTicket.substr(5)+"."+file.type.slice(file.type.lastIndexOf('/') + 1);
                          var cleanFile = new File([file], name, {type: file.type, lastModified: file.lastModified, size: file.size});
                          //console.log(cleanFile);
                          $scope.fileListTmp.push(cleanFile);
                          $scope.setPreviewPDFBeforeUploadFile(cleanFile);
                      }else{
                          $scope.fileName=file.name;
                          $scope.fileTypeOf=file.type.slice(file.type.lastIndexOf('/') + 1)
                          $scope.invalidTypeOf=true;
                          inform.add('El archivo: '+file.name+' es de tipo invalido. ',{
                          ttl:4000, type: 'warning'
                          });
                          console.log(file.name + " with type "+file.type+" is not supported");
                          $("#uploadTicketBillingFile").val(null);
                      }
                  }
              //console.log($scope.fileListTmp);
              });
            }
          /**************************************
          *     PREVIEW IMAGE BEFORE UPLOAD     *
          **************************************/
            $scope.setPreviewPDFBeforeUploadFile = function (file){
              //console.info(file);
              $scope.invalidTypeOf=false;
              var reader = new FileReader();
                  reader.onload = function(event) {
                    var src = event.target.result;
                    $scope.$applyAsync(function($scope) {
                      var position = file.name.search(/_/);
                      if(position !== -1){
                        var ticketId = file.name.substr(0,position);
                        var positionExt = file.name.lastIndexOf('.')
                        var ticketNumb = file.name.substr((position+1),positionExt).replace(/\.[^/.]+$/, "");
                        if (Number.isInteger(Number(ticketId))){
                          console.info("the ticket id is "+ticketId);
                          ticketServices.ticketById(ticketId).then(function(response){
                            if(response.status==200){
                              $scope.rsData.ticket = (response.data[0]);
                              //console.log($scope.rsData);
                              ticketServices.billingFileUploaded(ticketId).then(function(response){
                                if(response.status==404){
                                  $scope.filesUploadList.push(file);
                                  $scope.fileList={'name':file.name,'size':file.size,'type':file.type,'src':src,'lastModified':file.lastModified, 'uploadStatus':false, 'fileTitle':'', 'ticketFound':true, 'idTicketKf':$scope.tkupdate.idTicket};
                                  //$scope.fileList.push({'name':file.name,'size':file.size,'type':file.type,'src':src,'lastModified':file.lastModified, 'uploadStatus':false, 'fileTitle':'', 'ticketFound':true, 'idTicketKf':ticketId});
                                }else if (response.status==200){
                                  inform.add('[Info]: La factura del pedido '+ticketNumb+' ya se encuentra cargada, contacta el area de soporte. ',{
                                    ttl:5000, type: 'info'
                                    });
                                }
                              });
                            }else if (response.status==404){
                                inform.add('[Error]: El Numero de pedido '+ticketNumb+' no ha sido encontrado o el archivo no cumple con la nomenclatura esperada, contacta el area de soporte. ',{
                                  ttl:5000, type: 'danger'
                                  });
                              }
                          });
                        }else{
                          console.info("the ticket id is not a number");
                          inform.add('[Error]: El archivo '+file.name+' no cumple con la nomenclatura esperada intenta de nuevo o contacta el area de soporte. ',{
                            ttl:5000, type: 'danger'
                            });
                        }
                      }else{
                        inform.add('[Error]: El archivo '+file.name+' no cumple con la nomenclatura esperada intenta de nuevo o contacta el area de soporte. ',{
                          ttl:5000, type: 'danger'
                        });
                      }
                    });
                    //console.log($scope.fileList);
                    $scope.openPDFModalViewer(event.target.result)
                  }
                  reader.readAsDataURL(file);
                  $("#uploadTicketBillingFile").val(null);

            }
          /**************************************
          *               PDF VIEWER            *
          **************************************/
            $scope.openPDFModalViewer = function (obj) {
              $('#pdfUploadModal').modal('show');
              $('#pdfUploadModal').on('shown.bs.modal', function () {
                PDFObject.embed(obj, "#pdfObjectViewer");
              });

            }
          /**************************************
          *             PDF VIEWER  2           *
          **************************************/
          $scope.openPDFViewerModal = function (obj) {
            $('#pdfViewerModal').modal('show');
            $('#pdfViewerModal').on('shown.bs.modal', function () {
              PDFObject.embed(obj, "#pdfobject");
            });

          }
          /**************************************
          *     LOAD XLS FILES TO UPLOAD        *
          **************************************/
            $scope.loadMultipleFilesFn = function(e) {
              $scope.isUploadSingleFile = false;
              $scope.fileListTmp=[];
              $scope.fileList=[];
              $scope.filesUploadList = [];
              //console.log(e);
              //console.log(e.files);
              //console.log("Amount of Files: "+ e.files.length);
              var list = e;
              $scope.$apply(function($scope) {
              for(var i=0;i<list.files.length;i++){
                file = list.files[i];
                var fileName=file.name.replace(/ /g,"_");
                var type =  '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
                if('|pdf|'.indexOf(type) !== -1){
                  var cleanFile = new File([file], fileName, {type: file.type, lastModified: file.lastModified, size: file.size});
                  //console.log(cleanFile);
                  $scope.fileListTmp.push(cleanFile);
                }else{
                    $scope.fileName=file.name;
                    $scope.fileTypeOf=file.type.slice(file.type.lastIndexOf('/') + 1)
                    $scope.invalidTypeOf=true;
                    inform.add('El archivo: '+file.name+' es de tipo invalido. ',{
                      ttl:4000, type: 'warning'
                    });
                    console.log(file.name + " with type "+file.type+" is not supported");
                  $("#uploadBillingTicketfiles").val(null);
                  $("#uploadBillingTicketfiles2").val(null);
                }
              }
              //console.log($scope.fileListTmp);
              $scope.processFileListFn();
              });
            }
          /**************************************
          *   PROCESS FILE LIST TO SET PREVIEW  *
          **************************************/
            $scope.processFileListFn = function(){
              for(var i=0;i<$scope.fileListTmp.length;i++){
                var file = $scope.fileListTmp[i];
                if ($scope.fileList.length>0){
                    for (var key in $scope.fileList){
                      if ($scope.fileList[key].name==file.name && $scope.fileList[key].type==file.type){
                          inform.add('El archivo: '+file.name+' ya se encuentra en la lista. ',{
                            ttl:4000, type: 'warning'
                          });
                          $scope.isFileExist=true;
                          $("#uploadBillingTicketfiles").val(null);
                          $("#uploadBillingTicketfiles2").val(null);
                        break;
                      }else{
                          console.log("File isn't loaded already!!")
                          $scope.isFileExist=false;
                      }
                    }
                }else{
                  $scope.isFileExist=false;
                }
                if (!$scope.isFileExist){
                  $scope.setPreviewBeforeUploadFile(file);
                  $scope.invalidTypeOf=false;
                }
              }
            }
          /**************************************
          *     PREVIEW FILE BEFORE UPLOAD      *
          **************************************/
            $scope.setPreviewBeforeUploadFile = function (file){
              //console.info(file);
              $scope.invalidTypeOf=false;
              var reader = new FileReader();
                  reader.onload = function(event) {
                      var src = event.target.result;
                      $scope.$applyAsync(function($scope) {
                        var position = file.name.search(/_/);
                        if(position !== -1){
                          var ticketId = file.name.substr(0,position);
                          var positionExt = file.name.lastIndexOf('.')
                          var ticketNumb = file.name.substr((position+1),positionExt).replace(/\.[^/.]+$/, "");
                          if (Number.isInteger(Number(ticketId))){
                            console.info("the ticket id is "+ticketId);
                            ticketServices.ticketById(ticketId).then(function(response){
                              if(response.status==200){
                                $scope.rsData.ticket = (response.data[0]);
                                //console.log($scope.rsData);
                                ticketServices.billingFileUploaded(ticketId).then(function(response){
                                  if(response.status==404){
                                    $scope.filesUploadList.push(file);
                                    $scope.fileList.push({'name':file.name,'size':file.size,'type':file.type,'src':src,'lastModified':file.lastModified, 'uploadStatus':false, 'fileTitle':'', 'ticketFound':true, 'idTicketKf':ticketId});
                                    $('#attachBillingTicketFiles').modal('show');
                                    $('#attachBillingTicketFiles').on('shown.bs.modal', function () {
                                    });
                                  }else if (response.status==200){
                                    inform.add('[Info]: La factura del pedido '+ticketNumb+' ya se encuentra cargada, contacta el area de soporte. ',{
                                      ttl:5000, type: 'info'
                                      });
                                  }
                                });
                              }else if (response.status==404){
                                  inform.add('[Error]: El Numero de pedido '+ticketNumb+' no ha sido encontrado o el archivo no cumple con la nomenclatura esperada, contacta el area de soporte. ',{
                                    ttl:5000, type: 'danger'
                                    });
                                }
                            });
                          }else{
                            console.info("the ticket id is not a number");
                            inform.add('[Error]: El archivo '+file.name+' no cumple con la nomenclatura esperada intenta de nuevo o contacta el area de soporte. ',{
                              ttl:5000, type: 'danger'
                              });
                          }
                        }else{
                          inform.add('[Error]: El archivo '+file.name+' no cumple con la nomenclatura esperada intenta de nuevo o contacta el area de soporte. ',{
                            ttl:5000, type: 'danger'
                          });
                        }
                      });
                      //console.log($scope.fileList);
                  }
                  reader.readAsDataURL(file);
                  $("#uploadBillingTicketfiles").val(null);
                  $("#uploadBillingTicketfiles2").val(null);

            }
          /**************************************
          *       PREVIEW XLS BEFORE UPLOAD     *
          **************************************/
            $scope.setPreviewXLSBeforeUploadFile = function (file){
                  //console.info(file);
                  $scope.invalidTypeOf=false;
                  var reader = new FileReader();
                      reader.onload = function(e) {
                          var src = event.target.result;
                          var data = "";
                          var bytes = new Uint8Array(e.target.result);
                          for (var i = 0; i < bytes.byteLength; i++) {
                            data += String.fromCharCode(bytes[i]);
                          }
                          $scope.ProcessExcel(data)
                      }
                      reader.readAsArrayBuffer(file);
                      //$("#uploadCustomerfiles").val(null);

            }

            $scope.ProcessExcel = function (data) {
                //Read the Excel File data.
                var workbook = XLSX.read(data, {
                    type: 'binary'
                });

                //Fetch the name of First Sheet.
                var firstSheet = workbook.SheetNames[0];

                //Read all rows from First Sheet into an JSON array.
                var excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]);

                //Display the data from Excel file in Table.
                $scope.$apply(function () {
                    $scope.Customers = excelRows;
                    console.log($scope.Customers);
                    $scope.IsVisible = true;
                });
            };
          /**************************************
          *          UPLOAD SINGLE FILE         *
          **************************************/
            $scope.uploadSingleFile = function(item){
              //console.log(item);
              //console.log($scope.filesUploadList);
              for (var key in $scope.filesUploadList){
                console.log("item.name :"+item.name)
                console.log("item.type :"+item.type)
                console.log("$scope.filesUploadList[key].name :"+$scope.filesUploadList[key].name)
                console.log("$scope.filesUploadList[key].type :"+$scope.filesUploadList[key].type)
                if ($scope.filesUploadList[key].size==item.size && $scope.filesUploadList[key].lastModified==item.lastModified && $scope.filesUploadList[key].type==item.type){
                  console.log($scope.filesUploadList[key]);
                  var file      =  $scope.filesUploadList[key];
                  $scope.uploadFilesFn(file, item.idTicketKf, item);
                  break;
                }
              }
              //SEND DATA TO THE UPLOAD SERimportTicketfilesVICE

              //blockUI.start('');
              //$timeout(function() {
              //  blockUI.message('Actualizando listado de clientes.');
              //}, 1000);
              //$timeout(function() {
              //  $scope.switchCustomersFn('dashboard','', 'registered')
              //  blockUI.stop();
              //}, 1500);
            }
          /**************************************
          *            UPLOAD FILES             *
          **************************************/
            $scope.uploadFilesFn = function(file, idTicketKf, item){
              $scope.uploadTicketData={};
              //console.log(file);
              //console.log(idTicketKf);
              //console.log(item);
              ticketServices.uploadTicketFiles(file, idTicketKf).then(function(rsupload){
                //console.log(rsupload);
                if(rsupload.status==200){
                  $scope.uploadTicketData.idTicketKf = rsupload.data.idTicketKf;
                  $scope.uploadTicketData.urlFile    = rsupload.data.dir+rsupload.data.filename;
                  $scope.uploadTicketData.name       = rsupload.data.filename;
                  $scope.uploadTicketData.type       = rsupload.data.type;
                  $scope.uploadTicketData.history    = [];
                  $scope.uploadTicketData.history.push({'idUserKf': $scope.sysLoggedUser.idUser, 'descripcion': null, 'idCambiosTicketKf':"20"});
                  //console.log($scope.uploadTicketData);
                  ticketServices.addUploadedTicketFile($scope.uploadTicketData).then(function(response){
                    if(response.status==200){
                      ticketServices.setIsBillingUploaded($scope.uploadTicketData.idTicketKf, 1).then(function(rsBillingUploaded){
                        if(rsBillingUploaded.status==200){
                          var fileName=item.fileTitle==''?item.name:item.fileTitle;
                          inform.add('Archivo '+fileName+' subido satisfactoriamente. ',{
                                ttl:2000, type: 'success'
                          });
                          item.uploadStatus=true;
                          if ($scope.isUploadSingleFile){
                            $('#pdfUploadModal').modal('hide');
                            $scope.mainSwitchFn('search', null);
                            $scope.openTicketFn($scope.uploadTicketData.idTicketKf);
                          }
                        }
                      });
                    }else if(response.status==404){
                    console.log("not found, contact administrator");
                    inform.add('Error: [404] Contacta al area de soporte. ',{
                          ttl:20000, type: 'danger'
                    });
                    //$('#RegisterModalCustomer').modal('hide');
                    }else if(response.status==500){
                      console.log("file uploaded not added into the db, contact administrator");
                      inform.add('Error: [500] Contacta al area de soporte. ',{
                            ttl:20000, type: 'danger'
                      });
                      item.uploadStatus=null;
                      //$('#RegisterModalCustomer').modal('hide');
                    }
                  });
                }else if(response.status==404){
                  inform.add('Error: [404] Ocurrio un error al subir el archivo '+fileName+' Contacta al area de soporte. ',{
                    ttl:20000, type: 'danger'
                  });
                }else if(response.status==500){
                  inform.add('Error: [500][uploadTicketFiles] Ocurrio un error en el servidor, Contacta al area de soporte. ',{
                    ttl:20000, type: 'danger'
                  });
                }
              });
            }
          /**************************************
          *          UPLOAD ALL FILES           *
          **************************************/
            $scope.uploadAllFiles_old = function(fileList){
              console.log(fileList);
              console.log(fileList.length);
              console.log($scope.filesUploadList);
              for (var item in fileList){
                //console.log(fileList[item]);

                if (fileList[item].uploadStatus==false){
                  for (var key in $scope.filesUploadList){
                    if ($scope.filesUploadList[key].name==fileList[item].name && $scope.filesUploadList[key].type==fileList[item].type){
                        fileList[item].obj    =  $scope.filesUploadList[key];
                        fileList[item].isReady = true;
                        //var fileTitle  =  fileList[item].fileTitle==''?'':fileList[item].fileTitle.replace(/ /g,"_");;
                      //SEND DATA TO THE UPLOAD SERVICE
                      //console.log("=====================================================");
                      //console.log(file)
                      //console.log(fileList[item].idTicketKf)
                      //console.log(fileList[item])
                      //console.log("=====================================================");
                      //$scope.uploadFilesFn(file, fileList[item].idTicketKf, fileList[item]);
                    }
                  }
                }
                //console.log(fileList);
              }
              var assignedFiles = [];
              angular.forEach(fileList,function(file){
                var deferredFiles = $q.defer();
                assignedFiles.push(deferredFiles.promise);
                //ASSIGN DEPARTMENT SERVICE
                $timeout(function() {
                  deferredFiles.resolve();
                  ticketServices.uploadTicketFiles(file.obj, file.idTicketKf).then(function(rsupload){
                    if(rsupload.status==200){
                      $scope.uploadTicketData={};
                      $scope.uploadTicketData.idTicketKf = rsupload.data.idTicketKf;
                      $scope.uploadTicketData.urlFile    = rsupload.data.dir+rsupload.data.filename;
                      $scope.uploadTicketData.name       = rsupload.data.filename;
                      $scope.uploadTicketData.type       = rsupload.data.type;
                      $scope.uploadTicketData.history    = [];
                      $scope.uploadTicketData.history.push({'idUserKf': $scope.sysLoggedUser.idUser, 'descripcion': null, 'idCambiosTicketKf':"20"});
                      //console.log($scope.uploadTicketData);
                      ticketServices.addUploadedTicketFile($scope.uploadTicketData).then(function(response){
                          if(response.status==200){
                            ticketServices.setIsBillingUploaded($scope.uploadTicketData.idTicketKf, 1).then(function(rsBillingUploaded){
                              if(rsBillingUploaded.status==200){
                                var fileName=item.fileTitle==''?item.name:item.fileTitle;
                                inform.add('Archivo '+fileName+' subido satisfactoriamente. ',{
                                      ttl:2000, type: 'success'
                                });
                                file.uploadStatus=true;
                              }
                            });
                          }else if(response.status==404){
                            console.log("not found, contact administrator");
                            inform.add('Error: [404] Contacta al area de soporte. ',{
                                  ttl:20000, type: 'danger'
                            });
                            //$('#RegisterModalCustomer').modal('hide');
                          }else if(response.status==500){
                            console.log("file uploaded not added into the db, contact administrator");
                            inform.add('Error: [500] Contacta al area de soporte. ',{
                                  ttl:20000, type: 'danger'
                            });
                            item.uploadStatus=null;
                            //$('#RegisterModalCustomer').modal('hide');
                          }
                        });
                      }else if(response.status==404){
                        inform.add('Error: [404] Ocurrio un error al subir el archivo '+fileName+' Contacta al area de soporte. ',{
                          ttl:20000, type: 'danger'
                        });
                      }else if(response.status==500){
                        inform.add('Error: [500][uploadTicketFiles] Ocurrio un error en el servidor, Contacta al area de soporte. ',{
                          ttl:20000, type: 'danger'
                        });
                      }
                    });
                }, 1000);
            });
              $q.all(assignedFiles).then(function () {
                console.log(fileList);
              });
              //blockUI.start('');
              //$timeout(function() {
              //  blockUI.message('Actualizando listado de pedidos.');
              //}, 1000);
              //$timeout(function() {
              //  //$scope.switchCustomersFn('dashboard','', 'registered')
              //  blockUI.stop();
              //}, 1500);
            }
            $scope.uploadAllFiles = function(fileList) {
              console.log(fileList);

              let assignedFiles = [];

              angular.forEach(fileList, function(file) {
                  if (file.uploadStatus) return; // Skip already uploaded files

                  // Find matching file object in filesUploadList
                  let fileObj = $scope.filesUploadList.find(f => f.name === file.name && f.type === file.type);
                  if (!fileObj) {
                      console.log("File object not found:", file.name);
                      return;
                  }

                  file.obj = fileObj;
                  file.isReady = true;

                  let deferredFiles = $q.defer();
                  assignedFiles.push(deferredFiles.promise);

                  // Upload File
                  ticketServices.uploadTicketFiles(file.obj, file.idTicketKf)
                      .then(rsupload => {
                          if (rsupload.status !== 200) {
                              throw { status: rsupload.status, message: "File upload failed" };
                          }

                          // 🟢 Create a new object per file (avoids overwriting issues)
                          let uploadTicketData = {
                              idTicketKf: rsupload.data.idTicketKf,
                              urlFile: rsupload.data.dir + rsupload.data.filename,
                              name: rsupload.data.filename,
                              type: rsupload.data.type,
                              history: [{
                                  idUserKf: $scope.sysLoggedUser.idUser,
                                  descripcion: null,
                                  idCambiosTicketKf: "20"
                              }]
                          };

                          // Add uploaded file to DB
                          return ticketServices.addUploadedTicketFile(uploadTicketData)
                              .then(response => ({ response, uploadTicketData })); // Pass the data along
                      })
                      .then(({ response, uploadTicketData }) => {
                          if (response.status !== 200) {
                              throw { status: response.status, message: "Error adding file to DB" };
                          }

                          // Mark as billing uploaded (Uses correct `uploadTicketData`)
                          return ticketServices.setIsBillingUploaded(uploadTicketData.idTicketKf, 1);
                      })
                      .then(rsBillingUploaded => {
                          if (rsBillingUploaded.status !== 200) {
                              throw { status: rsBillingUploaded.status, message: "Billing upload failed" };
                          }

                          let fileName = file.fileTitle ? file.fileTitle : file.name;
                          inform.add('Archivo ' + fileName + ' subido satisfactoriamente.', {
                              ttl: 2000, type: 'success'
                          });

                          file.uploadStatus = true;
                          deferredFiles.resolve(); // Resolve after success
                      })
                      .catch(error => {
                          console.error("Upload error:", error);

                          let errorMessage = `[${error.status}] Ocurrió un error en el servidor. Contacta al área de soporte.`;
                          inform.add(errorMessage, { ttl: 20000, type: 'danger' });

                          file.uploadStatus = null;
                          deferredFiles.reject(error);
                      });
              });

              // Wait for all uploads to complete
              $q.all(assignedFiles).then(() => {
                  console.log("All uploads complete", fileList);
              });
            };

          /**************************************
          *          REMOVE SINGLE FILE         *
          **************************************/
            $scope.removeSingleFile = function(index, obj){
              //console.log(index);
              $scope.filesUploadList.splice(index, 1);
              $scope.fileList.splice(index, 1);
                inform.add("Archivo: "+obj.name+" ha sido removido correctamente.",{
                  ttl:5000, type: 'success'
                });
            }
          /**************************************
          *            REMOVE FILE LIST         *
          **************************************/
            $scope.clearFilesQueue = function(opt){
              $scope.filesUploadList=[];
              $scope.fileList=[];
              if(opt==null || opt==undefined){
                inform.add("Todos los archivos han sido removidos de la lista correctamente.",{
                  ttl:5000, type: 'success'
                });
              }
            }
          /**************************************
          *          DELETE SINGLE FILE         *
          **************************************/
            $scope.deleteSingleFile = function(file){
              var idTicket = $scope.tkupdate.idTicket;
              //SEND DATA TO THE DELETE FILE SERVICE
              $scope.deleteFilesFn(file);
              blockUI.start('');
              $timeout(function() {
                blockUI.message('Actualizando listado de pedidos.');
                blockUI.stop();
              }, 1000);
            }
          /**************************************
          *           DELETED FILES             *
          **************************************/
            $scope.deleteFilesFn = function(file){
              $scope.removeTicketData={};
              //console.log(item);
              ticketServices.deleteTicketFiles(file.title).then(function(rsdeletedFile){
                //console.log(rsdeletedFile);
                if(rsdeletedFile.status==200){
                  $scope.removeTicketData.idTicketFiles = file.idTicketFiles;
                  $scope.removeTicketData.idTicketKf    = file.idTicketKf;
                  $scope.removeTicketData.urlFile       = file.urlFile;
                  $scope.removeTicketData.name          = file.title;
                  $scope.removeTicketData.type          = file.typeFile;
                  $scope.removeTicketData.history       = [];
                  $scope.removeTicketData.history.push({'idUserKf': $scope.sysLoggedUser.idUser, 'descripcion': null, 'idCambiosTicketKf':"21"});
                  console.log($scope.removeTicketData);
                  ticketServices.deleteUploadedTicketFile($scope.removeTicketData).then(function(response){
                    if(response.status==200){
                      ticketServices.setIsBillingUploaded($scope.removeTicketData.idTicketKf, null).then(function(rsBillingRemoved){
                        if(rsBillingRemoved.status==200){
                          inform.add('Archivo '+ $scope.removeTicketData.name+' eliminado satisfactoriamente. ',{
                                ttl:2000, type: 'success'
                          });
                          $scope.mainSwitchFn('search', null);
                          $scope.openTicketFn($scope.removeTicketData.idTicketKf);
                        }
                      });
                    }else if(response.status==404){
                    console.log("not found, contact administrator");
                    inform.add('Error: [404] Contacta al area de soporte. ',{
                          ttl:20000, type: 'danger'
                    });
                    //$('#RegisterModalCustomer').modal('hide');
                    }else if(response.status==500){
                      console.log("file deleted not removed into the db, contact administrator");
                      inform.add('Error: [500] Contacta al area de soporte. ',{
                            ttl:20000, type: 'danger'
                      });
                      item.uploadStatus=null;
                      //$('#RegisterModalCustomer').modal('hide');
                    }
                  });
                }else if(rsdeletedFile.status==404){
                  inform.add('Error: [404] Ocurrio un error al eliminar el archivo '+fileName+' Contacta al area de soporte. ',{
                    ttl:20000, type: 'danger'
                  });
                }else if(rsdeletedFile.status==500){
                  inform.add('Error: [500][uploadTicketFiles] Ocurrio un error en el servidor, Contacta al area de soporte. ',{
                    ttl:20000, type: 'danger'
                  });
                }
              });
            }
          /**************************************
          *             DOWNLOAD FILE           *
          **************************************/
            $scope.downloadFile = function (obj) {
              var a = document.createElement('a');
              a.href = obj.urlFile;
              a.download = obj.title;
              a.click();
              a.remove();
            };


        /*******************************************************
        *                                                      *
        *     ROUTE PARAMETERS FOR APPROVAL TICKET & DEPTO     *
        *                                                      *
        *******************************************************/
        $scope.sysRouteParams = undefined;
        $scope.sysRouteParams = tokenSystem.getTokenStorage(8);
        if ($scope.sysRouteParams && $scope.sysRouteParams!=undefined){
            console.log("===========================================");
            console.log("    Parameters for Approval received       ");
            console.log("===========================================");
            console.log($scope.sysRouteParams);
            $scope.approval = {'ticket':'', 'department':'', 'user':''};
            var decodeToken = atob($scope.sysRouteParams.secureToken);
            var idTicket = decodeToken.split(":", 1);
            $scope.mainSwitchFn("getTicket", idTicket);
            $timeout(function() {
                if ($scope.tkupdate.idTicket==undefined || ($scope.tkupdate.idStatusTicketKf!='2' && $scope.tkupdate.idStatusTicketKf!='9' && $scope.tkupdate.idStatusTicketKf!='11')){
                    $scope.approval = undefined;
                }
                $scope.sysContent                         = 'approval';
                console.log($scope.tkupdate);
                console.log($scope.approval);
            }, 1500);


        }else{
            $scope.sysRouteParams = undefined;
        }
});
