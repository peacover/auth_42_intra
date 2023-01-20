<<<<<<< HEAD
import React from 'react';
=======
import React from "react";
>>>>>>> auth_master
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
<<<<<<< HEAD

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  //<React.StrictMode>
    <App />
  //</React.StrictMode>
=======
import { BrowserRouter } from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
<BrowserRouter>
<App />
</BrowserRouter>


  

>>>>>>> auth_master
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
<<<<<<< HEAD
reportWebVitals();
=======

reportWebVitals();
>>>>>>> auth_master
