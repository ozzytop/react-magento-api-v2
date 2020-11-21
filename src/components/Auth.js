import React, { Component, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
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
    Spinner
} from 'reactstrap';
import logo from '../assets/m2.png'; // Tell webpack this JS file uses this image


const Auth = () => {
    
    const { isAuthenticated, showSuccess, error, message, token,  spinner, toggleAuth, url, setUrl, setUsername, setPassword, authenticate, spinnerOn, signOut} = useContext(AuthContext);
    
    const updateUrl = (e) => {
        setUrl(e.target.value);
    }

    const updateUsername = (e) => {
        setUsername(e.target.value);
    }
    
    const updatePassword = (e) => {
        setPassword(e.target.value);
    }


    return (
        <div>
            { token 
            ? 
                <Container className="" fluid="md">
                    <Alert style={{ display: showSuccess ? "block" : "none" }} color="success">
                        You had a success request, the token is: {token}
                    </Alert>
                </Container>
            :
                <Container className="login-screen" fluid="md">
                    <Row>
                        <Col sm="12" md={{ size: 7, offset: 3 }}>
                            <Row className="login-screen-row">
                                <Col style={{ textAlign:"center", display:"flex", flexDirection:"column" }} xs={4}>
                                    <div>
                                        <img src={logo} alt="Logo" style={{ width:"100px" }} />
                                    </div>
                                    <div>
                                        <h2>Magento 2 Admin New Era </h2>
                                    </div>
                                </Col>
                                <Col xs={8}>
                                    <Form>
                                        <FormGroup>
                                            <Label for="url">Url of Store (include the HTTP protocol) Example: http://magento-store.com</Label>
                                            <Input type="text" name="url" id="url" placeholder="Url" value={url} onChange={updateUrl}/>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="username">Username</Label>
                                            <Input type="text" name="username" id="username" placeholder="Username" onChange={updateUsername} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="password">Password</Label>
                                            <Input type="password" name="password" id="password" placeholder="Password" onChange={updatePassword}/>
                                        </FormGroup>
                                        <Button variant="primary" onClick={authenticate} onKeyDown={authenticate} style={{ marginBottom: '1rem', marginRight: '10px' }}>
                                            Login
                                        </Button>
                                        <Spinner style={{ width: '2rem', height: '2rem' , display: spinner ? "inline-block" : "none"}} />
                                        <Alert style={{ display: error ? "block" : "none" }} color="danger">
                                            Error: {message}
                                        </Alert>
                                    </Form>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            }

        </div>
    );

}

export default Auth;