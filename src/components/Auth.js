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
import logo from '../assets/m2.jpg'; // Tell webpack this JS file uses this image


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
                        <Col xs={3}>
                            <img src={logo} alt="Logo" style={{ maxWidth:"100px" }} />
                        </Col>
                        <Col xs={7}>
                            <Row>
                                <Col xs={12}>
                                    Before starting, insert the url of your Magento store, include the The Hypertext Transfer Protoco like this example: http://magento-store.com
                                </Col>
                            </Row>
                            <Form>
                                <FormGroup>
                                    <Label for="url">Url</Label>
                                    <Input type="text" name="url" id="url" placeholder="Url" value={url} onChange={updateUrl}/>
                                </FormGroup>
                                <div>
                                    This is the url that you are using for doing the requests: <strong>{url}</strong>
                                </div>
                                <FormGroup>
                                    <Label for="username">Username</Label>
                                    <Input type="text" name="username" id="username" placeholder="Username" onChange={updateUsername} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="password">Password</Label>
                                    <Input type="password" name="password" id="password" placeholder="Password" onChange={updatePassword}/>
                                </FormGroup>
                                <Button variant="primary" onClick={authenticate} onKeyDown={authenticate} style={{ marginBottom: '1rem', marginRight: '10px' }}>
                                    Get Token
                                </Button>
                                <Spinner style={{ width: '2rem', height: '2rem' , display: spinner ? "inline-block" : "none"}} />
                                <Alert style={{ display: error ? "block" : "none" }} color="danger">
                                    Error: {message}
                                </Alert>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            }

        </div>
    );

}

export default Auth;