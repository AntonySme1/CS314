/*  functions for supporting geolocation
*/

//default location if geolocation doesn't work is the CSU oval
const coordinates = {latitude: 40.576179,
    longitude: -105.080773,
    location: 'Colorado State University'};

export function getCurrentCoordinates() {
    renderGeolocation();
    return L.latLng(latitude, longitude);
}

export function currentLocationPopup() {
    return coordinates.location;
}

function renderGeolocation() {
    var options = {
        enableHighAccuracy: true,
        maximumAge: 0
    };
    try {
        navigator.geolocation.getCurrentPosition(success, error, options);
    }
    catch (e) {

    }
}

function success(pos) {
    var crd = pos.coords;

    coordinates.location = "your current location";
    coordinates.latitude = crd.latitude;
    coordinates.longitude = crd.longitude;

    console.log('Your current position is:');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
}

function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}
