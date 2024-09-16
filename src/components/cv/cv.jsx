import React, { useState, useEffect } from "react";
import "./Cv.css";
import roa from "./roa.jpg";
import id3 from "./id3.jpg";
import c from "./c.jpg";
import flutter from "./flutter.jpg";
import react from "./react.jpg";
import javs from "./javs.jpg";
import node from "./node.jpg";
import html from "./html.jpg";
import css from "./css.jpg";

const Cv = () => {
    const [visible, setVisible] = useState(false);



    return (
        <div>
            <div className="homepagecv">
                {/* Deneyim kısmı */}
                <div className="contentcv">
                    <h3 className="hvc"> Deneyim </h3>
                    <div className="compdis">
                        <div className="imgcomp">
                            <img className="imgcv" src={roa} alt="Roaa tech" />
                        </div>
                        <div className="copminf">
                            <h5>Roaa tech</h5>
                            <p className="p">ünvanı:stajyer</p>
                            <p className="p">tam zamanlı</p>
                            <p className="p">Haz 2022 - Eyl 2022</p>
                            <p className="p">yazılım geliştirme</p>
                        </div>
                        <div className="copminf">
                            <h5>kazanılan deneyim</h5>
                            <ul className="custom-list">
                                <li>C# geliştirme</li>
                                <li>Unity oyun motoru</li>
                                <li>Blender 3D tasarım</li>
                                <li>Google Admob</li>
                            </ul>
                        </div>
                    </div>
                    <div className="compdis">
                        <div className="imgcomp">
                            <img className="imgcv" src={id3} alt="İD3" />
                        </div>

                        <div className="copminf">
                            <h5>İD3</h5>
                            <p className="pcv">ünvanı:stajyer</p>
                            <p className="p">tam zamanlı</p>
                            <p className="p">Haz 2023 - Eyl 2023</p>
                            <p className="p">yazılım geliştirme</p>
                        </div>
                        <div className="copminf">
                            <h5>kazanılan deneyim</h5>
                            <ul className="custom-list">
                                <li>backend geliştirme</li>
                                <li>springboot </li>
                                <li> servis mimarisi </li>
                                <li>api </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Yetenekler kısmı */}
                <div className="contentcv">

                    <h3 className="hvc"> Backend </h3>
                    <div className="logosdis">
                        <div className="logos">
                            <img className="imglogos" src={javs} alt="JavaScript" />
                        </div>
                        <div className="logosdis-info">
                            <h5>Javascript</h5>
                            <hr className="hr" />
                            <p className="p">javascript ile orta seviyede projeler ge</p>

                        </div>

                    </div>
                    <div className="logosdis">
                        <div className="logos">
                            <img className="imglogos" src={node} alt="C" />
                        </div>
                        <div className="logosdis-info">
                            <h5>Javascript</h5>
                            <hr className="hr" />
                            <p className="p">javascript ile orta seviyede projeler ge</p>

                        </div>

                    </div>
                     


                    <div className="logosdis">
                        <div className="logos">
                            <img className="imglogos" src={flutter} alt="Flutter" />
                        </div>
                        <div className="logosdis-info">
                            <h5>Javascript</h5>
                            <hr className="hr" />
                            <p className="p">javascript ile orta seviyede projeler ge</p>

                        </div>

                    </div>

                  
                    
                </div>
                {/* frontend yetenekler*/}
                <div className="contentcv"><h3 className="hvc"> frontend </h3>
                <div className="logosdis">
                        <div className="logos">
                            <img className="imglogos" src={html} alt="React" />
                        </div>
                        <div className="logosdis-info">
                            <h5>Javascript</h5>
                            <hr className="hr" />
                            <p className="p">javascript ile orta seviyede projeler ge</p>

                        </div>

                    </div>
                    

                    <div className="logosdis">
                        <div className="logos">
                            <img className="imglogos" src={react} alt="React" />
                        </div>
                        <div className="logosdis-info">
                            <h5>Javascript</h5>
                            <hr className="hr" />
                            <p className="p">javascript ile orta seviyede projeler ge</p>

                        </div>

                    </div>
                    <div className="logosdis">
                        <div className="logos">
                            <img className="imglogos" src={css} alt="React" />
                        </div>
                        <div className="logosdis-info">
                            <h5>Javascript</h5>
                            <hr className="hr" />
                            <p className="p">javascript ile orta seviyede projeler ge</p>

                        </div>

                    </div>
                     
                </div>
            </div>
        </div>
    );
};

export default Cv;
