(function(){
   var funcUserLogin = function($scope,$state, $stateParams,$timeout,LoginInfo,$ionicPopup,commonAppService){
        
        
        //$scope.imeiId = "123456789";
        //$scope.imeiId = "83265647bff10fb5";
       /* $scope.imeiId1 = ionic.Platform.device().uuid();*/
       var imeiId1 = "";
       ionic.Platform.ready(function(){
           console.log("Device Ready in ionic platform ");
            // will execute when device is ready, or immediately if the device is already ready.
            imeiId1 = ionic.Platform.device().uuid;
            commonAppService.setDeviceId(imeiId1);
            console.log("In Login controller  id2 from ionic platform "+imeiId1);
        });
        
        
        $scope.phoneNum = 8121314151;
        $scope.passcode = "";
       console.log("In Login controller hard code"+$scope.imeiId);
       //console.log("In Login controller  id1 from ionic platform "+$scope.imeiId1);
        var retryCount = 0 ;
       $scope.loginUser = function() {
            console.log("User Login starts");
            $state.go('login');
            
        }
        $scope.doLogin = function() {
            console.log("User dologin");
            $state.go('dologin');
            
        }
        $scope.loginUser1 = function() {
            console.log("User Login 1 starts");
            $state.go('login1');
            
        }
        /*$scope.loginOk = function() {
            console.log("password : " +$scope.passcode);
             if($scope.passcode.length == 4){
                $state.go('app.buyer');
             }

        }*/
        $scope.add = function(value){
            var uid = 0 ;
           if($scope.passcode.length < 4) {
            $scope.passcode = $scope.passcode + value;
            if($scope.passcode.length == 4) {
                $timeout(function() {
                    console.log("The four digit code was entered+imei-pass"+$scope.imeiId+"-"+$scope.passcode);
                    LoginInfo.verifyLoggedInUser(imeiId1,$scope.passcode).then(function(loginDetails){
                    console.log("verifyLogInUser length"+loginDetails.length);
                      //Valid User
                    if (loginDetails.length != 0 && loginDetails.length == 1 ) {
                        uid = loginDetails[0].uid;
                        loggedInUserId = uid;
                        console.log("UID/logged in UID:"+loggedInUserId+"-"+uid);
                        if (uid != 0 ){
                            console.log("Within IF-"+uid);
                            LoginInfo.getLoggedInUserInfo(uid).then(function(user){
                                $scope.userDetails = user;
                                loggedInUserType = user[0].user_type;
                                commonAppService.setloggedInUserId(uid);
                                commonAppService.setloggedInUserType(loggedInUserType);
                                if (loggedInUserType == 'Buyer') {
                                    console.log("loggedInUserType-UID:"+loggedInUserType+"-"+loggedInUserId);
                                }if (loggedInUserType == 'Seller') {
                                    console.log("loggedInUserType-UID:"+loggedInUserType+"-"+loggedInUserId);
                                }else {
                                    console.log("loggedInUserType-UID:"+loggedInUserType+"-"+loggedInUserId);
                                }
                                $state.go('app.buyer');
                            });
                        }
                    } else { 
                          //Invalid user
                        retryCount++;
                        console.log("Retry Count is:"+retryCount);
                        if (retryCount < 5 ) {
                            $scope.wrongPin();
                            $scope.passcode="";
                        }else {
                            $state.go('welcome');
                        }
                    }
                      
                      
                    });
                    
                }, 500);
            }
        }
       }
        
        $scope.delete = function(){
            if($scope.passcode.length > 0) {
                $scope.passcode = $scope.passcode.substring(0, $scope.passcode.length - 1);
            }
        }
        
        $scope.wrongPin = function() {
               var alertPopup = $ionicPopup.alert({
                 title: 'Invalid Pin',
                 template: 'Invalid Pin - '+retryCount+'/5'
               });
               alertPopup.then(function(res) {
                 console.log('Alert triggerred ');
                 $state.go('login1');
               });
             };
    
            
    };
        
    kitApp.controller('loginCtrl',funcUserLogin ) ;
}());