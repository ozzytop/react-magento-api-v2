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

class CreateProduct extends Component {
    
    static contextType = AuthContext;

    constructor(props){
        super(props);
        this.state = {
            url: '',
            id: 0,
            message: true,
            messages: [],
            allowed: false,
            showSuccess: false,
            spinner:false,
            open:true,
            fields: {},
            error:false
        }
    }

    componentDidMount() {
        const context = this.context;
        this.setState({ url: context.url });
    }

    toggle() {
        this.setState({
            open: !this.state.open
        })
    }

    createProduct() {

        this.setState({
            spinner: true
        })

        if(!this.handleValidation()){
            this.setState({
                spinner: false
            })
            return false;
         }

        const token = localStorage.getItem('mg-admin-token');
        let axiosConfig = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };
        
        var data = JSON.stringify({
            'product': {
                'sku': this.state.fields['sku'], 
                'name': this.state.fields['name'],
                'weight': this.state.fields['weight'],
                'price': parseInt(this.state.fields['price']),
                'status': this.state.fields['status'],
                'visibility': this.state.fields['visibility'],
                'type_id': this.state.fields['productType'],
                'attribute_set_id': 4,
            }
        });

        console.log(data);

        
        const url = `${this.state.url}/rest/default/V1/products`;
        axios.post(url, data, axiosConfig)
        .then((response) => {
            console.log(response);
            this.setState({
                spinner: false,
                showSuccess:true,
                id:response.data.id
                
            });

        })
        .catch((err) => {
            console.log(err);
            this.setState({
                spinner: false,
                error: true,
                message: err.response.data
            });

        });

    }

    handleValidation() {
        let fields = this.state.fields;
        let errors = [];
        let formIsValid = true;

        // Name
        if(!fields["name"]){
           formIsValid = false;
           errors.push({error:"Name can not be empty."});
        }
        // Sku
        if(!fields["sku"]){
           formIsValid = false;
           errors.push();
           errors.push({error:"Sku can not be empty."});
        }
        
        if(formIsValid == false){
            this.setState({error: true, messages: errors});    
        }
        
        return formIsValid;
    }



    handleChange(field, e){
        let fields = this.state.fields;
        fields[field] = e.target.value;        
        this.setState({fields});
    }
    
    render() {
 
        const { token } = this.context;
      return ( 
        
        <div>
            <Button color="primary" onClick={() => this.toggle()} style={{ marginBottom: '1rem' }}> <FaChevronDown /> Create a Product</Button> 
            <Collapse
                isOpen={this.state.open}>
                <Card>
                    <CardBody>
                        <Container fluid="md">
                            <Row>
                                <Col xs={8}>
                                    <Form>
                                        <Row form>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label for="sku">Sku</Label>
                                                    <Input type="text" name="sku" id="sku" placeholder="Sku" value={this.state.fields["sku"]} onChange={this.handleChange.bind(this, "sku")} />
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label for="name">Name</Label>
                                                    <Input type="text" name="name" id="name" placeholder="Name"  value={this.state.fields["name"]} onChange={this.handleChange.bind(this, "name")} />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row form>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label for="price">Price</Label>
                                                    <Input type="text" name="price" id="price" placeholder="Price"  value={this.state.fields["price"]} onChange={this.handleChange.bind(this, "price")} />
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label for="status">Status</Label>
                                                    <Input type="select" name="status" id="status" value={this.state.fields["status"]} onChange={this.handleChange.bind(this, "status")} >
                                                        <option value="1">In Stock</option>
                                                        <option value="0">Out of Stock</option>
                                                    </Input>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row form>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label for="weight">Weight</Label>
                                                    <Input type="text" name="weight" id="weight" placeholder="Weight" value={this.state.fields["weight"]} onChange={this.handleChange.bind(this, "weight")} />
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label for="visibility">Visibility</Label>
                                                    <Input type="select" name="visibility" id="visibility" value={this.state.fields["visibility"]} onChange={this.handleChange.bind(this, "visibility")} >
                                                        <option value="1">Visible</option>
                                                        <option value="0">Not Visible</option>
                                                    </Input>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row form>
                                            <Col md={6}>
                                            <FormGroup>
                                                    <Label for="type">Product Type</Label>
                                                    <Input type="select" name="type" id="type" value={this.state.fields["productType"]} onChange={this.handleChange.bind(this, "productType")} >
                                                        <option value="simple">Simple</option>
                                                        <option value="configurable">Configurable</option>
                                                    </Input>
                                                </FormGroup>
                                                Product typee, get dropdoown from here: /rest/default/V1/products/types
                                            </Col>
                                        </Row>
                                        <Button variant="primary" style={{ marginBottom: '1rem', marginRight: '10px' }} onClick={() => this.createProduct()}>
                                            Create Product
                                        </Button>
                                        <Spinner style={{ width: '2rem', height: '2rem' , display: this.state.spinner ? "inline-block" : "none"}} />
                                        <Alert style={{ display: this.state.showSuccess ? "block" : "none" }} color="success">
                                            <h4 className="alert-heading">Yaaas!</h4>
                                            <p>
                                                You have been created the new product correctly.
                                            </p>
                                            <hr />
                                            <p>
                                                Id of the product: {this.state.id}    
                                            </p>
                                            <p>
                                                Name of the product: {this.state.fields['name']}    
                                            </p>
                                            
                                        </Alert>
                                        <Alert style={{ display: this.state.error ? "block" : "none" }} color="danger">
                                            <p>Error:</p>
                                            { this.state.messages.map((message, index) => {
                                                return <div>{message.error}</div>
                                            })}
                                        </Alert>
                                    </Form>
                                </Col>
                            </Row>
                        </Container>
                    </CardBody>
                </Card>
            </Collapse>
        </div>
      );
    }
}

export default CreateProduct;