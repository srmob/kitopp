(function(){
   var funcUserReg = function($scope,$state, $stateParams,commonAppService,UserInfo,$ionicLoading){
        var ab = this;
        $scope.user={};
        console.log("In UserReg controller ");
        $scope.userId = commonAppService.getloggedInUserId();
        $scope.userType = commonAppService.getloggedInUserType();
        $scope.imeiID = commonAppService.getDeviceId();
       $scope.userPhoneNum = commonAppService.getloggedInUserPhoneNum();
        
       $scope.getUserCategory = function(){
           //$scope.userCategory = ["buyer","seller","both"];
           console.log("In UserReg 1controller ");
           UserInfo.getUserCategories().then(function(roles){
              $scope.userCategory = roles;
              console.log("Controller(UserRegCtrl); Func(getUserCategories) ; Catg Array Length:"+$scope.userCategory.length);
            });
           
       }
        $scope.getUserCategory();
       
        $scope.clearUserRegForm = function(){
            $scope.user = "";
        }
       
        // Populate the drop down list for category and related subcategories
        $scope.registerUser = function(user) {
            
            console.log("Register User =  "+JSON.stringify(user));
            console.log("Register User =  "+JSON.stringify(user.phone));
            console.log("Users Phone Number =  "+$scope.userPhoneNum);
            
            
            ionic.Platform.ready(function(){
                   console.log("Device Ready in ionic platform ");
                    // will execute when device is ready, or immediately if the device is already ready.
                    imeiId1 = ionic.Platform.device().uuid;
                    commonAppService.setDeviceId(imeiId1);
                    $scope.imeiID = imeiId1;
                    console.log("In Phone Number screen");
                    var telephoneNumber = cordova.require("cordova/plugin/telephonenumber");
                    telephoneNumber.get(function(result) {
                         console.log("result = " + result);
                         console.log("simSerialNumber = " + result.simSerialNumber); // number sim 
                         console.log("line1Number = " + result.line1Number); // telephone number (if insert sim)
                         console.log("full = " + JSON.stringify(result)); // telephone number (if insert sim)
                         alert(result.line1Number);
                         commonAppService.setloggedInUserPhoneNum(result.line1Number);
                    }, function() {
                        console.log("error");
                        alert(error);
                    });

                });
            console.log("Users Device ID =  "+$scope.imeiID);
            /*if ($scope.imeiID == null|| $scope.imeiID == 'undefined') {
                ionic.Platform.ready(function(){
                   console.log("Device Ready in ionic platform ");
                    // will execute when device is ready, or immediately if the device is already ready.
                    imeiId1 = ionic.Platform.device().uuid;
                    commonAppService.setDeviceId(imeiId1);
                    $scope.imeiID = imeiId1;
                    console.log("In Phone Number screen");
                    var telephoneNumber = cordova.require("cordova/plugin/telephonenumber");
                    telephoneNumber.get(function(result) {
                         console.log("result = " + result);
                         console.log("simSerialNumber = " + result.simSerialNumber); // number sim 
                         console.log("line1Number = " + result.line1Number); // telephone number (if insert sim)
                         console.log("full = " + JSON.stringify(result)); // telephone number (if insert sim)
                         alert(result.line1Number);
                         commonAppService.setloggedInUserPhoneNum(result.line1Number);
                    }, function() {
                        console.log("error");
                        alert(error);
                    });

                });
            }*/
            
            saveToDB ="registerForm[user_type_id]="+user.category+"&registerForm[first_name]="+user.firstName+"&registerForm[last_name]="+user.lastName+"&registerForm[phone_num]="+user.phone+"&registerForm[email_id]="+user.email+"&registerForm[alternate_phone_num]="+$scope.userPhoneNum+"&registerForm[imie_id]="+$scope.imeiID;
            
            if(user.category == 3){
                saveToDB +="registerForm[tin_num]="+user.tinNumber+"&registerForm[gender]="+user.gender+"&registerForm[st_num]="+user.stNumber+"&registerForm[date_of_birth]="+user.dob;
            }
            console.log("DB "+saveToDB);
            UserInfo.addUser(saveToDB).then(function(details){
                  console.log("User Saved to DB:"+JSON.stringify(details));
                });
            
            
        };
        
    };
    //UserRegCtrl.$inject($scope,$state, $stateParams,'commonAppService','UserInfo');
    kitApp.controller('UserRegCtrl',funcUserReg);
}());