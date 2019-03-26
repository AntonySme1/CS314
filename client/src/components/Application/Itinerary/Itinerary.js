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

                <Row className = 'mb-4'>
                    <Col xs={12}>
                        {this.renderMap()}
                    </Col>
                </Row>

                <Row className = 'mb-4'>
                    <Col xs={12}>
                        {this.renderItineraryForm()}
                    </Col>
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
 // credit https://github.com/NathanEpstein/KNear/blob/master/knear-client.js
    nearestNeighbor() {
        var kNear = function (k) {

            var training = [];

        }
        //compute the euclidean distance between two legs
        //function assumes legs are arrays of equal length
        var dist = function(v1, v2) {
            var sum = 0;
            v1.forEach(function(val, index) {
                sum += Math.pow(val - v2[index], 2);
            });
            return Math.sqrt(sum);
        };
        // find new shortest route
        var updateMax = function(val, arr) {
            var max = 0;
            arr.forEach(function(obj) {
                max = Math.max(max, obj.d);
            });
            return max;
        };
        // store each distance
        function mode(store) {
            var frequency = {}; // array of frequency.
            var max = 0; // holds the max frequency.
            var result; // holds the max frequency element.
            for (var v in store) {
                frequency[store[v]] = (frequency[store[v]] || 0) + 1; // increment frequency.
                if (frequency[store[v]] > max) { // is this frequency > max so far ?
                    max = frequency[store[v]]; // update max.
                    result = store[v]; // update result.
                }
            }
            return result;
        }


        //plot the new point
        this.learn = function(vector, label) {
            var obj = { v: vector, lab: label };
            training.push(obj);
        };
        this.classify = function(v) {
            var voteBloc = [];
            var maxD = 0;

        training.forEach(function(obj) {
            var o = { d: dist(v, obj.v), vote: obj.lab };
            if (voteBloc.length < k) {
                voteBloc.push(o);
                maxD = updateMax(maxD, voteBloc);
            } else {
                if (o.d < maxD) {
                    var bool = true;
                    var count = 0;
                    while (bool) {
                        if (Number(voteBloc[count].d) === maxD) {
                            voteBloc.splice(count, 1, o);
                            maxD = updateMax(maxD, voteBloc);
                            bool = false;
                        } else {
                            if (count < voteBloc.length - 1) {
                                count++;
                            } else {
                                bool = false;
                            }
                        }
                    }
                }
            }
}}
