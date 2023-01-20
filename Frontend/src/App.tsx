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

