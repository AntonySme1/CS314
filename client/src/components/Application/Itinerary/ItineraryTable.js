import React from 'react';
import {Table,Button} from "reactstrap";


const  ItineraryTable = (props) => {
    return (
        <Table responsive hover borderless>
            <thead>
            <tr>
                <th>#</th>
                <th>City</th>
                <th>Latitude</th>
                <th>Longitude</th>
                <th>Leg Distance</th>
                <th>Cumulative Distance</th>
                <th>Options</th>
            </tr>
            </thead>
            <tbody>
                {generateTableData (props.itinerary)}
            <tr>
            </tr>
            <tr>
                <th colSpan="5" scope="row">Grand Total</th>
                <td>{getTotalDistance(props.itinerary) }</td>
            </tr>
            </tbody>
        </Table>);
};
const generateTableData = (itinerary) =>{
    let cumulativeArray = [];
    getCumulativeDistance(itinerary, cumulativeArray);
    console.log(cumulativeArray);
    if (itinerary != null){
        return(
        itinerary.places.map((place,index) => {
            return (<tr key={index}>
                <td>{index + 1}</td>
                <td>{place.name}</td>
                <td>{place.latitude}</td>
                <td>{place.longitude}</td>
                <td>{itinerary.distances[index]}</td>
                <td>{cumulativeArray[index]}</td>
                <td><Button className={'btn-csu'}>Delete</Button></td>
            </tr>)
        }))
    }
};

const getCumulativeDistance = (itinerary, cumulativeArray) => {
    if (itinerary != null){
        let sum = 0;
        itinerary.distances.forEach((item) => {
                sum += item;
                cumulativeArray.push(sum);
            }
        );
    }
};

const getTotalDistance = (itinerary) => {
    if (itinerary != null){
        let sum = 0;
        itinerary.distances.forEach((item) => {
            sum += item;
            }
        );
        return sum;
    }
};

export default ItineraryTable;