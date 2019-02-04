import React, {Component} from 'react'
import {Container, Row, Col, CardHeader} from 'reactstrap'
import Pane from '../Pane';
import { Card, CardImg, CardText, CardBody } from 'reactstrap';

/* About gives information about members of team 10 - finiteLoop for cs314
 *  Members involved in the development and creation of this project include:
 *  Jonathan Perea, Saurav Shrestha, Patrick Keleher, and Jack Fitzgerald
 */
export default class About extends Component{
    constructor(props) {
        super(props);
    }

    /*
     *  Col length code taken from: https://reactstrap.github.io/components/layout/
     *  *Note, to change layout of items on page, edit code here based on number of
     *  columns and rows needed.
     */

    render() {
        return(
            <Container>
                <Row>
                    <Col xs="12">
                        {this.heading()}
                    </Col>
                </Row>
                <Row>
                    <Col sm="12" md={{size: 6, offset: 3}}>
                        {this.memberOne()}
                    </Col>
                </Row>
                <Row>
                    <Col sm="12" md={{size: 6, offset: 3}}>
                        {this.memberTwo()}
                    </Col>
                </Row>
                <Row>
                    <Col sm="12" md={{size: 6, offset: 3}}>
                        {this.memberThree()}
                    </Col>
                </Row>
                <Row>
                    <Col sm="12" md={{size: 6, offset: 3}}>
                        {this.memberFour()}
                    </Col>
                </Row>
            </Container>
        )
    }


    heading() {
        return (
            <Pane header={'About'}
                  bodyJSX={'Welcome to finiteLoop'}/>
        );
    }

    /*
     * member# functions build a card for each teammate which acts like the <Pane/>,
     * but instead uses a card to allow for images along with text information to be added
     * Images will be as wide as cards, and every card will be centered and responsive.
     * Smaller screens will lock the size at which is equal to the header length.
     */
    memberOne(){
        return (
            <div>
                <Card>
                    <CardHeader className='bg-csu-gold text-white font-weight-semibold'>
                        {'Jon'}
                    </CardHeader>
                    <CardImg top width="100%" src="https://photos.gurushots.com/unsafe/500x500/ccce38a7b1b46939b00b63dfd0fe0fea/3_04e86ebfb135035a652071581e8490bb.jpg" alt="Picture of Jonathan Perea" />
                    <CardBody>
                        <CardText>I'm a senior at CSU studying Applied Computing Technologies. I work four jobs at the Lincoln Center. In my free time,
                            I am a photographer hobbyist so I spend a lot of time shooting and editing photos, or I am playing video games, reading, watching tc,
                            or working out.</CardText>
                    </CardBody>
                </Card>
            </div>
        );
    }
    memberTwo(){
        return (
            <div>
                <Card>
                    <CardHeader className='bg-csu-gold text-white font-weight-semibold'>
                        {'Name'}
                    </CardHeader>
                    <CardImg top width="100%" src="#" alt="#" />
                    <CardBody>
                        <CardText>Insert information here</CardText>
                    </CardBody>
                </Card>
            </div>
        );
    }
    memberThree(){
        return (
            <div>
                <Card>
                    <CardHeader className='bg-csu-gold text-white font-weight-semibold'>
                        {'Name'}
                    </CardHeader>
                    <CardImg top width="100%" src="#" alt="#" />
                    <CardBody>
                        <CardText>Insert information here</CardText>
                    </CardBody>
                </Card>
            </div>
        );
    }
    memberFour(){
        return (
            <div>
                <Card>
                    <CardHeader className='bg-csu-gold text-white font-weight-semibold'>
                        {'Name'}
                    </CardHeader>
                    <CardImg top width="100%" src="#" alt="#" />
                    <CardBody>
                        <CardText>Insert information here</CardText>
                    </CardBody>
                </Card>
            </div>
        );
    }
}