import { Link } from 'react-router-dom';

export default function Footer() {

    return (
        <footer>
            <Link to="/home">Home</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/create-a-post">Create a Post</Link>
        </footer>
    )
}