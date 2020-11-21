import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Button } from 'reactstrap';
const Links = () => {

    const { token, username , signOut} = useContext(AuthContext);
    
    return (
        <div>
            { token   
            ?
                <div>
                    <span style={{ marginRight: '10px' }}>Hello { username } |</span>
                    <a href="#" variant="primary" onClick={signOut} style={{ marginBottom: '1rem', marginRight: '10px' }}>
                        Sign Out
                    </a>
                </div>

            :
                <div>
                    <span>Please Sign In</span>    
                </div>
                
            }

        </div>
    );
}

export default Links;