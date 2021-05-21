import { useState } from 'react';
import { Button } from 'reactstrap';
import axios from 'axios';

const Cart = () => {
    
    const [cartId, setCartId] = useState("");
    
    const createCart = (e) => {
        
        //TO DO: better logic for requests
        const url = `http://local.chemcentral.com/rest/default/V1/guest-carts`;
        const token = localStorage.getItem('mg-admin-token');
        let axiosConfig = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };
        
        axios.post(url, axiosConfig)
            .then((response) => {
                setCartId(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return(
        <div>
            CART tiene q ser con context obviamente
            <div>Cart Id: {cartId}</div>
            <Button outline color="warning" onClick={createCart}>Create Cart</Button>
        </div>
    )
}

export default Cart;