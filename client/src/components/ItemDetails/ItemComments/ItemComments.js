import { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { ItemContext } from "../../../contexts/ItemContext";
import { AuthContext } from "../../../contexts/AuthContext";
import * as itemService from "../../../services/itemService";
import * as commentService from "../../../services/commentService";

const ItemComments = () => {
    const { addComment, fetchItemDetails, selectItem } = useContext(ItemContext);
    const { user } = useContext(AuthContext);
    const { itemId } = useParams();
    const [comment, setComment] = useState("");

    const currentItem = selectItem(itemId);

    useEffect(() => {
        (async () => {
            const itemDetails = await itemService.getOne(itemId);
            const itemComments = await commentService.getByItemId(itemId);

            fetchItemDetails(itemId, {
                ...itemDetails,
                comments: itemComments.map((x) => `${x.user.email}: ${x.text}`),
            });
        })();
    }, []);

    const addCommentHandler = (e) => {
        e.preventDefault();

        commentService.create(itemId, comment).then(() => {
            addComment(itemId, comment);
            setComment("");
        });
    };

    if (currentItem.comments === undefined) {
        return;
    }

    return (
        <div className="comments" align='center'>
            <h2>Comments:</h2>
            <div>
                {currentItem.comments.length !== 0 ? (
                    currentItem.comments.map((x) => (
                        <div key={Math.random(10000)} className="comment">
                            {x}
                        </div>
                    ))
                ) : (
                    <p className="no-comment">No comments.</p>
                )}
            </div>

            {user.email && (
                <form align="center" className="addComments" onSubmit={addCommentHandler}>
                    <textarea
                        name="comment"
                        required="required"
                        placeholder="Comment......"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <div>
                        <button type="submit">Add Comment</button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default ItemComments;
