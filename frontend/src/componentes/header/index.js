import React from "react";
import "./style.css";

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