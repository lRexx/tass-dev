var moduleTicketrServices = angular.module("services.Ticket", ["tokenSystem", "services.User"]);

moduleTicketrServices.service("ticketServices", ['$http', 'tokenSystem', '$timeout', 'serverHost', 'serverBackend', 'serverHeaders', 
  function($http, tokenSystem, $timeout, serverHost, serverBackend, serverHeaders){
      var ticketResult=0;
      var rsJsonTicket = {};
      var checkResult =0;
      return {
          /* LISTA ALL TICKETS */
          all: function(ticket) {
            console.log("List all tickets or list by filters selected");
            //console.log(ticket);
            return $http.post(serverHost+serverBackend+"Ticket/allnew",ticket, serverHeaders)
              .then(function mySucess(response) {
                return response;
              },function myError(response) { 
                console.log("Error: "+response.data.error); 
                return response;
              })
          },
          /* ADD TICKET */
          addUpRequest: function(ticket) {
            console.log("List all tickets or list by filters selected");
            //console.log(ticket);
            return $http.post(serverHost+serverBackend+"Ticket/index2",ticket, serverHeaders)
              .then(function mySucess(response) {
                return response;
              },function myError(response) { 
                console.log("Error: "+response.data.error); 
                return response;
              })
          },
          /* APPROVE TICKET */
          approvedTicket: function(data) {
            console.log("APPROVE TICKET");
            console.log(data);
            console.log("[Ticket Services] => Ticket Id: "+data.ticket.idTicket);
            return $http.post(serverHost+serverBackend+"Ticket/approve",data, serverHeaders)
              .then(function mySucess(response) {
                    return response;
            }).catch(function onError(response) {
                console.log("Method: "+response.config.method+" - Error code["+response.status+"]"); 
                 return response;
            });   
          },
          /* REQUEST CANCEL TICKET */
          requestCancelTicket: function(data) {
            console.log("REQUEST CANCELLATION TICKET");
            console.log(data);
            console.log("[Ticket Services] => Ticket Id: "+data.ticket.idTicket);
            return $http.post(serverHost+serverBackend+"Ticket/requestCancel",data, serverHeaders)
              .then(function mySucess(response) {
                    return response;
            }).catch(function onError(response) {
                console.log("Method: "+response.config.method+" - Error code["+response.status+"]"); 
                return response;
            });   
          },
          /* REJECT REQUEST CANCEL TICKET */
          rejectRequestCancelTicket: function(data) {
            console.log("REJECT REQUEST CANCELLATION TICKET");
            console.log(data);
            console.log("[Ticket Services] => Ticket Id: "+data.ticket.idTicket);
            return $http.post(serverHost+serverBackend+"Ticket/rejectRequestCancel",data, serverHeaders)
              .then(function mySucess(response) {
                    return response;
            }).catch(function onError(response) {
                console.log("Method: "+response.config.method+" - Error code["+response.status+"]"); 
                return response;
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
          /* VERIFY TICKET */
          verifyTicketsByIdUser: function(idUser) {
            console.log("[Ticket Services] => verificar si un usuario tiene un pedido asociado: "+idUser);
              return $http({
                    method : "GET",
                    url : serverHost+serverBackend+"Ticket/verificateTicketByIdUser/"+idUser
                  }).then(function mySuccess(response) {
                      return response;
                  },function myError(response, error) { 
                      console.log("Method: "+response.config.method+" - Error code["+response.status+"]"); 
                      return response;
                  });
          },
          /* VERIFY TICKET */
          getTicketFilter: function() {
              return $http({
                    method : "GET",
                    url : serverHost+serverBackend+"Ticket/filter/"
                  }).then(function mySuccess(response) {
                      return response;
                  }).catch(function onError(response) {
                      console.log("Method: "+response.config.method+" - Error code["+response.status+"]"); 
                      return response;
                  });
          },
          /* STATUS TICKET */
          getTicketStatusTypeList: function() {
            return $http({
                  method : "GET",
                  url : serverHost+serverBackend+"Ticket/ticketStatusType/"
                }).then(function mySuccess(response) {
                    return response;
                }).catch(function onError(response) {
                    console.log("Method: "+response.config.method+" - Error code["+response.status+"]"); 
                    return response;
                });
          },
          /* TICKET TYPE */
          getTypeTicketList: function() {
            return $http({
                  method : "GET",
                  url : serverHost+serverBackend+"Ticket/typeTickets/"
                }).then(function mySuccess(response) {
                    return response;
                }).catch(function onError(response) {
                    console.log("Method: "+response.config.method+" - Error code["+response.status+"]"); 
                    return response;
                });
          },
          typeDelivery: function() {
            //console.log("[Utilities Services]: Get Internet Company List");
              return $http({
                    method : "GET",
                    url : serverHost+serverBackend+"Ticket/typedelivery"
                  }).then(function mySuccess(response) {
                    rsJson=response;
                    return rsJson;
                  }).catch(function onError(response) {
                    console.log("Method: "+response.config.method+" - Error code["+response.status+"]");
                    return response;
            });   
          },
          paymentsType: function() {
            //console.log("[Utilities Services]: Get Internet Company List");
              return $http({
                    method : "GET",
                    url : serverHost+serverBackend+"Ticket/paymentsType"
                  }).then(function mySuccess(response) {
                    rsJson=response;
                    return rsJson;
                  }).catch(function onError(response) {
                    console.log("Method: "+response.config.method+" - Error code["+response.status+"]");
                    return response;
            });   
          },
          createMPLink: function(data) {
            console.log("Create Mercado Pago Link for pay the request");
            //console.log(ticket);
            return $http.post(serverHost+serverBackend+"MercadoLibre/crearEnlaceMercadoPago",data, serverHeaders)
              .then(function mySucess(response) {
                return response;
              },function myError(response) { 
                console.log("Error: "+response.data.error); 
                return response;
              })
          },
          addPayment: function(data) {
            console.log("Add payment details");
            //console.log(ticket);
            return $http.post(serverHost+serverBackend+"MercadoLibre/addPayment",data, serverHeaders)
              .then(function mySucess(response) {
                return response;
              },function myError(response) { 
                console.log("Error: "+response.data.error); 
                return response;
              })
          },
          updatePayment: function(data) {
            console.log("Update payment details");
            //console.log(ticket);
            return $http.post(serverHost+serverBackend+"MercadoLibre/updatePayment",data, serverHeaders)
              .then(function mySucess(response) {
                return response;
              },function myError(response) { 
                console.log("Error: "+response.data.error); 
                return response;
              })
          },
      }
}]);