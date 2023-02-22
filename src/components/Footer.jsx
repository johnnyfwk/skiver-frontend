import { Link } from 'react-router-dom';

export default function Footer() {

    return (
        <footer>
            <div id="copyright">Copyright &copy; {new Date().getFullYear()} Skiver.co.uk. All Rights Reserved.</div>
        </footer>
    )
}