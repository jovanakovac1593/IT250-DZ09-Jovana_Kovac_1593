angular.module('starter')

.controller("MainPageController", function ($rootScope, $scope, $ionicPlatform, $location, $ionicHistory, $localStorage, $ionicFilterBar) {
    $scope.myGoBack = function() {
        if($ionicHistory.viewHistory().backView.stateName == 'favorites') {
            $rootScope.onFavorites = true;
            $ionicHistory.goBack();
        } else {
            $rootScope.onFavorites = false;
            $ionicHistory.goBack();
        }
    };
})

.controller("SideBarController", function ($rootScope, $scope, $ionicPlatform, $ionicSideMenuDelegate, $location) {
    $scope.toggleLeft = function () {

        $ionicSideMenuDelegate.toggleLeft();
    }

    $scope.toggleSearch = function () {
        $location.path('/favorites');
        $rootScope.onFavorites = true;
    }
})

.controller("HomeController", function ($ionicHistory, $rootScope, $scope, AppZanatlijaFactory, $ionicSideMenuDelegate, $stateParams, $localStorage, $ionicScrollDelegate, $state) {
    $scope.listCanSwipe = true;
    $scope.refreshVal = false;
    AppZanatlijaFactory.getObject('Kategorije')
      .then(function (data) {
        $scope.kategorije = data.results;
      })
      .catch(function (object, error) {
          console.log('error');
      });
})

.controller("PodkategorijaController", function ($ionicHistory, $rootScope, $scope, AppZanatlijaFactory, $ionicSideMenuDelegate, $stateParams, $localStorage, $ionicScrollDelegate, $state) {
  $scope.listCanSwipe = true;
  $scope.refreshVal = false;
  var id = $stateParams.kategorijaId;
  var subCategoriesArray = [];

  AppZanatlijaFactory.getObject('Podkategorije')
    .then(function (data) {
      for(var i = 0; i < data.results.length; i++) {
        if(data.results[i].kategorijeID.objectId == id) {
          subCategoriesArray.push(data.results[i]);
        }
      }

      $scope.podkategorije = subCategoriesArray;
      $localStorage.subCategories = subCategoriesArray;
    })
    .catch(function () {
        console.log('error');
    });
})

.controller("ListaZanatlijaController", function ($ionicHistory, $stateParams, $scope, AppZanatlijaFactory, $ionicSideMenuDelegate, $stateParams, $localStorage, $ionicScrollDelegate, $state) {
  $scope.listCanSwipe = true;
  $scope.refreshVal = false;
  var id = $stateParams.podkategorijaId;
  var zanatlije = [];

  AppZanatlijaFactory.getObject('Oglasi')
    .then(function (data) {
      for(var i = 0; i < data.results.length; i++) {
        if(data.results[i].podkategorijaID.objectId == id) {
          zanatlije.push(data.results[i]);
        }
      }
      $scope.zanatlije = zanatlije;
      $localStorage.zanatlije = zanatlije;
    })
    .catch(function () {
        console.log('error');
    });
})

.controller("OglasSingleController", function ($scope, $ionicSideMenuDelegate, AppZanatlijaFactory, $stateParams, $localStorage) {
  $scope.listCanSwipe = true;
  $scope.refreshVal = false;
  var id = $stateParams.zanatlijaId;
  AppZanatlijaFactory.getObject('Oglasi')
    .then(function (data) {
      for(var i = 0; i < data.results.length; i++) {
        if(data.results[i].objectId == id) {
          $scope.zanatlija = data.results[i];
        }
      }
    })
    .catch(function () {
        console.log('error');
    });
})

.controller("PostaviOglasController", function ($scope, $ionicSideMenuDelegate, AppZanatlijaFactory) {
    $ionicSideMenuDelegate.toggleLeft();
    AppZanatlijaFactory.getObject('Kategorije')
      .then(function (data) {
        $scope.kategorije = data.results;
      })
      .catch(function () {
          console.log('error');
      });
})

.controller("PretragaController", function ($scope, $ionicSideMenuDelegate, AppZanatlijaFactory) {
    $ionicSideMenuDelegate.toggleLeft();
})

.controller("LajkovaniOglasiController", function ($rootScope, $scope, $ionicSideMenuDelegate, AppZanatlijaFactory, $localStorage, $ionicFilterBar) {
    $ionicSideMenuDelegate.toggleLeft();
    $scope.kategorije = $localStorage.data.Kategorije;
})

.controller("AboutUsController", function ($scope, $ionicSideMenuDelegate) {
    $ionicSideMenuDelegate.toggleLeft();
})

.controller("MojiOglasiController", function ($rootScope, $scope, $ionicSideMenuDelegate, AppZanatlijaFactory, $localStorage, $ionicFilterBar) {
    $ionicSideMenuDelegate.toggleLeft();
    $scope.kategorije = $localStorage.data.Kategorije;
});
