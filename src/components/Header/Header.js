import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Button, Navbar, NavbarBrand, NavbarText  } from 'reactstrap';
import Links from './Links';
import logo from '../../assets/m2.png';

const Header = () => {

    const { token, username , signOut} = useContext(AuthContext);
    
    return (
        <div>
            { token   
            ?
                <Navbar color="light" light expand="md">
                    <NavbarBrand href="/"><img src={logo} alt="Logo" style={{ width:"50px" }} /></NavbarBrand>
                    <Links></Links>
                </Navbar>

            :
                <div>
                </div>
            }

        </div>
    );
}

export default Header;