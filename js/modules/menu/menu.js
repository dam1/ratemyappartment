
function MenuCtrl( $scope ){
    console.log("update menu funtion"  );
    var menu =[];
    function updateMenu(){
            menu.push({url:"#/user/logout", name:"Logout"});
            menu.push({url:"#/event/list", name:"Events"});
            menu.push({url:"#/event/create", name:"Create Event"});


        $scope.menu = menu ;
    }

    updateMenu();

    $scope.$on('menuBroadcast', function(){
        console.log("update menu broadcast");
        updateMenu();
    });

    $scope.doTheBack = function() {
        window.history.back();
        console.log("back");
    };
}