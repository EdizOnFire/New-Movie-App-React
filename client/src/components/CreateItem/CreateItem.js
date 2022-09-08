import { useContext } from "react";
import { ItemContext } from "../../contexts/ItemContext";
import * as itemService from "../../services/itemService";

const CreateItem = () => {
  const { itemAdd } = useContext(ItemContext);

  const onSubmit = (e) => {
    e.preventDefault();

    const itemData = Object.fromEntries(new FormData(e.target));
    try {
      itemService.create(itemData).then((result) => {
        itemAdd(result);
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
        <label htmlFor="genre">Movie Name</label>
        <input
          required="required"
          id="name"
          name="name"
          type="text"
          placeholder="Movie name"
        />
        <label htmlFor="genre">Image Url</label>
        <input
          required="required"
          id="imgUrl"
          name="imgUrl"
          type="text"
          placeholder="Image Url"
        />
        <label htmlFor="genre">Release Date</label>
        <input
          required="required"
          id="releaseDate"
          name="releaseDate"
          type="text"
          placeholder="Release date"
        />
        <label htmlFor="genre">Writer</label>
        <input
          required="required"
          id="writer"
          name="writer"
          type="text"
          placeholder="Writer"
        />
        <label htmlFor="genre">Genre</label>
        <input
          required="required"
          id="genre"
          name="genre"
          type="text"
          placeholder="Genre"
        />
        <label htmlFor="genre">Description</label>
        <textarea
          required="required"
          name="description"
          type="text"
          placeholder="Description"
        />
        <div>
          <button type="submit">Add New Movie</button>
        </div>
      </form>
      <br />
    </section>
  );
};

export default CreateItem;
