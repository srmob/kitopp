(function(){
    var funcLoadApp = function($scope,$ionicModal,$timeout,$state,$stateParams,LoadAppInfo,ProductInfo,$ionicHistory,$ionicScrollDelegate,$ionicPopup,SellerInfo,commonAppService,$ionicLoading,OrderInfo,ApiEndpoint,LoginInfo){
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
          console.log('DEBUG: $state.go for buy products'+name);
          $state.go('app.buyer.buyProducts',{ shopName: name,uid_seller:id, buyer_uid:buyerId });
        });
    };

    $scope.buyerOrders=function(buyerId){

        var buyerId = buyerId;
        console.log('Buyer Id in LoadApp Controllers is '+buyerId);
        if (buyerId == null || buyerId == 0 ) {
            buyerId = $scope.userId;
            
        }
        
        OrderInfo.getBuyerOrders(buyerId).then(function(items){
            console.log("Controller(OrderItemCtrl); Func(getOrders) ; orders data"+JSON.stringify(items));
            $scope.orders = items;
        });
    };
    
  
    $scope.viewSellerOrders = function(sellerId){
           $scope.sellerId = sellerId;
            if ($scope.sellerId == null || $scope.sellerId == 0 ){
                $scope.sellerId = commonAppService.getloggedInUserId();
            }
           console.log("In AppCtrl , viewSellerOrders() - Seller Id- "+$scope.sellerId);
           $scope.sellerOrders=[];
           $scope.buyerName;
           SellerInfo.getSellerOrders($scope.sellerId).then(function(orders){
                $scope.sellerOrders = orders;
                console.log("Sellers Orders ==>--"+JSON.stringify(angular.fromJson($scope.sellerOrders)));
                //$state.go("app.seller.orderDetails");
            });
    };
    
    if ( $scope.userType  == 'seller' ){
        $scope.viewSellerOrders();
    }
        
        
    //$scope.buyerOrders();
    //Use this function to get all Sellers associated with logged in Buyer
    $scope.getSellersForBuyer = function() {
        console.log("In getSellersForBuyer within load App controllers");
        LoadAppInfo.getSellersForBuyer($scope.userId).then(function(sellers){
            //console.log("From DB Sellers length"+sellers.length);
            $scope.sellersAssociated = sellers;
            angular.forEach($scope.sellersAssociated,function(value,key){
               //$scope.sellersAssociated[key].imgpath="img/sellers/images-"+key+".jpeg";
                 $scope.sellersAssociated[key].imgpath=ApiEndpoint+"/user/fetchShopImage/uid/"+value.uid;
                console.log(" value "+value.uid)
                //$scope.sellersAssociated[key].imgpath="img/sellers/images-"+key+".jpeg";
            });
            console.log("$scope.sellersAssociated-"+JSON.stringify($scope.sellersAssociated));
            console.log("$scope.sellersAssociated-"+$scope.sellersAssociated.length);

        });
    };
    if ( $scope.userType  == 'buyer' ){
        $scope.getSellersForBuyer();
    }
    
    
    $scope.addFavSeller = function (sellerId){
        
        console.log("seller ID-"+sellerId+",buyerID-"+$scope.userId);
        
    }

    $scope.orderChkbox = {prodid:[]};

    $scope.viewOrderDetails = function(orderId,buyerId){
           console.log("SellerOrderCtrl / in viewOrderDetails() function "+$state.current.name+"-"+$state.$current.url);
           console.log("is state? "+$state.is("app.seller.orderDetails")+"="+orderId+"--"+buyerId);
           $state.go("app.seller.orderDetails",{orderId:orderId,buyerId:orderId});
         
           
           console.log("JSON product id selected are is "+JSON.stringify($scope.orderChkbox));
       };  
        
        $scope.logout = function(){
           
           if (navigator.app) {
               
               var alertPopup = $ionicPopup.confirm({
                 title: 'Logout ?',
                 template: 'Are you sure you want to logout?'
               });
               alertPopup.then(function(res) {
                   if(res){
                        console.log('Alert confirmed ');
                        LoginInfo.userLogout();
                        ionic.Platform.exitApp();
                   }else{
                       console.log('Alert cancelled ');
                   }
                });
               
            }else if (navigator.device) {
                alert("device");
                navigator.device.exitApp();
            }
        }

    };
    kitApp.controller('AppCtrl',funcLoadApp);
    
   
}());
