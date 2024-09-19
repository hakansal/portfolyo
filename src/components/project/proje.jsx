
import React from "react";
import "./proje.css";


const Proje = () => {



    return <div   >

        <div className="projedis">
            <div className="projecard">
                <div className="cardimg">

                    <p className="logo-p">To Do App</p>


                </div>
                <h2>Todo Web app</h2>
                <button className="icon-button" href="/flutter">
                    <a href="/todo">incele </a>

                </button>

            </div>
            <div className="projecard">
                <div className="cardimg">
                <p className="logo-p">Barkod v1</p>

                </div>
                <h2>Barkod v1</h2>

                <button className="icon-button"  >
                    <a href="/barkod">
                    incele
                     </a>

                </button>
            </div>
            <div className="projecard">
                <div className="cardimg">
                <p className="logo-p">Coin track</p>

                </div>
                <h2> flutter</h2>

                <button className="icon-button"  >
                    <a href="/flutter">incele </a>

                </button>
            </div>
        </div>


    </div>
}

export default Proje;