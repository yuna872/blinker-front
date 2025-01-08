import React from 'react';
import ReactDOM from 'react-dom/client'; // createRoot 메서드를 가져오기
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root')); // ReactDOM.createRoot 사용
root.render(
    <App />
);