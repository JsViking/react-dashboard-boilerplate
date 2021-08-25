/* eslint-disable import/no-cycle */
/* eslint-disable import/extensions */
/* eslint-disable no-console */
import axios, { baseURL } from './axios';
import { store } from '../store.js';

const axiosApiInstance = axios.create();
axiosApiInstance.defaults.baseURL = baseURL;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['Content-Type'] = 'application/json';

// метод для работы с snakebar нотификацией через rematch
const showSnakebar = ({ message, type = 'success' }) => {
  store.dispatch.snakebar.toggle({
    isShow: true,
    type,
    message,
  });
  setTimeout(store.dispatch.snakebar.close, 2000);
};

// Users
export const getUsersList = async (query) => {
  try {
    const { data } = await axios(`users/${query || ''}`);
    return data;
  } catch (error) {
    console.error(error);
    showSnakebar({ type: 'danger', message: 'Что-то пошло не так!' });
    return {};
  }
};

// Кэшированный список пользователей без пагинации
export const getUsersAuthorsList = async (query) => {
  try {
    const { data } = await axios(`users/authors/${query || ''}`);
    return data;
  } catch (error) {
    console.error(error);
    showSnakebar({ type: 'danger', message: 'Что-то пошло не так!' });
    return {};
  }
};

export const createUser = async (obj) => {
  try {
    const { data } = await axios.post(`users/`, obj);
    if (data.id) showSnakebar({ message: 'Пользователь успешно создан!' });
    return data;
  } catch (error) {
    console.error(error);
    showSnakebar({ type: 'danger', message: 'Что-то пошло не так!' });
    return {};
  }
};

export const getUser = async (id) => {
  try {
    const { data } = await axios(`users/${id}/`);
    return data;
  } catch (error) {
    console.error(error);
    showSnakebar({ type: 'danger', message: 'Что-то пошло не так!' });
    return {};
  }
};

export const saveUser = async (id, obj) => {
  try {
    const { data } = await axios.patch(`users/${id}/`, obj);
    if (data.id) showSnakebar({ message: 'Сохранено успешно!' });
    return data;
  } catch (error) {
    console.error(error);
    showSnakebar({ type: 'danger', message: 'Что-то пошло не так!' });
    return {};
  }
};

// Auth
export const getToken = async (obj) => {
  try {
    const { data } = await axiosApiInstance.post(`token/`, { ...obj });
    if (data.id) showSnakebar({ message: 'Пользователь успешно создан!' });
    return data;
  } catch (error) {
    showSnakebar({ type: 'danger', message: 'Не найден пользователь!' });
    return {};
  }
};

export const refreshToken = async (obj) => {
  try {
    const { data } = await axiosApiInstance.post(`token/refresh/`, { ...obj });
    return data;
  } catch (error) {
    showSnakebar({ type: 'danger', message: 'Не найден пользователь!' });
    return {};
  }
};

// Permissions
export const getPermissions = async (query) => {
  try {
    const { data } = await axios(`permissions/${query || ''}`);
    return data;
  } catch (error) {
    console.error(error);
    showSnakebar({ type: 'danger', message: 'Что-то пошло не так!' });
    return {};
  }
};

export const savePermissions = async (obj) => {
  try {
    const { data } = await axios.post(`permissions/`, { permissions: obj });
    if (Array.isArray(data)) showSnakebar({ message: 'Сохранено успешно!' });
    return data;
  } catch (error) {
    console.error(error);
    showSnakebar({ type: 'danger', message: 'Что-то пошло не так!' });
    return {};
  }
};

export const getRoles = async (query) => {
  try {
    const { data } = await axios(`roles/${query || ''}`);
    return data;
  } catch (error) {
    console.error(error);
    showSnakebar({ type: 'danger', message: 'Что-то пошло не так!' });
    return {};
  }
};
