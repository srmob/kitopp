(function(){
    var funcLoadApp = function($scope,$ionicModal,$timeout,$state,$stateParams,LoadAppInfo,ProductInfo){
      $scope.loginData = {};
      $scope.imeiNbr ;
      $scope.buyerId ;
      $scope.buyerName ;
        
    console.log("In App controller ");
      /*$cordovaIMEI.get().then(function(imei){
            console.log("the imei:", imei);
            $scope.imeiNbr = imei;
       }, function(){
            console.log("something went wrong");
       })*/
      // Create the login modal that we will use later
      $ionicModal.fromTemplateUrl('templates/login.html', {
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
      };
        
        $scope.pickProducts=function(name,id,buyerId){
            /*console.log("seller Name is "+e);
            console.log("State Invoked"+"-"+$state.current.name+"-"+$state.$current.url)*/
            console.log("Seller:-"+name+"-buyer:-"+buyerId+"-ID:-"+id);
            $state.go('app.buyer.buyProducts',{ sellerName: name,uid_seller:id, buyer_uid:buyerId });
            //console.log("State Invoked 1   "+"-"+$state.current.name+"-"+$state.$current.url)
            
        };

        $scope.buyerOrders=function(buyerId){
            /*console.log("seller Name is "+e);
            console.log("State Invoked"+"-"+$state.current.name+"-"+$state.$current.url)*/
            console.log("-buyer ID:-"+buyerId);
            $scope.buyerId = buyerId;
            ProductInfo.getOrders(buyerId).then(function(items){
                console.log("Controller(AppCtrl); Func(getOrders) ;                                                                   Len(getOrders):"+items.length+"--"+buyerId);
                $scope.orders = items;
            });
            LoadAppInfo.getBuyerDetails(buyerId).then(function(buyerDetails){
                //console.log("Controller(AppCtrl); Func(getBuyerDetails) ;                                                                   Len(buyerDetails):"+buyerDetails.length+"--"+buyerDetails[0].First_name);
                console.log("JSON stringify value is "+JSON.stringify(buyerDetails));
                $scope.buyerName = buyerDetails[0].First_name;
            });
            $state.go('app.buyer.buyerOrders',{ Uid: buyerId });
            //console.log("State Invoked 1   "+"-"+$state.current.name+"-"+$state.$current.url)
            
        };
        
        //$scope.buyerOrders();
        //Use this function to get all Sellers associated with logged in Buyer
        $scope.getSellersForBuyer = function() {
            console.log("In getSellersForBuyer ");
            LoadAppInfo.getSellersForBuyer().then(function(sellers){
                console.log("From DB Sellers length"+sellers.length);
                $scope.sellersAssociated = sellers;
                angular.forEach($scope.sellersAssociated,function(value,key){
                    $scope.sellersAssociated[key].imgPath="img/sellers/images-"+key+".jpeg";
                });
                if($scope.sellersAssociated.length > 0){
                    $state.go('app.buyer');
                }
                
            });
            
        }
        $scope.getSellersForBuyer();

       /*$scope.sellers=[
           {name:"A", imgPath:"img/sellers/images-1.jpeg", id:1001},
           {name:"B", imgPath:"img/sellers/images-2.jpeg", id:1001},
           {name:"C", imgPath:"img/sellers/images-3.jpeg", id:1001},
           {name:"D", imgPath:"img/sellers/images-4.jpeg", id:1001},
           {name:"E", imgPath:"img/sellers/images-5.jpeg", id:1001},
           {name:"F", imgPath:"img/sellers/images-6.jpeg", id:1001},
           {name:"G", imgPath:"img/sellers/images-7.jpeg", id:1001},
           {name:"H", imgPath:"img/sellers/images-8.jpeg", id:1001},
           {name:"I", imgPath:"img/sellers/images-9.jpeg", id:1001},
           {name:"J", imgPath:"img/sellers/images-10.jpeg", id:1001},
           {name:"K", imgPath:"img/sellers/images-11.jpeg", id:1001},
           {name:"L", imgPath:"img/sellers/images-12.jpeg", id:1001},
           {name:"M", imgPath:"img/sellers/images-13.jpeg", id:1001},
           {name:"N", imgPath:"img/sellers/images-14.jpeg", id:1001}
       ];*/
        

        
    };
    
    kitApp.controller('AppCtrl',funcLoadApp);
    
    var funcBrwseProd = function($scope,ProductInfo,$state, $stateParams,ProductInfo,$filter){
        console.log("In ProductList controller "+$stateParams.sellerName+"-"+$stateParams.uid_seller+"-"+$stateParams.buyer_uid);
        $scope.sellerName = $stateParams.sellerName;
        $scope.sellerID = $stateParams.uid_seller;
        $scope.buyerId = $stateParams.buyer_uid;
        $scope.productCatg = [];
        $scope.products = [] ;
        $scope.selectedProducts = [];
        
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
        
        $scope.getProductsForID = function(subProdCatgId){
            
            ProductInfo.getProductsListsForSellerID($stateParams.uid_seller,subProdCatgId).then(function(items){
                //console.log(" In getProductsForID controller method  , prod_sub_catg_id = "+subProdId);
                $scope.products = items;
                //console.log("Controller(BrowseProducts); Func(getProductsListsForSellerID); products  length = "+$scope.products.length);
                
            });
        }
        //$scope.getProductsForID();
        
        $scope.checkboxes = {prodid:[]};
    
        /*$scope.finalProducts=[ ];
        angular.forEach($scope.finalProducts, function(value,key) {
          $scope.finalProducts[key].uid_buyer=$scope.buyerId;
        });*/
        
        /*$scope.saveSelectedProducts = function(subProdCatgId){
            
            ProductInfo.getProductsListsForSellerID(subProdCatgId).then(function(items){
                //console.log(" In getProductsForID controller method  , prod_sub_catg_id = "+subProdId);
                $scope.products = items;
                console.log("Controller(BrowseProducts); Func(getAllCategories) ;  filtered products array length = "+$scope.products.length);
                
            });
        }*/
  
        $scope.saveSelectedProducts=function(){
            $scope.finalProducts=[ ];
            //console.log ("Controller(BrowseProducts); Func(saveSelectedProducts) ;  -               "+$state.is('app.buyProducts.summary')+"-"+$state.current.name+"-"+$state.$current.url);
            //$state.go('app.buyProducts.summary',{ Uid: '1001' });
            //console.log(" Controller(BrowseProducts); Func(saveSelectedProducts) ;  $ state invoked ");
            
            angular.forEach($scope.checkboxes.prodid,function(chkValue,chkKey) {
                
                console.log("chkKey from checkboxes = "+chkKey);
                angular.forEach($scope.products, function(value,key) {
                  console.log('Value->'+value.Product_Id+"-Key = "+key);
                    /*$scope.finalProducts[key] = $scope.products[key];
                    $scope.finalProducts[key].uid_buyer = $scope.buyerId ;*/
                  if (value.Product_Id == chkValue ) {
                      console.log("Product Lot Size : "+value.Product_Min_Qty);
                              $scope.finalProducts.push({
                                    uid_buyer: $scope.buyerId,
                                    product_id: value.Product_Id,
                                    price_id: value.Price_Id,
                                    order_qty: value.Product_Min_Qty,
                                    order_date: new Date(),
                                    order_price: value.Product_Price,
                                    order_tot_amount: value.Product_Price,
                                    order_status: "new",
                                    uid_seller: $scope.sellerID
                              });
                      
                      /*finalProducts[i].product_id=value.product_id;
                      finalProducts[i].price_id=2;
                      finalProducts[i].order_qty=value.product_min_qty;
                      finalProducts[i].order_date=new Date();
                      finalProducts[i].order_price=750;
                      finalProducts[i].order_tot_amount=750;
                      finalProducts[i].order_statuse="new";
                      finalProducts[i].uid_seller=1001;
                      finalProducts[i].uid_buyer=$scope.buyerId;*/
                      
                      
                     // $scope.finalProducts.push(finalProducts);
                      console.log("final product array is  "+$scope.finalProducts);
                  }

                  //console.log("Controller(BrowseProducts); Func(saveSelectedProducts) ; final list length = "+$scope.finalProducts.length +"-"+$scope.buyerId);
                });
            });
            
            console.log(" Controller(BrowseProducts); Func(saveSelectedProducts) ; Final Listlength = "+$scope.finalProducts +"-"+$scope.buyerId);
            var data= angular.fromJson($scope.finalProducts);
            console.log("Data value is "+data);
            
            console.log("JSON stringify value is "+JSON.stringify(data));
            
            /*var data1 = $filter('json')($scope.finalProducts);
            console.log("Data1 value is "+data1);*/
            if ($scope.finalProducts.length > 0 ) {
            
                /*angular.forEach($scope.finalProducts, function(value,key) {
                    console.log("final product value"+value.product_name)
                });*/
            ProductInfo.saveProductsList(data).then(function(item){
                console.log("Controller(BrowseProducts); Func(saveProductsList) ;                                                                   Len(items):"+item);
                $state.go('app.buyer.buyProducts.summary',{ Uid: $scope.buyerId });
                
                });
            }
            
        };
        //$scope.saveSelectedProducts();
        
         /*$scope.savedList = [] ;
         //console.log ("Saved List size " +savedList.length);
         $scope.finalSavedProducts = function() {
           // console.log(" Summary Method - saved List called");
            $scope.savedList = ProductInfo.getList();
             console.log(" ** Controller->BrowseProducts ; list length from service getList() = "+$scope.savedList.length);
             
        };
        $scope.finalSavedProducts();*/
         //.controller('ProductslistsCtrl', function($scope, $stateParams, $state)
        
    };
    
        kitApp.controller('ProductslistsCtrl',funcBrwseProd);
        
        var funcOrderItem = function($scope,$stateParams,ProductInfo,$ionicHistory){
            $scope.orders=[];
            /*$scope.backHistory = $ionicHistory.currentHistoryId();
            $scope.backHistory1 = $ionicHistory.viewHistory();
            $scope.backView = $ionicHistory.backView();*/
            $scope.buyerId = $stateParams.Uid;
            console.log(" Controller(OrderItemCtrl); Func(funcOrderItem) ;  "+$stateParams.Uid);
            ProductInfo.getOrders($scope.buyerId).then(function(items){
                console.log("Controller(OrderItemCtrl); Func(getOrders) ;                                                                   Len(getOrders):"+items.length);
                $scope.orders = items;
                
            });
        };
        
        kitApp.controller('OrderItemCtrl',funcOrderItem ) ;
        
        /*var funcSellerOrders = function($scope,$stateParams,ProductInfo, ngTableParams,$filter ){
            //$scope.sellerOrders=[];
            //$scope.buyerName = $stateParams.Uid;
            //console.log(" Controller(SellerOrderCtrl); Func(funcSellerOrders) ;  ");
            /*ProductInfo.getOrders().then(function(items){
                console.log("Controller(BrowseProducts); Func(funcSellerOrders) ;                                                                   Len(getOrders):"+items.length);
                $scope.sellerOrders = items;
                
            });
            
            var sellerOrders=[
                
                {
                    "orderId" : 1 ,"uid_buyer": "ABC" ,"product_id":1,"ord_tot_amount":10000,"uid_seller":1001,
                },
                {
                    "orderId" : 2 ,"uid_buyer": "ABC" ,"product_id":1,"ord_tot_amount":12000,"uid_seller":1001,
                },
                {
                    "orderId" : 3 ,"uid_buyer": "DEF" ,"product_id":1,"ord_tot_amount":10000,"uid_seller":1001,
                },
                {
                    "orderId" : 4 ,"uid_buyer": "DEF" ,"product_id":1,"ord_tot_amount":5000,"uid_seller":1001,
                }
            ];
            
            $scope.tableParams = new ngTableParams({
                page: 1,            // show first page
                count: 10          // count per page
            }, {
                groupBy: 'uid_buyer',
                total: sellerOrders.length,
                getData: function($defer, params) {
                    var orderedData = params.sorting() ?
                            $filter('orderBy')(sellerOrders, $scope.tableParams.orderBy()) :
                            sellerOrders;

                    $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                }
            });

            $scope.calcSum = function(sellerOrders) {
                var sum = 0;
                angular.forEach(sellerOrders, function(item) {
                    sum += item.ord_tot_amount;
                });
                return sum;
            };
            
        };
        
        kitApp.controller('SellerOrderCtrl',funcSellerOrders) ;*/
    
    
        /*angular.module('starter.controllers', [])

        .controller('AppCtrl', function($scope, $ionicModal, $timeout) {
          // Form data for the login modal
          */
    
   
}());

/*
.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})
*/
    //.controller('ProductslistsCtrl', function($scope, $stateParams, $state) {
      
        /*$scope.productCategories = [
        { Product_Catg_Id: "1", UID_Seller: 1001,User_Category_Id: 1 ,Product_Sub_Catg_Id:"2004",Product_Catg_Name:"Electronics",Product_Sub_Catg_Name:"Mobile", Seller_Name:"Sri Ganesh Traders"},
        { Product_Catg_Id: "2", UID_Seller: 1001,User_Category_Id: 1 ,Product_Sub_Catg_Id: "2005",Product_Catg_Name:"Electronics",Product_Sub_Catg_Name:"TV", Seller_Name:"Valmiki Groups" },
        { Product_Catg_Id: "3", UID_Seller: 1001,User_Category_Id: 2 ,Product_Sub_Catg_Id: "2006",Product_Catg_Name:"Electronics",Product_Sub_Catg_Name:"Home Appliances", Seller_Name:"Naveen Traders" },
        { Product_Catg_Id: "4", UID_Seller: 1001,User_Category_Id: 2,Product_Sub_Catg_Id: "2007",Product_Catg_Name:"Kids",Product_Sub_Catg_Name:"Diapers", Seller_Name:"Biharkarmau Co"},
        { Product_Catg_Id: "5", UID_Seller: 1001,User_Category_Id: 2,Product_Sub_Catg_Id: "2008",Product_Catg_Name:"Kids",Product_Sub_Catg_Name:"Toys", Seller_Name:"Colate India Pvt Ltd..'"}
      ];*/
         
       /* $scope.sellers = [
            { title: 'Sri Ganesh Traders', id: 1 },
            { title: 'Valmiki Groups', id: 2 },
            { title: 'Naveen Traders', id: 3 },
            { title: 'Sheela Agencies', id: 4 },
            { title: 'Biharkarmau Co', id: 5 },
            { title: 'Colate India Pvt Ltd..', id: 6 }
      ];*/
    
      /*$scope.products = [
        
               {"UID":1001,"PROD_ID":1,"PROD_SUB_CATG_ID":"2004","PROD_NAME":"LG","PROD_DESC":"LG Smart Phone","PROD_MIN_QTY":16,"Product_Img_Id1":"cover.jpeg"},  
               {"UID":1001,"PROD_ID":2,"PROD_SUB_CATG_ID":"2004","PROD_NAME":"SAMSUNG Edge","PROD_DESC":"Samsung S6 edge","PROD_MIN_QTY":3,"Product_Img_Id1":"cover.jpeg"}, 
               {"UID":1001,"PROD_ID":3,"PROD_SUB_CATG_ID":"2004","PROD_NAME":"SAMSUNG +","PROD_DESC":"Samsung S6 plus","PROD_MIN_QTY":5,"Product_Img_Id1":"cover.jpeg"}, 
               {"UID":1001,"PROD_ID":4,"PROD_SUB_CATG_ID":"2004","PROD_NAME":"Apple iPhone4s","PROD_DESC":"iphone4s","PROD_MIN_QTY":1,"Product_Img_Id1":"cover.jpeg"}, 
               {"UID":1001,"PROD_ID":5,"PROD_SUB_CATG_ID":"2005","PROD_NAME":"Onida","PROD_DESC":"Onida Edge 3D TV","PROD_MIN_QTY":1,"Product_Img_Id1":"cover.jpeg"}, 
               {"UID":1001,"PROD_ID":6,"PROD_SUB_CATG_ID":"2005","PROD_NAME":"MicroMax","PROD_DESC":"Micromax Cureve 50 HD 3D TV","PROD_MIN_QTY":1,"Product_Img_Id1":"cover.jpeg"}
        ];*/
      
        
    /*})


;*/
