(function(){
    var funcLoadAppInfo = function($cordovaSQLite,DBA,$http,ApiEndpoint) {
        var self = this;
        console.log("In services for loadApp  ");
        console.log("In services for loadApp 1"+ApiEndpoint);
        
        self.getSellersForBuyer = function(buyerId) {
            //var parameters= [201,"Seller"];
            var parameters= [buyerId];
            console.log(" ApiEndpoint is ;"+ApiEndpoint);
            //return DBA.query(" select distinct tc.uid_seller,ud.uid,tc.buyer_uid,ud.first_name,last_name,user_type,regd_status from user_details ud , trans_connect tc where tc.buyer_uid=(?) and tc.uid_seller = ud.uid and ud.user_type=(?)" , parameters)
            //return $http.get(ApiEndpoint + '/kitki/user/fetchSellerListForLoggedInUser/buyerId/'+buyerId)
            return $http.get(ApiEndpoint + '/user/fetchSellerListForLoggedInUser/buyerId/'+buyerId)
              .then(function(abc){
                return DBA.processResultSethttp(abc);
              },function(error) {
                    console.log("Error in Service(LoadAppInfo); function(funcLoadAppInfo); "+JSON.stringify(error));
            });
          }
                
        /*self.getBuyerDetails = function(buyerId) {
            var parameters= [buyerId,'Buyer'];
            console.log(" Service(LoadAppInfo); function(getBuyerDetails);-"+buyerId);
            return DBA.query(" select uid,first_name,last_name,gender,email_id,user_type,st_num,cst_num,pan_num,tin_num,phone_num,shipping_address,shop_name from user_details where uid=(?) and user_type=(?)" , parameters)
              .then(function(result){
                console.log(" Service(LoadAppInfo); function(getBuyerDetails); "+ result.rows.length);
                return DBA.processResults(result);
              },function(error) {
                    console.log("Error in DBA-> Service(LoadAppInfo); function(getBuyerDetails); "+error.message);
                });
          }*/
        return self;
    };
    
    
    kitApp.factory('LoadAppInfo',funcLoadAppInfo);
    
    var funcConnectivityMonitor = function($rootScope, $cordovaNetwork,$http,ApiEndpoint){

        return {
            isOnline: function(){
                if(ionic.Platform.isWebView()){
                    return $cordovaNetwork.isOnline();    
                } else {
                    return navigator.onLine;
                }
            },
            ifOffline: function(){
                if(ionic.Platform.isWebView()){
                    return !$cordovaNetwork.isOnline();    
                } else {
                    return !navigator.onLine;
                }
            },
            startWatching: function(){
                if(ionic.Platform.isWebView()){

                    $rootScope.$on('$cordovaNetwork:online', function(event, networkState){
                        console.log("went online");
                    });

                    $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
                        console.log("went offline");
                    });

                }
                else {
                    window.addEventListener("online", function(e) {
                        console.log("went online");
                    }, false);    

                    window.addEventListener("offline", function(e) {
                        console.log("went offline");
                    }, false);  
                }       
            },
            isMainServerReachable: function(){
                return $http.get(ApiEndpoint);
            }
        }
    };
    kitApp.factory('ConnectivityMonitor', funcConnectivityMonitor);
}());