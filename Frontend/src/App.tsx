import React, { useEffect, useState } from "react";
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Addfriend from "./pages/Addfriend";
import SketchPong from "./components/My_sketch";
import Spectator from "./components/spectator_mod";
import Login from "./pages/login";
import Nofriendpage from "./pages/errornotfound";

import Verify_2fa from "./pages/verify_2fa";
import "./index";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getUser, IUserState, login } from "./reducers/UserSlice";

function App() {
  const [state, setState] = useState<any>({});

  const userData: IUserState = useSelector((state: any) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, []);

  useEffect(() => {
    if (!userData.isLoggedIn) {
      axios
        .get("http://localhost:5000/user/me", { withCredentials: true })
        .then((response) => {
          dispatch(login(response.data));
        });
    }
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/user/user", { withCredentials: true })
      .then((response) => {
        setState(response.data);
      });
  }, []);
  console.log("ayoub zab : " + state.is_two_fa_enable);
  return (
    <>
      <Routes>
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Dashboard />}>
            <Route index element={<Home />} />
            <Route path="/profile/*" element={<Profile />} />
            <Route
              path="/settings"
              element={<Settings state={state.is_two_fa_enable} />}
            />
            <Route path="/friends" element={<Addfriend />} />
            <Route path="/game" element={<SketchPong />} />
            <Route path="/watch/*" element={<Spectator />} />
          </Route>
        </Route>
        <Route element={<NotRequireAuth />}>
          <Route path="/" element={<Dashboard />}>
            <Route path="/verify_2fa/:userId" element={<Verify_2fa />} />
            <Route path="/login" element={<Login />} />
          </Route>
          <Route path="/errornotfound" element={<Nofriendpage />} />
        </Route>
        <Route path="*" element={<Navigate to="/errornotfound" replace />} />
      </Routes>
    </>
  );
}

export default App;

function RequireAuth({ children }: { children?: JSX.Element }) {
  const userData: IUserState = useSelector((state: any) => state.user);
  let location = useLocation();

  if (userData.isLoading) return <div>Loading...</div>;

  if (!userData.isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (children) {
    return children;
  }

  return <Outlet />;
}

function NotRequireAuth({ children }: { children?: JSX.Element }) {
  const userData: IUserState = useSelector((state: any) => state.user);
  let location = useLocation();

  if (userData.isLoading) return <div>Loading...</div>;

  if (userData.isLoggedIn) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (children) {
    return children;
  }

  return <Outlet />;
}
