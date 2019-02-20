import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

const ItineraryForm = (props) => {
    return (
        <Form>

            <FormGroup>
                <Label for="itinerary">Itinerary Upload</Label>
                <Input type="file" name="Itinerary Upload" id="itinerary" accept=".json,application/json" />
                <FormText color="muted">
                    Please upload '.json' extension file only.
                </FormText>
            </FormGroup>

            <Button>Upload</Button>

        </Form>
    );
}

const readFile = {

            
}








export default ItineraryForm;
export readFile;