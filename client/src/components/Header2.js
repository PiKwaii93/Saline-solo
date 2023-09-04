import React from "react";
import {Link} from 'react-router-dom';

import { Menu as Menu2, MenuItem, MenuButton } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';

export default class Header2 extends React.Component {

    render() {
        return (
            <div className="header-container-desktop">
                <div className="logo-header-container-desktop">
                    <Link to="/" className="link-header-desktop">
                        <img src="/logo-desktop.svg" alt="logo" />
                    </Link>
                </div>
                <div className="link-header-container-desktop">
                    <Link to="/" className="link-header-desktop">Home</Link>
                    <Link to="/blogs" className="link-header-desktop">Blogs</Link>
                    <Link to="/contact" className="link-header-desktop">Contact</Link>
                    <Link to="/login" className="link-header-desktop">Login</Link>
                </div>
                <div className="account-language-container-desktop">
                    <Menu2 menuButton={<MenuButton className="menu-langue-container"><div className="arrow-header-desktop-text">FR</div>
                            <img src="/Arrow_down.svg" alt="defilement langue" /></MenuButton>} transition>
                    <MenuItem><img src="/UK.svg" alt="English" className="svg-langue"></img>
                            <span className="menu-langue-link">English</span></MenuItem>
                    <MenuItem><img src="/JP.svg" alt="日本語" className="svg-langue"></img>
                            <span className="menu-langue-link">日本語</span></MenuItem>
                    <MenuItem><img src="/SKR.svg" alt="한국어" className="svg-langue"></img>
                            <span className="menu-langue-link">한국어</span></MenuItem>
                    </Menu2>
                    <img className="search-header-desktop" src="/search.svg" alt="search" />
                    <Link to="/account" className="menu-burger-link-prevent-style">
                        <img src="/Account.svg" alt="account" />
                    </Link>
                </div>
            </div>
        );
      }
}
