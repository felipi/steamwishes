var swishes = angular.module('swishes',
         ['ngRoute', 'ngAnimate', 'ngTouch', 'ui.bootstrap', 'updateMeta', 'angular.filter']);

swishes.run(function ($rootScope, $location, $window, $route) {
    var original = $location.path;
    $location.path = function (path, reload) {
        if (reload === false) {
            var lastRoute = $route.current;
            var un = $rootScope.$on('$locationChangeSuccess', function () {
                $route.current = lastRoute;
                un();
            });
        }
        return original.apply($location, [path]);
    };

    $rootScope.$on('$routeChangeSuccess', function(){
        if($window.ga)
            $window.ga('send', 'pageview', {page: $location.url()});
    });
});

swishes.filter("sanitize", ['$sce', function($sce) {
  return function(htmlCode){
    return $sce.trustAsHtml(htmlCode);
  }
}]);

swishes.config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
]);

swishes.controller('homeController', function($scope, $rootScope) {
    $scope.title = "Steam Wishes";
});

swishes.controller('listController', function($scope, $routeParams, $rootScope, $http) {
    $scope.title = "Steam Wishes - Wishlist";
    $scope.listUser = $routeParams.userid;
    
    //var listurl = "http://steamcommunity.com/id/"+$scope.listUser+"/wishlist";
    //var listurl = "http://steamcommunity.com/profiles/76561198025323372/wishlist";
    var listurl = "/steam/"+$scope.listUser;
    $http.get(listurl)
    .then(function success(response){
        //console.log(response.data);
        $scope.title = response.data;
    },function error(response){
        console.log(response);
    }); 
    
});
swishes.controller('manageController', function($scope, $rootScope) {
    $scope.title = "Steam Wishes - Manage";
});

/*Exemplo de Controller*/
/*
swishes.controller('empresaController', function($scope, $rootScope, serviceConteudos) {
    if(ID_HOTSITE == 0) {
        $rootScope.pageTitle = "RS Transfer - A Empresa";
    }
    serviceConteudos.todosConteudos(function(result){
        var title = result.filter(function(obj){
            return obj.nome_arquivo == "empresa";
        })[0];
        $scope.heading = decodeEntities(title.titulo);
        var sects = result.filter(function(obj){
            return ( 
                obj.nome_arquivo == "missao" || 
                obj.nome_arquivo == "diferenciais" || 
                obj.nome_arquivo == "filosofia"); 
        });
        var mapped = sects.map(function(obj){
            var nobj = {};
            nobj.title = decodeEntities(obj.titulo);
            nobj.description = decodeEntities(obj.texto);
            return nobj;
        });
        $scope.sections = mapped;

        $(".showOnLoad").removeClass("showOnLoad");
    });
});
*/
//ROUTES
swishes.config(function($routeProvider, $locationProvider){
    $routeProvider
    .when("/", {
        templateUrl: "angular/pages/home.html",
        controller: "homeController"
    })
    .when("/list/:userid", {
        templateUrl: "angular/pages/list.html",
        controller: "listController"
    })
    .when("/manage", {
        templateUrl: "angular/pages/manage.html",
        controller: "manageController"
    })
    //.otherwise({ redirectTo: '/' });

    $locationProvider.html5Mode(true).hashPrefix("");
});

// DIRECTIVES
/*
swishes.directive("uzToolbar", function(){
    return {
        templateUrl: "angularapp/components/toolbar.html",
        link : function(scope, element, attrs){
            scope.menuItens = [
               {href: "#home", text: "Home"} 
            ];
            scope.menuOpened = false;
            scope.openMenu = function(){
                scope.menuOpened = true;
            }
            scope.closeMenu = function(){
                scope.menuOpened = false;
            }
        }
    }

});
*/
//SERVICES
/*exemplo service*/
/*
swishes.factory("serviceConteudos", function($http){

    function retornaConteudos(callback){ 
        $http.get(API_URL + "conteudos").then(function(response){
            callback(response.data.result[0].conteudos);
        });
    }

    return {
        todosConteudos: retornaConteudos
    }
});
*/
