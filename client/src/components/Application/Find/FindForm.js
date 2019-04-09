import React, { Component } from 'react'
import {Button, FormGroup,} from 'reactstrap'
import { Form, Label, Input} from 'reactstrap'
import { sendServerRequestWithBody } from '../../../api/restfulAPI'



export default class FindForm extends Component {

  constructor(props) {
    super(props);

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
        <Form onSubmit = {this.processForm}>

          <FormGroup>
            <Label for="searchTerm">Search Term</Label>
            <Input type="text" name="match" id="searchTerm" placeholder={"Search term"} onChange={this.updateState} />
          </FormGroup>

          <FormGroup>
            <Label for="limit">Limit</Label>
            <Input type="number" name="limit" id="searchTerm" min = "0" placeholder={"Limit number"} onChange={this.updateState}/>
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
updateState (event) {
            //event.persist();

     this.setState({[event.target.name]: event.target.value});
}

  findSearch () {

    const tipfindSearch = {
      'requestType': 'find',
      'requestVersion': 3,
      'match': this.state.match,
      'limit': parseInt(this.state.limit, 10),

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

