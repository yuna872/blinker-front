import axios from "axios";

export const httpClientForCredential = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  headers : { 'access-token' : ''},
  withCredentials: true, // cors 관련 설정
});
