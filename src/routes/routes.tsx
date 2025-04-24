import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import PageNotFound from "./PageNotFound";
import Home from "../pages/home/Home";
import Profile from "../pages/profile/Profile";
import ChatRoom from "../pages/chat/room/ChatRoom";
import Navbar from "../components/navbar/Navbar";
import SignInForm from "../contexts/auth-dialogs/SignInForm";
import SignUpForm from "../contexts/auth-dialogs/SignUpForm";
import ChatHub from "../pages/chat/ChatHub";
import T3Hub from "../pages/tic-tac-toe/T3Hub";
import T3Match from "../pages/tic-tac-toe/match/T3Match";

const About = () => <h1>About</h1>;

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/chat" element={<ChatHub />} />
        <Route path="/chat/:roomId" element={<ChatRoom />} />
        <Route path="/tic-tac-toe" element={<T3Hub />} />
        <Route path="/tic-tac-toe/:roomId" element={<T3Match />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <SignInForm />
      <SignUpForm />
    </BrowserRouter>
  );
}
