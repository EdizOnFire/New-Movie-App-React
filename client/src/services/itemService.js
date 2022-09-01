import * as request from "./requester";

const baseUrl = 'http://localhost:3030/data/movies';

export const getAll = () => request.get(baseUrl);

export const getOne = (itemId) => request.get(`${baseUrl}/${itemId}`);

export const create = (itemData) => request.post(baseUrl, itemData);

export const edit = (itemId, itemData) => request.put(`${baseUrl}/${itemId}`, itemData);

export const remove = (itemId) => request.del(`${baseUrl}/${itemId}`);
