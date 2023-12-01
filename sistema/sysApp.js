var app = angular.module('systemApp', ["ngRoute", "ngCookies",
                                             "module.Menu",
                                            "module.Login",
                                     "module.RegisterUser",
                                         "module.Products",
                                          "module.Monitor",
                                        "module.Customers",
                                           "module.Status",
                                         "module.Approval",
                                         "module.Services",
                                           "module.NewPwd",
                                        "module.ForgotPwd",
                                           "services.User",
                                       "services.Profiles",
                                       "services.Products",
                                         "services.Ticket",
                                            "module.Users",
                                           "services.Keys",
                                             "module.Keys",
                                             "module.Tech",
                                        "services.Address",
                                        "module.Buildings",
                                          "module.Tickets",
                                           "module.System",
                                                 "blockUI",
                                                  "inform",
                                        //"inform-exception",
                                                "showdown",
                                             "tokenSystem",
                                               "ngAnimate",
                                               "ngTouch",
                                            "ui.bootstrap",
                                             "ngclipboard",
                   //"angularUtils.directives.dirPagination",
                                          "angular.filter",
                                                "rzSlider",
                                             "angularCSS"]);
app.config(function(blockUIConfig) {
      // Tell blockUI not to mark the body element as the main block scope.
      blockUIConfig.autoInjectBodyBlock = true;  
      blockUIConfig.autoBlock = true;
});
//app.config(function(paginationTemplateProvider) {
//    paginationTemplateProvider.setPath('views/pagination/dirPagination-tpl.html');
//});
app.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {

     $routeProvider
        .when('/login', {
            templateUrl: 'views/login/',
            controller: 'LoginCtrl',
            css: 'views/login/style-login.css'
        })
        .when('/login/approve/:Type/:action/depto/:deptoId/user/:userId', {
            templateUrl: 'views/login/',
            controller: 'LoginCtrl',
            css: 'views/login/style-login.css'
        })
        .when('/login/approve/:Type/:action/token/:secureToken', {
            templateUrl: 'views/login/',
            controller: 'LoginCtrl',
            css: 'views/login/style-login.css'
        })
        .when('/register', {
            templateUrl: 'views/register/',
            controller: 'RegisterUserCtrl',
            css: 'views/login/style-login.css'
        })
        .when('/forgotpwd', {
            templateUrl: 'views/forgotpwd/',
            controller: 'ForgotPwdCtrl',
            css: 'views/login/style-login.css'
        })
        .when('/newpwd', {
            templateUrl: 'views/newpwd/',
            controller: 'NewPwdCtrl',
            css: 'views/login/style-login.css'
        })    
        .when('/monitor', {
            templateUrl: 'views/monitor/',
            controller: 'MonitorCtrl',
            css: 'views/mainapp/style.css'
        })
        .when('/monitor/collection_id/:collection_id/collection_status/:collection_status/payment_id/:payment_id/external_reference/:external_reference/payment_type/:payment_type/merchant_order_id/:merchant_order_id/preference_id/:preference_id/site_id/:site_id/processing_mode/:processing_mode/merchant_account_id/:processing_mode', {
            templateUrl: 'views/monitor/',
            controller: 'MonitorCtrl',
            css: 'views/mainapp/style.css'
        })
        .when('/customers', {
          templateUrl: 'views/customer/',
          controller: 'CustomersCtrl',
          css: 'views/mainapp/style.css'
        })
        .when('/status', {
            templateUrl: 'views/status/',
            controller: 'statusCtrl',
            css: 'views/status/style.css'
        })
        .when('/status/client/:client', {
            templateUrl: 'views/status/',
            controller: 'statusCtrl',
            css: 'views/status/style.css'
        })
        .when('/status/services/:service', {
            templateUrl: 'views/status/',
            controller: 'statusCtrl',
            css: 'views/status/style.css'
        })
        .when('/services', {
            templateUrl: 'views/services/',
            controller: 'ServicesCtrl',
            css: 'views/mainapp/style.css'
          })
        .when('/products', {
            templateUrl: 'views/products/',
            controller: 'ProductsCtrl',
            css: 'views/mainapp/style.css'
        })
        .when('/keys', {
            templateUrl: 'views/keys/',
            controller: 'KeysCtrl',
            css: 'views/mainapp/style.css'
        })
        .when('/tech', {
            templateUrl: 'views/technicians/',
            controller: 'TechCtrl',
            css: 'views/mainapp/style.css'
        })
        .when('/tickets', {
            templateUrl: 'views/tickets/',
            controller: 'TicketsCtrl',
            css: 'views/mainapp/style.css'
        })
        .when('/buildings', {
            templateUrl: 'views/buildings/',
            controller: 'BuildingsCtrl',
            css: 'views/mainapp/style.css'
        })
        .when('/users', {
            templateUrl: 'views/users/',
            controller: 'UsersCtrl',
            css: 'views/mainapp/style.css'
        })
        .when('/system', {
            templateUrl: 'views/system/',
            controller: 'SystemCtrl',
            css: 'views/mainapp/style.css'
        })
        .otherwise({
            redirectTo: '/login'
        });
        // use the HTML5 History API
        $locationProvider.html5Mode(true);
}]);
//app.constant("serverHost","https://apidev.sytes.net");
app.constant("serverHost","https://devtass.sytes.net");
app.constant("serverBackend","/Back/index.php/");
app.constant("serverHeaders", {'headers':{'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Credentials': true, 'Access-Control-Allow-Origin': '*'}});
app.constant('APP_SYS', {
  'app_name': 'Gestion de Clientes',
  'version' : '1.0',
  'api_url' : 'https://devtass.sytes.net/',
  'api_path': 'Back/index.php/',
  'headers' : {'headers':{'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Credentials': true, 'Access-Control-Allow-Origin': '*'}}
});
app.constant('APP_REGEX',{
    'checkEmail':/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
    'checkDNI': /^\d{8}(?:[-\s]\d{4})?$/,
})
app.controller('AppCtrl', function($scope, $location, $window, tokenSystem, APP_SYS){
    console.log("App "+APP_SYS.app_name);
    console.log("Version v"+APP_SYS.version);
    
});