import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import CreateProduct from './CreateProduct';
import GetCurrency from './GetCurrency';


const MainContent = () => {
    
    const { token } = useContext(AuthContext);

    return (
        <div>
            { token 
            ?
                <React.Fragment>            
                    <GetCurrency></GetCurrency>
                    <CreateProduct></CreateProduct>
                </React.Fragment>
            :
                <div></div>
            }
        </div>
    );
}

export default MainContent;