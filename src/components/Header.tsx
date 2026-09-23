import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import type { RootState } from "../store/store";
import { clearLoggedUser } from "../store/reducers/auth";
import {clearFavorites} from "../store/reducers/favorites.ts";

export default function Header() {
    const dispatch = useDispatch();
    const loggedUser = useSelector((state: RootState) => state.auth.loggedUser);
    const loading = useSelector((state: RootState) => state.loading.value);

    const logout = () => {
        localStorage.removeItem("token");
        dispatch(clearLoggedUser());
        dispatch(clearFavorites());
    };

    return (
        <header className="header">
            <nav className="header-nav container">
                <ul>
                    <li><Link to="/">Accueil</Link></li>
                    <li><Link to="/users">Membres</Link></li>
                    <li><Link to="/blog">Blog</Link></li>
                </ul>

                {!loading && (
                    <ul>
                        {loggedUser ? (
                            <>
                                <li><Link to="/profile">Mon profil</Link></li>
                                <li><Link to="/favorites">Mes favoris</Link></li>
                                <li><Link to="/" onClick={logout}>Déconnexion</Link></li>
                            </>
                        ) : (
                            <li><Link to="/login">Connexion</Link></li>
                        )}
                    </ul>
                )}
            </nav>
        </header>
    );
}