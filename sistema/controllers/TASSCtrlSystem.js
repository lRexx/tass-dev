/**
* System Controller
**/
var system = angular.module("module.System", ["tokenSystem", "angular.filter", "services.Customers", "ui.select", "services.Ticket", "services.Products", "services.Utilities", "services.Departments", "bootstrapLightbox","services.Service", "services.Contracts", "services.Products", "services.User"]);
/**************************************************
*                                                 *
*          DATE FILTER FOR MYSQL TIMESTAMP        *
*                                                 *
**************************************************/
system.filter('dateToISO', function() {
    return function(input) {
        input = new Date(input).toISOString();
        return input;
    }
});

system.filter('toDate', function() {
    return function(items) {
      return new Date(items);
    };
});
system.controller('SystemCtrl', function($scope, $location, $routeParams, blockUI, Lightbox, $timeout, inform, ProductsServices, ticketServices, CustomerServices, serviceServices, ContractServices, DepartmentsServices, addressServices, userServices, tokenSystem, $window, serverHost, UtilitiesServices, $filter, APP_SYS, APP_REGEX){
    console.log(APP_SYS.app_name+" Modulo System");
    if (!$scope.sysToken || !$scope.sysLoggedUser ){
        $location.path("/login");
    }    
    //Variables Initialization
    $scope.select={'admins':{'selected':undefined}, 'buildings':{'selected':undefined}, 'province':{'selected':undefined}, 'location':{'selected':undefined}, 'depto':undefined,'floor':undefined, 'product':{'selected':undefined}};
    $scope.zone={'new':{}, 'update':{}};
    $scope.rsNewZonesData ={};
    $scope.zones={'new':{'zona':{}}, 'update':{'zona':{}}};
    $scope.technician={'new':{'service':{}, 'rate':{}}, 'update':{'service':{}, 'rate':{}}};
    $scope.technician_services={'new':{}, 'update':{}, 'temp':undefined};
    $scope.rsTechServicesData = null;
        /**
        * Modal Confirmation function 
        **/
        $scope.modalConfirmation = function(opt, confirm, obj, obj2){
            $scope.swMenu = opt;
            $scope.vConfirm = confirm;
            var tmpOpt=$scope.div2Open;
            //console.log(tmpOpt);
            $scope.mess2show="";
            switch ($scope.swMenu){
                case "closeWindow":
                    if (confirm==0){
                        if ($scope.isNewTenant==true || $scope.isNewAttendant==true){
                            $scope.mess2show="Se perderan todos los datos cargados para el registro actual, esta seguro que desea cancelar?";
                        }else{
                            $scope.mess2show="Se perderan todos las modificaciones realizadas en el registro actual, esta seguro que desea cancelar la modificacion?";
                        }    
                        $("#confirmRequestModal").modal('show');
                    }else if (confirm==1){
                        if ($scope.idDeptoKf!=undefined){
                            $timeout(function() {
                                $scope.tableRowExpanded = false;
                                $scope.tableRowIndexCurrExpanded = "";
                                $scope.selectTableRow($scope.vIndex, $scope.selectedDepto, "depto");
                                //$scope.dayDataCollapse[$scope.vIndex] = false;
                            }, 200);
                        }
                        $("#confirmRequestModal").modal('hide');
                        $("#RegisterTenant").modal('hide');
                        $("#UpdateTenant").modal('hide');
                        $("#RegisterAttendant").modal('hide');
                        $("#UpdateAttendant").modal('hide');
                        //$scope.switchCustomersFn('dashboard','', 'registered');
                    }
                break;
                case "tdown":
                    if (confirm==0){
                    console.log(confirm);
                    $scope.mess2show="Desea Solicitar una nueva llave?";
                    $('#confirmRequestModal').modal('toggle');
                    }else if (confirm==1){
                    $('.jumbotron [id^="m_"]').removeClass('active');
                    $('#m_pedidos').addClass('active');
                    $('#SubM_Pedidos').show();
                    $scope.fnShowHide('rukeyup', 'open');
                    $('#confirmRequestModal').modal('hide');
                    }
                    $('#confirmRequestModal').on('hide.bs.modal', function (e) {
                    $scope.dhboard();
                    $scope.fnShowHide('home','open');
                    });
                break;
                case "checkAddr":
                    if (confirm==0 && $scope.addrNoFound==1){
                    if (tmpOpt!="home"){
                        $scope.mess2show="No posee departamento autorizados, Desea registrar un departamento?";
                    }else{
                        $scope.mess2show="No registra tickets actualmente, Desea verificar si tiene un departmanto asociado?";
                    }
                    $('#confirmRequestModal').modal('toggle');
                    }else if(confirm==0 && $scope.addrNoFound==0 && $scope.sysLoggedUser.idProfileKf!=0){ 
                        if(tmpOpt=="rukeyup"){
                        if ($scope.sysLoggedUser.idProfileKf==5 ||($scope.sysLoggedUser.idProfileKf==6 && $scope.sessionidTypeTenant==2)){
                            $scope.sysCheckAddrIsInDebt($scope.ListTenantAddress);
                            $scope.refresSession($scope.sessionMail);
                            $scope.idAddressAtt=$scope.sessionNameAdress;
                            $scope.namesTenant=$scope.sessionNames;
                            if($scope.sessionidAddress){
                            $scope.getKeyChains($scope.sessionidAddress); 
                            $scope.getServicesValues($scope.sessionidAddress);
                            }else{
                            $scope.idAddressAtt="Consorcio no asignado";
                            }
                            if($scope.sessionidAddress && (!$scope.sessionisDepartmentApproved || $scope.sessionisDepartmentApproved>=0)){
                            $scope.deptoTenant   =($scope.sessionidAddress && !$scope.sessionisDepartmentApproved) || ($scope.sessionidAddress && $scope.sessionisDepartmentApproved==0)?$scope.getDeptoName($scope.sessionIdDeparmentKf)+" (No aprobado)":$scope.getDeptoName($scope.sessionIdDeparmentKf)+" (Aprobado)";
                            }else{
                            $scope.deptoTenant = "Departamento no ha sido asignado."
                            }
                        }else{
                            $scope.rukeyup = true;
                        }
                        }else 
                        if(tmpOpt=="rukeydown"){
                        if ($scope.sysLoggedUser.idProfileKf==5 ||($scope.sysLoggedUser.idProfileKf==6 && $scope.sessionidTypeTenant==2)){
                            $scope.sysCheckAddrIsInDebt($scope.ListTenantAddress);
                            $scope.refresSession($scope.sessionMail);
                            $scope.idAddressAtt=$scope.sessionNameAdress;
                            $scope.namesTenant=$scope.sessionNames;
                            if($scope.sessionidAddress){
                            $scope.getKeyChains($scope.sessionidAddress); 
                            $scope.getServicesValues($scope.sessionidAddress);
                            }else{
                            $scope.idAddressAtt="Consorcio no asignado";
                            }
                            if($scope.sessionidAddress && (!$scope.sessionisDepartmentApproved || $scope.sessionisDepartmentApproved>=0)){
                            $scope.deptoTenant   =($scope.sessionidAddress && !$scope.sessionisDepartmentApproved) || ($scope.sessionidAddress && $scope.sessionisDepartmentApproved==0)?$scope.getDeptoName($scope.sessionIdDeparmentKf)+" (No aprobado)":$scope.getDeptoName($scope.sessionIdDeparmentKf)+" (Aprobado)";
                            }else{
                            $scope.deptoTenant = "Departamento no ha sido asignado."
                            }
                        }else{
                            $scope.rukeydown = true;
                        }
                        }else 
                        if(tmpOpt=="home"){
                        $scope.home = true;
                        }else 
                        if(tmpOpt=="rucost"){
                        $scope.rucost=true;
                        }else
                        if(tmpOpt=="ruother"){
                        $scope.ruother=true;
                        }
                    }else if (confirm==1){
                    $('.jumbotron [id^="m_"]').removeClass('active');
                    $('#m_depto').addClass('active');
                    $('#SubM_Pedidos').hide();
                    $scope.fnShowHide('managedepto', 'open');
                    $('#confirmRequestModal').modal('hide');
                    }
                break;
            
                if (confirm==0){
                    if ($scope.sysLoggedUser.idProfileKf==1 && obj.idProduct!=0){
                    $scope.idProducto = obj.idProduct;
                    $scope.mess2show="El Producto "+obj.descriptionProduct+" sera Eliminado.     Confirmar?";
                        console.log('Producto a eliminar ID: '+obj.idProduct+' DESCRIPCION: '+obj.descriptionProduct);
                        console.log("============================================================================")
                        console.log(obj);
                    }      
                $('#confirmRequestModal').modal('toggle');
                }else if (confirm==1){
                    $scope.deleteProductFn($scope.idProducto);
                $('#confirmRequestModal').modal('hide');
                }
            break;
                case "closeCustomerWindow":
                    if (confirm==0){
                        if ($scope.isNewCustomer==true){
                        $scope.mess2show="Se perderan todos los datos cargados para el registro del cliente, esta seguro que desea cancelar?";
                        }else{
                        $scope.mess2show="Se perderan todos las modificaciones realizadas en el registro actual, esta seguro que desea cancelar la modificacion?";
                        }    
                        $('#confirmRequestModal').modal('show');
                    }else if (confirm==1){
                        $('#confirmRequestModal').modal('hide');
                        $('#customerParticularAddress').modal('hide');
                        $('#BuildingUnit').modal('hide');
                        $('#functionalUnit').modal('hide');
                        $("#AddressLatLon").modal('hide');
                        $('#RegisterModalCustomer').modal('hide');
                        $('#UpdateModalCustomer').modal('hide');
                        $('#changeModalAdmin').modal('hide');
                        $scope.switchCustomersFn('dashboard','', 'registered');
                    }
                break;
                case "closeServiceWindow":
                    if (confirm==0){
                        if ($scope.isNewCustomerService==true){
                        $scope.serviceNew=obj;
                        console.log($scope.serviceNew);
                        $scope.mess2show="Se perderan todos los datos cargados para el registro del servicio, esta seguro que desea cancelar?";
                        $scope.getListContractServicesFn($scope.serviceNew.idContratoFk, null);
                        }else{
                        $scope.serviceUpdate=obj;
                        $scope.mess2show="Se perderan todos las modificaciones realizadas en el registro actual, esta seguro que desea cancelar la modificacion?";
                        $scope.getListContractServicesFn($scope.serviceUpdate.idContratoFk, null);
                        }    
                        $('#confirmRequestModal').modal('show');
                    }else if (confirm==1){
                        $('#confirmRequestModal').modal('hide');
                        $('#RegisterCtrlAccessService').modal('hide');
                        $('#RegisterInternetService').modal('hide');
                        $('#RegisterTotemService').modal('hide');
                        $('#RegisterCamerasService').modal('hide');
                        $('#RegisterAlarmService').modal('hide');
                        $('#RegisterAppMonitorService').modal('hide');
                        $('#updateCtrlAccessService').modal('hide');
                        $('#updateInternetService').modal('hide');
                        $('#updateTotemService').modal('hide');
                        $('#updateCamerasService').modal('hide');
                        $('#updateAlarmService').modal('hide');
                        $('#updateAppMonitorService').modal('hide');   
                        
                        //$scope.loadPagination($scope.rsCustomerListData, "idClient", "10");
                    }
                break;
                case "removeZone":
                    if (confirm==0){
                        $scope.removeZone=obj;
                            console.log(obj)
                            $scope.mess2show="La zona ("+obj.n_zona+") "+obj.descripcion+" sera eliminada.     Confirmar?";
                            console.log("============================================================================");
                            console.log("Datos de la Zona a Eliminar");
                            console.log("============================================================================");
                            console.log("ID de la Zona :  "+obj.n_zona);
                            console.log("Descripción   :  "+obj.descripcion);
                            console.log("============================================================================");
                            //console.log(obj);
                        $('#confirmRequestModal').modal('toggle');
                    }else if (confirm==1){
                        $scope.mainSwitchFn("zones", "deleteZone", $scope.removeZone)
                        $('#confirmRequestModal').modal('hide');
                    }
                break;
                default:
            }
        }

        /**
        * Pagination Functions
        **/
        $scope.pagedItems    = [];
        $scope.itemPerPage=0;
        $scope.loadPagination = function(item, orderBy, itemsByPage){
            //console.log("[loadPagination]");
            var rowList=[];
            var rowId=null;
            for (var key in item){
                if (item[key].idServiceTechnician!=undefined && typeof item[key].idServiceTechnician === 'string'){
                    rowId=Number(item[key].idServiceTechnician);
                    item[key].idServiceTechnician=rowId;
                    rowList.push(item[key]);
                }else{
                    rowList.push(item[key]);
                }
            }
            //console.log(item);
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
        $scope.search = function (qv1, qv2, qv3, qv4, vStrict) {
                var qvalue1 = qv1==""?undefined:qv1;
                var qvalue2 = qv2==""?undefined:qv2;
                var qvalue3 = qv3==""?undefined:qv3;
                var qvalue4 = qv4==""?undefined:qv4;
                console.log("[search]-->qvalue1: "+qvalue1);
                console.log("[search]-->qvalue2: "+qvalue2);
                console.log("[search]-->qvalue3: "+qvalue3);
                console.log("[search]-->qvalue4: "+qvalue4);
                //console.log("[search]-->qvalue5: "+qvalue5);
                //console.log("[search]-->qvalue6: "+qvalue6);
                //console.log("[search]-->vStrict: "+vStrict);
                $scope.filteredItems = $filter("filter")($scope.items, qvalue1, vStrict);
                if (qvalue2!=undefined && qvalue2!='' && qvalue2!=null){$scope.filteredItems = $filter("filter")($scope.filteredItems, qvalue2, vStrict);}
                if (qvalue3!=undefined && qvalue3!='' && qvalue3!=null){$scope.filteredItems = $filter("filter")($scope.filteredItems, qvalue3, vStrict);}
                if (qvalue4!=undefined && qvalue4!='' && qvalue4!=null){$scope.filteredItems = $filter("filter")($scope.filteredItems, qvalue4, vStrict);}
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
                /**************************************************
                *                                                 *
                *          COLLAPSE / EXPAND TABLE ROWS           *
                *                                                 *
                **************************************************/
                 $scope.tableRowExpanded          = false;
                 $scope.tableRowIndexCurrExpanded = "";
                 $scope.tableRowIndexPrevExpanded = "";
                 $scope.dayDataCollapseFn = function () {
                     $scope.tableRowExpanded          = false;
                     $scope.tableRowIndexCurrExpanded = "";
                     $scope.tableRowIndexPrevExpanded = "";
                     $scope.vIndex=null;
                     $scope.dayDataCollapse = [true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true];
                 };
                 $scope.dayDataCollapse = [];
                 $scope.vIndex=null;
                 $scope.selectedItem = undefined;
                 $scope.selectTable = {'rowIndex':'', 'item':{}, 'option':''};
                 $scope.selectTableRow = function (value, item, opt) {
                     $scope.selectTable = {'rowIndex':'', 'item':{}, 'option':''}; 
                     $scope.vIndex = value;
                     $scope.selectTable.rowIndex = value;
                     $scope.selectTable.option = opt;
                     $scope.selectTable.item = item;
                     $scope.selectedItem = item;
                     console.log("[selectTableRow ("+$scope.vIndex +")]->idService: "+$scope.selectTable.item.idServiceTechnician);
                     if ($scope.dayDataCollapse === 'undefined') {
                         $scope.dayDataCollapse = $scope.dayDataCollapseFn();
                         console.log("dayDataCollapse:");
                         console.log($scope.dayDataCollapse);
                     } else {
                         //console.log("dayDataCollapse != undefined");
                         //console.log($scope.dayDataCollapse);
                         console.log('Variable tableRowExpanded: '+$scope.tableRowExpanded);
                         console.log('Variable tableRowIndexCurrExpanded: '+$scope.tableRowIndexCurrExpanded);
                         if ($scope.tableRowExpanded === false && $scope.tableRowIndexCurrExpanded === "") {
                             console.log("ROWEXPANDED FALSE")
                             $scope.tableRowIndexPrevExpanded = "";
                             $scope.tableRowExpanded = true;
                             $scope.tableRowIndexCurrExpanded = $scope.vIndex;
                             $scope.dayDataCollapse[$scope.vIndex] = false;
                             //console.log('Id del idDeptoKf: '+$scope.idDeptoKf+' / Index Id de la tabla: ' +$scope.vIndex);
                             if(opt=="cost"){$scope.getTechServiceCostByTypeServiceIdFn($scope.selectTable.item.idServiceTechnician);}
                             //console.log("===================================")
                         } else if ($scope.tableRowExpanded === true) {
                                 console.log("ROWEXPANDED TRUE")
                             if ($scope.tableRowIndexCurrExpanded === $scope.vIndex) {
                                 console.log("tableRowIndexCurrExpanded == vIndex")
                                 $scope.tableRowExpanded = false;
                                 $scope.tableRowIndexCurrExpanded = "";
                                 $scope.selectTable = {'rowIndex':'', 'item':{}, 'option':''};
                                 $scope.selectedItem = undefined;
                                 //console.log('Id del idDeptoKf: '+$scope.idDeptoKf+' / Index Id de la tabla: ' +$scope.vIndex);
                                 $scope.dayDataCollapse[$scope.vIndex] = true;
                                 $scope.vIndex =null;
                                 //console.log("===================================")
                             } else {
                                 //console.log("tableRowIndexCurrExpanded != vIndex")
                                 //console.log('Id del idDeptoKf: '+$scope.idDeptoKf+' / Index Id de la tabla: ' +$scope.vIndex);
                                 $scope.tableRowIndexPrevExpanded = $scope.tableRowIndexCurrExpanded;
                                 $scope.tableRowIndexCurrExpanded = $scope.vIndex;
                                 if(opt=="depto"){$scope.lisTenantByType($scope.idDeptoKf, null);}
                                 if(opt=="service"){$scope.getListContractServicesFn($scope.idDeptoKf, null);}
                                 if(opt=="cost"){$scope.getTechServiceCostByTypeServiceIdFn($scope.selectTable.item.idServiceTechnician);}
                                 $scope.dayDataCollapse[$scope.tableRowIndexPrevExpanded] = true;
                                 $scope.dayDataCollapse[$scope.tableRowIndexCurrExpanded] = false;
                                 //console.log("===================================")
                             }
                         } 
                     }
                 };
        /**************************************************
        *                                                 *
        *         ADD OWNER / TENANT / ATTENDANT          *
        *                                                 *
        **************************************************/
            $scope.sysRegisterTenantFn = function(){
                console.log($scope.register);
                $scope.depto={'department':{'idDepartment':null, 'idUserKf':null}};
                userServices.addUser($scope.register).then(function(response_tenantRegister){
                    if(response_tenantRegister.status==200){
                        console.log("REGISTERED SUCCESSFULLY");
                        inform.add('Usuario '+$scope.register.user.fullNameUser+' registrado satisfactoriamente.',{
                        ttl:5000, type: 'success'
                        });
                        userServices.findUserByEmail($scope.register.user.dni).then(function(response_tenantFound) {
                            if(response_tenantFound.status==200){
                                //OWNERS AND TENANTS
                                if(($scope.register.user.idProfileKf==3 || $scope.register.user.idProfileKf==4 || $scope.register.user.idProfileKf==6) && $scope.register.user.idTypeTenantKf==1 && $scope.register.user.idDeparment_Tmp){
                                    blockUI.start('Asociando usuario al departamento seleccionado.');
                                    $timeout(function() {
                                        $scope.depto.department.idUserKf=response_tenantFound.data[0].idUser;
                                        $scope.depto.department.idDepartment=$scope.register.user.idDeparment_Tmp;
                                    }, 1500); 
                                    //console.log(response_tenantFound);
                                    //OWNER
                                    $timeout(function() {
                                        blockUI.message('Asignando departamento al usuario.');
                                        $scope.fnAssignDepto($scope.depto);
                                    }, 2000);
                                    $timeout(function() {
                                        blockUI.message('Aprobando departamento del usuario.');
                                        $scope.approveDepto($scope.register.user.idTypeTenantKf, $scope.depto.department.idDepartment, 1);
                                    }, 2500);
                                    $timeout(function() {
                                        blockUI.message('Actualizando listado.');
                                        if ($scope.ticket.optionTypeSelected.name=="department" && ($scope.ticket.radioButtonDepartment=="1" || $scope.ticket.radioButtonDepartment=="2")){
                                            $scope.lisTenantByType($scope.ticket.idClientDepartament.idClientDepartament, $scope.ticket.radioButtonDepartment);
                                        }else{
                                            $scope.getAttendantListFn($scope.select.buildings.selected.idClient);
                                        }
                                        blockUI.stop();
                                    }, 3000);
                                }else if(($scope.register.user.idProfileKf==4 || $scope.register.user.idProfileKf==5 || $scope.register.user.idProfileKf==6) && $scope.register.user.idTypeTenantKf==2 && $scope.register.user.idDepartmentKf){
                                    blockUI.start('Aprobando departamento del usuario.');
                                    $timeout(function() {
                                        $scope.depto.department.idUserKf        = response_tenantFound.data[0].idUser;
                                        $scope.depto.department.idDepartment    = $scope.register.user.idDepartmentKf;
                                    }, 1500);
                                    $timeout(function() {
                                        //TENANT
                                        $scope.approveDepto($scope.register.user.idTypeTenantKf, $scope.depto.department.idUserKf, 1);
                                    }, 2000);
                                    $timeout(function() {
                                        blockUI.message('Actualizando listado.');
                                        if ($scope.ticket.optionTypeSelected.name=="department" && ($scope.ticket.radioButtonDepartment=="1" || $scope.ticket.radioButtonDepartment=="2")){

                                            $scope.lisTenantByType($scope.ticket.idClientDepartament.idClientDepartament, $scope.ticket.radioButtonDepartment);
                                        }else{
                                            $scope.getAttendantListFn($scope.select.buildings.selected.idClient);
                                        }
                                        blockUI.stop();
                                    }, 3000);
                                }else if(($scope.register.user.idProfileKf==6) && $scope.register.user.idTypeTenantKf==null){
                                    blockUI.start('Actualizando listado.');
                                    $timeout(function() {
                                        $scope.getAttendantListFn($scope.select.buildings.selected.idClient);
                                        blockUI.stop();
                                    }, 3000);
                                }
                            }
                        });
                    }else if (response_tenantRegister.status==404){
                        inform.add('[Error]: '+response_tenantRegister.status+', Ocurrio error intenta de nuevo o contacta el area de soporte. ',{
                            ttl:5000, type: 'warning'
                            });
                    }else if(response_tenantRegister.status==500){
                        inform.add('[Error]: '+response_tenantRegister.status+', Ha ocurrido un error en la comunicacion con el servidor, contacta el area de soporte. ',{
                            ttl:5000, type: 'danger'
                        });
                    }
                });
                $('#RegisterTenant').modal('hide');
                $('#RegisterAttendant').modal('hide');
            }
        /**************************************************
        *                                                 *
        *                   UPDATE USER                   *
        *                                                 *
        **************************************************/
            $scope.sysUpdateTenantFn = function(){
                //console.log($scope.update.user);
                userServices.updateUser($scope.update).then(function(response){
                    if(response.status==200){
                        if($scope.update.user.typeTenantChange){
                            console.log("Usuario: "+$scope.update.user.fullNameUser+" Successfully updated");
                            inform.add('El Usuario: '+$scope.update.user.fullNameUser+' ha sido actualizado con exito. ',{
                                ttl:3000, type: 'success'
                            });
                            //OWNERS AND TENANTS
                            if(($scope.update.user.idProfileKf==3 || $scope.update.user.idProfileKf==4 || $scope.update.user.idProfileKf==6) && $scope.update.user.idTypeTenantKf==1 && $scope.update.user.idDeparment_Tmp){
                                blockUI.start('Asociando usuario al departamento seleccionado.');
                                $timeout(function() {
                                    $scope.depto.department.idUserKf=$scope.update.user.idUser;
                                    $scope.depto.department.idDepartment=$scope.update.user.idDeparment_Tmp;
                                }, 1500); 
                                //console.log(response_tenantFound);
                                //OWNER
                                $timeout(function() {
                                    blockUI.message('Asignando departamento del usuario.');
                                    $scope.fnAssignDepto($scope.depto);
                                }, 2000);
                                $timeout(function() {
                                    blockUI.message('Aprobando departamento del usuario.');
                                    $scope.approveDepto($scope.update.user.idTypeTenantKf, $scope.depto.department.idDepartment, 1);
                                }, 2500);
                                if ($scope.sysSubContent=="departments"){
                                    $timeout(function() {
                                        $scope.getDeptoListByAddress($scope.select.buildings.selected.idClient);
                                        blockUI.stop();
                                    }, 3000);
                                }
                                if ($scope.sysSubContent=="myDepartments"){
                                    $scope.statusByTenantType = $scope.sysLoggedUser.idTypeTenantKf=='1'?-1:-1;
                                    $scope.idDepartmentKfTmp = $scope.sysLoggedUser.idTypeTenantKf=='1'?null:$scope.sysLoggedUser.idDepartmentKf;
                                    $scope.updateSysUserLoggedSession($scope.sysLoggedUser.idUser);
                                    blockUI.start('Actualizando información.');
                                    $timeout(function() {
                                        blockUI.message('Llavero asociado satisfactoriamente.');
                                        DepartmentsServices.listDepartmentsByIdOwner($scope.idDepartmentKfTmp, $scope.sysLoggedUser.idUser, $scope.statusByTenantType, $scope.sysLoggedUser.idTypeTenantKf).then(function(response) {
                                            if(response.status==200){
                                                if(response.data!=undefined && response.data.length>0){
                                                    var assignedDeptos = [];
                                                    angular.forEach(response.data,function(depto){
                                                    var deferredDeptos = $q.defer();
                                                    assignedDeptos.push(deferredDeptos.promise);
                                                    //ASSIGN DEPARTMENT SERVICE
                                                        $timeout(function() {
                                                            deferredDeptos.resolve();
                                                            DepartmentsServices.listTenant2AssignedDeptoByIdDepto(depto.idClientDepartament).then(function(response_tenants) {
                                                                if(response_tenants.status==200){
                                                                    depto.tenants = response_tenants.data.tenant;
                                                                }else if (response_tenants.status==404){
                                                                    depto.tenants = [];
                                                                }else if (response_tenants.status==500){
                                                                    depto.tenants = [];
                                                                }
                                                            });
                                                        }, 1000);
                                                    });
                                                    
                                                    $q.all(assignedDeptos).then(function () {
                                                        $timeout(function() {
                                                            blockUI.stop();
                                                        }, 2000);
                                                    });

                                                    var assignedKeys = [];
                                                    angular.forEach(response.data,function(depto){
                                                        var deferredKeys = $q.defer();
                                                        assignedKeys.push(deferredKeys.promise);
                                                        $timeout(function() {
                                                            deferredKeys.resolve();
                                                            KeysServices.getKeyListByDepartmentId(depto.idClientDepartament).then(function(response_keys) {
                                                                if(response_keys.status==200){
                                                                    depto.keys=response_keys.data;
                                                                }else if (response_keys.status==404){
                                                                    depto.keys = [];
                                                                }else if (response_keys.status==500){
                                                                    depto.keys = [];
                                                                }
                                                            });
                                                        }, 1000);
                                                    });
                                                    $q.all(assignedKeys).then(function () {
                                                        $timeout(function() {
                                                            blockUI.stop();
                                                            $scope.myDepartamentlist = response.data;
                                                            //console.log($scope.myDepartamentlist);
                                                            for (var depto in $scope.myDepartamentlist){
                                                                if ($scope.myDepartamentlist[depto].idClientDepartament == $scope.departmentSelected.idClientDepartament){
                                                                    $scope.departmentSelected = $scope.myDepartamentlist[depto];
                                                                    for (var myKey in $scope.departmentSelected.tenants){
                                                                        for (var key in $scope.departmentSelected.keys){
                                                                            if ($scope.departmentSelected.tenants[myKey].myKeys!=undefined && $scope.departmentSelected.tenants[myKey].myKeys!=null && 
                                                                                $scope.departmentSelected.tenants[myKey].myKeys.idKeychain==$scope.departmentSelected.keys[key].idKeychain &&
                                                                                $scope.departmentSelected.tenants[myKey].myKeys.idUserKf==$scope.departmentSelected.keys[key].idUserKf){
                                                                                $scope.departmentSelected.tenants[myKey].keyTmp = $scope.departmentSelected.tenants[myKey].myKeys.idKeychain;
                                                                                $scope.departmentSelected.tenants[myKey].key = $scope.departmentSelected.tenants[myKey].myKeys.idKeychain;
                                                                                //console.log($scope.departmentSelected.tenants[myKey])
                                                                                break;
                                                                            }else{
                                                                                $scope.departmentSelected.tenants[myKey].key = null;
                                                                                $scope.departmentSelected.tenants[myKey].keyTmp = null;
                                                                            }
                                                                        }
                                                                    }
                                                                    break;
                                                                }
                                                            }
                                                        }, 2000);
                                                    });
                                                }else{
                                                    $scope.myDepartamentlist = [];
                                                    blockUI.stop();
                                                }
                                            }else if (response.status==404){
                                                $scope.myDepartamentlist = [];
                                                blockUI.stop();
                                            }
            
                                        });
                                        blockUI.stop();
                                    }, 5000);
                                }
                            }else if(($scope.update.user.idProfileKf==4 || $scope.update.user.idProfileKf==5 || $scope.update.user.idProfileKf==6) && $scope.update.user.idTypeTenantKf==2 && $scope.update.user.idDepartmentKf){
                                blockUI.start('Aprobando departamento del usuario.');
                                $timeout(function() {
                                    $scope.depto.department.idUserKf        = $scope.update.user.idUser;
                                    $scope.depto.department.idDepartment    = $scope.update.user.idDepartmentKf;
                                }, 1500);
                                $timeout(function() {
                                    //TENANT
                                    $scope.approveDepto($scope.update.user.idTypeTenantKf, $scope.depto.department.idUserKf, 1);
                                    blockUI.stop();
                                }, 2000);
                                if ($scope.sysSubContent=="myDepartments"){
                                    $scope.statusByTenantType = $scope.sysLoggedUser.idTypeTenantKf=='1'?-1:-1;
                                    $scope.idDepartmentKfTmp = $scope.sysLoggedUser.idTypeTenantKf=='1'?null:$scope.sysLoggedUser.idDepartmentKf;
                                    $scope.updateSysUserLoggedSession($scope.sysLoggedUser.idUser);
                                    blockUI.start('Actualizando información.');
                                    $timeout(function() {
                                        blockUI.message('Llavero asociado satisfactoriamente.');
                                        DepartmentsServices.listDepartmentsByIdOwner($scope.idDepartmentKfTmp, $scope.sysLoggedUser.idUser, $scope.statusByTenantType, $scope.sysLoggedUser.idTypeTenantKf).then(function(response) {
                                            if(response.status==200){
                                                if(response.data!=undefined && response.data.length>0){
                                                    var assignedDeptos = [];
                                                    angular.forEach(response.data,function(depto){
                                                    var deferredDeptos = $q.defer();
                                                    assignedDeptos.push(deferredDeptos.promise);
                                                    //ASSIGN DEPARTMENT SERVICE
                                                        $timeout(function() {
                                                            deferredDeptos.resolve();
                                                            DepartmentsServices.listTenant2AssignedDeptoByIdDepto(depto.idClientDepartament).then(function(response_tenants) {
                                                                if(response_tenants.status==200){
                                                                    depto.tenants = response_tenants.data.tenant;
                                                                }else if (response_tenants.status==404){
                                                                    depto.tenants = [];
                                                                }else if (response_tenants.status==500){
                                                                    depto.tenants = [];
                                                                }
                                                            });
                                                        }, 1000);
                                                    });
                                                    
                                                    $q.all(assignedDeptos).then(function () {
                                                        $timeout(function() {
                                                            blockUI.stop();
                                                        }, 2000);
                                                    });

                                                    var assignedKeys = [];
                                                    angular.forEach(response.data,function(depto){
                                                        var deferredKeys = $q.defer();
                                                        assignedKeys.push(deferredKeys.promise);
                                                        $timeout(function() {
                                                            deferredKeys.resolve();
                                                            KeysServices.getKeyListByDepartmentId(depto.idClientDepartament).then(function(response_keys) {
                                                                if(response_keys.status==200){
                                                                    depto.keys=response_keys.data;
                                                                }else if (response_keys.status==404){
                                                                    depto.keys = [];
                                                                }else if (response_keys.status==500){
                                                                    depto.keys = [];
                                                                }
                                                            });
                                                        }, 1000);
                                                    });
                                                    $q.all(assignedKeys).then(function () {
                                                        $timeout(function() {
                                                            blockUI.stop();
                                                            $scope.myDepartamentlist = response.data;
                                                            //console.log($scope.myDepartamentlist);
                                                            for (var depto in $scope.myDepartamentlist){
                                                                if ($scope.myDepartamentlist[depto].idClientDepartament == $scope.departmentSelected.idClientDepartament){
                                                                    $scope.departmentSelected = $scope.myDepartamentlist[depto];
                                                                    for (var myKey in $scope.departmentSelected.tenants){
                                                                        for (var key in $scope.departmentSelected.keys){
                                                                            if ($scope.departmentSelected.tenants[myKey].myKeys!=undefined && $scope.departmentSelected.tenants[myKey].myKeys!=null && 
                                                                                $scope.departmentSelected.tenants[myKey].myKeys.idKeychain==$scope.departmentSelected.keys[key].idKeychain &&
                                                                                $scope.departmentSelected.tenants[myKey].myKeys.idUserKf==$scope.departmentSelected.keys[key].idUserKf){
                                                                                $scope.departmentSelected.tenants[myKey].keyTmp = $scope.departmentSelected.tenants[myKey].myKeys.idKeychain;
                                                                                $scope.departmentSelected.tenants[myKey].key = $scope.departmentSelected.tenants[myKey].myKeys.idKeychain;
                                                                                //console.log($scope.departmentSelected.tenants[myKey])
                                                                                break;
                                                                            }else{
                                                                                $scope.departmentSelected.tenants[myKey].key = null;
                                                                                $scope.departmentSelected.tenants[myKey].keyTmp = null;
                                                                            }
                                                                        }
                                                                    }
                                                                    break;
                                                                }
                                                            }
                                                        }, 2000);
                                                    });
                                                }else{
                                                    $scope.myDepartamentlist = [];
                                                    blockUI.stop();
                                                }
                                            }else if (response.status==404){
                                                $scope.myDepartamentlist = [];
                                                blockUI.stop();
                                            }
            
                                        });
                                        blockUI.stop();
                                    }, 5000);
                                }
                                if ($scope.sysSubContent=="departments"){
                                    $timeout(function() {
                                        $scope.lisTenantByType($scope.idDeptoKf, null);
                                    }, 2500);
                                }
                        }
                        }else{
                            $timeout(function() {
                                console.log("Usuario: "+$scope.update.user.fullNameUser+" Successfully updated");
                                inform.add('El Usuario: '+$scope.update.user.fullNameUser+' ha sido actualizado con exito. ',{
                                    ttl:3000, type: 'success'
                                });
                                blockUI.message('Usuario: '+$scope.update.user.fullNameUser+' actualizado con exito');
                            }, 1500);
                            if($scope.sysSubContent=="departments"){
                                $timeout(function() {
                                    $scope.lisTenantByType($scope.idDeptoKf, null);
                                    blockUI.stop();
                                }, 2000);
                            }else if($scope.sysSubContent=="attendants"){
                                $timeout(function() {
                                    $scope.getDeptoListByAddress($scope.select.buildings.selected.idClient);
                                }, 1500);
                                $timeout(function() {
                                    $scope.getAttendantListFn($scope.select.buildings.selected.idClient);
                                    blockUI.stop();
                                }, 2000);
                            }
                        }
                    }else if (response.status==404){
                            $timeout(function() {
                                inform.add('[Error]: '+response.status+', Ocurrio error intenta de nuevo o contacta el area de soporte. ',{
                                ttl:5000, type: 'warning'
                                });
                                blockUI.message('Usuario: '+$scope.update.user.fullNameUser+' no sido actualizado.');
                                blockUI.stop();
                            }, 1500);
                    }else if(response.status==500){
                        $timeout(function() {
                            inform.add('[Error]: '+response.status+', Ha ocurrido un error en la comunicacion con el servidor, contacta el area de soporte. ',{
                            ttl:5000, type: 'danger'
                            });
                            blockUI.message('[Error]: '+response.status+', Ha ocurrido un error en la comunicacion con el servidor.');
                            blockUI.stop();
                        }, 1500);
                    }
                });
                $('#UpdateTenant').modal('hide');
                $('#UpdateAttendant').modal('hide');
            }
        /**************************************************
        *                                                 *
        *                    ADD ZONE                     *
        *                                                 *
        **************************************************/
            $scope.addNewZoneFn = function(obj){
                UtilitiesServices.addNewZone($scope.zones.new).then(function(response){
                    if(response.status==200){
                        console.log("Zone Successfully Created");
                        inform.add('Registro de nueva zona realizado con exito. ',{
                            ttl:2000, type: 'success'
                        });
                        $('#newZoneModal').modal('hide');
                        $scope.zone={'new':{}, 'update':{}};
                        $scope.zones={'new':{'zona':{}}, 'update':{'zona':{}}};
                    }else if(response.status==203){
                        console.log("Zone already exist, contact administrator");
                        inform.add('INFO: La zona ya se encuentra registrado. ',{
                            ttl:2000, type: 'warning'
                        });
                        //$('#RegisterModalCustomer').modal('hide');
                    }else if(response.status==500){
                        console.log("Zone not Created, contact administrator");
                        inform.add('Error: [500] Contacta al area de soporte. ',{
                            ttl:2000, type: 'danger'
                        });
                        //$('#RegisterModalCustomer').modal('hide');
                    }
                    blockUI.start('Actualizando listado.');
                    $scope.getZonesFn();
                    $timeout(function() {
                        $scope.mainSwitchFn("zones", "list", null)
                        blockUI.stop();
                    }, 2000);
                });
            };

        /**************************************************
         *                                                 *
         *                   UPDATE ZONE                   *
         *                                                 *
        **************************************************/
            $scope.rsUpdatedZone={};
            $scope.zones={'new':{'zona':{}}, 'update':{'zona':{}}};
            $scope.updateZoneFn = function(obj){
                UtilitiesServices.updateZone(obj).then(function(response){
                    if(response.status==200){
                        console.log("Zone Successfully updated");
                        inform.add('Modificacion de zona realizado con exito. ',{
                            ttl:2000, type: 'success'
                        });
                        $('#updateZoneModal').modal('hide');
                        $scope.zone={'new':{}, 'update':{}};
                        $scope.zones={'new':{'zona':{}}, 'update':{'zona':{}}};
                    }else if(response.status==500){
                        console.log("Zone not updated, contact administrator");
                        inform.add('Error: [500] Contacta al area de soporte. ',{
                            ttl:2000, type: 'danger'
                        });
                        //$('#RegisterModalCustomer').modal('hide');
                    }
                    blockUI.start('Actualizando listado.');
                    $scope.getZonesFn();
                    $timeout(function() {
                        $scope.mainSwitchFn("zones", "list", null)
                        blockUI.stop();
                    }, 2500);

                });
            };
        /**************************************************
        *                                                 *
        *                   DELETE ZONE                   *
        *                                                 *
        **************************************************/
            $scope.deleteZoneFn = function(idZona){
                UtilitiesServices.deleteZone(idZona).then(function(response){
                    if(response.status==200){
                        console.log("Zone Successfully deleted");
                        inform.add('Zona eliminada satisfactoriamente. ',{
                            ttl:2000, type: 'success'
                        });
                    }else if(response.status==500){
                        console.log("Zone not deleted, contact administrator");
                        inform.add('Error: [500] Contacta al area de soporte. ',{
                            ttl:2000, type: 'danger'
                        });
                    }
                    blockUI.start('Actualizando listado.');
                    $scope.getZonesFn();
                    $timeout(function() {
                        $scope.mainSwitchFn("zones", "list", null)
                        blockUI.stop();
                    }, 2000);
                });
            };
        /**************************************************
        *                                                 *
        *                  GET LOCATION                   *
        *                   LOCAL API                     *
        *                                                 *
        **************************************************/
            $scope.rsLocations_Data = {};
            $scope.getLocationByIdFn = function(idProvince){
                addressServices.getLocationsZones(idProvince).then(function(data){
                    $scope.rsLocations_All = data;
                    //console.log($scope.rsLocations_Data);
                });
            };
            $scope.provincesAllowed = function(item){
                return item.idProvince == "1" || item.idProvince == "2";
            }
        /**************************************************
        *                                                 *
        *              ADD TECH SERVICE                   *
        *                                                 *
        **************************************************/
            $scope.getTechServiceListFn = function(obj){
                serviceServices.getTechServiceList().then(function(response){
                    if(response.status==200){
                        $scope.rsTechServicesData = response.data
                    }else if(response.status==404){
                        inform.add('Error[404]: no se pudo obtener la lista de servicios tecnicos, Contacta al area de soporte. ',{
                            ttl:5000, type: 'warning'
                        });
                        $scope.rsTechServicesData = null;
                    }else if(response.status==500){
                        inform.add('Error[500] Contacta al area de soporte. ',{
                            ttl:5000, type: 'danger'
                        });
                        $scope.rsTechServicesData = null;
                    }
                });
            };
        /**************************************************
        *                                                 *
        *              ADD TECH SERVICE                   *
        *                                                 *
        **************************************************/
            $scope.addNewTechServiceFn = function(obj){
                serviceServices.addTechService(obj).then(function(response){
                    if(response.status==200){
                        console.log("Technician Service Successfully Created");
                        inform.add('El servicio ha sido registrado con exito. ',{
                            ttl:5000, type: 'success'
                        });
                        $('#newTechService').modal('hide');
                        $scope.technician={'new':{'service':{}, 'rate':{}}, 'update':{'service':{}, 'rate':{}}};
                        $scope.technician_services={'new':{}, 'update':{}, 'temp':undefined};
                    }else if(response.status==404){
                        console.log("Something went wrong, contact administrator");
                        inform.add('Error[404]: no se pudo realizar el registro, Contacta al area de soporte. ',{
                            ttl:5000, type: 'warning'
                        });
                        //$('#RegisterModalCustomer').modal('hide');
                    }else if(response.status==500){
                        console.log("Service not registered, contact administrator");
                        inform.add('Error[500] Contacta al area de soporte. ',{
                            ttl:5000, type: 'danger'
                        });
                        //$('#RegisterModalCustomer').modal('hide');
                    }
                    blockUI.start('Actualizando listado.');
                    $scope.dayDataCollapseFn();
                    $timeout(function() {
                        $scope.getTechServiceListFn();
                        blockUI.stop();
                    }, 2000);
                });
            };
        /**************************************************
        *                                                 *
        *            CHECK TECH SERVICE BY NAME           *
        *                                                 *
        **************************************************/
            $scope.checkTechServiceNameFn = function(name){
                var upperName = $scope.technician_services.update.description;
                console.log(upperName.toUpperCase())
                console.log($scope.technician_services.temp.description)
                if ($scope.technician_services.temp == undefined || ($scope.technician_services.temp != undefined && $scope.technician_services.temp.description != upperName.toUpperCase())){
                    serviceServices.checkTechServiceName(name).then(function(response){
                        if(response.status==200){
                            inform.add('El nombre '+name.toUpperCase()+' ya se encuentra registrado. ',{
                                ttl:5000, type: 'warning'
                            });
                            console.log("Tech Service Name Already used");
                            $scope.technician_services.new.description=undefined;
                            $scope.technician_services.update.description=undefined;
                        }else if(response.status==404){
                            console.log("Tech Service Name Available");
                            //$('#RegisterModalCustomer').modal('hide');
                        }else if(response.status==500){
                            console.log("Error 500, contact administrator");
                            inform.add('Error[500] Contacta al area de soporte. ',{
                                ttl:5000, type: 'danger'
                            });
                            //$('#RegisterModalCustomer').modal('hide');
                        }
                    });
                }
            };
        /**************************************************
         *                                                 *
         *             UPDATE TECH SERVICE                 *
         *                                                 *
        **************************************************/
            $scope.updateTechServiceFn = function(obj){
                serviceServices.updateTechService(obj).then(function(response){
                    if(response.status==200){
                        console.log("Technician Service Successfully updated");
                        inform.add('El servicio ha sido actualizado con exito. ',{
                            ttl:5000, type: 'success'
                        });
                        $('#editTechService').modal('hide');
                        $scope.technician={'new':{'service':{}, 'rate':{}}, 'update':{'service':{}, 'rate':{}}};
                        $scope.technician_services={'new':{}, 'update':{}, 'temp':undefined};
                    }else if(response.status==404){
                        console.log("Something went wrong, contact administrator");
                        inform.add('Error[404]: no se pudo realizar la actualizacion, Contacta al area de soporte. ',{
                            ttl:5000, type: 'warning'
                        });
                        //$('#RegisterModalCustomer').modal('hide');
                    }else if(response.status==500){
                        console.log("Service not registered, contact administrator");
                        inform.add('Error[500] Contacta al area de soporte. ',{
                            ttl:5000, type: 'danger'
                        });
                        //$('#RegisterModalCustomer').modal('hide');
                    }
                    blockUI.start('Actualizando listado.');
                    $scope.dayDataCollapseFn();
                    $timeout(function() {
                        $scope.getTechServiceListFn();
                        blockUI.stop();
                    }, 2000);
                });
            };
        /**************************************************
        *                                                 *
        *               DELETE TECH SERVICE               *
        *                                                 *
        **************************************************/
            $scope.deleteTechServiceFn = function(idZona){
                UtilitiesServices.deleteZone(idZona).then(function(response){
                    if(response.status==200){
                        console.log("Zone Successfully deleted");
                        inform.add('Zona eliminada satisfactoriamente. ',{
                            ttl:2000, type: 'success'
                        });
                    }else if(response.status==500){
                        console.log("Zone not deleted, contact administrator");
                        inform.add('Error: [500] Contacta al area de soporte. ',{
                            ttl:2000, type: 'danger'
                        });
                    }
                    blockUI.start('Actualizando listado.');
                    $scope.getZonesFn();
                    $timeout(function() {
                        $scope.mainSwitchFn("zones", "list", null)
                        blockUI.stop();
                    }, 2000);
                });
            };

        /**************************************************
        *                                                 *
        *              ADD TECH SERVICE COST              *
        *                                                 *
        **************************************************/
            $scope.addNewTechServiceCostFn = function(obj){
                serviceServices.addTechServiceCost(obj).then(function(response){
                    if(response.status==200){
                        console.log("Technician Service Cost Successfully Created");
                        inform.add('El Costo del mantenimiento ha sido registrado con exito. ',{
                            ttl:5000, type: 'success'
                        });
                        $('#newTechServiceCost').modal('hide');
                        $scope.technician={'new':{'service':{}, 'rate':{}}, 'update':{'service':{}, 'rate':{}}};
                        $scope.technician_services={'new':{}, 'update':{}, 'temp':undefined};
                    }else if(response.status==404){
                        console.log("Something went wrong, contact administrator");
                        inform.add('Error[404]: no se pudo realizar el registro, Contacta al area de soporte. ',{
                            ttl:5000, type: 'warning'
                        });
                        //$('#RegisterModalCustomer').modal('hide');
                    }else if(response.status==500){
                        console.log("Cost not registered, contact administrator");
                        inform.add('Error[500] Contacta al area de soporte. ',{
                            ttl:5000, type: 'danger'
                        });
                        //$('#RegisterModalCustomer').modal('hide');
                    }
                    
                    if ($scope.selectedItem!=undefined){
                        blockUI.start('Actualizando listado.');
                        $timeout(function() {
                            $scope.tableRowExpanded = false;
                            $scope.tableRowIndexCurrExpanded = "";
                            $scope.selectTableRow($scope.vIndex, $scope.selectTable.item, "cost");
                            //$scope.dayDataCollapse[$scope.vIndex] = false;
                            blockUI.stop();
                        }, 1000);
                    }
                });
            };
        /**************************************************
        *                                                 *
        *              ADD TECH SERVICE COST              *
        *                                                 *
        **************************************************/
            $scope.updateTechServiceCostFn = function(obj){
                serviceServices.updateTechServiceCost(obj).then(function(response){
                    if(response.status==200){
                        console.log("Technician Service Cost Successfully Updated");
                        inform.add('El Costo del mantenimiento ha sido actualizado con exito. ',{
                            ttl:5000, type: 'success'
                        });
                        $('#editTechServiceCost').modal('hide');
                        $scope.technician={'new':{'service':{}, 'rate':{}}, 'update':{'service':{}, 'rate':{}}};
                        $scope.technician_services={'new':{}, 'update':{}, 'temp':undefined};
                    }else if(response.status==404){
                        console.log("Something went wrong, contact administrator");
                        inform.add('Error[404]: no se pudo actualizar el registro, Contacta al area de soporte. ',{
                            ttl:5000, type: 'warning'
                        });
                        //$('#RegisterModalCustomer').modal('hide');
                    }else if(response.status==500){
                        console.log("Cost not registered, contact administrator");
                        inform.add('Error[500] Contacta al area de soporte. ',{
                            ttl:5000, type: 'danger'
                        });
                        //$('#RegisterModalCustomer').modal('hide');
                    }
                    
                    if ($scope.selectedItem!=undefined){
                        blockUI.start('Actualizando listado.');
                        $timeout(function() {
                            $scope.tableRowExpanded = false;
                            $scope.tableRowIndexCurrExpanded = "";
                            $scope.selectTableRow($scope.vIndex, $scope.selectTable.item, "cost");
                            //$scope.dayDataCollapse[$scope.vIndex] = false;
                            blockUI.stop();
                        }, 1000);
                    }
                });
            };
        /**************************************************
        *                                                 *
        *                  GET TECH SERVICES              *
        *                                                 *
        **************************************************/
            $scope.rsTechServiceCostData = {};
            $scope.getTechServiceCostByTypeServiceIdFn = function(id){
                serviceServices.getTechServiceCostByTypeServiceIdList(id).then(function(response){
                    if(response.status==200){
                        $scope.rsTechServiceCostData = response.data;
                    }else if (response.status==404){
                        $scope.rsTechServiceCostData = [];
                        inform.add('No hay resultados, por favor contacte al area de soporte de TASS.',{
                        ttl:5000, type: 'warning'
                        });
                    }else if (response.status==500){
                        $scope.rsTechServiceCostData = [];
                        inform.add('Ocurrio un error, contacte al area de soporte de TASS.',{
                        ttl:5000, type: 'danger'
                        });
                    }
                });
            };
        /**************************************************
        *                                                 *
        *           GET TYPE OF TypeMaintenance           *
        *                                                 *
        **************************************************/
            $scope.rsTypeOfMaintenanceData = [];
            $scope.getTypeOfMaintenanceFn = function(id){
                serviceServices.maintenanceTypeByTechServiceId(id).then(function(response){
                    if(response.status==200){
                        $scope.rsTypeOfMaintenanceData = response.data;
                    }else if (response.status==404){
                        $scope.rsTypeOfMaintenanceData = [];
                        inform.add('No hay tipos de mantenimientos disponibles para el servicio seleccionado.',{
                        ttl:5000, type: 'warning'
                        });
                    }else if (response.status==500){
                        $scope.rsTypeOfMaintenanceData = [];
                        inform.add('Ocurrio un error, contacte al area de soporte de TASS.',{
                        ttl:5000, type: 'danger'
                        });
                    }
                });
            };
        /**************************************************
        *                                                 *
        *             SYSTEM MENU FUNCTION                *
        *                                                 *
        **************************************************/
            $scope.mainSwitchFn = function(opt1, opt2, obj, obj2){
                switch (opt1){
                    case "dash":
                      switch (fnAction){
                          case "open":
                            $scope.getSysData();
                            $scope.getParameter();
                            $scope.loadParameter(1, 11,'sysParam');
                            $scope.sysContent = 'dashboard';
                          break;
                      }
                    break;
                    case "sysProfile":
                        switch (fnAction){
                          case "dash":
                            $scope.sysContent = "";
                            $scope.loadPagination($scope.rsProfileData, "idProfiles", "10");
                            $scope.sysContent = 'sysProfile';
                          break;
                          case "newProfile":
                            $scope.sysProfile.Name="";
                            $scope.checkBoxes.modulo=false;
                            $('#newSysProfile').modal('show');
                          break;
                          case "updProfile2":
                            $scope.sysUpProfile.Name="";
                            $scope.filterSysProfile=null;
                            $scope.sysProfFound=false;
                            $('#updateSysProfile2').modal('show');
                          break;
                          default:
                        }
                    break;
                    case "sysUsers":
                        switch (opt2){
                          case "dash":
                            $scope.sysContent = "";
                            console.log("sysUsers");
                            $scope.loadPagination($scope.rsList.sysUser, "idUser", "7");
                            $scope.sysContent = 'sysUsers';
                          break;
                          case "newSysUser":
                            $('#newSysUser').modal('show');
                          break;
                          case "updProfile2":
                            $scope.sysUpProfile.Name="";
                            $scope.filterSysProfile=null;
                            $scope.sysProfFound=false;
                            $('#updateSysProfile2').modal('show');
                          break;
                          default:
                        }
                    break;
                    case "smtp":
                      if(fnAction=="open"){
                        $scope.smtp.mail ="";
                        $scope.smtp.password ="";
                        $scope.loadParameter(1, 6,'sysParam');
                        $('#ModalSMTPEmail').modal('show');
                      }
                      if(fnAction=="save"){
                        $scope.smtpMail="";
                        $scope.smtpPwd = "";
                        $scope.updateMailSmtp($http, $scope);
                      }
                    break;
                    case "mails":
                      if(fnAction=="open"){
                        $scope.sys.email ="";
                        $scope.loadParameter(1, 6,'sysParam');
                        $('#ModalSetupEmail').modal('show');
      
                      }
                      if(fnAction=="save"){
                        $scope.salesMail    = "";
                        $scope.payrollMail  = "";
                        $scope.supportMail  = "";
                        $scope.adminMail    = "";
                        switch ($scope.sys.idTypeOutherKf){
                          case "1":
                            $scope.sysParam.idParam = 7;
                            $scope.sysParam.msg="VENTAS";
                          break;
                          case "3":
                            $scope.sysParam.idParam = 8;
                            $scope.sysParam.msg="SERVICIO TECNICO";
                          break;
                          case "4":
                            $scope.sysParam.idParam = 9;
                            $scope.sysParam.msg="FACTURACION";
                          break;
                          case "5":
                            $scope.sysParam.idParam = 10;
                            $scope.sysParam.msg="ADMINISTRATIVO";
                          break;
                          default:
                        }
                        
                        $scope.sysParam.value = $scope.sys.email;
                        console.log($scope.sys.email);  
                        $scope.updateSysParam($http, $scope);
                      }
                    break;
                    case "zones":
                        switch (opt2){
                            case "list":
                                $scope.sysContent = "";
                                $scope.getZonesFn();
                                $timeout(function() {
                                    $scope.loadPagination($scope.rsZonesData, "idZona", "10");
                                }, 500);
                                $scope.sysContent = 'sysZones';
                            break;
                            case "newZone":
                                $scope.list_locations = [];
                                $scope.select.province.selected = undefined;
                                $scope.select.location.selected = undefined;
                                $scope.zone={'new':{}, 'update':{}};
                                $('#newZoneModal').modal('toggle');
                            break;
                            case "addZone":
                                $scope.zones.new.zona.n_zona        = obj.zoneNumber;
                                $scope.zones.new.zona.costo_envio   = obj.costDelivery;
                                $scope.zones.new.zona.valor_envio   = obj.priceDelivery;
                                $scope.zones.new.zona.descripcion   = obj.description;
                                $scope.zones.new.zona.locations     = $scope.list_locations;
                                console.log($scope.zones.new);
                                $scope.addNewZoneFn($scope.zones.new);
                            break;
                            case "editZone":
                                $scope.zone.update = {};
                                $scope.zone.update.zoneNumber       = obj.n_zona;
                                $scope.zone.update.costDelivery     = obj.costo_envio;
                                $scope.zone.update.priceDelivery    = obj.valor_envio;
                                $scope.zone.update.description      = obj.descripcion;
                                $scope.zone.update.idZona           = obj.idZona;
                                $scope.list_locations = [];
                                $scope.select.province.selected = undefined;
                                $scope.select.location.selected = undefined;
                                var id = 0;
                                for (var key in  obj.locations){
                                    id++;
                                    $scope.list_locations.push({'id':id, 'idLocation':obj.locations[key].idLocationKf, 'idProvinceFK':obj.locations[key].idProvinceFK, 'location':obj.locations[key].location,  'province': obj.locations[key].province});
                                }
                                console.log($scope.zone.update);
                                console.log($scope.list_locations);
                                $('#updateZoneModal').modal('toggle');
                            break;
                            case "updateZone":
                                $scope.zones.update.zona.idZona         = $scope.zone.update.idZona;
                                $scope.zones.update.zona.n_zona         = obj.zoneNumber;
                                $scope.zones.update.zona.costo_envio    = obj.costDelivery;
                                $scope.zones.update.zona.valor_envio    = obj.priceDelivery;
                                $scope.zones.update.zona.descripcion    = obj.description;
                                $scope.zones.update.zona.locations      = $scope.list_locations;
                                console.log($scope.zones.update);
                                $scope.updateZoneFn($scope.zones.update);
                            break;
                            case "deleteZone":
                                blockUI.start('Eliminando Zona - '+obj.descripcion);
                                console.log(obj);
                                $timeout(function() {
                                    $scope.deleteZoneFn(obj.idZona);
                                    blockUI.stop();
                                }, 2000);
                            break;
                            case "addLocationsToList":
                                var id = $scope.list_locations.length==0?1:($scope.list_locations.length+1);
                                if ($scope.list_locations.length<=0){
                                    $scope.list_locations.push({'id':1, 'idLocation':obj.idLocation, 'idProvinceFK':obj.idProvinceFK, 'location':obj.location, 'province': obj2.province});
                                    inform.add('Localidad '+obj.location+' ha sido agregado a la lista.',{
                                        ttl:5000, type: 'success'
                                    });
                                }else{
                                    for (var key in  $scope.list_locations){
                                        if ( $scope.list_locations[key].idLocation==obj.idLocation){
                                        inform.add("La localidad "+obj.location+", ya se encuentra en la lista.",{
                                            ttl:5000, type: 'warning'
                                        });
                                        $scope.isLocationExist=true;
                                        break;
                                        }else{
                                        $scope.isLocationExist=false;
                                        }
                                    }
                                    if(!$scope.isLocationExist){
                                        //console.log("ADD_NO_EXIST");
                                        var id = $scope.list_locations.length==0?1:($scope.list_locations.length+1);
                                        $scope.list_locations.push({'id':id, 'idLocation':obj.idLocation, 'idProvinceFK':obj.idProvinceFK, 'location':obj.location,  'province': obj2.province});
                                        inform.add('Localidad '+obj.location+' ha sido agregado a la lista.',{
                                            ttl:5000, type: 'success'
                                        });
                                    }
                                }
                                console.log($scope.list_locations);
                                //$scope.select.province.selected = undefined;
                                $scope.select.location.selected = undefined;
                            break;
                            case "removeLocationsFromList":
                                for (var key in  $scope.list_locations){
                                    if ( $scope.list_locations[key].id==obj.id){
                                        inform.add("La localidad "+obj.location+", ha sido removida de la lista.",{
                                            ttl:5000, type: 'warning'
                                        });
                                        $scope.list_locations.splice(key,1);
                                    }
                                }
                            break;
                            default:
                        }
                    break;
                    case "techServicesCosts":
                        switch (opt2){
                            case "list":
                                $scope.sysContent = "";
                                $scope.getTechServiceListFn();
                                $timeout(function() {
                                    $scope.dayDataCollapseFn();
                                    $scope.sysContent = 'sysServiceCosts';
                                }, 500);
                            break;
                            case "newTechService":
                                $scope.technician={'new':{'service':{}, 'rate':{}}, 'update':{'service':{}, 'rate':{}}};
                                $scope.technician_services={'new':{}, 'update':{}, 'temp':undefined};
                                $('#newTechService').modal('toggle');
                            break;
                            case "newTechServiceCost":
                                $scope.technician={'new':{'service':{}, 'rate':{}}, 'update':{'service':{}, 'rate':{}}};
                                $scope.technician_services={'new':{}, 'update':{}, 'temp':undefined};
                                $('#newTechServiceCost').modal('toggle');
                            break;
                            case "addTechService":
                                //console.log(obj);
                                $scope.getTypeOfMaintenanceFn();
                                var description = obj.description;
                                $scope.technician.new.service.description = description.toUpperCase();
                                $scope.technician.new.service.isProtected = obj.isProtected;
                                console.log($scope.technician.new.service);
                                $scope.addNewTechServiceFn($scope.technician.new);
                            break;
                            case "addTechServiceCost":
                                console.log(obj);
                                $scope.technician.new.rate.idServiceTechnicianKf = obj.idServiceTechnicianKf;
                                $scope.technician.new.rate.idTipoMantenimientoKf = obj.idTipoMantenimientoKf;
                                $scope.technician.new.rate.cost                  = obj.cost;
                                console.log($scope.technician.new);
                                $scope.addNewTechServiceCostFn($scope.technician.new);
                            break;
                            case "editTechService":
                                $scope.technician_services={'new':{}, 'update':{}, 'temp':{}};
                                $scope.technician_services.update = obj;
                                $scope.technician_services.update.isProtected    = obj.isProtected==1?true:false;
                                $scope.technician_services.temp.description      = obj.description;
                                console.log($scope.technician_services.update);
                                $('#editTechService').modal('toggle');
                            break;
                            case "editTechServiceCost":
                                $scope.getTypeOfMaintenanceFn();
                                $scope.technician_services={'new':{}, 'update':{}, 'temp':{}};
                                $scope.technician_services.update = obj;
                                console.log($scope.technician_services.update);
                                $('#editTechServiceCost').modal('toggle');
                                $('#technician_cost').focus();
                            break;
                            case "updateTechService":
                                //console.log(obj);
                                var description = obj.description;
                                $scope.technician.update.service.idServiceTechnician    = obj.idServiceTechnician
                                $scope.technician.update.service.description            = description.toUpperCase();
                                $scope.technician.update.service.isProtected            = obj.isProtected;
                                console.log($scope.technician.update.service);
                                $scope.updateTechServiceFn($scope.technician.update);
                            break;
                            case "updateTechServiceCost":
                                console.log(obj);
                                $scope.technician.update.rate.idServiceTechnicianCost   = obj.idServiceTechnicianCost
                                $scope.technician.update.rate.idServiceTechnicianKf     = obj.idServiceTechnicianKf;
                                $scope.technician.update.rate.idTipoMantenimientoKf     = obj.idTipoMantenimientoKf;
                                $scope.technician.update.rate.cost                      = obj.cost;
                                console.log($scope.technician.update);
                                $scope.updateTechServiceCostFn($scope.technician.update);
                            break;
                            case "delete":
                                blockUI.start('Eliminando Zona - '+obj.descripcion);
                                console.log(obj);
                                $timeout(function() {
                                    $scope.deleteZoneFn(obj.idZona);
                                    blockUI.stop();
                                }, 2000);
                            break;
                            case "addLocationsToList":
                                var id = $scope.list_locations.length==0?1:($scope.list_locations.length+1);
                                if ($scope.list_locations.length<=0){
                                    $scope.list_locations.push({'id':1, 'idLocation':obj.idLocation, 'idProvinceFK':obj.idProvinceFK, 'location':obj.location, 'province': obj2.province});
                                    inform.add('Localidad '+obj.location+' ha sido agregado a la lista.',{
                                        ttl:5000, type: 'success'
                                    });
                                }else{
                                    for (var key in  $scope.list_locations){
                                        if ( $scope.list_locations[key].idLocation==obj.idLocation){
                                        inform.add("La localidad "+obj.location+", ya se encuentra en la lista.",{
                                            ttl:5000, type: 'warning'
                                        });
                                        $scope.isLocationExist=true;
                                        break;
                                        }else{
                                        $scope.isLocationExist=false;
                                        }
                                    }
                                    if(!$scope.isLocationExist){
                                        //console.log("ADD_NO_EXIST");
                                        var id = $scope.list_locations.length==0?1:($scope.list_locations.length+1);
                                        $scope.list_locations.push({'id':id, 'idLocation':obj.idLocation, 'idProvinceFK':obj.idProvinceFK, 'location':obj.location,  'province': obj2.province});
                                        inform.add('Localidad '+obj.location+' ha sido agregado a la lista.',{
                                            ttl:5000, type: 'success'
                                        });
                                    }
                                }
                                console.log($scope.list_locations);
                                //$scope.select.province.selected = undefined;
                                $scope.select.location.selected = undefined;
                            break;
                            case "removeLocationsFromList":
                                for (var key in  $scope.list_locations){
                                    if ( $scope.list_locations[key].id==obj.id){
                                        inform.add("La localidad "+obj.location+", ha sido removida de la lista.",{
                                            ttl:5000, type: 'warning'
                                        });
                                        $scope.list_locations.splice(key,1);
                                    }
                                }
                            break;
                            default:
                        }
                    break;
                    default:
                }
            }
});