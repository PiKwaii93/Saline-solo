import React, { useEffect, useState } from "react";
import {Link, useLocation} from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu'
import HideIfNotLogged from './HideIfNotLogged';

import { useDispatch } from 'react-redux';
import { disconnect } from '../features/userSlice';

import { Menu as Menu2, MenuItem, MenuButton } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';

export default function Header(){
  
  

  function menuLangueFunction(){
    let menuLangue = document.getElementById("menuBurgerLangueSecond")
    let menuPrincipal = document.getElementById("menuBurgerPrincipal")
    menuLangue.classList.toggle("hidden")
    menuPrincipal.classList.toggle("hidden")
  }

  function backMenuPrincipalFunction(){
    let menuLangue = document.getElementById("menuBurgerLangueSecond")
    let menuPrincipal = document.getElementById("menuBurgerPrincipal")
    menuLangue.classList.toggle("hidden")
    menuPrincipal.classList.toggle("hidden")
  }

  const location = useLocation();

  

  useEffect(() => {
    setMenuOpen(false)
  }, [location]);

  const [menuOpen, setMenuOpen] = useState(false)


  function handleOpen(){
    setMenuOpen(true)
  }

  function handleClose(){
    setMenuOpen(false)
  }

  const dispatch = useDispatch();

  

        return (
          <div className="header-container">
            <div className="menu-burger" >
              <Menu width={ '100%' } customBurgerIcon={ <img src="/burger.svg" alt="Menu burger" /> } customCrossIcon={ <img src="/cross.svg" alt="Close Menu"/> } isOpen={menuOpen} onOpen={handleOpen} onClose={handleClose}>
                <div className="menu-burger-container" id="menuBurgerPrincipal">
                  <div className="menu-burger-link-container-all">
                    <Link to="/" className="menu-burger-link-prevent-style">
                      <div className="menu-burger-link-container">
                        <span className="menu-burger-link">Masterclasses en ligne</span>
                        <img src="/Arrow_right.svg" alt="Masterclasses en ligne" className="svg-link"/>
                      </div>
                    </Link>
                    <Link to="/" className="menu-burger-link-prevent-style">
                      <div className="menu-burger-link-container">
                        <span className="menu-burger-link">Préparez vos compétitions</span>
                        <img src="/Arrow_right.svg" alt="Préparez vos compétitions" className="svg-link"/>
                      </div>
                    </Link>
                    <Link to="/" className="menu-burger-link-prevent-style">
                      <div className="menu-burger-link-container">
                        <span className="menu-burger-link">On-site academies</span>
                      </div>
                    </Link>
                    <Link to="/login" className="menu-burger-link-prevent-style">
                      <div className="menu-burger-link-container">
                        <span className="menu-burger-link">Connexion</span>
                      </div>
                    </Link>
                    <Link to="/" className="menu-burger-link-prevent-style">
                      <div className="menu-burger-link-container">
                        <span className="menu-burger-link">Offres</span>
                      </div>
                    </Link>
                    <Link to="/masterclasses" className="menu-burger-link-prevent-style">
                      <div className="menu-burger-link-container">
                        <span className="menu-burger-link">Masterclasses</span>
                      </div>
                    </Link>
                    <Link to="/forum" className="menu-burger-link-prevent-style">
                      <div className="menu-burger-link-container">
                        <span className="menu-burger-link">Forum</span>
                      </div>
                    </Link>
                    <HideIfNotLogged>
                      <div className="menu-burger-link-container" onClick={() => dispatch(disconnect())}>
                        <span className="menu-burger-link">Disconnect</span>
                      </div>
                    </HideIfNotLogged>
                  </div>
                  <div className="menu-burger-langue-container" onClick={menuLangueFunction}>
                    <img src="/France.svg" alt="Langue française" className="svg-langue"/>
                    <span className="menu-burger-link">Français</span>
                    <img src="/Arrow_right.svg" alt="Changer de langue" className="svg-link"/>
                  </div>
                </div>
                <div className="menu-burger-container-second hidden" id="menuBurgerLangueSecond">
                  <div className="menu-burger-container-second-all">
                    <div className="menu-burger-container-second-back" onClick={backMenuPrincipalFunction}>
                      <img src="/Arrow_back.svg" alt="Revenir au menu principal" className="svg-link"></img>
                      <span className="back-link">Back</span>
                    </div>
                    <div className="menu-burger-container-second-langue-all">
                      <div className="menu-burger-container-second-all-langue-link-container">
                        <img src="/UK.svg" alt="English" className="svg-langue"></img>
                        <span className="menu-burger-link">English</span>
                      </div>
                      <div className="menu-burger-container-second-all-langue-link-container">
                        <img src="/JP.svg" alt="日本語" className="svg-langue"></img>
                        <span className="menu-burger-link">日本語</span>
                      </div>
                      <div className="menu-burger-container-second-all-langue-link-container">
                        <img src="/SKR.svg" alt="한국어" className="svg-langue"></img>
                        <span className="menu-burger-link">한국어</span>
                      </div>                    
                    </div>
                  </div>
                </div>
              </Menu>
            </div>
            <div className="logo-header-container">
              <Link to="/" className="menu-burger-link-prevent-style">
                <img src="/Logo.svg" alt="logo" />
              </Link>
            </div>
            <div className="account-language-container">
                <Menu2 menuButton={<MenuButton className="menu-langue-container"><div className="arrow-header-desktop-text">FR</div>
                        <img src="/Arrow_down.svg" alt="defilement langue" /></MenuButton>} transition>
                  <MenuItem><img src="/UK.svg" alt="English" className="svg-langue"></img>
                        <span className="menu-langue-link">English</span></MenuItem>
                  <MenuItem><img src="/JP.svg" alt="日本語" className="svg-langue"></img>
                        <span className="menu-langue-link">日本語</span></MenuItem>
                  <MenuItem><img src="/SKR.svg" alt="한국어" className="svg-langue"></img>
                        <span className="menu-langue-link">한국어</span></MenuItem>
                </Menu2>
                <Link to="/account" className="menu-burger-link-prevent-style">
                  <img src="/Account.svg" alt="account" />
                </Link>
            </div>
          </div>
        );
}
