import React from "react";
import "./ilt.css"

const Ilt = () => {

    return <div className="divv">

        <div className="mainilt">
            <h1>iletişim bilgileri</h1>
            <hr className="hr hrp"></hr>
            

            <div className="infos ">
                <i className="fas fa-phone  "></i>
                <p className="iltp"> +90 05414808864</p>

            </div>
            <div className="infos ">
                <i className="fas fa-envelope "></i>
                <p className="iltp"> hakansal3149@yandex.com</p>

            </div>
            <div className="infos ">

                <i className="fab fa-linkedin "></i>
                <a href="https://www.linkedin.com/in/hakan-şal-8a332119b/" target="_blank"  >
                    <p className="iltp"> Linkedin Hakan şal</p>
                </a>

            </div>
            <div className="infos ">

                <i className="fab fa-github "></i>
                <a href="https://github.com/hakansal" target="_blank"  >
                    <p className="iltp"> Github Hakan şal</p>
                </a>

            </div>
            




        </div>



    </div>
};


export default Ilt;