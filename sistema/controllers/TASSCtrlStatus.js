/**
* Status Controller
**/
var sysStatus = angular.module("module.Status", ["tokenSystem", "angular.filter", "services.Customers","services.Address", "services.Products", "services.Contracts", "services.Service", "services.User", "ngAnimate", "ngSanitize", "ui.bootstrap", "ui.select", "services.Utilities", "bootstrapLightbox"]);

sysStatus.controller('statusCtrl', function($scope, $location, $routeParams, blockUI, $q, Lightbox, $timeout, inform, CustomerServices, ProductsServices, ContractServices, serviceServices, addressServices, userServices, tokenSystem, $window, serverHost, UtilitiesServices, $filter, APP_SYS){
    console.log(APP_SYS.app_name+" Modulo Status");
    $scope.list_batteries=[];
    $scope.battery_install=[];
    $scope.list_cameras=[];
    $scope.list_cameras_ports=[];
    $scope.list_sensors=[];
    $scope.list_sensors_zones=[];
    $scope.list_tampers_zones=[];
    $scope.list_open_devices=[];
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
      /**************************************************
      *                                                 *
      *                 LIST PRODUCTS                   *
      *                                                 *
      **************************************************/
      $scope.rsProductsData = [];
      $scope.getProductsFn = function(search){
          ProductsServices.list(search).then(function(data){
              $scope.rsProductsData = data;
              //console.log($scope.rsProfileData);
          });
      };$scope.getProductsFn("");
      /**************************************************
      *                                                 *
      *           GET CUSTOMER SERVICES LIST            *
      *                                                 *
      **************************************************/
      $scope.rsServicesListByCustomerIdData=[];
      $scope.getListCustomersServicesFn=function(idCustomer, opt){
          $scope.rsServicesListByCustomerIdData=[];
          serviceServices.getServiceListByIdCustomer(idCustomer).then(function(data){
              $scope.rsJsonData = data;
              //console.log($scope.rsJsonData);
              if($scope.rsJsonData.status==200){
                  $scope.rsServicesListByCustomerIdData=$scope.rsJsonData.data;
                  console.log($scope.rsServicesListByCustomerIdData);
              }else{
                  $scope.rsServicesListByCustomerIdData=[];
                  if($scope.rsContractNotFound==false){
                      inform.add('No se existen servicios asociados al cliente. ',{
                          ttl:2000, type: 'warning'
                      });
                  }
              }
              //console.log($scope.rsServicesListByCustomerIdData);

          });

      };
    /**************************************************
    *            HIDE SELF INTERNETSERVICES           *
    *     USED IN CREATE & UPDATE INTERNET SERVICE    *
    **************************************************/
    $scope.filterAssociatedServices = function(item){
      //alert($scope.select.idCompanyKf);
      //console.log(item.idClientServices);
      //console.log($scope.serviceSelected.idServiceAsociateFk_array);
      const itemFound = $scope.serviceSelected.idServiceAsociateFk_array.findIndex(element => element.idClientServices === item.idClientServices);
      //console.log(itemFound);
      return item.idTipeServiceFk != '2' && itemFound;
      };
    /**************************************************
    *                                                 *
    *              GET CUSTOMERS CONTRACT             *
    *                                                 *
    **************************************************/
      $scope.rsContractsListByCustomerIdData=[];
      $scope.rsContractNotFound=false;
      $scope.getContractsByCustomerIdFn=function(idClient){
          $scope.rsContractsListByCustomerIdData=[];
          ContractServices.getContractListByCustomerId(idClient).then(function(response){
            //console.log(response);
              if(response.status==200){
                if(response.data!=undefined && response.data.length>0){
                    var existingContracts = [];
                    angular.forEach(response.data,function(contract){
                        //console.log(contract)
                        var deferredContracts = $q.defer();
                        existingContracts.push(deferredContracts.promise);
                        //ASSIGN DEPARTMENT SERVICE
                            deferredContracts.resolve();
                            serviceServices.getServiceListByIdContract(contract.idContrato).then(function(response_services) {
                                if(response_services.status==200){
                                    contract.services_active = response_services.data;
                                }else if (response_services.status==404){
                                    contract.services_active = [];
                                }else if (response_services.status==500){
                                    contract.services_active = [];
                                }
                            });
                    });
                    
                    $q.all(existingContracts).then(function () {
                            $scope.rsContractsListByCustomerIdData=response.data;
                            console.log($scope.rsContractsListByCustomerIdData);
                    });
                }
              }else{
                $scope.rsContractsListByCustomerIdData=[];
                $scope.rsContractNotFound=true;
                inform.add('No existen contratos activos asociados al cliente. ',{
                        ttl:2000, type: 'warning'
                });
              }
              //console.log($scope.rsContractsListByCustomerIdData);
          });
      }


      $scope.serviceSelected = {}
      $scope.mainSwitchFn = function(opt, obj){
        switch (opt){
            case "open_service":
              $scope.serviceSelected = {}
              console.log(obj);
              $scope.list_batteries=[];
              $scope.battery_install=[];
              $scope.list_cameras=[];
              $scope.list_cameras_ports=[];
              $scope.list_sensors=[];
              $scope.list_sensors_zones=[];
              $scope.list_tampers_zones=[];
              $scope.list_open_devices=[];
              switch (obj.idTipeServiceFk){
                case "1":
                  $scope.serviceSelected = obj;
                  $scope.serviceSelected.winName=obj.clientTypeServices;
                  //LIST OPEN DEVICES
                  //console.log($scope.list_open_devices);
                  var productIdNumber = 1;
                  for (var device in $scope.serviceSelected.tb_open_devices_access_control_array){
                      for (var prduct in $scope.rsProductsData){
                        if ($scope.serviceSelected.tb_open_devices_access_control_array[device].idOpenDevice==$scope.rsProductsData[prduct].idProduct){
                            $scope.list_open_devices.push({'idProductIndex':productIdNumber,'idOpenDevice':$scope.serviceSelected.tb_open_devices_access_control_array[device].idOpenDevice,'descriptionProduct':$scope.rsProductsData[prduct].descriptionProduct, 'model':$scope.rsProductsData[prduct].model, 'brand': $scope.rsProductsData[prduct].brand,'isNumberSerieInternal':$scope.rsProductsData[prduct].isNumberSerieInternal,'isNumberSerieFabric':$scope.rsProductsData[prduct].isNumberSerieFabric,'isDateExpiration':$scope.rsProductsData[prduct].isDateExpiration, 'numberSerieFabric':$scope.serviceSelected.tb_open_devices_access_control_array[device].numberSerieFabric, 'numberSerieInternal':$scope.serviceSelected.tb_open_devices_access_control_array[device].numberSerieInternal,'dateExpiration':$scope.serviceSelected.tb_open_devices_access_control_array[device].dateExpiration, 'idProductClassification':$scope.rsProductsData[prduct].idProductClassificationFk, 'classification': $scope.rsProductsData[prduct].classification, 'description':null, 'isNew':0});
                            productIdNumber++;
                            break;
                        }
                      }
                  }
                  //LIST BATTERIES INSTALLED
                  //console.log($scope.list_batteries);
                  var productIdNumber = 1;
                  for (var battery in $scope.serviceSelected.tb_battery_install_access_control_array){
                      for (var prduct in $scope.rsProductsData){
                        if ($scope.serviceSelected.tb_battery_install_access_control_array[battery].idBatteryFk==$scope.rsProductsData[prduct].idProduct){
                            $scope.list_batteries.push({'idProductIndex':productIdNumber,'idBatteryFk':$scope.serviceSelected.tb_battery_install_access_control_array[battery].idBatteryFk,'descriptionProduct':$scope.rsProductsData[prduct].descriptionProduct, 'model':$scope.rsProductsData[prduct].model, 'brand': $scope.rsProductsData[prduct].brand,'isNumberSerieInternal':$scope.rsProductsData[prduct].isNumberSerieInternal,'isNumberSerieFabric':$scope.rsProductsData[prduct].isNumberSerieFabric,'isDateExpiration':$scope.rsProductsData[prduct].isDateExpiration, 'numberSerieFabric':$scope.serviceSelected.tb_battery_install_access_control_array[battery].numberSerieFabric, 'numberSerieInternal':$scope.serviceSelected.tb_battery_install_access_control_array[battery].numberSerieInternal,'dateExpiration':$scope.serviceSelected.tb_battery_install_access_control_array[battery].dateExpiration, 'idProductClassification':$scope.rsProductsData[prduct].idProductClassificationFk, 'classification': null, 'description':null, 'isNew':0});
                            productIdNumber++;
                            break;
                        }
                      }
                  }
                  console.log($scope.list_open_devices);
                  $("#selectServiceItem").modal('toggle');
                break;
                case "2":
                  $scope.serviceSelected = obj;
                  $scope.serviceSelected.winName="Internet";
                  $("#selectServiceItem").modal('toggle');
                break;
                case "3":
                  $scope.serviceSelected = obj;
                  $scope.serviceSelected.winName="Totem";
                  $("#selectServiceItem").modal('toggle');
                break;
                case "4":
                  $scope.serviceSelected = obj;
                  $scope.serviceSelected.winName="Camaras";
                  $("#selectServiceItem").modal('toggle');
                break;
                case "5":
                  $scope.serviceSelected = obj;
                  $scope.serviceSelected.winName="Alarmas";
                  $("#selectServiceItem").modal('toggle');
                break;
                case "6":
                  $scope.serviceSelected = obj;
                  $scope.serviceSelected.winName="Monitoreo";
                  $("#selectServiceItem").modal('toggle');
                break;
              }
              
            break;
        }
      }

    /***************************************************************************
    *                                                                          *
    *   PARAMETER TO RECEIVED TO CHECK WETHER A CLIENT IS ENABLE OR DISABLE    *
    *                                                                          *
    ****************************************************************************/

        /* USAGE: /status/client/55 */
        console.log($routeParams);
        $scope.checkStatus={'services':false, 'client':false}
        if($routeParams){
          if ($routeParams.client!=undefined){
            var idClient = $routeParams.client;
            //console.log("client: "+idClient);
            //$timeout(function() {$scope.checkCustomerIsInDebtFn(idClient);}, 1500);
            $scope.checkCustomerIsInDebtFn(idClient);
            $scope.checkStatus.client=true;
            $scope.checkStatus.services=false;
          }else if ($routeParams.service!=undefined){
            var idClient = $routeParams.service;
            //console.log("client: "+idClient);
            //$timeout(function() {$scope.checkCustomerIsInDebtFn(idClient);}, 1500);
            $scope.checkCustomerIsInDebtFn(idClient);
            
            $timeout(function() {
              $scope.getContractsByCustomerIdFn(idClient);
              //$scope.getSelectedServiceByIdContractFn(obj.idContractFk, obj.idTipeServiceFk);
            }, 1500);
            $timeout(function() {
              $scope.getListCustomersServicesFn(idClient);
            }, 2000);
            $scope.checkStatus.client=false;
            $scope.checkStatus.services=true;
          }else{
            $location.path("/login");
          }

        }else{
          inform.add('Numero de Id del cliene no ha sido recibido',{
              ttl:5000, type: 'warning'
            });
        }


});