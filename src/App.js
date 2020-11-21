import './App.css';
import AuthContextProvider from './context/AuthContext';
import Auth from './components/Auth';
import MainContent from './components/MainContent';
import ThemeContextProvider from './context/ThemeContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'reactstrap';


function App() {
    
    const user = { name: 'Mati', loggedIn: true }

    return (
        <div className="App">
            <Container>
                <AuthContextProvider value={user}>
                    <Auth></Auth>
                    <MainContent></MainContent>
                </AuthContextProvider>
            </Container>
        </div>
    );
}

export default App;
