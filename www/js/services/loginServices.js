(function(){
    function urlBase64Decode(str) {
            var output = str.replace('-', '+').replace('_', '/');
            switch (output.length % 4) {
                case 0:
                    break;
                case 2:
                    output += '==';
                    break;
                case 3:
                    output += '=';
                    break;
                default:
                    throw 'Illegal base64url string!';
            }
            return window.atob(output);
        }
    
    var funcLoginInfo = function($cordovaSQLite,DBA,$http,$q, ApiEndpoint,commonAppService,base64 ) {
        var self = this;
        console.log("In services for login Info  ");
        
        self.verifyLoggedInUser = function(imeiId,pinNum) {
            var parameters= [imeiId,pinNum];
            console.log(" Entry in Login Services ;"+imeiId+"-"+pinNum);
            console.log(" ApiEndpoint is ;"+ApiEndpoint);
            //return DBA.query(" select uid from login_validations where imie_id=(?) and pin_num=(?)" , parameters)
            //http://192.168.1.4:8083/kitki/user/userLogin/imei/83265647bff10fb5/pin/1234
            if ( commonAppService.getToken("JWT") != null ){
                commonAppService.setToken("JWT","");
                console.log("old token exists, set to null ->"+commonAppService.getToken("JWT"));
            }
            return $http.get(ApiEndpoint + '/user/userLogin/deviceId/'+imeiId+"/pin/"+pinNum,{skipAuthorization: true})
            
              //.then(function(abc){
             .then(function(result){
                var serverValues = angular.fromJson(result.data);
                console.log(" http login result count ;"+JSON.stringify(result));
                console.log(" serverValues.result ;"+JSON.stringify(serverValues.result));
               /* var serverValues1 = angular.fromJson(result.data);
                
                console.log(" http login result count ;"+JSON.stringify(result));
                console.log(" Server values ;"+JSON.stringify(serverValues));
                console.log(" http login result Server values ;"+JSON.stringify(serverValues));
                console.log(" http login result json ;"+JSON.stringify(serverValues.result));
                console.log(" http login result -> ;"+serverValues.result);*/
                
                if (serverValues.result) {
                    //commonAppService.setloggedInUserId(serverValues.uid);
                    //commonAppService.setloggedInUserType(serverValues.role);
                
                    console.log(" Token exists? " +commonAppService.getToken("JWT",serverValues.jwt));
                    commonAppService.setToken("JWT",serverValues.jwt);
                    
                    var jwtTokenUserData = commonAppService.getToken("JWT");
                    if (typeof jwtTokenUserData !== 'undefined') {
                        var encoded = jwtTokenUserData.split('.')[1];
                        console.log(" split data is " +encoded);
                        data = JSON.parse(urlBase64Decode(encoded));
                        //console.log("data is " +angular.toJson(data));
                        console.log("data stringify " +JSON.stringify(data));
                        commonAppService.setloggedInUserId(data.data.uid);
                        commonAppService.setloggedInUserType(data.data.role);
                    }
                    console.log(" http login set services ; userid-> ;"+commonAppService.getloggedInUserId()+"- USer Type== "+commonAppService.getloggedInUserType()+" JWT Token is "+commonAppService.getToken("JWT"));
                }
                return serverValues.result;
                //return DBA.processResultSethttp(result);// for local db
              },function(error) {
                    console.log("Error in DBA-> Service(LoginInfo); function(getLoggedInUserInfo); "+JSON.stringify(error));
                });
          }
                
        self.getLoggedInUserInfo = function(uid) {
            var parameters= [uid];
            c
            return DBA.query(" select uid,first_name,last_name,gender,email_id,user_type,st_num,cst_num,pan_num,tin_num,phone_num,shipping_address,shop_name,regd_status from user_details where uid=(?)" , parameters)
              .then(function(result){
                console.log(" Service(LoginInfo); function(getLoggedInUserInfo); "+ result.rows.length);
                return DBA.processResultSet(result);
              },function(error) {
                    console.log("Error in DBA-> Service(LoginInfo); function(getLoggedInUserInfo); "+error.message);
                });
          }
        self.userLogout = function(){
            console.log("log out called in services");
            return $http.get(ApiEndpoint + '/user/logout').then(function(result){
                console.log(" Service(LoginInfo); function(logout); "+ JSON.stringify(result));
            });
        }
        return self;
    };
    
    
    kitApp.factory('LoginInfo',funcLoginInfo);    
}());