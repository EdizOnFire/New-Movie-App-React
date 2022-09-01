import { useContext } from "react";
import { ItemContext } from "../../contexts/ItemContext";
import CatalogItem from "./CatalogItem/CatalogItem";

const Catalog = () => {
    const { items } = useContext(ItemContext);

    return (
        <section id="catalogPage">
            <br />
            <div className="section-title">
                <h4>All Movies</h4>
            </div>
            <div className="container" align="center">
                {items.length > 0 ? (
                    items.map((x) => <CatalogItem key={x._id} item={x} />)
                ) : (
                    <p>No Movies in Catalog!</p>
                )}
            </div>
        </section>
    );
};

export default Catalog;
