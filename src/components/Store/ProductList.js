import { useEffect, Fragment, useState } from "react";
import axios from 'axios';
import Product from './Product';
import Skeleton from 'react-loading-skeleton';


import { Container, Row, Col } from 'reactstrap';

const ProductList = () => {
    
    const [products, setProducts ] = useState();
    const name = "Mati";
    
    useEffect(() => {

        //TO DO: better logic for requests
        const url = `http://local.chemcentral.com/rest/V1/products/?searchCriteria[currentPage]=1&searchCriteria[pageSize]=8`;
        
        const token = localStorage.getItem('mg-admin-token');
        let axiosConfig = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };
        
        axios.get(url, axiosConfig)
            .then((response) => {
                console.log(response.data);
                setProducts(response.data.items);
            })
            .catch((err) => {
                console.log(err);
            });
        
        
    }, [])
    
    const getImg = (product) => {
        let img = product.media_gallery_entries[0] ? product.media_gallery_entries[0].file : '';
        return `https://www.chemcentral.com/media/catalog/product/${img}`  
    };
    
    return(
        <div>
            <Row>

                {products && products.map((product) =>
                    <Product 
                        name={product.name}
                        price={product.price}
                        img={getImg(product)}
                        sku={product.sku}
                        id={product.id}
                    >
                    </Product>
                )}
                
                {!products && 
                    <Fragment>
                    <Col style={{ paddingBottom: 20}} sm="4"><Skeleton count={5} height={20} width={200}/></Col>
                    <Col style={{ paddingBottom: 20}} sm="4"><Skeleton count={5} height={20} width={200}/></Col>
                    <Col style={{ paddingBottom: 20}} sm="4"><Skeleton count={5} height={20} width={200}/></Col>
                    <Col style={{ paddingBottom: 20}} sm="4"><Skeleton count={5} height={20} width={200}/></Col>
                    <Col style={{ paddingBottom: 20}} sm="4"><Skeleton count={5} height={20} width={200}/></Col>
                    <Col style={{ paddingBottom: 20}} sm="4"><Skeleton count={5} height={20} width={200}/></Col>
                    <Col style={{ paddingBottom: 20}} sm="4"><Skeleton count={5} height={20} width={200}/></Col>
                    <Col style={{ paddingBottom: 20}} sm="4"><Skeleton count={5} height={20} width={200}/></Col>
                    </Fragment>
                }
                
                
            </Row>
        </div>
    );
}

export default ProductList;