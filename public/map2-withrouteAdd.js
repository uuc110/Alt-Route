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
        const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };

        map = new google.maps.Map(document.getElementById('map'), {
            center: pos,
            zoom: 20
        });
    });

    directionsRenderer.setMap(map);

    demoCoordinates = generateDemoCoordinates(driverCoordinates, userLocation, 100);

    const sourceInput = document.getElementById('source');
    const destInput = document.getElementById('dest');

    const sourceAutocomplete = new google.maps.places.Autocomplete(sourceInput);
    const destAutocomplete = new google.maps.places.Autocomplete(destInput);

    google.maps.event.addListener(sourceAutocomplete, 'place_changed', function() {
        const place = sourceAutocomplete.getPlace();
        if (!place.geometry) {
            window.alert("No details available for input: '" + place.name + "'");
            return;
        }
    });

    google.maps.event.addListener(destAutocomplete, 'place_changed', function() {
        const place = destAutocomplete.getPlace();
        if (!place.geometry) {
            window.alert("No details available for input: '" + place.name + "'");
            return;
        }
    });
}



function calcRoute() {
    const source = document.getElementById('source').value;
    const dest = document.getElementById('dest').value;

    const request = {
        origin: source,
        destination: dest,
        travelMode: 'DRIVING',
        provideRouteAlternatives: true
    };

    directionsService.route(request, function(result, status) {
        if (status == 'OK') {
            directionsRenderer.setDirections({ routes: [] });

            // Calculate the distance between source and destination
            const sourceLatLng = result.routes[0].legs[0].start_location;
            const destLatLng = result.routes[0].legs[0].end_location;
            const distance = google.maps.geometry.spherical.computeDistanceBetween(sourceLatLng, destLatLng);

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

            const routeCoordinates = [];

            for (var i = 0; i < result.routes.length; i++) {
                const routeColor = '#ADD8E6';

                const rendererOptions = {
                    map: map,
                    directions: result,
                    routeIndex: i,
                    polylineOptions: {
                        strokeColor: routeColor,
                        strokeWeight: 4,
                        strokeOpacity: 0.8
                    }
                };
                const renderer = new google.maps.DirectionsRenderer(rendererOptions);

                const path = result.routes[i].overview_path;
                const coords = [];
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

const addRoute = document.querySelector('#add-route');

addRoute.addEventListener('click', function() {
    fetch('http://localhost:5500/add-route')
        .then(response => response.text())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
});

google.maps.event.addDomListener(window, 'load', initMap);