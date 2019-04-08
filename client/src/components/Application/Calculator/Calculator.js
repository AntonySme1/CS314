import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { Form, Button , Input } from 'reactstrap'
import { sendServerRequestWithBody } from '../../../api/restfulAPI'
import Pane from '../Pane';
import coordParser from 'coord-parser'
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import {Map, Marker, Polyline, Popup, TileLayer} from 'react-leaflet';
import Cookies from 'js-cookie';

export default class Calculator extends Component {
  constructor(props) {
      super(props);

      this.updateLocationOnChange = this.updateLocationOnChange.bind(this);
      this.updateStateWithCookieCoord = this.updateStateWithCookieCoord.bind(this);
      this.calculateDistance = this.calculateDistance.bind(this);
      this.createInputField = this.createInputField.bind(this);
      this.checkValidLatLonRange = this.checkValidLatLonRange.bind(this);
      this.setErrorBanner = this.setErrorBanner.bind(this);
      this.state = {
          origin: {latitude:"", longitude: ""},
          destination: {latitude: "", longitude: ""},
          distance: 0,
          errorMessage: null
      };

      this.updateStateWithCookieCoord();
      this.calculateDistance();

  }

  render() {
    return (
      <Container>
        { this.state.errorMessage }
        <Row className = 'mb-4'>
          <Col>
            {this.createHeader()}
          </Col>
        </Row>
        <Row className = 'mb-4'>
          <Col xs={12} sm={6} md={4} lg={3}>
            {this.createForm('origin')}
          </Col>
          <Col xs={12} sm={6} md={4} lg={3}>
            {this.createForm('destination')}
          </Col>
          <Col xs={12} sm={6} md={4} lg={3}>
            {this.createDistance()}
          </Col>
        </Row>
          <Row className = 'mb-4'>
              <Col xs={12} sm={12} md={7} lg={8} xl={9}>
                  {this.renderMap()}
              </Col>
          </Row>
      </Container>
    );
  }

  createHeader() {
    return (
        <Pane header={'Calculator'}>
            <div>Determine the distance between the origin and destination.
                Change the units on the <b>Options</b> page.
            </div>
        </Pane>
    );
  }

    createInputField(stateVar, coordinate) {
    let updateStateVarOnChange = (event) => {
      Cookies.set(`${stateVar.charAt(0)}${event.target.name}`, event.target.value);

        this.updateLocationOnChange(stateVar, event.target.name, event.target.value)

    };

    let capitalizedCoordinate = coordinate.charAt(0).toUpperCase() + coordinate.slice(1);
    return (
      <Input name={coordinate} placeholder={capitalizedCoordinate}
             id={`${stateVar}${capitalizedCoordinate}`}
             defaultValue={this.state[stateVar][coordinate]}
             onBlur={updateStateVarOnChange}
             style={{width: "100%"}}
      />
    );

  }

  createForm(stateVar) {
    return (
        <Pane header={stateVar.charAt(0).toUpperCase() + stateVar.slice(1)}>
            <Form >
                {this.createInputField(stateVar, 'latitude')}
                {this.createInputField(stateVar, 'longitude')}
            </Form>
        </Pane>

    );
  }

  createDistance() {
    return(
        <Pane header={'Distance'}>
            <div>
                <h5>{this.state.distance} {this.props.options.activeUnit}</h5>
                <Button onClick={this.calculateDistance}>Calculate</Button>
            </div>
        </Pane>
    );
  }

  calculateDistance() {

      let parsedOrigin = this.parseLatLon ()[0], parsedDestination = this.parseLatLon()[1];

      if (this.isParseValid(parsedOrigin,parsedDestination)) {
        let originLat = parsedOrigin.lat, originLon = parsedOrigin.lon;
        let destinationLat = parsedDestination.lat, destinationLon = parsedDestination.lon;

        const checkOrgRange = this.checkValidLatLonRange(parseFloat(originLat),parseFloat(originLon));
        const checkDestRange = this.checkValidLatLonRange(parseFloat(destinationLat),parseFloat(destinationLon));

          if (checkOrgRange && checkDestRange) {

          const tipConfigRequest = {
              'requestType': 'distance',
              'requestVersion': 3,
              'origin': {latitude: originLat.toString(), longitude: originLon.toString()},
              'destination': {latitude: destinationLat.toString(), longitude: destinationLon.toString()},
              'earthRadius': this.props.options.units[this.props.options.activeUnit]
          };

          sendServerRequestWithBody('distance', tipConfigRequest, this.props.settings.serverPort)
              .then((response) => {
                 this.getRequest(response);
              });
      }
          else {
            this.setErrorBanner()
          }
      }
  }

