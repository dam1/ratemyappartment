/**
 * Created by damien on 1/22/2014.
 */
function EventListCtrl($scope, $location, $kinvey){

    // get the list of the events
    var query = new $kinvey.Query();
    var promise = $kinvey.DataStore.find('events', query, {
        success: function(response) {
            $scope.events = response;
        },
        error: function(error) {
            console.log(error.description);
        }
    });


    $scope.getEventList = function(index) {

        var eventId = $scope.events[index]._id;

        var query = new $kinvey.Query();
        query.equalTo('event_id', eventId);
        var promise = $kinvey.DataStore.find('attendees', query, {
            success: function(response) {
                $scope.list = response;
            },
            error: function(error) {
                console.log(error.description);
            }
        });
    };

};