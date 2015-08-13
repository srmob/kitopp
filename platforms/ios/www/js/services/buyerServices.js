(function(){
    var funcGetAllProdCategories = function($cordovaSQLite, DBA, $q,$http,ApiEndpoint) {
          var self = this;
          var savedList=[];

          self.getAllProdCatg = function(sellerID) {
            var parameters= [sellerID];
            return DBA.query("select uid_seller,product_catg_id,product_sub_catg_id,product_catg_name,product_sub_catg_name from product_category where uid_seller=(?) order by product_catg_id,product_sub_catg_id;" , parameters)
              .then(function(result){
                //console.log(" Service(ProductInfo); function(funcGetAllProdCategories); "+ result.rows.length);
                return DBA.processResultSet(result);
              },function(error) {
                    console.log("Error in DBA-> Service(ProductInfo); function(funcGetAllProdCategories); "+error.message);
                });
          }
          
          self.getProductsListsForSellerID = function(sellerID,prodCatgID,subProdCatgId) {
            var parameters= [sellerID,prodCatgID,subProdCatgId];
            return DBA.query("select  pd.product_id,pd.product_catg_id,product_sub_catg_id,pd.product_name,product_desc,product_min_qty,product_price,pd.price_id ,pd.product_exp_date, pd.product_color,pd.product_weight , pd.product_height from product_details  pd , price_detail prd where pd.uid_seller=(?) and pd.product_catg_id = (?) and pd.product_sub_catg_id=(?) and pd.product_id  = prd.product_id and pd.price_id  = prd.price_id;" , parameters)
            //return $http.get(ApiEndpoint + '/kitki/product/fetchProducts/seller/'+sellerID+"/category/"+prodCatgID+"/subCategory/"+subProdCatgId)
            /*/kitki/product/fetchProducts/seller/2/category/1/subCategory/1*/
              .then(function(result){
                return DBA.processResultSet(result);
                //return DBA.processResultSethttp(result);
              },function(error) {
                    console.log("Error in DBA-> Service(ProductInfo); function(getProductsListsForSellerID); "+error.message);
                });
          }
          
          self.saveProductsList = function(productList) {
              var rowsImpacted = 0;
              var q = $q.defer(); 
              angular.forEach(productList, function (value,key) {
                var parameters= [value.uid_buyer,value.uid_seller,value.product_id,value.price_id,value.order_qty,value.order_date,value.order_price,value.order_tot_amount,value.product_name,value.product_desc];
                    console.log('(' + value.uid_buyer + ', "' + value.product_id + '", "' + value.product_name + '", "' + value.product_desc + '"),');
                  return DBA.query("insert into order_details_temp (uid_buyer,uid_seller,product_id,price_id,order_qty,order_date,order_price,order_tot_amount,product_name,product_desc) values (?,?,?,?,?,?,?,?,?,?)" , parameters).then(function(result){
                    console.log("-Insert ID-"+ result.insertId +"-impacted-"+ result.rowsAffected );
                    rowsImpacted = rowsImpacted + result.rowsAffected;
                      q.resolve(rowsImpacted);
                  },function(error) {
                        console.log("Error in DBA-> Service(ProductInfo); function(saveProductsList); "+error.message);
                    })
                  
                });
                return q.promise;
          }
          
          self.getOrders = function(buyerId) {
            var parameters= [buyerId];
            console.log(" Service(ProductInfo); function(getOrders);"+buyerId);
            return DBA.query(" select order_id,product_id,product_name,product_desc,order_qty, order_price from order_details_temp od where  uid_buyer=(?) order by od.order_id" , parameters)
              .then(function(result){
                console.log(" Service(ProductInfo); function(getOrders); "+ result.rows.length);
                return DBA.processResultSet(result);
              },function(error) {
                    console.log("Error in DBA-> Service(ProductInfo); function(getOrders); "+error.message);
                });
          }
          return self;
    };
    kitApp.factory('ProductInfo',funcGetAllProdCategories);
    
    
    var funPlaceOrder = function($cordovaSQLite, DBA, $q,$http,ApiEndpoint){
        var self = this;
        
        //Order Now Button functionality
        self.placeOrder = function(list,buyerId){
            var rowsUpdated = 0;
            var q = $q.defer(); 
            
            /*var urlValues = "";
            
            angular.forEach(list, function (value){
                urlValues += "orderList[]="+value+"&";
            });
            console.log("urlValues buyerService , place order= "+urlValues);
            console.log("urlValues JSON , place order= "+JSON.stringify(urlValues));
            
            console.log("Items in buyerService , place order= "+JSON.stringify(list)+" -buyerID- "+buyerId);
            return $http.get(ApiEndpoint + '/kitki/order/proceedOrder?'+urlValues+"buyerId="+buyerId)
            //return $http.get(ApiEndpoint + '/kitki/order/proceedOrder?orderList='+list+"&buyerId="+buyerId)
               .then(function (result){
                console.log("Result after place order= "+JSON.stringify(result));
                q.resolve(result);
            },function(error) {
                    console.log("Error in DBA-> Service(ProductInfo); function(getOrders); "+error.message);
            });
            return q.promise;*/
            
            angular.forEach(orders, function (value,key) {
                  var parameters= [value.order_qty,value.order_id];
                    //console.log("ITEM AT "+key+" is  " + value.product_id);
                    console.log('(' + value.order_qty + ', "' + value.order_id + '"),');
                    
                  return DBA.query("update order_details_temp set order_qty=(?) where order_id=(?)" , parameters).then(function(result){
                    console.log("-Updated ID-"+ result.updateId +"-impacted-"+ result.rowsAffected );
                    //return DBA.saveListResult(result);
                    //return result.rowsAffected;
                      rowsUpdated = rowsUpdated + result.rowsAffected;
                      q.resolve(rowsUpdated);
                      console.log("-Rows impacted-"+ rowsUpdated );
                      //return DBA.saveListResult(result);
                  },function(error) {
                        console.log("Error in DBA-> Service(OrderInfo); function(funPlaceOrder); "+error.message);
                    })
                  
                });
                return q.promise;
        }
        return self;
    };
    kitApp.factory('OrderInfo',funPlaceOrder);
}());