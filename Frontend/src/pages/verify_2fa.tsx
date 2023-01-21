import axios, { AxiosResponse } from "axios";
import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
const Verify_2fa = () =>
{
    const [code, setCode] = useState<string>("");
    const [error, setError] = useState<string>("");
    const navigate = useNavigate();
    const handleSubmit =  (e: React.FormEvent<HTMLFormElement>) =>
    {
        e.preventDefault();
        if (code.length < 6 ){
            setError("Invalid Code");
        //    window.alert(error);
            window.alert(error);
            return;
        }
        
        axios.post("http://localhost:5000/auth/login/2fa/" + code, {code}, {withCredentials: true})
        .then((res) =>{
                window.alert("You have Succesufully Signed in, Welcome back!");
                navigate("/");
        }).catch((err) =>
        {
            window.alert("error : " + err.response.status)
            console.log("Error : " + err);
            //window.alert(err);
            setError(err);
        });
    };
        return (
            <div> 
             <form onSubmit={handleSubmit}>
                <label htmlFor="code"> Code: </label>
                <input 
                    type="text"
                    value={code}
                    placeholder="Enter Received Code"
                    onChange ={(e) =>setCode(e.target.value)}
                    autoFocus
                />
                <button type="submit">
                    <span>Confirm </span> 
                    </button>
            </form>
            </div>

    );

}
export default Verify_2fa; 

