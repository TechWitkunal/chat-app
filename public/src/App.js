import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SetAvatar from "./components/SetAvatar";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserUpdate from "./pages/UserUpdate";
import MakeFriendUrl from "./pages/MakeFriendUrl";
// import { setOnline } from "utils/APIRoutes";
import { setOnline } from "../src/utils/APIRoutes";
import axios from "axios";
// import axios from "axios";

export default function App() {
  let id = JSON.parse(localStorage.getItem("chat-app-current-user"))?._id;
  let setOnline1 = setOnline;
  const APICallBeforeUnLoad = async() => {
    // try {
    await axios.post(`${setOnline1}/${id}/${false}`);
    // }catch (error) {
    //  alert(error);
    // }
  }
  window.addEventListener('beforeunload', APICallBeforeUnLoad);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/setAvatar" element={<SetAvatar />} />
        <Route path="/updateinfo" element={<UserUpdate />} />
        <Route path="/" element={<Chat />} />
        <Route path="/url/makefriend/:friendUrl" element={<MakeFriendUrl />} />
      </Routes>
    </BrowserRouter>
  );
}
