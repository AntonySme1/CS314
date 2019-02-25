import React from 'react';
import {Table} from "reactstrap";


const  ItineraryTable = () => {
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
            <tr>
                <th>1</th>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>Table cell</td>

            </tr>
            <tr>
                <th>2</th>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>Table cell</td>
            </tr>
            <tr>
                <th>3</th>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>Table cell</td>

            </tr>
            <tr>
                <th colSpan="4" scope="row">Grand Total</th>


                <td>0</td>
            </tr>
            </tbody>
        </Table>);
};

export default ItineraryTable;