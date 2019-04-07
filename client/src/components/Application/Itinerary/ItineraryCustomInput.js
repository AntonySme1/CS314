import React from 'react';
import {Form, FormGroup, Input, Label, Button} from 'reactstrap';
import Pane from '../Pane'


const customInput = (props) =>{
return(
    <Form className={"Form"} onSubmit = {processForm(props)}>

      <FormGroup>
        <Label for="Name">Name</Label>
        <Input type="text" name="Name" id="Name" placeholder="Name" required/>
      </FormGroup>

      <FormGroup>
        <Label for="Latitude">Latitude</Label>
        <Input type="number" name="Latitude" id="Latitude" placeholder={"Latitude"} required/>
      </FormGroup>

      <FormGroup>
        <Label for="Longitude">Longitude</Label>
        <Input type="number" name="Longitude" id="Longitude" placeholder={"Longitude"} required/>
      </FormGroup>

      <FormGroup className={"Button text-center"}>
        <Button className={"btn-csu"} type="submit"> Submit </Button>
      </FormGroup>


    </Form>
);
};

const processForm = (props) => event => {
  event.preventDefault();
  const newPlace = new FormData(event.target);

  const newPlaceLat = parseFloat(newPlace.get('Latitude').toString());
  const newPlaceLon = parseFloat(newPlace.get('Longitude').toString());
  const newPlaceName = newPlace.get('Name');

  const place = {"name": newPlaceName, "latitude": newPlaceLat, "longitude": newPlaceLon};

  updateItinerary(props,place);
  
};

const renderItineraryCustomInput = (props) =>{
  return (
      <Pane header={'Add Itinerary'}>
        {customInput(props)}
      </Pane>
  );
};

const updateItinerary = (props,place) => {

  let itinerary = Object.assign({}, props.itinerary);
  itinerary.places.push(place);
  props.getItineraryData(itinerary);

};



export default renderItineraryCustomInput;
