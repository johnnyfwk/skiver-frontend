import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/User';
import ProfileAndLogOut from './ProfileAndLogOut';

export default function Header() {
    const { user, setUser } = useContext( UserContext );

    return (
        <header>
            <Link to="/">Skiver</Link>
            {user ? <ProfileAndLogOut /> : null}
        </header>
    )
}