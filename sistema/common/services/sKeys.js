var moduleKeysServices = angular.module("services.Keys", ["tokenSystem"]);

moduleKeysServices.service("KeysServices", ['$http', '$q', 'tokenSystem', '$timeout', 'serverHost', 'serverBackend', 'serverHeaders', 
  function($http, $q, tokenSystem, $timeout, serverHost, serverBackend, serverHeaders){
      var rsJson = {};
      var sndJson= {};
      var rsCustomer={'client':{}};
      var rsKey={'llavero':{}};
      var checkResult =0;
      var typeOfCustomer = "";
      return {
          addKey: function(data) {
            rsKey.llavero=data.llavero;
            console.log("[Key Services] => add: ");
            console.log(rsKey);
              return $http.post(serverHost+serverBackend+"Llavero/add",rsKey,serverHeaders)
                .then(function mySucess(response, status) {
                  rsJson=response;
                  return rsJson;
                },function myError(response) { 
                  console.log("Error: "+response.data.error); 
                  return response;
                })  
          },
          updateKey: function(data) {
            rsKey.llavero=data.llavero;
            console.log("[Key Services] => update: ");
            console.log(rsKey);
              return $http.post(serverHost+serverBackend+"Llavero/edit",rsKey,serverHeaders)
                .then(function mySucess(response, status) {
                  rsJson=response;
                  return rsJson;
                },function myError(response) { 
                  console.log("Error: "+response.data.error); 
                  return response;
                })  
          },
          listAll: function() {
            console.log("[Key Services] => get all keys");
            return $http({
                method : "GET",
                url : serverHost+serverBackend+"Llavero/index"
              }).then(function mySuccess(response) {
                rsJson=response;
                return rsJson;
              },function myError(response) { 
                console.log("Error: "+response.data.error); 
                return response;
              });
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
          addMultiKeys: function(file){
              var fd = new FormData();
              fd.append('excel', file);
              console.log("[Key Services] => addMultiKeys uploading file: ");
              console.log(fd)
              return $http.post(serverHost+serverBackend+"Llavero/varios", fd, {
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