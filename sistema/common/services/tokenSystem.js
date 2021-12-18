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
              default:

            }
              return tokenStorageValue;
          },
          setTokenStorage: function(tksSystem, tkLoggedUser, tkModulesUser) {
              localStorage.setItem("sysToken", tksSystem);
              localStorage.setItem("sysLoggedUser", JSON.stringify(tkLoggedUser));
              localStorage.setItem("sysLoggedUserModules", JSON.stringify(tkModulesUser));
          },
          setLoggedUserStorage: function(tkLoggedUser) {
              localStorage.setItem("sysLoggedUser", JSON.stringify(tkLoggedUser));
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
              default:

            }

              
              
          },
      }
});

