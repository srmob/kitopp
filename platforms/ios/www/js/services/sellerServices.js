(function(){
    var funcSellerInfo = function($cordovaSQLite, DBA) {
          var self = this;
          
          
          self.getSellerOrders = function(sellerId) {
            var parameters= [sellerId];
            console.log(" Service(SellerInfo); function(getSellerOrders);"+sellerId);
            return DBA.query(" select distinct ord.order_id,ord.uid_buyer,ord.order_tot_amount,ordd.uid_seller,ord.order_qty,ord.order_price,ord.order_tot_amount,ud.first_name, ud.shop_name from orders ord inner join order_detail ordd  on ord.order_id =ordd.ord_id and ordd.uid_seller=(?) inner join user_details ud on ord.uid_buyer = ud.uid order by ord.order_id;" , parameters)
              .then(function(result){
                console.log(" Service(SellerInfo); function(getSellerOrders); "+ result.rows.length);
                return DBA.processResultSet(result);
              },function(error) {
                    console.log("Error in DBA-> Service(SellerInfo); function(getSellerOrders); "+error.message);
                });
          }
          self.getOrdersDetails = function(orderId) {
            var parameters= [orderId];
            console.log(" Service(SellerInfo); function(getOrdersDetails);"+orderId);
            return DBA.query(" select ordd.ord_id as order_id,ordd.product_id,ordd.product_name,ordd.order_qty,prd.product_price,pd.product_desc,pd.product_img_id1,ordd.uid_buyer,ordd.uid_seller from order_detail ordd inner join orders ord on ord.order_id=ordd.ord_id and ord_id=(?) inner join price_detail prd on prd.price_id = ordd.price_id inner join product_details pd on pd.product_id = ordd.product_id" , parameters)
              .then(function(result){
                console.log(" Service(SellerInfo); function(getOrdersDetails); "+ result.rows.length);
                return DBA.processResultSet(result);
              },function(error) {
                    console.log("Error in DBA-> Service(SellerInfo); function(getOrdersDetails); "+error.message);
                });
          }
          
          return self;
    };
    kitApp.factory('SellerInfo',funcSellerInfo);   
}());