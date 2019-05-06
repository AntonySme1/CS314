import React, { Component } from 'react'
import {Button, FormGroup,} from 'reactstrap'
import { Form, Label, Input} from 'reactstrap'
import { sendServerRequestWithBody } from '../../../api/restfulAPI'
import {schemaValidator} from "../SchemaValidation";
import TIPFindSchema from "../../../../../server/src/main/resources/TIPFindSchema.json";



export default class FindForm extends Component {

  constructor(props) {
    super(props);
    this.hideForm = this.hideForm.bind(this);
    this.findSearch = this.findSearch.bind(this);
    this.processForm = this.processForm.bind(this);
    this.updateState = this.updateState.bind(this);
    this.state = {

      match: "Denver",
      limit: 10,
      found: 0,
      places: [],
      errorMessage: null

    };

  };



  render() {
    return (
        <div>
          {this.state.errorMessage}
          <Form onSubmit = {this.processForm}>

            <FormGroup>
              <Label for="searchTerm">Search Term</Label>
              <Input type="text" name="match" id="searchTerm" placeholder={"Search term"} onChange={this.updateState} />
            </FormGroup>

            <FormGroup>
              <Label for="limit">Limit</Label>
              <Input type="number" name="limit" id="searchTerm" min = "0" placeholder={"Limit number"} onChange={this.updateState}/>
            </FormGroup>

            <FormGroup className={"text-center"}>
              <Button className={"btn-csu"} type="submit"> Find </Button>
            </FormGroup>
            <FormGroup className={"text-center"}>
              <Button className={"btn-csu"} onClick={() =>{this.hideForm(); }} > Cancel </Button>
            </FormGroup>


          </Form>
        </div>

    );}

processForm (event) {

  event.preventDefault();

  this.findSearch();


}
updateState (event) {
            //event.persist();

     this.setState({[event.target.name]: event.target.value});
}
  hideForm(){
    let display = Object.assign({}, this.props.display);
    display.findForm = !display.findForm;
    display.findTable = display.findForm;

    this.props.updateDisplay(display);
  }



  findSearch () {

    const tipfindSearch = {
      'requestType': 'find',
      'requestVersion': 5,
      'match': this.state.match,
      'limit': parseInt(this.state.limit, 10),

      'places': []
    };

    sendServerRequestWithBody('find', tipfindSearch, this.props.settings.serverPort)
    .then((response) => {
      if (response.statusCode >= 200 && response.statusCode <= 299) {
        if (schemaValidator(TIPFindSchema, response.body)) {
          this.setState({
            places: response.body.places,
            found: response.body.found,
            errorMessage: null
          });
          this.props.getFindData(this.state);
        } else {
          this.setState({
            errorMessage: this.props.createErrorBanner(
                "Server Error",
                500,
                `Invalid Find response received from ${this.props.settings.serverPort} (does not match schema).`
            )
          });
        }
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

