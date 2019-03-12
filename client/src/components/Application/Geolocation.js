import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import 'leaflet/dist/leaflet.css';
import React, {Component} from 'react';
import {Marker, Popup} from 'react-leaflet';

export default class Geolocation extends Component {
    constructor(props){
        super(props);
        this.success = this.success.bind(this);

        this.state = {
            latitude: 40.576179,
            longitude: -105.080773,
            location: 'Colorado State University'
        };

        this.getCurrentCoordinates();
    }

    render() {
        return (
            <Marker position={L.latLng(this.state.latitude, this.state.longitude)}
                    icon={this.markerIcon()}>
                <Popup className="font-weight-extrabold">{this.state.location}</Popup>
            </Marker>
        );
    }

    getCurrentCoordinates() {
        try {
            const options = {
                enableHighAccuracy: true,
                maximumAge: 0
            };

            navigator.geolocation.getCurrentPosition(this.success, this.error, options);
        } catch (e) {

        }
    }

    success(pos) {
        const crd = pos.coords;

        this.setState({latitude: crd.latitude, longitude: crd.longitude, location: 'Your current location'});
        //this.props.geolocationCallback(crd);
        console.log(this.state);

        console.log('Your current position is:');
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        console.log(`More or less ${crd.accuracy} meters.`);
    }

    error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    markerIcon() {
        // react-leaflet does not currently handle default marker icons correctly,
        // so we must create our own
        return L.icon({
            iconUrl: icon,
            shadowUrl: iconShadow,
            iconAnchor: [12,40]  // for proper placement
        })
    }
}

