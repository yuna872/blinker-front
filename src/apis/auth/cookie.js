import { Cookies } from 'react-cookie';

const cookies = new Cookies();

const setCookies = (name, value, options) => {
  return cookies.set(name, value, { ...options });
};

const getCookies = (name) => {
  return cookies.get(name);
};

const removeCookies = (name) => {
  return cookies.remove(name, { path: '/' });
};

export { getCookies, setCookies, removeCookies };
