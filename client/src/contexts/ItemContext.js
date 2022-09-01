import { createContext, useReducer, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ADD_COMMENT, ADD_ITEM, ADD_ITEMS, FETCH_ITEM_DETAILS, DELETE_ITEM } from "../constants";

import * as itemService from "../services/itemService";

export const ItemContext = createContext();

const itemReducer = (state, action) => {
  switch (action.type) {
    case ADD_ITEMS:
      return action.payload.map((x) => ({ ...x, comments: [] }));
    case ADD_ITEM:
      return [...state, action.payload];
    case FETCH_ITEM_DETAILS:
      return state.map((x) => (x._id === action.itemId ? action.payload : x));
    case ADD_COMMENT:
      return state.map(
        (x) =>
          x._id === action.itemId && {
            ...x,
            comments: [...x.comments, action.payload]
          }
      );
    case DELETE_ITEM:
      return state.filter((x) => x._id !== action.itemId);
    default:
      return state;
  }
};

export const ItemProvider = ({ children }) => {
  const navigate = useNavigate();
  const [items, send] = useReducer(itemReducer, []);

  useEffect(() => {
    itemService.getAll().then((result) => {
      const action = {
        type: "ADD_ITEMS",
        payload: result,
      };

      send(action);
    });
  }, []);

  const selectItem = (itemId) => {
    return items.find((x) => x._id === itemId) || {};
  };

  const fetchItemDetails = (itemId, itemDetails) => {
    send({
      type: "FETCH_ITEM_DETAILS",
      payload: itemDetails,
      itemId,
    });
  };

  const addComment = (itemId, comment) => {
    send({
      type: "ADD_COMMENT",
      payload: comment,
      itemId,
    });
  };

  const itemAdd = (itemData) => {
    send({
      type: "ADD_ITEM",
      payload: itemData,
    });

    navigate("/catalog");
  };

  const itemRemove = (itemId) => {
    send({
      type: "DELETE_ITEM",
      itemId,
    });
  };

  return (
    <ItemContext.Provider
      value={{
        items,
        itemAdd,
        addComment,
        fetchItemDetails,
        selectItem,
        itemRemove,
      }}
    >
      {children}
    </ItemContext.Provider>
  );
};
