(function(){
   var funcBrwseProd = function($scope,ProductInfo,$state, $stateParams,ProductInfo,$filter,$ionicModal,$ionicLoading,commonAppService,ApiEndpoint){
        console.log("In ProductList controller "+$stateParams.sellerName+"-"+$stateParams.uid_seller+"-"+$stateParams.buyer_uid);
        $scope.shopName = $stateParams.shopName;
        $scope.sellerID = $stateParams.uid_seller;
        $scope.buyerId = $stateParams.buyer_uid;
        $scope.productCatg = [];
        $scope.products = [] ;
        $scope.selectedProducts = [];
        $scope.onlyNumbers = /^[1-9]+[0-9]*/;
        
        if ($scope.buyerId == null || $scope.buyerId == 0 ){
            $scope.buyerId = commonAppService.getloggedInUserId();
        }
       console.log("Buyer ID added in ProductslistsCtrl "+$scope.buyerId+"-"+$scope.shopName);
        //$scope.products = null;
        console.log("Api End point in buyer controller is "+ApiEndpoint);
       $scope.productImageUrl =ApiEndpoint+"/product/productImage/productId/";
        // Populate the drop down list for category and related subcategories
        $scope.getAllCategories = function() {
            ProductInfo.getAllProdCatg($scope.sellerID).then(function(products){
              $scope.productCatg = products;
              $scope.shopURL = ApiEndpoint+"/user/fetchShopImage/uid/"+$scope.sellerID;
              //console.log("Controller(BrowseProducts); Func(getAllCategories) ; Catg Array Length:"+$scope.productCatg.length);
            });
        }
        $scope.getAllCategories();
        
        // Get the items for particular seller , selected Product and Sub Product Category to a drop down from DB
        
        $scope.getProductsForID = function(selectedDept){
            var prodCatgID = selectedDept.product_catg_id;
            var product_sub_catg_id = selectedDept.product_sub_catg_id;
            console.log("Controller(BrowseProducts); Func(getProductsListsForSellerID); prodCatgID-product_sub_catg_id = "+$stateParams.uid_seller+"-"+prodCatgID+"-"+product_sub_catg_id+"---"+$scope.buyerId);
        ProductInfo.getProductsListsForSellerID($stateParams.uid_seller,prodCatgID,product_sub_catg_id,$scope.buyerId).then(function(items){
                //console.log(" In getProductsForID controller method  , prod_sub_catg_id = "+subProdId);
                $scope.products = items;
                console.log(" In getProductsForID controller method  ; products = "+JSON.stringify($scope.shopURL));
                angular.forEach($scope.products,function(value,key){
                    $scope.products[key].order_qty=1;
                    $scope.products[key].checked=false;
                });
                
            });
        }
        
        $ionicModal.fromTemplateUrl('templates/moreProductInfo.html', {
            scope: $scope, 
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeProductInfo = function() {
            $scope.modal.hide();
        };

        // Open the login modal
        $scope.productInfo = function(row) {
            console.log("Prduct Info triggered"+JSON.stringify(row));
            $scope.productImageUrl =ApiEndpoint+"/product/productImage/productId/";
            $scope.modalRow = row;
            $scope.modal.show();
        };

        
        $scope.more = function(row){
            console.log("Show more Product Details"+JSON.stringify(row));
            $scope.productInfo(row);
        }
        $scope.checkboxes = {prodid:[]};
        $scope.btnEnabled = false;
        $scope.checkBoxClicked = function(idx){
            console.log("checkbox change clicked - "+idx);
            $scope.products[idx].checked = !$scope.products[idx].checked;
            console.log("checked flag changed for prd id "+$scope.products[idx].product_id);
            
        }
        
        $scope.saveSelectedProducts=function(categoryName){
            $scope.finalProducts=[ ];
            console.log("sub catg name in save ->"+categoryName);
            
            angular.forEach($scope.checkboxes.prodid,function(chkValue,chkKey) {
                
                //console.log("chkKey from checkboxes = "+chkKey);
                angular.forEach($scope.products, function(value,key) {
                  console.log('Value->'+value.product_id+"-Key = "+key);
                  if (value.product_id == chkValue ) {
                      console.log("Product Quantity Entered : "+value.order_qty);
                              $scope.finalProducts.push({
                                    uid_buyer: $scope.buyerId,
                                    product_id: value.product_id,
                                    price_id: value.price_id,
                                    lot_size: value.product_min_qty,
                                    order_qty: value.order_qty,
                                    order_date: new Date(),
                                    order_price: value.product_price,
                                    order_tot_amount: value.product_price,
                                    order_status: "new",
                                    uid_seller: $scope.sellerID,
                                    product_name: value.product_name,
                                    product_desc: value.product_desc,
                                    product_sub_catg_name: categoryName
                              });
                      console.log("final product array is  "+JSON.stringify($scope.finalProducts));
                  }
                });
            });
            
            
            var data= angular.fromJson($scope.finalProducts);
            console.log("JSON stringify value is "+JSON.stringify(data));
            
           
            if ($scope.finalProducts.length > 0 ) {
                ProductInfo.saveProductsList(data).then(function(item){
                console.log("Controller(BrowseProducts); Func(saveProductsList) ;Len(items):"+item+"-"+$scope.buyerId+"-"+$scope.sellerName);
                    $scope.modal.remove();
               // $state.go('app.buyer.buyProducts.summary',{ Uid: $scope.buyerId, sellerName: $scope.sellerName });
                $state.go('app.buyer.buyProducts.summary',{reload: true});
                });
            }
            
        };
        
    };
    
    kitApp.controller('ProductslistsCtrl',funcBrwseProd);
        
    var funcOrderItem = function($scope,$stateParams,ProductInfo,$ionicScrollDelegate,OrderInfo,$ionicModal,$ionicPopup,$state,LoadAppInfo,$ionicLoading,commonAppService,ApiEndpoint){
            $scope.orders=[];
            console.log(" In Order Item Controller ;  "+$stateParams.Uid);
            $scope.buyerId = $stateParams.Uid;
            $scope.sellerName = $stateParams.sellerName;
            $scope.onlyNumbers = /^[1-9]+[0-9]*/;
           
            if ($scope.buyerId == null || $scope.buyerId == 0 ){
                $scope.buyerId = commonAppService.getloggedInUserId();
            }
        
            console.log("Buyer ID added in OrderItemCtrl "+$scope.buyerId);
            //TO DISPLAY PRODUCT IMAGES
            $scope.productImageUrl =ApiEndpoint+"/product/productImage/productId/";
        
            // LIST OF BUYER ORDERS FROM SQLITE TABLES 
            $scope.getBuyerSummaryOrders = function(){
                 console.log(" Controller(OrderItemCtrl); Func(getBuyerSummaryOrders) ;  "+$scope.buyerId);
                ProductInfo.getOrders($scope.buyerId).then(function(items){
                    console.log("Controller(OrderItemCtrl); Func(getOrders) ; orders data"+JSON.stringify(items));
                    $scope.orders = items;
                });
            };
            $scope.getBuyerSummaryOrders();
           

             $scope.alertOrderConfirmed = function() {
               var alertPopup = $ionicPopup.alert({
                 title: 'You\'r order is in process!',
                 template: 'Thank YOU for placing the order'
               });
               alertPopup.then(function(res) {
                 console.log('Alert confirmed ');
                 LoadAppInfo.getSellersForBuyer().then(function(sellers){
                    //console.log("From DB Sellers length"+sellers.length);
                    $scope.sellersAssociated = sellers;
                    angular.forEach($scope.sellersAssociated,function(value,key){
                        $scope.sellersAssociated[key].imgPath="img/sellers/images-"+key+".jpeg";
                    });

                });
                 $state.go('app.buyer');
               });
             };
            
            $scope.placeOrder = function(){
                var list = [];
                angular.forEach($scope.orders,function(value,key){
                     list.push(value.product_id+"-"+value.order_qty);
                });
                console.log("--List- "+JSON.stringify(list));
                OrderInfo.placeOrder(list,$scope.buyerId).then(function(item){
                    console.log("row count inserted - "+JSON.stringify(item[0].rows_added));
                    console.log("list.length - "+list.length);
                    if (list.length == item[0].rows_added ) {
                        OrderInfo.clearOrderDetailTemp($scope.buyerId).then(function(count){ 
                        console.log("cleared clearedd - ");
                     });
                    }

                    $scope.alertOrderConfirmed();
                });
            };
            
         
            
        };
        
    kitApp.controller('OrderItemCtrl',funcOrderItem ) ;
}());