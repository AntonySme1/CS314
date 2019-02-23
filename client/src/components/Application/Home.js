import React, {Component} from 'react';
import {Container, Row, Col} from 'reactstrap';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import { Map, Marker, Popup, TileLayer, Polyline} from 'react-leaflet';
import Pane from './Pane'
import ItineraryForm from "./ItineraryForm/ItineraryForm";

/*
 * Renders the home page.
 */
export default class Home extends Component {

  constructor(props) {
    super(props);

    this.success = this.success.bind(this);
    this.getItineraryData = this.getItineraryData.bind(this);
    this.state = {latitude: 40.576179,
      longitude: -105.080773,
      location: 'Colorado State University',
      itinerary: null
    };
  }

  render() {

    return (
      <Container>
        {this.renderGeolocation()}
        <Row>
          <Col xs={12} sm={12} md={7} lg={8} xl={9}>
            {this.renderMap()}
          </Col>
          <Col xs={12} sm={12} md={5} lg={4} xl={3}>
            {this.renderIntro()}
          </Col>
          <Col xs={12} sm={12} md={5} lg={4} xl={3}>
            <ItineraryForm  settings = {this.props.settings}
                            createErrorBanner={this.props.createErrorBanner}
                            getItineraryData={this.getItineraryData}/>

          </Col>
        </Row>
      </Container>
    )

  }

  renderMap() {
    return (
      <Pane header={'Where Am I?'}
            bodyJSX={this.renderLeafletMap()}/>
    );
  }

  renderLeafletMap() {
    // initial map placement can use either of these approaches:
    // 1: bounds={this.coloradoGeographicBoundaries()}
    // 2: center={this.csuOvalGeographicCoordinates()} zoom={10}
    return (
      <Map center={this.getCurrentCoordinates()} zoom={10}
           style={{height: 500, maxwidth: 700}}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                   attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />
        <Marker position={this.getCurrentCoordinates()}
                icon={this.markerIcon()}>
          <Popup className="font-weight-extrabold">{this.currentLocationPopup()}</Popup>
        </Marker>
        {this.generateTripMarkers()}
        {this.drawLinesBetweenMarkers()}
      </Map>
    )
  }

  getItineraryData(itinerary){
    console.log(itinerary);
    this.setState({itinerary: itinerary});
  }

  generateTripMarkers(){
    if (this.state.itinerary) {
      return (
          this.state.itinerary.places.map((place, index) => {
            return (
                <Marker position={this.convertCoordinates(place.latitude, place.longitude)}
                            icon={this.markerIcon()}
                            key={index}>
                  <Popup className="font-weight-extrabold">{place.name}</Popup>
                </Marker>
            );
          }))
    }
  }

  drawLinesBetweenMarkers(){
    if(this.state.itinerary) {
      let coordinates = this.state.itinerary.places.map((place) => {
        return [Number(place.latitude), Number(place.longitude)];
      });
      return <Polyline positions={coordinates}/>
    }
  }

  convertCoordinates(latitude, longitude){
    return L.latLng(latitude, longitude);
  }

  getCurrentCoordinates() {
    return L.latLng(this.state.latitude, this.state.longitude);
  }

  currentLocationPopup() {
      return this.state.location;
  }

  renderGeolocation() {
    var options = {
      enableHighAccuracy: true,
      maximumAge: 0
    };

     navigator.geolocation.getCurrentPosition(this.success, this.error, options);
  }

  success(pos) {
    var crd = pos.coords;

    this.setState({latitude: crd.latitude, longitude: crd.longitude, location: 'your location'});
    console.log('Your current position is:');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
  }

  error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  renderIntro() {
    return(
      <Pane header={'Bon Voyage!'}
            bodyJSX={'Let us help you plan your next trip.'}/>
    );
  }

  coloradoGeographicBoundaries() {
    // northwest and southeast corners of the state of Colorado
    return L.latLngBounds(L.latLng(41, -109), L.latLng(37, -102));
  }

  csuOvalGeographicCoordinates() {
    return L.latLng(40.576179, -105.080773);
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
