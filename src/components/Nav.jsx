import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/User';
import { useContext } from 'react';
import ProfileLinkAndLogOut from './ProfileLinkAndLogOut';

export default function Nav() {
    const { username, setUsername } = useContext( UserContext );

    return (
        <div>
            {username
                ? <nav>
                    <Link to="/create-a-post">Create a Post</Link>
                    <ProfileLinkAndLogOut />
                  </nav>
                : null}
        </div>    
        
    )
}