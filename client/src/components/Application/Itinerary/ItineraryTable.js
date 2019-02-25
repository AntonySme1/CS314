import React from 'react';
import {Table} from "reactstrap";


const  ItineraryTable = (props) => {
    return (
        <Table responsive hover boderless>
            <thead>
            <tr>
                <th>#</th>
                <th>City</th>
                <th>Longitude</th>
                <th>Latitude</th>
                <th>Leg Distance</th>

            </tr>
            </thead>
            <tbody>

                {generateTableData (props.itinerary)}



            <tr>
                <th colSpan="4" scope="row">Grand Total</th>


                <td>{getTotalDistance(props.itinerary) }</td>
            </tr>
            </tbody>
        </Table>);
};
const generateTableData = (itinerary) =>{


    if (itinerary != null){
        return(
        itinerary.places.map((place,index) => {
            return (<tr>
                <td>{index + 1}</td>
                <td>{place.name}</td>
                <td>{place.latitude}</td>
                <td>{place.longitude}</td>
                <td>{itinerary.distances[index]}</td>
            </tr>)
        }))
    }

};
const getTotalDistance = (itinerary) => {
    if (itinerary != null){
        let sum = 0;

        itinerary.distances.forEach((item) => {
            sum += item
            }

        );

        return sum
    }

}
export default ItineraryTable;