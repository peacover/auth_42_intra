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
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';



function App() {


  return (
  <BrowserRouter>
      <Routes>
        <Route path='/game' element={<SketchPong/>} />
        
      </Routes>
  </BrowserRouter>)

}
  
 export default App
