/**
* Monitor Controller
**/
var monitor = angular.module("module.Monitor", ["tokenSystem", "services.Ticket", "angular.filter"]);
/**************************************************
*                                                 *
*          DATE FILTER FOR MYSQL TIMESTAMP        *
*                                                 *
**************************************************/
  monitor.filter('dateToISO', function() {
  return function(input) {
    input = new Date(input).toISOString();
    return input;
  }
});
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
monitor.controller('MonitorCtrl', function($scope, $http, $location, $routeParams, blockUI, $timeout, inform, ticketServices, tokenSystem, $window, $filter, serverHost, serverBackend, serverHeaders, APP_SYS){
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
       ticketServices.ticketByToken(obj.urlToken);
       //console.log(obj);
       $scope.editComment=false;
       ticketServices.ticketById($scope.tkupdate.idTicket).then(function(data){
           $scope.rsData.ticket = (data[0]);
             //console.log($scope.rsData);
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

    $scope.dhboard = function(){
    /**********CHECK IF THERE ARE TMP DELIVERY OR CANCEL DATA APPROVED TO APPLY TO THE TICKETS ***********/
    $scope.sysChkChangeOrCancel(0);
    $scope.sysChkChangeOrCancel(1);        
    /******************************
    *                             *
    *       FILTER VARIABLES      *
    *                             *
    ******************************/
    //$scope.filters.idTypeTicketKf= !$scope.filters.idTypeTicketKf ? 0 : $scope.filters.idTypeTicketKf;
    //$scope.dh.filterAddress = 0;
    
    $scope.filters.idAddress   = ($scope.sysLoggedUser.idProfileKf==1 && (!$scope.filterCompanyKf.selected || !$scope.filterAddressKf.selected)) || (($scope.sysLoggedUser.idProfileKf!=1)  && !$scope.filterAddressKf.selected) ? "" : $scope.filterAddressKf.selected.idAdress;
    $scope.dh.filterAddress    = $scope.filters.idAddress;
    $scope.dh.filterSearch     = $scope.filters.searchFilter;
    $scope.dh.filterTop        = $scope.filters.topDH;
    $scope.dh.filterProfile    = $scope.sysLoggedUser.idProfileKf;
    $scope.dh.filterTenantKf   = $scope.sysLoggedUser.idProfileKf==5 || ($scope.sysLoggedUser.idProfileKf==6 && $scope.sysLoggedUser.idTypeTenantKf==2) ? $scope.sessionIdUser :'';
    if(($scope.sysLoggedUser.idProfileKf!=2  && $scope.sysLoggedUser.idProfileKf!=5) || ($scope.sysLoggedUser.idTypeTenantKf==6 && $scope.sysLoggedUser.idTypeTenantKf==1)){
        $scope.filters.idCompany   = !$scope.filterCompanyKf.selected? "" : $scope.filterCompanyKf.selected.idCompany;
    }
    $scope.dh.filterCompany    = $scope.sysLoggedUser.idProfileKf == 2 || $scope.sysLoggedUser.idProfileKf == 4 ? $scope.sessionidCompany : $scope.filters.idCompany;
    $scope.dh.filterTypeTicket = !$scope.filters.typeTicket?"":$scope.filters.typeTicket.idTypeTicket;
    $scope.dh.filterStatus     = !$scope.filters.ticketStatus?"":$scope.filters.ticketStatus.idStatus;
    $scope.dh.filterOwnerKf    = $scope.sysLoggedUser.idProfileKf==3?$scope.sessionIdUser:'';
    $scope.dh.filterIdUser     = $scope.sysLoggedUser.idProfileKf!=1 && $scope.sysLoggedUser.idProfileKf!=2 && $scope.sysLoggedUser.idProfileKf!=4?$scope.sessionIdUser:'';
    $scope.dh.filterIdAtt      = ($scope.sysLoggedUser.idProfileKf==6 && $scope.sysLoggedUser.idTypeTenantKf==1) || ($scope.sysLoggedUser.idProfileKf==6 && $scope.sysLoggedUser.idTypeTenantKf==2)?$scope.sessionIdUser:'';
    //console.log($scope.dh);
        $searchFilter= 
        {
            idUser            : $scope.dh.filterIdUser,
            idOWnerKf           : $scope.dh.filterOwnerKf,
            searchFilter        : $scope.dh.filterSearch,
            topFilter           : $scope.dh.filterTop, 
            idProfileKf         : $scope.dh.filterProfile,
            idUserTenantKf      : $scope.dh.filterTenantKf,
            idUserAttendantKf   : $scope.dh.filterIdAtt, 
            idCompanyKf         : $scope.dh.filterCompany,
            idTypeTicketKf      : $scope.dh.filterTypeTicket,
            idAdress            : $scope.dh.filterAddress,
            idStatusTicketKf    : $scope.dh.filterStatus
        }
        //console.log($scope.sessionIdUser);   
        // N° de pedido EASY : 5420689
        //console.log($searchFilter);
        //ticketServices.checkTicketBeforeCancel(ticketID).then(function(data){});
        $http.post(serverHost+serverBackend+"Ticket/all", $searchFilter,serverHeaders)
        .then(function (sucess, data) {
                $scope.listTickt =  sucess.data.response;
                $scope.totalTickets = $scope.listTickt.length;
        },function (error, data,status) {
            if(error.status == 203 || error.status == 404){
                console.log("Error Codigo["+error.status+"] - "+error.data.error);
                $scope.listTickt =  "";
                $scope.totalTickets = 0;
            }else if(error.status==500){
                console.log("505: Internal Server Error")
                //console.log(error.data.error);
                $scope.listTickt =  "";
                $scope.totalTickets = 0;
            }
            if($scope.counterInformShow==1){
                inform.add('['+error.status+']: '+error.data.error,{
                        ttl:5000, type: 'warning'
                });
            }
            $scope.counterInformShow=1;
        });
    }

    $scope.greaterThan = function(prop, val){
        return function(item){
        if (item[prop] > val) return true;
        }
    }
    $scope.differentThan = function(prop, val){
        return function(item){
        if (item[prop] != val) return true;
        }
    }
});