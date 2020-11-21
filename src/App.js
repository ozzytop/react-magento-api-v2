import './App.scss';
import AuthContextProvider from './context/AuthContext';
import Auth from './components/Auth';
import MainContent from './components/MainContent';
import ThemeContextProvider from './context/ThemeContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Navbar, NavbarBrand, NavbarText } from 'reactstrap';
import Links from './components/Navbar/Links';


function App() {
    
    const user = { name: 'Mati', loggedIn: true }

    return (
        <div className="App">
            <AuthContextProvider value={user}>
                <Navbar color="light" light expand="md">
                    <NavbarBrand href="/">Mg Api</NavbarBrand>
                    <Links></Links>
                </Navbar>
                <Container>
                        <Auth></Auth>
                        <MainContent></MainContent>
                </Container>
            </AuthContextProvider>
        </div>
    );
}

export default App;
