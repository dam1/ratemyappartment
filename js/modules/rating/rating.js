/**
 * Created by damien on 2/8/2014.
 */

  function RatingCtrl($scope, $http, $location){

  $scope.rate = function(){

    console.log($scope.comment);
    console.log($scope.location);
    console.log($scope.landlord);
    console.log($scope.building);
    console.log($scope.price);
    console.log($scope.recommand);
    console.log($scope.address);

      $http({method: 'GET', url: 'http://maps.google.com/maps/api/geocode/json?address='+$scope.address+'&sensor=false'}).
    success(function(data, status, headers, config) {

          if(data.results[0].geometry != null){
            var TestObject = Parse.Object.extend("Rating");
            var testObject = new TestObject();
            testObject.save(
              {comment: $scope.comment,
                mark : $scope.rating,
                landlord : $scope.landlord,
                building : $scope.building,
                recommand : $scope.recommand,
                price : $scope.price,
                addressLatitude : data.results[0].geometry.location.lat,
                addresslongitude : data.results[0].geometry.location.lng
              }).then(function(object) {
                console.log("saved");
                $location.path('/map?lat='+data.results[0].geometry.location.lat+'&lng='+data.results[0].geometry.location.lng);

                alert("send !");

              });
            console.log(data.results[0].geometry.location.lat);
          }
    }).
    error(function(data, status, headers, config) {
          console.log("fail");


    });
  }
}
