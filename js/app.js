'use strict';

var app = angular.module('myApp', ['ngRoute', 'google-maps']);

    app.config(['$routeProvider', function($routeProvider) {

        //event
        $routeProvider.when('/map', {templateUrl: 'js/modules/map/index/map.tpl.html', controller: MapCtrl});
        $routeProvider.when('/search/', {templateUrl: 'js/modules/map/search/search.tpl.html', controller: SearchCtrl});
        $routeProvider.when('/rating/', {templateUrl: 'js/modules/rating/rating.tpl.html', controller: RatingCtrl});
//        $routeProvider.when('/event/create', {templateUrl: 'js/modules/event/create/create.tpl.html', controller: EventCreateCtrl});


//        $routeProvider.when('/user', {templateUrl: 'partials/user/list-user.html', modules: ListUserCtrl});
//        $routeProvider.when('/user/create', {templateUrl: 'partials/user/createUser.html', modules: CreateUserCtrl});
//        $routeProvider.when('/user/list/:id', {templateUrl: 'partials/user/list.html', modules: CreateUserCtrl});

        //patient
//        $routeProvider.when('/patient', {templateUrl: 'partials/patient/list-patient.html', modules: ListPatientCtrl});
//        $routeProvider.when('/patient/create', {templateUrl: 'partials/patient/create-patient.html', modules: CreatePatientCtrl});
//        $routeProvider.when('/patient/:id', {templateUrl: 'partials/patient/patient.html', modules: PatientCtrl});
//        $routeProvider.when('/patient/list/:id', {templateUrl: 'partials/patient/list-patient.html', modules: EditPatientCtrl});

        // default route
        $routeProvider.otherwise({redirectTo: '/search/'});
    }]);


app.directive('googleplace', function() {
  return {
    require: 'ngModel',
    link: function(scope, element, attrs, model) {
      var options = {
        types: [],
        componentRestrictions: {}
      };
      scope.gPlace = new google.maps.places.Autocomplete(element[0], options);

      google.maps.event.addListener(scope.gPlace, 'place_changed', function() {
        scope.$apply(function() {
          model.$setViewValue(element.val());
        });
      });
    }
  };
});

app.run(function() {

  Parse.initialize("1dzgxghOZCWNhDwOZWPpIj3mU3bd6DhR64mP8pdL", "79bDHkZPyGATPCLEMJtPTskV09Knuc2zF1ljmMVX");
});

