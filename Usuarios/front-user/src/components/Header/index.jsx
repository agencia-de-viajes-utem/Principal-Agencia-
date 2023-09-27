import "./Header.css";
import { Link } from "wouter";
function Header() {
    return (
        <header className="box-header">
            <Link href="/login">
                <a className="link">Login</a>
            </Link>
            <Link href="/register">
                <a className="link">Register</a>
            </Link>
        </header>
    );
}
export default Header;
