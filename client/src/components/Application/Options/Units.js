import React, { Component } from 'react'
import { Card, CardHeader, CardBody } from 'reactstrap'
import { Row, Col,Form, FormGroup,Input, Button,CustomInput, Label, ButtonGroup } from 'reactstrap'

export default class Units extends Component {
  constructor(props) {
    super(props);
    //this.props.callbackFromParent = this.props.callbackFromParent.bind(this);
    this.processForm = this.processForm.bind(this);
  }

  render() {
    return(
      <React.Fragment>
      <Card className='text-center mb-4'>
          <CardHeader className='bg-csu-gold text-white font-weight-semibold'>Units</CardHeader>
          <CardBody>
              <ButtonGroup vertical className='w100'>
                {this.renderUnitButtons(Object.keys(this.props.options.units))}
              </ButtonGroup>
          </CardBody>
      </Card>
        <Card className='text-center'>
        <CardHeader className='bg-csu-gold text-white font-weight-semibold'>Add Units</CardHeader>
    <CardBody>
      <Form onSubmit = {this.processForm}>

        <FormGroup>
          <Label for="addUnitNumber">Unit Value</Label>
          <Input
              type="number"
              name="number"
              id="addUnitNumber"
              min = "0"
              step = "any"
              placeholder="0.00"
              required
          />
        </FormGroup>

        <FormGroup>
          <Label for="addUnitName">Unit Name</Label>
          <Input
              type="text"
              name="unitName"
              id="unitName"
              pattern="[A-Za-z]+"
              title={"Please type alphabets only."}
              placeholder={"Unit Name"}
              required
          />
        </FormGroup>
        <FormGroup>
        <Input className={"btn-csu"} type="submit" value="Submit" />
        </FormGroup>
        <FormGroup>
          <Input className={"btn-csu"} type="reset"/>
        </FormGroup>
      </Form>
    </CardBody>
    </Card>
        </React.Fragment>

    );
  }

  renderUnitButtons(names) {
    return names.sort().map((unit) =>
      <Button
        className='btn-csu w-100 text-left'
        key={"button_"+unit}
        active={this.props.activeUnit === unit}
        value={unit}
        onClick={(event) => this.props.updateOption('activeUnit', event.target.value)}
      >
        {unit.charAt(0).toUpperCase() + unit.slice(1)}
      </Button>
    );
  }

  processForm (event) {
        event.preventDefault();
        console.log("Unit Value:", event.target[0].value);
        console.log("Unit Name:", event.target[1].value);
        const newUnitValue = parseFloat(event.target[0].value);
        const newUnitName = event.target[1].value;
        const newUnit = { [newUnitName]:newUnitValue};
        console.log(newUnit);
        this.props.callbackFromParent(newUnit);
}

}
