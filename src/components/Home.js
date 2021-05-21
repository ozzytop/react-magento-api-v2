import React from 'react';
import ProductList from './Store/ProductList';
import Cart from './Cart/Cart';

const Home = () => {
    return(
        <div>
            Hello dexter morgan
            <Cart></Cart>
            <ProductList></ProductList>
        </div>  
    );
}

export default Home;