/**
* Monitor Controller
**/
var monitor = angular.module("module.Monitor", ["tokenSystem", "services.Ticket", "services.Address",  "services.Customers", "angular.filter"]);

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
monitor.controller('MonitorCtrl', function($scope, $http, $location, $routeParams, $q, blockUI, $timeout, inform, ticketServices, addressServices, CustomerServices, tokenSystem, $window, $filter, serverHost, serverBackend, serverHeaders, APP_SYS){
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
    *              GET STATUS TICKET LIST             *
    *                                                 *
    **************************************************/
      $scope.getTicketStatusTypeListFn = function(){
        ticketServices.getTicketStatusTypeList().then(function(response){
          if(response.status==200){
                  $scope.listStatusTicket = response.data;
          }else if (response.status==404){
              inform.add('Ocurrio un error, contacte al area de soporte de TASS.',{
                  ttl:3000, type: 'danger'
              });
                  $scope.listStatusTicket = undefined;
          }else if (response.status==500){
              inform.add('Ocurrio un error, contacte al area de soporte de TASS.',{
              ttl:3000, type: 'danger'
              });
              $scope.listStatusTicket = undefined;
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
           /**************************************************
           *                                                 *
           *                 DELIVERY TICKET                 *
           *                                                 *
           **************************************************/
           console.log("DELIVERY TICKET OPEN");
           $scope.delivery.idTypeDeliveryKf=null;
           $scope.select.whoPickUp         =null;
           $('#UpdateModalDelivery').modal('show');
         break;
         case 2:
           $scope.sysCheckTicketBeforeCancelFn($scope.tkupdate.idTicket);
         break;
       }
     }

   /**************************************************
   *                                                 *
   *                  APROBAR TICKET                 *
   *                                                 *
   **************************************************/
     $scope.sysApproveTicketFn = function(ticketID, idUser){
       console.clear();
         ticketServices.approvedTicket(ticketID, idUser).then(function(data){
          $scope.ticketResult = data;
           if($scope.ticketResult){
             console.log("TICKET APPROVED SUCCESSFULLY");
             inform.add('Ticket ha sido aprobado satisfactoriamente.',{
               ttl:3000, type: 'success'
             });
             $scope.dhboard();
           }else{
             inform.add('Ticket no ha sido aprobado conctate el area de soporte.',{
               ttl:3000, type: 'warning'
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
    /**************************************************
    *                                                 *
    *            TICKETS MONITOR FUNCTION             *
    *                                                 *
    **************************************************/
      $scope.monitor={'filters':{},'update':{},'edit':{}};
      $scope.monitor.filter={'idUserRequestBy':'', 'idUserMadeBy':'', 'idBuildingKf':'', 'idClientAdminFk':'', 'idClientCompaniFk':'', 'idClientBranchFk':'', 'topfilter':'', 'idTypeTicketKf':'', 'idStatusTicketKf':'', 'codTicket':'', 'idTypePaymentKf':'', 'idTypeDeliveryKf':''};
      $scope.mainSwitchFn = function(opt, obj){
        switch (opt){
            case "dashboard":
              $scope.getDeliveryTypesFn();
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
                  $scope.monitor.filter.topfilter              = $scope.filters.topDH;
                  $scope.listTickets($scope.monitor.filter);
                break;
                case "4":
                  $scope.isHomeSelected=false;
                  $scope.getLisOfCustomersByIdFn($scope.sysLoggedUser.company[0]);
                  $scope.filters.topDH="10";
                  $scope.monitor.filter.idClientAdminFk   = $scope.sysLoggedUser.company[0].idClient;
                  $scope.monitor.filter.topfilter           = $scope.filters.topDH;
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
                      $scope.listTickets($scope.monitor.filter);
                    break;
                    case "2":
                      $scope.filters.topDH="10";
                      $scope.getAddressByidTenantFn($scope.sysLoggedUser.idUser, $scope.sysLoggedUser.idTypeTenantKf, -1);

                      $scope.monitor.filter.idUserRequestBy        = $scope.sysLoggedUser.idUser;
                      $scope.monitor.filter.topfilter              = $scope.filters.topDH;
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
                  $scope.monitor.filter.idBuildingKf           = $scope.filterAddressKf.selected!=undefined?$scope.filterAddressKf.selected.idClient:"";
                  $scope.monitor.filter.topfilter              = $scope.filters.topDH;
                  $scope.monitor.filter.idTypeTicketKf         = !$scope.filters.typeTicket?"":$scope.filters.typeTicket.idTypeTicket;
                  $scope.monitor.filter.idStatusTicketKf       = !$scope.filters.ticketStatus?"":$scope.filters.ticketStatus.idStatus;
                  $scope.monitor.filter.idTypeDeliveryKf       = !$scope.filters.typDelivery?"":$scope.filters.typDelivery.idTypeDelivery;
                  $scope.monitor.filter.idTypePaymentKf        = !$scope.filters.paymentsType?"":$scope.filters.paymentsType.id;
                  console.log($scope.monitor.filter);
                  console.log($scope.filters);
                  $scope.listTickets($scope.monitor.filter);
                break;
                case "4":
                  $scope.monitor.filter.idBuildingKf           = $scope.filterAddressKf.selected!=undefined?$scope.filterAddressKf.selected.idClient:"";
                  $scope.monitor.filter.idClientAdminFk      = $scope.sysLoggedUser.company[0].idClient;
                  $scope.monitor.filter.topfilter              = $scope.filters.topDH;
                  $scope.monitor.filter.idTypeTicketKf         = !$scope.filters.typeTicket?"":$scope.filters.typeTicket.idTypeTicket;
                  $scope.monitor.filter.idStatusTicketKf       = !$scope.filters.ticketStatus?"":$scope.filters.ticketStatus.idStatus;
                  $scope.monitor.filter.idTypeDeliveryKf       = !$scope.filters.typDelivery?"":$scope.filters.typDelivery.idTypeDelivery;
                  $scope.monitor.filter.idTypePaymentKf        = !$scope.filters.paymentsType?"":$scope.filters.paymentsType.id;
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
                      console.log($scope.monitor.filter);
                      console.log($scope.filters);
                      $scope.listTickets($scope.monitor.filter);
                    break;
                  }
                break;
              }
            break;
        }
      }
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
              $scope.listTickt =  "";
              $scope.totalTickets = 0;
          }else if (response.status==500){
              inform.add('Ocurrio un error, contacte al area de soporte de TASS.',{
              ttl:3000, type: 'danger'
              });
              $scope.listTickt =  "";
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