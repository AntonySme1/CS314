import {moveToFirst, moveUp, moveDown} from '../src/components/Application/Itinerary/ItineraryTable.js';

const startProperties = {
    getItineraryData: (itineraryObject) => {},
    itinerary: {
        places: [
            {"name": "Denver", "latitude": "39.7", "longitude": "-105.0"},
            {"name": "Boulder", "latitude": "40.0", "longitude": "-105.4"},
            {"name": "Fort Collins", "latitude": "40.6", "longitude": "-105.1"}
        ]
    }
};


function testMoveToFirst() {
    moveToFirst(startProperties, 0, 2);
    expect(startProperties.itinerary.places[0].name).toBe("Fort Collins");
}

test('testing moveToFirst() function', testMoveToFirst);

function testMoveUp(){
    let secondPlace = startProperties.itinerary.places[1];
    moveUp(startProperties, 0, 1);
    expect(startProperties.itinerary.places[0]).toBe(secondPlace);
}

test('testing moveUp() function', testMoveUp);

