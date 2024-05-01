'use strict'
console.log("map js")

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
            zoom: 20
        });
    });

    directionsRenderer.setMap(map);

    var sourceInput = document.getElementById('source');
    var destInput = document.getElementById('dest');

    var sourceAutocomplete = new google.maps.places.Autocomplete(sourceInput);
    var destAutocomplete = new google.maps.places.Autocomplete(destInput);

    google.maps.event.addListener(sourceAutocomplete, 'place_changed', function() {
        var place = sourceAutocomplete.getPlace();
        if (!place.geometry) {
            window.alert("No details available for input: '" + place.name + "'");
            return;
        }
    });

    google.maps.event.addListener(destAutocomplete, 'place_changed', function() {
        var place = destAutocomplete.getPlace();
        if (!place.geometry) {
            window.alert("No details available for input: '" + place.name + "'");
            return;
        }
    });
}



function calcRoute() {
    var source = document.getElementById('source').value;
    var dest = document.getElementById('dest').value;

    var request = {
        origin: source,
        destination: dest,
        travelMode: 'DRIVING',
        provideRouteAlternatives: true
    };

    directionsService.route(request, function(result, status) {
        if (status == 'OK') {
            directionsRenderer.setDirections({ routes: [] });

            // Calculate the distance between source and destination
            var sourceLatLng = result.routes[0].legs[0].start_location;
            var destLatLng = result.routes[0].legs[0].end_location;
            var distance = google.maps.geometry.spherical.computeDistanceBetween(sourceLatLng, destLatLng);

            if (distance <= 500) {
                // Check if the browser supports notifications
                if ("Notification" in window) {
                    // Request permission to display notifications
                    Notification.requestPermission().then(function (permission) {
                        // If the user grants permission, create and display the notification
                        if (permission === "granted") {
                            var notification = new Notification("Destination is within 500 meters of the source!");
                        }
                    });
                }
            }

            result.routes.sort(function(a, b) {
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
                    coords.push({ lat: path[j].lat(), lng: path[j].lng() });
                }
                routeCoordinates.push(coords);

                if (compareCoordinates(coords, ar)) {
                    renderer.setOptions({
                        polylineOptions: {
                            strokeColor: '#8B0000'
                        }
                    });
                }
            }

            console.log(routeCoordinates);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}



function plotShortestPath() {
    var source = document.getElementById('source').value;
    var dest = document.getElementById('dest').value;

    var request = {
        origin: source,
        destination: dest,
        travelMode: 'DRIVING'
    };

    directionsService.route(request, function(result, status) {
        if (status == 'OK') {
            directionsRenderer.setDirections({ routes: [] });

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