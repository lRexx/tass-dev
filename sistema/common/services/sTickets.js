var moduleTicketrServices = angular.module("services.Ticket", ["tokenSystem", "services.User"]);

moduleTicketrServices.service("ticketServices", ['$http', 'tokenSystem', '$timeout', 'serverHost', 'serverBackend', 'serverHeaders', 
  function($http, tokenSystem, $timeout, serverHost, serverBackend, serverHeaders){
      var ticketResult=0;
      var rsJsonTicket = {};
      var checkResult =0;
      return {
          /* APPROVE TICKET */
          approvedTicket: function(ticketID, idUser) {
            var ticket2Approve=ticketID;
            var ticketApprovedBy = idUser;
            console.log("[Ticket Services] => Ticket a Aprobar: "+ticket2Approve);
            console.log("[Ticket Services] => Usuario que Aprueba: "+ticketApprovedBy);
              return $http({
                    method : "GET",
                    url : serverHost+serverBackend+"Ticket/aprobated/"+ticket2Approve+"/"+ticketApprovedBy
                  }).then(function mySuccess(response) {
                      ticketResult = 1;
                      return ticketResult;
                  },function myError(response) { 
                        if(!ticket2Approve){
                            checkResult = 0;
                        }
                    return checkResult;
            });   
          },
          /* REQUEST CANCEL TICKET */
          requestCancelTicket: function(ticketID) {
            var ticket2RequestCancel=ticketID;
            console.log("CANCELANDO TICKET");
            console.log("Ticket a Cancelar: "+ticket2RequestCancel);
              return $http({
                    method : "GET",
                    url : serverHost+serverBackend+"Ticket/requestCancel/"+ticket2RequestCancel
                  }).then(function mySuccess(response) {
                      ticketResult = 1;
                      return ticketResult;
                  },function myError(response) { 
                        if(!ticket2RequestCancel){
                            checkResult = 0;
                        }
                    return checkResult;
            });   
          },
          /* CANCEL TICKET */
          cancelTicket: function(ticket) {
              console.log("CANCELING TICKET");
              //console.log(ticket);
              return $http.post(serverHost+serverBackend+"Ticket/cancelTicket",ticket, serverHeaders)
                .then(function mySuccess(response) {
                      ticketResult = 1;
                      return ticketResult;
                  },function myError(response) { 
                      console.log(response.data); 
                      checkResult = 0;
                    return checkResult;
                  });   
          },
          /* UPDATE TMP DELIVERY DATA APPROVE TO TICKET */
          updateTmpTicket: function(ticket) {
              console.log("UPDATING TMP DELIVERY DATA TICKET");
              //console.log(ticket);
              return $http.post(serverHost+serverBackend+"Ticket/updateTmpTicket",ticket, serverHeaders)
                .then(function mySuccess(response) {
                      ticketResult = 1;
                      return ticketResult;
                  },function myError(response) { 
                      console.log(response.data); 
                      checkResult = 0;
                    return checkResult;
                  });   
          },
          /* NOTICE THAT A CHANGE HAS BEEND APPLIED TO SPECIFIC TICKET */
          changeApplied: function(id, value) {
            var idTmpDeliveryData=id;
            var responseMsg=value==1?"True":"False";
            console.log("INDICANDO SI CAMBIO SOBRE UN TICKET HA SIDO APLICADO");
            console.log("[TicketService]=>[changeApplied]: "+idTmpDeliveryData+" Aplicado: "+responseMsg);
              return $http({
                    method : "GET",
                    url : serverHost+serverBackend+"Ticket/changeApplied/"+idTmpDeliveryData+"/"+value
                  }).then(function mySuccess(response) {
                      ticketResult = 1;
                      return ticketResult;
                  },function myError(response) { 
                        if(!idTmpDeliveryData){
                            checkResult = 0;
                        }
                    return checkResult;
            });   
          },
          rejectedChOrCanTicket: function(id, value) {
            var responseMsg=value==1?"un Cambio de envio rechazado":"una Cancelacion rechazada";
            console.log("[TicketService]=>[rejectedChOrCanTicket]: Aplicando los cambios sobre "+responseMsg+" en el ticket N#: "+id);
              return $http({
                    method : "GET",
                    url : serverHost+serverBackend+"Ticket/rejectedChOrCanTicket/"+id+"/"+value
                  }).then(function mySuccess(response) {
                      ticketResult = 1;
                      return ticketResult;
                  },function myError(response) { 
                        if(!idTmpDeliveryData){
                            checkResult = 0;
                        }
                    return checkResult;
            });   
          },
          changueStatus: function(id, value) {
            console.log("[TicketService]=>[changueStatus]: Asignado el id "+value+" de status al ticket N#: "+id);
              return $http({
                    method : "GET",
                    url : serverHost+serverBackend+"Ticket/changueStatus/"+id+"/"+value
                  }).then(function mySuccess(response) {
                      ticketResult = 1;
                      return ticketResult;
                  },function myError(response) { 
                        if(!idTmpDeliveryData){
                            checkResult = 0;
                        }
                    return checkResult;
            });   
          },
          /* UPDATE TICKET */
          updateTicket: function(tkUpdateData) {
              console.log("ACTUALIZANDO TICKET");
              //console.log(tkUpdateData);
              return $http.post(serverHost+serverBackend+"Ticket/update",tkUpdateData, serverHeaders)
                .then(function mySucess(response) {
                  checkResult = 1;
                  return checkResult;
              },function myError(response) { 
                console.log(response.data); 
                checkResult = 0;
                return checkResult;
              });
          },
          /* ADD TEMPORAL DELIVERY DATA TICKET */
          tmpDeliveryData: function(ticket) {
              console.log("ADDING TMP DATA");
              //console.log(ticket);
              return $http.post(serverHost+serverBackend+"Ticket/addTmpDeliveryOrCancelData",ticket, serverHeaders)
                .then(function mySucess(response) {
                  checkResult = 1;
                  return checkResult;
              },function myError(response) { 
                console.log(response.data); 
                checkResult = 0;
                return checkResult;
              });
          },
          /* GET TICKET BY ID*/
          ticketById: function(ticketID) {
            var ticketId=ticketID;
            console.log("[Service] => [ticketById] => Ticket a buscar: "+ticketID);
              return $http({
                    method : "GET",
                    url : serverHost+serverBackend+"Ticket/ticketById/"+ticketID
                  }).then(function mySuccess(response) {
                      rsJsonTicket = response.data;
                      console.log("[Service] => [ticketById] => Response data");
                      console.log(rsJsonTicket);
                      return rsJsonTicket;
                  },function myError(response) { 
                        if(!ticketId){
                            checkResult = 0;
                        }
                    return checkResult;
            });   
          },
          /* GET TICKET BY ID*/
          ticketByToken: function(ticketToken) {
            var ticketToken=ticketToken;
            console.log("Ticket a buscar: "+ticketToken);
              return $http({
                    method : "GET",
                    url : serverHost+serverBackend+"Ticket/ticketByToken/"+ticketToken
                  }).then(function mySuccess(response) {
                      rsJsonTicket = response.data;
                      tokenSystem.tmpTicketlStorage(rsJsonTicket[0]); 
                      checkResult = 1;
                      return checkResult;
                  },function myError(response) { 
                        if(!ticketToken){
                            checkResult = 0;
                        }
                    return checkResult;
            });   
          },
          /* CHECK TICKET BEFORE CANCEL*/
          checkTicketBeforeCancel: function(ticketID) {
            var ticketId=ticketID;
            console.log("Ticket a buscar: "+ticketID);
              return $http({
                    method : "GET",
                    url : serverHost+serverBackend+"Ticket/verificateTicketBeforeCancel/"+ticketID
                  }).then(function mySuccess(response) {
                      rsJsonTicket = response.data;
                      return rsJsonTicket;
                  },function myError(response) { 
                        if(!ticketId){
                            checkResult = 0;
                        }
                    return checkResult;
            });   
          },
          /* TICKET LIST WITH CHANGE OR CANCEL APPROVED*/
          getTickets2Check: function(id) {
            var msg=id==1?"Approved":"Rejected";
            console.log("[getTickets2Check] => Getting data of tickets "+msg);
              return $http({
                    method : "GET",
                    url : serverHost+serverBackend+"Ticket/getTickets2Check/"+id
                  }).then(function mySuccess(response) {
                      rsJsonTicket = response.data;
                      return rsJsonTicket;
                  },function myError(response) { 
                           checkResult = 0;
                    return checkResult;
            });   
          },
      }
}]);