'use strict';

var app = angular.module('myApp', ['ngRoute', 'kinvey']);

    app.config(['$routeProvider', function($routeProvider) {

        //event
        $routeProvider.when('/event/list', {templateUrl: 'js/modules/event/list/list.tpl.html', controller: EventListCtrl});
        $routeProvider.when('/event/create', {templateUrl: 'js/modules/event/create/create.tpl.html', controller: EventCreateCtrl});


//        $routeProvider.when('/user', {templateUrl: 'partials/user/list-user.html', modules: ListUserCtrl});
//        $routeProvider.when('/user/create', {templateUrl: 'partials/user/createUser.html', modules: CreateUserCtrl});
//        $routeProvider.when('/user/list/:id', {templateUrl: 'partials/user/list.html', modules: CreateUserCtrl});

        //patient
//        $routeProvider.when('/patient', {templateUrl: 'partials/patient/list-patient.html', modules: ListPatientCtrl});
//        $routeProvider.when('/patient/create', {templateUrl: 'partials/patient/create-patient.html', modules: CreatePatientCtrl});
//        $routeProvider.when('/patient/:id', {templateUrl: 'partials/patient/patient.html', modules: PatientCtrl});
//        $routeProvider.when('/patient/list/:id', {templateUrl: 'partials/patient/list-patient.html', modules: EditPatientCtrl});

        // default route
        $routeProvider.otherwise({redirectTo: '/event/list'});
    }]);


app.run(function($kinvey) {
    var promise = $kinvey.init({
        appKey    : 'kid_ee79aci3L5',
        appSecret : '83f6cb9358004b3fa19e25a400869a16'
    });

    promise.then(function(){
        $kinvey.User.login('will', 'audet', {
            success: function(e) {
                console.log("success login");
                console.log(e);

            },
            error: function(e) {

                console.log(e.description);
            }
        });
    });
});