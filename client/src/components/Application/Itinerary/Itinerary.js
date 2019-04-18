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
import ItineraryCustomInput from "./ItineraryCustomInput";
import saveItinerary from "./ItinerarySave";
import ItineraryOptions from "./ItineraryOptions";
import ItineraryOptimizationOptions from "./ItineraryOptimizationOptions";
/*
 * Renders the itinerary page.
 */
export default class Itinerary extends Component {

    constructor(props) {
        super(props);
        this.updateDisplay = this.updateDisplay.bind(this);
        this.getItineraryData = this.getItineraryData.bind(this);
        this.renderItineraryForm = this.renderItineraryForm.bind(this);
        this.renderItineraryTable = this.renderItineraryTable.bind(this);
        this.renderItineraryCustomInput = this.renderItineraryCustomInput.bind(this);

        this.getFindData = this.getFindData.bind(this);
        this.renderFindForm = this.renderFindForm.bind(this);
        this.renderFindTable = this.renderFindTable.bind(this);
        this.calculateLegDistance = this.calculateLegDistance.bind(this);

        this.state = {
            itinerary: props.itinerary,
            display:{itineraryTable: true, itineraryCustomInput: false, itineraryUpload: false, findForm:false, findTable:false },

            find:null,
            errorMessage: null
        };

        this.callCalcLegDistance();
    }

    render() {
        const allrenderMethods = [this.renderMap(),this.renderItineraryOptimizationOptions(),this.renderItineraryOptions(),this.renderFindForm(),this.renderFindTable(),this.renderItineraryForm(),
                                    this.renderItineraryCustomInput(),this.renderItineraryTable()];
        return (
            <Container>
                {allrenderMethods.map((method,index) =>{
                    return(
                        <Row className = 'mb-4' key ={index}>
                            <Col xs={12}>
                                {method}
                            </Col>
                        </Row>
                    )
                })}

            </Container>
        )
    }

    renderItineraryCustomInput (){
        if (this.state.display.itineraryCustomInput){
            return (
                    <ItineraryCustomInput settings={this.props.settings}
                                          createErrorBanner={this.props.createErrorBanner}
                                          itinerary={this.state.itinerary}
                                          display = {this.state.display}
                                          updateDisplay = {this.updateDisplay}
                                          getItineraryData={this.getItineraryData}/>
                );

    }}

    renderMap() {
        return (
            <Pane header={'Itinerary Map'}>
                {this.renderLeafletMap()}
            </Pane>
        );
    }

    renderItineraryOptions (){
            let buttons = [{name: "Save Itinerary", onClick:()=>saveItinerary(this.state.itinerary)},
                           {name: "Add to Itinerary", onClick:() =>this.setState({display:{itineraryCustomInput: !this.state.display.itineraryCustomInput}})},
                           {name: "Upload Itinerary", onClick:() =>this.setState({display:{itineraryUpload: !this.state.display.itineraryUpload}})},
                           {name: "Find Place", onClick:() =>this.setState({display:{findForm: !this.state.display.findForm, findTable: !this.state.display.findTable}})}
                           ];
            const allButtons = [];
            buttons.forEach((button) => {
                allButtons.push(<Button className={'btn-csu'} onClick={button.onClick}>{button.name}</Button>);
            });

            return (
               <ItineraryOptions allButtons = {allButtons}/>
            );
        };

    optimizeItinerary() {
        const itinerary = Object.assign({}, this.state.itinerary);
        itinerary.options.optimization = "short";
        this.getItineraryData(itinerary);
    }
    noneItinerary() {
        const itinerary = Object.assign({}, this.state.itinerary);
        itinerary.options.optimization = "none";
        this.getItineraryData(itinerary);
    }

    renderItineraryOptimizationOptions (){
        let buttons = [{name: "None", onClick:()=>this.noneItinerary()},

            {name: "Short", onClick:() => this.optimizeItinerary()}
        ];
        const allButtons = [];
        buttons.forEach((button) => {
            allButtons.push(<Button className={'btn-csu'} onClick={button.onClick}>{button.name}</Button>);
        });

        return (
            <ItineraryOptimizationOptions allButtons = {allButtons}/>
        );
    };

    renderItineraryForm() {
        if (this.state.display.itineraryUpload) {
            return (
                <Pane header={'Itinerary Upload'}>
                    {<ItineraryForm  settings = {this.props.settings}
                                     createErrorBanner={this.props.createErrorBanner}
                                     getItineraryData={this.getItineraryData}
                                     display = {this.state.display}
                                     updateDisplay = {this.updateDisplay}/>}
                </Pane>
            );
        }
    }

    renderFindForm() {
            if (this.state.display.findForm) {
                return (
                    <Pane header={'FindForm'}>
                        {<FindForm settings = {this.props.settings}
                                   createErrorBanner={this.props.createErrorBanner}
                                   getFindData={this.getFindData}
                                   display = {this.state.display}
                                   updateDisplay = {this.updateDisplay}/>}
                    </Pane>
                );
            }
    }

    renderFindTable(){
        if (this.state.find) {
        if(this.state.display.findTable){
                return (<FindTable settings={this.props.settings}
                                   createErrorBanner={this.props.createErrorBanner}
                                   find={this.state.find}
                                   itinerary={this.state.itinerary}
                                   getItineraryData={this.getItineraryData}/>)

        }
        }
    }

    renderItineraryTable(){
            return (<ItineraryTable settings = {this.props.settings}
                                    createErrorBanner={this.props.createErrorBanner}
                                    itinerary={this.state.itinerary}
                                    getItineraryData={this.getItineraryData}
                                    options={this.props.options}
            />)
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
        this.setState({itinerary: itinerary},()=>{this.calculateLegDistance()});
    }

    updateDisplay(display){

         this.setState({display:display});
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

    callCalcLegDistance(){
        if(this.state.itinerary.distances.length === 0){
            return;
        } else {
            this.calculateLegDistance();
        }
    }

    calculateLegDistance () {
        let itineraryOptions = this.state.itinerary.options;
        itineraryOptions.earthRadius = this.props.options.units[this.props.options.activeUnit].toString();

        const tipLegDistanceRequest = {
            'requestType': 'itinerary',
            'requestVersion': this.state.itinerary.requestVersion,
            'options': itineraryOptions,
            'places': this.state.itinerary.places,
            'distances': []
        };

        sendServerRequestWithBody('itinerary', tipLegDistanceRequest, this.props.settings.serverPort)
        .then((response) => {
            if (response.statusCode >= 200 && response.statusCode <= 299) {

                const state = Object.assign({},this.state);
                state.itinerary.distances = response.body.distances;

                this.setState({errorMessage: null});
                this.setState({itinerary: state.itinerary},()=>{this.props.updateItinerary(this.state.itinerary)});
            }else {
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
