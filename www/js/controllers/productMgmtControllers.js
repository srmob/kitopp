(function(){
    
    var funcManageProduct = function($scope,$stateParams,$state,commonAppService,ManageProduct,ProductInfo,$ionicPopup,$cordovaCamera,$cordovaDevice, $cordovaFile, $ionicPlatform, $ionicActionSheet, ImageService, FileService,ApiEndpoint ){
        $scope.productFlag = "0";
        $scope.product = {};
        $scope.editProduct = "";
        $scope.products = {};
        $scope.onlyNumbers = /^[1-9]+[0-9]*/;
        
        $scope.userId = commonAppService.getloggedInUserId();
        console.log("user id is "+JSON.stringify($scope.userId));
        $scope.productImageUrl =ApiEndpoint+"/product/productImage/productId/";
        
         $ionicPlatform.ready(function() {
            $scope.images = FileService.images();
            $scope.$apply();
        });
       
        $scope.urlForImage = function(imageName) {
            var trueOrigin = cordova.file.dataDirectory + imageName;
            return trueOrigin;
        }

        $scope.addMedia = function() {
            $scope.hideSheet = $ionicActionSheet.show({
              buttons: [
                { text: 'Take photo' },
                { text: 'Photo from library' }
              ],
              titleText: 'Add images',
              cancelText: 'Cancel',
              buttonClicked: function(index) {
                $scope.addImage(index);
              }
            });
        }
        $scope.addImage = function(type) {
            $scope.hideSheet();
            ImageService.handleMediaDialog(type).then(function(imageURL) {
                console.log("Image URL in controller is "+imageURL);
                $scope.product.product_img_id1 = imageURL;
                $scope.imageURI = imageURL;
                console.log("Image URL in controller from image URI is "+$scope.imageURI);
                $scope.$apply();
            });
        }
        $scope.add = function(){
            $scope.productFlag="add";
        }
        $scope.edit = function(){
            $scope.productFlag="edit";
        }
        $scope.addProduct = function(){
            console.log("Product in add product is "+JSON.stringify($scope.product));
            
            $scope.product.product_img_id1 = $scope.imageURI;
            
            console.log("Image URI is " +$scope.imageURI);
            console.log(" Product Image ID 1 is " +$scope.product.product_img_id1);
            
            
            
            var saveProductToDB ="product[product_catg_id]="+$scope.product.product_catg_id+"&product[product_sub_catg_id]="+$scope.product.product_sub_catg_id+"&product[product_name]="+$scope.product.name+"&product[product_desc]="+$scope.product.desc+"&product[product_mfc_name]="+$scope.product.mfrName+"&product[product_min_qty]="+$scope.product.minQty+"&product[plan][1]="+$scope.product.price_platinum+"&product[plan][2]="+$scope.product.price_gold+"&product[plan][3]="+$scope.product.price_silver;
            
            console.log("Product Details to be added " + saveProductToDB);
            
            ManageProduct.addSellerProduct($scope.userId,saveProductToDB).then(function(result){
                console.log("Product for sellerID - "+$scope.userId+" - are - "+JSON.stringify(result));
                if (result.status == 200) {
                    $scope.alertProductAdd();
                }
               $scope.products  = results;
                //alert("http://localhost:8888/kitaki/product/productImage/productId/"+$scope.products[0].product_id);
            });
        }
        
        $scope.alertProductAdd = function() {
               var alertPopup = $ionicPopup.alert({
                 title: 'Product Addedd Successfully!',
                 template: 'Thank YOU!'
               });
               alertPopup.then(function(res) {
                 console.log('Alert confirmed ');
                 $scope.productFlag = "0";
                 $state.go('app.seller.manageProduct');
               });
        };
        $scope.editProduct = function(){
            console.log("Product Edit "+JSON.stringify($scope.product));
        }
        $scope.resetProduct = function(){
            $scope.product = {};
            console.log("Product"+JSON.stringify($scope.product));
        }
        $scope.resetProduct();
        /*$scope.resetProduct = function(){
            $scope.product = {};
            console.log("Product"+JSON.stringify($scope.product));
        }*/
        
        // Populate the drop down list for category and related subcategories
        $scope.getAllProductCategories = function() {
            ProductInfo.getAllProdCatg($scope.userId).then(function(products){
              $scope.productCatg = products;
            });
        }
        $scope.getAllProductCategories();
        
        
        $scope.getProductsForSeller = function(){
            ManageProduct.getSellersProducts($scope.userId).then(function(results){
                console.log("Products for sellerID - "+$scope.userId+" - are - "+JSON.stringify(results));
                $scope.products  = results;
                //alert("http://localhost:8888/kitaki/product/productImage/productId/"+$scope.products[0].product_id);
            });
             
           
        }
        $scope.getProductsForSeller();
        
        
        $scope.selectProductEdit = function(product_id){
            console.log("Edit product id : "+product_id+"-for seller id-"+$scope.userId);
            $state.go("app.seller.manageProduct.edit",{productId:product_id,sellerId:$scope.userId});
        }
        
        /*$scope.editProductDetails = function(product_id){
            console.log("Edit product id  in edit(): "+product_id+"-for seller id-"+$scope.userId);
            if (! product_id == 0 || product_id == 'undefined' || product_id == null ) {
                productInfo.getProductDetailsForEdit(product_id).then(function(results){
                console.log("Product# for Edit - "+product_id+" - is - "+JSON.stringify(results.data));
                $scope.editProduct  = results.data;
                $state.go("app.seller.manageProductEdit",{productId:product_id,sellerId:$scope.userId,reload: false});
                console.log("Product# for Editing - "+product_id+" - is - "+JSON.stringify($scope.editProduct));
            });
            }
        }
        $scope.editProductDetails();*/
        
        $scope.takePicture = function() {
            var options = { 
                quality : 75, 
                destinationType : Camera.DestinationType.DATA_URL, 
                sourceType : Camera.PictureSourceType.CAMERA, 
                allowEdit : false,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 100,
                targetHeight: 100,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false
            };

            $cordovaCamera.getPicture(options).then(function(imageData) {
                console.log(" &&&&& Image from camera is--->"+imageData)
                $scope.imgURI = "data:image/jpeg;base64," + imageData;
            }, function(err) {
                // An error occured. Show a message to the user
                 console.log(" *** Error in camera function--->"+err);
            });
            
            /*console.log('Getting camera');
            Camera.getPicture({
              quality: 75,
              targetWidth: 100,
              targetHeight: 100,
              saveToPhotoAlbum: true
            }).then(function(imageURI) {
              console.log(imageURI);
              $scope.lastPhoto = imageURI;
            }, function(err) {
              console.err(err);
            });*/
            // new line to be added
        };
        
        /*$scope.getLibPicture = function(){
            console.log(" &&&&& Image from Library is--->"+imageData);
            navigator.camera.getPicture(onSuccess, onFail, { quality: 95,
                destinationType: Camera.DestinationType.PHOTOLIBRARY;
            });
        }
        
        function onSuccess(imageData) {
            var image = document.getElementById('myImage');
            image.src = "data:image/jpeg;base64," + imageData;
        }

        function onFail(message) {
            alert('Failed because: ' + message);
        }*/
    
    };
    
    kitApp.controller('sellerManageProductCtrl',funcManageProduct) ;
    
     var funcEditProduct = function($scope,$stateParams,$state,commonAppService,ManageProduct,ProductInfo,$ionicPopup ){
         
        $scope.product = "";
         $scope.onlyNumbers = /^[1-9]+[0-9]*/;
        
         
        
        $scope.userId = commonAppService.getloggedInUserId();
        
        $scope.resetProduct = function(){
            $scope.product = {};
            console.log("Product"+JSON.stringify($scope.product));
        }
        
        // Populate the drop down list for category and related subcategories
        $scope.getAllProductCategories = function() {
            
            ProductInfo.getAllProdCatg($scope.userId).then(function(products){
              $scope.productCatg = products;
                console.log(" Product category "+JSON.stringify($scope.productCatg)+" User id : "+$scope.userId);
            });
        }
        $scope.getAllProductCategories();
        
        $scope.editProductDetails = function(){
            product_id = $stateParams.productId;
            console.log("Edit product id  in edit(): "+product_id+"-for seller id-"+$scope.userId);
            ManageProduct.getProductDetailsForEdit(product_id).then(function(results){
                console.log("Product# for Edit - "+product_id+" - is - "+JSON.stringify(results.data));
                $scope.product  = results.data;
            });
        }
        $scope.editProductDetails();
        console.log("Product# for Editing1 - is - "+JSON.stringify($scope.product));
        //$scope.product= productDetails;
        
        $scope.editProduct = function(product){
            
            /* 
            */
            product_id = $stateParams.productId;
            
            var price_platinum, price_gold, price_silver;
            angular.forEach($scope.product.price,function(value,key){
                 console.log("value is "+value.category_id);           
                 console.log("value is "+value.product_price);           
                 console.log("key is "+key);  
                
                if(value.category_id == 1 ) {
                    price_platinum = value.product_price;
                }else if(value.category_id == 2 ) {
                    price_gold = value.product_price;
                }else if(value.category_id == 3 ) {
                    price_silver = value.product_price;
                }
                            
            });
            
            var updateProductDetails ="product[product_catg_id]="+$scope.product.product_catg_id+"&product[product_sub_catg_id]="+$scope.product.product_sub_catg_id+"&product[product_name]="+$scope.product.product_name+"&product[product_desc]="+$scope.product.product_desc+"&product[product_mfc_name]="+$scope.product.product_mfc_name+"&product[product_min_qty]="+$scope.product.product_min_qty+"&product[plan][1]="+price_platinum+"&product[plan][2]="+price_gold+"&product[plan][3]="+price_silver;
            
            console.log("Product Edit "+JSON.stringify($scope.product));
            console.log("Product Edit URL parameter"+updateProductDetails);
            ManageProduct.updateProductDetails(product_id,updateProductDetails,$scope.userId).then(function(results){
                console.log("Product# for Edit - "+product_id+" - is - "+JSON.stringify(results.data));
                //$scope.product  = results.data;
                if (results.status == 200) {
                    $scope.alertProductEdit();
                }
            });
        }
        
        $scope.alertProductEdit = function() {
               var alertPopup = $ionicPopup.alert({
                 title: 'Product Updated Successfully!',
                 template: 'Thank YOU!'
               });
               alertPopup.then(function(res) {
                 console.log('Alert confirmed ');
                 $scope.productFlag = "0";
                 $state.go('app.seller.manageProduct');
               });
        };
        
    };
    
    kitApp.controller('editProductCtrl',funcEditProduct) ;

}());