import { useEffect, useContext } from 'react';
import { UserContext } from '../contexts/User';
import { useNavigate } from 'react-router-dom';

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
        </main>
    )
}