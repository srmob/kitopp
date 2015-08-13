(function(){
       
    var funcSellerOrders = function($scope,$stateParams,SellerInfo,$filter,$state,$cordovaEmailComposer,$ionicLoading,commonAppService,$ionicModal,$ionicPopup,ApiEndpoint){
            
        console.log("In SellerCtrl");
        $scope.userId = commonAppService.getloggedInUserId();
        $scope.userType = commonAppService.getloggedInUserType();
        
        console.log("In SellerCtrl controller ; UID and Type =>"+$scope.userId+"-"+$scope.userType);
        
        
        /*$scope.viewSellerOrders = function(sellerId){
            $scope.sellerId = sellerId;
            if ($scope.sellerId == null || $scope.sellerId == 0 ){
                $scope.sellerId = commonAppService.getloggedInUserId();
            }
            console.log("In seller Controller , viewSellerOrders() - Seller Id- "+$scope.sellerId);
            SellerInfo.getSellerOrders($scope.sellerId).then(function(orders){
                console.log("In getSellerOrders() of SellerInfo--"+orders.length);
                $scope.sellerOrders = orders;
                //$state.go("app.seller.orderDetails");
            });
            $scope.sellerOrders=[];
        };
        $scope.viewSellerOrders();*/ 
        
        $scope.orderChkbox = {item_id:[]};
        $scope.onlyNumbers = /^[1-9]+[0-9]*/;
        
        $scope.OrderedItemCheckBoxClicked = function(idx,orderItem){
            if (idx != undefined) {
                console.log("checkbox change clicked in seller Order Details Screen for ID# - "+idx);
                console.log("Order Item Details### - "+JSON.stringify( orderItem));
                //Flip the checked flag
                orderItem.checked = !orderItem.checked;
                $scope.orderItemDetails[idx] = orderItem;
                console.log("Order Item Details# - "+JSON.stringify( $scope.orderItemDetails[idx]));
                //console.log("checked flag changed for prd id "+$scope.products[idx].product_id);
                
            }
            
        }
        
        $scope.viewOrderDetails = function(){
           //console.log("SellerOrderCtrl / in viewOrderDetails() function "+$state.current.name+"-"+$state.$current.url);
           //console.log("is state? "+$state.is("app.seller.orderDetails")+"="+orderId+"--"+buyerId);
            console.log("seller order controller - view ordersDetails called for order # "+ $stateParams.orderId);
            $scope.orderId = $stateParams.orderId;
            $scope.orderDetails=[];
            $scope.productImageUrl =ApiEndpoint+"/product/productImage/productId/";
            SellerInfo.getOrdersDetails($stateParams.orderId).then(function(details){
                //console.log("In viewOrderDetails/getOrdersDetails() of SellerOrderCtrl--"+details.length);
                $scope.orderItemDetails = [];
                angular.forEach(angular.fromJson(JSON.stringify(details)),function(value,key){
                   angular.forEach(value.items,function(value1,key1){
                       value1.checked = false;
                   });
                   $scope.orderItemDetails = value.items;
                });
               console.log("order status = "+details[0].order_status);
                $scope.orderStatus  = true;
                if (details[0].order_status == 'closed') {
                    $scope.orderStatus = false;
                }
               console.log("order status, set to false / closed = "+$scope.orderStatus);
                $scope.orderDetails = details;
            });
               console.log("Order Details JSON  in SellerOrderCtrl "+JSON.stringify($scope.orderDetails));
               
               /*$scope.orderItems=[];
               $scope.buyer=[];
               $scope.orderItems.push(details.items);
               console.log("items -"+$scope.orderItems);
               $scope.buyer.push(details.splice(0,1));
               console.log("buyer == "+$scope.buyer);*/
                /*angular.forEach(itemsJSON,function(value,key){
                    $scope.orderDetails.items[key].checked=false;
                });*/
               
               //console.log("Order Details JSON  in SellerOrderCtrl "+JSON.stringify(itemsJSON));
            
           /*LoadAppInfo.getBuyerDetails(buyerId).then(function(buyerDetails){
               console.log("In viewOrderDetails/getBuyerDetails() of AppCtrl--"+buyerDetails.length);
                //console.log("JSON Buyer stringify value is "+JSON.stringify(buyerDetails));
                $scope.shopName = buyerDetails[0].shop_name;
                $scope.buyerDetails = buyerDetails;
            });*/
           //$state.go("app.seller.orderDetails");
           //console.log("JSON stringify value is "+JSON.stringify($scope.orderDetails));
           //console.log("JSON product id selected are is "+JSON.stringify($scope.orderChkbox));
       }; 
        
        $scope.viewOrderDetails();
        
       /* $scope.max = function(arr) {
            return $filter('max')
              ($filter('map')(arr, 'order_tot_amount'));
        }*/
        var finalOrders=[];
        console.log("final orders before process=  "+JSON.stringify($scope.finalOrders));
        $scope.checkStatus = false;
        
        
        //Function to update the flag value, if user has selected any of items in Screen 9
        $scope.updateCheckFlag = function(flag) {
            $scope.checkStatus = flag; 
            console.log("Order Details in Screen 9 checked flag"+$scope.checkStatus);
        };
        //Click of process button on Seller Order Details
        $scope.processOrder = function(orders,orderId){
           //console.log(" Checkbox JSON is "+JSON.stringify($scope.orderChkbox));
            /*var checked = false;
            angular.forEach($scope.orderItemDetails,function(value,key){
               console.log("Order Details in Screen 9 key  "+ key);
               console.log("Order Details in Screen 9 item id "+value.item_id);
               console.log("Order Details in Screen 9 checked "+value.checked);
               if (value.checked) {
                   checked = true;
               }
                console.log("Order Details in Screen 9 checked local value"+checked);
            });*/
            //var orderId;
            var selllerFulfilledOrderList = [];
            
            angular.forEach($scope.orderItemDetails,function(value,key){
                //console.log("checked value "+value.checked+"- Item ID"+value.item_id)
                if(value.checked) {
                    //console.log("checked value "+value.checked+"- Item ID"+value.item_id)
                    selllerFulfilledOrderList.push(value.item_id+"-"+value.order_qty);
                }
            });
            //console.log("Seller's fulfilled order list = "+JSON.stringify(selllerFulfilledOrderList));
            console.log("Order ID = "+orderId);
            //console.log("urlSellerOrderValues = "+urlSellerOrderValues);
            console.log("Seller's fulfilled order list  = "+selllerFulfilledOrderList);
            
            
            SellerInfo.fulFillOrder(selllerFulfilledOrderList).then(function(resultFlag){
                    console.log("Result from Server for order id- "+orderId+"-"+resultFlag);
                    $scope.productImageUrl =ApiEndpoint+"/product/productImage/productId/";
                    if (resultFlag){
                        SellerInfo.getOrdersDetails(orderId).then(function(details){
                            //console.log("In viewOrderDetails/getOrdersDetails() of SellerOrderCtrl--"+details.length);
                            $scope.orderItemDetails = [];
                            angular.forEach(angular.fromJson(JSON.stringify(details)),function(value,key){
                               $scope.orderItemDetails = value.items;
                            });
                            $scope.orderDetails = details;
                            $scope.orderID = details[0].order_id;
                            console.log("In fulFillOrder of SellerOrderCtrl--"+JSON.stringify($scope.orderDetails));
                            console.log("In fulFillOrder of SellerOrderCtrl--"+$scope.orderID );
                            $state.go("app.seller.orderDetails.conf");
                        });
                    }
                    /*if (selllerFulfilledOrderList.length == item[0].rows_added ) {
                        SellerInfo.getOrdersDetails($scope.buyerId).then(function(count){ 
                        console.log("cleared clearedd - ");
                     });
                    }*/

                    //$scope.alertOrderConfirmed();
            });
            
            /*OrderInfo.placeOrder(list,$scope.buyerId).then(function(item){
                    console.log("row count inserted - "+JSON.stringify(item[0].rows_added));
                    console.log("list.length - "+list.length);
                    if (list.length == item[0].rows_added ) {
                        OrderInfo.clearOrderDetailTemp($scope.buyerId).then(function(count){ 
                        console.log("cleared clearedd - ");
                     });
                    }

                    $scope.alertOrderConfirmed();
                });*/
           //$state.go("app.seller.orderDetails.conf");

        };
        
        $ionicModal.fromTemplateUrl('templates/buyerInfo.html', {
            scope: $scope,
            animation: 'mh-slide'
          }).then(function(modal) {
            $scope.modal = modal;
          });
        

        // Triggered in the login modal to close it
        $scope.closeBuyerInfo = function() {
            $scope.modal.hide();
            
        };

        // Open the login modal
        $scope.buyerInfo = function() {
            console.log("Buyer Info triggered")
            $scope.modal.show();
        };
        
        $scope.emailOrder = function(buyerDetails){
            console.log("Order Details in email Order  "+JSON.stringify(buyerDetails));
           
            $scope.alertWIP();
    
            /*var email = {
                to: 'max@mustermann.de',
                cc: 'erika@mustermann.de',
                bcc: ['john@doe.com', 'jane@doe.com'],
                attachments: [
                  'file://img/logo.png',
                  'res://icon.png'
                ],
                subject: 'Cordova Icons',
                body: 'How are you? Nice greetings from Leipzig',
                isHtml: true
              };

             $cordovaEmailComposer.open(email).then(null, function () {
               // user cancelled email
             });*/

        };
        $scope.confirmOrderProcess = function(buyerId,orderId){
            console.log("Confirm Order to Buyer  "+buyerId+" order Id: "+orderId);
            
        }
        $scope.alertWIP = function() {
               var alertPopup = $ionicPopup.alert({
                 title: 'WIP!',
                 template: 'Work-in-progress !!'
               });
               alertPopup.then(function(res) {
                });
                 
        };
           
        console.log("final order JSON is  "+JSON.stringify(finalOrders));
        $scope.finalOrders = finalOrders ;
    };
        
    kitApp.controller('SellerOrderCtrl',funcSellerOrders) ;
    
    var funcCustMgmt = function($scope,$stateParams,SellerInfo){
        $scope.buyersList = [{"name":"A",id:1},{"name":"B",id:2},{"name":"C",id:3}];
        
    };
    kitApp.controller('sellerCustomerMgmtCtrl',funcCustMgmt) ;
    
    

    /*var funcManageProduct = function($scope,$stateParams,$state,commonAppService ){
        
        
    };
    
    kitApp.controller('sellerManageProductCtrl',funcManageProduct) ;*/

}());