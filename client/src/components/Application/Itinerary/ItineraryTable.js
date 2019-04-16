import React from 'react';
import {Table,Button} from "reactstrap";


const  ItineraryTable = (props) => {
    return (
        <Table responsive hover borderless>
            <thead>
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>Latitude</th>
                <th>Longitude</th>
                <th>Leg Distance ({props.options.activeUnit})</th>
                <th>Cumulative Distance ({props.options.activeUnit})</th>
                <th>Options</th>

            </tr>
            </thead>
            <tbody>
                {generateTableData (props)}

                <tr><td><Button onClick={ () => reverseItinerary(props)}> Reverse</Button></td></tr>

            <tr>
                <th colSpan="5" scope="row">Grand Total</th>
                <td>{getTotalDistance(props) }</td>

            </tr>
            </tbody>
        </Table>);
};
const generateTableData = (props) =>{
    let cumulativeArray = [];
    getCumulativeDistance(props.itinerary, cumulativeArray);

        return(
        props.itinerary.places.map((place,index) => {
            return (<tr key={index}>
                <td>{index + 1}</td>
                <td>{place.name}</td>
                <td>{place.latitude}</td>
                <td>{place.longitude}</td>
                <td>{props.itinerary.distances[index]}</td>
                <td>{cumulativeArray[index]}</td>
                <td>
                    <Button className={'btn-csu'} onClick={ ()=>moveToFirst(props,place,index)}>↑↑</Button>
                    <Button className={'btn-csu'} onClick={ ()=>moveUp(props,place,index)}>↑</Button>
                    <Button className={'btn-csu'} onClick={ ()=>moveDown(props,place,index)}>↓</Button>
                    <Button className={'btn-csu'} onClick={ ()=>updateItinerary(props,place,index)}>Delete</Button>
                </td>
            </tr>)
        }))
};

const getCumulativeDistance = (itinerary, cumulativeArray) => {

        let sum = 0;
        itinerary.distances.forEach((item) => {
                sum += item;
                cumulativeArray.push(sum);
            }
        );

};

const getTotalDistance = (props) => {

        let sum = 0;
        props.itinerary.distances.forEach((item) => {
            sum += item;
            }
        );
        return sum;

};

const moveToFirst = (props,place,index) => {
    let itineraryObject = Object.assign({}, props.itinerary);

    if(index !== 0) {
        let temporaryPlace = itineraryObject.places[index];
        itineraryObject.places[index] = itineraryObject.places[0];
        itineraryObject.places[0] = temporaryPlace;
        props.getItineraryData(itineraryObject);
    }
};

const moveUp = (props,place,index) => {
    let itineraryObject = Object.assign({}, props.itinerary);

    if(index !== 0) {
        let temporaryPlace = itineraryObject.places[index];
        itineraryObject.places[index] = itineraryObject.places[index - 1];
        itineraryObject.places[index - 1] = temporaryPlace;
        props.getItineraryData(itineraryObject);
    }
};

const moveDown = (props,place,index) => {
    let itineraryObject = Object.assign({}, props.itinerary);

    if(index !== itineraryObject.places.length-1) {
        let temporaryPlace = itineraryObject.places[index];
        itineraryObject.places[index] = itineraryObject.places[index + 1];
        itineraryObject.places[index + 1] = temporaryPlace;
        props.getItineraryData(itineraryObject);
    }
};

const updateItinerary = (props,place,index) => {

  let aTest = Object.assign({}, props.itinerary);

  aTest.places.splice(index,1);
  aTest.distances.splice(index,1);

  props.getItineraryData(aTest);

};

const reverseItinerary = (props) => {

  let aTest = Object.assign({}, props.itinerary);

  aTest.places.reverse();
  aTest.distances.reverse();

  props.getItineraryData(aTest);

};

export default ItineraryTable;

export {getCumulativeDistance, getTotalDistance};
export {moveDown, moveUp, moveToFirst};
export {updateItinerary, reverseItinerary};