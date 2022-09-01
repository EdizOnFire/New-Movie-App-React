import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import * as authService from "../../services/authService";

const Register = () => {
    const { userLogin } = useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const email = formData.get("email");
        const password = formData.get("password");
        const confirmPassword = formData.get("confirm-password");

        if (password !== confirmPassword) {
            alert("Passwords don't match.");
            return;
        }

        authService.register(email, password).then((authData) => {
            userLogin(authData);
            navigate("/");
        });
    };

    return (
        <section id="registerPage">
            <br />
            <div className="section-title">
                <h4>Register</h4>
            </div>
            <form align="center" onSubmit={onSubmit}>
                <label>Email</label>
                <input
                    id="email"
                    name="email"
                    type="text"
                    placeholder="Email"
                    required="required"
                />
                <label>Password</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    required="required"
                />
                <label>Confirm Password</label>
                <input
                    type="password"
                    name="confirm-password"
                    id="confirm-password"
                    placeholder="Confirm Password"
                    required="required"
                />
                <div className='if'>
                    If you already have profile click <Link to="/login">here</Link>
                </div>
                <div>
                    <button type="submit">
                        Register
                    </button>
                </div>
            </form>
            <br />
        </section>
    );
};

export default Register;
