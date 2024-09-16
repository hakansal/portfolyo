import React from "react";
import "./hak.css";
import ben from "./ben.jpg";



const Hak = () => {


    return <div>
        <div className="homepagehk">

            <div className="contenthk">
                <div class="card"  >
                    <img src={ben} classname="card-img-top" />
                    <div >
                        <h5 class="card-title">Hakan şal</h5>
                        <p class="card-text">Bilgisayar mühendisi
                            Bolu abant izzet baysal üniversitesinden mezun.
                        </p>


                    </div>
                </div>


            </div>

            <div className="contenthk">
                <div className="card">
                    <h5>Amacım ne?</h5>

                    <p className="phk">Merhaba benim adım hakan şal .
                        bigisayar mühendisliği bölümünden mezun olup kendisini ful stack developer
                        olarak geliştirmeye çalışan,azimli disiplinli ,ilgilendiği alanda uzmanlaşmak ve
                        çalıştığı kurumda fark yaratmak isteyen,takım arkadaşları ile ziyonunu geliştirmek isteyen
                        ,geleceğin dünyasında yerini almak ve ilerlemek için öğrenmeye istekli ve hevesini ispat etmeye
                        hazır birisi olarak tanımlayan birisi.

                    </p>
                </div>



            </div>



        </div>

    </div>
}

export default Hak