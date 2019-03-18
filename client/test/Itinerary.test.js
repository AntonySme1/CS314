import './enzyme.config.js';
import React from 'react';
import {mount, shallow} from 'enzyme';
import Itinerary from '../src/components/Application/Itinerary/Itinerary';
import ErrorBanner from '../src/components/Application/ErrorBanner';
import Geolocation from '../src/components/Application/Geolocation'
import {getOriginalServerPort} from '../src/api/restfulAPI';
import {Map, TileLayer} from "react-leaflet";

const startProperties = {
    serverConfig: null,
    planOptions: {
        units: {'miles':3959, 'kilometers': 6371, 'nautical miles': 3440},
        activeUnit: 'miles'
    },
    clientSettings: {
        serverPort: getOriginalServerPort()
    },
    errorMessage: null
};

function createErrorBanner(statusText, statusCode, message) {
    return (
        <ErrorBanner statusText={statusText}
                     statusCode={statusCode}
                     message={message}/>
    );
}

function mapExistenceTest() {
    const itinerary = mount(<Itinerary options={startProperties.planOptions}
                                       settings={startProperties.clientSettings}
                                       createErrorBanner={createErrorBanner}/>);

    expect(itinerary.containsMatchingElement(
        <Map center={L.latLng(40.576179, -105.080773)}
             zoom={10}
             style={{height: 500, maxwidth: 700}}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                       attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            />
            <Geolocation/>
        </Map>
    )).toEqual(true);
}

test('Testing the renderMap() function in the Itinerary component', mapExistenceTest);

function itineraryTableTest() {
    const itineraryData = {
        "itinerary": {
            "places": [
                {"name": "Denver", "latitude": "39.7", "longitude": "-105.0"},
                {"name": "Boulder", "latitude": "40.0", "longitude": "-105.4"},
                {"name": "Fort Collins", "latitude": "40.6", "longitude": "-105.1"}],
            "distances": [24, 41, 59]
        }
    };

    const itinerary = shallow(<Itinerary options={startProperties.planOptions}
                                       settings={startProperties.clientSettings}
                                       createErrorBanner={createErrorBanner}/>);

    itinerary.setState(itineraryData);
    console.error(itinerary.state());
    itinerary.update();

    console.error(itinerary.debug());
}

test('Testing that the itineraryTable component gets rendered', itineraryTableTest);