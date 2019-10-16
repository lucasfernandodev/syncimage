import React from 'react';
import { Link } from 'react-router-dom';
import "./style.css";
import erro404 from "../../assets/404.svg";
export default function Erro404(){
    return (
        <div className="container-erro">
            <img src={erro404} alt=""/>
            <span><p>Oops..</p> Sua pagina não foi encontrada</span>
            <Link to="/"><button className="btn">Voltar</button></Link>
        </div>
    )
}