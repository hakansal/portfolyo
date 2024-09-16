import React from "react";
import "./navbar.css"

const Navbar = () => {

    return <div className=" ">



        <nav className="navbar navbar-expand-lg bg-body-tertiary  navbg">
        <div className="container-fluid">
            <a className="navbar-brand " href="/home">Hakan şal</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <a className="nav-link  " aria-current="page" href="/Cv">Cv</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/projelerim">Projelerim</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/iletişim">İletişim</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/hakkımda">Hakkımda</a>
                    </li>

                </ul>

            </div>
        </div>
    </nav></div>


}



export default Navbar;