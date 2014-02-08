'use strict';





function LoginCtrl($rootScope, $scope,  $location ) {

    $rootScope.back = function(){
        console.log("back");
    }

    $scope.submit = function(){

        jQuery.ajax({
            url: BASE_URL+"php/user/login.php",
            type: "post",
            data: {
                username: $("#username").val(),
                password : $("#password").val()
            }
            ,
            success: function(data){

                $scope.$apply(function(){
                    $location.path('/patient');
                });
            },
            error:function(){
                console.log("error login");
            }
        });
    }
}