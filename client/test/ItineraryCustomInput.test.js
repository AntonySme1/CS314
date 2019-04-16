import './enzyme.config.js';
import React from 'react';
import {mount, shallow} from 'enzyme';
import Itinerary from '../src/components/Application/Itinerary/Itinerary';
import ItineraryCustomInput from  '../src/components/Application/Itinerary/ItineraryCustomInput';
import ErrorBanner from '../src/components/Application/ErrorBanner';
import {getOriginalServerPort} from '../src/api/restfulAPI';
import {processForm} from  '../src/components/Application/Itinerary/ItineraryCustomInput';

const startProperties = {
  serverConfig: null,
  planOptions: {
    units: {'miles':3959, 'kilometers': 6371, 'nautical miles': 3440},
    activeUnit: 'miles'
  },
  clientSettings: {
    serverPort: getOriginalServerPort()
  },
  errorMessage: null,
  itinerary: {requestVersion: 3,
    requestType: 'itinerary',
    options: {"title":"My Trip",
      "earthRadius":"3958.761316","optimization":"none" },
    places: [],
    distances: [],
  },
  updateItinerary: () => {}
};

function createErrorBanner(statusText, statusCode, message) {
  return (
      <ErrorBanner statusText={statusText}
                   statusCode={statusCode}
                   message={message}/>
  );
}

function itineraryCustomInputTest() {


  const itinerary = mount(<Itinerary options={startProperties.planOptions}
                                       settings={startProperties.clientSettings}
                                       createErrorBanner={createErrorBanner}
                                     itinerary={startProperties.itinerary}
                                     updateItinerary={startProperties.updateItinerary}/>);

  const defaultPlaceSize = itinerary.state().itinerary.places.length;

  const itineraryCustomInput = mount (<ItineraryCustomInput settings = {startProperties.clientSettings}
                        createErrorBanner={createErrorBanner}
                        itinerary = {itinerary.state().itinerary}
                        updateDisplay = {()=>{}}
                        getItineraryData={()=>{}}/>);

  expect(defaultPlaceSize).toEqual(0);

  const numForm = itineraryCustomInput.find('Form');
  const numFormGroup = itineraryCustomInput.find('FormGroup');
  const numInput = itineraryCustomInput.find('Input');

  expect(numForm).toHaveLength(1);
  expect(numFormGroup).toHaveLength(5);
  expect(numInput).toHaveLength(3);



}

test('Testing that the ItineraryCustom component updates main Itinerary',  itineraryCustomInputTest);


