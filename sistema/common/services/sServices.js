var moduleServiceServices = angular.module("services.Service", ["tokenSystem", "services.User"]);

moduleServiceServices.service("serviceServices", ['$http', 'tokenSystem', '$timeout', 'serverHost', 'serverBackend', 'serverHeaders', 
  function($http, tokenSystem, $timeout, serverHost, serverBackend, serverHeaders){
      var serviceResult=0;
      var rsJsonServices = {};
      var rsCustomerServices={'service':{}};
      var rsJson={};
      var checkResult =0;
      var typeOfService = "";
      return {
          /*GET LIST OF TYPE OF SERVICES*/
          getTypeOfServices: function() {
            rsJson={};
            //console.log("[Service Services]: Type of Services ");
              return $http({
                    method : "GET",
                    url : serverHost+serverBackend+"Services/typeOfServices"
                  }).then(function mySuccess(response) {
                    rsJson=response.data;
                    return rsJson;
                  },function myError(response) { 
                    console.log("Error: "+response.data.error); 
                    return response;
            });   
          },
          /*GET LIST OF ACCESS CONTROL DOORS */
          accessCtrlDoors: function() {
            rsJson={};
            //console.log("[Service Services]: Access Control Door List ");
              return $http({
                    method : "GET",
                    url : serverHost+serverBackend+"Services/accessCtrlDoors"
                  }).then(function mySuccess(response) {
                    rsJson=response.data;
                    return rsJson;
                  },function myError(response) { 
                    console.log("Error: "+response.data.error); 
                    return response;
            });   
          },
          /*ADD NEW SERVICE */
          addService: function(data) {
            rsCustomerServices.service = data;
            var switchOption = rsCustomerServices.service.idTipeServiceFk;
            switch(switchOption){
              case "1": //CONTROL ACCESS
                typeOfService="addaccescontrol";
              break;
              case "2": //INTERNET
                typeOfService="addinternet";
              break;
              case "3": //TOTEM
                typeOfService="addtotem";
              break;
              case "4": //CAMERA
                typeOfService="addcamera";
              break;
              case "5": //ALARM
                typeOfService="addalarm";
              break;
              case "6": //APP MONITOR
                typeOfService="addsmartpanic";
              break;              
              default:
            }
              console.log("[Service Services]: new customer service ");
              console.log(rsCustomerServices);
              return $http.post(serverHost+serverBackend+"Services/"+typeOfService,rsCustomerServices,serverHeaders)
                .then(function mySucess(response, status) {
                  rsJson=response;
                  return rsJson;
                },function myError(response) { 
                  console.log("Error: "+response); 
                  return response;
                });
          },
          /*UPDATE NEW SERVICE */
          updateService: function(data) {
            rsCustomerServices.service = data;
            var switchOption = rsCustomerServices.service.idClientTypeServices;
            switch(switchOption){
              case "1": //CONTROL ACCESS
                typeOfService="editAccescontrol";
              break;
              case "2": //INTERNET
                typeOfService="editInternet";
              break;
              case "3": //TOTEM
                typeOfService="editTotem";
              break;
              case "4": //CAMERA
                typeOfService="editCamera";
              break;
              case "5": //ALARM
                typeOfService="editAlarm";
              break;
              case "6": //APP MONITOR
                typeOfService="editSmartpanic";
              break;              
              default:
            }
              console.log("[Service Services]: update customer service ");
              console.log(rsCustomerServices);
              return $http.post(serverHost+serverBackend+"Services/"+typeOfService,rsCustomerServices,serverHeaders)
                .then(function mySucess(response, status) {
                  rsJson=response;
                  return rsJson;
                },function myError(response) { 
                  console.log("Error: "+response); 
                  return response;
                });
          },          
          getServiceListByIdContract: function(idContract) {
            rsJson={};
            console.log("[Service Services]: List of Services Items By Contract: "+idContract);
              return $http({
                    method : "GET",
                    url : serverHost+serverBackend+"services/servicesPorIdContrato/"+idContract
                  }).then(function mySuccess(response) {
                    rsJson=response;
                    return rsJson;
                  },function myError(response) { 
                    console.log("Error: "+response.data.error); 
                    return response;
            });   
          },
          getServiceListByIdCustomer: function(idCustomer) {
            rsJson={};
            console.log("[Service Services]: List of Services Items By Customer Id");
              return $http({
                    method : "GET",
                    url : serverHost+serverBackend+"services/getServicesPorIdCliente/"+idCustomer
                  }).then(function mySuccess(response) {
                    rsJson=response;
                    return rsJson;
                  },function myError(response) { 
                    console.log("Error: "+response.data.error); 
                    rsJson=response;
                    return rsJson;
            });   
          },                    
      }
}]);