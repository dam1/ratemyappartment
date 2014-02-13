/**
 * Created by damien on 2/8/2014.
 */
function MapCtrl( $scope, $http, $location, $window){

var latitude ;
var longitude ;
  var latMarkerOpen;
  var id = 0;
  loadCoordinate()

  loadAppartment();
  getRating();


  loadMaps();



//  loadFoursqure();



  $scope.onMarkerClicked = onMarkerClicked



  function loadFoursqure(){
    $http({method: 'GET', url: 'https://api.foursquare.com/v2/venues/explore?ll='+latitude+','+longitude+'&client_id=O4EAD5VMAPGSPF2SWE010LBJ4LZOE34FSBCBXXFUE2RY3A34&client_secret=NNGAGYSVLB4BUVTLZ0TJ0IB15BA0IWKMI4VZ23SMX0CDYZSB&v=20131016'}).
      success(function(data, status, headers, config) {

//      console.log(data.response.groups[0].items[0].venue.location.lat);

        console.log(data.response.groups[0].items[0]);
        for(var i = 0; i < data.response.groups[0].items.length; i++){
          var icon ;

          if(data.response.groups[0].items[i].venue.categories[0].name.toLowerCase().indexOf("bar")){
            icon = "images/marker/liquor.png";
          }
          else if(data.response.groups[0].items[i].venue.categories[0].name.toLowerCase().indexOf("restaurant")){
            icon = "images/marker/restaurant.png";
          }
          else if(data.response.groups[0].items[i].venue.categories[0].name.toLowerCase().indexOf("lougne")){
            icon = "images/marker/liquor.png";
          }
          else if(data.response.groups[0].items[i].venue.categories[0].name.toLowerCase().indexOf("pizza")){
            icon = "images/marker/restaurant.png";
          }
          else if(data.response.groups[0].items[i].venue.categories[0].name.toLowerCase().indexOf("bar")){

          }
          if(icon != null && icon.length > 3){
            $scope.map.markers.push({
              id: id,
              icon: icon,
              latitude: data.response.groups[0].items[i].venue.location.lat,
              longitude: data.response.groups[0].items[i].venue.location.lng,
              showWindow: false
            })
            id++;
          }

//          console.log(data.response.groups[0].items[i].venue)
        }
        // this callback will be called asynchronously
        // when the response is available
      }).
      error(function(data, status, headers, config) {
        // called asynchronously if an error occurs
        // or server rturns response with an error status.
      });
  }



  function centerMap(){
    loadFoursqure();

    $scope.map.center = {
      latitude: latitude,
      longitude: longitude
    };
  }

  function getRating(){
    var TestObject = Parse.Object.extend("Rating");
    var TestCollection = Parse.Collection.extend({
      model: TestObject
    });
    var collection = new TestCollection();
    collection.fetch({
      success: function(collection) {
        console.log('get rating');
        collection.each(function(object) {
//          console.log('det rating');
//          console.log(object.attributes);

          $scope.map.markers.push({
            id: id,
            icon: "images/marker/rating.png",
            latitude: object.attributes.addressLatitude,
            longitude: object.attributes.addresslongitude,
            comment: object.attributes.comment,
            rating : 'Rating : '+object.attributes.mark+'/5',
            tile: ' ',
            imageurl: '',
            showWindow: false
          })
          id++;
        });
      },
      error: function(collection, error) {
        // The collection could not be retrieved.
      }
    });
  }

  function loadAppartment(){



    var TestObject = Parse.Object.extend("Appartment");
    var TestCollection = Parse.Collection.extend({
      model: TestObject
    });
    var collection = new TestCollection();
    collection.fetch({
      success: function(collection) {
                  console.log('load appart');

        collection.each(function(object) {
          var imageUrl = (object.attributes.imageUrl != null && object.attributes.imageUrl.length > 3)? object.attributes.imageUrl: '';

//          console.log('load appart'+imageUrl);
//          console.log(object.attributes);

          var aa = {
            id: id,
            icon: "images/marker/homeicon.png",
            latitude: object.attributes.addressLatitude,
            longitude: object.attributes.addresslongitude,
            rating : object.attributes.price,
            comment: object.attributes.description,
            link: object.attributes.url,
            imageurl: imageUrl,
            tile: ' ',
            showWindow: false
          };
          id++;
          $scope.map.markers.push(aa);

//          $scope.appartment.markers.push({
//            icon: "images/marker/artgallery.png",
//            latitude: object.attributes.addressLatitude,
//            longitude: object.attributes.addresslongitude,
//            rating : object.attributes.price,
//            comment: object.attributes.description,
//            imageurl: object.attributes.imageUrl,
//            showWindow: false,
//          })

//          console.log($scope.appartment);

        });
      },
      error: function(collection, error) {
        // The collection could not be retrieved.
      }
    });
  }

  function loadCoordinate(){
    if($location.search()['search'] != null ){
      // center the map to the right location
      $http({method: 'GET', url: 'http://maps.google.com/maps/api/geocode/json?address='+$location.search()['search']+'&sensor=false'}).
        success(function(data, status, headers, config) {

          if(data.results[0].geometry != null){

            latitude = data.results[0].geometry.location.lat;
            longitude = data.results[0].geometry.location.lng;

            centerMap();
          }
        }).
        error(function(data, status, headers, config) {
          console.log("fail");
        });
    }
    else if($location.search()['lat'] != null){
      latitude = $location.search()['lat'];
      longitude = $location.search()['lng'];
      centerMap();
    }
  }

  function loadMaps(){
    // init maps
    google.maps.visualRefresh = true;

    versionUrl = window.location.host === "rawgithub.com" ? "http://rawgithub.com/nlaplante/angular-google-maps/master/package.json" : "/package.json";

    $http.get(versionUrl).success(function (data) {
      if (!data)
        console.error("no version object found!!");
      $scope.version = data.version;
    });

    onMarkerClicked = function (marker) {
//      if(latMarkerOpen != null ){
//        $scope.appartment.markers[marker.id].showWindow = false;
//        $scope.appartment.markers[marker.id-1].showWindow = false;
//        $scope.appartment.markers[marker.id+1].showWindow = false;
//        console.log('close last marker '+marker.id);
//      }
      marker.showWindow = true;
      $scope.appartment.markers.push(marker);
//latMarkerOpen = marker;
      console.log('markkkk');
      console.log(marker);

      //window.alert("Marker: lat: " + marker.latitude + ", lon: " + marker.longitude + " clicked!!")
    };

    genRandomMarkers = function (numberOfMarkers, scope) {
      var markers = [];
      for (var i = 0; i < numberOfMarkers; i++) {
        markers.push(createRandomMarker(i, scope.map.bounds))
      }
      scope.map.randomMarkers = markers;
    };

//  45° 32.412', -73° 36.321'


    angular.extend($scope, {
      map: {
        version: "uknown",
        heatLayerCallback: function (layer) {
          //set the heat layers backend data
          var mockHeatLayer = new MockHeatLayer(layer);
        },
        showTraffic: false,
        showBicycling: false,
        showWeather: false,
        showHeat: false,
        center: {
          latitude: 45.5077732,
          longitude: -73.5782062
        },
        options: {
          streetViewControl: false,
          panControl: true,
          maxZoom:20,
          minZoom:3
        },
        zoom: 14,
        dragging: false,
        bounds: {},
        markers: []
      },
      appartment:{
        markers: [],
        detail :[]
      }
    });

    _.each($scope.map.markers, function (marker) {
      marker.closeClick = function () {
        marker.showWindow = false;
        $scope.$apply();
      };
      marker.onClicked = function () {
        onMarkerClicked(marker);
      };
    });



  }

  $scope.detailAppartment = function(){
    console.log(this);
//    $scope.appartment.detail.push(this.j);
    $window.open(this.j.link);
  }


  $scope.showDetail = function(){

  }
}