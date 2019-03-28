import React, {Component} from 'react';
import {Container, Row, Col, FormGroup, Form, Button} from 'reactstrap';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import { Map, Marker, Popup, TileLayer, Polyline} from 'react-leaflet';
import Pane from '../Pane'
import ItineraryForm from "./ItineraryForm";
import ItineraryTable from   "./ItineraryTable";
import Geolocation from '../Geolocation';
import FindForm from '../Find/FindForm';
import FindTable from "../Find/FindTable";
import {sendServerRequestWithBody} from "../../../api/restfulAPI";

/*
 * Renders the itinerary page.
 */
export default class Itinerary extends Component {

    constructor(props) {
        super(props);

        this.getItineraryData = this.getItineraryData.bind(this);
        this.renderItineraryForm = this.renderItineraryForm.bind(this);
        this.renderItineraryTable = this.renderItineraryTable.bind(this);

        this.getFindData = this.getFindData.bind(this);
        this.renderFindForm = this.renderFindForm.bind(this);
        this.renderFindTable = this.renderFindTable.bind(this);
        this.calculateLegDistance = this.calculateLegDistance.bind(this);
        this.saveItinerary = this.saveItinerary.bind(this);

        this.state = {
            itinerary: {requestVersion: 3,
                requestType: 'itinerary',
                options: {"title":"My Trip",
                    "earthRadius":"3958.761316","optimization":"none" },
                places: [],
                distances: [],
               },
            find:null,
            errorMessage: null
        };
    }

    render() {

        return (

            <Container>

                <Row className = 'mb-4'>
                    <Col xs={12}>
                        {this.renderMap()}
                    </Col>
                </Row>

                <Row className = 'mb-4'>
                    <Col xs={12}>
                        {this.renderFindForm()}
                    </Col>
                </Row>

                <Row className = 'mb-4'>
                    <Col xs={12}>
                        {this.renderFindTable()}
                    </Col>
                </Row>

                <Row className = 'mb-4'>
                    <Col xs={12}>
                        {this.renderItineraryForm()}
                    </Col>
                </Row>



                <Row className = 'mb-4'>
                    <Form>
                        <FormGroup>
                            {this.legDistanceButton()}
                        </FormGroup>

                        <FormGroup>
                            {this.saveItineraryButton()}
                        </FormGroup>

                    </Form>
                </Row>

                <Row className = 'mb-4'>
                    <Col xs={12}>
                        {this.renderItineraryTable()}
                    </Col>
                </Row>

            </Container>
        )

    }

    renderMap() {
        return (
            <Pane header={'Itinerary Map'}>
                {this.renderLeafletMap()}
            </Pane>
        );
    }

    renderItineraryForm() {
        return (
            <Pane header={'Itinerary'}>
                {this.ItineraryForm()}
            </Pane>
        );
    }

    renderFindForm() {
        return (
            <Pane header={'FindForm'}>
                {this.FindForm()}
            </Pane>
        );
    }


    ItineraryForm() {
        return (
            <ItineraryForm  settings = {this.props.settings}
                            createErrorBanner={this.props.createErrorBanner}
                            getItineraryData={this.getItineraryData}/>


        )
    }

    FindForm(){
        return (
            <FindForm settings = {this.props.settings}
                      createErrorBanner={this.props.createErrorBanner}
                      getFindData={this.getFindData}
            />
        )

    }

    renderFindTable(){
        if (this.state.find){
            return (<FindTable settings = {this.props.settings}
                               createErrorBanner={this.props.createErrorBanner}
                               find={this.state.find}
                               itinerary={this.state.itinerary}
                               getItineraryData={this.getItineraryData}/>)
        }
    }

    renderItineraryTable(){
       // if (this.state.itinerary){
            return (<ItineraryTable settings = {this.props.settings}
                                    createErrorBanner={this.props.createErrorBanner}
                                    itinerary={this.state.itinerary}
                                    getItineraryData={this.getItineraryData}
            />)
        //}
    }

    renderLeafletMap() {
        // initial map placement can use either of these approaches:
        // 1: bounds={this.coloradoGeographicBoundaries()}
        // 2: center={this.csuOvalGeographicCoordinates()} zoom={10}
        return (
            <Map center={this.csuOvalGeographicCoordinates()}
                 zoom={10}
                 style={{height: 500, maxwidth: 700}}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                           attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />
                <Geolocation/>
                {this.generateTripMarkers()}
                {this.drawLinesBetweenMarkers()}
            </Map>
        )
    }

    getItineraryData(itinerary){
        console.log(itinerary);
        this.setState({itinerary: itinerary});
    }

    getFindData(find){

        this.setState({find: find});
    }

    generateTripMarkers(){
        if (this.state.itinerary.places.length > 0) {
            return (
                this.state.itinerary.places.map((place, index) => {
                    return (
                        <Marker position={this.convertCoordinates(place.latitude, place.longitude)}
                                icon={this.markerIcon()}
                                key={index}>
                            <Popup className="font-weight-extrabold">{place.name + ` lat: ${place.latitude} long: ${place.longitude}`}</Popup>
                        </Marker>
                    );
                }))
        }
    }

    drawLinesBetweenMarkers(){
        if(this.state.itinerary.places.length > 0) {
            let coordinates = this.state.itinerary.places.map((place) => {
                return [Number(place.latitude), Number(place.longitude)];
            });
            if (coordinates.length) {
                coordinates.push(coordinates[0]);
            }
            return <Polyline positions={coordinates}/>
        }
    }

    convertCoordinates(latitude, longitude){
        return L.latLng(latitude, longitude);
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

    legDistanceButton() {
        return (
            <Col sm={{ size: 10, offset: 4 }}>
                <Button className={'btn-csu'} onClick={this.calculateLegDistance}>Itinerary</Button>
            </Col>
        );
    }


    saveItineraryButton() {
        return (

            <Col sm={{ size: 10, offset: 4 }}>
                <Button className={'btn-csu'} onClick={this.saveItinerary}>Save Itinerary</Button>
            </Col>

        );
    }

    // credit Koldev https://jsfiddle.net/koldev/cW7W5/
    saveItinerary(){


        const itinerary = {
            'requestType': 'itinerary',
            'requestVersion': this.state.itinerary.version,
            'options': this.state.itinerary.options,
            'places': this.state.itinerary.places,
            'distances': this.state.itinerary.distances
        };

        if(itinerary) {

            var saveData = (function () {
                var a = document.createElement("a");
                document.body.appendChild(a);
                a.style = "display: none";
                return function (data, fileName) {
                    var json = JSON.stringify(data),
                        blob = new Blob([json], {type: "octet/stream"}),
                        url = window.URL.createObjectURL(blob);
                    a.href = url;
                    a.download = fileName;
                    a.click();
                    window.URL.revokeObjectURL(url);
                };
            }());

            var fileName = "SavedItinerary.json";
            saveData(itinerary, fileName);
        }
    }

    calculateLegDistance () {

        const tipLegDistanceRequest = {
            'requestType': 'itinerary',
            'requestVersion': this.state.itinerary.requestVersion,
            'options': this.state.itinerary.options,
            'places': this.state.itinerary.places,
            'distances': []
        };

        sendServerRequestWithBody('itinerary', tipLegDistanceRequest, this.props.settings.serverPort)
        .then((response) => {
            if (response.statusCode >= 200 && response.statusCode <= 299) {
                const state = Object.assign({},this.state);
                state.itinerary.distances = response.body.distances;
                state.itinerary = null;
                this.setState({
                    state });

                //this.props.getItineraryData(this.state);
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
