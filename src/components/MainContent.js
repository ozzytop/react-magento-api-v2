import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Home from './Home';
import CreateProduct from './CreateProduct';
import GetCurrency from './GetCurrency';
import GetWebsites from './GetWebsites';
import ProductDetail from './Store/ProductDetail';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Row, Col } from 'reactstrap';

const MainContent = () => {
    
    const { token } = useContext(AuthContext);

    return (
        <div>
            { token 
            ?
                <React.Fragment>            
                    <Router>
                        <Row>
                            <Col xs="3" className="sidebar">
                                <ul className="sidebar__links">
                                    <li>
                                    <Link to="/">Home</Link>
                                    </li>
                                    <li>
                                    <Link to="/getcurrency">Get Currency</Link>
                                    </li>
                                    <li>
                                    <Link to="/get-websites">Get Websites</Link>
                                    </li>
                                    <li>
                                    <Link to="/createproducts">Create a Product </Link>
                                    </li>
                                </ul>
                            </Col>
                            <Col xs="9">
                                <Switch>
                                    <Route path="/getcurrency">
                                        <GetCurrency />
                                    </Route>
                                    <Route path="/get-websites">
                                        <GetWebsites />
                                    </Route>
                                    <Route path="/createproducts">
                                        <CreateProduct />
                                    </Route>
                                    <Route path="/product-detail/:id">
                                        <ProductDetail />
                                    </Route>
                                    <Route path="/">
                                        <Home />
                                    </Route>
                                </Switch>
                            </Col>
                        </Row>
                    </Router>
                </React.Fragment>
            :
                <div></div>
            }
        </div>
    );
}

export default MainContent;