import * as request from "./requester";

const baseUrl = "http://localhost:3030/data/comments";

export const create = (itemId, comment) =>
  request.post(baseUrl, { itemId, text: comment });

export const getByItemId = (itemId) => {
  const relations = encodeURIComponent(`user=_ownerId:users`);
  const search = encodeURIComponent(`itemId="${itemId}"`);

  return request.get(`${baseUrl}?where=${search}&load=${relations}`);
};
