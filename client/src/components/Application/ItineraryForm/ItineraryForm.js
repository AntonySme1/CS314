import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

const ItineraryForm = (props) => {
    return (
        <Form>

            <FormGroup>
                <Label for="itinerary">Itinerary Upload</Label>
                <Input type="file" name="Itinerary Upload" id="itinerary" accept=".json,application/json" onChange ={readFile}/>
                <FormText color="muted">
                    Please upload '.json' extension file only.
                </FormText>
            </FormGroup>


        </Form>
    );
}

const processFile = (file) => {
    const reader = new FileReader();

    return new Promise((resolve => {
        reader.onload = () => {
            resolve(reader.result);
        };

        reader.readAsText(file);

    }));
}

const readFile =  async (event) => {
    const file = event.target.files[0];
    const fileContent = await processFile (file);
    printJSON(fileContent);
}

const printJSON = (fileContent) => {
   const parsedJSON = JSON.parse(fileContent);
   console.log("requestType is ", parsedJSON.requestType);
   console.log("requestVersion is ", parsedJSON.requestVersion);
   console.log("options is ", parsedJSON.options);
   console.log("places is ", parsedJSON.places);
   console.log("distances is ", parsedJSON.distances);

}



//code from https://stackoverflow.com/questions/3710204/how-to-check-if-a-string-is-a-valid-json-string-in-javascript-without-using-try
//Author: Lynn and Matt H.
const tryParseJSON = (jsonString) =>{
    try {
        const o = JSON.parse(jsonString);

        if (o && typeof o === "object") {
            return true;
        }
    }
    catch (e) { }

    return false;
};





export default ItineraryForm;

