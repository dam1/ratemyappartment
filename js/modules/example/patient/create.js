
function CreatePatientCtrl($scope, $location) {
    jQuery("#date_admission").datepicker({changeMonth: true, changeYear: true, yearRange: '2000:2020'});
    jQuery("#date_discharge").datepicker({changeMonth: true, changeYear: true, yearRange: '2000:2020'});
    jQuery("#birth").datepicker({changeMonth: true, changeYear: true, yearRange: '1910:2020'});


    $scope.createPatient = function(){
        jQuery.ajax({
            url: BASE_URL+"php/patient/put.php",
            type: "post",
            data: {
                username: $scope.username,
                mail : $scope.mail,
                password : $scope.password,
                first_name : $scope.first_name,
                last_name : $scope.last_name,
                title : $scope.title,
                mnr:$scope.mnr,
                gender:$scope.gender,
                street_address:$scope.street_address,
                city:$scope.city,
                sstate:$scope.sstate,
                zip_code:$scope.zip_code,
                date_admission:jQuery("#date_admission").val(),
                date_discharge:jQuery("#date_discharge").val(),
                caregiver_info:$scope.caregiver_info,
                doctor_info:$scope.doctor_info,
                usingApp: $scope.usingApp,
                birth:jQuery("#birth").val()
            }
            ,
            success: function(data){
                console.log('create ok');
                $scope.$apply(function(){
                    $location.path('/patient');
                })
            },
            error:function(){
                console.log("error login");
            }
        });
    }
}


