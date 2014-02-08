
function EditPatientCtrl($scope,$routeParams,  $location){

    jQuery("#date_admission").datepicker({changeMonth: true, changeYear: true, yearRange: '2000:2020'});
    jQuery("#date_discharge").datepicker({changeMonth: true, changeYear: true, yearRange: '2000:2020'});
    jQuery("#birth").datepicker({changeMonth: true, changeYear: true, yearRange: '1910:2020'});

    var patient;
    jQuery.ajax({
        url: BASE_URL+"php/patient/get.php",
        type: "post",
        data : {
            id : $routeParams.id
        }
        ,
        success: function(list){
            $scope.$apply(function(){
                    patient = JSON.parse(list.replace('[', '').replace(']', '')) ;
                    updateEditForm();
                }
            )
        },
        error:function(){
            console.log("eroor")
        }
    });

    function updateEditForm(){
        console.log("update list form");
//        $scope.$apply(function(){
        $scope.username = patient.username;
        $scope.mail = patient.mail;
        $scope.first_name = patient.first_name;
        $scope.last_name = patient.last_name;
        $scope.title = patient.title;
        $scope.mnr = patient.mnr;
        $scope.gender = patient.gender;
        $scope.street_address = patient.street_address;
        $scope.city = patient.city;
        $scope.sstate = patient.sstate;
        $scope.country = patient.country;
        $scope.zip_code = patient.zip_code;
        $scope.date_admission  = patient.date_admission;
        $scope.date_discharge = patient.date_discharge;
//        jQuery("#dateAdmission").datepicker({defaultDate:Date.parse("2012-05-21")});
//        jQuery("#dateDischarge").datepicker({defaultDate:patient.date_discharge});
        $scope.caregiver_info = patient.caregiver_info;
        $scope.doctor_info = patient.doctor_info;
        $scope.usingApp = (patient.is_using_application == 1) ;
        $scope.birth = patient.birth;

//        });


    }

    $scope.save = function(){
        console.log("save patient");
        jQuery.ajax({
            url: BASE_URL+"php/patient/update.php",
            type: "post",
            data: {
                ID_user:patient.ID_user,
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
                country:$scope.country,
                date_admission:jQuery("#date_admission").val(),
                date_discharge:jQuery("#date_discharge").val(),
                caregiver_info:$scope.caregiver_info,
                doctor_info:$scope.doctor_info,
                usingApp: $scope.usingApp,
                birth:jQuery("#birth").val(),
                status:patient.status
            }
            ,
            success: function(data){
                Log("loged");
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