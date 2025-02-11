import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import PageNotFound from "./PageNotFound";
import Home from "../pages/home/Home";
import Profile from "../pages/profile/Profile";
import Chat from "../pages/chat/ChatApp";
import ChatRoom from "../pages/chat/room/ChatRoom";
import Navbar from "../components/navbar/Navbar";

const About = () => <h1>About</h1>;

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/chat/:chatId" element={<ChatRoom />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
