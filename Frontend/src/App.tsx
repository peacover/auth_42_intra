<<<<<<< HEAD
import React from 'react';
import { FunctionComponent, useEffect, useState , useRef} from "react";
import Sketch  from "react-p5";
import p5Types from "p5";
import { io, Socket } from "socket.io-client";
import {GameState} from "./components/Ball"
import p5 from 'p5';
import {Paddle, Lobby, MessageInput} from "./components/Lobby"
import logo from './logo.svg';
import  SketchPong  from './components/My_sketch';
import  Spectator  from './components/spectator_mod';
import { BrowserRouter, Route, Routes } from 'react-router-dom';



function App() {
  return (
  <BrowserRouter>
      <Routes>
        <Route path='/game' element={<SketchPong/>} />
        <Route path='/watch/*' element={<Spectator/>} />
        
      </Routes>
  </BrowserRouter>)

}
  
 export default App
=======
import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Addfriend from "./pages/Addfriend"
import SketchPong from "./components/My_sketch";
import Spectator from "./components/spectator_mod";
import Login from "./pages/login";
import Nofriendpage from "./pages/errornotfound";

import './index'
import axios from "axios";

function App() {
  const [state, setState] = useState<any>({});
  useEffect(() => {
    axios.get('http://localhost:5000/user/user',{withCredentials: true})
  .then((response) =>
  {
    setState(response.data);
  })
},[])
console.log("ayoub zab : " + state.is_two_fa_enable);
  return (
  <>
   
      <Routes>
        <Route path="/" element={<Dashboard />} >
        <Route index element={<Home />} />
        <Route path="/profile/*" element={<Profile/>} />
        <Route path='/settings' element={<Settings state={state.is_two_fa_enable }/>} />
        <Route path='/Addfriend' element={<Addfriend/>} />
        <Route path='/game' element={<SketchPong/>} />
        <Route path='/watch/*' element={<Spectator />} />
        <Route path='/login' element={<Login/>} />
        <Route path ='/errornotfound' element={<Nofriendpage/>}/>
              
       </Route>
      </Routes>
    </>
  );  

}
  
 export default App;
>>>>>>> auth_master

