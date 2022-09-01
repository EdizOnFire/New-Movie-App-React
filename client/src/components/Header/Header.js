import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import * as authService from "../../services/authService";

const Header = () => {
    const { user, userLogout } = useContext(AuthContext);
    const navigate = useNavigate();

    const onLogout = (e) => {
        e.preventDefault();

        authService
            .logout(user.accessToken)
            .then(() => {
                navigate("/");
                userLogout();
            })
            .catch(() => {
                navigate("/");
            });
    };

    return (
        <header>
            <nav>
                <ul>
                    <li><Link to="/" className="nav-item nav-link active">
                        Home
                    </Link></li>
                    <li><Link to="/catalog" className="nav-item nav-link">
                        Catalog
                    </Link></li>
                    {user.email && (
                        <li><Link to="/create" className="nav-item nav-link">
                            Create Movie
                        </Link>
                        </li>
                    )}
                    {user.email && (
                        <li><Link to="" className="nav-item nav-link" onClick={onLogout}>
                            Logout
                        </Link>
                        </li>
                    )}
                    {!user.email && (
                        <li><Link to="/login" className="nav-item nav-link">
                            Login
                        </Link></li>
                    )}
                    {!user.email && (
                        <li><Link to="/register" className="nav-item nav-link">
                            Register
                        </Link></li>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
