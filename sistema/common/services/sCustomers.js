var moduleCustomerServices = angular.module("services.Customers", ["tokenSystem"]);

moduleCustomerServices.service("CustomerServices", ['$http', '$q', 'tokenSystem', '$timeout', 'serverHost', 'serverBackend', 'serverHeaders', 
  function($http, $q, tokenSystem, $timeout, serverHost, serverBackend, serverHeaders){
      var rsJson = {};
      var sndJson= {};
      var rsCustomer={'client':{}};
      var checkResult =0;
      var typeOfCustomer = "";
      return {
          /* GET ALL TYPE OF CUSTOMERS */
          getCustomerType: function() {
            //console.log("[Customer Services]: Get types ");
              return $http({
                    method : "GET",
                    url : serverHost+serverBackend+"Util/clientType"
                  }).then(function mySuccess(response) {
                    rsJson=response.data;
                    return rsJson;
                  },function myError(response) { 
                    console.log("Error: "+response.data.error); 
                    return response;
            });   
          },
          addCustomer: function(data) {
            rsCustomer.client = data;
            var switchOption = rsCustomer.client.idClientTypeFk;
            switch(switchOption){
              case "1": //ADMINISTRATION CUSTOMER
                typeOfCustomer="admin";
              break;
              case "2": //BUILDING CUSTOMER
                typeOfCustomer="building";
              break;
              case "3": //COMPANY CUSTOMER
                typeOfCustomer="company";
              break;
              case "4": //BRANCH  CUSTOMER
                typeOfCustomer="branch";
              break;
              case "5": //PARTICULAR  CUSTOMER
                typeOfCustomer="particular";
              break;
              default:
            }

            //console.log("[Customer Services] => new: "+rsCustomer.client.name);
              return $http.post(serverHost+serverBackend+"Clientes/"+typeOfCustomer,rsCustomer,serverHeaders)
                .then(function mySucess(response, status) {
                  rsJson=response;
                  return rsJson;
                },function myError(response) { 
                  console.log("Error: "+response.data.error); 
                  return response;
                })  
          },
          updateCustomer: function(data) {
            rsCustomer.client = data;
            var switchOption = rsCustomer.client.idClientTypeFk;
            switch(switchOption){
              case "1": //ADMINISTRATION CUSTOMER
                typeOfCustomer="updateadmin";
              break;
              case "2": //BUILDING CUSTOMER
                typeOfCustomer="updatebuilding";
              break;
              case "3": //COMPANY CUSTOMER
                typeOfCustomer="updatecompany";
              break;
              case "4": //BRANCH  CUSTOMER
                typeOfCustomer="updatebranch";
              break;
              case "5": //PARTICULAR  CUSTOMER
                typeOfCustomer="updateparticular";
              break;
              default:
            }
            //console.log("[Customer Services] => new: "+rsCustomer.client.name);
              return $http.post(serverHost+serverBackend+"Clientes/"+typeOfCustomer,rsCustomer,serverHeaders)
                .then(function mySucess(response, status) {
                  rsJson=response;
                  return rsJson;
                },function myError(response) { 
                  console.log("Error: "+response.data.error); 
                  return response;
                })  
          },
          addNotCustomerDepto: function(data) {
            rsCustomer.client = data;
            //console.log("[Customer Services] => new: "+rsCustomer.client.name);
              return $http.post(serverHost+serverBackend+"Clientes/addNotCustomerDepto",rsCustomer,serverHeaders)
                .then(function mySucess(response, status) {
                  rsJson=response;
                  return rsJson;
                },function myError(response) { 
                  console.log("Error: "+response.data.error); 
                  return response;
                })  
          },            
          getCustomerList: function(searchFilter) {
            var sFilter=searchFilter;
            var sMsg=searchFilter==null||searchFilter==undefined?"All":searchFilter;
            //console.log("[Customer Services] => criterio de busqueda: "+sMsg);
              return $http.post(serverHost+serverBackend+"Clientes/search",sFilter,serverHeaders)
                .then(function mySucess(response, status) {
                  rsJson=response.data;
                  return rsJson;
                },function myError(response) { 
                  console.log("Error: "+response.data.error); 
                  return response;
                })  
          },
          getCustomersById: function(id) {
            //console.log("[Customer Services] => get customer by id: "+sMsg);
              return $http({
                    method : "GET",
                    url : serverHost+serverBackend+"Clientes/findadmin/"+id
                  }).then(function mySuccess(response) {
                  rsJson=response;
                  return rsJson;
                },function myError(response) { 
                  console.log("Error: "+response.data.error); 
                  return response;
                })  
          },
          getCustomersListByCustomerId: function(id) {
            //console.log("[Customer Services] => Listado de clientes asociado a un cliente: "+sMsg);
              return $http({
                    method : "GET",
                    url : serverHost+serverBackend+"Clientes/listCustomersById/"+id
                  }).then(function mySuccess(response) {
                  rsJson=response;
                  return rsJson;
                },function myError(response) { 
                  console.log("Error: "+response.data.error); 
                  return response;
                })  
          },
          uploadCustomerFiles: function(file, customerId, fileName){
              var fd = new FormData();
              fd.append('file', file);
              fd.append('customerId', customerId);
              fd.append('fileName', fileName);
              console.log("[Customer Services] => upload file: ");
              return $http.post(serverHost+serverBackend+"Clientes/uploadFile", fd, {
                  transformRequest: angular.identity,
                  headers: {'Content-Type': undefined}
              }).then(function mySuccess(response) {
                rsJson=response;
                return rsJson;                
              },function myError(response) { 
                console.log("Error: "+response); 
                return response;
              })
          },
          addUploadedCustomerFile: function(data) {
            rsCustomer.client = data;            
            console.log("[Customer Services] => add Customer Uploaded File");
            return $http.post(serverHost+serverBackend+"Clientes/addCustomerUploadedFile",rsCustomer,serverHeaders)
              .then(function mySucess(response, status) {
                rsJson=response;
                return rsJson;
              },function myError(response) { 
                console.log("Error: "+response); 
                return response;
              });
          },
          deleteCustomerFiles: function(fileName){
            rsCustomer.fileName = fileName; 
            console.log("[Customer Services] => Delete Customer Uploaded File from hard drive ");
            return $http.post(serverHost+serverBackend+"Clientes/deleteFile",rsCustomer,serverHeaders)
            .then(function mySuccess(response) {
              rsJson=response;
              return rsJson;                
            },function myError(response) { 
              console.log("Error: "+response); 
              return response;
            })
          },
          deleteUploadedCustomerFile: function(idClientFiles) {
            console.log("[Customer Services] => Delete Customer Uploaded File from db");
            return $http.delete(serverHost+serverBackend+"Clientes/deleteCustomerUploadedFile/"+idClientFiles)
              .then(function mySucess(response, status) {
                rsJson=response;
                return rsJson;
              },function myError(response) { 
                console.log("Error: "+response); 
                return response;
              });
          },
          generateCustomerSecurityCode: function(id) {
            //console.log("[Customer Services] => Generando codigo de seguridad del cliente: "+id);
              return $http({
                    method : "GET",
                    url : serverHost+serverBackend+"Clientes/segurityCodeCliente/"+id
                  }).then(function mySuccess(response) {
                  rsJson=response;
                  return rsJson;
                },function myError(response) { 
                  console.log("Error: "+response.data.error); 
                  return response;
                })  
          },          
      }
}]);