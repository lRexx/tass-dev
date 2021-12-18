var moduleDepartmentsServices = angular.module("services.Departments", ["tokenSystem", "services.User"]);

moduleDepartmentsServices.service("DepartmentsServices", ['$http', 'tokenSystem', '$timeout', 'serverHost', 'serverBackend', 'serverHeaders', 
  function($http, tokenSystem, $timeout, serverHost, serverBackend, serverHeaders){
      var rsJson = {};
      var sndJson= {};
      var checkResult =0;
      return {
        byIdDireccion: function(idAddressFk, idStatusFk) {
            //console.log(serverHeaders);
              console.log("[Service][byIdDireccion] idAddressFk---> "+idAddressFk+" | idStatusFk---> "+idStatusFk);
              return $http({
                    method : "GET",
                    url : serverHost+serverBackend+"Department/byIdDireccion/"+idAddressFk+"/"+idStatusFk
                  }).then(function mySuccess(response) {
                      return response;

                  },function myError(response, error) { 
                      console.log("Method: "+response.config.method+" - Error code["+response.status+"]"); 
                      return response;
                  });
          },          
          /* CHECK IF A DEPTO HAS A OWNER ASSIGNED*/
          chekDepartamenteOwner: function(id) {
            console.log("[Department Services] => Check Department Owner ");
              return $http({
                    method : "GET",
                    url : serverHost+serverBackend+"Department/chekDepartamenteOwner/"+id
                  }).then(function mySuccess(response) {
                    rsJson=response;
                    return rsJson;
                  },function myError(response) { 
                    console.log("Error: "+response.status+" ["+response.statusText+"]");  
                    return response;
            });   
          },
          approveDepto: function(idDepto) {
            //console.log(serverHeaders);
              console.log("[Service][approveDepto]---> idDepto: "+idDepto);
              return $http({
                    method : "GET",
                    url : serverHost+serverBackend+"Department/aprobated/"+idDepto
                  }).then(function mySuccess(response) {
                      console.log("[Service][approveDepto]---> idDepto: "+idDepto+" (Successfully Approved)");
                      return response;

                  },function myError(response, error) { 
                      console.log("Method: "+response.config.method+" - Error code["+response.status+"]"); 
                      return response;
                  });
          },
          approveOwnerDepto: function(idDepto) {
            //console.log(serverHeaders);
              console.log("[Service][approveOwnerDepto]---> idDepto: "+idDepto);
              return $http({
                    method : "GET",
                    url : serverHost+serverBackend+"Department/aprobated/"+idDepto
                  }).then(function mySuccess(response) {
                      console.log("[Service][approveOwnerDepto]---> idDepto: "+idDepto+" (Successfully Approved)");
                      return response;

                  },function myError(response, error) { 
                      console.log("Method: "+response.config.method+" - Error code["+response.status+"]"); 
                      return response;
                  });
          },
          approveTenantDepto: function(idUser, idStatus) {
            //console.log(serverHeaders);
              console.log("[Service][approveTenantDepto]---> idDepto: "+idUser+' / idStatus: '+idStatus);
              return $http({
                    method : "GET",
                    url: serverHost+serverBackend+"Department/deptoTenantStatus/"+idUser+"/"+idStatus
                  }).then(function mySuccess(response) {
                      console.log("[Service][approveTenantDepto]---> idDepto: "+idUser+" (Successfully Approved)");
                      return response;

                  },function myError(response, error) { 
                      console.log("Method: "+response.config.method+" - Error code["+response.status+"]"); 
                      return response;
                  });
          },
          assignDepto: function(userData2Assign) {
              console.log("[Service][assignDepto]---> Department to Assign: "+userData2Assign.department.idDepartment);
              return $http.post(serverHost+serverBackend+"Department/update",userData2Assign, serverHeaders)
                .then(function mySucess(response) {
                  console.log("[Service][assignDepto]---> Department N°: "+userData2Assign.department.idDepartment+" (Successfully Assigned)");
                  return response;
              },function myError(response) { 
                  console.log("Method: "+response.config.method+" - Error code["+response.status+"]"); 
                  return response
              });
          },
          removeTenantDepto: function(userData2Remove) {
              console.log("[Service][removeTenantDepto]---> Department to remove: "+userData2Remove.department.idDepartment);
              return $http.post(serverHost+serverBackend+"Department/removeTenant",userData2Remove, serverHeaders)
                .then(function mySucess(response) {
                  console.log("[Service][removeTenantDepto]---> Department N°: "+userData2Remove.department.idDepartment+" (Successfully removed)");
                  return response;
              },function myError(response) { 
                  console.log("Method: "+response.config.method+" - Error code["+response.status+"]"); 
                  return response
              });
          },
      }
}]);