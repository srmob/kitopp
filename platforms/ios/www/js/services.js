(function(){
    
    var dbAccessFunc = function($cordovaSQLite, $q, $ionicPlatform,$filter) {
          var self = this;

          // Handle query's and potential errors
          self.query = function (query, parameters) {
            parameters = parameters || [];
            console.log(" Parameters passed for Query - "+query+" - is/are -> "+parameters);
            var q = $q.defer();

            $ionicPlatform.ready(function () {
                console.warn(parameters);
              $cordovaSQLite.execute(db, query, parameters)
                .then(function (result) {
                  console.log("In Query Result is "+result);
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
            console.log(" Parameters passed for Query in Insert List - "+query+" - is/are -> "+[parameters]);
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
            /*return q.promise;
              
            var q = $q.defer();*/
        

            /*db.transaction(function (tx) {
              (function insertOne() {
               // var record = JSON.stringify(coll.splice(0, 1)[0]); // get the first record of coll and reduce coll by one
                //var record1 = $filter('json')(coll.splice(0, 1)[0]); // get the first record of coll and reduce coll by one
                var record = coll.splice(0, 1)[0]; // get the first record of coll and reduce coll by one
                //var record = coll.splice(0, 1)[0];
                  console.log(" Record value in Collection -- insert List - "+record+"-- Query is  "+query);
                  //console.log(" 1Record 1 value in Collection -- insert List - "+record1);
                
                try {
                  tx.executeSql(query, record, function (tx, result) {
                    if (coll.length === 0) {
                      q.resolve(result);
                    } else {
                      insertOne();
                    }
                  }, function (transaction, error) {
                    q.reject(error);
                    return;
                  });
                } catch (exception) {
                  q.reject(exception);
                }
              })();
            });*/
            return q.promise;
          }

          // Proces a result set
          self.getAllCategoriesForUID = function(result) {
            var output = [];
            //console.log(" Service(DBA); function(getAllCategoriesForUID); result length  "+result.rows.length);
            for (var i = 0; i < result.rows.length; i++) {
                output.push(result.rows.item(i));
            }
            return output;
          }
          
          // Get all the products for a given product sub category id
         self.getProductList = function(result) {
                var output = [];
                //console.log(" Service(DBA); function(getProductList); result length  = "+result.rows.length);
                //output = angular.copy(result.rows.item(0));
                for (var i = 0; i < result.rows.length; i++) {
                    output.push(result.rows.item(i));
                    //console.log(" Output of DBA Factory in getProductsForID  -  = ");
                }
                return output;
            }
            
         self.saveListResult = function(result) {
            /*var output = [];
            console.log(" Service(DBA); function(saveListResult); result length  "+result.rows.length);
            for (var i = 0; i < result.rows.length; i++) {
                output.push(result.rows.item(i));
            }*/
             return result.rowsAffected;
            //return output;
          }
         
         self.getOrders = function(result) {
            var output = [];
            console.log(" Service(DBA); function(getOrders); result length  "+result.rows.length);
            for (var i = 0; i < result.rows.length; i++) {
                output.push(result.rows.item(i));
            }
            return output;
          }
            /* Get Max ID from the order temp table
            self.getMaxIDOrderTable = function(result) {
                var output ;
                return output;
            }*/
         
         
         self.getAssocSellers = function(result) {
            var output = [];
            console.log(" Service(DBA); function(getAssocSellers); result length  "+result.rows.length);
            for (var i = 0; i < result.rows.length; i++) {
                output.push(result.rows.item(i));
            }
            return output;
          }
         
         
         self.processResults = function(result) {
            var output = [];
            console.log(" Service(DBA); function(processResults); result length  "+result.rows.length);
            for (var i = 0; i < result.rows.length; i++) {
                output.push(result.rows.item(i));
            }
            return output;
          }
          return self;
    };
    
    //angular.module('kitakiapp').factory('DBA',dbAccessFunc);
    kitApp.factory('DBA',dbAccessFunc);
    
    var funcGetAllProdCategories = function($cordovaSQLite, DBA, $q) {
          var self = this;
          var savedList=[];

          self.getAllProdCatg = function(sellerID) {
            var parameters= [sellerID];
            return DBA.query("select uid_seller,seller_skuid,product_catg_id,product_sub_catg_id,product_catg_name,product_sub_catg_name from prod_category where uid_seller=(?) order by product_catg_id,product_sub_catg_id;" , parameters)
              .then(function(result){
                //console.log(" Service(ProductInfo); function(funcGetAllProdCategories); "+ result.rows.length);
                return DBA.getAllCategoriesForUID(result);
              },function(error) {
                    console.log("Error in DBA-> Service(ProductInfo); function(funcGetAllProdCategories); "+error.message);
                });
          }
          
          self.getProductsListsForSellerID = function(sellerID,subProdCatgId) {
            var parameters= [sellerID,subProdCatgId];
            /*console.log(" Service(ProductInfo); function(getProductsListsForSellerID); Sub Prod Catg ID"+ subProdCatgId);*/
            return DBA.query("select  pd.product_id,pd.product_catg_id,product_sub_catg_id,pd.product_name,product_desc,product_min_qty,product_price,pd.price_id from prod_detail  pd , price_detail prd where pd.uid_seller=(?) and product_sub_catg_id=(?) and pd.product_id  = prd.product_id and pd.price_id  = prd.price_id;" , parameters)
              .then(function(result){
                //console.log(" Service(ProductInfo); function(getProductsListsForSellerID); "+ result.rows.length);
                return DBA.getProductList(result);
              },function(error) {
                    console.log("Error in DBA-> Service(ProductInfo); function(getProductsListsForSellerID); "+error.message);
                });
          }
          
          self.saveProductsList = function(productList) {
            //var parameters= [productList];
            console.log(" Service(ProductInfo); function(saveProductsList); insert list in service -"+ productList+"leng IS "+productList.length+"-indiv-- >> "+JSON.stringify(productList));
              /*return DBA.insertList("insert into order_detail_temp (uid_buyer,product_id,price_id,order_qty,order_date,order_price,order_tot_amount,order_status,uid_seller) values (?,?,?,?,?,?,?,?,?)" , productList).then(function(result){
                    console.log("-Insert ID-"+ result.insertId +"-impacted-"+ result.rowsAffected );
                    //return DBA.saveListResult(result);
                    return result.rowsAffected;
                  },function(error) {
                        console.log("Error in DBA-> Service(ProductInfo); function(saveProductsList); "+error.message);
                    });*/
              var rowsImpacted = 0;
              var q = $q.defer(); 
              angular.forEach(productList, function (value,key) {
                  var parameters= [value.uid_buyer,value.product_id,value.price_id,value.order_qty,value.order_date,value.order_price,value.order_tot_amount,value.order_status,value.uid_seller];
                    //console.log("ITEM AT "+key+" is  " + value.product_id);
                    console.log('(' + value.uid_buyer + ', "' + value.product_id + '", "' + value.order_qty + '", "' + value.order_date + '"),');
                    
                  return DBA.query("insert into order_detail_temp (uid_buyer,product_id,price_id,order_qty,order_date,order_price,order_tot_amount,order_status,uid_seller) values (?,?,?,?,?,?,?,?,?)" , parameters).then(function(result){
                    console.log("-Insert ID-"+ result.insertId +"-impacted-"+ result.rowsAffected );
                    //return DBA.saveListResult(result);
                    //return result.rowsAffected;
                      rowsImpacted = rowsImpacted + result.rowsAffected;
                      q.resolve(rowsImpacted);
                      //console.log("-Rows impacted-"+ rowsImpacted );
                      //return DBA.saveListResult(result);
                  },function(error) {
                        console.log("Error in DBA-> Service(ProductInfo); function(saveProductsList); "+error.message);
                    })
                  
                });
                return q.promise;
          }
          
          self.getOrders = function(buyerId) {
            var parameters= [buyerId];
            console.log(" Service(ProductInfo); function(getOrders);"+buyerId);
            return DBA.query(" select od.order_id,od.product_id,pd.product_name,pd.product_desc,od.order_qty, od.order_price from order_detail_temp od , prod_detail pd where pd.product_id = od.product_id and uid_buyer=(?) order by od.order_id" , parameters)
              .then(function(result){
                console.log(" Service(ProductInfo); function(getOrders); "+ result.rows.length);
                return DBA.getOrders(result);
              },function(error) {
                    console.log("Error in DBA-> Service(ProductInfo); function(getOrders); "+error.message);
                });
          }
          return self;
    };
    kitApp.factory('ProductInfo',funcGetAllProdCategories); 
    
    
    var funcLoadAppInfo = function($cordovaSQLite, DBA) {
        var self = this;
         console.log("In services for loadApp  ");
        
        self.getSellersForBuyer = function() {
            var parameters= [101,"seller"];
            console.log(" Service(LoadAppInfo); function(funcLoadAppInfo);");
            return DBA.query(" select tc.buyer_uid,uid,first_name,last_name,user_type,regd_status from user_detail ud , trans_connect tc where tc.buyer_uid= (?) and ud.uid = tc.uid_seller and ud.user_type=(?)" , parameters)
              .then(function(result){
                console.log(" Service(LoadAppInfo); function(funcLoadAppInfo); "+ result.rows.length);
                return DBA.getAssocSellers(result);
              },function(error) {
                    console.log("Error in DBA-> Service(LoadAppInfo); function(funcLoadAppInfo); "+error.message);
                });
          }
                
        self.getBuyerDetails = function(buyerId) {
            var parameters= [buyerId,'Buyer'];
            console.log(" Service(LoadAppInfo); function(getBuyerDetails);-"+buyerId);
            return DBA.query(" select uid,first_name,last_name,gender,email_id,user_type from user_detail where uid=(?) and user_type=(?)" , parameters)
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
    //angular.module('kitakiapp').factory('ProductInfo',funcGetAllProdCategories);    
        
        
          /*self.getProductsForID = function(subProdId) {
            var parameters = [1001,subProdId];
            return DBA.query("SELECT PROD_ID,PROD_SUB_CATG_ID,PROD_NAME,PROD_DESC,PROD_MIN_QTY FROM PROD_DETAIL WHERE UID=(?) AND PROD_SUB_CATG_ID=(?)", parameters)
              .then(function(result) {
                return DBA.getProductsForID(result);
              });
          }*/
          /*self.saveList = function(result){
              /*console.log(" Service -> in Save List method, input array length = "+result.length);
              savedList = [];
              console.log(" Service -> in Save List method, Saved List cleared and length = "+savedList.length);
              //savedList = angular.copy(result);
              
              for (var i = 0; i < result.length; i++) {
                    console.log(" Result for loop "+i+"  PRODUCT Name " + result[i].PROD_NAME );
                    //console.log(" Result of "+i+"  PROD Name " + result.item[i].PROD_NAME );
              }
              
              angular.copy(result,savedList);
              /*for (var k = 0; k < savedList.length ; k++) {
                    //console.log(" Result of "+i+"  PRODUCT Name " + result[i].PROD_NAME );
                    console.log(" Saved List for loop Result of "+k+"  PRODUCT Name " + savedList[k] );
                    //savedList[i] = result[i];
              }*/
              
              /*console.log("saved in Service, saved List length "+savedList.length);
              
              INSERT INTO ORDER_DETAIL_TEMP (ORDER_ID,UID,PRODUCT_ID,PRICE_ID,ORDER_QTY,ORDER_PRICE,ORDER_TOT_AMOUNT) VALUES(113,1001,5004,1,4,20,100);
*/
              /*var maxID;
              var maxIDParameters=[];
              return DBA.query("SELECT MAX(ORDER_ID)+1 FROM ORDER_DETAIL_TEMP",maxIDParameters).then(function(result) {
                maxID = DBA.getMaxIDOrderTable(result);
                console.log("Max ID from ORDER_DETAIL_TEMP table is"+maxID);
              });*/
              /*var parameters= [1001,result.PRODUCT_ID,result.PRICE_ID,result.ORDER];
              return DBA.query("INSERT INTO ORDER_DETAIL_TEMP (UID,PRODUCT_ID,PRICE_ID,ORDER_QTY,ORDER_PRICE,ORDER_TOT_AMOUNT) VALUES" , parameters)
              .then(function(result){
                return DBA.getAllForUID(result);
              });
              
              return savedList;
          }
        
          self.getList = function(){
              console.log(" Get output List from service and its length = "+savedList.length)
              return savedList;
            }
            
          
    };
   var selectProdFunc = function(){
        var selectedPrdID = {};
        
        selectedPrdID.list = [];
        
        selectedPrdID.add = function (prdId,prdQty) {
            selectedPrdID.list.push({productId:productId, productQty : prdQty});
        };
        return selectedPrdID;
    
    
    };
    
    angular.module('kitakiapp').factory('selectedProducts',selectProdFunc);*/
    
}());