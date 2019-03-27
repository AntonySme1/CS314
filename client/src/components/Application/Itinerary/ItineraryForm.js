import React, { Component } from 'react'
import {Button, Col, Row, FormGroup} from 'reactstrap'
import { Form, Label, Input, CustomInput} from 'reactstrap'
import { sendServerRequestWithBody } from '../../../api/restfulAPI'



export default class ItineraryForm extends Component {

    constructor(props) {
        super(props);

        this.calculateLegDistance = this.calculateLegDistance.bind(this);
        this.readFile = this.readFile.bind(this);
        this.saveItinerary = this.saveItinerary.bind(this);

        this.state = {
            version: 3,
            options: {"title":"My Trip",
                "earthRadius":"3958.761316"},
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
            <Col>
                <FormGroup>
                  {this.legDistanceButton()}
                </FormGroup>

              <FormGroup>
                  {this.saveItineraryButton()}
              </FormGroup>
            </Col>
        </Form>

    );}


    legDistanceButton() {
        return (
            <Col sm={{ size: 10, offset: 4 }}>
                <Button className={'btn-csu'} onClick={this.calculateLegDistance}>Itinerary</Button>
            </Col>
        );
    }


    saveItineraryButton() {
        return (

            <Col sm={{ size: 10, offset: 4 }}>
                <Button className={'btn-csu'} onClick={this.saveItinerary}>Save Itinerary</Button>
            </Col>

        );
    }


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
    this.setState(
        {
            version: parsedJSON.requestVersion,
            options: parsedJSON.options,
            places: parsedJSON.places
        } )
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
// credit Koldev https://jsfiddle.net/koldev/cW7W5/
saveItinerary(){


    const itinerary = {
        'requestType': 'itinerary',
        'requestVersion': this.state.version,
        'options': this.state.options,
        'places': this.state.places,
        'distances': this.state.distances
    };

    if(itinerary) {

       var saveData = (function () {
           var a = document.createElement("a");
           document.body.appendChild(a);
           a.style = "display: none";
           return function (data, fileName) {
               var json = JSON.stringify(data),
                   blob = new Blob([json], {type: "octet/stream"}),
                   url = window.URL.createObjectURL(blob);
               a.href = url;
               a.download = fileName;
               a.click();
               window.URL.revokeObjectURL(url);
           };
       }());

       var fileName = "SavedItinerary.json";
       saveData(itinerary, fileName);
    }
}
calculateLegDistance () {

   const tipLegDistanceRequest = {
        'requestType': 'itinerary',
        'requestVersion': this.state.version,
        'options': this.state.options,
        'places': this.state.places,
        'distances': []
    };

sendServerRequestWithBody('itinerary', tipLegDistanceRequest, this.props.settings.serverPort)
        .then((response) => {
            if (response.statusCode >= 200 && response.statusCode <= 299) {
                this.setState({
                    distances: response.body.distances,
                    errorMessage: null
                });

                this.props.getItineraryData(this.state);
            } else {
                this.setState({
                    errorMessage: this.props.createErrorBanner(
                        response.statusText,
                        response.statusCode,
                        `Request to ${this.props.settings.serverPort} failed.`
                    )
                });
            }
        });

}



}
