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

        driverUserBig.addEventListener('click', function() {
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

// Usage:
let details = [
    {location: 'G-7 : Palasia, Indore', orderId: 'Rohit Patel', time: '9:45 AM, Thursday', lat: 22.7196, lng: 75.8577},
    {location: 'G-13 : MG Road, Indore', orderId: 'Sneha Verma', time: '10:00 AM, Thursday', lat: 22.7244, lng: 75.8838},
    {location: 'G-19 : RNT Marg, Indore', orderId: 'Priya Singh', time: '10:20 AM, Thursday', lat: 22.7164, lng: 75.8765}
];

generateDriverUserBigElement(2, details);