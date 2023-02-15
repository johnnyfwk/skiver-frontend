import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/User';
import { useContext } from 'react';

export default function Nav() {
    const { user, setUser } = useContext( UserContext );

    return (        
        <nav>
            {user ? <Link to="/create-a-post">Create a Post</Link> : null}      
        </nav>
    )
}