(function(){
    var funcLoadAppInfo = function($cordovaSQLite, DBA,$http,$q, ApiEndpoint) {
        var self = this;
        console.log("In services for loadApp  ");
        
        self.getSellersForBuyer = function() {
            var parameters= [201,"Seller"];
            var q = $q.defer(); 
            console.log(" ApiEndpoint is ;"+ApiEndpoint);
            return DBA.query(" select distinct tc.uid_seller,ud.uid,tc.buyer_uid,ud.first_name,last_name,user_type,regd_status from user_details ud , trans_connect tc where tc.buyer_uid=(?) and tc.uid_seller = ud.uid and ud.user_type=(?)" , parameters)
            //return $http.get(ApiEndpoint + '/kitki/user/fetchSellerListForLoggedInUser/buyerId/'+buyerId)
              //.then(function(abc){
             .then(function(result){
                return DBA.processResultSet(result);// for local db
              },function(error) {
                    console.log("Error in DBA-> Service(LoadAppInfo); function(funcLoadAppInfo); "+JSON.stringify(error));
                });
          }
                
        self.getBuyerDetails = function(buyerId) {
            var parameters= [buyerId,'Buyer'];
            console.log(" Service(LoadAppInfo); function(getBuyerDetails);-"+buyerId);
            return DBA.query(" select uid,first_name,last_name,gender,email_id,user_type,st_num,cst_num,pan_num,tin_num,phone_num,shipping_address,shop_name from user_details where uid=(?) and user_type=(?)" , parameters)
              .then(function(result){
                console.log(" Service(LoadAppInfo); function(getBuyerDetails); "+ result.rows.length);
                return DBA.processResults(result);
              },function(error) {
                    console.log("Error in DBA-> Service(LoadAppInfo); function(getBuyerDetails); "+error.message);
                });
          }
        return self;
    };
    
    
    kitApp.factory('LoadAppInfo',funcLoadAppInfo);    
}());