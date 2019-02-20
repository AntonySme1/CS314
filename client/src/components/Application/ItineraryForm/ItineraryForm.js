import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

const ItineraryForm = (props) => {
    return (
        <Form>

            <FormGroup>
                <Label for="itinerary">Itinerary Upload</Label>
                <Input type="file" name="Itinerary Upload" id="itinerary" accept=".json,application/json" onChange ={test}/>
                <FormText color="muted">
                    Please upload '.json' extension file only.
                </FormText>
            </FormGroup>


        </Form>
    );
}


const test = (event) => {

    const file = event.target.files[0];

    const reader = new FileReader();

    reader.onload = () => {
        console.log (reader.result);
        }

    reader.readAsText(file);


}
export default ItineraryForm;

