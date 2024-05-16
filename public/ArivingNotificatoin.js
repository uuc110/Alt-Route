var userLocation = {
    lat: 22.728050000000003,
    lng: 75.80407000000001
};

var driverCoordinates = {
    lat: 22.7288683,
    lng: 75.8069523
};

var radius = 500;

var map;
var directionsService;
var directionsRenderer;
var busMarker;
var demoCoordinates;
var notificationSent = false;

function initMap() {
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();

    // Create map centered at user's location
    map = new google.maps.Map(document.getElementById('map'), {
        center: userLocation,
        zoom: 13
    });

    directionsRenderer.setMap(map);

    // Generate demo coordinates
    demoCoordinates = generateDemoCoordinates(driverCoordinates, userLocation, 20);

    // Add marker for bus at driver's location
    busMarker = new google.maps.Marker({
        position: driverCoordinates,
        map: map,
        icon: {
            url: "https://maps.google.com/mapfiles/ms/icons/bus.png"
        }
    });

    // Start animation
    animateBus();
}

function animateBus() {
    let index = 0;
    const interval = setInterval(function () {
        if (index < demoCoordinates.length) {
            const nextPosition = demoCoordinates[index++];
            busMarker.setPosition(nextPosition);

            // Check if the bus is within 500m radius of the user's location
            if (!notificationSent && isWithinRadius(nextPosition, userLocation, radius)) {
                // Check if the browser supports notifications
                if ("Notification" in window) {
                    // Request permission to display notifications
                    Notification.requestPermission().then(function (permission) {
                        // If the user grants permission, create and display the notification
                        if (permission === "granted") {
                            var notification = new Notification("Bus is within 500 meters of your location!");
                            notificationSent = true;
                        }
                    });
                }
            }
        } else {
            clearInterval(interval);
        }
    }, 500); // Change the interval as needed
}

function generateDemoCoordinates(start, end, numSteps) {
    const demoCoordinates = [];
    const latStep = (end.lat - start.lat) / numSteps;
    const lngStep = (end.lng - start.lng) / numSteps;

    for (let i = 0; i <= numSteps; i++) {
        const lat = start.lat + latStep * i;
        const lng = start.lng + lngStep * i;
        demoCoordinates.push({lat, lng});
    }

    return demoCoordinates;
}

function generateDriverUserBigElement(num, details) {
    let driverDetails = document.querySelector('.driver-details');

    for (let i = 0; i < num; i++) {
        let driverUserBig = document.createElement('div');
        driverUserBig.className = 'driver-user-BIG';

        let shotInfo = document.createElement('div');
        shotInfo.className = 'shot-info';

        let driverBox = document.createElement('div');
        driverBox.className = 'driver-box';

        let location = document.createElement('span');
        location.className = 'location';
        location.textContent = details[i].location;

        let orderId = document.createElement('span');
        orderId.className = 'order-id';
        orderId.textContent = details[i].orderId;

        driverBox.appendChild(location);
        driverBox.appendChild(orderId);

        let statusOfUser = document.createElement('div');
        statusOfUser.className = 'status-of-user';
        statusOfUser.innerHTML = '<a href="#">on the way</a>';

        let time = document.createElement('span');
        time.className = 'time';
        time.textContent = details[i].time;

        shotInfo.appendChild(driverBox);
        shotInfo.appendChild(statusOfUser);
        shotInfo.appendChild(time);

        driverUserBig.appendChild(shotInfo);

        driverUserBig.addEventListener('click', function () {
            setRouteOrigin(details[i]);
        });

        driverDetails.appendChild(driverUserBig);
    }
}

function setRouteOrigin(detail) {
    // Set the route origin
    let routeOrigin = detail.location;

    // Create a marker at the origin point
    let originMarker = new google.maps.Marker({
        position: {lat: detail.lat, lng: detail.lng},
        map: map,
        title: 'Origin'
    });

    // Create a marker at the destination point
    let destinationMarker = new google.maps.Marker({
        position: {lat: 22.7237757, lng: 75.8281253},
        map: map,
        title: 'Destination'
    });
}


function isWithinRadius(point, center, radius) {
    const distance = google.maps.geometry.spherical.computeDistanceBetween(
        new google.maps.LatLng(point.lat, point.lng),
        new google.maps.LatLng(center.lat, center.lng)
    );

    return distance <= radius;
}

let details = [
    {location: 'G-7 : Palasia, Indore',
        orderId: 'Rohit Patel',
        time: '9:45 AM, Thursday',
        lat: 22.7196,
        lng: 75.8577},
    {
        location: 'G-13 : MG Road, Indore',
        orderId: 'Sneha Verma',
        time: '10:00 AM, Thursday',
        lat: 22.7244,
        lng: 75.8838
    },
    {
        location: 'G-19 : RNT Marg, Indore',
        orderId: 'Priya Singh',
        time: '10:20 AM, Thursday',
        lat: 22.7164,
        lng: 75.8765
    }
];

generateDriverUserBigElement(2, details);

google.maps.event.addDomListener(window, 'load', initMap);