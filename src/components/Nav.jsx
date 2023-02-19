import { Link } from 'react-router-dom';

export default function Nav() {
    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/create-a-post">Create a Post</Link>
        </nav>    
    )
}