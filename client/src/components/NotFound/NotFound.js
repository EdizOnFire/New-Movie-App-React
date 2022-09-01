import { Link } from "react-router-dom"

const NotFound = () => {
    return (
        <section align="center">
            <br />
            <h2>Error 404</h2>
            <p>The page cannot be found.</p>
            <Link to='/'>Back to the homepage...</Link>
            <br />
            <br />
            <br />
        </section>
    )
};

export default NotFound;