(function(){
    var funcGetAllProdCategories = function($cordovaSQLite, DBA, $q,$http,ApiEndpoint) {
          var self = this;
          var savedList=[];

          self.getAllProdCatg = function(sellerID) {
            var parameters= [sellerID];
            console.log("In get app prod catg = seller id =>"+sellerID);
            //return DBA.query("select uid_seller,product_catg_id,product_sub_catg_id,product_catg_name,product_sub_catg_name from product_category where uid_seller=(?) order by product_catg_id,product_sub_catg_id;" , parameters)
              return $http.get(ApiEndpoint + '/product/fetchProductCategory/sellerId/'+sellerID)
              .then(function(result){
                //console.log(" Service(ProductInfo); function(funcGetAllProdCategories); "+ result.rows.length);
                //return DBA.processResultSet(result);
                return DBA.processResultSethttp(result);
              },function(error) {
                    console.log("Error in DBA-> Service(ProductInfo); function(funcGetAllProdCategories); "+error.message);
                });
          }
          
          self.getProductsListsForSellerID = function(sellerID,prodCatgID,subProdCatgId,buyerId) {
            var parameters= [sellerID,prodCatgID,subProdCatgId];
            console.log("In get products for category=>"+sellerID+"-"+prodCatgID+"-"+subProdCatgId+"-"+buyerId);
            //return DBA.query("select  pd.product_id,pd.product_catg_id,product_sub_catg_id,pd.product_name,product_desc,product_min_qty,product_price,pd.price_id ,pd.product_exp_date, pd.product_color,pd.product_weight , pd.product_height from product_details  pd , price_detail prd where pd.uid_seller=(?) and pd.product_catg_id = (?) and pd.product_sub_catg_id=(?) and pd.product_id  = prd.product_id and pd.price_id  = prd.price_id;" , parameters)
            return $http.get(ApiEndpoint + '/product/fetchProducts/seller/'+sellerID+"/category/"+prodCatgID+"/subCategory/"+subProdCatgId+"/buyerId/"+buyerId)
              .then(function(result){
                return DBA.processResultSethttp(result);
              },function(error) {
                    console.log("Error in  httpService(ProductInfo); function(getProductsListsForSellerID); "+error.message);
              });
          }
          
          self.saveProductsList = function(productList) {
              var rowsImpacted = 0;
              var q = $q.defer(); 
              angular.forEach(productList, function (value,key) {
                var parameters= [value.uid_buyer,value.uid_seller,value.product_id,value.price_id,value.lot_size,value.order_qty,value.order_date,value.order_price,value.order_tot_amount,value.product_name,value.product_desc,value.product_sub_catg_name];
                    console.log('(' + value.uid_buyer + ', "' + value.product_id + '", "' + value.product_name + '", "' + value.product_desc + '"),');
                  return DBA.query("insert into order_details_temp (uid_buyer,uid_seller,product_id,price_id,product_lot_size,order_qty,order_date,order_price,order_tot_amount,product_name,product_desc,product_sub_catg_name) values (?,?,?,?,?,?,?,?,?,?,?,?)" , parameters).then(function(result){
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
            return DBA.query(" select order_id,product_id,product_name,product_desc,order_qty,product_lot_size,product_sub_catg_name, order_price from order_details_temp od where  uid_buyer=(?) order by od.order_id" , parameters)
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
        
        //Order Now Button functionality from Buyer side
        self.placeOrder = function(list,buyerId){
            var urlValues = "";
            angular.forEach(list, function (value){
                urlValues += "orderList[]="+value+"&"; // prepare the list for http processing
            });
            console.log("URL Values"+urlValues+"-"+buyerId+"-"+ApiEndpoint);
            //Pass the product_id-qty and buyer id to be updated in order_details_temp table on Server Side
            return $http.get(ApiEndpoint + '/order/proceedOrder?'+urlValues+"buyerId="+buyerId)
               .then(function (result){
                    return DBA.processResultSethttp(result);
                if (Object.keys(serverValues.data).rows_added == list.length ){
                    console.log("remove order item temp data");
                }
            },function(error) {
                    console.log("Error in DBA-> Service(ProductInfo); function(getOrders); "+error.message);
            });
        }
        self.clearOrderDetailTemp = function(buyerId){
            var parameters= [buyerId];
            return DBA.query(" delete from order_details_temp where  uid_buyer=(?)" , parameters)
              .then(function(result){
                console.log(" Service(ProductInfo); function(clearOrderDetailTemp); "+ result.rows.length);
                return DBA.processResultSet(result);
              },function(error) {
                    console.log("Error in DBA-> Service(ProductInfo); function(clearOrderDetailTemp); "+error.message);
                });
        }
        
        self.getBuyerOrders = function(buyerId) {
            var parameters= [buyerId];
            console.log(" Service(OrderInfo); function(getBuyerOrders);"+buyerId+"-API-= "+ApiEndpoint);
              return $http.get(ApiEndpoint + '/order/fetchOrderForBuyer/buyerId/'+buyerId)
              .then(function(result){
                //console.log(" Service(SellerInfo); function(getSellerOrders); "+ result.rows.length);
                return DBA.processResultSethttp(result);
              },function(error) {
                    console.log("Error in DBA-> Service(OrderInfo); function(getBuyerOrders); "+error.message);
                });
          }
        return self;
    };
    kitApp.factory('OrderInfo',funPlaceOrder);
}());