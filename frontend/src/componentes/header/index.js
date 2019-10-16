import React from "react";
import "./style.css";

import logo from "../../assets/logo.png";

export default function Header(){
    return (
        <header className="async-header">
            <div className="user-content">
                <span className="user-name">
                Lucas Fernando
                <span>Tecnosevem@gmail.com</span>
                </span>
            <div className="user-image"></div>
            </div>
        </header>
    )
}