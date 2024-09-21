import React, { useState } from "react";
import "./projects.css";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { solarizedlight } from "react-syntax-highlighter/dist/esm/styles/prism";
import Codes from "./codes";
import todo1 from "./img/todo1.png"
import todo2 from "./img/todo2.png"
import todo3 from "./img/todo3.png"
import todo4 from "./img/todo4.png"



const Todo = () => {
    const pics = [todo1, todo2, todo3,todo4];
    const [indeximg, setindeximg] = useState(0);
    const codes = [Codes.todo.app,Codes.todo.about,Codes.todo.auth,Codes.todo.model];
    const [index, setindex] = useState(0);
    const [codegecis, setcodegecis] = useState("fade-in");
    const [imggecis, setimggecis] = useState("fade-in");
    const codesinfo = ["App.js", "about page", "auth.js","user model"];
    const fotoinfo=["home sayfası","kullanıcı girişi","kayıt oluşturma","hakkımızda sayfası"]

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
            else if (indeximg=== 0) {
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


    return (
        <div  >
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
                    < div className="projectcode  ">
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
                        <div className="codeinf">
                            <p className=" pbottom p"> {fotoinfo[indeximg]}</p>

                        </div>

                    </div>
                </div>
                <div className="projedetay">
                    <h1 className="newh1"> To Do App</h1>

                    <p className="newp">Projem, bir to-do uygulaması olarak geliştirilmiştir ve MERN stack yapısıyla hazırlanmıştır. Backend kısmında, kullanıcı kayıt ve giriş sistemini kurmak için MongoDB ile veritabanı işlemleri yapıyorum. Kullanıcılar, uygulamaya kaydolup giriş yaptıktan sonra kendi hesaplarıyla ilişkilendirilmiş notlar oluşturabiliyor, güncelleyebiliyor, silebiliyor ve görüntüleyebiliyor. Mongoose kütüphanesi ile şemaya dayalı veri modelleri oluşturuyor, kullanıcı ve not bilgilerini MongoDB veritabanında tutuyorum.

Express.js framework'ü ile API endpoint'lerini yapılandırdım. Bu endpoint'ler aracılığıyla kullanıcı kimlik doğrulaması yapılıyor ve CRUD işlemleri için gerekli olan API istekleri yönetiliyor.

Frontend kısmında React kullanarak kullanıcı arayüzünü oluşturdum. Kullanıcılar, giriş yaptıktan sonra notlarını ekleyip düzenleyebiliyorlar. Fetch metodu ile backend'den verileri çekip, bu verileri React bileşenleri içinde gösteriyorum.</p>

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
    );
};

export default Todo;
