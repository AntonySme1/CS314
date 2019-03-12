import './enzyme.config.js';
import React from 'react';
import {mount} from 'enzyme';
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