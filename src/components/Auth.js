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
                <Container fluid="md">
                    <Alert style={{ display: showSuccess ? "block" : "none" }} color="success">
                        You had a success request, the token is: {token}
                    </Alert>
                    <Button variant="primary" onClick={signOut} style={{ marginBottom: '1rem', marginRight: '10px' }}>
                        Sign Out
                    </Button>
                </Container>
            :
                <Container fluid="md">
                    <Row>
                        <Col xs={8}>
                            <Row>
                                <Col xs={12}>
                                    Before starting, insert the url of your Magento store, include the The Hypertext Transfer Protoco like this example: http://magento-store.com
                                </Col>
                            </Row>
                            <br></br>
                            <Row>
                                <FormGroup>
                                    <Label for="url">Url</Label>
                                    <Input type="text" name="url" id="url" placeholder="Url" value={url} onChange={updateUrl}/>
                                </FormGroup>
                                <Col xs={12}>
                                    This is the url that you are using for doing the requests: <strong>{url}</strong>
                                </Col>
                            </Row>
                            <br></br>
                            <Form>
                                <FormGroup>
                                    <Label for="username">Username</Label>
                                    <Input type="text" name="username" id="username" placeholder="Username" onChange={updateUsername} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="password">Password</Label>
                                    <Input type="password" name="password" id="password" placeholder="Password" onChange={updatePassword}/>
                                </FormGroup>
                                <Button variant="primary" onClick={authenticate} style={{ marginBottom: '1rem', marginRight: '10px' }}>
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