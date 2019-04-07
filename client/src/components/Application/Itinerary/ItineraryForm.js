import React, { Component } from 'react'
import {FormGroup} from 'reactstrap'
import { Form, Label, CustomInput} from 'reactstrap'

export default class ItineraryForm extends Component {

    constructor(props) {
        super(props);
        
        this.readFile = this.readFile.bind(this);

    };

    render() {
    return (
        <Form>

            <FormGroup>
                <Label for="itinerary">Itinerary Upload</Label>
                <CustomInput type="file" label="Upload valid itinerary json file" name="Itinerary Upload" id="itinerary" accept=".json,application/json" onChange ={this.readFile}/>

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
  const itineraryObject = {
    requestVersion: parsedJSON.requestVersion,
    options: parsedJSON.options,
    places: parsedJSON.places,
    distances: []
  };
  this.props.getItineraryData(itineraryObject);
}






}
