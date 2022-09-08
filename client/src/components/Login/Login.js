import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import * as authService from "../../services/authService";

const Login = () => {
    const { userLogin } = useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();

        const { email, password } = Object.fromEntries(new FormData(e.target));
        
        try {
            authService
                .login(email, password)
                .then((authData) => {
                    if (authData.code !== 403) {
                        userLogin(authData);
                        navigate("/");
                    } else {
                        alert("Email and password don't match.");
                        return;
                    }
                })
        } catch (error) {
            alert(error);
        }
    };

    return (
        <section>
            <br />
            <div className="section-title">
                <h4>Login</h4>
            </div>
            <form align="center" onSubmit={onSubmit} id="login">
                <label>Email</label>
                <input
                    id="email"
                    name="email"
                    type="text"
                    placeholder="Email"
                    required="required"
                />
                <label>Password</label>
                <div className="input">
                    <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Password"
                        required="required"
                    />
                </div>
                <div className='if'>
                    If you don't have a profile click <Link to="/register">here</Link>
                </div>
                <div>
                    <button type="submit">
                        Login
                    </button>
                </div>
            </form>
            <br />
        </section>
    );
};

export default Login;
