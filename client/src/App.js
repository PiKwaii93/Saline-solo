import React, { Fragment } from "react";
import axios from "axios";
import "./App.scss";
import {Routes, Route, Navigate} from 'react-router-dom';
import Layout from "./components/Layout";
import Home from "./components/Home";
import Blogs from "./components/Blogs";
import Contact from "./components/Contact";
import NoPage from "./components/NoPage";
import Header from './components/Header';
import Footer from './components/Footer';
import Header2 from "./components/Header2";
import Login from "./components/Login";
import Register from "./components/Register";
import HideIfLogged from './components/HideIfLoggin';
import HideIfNotLogged from './components/HideIfNotLogged';
import Account from "./components/Account";
import Masterclasses from "./components/Masterclasses";
import Masterclassroom from "./components/Masterclassroom";
import ScrollToTop from "./components/ScrollToTop";
import Quizz from "./components/Quizz";
import Exams from "./components/Exams";
import Forum from "./components/Forum";
import CreateTopic from "./components/CreateTopic";
import GetVideo from "./components/GetVideo";

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
                        <Route path="/" element={<Layout />}>
                          <Route index element={<Home />} />
                          <Route path="blogs" element={<Blogs />} />
                          <Route path="contact" element={<Contact />} />
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
                          <Route path="*" element={<NoPage />} />
                        </Route>
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
