(function(){
    var funcLoginInfo = function($cordovaSQLite,DBA,$http,$q, ApiEndpoint) {
        var self = this;
        console.log("In services for login Info  ");
        
        self.verifyLoggedInUser = function(imeiId,pinNum) {
            var parameters= [imeiId,pinNum];
            console.log(" Entry in Login Services ;"+imeiId+"-"+pinNum);
            //console.log(" ApiEndpoint is ;"+ApiEndpoint);
            return DBA.query(" select uid from login_validations where imie_id=(?) and pin_num=(?)" , parameters)
            //return $http.get(ApiEndpoint + '/kitki/user/fetchSellerListForLoggedInUser/buyerId/'+buyerId)
              //.then(function(abc){
             .then(function(result){
                return DBA.processResultSet(result);// for local db
              },function(error) {
                    console.log("Error in DBA-> Service(LoginInfo); function(getLoggedInUserInfo); "+JSON.stringify(error));
                });
          }
                
        self.getLoggedInUserInfo = function(uid) {
            var parameters= [uid];
            console.log(" Service(LoadAppInfo); function(getBuyerDetails);-"+uid);
            return DBA.query(" select uid,first_name,last_name,gender,email_id,user_type,st_num,cst_num,pan_num,tin_num,phone_num,shipping_address,shop_name,regd_status from user_details where uid=(?)" , parameters)
              .then(function(result){
                console.log(" Service(LoginInfo); function(getLoggedInUserInfo); "+ result.rows.length);
                return DBA.processResultSet(result);
              },function(error) {
                    console.log("Error in DBA-> Service(LoginInfo); function(getLoggedInUserInfo); "+error.message);
                });
          }
        return self;
    };
    
    
    kitApp.factory('LoginInfo',funcLoginInfo);    
}());