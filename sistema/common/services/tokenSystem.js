var tkSysService = angular.module("tokenSystem", []);
/**************************************************
*                                                 *
*        TOKEN SERVICE FOR USER LOGGED IN         *
*                                                 *
**************************************************/ 
tkSysService.service("tokenSystem",function(){
      var tokenStorageValue="";
      return {
          getTokenStorage: function(value) {
            switch (value){
              case 1:
                tokenStorageValue = !localStorage.getItem("sysToken") ? false : localStorage.getItem("sysToken");
              break;
              case 2:
                tokenStorageValue = !JSON.parse(localStorage.getItem("sysLoggedUser")) ? false : JSON.parse(localStorage.getItem("sysLoggedUser"));
              break;
              case 3:
                tokenStorageValue = !JSON.parse(localStorage.getItem("sysTmpUser")) ? false : JSON.parse(localStorage.getItem("sysTmpUser"));
              break;
              case 4:
                tokenStorageValue = JSON.parse(localStorage.getItem("attempsToken"));
              break;
              case 5:
                tokenStorageValue = !JSON.parse(localStorage.getItem("sysTmpTicket")) ? false : JSON.parse(localStorage.getItem("sysTmpTicket"));
              break;
              case 6:
                tokenStorageValue = !JSON.parse(localStorage.getItem("sysLoggedUserModules")) ? false : JSON.parse(localStorage.getItem("sysLoggedUserModules"));
              break;
              case 7:
                tokenStorageValue = !JSON.parse(localStorage.getItem("tknCustomerData")) ? false : JSON.parse(localStorage.getItem("tknCustomerData"));
              break;
              default:

            }
              return tokenStorageValue;
          },
          setTokenStorage: function(tksSystem, tkLoggedUser, tkModulesUser) {
              localStorage.setItem("sysToken", tksSystem);
              localStorage.setItem("sysLoggedUser", JSON.stringify(tkLoggedUser));
              localStorage.setItem("sysLoggedUserModules", JSON.stringify(tkModulesUser));
          },
          setTokenStorageToNull: function() {
            localStorage.setItem("sysToken", null);
            localStorage.setItem("sysLoggedUser", null);
            localStorage.setItem("sysLoggedUserModules", null);
        },
          setLoggedUserStorage: function(tkLoggedUser) {
              localStorage.setItem("sysLoggedUser", JSON.stringify(tkLoggedUser));
          },
          setCustomerByTypeDataStorage: function(value, tkCustomers) {
            //console.log(tkCustomers);
            switch (value){
              case 1:
                localStorage.setItem("tkAdministrationCustomersData", JSON.stringify(tkCustomers));
              break;
              case 2:
                localStorage.setItem("tkBuildingCustomersData", JSON.stringify(tkCustomers));
              break;
              case 3:
                localStorage.setItem("tkCompanyCustomersData", JSON.stringify(tkCustomers));
              break;
              case 4:
                localStorage.setItem("tkBranchCustomersData", JSON.stringify(tkCustomers));
              break;
              case 5:
                localStorage.setItem("tkParticularCustomersData", JSON.stringify(tkCustomers));
              break;
              case "registered":
                localStorage.setItem("tkCustomersRegisteredData", JSON.stringify(tkCustomers));
              break;
              case "notregistered":
                localStorage.setItem("tkCustomersNotRegisteredData", JSON.stringify(tkCustomers));
              break;
              default:

            }
              return tokenStorageValue;
          },
          getCustomerByTypeDataStorage: function(value) {
            switch (value){
              case 1:
                tkData = !JSON.parse(localStorage.getItem("tkAdministrationCustomersData")) ? false : JSON.parse(localStorage.getItem("tkAdministrationCustomersData"));
              break;
              case 2:
                tkData = !JSON.parse(localStorage.getItem("tkBuildingCustomersData")) ? false : JSON.parse(localStorage.getItem("tkBuildingCustomersData"));
              break;
              case 3:
                tkData = !JSON.parse(localStorage.getItem("tkCompanyCustomersData")) ? false : JSON.parse(localStorage.getItem("tkCompanyCustomersData"));
              break;
              case 4:
                tkData = !JSON.parse(localStorage.getItem("tkBranchCustomersData")) ? false : JSON.parse(localStorage.getItem("tkBranchCustomersData"));
              break;
              case 5:
                tkData = !JSON.parse(localStorage.getItem("tkParticularCustomersData")) ? false : JSON.parse(localStorage.getItem("tkParticularCustomersData"));
              break;
              case "registered":
                tkData = !JSON.parse(localStorage.getItem("tkCustomersRegisteredData")) ? false : JSON.parse(localStorage.getItem("tkCustomersRegisteredData"));
              break;
              case "notregistered":
                tkData = !JSON.parse(localStorage.getItem("tkCustomersNotRegisteredData")) ? false : JSON.parse(localStorage.getItem("tkCustomersNotRegisteredData"));
              break;
              default:
            }
              return tkData;
          },
          setSelectedCustomerDataStorage: function(tkCustomerData) {
            localStorage.setItem("tknCustomerData", JSON.stringify(tkCustomerData));
          },
          temporalStorage: function(tkTmpUser) {
              localStorage.setItem("sysTmpUser", JSON.stringify(tkTmpUser));
          },
          tmpTicketlStorage: function(tkTmpTicket) {
              localStorage.setItem("sysTmpTicket", JSON.stringify(tkTmpTicket));
          },
          destroyTokenStorage: function(value) {
            switch (value){
              case 1:
                console.log("Destroying the local storage for sysToken, sysLoggedUser, sysLoggedUserModules");
                localStorage.removeItem("sysToken");
                localStorage.removeItem("sysLoggedUser");
                localStorage.removeItem("sysLoggedUserModules");
              break;
              case 2:
                localStorage.removeItem("attempsToken");
              break;
              case 3:
                localStorage.removeItem("sysTmpUser");
              break;
              case 4:
                localStorage.removeItem("attempsToken");
                localStorage.removeItem("sysTmpUser");
                //localStorage.removeItem("sysTmpTicket");
              break;
              case 5:
                localStorage.removeItem("sysLoggedUser");
              break;
              case 6:
                localStorage.removeItem("tknCustomerData");
              break;
              default:

            }

              
              
          },
      }
});

