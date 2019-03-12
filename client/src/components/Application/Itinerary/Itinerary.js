import React, {Component} from 'react';
import {Container, Row, Col} from 'reactstrap';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import { Map, Marker, Popup, TileLayer, Polyline} from 'react-leaflet';
import Pane from '../Pane'
import ItineraryForm from "./ItineraryForm";
import ItineraryTable from   "./ItineraryTable";
import Geolocation from '../Geolocation';

/*
 * Renders the itinerary page.
 */
export default class Itinerary extends Component {

    constructor(props) {
        super(props);

        this.getItineraryData = this.getItineraryData.bind(this);
        this.renderItineraryForm = this.renderItineraryForm.bind(this);
        this.renderItineraryTable = this.renderItineraryTable.bind(this);

        this.state = {
            itinerary: null
        };
    }

    render() {

        return (

            <Container>

                <Row>
                    <Col xs={12}>
                        {this.renderMap()}
                    </Col>
                </Row>

                <Row>
                    <Col xs={12}>
                        {this.renderItineraryForm()}
                    </Col>
                </Row>

                <Row>
                    <Col xs={12}>
                        {this.renderItineraryTable()}
                    </Col>
                </Row>

            </Container>
        )

    }

    renderMap() {
        return (
            <Pane header={'Itinerary Map'}
                  bodyJSX={this.renderLeafletMap()} />
        );
    }

    renderItineraryForm() {
        return (
            <Pane header={'Itinerary'}
                  bodyJSX = {this.ItineraryForm()}

            />
        );
    }


    ItineraryForm() {
        return (
            <ItineraryForm  settings = {this.props.settings}
                            createErrorBanner={this.props.createErrorBanner}
                            getItineraryData={this.getItineraryData}/>


        )
    }
    renderItineraryTable(){
        if (this.state.itinerary){
            return (<ItineraryTable settings = {this.props.settings}
                                    createErrorBanner={this.props.createErrorBanner}
                                    itinerary={this.state.itinerary}/>)
        }
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

    generateTripMarkers(){
        if (this.state.itinerary) {
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
        if(this.state.itinerary) {
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
}
