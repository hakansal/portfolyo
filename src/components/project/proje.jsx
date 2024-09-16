
import React, { useState } from "react";
import "./proje.css";
 



const Proje = () => {

 

    return <div   >

        <div className="projedis">
            <div className="projecard">
                <div className="cardimg">

                </div>
                <h2>Todo Web app</h2>
                <button className="icon-button" href="/flutter">
                    <a href="/todo">incele </a>

                </button>

            </div>
            <div className="projecard">
                <div className="cardimg">

                </div>
                <h2>barkod v1</h2>

                <button className="icon-button"  >
                    <a href="/barkod">detay </a>

                </button>
            </div>
            <div className="projecard">
                <div className="cardimg">

                </div>
                <h2> flutter</h2>

                <button className="icon-button"  >
                    <a href="/flutter">detay </a>

                </button>
            </div>
        </div>


    </div>
}

export default Proje;