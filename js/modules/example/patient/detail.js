
function PatientCtrl($scope, $rootScope, $routeParams, $location){
    //get detail of patient
    // patient info

    //clic list button
    $scope.edit = function(){
        $location.path('/patient/list/'+$scope.patient.ID_user);
    }

    var idpatient;
    jQuery.ajax({
        url: BASE_URL+"php/patient/get.php",
        type: "post",
        data : {
            id : $routeParams.id
        },
        success: function(list){
            $scope.$apply(function(){
                    $scope.patient = JSON.parse(list.replace("[", "").replace("]", "")) ;
                    updateArrow();
                }
            )
        },
        error:function(){
            console.log("eroor")
        }
    });

    //get  patient events
    jQuery.ajax({
        url: BASE_URL+"php/patient/getPatientEvent.php",
        type: "post",
        data : {
            id : $routeParams.id
        }
        ,
        success: function(list){
            $scope.$apply(function(){
                $scope.events = JSON.parse(list) ;
            });
//            var last_updated = list[0].date.date;
//            for(var i = 1 ; list.length;i++){
//                if(last_updated )
//            }
        },
        error:function(){
            console.log("eroor")
        }
    });

    console.log("__u_"+$rootScope.paneSelected);

    function updateArrow(){
        //progress
        // if date dicharge not null
        if($scope.patient.date_discharge != null){
            jQuery("#progress-tracker").show();

            var today = new Date();
            var dateDischarge = new Date($scope.patient.date_discharge);
            var nbDays = daysBetween(dateDischarge, today);
            if(nbDays < 30 && nbDays > 0){
                $scope.numberOfDays = nbDays;
            }
            else{
                $scope.numberOfDays = 30;
            }

            jQuery("#arrow").progressbar({value:$scope.numberOfDays, max:30});
        }


    }

}