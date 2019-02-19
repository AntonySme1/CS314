import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { Button } from 'reactstrap'
import { Form, Label, Input } from 'reactstrap'
import { sendServerRequestWithBody } from '../../../api/restfulAPI'
import Pane from '../Pane';
import magellan from 'magellan-coords';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import {Map, Marker, Polyline, Popup, TileLayer} from 'react-leaflet';

export default class Calculator extends Component {
  constructor(props) {
    super(props);

    this.updateLocationOnChange = this.updateLocationOnChange.bind(this);
    this.calculateDistance = this.calculateDistance.bind(this);
    this.createInputField = this.createInputField.bind(this);

    this.state = {
      origin: {latitude: '', longitude: ''},
      destination: {latitude: '', longitude: ''},
      distance: 0,
      errorMessage: null
    };
  }

  render() {
    return (
      <Container>
        { this.state.errorMessage }
        <Row>
          <Col>
            {this.createHeader()}
          </Col>
        </Row>
        <Row>
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
          <Row>
              <Col xs={12} sm={12} md={7} lg={8} xl={9}>
                  {this.renderMap()}
              </Col>
          </Row>
      </Container>
    );
  }

  createHeader() {
    return (
        <Pane header={'Calculator'}
              bodyJSX={<div>Determine the distance between the origin and destination.
                Change the units on the <b>Options</b> page.</div>}/>
    );
  }

  createInputField(stateVar, coordinate) {
    let updateStateVarOnChange = (event) => {
      this.updateLocationOnChange(stateVar, event.target.name, event.target.value)};

    let capitalizedCoordinate = coordinate.charAt(0).toUpperCase() + coordinate.slice(1);
    return (
      <Input name={coordinate} placeholder={capitalizedCoordinate}
             id={`${stateVar}${capitalizedCoordinate}`}
             value={this.state[stateVar][coordinate]}
             onChange={updateStateVarOnChange}
             style={{width: "100%"}} />
    );

  }

  createForm(stateVar) {
    return (
      <Pane header={stateVar.charAt(0).toUpperCase() + stateVar.slice(1)}
            bodyJSX={
              <Form >
                {this.createInputField(stateVar, 'latitude')}
                {this.createInputField(stateVar, 'longitude')}
              </Form>
            }
      />);
  }

  createDistance() {
    return(
      <Pane header={'Distance'}
            bodyJSX={
              <div>
              <h5>{this.state.distance} {this.props.options.activeUnit}</h5>
              <Button onClick={this.calculateDistance}>Calculate</Button>
            </div>}
      />
    );
  }

  calculateDistance() {
      const originLat = magellan(this.state.origin.latitude).latitude();
      const originLon = magellan(this.state.origin.longitude).longitude();

      const destinationLat = magellan(this.state.destination.latitude).latitude();
      const destinationLon = magellan(this.state.destination.longitude).longitude();

      if (originLat === null || originLon === null || destinationLat === null || destinationLon === null) {

          this.setState({
              errorMessage: this.props.createErrorBanner(
                  'Bad Request',
                  400,
                  `Bad longitude and latitude format. Port: ${this.props.settings.serverPort}.`
              )
          });
      }

      else {

          const updatedOrigin = {latitude: originLat.toDD(), longitude: originLon.toDD()};
          const updatedDestination = {latitude: destinationLat.toDD(), longitude: destinationLon.toDD()};

          console.log(updatedOrigin);
          console.log(updatedDestination);

          const tipConfigRequest = {
              'type': 'distance',
              'version': 1,
              'origin': updatedOrigin,
              'destination': updatedDestination,
              'earthRadius': this.props.options.units[this.props.options.activeUnit]
          };


          sendServerRequestWithBody('distance', tipConfigRequest, this.props.settings.serverPort)
              .then((response) => {
                  if (response.statusCode >= 200 && response.statusCode <= 299) {
                      this.setState({
                          distance: response.body.distance,
                          errorMessage: null
                      });
                  } else {
                      this.setState({
                          errorMessage: this.props.createErrorBanner(
                              response.statusText,
                              response.statusCode,
                              `Request to ${this.props.settings.serverPort} failed.`
                          )
                      });
                  }
              });
      }
  }

  updateLocationOnChange(stateVar, field, value) {
    let location = Object.assign({}, this.state[stateVar]);
    location[field] = value;
    this.setState({[stateVar]: location});
  }

    renderMap() {
        return (
            <Pane header={'Calculator Map'}
                  bodyJSX={this.renderLeafletMap()}/>
        );
    }

    renderLeafletMap() {
      let latlngs = [this.originMarker(), this.destMarker()];
        return (
            <Map center={L.latLng(0,0)} zoom={0} style={{height: 500, maxwidth: 700}}>
                <TileLayer url='http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png'
                           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={this.originMarker()} icon={this.markerIcon()}/>
                <Marker position={this.destMarker()} icon={this.markerIcon()}/>
                <Polyline positions={latlngs} color={"red"}/>
            </Map>
        )
    }

    originMarker() {
        return L.latLng(this.state.origin.latitude, this.state.origin.longitude);
    }

    destMarker() {
        return L.latLng(this.state.destination.latitude, this.state.destination.longitude);
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
