
function LogoutCtrl($scope, $location){


    jQuery.ajax({
        url: BASE_URL+"php/user/logout.php",
        success: function(data){
            Log("logout");
//            menuService.updateMenu();

            $scope.$apply(function(){
                $location.path('/user/login');
            });
        },
        error:function(){
            console.log("error logout");
        }
    });

}