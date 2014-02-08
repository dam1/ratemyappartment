function ListUserCtrl($scope, $location){


//get list tof users
    var listUser = [];
    jQuery.ajax({
        url: BASE_URL+"php/user/getList.php",
        type: "get"
        ,
        success: function(list){
            if(list.length != 0){
                $scope.$apply(function(){
                        $scope.users = JSON.parse(list) ;
                    }
                )
            }
        },
        error:function(){
            console.log("error")
        }
    });

    // button create user
    $scope.createUser = function(){
        console.log("create user");
        $location.path('/user/create');

    }

    //list user
    $scope.edit = function(){
        $scope.$apply(function(){
            $location.path('/user/list/');
        });
    }

}