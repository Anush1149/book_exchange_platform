import Home from "./pages/home/home";
import Login from "./pages/user/login";
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Write from "./pages/write/write";

export default function App(){
  return(
    <BrowserRouter>
        <Routes>
          <Route exact path = "/" element={<Login/>} />
          <Route exact path = "/home" element = {<Home/>} />
          <Route exact path = "/write" element = {<Write/>} />
        </Routes>
    </BrowserRouter>
  )
}