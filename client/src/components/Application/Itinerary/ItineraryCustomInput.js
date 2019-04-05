import React from 'react';
import {Form, FormGroup, Input, Label, Button} from 'reactstrap';
import Pane from '../Pane'


const customInput = () =>{
return(
    <Form onSubmit = {processForm}>

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

      <FormGroup className={"text-center"}>
        <Button className={"btn-csu"} type="submit"> Submit </Button>
      </FormGroup>

      <FormGroup className={"text-center"}>
        <Button className={"btn-csu"} type="reset">Reset</Button>
      </FormGroup>

    </Form>
);
};

const processForm = (event) => {
  event.preventDefault();
  console.log("test")
};

const renderItineraryCustomInput = () =>{
  return (
      <Pane header={'Add Itinerary'}>
        {customInput()}
      </Pane>
  );
};



export default renderItineraryCustomInput;
