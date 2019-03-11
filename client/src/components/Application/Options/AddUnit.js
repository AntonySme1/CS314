import React, { Component } from 'react'
import { Card, CardHeader, CardBody } from 'reactstrap'
import { Form, FormGroup,Input,Label,Button} from 'reactstrap'

export default class Units extends Component {
  constructor(props) {
    super(props);

    this.processForm = this.processForm.bind(this);
  }

  render() {
    return(

          <Card className='text-center'>
            <CardHeader className='bg-csu-gold text-white font-weight-semibold'>Add Units</CardHeader>
            <CardBody>
              <Form onSubmit = {this.processForm}>

                <FormGroup>
                  <Label for="addUnitNumber">Unit Value</Label>
                  <Input type="number" name="number" id="addUnitNumber" min = "0"
                         step = "any"
                         placeholder="0.00"
                         required/>
                </FormGroup>

                <FormGroup>
                  <Label for="addUnitName">Unit Name</Label>
                  <Input type="text" name="unitName" id="addUnitName" pattern="^[a-zA-Z]+( [a-zA-Z]+)*$"
                         title={"Please type alphabets only."}
                         placeholder={"Unit Name"}
                         required/>
                </FormGroup>

                <FormGroup>
                  <Button className={"btn-csu"} type="submit"> Submit </Button>
                </FormGroup>

                <FormGroup>
                  <Button className={"btn-csu"} type="reset">Reset</Button>
                </FormGroup>

              </Form>
            </CardBody>
          </Card>


    );
  }


  processForm (event) {
    event.preventDefault();

    const newUnitValue = parseFloat(event.target[0].value);
    const newUnitName = event.target[1].value;
    const newUnit = { [newUnitName]:newUnitValue};

    this.props.addUnit(newUnit);
  }

}
