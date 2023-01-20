import { render } from "@testing-library/react";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Navigate ,useNavigate} from 'react-router-dom'
import Swal from "sweetalert2";
import { StringLiteral } from "typescript";
import avatar1 from "../../Assets/Ellipse 213.png";
import fireIcon from "../../Assets/fire.png";
import {Usercontext} from "../../context/Usercontext"
//import IoMdPersonAdd from 
import {IoMdPersonAdd} from 'react-icons/io'
import {ImBlocked} from 'react-icons/im'
import {CgUnblock} from 'react-icons/cg'

const ProfileUp = () => {
  const [me, itsme] = useState(true);
  const navigate = useNavigate();
  const [Username, setUsername] = useState("");
  const [fullname, getFullname] = useState("");
  const [mee, itsmee] = useState("");
  const [check, Setcheck] = useState("");
  let shkon = window.location.pathname.split("/",3)[2];
  let url:string ;
  let ana  = "sel-fcht";
  if(shkon)
  {
     url = "http://localhost:5000/user/user/" + shkon;
  }
  else
{
  url = "http://localhost:5000/user/user"
}
  useEffect(()=>
  {
      let response = axios.get('http://localhost:5000/user/status_friend/' + shkon, {withCredentials: true})
      .then((res)=>{
         Setcheck(res.data.status);
   })
  })
  useEffect(() =>{
    if (shkon)//sel-fcht
    {
      if (shkon == ana)
        itsme(false)
      else
        itsme(true);
    }
    else
      itsme(false)
  },[])
  //window.alert("WASH ANAaa " + me);
  
 
  const [User, SetUser] = useState<any>({});
  useEffect(() => {
    axios.get(url, {withCredentials: true})
    .then((response) =>{
        itsmee(response.data.username);
        SetUser(response.data);
        setUsername(response.data.username);
        getFullname(response.data.full_name);
      }).catch(error => 
        {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Friend not found',
            footer: '<Link to={"/"} Why do I have this issue? Probably because Baghi t7esselna</Link>'
          })
          navigate("/errornotfound");
        });
  },[])

return (
  <div className="flex items-center justify-center gap-[120px]">
    {/* {{itsme} && } */}
    <div>
    <div className="flex items-center gap-[40px]">
      <div>
        <img
          className="w-[140px] h-[140px] object-contain"
          src={User.avatar}
          alt="avatar"
        />
      </div>
      <br/>
      {me && check=="not_friend" && (
        <button className = 'addbutton'>
        <div className="text-[#00FF00] font-[500] tracking-wider text-[#F2F2F2]" >ADD</div>
        <IoMdPersonAdd/>
      </button>)
      }
       {me && check=="friend" && (
        <button className = 'addbutton'>
        <div className="text-[#FF0000] font-[500] tracking-wider text-[#F2F2F2]" >Block</div>
        <ImBlocked/>
      </button>)
      }
       {me && check=="blocked" && (
        <button className = 'addbutton'>
        <div className="text-[#0000FF] font-[500] tracking-wider text-[#F2F2F2]" >Unblock</div>
        <CgUnblock/>
      </button>)
      }
      
      <div>
        <h1 className="text-[24px] font-[500] tracking-wider text-[#F2F2F2]">
          {fullname}
        </h1>
        <h6 className="text-[#828282] text-[20px] tracking-wider">{Username}</h6>
      </div>
    </div>
    <div className="h-fit px-[27px] py-[21px] flex items-center gap-[40px] bg-[#262626] rounded-[20px]">
      <h1 className="text-[24px] text-white">
        Current <span className="text-[#ECCC6B]">Score</span> :
      </h1>
      <div className="flex items-center gap-[1rem]">
        <img src='../../Assets/fire.png' alt="fire" />
        <h1 className="text-[22px] text-white">
          5734 <span className="text-[#ECCC6B]">PTS</span>
        </h1>
      </div>
    </div>
    </div>
</div>
);
};

export default ProfileUp;
