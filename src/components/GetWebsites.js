import React, { Component } from 'react';
import axios from 'axios';
import { FaChevronDown } from "react-icons/fa";
import {
    Container,
    Row,
    Col,
    Button,
    Form, 
    FormGroup,
    Label,
    Input,
    Alert,
    Spinner,
    Collapse,
    Card,
    CardBody
} from 'reactstrap';
import AuthContext from '../context/AuthContext';


export default class GetWebsites extends Component {
    
    static contextType = AuthContext;
    
    constructor(props){
        super(props);
        this.state = {
            url: 'http://local.chemcentral.com',
            message: true,
            allowed: false,
            showSuccess: false,
            spinner:false,
            open:false
        }
    }

    toggle() {
        this.setState({
            open: !this.state.open
        })
    }
    
    getData() {
        this.setState({
            spinner:true
        })
        const url = `${this.state.url}${this.props.url}`;
        axios.get(url)
        .then((response) => {
            console.log(response.data);
            this.setState({
                spinner:false,
                showSuccess:true,
                baseCurrencyCode: response.data.base_currency_code
            })
        });
    }

    render() {
        
        const { url } = this.context;
        
        return (
            <div>
            {url}
            <Button color="primary" onClick={() => this.toggle()} style={{ marginBottom: '1rem' }}> <FaChevronDown /> Get {this.props.name} Information</Button>
            <Collapse
                isOpen={this.state.open}>
                <Card>
                    <CardBody>
                        <Container fluid="md">
                            <Row>
                                <Col xs={8}>
                                    <Button variant="primary" onClick={() => this.getData()} style={{ marginBottom: '1rem', marginRight: '10px' }}>
                                        Get {this.props.name}
                                    </Button>
                                    <Spinner style={{ width: '2rem', height: '2rem' , display: this.state.spinner ? "inline-block" : "none"}} />
                                    <Alert style={{ display: this.state.showSuccess ? "block" : "none" }} color="success">
                                        {this.props.name} retrieved successfully.
                                    </Alert>
                                    <div>
                                        Currency Code: {this.state.baseCurrencyCode}
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </CardBody>
                </Card>
            </Collapse>
        </div>
        )
    }
}
