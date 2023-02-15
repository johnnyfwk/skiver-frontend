import { useEffect, useContext } from 'react';
import { UserContext } from '../contexts/User';
import { useNavigate, Link } from 'react-router-dom';
import Search from './Search';

export default function Home() {
    const { user, setUser } = useContext( UserContext );
    
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [])

    return (
        <main>
            <h1>Welcome {user}!</h1>
            <p>View posts by other users below or <Link to="/create-a-post">create your own</Link>.</p>

            <Search />
        </main>
    )
}