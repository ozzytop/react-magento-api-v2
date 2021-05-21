import './App.scss';
import { AuthContextProvider } from './context/AuthContext';
import Auth from './components/Auth';
import MainContent from './components/MainContent';
import ThemeContextProvider from './context/ThemeContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'reactstrap';
import Header from './components/Header/Header';


function App() {
    
    const user = { name: 'Mati', loggedIn: true }

    return (
        <div className="App">
            <AuthContextProvider value={user}>
                <Header>
                </Header>
                <div className="login-wrapper">
                    <Auth className="login-wrapper"></Auth>
                </div>
                <Container fluid={true}>
                    <div style={{ padding:"40px 0px"}}>
                        <MainContent></MainContent>
                    </div>
                </Container>
            </AuthContextProvider>
        </div>
    );
}

export default App;
