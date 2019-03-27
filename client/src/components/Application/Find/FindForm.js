import React, { Component } from 'react'
import {Button, Col, Row, FormGroup, CardBody, Table} from 'reactstrap'
import { Form, Label, Input, CustomInput} from 'reactstrap'
import { sendServerRequestWithBody } from '../../../api/restfulAPI'



export default class FindForm extends Component {

  constructor(props) {
    super(props);

    this.findSearch = this.findSearch.bind(this);
    this.processForm = this.processForm.bind(this);

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
        <Form onSubmit = {this.processForm}>

          <FormGroup>
            <Label for="searchTerm">Search Term</Label>
            <Input type="text" name="searchTerm" id="searchTerm" placeholder={"Search term"} />
          </FormGroup>

          <FormGroup>
            <Label for="limit">Limit</Label>
            <Input type="number" name="limit" id="searchTerm" min = "0" placeholder={"Limit number"} />
          </FormGroup>

          <FormGroup>
            <Button className={"btn-csu"} type="submit"> Find </Button>
          </FormGroup>


        </Form>

    );}

processForm (event) {
  event.preventDefault();

  this.findSearch();

}

  findSearch () {

    const tipfindSearch = {
      'requestType': 'find',
      'requestVersion': 3,
      'match': this.state.match,
      'limit': this.state.limit,

      'places': []
    };

    sendServerRequestWithBody('find', tipfindSearch, this.props.settings.serverPort)
    .then((response) => {
      if (response.statusCode >= 200 && response.statusCode <= 299) {
        this.setState({
          places: response.body.places,
          found: response.body.found,
          errorMessage: null
        });
        console.log(this.state.places);
        this.props.getFindData(this.state);
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

