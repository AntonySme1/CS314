import React, { Component } from 'react'
import {Button, FormGroup} from 'reactstrap'
import { Form, Label, CustomInput} from 'reactstrap'
import { isValidLatLon,parseLatLon} from '../../../api/checkLatLon'

export default class ItineraryForm extends Component {

    constructor(props) {
        super(props);
        
        this.readFile = this.readFile.bind(this);
        this.hideForm = this.hideForm.bind(this);

    };

    render() {
    return (
        <Form>

            <FormGroup>
                <Label for="itinerary">Itinerary Upload</Label>
                <CustomInput type="file" label="Upload valid itinerary json file" name="Itinerary Upload" id="itinerary" accept=".json,application/json" onChange ={this.readFile}/>

            </FormGroup>
          <FormGroup className={"Button text-center"}>
            <Button className={"btn-csu"} type ="button" onClick={this.hideForm}> Cancel </Button>
          </FormGroup>

        </Form>

    );}

//code from https://blog.shovonhasan.com/using-promises-with-filereader/
processFile (file) {
    const reader = new FileReader();

    return new Promise((resolve => {
        reader.onload = () => {
            resolve(reader.result);
        };

        reader.readAsText(file);

    }));
    }

async readFile   (event) {
    const file = event.target.files[0];
    const fileContent = await this.processFile (file);

    this.setStateFromFile(fileContent);
};



setStateFromFile (fileContent) {
  const parsedJSON = JSON.parse(fileContent);
  const parsedPlaces = parsedJSON.places.map((place) => {
    if (isValidLatLon(place.latitude,place.longitude)) {
      console.log(place);
      const parseValue = parseLatLon(place.latitude,place.longitude);
      place.latitude = parseValue.lat.toString();
      place.longitude = parseValue.lon.toString();

      return place;

    };
  });
  console.log("here",parsedPlaces);
  const itineraryObject = {
    requestVersion: parsedJSON.requestVersion,
    options: parsedJSON.options,
    places: parsedPlaces,
    distances: []
  };

  this.props.getItineraryData(itineraryObject);
}

hideForm(){
  let display = Object.assign({}, this.props.display);
  display.itineraryUpload = !display.itineraryUpload;
  this.props.updateDisplay(display);
}






}
