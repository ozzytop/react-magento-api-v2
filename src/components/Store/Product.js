import { Fragment } from 'react';
import { Col, Button } from 'reactstrap';
import axios from 'axios';
import { Link } from "react-router-dom";
import ProductDetail from './ProductDetail';

const Product = (props) => {
        
    const addNewProductGuest = (sku) => {    
    
        if(localStorage.getItem('guest-cart-id') == null){
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
                    localStorage.setItem('guest-cart-id', response.data);
                })
                .catch((err) => {
                    console.log(err);
                });
                
            addProductToGuestCart(sku);
        }else{
            addProductToGuestCart(sku);
        }
        
    };
    
    const addProductToGuestCart = (sku) => {

        if(localStorage.getItem('guest-cart-id') != null){
            
            const token = localStorage.getItem('mg-admin-token');
            const cartId = localStorage.getItem('guest-cart-id');
            
            let axiosConfig = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            };
            
            var data = JSON.stringify({
                'cartItem': {
                    "sku":sku,
                    "qty":1,
                    "quote_id":cartId
                }
            });

            const url = `http://local.chemcentral.com/rest/default/V1/guest-carts/${cartId}/items`;
            axios.post(url, data, axiosConfig)
            .then((response) => {
                console.log(response);    
            })
            .catch((err) => {
                console.log(err);
            });
        }
        
    }
    
    return (
        <Fragment>
            <Col sm="4">
                <div>Product Name: {props.name}</div>
                <div>Id: {props.id}</div>
                <div>Sku: {props.sku}</div>
                <div>Price:  {props.price}</div>
                <div>
                    <img width="200px" src={props.img} />
                </div>
                <Button outline color="primary" onClick={() => addNewProductGuest(props.sku)}>Add to Cart</Button>
                <Link color="primary" to={`/product-detail/${props.sku}`}>View Product</Link>
            </Col>
        </Fragment>
    )
}

export default Product;