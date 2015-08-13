// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var kitApp = angular.module('starter', ['ionic','ui.unique','checklist-model','ngCordova','ngTable','ngCordova.plugins.sqlite','ionic.ion.autoListDivider','angular.filter'])

/*.constant('ApiEndpoint', {
  url: 'http://localhost:8100/api'
  url: 'http://localhost:8888'
})*/
.constant('ApiEndpoint','http://192.168.0.100:8083')
//.constant('ApiEndpoint','http://192.168.1.2:8083')
//.constant('ApiEndpoint','')

.run(function($ionicPlatform,$cordovaSQLite) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    var deviceID = device.uuid;
    //commonAppService.setDeviceId(deviceID);
    //$root.imeiId = deviceID;
    console.log("Device ID "+deviceID);
    //console.log("Device ID "+deviceID+"-/-"+$root.imeiId);
     /*loggedInUserId;
     loggedInUserType;*/
    /*if (window.cordova){
        
        console.log("***** >>>  Data base copy start... <<<<< **** ");
        window.plugins.sqlDB.copy("dump.sqlite", function() {
            db = $cordovaSQLite.openDB("dump.sqlite");
            console.log("****>>> Data base opened <<<**** "+ JSON.stringify(db));
        }, function(error) {
            console.error("There was an error copying the database: " + JSON.stringify(error));
            db = $cordovaSQLite.openDB("dump.sqlite");
            console.log("****>>> Data base opened from error<<<**** "+ JSON.stringify(db));
        });
    } else{
        db = window.openDatabase("dump.sqlite", '1', 'my', 1024 * 1024 * 100); // browser
    }*/
    if (window.cordova){
        console.log("***** >>>  Data base copy start... <<<<< **** ");
        window.plugins.sqlDB.copy("K_Final.sqlite", function() {
            db = $cordovaSQLite.openDB("K_Final.sqlite");
            console.log("****>>> Data base opened <<<**** "+ JSON.stringify(db));
        }, function(error) {
            console.error("There was an error copying the database: " + JSON.stringify(error));
            db = $cordovaSQLite.openDB("K_Final.sqlite");
            console.log("****>>> Data base opened from error<<<**** "+ JSON.stringify(db));
        });
    } else{
        db = window.openDatabase("K_Final.sqlite", '1', 'my', 1024 * 1024 * 100); // browser
    }
  });
})

.config(function($stateProvider, $urlRouterProvider,$httpProvider) {
  $stateProvider

  
  .state('welcome', {
    url: "/welcome",
    templateUrl: "templates/welcome.html",
    controller: 'loginCtrl'
  })
  
  .state('login',{
    url: "/login",
    templateUrl: "templates/userPin.html",
    controller: 'loginCtrl'
  })
  .state('dologin',{
    url: "/dologin",
    templateUrl: "templates/login.html",
    controller: 'loginCtrl'
  })
  .state('login1',{
    url: "/login1",
    templateUrl: "templates/userPin1.html",
    controller: 'loginCtrl'
  })
  
  .state('register',{
    url: "/register",
    templateUrl: "templates/registration.html",
    controller: 'loginCtrl'
  })
  
  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  /*.state('buyer', {
    url: "/buyer",
    abstract: true,
    templateUrl: "templates/showShops.html",
    controller: 'AppCtrl'
    
  })*/
  
  .state('app.buyer', {
    url: "/showShops",
    views: {
      'menuContent': {
        templateUrl: "templates/showShops.html",
          controller:"AppCtrl"
      }
    }
    
  })
  
  .state('app.orders', {
      url: "/buyerOrders",
      views: {
        'menuContent': {
          templateUrl: "templates/buyerOrders.html",
          controller: 'AppCtrl'
        }
      }
   })
  
  .state('app.buyer.buyProducts', {
      url: "/buyProducts/:sellerName/:uid_seller/:buyer_uid",
      views: {
        'menuContent@app': {
          templateUrl: "templates/buyProducts.html",
          controller: 'ProductslistsCtrl'
        }
      }
    })
  
  .state('app.buyer.buyProducts.summary', {
      url: "/buyOrderSummary/:Uid/:sellerName",
      views: {
        'menuContent@app': {
          templateUrl: "templates/buyOrderSummary.html",
          controller: 'OrderItemCtrl'
        }
      }
   })
  
  
  
  .state('app.browse', {
    url: "/browse",
    views: {
      'menuContent': {
        templateUrl: "templates/browse.html",
        controller: 'loginCtrl' 
      }
    }
  })  
  
  
  
  
  
    /*.state('app.playlists', {
      url: "/playlists",
      views: {
        'menuContent': {
          templateUrl: "templates/playlists.html",
          controller: 'PlaylistsCtrl'
        }
      }
    })*/
  /*.state('buyer', {
      url: "/showShops",
      views: {
        'shopsContent': {
          templateUrl: "templates/showShops.html",
          controller: 'AppCtrl'
        }
      }
    })*/
  
/*  .state('app.buyProducts', {
      url: "/buyProducts/:sellerName",
      views: {
        'menuContent': {
          templateUrl: "templates/buyProducts.html",
          controller: 'ProductslistsCtrl'
        }
      }
    })*/
     
  
  
    /*.state('app.buyProducts.summary', {
      url: "/buyOrderSummary/:Uid",
      views: {
        'menuContent@app': {
          templateUrl: "templates/buyOrderSummary.html",
          controller: 'OrderItemCtrl'
        }
      }
    })*/
  
    .state('app.seller', {
      url: "/sellerOrderSummary",
      views: {
        'menuContent': {
          templateUrl: "templates/sellerOrderSummary_1.html",
          controller: 'SellerOrderCtrl'
        }
      }
    })
  
  .state('app.seller.orderDetails', {
      url: "/sellerOrderDetails",
      views: {
        'menuContent@app': {
          templateUrl: "templates/sellerOrderDetails.html",
          controller: 'SellerOrderCtrl'
        }
      }
    })  
  .state('app.seller.orderDetails.conf', {
      url: "/sellerOrderConfirmation",
      views: {
        'menuContent@app': {
          templateUrl: "templates/sellerOrderConfirmation.html",
          controller: 'SellerOrderCtrl'
        }
      }
    })
  .state('app.single', {
    url: "/playlists/:playlistId",
    views: {
      'menuContent': {
        templateUrl: "templates/playlist.html",
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/welcome');
    /*$httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];*/
});
kitApp.config(['$httpProvider', function($httpProvider) {

        $httpProvider.defaults.useXDomain = true;
        console.log("set XDomain "+$httpProvider.defaults.useXDomain);
        
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
        console.log("set XDomain-1-"+$httpProvider.defaults.useXDomain);

    }

]);

