  /**
   * Menu Controller
   */
  var menu = angular.module("module.Menu", ["tokenSystem", "angular.filter", "services.Address", "services.User", "services.Utilities"]);
  menu.directive('allowTyping', function () {
    return {
      restrict : 'A',
      link : function(scope, elem, attrs, ctrl) {
        var regex = attrs.allowTyping;
        elem.bind('keypress', function(event) {
          var pos =  event.target.selectionStart;
          var oldViewValue = elem.val();
          var input = newViewValue(oldViewValue, pos, event.key);
          if ((typeof input === 'string' && input.length==2) || (typeof input === 'number' && input>=1)){
            var validator = new RegExp(regex);
            console.log("regexEval:"+validator.test(input));
              if (!validator.test(input)) {
                event.preventDefault();
                return false;
              }
          }
        });
          function newViewValue(oldViewValue, pos, key) {
            if (!oldViewValue) return key;
            return   [oldViewValue.slice(0, pos), key, oldViewValue.slice(pos)].join('');
          } 
      }
    };
  });
  menu.controller('MenuCtrl', function($scope, $location, $routeParams, blockUI, $timeout, inform, inputService, userServices, tokenSystem, addressServices, UtilitiesServices, $window, $filter, APP_SYS){
      //if ($location.path() == "/login"){console.log($location.path());}
      console.log("Bienvenido al sistema de "+APP_SYS.app_name);
      console.log("Version v"+APP_SYS.version);
      $scope.sysToken             = tokenSystem.getTokenStorage(1);
      $scope.sysLoggedUser        = tokenSystem.getTokenStorage(2);
      $scope.sysLoggedUserModules = tokenSystem.getTokenStorage(6);
      console.log($scope.sysLoggedUser);
      $scope.pattOnlyNumbersX2         = /^[0-9]{1,2}$/;
      $scope.pattX2CharactersNumbersX2 = /^(pb|PB)|^[0-9]{1,2}$/;
      $scope.pattX3CharactersNumbersX3 = /^([a-zA-Z]|[\d])|^[0-9]{1,3}$/;
      $scope.pattOnlyNumbersX6         = /^[0-9]{1,6}$/;
      $scope.counterInformShow = 0;
      $('.modal-backdrop').hide();
      $scope.launchLoader = function(){
        $scope.wLoader  = true;
         $timeout(function() {
           $('#loader').fadeOut();
           $('#wLoader').delay(350).fadeOut('slow'); 
           $scope.wLoader  = false;
         }, 1500);
         
       }
      /**
       * LOAD SYSTEM MODULES AND MENU
       */
        $scope.sysModules = {'idMonitor':false, 'idLlaveros':false, 'idEdificios':false, 'idConfiguracion':false, 'idPerfilUsuario':false, 'idCliente':false, 'idServicio':false, 'idProducto': false, 'idUsers': false};
        $scope.sysLoadModules = function (){
          for (var key in $scope.sysLoggedUserModules){
          switch ($scope.sysLoggedUserModules[key].idModuleFk){
            case "1":
              $scope.sysModules.idMonitor=true;
            break;
            case "2":
              $scope.sysModules.idLlaveros=true;
            break;
            case "3":
              $scope.sysModules.idEdificios=true;
            break;
            case "4":
              $scope.sysModules.idConfiguracion=true;
            break;
            case "5":
              $scope.sysModules.idPerfilUsuario=true;
            break;
            case "6":
              $scope.sysModules.idCliente=true;
            break;
            case "7":
              $scope.sysModules.idServices=true;
            break;
            case "8":
              $scope.sysModules.idProducto=true;
            break;
            case "9":
              $scope.sysModules.idUsers=true;
            break;          
            default:
          }
          }
        };$scope.sysLoadModules();
       /*********************************************/
       $scope.regexURL = '^((https?|ftp)://)?([A-Za-z]+\\.)?[A-Za-z0-9-]+(\\.[a-zA-Z]{1,4}){1,2}(/.*\\?.*)?$';
       $scope.regexTIME='/([01]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/';
       $scope.regexDepto = '/([a-zA-Z]|[\d]){1,3}\b$/'
        $scope.modalConfirmationMenu = function(opt, confirm, obj){
          $scope.swMenu = opt;
          $scope.mess2show="";
          console.log("$scope.swMenu: "+$scope.swMenu);
          switch ($scope.swMenu){
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
                $('#confirmRequestModalMenu').modal('toggle');
              }else if (confirm==1){
                    $scope.sysUpdateUserFn($scope.argObj);
                $('#confirmRequestModalMenu').modal('hide');
              }
            break;
            case "logout":
              if (confirm==0){
                  if (obj.idUser!=null){
                      $scope.mess2show  = "Esta seguro que desea cerrar la session, Confirmar?";
                      $scope.idUserKf   =  obj.idUser;
                      $scope.argObj     = obj;
                      console.log('Cierre de session del usuario ID: '+$scope.idUserKf+' BAJO EL NOMBRE: '+obj.fullNameUser);
                      console.log("============================================================================")
                      console.log($scope.argObj);
                  }      
                $('#confirmRequestModalMenu').modal('toggle');
              }else if (confirm==1){
                $scope.logout();
                $('#confirmRequestModalMenu').modal('hide');
              }
            break;
            default:
          }
        }
      /**************************************************
      *                                                 *
      *                   SCHEDULE TIME                 *
      *                                                 *
      **************************************************/
        $scope.list_schedule_atention = [];
        $scope.list_schedule_Arr = [];
        $scope.list_input_first = {fronAm:'', toAm:'', fronPm: '', toPm:''};
        $scope.list_input_last = {fronAm:'', toAm:'', fronPm: '', toPm:''};
        $scope.dayOfWeek_list=[{}];
        $scope.setScheduleTimeFn = function(obj, opt){
          //console.log(obj);
          //console.log("================================================================");
          if (opt=="new"){
              if(obj.selected==true){
              //console.info("Checkbox selected = "+obj.selected);
              if ($scope.list_schedule_atention.length<=0 ){
                  //console.log("length is equal 0 or less 0");
                  $scope.list_schedule_atention.push({'day':obj.day, 'fronAm':obj.fronAm, 'toAm': obj.toAm, 'fronPm': obj.fronPm, 'toPm': obj.toPm});
                  $scope.list_input_first.fronAm  = obj.fronAm;
                  $scope.list_input_first.toAm    = obj.toAm;
                  $scope.list_input_first.fronPm  = obj.fronPm;
                  $scope.list_input_first.toPm    = obj.toPm;
              }else{
                  for (var key in  $scope.list_schedule_atention){
                  // console.log(key);
                  //console.log("Validando: "+$scope.list_phone_contact[key].phoneContact+" == "+obj.idDiviceOpening);
                      if ($scope.list_schedule_atention[key].day==obj.day){
                          $scope.list_schedule_atention[key].fronAm   = obj.fronAm;
                          $scope.list_schedule_atention[key].toAm     = obj.toAm;
                          $scope.list_schedule_atention[key].fronPm   = obj.fronPm;
                          $scope.list_schedule_atention[key].toPm     = obj.toPm;
                          //Validate if there is only one item in the array.
                          if($scope.list_schedule_atention.length==1 || ($scope.list_schedule_atention[key].day==obj.day && obj.day=="Lunes")){
                          $scope.list_input_first.fronAm  = obj.fronAm;
                          $scope.list_input_first.toAm    = obj.toAm;
                          $scope.list_input_first.fronPm  = obj.fronPm;
                          $scope.list_input_first.toPm    = obj.toPm;
                          }

                      $scope.isSchedItemExist=true;
                      break;
                      
                      }else{
                      $scope.isSchedItemExist=false;
                      }
                  }
                  //console.log("isSchedItemExist: "+$scope.isSchedItemExist);
                  if(!$scope.isSchedItemExist){
                      console.log("ADD_NO_EXIST");
                  for (var key in  $scope.list_schedule){
                      if ( $scope.list_schedule[key].day==obj.day){
                          $scope.list_schedule[key].fronAm = $scope.list_input_first.fronAm;
                          $scope.list_schedule[key].toAm   = $scope.list_input_first.toAm;
                          $scope.list_schedule[key].fronPm = $scope.list_input_first.fronPm;
                          $scope.list_schedule[key].toPm   = $scope.list_input_first.toPm;
                      }
                  }
                  $scope.list_schedule_atention.push({'day':obj.day, 'fronAm':obj.fronAm, 'toAm': obj.toAm, 'fronPm': obj.fronPm, 'toPm': obj.toPm});
                  }
              }
              //console.info($scope.list_schedule_atention);
              }else{
              //console.info("Checkbox selected = "+obj.selected);
              console.info("The arr Item id ["+obj.id+"] - "+obj.day+" Will be removed.");
              for (var key in  $scope.list_schedule_atention){
                  if ($scope.list_schedule_atention[key].day==obj.day){
                  $scope.list_schedule_atention.splice(key,1);
                  }
              }
              for (var key in  $scope.list_schedule){
                  if ( $scope.list_schedule[key].day==obj.day){
                  $scope.list_schedule[key].fronAm = "";
                  $scope.list_schedule[key].toAm   = "";
                  $scope.list_schedule[key].fronPm = "";
                  $scope.list_schedule[key].toPm   = "";
                  }
              }
              //console.info($scope.list_schedule_atention);
              }
          }else{
              if(obj.selected==true){
              var list_schedule_atention_length=$scope.list_schedule_atention.length;
              //console.info("Checkbox selected = "+obj.selected);
              if (list_schedule_atention_length<=0 ){
                  //console.log("length is equal 0 or less 0");
                  $scope.list_schedule_atention.push({'idClienteFk':$scope.customer.update.idClient, 'day':obj.day, 'fronAm':obj.fronAm, 'toAm': obj.toAm, 'fronPm': obj.fronPm, 'toPm': obj.toPm});
                  $scope.list_input_first.fronAm  = obj.fronAm;
                  $scope.list_input_first.toAm    = obj.toAm;
                  $scope.list_input_first.fronPm  = obj.fronPm;
                  $scope.list_input_first.toPm    = obj.toPm;
              }else{
                  for (var key in  $scope.list_schedule_atention){
                  //Validate if there is one or more item in the array to pick up the first element value or the last one
                  if(list_schedule_atention_length==1 || ($scope.list_schedule_atention[key].day==obj.day && obj.day=="Lunes")){
                      $scope.list_input_first.fronAm  = $scope.list_schedule_atention[key].fronAm;
                      $scope.list_input_first.toAm    = $scope.list_schedule_atention[key].toAm;
                      $scope.list_input_first.fronPm  = $scope.list_schedule_atention[key].fronPm;
                      $scope.list_input_first.toPm    = $scope.list_schedule_atention[key].toPm;
                  }else if(list_schedule_atention_length>1 && ($scope.list_schedule_atention[key].day=="Lunes" || $scope.list_schedule_atention[key].day=="Martes" || $scope.list_schedule_atention[key].day=="Miercoles" || $scope.list_schedule_atention[key].day=="Jueves" || $scope.list_schedule_atention[key].day=="Viernes" || $scope.list_schedule_atention[key].day=="Sabado" || $scope.list_schedule_atention[key].day=="Domingo")){
                      $scope.list_input_last.fronAm  = $scope.list_schedule_atention[key].fronAm;
                      $scope.list_input_last.toAm    = $scope.list_schedule_atention[key].toAm;
                      $scope.list_input_last.fronPm  = $scope.list_schedule_atention[key].fronPm;
                      $scope.list_input_last.toPm    = $scope.list_schedule_atention[key].toPm;                      
                  }
                  }
                  for (var key in  $scope.list_schedule_atention){
                      if ($scope.list_schedule_atention[key].day==obj.day){
                          $scope.list_schedule_atention[key].fronAm   = obj.fronAm;
                          $scope.list_schedule_atention[key].toAm     = obj.toAm;
                          $scope.list_schedule_atention[key].fronPm   = obj.fronPm;
                          $scope.list_schedule_atention[key].toPm     = obj.toPm;
                      $scope.isSchedItemExist=true;
                      break;
                      
                      }else{
                      $scope.isSchedItemExist=false;
                      }
                  }
                  //console.log("isSchedItemExist: "+$scope.isSchedItemExist);
                  if(!$scope.isSchedItemExist){
                      //console.log("ADD_NO_EXIST");
                  for (var key in  $scope.list_schedule){
                      if ( $scope.list_schedule[key].day==obj.day){
                          if (list_schedule_atention_length==1){
                          //console.log("adding the data of the first element of the array.");
                          $scope.list_schedule[key].fronAm = $scope.list_input_first.fronAm;
                          $scope.list_schedule[key].toAm   = $scope.list_input_first.toAm;
                          $scope.list_schedule[key].fronPm = $scope.list_input_first.fronPm;
                          $scope.list_schedule[key].toPm   = $scope.list_input_first.toPm;
                          $scope.list_schedule_atention.push({
                              'idClienteFk':$scope.customer.update.idClient, 
                              'day':obj.day, 
                              'fronAm':$scope.list_input_first.fronAm, 
                              'toAm': $scope.list_input_first.toAm, 
                              'fronPm': $scope.list_input_first.fronPm, 
                              'toPm': $scope.list_input_first.toPm});                      
                          }else if(list_schedule_atention_length>1){
                          //console.log("adding the data of the last element of the array.");
                          $scope.list_schedule[key].fronAm = $scope.list_input_last.fronAm;
                          $scope.list_schedule[key].toAm   = $scope.list_input_last.toAm;
                          $scope.list_schedule[key].fronPm = $scope.list_input_last.fronPm;
                          $scope.list_schedule[key].toPm   = $scope.list_input_last.toPm;
                          $scope.list_schedule_atention.push({
                              'idClienteFk':$scope.customer.update.idClient, 
                              'day':obj.day, 
                              'fronAm':$scope.list_input_last.fronAm, 
                              'toAm': $scope.list_input_last.toAm, 
                              'fronPm': $scope.list_input_last.fronPm, 
                              'toPm': $scope.list_input_last.toPm});
                          }
                      }
                  }
                  
                  }
              }
              //console.info($scope.list_schedule_atention);
              }else{
              //console.info("Checkbox selected = "+obj.selected);
              //console.info("The arr Item id ["+obj.id+"] - "+obj.day+" Will be removed.");
              for (var key in  $scope.list_schedule_atention){
                  if ($scope.list_schedule_atention[key].day==obj.day){
                  $scope.list_schedule_atention.splice(key,1);
                  }
              }
              for (var key in  $scope.list_schedule){
                  if ( $scope.list_schedule[key].day==obj.day){
                  $scope.list_schedule[key].fronAm = "";
                  $scope.list_schedule[key].toAm   = "";
                  $scope.list_schedule[key].fronPm = "";
                  $scope.list_schedule[key].toPm   = "";
                  }
              }
              }
          }
        
        }
        $scope.schedTime=[];
        $scope.list_schedule_time_orderBy=[];
        $scope.orderScheduleTimeFn = function(arr){
          $scope.schedTime = arr;
          $scope.list_schedule_time_orderBy=[];
          for (i=0;i<$scope.list_schedule.length;i++){
              j=0;
              for (j=0;j<$scope.schedTime.length;j++){
              if($scope.list_schedule[i].day==$scope.schedTime[j].day){
                  //$scope.list_schedule_time_orderBy.push({'day':$scope.schedTime[j].day, 'fronAm':$scope.schedTime[j].fronAm, 'toAm': $scope.schedTime[j].toAm, 'fronPm': $scope.schedTime[j].fronPm, 'toPm': $scope.schedTime[j].toPm});
                  $scope.list_schedule_time_orderBy.push($scope.schedTime[j]);              
                  break;
              }
              }
          }
          //console.info($scope.list_schedule_time_orderBy);
        }
      /**************************************************
      *                                                 *
      *                SCHEDULE ATENTION                *
      *                                                 *
      **************************************************/
       $scope.setScheduleListFn = function(){
          $scope.list_schedule=[{
                              id    :1,
                              day   :'Lunes',
                              fronAm:'08:00',
                              toAm  :'12:00',
                              fronPm:'17:00',
                              toPm  :'20:00',
                              selected:false
                            },{
                              id    :2,                          
                              day   :'Martes',
                              fronAm:'',
                              toAm  :'',
                              fronPm:'',
                              toPm  :'',
                              selected:false                          
                            },{
                              id    :3,
                              day   :'Miercoles',
                              fronAm:'',
                              toAm  :'',
                              fronPm:'',
                              toPm  :'',
                              selected:false                          
                            },{
                              id    :4,
                              day   :'Jueves',
                              fronAm:'',
                              toAm  :'',
                              fronPm:'',
                              toPm  :'',
                              selected:false                          
                            },{
                              id    :5,
                              day   :'Viernes',
                              fronAm:'',
                              toAm  :'',
                              fronPm:'',
                              toPm  :'' ,
                              selected:false                         
                            },{
                              id    :6,
                              day   :'Sabado',
                              fronAm:'',
                              toAm  :'',
                              fronPm:'',
                              toPm  :'' ,
                              selected:false                         
                            },{
                              id    :7,
                              day   :'Domingo',
                              fronAm:'',
                              toAm  :'',
                              fronPm:'',
                              toPm  :'',
                              selected:false                          
          }];
       }

      /**************************************************
      *                                                 *
      *             GET STATES & LOCATIONS              *
      *                  LOCAL API                      *
      *                                                 *
      **************************************************/
        $scope.rsStatesData = {};
        $scope.getStatesFn = function(){
          addressServices.getStates().then(function(data){
              $scope.rsStatesData = data;
              //console.log($scope.rsStatesData);
          });
        };
        $scope.getAllLocationsFn = function(){
          addressServices.getAllLocations().then(function(data){
              $scope.rsLocations_All = data;
              $scope.rsLocations_All2 = data;
              //console.log($scope.rsLocations_API_Data);
          });
        };        
      /**************************************************
       *                                                 *
       *                GET TYPE OF IVA                  *
       *                                                 *
       **************************************************/
       $scope.rsTypeOfIVAData = {};
       $scope.getTypeOfIVAFn = function(){
         UtilitiesServices.getTypeOfIVA().then(function(data){
             $scope.rsTypeOfIVAData = data;
             //console.log($scope.rsProfileData);
         });
       };
        /**************************************************
        *                                                 *
        *                GET TYPE OF MAILS                *
        *                                                 *
        **************************************************/
        $scope.rsTypeOfMailsData = {};
        $scope.getTypeOfMailsFn = function(){
          UtilitiesServices.typeOfMails().then(function(data){
              $scope.rsTypeOfMailsData = data;
              //console.log($scope.rsProfileData);
          });
        };

        /**************************************************
        *                                                 *
        *                     GET AGENTS                  *
        *                                                 *
        **************************************************/
          $scope.rsAgentsData = {};
          $scope.getAgentsFn = function(){
           UtilitiesServices.getAgents().then(function(data){
               $scope.rsAgentsData = data;
               //console.log($scope.rsProfileData);
           });
          };
         
        /**************************************************
        *                                                 *
        *                    GET ZONES                    *
        *                                                 *
        **************************************************/
          $scope.rsZonesData = {};
          $scope.getZonesFn = function(opt){
            UtilitiesServices.getZones().then(function(data){
                $scope.rsZonesData = data;
                if(opt==1){$scope.loadPagination($scope.rsZonesData, "idZona", "10");}
                //console.log($scope.rsZonesData);
            });
          };

        /**************************************************
        *                                                 *
        *       GET CATEGORY TYPES OF BUILDING UNITS      *
        *                                                 *
        **************************************************/
          $scope.rsCategoryDeptoData = {};
          $scope.getCategoryDepartamentFn = function(){
              UtilitiesServices.categoryDepartament().then(function(data){
                  $scope.rsCategoryDeptoData = data;
                  //console.log($scope.rsCategoryDeptoData);
              });
          };
        /**************************************************
        *                                                 *
        *             GET TYPE OF Property                *
        *                                                 *
        **************************************************/
          $scope.rsTypeOfPropertyData = {};
          $scope.typeOfPropertyFn = function(){
              UtilitiesServices.typeOfProperty().then(function(data){
                  $scope.rsTypeOfPropertyData = data;
                  //console.log($scope.rsTypeOfPropertyData);
              });
          };
        /**************************************************
        *                                                 *
        *          GET TYPES OF INTERNET SERVICES         *
        *                                                 *
        **************************************************/
          $scope.rsInternetTypesData = {};
          $scope.getInternetTypesFn = function(opt){
            UtilitiesServices.typeOfInternetServices().then(function(data){
                $scope.rsInternetTypesData = data;
                //console.log($scope.rsProfileData);
            });
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
        *               REQUEST SELECT LIST               *
        *     (status, profile, typeTenant, company)      *
        **************************************************/
          $scope.listProfile      = {};
          $scope.listProfiles     = {};
          $scope.lisTypeTenant    = {};
          $scope.listStatus       = {};
          $scope.listTypeAttendant= {};
          $scope.CallFilterFormU = function(){
            userServices.filterForm().then(function(response){
              if(response.status==200){
                $scope.listProfile      = response.data.profile;
                $scope.listProfiles     = response.data.profiles;
                $scope.lisTypeTenant    = response.data.typeTenant;
                $scope.listStatus       = response.data.status;
                $scope.listTypeAttendant= response.data.typeattendant;
              }else{
                $scope.listProfile      = {};
                $scope.listProfiles     = {};
                $scope.lisTypeTenant    = {};
                $scope.listStatus       = {};
                $scope.listTypeAttendant= {};
              }
            });
          };
          $scope.fnLoadPhoneMask = function(){
            /**********************************************
            *               INPUT PHONE MASK              *
            **********************************************/
              $('.input--phone').mask('+54 (0##) (15) ####-####',
              {
                reverse: false,
                translation:{
                  '0': null,
                  '1': null,
                  '4': null,
                  '5': null,
                  '+': null,
                  '#':{
                    pattern: /[1-9]/
                  }
                },
                placeholder: "+54 (0__) (15) ____ ____"
              });
            $('.input--time').mask('00:00');
            $('.input--date').mask('00r00r0000', {
              translation: {
                'r': {
                  pattern: /[\/]/,
                  fallback: '/'
                },
                placeholder: "__/__/____"
              }
            })
            /**********************************************
            *               INPUT DNI MASK                *
            **********************************************/
              $('.input--dni').mask('99999999');
            $('.input--dni').mask('99999999');
            $('.input--number--2').mask('99');
            $('.input--number').mask('999');
            $('.input--depto').mask('ZZZ',
                {
                  translation:{
                    'Z':{
                      pattern: /[a-zA-Z0-9]/
                    }
                  }
                }
            );          
            $('.input--floor').mask('XX',
                {
                  translation:{
                    'X':{
                      pattern: /[a-zA-Z0-9]/
                    }
                  }
                }
            );
            $('.input--date-number').mask('999999');
            $('.input--date').mask('00/00/0000', {placeholder: "__/__/____"});
            $('.input-ipaddr').mask('099.099.099.099', {placeholder: "___.___.___.___"});
            $('.input-macaddr').mask('ZZ-ZZ-ZZ-ZZ-ZZ-ZZ', 
                {
                  translation:{
                    'Z':{
                      pattern: /[a-zA-Z0-9]/
                    }
                  },
                  placeholder: "__-__-__-__-__-__"}
            );
            $('.input--decimal').mask('999999,99');
            $('.input--tel.input--dni').on('focus', function () {
              //console.log($(this).val());
              if ($(this).val().length === 0) {
                $(this).val();
              }
            });
            
            $('.input--tel.input--dni').keydown(function (e) {
                  if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
                      (e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true)) ||
                      (e.keyCode == 67 && (e.ctrlKey === true || e.metaKey === true)) ||
                      (e.keyCode == 88 && (e.ctrlKey === true || e.metaKey === true)) ||
                      (e.keyCode >= 35 && e.keyCode <= 39)) {
                          return;
                  }
  
                  if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                      e.preventDefault();
                  }
              });      
          };
        /**************************************************
        *                                                 *
        *           UPDATE PROFILE LOGGED USER            *
        *     (status, profile, typeTenant, company)      *
        **************************************************/
          $scope.profile=[];
          $scope.profileUserOpen = function(){
            $scope.profile=[];
            $scope.profile=tokenSystem.getTokenStorage(2);

            $('#ProfileModalUser').modal('toggle');
          }
          $scope.updateProfileLoggedUser=function(){
            //Update Profile and LocalStorage Variable Module
            var isEditUser=0;
            console.log("==========================================");
                $scope.sysLoggedUser.fullNameUser         = $scope.profile.fullNameUser;
                $scope.sysLoggedUser.emailUser            = $scope.profile.emailUser;
                $scope.sysLoggedUser.phoneNumberUser      = $scope.profile.phoneNumberUser;
                $scope.sysLoggedUser.phoneLocalNumberUser = $scope.profile.phoneLocalNumberUser;
                $scope.sysLoggedUser.isEdit               = 1;
                $scope.rsUser = {'user':{}}
                $scope.rsUser.user=$scope.sysLoggedUser;
            console.log($scope.rsUser)
            console.log("==========================================");
            userServices.updateUser($scope.rsUser).then(function(response){
              if(response.status==200){
                console.log("Usuario: "+$scope.rsUser.user.fullNameUser+" Successfully updated");
                inform.add('El Usuario: '+$scope.rsUser.user.fullNameUser+' ha sido actualizado con exito. ',{
                      ttl:3000, type: 'success'
                });
                tokenSystem.destroyTokenStorage(5);
                $('#ProfileModalUser').modal('hide');
                setTimeout(function() {
                  tokenSystem.setLoggedUserStorage($scope.rsUser.user);
                  $scope.sysLoggedUser        = tokenSystem.getTokenStorage(2);
                }, 1000);
              }else if(response.status==404){
                inform.add('[Error]: '+response.status+', Ocurrio error verifique los datos e intenta de nuevo o contacta el area de soporte. ',{
                  ttl:5000, type: 'danger'
                  });
              }else if(response.status==500){
                console.log("User not updated, contact administrator");
                inform.add('[Error]: '+response.status+', Ha ocurrido un error en la comunicacion con servidor, contacta el area de soporte. ',{
                  ttl:5000, type: 'danger'
                  });
              }
            });
          }
          $scope.passwdModalUserOpen = function(){
            $('#PasswdModalUser').modal('toggle');
          }
        /**************************************************
        *                                                 *
        *                LOGOUT FUNCTION                  *
        *                                                 *
        **************************************************/
          $scope.logout = function(){
            $scope.rsJSON = "";
            localStorage.clear();
            $scope.sysToken = false;
            $location.path("/login");
          };
      if ($location.path() != "/register" && $location.path() != "/forgotpwd" && $location.path() != "/newpwd"){
        if (!$scope.sysToken || $scope.sysLoggedUser==undefined || $scope.sysLoggedUserModules==undefined){
            $location.path("/login");
        }else{
          //$scope.sysLoadLStorage();
          $scope.sysLoadModules();
          $scope.getStatesFn();
          $scope.getAllLocationsFn();
          $scope.setScheduleListFn();
          $scope.getTypeOfIVAFn();
          $scope.getTypeOfMailsFn();
          $scope.getAgentsFn();
          $scope.getZonesFn();
          $scope.getCategoryDepartamentFn();
          $scope.typeOfPropertyFn();
          $scope.getInternetTypesFn();
          $scope.CallFilterFormU();
          $scope.fnLoadPhoneMask();
          $timeout(function() {
            inform.add('Bienvenido Sr/a '+ $scope.sysLoggedUser.fullNameUser,{
                ttl:3000, type: 'success'
            });
          }, 620);
        }
      }
      $scope.getRoute = function(route){
        return route === $location.path();
      }
  });