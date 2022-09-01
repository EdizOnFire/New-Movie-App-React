import { Link } from "react-router-dom";

const CatalogItem = ({ item }) => {
    return (
        <article className="catalogItem">
            <img src={item.imgUrl} alt="Apologies for the error." />
            <div id="itemName">{item.name}</div>
            <div id="itemReleaseDate">
                <small>{item.releaseDate}</small>
            </div>
            <Link to={`/catalog/${item._id}`} className="detailsButton">
                Details
            </Link>
        </article>
    );
};

export default CatalogItem;
