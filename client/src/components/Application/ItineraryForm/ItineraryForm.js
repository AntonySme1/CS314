import React, { Component } from 'react'
import {Button, FormGroup, FormText, Table} from 'reactstrap'
import { Form, Label, Input } from 'reactstrap'
import { sendServerRequestWithBody } from '../../../api/restfulAPI'


export default class ItineraryForm extends Component {

    constructor(props) {
        super(props);

        this.calculateLegDistance = this.calculateLegDistance.bind(this);
        this.readFile = this.readFile.bind(this);

        this.state = {
            version: 2,
            options: {},
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
                <Input type="file" name="Itinerary Upload" id="itinerary" accept=".json,application/json" onChange ={this.readFile}/>
                <FormText color="muted">
                    Please upload '.json' extension file only.
                </FormText>
                {this.legDistanceButton()}
            </FormGroup>


        </Form>

    );}


legDistanceButton() {
     return (
        <Button color="primary" onClick={this.calculateLegDistance}>Leg Distance</Button>
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
        'distances': this.state.distances
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
