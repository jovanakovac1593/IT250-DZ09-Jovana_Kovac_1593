angular.module('starter')

.controller("MainPageController", function ($rootScope, $scope, $ionicPlatform, $location, $ionicHistory, $localStorage, $ionicFilterBar) {
    if($localStorage.mojiOglasi == undefined) {
      $localStorage.mojiOglasi = [];
    }
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
  $scope.filePath = 'img/kategorija.png';
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

.controller("PostaviOglasController", function ($scope, $ionicSideMenuDelegate, AppZanatlijaFactory, $localStorage) {
    $ionicSideMenuDelegate.toggleLeft();
    $scope.showMe = false;
    AppZanatlijaFactory.getObject('Kategorije')
      .then(function (data) {
        $scope.kategorije = data.results;
      })
      .catch(function () {
          console.log('error');
      });

      $scope.getSubCategory = function() {
        var podkategorije = [];
        AppZanatlijaFactory.getObject('Podkategorije')
          .then(function (data) {
            for(var i = 0; i < data.results.length; i++) {
              if($scope.selectedCategory.objectId == data.results[i].kategorijeID.objectId) {
                podkategorije.push(data.results[i]);
              }
            }
            $scope.podkategorije = podkategorije;
          })
          .catch(function () {
              console.log('error');
          });
        $scope.showMe = true;
      }

      $scope.saveAd = function() {
        Parse.initialize("a4AoXutQ2mf95haI5DU3dJKTYZKX7YXxtzQOsXAS", "pQooKRQFxVeiHGi7iJnbtCdOfvHER8wDQ3RXK6wl");
        var Oglasi = Parse.Object.extend("Oglasi");
        var oglasi = new Oglasi();

        //image
        var fileElement = $("#post-file")[0];
        var filePath = $("#post-file").val();
        $scope.filePath = filePath;
        var fileName = filePath.split("\\").pop();

        if(fileElement.files.length > 0) {
          var file = fileElement.files[0];
          var newFile = new Parse.File(fileName, file);
          newFile.save({
            success: function() {

            },
            error: function(file, error) {
              alert("Error: " + error.message);
            }
          }).then(function(theFile) {
              if($scope.name != undefined && $scope.address != undefined && $scope.selectedSubCategory.objectId != undefined && $scope.workingTime != undefined && $scope.phone != undefined && $scope.description != undefined) {
                oglasi.set("image", theFile);
                oglasi.set("name", $scope.name);
                oglasi.set("podkategorijaID", {"__type":"Pointer","className":"Podkategorije","objectId":""+ $scope.selectedSubCategory.objectId +""});
                oglasi.set("address", $scope.address);
                oglasi.set("workingTime", $scope.workingTime);
                oglasi.set("tel", $scope.phone);
                oglasi.set("opis", $scope.description);
                oglasi.set("likes", 0);
                oglasi.save(null,{
                  success:function(oglasi) {
                    oglasi.save();
                    $localStorage.mojiOglasi.push(oglasi.id);
                    alert('Uspešno ste dodali oglas!');
                  },
                  error:function(oglasi, error) {
                      console.log("Error:" + error.message);

                  }
                });
              } else {
                alert('Morate popuniti sva polja!');
              }
            });
          } else {
            alert('Morate dodati sliku!');
          }
        }
        //end-image
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

.controller("MojiOglasiController", function ($scope, $ionicSideMenuDelegate, AppZanatlijaFactory, $localStorage, $ionicFilterBar) {
    $ionicSideMenuDelegate.toggleLeft();
    AppZanatlijaFactory.getObject('Oglasi')
      .then(function (data) {
        var mojiOglasi = [];
        for(var k = 0; k < $localStorage.mojiOglasi.length; k++) {
          for(var i = 0; i < data.results.length; i++) {
            if(data.results[i].objectId == $localStorage.mojiOglasi[k]) {
              mojiOglasi.push(data.results[i]);
            }
          }
        }
        $scope.oglasi = mojiOglasi;
      })
      .catch(function () {
          console.log('error');
      });

      $scope.deleteAd = function(objectId, $event) {
        $event.preventDefault();
        Parse.initialize("a4AoXutQ2mf95haI5DU3dJKTYZKX7YXxtzQOsXAS", "pQooKRQFxVeiHGi7iJnbtCdOfvHER8wDQ3RXK6wl");
        var Oglasi = Parse.Object.extend("Oglasi");
        var query = new Parse.Query(Oglasi);
        query.get(objectId, {
          success: function(myObj) {
            myObj.destroy({});

            for(var i = 0; i < $localStorage.mojiOglasi.length; i++) {
              if($localStorage.mojiOglasi[i] == objectId) {
                $localStorage.mojiOglasi.splice(i,1);
              }
            }

            alert("Uspešno ste obrisali oglas!");

            AppZanatlijaFactory.getObject('Oglasi')
              .then(function (data) {
                var mojiOglasi = [];
                for(var k = 0; k < $localStorage.mojiOglasi.length; k++) {
                  for(var i = 0; i < data.results.length; i++) {
                    if(data.results[i].objectId == $localStorage.mojiOglasi[k]) {
                      mojiOglasi.push(data.results[i]);
                    }
                  }
                }
                $scope.oglasi = mojiOglasi;
              })
              .catch(function () {
                  console.log('error');
              });
          },
          error: function(object, error) {
            console.log(error.message);
          }
        });
      }
});
