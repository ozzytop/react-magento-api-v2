import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Button, Navbar, NavbarBrand, NavbarText  } from 'reactstrap';
import Links from './Links';

const Header = () => {

    const { token, username , signOut} = useContext(AuthContext);
    
    return (
        <div>
            { token   
            ?
                <Navbar color="light" light expand="md">
                    <NavbarBrand href="/">Mg Api</NavbarBrand>
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