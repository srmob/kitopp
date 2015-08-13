(function(){
    var funcSellerInfo = function($cordovaSQLite, DBA,$http,ApiEndpoint) {
          var self = this;
          
          
          self.getSellerOrders = function(sellerId) {
            var parameters= [sellerId];
            console.log(" Service(SellerInfo); function(getSellerOrders);"+sellerId+"-API-= "+ApiEndpoint);
            //return DBA.query(" select distinct ord.order_id,ord.uid_buyer,ord.order_tot_amount,ordd.uid_seller,ord.order_qty,ord.order_price,ord.order_tot_amount,ud.first_name, ud.shop_name from orders ord inner join order_detail ordd  on ord.order_id =ordd.ord_id and ordd.uid_seller=(?) inner join user_details ud on ord.uid_buyer = ud.uid order by ord.order_id;" , parameters)
              return $http.get(ApiEndpoint + '/order/fetchOrderForSeller/sellerId/'+sellerId)
              .then(function(result){
                console.log(" Service(SellerInfo); function(getSellerOrders); "+ JSON.stringify(result));
                return DBA.processResultSethttp(result);
              },function(error) {
                    console.log("Error in SellerServices.JS-> Service(SellerInfo); function(getSellerOrders); "+JSON.stringify(error));
                });
          }
          
          self.getOrdersDetails = function(orderId) {
            var parameters= [orderId];
            //console.log(" Service(SellerInfo); function(getOrdersDetails); order ID is "+orderId);
            //return DBA.query(" select ordd.ord_id as order_id,ordd.product_id,ordd.product_name,ordd.order_qty,prd.product_price,pd.product_desc,pd.product_img_id1,ordd.uid_buyer,ordd.uid_seller from order_detail ordd inner join orders ord on ord.order_id=ordd.ord_id and ord_id=(?) inner join price_detail prd on prd.price_id = ordd.price_id inner join product_details pd on pd.product_id = ordd.product_id" , parameters)
              return $http.get(ApiEndpoint + '/order/orderDetail/orderId/'+orderId)
              .then(function(result){
                //console.log(" In Seller Infor Service, post API call"+JSON.stringify(result));
                return DBA.processOrderDetailsResultSethttp(result);
              },function(error) {
                    console.log("Error in DBA-> Service(SellerInfo); function(getOrdersDetails); "+error.message);
                });
          }
          
          self.fulFillOrder = function(list){
            var urlSellerOrderValues="";
              
            angular.forEach(list, function (value) {
                urlSellerOrderValues += "orderList[]="+value+"&"; // prepare the seller fulfill order list for http processing
            });
            console.log("URL Values in SellerInfo-fulFillOrder==>"+urlSellerOrderValues+ "API End Point is "+ApiEndpoint);
            //return 1;
            //Pass the product_id-qty and buyer id to be updated in order_details_temp table on Server Side
            //return $http.get(ApiEndpoint + '/order/processSellerOrder?'+urlSellerOrderValues)
            return $http.post(ApiEndpoint + '/order/processSellerOrder',urlSellerOrderValues,{
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                }
            })
               .then(function (result){
                var serverValues = angular.fromJson(result);
                return serverValues.data.result;
                /*console.log(" In Seller Info Service, post Update Order call"+JSON.stringify(result));
                    return DBA.processResultSethttp(result);*/
                /*if (Object.keys(serverValues.data).rows_updated == list.length ){
                    console.log("remove order item temp data");
                }*/
            },function(error) {
                    console.log("Error in DBA-> Service(SellerInfo); function(fulFillOrder); "+JSON.stringify(error));
            });
        }
        return self;
    };
    kitApp.factory('SellerInfo',funcSellerInfo);   
    
    var functionProductInfo = function($cordovaSQLite, DBA,$http,ApiEndpoint) {
          var self = this;
        
        
        self.addSellerProduct = function(sellerId,productDetails) {
            console.log(" Service(ManageProduct); function(addSellerProduct);"+sellerId+"-API-= "+ApiEndpoint);
            return $http.get(ApiEndpoint + '/product/addProduct/uidSeller/'+sellerId+"?"+productDetails)
            .then(function(result){
                console.log(" Service(ManageProduct); function(addSellerProduct); "+ JSON.stringify(result));
                return result;
            },function(error) {
                console.log("Error in DBA-> Service(ManageProduct); function(addSellerProduct); "+error.message);
            });
        }
        
        
        self.getSellersProducts = function(sellerId) {
            var parameters= [sellerId];
            console.log(" Service(ManageProduct); function(getSellersProducts);"+sellerId+"-API-= "+ApiEndpoint);
            //return DBA.query("select  product_id, product_name from product_details where uid_seller=101 order by product_name" , parameters)
              return $http.get(ApiEndpoint + '/product/productListBySeller/sellerId/'+sellerId)
              .then(function(result){
                console.log(" Service(ManageProduct); function(getSellersProducts); "+ JSON.stringify(result));
                return result.data;
              },function(error) {
                    console.log("Error in DBA-> Service(ManageProduct); function(getSellersProducts); "+error.message);
                });
        }
        self.getProductDetailsForEdit = function(productId) {
            var parameters= [productId];
            console.log(" Service(ManageProduct); function(getProductDetailsForEdit); -"+productId+"-API-= "+ApiEndpoint);
            /*return DBA.query("select  product_id, product_name from product_details where uid_seller=101 order by product_name" , parameters)*/
              return $http.get(ApiEndpoint + '/product/productInfo/productId/'+productId)
              .then(function(result){
                console.log(" Service(ManageProduct); function(getProductDetailsForEdit);  "+ JSON.stringify(result));
                //return DBA.processResultSethttp(result);
                return result;
              },function(error) {
                    console.log("Error in DBA-> Service(ManageProduct); function(getProductDetailsForEdit); "+error.message);
                });
        }
          
          self.updateProductDetails = function(productId,productDetails,sellerId) {
            console.log(" Service(ManageProduct); function(updateProductDetails);"+sellerId+"-API-= "+ApiEndpoint);
            return $http.get(ApiEndpoint + '/product/editProduct/productId/'+productId+'/uidSeller/'+sellerId+"?"+productDetails)
            .then(function(result){
                console.log(" Service(ManageProduct); function(updateProductDetails); "+ JSON.stringify(result));
                return result;
            },function(error) {
                console.log("Error in DBA-> Service(ManageProduct); function(updateProductDetails); "+error.message);
            });
        }
        return self;
    };
    
    kitApp.factory('ManageProduct',functionProductInfo); 
    
}());