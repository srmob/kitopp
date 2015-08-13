(function(){
   var funcBrwseProd = function($scope,ProductInfo,$state, $stateParams,ProductInfo,$filter,$ionicModal){
        console.log("In ProductList controller "+$stateParams.sellerName+"-"+$stateParams.uid_seller+"-"+$stateParams.buyer_uid);
        $scope.sellerName = $stateParams.sellerName;
        $scope.sellerID = $stateParams.uid_seller;
        $scope.buyerId = $stateParams.buyer_uid;
        $scope.productCatg = [];
        $scope.products = [] ;
        $scope.selectedProducts = [];
        
        if ($scope.buyerId == null || $scope.buyerId == 0 ){
            $scope.buyerId = 1;
        }
       console.log("Buyer ID added "+$scope.buyerId);
        //$scope.products = null;
        
        // Populate the drop down list for category and related subcategories
        $scope.getAllCategories = function() {
            ProductInfo.getAllProdCatg($scope.sellerID).then(function(products){
              $scope.productCatg = products;
              /*console.log("Controller(BrowseProducts); Func(getAllCategories) ; Catg Array Length:"+$scope.productCatg .length);*/
            });
        }
        $scope.getAllCategories();
        
        // Get the items for particular seller , selected Product and Sub Product Category to a drop down from DB
        
        $scope.getProductsForID = function(selectedDept){
            var prodCatgID = selectedDept.product_catg_id;
            var product_sub_catg_id = selectedDept.product_sub_catg_id;
            console.log("Controller(BrowseProducts); Func(getProductsListsForSellerID); prodCatgID-product_sub_catg_id = "+$stateParams.uid_seller+"-"+prodCatgID+"-"+product_sub_catg_id);
        ProductInfo.getProductsListsForSellerID($stateParams.uid_seller,prodCatgID,product_sub_catg_id).then(function(items){
                //console.log(" In getProductsForID controller method  , prod_sub_catg_id = "+subProdId);
                $scope.products = items;
                angular.forEach($scope.products,function(value,key){
                    $scope.products[key].order_qty=0;
                });
                
            });
        }
        
        $ionicModal.fromTemplateUrl('templates/moreProductInfo.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.modal = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeProductInfo = function() {
            $scope.modal.hide();
        };

        // Open the login modal
        $scope.productInfo = function() {
            console.log("Prduct Info triggered")
            $scope.modal.show();
        };

        
        $scope.more = function(){
            console.log("Show more Product Details");
            $scope.productInfo();
        }
        $scope.checkboxes = {prodid:[]};
    
        
        $scope.saveSelectedProducts=function(){
            $scope.finalProducts=[ ];
            
            angular.forEach($scope.checkboxes.prodid,function(chkValue,chkKey) {
                
                console.log("chkKey from checkboxes = "+chkKey);
                angular.forEach($scope.products, function(value,key) {
                  console.log('Value->'+value.product_id+"-Key = "+key);
                  if (value.product_id == chkValue ) {
                      console.log("Product Lot Size : "+value.Product_Min_Qty);
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
                                    product_desc: value.product_desc
                              });
                      console.log("final product array is  "+$scope.finalProducts);
                  }
                });
            });
            
            
            var data= angular.fromJson($scope.finalProducts);
            console.log("JSON stringify value is "+JSON.stringify(data));
            
           
            if ($scope.finalProducts.length > 0 ) {
                ProductInfo.saveProductsList(data).then(function(item){
                console.log("Controller(BrowseProducts); Func(saveProductsList) ;Len(items):"+item+"-"+$scope.buyerId+"-"+$scope.sellerName);
                $state.go('app.buyer.buyProducts.summary',{ Uid: $scope.buyerId, sellerName: $scope.sellerName });
                });
            }
            
        };
        
    };
    
    kitApp.controller('ProductslistsCtrl',funcBrwseProd);
        
    var funcOrderItem = function($scope,$stateParams,ProductInfo,$ionicScrollDelegate,OrderInfo,$ionicModal,$ionicPopup,$state,LoadAppInfo){
            $scope.orders=[];
            console.log(" In Order Item Controller ;  "+$stateParams.Uid);
            $scope.buyerId = $stateParams.Uid;
            $scope.sellerName = $stateParams.sellerName;
            console.log(" Controller(OrderItemCtrl); Func(funcOrderItem) ;  "+$stateParams.Uid);
           
            ProductInfo.getOrders($scope.buyerId).then(function(items){
                console.log("Controller(OrderItemCtrl); Func(getOrders) ;                                                                   Len(getOrders):"+items.length);
                $scope.orders = items;
                
            });
            var adjusting = false;
            $scope.scrollMirror = function(from, to) {
                if (adjusting) {
                  adjusting = false;
                } else {
                  // Mirroring zoom level
                  var zoomFrom = $ionicScrollDelegate.$getByHandle(from).getScrollView().getValues().zoom;
                  var zoomTo = $ionicScrollDelegate.$getByHandle(to).getScrollView().getValues().zoom;

                  if (zoomFrom != zoomTo) {
                    $ionicScrollDelegate.$getByHandle(to).getScrollView().zoomTo(zoomFrom);
                  }

                  // Mirroring left position
                  $ionicScrollDelegate.$getByHandle(to).scrollTo($ionicScrollDelegate.$getByHandle(from).getScrollPosition().left,
                  $ionicScrollDelegate.$getByHandle(to).getScrollPosition().top);

                  adjusting = true;
                }
              };
        
           /*$ionicModal.fromTemplateUrl('templates/login.html', {
                scope: $scope
              }).then(function(modal) {
                $scope.modal = modal;
              });

              // Triggered in the login modal to close it
              $scope.closeLogin = function() {
                $scope.modal.hide();
              };

              // Open the login modal
              $scope.login = function() {
                  console.log("Login triggered")
                $scope.modal.show();
              };

              // Perform the login action when the user submits the login form
              $scope.doLogin = function() {
                console.log('Doing login', $scope.loginData);

                // Simulate a login delay. Remove this and replace with your login
                // code if using a login system
                $timeout(function() {
                  $scope.closeLogin();
                }, 1000);
              };*/

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
                    //$scope.sellersAssociated[key].imgpath="img/sellers/images-"+key+".jpeg";
                     list.push(value.product_id+"-"+value.order_qty);
                });
               console.log("List- "+JSON.stringify(list));
                 OrderInfo.placeOrder(list,1).then(function(item){
                    console.log("Controller(OrderItemCtrl); Func(placeOrder) ;                                                                   Len(items):"+item);
                    //$state.go('app.buyer.buyProducts.summary',{ Uid: $scope.buyerId });
                     console.log("updates done - "+JSON.stringify(item));
                     //console.log("updates done"+item.length);
                    $scope.alertOrderConfirmed();
                    // $scope.login();
                });
            };
            
         
            
        };
        
    kitApp.controller('OrderItemCtrl',funcOrderItem ) ;
}());