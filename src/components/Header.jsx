import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/User';
import { useContext } from 'react';
import ProfileLinkAndLogOut from './ProfileLinkAndLogOut';

export default function Header( {users} ) {
    const { username, setUsername } = useContext( UserContext );

    return (
        <header>
            <Link to="/" id="logo">Skiver</Link>
            {username ? <ProfileLinkAndLogOut users={users}/> : null}          
        </header>
    )
}