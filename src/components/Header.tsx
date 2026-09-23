import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import type { RootState } from "../store/store";
import { clearLoggedUser } from "../store/reducers/auth";

export default function Header() {
    const dispatch = useDispatch();
    const loggedUser = useSelector((state: RootState) => state.auth.loggedUser);

    return (
        <header className="header">
            <nav className="header-nav container">
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/users">Users</Link>
                    </li>
                    <li>
                        <Link to="/favorites">Favorites</Link>
                    </li>
                    <li>
                        <Link to="/profile">Profile</Link>
                    </li>
                </ul>
                <ul>
                    {
                        !loggedUser ?
                            <>
                                <li>
                                    <Link to="/login">Login</Link>
                                </li>
                            </>
                            :
                            <>
                                <li>
                                    <Link to="/" onClick={() => {
                                        localStorage.removeItem("token");
                                        dispatch(clearLoggedUser());
                                    }}>Log out</Link>
                                </li>
                            </>
                    }
                </ul>
            </nav>
        </header>
    );
}