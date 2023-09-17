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

  
  const user = useSelector((state) => state.user);

        return (
            <div className="App">
              <ScrollToTop />
                {window.innerWidth > 1200 ? <Header2/> : <Header/>}
                    <HideIfLogged>
                      <Routes>
                        <Route path="/*" element={<NoPage />} />
                        <Route path="/login" element={<Login/>} />
                        <Route path="/register" element={<Register/>} />
                        <Route index element={<Home />} />
                          <Route path="/login" element={<Navigate to="/login"/>} />
                          <Route path="/register" element={<Navigate to="/login" />} />
                          <Route path="/account" element={<Navigate to="/login"/>} />
                          <Route path="/quizz/:slug/:page" element={<Navigate to="/login"/>} />
                          <Route path="/exams/:slug/:page" element={<Navigate to="/login"/>} />
                          <Route path="/getVideo" element={<Navigate to="/login"/>}/>
                          <Route path="/create-topic" element={<Navigate to="/login"/>}/>
                          <Route path="/video-upload" element={<Navigate to="/login"/>}/>
                          <Route path="/planning" element={<Navigate to="/login"/>}/>
                          
                          <Route path="/masterclasses" element={<Masterclasses/>} />
                          <Route path="/masterclassroom/:slug/:page" element={<Masterclassroom/>} />
                          <Route path="/forum" element={<Forum/>}/>
                          <Route path="/topic/:idTopic" element={<Topic/>}/>
                      </Routes>
                    </HideIfLogged>
                    <HideIfNotLogged>
                      <Routes>
                          <Route index element={<Home />} />
                          <Route path="/login" element={<Navigate to="/" />} />
                          <Route path="/register" element={<Navigate to="/" />} />
                          <Route path="/account" element={<Account/>} />
                          <Route path="/quizz/:slug/:page" element={<Quizz/>} />
                          <Route path="/exams/:slug/:page" element={<Exams/>} />
                          <Route path="/getVideo" element={<GetVideo/>}/>
                          <Route path="/create-topic" element={<CreateTopic/>}/>
                          <Route path="/video-upload" element={<VideoUploadForm/>}/>
                          <Route path="/planning" element={<Planning/>}/>
                          {user.role=="admin" && (
                            <>
                              <Route path="/create-cours" element={<CreateCours/>}/>
                              <Route path="/create-masterclass" element={<CreateMasterclass />} />
                              <Route path="/create-quizz" element={<CreateQuizz/>}/>
                              <Route path="/create-exams" element={<CreateExams/>}/>
                            </>
                          )}
                      </Routes>
                    </HideIfNotLogged>
                {window.innerWidth > 1200 ? <Footer/> : <Footer/>}
            </div>
        );
  }
