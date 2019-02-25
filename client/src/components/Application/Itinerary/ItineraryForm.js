import React, { Component } from 'react'
import {Button, Col, FormGroup} from 'reactstrap'
import { Form, Label, Input } from 'reactstrap'
import { sendServerRequestWithBody } from '../../../api/restfulAPI'
import CustomInput from "reactstrap/es/CustomInput";


export default class ItineraryForm extends Component {

    constructor(props) {
        super(props);

        this.calculateLegDistance = this.calculateLegDistance.bind(this);
        this.readFile = this.readFile.bind(this);

        this.state = {
            version: 2,
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
            <FormGroup check row>
                {this.legDistanceButton()}
            </FormGroup>


        </Form>

    );}


legDistanceButton() {
     return (

         <Col sm={{ size: 10, offset: 4 }}>
             <Button className={'btn-csu'} onClick={this.calculateLegDistance}>Itinerary</Button>
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
   console.log("requestType is ", parsedJSON.requestType);
   console.log("requestVersion is ", parsedJSON.requestVersion);
   console.log("options is ", parsedJSON.options);
   console.log("places is ", parsedJSON.places);
   console.log("distances is ", parsedJSON.distances);

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


calculateLegDistance () {

   const tipLegDistanceRequest = {
        'type': 'itinerary',
        'version': this.state.version,
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
                console.log(this.state.distances);
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