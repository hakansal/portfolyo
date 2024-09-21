

const codes = {
    barkodv1: {
        backendserver: `const express = require("express");
const app = express();
const connectToDb = require("./connection/config");
const Stuff = require("./model/stuff_model");
const mongoose = require("mongoose");
const jwt=require("jsonwebtoken");
app.use(express.json());
const cors = require('cors');
app.use(cors());


if (process.env.NODE_ENV != "production") {
    require("dotenv").config();
}
connectToDb();
app.get("/",async (req, res) => {

   await res.status(200).json({ message: "server has started" });
});


app.post("/giris",async(req,res)=>{
  const {username,password}=req.body;
  if(username==process.env.USER&&password==process.env.PASSWORD){
    const token = jwt.sign({ username }, process.env.SECRETKEY, { expiresIn: process.env.JWTINN });
    return res.json({token});
  };
  return res.status(401).json({ message: 'Geçersiz kullanıcı adı veya şifre.' });
});
const authjwt = (req, res, next) => {
    const token = req.header('giris');

    if (!token) {
        return res.status(403).json({ message: 'Erişim engellendi. Token gerekli.' });
    }

    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''),  process.env.SECRETKEY);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Geçersiz veya süresi dolmuş token.' });
    }
};

app.post("/ekle", authjwt,async (req, res) => {
    try {
        const { barkod, isim, fiyat, adet } = req.body;
        const stuff = new Stuff({ barkod: barkod, isim: isim, fiyat: fiyat, adet: adet });
        await stuff.save();
        res.status(200).json({ message: "kaydedildi" });
    } catch (error) {
        res.status(200).json({ message: "kaydedilmedi" });
    }
});

app.delete("/delete", authjwt,async (req, res) => {
    try {
        const barkod = req.body;
        await Stuff.findOneAndDelete(barkod);

        res.status(200).json({ message: "silindi" });
    } catch (error) {
        res.status(200).json({ message: "silinemedi" });
    }
});
app.put("/guncelle",authjwt, async (req, res) => {
    try {

        const { barkod, isim, fiyat, adet } = req.body;
        const stuff = await Stuff.findOneAndUpdate({ barkod }, { isim, fiyat, adet }, { new: true });
        if (!stuff) {
            return res.status(404).json({ message: "bulunamadı" });
        }
        res.status(200).json({ message: "güncellendi" });
    } catch (error) {
        res.status(200).json({ message: "güncellenemedi" });
        console.log(error)

    }


});
app.get("/listele",authjwt, async (req, res) => {

    const stufs = await Stuff.find();
    res.status(200).json({ stufs });

});

app.post("/satis",authjwt, async (req, res) => {
    try {
        const { barkod } = req.body;
        const urun = await Stuff.findOne({ barkod: barkod });

        if (urun) {
 
                if (urun.adet > 0) {
                    urun.adet -= 1;
                    await urun.save();
                    res.status(200).json({ message: urun });
                } else {
                    
                    res.status(200).json({ message: "y" });
                    
                }
        } else {
            res.status(404).json({ message: "Ürün bulunamadı" });
        }
    } catch (error) {
        res.status(500).json({ message: "Bir hata oluştu", error: error.message });
    }
});

app.listen(process.env.PORT, () => {
    console.log("server just started");
});`,
app:`import React from "react";
import Navbar from "./components/navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Giris from "./components/giriş-çıkış/giriş";
import Ekle from "./components/crud/ekle";
import Guncelle from "./components/crud/güncelle";
import Sil from "./components/crud/sil";
import Satıs from "./components/crud/satıs";
import Listele from "./components/crud/listele";
import Cikis from "./components/giriş-çıkış/cikis";





function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          
          <Route path="/giriş" element={<><Giris/></>} />
          <Route path="/çıkış" element={<><Cikis/></>} />
          <Route path="/satış" element={<><Satıs/></>} />
          <Route path="/ekle" element={<><Ekle/></>} />
          <Route path="/sil" element={<><Sil/></>} />
          <Route path="/güncelle" element={<><Guncelle/></>} />
          <Route path="/listele" element={<><Listele/></>} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;`,
crudekle:`import React, { useEffect, useState } from "react";
import "./ekle.css";
const Ekle = () => {
  const [barkod, Setbarkod] = useState("");
  const [isim, Setisim] = useState("");
  const [fiyat, Setfiyat] = useState("");
  const [adet, Setadet] = useState("");
  const [ Message, setMessage] = useState("");

  const handlebarkod = (e) => {
    Setbarkod(e.target.value);
  };
  const handleisim = (e) => {
    Setisim(e.target.value);
  }
  const handlefiyat = (e) => {
    Setfiyat(e.target.value);
  }
  const handleadet = (e) => {
    Setadet(e.target.value);
  }

  const handlesubmit = async (e) => {
    const token = localStorage.getItem('token');

   
    e.preventDefault();
    const data = {
      barkod: barkod,
      isim: isim,
      fiyat: fiyat,
      adet: adet
    }

    try {

      const response = await fetch("http://localhost:3001/ekle", { method: "POST",
         headers: { "Content-Type": "application/json", 
          "giris": "Bearer " + token,
         },
         body: JSON.stringify(data) });
         if(response.ok){
           
          setMessage("kayıt yapıldı");
          Setadet("");
          Setbarkod("");
          Setfiyat("");
          Setisim("");
         }
         else{
          setMessage("hata")
          Setadet("");
          Setbarkod("");
          Setfiyat("");
          Setisim("");
         }
    } catch (error) {
      
    }
  };
  

  return <div className="_div">
    <form onSubmit={handlesubmit}>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">barkod </label>
        <input onChange={handlebarkod} type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

      </div>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">isim</label>
        <input  onChange={handleisim}type="text" class="form-control" id="exampleInputPassword1" />
      </div>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">fiyat</label>
        <input onChange={handlefiyat} type="text" class="form-control" id="exampleInputPassword1" />
      </div>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">adet</label>
        <input onChange={handleadet} type="text" class="form-control" id="exampleInputPassword1" />
      </div>

      <button type="submit" class="btn btn-primary">ekle</button>
    </form>
    { Message && <div className="alert alert-success mt-3">{Message}</div>}
  </div>
}
export default Ekle;`},

    todo: {
        app: `
import React from "react";
import Navbar from "./components/navbar/navbar";
import Home from"./components/home/home";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Abaout from "./components/about/about";
import Kayit from"./components/kayit/kayit";
import Giris from "./components/kayit/giris";
import Todo from "./components/todo/todo";
function App() {
  return (
    <div className="App">
      <Router>
      <Navbar />
       <Routes>
         <Route exact path="/home" element={<Home/>}/>
         <Route exact path="/giris" element={<Giris/>}/>
         <Route exact path="/kayit" element={<Kayit/>}/>
         <Route exact path="/hakk" element={<Abaout/>}/>
         <Route exact path="/cikis" element={<Home/>}/>
         <Route exact path="/todo" element={<Todo/>}/>
       </Routes>
      </Router>      
    </div>
  );
}

export default App;`,
        auth: `
const router = require("express").Router();
const User = require("./usermodel");
const bcrypt = require("bcryptjs");

router.post("/kayit", async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const hashpassword = bcrypt.hashSync(password);
        const user = new User({ email, username, password: hashpassword });
        
        await user.save().then(() => {
            return res.status(200).json({ user: user });
        });
    } catch (error) {
        return res.status(400).json({ message: "kullanıcı kayıtlı zaten" });
    }
});

router.post("/giris", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ message: "önce kayıt oluşturun" });
        }

        const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: " şifreniz yanlış" });
        }

        const { password, ...others } = user._doc;
        return res.status(200).json({ others });
    } catch (error) {
        return res.status(400).json({ message: "kullanıcı kayıtlı zaten" });
    }
});

module.exports = router;`,
about:`import React from "react";

const Abaout=()=>{
    return <div className="home d-flex justify-content-center align-items-center">
         <div className="container d-flex justify-content-center flex-column"> 
            <h1>Todo app projesi</h1>
            <p>
                bu geliştirmiş olduğum projede kullanıcının etkin bir şekilde günlük işleri için oluşturacağı planları listeleyebileceği ve crud işlemleri gerçekleştirebileceği bir 
                to do applikasyonu geliştirdim bu benim gerçek anlamı ile mern stak için geliştirdiğim ilk proje 
            </p>
            <p>geliştirici hakan şal</p>




         </div>
    </div>
}
export default Abaout;`,
model:` 
const mongoose =require("mongoose");


const userschema=new mongoose.Schema({

    email:{
        type:String,
        unique:true,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }, list:[{
        type:mongoose.Types.ObjectId,
        ref:"list"
         
    }]
})
module.exports=mongoose.model("user",userschema);`

    },
    flutter:{
        screenmain: `import 'package:flutter/material.dart';

import 'package:get/get.dart';
import 'package:get/get_core/get_core.dart';
import 'package:get/get_instance/get_instance.dart';

import '../controller/coin_controller.dart';
import 'detail_screen.dart';

class main_screen extends StatelessWidget {
  final CoinController controller = Get.put(CoinController());
  detail_screen det1 = new detail_screen();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        centerTitle: true,
        title: Text(
          "Market",
          style: TextStyle(
              fontSize: 30, color: Colors.white, fontWeight: FontWeight.w200),
        ),
        backgroundColor: Color.fromARGB(255, 43, 56, 61),
      ),
      backgroundColor: Color.fromARGB(255, 70, 91, 99),
      body: Padding(
        padding: const EdgeInsets.only(right: 10, top: 30, left: 7),
        child: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Obx(() => controller.isLoading.value
                  ? const Center(
                      child: CircularProgressIndicator(),
                    )
                  : ListView.builder(
                      shrinkWrap: true,
                      physics: NeverScrollableScrollPhysics(),
                      itemCount: 30,
                      itemBuilder: (context, index) {
                        return Padding(
                          padding: const EdgeInsets.only(bottom: 25),
                          child: Container(
                            width: MediaQuery.of(context).size.width,
                            height: 70,
                         child:
                               // ignore: prefer_const_constructors

                                Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Row(
                                  children: [
                                    Padding(
                                      padding: const EdgeInsets.all(5),
                                      child: GestureDetector(
                                        onTap: () {
                                          Navigator.push(
                                              context,
                                              MaterialPageRoute(
                                                builder: (context) =>
                                                    detail_screen(),
                                              ));
                                          det1.get_index(index);
                                        },
                                        child: Container(
                                          width: 70,
                                          height: 70,
                                          decoration: BoxDecoration(
                                              color: Color.fromARGB(
                                                  255, 57, 66, 70),
                                              borderRadius:
                                                  BorderRadius.circular(15)),
                                          child: Padding(
                                            padding: const EdgeInsets.all(4),
                                            child: Image.network(controller
                                                .coinlist[index].image),
                                          ),
                                        ),
                                      ),
                                    ),
                                    SizedBox(width: 15),
                                    Column(
                                      crossAxisAlignment:
                                          CrossAxisAlignment.end,
                                      children: [
                                        Padding(
                                          padding: const EdgeInsets.all(0),
                                          child: Column(
                                            crossAxisAlignment:
                                                CrossAxisAlignment.start,
                                            children: [
                                              Text(
                                                  controller
                                                      .coinlist[index].symbol
                                                      .toUpperCase(),
                                                  style: TextStyle(
                                                      fontSize: 16,
                                                      color: Colors.white,
                                                      fontWeight:
                                                          FontWeight.bold)),
                                              Text(
                                                  controller
                                                      .coinlist[index].name,
                                                  style: TextStyle(
                                                      fontSize: 16,
                                                      color: Colors.white,
                                                      fontWeight:
                                                          FontWeight.bold)),
                                            ],
                                          ),
                                        ),
                                      ],
                                    ),
                                  ],
                                ),
                                Column(
                                  crossAxisAlignment: CrossAxisAlignment.end,
                                  children: [
                                    Text("Price",
                                        style: TextStyle(
                                            fontSize: 16,
                                            color: Colors.white,
                                            fontWeight: FontWeight.bold)),
                                    Text(
                                        controller.coinlist[index].currentPrice
                                            .toString(),
                                        style: TextStyle(
                                            fontSize: 16,
                                            color: Colors.white,
                                            fontWeight: FontWeight.bold)),
                                    Text(
                                        "{controller.coinlist[index].priceChangePercentage24H.toString()} %",
                                        style: TextStyle(
                                            fontSize: 16,
                                            color: Colors.white,
                                            fontWeight: FontWeight.bold))
                                  ],
                                ),
                              ],
                            ),
                          ),
                        );
                      },
                    ))
            ],
          ),
        ),
      ),
    );
  }
}`,
model:`import 'dart:convert';

List<Coin> coinFromJson(String str) =>
    List<Coin>.from(json.decode(str).map((x) => Coin.fromJson(x)));

class Coin {
  String id;
  String symbol;
  String name;
  String image;
  double currentPrice;
  int marketCap;
  int marketCapRank;
  int? fullyDilutedValuation;
  //int newdaily;
  //int cansl;
  double high24H;
  double low24H;
  double priceChange24H;
  double priceChangePercentage24H;
  double marketCapChange24H;
  double marketCapChangePercentage24H;
  double circulatingSupply;
  double? totalSupply;
  double? maxSupply;
  double ath;
  double athChangePercentage;
  DateTime athDate;
  double atl;
  double atlChangePercentage;
  DateTime atlDate;
  dynamic roi;
  DateTime lastUpdated;

  Coin({
    required this.id,
    required this.symbol,
    required this.name,
    required this.image,
    required this.currentPrice,
    required this.marketCap,
    required this.marketCapRank,
    required this.fullyDilutedValuation,
    required this.high24H,
    required this.low24H,
    required this.priceChange24H,
    required this.priceChangePercentage24H,
    required this.marketCapChange24H,
    required this.marketCapChangePercentage24H,
    required this.circulatingSupply,
    required this.totalSupply,
    required this.maxSupply,
    required this.ath,
    required this.athChangePercentage,
    required this.athDate,
    required this.atl,
    required this.atlChangePercentage,
    required this.atlDate,
    required this.roi,
    required this.lastUpdated,
  });

  factory Coin.fromJson(Map<String, dynamic> json) => Coin(
        id: json["id"],
        symbol: json["symbol"],
        name: json["name"],
        image: json["image"],
        currentPrice: json["current_price"]?.toDouble(),
        marketCap: json["market_cap"],
        marketCapRank: json["market_cap_rank"],
        fullyDilutedValuation: json["fully_diluted_valuation"],
        high24H: json["high_24h"]?.toDouble(),
        low24H: json["low_24h"]?.toDouble(),
        priceChange24H: json["price_change_24h"]?.toDouble(),
        priceChangePercentage24H:
            json["price_change_percentage_24h"]?.toDouble(),
        marketCapChange24H: json["market_cap_change_24h"]?.toDouble(),
        marketCapChangePercentage24H:
            json["market_cap_change_percentage_24h"]?.toDouble(),
        circulatingSupply: json["circulating_supply"]?.toDouble(),
        totalSupply: json["total_supply"]?.toDouble(),
        maxSupply: json["max_supply"]?.toDouble(),
        ath: json["ath"]?.toDouble(),
        athChangePercentage: json["ath_change_percentage"]?.toDouble(),
        athDate: DateTime.parse(json["ath_date"]),
        atl: json["atl"]?.toDouble(),
        atlChangePercentage: json["atl_change_percentage"]?.toDouble(),
        atlDate: DateTime.parse(json["atl_date"]),
        roi: json["roi"],
        lastUpdated: DateTime.parse(json["last_updated"]),
      );
}`,
detailscreen:`import 'package:crypto_track/screens/takip_screen.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:get/get_core/src/get_main.dart';

import '../controller/coin_controller.dart';

var index_v;

class detail_screen extends StatelessWidget {
  final CoinController controller = Get.put(CoinController());
  detail_screen({super.key});
  takip_screen takip = takip_screen();
  get_index(int index) {
    index_v = index;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        centerTitle: true,
        title: Text(
          controller.coinlist[index_v].name,
          style: const TextStyle(
              fontSize: 30, color: Colors.white, fontWeight: FontWeight.w400),
        ),
        backgroundColor: Color.fromARGB(255, 43, 56, 61),
      ),
      backgroundColor: Color.fromARGB(255, 70, 91, 99),
      body: Container(
        child: Padding(
          padding: EdgeInsets.all(10),
          child: Column(children: [
            Container(
              // ignore: prefer_const_constructors
              decoration: BoxDecoration(
                color: Color.fromARGB(255, 57, 66, 70),
                // ignore: prefer_const_constructors
                borderRadius: BorderRadius.only(
                    topLeft: Radius.circular(20),
                    topRight: Radius.circular(20),
                    bottomLeft: Radius.circular(20),
                    bottomRight: Radius.circular(20)),
              ),
              child: Row(
                children: [
                  Padding(
                    padding: const EdgeInsets.all(5),
                    child: GestureDetector(
                      child: Container(
                        width: 70,
                        height: 70,
                        decoration: BoxDecoration(
                            color: Color.fromARGB(255, 75, 87, 92),
                            borderRadius: BorderRadius.circular(15)),
                        child: Padding(
                          padding: const EdgeInsets.all(4),
                          child:
                              Image.network(controller.coinlist[index_v].image),
                        ),
                      ),
                    ),
                  ),
                  SizedBox(width: 50),
                  Padding(
                    padding: const EdgeInsets.all(0),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          controller.coinlist[index_v].symbol.toUpperCase(),
                          style: TextStyle(
                              fontSize: 24,
                              color: Color.fromARGB(255, 230, 195, 43),
                              fontWeight: FontWeight.bold),
                        ),
                      ],
                    ),
                  ),
                  SizedBox(width: 80),
                  Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: Column(
                      children: [
                        Text(
                          controller.coinlist[index_v].name.toString(),
                          style: TextStyle(
                              fontSize: 22,
                              color: const Color.fromARGB(255, 230, 195, 43),
                              fontWeight: FontWeight.w500),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            SizedBox(
              height: 20,
            ),
            Container(
              // ignore: prefer_const_constructors
              decoration: BoxDecoration(
                color: Color.fromARGB(255, 57, 66, 70),
                // ignore: prefer_const_constructors
                borderRadius: BorderRadius.only(
                    topLeft: Radius.circular(20),
                    topRight: Radius.circular(20),
                    bottomLeft: Radius.circular(20),
                    bottomRight: Radius.circular(20)),
              ),
              child: Row(
                children: [
                  SizedBox(width: 50),
                  Padding(
                    padding: const EdgeInsets.only(
                      bottom: 150,
                      top: 20,
                    ),
                    child: Column(
                      children: [
                        Row(
                          children: [
                            Text(
                              "Son fiyat ",
                              style: TextStyle(
                                  fontSize: 18,
                                  color: Color.fromARGB(255, 231, 223, 186),
                                  fontWeight: FontWeight.bold),
                            ),
                            SizedBox(
                              width: 180,
                            ),
                            Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  controller.coinlist[index_v].name,
                                  style: TextStyle(
                                      fontSize: 24,
                                      color: Color.fromARGB(255, 231, 223, 186),
                                      fontWeight: FontWeight.bold),
                                ),
                                Text(
                                  controller.coinlist[index_v].currentPrice
                                      .toString(),
                                  style: TextStyle(
                                      fontSize: 18,
                                      color: Color.fromARGB(255, 204, 194, 150),
                                      fontWeight: FontWeight.w500),
                                ),
                              ],
                            ),
                          ],
                        ),
                        SizedBox(
                          height: 30,
                        ),
                        Row(
                          children: [
                            Column(
                              children: [
                                Text(
                                  "Oransal",
                                  style: TextStyle(
                                      fontSize: 18,
                                      color: Color.fromARGB(255, 231, 223, 186),
                                      fontWeight: FontWeight.bold),
                                ),
                                Text(
                                  "değişim",
                                  style: TextStyle(
                                      fontSize: 18,
                                      color: Color.fromARGB(255, 231, 223, 186),
                                      fontWeight: FontWeight.bold),
                                ),
                              ],
                            ),
                            SizedBox(
                              width: 180,
                            ),
                            Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  controller.coinlist[index_v]
                                      .priceChangePercentage24H
                                      .toString(),
                                  style: TextStyle(
                                      fontSize: 22,
                                      color: Color.fromARGB(255, 204, 194, 150),
                                      fontWeight: FontWeight.w500),
                                ),
                              ],
                            ),
                          ],
                        ),
                        SizedBox(
                          height: 30,
                        ),
                        Row(
                          children: [
                            Column(
                              children: [
                                Text(
                                  "Günlük ",
                                  style: TextStyle(
                                      fontSize: 18,
                                      color: Color.fromARGB(255, 231, 223, 186),
                                      fontWeight: FontWeight.bold),
                                ),
                                Text(
                                  "değişim ",
                                  style: TextStyle(
                                      fontSize: 18,
                                      color: Color.fromARGB(255, 231, 223, 186),
                                      fontWeight: FontWeight.bold),
                                ),
                              ],
                            ),
                            SizedBox(
                              width: 180,
                            ),
                            Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  controller.coinlist[index_v].priceChange24H
                                      .toInt()
                                      .toString(),
                                  style: TextStyle(
                                      fontSize: 22,
                                      color: Color.fromARGB(255, 204, 194, 150),
                                      fontWeight: FontWeight.w500),
                                ),
                              ],
                            ),
                          ],
                        ),
                        SizedBox(
                          height: 30,
                        ),
                        Row(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Column(
                              children: [
                                Text(
                                  "Günün",
                                  style: TextStyle(
                                      fontSize: 18,
                                      color: Color.fromARGB(255, 231, 223, 186),
                                      fontWeight: FontWeight.bold),
                                ),
                                Text(
                                  "yüksek değeri",
                                  style: TextStyle(
                                      fontSize: 18,
                                      color: Color.fromARGB(255, 231, 223, 186),
                                      fontWeight: FontWeight.bold),
                                ),
                              ],
                            ),
                            SizedBox(
                              width: 180,
                            ),
                            Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  controller.coinlist[index_v].high24H
                                      .toString(),
                                  style: TextStyle(
                                      fontSize: 22,
                                      color: Color.fromARGB(255, 204, 194, 150),
                                      fontWeight: FontWeight.w500),
                                ),
                              ],
                            ),
                          ],
                        ),
                        SizedBox(
                          height: 30,
                        ),
                        Row(
                          children: [
                            Text(
                              "Son fiyat ",
                              style: TextStyle(
                                  fontSize: 22,
                                  color: Color.fromARGB(255, 231, 223, 186),
                                  fontWeight: FontWeight.bold),
                            ),
                            SizedBox(
                              width: 180,
                            ),
                            Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  controller.coinlist[index_v].currentPrice
                                      .toString(),
                                  style: TextStyle(
                                      fontSize: 22,
                                      color: Color.fromARGB(255, 204, 194, 150),
                                      fontWeight: FontWeight.w500),
                                ),
                              ],
                            ),
                          ],
                        ),
                        SizedBox(
                          height: 150,
                        ),
                        ClipRRect(
                          borderRadius: BorderRadius.circular(9),
                          child: Stack(
                            children: <Widget>[
                              Positioned.fill(
                                child: Container(
                                  decoration: const BoxDecoration(
                                      gradient: LinearGradient(colors: <Color>[
                                    Color.fromARGB(255, 69, 110, 127),
                                    Color.fromARGB(255, 56, 95, 109),
                                    Color.fromARGB(255, 33, 52, 59)
                                  ])),
                                ),
                              ),
                              SizedBox(
                                height: 50,
                              ),
                              TextButton(
                                child: Text(
                                  "Takibe al",
                                  style: TextStyle(
                                      fontSize: 30,
                                      color: Colors.white,
                                      fontWeight: FontWeight.w400),
                                ),
                                onPressed: () {
                                  takip.get_index_takip(index_v);
                                },
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ]),
        ),
      ),
    );
  }
}`
    }
}

export default codes;
