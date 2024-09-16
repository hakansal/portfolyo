import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Navbar from "./components/navbar/navbar";
import Cv from "./components/cv/cv";
import Ilt from "./components/ilt/ilt";
import Hak from "./components/hakkımda/hakkımda";
import Proje from "./components/project/proje";
import Flutter from "./components/project/projects/flutter";
import Barkod from "./components/project/projects/barkod";
import Todo from "./components/project/projects/todo";
import Home from "./components/home/home";
function App() {
  return (
    <div className="App">

      <Router>
        <Navbar/>
        <Routes>
            <Route path="/home" element={<><Home/></>}/>
            <Route path="/ " element={<><Home/></>}/>
            <Route path="/Cv" element={<> <Cv  /></>}/>
            <Route path="/iletişim" element={<><Ilt/></>}/>
            <Route path="/projelerim" element={<><Proje/></>}/>           
            <Route path="/hakkımda" element={<><Hak/></>}/>
            <Route path="/flutter" element={<><Flutter/></>}/>
            <Route path="/todo" element={<><Todo/></>}/>
            <Route path="/barkod" element={<><Barkod/></>}/>

        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