  updateLocationOnChange(stateVar, field, value) {
      let location = Object.assign({}, this.state[stateVar]);
      location[field] = value;
      this.setState({[stateVar]: location});
      }

  updateStateWithCookieCoord(){

          let stateData = Object.assign({},this.state);

          if (Cookies.get().hasOwnProperty('olatitude')
              && Cookies.get().hasOwnProperty('olongitude')) {
            stateData.origin.latitude = Cookies.get('olatitude');
            stateData.origin.longitude =Cookies.get('olongitude');
            this.setState({stateData});
          }

          if (Cookies.get().hasOwnProperty('dlatitude')
              && Cookies.get().hasOwnProperty('dlongitude')) {
            stateData.destination.latitude = Cookies.get('dlatitude');
            stateData.destination.longitude = Cookies.get('dlongitude');
            this.setState({stateData});
          }
  }

    renderMap() {
        return (
            <Pane header={'Calculator Map'}>
                {this.renderLeafletMap()}
            </Pane>
        );
    }

    //Map background from https://leafletjs.com/examples/zoom-levels/
    renderLeafletMap() {
      let coordinates = [this.getMarker(this.state.origin.latitude,this.state.origin.longitude), this.getMarker(this.state.destination.latitude,this.state.destination.longitude)];
        return (
            <Map center={L.latLng(0,0)} zoom={0} style={{height: 500, maxwidth: 700}} preferCanvas={true}>
                <TileLayer url='http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png'
                           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={this.getMarker(this.state.origin.latitude,this.state.origin.longitude)}
                        icon={this.markerIcon()}>
                    <Popup className="font-weight-extrabold">Origin</Popup>
                </Marker>
                <Marker position={this.getMarker(this.state.destination.latitude,this.state.destination.longitude)}
                        icon={this.markerIcon()}>
                    <Popup className="font-weight-extrabold">Destination</Popup>
                </Marker>
                <Polyline positions={coordinates}/>
            </Map>
        )
    }

    buildMarker(latitude, longitude) {
      try {
          if (isNaN(latitude) && /[NSns]/.test(latitude)) {
              let parsedCoordinate = coordParser(latitude);
              latitude = parsedCoordinate.lat;
          }

          if (isNaN(latitude) && !(/[NSns]/.test(latitude))) {
              return L.latLng(0, 0);
          }

          if (isNaN(longitude) && /[WEwe]/.test(longitude)) {
              let parsedCoordinate = coordParser(longitude);
              longitude = parsedCoordinate.lon;
          }

          if (isNaN(longitude) && !(/[WEwe]/.test(latitude))) {
              return L.latLng(0, 0);
          }

          return L.latLng(latitude, longitude);
      }
      catch(e) {
          return L.latLng(0,0);
      }
    }

    getMarker(lat,lon){

          if(!(/\d/.test(lat)) || !(/\d/.test(lon))){
                return L.latLng(0, 0);
          }

          return this.buildMarker(lat, lon);
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

    checkValidLatLonRange(lat,lon){
      const checkLatRange = parseInt(lat) >= -90 && parseInt(lat) <= 90;
      const checkLonRange = parseInt(lon) >= -180 && parseInt(lon) <= 180;
      return checkLatRange && checkLonRange;
     }

  parseLatLon (){
    const originLatLon = this.state.origin.latitude + ", " + this.state.origin.longitude;

    const destinationLatLon = this.state.destination.latitude + ", " + this.state.destination.longitude;

    let parsedOrigin = {}, parsedDestination = {};

    try {
      parsedOrigin = coordParser(originLatLon);
      parsedDestination = coordParser(destinationLatLon);

    }
    catch (e) {}
    return [parsedOrigin,parsedDestination];

  }

  isParseValid(parsedOrigin,parsedDestination){
     return   Object.keys(parsedOrigin).length === 2 && Object.keys(parsedDestination).length === 2
  }

  setErrorBanner(message,statusCode,serverPort){
    this.setState({
      errorMessage: this.props.createErrorBanner(
          message, statusCode, `Request to ${serverPort} failed.`
      )
    });

  }

  getRequest(response){
    if (response.statusCode >= 200 && response.statusCode <= 299) {
      this.setState({
        distance: response.body.distance,
        errorMessage: null
      });
    } else {
      this.setErrorBanner(response.statusText,response.statusCode,response.serverPort);
    }
  }



}

