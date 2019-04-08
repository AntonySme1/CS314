import React from 'react';
import {Form,Row, Col, FormGroup, Input, Label, Button} from 'reactstrap';
import Pane from '../Pane'


const customInput = (props) =>{
  const latLon = ["Latitude","Longitude"];
return(
    <Form className={"Form"} onSubmit = {processForm(props)}>


      <FormGroup>
        <Label for="Name">Name</Label>
        <Input type="text" name="Name" id="Name" placeholder="Name" required/>
      </FormGroup>

      <Row form>
        {latLon.map((name)=>{
        return (<Col md={6} key={name}>
          <FormGroup>
            <Label for={name}>{name}</Label>
            <Input type="number" name={name} id={name} placeholder={name} required/>
          </FormGroup>
        </Col>)
      })}

          </Row>

      <FormGroup className={"Button text-center"}>
        <Button className={"btn-csu"} type="submit"> Submit </Button>
      </FormGroup>

      <FormGroup className={"Button text-center"}>
        <Button className={"btn-csu"} type ="button" onClick={()=>hideForm(props)}> Cancel </Button>
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

const hideForm = (props) =>{
  console.log(props);
  let display = Object.assign({}, props.display);
  display.itineraryCustomInput = !display.itineraryCustomInput;
  props.updateDisplay(display);
};



export default renderItineraryCustomInput;
