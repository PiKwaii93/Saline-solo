import React, { Fragment } from "react";
import axios from "axios";
import "./App.scss";
import {Routes, Route, Navigate} from 'react-router-dom';
import HideIfLogged from './components/HideIfLoggin';
import HideIfNotLogged from './components/HideIfNotLogged';
import HideIfNotAdmin from "./components/HideIfNotAdmin";

import Home from "./components/Home";
import NoPage from "./components/NoPage";
import Header from './components/Header';
import Footer from './components/Footer';
import Header2 from "./components/Header2";
import Login from "./components/Login";
import Register from "./components/Register";
import Account from "./components/Account";
import Masterclasses from "./components/Masterclasses";
import Masterclassroom from "./components/Masterclassroom";
import ScrollToTop from "./components/ScrollToTop";
import Quizz from "./components/Quizz";
import Exams from "./components/Exams";
import Forum from "./components/Forum";
import CreateTopic from "./components/CreateTopic";
import GetVideo from "./components/GetVideo";
import Topic from "./components/Topic";
import CreateCours from "./components/CreateCours";
import CreateMasterclass from "./components/CreateMasterclass";
import CreateQuizz from "./components/CreateQuizz";
import CreateExams from "./components/CreateExams";
import VideoUploadForm from "./components/UploadVideo";
import Planning from "./components/Planning";
import { useSelector } from "react-redux";


export default function App() {


        return (
            <div className="App">
              <ScrollToTop />
                {window.innerWidth > 1200 ? <Header2/> : <Header/>}
                    <HideIfLogged>
                      <Routes>
                        <Route path="/*" element={<Navigate to="/login" />} />
                        <Route path="/login" element={<Login/>} />
                        <Route path="/register" element={<Register/>} />
                      </Routes>
                    </HideIfLogged>
                    <HideIfNotLogged>
                      <Routes>
                          <Route index element={<Home />} />
                          <Route path="/login" element={<Navigate to="/" />} />
                          <Route path="/register" element={<Navigate to="/" />} />
                          <Route path="/account" element={<Account/>} />
                          <Route path="/masterclasses" element={<Masterclasses/>} />
                          <Route path="/masterclassroom/:slug/:page" element={<Masterclassroom/>} />
                          <Route path="/quizz/:slug/:page" element={<Quizz/>} />
                          <Route path="/exams/:slug/:page" element={<Exams/>} />
                          <Route path="/getVideo" element={<GetVideo/>}/>
                          <Route path="/forum" element={<Forum/>}/>
                          <Route path="/create-topic" element={<CreateTopic/>}/>
                          <Route path="/topic/:idTopic" element={<Topic/>}/>
                          <Route path="/video-upload" element={<VideoUploadForm/>}/>
                          <Route path="/planning" element={<Planning/>}/>
                          <Route path="/create-cours" element={<CreateCours/>}/>
                          <Route path="/create-masterclass" element={<CreateMasterclass/>}/>
                          <Route path="/create-quizz" element={<CreateQuizz/>}/>
                          <Route path="/create-exams" element={<CreateExams/>}/>
                          <Route path="*" element={<NoPage />} />
                      </Routes>
                    </HideIfNotLogged>
                    {/* <button onClick={deploy1}>Deploy</button>
                    <button onClick={deploy2}>Deploy</button>
                    <button onClick={deploy3}>Deploy</button>
                    <button onClick={deploy4}>Deploy</button>

                    <button onClick={test2}>Test</button>
                    <button onClick={test3}>Test</button>
                    <button onClick={test4}>Test</button> */}
                {window.innerWidth > 1200 ? <Footer/> : <Footer/>}
            </div>
        );
  }
