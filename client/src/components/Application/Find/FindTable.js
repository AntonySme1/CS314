import React from 'react';
import {Table,Button} from "reactstrap";


const  FindTable = (props) => {
  return (
      <Table responsive hover borderless>
        <thead>
        <tr>
          <th>#</th>
          <th>City</th>
          <th>Latitude</th>
          <th>Longitude</th>

        </tr>
        </thead>
        <tbody>
        {generateTableData (props.find.places)}
        <tr>
        </tr>

        </tbody>
      </Table>);
};

const generateTableData = (data) =>{
  return(
      data.map((place,index) => {
        return (<tr key={index}>
          <td>{index + 1}</td>
          <td>{place.name}</td>
          <td>{place.latitude}</td>
          <td>{place.longitude}</td>
          <td><Button className={'btn-csu'}>Add</Button></td>
        </tr>)
      }))
}
export default FindTable;