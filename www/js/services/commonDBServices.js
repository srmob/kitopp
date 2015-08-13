(function(){
    
    var dbAccessFunc = function($cordovaSQLite, $q, $ionicPlatform,$filter) {
          var self = this;

          // Handle query's and potential errors
          self.query = function (query, parameters) {
            parameters = parameters || [];
            //console.log(" Parameters passed for Query - "+query+" - is/are -> "+parameters);
            var q = $q.defer();

            $ionicPlatform.ready(function () {
                console.warn(parameters);
                console.warn(query);
                console.warn(db);
              $cordovaSQLite.execute(db, query, parameters)
                .then(function (result) {
                  //console.log("In Query Result is "+result);
                  q.resolve(result);
                }, function (error) {
                  console.warn('I found an error for query');
                  console.warn(error);
                  q.reject(error);
                });
            });
            return q.promise;
          }
          
          self.insertList = function (query, parameters) {
            //parameters = parameters || [];
            //console.log(" Parameters passed for Query in Insert List - "+query+" - is/are -> "+[parameters]);
            var q = $q.defer();
            //var coll = parameters.slice(0); // clone collection
            //console.log(" Collection value in insert List - "+coll+" - For query -> "+query);
            $ionicPlatform.ready(function () {
                console.warn(parameters);
              $cordovaSQLite.insertCollection (db, query, [parameters])
                .then(function (result) {
                  console.log(' insertList inserted?'+result);
                  q.resolve(result);
                }, function (error) {
                  console.warn('I found an error in insertList');
                  console.warn(error);
                  q.reject(error);
                });
            });
            return q.promise;
          }
          
          // Proces a result set
          self.processResultSet = function(result) {
            var output = [];
            console.log(" Service(DBA); function(processResultSet); result length  "+result.rows.length);
            for (var i = 0; i < result.rows.length; i++) {
                output.push(result.rows.item(i));
            }
            return output;
          }
          self.processResultSethttp = function(result) {
            var output = [];
              var serverValues = angular.fromJson(result);
              //Object.keys(serverValues.data).length
            console.log(" Service(DBA); function(processResultSethttp); result length  "+Object.keys(serverValues.data).length);
              console.log(" Service(DBA); function(processResultSethttp); result  "+JSON.stringify(serverValues.data));
              for (var i = 0; i < Object.keys(serverValues.data).length; i++) {
                //output.push(result.rows.item(i));
                output.push(serverValues.data[i]);
            }
             console.log(" Service(DBA); function(processResultSethttp); output= "+JSON.stringify(output));
            return output;
          }
          self.processOrderDetailsResultSethttp = function(result) {
            var output = [];
             
              var serverValues = angular.fromJson(result);
              //Object.keys(serverValues.data).length
                /*console.log(" length-data "+Object.keys(serverValues.data).length);
                console.log(" length-data.items  "+Object.keys(serverValues.data.items).length);
                console.log(" length-buyer.items  "+Object.keys(serverValues.data.buyer).length);
              
                console.log(" data result-  "+JSON.stringify(serverValues.data));
                console.log(" data.items result-  "+JSON.stringify(serverValues.data.items));
                console.log(" data.buyer result-  "+JSON.stringify(serverValues.data.buyer));*/
              
                //output.push(serverValues.data.buyer);
                output.push(Object(serverValues.data));
              
                /*for (var i = 0; i < Object.keys(serverValues.data.items).length; i++) {
                //output.push(result.rows.item(i));
                    output.push("items:"+serverValues.data.items[i]);
                  //console.log("Date of i ="+i+"-"+Object.keys(serverValues.data[i]));
                  console.log("Data.items of i ="+i+"-"+JSON.stringify(serverValues.data.items[i]));
                }*/
                //output.concat(serverValues.data.buyer);
                /*for (var i = 0; i < Object.keys(serverValues.data.buyer).length; i++) {
                //output.push(result.rows.item(i));
                   output.push(serverValues.data.buyer);
                  //console.log("Date of i ="+i+"-"+Object.keys(serverValues.data[i]));
                  console.log("Data.buyer of i ="+i+"-"+JSON.stringify(serverValues.data.buyer[i]));
                }*/
               /* var buyer = Object.keys(serverValues.data).shift;
               console.log(" buyer output= "+JSON.stringify(buyer));*/
              /*console.log(" Service(DBA); function(processOrderDetailsResultSethttp); result  "+JSON.stringify(serverValues.data.items));
            for (var i = 0; i < Object.keys(serverValues.data.items).length; i++) {
                //output.push(result.rows.item(i));
                output.push(serverValues.data[i]);
            }*/
             console.log(" Process Order DBA result output= "+JSON.stringify(output));
            return output;
          }
          
          return self;
    };
    
    //angular.module('kitakiapp').factory('DBA',dbAccessFunc);
    kitApp.factory('DBA',dbAccessFunc);
    
    var appServices = function($window){
        var deviceId;
        var loggedInUserId;
        var loggedInUserType;
        var loggedInUserPhoneNum;
        return {
            getDeviceId:function () {
                return deviceId;
            },
            setDeviceId:function (userDeviceId) {
                console.log("Device ID being set as->"+userDeviceId);
                deviceId = userDeviceId;
                return deviceId;
            },
            getloggedInUserId:function () {
                return loggedInUserId;
            },
            setloggedInUserId:function (id) {
                console.log("User ID being set as->"+id);
                loggedInUserId=id
                return loggedInUserId;
            },
            getloggedInUserType:function () {
                return loggedInUserType;
            },
            setloggedInUserType:function (type) {
                console.log("User Type being set as->"+type);
                loggedInUserType=type;
                return loggedInUserType;
            },
            getloggedInUserPhoneNum:function () {
                return loggedInUserPhoneNum;
            },
            setloggedInUserPhoneNum:function (phNum) {
                console.log("User Phone Number being set as->"+phNum);
                loggedInUserPhoneNum=phNum;
                return loggedInUserPhoneNum;
            },
            setToken: function(key, value) {
                console.log("token being set as"+value);
                $window.localStorage[key] = value;
            },
            getToken: function(key, defaultValue) {
                return $window.localStorage[key] || defaultValue;
            }
        };
    }
    kitApp.service('commonAppService',appServices);
}());