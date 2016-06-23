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

swishes.controller('mainController', function($scope, $rootScope) {
    $scope.title = "Steam Wishes";
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
        controller: "mainController"
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
