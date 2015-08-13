(function(){
    var funcLoadApp = function($scope,$ionicModal,$timeout,$state,$stateParams,LoadAppInfo,ProductInfo,$ionicHistory,$ionicScrollDelegate,$ionicPopup,SellerInfo,commonAppService){
    $scope.loginData = {};
    $scope.imeiNbr ;
    $scope.buyerId ;
    $scope.buyerName ;
    
    $scope.userId = commonAppService.getloggedInUserId();
    $scope.userType = commonAppService.getloggedInUserType();
        
    console.log("In App controller ; UID and Type =>"+$scope.userId+"-"+$scope.userType);
       
    $scope.alertOrderConfirmed = function() {
        var alertPopup = $ionicPopup.alert({
            title: 'You\'r order is in process!',
            template: 'Thank YOU for placing the order'
        });
        alertPopup.then(function(res) {
            console.log('Alert confirmed ');
            $state.go('app.buyer');
        });
    };
        
        
    $scope.pickProducts=function(name,id,buyerId){
        $timeout(function() {
          console.log('DEBUG: $state.go for buy products');
          $state.go('app.buyer.buyProducts',{ sellerName: name,uid_seller:id, buyer_uid:buyerId });
        });
    };

        $scope.buyerOrders=function(buyerId){
            
            $scope.buyerId = buyerId;
            ProductInfo.getOrders($scope.buyerId).then(function(items){
            console.log("Controller(AppCtrl); Func(getOrders) ; Len(getOrders):"+items.length+"--"+$scope.buyerId);
                $scope.orders = items;
            });
            LoadAppInfo.getBuyerDetails($scope.buyerId).then(function(buyerDetails){
                console.log("JSON stringify value is "+JSON.stringify(buyerDetails));
                $scope.buyerName = buyerDetails[0].first_name;
            });
        };
        var adjusting = false;
        
        $scope.scrollMirror = function(from, to) {
            console.log("In Scroll Mirror - load App controller "+adjusting);
                if (adjusting) {
                  adjusting = false;
                } else {
                  // Mirroring zoom level
                  var zoomFrom = $ionicScrollDelegate.$getByHandle(from).getScrollView().getValues().zoom;
                  var zoomTo = $ionicScrollDelegate.$getByHandle(to).getScrollView().getValues().zoom;
                  console.log("In Scroll Mirror - zoom from "+zoomFrom);
                  console.log("In Scroll Mirror - zoom tp "+zoomTo);
                  if (zoomFrom != zoomTo) {
                    $ionicScrollDelegate.$getByHandle(to).getScrollView().zoomTo(zoomFrom);
                  }

                  // Mirroring left position
                  $ionicScrollDelegate.$getByHandle(to).scrollTo($ionicScrollDelegate.$getByHandle(from).getScrollPosition().left,
                  $ionicScrollDelegate.$getByHandle(to).getScrollPosition().top);

                  adjusting = true;
                }
        };
        
        //$scope.buyerOrders();
        //Use this function to get all Sellers associated with logged in Buyer
        $scope.getSellersForBuyer = function() {
            console.log("In getSellersForBuyer within load App controllers");
            LoadAppInfo.getSellersForBuyer().then(function(sellers){
                console.log("From DB Sellers length"+sellers.length);
                $scope.sellersAssociated = sellers;
                angular.forEach($scope.sellersAssociated,function(value,key){
                    $scope.sellersAssociated[key].imgpath="img/sellers/images-"+key+".jpeg";
                });
                console.log("$scope.sellersAssociated-"+JSON.stringify($scope.sellersAssociated));
                console.log("$scope.sellersAssociated-"+$scope.sellersAssociated.length);
                
            });
        };
        $scope.getSellersForBuyer();
        $scope.viewSellerOrders = function(sellerId){
               $scope.sellerId = sellerId;
               console.log("In AppCtrl , viewSellerOrders() - Seller Id- "+sellerId);
               $scope.sellerOrders=[];
               $scope.buyerName;
               SellerInfo.getSellerOrders(sellerId).then(function(orders){
                    console.log("In getSellerOrders() of SellerInfo--"+orders.length);
                    $scope.sellerOrders = orders;
                    //$state.go("app.seller.orderDetails");
                });
               console.log("In AppCtrl , sdfsdf "+sellerId);
        };
        $scope.orderChkbox = {prodid:[]};
         
        $scope.viewOrderDetails = function(orderId,buyerId){
               console.log("SellerOrderCtrl / in viewOrderDetails() function "+$state.current.name+"-"+$state.$current.url);
               console.log("is state? "+$state.is("app.seller.orderDetails")+"="+orderId+"--"+buyerId);
               
               $scope.orderDetails=[];
               SellerInfo.getOrdersDetails(orderId).then(function(details){
                    console.log("In viewOrderDetails/getOrdersDetails() of AppCtrl--"+details.length);
                    $scope.orderDetails = details;
                    angular.forEach($scope.orderDetails,function(value,key){
                        $scope.orderDetails[key].checked=false;
                    });
                   console.log("Order Details JSON  in load App "+JSON.stringify($scope.orderDetails));
                });
               LoadAppInfo.getBuyerDetails(buyerId).then(function(buyerDetails){
                   console.log("In viewOrderDetails/getBuyerDetails() of AppCtrl--"+buyerDetails.length);
                    //console.log("JSON Buyer stringify value is "+JSON.stringify(buyerDetails));
                    $scope.shopName = buyerDetails[0].shop_name;
                    $scope.buyerDetails = buyerDetails;
                });
               $state.go("app.seller.orderDetails");
               console.log("JSON stringify value is "+JSON.stringify($scope.orderDetails));
               console.log("JSON product id selected are is "+JSON.stringify($scope.orderChkbox));
           };  

    };
    kitApp.controller('AppCtrl',funcLoadApp);
    
   
}());
