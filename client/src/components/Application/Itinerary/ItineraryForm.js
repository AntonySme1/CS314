import React, { Component } from 'react'
import {Button, Col, Row, FormGroup} from 'reactstrap'
import { Form, Label, Input, CustomInput} from 'reactstrap'

export default class ItineraryForm extends Component {

    constructor(props) {
        super(props);


        this.readFile = this.readFile.bind(this);


        this.state = {
          requestVersion: 3,
          requestType: 'itinerary',
            options: {"title":"My Trip",
                "earthRadius":"3958.761316","optimization":"none" },
            places: [],
            distances: [],
            errorMessage: null

        };

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
    this.printJSON(fileContent);
    this.setStateFromFile(fileContent);
};

printJSON  (fileContent)  {
   const parsedJSON = JSON.parse(fileContent);


}

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


//code from https://stackoverflow.com/questions/3710204/how-to-check-if-a-string-is-a-valid-json-string-in-javascript-without-using-try
//Author: Lynn and Matt H.
 tryParseJSON (jsonString)  {
    try {
        const o = JSON.parse(jsonString);

        if (o && typeof o === "object") {
            return true;
        }
    }
    catch (e) { }

    return false;
};





}
