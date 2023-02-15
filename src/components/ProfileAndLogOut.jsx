import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/User';
import { useContext } from 'react';

export default function ProfileAndLogOut() {
    const { user, setUser } = useContext( UserContext );

    function onClickLogOut() {
        setUser("");
    }

    return (
        <div>
            <Link to="/profile">Profile</Link>
            <Link to="/" onClick={onClickLogOut}>Log Out</Link>
        </div>
    )
}