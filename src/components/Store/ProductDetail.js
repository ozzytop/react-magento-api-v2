import { useParams} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import axios from 'axios';

const ProductDetail = () => {
    
    const { id } = useParams();
    const [productDetail, setProductDetail ] = useState([]);

    
    useEffect((props) => {
        
        
        const url = `http://local.chemcentral.com/rest/default/V1/products/${id}`;
        
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
                setProductDetail(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
        
    }, [id]);

    return (
        <div>
            <Container>
                <Row>
                    <Col md="4">
                        {productDetail.custom_attributes && 
                            <img width="200px" src={`https://www.chemcentral.com/media/catalog/product/${productDetail.custom_attributes[1].value}`} /> }    
                    </Col>
                    <Col md="6">
                        <div>{productDetail.sku}</div>
                        <div>{productDetail.name}</div>
                        <div>{productDetail.price}</div>
                    </Col>
                </Row>
                <Row>
                    {productDetail.custom_attributes && productDetail.custom_attributes[0].value}
                </Row>
            </Container>
        </div>
    );
}

export default ProductDetail;