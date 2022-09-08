import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import * as authService from "../../services/authService";

const Header = () => {
    const { user, userLogout } = useContext(AuthContext);
    const navigate = useNavigate();

    const onLogout = (e) => {
        e.preventDefault();
        try {
            authService
                .logout(user.accessToken)
                .then(() => {
                    navigate("/");
                    userLogout();
                })
                .catch(() => {
                    navigate("/");
                });
        } catch (error) {
            alert(error);
        }
    };

    return (
        <header>
            <nav>
                <ul>
                    <li><Link to="/">
                        Home
                    </Link></li>
                    <li><Link to="/catalog">
                        Catalog
                    </Link></li>
                    {user.email && (
                        <li><Link to="/create">
                            Create Movie
                        </Link>
                        </li>
                    )}
                    {user.email && (
                        <li><Link to="" onClick={onLogout}>
                            Logout
                        </Link>
                        </li>
                    )}
                    {!user.email && (
                        <li><Link to="/login">
                            Login
                        </Link></li>
                    )}
                    {!user.email && (
                        <li><Link to="/register">
                            Register
                        </Link></li>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
