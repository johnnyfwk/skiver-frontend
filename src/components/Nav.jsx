import { Link } from 'react-router-dom';

export default function Nav() {
    return (
        <nav>
            <Link to="/">Index</Link>
            <Link to="/home">Home</Link>
        </nav>
    )
}