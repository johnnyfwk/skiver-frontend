import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/User';
import { useContext } from 'react';

export default function ProfileAndLogOut( {users, setUsers} ) {
    const { username, setUsername } = useContext( UserContext );

    function onClickLogOut() {
        setUsername("");
    }

    return (
        <div>
            <span>Logged in as <Link to={`/profile/${username}`}>{username}</Link></span>
            <Link to="/" onClick={onClickLogOut}>Log Out</Link>
        </div>
    )
}