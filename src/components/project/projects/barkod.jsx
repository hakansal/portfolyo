import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { solarizedlight } from "react-syntax-highlighter/dist/esm/styles/prism";

import barkod1 from "./img/barkod1.png"
import barkod2 from "./img/barkod2.png"
 
import "./projects.css"
import Codes from "./codes";

const Barkod = () => {
    const pics = [barkod1,barkod2];
    const [indeximg, setindeximg] = useState(0);
    const codes = [Codes.barkodv1.backendserver, Codes.barkodv1.app, Codes.barkodv1.crudekle ];
    const codesinfo = ["Backend Server", "App.js", "Crud (create)"];
    const fotoinfo=["ürün ekleme sayfası","navbar ",]
    const [index, setindex] = useState(0);
    const [codegecis, setcodegecis] = useState("fade-in");
    const [imggecis, setimggecis] = useState("fade-in");


    const imgileri = () => {
        setimggecis("fade-out");

        setTimeout(() => {
            if (indeximg < pics.length - 1) {
                const swap = indeximg + 1;
                setindeximg(swap)
            } else if (indeximg === pics.length - 1) {
                setindeximg(0)
            }
            setimggecis("fade-in")

        }, 500)
    }

    const imggeri = () => {
        setimggecis("fade-out");
        setTimeout(() => {
            if (indeximg > 0) {
                const swap = indeximg - 1;
                setindeximg(swap);
            }
            else if (indeximg ===0) {
                const swap = pics.length - 1;
                setindeximg(swap);
            }
            setimggecis("fade-in")

        }, 500)
    }

    const ileri = () => {
        setcodegecis("fade-out");

        setTimeout(() => {


            if (index < codes.length - 1) {
                const swap = index + 1;
                setindex(swap)
            } else if (index === codes.length - 1) {
                setindex(0)
            }
            setcodegecis("fade-in");

        }, 500);


    }
    const geri = () => {
        setcodegecis("fade-out");
        setTimeout(() => {

            if (index > 0) {
                const swap = index - 1;
                setindex(swap);
            }
            else if (index === 0) {
                setindex(codes.length - 1);
            }
            setcodegecis("fade-in");
        }, 500);

    }




    return <div>

        <div className="mainp">



            <div className="blocks">

                <div className="projectcode">
                    <div className="code">
                        <button onClick={geri} className="icon-button">
                            <i className="fas fa-arrow-left"></i>
                        </button>
                        <div className={`codep ${codegecis}`}>


                            <SyntaxHighlighter language="jsx" style={solarizedlight} className="codestyle">
                                {codes[index]}
                            </SyntaxHighlighter>


                        </div>
                        <button onClick={ileri} className="icon-button">
                            <i className="fas fa-arrow-right"></i>
                        </button>

                    </div>
                    <div className="codeinf">
                        <p className=" pbottom p"> {codesinfo[index]}</p>

                    </div>
                </div>
                < div className="projectcode">
                    <div className="fotoslider">
                        <button onClick={imggeri} className="icon-button">
                            <i className="fas fa-arrow-left"></i>
                        </button>
                        <div className="fotodiv">
                            <div  >
                                <img src={pics[indeximg]} className={`imgfoto ${imggecis}`} alt=" pr  " />
                            </div></div>


                        <button onClick={imgileri} className="icon-button">
                            <i className="fas fa-arrow-right"></i>
                        </button>
                    </div>
                    <div className="codeinf">
                            <p className=" pbottom p"> {fotoinfo[indeximg]}</p>

                        </div>

                </div>
            </div>


            <div className="projedetay">
                <h1 className="newh1"> Barkod V1</h1>

                <p className="newp">Projem, MERN stack yapısıyla geliştirilmiş bir barkod takip sistemidir. Backend kısmında, MongoDB ile veri tabanında tablolar oluşturarak bu tablolar üzerinde CRUD (Create, Read, Update, Delete) işlemleri gerçekleştiriyorum. Mongoose kütüphanesini kullanarak MongoDB ile etkileşimli, şemaya dayalı veri modellemeleri yapıyorum. Ayrıca, Express.js framework'ü ile çeşitli API uç noktaları oluşturarak bu veritabanı işlemlerine erişim sağlıyorum.

Frontend kısmında ise React kullanarak kullanıcı arayüzünü geliştiriyorum. Backend'de oluşturduğum API'lara fetch metodu ile istekler göndererek verileri çekiyorum ve bu verileri React bileşenlerinde dinamik olarak görüntülüyorum. Bu yapıyla kullanıcılar, barkod verilerini sisteme ekleyip güncelleyebiliyor, veritabanında bulunan bilgileri görüntüleyebiliyor ve düzenleyebiliyorlar.</p>

            </div>



            <div className="logolar">

                <div>
                    <button className="icon-button icon-buttonlogo">
                        <a href="https://github.com/hakansal/flutter-app" target=" "  >
                            <i className="fab fa-github">
                            </i>

                        </a>
                    </button>

                    <a href="https://github.com/hakansal/flutter-app" target=" "  >
                        <i className="fab  ">
                            flutter-app


                        </i>

                    </a>
                </div>

                <div>
                    <button className="icon-button icon-buttonlogo">

                        <a href="https://github.com/hakansal/todo-app-mern-stack" target=" "  >
                            <i className="fab fa-github">
                            </i>

                        </a>
                    </button>

                    <a href="https://github.com/hakansal/todo-app-mern-stack" target=" "  >
                        <i className="fab  ">
                            todo-app-mern-stack

                        </i>

                    </a>
                </div>
                <div>
                    <button className="icon-button icon-buttonlogo">
                        <a href="https://github.com/hakansal/mern-barkodv1-frontend" target=" "  >
                            <i className="fab fa-github">
                            </i>
                        </a>
                    </button>
                    <a href="https://github.com/hakansal/mern-barkodv1-frontend" target=" "  >
                        <i className="fab  ">
                            mern-barkodv1-frontend
                        </i>
                    </a>
                </div>
            </div>



        </div>
    </div>
}

export default Barkod;