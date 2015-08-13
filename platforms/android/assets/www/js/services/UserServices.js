(function(){
    var funcUserInfo = function(DBA,$http,ApiEndpoint) {
        var self = this;

        console.log("In services for funcUserInfo"+ApiEndpoint);
        
        self.getUserCategories = function() {
            
            console.log(" ApiEndpoint is ;"+ApiEndpoint);
            return $http.get(ApiEndpoint + '/user/userRoles')
              .then(function(result){
                return DBA.processResultSethttp(result);
              },function(error) {
                    console.log("Error in Service(UserInfo); funcUserInfo; "+JSON.stringify(error));
            });
          }
        
        self.addUser = function(userDetails) {
            console.log(" ApiEndpoint is ;"+ApiEndpoint);
            console.log(" User in Service is ;"+userDetails);
            return $http.get(ApiEndpoint + '/user/register?'+userDetails)
              .then(function(result){
                //return DBA.processResultSethttp(result);
                console.log(" Result is ;"+JSON.stringify(result));
                var serverValues = angular.fromJson(result);
                return serverValues.data.result;
              },function(error) {
                    console.log("Error in Service(UserInfo); funcUserInfo; "+JSON.stringify(error));
            });
          }
        return self;
    };
    
    //UserInfo.$inject('DBA',$http,'ApiEndpoint');
    kitApp.factory('UserInfo',funcUserInfo);    
}());