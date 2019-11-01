import React, { useState, useEffect, useMemo } from 'react';
import Config from "./Config";

import './style.css';
import camera from '../../assets/camera.svg';

export default function Upload(props) {

    const [image, setImage] = useState(null);
    const [configMenu, setConfigMenu] = useState('');

    // const display = props.display;
    useEffect(() => {
        setImage(null);
    }, [props.display])

    // Gera um preview da imagem
    const preview = useMemo(
        () => {
            return image ? URL.createObjectURL(image) : image
        }, [image]
    )



    if(props.display){
        return (
            <div className="modal-upload">
                <form className="upload-container">
                    <div className="form-header">
                        <h1>Selecionar imagem</h1>
                        <div className="btn-close"  onClick={props.onClose}>X</div>
                    </div>
                    <div className="container-upload">
                        <label 
                            htmlFor="upload" 
                            id='uploadcontent'
                            style={{ backgroundImage: `url(${preview})` }} 
                            className={preview ? 'has-image upload' : 'upload'}
                        >
                            <input type="file" id="upload" onChange={event => setImage(event.target.files[0])} accept="image/*" />
                            <img src={camera} alt=" user"/>
                            <span>Escolher imagem</span>
                        </label>
                    </div>
                    <div className="container-config">
                        <div className="content">
                            <div className="config-header">
                                <ul>
                                    <li>
                                        <h3 
                                        onClick={event => setConfigMenu('option')}
                                        className={configMenu === 'option' ? "select" : "" || configMenu === '' ? "select" : ""}>Opções</h3>
                                    </li>
                                    <li>
                                        <h3
                                        onClick={event => setConfigMenu('description')}
                                        className={configMenu === 'description' ? "select" : ""}>Descrição</h3>
                                    </li>
                                    <li>
                                        <h3
                                        onClick={event => setConfigMenu('avancado')}
                                        className={configMenu === 'avancado' ? "select" : ""}>Avançado</h3>
                                    </li>
                                </ul>
                            </div>
    
                            <Config name={configMenu} data={image}/>
                        </div>
                    </div>
                </form>
            </div>
        )
    }else{
        return <div />
    }

    
}