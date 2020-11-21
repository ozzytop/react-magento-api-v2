import './App.scss';
import AuthContextProvider from './context/AuthContext';
import Auth from './components/Auth';
import MainContent from './components/MainContent';
import ThemeContextProvider from './context/ThemeContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'reactstrap';
import Header from './components/Header/Header';


function App() {
    
    const user = { name: 'Mati', loggedIn: true }

    return (
        <div className="App">
            <AuthContextProvider value={user}>
                <Header></Header>
                <Container>
                        <Auth></Auth>
                        <MainContent></MainContent>
                </Container>
            </AuthContextProvider>
        </div>
    );
}

export default App;
