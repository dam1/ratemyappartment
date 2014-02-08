/**
 * Created by damien on 1/22/2014.
 */
function EventCreateCtrl($scope, $location, $kinvey){


        var query = new $kinvey.Query();
        var promise = $kinvey.DataStore.find('bars', query, {
            success: function(response) {
                $scope.bars = response;
                console.log($scope.bars);
            },
            error: function(error) {
                console.log(error.description);
            }
        });


    $scope.createEvent = function() {
        $scope.bar_id = '518b0a4479bae252080007bd';
        console.log($scope.bar_id);
        console.log($scope.barData.date);
        console.log($scope.barData.time);
        console.log($scope.barData.sponsor);

        var promise = $kinvey.DataStore.save('events', {
            bar_id: $scope.bar_id,
            date: $scope.barData.date,
            sponsor1: $scope.barData.sponsor,
            time: $scope.barData.time
        }, {
            success: function(response) {
                console.log("new bar saved");
            },
            error: function(error) {
                console.log(error);
            }
        });
    };



};