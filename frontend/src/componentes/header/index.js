import React from "react";
import Logout from '../Logout/';
import "./style.css";

export default function Header(){
    return (
        <header className="async-header">
            <div className="user-content">
                <span className="user-name">
                Lucas Fernando
                <span>Tecnosevem@gmail.com</span>
                <a href="/#" className="btn-logout" onClick={Logout}>Deslogar</a>
                </span>
            <div className="user-image"></div>

            </div>


        </header>
    )
}