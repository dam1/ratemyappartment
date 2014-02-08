
function ListPatientCtrl($scope, $location){
    var patients;
    var newPatient = [];
    var patientManaged = [];
    var patientDeEnrolled = [];


    //$( "#tabs" ).tabs();


    //get list of patient
    jQuery.ajax({
        url: BASE_URL+"php/patient/getList.php",
        type: "get"
        ,
        success: function(list){
            $scope.$apply(function(){
                    patients = JSON.parse(list) ;


                    for(var i = 0; i< patients.length; i++){
                        if(patients[i].status !=  "active"){
                            patientDeEnrolled.push(patients[i]);
                        }
                        else{
                            if(IsProfileComplete(patients[i])){
                                if(IsBetween30Days(patients[i])){
                                    patientManaged.push(patients[i]);
                                }
                                else{
                                    patientDeEnrolled.push(patients[i]);
                                }
                            }
                            else{
                                newPatient.push(patients[i])
                            }
                        }

                    }
                    $scope.patients = newPatient;
                    $scope.patients2 =patientManaged;
                    $scope.patients3 =patientDeEnrolled;
                }
            )
        },
        error:function(){
            console.log("eroor")
        }
    });



    //clic create patient
    $scope.createPatient = function(){
        $location.path('/patient/create');
    }

    //clic patient detail
    $scope.details = function(patient){
        $location.path('/patient/'+patient.ID_user);

    }

    function IsProfileComplete(patient){
        var isProfileComplete = false;
        if(
            patient.username != null
                && patient.mail != null
                && patient.first_name != null
                && patient.last_name!= null
                && patient.title!= null
                && patient.mnr!= null
                && patient.gender!= null
                && patient.street_address!= null
                && patient.city!= null
                && patient.sstate!= null
                && patient.zip_code!= null
                && patient.date_admission!= null
                && patient.date_discharge!= null
                && patient.birth!= null
                && patient.status!= null
                && patient.username.length > 2
                && patient.mail .length > 5
                && patient.first_name .length > 3
                && patient.last_name.length > 3
                && patient.title.length > 2
                && patient.mnr.length > 3
                && patient.gender.length > 3
                && patient.street_address.length > 3
                && patient.city.length > 3
                && patient.sstate.length > 3
                && patient.zip_code.length > 3
                && patient.date_admission.length > 6
                && patient.date_discharge.length > 6
                && patient.birth.length > 6
                && patient.status.length > 3
            ){
            isProfileComplete = true;
            console.log(isProfileComplete);
        }

        return isProfileComplete;
    }

    function IsBetween30Days(patient){

        var days = daysBetween( new Date(), parseDate(patient.date_discharge));
        console.log('aaaaa_'+days);
        if(days < 31  && days > 0){
            return true;
        }
        else{
            return false;
        }
    }
}


