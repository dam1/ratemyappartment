function CreateUserCtrl($scope, $location) {
    //get list of roles
    jQuery.ajax({
        url: BASE_URL+"php/role/get.php",
        type: "get"
        ,
        success: function(list){
            $scope.$apply(function(){
                    $scope.roles = JSON.parse(list) ;
                }
            )
        },
        error:function(){
            console.log("eroor")
        }
    });


    //on submit
    $scope.submit = function(){

        jQuery.ajax({
            url: BASE_URL+"php/user/put.php",
            type: "post",
            data: {
                username: $scope.username,
                password : $scope.password,
                first_name : $scope.first_name,
                last_name : $scope.last_name,
                mail : $scope.mail,
                role : $scope.role
            }
            ,
            success: function(data){
                Log("loged");
                $scope.$apply(function(){
                    $location.path('/user');
                })
            },
            error:function(){
                console.log("error login");
            }
        });
    }
}