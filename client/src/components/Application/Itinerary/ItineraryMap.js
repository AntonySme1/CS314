import {Map, Marker, Polyline, Popup, TileLayer} from "react-leaflet";
import Geolocation from '../Geolocation';
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import Pane from "../Pane";
import React from "react";
import 'leaflet/dist/leaflet.css';

const renderLeafletMap= (props) => {
  // initial map placement can use either of these approaches:
  // 1: bounds={this.coloradoGeographicBoundaries()}
  // 2: center={this.csuOvalGeographicCoordinates()} zoom={10}
  return (<Pane header={'Itinerary Map'}>


      <Map center={csuOvalGeographicCoordinates()}
           zoom={10}
           style={{height: 500, maxwidth: 700}}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                   attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />
        <Geolocation/>
        {generateTripMarkers(props)}
        {drawLinesBetweenMarkers(props)}
      </Map>
      </Pane>
  )
};

const generateTripMarkers = (props) =>{
  if (props.places.length > 0) {
    return (
        props.places.map((place, index) => {
          return (
              <Marker position={convertCoordinates(place.latitude, place.longitude)}
                      icon={markerIcon()}
                      key={index}>
                <Popup className="font-weight-extrabold">{place.name + ` lat: ${place.latitude} long: ${place.longitude}`}</Popup>
              </Marker>
          );
        }))
  }
};

const drawLinesBetweenMarkers = (props) =>{
  if(props.places.length > 0) {
    let coordinates = props.places.map((place) => {
      return [Number(place.latitude), Number(place.longitude)];
    });
    if (coordinates.length) {
      coordinates.push(coordinates[0]);
    }
    return <Polyline positions={coordinates}/>
  }
};

const convertCoordinates = (latitude, longitude) =>{
  return L.latLng(latitude, longitude);
};


const csuOvalGeographicCoordinates = () => {
  return L.latLng(40.576179, -105.080773);
};

const markerIcon= () => {
  // react-leaflet does not currently handle default marker icons correctly,
  // so we must create our own
  return L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconAnchor: [12,40]  // for proper placement
  })
};

export default renderLeafletMap;