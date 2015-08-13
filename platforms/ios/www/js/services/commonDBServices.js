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
               //output.push(result);
            return output;
          }
          self.processResultSethttp = function(result) {
            var output = [];
              var serverValues = angular.fromJson(result);
              //Object.keys(serverValues.data).length
            console.log(" Service(DBA); function(processResultSethttp); result length  "+Object.keys(serverValues.data).length);
            for (var i = 0; i < Object.keys(serverValues.data).length; i++) {
                //output.push(result.rows.item(i));
                output.push(serverValues.data[i]);
            }
             console.log(" Service(DBA); function(processResultSethttp); output= "+JSON.stringify(output));
            return output;
          }
          return self;
    };
    
    //angular.module('kitakiapp').factory('DBA',dbAccessFunc);
    kitApp.factory('DBA',dbAccessFunc);
    
    var appServices = function(){
        var deviceId;
        var loggedInUserId;
        var loggedInUserType
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
            }
        };
    }
    kitApp.service('commonAppService',appServices);
}());