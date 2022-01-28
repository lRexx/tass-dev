/**
* Customers Controller
**/
var users = angular.module("module.Users", ["tokenSystem", "angular.filter", "services.User", "services.Customers", "services.Address", "services.Profiles", "services.Departments", "ui.select", "services.Utilities"]);
/**************************************************
*                                                 *
*          DATE FILTER FOR MYSQL TIMESTAMP        *
*                                                 *
**************************************************/
 users.filter('dateToISO', function() {
return function(input) {
    input = new Date(input).toISOString();
    return input;
}
});
users.controller('UsersCtrl', function($scope, $location, $routeParams, blockUI, Lightbox, $timeout, inform, CustomerServices, addressServices, userServices, ProfileServices, DepartmentsServices, tokenSystem, $window, serverHost, UtilitiesServices, $filter, APP_SYS, APP_REGEX){
    console.log(APP_SYS.app_name+" Modulo Users");
    if (!$scope.sysToken || !$scope.sysLoggedUser ){
        $location.path("/login");
    }

      /**************************************************
      *                                                 *
      *                 MODAL CONFIRMATION              *
      *                                                 *
      **************************************************/
        $scope.argObj={};
        $scope.modalConfirmation = function(opt, confirm, obj){
          $scope.swMenu = opt;
          $scope.vConfirm = confirm;
          $scope.mess2show="";
          $scope.messAction="";
          //console.log("$scope.swMenu: "+$scope.swMenu);
          switch ($scope.swMenu){
            case "closeWindow":
                if (confirm==0){
                    if ($scope.isNewUser==true){
                      $scope.mess2show="Se perderan todos los datos cargados del registro actual, esta seguro que desea cancelar?";
                    }else{
                      $scope.mess2show="Se perderan todas las modificaciones realizadas en el registro actual, esta seguro que desea cancelar la modificacion?";
                    }
                    $("#confirmRequestModal").modal('show');
                }else if (confirm==1){
                    $("#confirmRequestModal").modal('hide');
                    $("#RegisterUser").modal('hide');
                    $("#newSysProfile").modal('hide');
                    $("#updateSysProfile").modal('hide');
                    $("#UpdateUser").modal('hide');
                    if ($scope.isNewUser==true || $scope.isUpdateUser==true){
                      $scope.getUserLists(1, 'users');
                    }else if ($scope.isNewProfileRole==true || $scope.isUpdateProfileRole==true){
                      $scope.getSysProfilesFn("");
                    }
                }
            break;
            case "remove":
            case "disabled":
            case "enabled":
              if (confirm==0){
                  if (obj.idUser!=0){
                    if (opt=="remove"){
                      $scope.messAction="Eliminado.";
                    }else if (opt=="disabled"){
                      $scope.messAction="Deshabilitado.";
                    }else{
                      $scope.messAction="Habilitado.";
                    }
                    $scope.mess2show="El usuario ("+obj.fullNameUser+") bajo el perfil de "+obj.nameProfile+" sera "+$scope.messAction+"     Confirmar?";
                    $scope.idUserKf   =  obj.idUser;
                    $scope.argObj = obj;
                    console.log('El Usuario sera '+$scope.messAction+' ID: '+$scope.idUserKf+' BAJO EL NOMBRE: '+obj.fullNameUser);
                    console.log("============================================================================")
                    console.log($scope.argObj);
                  }
                $('#confirmRequestModal').modal('toggle');
              }else if (confirm==1){
                if (opt=="remove"){
                  $scope.deleteUser($scope.argObj);
                }else if (opt=="disabled"){
                  $scope.disabledUser($scope.argObj);
                }else{
                  console.log($scope.argObj);
                  $scope.enabledUser($scope.argObj);
                }
                $('#confirmRequestModal').modal('hide');
              }
            break;
            case "removeSysProf":
              if (confirm==0){
                  if (obj.idProfiles!=0){
                    $scope.idSysProf = obj.idProfiles;
                    $scope.mess2show="El Perfil "+obj.name+" sera Eliminado.     Confirmar?";
                      console.log('Usuario a eliminar ID: '+obj.idProfiles+' BAJO EL NOMBRE: '+obj.name);
                      console.log("============================================================================")
                      console.log(obj);
                  }      
                $('#confirmRequestModal').modal('toggle');
              }else if (confirm==1){
                    $scope.deleteSysProfileFn($scope.idSysProf);
                $('#confirmRequestModal').modal('hide');
              }
            break;
            case "updateSysUser":
              if (confirm==0){
                  if ($scope.sessionidProfile==1 && obj.idUser!=0){
                    if (obj.idProfileKf){$scope.mess2show="El usuario ("+obj.fullNameUser+") bajo el perfil de "+obj.nameProfile+" sera Actualizado.     Confirmar?";}
                      $scope.idUserKf   =  obj.idUser;
                      $scope.argObj = obj;
                      console.log('Usuario a eliminar ID: '+$scope.idUserKf+' BAJO EL NOMBRE: '+obj.fullNameUser);
                      console.log("============================================================================")
                      console.log($scope.argObj);
                  }      
                $('#confirmRequestModal').modal('toggle');
              }else if (confirm==1){
                    $scope.sysUpdateUserFn($scope.argObj);
                $('#confirmRequestModal').modal('hide');
              }
            break;
            default:
          }
        }
        $scope.filterProfileAtt = function(item){
          //alert($scope.select.idCompanyKf);
          //console.log(item);
          return item.idProfileKf == 6;
        };
        $scope.filterProfileTenant = function(item){
          //alert($scope.select.idCompanyKf);
          //console.log(item);
          return item.idProfileKf == 3 || item.idProfileKf == 5 ;
        };
      /**
      * Pagination Functions
      **/
          $scope.pagedItems    = [];
          $scope.itemPerPage=0;
          $scope.loadPagination = function(item, orderBy, itemsByPage){
              var rowList=[];
              var rowId=null;
              for (var key in item){
                if (item[key].idClient!=undefined && typeof item[key].idClient === 'string'){
                  rowId=Number(item[key].idClient);
                  item[key].idClient=rowId;
                  rowList.push(item[key]);
                }else if (item[key].idUser!=undefined && typeof item[key].idUser === 'string'){
                  rowId=Number(item[key].idUser);
                  item[key].idUser=rowId;
                  rowList.push(item[key]);
                }else if (item[key].idUserFk!=undefined && typeof item[key].idUserFk === 'string'){
                  rowId=Number(item[key].idUserFk);
                  item[key].idUserFk=rowId;
                  rowList.push(item[key]);
                }else if (item[key].idProduct!=undefined && typeof item[key].idProduct === 'string'){
                  rowId=Number(item[key].idProduct);
                  item[key].idProduct=rowId;
                  rowList.push(item[key]);            
                }else if (item[key].idDepartmentFk!=undefined && typeof item[key].idProduct === 'string'){
                  rowId=Number(item[key].idDepartmentFk);
                  item[key].idDepartmentFk=rowId;
                  rowList.push(item[key]);            
                }else{
                  rowList.push(item[key]);
                }
              }
              //console.log(rowList);
              var sortingOrder     = orderBy;
              var itemsPerPage     = itemsByPage;
              $scope.sortingOrder  = sortingOrder;
              $scope.reverse       = false;
              $scope.filteredItems = [];
              $scope.groupedItems  = [];
              $scope.itemsPerPage  = itemsPerPage;
              $scope.pagedItems    = [];
              $scope.currentPage   = 0;
              $scope.items         = [];
              $scope.items         = rowList;
              $scope.itemPerPage   = $scope.itemsPerPage;
              $scope.search();
          }
          // init the filtered items
          $scope.search = function (qvalue1, qvalue2, qvalue3, qvalue4, qvalue5, qvalue6, vStrict) {
                  //console.log("[search]-->qvalue1: "+qvalue1);
                  //console.log("[search]-->qvalue2: "+qvalue2);
                  //console.log("[search]-->qvalue3: "+qvalue3);
                  //console.log("[search]-->qvalue4: "+qvalue4);
                  //console.log("[search]-->qvalue5: "+qvalue5);
                  //console.log("[search]-->qvalue6: "+qvalue6);
                  //console.log("[search]-->vStrict: "+vStrict);
                  $scope.filteredItems = $filter("filter")($scope.items, qvalue1, vStrict);
                  if (qvalue2!=undefined && qvalue2!='' && qvalue2!=null){$scope.filteredItems = $filter("filter")($scope.filteredItems, qvalue2, vStrict);}
                  if (qvalue3!=undefined && qvalue3!='' && qvalue3!=null){$scope.filteredItems = $filter("filter")($scope.filteredItems, qvalue3, vStrict);}
                  if (qvalue4!=undefined && qvalue4!='' && qvalue4!=null){$scope.filteredItems = $filter("filter")($scope.filteredItems, qvalue4, vStrict);}
                  if (qvalue5!=undefined && qvalue5!='' && qvalue5!=null){$scope.filteredItems = $filter("filter")($scope.filteredItems, qvalue5, vStrict);}
                  if (qvalue6!=undefined && qvalue6!='' && qvalue6!=null){$scope.filteredItems = $filter("filter")($scope.filteredItems, qvalue6, vStrict);}
              //console.log($scope.filteredItems);
              // take care of the sorting order
              if ($scope.sortingOrder !== '') {
                  $scope.filteredItems = $filter("orderBy")($scope.filteredItems, $scope.sortingOrder, $scope.reverse);
                  //console.log($scope.filteredItems);
              }
              $scope.currentPage = 0;
              // now group by pages
              $scope.groupToPages();
          };
          // Group Items By Pages
          $scope.groupToPages = function (itemPerPage) {
              var itemsPerPage = itemPerPage==undefined || itemPerPage==null?$scope.itemsPerPage:itemPerPage;
              $scope.pagedItems = [];
              for (var i = 0; i < $scope.filteredItems.length; i++) {
                  if (i % itemsPerPage === 0) {
                      //console.log("entro al if");
                      $scope.pagedItems[Math.floor(i / itemsPerPage)] = [ $scope.filteredItems[i] ];
                  } else {
                      //console.log("entro al else");
                      $scope.pagedItems[Math.floor(i / itemsPerPage)].push($scope.filteredItems[i]);
                  } 
                  //console.log($scope.pagedItems[Math.floor(i / itemsPerPage)]);
              }
              //console.log($scope.pagedItems.length);
              //console.log("PAGINATION LOADED");
          };
          //Previous Page
          $scope.prevPage = function () {
              if ($scope.currentPage > 0) {
                  $scope.currentPage--;
              }
          };
          //Next Page
          $scope.nextPage = function () {
              if ($scope.currentPage < $scope.pagedItems.length - 1) {
                  $scope.currentPage++;
              }
          };
          //Last Page
          $scope.lastPage = function(){          
              $scope.currentPage=($scope.pagedItems.length-1);
          }
          //First Page
          $scope.firstPage = function () {
              $scope.currentPage=($scope.pagedItems.length-$scope.pagedItems.length);
          };
    
          // change sorting order
          $scope.sort_by = function(newSortingOrder) {
              if ($scope.sortingOrder == newSortingOrder)
                  $scope.reverse = !$scope.reverse;
    
              $scope.sortingOrder = newSortingOrder;
    
              // icon setup
              //$('th i').each(function(){
              //    // icon reset
              //    $(this).removeClass().addClass('icon-sort');
              //});
              if ($scope.reverse)
                  $('th.'+newSortingOrder+' i').removeClass().addClass('icon-chevron-up');
              else
                  $('th.'+newSortingOrder+' i').removeClass().addClass('icon-chevron-down');
          };
          $scope.sort = function(keyname){
              $scope.sortKey = keyname;   //set the sortKey to the param passed
              $scope.reverse = !$scope.reverse; //if true make it false and vice versa
          }
/*******************************************************************
*                                                                  *
*                       USERS FUNCTIONS                            *
*                                                                  *
*******************************************************************/
        /**************************************************
        *                                                 *
        *           LIST CUSTOMER REGISTERED              *
        *                                                 *
        **************************************************/
          $scope.rsCustomerListData = [];
          $scope.rsCustomerListSelectData = [];
          $scope.rsCustomerListByTypeData = [];
          $scope.rsCustomerSelectData = [];
          $scope.jsonCustomerRegistered={
                "searchFilter":"",
                "isNotCliente":"0"
          };
          $scope.jsonCustomerNotRegistered={
                "searchFilter":"",
                "idClientTypeFk":"2",
                "isNotCliente":"1"
          };
          $scope.getCustomerListFn = function(search, opt){
            $scope.rsCustomerListByTypeData = [];
            $scope.rsCustomerListData = [];
            $scope.rsCustomerSelectData = [];
            var jsonSearch = !search || search=="" ||  search=="registered" ? $scope.jsonCustomerRegistered : $scope.jsonCustomerNotRegistered;
            console.log("getCustomerListFn => search: [searchFilter:"+jsonSearch.searchFilter+", isNotCliente:"+jsonSearch.isNotCliente+"] opcion: "+opt);
            CustomerServices.getCustomerList(jsonSearch).then(function(data){
                $scope.rsCustomerListData = data;
                $scope.rsCustomerSelectData = data;
                $scope.rsCustomerListByTypeData = data;
                $scope.rsCustomerListSelectData = data;
                //console.log($scope.rsCustomerSelectData);
                //
            });
          };$scope.getCustomerListFn("","");
        /**************************************************
        *                                                 *
        *             LIST CUSTOMER BY TYPE               *
        *                                                 *
        **************************************************/
        
          $scope.getCustomersListByTypeFn = function(type){
            console.log("getCustomerListByTypeFn => type:"+type);
              $scope.rsCustomerListByTypeData=[];
              //console.log($scope.rsCustomerSelectData);
                if (type!=undefined && type!='' && type!=null){
                  var clientType="";
                  if (type=="2"){
                    clientType="3";
                  }else if (type=="4"){
                    clientType="1";
                  }else if (type=="3" || type=="5" || type=="6"){
                    clientType="2";
                  }
                  if (type!="1"){
                    for (var item in $scope.rsCustomerListData){
                      if ($scope.rsCustomerListData[item].idClientTypeFk==clientType){
                        //console.log($scope.rsCustomerListData[item]);
                        //console.log(clientType);
                        $scope.rsCustomerListByTypeData.push($scope.rsCustomerListData[item]);
                        //console.log($scope.rsCustomerListByTypeData);
                      }
                    }
                    //console.log($scope.rsCustomerListByTypeData);
                  }
                }
          };
        /**************************************************
        *                                                 *
        *      SHOW ONLY CUSTOMER BY TYPE OF PROFILE      *
        *                                                 *
        **************************************************/
        $scope.filterCustomerByType = function(item){
          var objOpt = $scope.isNewUser==true?$scope.users.new.idProfileKf.idProfile:$scope.users.update.idProfileKf;
          switch(objOpt){
            case "2":
              return item.idClientTypeFk == "3";
            break;
            case "4":
              return item.idClientTypeFk == "1" || item.idClientTypeFk == "3";
            break;
            case "3":
            case "5":
            case "6":
              return item.idClientTypeFk == "2";
            break;
          }
        };
        /**************************************************
        *                                                 *
        *       SHOW ONLY ROLES BY TYPE OF PROFILE        *
        *                                                 *
        **************************************************/
         $scope.filterRolesByType = function(item){
           //console.log(item);
          var objOpt = $scope.isNewUser==true?$scope.users.new.idProfileKf.idProfile:$scope.users.update.idProfileKf;
          switch(objOpt){
            case "1":
              return item.idProfiles;
            break;
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
              return item.idProfiles != "1";
            break;
          }
        };
        /**************************************************
        *                                                 *
        *                GET DEPTOS BY ID                 *
        *                                                 *
        **************************************************/
          $scope.rsBuildingDepartmentsData={};
          $scope.getBuildingsDeptosFn = function(idClient){
            //console.log(obj);
            addressServices.getBuildingsDeptos(idClient).then(function(data){
                $scope.rsBuildingDepartmentsData = data;
                //console.log($scope.rsBuildingDepartmentsData);
            });
          };
        /**************************************************
        *                                                 *
        *           CHECK IF A DEPTO HAS OWNER            *
        *                                                 *
        **************************************************/
          $scope.checkDeptoOwner = function(idDepartment){
            var idProfileFk = $scope.users.new.idProfileKf!=undefined?$scope.users.new.idProfileKf.idProfile:$scope.users.update.idProfileKf;
            if((idProfileFk=="3") || (idProfileFk=="6" && $scope.att.ownerOption==1)){
              DepartmentsServices.chekDepartamenteOwner(idDepartment).then(function(response){
                //console.log(response);
                if(response.status==200){
                  if (response.data==true){
                    $scope.ownerFound=true;
                    console.log("EL DEPTO: "+idDepartment+" Ya tiene un propietario Asignado");
                  }else if(response.data==false){
                    $scope.ownerFound=false;
                    console.log("EL DEPTO: "+idDepartment+" No tiene un propietario Asignado");
                  }
                }
              });
            }
          }
          $scope.tmpVar=0;
          $scope.deptoHasOwner = function (idTypeTenant, idTypeAttendant, idDepartment) {
            var dho_idTypeT=null,dho_idTypeA=null,dho_msgT=null;
            if(idTypeAttendant!=null){
              dho_idTypeA = idTypeAttendant;
            }
            if(idTypeTenant!=null){
              dho_idTypeT = idTypeTenant;
              dho_msgT     = dho_idTypeT==2 || dho_idTypeT==5 ? "Es de tipo Inquilino No Aplica":"Es propietario se procesa"
            }
            if (dho_idTypeT){console.log("Tipo de Inquilino: "+dho_idTypeT+" - "+dho_msgT); $scope.IsTenant=true;}else{$scope.IsTenant=false;}
            if (dho_idTypeA){console.log("Tipo de Encargado: "+dho_idTypeA); $scope.IsAttendant=true;}else{$scope.IsAttendant=false}
            $scope.tmp.idDepartment = idDepartment;
            console.log("dho_idTypeT: "+dho_idTypeT +" / "+ "$scope.IsTenant: "+$scope.IsTenant+" / "+ "dho_idTypeA: "+dho_idTypeA+" / "+"$scope.IsAttendant: "+$scope.IsAttendant)
            if($scope.tmp.idDepartment){
              if ((dho_idTypeT==1 || dho_idTypeT==3) || (dho_idTypeA>1)){
                  console.log("$scope.tmp.idDepartment N#: "+$scope.tmp.idDepartment);
                  console.log("deparmentName: "+$scope.getDeptoName($scope.tmp.idDepartment));
                  var deparmentName = $scope.getDeptoName($scope.tmp.idDepartment);
                  $scope.deptoFloor = deparmentName;
                if((deparmentName == "Porteria" || deparmentName == "porteria") && $scope.IsAttendant && $scope.tmpVar<=0){
                    inform.add('Si el encargado posee un depto distinto a la porteria debera darse de alta desde su usuario.',{
                              ttl:6000, type: 'info'
                        });
                    $scope.tmpVar++;
                }else if((deparmentName == "Porteria" || deparmentName == "porteria") && $scope.IsTenant){
                  $scope.tmpVar=0;
                  inform.add('Si desea registrar un propietario en el departamento: '+deparmentName+ ' debe seleccionar el perfil Encargado.',{
                              ttl:6000, type: 'warning'
                  });
                }else{$scope.tmpVar=0;}
                $http({
                  method : "GET",
                  url : serverHost+serverBackend+"Department/chekDepartamenteOwner/"+$scope.tmp.idDepartment
                }).then(function mySuccess(response) {
                      if (response.data==true){
                        $scope.ownerFound=true;
                        console.log("EL DEPTO: "+$scope.tmp.idDepartment+" Ya tiene un propietario Asignado");
                      }else if(response.data==false){
                        $scope.ownerFound=false;
                        console.log("EL DEPTO: "+$scope.tmp.idDepartment+" No tiene un propietario Asignado");
                      }
                        
                  }, function myError(response) {
                      if (!$scope.tmp.idDepartment){
                          inform.add('Debe seleccionar un departamento de la lista.',{
                              ttl:6000, type: 'warning'
                        });

                      }else if(response.error==500){

                        inform.add('El Consorcio no ha cargado el departamento correspondiente a la porteria, por lo que no es posible asignar un Encargado.',{
                              ttl:6000, type: 'danger'
                        });
                      }
                    
                });
              }else{
                $scope.ownerFound=false;
              }
            }else{
                inform.add('Debe seleccionar un departamento de la lista.',{
                      ttl:6000, type: 'warning'
                });
                $scope.ownerFound=false;
            }
          };
        /**************************************************
        *                                                 *
        *                 USER  SERVICES                  *
        *  [userLists]: clientUser, attendants, tenants   *
        *               sysUser, companyUser              *
        **************************************************/ 
          $scope.rsList = {};
          $scope.getUserLists = function(opt, group){
              userServices.userLists().then(function(response) {
              if (opt!=undefined && group!=undefined){
                  //console.log("[getUserList] ==> "+opt+" : "+group);
                $scope.rsList = response;
                if(opt==1){
                  switch (group){
                    case "1":
                      $scope.loadPagination($scope.rsList.sysUser, "idUser", "7");
                    break;
                    case "2":
                      $scope.loadPagination($scope.rsList.companyUser, "idUser",  "7");
                    break;
                    case "3":
                      $scope.loadPagination($scope.rsList.owners, "idUser",  "7");
                    break;
                    case "4":
                      $scope.loadPagination($scope.rsList.companyUser, "idUser",  "7");
                    break;
                    case "5":
                      $scope.loadPagination($scope.rsList.tenants, "idUser",  "7");
                    break;
                    case "6":
                      $scope.loadPagination($scope.rsList.attendants, "idUser",  "7");
                    break;
                    case "owners_tenants":
                      $scope.loadPagination($scope.rsList.owners_tenants, "idUser",  "7");
                    break;
                    case "users":
                      $scope.loadPagination($scope.rsList.users, "idUser",  "7");
                    break;
                    case "clients":
                      $scope.loadPagination($scope.rsList.clientUser, "idUser",  "7");
                    break;
                  }
                }
                //console.log($scope.rsList.tenants);
              }
              });
          };
        /**************************************************
        *                                                 *
        *                GET USER DATA                    *
        *                                                 *
        **************************************************/

          $scope.selectUserDataFn = function (obj) {
            $scope.users.update={'idUser':null,'idProfileKf':{}, 'idSysProfileFk':null, 'fname':'','lname':'', 'dni':'','email':'', 'phonelocalNumberUser':'', 'phoneMovilNumberUser':'', 'idDepartmentKf':null, 'idTypeAttKf':null, 'typeOtherAtt':'', 'idTypeTenantKf':''}
            $scope.users.tmp={'dni':'','email':''}
            $scope.select.address.selected = undefined;
            $scope.select.companies.selected = undefined;
            $scope.sysDNIRegistered = 0;
            $scope.sysEmailRegistered = 0;
            $scope.userOwnerDeptos=[];
            $scope.users.tmp={};
            $scope.users.tmp=obj;
            console.log(obj);
            $scope.isNewProfileRole=false;
            $scope.isUpdateProfileRole=false;
            $scope.isNewUser=false;
            $scope.isUpdateUser=true;
            $scope.users.update.idUser=obj.idUser;
            var switchOption = obj.idProfileKf;
            var fullNameUser = obj.fullNameUser.split(" ");
            if (fullNameUser.length==2){
              $scope.users.update.fname = fullNameUser[0];
              $scope.users.update.lname = fullNameUser[1];
            }else if (fullNameUser.length==3){
              $scope.users.update.fname = fullNameUser[0] +" "+fullNameUser[1];
              $scope.users.update.lname = fullNameUser[2];
            }else{
              $scope.users.update.fname = fullNameUser[0] +" "+fullNameUser[1];
              $scope.users.update.lname = fullNameUser[2] +" "+fullNameUser[3];
            }
            $scope.users.update.idProfileKf           = obj.idProfileKf;
            $scope.users.update.idSysProfileFk        = obj.idSysProfileFk;
            $scope.users.update.dni                   = obj.dni;
            $scope.users.tmp.dni                      = obj.dni;
            $scope.users.update.email                 = obj.emailUser;
            $scope.users.tmp.email                    = obj.emailUser;
            $scope.users.update.phonelocalNumberUser  = obj.phoneLocalNumberUser;
            $scope.users.update.phoneMovilNumberUser  = obj.phoneNumberUser;
            $scope.users.update.idStatusKf            = obj.idStatusKf;
            $scope.users.update.statusTenantName      = obj.statusTenantName;
            $scope.users.update.deptos                = obj.deptos;
            $scope.userOwnerDeptos                    = obj.deptos;
            $scope.users.update.idTypeTenantKf        = obj.idTypeTenantKf;
            switch (switchOption) {
              case "1": //SYS USER
                
              break;
              case "2": //COMPANY USER
                $scope.select.companies.selected      = {'idClient': obj.company[0].idClient, 'name': obj.company[0].name};
              break;
              case "3": //OWNER USER
                $scope.register.user.idDeparment_Tmp  = obj.idDepartmentKf;
              break;
              case "4": //BUILDING ADMIN USER
                $scope.select.companies.selected      = {'idClient': obj.company[0].idClient, 'name': obj.company[0].name};
                //console.log($scope.register.user);
              break;
              case "5": //TENANT USER
                $scope.rsCustomerListSelectData       = $scope.rsCustomerSelectData;
                $scope.select.address.selected        = obj.idAddresKf!=null?{'idClient': obj.building[0].idClient, 'address': obj.building[0].address}:null;
                if(obj.idAddresKf!=null){
                  $scope.getDeptoListByAddress(obj.building[0].idClient);
                  $scope.users.update.idDepartmentKf    = obj.idDepartmentKf
                };
                
              break;
              case "6": //ATTENDANT USER
                $scope.rsCustomerListSelectData     = $scope.rsCustomerSelectData;
                if (obj.idTyepeAttendantKf!=1 && obj.idTypeTenantKf==1){
                  //console.log(obj);
                  $scope.att.ownerOption              = "1"
                }else if (obj.idTyepeAttendantKf!=1 && obj.idTypeTenantKf==2){
                  if(obj.idAddresKf!=null){
                    $scope.getDeptoListByAddress(obj.building[0].idClient);
                    $scope.users.update.idDepartmentKf    = obj.idDepartmentKf
                  };
                  $scope.att.ownerOption              = "2";
                }else if (obj.idTyepeAttendantKf!=1 && obj.idTypeTenantKf==null){
                  $scope.att.ownerOption              = "3";
                }
                $scope.select.address.selected      = obj.idAddresKf!=null?{'idClient': obj.building[0].idClient, 'address': obj.building[0].address}:null;
                //$scope.getLisOfCustomersByIdFn(obj.company[0].idClient, true)
                $scope.users.update.typeOtherAtt      = obj.descOther;
                $scope.users.update.idTypeAttKf       = obj.idTyepeAttendantKf;
              break;
            }
            console.log($scope.users.update);
            $("#UpdateUser").modal({backdrop: 'static', keyboard: false});
          };

          $scope.refreshList = function() {
            blockUI.start('Actualizando listado de usuarios.');
            var nameProfile = $scope.filters.userProfile==undefined?null:$scope.filters.userProfile.nameProfile;
            var statusTenantName = $scope.filters.userStatus==undefined?null:$scope.filters.userStatus.statusTenantName;
            var customerName = $scope.filters.companies.selected==undefined?null:$scope.filters.companies.selected.name;
            var buildings = $scope.filters.buildings.selected==undefined?null:$scope.filters.buildings.selected.address;
            var nameTypeAttendant = $scope.filters.attProfile.nameTypeAttendant==undefined?null:$scope.filters.attProfile.nameTypeAttendant;
            var searchboxfilter = $scope.searchboxfilter==undefined?null:$scope.searchboxfilter;
            $timeout(function() {
              $scope.getUserLists(1, 'users');
            }, 500);
            $timeout(function() {
              $scope.search(nameProfile, statusTenantName, customerName, buildings, nameTypeAttendant, searchboxfilter, true);
              blockUI.stop();
            }, 600);
          }
        /**************************************************
        *                                                 *
        *                 SWITCH USER DATA                *
        *                                                 *
        **************************************************/
          $scope.customerDataFn=function(obj, opt){
            switch(opt){
              case "new":
                $scope.register.user={'fullNameUser':null, 'emailUser': null, 'phoneNumberUser': null, 'phoneLocalNumberUser': null, 'idAddresKf': null, 'idProfileKf': null, 'idTypeTenantKf': null, 'idCompanyKf': null, 'idTyepeAttendantKf': null, 'descOther': null, 'idDepartmentKf':null, 'isEdit': null, 'requireAuthentication': null, 'dni': null, 'idSysProfileFk': null, 'isCreateByAdmin': null};
                $scope.depto={'department':{'idDepartment':null, 'idUserKf':null}};
                var switchOption = obj.idProfileKf.idProfile;
                $scope.register.user.fullNameUser            = obj.fname+' '+obj.lname;
                $scope.register.user.idProfileKf             = obj.idProfileKf.idProfile;
                $scope.register.user.idSysProfileFk          = obj.idSysProfileFk;
                $scope.register.user.dni                     = obj.dni;
                $scope.register.user.emailUser               = obj.email;
                $scope.register.user.phoneLocalNumberUser    = obj.phonelocalNumberUser;
                $scope.register.user.phoneNumberUser         = obj.phoneMovilNumberUser;
                $scope.register.user.isEdit                  = 1;
                $scope.register.user.isCreateByAdmin         = 1;
                switch (switchOption) {
                  case "1": //SYS USER
                  break;
                  case "2": //COMPANY USER
                    $scope.register.user.idCompanyKf             = $scope.select.companies.selected.idClient;
                  break;
                  case "3": //OWNER USER
                    $scope.register.user.idDeparment_Tmp         = obj.idDepartmentKf;
                    $scope.register.user.idTypeTenantKf          = 1;
                  break;
                  case "4": //BUILDING ADMIN USER
                    $scope.register.user.idCompanyKf             = $scope.select.companies.selected.idClient;
                  break;
                  case "5": //TENANT USER
                    $scope.register.user.idAddresKf              = $scope.select.address.selected.idClient;
                    $scope.register.user.idDepartmentKf          = obj.idDepartmentKf;
                    $scope.register.user.idTypeTenantKf          = 2;
                  break;
                  case "6": //ATTENDANT USER
                    if (obj.idTypeAttKf!=1 && $scope.att.ownerOption==1){
                      $scope.register.user.idTypeTenantKf        =  1;
                      $scope.register.user.idDeparment_Tmp       = obj.idDepartmentKf;
                    }else if ($scope.register.user.idTypeAttKf!=1 && $scope.att.ownerOption==2){
                      $scope.register.user.idTypeTenantKf        =  2;
                      $scope.register.user.idDepartmentKf        = obj.idDepartmentKf;
                      $scope.register.user.idAddresKf            = $scope.select.address.selected.idClient;
                    }else{
                      $scope.register.user.idTypeTenantKf        =  null;
                      $scope.register.user.idAddresKf            = $scope.select.address.selected.idClient;
                    }
                    $scope.register.user.requireAuthentication   = obj.idTypeAttKf==1?0:1;
                    $scope.register.user.descOther               = obj.idTypeAttKf==1?obj.typeOtherAtt:null;
                    $scope.register.user.idTyepeAttendantKf      = obj.idTypeAttKf;
                  break;
                }
                console.log($scope.register.user);
                $scope.sysRegisterFn();
              break;
              case "update":
                blockUI.start('Actualizando usuario.');
                $timeout(function() {
                  $scope.update.user={'fullNameUser':null, 'emailUser': null, 'phoneNumberUser': null, 'phoneLocalNumberUser': null, 'idAddresKf': null, 'idProfileKf': null, 'idTypeTenantKf': null, 'idCompanyKf': null, 'idTyepeAttendantKf': null, 'descOther': null, 'idDepartmentKf':null, 'isEdit': null, 'requireAuthentication': null, 'dni': null, 'idSysProfileFk': null, 'isCreateByAdmin': null};
                  $scope.depto={'department':{'idDepartment':null, 'idUserKf':null}};
                  console.log(obj);
                  var switchOption = obj.idProfileKf;
                  $scope.update.user.idUser                      = obj.idUser;
                  $scope.update.user.fullNameUser                = obj.fname+' '+obj.lname;
                  $scope.update.user.idProfileKf                 = obj.idProfileKf;
                  $scope.update.user.idSysProfileFk              = obj.idSysProfileFk;
                  $scope.update.user.dni                         = obj.dni;
                  $scope.update.user.emailUser                   = obj.email;
                  $scope.update.user.phoneLocalNumberUser        = obj.phonelocalNumberUser;
                  $scope.update.user.phoneNumberUser             = obj.phoneMovilNumberUser;
                  $scope.update.user.isEdit                      = 1;
                  switch (switchOption) {
                    case "1": //SYS USER
                    break;
                    case "2": //COMPANY USER
                      $scope.update.user.idCompanyKf             = $scope.select.companies.selected.idClient;
                    break;
                    case "3": //OWNER USER
                      $scope.update.user.idDeparment_Tmp         = obj.idDepartmentKf;
                      $scope.update.user.idTypeTenantKf          = 1;
                    break;
                    case "4": //BUILDING ADMIN USER
                      $scope.update.user.idCompanyKf             = $scope.select.companies.selected.idClient;
                    break;
                    case "5": //TENANT USER
                      $scope.update.user.idAddresKf              = $scope.select.address.selected.idClient;
                      $scope.update.user.idDepartmentKf          = obj.idDepartmentKf;
                      $scope.update.user.idTypeTenantKf          = 2;
                    break;
                    case "6": //ATTENDANT USER
                      if (obj.idTypeAttKf!=1 && $scope.att.ownerOption==1){
                        $scope.update.user.idTypeTenantKf        =  1;
                        $scope.update.user.idDeparment_Tmp       = obj.idDepartmentKf;
                      }else if (obj.idTypeAttKf!=1 && $scope.att.ownerOption==2){
                        $scope.update.user.idTypeTenantKf        =  2;
                        $scope.update.user.idDepartmentKf        = obj.idDepartmentKf;
                      }else{
                        $scope.update.user.idTypeTenantKf        =  null;
                      }
                      $scope.update.user.idAddresKf              = $scope.select.address.selected.idClient;
                      $scope.update.user.requireAuthentication   = obj.idTypeAttKf==1?0:1;
                      $scope.update.user.descOther               = obj.idTypeAttKf==1?obj.typeOtherAtt:null;
                      $scope.update.user.idTyepeAttendantKf      = obj.idTypeAttKf;
                    break;
                  }
                  $scope.sysUpdateFn();
                }, 500);
                  //console.log($scope.update.user);
              break;
            }
          };
        /**************************************************
        *                                                 *
        *                   ADD USER                      *
        *                                                 *
        **************************************************/
          $scope.sysRegisterFn = function(){
            console.log($scope.register);
            var nameProfile = $scope.filters.userProfile==undefined?null:$scope.filters.userProfile.nameProfile;
            var statusTenantName = $scope.filters.userStatus==undefined?null:$scope.filters.userStatus.statusTenantName;
            var customerName = $scope.filters.companies.selected==undefined?null:$scope.filters.companies.selected.name;
            var buildings = $scope.filters.buildings.selected==undefined?null:$scope.filters.buildings.selected.address;
            var nameTypeAttendant = $scope.filters.attProfile.nameTypeAttendant==undefined?null:$scope.filters.attProfile.nameTypeAttendant;
            var searchboxfilter = $scope.searchboxfilter==undefined?null:$scope.searchboxfilter;
              userServices.addUser($scope.register).then(function(response_userRegister){
                if(response_userRegister.status==200){
                  console.log("REGISTERED SUCCESSFULLY");
                    inform.add('Usuario '+$scope.register.user.fullNameUser+' registrado satisfactoriamente.',{
                      ttl:5000, type: 'success'
                    });
                    $timeout(function() {
                      $scope.getUserLists(1, 'users');
                    }, 500);
                    $timeout(function() {
                      $scope.search(nameProfile, statusTenantName, customerName, buildings, nameTypeAttendant, searchboxfilter, true)
                      blockUI.stop();
                    }, 600);
                    userServices.findUserByEmail($scope.register.user.dni).then(function(response_userFound) {
                      if(response_userFound.status==200){
                        if(($scope.register.user.idProfileKf==3 || $scope.register.user.idProfileKf==6) && $scope.register.user.idTypeTenantKf==1 && $scope.register.user.idDeparment_Tmp){
                          blockUI.start('Asociando usuario al departamento seleccionado.');
                          $timeout(function() {
                            $scope.depto.department.idUserKf=response_userFound.data[0].idUser;
                            $scope.depto.department.idDepartment=$scope.register.user.idDeparment_Tmp;
                          }, 1500); 
                          //console.log(response_userFound);
                          //OWNER
                          $timeout(function() {
                            $scope.fnAssignDepto($scope.depto);
                          }, 1500);
                          $timeout(function() {
                            blockUI.message('Aprobando departamento del usuario.');
                            $scope.approveDepto($scope.register.user.idTypeTenantKf, $scope.depto.department.idDepartment, 1);
                            blockUI.stop();
                          }, 1500);
                        }else if(($scope.register.user.idProfileKf==5 || $scope.register.user.idProfileKf==6) && $scope.register.user.idTypeTenantKf==2 && $scope.register.user.idDepartmentKf){
                          blockUI.start('Aprobando departamento del usuario.');
                          $timeout(function() {
                            $scope.depto.department.idUserKf=response_userFound.data[0].idUser;
                            $scope.depto.department.idDepartment=$scope.register.user.idDepartmentKf;
                          }, 1500);
                          $timeout(function() {
                            //TENANT
                            $scope.approveDepto($scope.register.user.idTypeTenantKf, $scope.depto.department.idUserKf, 1);
                          }, 1500); 
                        }
                      }
                    });
                }else if (response_userRegister.status==404){
                  inform.add('[Error]: '+response_userRegister.status+', Ocurrio error intenta de nuevo o contacta el area de soporte. ',{
                    ttl:5000, type: 'warning'
                    });
                }else if(response_userRegister.status==500){
                  inform.add('[Error]: '+response_userRegister.status+', Ha ocurrido un error en la comunicacion con el servidor, contacta el area de soporte. ',{
                    ttl:5000, type: 'danger'
                    });
                }
              });
              $('#RegisterUser').modal('hide');
          }
        /**************************************************
        *                                                 *
        *                   UPDATE USER                   *
        *                                                 *
        **************************************************/
          $scope.sysUpdateFn = function(){
            console.log($scope.update.user);
            var nameProfile = $scope.filters.userProfile==undefined?null:$scope.filters.userProfile.nameProfile;
            var statusTenantName = $scope.filters.userStatus==undefined?null:$scope.filters.userStatus.statusTenantName;
            var customerName = $scope.filters.companies.selected==undefined?null:$scope.filters.companies.selected.name;
            var buildings = $scope.filters.buildings.selected==undefined?null:$scope.filters.buildings.selected.address;
            var nameTypeAttendant = $scope.filters.attProfile.nameTypeAttendant==undefined?null:$scope.filters.attProfile.nameTypeAttendant;
            var searchboxfilter = $scope.searchboxfilter==undefined?null:$scope.searchboxfilter;
            userServices.updateUser($scope.update).then(function(response){
              if(response.status==200){
                $timeout(function() {
                  console.log("Usuario: "+$scope.update.user.fullNameUser+" Successfully updated");
                  inform.add('El Usuario: '+$scope.update.user.fullNameUser+' ha sido actualizado con exito. ',{
                        ttl:3000, type: 'success'
                  });
                  blockUI.message('Usuario: '+$scope.update.user.fullNameUser+' actualizado con exito');
                }, 1500);
                $timeout(function() {
                  $scope.getUserLists(1, 'users');
                }, 500);
                $timeout(function() {
                  $scope.search(nameProfile, statusTenantName, customerName, buildings, nameTypeAttendant, searchboxfilter, true)
                  blockUI.stop();
                }, 600);

              }else if (response.status==404){
                $timeout(function() {
                  inform.add('[Error]: '+response.status+', Ocurrio error intenta de nuevo o contacta el area de soporte. ',{
                    ttl:5000, type: 'warning'
                    });
                    blockUI.message('Usuario: '+$scope.update.user.fullNameUser+' no sido actualizado.');
                  }, 1500);
              }else if($scope.rsJsonData.status==500){
                $timeout(function() {
                  inform.add('[Error]: '+response.status+', Ha ocurrido un error en la comunicacion con el servidor, contacta el area de soporte. ',{
                  ttl:5000, type: 'danger'
                  });
                  blockUI.message('[Error]: '+response.status+', Ha ocurrido un error en la comunicacion con el servidor.');
                }, 1500);
              }
            });
            $('#UpdateUser').modal('hide');
          }
        /**************************************************
        *                                                 *
        *   ASSIGN DEPARTMENT TO THE CURRENT OWNER USER   *
        *                                                 *
        **************************************************/
          $scope.fnAssignDepto = function(userData){
            DepartmentsServices.assignDepto(userData).then(function(response) {
              if(response.status==200){
                inform.add('Departamento Asignado y pendiente por aprobacion por la administracion.',{
                  ttl:3000, type: 'success'
                });
              }else if (response.status==404){
                inform.add('Ocurrio un error, contacte al area de soporte de TASS.',{
                  ttl:3000, type: 'danger'
                });
              }
            });
          }
        /**************************************************
        *                                                 *
        *  APPROVE DEPARTMENT TO AN OWNER OR TENANT USER  *
        *                                                 *
        **************************************************/
          $scope.approveDepto = function (type, id, idStatus) {
            switch (type){
              case 1: //OWNER
                DepartmentsServices.approveOwnerDepto(id).then(function(response) {
                  if(response.status==200){
                    inform.add('Departamento del propietario autorizado satisfactoriamente.',{
                      ttl:5000, type: 'success'
                    });
                  }else if (response.status==404){
                    inform.add('[Error]: '+response.status+', Ocurrio error intenta de nuevo o contacta el area de soporte. ',{
                      ttl:5000, type: 'warning'
                      });
                  }
                });
              break;
              case 2: //TENANT
                DepartmentsServices.approveTenantDepto(id, idStatus).then(function(response) {
                  if(response.status==200){
                    inform.add('Departamento del Habitante autorizado satisfactoriamente.',{
                      ttl:5000, type: 'success'
                    });
                  }else if (response.status==404){
                    inform.add('[Error]: '+response.status+', Ocurrio error intenta de nuevo o contacta el area de soporte. ',{
                      ttl:5000, type: 'warning'
                      });
                  }
                });
              break;
            }
          };

        /**************************************************
        *                                                 *
        *                DISABLED AN USER                 *
        *                                                 *
        **************************************************/
          $scope.disabledUser = function (user) {
            blockUI.start('Deshabilitando usuario.');
            var nameProfile = $scope.filters.userProfile==undefined?null:$scope.filters.userProfile.nameProfile;
            var statusTenantName = $scope.filters.userStatus==undefined?null:$scope.filters.userStatus.statusTenantName;
            var customerName = $scope.filters.companies.selected==undefined?null:$scope.filters.companies.selected.name;
            var buildings = $scope.filters.buildings.selected==undefined?null:$scope.filters.buildings.selected.address;
            var nameTypeAttendant = $scope.filters.attProfile.nameTypeAttendant==undefined?null:$scope.filters.attProfile.nameTypeAttendant;
            var searchboxfilter = $scope.searchboxfilter==undefined?null:$scope.searchboxfilter;
            userServices.disabled(user.idUser).then(function(response){
              //console.log(response);
              if(response.status==200 && response.data){
                inform.add('El usuario '+user.fullNameUser+' ha sido deshabilitado con exito.',{
                  ttl:5000, type: 'warning'
                });
                blockUI.message('El usuario ha sido deshabilitado con exito!');
                $timeout(function() {
                  $scope.getUserLists(1, 'users');
                }, 500);
                $timeout(function() {
                  $scope.search(nameProfile, statusTenantName, customerName, buildings, nameTypeAttendant, searchboxfilter, true)
                  blockUI.stop();
                }, 600);
              }else if(response.status==200 && !response.data){
                blockUI.message('El usuario no ha sido deshabilitado!');
                inform.add('El usuario no ha sido deshabilitado, intenta de nuevo o contacta el area de soporte.',{
                  ttl:5000, type: 'warning'
                });
                $timeout(function() {
                  $scope.getUserLists(1, 'users');
                }, 500);
                $timeout(function() {
                  $scope.search(nameProfile, statusTenantName, customerName, buildings, nameTypeAttendant, searchboxfilter, true)
                  blockUI.stop();
                }, 600);
              }else if(response.status==404){
                inform.add('[Error]: '+response.status+', Ocurrio error intenta de nuevo o contacta el area de soporte. ',{
                  ttl:5000, type: 'warning'
                  });
                $timeout(function() {
                  $scope.getUserLists(1, 'users');
                }, 500);
                $timeout(function() {
                  $scope.search(nameProfile, statusTenantName, customerName, buildings, nameTypeAttendant, searchboxfilter, true)
                  blockUI.stop();
                }, 600);
              }else if(response.status==500){
                inform.add('[Error]: '+response.status+', Ha ocurrido un error en la comunicacion con el servidor, contacta el area de soporte. ',{
                  ttl:5000, type: 'danger'
                  });
                $timeout(function() {
                  $scope.getUserLists(1, 'users');
                }, 500);
                $timeout(function() {
                  $scope.search(nameProfile, statusTenantName, customerName, buildings, nameTypeAttendant, searchboxfilter, true)
                  blockUI.stop();
                }, 600);
              }
              $scope.argObj={};
            });
          };
        /**************************************************
        *                                                 *
        *                 ENABLED AN USER                 *
        *                                                 *
        **************************************************/
          $scope.enabledUser = function (user) {
            blockUI.start('Habilitando usuario.');
            var nameProfile = $scope.filters.userProfile==undefined?null:$scope.filters.userProfile.nameProfile;
            var statusTenantName = $scope.filters.userStatus==undefined?null:$scope.filters.userStatus.statusTenantName;
            var customerName = $scope.filters.companies.selected==undefined?null:$scope.filters.companies.selected.name;
            var buildings = $scope.filters.buildings.selected==undefined?null:$scope.filters.buildings.selected.address;
            var nameTypeAttendant = $scope.filters.attProfile.nameTypeAttendant==undefined?null:$scope.filters.attProfile.nameTypeAttendant;
            var searchboxfilter = $scope.searchboxfilter==undefined?null:$scope.searchboxfilter;
            userServices.enabled(user.idUser).then(function(response){
              //console.log(response);
              if(response.status==200 && response.data){
                inform.add('El usuario '+user.fullNameUser+' ha sido habilitado con exito.',{
                  ttl:5000, type: 'success'
                });
                blockUI.message('El usuario ha sido habilitado con exito!');
                $timeout(function() {
                  $scope.getUserLists(1, 'users');
                  
                }, 500);
                $timeout(function() {
                  //console.log(nameProfile+statusTenantName+customerName+buildings+nameTypeAttendant+searchboxfilter);
                  $scope.search(nameProfile, statusTenantName, customerName, buildings, nameTypeAttendant, searchboxfilter, true)
                  blockUI.stop();
                }, 600);
              }else if(response.status==200 && !response.data){
                blockUI.message('El usuario no ha sido habilitado!');
                inform.add('El usuario no ha sido habilitado, intenta de nuevo o contacta el area de soporte.',{
                  ttl:5000, type: 'warning'
                });
                $timeout(function() {
                  $scope.getUserLists(1, 'users');
                }, 500);
                $timeout(function() {
                  $scope.search(nameProfile, statusTenantName, customerName, buildings, nameTypeAttendant, searchboxfilter, true)
                  blockUI.stop();
                }, 600);
              }else if(response.status==404){
                inform.add('[Error]: '+response.status+', Ocurrio error intenta de nuevo o contacta el area de soporte. ',{
                  ttl:5000, type: 'warning'
                  });
                  $timeout(function() {
                    $scope.getUserLists(1, 'users');
                  }, 500);
                  $timeout(function() {
                    $scope.search(nameProfile, statusTenantName, customerName, buildings, nameTypeAttendant, searchboxfilter, true)
                    blockUI.stop();
                  }, 600);
              }else if(response.status==500){
                inform.add('[Error]: '+response.status+', Ha ocurrido un error en la comunicacion con el servidor, contacta el area de soporte. ',{
                  ttl:5000, type: 'danger'
                  });
                  $timeout(function() {
                    $scope.getUserLists(1, 'users');
                  }, 500);
                  $timeout(function() {
                    $scope.search(nameProfile, statusTenantName, customerName, buildings, nameTypeAttendant, searchboxfilter, true)
                    blockUI.stop();
                  }, 600);
              }
              $scope.argObj={};
            });
          };
        /**************************************************
        *                                                 *
        *                 DELETE AN USER                  *
        *                                                 *
        **************************************************/
          $scope.deleteUser = function (user) {
            blockUI.start('Eliminando usuario.');
            var nameProfile = $scope.filters.userProfile==undefined?null:$scope.filters.userProfile.nameProfile;
            var statusTenantName = $scope.filters.userStatus==undefined?null:$scope.filters.userStatus.statusTenantName;
            var customerName = $scope.filters.companies.selected==undefined?null:$scope.filters.companies.selected.name;
            var buildings = $scope.filters.buildings.selected==undefined?null:$scope.filters.buildings.selected.address;
            var nameTypeAttendant = $scope.filters.attProfile.nameTypeAttendant==undefined?null:$scope.filters.attProfile.nameTypeAttendant;
            var searchboxfilter = $scope.searchboxfilter==undefined?null:$scope.searchboxfilter;
            userServices.remove(user.idUser).then(function(response){
              //console.log(response);
              if(response.status==200 && response.data){
                inform.add('El usuario '+user.fullNameUser+' ha sido eliminado con exito.',{
                  ttl:5000, type: 'danger'
                });
                blockUI.message('El usuario ha sido eliminado con exito!');
                $timeout(function() {
                  $scope.getUserLists(1, 'users');
                }, 500);
                $timeout(function() {
                  $scope.search(nameProfile, statusTenantName, customerName, buildings, nameTypeAttendant, searchboxfilter, true)
                  blockUI.stop();
                }, 600);
              }else if(response.status==200 && !response.data){
                blockUI.message('El usuario no ha sido eliminado!');
                inform.add('El usuario no ha sido eliminado, intenta de nuevo o contacta el area de soporte.',{
                  ttl:5000, type: 'warning'
                });
                $timeout(function() {
                  $scope.getUserLists(1, 'users');
                }, 500);
                $timeout(function() {
                  $scope.search(nameProfile, statusTenantName, customerName, buildings, nameTypeAttendant, searchboxfilter, true)
                  blockUI.stop();
                }, 600);
              }else if(response.status==404){
                inform.add('[Error]: '+response.status+', Ocurrio error intenta de nuevo o contacta el area de soporte. ',{
                  ttl:5000, type: 'warning'
                  });
                $timeout(function() {
                  $scope.getUserLists(1, 'users');
                }, 500);
                $timeout(function() {
                  $scope.search(nameProfile, statusTenantName, customerName, buildings, nameTypeAttendant, searchboxfilter, true)
                  blockUI.stop();
                }, 600);
              }else if(response.status==500){
                inform.add('[Error]: '+response.status+', Ha ocurrido un error en la comunicacion con el servidor, contacta el area de soporte. ',{
                  ttl:5000, type: 'danger'
                  });
                $timeout(function() {
                  $scope.getUserLists(1, 'users');
                }, 500);
                $timeout(function() {
                  $scope.search(nameProfile, statusTenantName, customerName, buildings, nameTypeAttendant, searchboxfilter, true)
                  blockUI.stop();
                }, 600);
              }
              $scope.argObj={};
            });
          };
        /**************************************************
        *                                                 *
        *                CHECK MAIL OR DNI                *
        *                   DUPLICATES                    *
        *                                                 *|
        **************************************************/
          $scope.sysCheck4Duplicates = function(value, opt){
            if(value){
              console.log($scope.users.update.mail);
              console.log(value);
              console.log(opt);
              if ((($scope.users.new.dni!=undefined && opt=="dni") || ($scope.users.new.email!=undefined && opt=="mail")) || (($scope.users.update.dni!=undefined && $scope.users.tmp.dni!=value && opt=="dni") || ($scope.users.update.email!=undefined && $scope.users.tmp.email!=value && opt=="mail"))){
                userServices.findUserByEmail(value).then(function(response) {
                  //console.log(response);
                  if(response.status==200){
                    if(APP_REGEX.checkDNI.test(value)){
                      $scope.sysDNIRegistered=true;
                      //console.log(response.data[0].fullNameUser);
                      $scope.users.new.dni=undefined;
                    }
                    if(APP_REGEX.checkEmail.test(value)){
                      $scope.sysEmailRegistered=true;
                    }
                  }else if (response.status==404){
                    if(APP_REGEX.checkDNI.test(value)){
                      $scope.sysDNIRegistered=false;
                    }
                    if(APP_REGEX.checkEmail.test(value)){
                      $scope.sysEmailRegistered=false;
                    }
                  }
                });
              }
            }
          }
        /**************************************************
        *                                                 *
        * DEPARTMENT LIST BY SELECTED ADDRESS AND TENANT  *
        *                                                 *
        **************************************************/
          $scope.getDeptoListByAddress = function (idAddress){
            $scope.ListDpto={};
            var idProfileFk = $scope.users.new.idProfileKf!=undefined?$scope.users.new.idProfileKf.idProfile:$scope.users.update.idProfileKf;
            if((((idProfileFk==3 || idProfileFk==5) && !$scope.users.new.idTypeAttKf) || (idProfileFk==6 && $scope.users.new.idTypeAttKf!=1)) || (((idProfileFk==3 || idProfileFk==5) && !$scope.users.update.idTypeAttKf) || (idProfileFk==6 && $scope.users.update.idTypeAttKf!=1))){
              var idAddressTmp=idAddress;
              console.log("idAddressTmp: "+idAddressTmp);
              var idStatusFk=null;
                if(idProfileFk==3){
                  idStatusFk='0';
                }else{
                  idStatusFk='-1';
                }
                DepartmentsServices.byIdDireccion(idAddress, idStatusFk).then(function(response) {
                  if(response.status==200){
                    $scope.ListDpto = response.data;
                  }else if (response.status==404){
                    inform.add('No hay departamentos en esta direccion para ser asociados, contacte al area de soporte de TASS.',{
                      ttl:5000, type: 'danger'
                    });
                  }
                });

            }
          };
        /**************************************************/
          $scope.hideDeptoByProfile = function(item){
          console.log(item);
          return function(item){
            if(($scope.users.new.idProfileKf.idProfile==3 || $scope.users.new.idProfileKf.idProfile==5) && (item.idUserKf!=null || item.idUserKf==null)  && (item.floor=="pb" || item.floor=="ba" || item.floor=="co" || item.floor=="lo")){
            
              //$scope.ownerFound=true;
              //console.log("ownerFound1: "+$scope.ownerFound+"item.idUserKf: "+item.idUserKf)
              return false;
            }
          }
          };
/*******************************************************************
*                                                                  *
*                  USERS PROFILES ROLES FUNCTIONS                  *
*                                                                  *
*******************************************************************/
        /**************************************************
        *                                                 *
        *               LIST SYS PROFILE                  *
        *                                                 *
        **************************************************/
         $scope.rsProfileData = [];
          $scope.getSysProfilesFn = function(search){
            ProfileServices.listProfiles(search).then(function(data){
                $scope.rsProfileData = data;
                $scope.loadPagination($scope.rsProfileData, "idProfiles", "7");
                //console.log($scope.rsProfileData);
            });
          };$scope.getSysProfilesFn("");
        /**************************************************
        *                                                 *
        *                NEW SYS PROFILE                  *
        *                                                 *
        **************************************************/
          $scope.checkBoxes={modulo: {}};
          $scope.sysProfile={Name:''};
          var newProfile={profile:{name:'', list_id_modules:[{}]}};
          var listOfModules=[];
          $scope.newSysProfileFn = function(){
            console.clear();
            i=0;
            listOfModules=[];
            var chkbModules = $scope.checkBoxes.modulo;
            var firArrItem=Object.keys(chkbModules).length==1?Object.keys(chkbModules)[0]:null;
            if ((Object.keys(chkbModules).length>1) || (Object.keys(chkbModules).length==1 && chkbModules[firArrItem]!=false)){
              for (var key in chkbModules){
                if (chkbModules[key]==true){
                  listOfModules.push({'idModuleFk':key});
                }
              }
              if (listOfModules.length>0){
                newProfile.profile.name=$scope.sysProfile.Name;
                newProfile.profile.list_id_modules=listOfModules;
                //console.log("Sending data to the API...");
                ProfileServices.newSysProfile(newProfile).then(function(data){
                  var rsNewProfileData = data;
                  //console.log("STATUS: "+rsNewProfileData.status);
                  //console.log("MSG   : "+rsNewProfileData.statusText);
                  //console.log("DATA  : "+rsNewProfileData.data.response);
                  //console.log($scope.rsModulesData);
                  $('#newSysProfile').modal('hide');
                  if (rsNewProfileData.status==200){
                    inform.add("Perfil creado satisfactoriamente",{
                      ttl:5000, type: 'success'
                    });
                  }
                  $scope.getSysProfilesFn("");
                });
                //console.log(newProfile);
              }else{
                inform.add('Selecciona un modulo como minimo para crear el perfil',{
                  ttl:5000, type: 'warning'
                });
              }
              
            }else{
                inform.add('Selecciona un modulo como minimo para crear el perfil',{
                  ttl:5000, type: 'warning'
                });
            }   
          }
      /**************************************************
       *                                                 *
       *               UPDATE SYS PROFILE                *
       *                                                 *
       **************************************************/
          $scope.chkBox={modulo: {}};
          $scope.sysUpProfile={Name:''};
          var updProfile={profile:{idProfiles:'', name:'', list_id_modules:[{}]}};
          $scope.tmpSysModules = [];
          $scope.selectProfileDataFn=function(obj){
            console.clear();
            $scope.tmpSysModules=obj;
            console.log($scope.tmpSysModules);
            var chkbModules = $scope.chkBox.modulo;
            console.log($scope.chkBox.modulo);
            /*PUT ALL THE CHECKBOXES TO FALSE OR UNCHECKED STATE */
            for (var key in chkbModules){
                if (chkbModules[key]==true){
                  $scope.chkBox.modulo[key]=false;
                }
            }
            $scope.sysUpProfile.Name=$scope.tmpSysModules.name;
            $scope.isNewProfileRole=false;
            $scope.isUpdateProfileRole=true;
            $scope.isNewUser=false;
            $scope.isUpdateUser=false;
            console.log($scope.tmpSysModules.modules);
            //console.log($scope.tmpSysModules.length);
            $scope.chkBox.modulo.row
            for (var i = 0; i < $scope.tmpSysModules.modules.length; i++) {
              $scope.chkBox.modulo[$scope.tmpSysModules.modules[i].idModule]=true;
            }
            $("#updateSysProfile").modal({backdrop: 'static', keyboard: false});
              $("#updateSysProfile").on('shown.bs.modal', function () {
                $("#profileName").focus();
              });
            //console.log($scope.checkBoxes);
          }
          $scope.data2UpdateSysProfileFn=function(){
            console.clear();
            i=0;
            var listOfModules=[];
            var chkbModules = $scope.chkBox.modulo;
            var firArrItem=Object.keys(chkbModules).length==1?Object.keys(chkbModules)[0]:null;
            if ((Object.keys(chkbModules).length>1) || (Object.keys(chkbModules).length==1 && chkbModules[firArrItem]!=false)){
              for (var key in chkbModules){
                if (chkbModules[key]==true){
                  listOfModules.push({'idModuleFk':key});
                }
              }
              if (listOfModules.length>0){
                updProfile.profile.idProfiles=$scope.tmpSysModules.idProfiles;
                updProfile.profile.name=$scope.sysUpProfile.Name;
                updProfile.profile.list_id_modules=listOfModules;
                console.log("Sending data to the API...");
                $scope.updateSysProfileFn(updProfile,1);
                //console.log(updProfile);
              }else{
                inform.add('Selecciona un modulo como minimo para crear el perfil',{
                  ttl:5000, type: 'warning'
                });
              }
              
            }else{
                inform.add('Selecciona un modulo como minimo para crear el perfil',{
                  ttl:5000, type: 'warning'
                });
            } 
          }
          $scope.chkBox2={modulo: {}};
          $scope.sysProfFound=false;
          $scope.sysFindFn=function(string){
            var output=[{idProfiles:'', nameProf: ''}];
            var i=0;
            if (string!=undefined && string!=""){
              angular.forEach($scope.rsProfileData,function(sysProfile){
                var sysIdProfile=sysProfile.name;
                if(sysIdProfile.toLowerCase().indexOf(string.toLowerCase())>=0){
                  output.push({sysProfile});
                }
              });
            }else{
                  $scope.filterSysProfile=null;
                  $scope.sysProfFound=false;
            }
            $scope.filterSysProfile=output;
            console.info($scope.filterSysProfile);
          }
          $scope.fillTextbox=function(item){
            $scope.tmpSysModules=item;
            $scope.sysUpProfile.Name=item.name;
            var chkbModules = $scope.chkBox2.modulo;
            /*PUT ALL THE CHECKBOXES TO FALSE OR UNCHECKED STATE */
            for (var key in chkbModules){
                if (chkbModules[key]==true){
                  $scope.chkBox2.modulo[key]=false;
                }
            }
            console.log(item);
            for (var i = 0; i < item.modules.length; i++) {
              $scope.chkBox2.modulo[item.modules[i].idModule]=true;
            }
            $scope.filterSysProfile=null;
            $scope.sysProfFound=true;
          }
          $scope.data2UpdateSysProfile2Fn=function(item){
            console.clear();
            i=0;
            var listOfModules=[];
            var chkbModules = $scope.chkBox2.modulo;
            var firArrItem=Object.keys(chkbModules).length==1?Object.keys(chkbModules)[0]:null;
            if ((Object.keys(chkbModules).length>1) || (Object.keys(chkbModules).length==1 && chkbModules[firArrItem]!=false)){
              for (var key in chkbModules){
                if (chkbModules[key]==true){
                  listOfModules.push({'idModuleFk':key});
                }
              }
              if (listOfModules.length>0){
                updProfile.profile.idProfiles=$scope.tmpSysModules.idProfiles;
                updProfile.profile.name=$scope.sysUpProfile.Name;
                updProfile.profile.list_id_modules=listOfModules;
                console.log("Sending data to the API...");
                $scope.updateSysProfileFn(updProfile,2);
              }else{
                inform.add('Selecciona un modulo como minimo para crear el perfil',{
                  ttl:5000, type: 'warning'
                });
              }
              
            }else{
                inform.add('Selecciona un modulo como minimo para crear el perfil',{
                  ttl:5000, type: 'warning'
                });
            } 
          }
          $scope.rsUpdProfileData={};
          $scope.updateSysProfileFn = function(dataProfile, opt){
            ProfileServices.updateSysProfile(dataProfile).then(function(data){
              $scope.rsUpdProfileData=data;
              console.log("STATUS: "+$scope.rsUpdProfileData.status);
              console.log("MSG   : "+$scope.rsUpdProfileData.statusText);
              console.log("DATA  : "+$scope.rsUpdProfileData.data);
              switch(opt){
                case 1:
                  if ($scope.rsUpdProfileData.status==200){
                    $scope.getSysProfilesFn("");
                    $scope.tmpSysModules={};
                    $('#updateSysProfile').modal('hide');
                    inform.add("Perfil Actualizado satisfactoriamente",{
                      ttl:5000, type: 'success'
                    });
                    
                  }
                break;
                case 2:
                if ($scope.rsUpdProfileData.status==200){
                    inform.add("Perfil Actualizado satisfactoriamente",{
                      ttl:5000, type: 'success'
                    });
                    $scope.getSysProfilesFn("");
                    $scope.filterSysProfile=null;
                    $scope.sysProfFound=false;
                    $scope.sysUpProfile.Name="";
                    $scope.tmpSysModules={};
                    $("#sysIdProfileKf").focus();
                  }
                break;
              }
              //console.log($scope.rsModulesData); 
            });
          }
          $scope.deleteSysProfileFn = function(idProfile){
            ProfileServices.deleteSysProfile(idProfile).then(function(data){
              $scope.rsDelProfileData=data;
              console.log("STATUS: "+$scope.rsDelProfileData.status);
              console.log("MSG   : "+$scope.rsDelProfileData.statusText);
              console.log("DATA  : "+$scope.rsDelProfileData.data);
              if ($scope.rsDelProfileData.status==200){
                $scope.getSysProfilesFn("");
                inform.add("Perfil Eliminado satisfactoriamente",{
                  ttl:5000, type: 'success'
                });
                
              }
              //console.log($scope.rsModulesData); 
            });
          }
          /**************************************************
          *                                                 *
          *                GET SYS MODULES                  *
          *                                                 *
          **************************************************/
            $scope.rsModulesData = {};
            $scope.getSysModulesFn = function(){
              $scope.rsModulesData = {};
              ProfileServices.getSysModules().then(function(data){
                  $scope.rsModulesData = data;
                  //console.log($scope.rsModulesData);
              });
            };$scope.getSysModulesFn();

          /**************************************************************************************/
            $scope.cleanFilters = function(){
              $scope.filters={'companies':{'selected':undefined},'buildings':{'selected':undefined},'attProfile':{},'status':{}, 'tenantProfile':{}, 'userProfile':{}, 'searchboxfilter':''}
              $scope.select={'companies':{'selected':undefined}, 'address':{'selected':undefined}}
            }

            $scope.getUserLists("","");
            $scope.filters={'companies':{'selected':undefined},'buildings':{'selected':undefined},'attProfile':{},'status':{}, 'tenantProfile':{}, 'userProfile':{}, 'searchboxfilter':''}
            $scope.select={'companies':{'selected':undefined}, 'address':{'selected':undefined}}
            $scope.users={'new':{}, 'update':{}, 'details':{}}
            $scope.register={'user':{}};
            $scope.register.user={'fullNameUser':null, 'emailUser': null, 'phoneNumberUser': null, 'phoneLocalNumberUser': null, 'idAddresKf': null, 'idProfileKf': null, 'idTypeTenantKf': null, 'idCompanyKf': null, 'idTyepeAttendantKf': null, 'descOther': null, 'idDepartmentKf':null, 'isEdit': null, 'requireAuthentication': null, 'dni': null, 'idSysProfileFk': null, 'isCreateByAdmin': null};
            $scope.update={'user':{}};
            $scope.update.user={'fullNameUser':null, 'emailUser': null, 'phoneNumberUser': null, 'phoneLocalNumberUser': null, 'idAddresKf': null, 'idProfileKf': null, 'idTypeTenantKf': null, 'idCompanyKf': null, 'idTyepeAttendantKf': null, 'descOther': null, 'idDepartmentKf':null, 'isEdit': null, 'requireAuthentication': null, 'dni': null, 'idSysProfileFk': null, 'isCreateByAdmin': null};
            $scope.depto={'department':{'idDepartment':null, 'idUserKf':null}};
            $scope.userList={};
            $scope.isNewUser=null;
            $scope.isUpdateUser=null;
            $scope.isNewProfileRole=null;
            $scope.isUpdateProfileRole=null;
            $scope.userOwnerDeptos=[];
            $scope.sysContentList = "";
            $scope.att={'ownerOption':null};
            $scope.form = {};
            $scope.managedUsers = function(val1, val2, fnAction){
                $scope.sysReg={};
                //$scope.filterCompanyKf.selected           = undefined;
                //$scope.filterAddressKf.selected           = undefined;
                switch (val1){
                  /*CUSTOMER USERS*/
                  case "new":
                      switch (val2) {
                          case "user":
                            $scope.form.fNewUser.$setPristine();
                            $scope.users={'new':{}, 'update':{}, 'details':{}, 'register':{}}
                            $scope.select={'companies':{'selected':undefined}, 'address':{'selected':undefined}}
                            $scope.users.new={'idUser':null,'idProfileKf':{}, 'idSysProfileFk':null, 'fname':'','lname':'', 'dni':'','email':'', 'phonelocalNumberUser':'', 'phoneMovilNumberUser':'', 'idDepartmentKf':null, 'idTypeAttKf':null, 'typeOtherAtt':''}
                            $scope.att={'ownerOption':null};
                            $scope.isNewUser=true;$scope.isUpdateUser=false;
                            $scope.isNewProfileRole=false;$scope.isUpdateProfileRole=false;
                            $scope.sysDNIRegistered = 0;
                            $scope.sysEmailRegistered = 0;
                            $("#RegisterUser").modal({backdrop: 'static', keyboard: false});
                            $("#RegisterUser").on('shown.bs.modal', function () {
                              $("#profile").focus();
                            });
                          break;
                          case "profileRole":
                            $scope.sysProfile.Name="";
                            $scope.checkBoxes.modulo=false;
                            $scope.isNewProfileRole=true;$scope.isUpdateProfileRole=false;
                            $scope.isNewUser=false;$scope.isUpdateUser=false;
                            $("#newSysProfile").modal({backdrop: 'static', keyboard: false});
                            $("#newSysProfile").on('shown.bs.modal', function () {
                              $("#profileName").focus();
                            });
                          break;
                      }
                  break;
                  case "list":
                    $scope.userList={};
                    switch (val2){
                        case "users":
                          $scope.sysContentList = "";
                          $scope.userList=$scope.rsList.users;
                          $scope.loadPagination($scope.userList, "idUser", "7");
                          $scope.sysContentList = 'users';
                        break;
                        case "owners_tenants":
                          $scope.sysContentList = "";
                          $scope.userList=$scope.rsList.owners_tenants;
                          $scope.loadPagination($scope.userList, "idUser", "7");
                          $scope.sysContentList = 'owners_tenants';
                        break;
                        case "tenant":
                          $scope.sysContentList = "";
                          $scope.userList=$scope.rsList.tenants;
                          $scope.loadPagination($scope.userList, "idUser", "7");
                          $scope.sysContentList = 'tenant';
                        break;
                        case "att":
                          $scope.sysContentList = "";
                          $scope.userList=$scope.rsList.attendants;
                          $scope.loadPagination($scope.userList, "idUser", "7");
                          $scope.sysContentList = 'att';
                        break;
                        case "company":
                          $scope.sysContentList = "";
                          $scope.userList=$scope.rsList.companyUser;
                          $scope.loadPagination($scope.userList, "idUser", "7");
                          $scope.sysContentList = 'company';
                        break;
                        case "sysUsers":
                          $scope.sysContentList = "";
                          $scope.userList=$scope.rsList.sysUser;
                          $scope.loadPagination($scope.userList, "idUser", "7");
                          $scope.sysContentList = 'sysUsers';
                        break;
                        case "profileRoles":
                          $scope.sysContentList = "";
                          $scope.loadPagination($scope.rsProfileData, "idProfiles", "10");
                          $scope.sysContentList = 'profileRoles';
                        break;
                    }
                  break;
                  /*USERS*/
                  default:
                }
            }
});