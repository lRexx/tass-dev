/**
* Status Controller
**/
var sysStatus = angular.module("module.Status", ["tokenSystem", "angular.filter", "services.Customers","services.Address", "services.User", "ngAnimate", "ngSanitize", "ui.bootstrap", "ui.select", "services.Utilities", "bootstrapLightbox"]);

sysStatus.controller('statusCtrl', function($scope, $location, $routeParams, blockUI, Lightbox, $timeout, inform, CustomerServices, addressServices, userServices, tokenSystem, $window, serverHost, UtilitiesServices, $filter, APP_SYS){
    console.log(APP_SYS.app_name+" Modulo Status");

    /**************************************************
    *                                                 *
    *   ASSIGN DEPARTMENT TO THE CURRENT OWNER USER   *
    *                                                 *
    **************************************************/
      $scope.customerStatus=undefined;
      $scope.serviceResponse=undefined;
      $scope.checkCustomerIsInDebtFn = function(id){
        $scope.customerStatus=undefined;
        CustomerServices.checkCustomerIsInDebt(id).then(function(response) {
          console.log(response);
          $scope.serviceResponse=response;
          if(response.status==200){
              if (response.data.IsInDebt=="0" || response.data.IsInDebt==null){
                $timeout(function() {
                  var el = $('.circle-loader-spin')
                  el.removeClass();
                  el.addClass('circle-loader-spin');
                  el.addClass('success');
                  $scope.customerStatus = response.data;
                },1500);
              }else{
                $timeout(function() {
                  var el = $('.circle-loader-spin')
                  el.removeClass()
                  el.addClass('circle-loader-spin');
                  el.addClass('failed');
                  $scope.customerStatus = response.data;
                },1500);
              }
            
          }else if (response.status==404){
            inform.add('[Info]: '+response.status+', Cliente no encontrado. ',{
              ttl:3000, type: 'warning'
            });
            $scope.customerStatus=undefined;
          }else if (response.status==500){
            inform.add('[Error]: '+response.status+', Ocurrio error intenta de nuevo o contacta el area de soporte. ',{
              ttl:3000, type: 'danger'
            });
            $scope.customerStatus=undefined;
          }
        });
      }


    /***************************************************************************
    *                                                                          *
    *   PARAMETER TO RECEIVED TO CHECK WETHER A CLIENT IS ENABLE OR DISABLE    *
    *                                                                          *
    ****************************************************************************/

        /* USAGE: /status/client_id/55 */
        if($routeParams.client_id){
          var client_id = $routeParams.client_id;
          //console.log("client_id: "+client_id);
          //$timeout(function() {$scope.checkCustomerIsInDebtFn(client_id);}, 1500);
          $scope.checkCustomerIsInDebtFn(client_id);
        }else{
          inform.add('Numero de Id del cliene no ha sido recibido',{
              ttl:5000, type: 'warning'
            });
        }


});