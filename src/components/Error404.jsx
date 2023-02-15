import { Link } from 'react-router-dom';

export default function Error404() {
    return (
        <main>
            <h1>404</h1>
            <p>You must be lost because there is nothing here.</p>
            <p>Go to the <Link to="/">homepage</Link>.</p>
        </main>
    )
}