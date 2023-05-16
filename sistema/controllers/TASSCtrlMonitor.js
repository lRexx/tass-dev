/**
* Monitor Controller
**/
var monitor = angular.module("module.Monitor", ["tokenSystem", "services.Ticket", "services.Address", "services.Ticket",  "services.Utilities", "services.Customers", "angular.filter", "services.User"]);

/*************************************************/
monitor.filter('commaToDecimal', function(){
    return function(value) {
        return value ? parseFloat(value).toFixed(2).toString().replace('.', ',') : null;
    };
});
monitor.filter('startFrom', function () {
  return function (input, start) {
    if (input) {
      start = +start;
      return input.slice(start);
    }
    return [];
  };
});
monitor.filter('toDate', function() {
  return function(items) {
    return new Date(items);
  };
});
monitor.controller('MonitorCtrl', function($scope, $http, $location, $routeParams, $q, blockUI, $timeout, inform, ticketServices, serviceServices, UtilitiesServices, addressServices, userServices, CustomerServices, tokenSystem, $window, $filter, serverHost, serverBackend, serverHeaders, APP_SYS){
  console.log(APP_SYS.app_name+" Modulo monitor pedidos");
    //console.log($scope.sysLoggedUser)
    //console.log($scope.sysToken)
    if (!$scope.sysToken || !$scope.sysLoggedUser ){
      $location.path("/login");
    }
    $scope.filterAddressKf = {'selected':undefined};
    $scope.filterCompanyKf = {'selected':undefined};
      $scope.listTickt = 0;
      $scope.filters={typeTicket: '', topDH: '', searchFilter:'', idCompany: '', idAddress: '', ticketStatus: ''};
      $scope.dh = {'filterAddress': '', 'filterSearch': '', 'filterTop': '', 'filterProfile':'', 'filterTenantKf':''};
      $scope.ticket = {'administration':undefined, 'building':undefined, 'idClientDepartament':undefined, 'radioButtonDepartment':undefined, 'radioButtonBuilding':undefined, 'optionTypeSelected': {}, 'userRequestBy':{}, 'userNotify':null, 'keys':[], 'delivery':{'idTypeDeliveryKf':null, 'whoPickUp':null, 'zone':{}, 'thirdPerson':null, 'deliveryTo':{}, 'otherAddress':undefined}, 'cost':{'keys':0, 'delivery':0, 'service':0, 'total':0}};
      $scope.getCostByCustomer={'rate':{'idCustomer':null, 'idServiceType':null, 'idServiceTechnician':null}};
      $scope.costs={'keys':{'cost':0, 'manual':false}, 'delivery':{'cost':0, 'manual':false}, 'service':{'cost':0, 'manual':false}, 'total':0};
      $scope.keyTotalAllowed=4000;
      $scope.deliveryCostFree=0;
      $scope.update={'ticket':{}};

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

      /**************************************************
      *                                                 *
      *                 MODAL CONFIRMATION              *
      *                                                 *
      **************************************************/
        $scope.argObj={};
        $scope.modalConfirmation = function(opt, confirm, obj){
          $scope.swMenu = opt;
          $scope.vConfirm = confirm;
          $scope.mess2show="";
          $scope.messAction="";
          //console.log("$scope.swMenu: "+$scope.swMenu);
          switch ($scope.swMenu){
              case "closeWindow":
                  if (confirm==0){
                      if ($scope.isNewUser==true){
                        $scope.mess2show="Se perderan todos los datos cargados del registro actual, esta seguro que desea cancelar?";
                      }else{
                        $scope.mess2show="Se perderan todas las modificaciones realizadas en el registro actual, esta seguro que desea cancelar la modificacion?";
                      }
                      $("#confirmRequestModal").modal('show');
                  }else if (confirm==1){
                      $("#confirmRequestModal").modal('hide');
                      $("#RegisterUser").modal('hide');
                      $("#newSysProfile").modal('hide');
                      $("#updateSysProfile").modal('hide');
                      $("#UpdateUser").modal('hide');
                      if ($scope.sysContentList=="users" && ($scope.isNewUser==true || $scope.isUpdateUser==true)){
                        $scope.refreshList();
                      }else if ($scope.isNewProfileRole==true || $scope.isUpdateProfileRole==true){
                        $scope.getSysProfilesFn("");
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
              case "approve":
                if (confirm==0){
                      $scope.mess2show="El Pedido ["+obj.codTicket+"] sera Aprobado,     Confirmar?";
                      $scope.argObj = obj;
                      console.log('El Pedido '+obj.codTicket+' ID: '+obj.idTicket+' Sera Aprobado por el usuario: '+$scope.sysLoggedUser.fullNameUser);
                      console.log("============================================================================")
                      //console.log($scope.argObj);
                      $('#confirmRequestModal').modal('toggle');
                }else if (confirm==1){
                  $scope.mainSwitchFn('ticket_approve', $scope.argObj);
                  $('#confirmRequestModal').modal('hide');
                  //console.log($scope.argObj);
                  //$scope.sysApproveTicketFn(tk.idTicket, sessionIdUser);
                }
              break;
              case "cancel_user":
                if (confirm==0){
                  $scope.mess2show="Solicitud de cancelacion del Pedido ["+obj.codTicket+"],     Confirmar?";
                  $scope.argObj = obj;
                  console.log('Solicitud de cancelacion del Pedido '+obj.codTicket+' ID: '+obj.idTicket+' solicitado por el usuario: '+$scope.sysLoggedUser.fullNameUser);
                  console.log("============================================================================")
                  console.log($scope.argObj);
                  $('#confirmRequestModal').modal('toggle');
                }else if (confirm==1){
                  $('#confirmRequestModal').modal('hide');
                  $scope.mainSwitchFn('ticket_request_cancel', $scope.argObj, null)
                  //$scope.sysApproveTicketFn(tk.idTicket, sessionIdUser);
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
                  //$scope.sysApproveTicketFn(tk.idTicket, sessionIdUser);
                }
              break;
              case "cancel_sys":
                if (confirm==0){
                  $scope.mess2show="El Pedido ["+obj.codTicket+"] sera cancelado,     Confirmar?";
                  $scope.argObj = obj;
                  console.log('El Ticket '+obj.codTicket+' ID: '+obj.idTicket+' Sera Cancelado por el usuario: '+$scope.sysLoggedUser.fullNameUser);
                  console.log("============================================================================")
                  console.log($scope.argObj);
                  $('#confirmRequestModal').modal('toggle');
                }else if (confirm==1){
                  $('#confirmRequestModal').modal('hide');
                  //$scope.mainSwitchFn('ticket_cancel', $scope.argObj, null)
                  //$scope.sysApproveTicketFn(tk.idTicket, sessionIdUser);
                }
              break;
              case "apply_ticket_delivery_change":
                if (confirm==0){
                      $scope.mess2show="El Metodo de envio del pedido ["+obj.selected.codTicket+"] sera modificado, Esta seguro que desea realizar el cambio, Confirmar?";
                      $scope.argObj = obj;
                      console.log('El Metodo de envio del pedido '+obj.selected.codTicket+' ID: '+obj.selected.idTicket+' Solicitado por el usuario: '+$scope.sysLoggedUser.fullNameUser);
                      console.log("============================================================================")
                      console.log($scope.argObj);
                      $('#confirmRequestModal').modal('toggle');
                }else if (confirm==1){
                    $scope.mainSwitchFn('apply_ticket_delivery_change', $scope.argObj);
                    $('#confirmRequestModal').modal('hide');
                    //console.log($scope.argObj);
                    //$scope.sysApproveTicketFn(tk.idTicket, sessionIdUser);
                }
              break;
              case "change_ticket_status":
                if (confirm==0){
                      $scope.mess2show="El estado del pedido ["+obj.codTicket+"] sera modificado, Esta seguro que desea realizar el cambio, Confirmar?";
                      $scope.argObj = obj;
                      console.log('El estado del pedido '+obj.codTicket+' ID: '+obj.idTicket+' Solicitado por el usuario: '+$scope.sysLoggedUser.fullNameUser);
                      console.log("============================================================================")
                      console.log($scope.argObj);
                      $('#confirmRequestModal').modal('toggle');
                }else if (confirm==1){
                    $scope.mainSwitchFn('apply_change_ticket_status', $scope.argObj);
                    $('#confirmRequestModal').modal('hide');
                    //console.log($scope.argObj);
                    //$scope.sysApproveTicketFn(tk.idTicket, sessionIdUser);
                }
              break;
              case "closeModalRequestStatus":
                $('.circle-loader').toggleClass('load-complete');
                $('.checkmark').toggle();
                $('#showModalRequestStatus').modal('hide');
                $scope.ticketRegistered=null;
              break;
              default:
          }
        }
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
                inform.add('El consorcio no presenta costos de servicios asociados, contacte al area de soporte de TASS.',{
                    ttl:3000, type: 'warning'
                });
                $scope.customerCosts=false;
                $scope.ticket.cost.service = 0;
            }else if (response.status==500){
                inform.add('Ocurrio un error, contacte al area de soporte de TASS.',{
                ttl:3000, type: 'danger'
                });
                $scope.ticket.cost.service = 0;
                $scope.customerCosts=false;
            }
        });
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
      $scope.getTicketStatusTypeListFn = function(){
        ticketServices.getTicketStatusTypeList().then(function(response){
          if(response.status==200){
                  $scope.listStatusTicket       = response.data;
                  $scope.listStatusTicketChange = response.data;
          }else if (response.status==404){
              inform.add('Ocurrio un error, contacte al area de soporte de TASS.',{
                  ttl:3000, type: 'danger'
              });
                  $scope.listStatusTicket       = null;
                  $scope.listStatusTicketChange = null;
          }else if (response.status==500){
              inform.add('Ocurrio un error, contacte al area de soporte de TASS.',{
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
            inform.add('Ocurrio un error, contacte al area de soporte de TASS.',{
                ttl:3000, type: 'danger'
            });
                $scope.listTypeTicket = undefined;
        }else if (response.status==500){
            inform.add('Ocurrio un error, contacte al area de soporte de TASS.',{
            ttl:3000, type: 'danger'
            });
            $scope.listTypeTicket = undefined;
        }
      });
    };$scope.getTypeTicketListFn();
    /**************************************************
    *                                                 *
    *                  OPEN A TICKET                  *
    *                                                 *
    **************************************************/
     $scope.tkupdate = {};
     $scope.tktmporal = {};
     $scope.rsData = {};
     $scope.openTicketFn = function(obj, option){
       $scope.tkupdate  = obj;
       $scope.tktmporal = obj;
       //ticketServices.ticketByToken(obj.urlToken);
       //console.log(obj);
       $scope.editComment=false;
       ticketServices.ticketById($scope.tkupdate.idTicket).then(function(data){
           $scope.rsData.ticket = (data[0]);
             console.log($scope.rsData);
       });
       switch(option){
         case 0:
           $('#UpdateModalTicket').modal('show');
         break;
         case 1:
          $scope.getDeliveryTypesFn();
           /**************************************************
           *                                                 *
           *                 DELIVERY TICKET                 *
           *                                                 *
           **************************************************/
           console.log("DELIVERY TICKET OPEN");
           $scope.delivery={'idTypeDeliveryKf':null};
           $scope.select={'whoPickUp':null};
           $('#UpdateModalDelivery').modal('show');
         break;
         case 2:
           $scope.sysCheckTicketBeforeCancelFn($scope.tkupdate.idTicket);
         break;
       }
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
                  inform.add('No hay tipos de deliverys registrados, contacte al area de soporte de TASS.',{
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
   *                  APROBAR TICKET                 *
   *                                                 *
   **************************************************/
      $scope.data={'ticket':{'idTicket': null,'history': []}};
      $scope.sysApproveTicketFn = function(ticket){
        console.clear();
        $scope.data={'ticket':{'idTicket': null, 'idTypePaymentKf':null, 'history': []}};
        $scope.data.ticket.idTicket         = ticket.idTicket;
        $scope.data.ticket.idTypePaymentKf  = ticket.idTypePaymentKf;
        $scope.data.ticket.history.push({'idUserKf': $scope.sysLoggedUser.idUser, 'idTicketKf': ticket.idTicket, 'descripcion': null, 'idCambiosTicketKf':"2"});
        if (ticket.idTypePaymentKf=="1"){
          $scope.data.ticket.history.push({'idUserKf': $scope.sysLoggedUser.idUser, 'idTicketKf': ticket.idTicket, 'descripcion': null, 'idCambiosTicketKf':"13"});
        }else{
          $scope.data.ticket.history.push({'idUserKf': $scope.sysLoggedUser.idUser, 'idTicketKf': ticket.idTicket, 'descripcion': null, 'idCambiosTicketKf':"5"});
        }
        
        console.log($scope.data);
          ticketServices.approvedTicket($scope.data).then(function(response){
            console.log(response);
            if(response.status==200){
              console.log("TICKET APPROVED SUCCESSFULLY");
                inform.add('Ticket ha sido aprobado satisfactoriamente.',{
                  ttl:3000, type: 'success'
                });
                if (ticket.idTypePaymentKf=="2"){
                  $scope.mpCreateLinkFn(ticket);
                }
                  $scope.mainSwitchFn('dashboard', null);
              }else if(response.status==500){
                  $scope.ticketRegistered = null;
                console.log("Ticket Approval has failed, contact administrator");
                inform.add('Error: [500] Contacta al area de soporte. ',{
                      ttl:5000, type: 'danger'
                });
              }
          });
      }

   /**************************************************
   *                                                 *
   *           REQUEST CANCELLATION TICKET           *
   *                                                 *
   **************************************************/
    $scope.data={'ticket':{'idTicket': null,'history': []}};
    $scope.sysRequestCancellationTicketFn = function(ticket){
      console.clear();
      $scope.data={'ticket':{'idTicket': null,'history': []}};
      $scope.data.ticket.idTicket = ticket.idTicket;
      $scope.data.ticket.history.push({'idUserKf': $scope.sysLoggedUser.idUser, 'idTicketKf': ticket.idTicket, 'descripcion': null, 'idCambiosTicketKf':"8"});
      console.log($scope.data);
        ticketServices.requestCancelTicket($scope.data).then(function(response){
          console.log(response);
          if(response.status==200){
            console.log("CANCELLATION REQUEST CREATED SUCCESSFULLY");
              inform.add('La solicitud de cancelación del pedido N°: '+ticket.codTicket+' ha sido registrada satisfactoriamente.',{
                ttl:3000, type: 'success'
              });
              $scope.mainSwitchFn('dashboard', null);
            }else if(response.status==500){
                $scope.ticketRegistered = null;
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
        $scope.data={'ticket':{'idTicket': null,'history': []}};
        $scope.sysRejectRequestCancellationTicketFn = function(ticket){
          console.clear();
          $scope.data={'ticket':{'idTicket': null,'history': []}};
          $scope.data.ticket.idTicket = ticket.idTicket;
          $scope.data.ticket.history.push({'idUserKf': $scope.sysLoggedUser.idUser, 'idTicketKf': ticket.idTicket, 'descripcion': null, 'idCambiosTicketKf':"14"});
          console.log($scope.data);
            ticketServices.rejectRequestCancelTicket($scope.data).then(function(response){
              console.log(response);
              if(response.status==200){
                console.log("CANCELLATION REQUEST REJECTED SUCCESSFULLY");
                  inform.add('La solicitud de cancelación del pedido N°: '+ticket.codTicket+' ha sido rechazada.',{
                    ttl:3000, type: 'success'
                  });
                  $scope.mainSwitchFn('dashboard', null);
                }else if(response.status==500){
                    $scope.ticketRegistered = null;
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
          console.clear();
          ticketServices.cancelTicket(data).then(function(data){
            $scope.ticketResult = data;
            if($scope.ticketResult){
              console.log("TICKET CANCELED SUCCESSFULLY");
              inform.add('Ticket ha sido cancelado satisfactoriamente.',{
                ttl:3000, type: 'success'
              });
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
    *                   UPDATE TICKET                 *
    *                                                 *
    **************************************************/
      var isTotalHasChange = false;
      $scope.sysUpdateTicketFn = function(ticketID){
        console.clear();
        var updateTotalService = $scope.tkupdate.totalService;
        console.log("[sysUpdateTicketFn] -> updateTotalService: "+updateTotalService);
            if ($scope.delivery.idTypeDeliveryKf==1){
              isTotalHasChange = true;
              $scope.tkupdate.typeDelivery              ="RETIRO POR OFICINA";
              $scope.tkupdate.idUserAttendantKfDelivery = null;
              $scope.tkupdate.nameAttendantDelivery     = "";
              updateTotalService -=$scope.tkupdate.priceShipping;
              $scope.tkupdate.totalService = Number(updateTotalService);
            }else if($scope.delivery.idTypeDeliveryKf==2 && $scope.select.whoPickUp!=3){
              console.log("[sysUpdateTicketFn] -> $scope.deliveryAtt.fullNameUser: "+$scope.deliveryAtt.fullNameUser);
              $scope.tkupdate.typeDelivery              ="ENTREGA EN EL EDIFICIO";
              $scope.tkupdate.totalGestion              = 0;
              $scope.tkupdate.totalLlave                = 0;
              $scope.tkupdate.totalEnvio                = 0;
              $scope.tkupdate.totalService              = (isTotalHasChange==true || isTotalHasChange==false) && $scope.rsData.ticket.idTypeDeliveryKf!=$scope.delivery.idTypeDeliveryKf ? Number(updateTotalService)+Number($scope.tkupdate.priceShipping):updateTotalService;
              $scope.tkupdate.idUserAttendantKfDelivery = $scope.delivery.nameAtt;
              $scope.tkupdate.nameAttendantDelivery     = $scope.deliveryAtt.fullNameUser;
              isTotalHasChange = false;
            }

            /* THIRD PERSON FIELDS */
            $scope.tkupdate.idUserAttendantKfDelivery   = $scope.select.whoPickUp!=3?$scope.delivery.nameAtt:null;
            $scope.tkupdate.thirdPersonNames            = $scope.select.whoPickUp==3?$scope.third.names:null;
            $scope.tkupdate.thirdPersonPhone            = $scope.select.whoPickUp==3?$scope.third.movilPhone:null;
            $scope.tkupdate.thirdPersonId               = $scope.select.whoPickUp==3?$scope.third.dni:null;
            $scope.tkupdate.idTypeDeliveryKf            = $scope.delivery.idTypeDeliveryKf;
            $scope.tkupdate.idWhoPickUpKf               = $scope.select.whoPickUp;

            //$scope.tkupdate.idAdressKf                = !$scope.tkupdate.idAdressKf ? $scope.tkupdate.idAdress : $scope.tkupdate.idAdressKf;
            //$scope.tkupdate.idCompanyKf               = !$scope.tkupdate.idCompanyKf ? $scope.tkupdate.idCompany : $scope.tkupdate.idCompanyKf;
            //$scope.sendTicketData2Update($http, $scope);
            if (($scope.tkupdate.idStatusTicketKf==2 || $scope.tkupdate.idStatusTicketKf==3) && ($scope.tkupdate.SA_NRO_ORDER<=0 || $scope.tkupdate.SA_NRO_ORDER==null || !$scope.tkupdate.SA_NRO_ORDER)){
              console.log("UPDATING THE DELIVERY DATA");
              $scope.sendTicketData2Update($http, $scope);
            }else{
              console.log("ADDING TEMP DELIVERY DATA");
              $scope.sysTempDelivCancelDataFn(1);
            }
            
      }

      $scope.sendTicketData2Update = function($http, $scope){
            /* ASSIGN THE VALUES TO THE ROWS AFFECTED TO SAVE */

            $scope.rsData.ticket.totalService              = $scope.tkupdate.totalService;
            $scope.rsData.ticket.idUserAttendantKfDelivery = $scope.tkupdate.idUserAttendantKfDelivery;
            $scope.rsData.ticket.thirdPersonNames          = $scope.tkupdate.thirdPersonNames ;
            $scope.rsData.ticket.thirdPersonPhone          = $scope.tkupdate.thirdPersonPhone ;
            $scope.rsData.ticket.thirdPersonId             = $scope.tkupdate.thirdPersonId    ;
            $scope.rsData.ticket.idTypeDeliveryKf          = $scope.tkupdate.idTypeDeliveryKf ;
            $scope.rsData.ticket.idAdressKf                = $scope.tkupdate.idAdressKf       ;
            $scope.rsData.ticket.idCompanyKf               = $scope.tkupdate.idCompanyKf      ;
            $scope.rsData.ticket.idWhoPickUpKf             = $scope.tkupdate.idWhoPickUpKf    ;
            $scope.rsData.ticket.idUserHasChangeTicket     = $scope.sessionIdUser;
            /* PRINT THE ARRAY BEFORE UPDATE */
            //console.log($scope.rsData);
          ticketServices.updateTicket($scope.rsData).then(function(data){
          $scope.ticketResult = data;
            if($scope.ticketResult){
              console.log("TICKET UPDATED SUCCESSFULLY");
              inform.add('Ticket ha sido actualizado satisfactoriamente.',{
                ttl:3000, type: 'success'
              });
              $('#UpdateModalDelivery').modal('hide');
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
              if($scope.filterAddressKf.selected){$scope.filterAddressKf.selected=undefined;}
            break; 
            case 2:
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
                  inform.add('No hay tipos de deliverys registrados, contacte al area de soporte de TASS.',{
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
                  inform.add('No hay tipos de Pagos registrados, contacte al area de soporte de TASS.',{
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
                  inform.add('El consorcio no presenta costos de servicios asociados, contacte al area de soporte de TASS.',{
                      ttl:3000, type: 'warning'
                  });
                  $scope.customerCosts=false;
                  $scope.ticket.cost.service = 0;
              }else if (response.status==500){
                  inform.add('Ocurrio un error, contacte al area de soporte de TASS.',{
                  ttl:3000, type: 'danger'
                  });
                  $scope.ticket.cost.service = 0;
                  $scope.customerCosts=false;
              }
          });
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
    *                  GET LOCATION                   *
    *                   LOCAL API                     *
    *                                                 *
    **************************************************/
        $scope.rsLocations_Data = {};
        $scope.getLocationByIdFn = function(idProvince){
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
            inform.add('No hay Consorcios o Sucursales asociadas a la ('+obj.ClientType+') - '+obj.name+' , contacte al area de soporte de TASS.',{
              ttl:5000, type: 'info'
              });
          }
        });
      };
      $scope.onSelectCallback = function(){
        $scope.mainSwitchFn('search', null);
      }
    /******************************
    *   CREATING MP PAYMENT LINK  *
    ******************************/
      $scope.mp={'link':{}, 'payment':{}, 'data':{}}; 
      $scope.mpCreateLinkFn = function(obj){
        console.log("---------------------------------------");
        console.log("CREAR LINK DE PAGO PARA MERCADOPAGO");
        console.log("---------------------------------------");
        console.log("[New MP Payment Link]");
        $scope.mp.link={'new':{'data':{}},'url':null}; //codTicket
        $scope.mp.link.new.data={'idPago': null,'monto':  null,'linkDeNotificacion':  null,'back_url':  null};
        $scope.mp.link.new.data.idTicket            = obj.idTicket;
        $scope.mp.link.new.data.ticket_number       = obj.codTicket;
        $scope.mp.link.new.data.monto               = Number(parseInt(obj.total));
        $scope.mp.link.new.data.linkDeNotificacion  = "https://devtass.sytes.net/Back/index.php/MercadoLibre/getNotificationOfMP";
        $scope.mp.link.new.data.back_url            = "https://devtass.sytes.net/monitor";
        $scope.mp.link.new.data.description         = obj.typeticket.TypeTicketName;
        $scope.mp.link.new.data.quantity            = obj.keys.length;
        console.log($scope.mp.link);
        ticketServices.createMPLink($scope.mp.link.new).then(function(response){
            //console.log(response);
            if(response.status==200){
                console.log("Request Successfully Created");
                inform.add('Link de pago generado satisfactoriamente. ',{
                      ttl:5000, type: 'success'
                });
                console.log(response);
                //$scope.mp.link.url  = response.data[0].data.response.sandbox_init_point;
                //$scope.mp.data      = response.data[0].data.response;
                $scope.addPaymentFn(response.data[0].data.response);
            }else if(response.status==500){
                $scope.ticketRegistered = null;
              console.log("MP Payment Link not Created, contact administrator");
              inform.add('Error: [500] Contacta al area de soporte. ',{
                    ttl:5000, type: 'danger'
              });
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
                  $scope.mainSwitchFn('dashboard', null);
              }else if(response.status==500){
                  $scope.addPaymentDetailsFn = null;
                  console.log("Payment request has failed, contact administrator");
                  inform.add('Error: [500] Contacta al area de soporte. ',{
                          ttl:5000, type: 'danger'
                  });
              }
          });
        };
    /**************************************************
    *                                                 *
    *            TICKETS MONITOR FUNCTION             *
    *                                                 *
    **************************************************/
     
      $scope.monitor={'filters':{},'update':{},'edit':{}};
      $scope.monitor.filter={'idUserRequestBy':'', 'idUserMadeBy':'', 'idBuildingKf':'', 'idClientAdminFk':'', 'idClientCompaniFk':'', 'idClientBranchFk':'', 'topfilter':'', 'idTypeTicketKf':'', 'idStatusTicketKf':'', 'codTicket':'', 'idTypePaymentKf':'', 'idTypeDeliveryKf':''};
      $scope.mainSwitchFn = function(opt, obj, obj2){
        switch (opt){
            case "dashboard":
              $scope.getDeliveryTypesFn_filter();
              $scope.getPaymentsTypeFn();
              switch ($scope.sysLoggedUser.idProfileKf){
                case "1":
                    $scope.listCompany=[];
                    var listCompany=[];
                    //GET ADMIN CUSTOMERS
                    $scope.globalGetCustomerListFn(null,"0",1,"","",null).then(function(data) {
                      angular.forEach(data.customers,function(admins){
                        var deferredAdmins = $q.defer();
                        listCompany.push(admins);
                        deferredAdmins.resolve();
                      });
                    });
                    $q.all(listCompany).then(function () {
                      //console.log(listCompany);
                    });
                    //GET COMPANY CUSTOMERS
                    $scope.globalGetCustomerListFn(null,"0",3,"","",null).then(function(data) {
                      angular.forEach(data.customers,function(company){
                        var deferredCompany = $q.defer();
                        listCompany.push(company);
                        deferredCompany.resolve();
                      });
                    });
                    $q.all(listCompany).then(function () {
                      $scope.listCompany = listCompany;
                      //console.log($scope.listCompany);
                    });
                  $scope.filters.topDH="10";
                  $scope.monitor.filter.idProfileKf       = $scope.sysLoggedUser.idProfileKf;
                  $scope.monitor.filter.topfilter         = $scope.filters.topDH;
                  $scope.listTickets($scope.monitor.filter);
                break;
                case "4":
                  $scope.isHomeSelected=false;
                  $scope.getLisOfCustomersByIdFn($scope.sysLoggedUser.company[0]);
                  $scope.filters.topDH="10";
                  $scope.monitor.filter.idClientAdminFk   = $scope.sysLoggedUser.company[0].idClient;
                  $scope.monitor.filter.topfilter         = $scope.filters.topDH;
                  $scope.monitor.filter.idProfileKf       = $scope.sysLoggedUser.idProfileKf;
                  $scope.monitor.filter.idTypeTenantKf    = $scope.sysLoggedUser.idTypeTenantKf;
                  $scope.monitor.filter.idDepartmentKf    = $scope.sysLoggedUser.idTypeTenantKf=="2"?$scope.sysLoggedUser.idDepartmentKf:"";
                  $scope.monitor.filter.isHomeSelected    = $scope.isHomeSelected;
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
                      $scope.listTickets($scope.monitor.filter);
                    break;
                  }
                break;
              }
            break;
            case "search":
              switch ($scope.sysLoggedUser.idProfileKf){
                case "1":
                  $scope.monitor.filter.idClientAdminFk        = $scope.filterCompanyKf.selected!=undefined && $scope.filterCompanyKf.selected.idClientTypeFk=="1"?$scope.filterCompanyKf.selected.idClient:"";
                  $scope.monitor.filter.idClientCompaniFk      = $scope.filterCompanyKf.selected!=undefined && $scope.filterCompanyKf.selected.idClientTypeFk=="3"?$scope.filterCompanyKf.selected.idClient:"";
                  $scope.monitor.filter.idBuildingKf           = $scope.filterAddressKf.selected!=undefined && $scope.filterCompanyKf.selected.idClientTypeFk=="1"?$scope.filterAddressKf.selected.idClient:"";
                  $scope.monitor.filter.idClientBranchFk       = $scope.filterAddressKf.selected!=undefined && $scope.filterCompanyKf.selected.idClientTypeFk=="3"?$scope.filterAddressKf.selected.idClient:"";
                  $scope.monitor.filter.topfilter              = $scope.filters.topDH;
                  $scope.monitor.filter.idProfileKf            = $scope.sysLoggedUser.idProfileKf;
                  $scope.monitor.filter.idTypeTicketKf         = !$scope.filters.typeTicket?"":$scope.filters.typeTicket.idTypeTicket;
                  $scope.monitor.filter.idStatusTicketKf       = !$scope.filters.ticketStatus?"":$scope.filters.ticketStatus.idStatus;
                  $scope.monitor.filter.idTypeDeliveryKf       = !$scope.filters.typDelivery?"":$scope.filters.typDelivery.idTypeDelivery;
                  $scope.monitor.filter.idTypePaymentKf        = !$scope.filters.paymentsType?"":$scope.filters.paymentsType.id;
                  $scope.monitor.filter.codTicket              = $scope.filters.searchFilter;
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
                  $scope.monitor.filter.codTicket              = $scope.filters.searchFilter;
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
                      $scope.listTickets($scope.monitor.filter);
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
                      $scope.listTickets($scope.monitor.filter);
                    break;
                  }
                break;
              }
            break;
            case "ticket_keyList":
              $scope.showKeyDoors = false;
              $scope.ticketKeyList = null;
              $scope.ticketKeyDoorList = null;
              $scope.ticketKeyList = obj;
              console.log($scope.ticketKeyList);
              $('#ticketKeysModalDetails').modal('show');
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
              $scope.list_keys                                    = $scope.ticket.selected.keys;
              $scope.getDeliveryTypesFn();
              $scope.getAttendantListFn(obj.building.idClient);
              $scope.getServiceCostByCustomerFn($scope.getCostByCustomer);
              $scope.mainSwitchFn('setWhoPickUpList', obj);
              var keyTotalAllowed        = Number($scope.keyTotalAllowed);
              var subTotalKeys           = Number($scope.ticket.selected.costKeys);
              console.log("Total key:"+subTotalKeys);
              console.log("Total key allowed:"+keyTotalAllowed);
              if (subTotalKeys>=keyTotalAllowed){
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
                  switch (obj.selected.idTypePaymentKf){
                    case "1":
                      if (obj.selected.idTypeDeliveryKf!=obj.delivery.idTypeDeliveryKf && obj.delivery.idTypeDeliveryKf=="1"){
                        $scope.update.ticket.refund = [];
                        $scope.update.ticket.history.push({'idUserKf': $scope.sysLoggedUser.idUser, 'descripcion': null, 'idCambiosTicketKf':"12"});
                        $scope.update.ticket.history.push({'idUserKf': "1", 'descripcion': null, 'idCambiosTicketKf':"16"});
                        $scope.update.ticket.refund.push({'idTicketKf': obj.selected.idTicket, 'idRefundTypeKf':'3', 'refundAmount':obj.selected.costDelivery});
                        inform.add('Se descontaran ($ '+obj.selected.costDelivery+') o se realizara un reintegro, del costo de envío de su pedido, Seguridad TASS.',{
                          ttl:6000, type: 'info'
                        });
                      }else if (obj.selected.idTypeDeliveryKf==obj.delivery.idTypeDeliveryKf && obj.selected.idDeliveryTo!=obj.delivery.idDeliveryTo && obj.cost.delivery!=undefined && obj.cost.delivery!=null && ($scope.costDelivery==null || $scope.costDelivery==0) && obj.cost.delivery>0){
                        $scope.update.ticket.history.push({'idUserKf': $scope.sysLoggedUser.idUser, 'descripcion': null, 'idCambiosTicketKf':"12"});
                        $scope.update.ticket.history.push({'idUserKf': "1", 'descripcion': null, 'idCambiosTicketKf':"17"});
                        inform.add('Se adicionaran ($ '+obj.cost.delivery+'), por concepto de envío, al costo total de su pedido, Seguridad TASS.',{
                          ttl:6000, type: 'warning'
                        });
                      }else if (obj.selected.idTypeDeliveryKf==obj.delivery.idTypeDeliveryKf && obj.selected.idDeliveryTo!=obj.delivery.idDeliveryTo && obj.cost.delivery!=undefined && obj.cost.delivery!=null && $scope.costDelivery!=null && $scope.costDelivery>0 && obj.cost.delivery>0 && obj.cost.delivery>$scope.costDelivery){
                        $scope.update.ticket.history.push({'idUserKf': $scope.sysLoggedUser.idUser, 'descripcion': null, 'idCambiosTicketKf':"12"});
                        $scope.update.ticket.history.push({'idUserKf': "1", 'descripcion': null, 'idCambiosTicketKf':"17"});
                        $scope.subTotalDelivery = 0;
                        $scope.subTotalDeliveryCharged = 0;
                        $scope.subTotalDeliveryCharged = Number(obj.cost.delivery)-Number($scope.costDelivery);
                        $scope.subTotalDelivery = Number(obj.cost.delivery);
                        inform.add('Se adicionaran ($ '+$scope.subTotalDeliveryCharged+') de diferencia, por concepto de envío, al costo total de su pedido, Seguridad TASS.',{
                          ttl:6000, type: 'warning'
                        });
                      }else if (obj.selected.idTypeDeliveryKf==obj.delivery.idTypeDeliveryKf && obj.selected.idDeliveryTo!=obj.delivery.idDeliveryTo && obj.cost.delivery!=undefined && obj.cost.delivery!=null && $scope.costDelivery!=null && $scope.costDelivery>0 && obj.cost.delivery>0 && obj.cost.delivery<$scope.costDelivery){
                        $scope.update.ticket.history.push({'idUserKf': $scope.sysLoggedUser.idUser, 'descripcion': null, 'idCambiosTicketKf':"12"});
                        $scope.update.ticket.refund = [];
                        
                        $scope.update.ticket.history.push({'idUserKf': "1", 'descripcion': null, 'idCambiosTicketKf':"15"});
                        $scope.subTotalRefunDelivery = 0;
                        $scope.subTotalDelivery = 0;
                        $scope.subTotalDelivery = Number(obj.cost.delivery);
                        $scope.subTotalRefunDelivery = Number($scope.costDelivery)-Number(obj.cost.delivery);
                        $scope.update.ticket.refund.push({'idTicketKf': obj.selected.idTicket, 'idRefundTypeKf':'3', 'refundAmount':$scope.subTotalRefunDelivery });
                        inform.add('Se realizara un reintegro de ($ '+$scope.subTotalRefunDelivery +'), del costo inicial de su pedido por concepto de envío, Seguridad TASS.',{
                          ttl:6000, type: 'info'
                        });
                      }else if (obj.selected.idTypeDeliveryKf==obj.delivery.idTypeDeliveryKf && obj.selected.idDeliveryTo==obj.delivery.idDeliveryTo && obj.cost.delivery==obj.selected.costDelivery){
                        $scope.update.ticket.history.push({'idUserKf': $scope.sysLoggedUser.idUser, 'descripcion': null, 'idCambiosTicketKf':"12"});
                        inform.add('No se registran costos adicionales, por concepto de envío, al costo total de su pedido, Seguridad TASS.',{
                          ttl:6000, type: 'info'
                        });
                      }else{
                        $scope.update.ticket.history.push({'idUserKf': $scope.sysLoggedUser.idUser, 'descripcion': null, 'idCambiosTicketKf':"12"});
                        inform.add('Felicidades el envío de su pedido es totalmente gratuito o se encuentra pago, Seguridad TASS.',{
                          ttl:6000, type: 'success'
                        });
                      }
                    break;
                    case "2":
                      if (obj.selected.idTypeDeliveryKf!=obj.delivery.idTypeDeliveryKf && obj.delivery.idTypeDeliveryKf=="1"){
                        if((obj.selected.paymentDetails!=undefined && obj.selected.paymentDetails!=null) && obj.selected.paymentDetails.mp_collection_status=='approved' && obj.selected.paymentDetails.mp_status_detail=='accredited'){
                          $scope.update.ticket.refund = [];
                          $scope.update.ticket.refund.push({'idTicketKf': obj.selected.idTicket, 'idRefundTypeKf':'3', 'refundAmount':obj.selected.costDelivery});
                          $scope.update.ticket.history.push({'idUserKf': $scope.sysLoggedUser.idUser, 'descripcion': null, 'idCambiosTicketKf':"12"});
                          $scope.update.ticket.history.push({'idUserKf': "1", 'descripcion': null, 'idCambiosTicketKf':"15"});
                          inform.add('Se realizara un reintegro de ($ '+obj.selected.costDelivery+'), del costo inicial de su pedido, Seguridad TASS.',{
                            ttl:6000, type: 'info'
                          });
                        }else{
                          $scope.update.ticket.history.push({'idUserKf': $scope.sysLoggedUser.idUser, 'descripcion': null, 'idCambiosTicketKf':"12"});
                          $scope.update.ticket.history.push({'idUserKf': "1", 'descripcion': null, 'idCambiosTicketKf':"16"});
                          inform.add('Se descontaran ($ '+obj.selected.costDelivery+'), del costo inicial de su pedido, Seguridad TASS.',{
                            ttl:6000, type: 'info'
                          });
                          $scope.update.ticket.createNewMPLink = true;
                        }
                      }else if (obj.selected.idTypeDeliveryKf!=obj.delivery.idTypeDeliveryKf && obj.delivery.idTypeDeliveryKf=="2"){
                        $scope.update.ticket.history.push({'idUserKf': $scope.sysLoggedUser.idUser, 'descripcion': null, 'idCambiosTicketKf':"12"});
                        if((obj.selected.paymentDetails!=undefined && obj.selected.paymentDetails!=null) && obj.selected.paymentDetails.mp_collection_status=='approved' && obj.selected.paymentDetails.mp_status_detail=='accredited'){
                            console.info(obj.cost);
                          if (obj.cost.delivery!=undefined && obj.cost.delivery!=null && obj.cost.delivery>0){
                            //console.info(obj.cost);
                            $scope.update.ticket.history.push({'idUserKf': "1", 'descripcion': null, 'idCambiosTicketKf':"17"});
                            inform.add('Nuevo link de pago por el monto de ($ '+obj.cost.delivery+'), sera generado por concepto de envío de su pedido, Seguridad TASS.',{
                              ttl:6000, type: 'warning'
                            });
                            $scope.update.ticket.createNewMPLinkForDelivery = true;
                          }else{
                            inform.add('Felicidades el envío de su pedido es totalmente gratuito, Seguridad TASS.',{
                              ttl:6000, type: 'success'
                            });
                          }
                        }else {
                            $scope.update.ticket.history.push({'idUserKf': "1", 'descripcion': null, 'idCambiosTicketKf':"17"});
                            inform.add('Se adicionara monto de ($ '+obj.cost.delivery+'), por concepto de envío de su pedido, Seguridad TASS.',{
                              ttl:6000, type: 'warning'
                            });
                            $scope.update.ticket.createNewMPLink = true;
                        }
                      }
                    break;
                  }
                  if(obj.selected.idTypeRequestFor!="2" && obj.selected.idTypeRequestFor!="4"){
                    if (obj.delivery.idTypeDeliveryKf=="1"){
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
                  $scope.update.ticket.costDelivery           = $scope.subTotalDelivery;
                  $scope.update.ticket.total                  = obj.cost.total;
                  $scope.update.ticket.isDeliveryHasChanged   = obj.selected.idTypeDeliveryKf!=obj.delivery.idTypeDeliveryKf?1:null;
                  //console.log($scope.update);
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
              $scope.sysApproveTicketFn(obj);
            break;
            case "ticket_request_cancel":
              console.log(obj);
              $scope.sysRequestCancellationTicketFn(obj);
            break;
            case "ticket_reject_request_cancel":
              console.log(obj);
              $scope.sysRejectRequestCancellationTicketFn(obj);
            break;
            case "change_ticket_status":
              console.log(obj);
              $scope.ticket = obj;
              $('#changeModalStatus').modal({backdrop: 'static', keyboard: false});
            break;
            case "apply_change_ticket_status":
              $scope.update.ticket.idTicket      = obj.idTicket
              $scope.update.ticket.idNewStatusKf = obj.newTicketStatus.idStatus;
              $scope.update.ticket.history       = [];
              $scope.update.ticket.history.push({'idUserKf': $scope.sysLoggedUser.idUser, 'descripcion': null, 'idCambiosTicketKf':"9"});
              $('#changeModalStatus').modal('hide');
              $('#showModalRequestStatus').modal({backdrop: 'static', keyboard: false});
              console.log($scope.update);
              $timeout(function() {
                $scope.changeTicketStatusRequestFn($scope.update);
              }, 2000);
              
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
                            $('#third_address_streetName').focus();
                            
                        }else{
                            $('#RegisterThirdPerson').modal({backdrop: 'static', keyboard: true});
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
                      inform.add('El envio a la localidad seleccionada tendra un recargo extra, contacta al area de soporte de tass.',{
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
                $scope.mp.link.new.data.linkDeNotificacion    = "https://devtass.sytes.net/Back/index.php/MercadoLibre/getNotificationOfMP";
                $scope.mp.link.new.data.back_url              = "https://devtass.sytes.net/monitor";
                $scope.mp.link.new.data.description           = obj.typeticket.TypeTicketName;
                $scope.mp.link.new.data.quantity              = obj.keys.length;
                $scope.mp.link.new.data.idPayment             = obj.idPaymentKf!=null || obj.idPaymentKf!=undefined?obj.idPaymentKf:null;
                $scope.mp.link.new.data.metadata.paymentFor   = obj.createNewMPLinkForDelivery?3:1;
                console.log($scope.mp.link);
                $scope.mpCreateLinkFn($scope.mp.link.new);                  
            break;
        }
      }
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
                      $scope.ticketRegistered = response.data.response[0];
                      response.data.response[0].createNewMPLinkForDelivery=pedido.ticket.createNewMPLinkForDelivery;
                    }, 2500);
                    if((pedido.ticket.createNewMPLink || pedido.ticket.createNewMPLinkForDelivery) && response.data.response[0].idTypePaymentKf=="2"){
                      $timeout(function() {
                          $scope.mainSwitchFn("linkMP",response.data.response[0],null);
                      }, 2700);
                    }else{
                      $scope.mainSwitchFn('dashboard', null);
                    }
                    
                  }else if(response.status==500){
                      $scope.ticketRegistered = null;
                    console.log("Ticketnot updated, contact administrator");
                    inform.add('Error: [500] Contacta al area de soporte. ',{
                          ttl:5000, type: 'danger'
                    });
                    $scope.mainSwitchFn('dashboard', null);
                  }
                  //$('#showModalRequestStatus').modal('hide');
              });
            };

          /******************************
          *   CREATING MP PAYMENT LINK  *
          ******************************/
            $scope.mpCreateLinkFn = function(data){
              ticketServices.createMPLink(data).then(function(response){
                  //console.log(response);
                  if(response.status==200){
                      console.log("Request Successfully Created");
                      inform.add('Link de pago generado satisfactoriamente. ',{
                            ttl:5000, type: 'success'
                      });
                      
                      $scope.mp.link.url                = response.data[0].data.response.sandbox_init_point;
                      $scope.mp.data                    = response.data[0].data.response;
                      console.log($scope.mp.data);
                      $scope.addPaymentFn(response.data[0].data.response);
                  }else if(response.status==500){
                      $scope.ticketRegistered = null;
                    console.log("MP Payment Link not Created, contact administrator");
                    inform.add('Error: [500] Contacta al area de soporte. ',{
                          ttl:5000, type: 'danger'
                    });
                    $scope.mainSwitchFn('dashboard', null);
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
                    $scope.mainSwitchFn('dashboard', null);
                });
            };
          /******************************
          *       UPDATE  REQUEST       *
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
                    $scope.ticketRegistered = response.data.response[0];
                  }, 2500);
                }else if(response.status==500){
                    $scope.ticketRegistered = null;
                  console.log("Status no updated, contact administrator");
                  inform.add('Error: [500] Contacta al area de soporte. ',{
                        ttl:5000, type: 'danger'
                  });
                }
                $scope.mainSwitchFn('dashboard', null);
                //$('#showModalRequestStatus').modal('hide');
            });
          };

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
                //console.log($searchFilter);
                ticketServices.all(filter).then(function(response){
                  if(response.status==200){
                      $scope.listTickt    =  response.data.response;
                      $scope.totalTickets = $scope.listTickt.length;
                  }else if (response.status==404){
                      inform.add('No se encontraron resultados verifique el filtro seleccionado o contacte al soporte de TASS.',{
                          ttl:3000, type: 'info'
                      });
                      $scope.listTickt =  [];
                      $scope.totalTickets = 0;
                  }else if (response.status==500){
                      inform.add('Ocurrio un error, contacte al area de soporte de TASS.',{
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
            $scope.differentThan = function(item){
              //console.info(item);
              switch ($scope.sysLoggedUser.idTypeTenantKf){
                case "1":
                  return (item.idTypeTicket != "3" && item.idTypeTicket != "4");
                break;
                case "2":
                  return (item.idTypeTicket != "3" && item.idTypeTicket != "4");
                break;
              }
              
            }
});