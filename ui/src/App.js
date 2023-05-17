import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthContext from "./context/AuthContext";
import Login from "./Pages/Login";
import Candidates from "./Pages/Candidates";
import Election from "./Pages/Election";
import CandidateForm from "./Pages/CandidateForm";
import Council from "./Pages/Council";
import SideBar from "./Mainpage-Components/SideBar";
import Home from "./Pages/Home";
import "./App.css";

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <div className="app-container">
      <img
        src="https://bhib.iyte.edu.tr/wp-content/uploads/sites/115/2018/09/iyte_logo-tur.png"
        style={{ width: '200px', height: 'auto', margin: '0 auto', display: 'block' }}
        alt="IYTE Logo"
      />

      <BrowserRouter>
        <div className="content-container">
          {authCtx.isLoggedIn && <SideBar />}
          <Routes>
            {!authCtx.isLoggedIn && <Route path="/*" element={<Login />} />}
            {authCtx.isLoggedIn && (
              <>
              {/* Buraya auth context ile kullanıcıların hangi sayfaları görebileceğini ekleyeceğiz. 
              Şu an kullanıcı giriş yapmamışken hiçbir sayfaya giremiyor karşısına hep login çıkacak.
              Giriş yaptıktan sonra öğrenci ve görevlilere farklı butonlar aktif olacak. Inline if state'i ve 
              authcontext rol kontrolü ile bunu sağlayacağız. */}
                {authCtx.userRole=="student"&&<Route path="/council" element={<Council />} />}
                <Route path="/home" element={<Home />} />
                <Route path="/candidates" element={<Candidates />} />
                <Route path="/election" element={<Election />} />
                {authCtx.userRole=="student"&&<Route path="/candidateform" element={<CandidateForm />} />}
              </>
            )}
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
