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
          <th>Add</th>

        </tr>
        </thead>
        <tbody>
        {generateTableData (props)}
        <tr>
        </tr>

        </tbody>
      </Table>);
};

const generateTableData = (props) =>{
  return(
      props.find.places.map((place,index) => {
        return (<tr key={index}>
          <td>{index + 1}</td>
          <td>{place.name}</td>
          <td>{place.latitude}</td>
          <td>{place.longitude}</td>
          <td><Button className={'btn-csu'} onClick={()=>updateItinerary(props,place)}>Add</Button></td>
        </tr>)
      }))
};

const updateItinerary = (props,place) => {
  if (props.itinerary) {
    let aTest = Object.assign({}, props.itinerary);
    aTest.places.push(place);
    console.log(aTest);
    props.getItineraryData(aTest);
  }
};
export default FindTable;