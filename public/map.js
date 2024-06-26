var userLocation = {
    lat:22.728050000000003,
    lng:75.80407000000001
}

var driverCoordinates = {
    lat:22.7288683,
    lng:75.8069523
}

var radius = 500;


var map;
var directionsService;
var directionsRenderer;

function initMap() {
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();

    navigator.geolocation.getCurrentPosition(function(position) {
        // Get the current location
        var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };

        map = new google.maps.Map(document.getElementById('map'), {
            center: pos,
            zoom: 13
        });
    });

    directionsRenderer.setMap(map);

    var sourceInput = document.getElementById('source');
    var destInput = document.getElementById('dest');

    var sourceAutocomplete = new google.maps.places.Autocomplete(sourceInput);
    var destAutocomplete = new google.maps.places.Autocomplete(destInput);

    google.maps.event.addListener(sourceAutocomplete, 'place_changed', function () {
        var place = sourceAutocomplete.getPlace();
        if (!place.geometry) {
            window.alert("No details available for input: '" + place.name + "'");
            return;
        }
    });

    google.maps.event.addListener(destAutocomplete, 'place_changed', function () {
        var place = destAutocomplete.getPlace();
        if (!place.geometry) {
            window.alert("No details available for input: '" + place.name + "'");
            return;
        }
    });
}

function calcRoute() {
    var source = document.getElementById('source').value;
    // console.log()
    var dest = document.getElementById('dest').value;
    // console.log(dest)

    var request = {
        origin: { lat:22.728050000000003,
            lng:75.80407000000001},
        destination: dest,
        travelMode: 'DRIVING',
        provideRouteAlternatives: true
    };

    directionsService.route(request, function (result, status) {
        if (status == 'OK') {
            directionsRenderer.setDirections({routes: []});

            result.routes.sort(function (a, b) {
                return a.legs[0].distance.value - b.legs[0].distance.value;
            });

            var routeCoordinates = [];

            for (var i = 0; i < result.routes.length; i++) {
                var routeColor = '#ADD8E6';

                var rendererOptions = {
                    map: map,
                    directions: result,
                    routeIndex: i,
                    polylineOptions: {
                        strokeColor: routeColor,
                        strokeWeight: 4,
                        strokeOpacity: 0.8
                    }
                };
                var renderer = new google.maps.DirectionsRenderer(rendererOptions);

                var path = result.routes[i].overview_path;
                var coords = [];
                for (var j = 0; j < path.length; j++) {
                    coords.push({lat: path[j].lat(), lng: path[j].lng()});
                    console.log({lat: path[j].lat(), lng: path[j].lng()})
                }
                routeCoordinates.push(coords);

                if (compareCoordinates(coords, ar)) {
                    renderer.setOptions({
                        polylineOptions: {
                            strokeColor: '#8B0000'
                        }
                    });
                }

                // Check if any point in the route is within 500 meters of the user's location
                if (isWithinRadius(coords, userLocation, 500)) {
                    alert('Driver is within 500 meters of your location!');
                }
            }

            console.log(routeCoordinates);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
    
}

function checkWithinRadius() {
    if (isWithinRadius(driverCoordinates, userLocation, radius)) {
        alert('Driver is within ' + radius + ' meters of your location!');
    } else {
        alert('Driver is not within ' + radius + ' meters of your location.');
    }
}

function isWithinRadius(coordinates, userLocation, radius) {
    for (var i = 0; i < coordinates.length; i++) {
        var distance = google.maps.geometry.spherical.computeDistanceBetween(
            new google.maps.LatLng(coordinates[i].lat, coordinates[i].lng),
            new google.maps.LatLng(userLocation.lat, userLocation.lng)
        );

        if (distance <= radius) {
            return true;
        }
    }

    return false;
}



function plotShortestPath() {
    var source = document.getElementById('source').value;
    var dest = document.getElementById('dest').value;

    var request = {
        origin: source,
        destination: dest,
        travelMode: 'DRIVING'
    };

    directionsService.route(request, function (result, status) {
        if (status == 'OK') {
            directionsRenderer.setDirections({routes: []});

            var rendererOptions = {
                map: map,
                directions: result,
                polylineOptions: {
                    strokeColor: '#006400', // Dark green color for shortest route
                    strokeWeight: 6,
                    strokeOpacity: 0.8
                }
            };
            var renderer = new google.maps.DirectionsRenderer(rendererOptions);
            renderer.setMap(map);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}

function compareCoordinates(route, ar) {
    if (route.length !== ar.length) {
        return false;
    }

    for (var i = 0; i < route.length; i++) {
        if (route[i].lat !== ar[i].lat || route[i].lng !== ar[i].lng) {
            return false;
        }
    }

    return true;
}

google.maps.event.addDomListener(window, 'load', initMap);