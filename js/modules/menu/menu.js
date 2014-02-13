
function MenuCtrl( $scope ){
    console.log("update menu funtion"  );
    var menu =[];
    function updateMenu(){
            menu.push({url:"#/search/", name:"Index"});
            menu.push({url:"#/map/", name:"Map"});
            menu.push({url:"#/rating/", name:"Add rating"});


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