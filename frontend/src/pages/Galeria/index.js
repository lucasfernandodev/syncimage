import React, {useState} from 'react';
import Header from "../../componentes/header";
import Footer from "../../componentes/footer";
import Upload from '../../componentes/Upload';
import AddCategory from "./addCategory"
import "./style.css";

import camera from "../../assets/camera.svg";



export default function Galeria() {
    
    const [uploadDisplay, setUploadDisplay] = useState(false);
    const [categoryDisplay, setCategoryDisplay] = useState(false);

    return(
        <>
            <Header />
            <div className="container-galeria">
                <header className="header-galeria">
                    <div className="header-title">
                        <h1 className="title">Galeria</h1>
                    </div>

                    <div className="header-upload">
                        <button className="btn-upload" onClick={event => setUploadDisplay(true)}> Adicionar imagem <img src={camera} alt=""/></button>
                    </div>

                    <div className="header-category">
                        <select className="btn-category">
                            <option value="">Categorias</option>
                        </select>
                    </div>

                    <div className="header-add-category">
                        <button className="btn-add-category" onClick={event => setCategoryDisplay(true)}>
                        +
                        </button>
                    </div>

                </header>
            </div>
            <AddCategory display={categoryDisplay}  onClose={event => setCategoryDisplay(false)}/>
            <Upload display={uploadDisplay} onClose={event => setUploadDisplay(false)}/>
            <Footer />
        </>
    )
}
