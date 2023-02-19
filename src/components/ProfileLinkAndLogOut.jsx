import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/User';
import { useState, useEffect, useContext } from 'react';

export default function ProfileLinkAndLogOut( {users} ) {
    const { username, setUsername } = useContext( UserContext );
    const [ usersInfo, setUsersInfo ] = useState( [] );

    useEffect(() => {
        setUsersInfo(users.filter((user) => {
            return user.username === username;
        }))
    }, [])

    function onClickLogOut() {
        setUsername("");
    }

    return (
        <div id="profile-link-and-log-out">            
            <Link to="/" onClick={onClickLogOut} id="log-out">Log out</Link>
            <Link to={`/profile/${username}`}><img src={usersInfo[0]?.profile_image_url}></img></Link>
        </div>
    )
}