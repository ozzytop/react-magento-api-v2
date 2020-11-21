import React, { Component, createContext } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

class AuthContextProvider extends Component {

    state = { 
        isAuthenticated: false,
        username: '',
        password: '',
        url: 'http://local.chemcentral.com',
        token:  localStorage.getItem('mg-admin-token'),
        message: true,
        allowed: false,
        showSuccess: false,
        spinner:false,
        message: '',
    }
    /*
    toggleAuth = () => {
        this.setState({ isAuthenticated: !this.state.isAuthenticated});
    }
    */
    
    signOut = () => {
        localStorage.setItem('mg-admin-token', '');
        this.setState({ token: ''});
    }

    setUrl = (url) => {
        this.setState({ url: url});
    }
    
    setUsername = (username) => {
        this.setState({ username: username});
    }
    
    setPassword = (password) => {
        this.setState({ password});
    }
    
    authenticate = () => {
        this.setState({
            spinner: true
        })
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        var data = new FormData();
        data.append("username", this.state.username);
        data.append("password", this.state.password);
        
        const url = `${this.state.url}/rest/V1/integration/admin/token`;
        axios.post(url, data, axiosConfig)
        .then((response) => {
            this.setState({
                allowed: true,
                showSuccess: true,
                error: false,
                token: response.data,
                spinner: false
            });
            localStorage.setItem('mg-admin-token', response.data);
        })
        .catch((err) => {
            this.setState({
                spinner: false,
                error: true,
                message: err.message
            });
            setTimeout(function(){
                this.setState({error:false});
            }.bind(this), 5000); 
        });
    }

    render() { 
        return ( 
            <AuthContext.Provider value={{ ...this.state, toggleAuth:this.toggleAuth, setUrl:this.setUrl, setUsername:this.setUsername, setPassword:this.setPassword, authenticate: this.authenticate, signOut: this.signOut }}>
                {this.props.children}
            </AuthContext.Provider>
        );
    }
}
 
export default AuthContextProvider;