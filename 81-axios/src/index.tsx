import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import axios, { AxiosResponse } from './axios'
const baseURL = 'http://localhost:8080'

export interface User {
  username: string;
  password: string;
}

const user: User = {
  username: 'zhufeng',
  password: '123456'
}

axios({
  method: 'get',
  url: baseURL + '/get',
  params: user
}).then((response: AxiosResponse) => {
  console.log('response---', response)
  return response.data 
}).then((data: User) => {
  console.log('data-', data)
}).catch((error: any) => {
  console.log('err-', error)
})



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
