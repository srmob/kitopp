(function(){
       
    var funcSellerOrders = function($scope,$stateParams,SellerInfo, ngTableParams,$filter,$state,$cordovaEmailComposer ){
            
        console.log("In SellerOrderCtrl");
        $scope.viewSellerOrders = function(sellerId){
            $scope.sellerId = sellerId;
            console.log("In seller Controller , viewSellerOrders() - Seller Id- "+sellerId);
            $scope.sellerOrders=[];
        };
              
        var finalOrders=[];
        console.log("final orders before process=  "+JSON.stringify($scope.finalOrders));
        $scope.processOrder = function(orders){
           console.log(" Checkbox JSON is "+JSON.stringify($scope.orderChkbox));
           console.log("Order Details JSON in seller controller  "+JSON.stringify($scope.orderDetails));
           $state.go("app.seller.orderDetails.conf");

        };
        $scope.emailOrder = function(buyerDetails){
            console.log("Order Details in email Order"+JSON.stringify(buyerDetails));
            var email = {
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
             });

        };
           
        console.log("final order JSON is  "+JSON.stringify(finalOrders));
        $scope.finalOrders = finalOrders ;
    };
        
    kitApp.controller('SellerOrderCtrl',funcSellerOrders) ;

}());