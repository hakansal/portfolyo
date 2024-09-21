import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { solarizedlight } from "react-syntax-highlighter/dist/esm/styles/prism";
 
import flutter1 from "./img/flutter1.png"
import flutter2 from "./img/flutter2.jpg"
 
import Codes from "./codes";

import "./projects.css"


const Flutter = () => {
    const pics = [flutter1, flutter2];
    const [indeximg, setindeximg] = useState(0);
    const codes = [Codes.flutter.screenmain, Codes.flutter.model,Codes.flutter.detailscreen];
    const [index, setindex] = useState(0);
    const [codegecis, setcodegecis] = useState("fade-in");
    const [imggecis, setimggecis] = useState("fade-in");
    const codesinfo = [" Screen main", "Model", " Detail screen"];

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
            else if (indeximg === 0) {
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
                                <img src={pics[indeximg]} className={`imgfoto ${imggecis}`} alt="Slider Image" />
                            </div></div>


                        <button onClick={imgileri} className="icon-button">
                            <i className="fas fa-arrow-right"></i>
                        </button>
                    </div>

                </div>
            </div>


            <div className="projedetay">
                <h1 className="newh1">Flutter Coin App</h1>
                
                <p className="newp"> Projem, bir Flutter mobil uygulamasıdır. Bu projede, bir API'dan JSON formatında dönen güncel kripto paralarının verilerini alarak, oluşturduğum bir model yapısı ile bu verileri map'leyip bir liste şeklinde gösteren bir ekran tasarladım. Kullanıcılar, kripto paraların isimlerini ve güncel değerlerini görebiliyorlar.

Daha sonra bu projede, kullanıcı deneyimini artırmak için liste öğelerine dokunarak daha fazla detay gösterecek bir detay sayfası eklemeyi planlıyorum. Ayrıca, verilerin düzenli olarak güncellenmesini sağlamak için bir zamanlayıcı (timer) kullanarak belirli aralıklarla API'dan veri çekmeyi de düşünüyorum. Böylece kullanıcılar, sürekli güncel bilgilere ulaşabilecekler. </p>

            </div>



            <div className="logolar">

<div>
    <button className="icon-button icon-buttonlogo">
        <a href="https://github.com/hakansal/flutter-app" target="_blank"  >
            <i className="fab fa-github">
            </i>

        </a>
    </button>

    <a href="https://github.com/hakansal/flutter-app" target="_blank"  >
        <i className="fab  ">
            flutter-app


        </i>

    </a>
</div>

<div>
    <button className="icon-button icon-buttonlogo">

        <a href="https://github.com/hakansal/todo-app-mern-stack" target="_blank"  >
            <i className="fab fa-github">
            </i>

        </a>
    </button>

    <a href="https://github.com/hakansal/todo-app-mern-stack" target="_blank"  >
        <i className="fab  ">
            todo-app-mern-stack

        </i>

    </a>
</div>
<div>
    <button className="icon-button icon-buttonlogo">
        <a href="https://github.com/hakansal/mern-barkodv1-frontend" target="_blank"  >
            <i className="fab fa-github">
            </i>
        </a>
    </button>
    <a href="https://github.com/hakansal/mern-barkodv1-frontend" target="_blank"  >
        <i className="fab  ">
            mern-barkodv1-frontend
        </i>
    </a>
</div>
</div>



        </div>
    </div>
}

export default Flutter;