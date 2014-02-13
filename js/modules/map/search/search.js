function SearchCtrl( $scope, $http, $location ){
  $scope.search = function(){

    $scope.gPlace;


//    $http({method: 'GET', url: 'https://api.foursquare.com/v2/venues/explore?ll=37.45383,-122.18219&client_id=O4EAD5VMAPGSPF2SWE010LBJ4LZOE34FSBCBXXFUE2RY3A34&client_secret=NNGAGYSVLB4BUVTLZ0TJ0IB15BA0IWKMI4VZ23SMX0CDYZSB&v=20131016'}).
//    console.log(data.response.groups[0].items[0].venue.location.lat);

console.log("search "+$scope.inputsearch );

//    $http({method: 'GET', url: 'https://www.padmapper.com/loadApartDescription.php?apartmentID=174022031&workLat=0&workLong=0&am=0'}).
//    $http({method: 'GET', url: 'https://api.roomorama.com/v0.9/rooms?destination=montreal'}).
//      success(function(data, status, headers, config) {
//
//        console.log(data);
//
//        // this callback will be called asynchronously
//        // when the response is available
//      }).
//      error(function(data, status, headers, config) {
//        // called asynchronously if an error occurs
//        // or server rturns response with an error status.
//      });

          window.location = '#/map?search='+$scope.inputsearch;

  }

$scope.namesAutocomplete = ["Montana", "Monte Argentario, Tuscany", "Monte Colombo, Emilia-Romagna",
"Mont Tremblant"]

}
