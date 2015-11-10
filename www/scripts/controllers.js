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
	var subCategories = [];
	//PARSE
	Parse.initialize("a4AoXutQ2mf95haI5DU3dJKTYZKX7YXxtzQOsXAS", "pQooKRQFxVeiHGi7iJnbtCdOfvHER8wDQ3RXK6wl");
	var Oglasi = Parse.Object.extend("Oglasi");
	var query = new Parse.Query(Oglasi);
	//END PARSE

	AppZanatlijaFactory.getObject('Podkategorije')
		.then(function (data) {
			for(var i = 0; i < data.results.length; i++) {
				if(data.results[i].kategorijeID.objectId == id) {
					subCategoriesArray.push(data.results[i]);
				}
			}
			angular.forEach(subCategoriesArray, function(obj){
				AppZanatlijaFactory.numberOfAds(obj.objectId)
				  .then(function (number) {
						obj.numOfAds = number;
				  })
				  .catch(function () {
					  console.log('error');
				  });
			});
		})
		.catch(function () {
			console.log('error');
		});
		$scope.podkategorije = subCategoriesArray;
})

.controller("ListaZanatlijaController", function ($ionicFilterBar, $rootScope, $ionicHistory, $stateParams, $scope, AppZanatlijaFactory, $ionicSideMenuDelegate, $stateParams, $localStorage, $ionicScrollDelegate, $state) {
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
			//search
			var filterBarInstance;

			function getItems () {
		      var items = $scope.zanatlije;
		      $scope.items = items;
		    }

		    getItems();

			$rootScope.showFilterBar = function () {
			  filterBarInstance = $ionicFilterBar.show({
				items: $scope.items,
				update: function (filteredItems, filterText) {
				  $scope.items = filteredItems;
				  if (filterText) {
				  }
				},
				  filterProperties: ['name']
			  });
			};
			//END search
		})
		.catch(function () {
				console.log('error');
		});
})

.controller("OglasSingleController", function ($scope, $cordovaSocialSharing, $ionicSideMenuDelegate, $ionicPlatform, AppZanatlijaFactory, $stateParams, $localStorage) {
	$scope.listCanSwipe = true;
	$scope.refreshVal = false;
	$scope.filePath = 'img/kategorija.png';



	var id = $stateParams.zanatlijaId;
	AppZanatlijaFactory.getObject('Oglasi')
		.then(function (data) {
			var oglasImage;
			var oglasName;
			var androidLink;
			var iosLink;
			for(var i = 0; i < data.results.length; i++) {
				if(data.results[i].objectId == id) {
					$scope.zanatlija = data.results[i];
					oglasImage = data.results[i].image.url;
					oglasName = data.results[i].name;
				}
			}

			AppZanatlijaFactory.getObject('ShareLink')
				.then(function (data) {
					androidLink = data.results[0].android;
					iosLink = data.results[0].ios;

					$scope.shareAnywhere = function() {
								$cordovaSocialSharing.share("Pogledajte moj oglas na aplikaciji Zanatlija za " + (ionic.Platform.isAndroid() == true ? "Android" : "IOS") + ": " + oglasName, "Koristim Zanatlija aplikaciju", oglasImage, (ionic.Platform.isAndroid() == true ? androidLink : iosLink));
					}

				})
				.catch(function () {
						console.log('error');
				});

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
})

.controller("OdaberiOpstinuController", function ($ionicHistory, $rootScope, $scope, AppZanatlijaFactory, $ionicSideMenuDelegate, $stateParams, $localStorage, $ionicScrollDelegate, $state) {
	$ionicSideMenuDelegate.toggleLeft();
    $scope.listCanSwipe = true;
	$scope.refreshVal = false;
	AppZanatlijaFactory.getObject('Opstina')
		.then(function (data) {
			$scope.opstine = data.results;
		})
		.catch(function (object, error) {
				console.log('error');
		});
})

.controller("UsloviKoriscenjaController", function ($scope, $ionicSideMenuDelegate, AppZanatlijaFactory) {
	$ionicSideMenuDelegate.toggleLeft();
})

.controller("AboutUsController", function ($scope, $ionicSideMenuDelegate) {
	$ionicSideMenuDelegate.toggleLeft();
})

.controller("MapaSingleController", function ($scope, $ionicSideMenuDelegate, $ionicLoading, $compile, $window, $stateParams) {
	function initialize() {
		var map = new google.maps.Map(document.getElementById('map'), {
			zoom: 17,
			center: {lat: -34.397, lng: 150.644}
		});
		var geocoder = new google.maps.Geocoder();
		geocodeAddress(geocoder, map);
		$scope.map = map;
	}
	function geocodeAddress(geocoder, resultsMap) {
	  var address = $stateParams.address;
	  geocoder.geocode({'address': address}, function(results, status) {
	    if (status === google.maps.GeocoderStatus.OK) {
	      resultsMap.setCenter(results[0].geometry.location);
	      var marker = new google.maps.Marker({
	        map: resultsMap,
	        position: results[0].geometry.location
	      });
	    } else {
	      alert('Geocode was not successful for the following reason: ' + status);
	    }
	  });
	}

	    $window.initialize = initialize; // callback in global context

	    function loadScript(src) {
	        var script = document.createElement("script");
	        script.type = "text/javascript";
	        document.getElementsByTagName("head")[0].appendChild(script);
	        script.src = src;
	    }

	    loadScript('http://www.google.com.mt/jsapi');
	    loadScript('http://maps.googleapis.com/maps/api/js?key=&v=3&sensor=true&callback=initialize');



	    $scope.centerOnMe = function () {
	        if (!$scope.map) {
	            return;
	        }

	        $scope.loading = $ionicLoading.show({
	            content: 'Getting location',
	            showBackdrop: false
	        });

	        navigator.geolocation.getCurrentPosition(function (pos) {
	            $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
	            $scope.loading.hide();
	        }, function (error) {
	            alert('Unable to get location: ' + error.message);
	        });
	    };

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
