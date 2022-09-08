import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ItemContext } from "../../contexts/ItemContext";
import * as itemService from "../../services/itemService";

const EditItem = () => {
  const [currentItem, setCurrentItem] = useState({});
  const { itemEdit } = useContext(ItemContext);
  const { itemId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      itemService.getOne(itemId).then((itemData) => {
        setCurrentItem(itemData);
      });
    } catch (error) {
      alert(error);
    }
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    const itemData = Object.fromEntries(new FormData(e.target));
    try {
      itemService.edit(itemId, itemData).then((result) => {
        itemEdit(itemId, result);
        navigate(`/catalog/${itemId}`);
      });
    } catch (error) {
      alert(error);
    }
  };

  return (
    <section className="createPage">
      <br />
      <div className="section-title">
        <h4>Add Movie</h4>
      </div>
      <form align="center" onSubmit={onSubmit}>
        <label htmlFor="name">
          Movie Name
        </label>
        <input
          required="required"
          id="name"
          name="name"
          type="text"
          defaultValue={currentItem.name}
        />
        <label htmlFor="imgUrl">
          Image Url
        </label>
        <input
          required="required"
          id="imgUrl"
          name="imgUrl"
          type="text"
          defaultValue={currentItem.imgUrl}
        />
        <label htmlFor="releaseDate">
          Release date
        </label>
        <input
          required="required"
          id="releaseDate"
          name="releaseDate"
          type="text"
          defaultValue={currentItem.releaseDate}
        />
        <label htmlFor="writer">
          Writer
        </label>
        <input
          required="required"
          id="writer"
          name="writer"
          type="text"
          defaultValue={currentItem.writer}
        />
        <label htmlFor="genre">
          Genre
        </label>
        <input
          id="genre"
          required="required"
          name="genre"
          type="text"
          defaultValue={currentItem.genre}
        />
        <label htmlFor="description">
          Description
        </label>
        <textarea
          name="description"
          required="required"
          defaultValue={currentItem.description}
        />
        <div>
          <button type="submit">
            Edit Movie
          </button>
        </div>
      </form>
      <br />
    </section>
  );
};

export default EditItem;
