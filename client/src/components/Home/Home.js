import { Link } from "react-router-dom";

const Home = () => {
    return (
        <section id="welcomePage" align='center'>
            <h2>Welcome to </h2>
            <h1>Your Movie Website</h1>
            <p>Click <Link to="/catalog">here</Link> to browse our catalog.</p>
            <img src='/images/homescreen.png' alt='Sorry.' id='homeImage' />
        </section>
    );
};

export default Home;
