import React from 'react';
import './style.css'
import userImage from '../../assets/perfil.jpg';

export default function Account(){
    return (
        <div className="async-account" style={{backgroundImage: `url(${userImage})`}}>
            <div className="container">
                <div className="container-image">
                    <div className="title"><h3>Escolha uma imagem para o seu perfil</h3></div>
                    <div className="container-account-preview" style={{backgroundImage: `url(${userImage})`}}></div>
                    <div className="fild">
                        <input type="file" name="upload-image" id="upload-image"/>
                        <label htmlFor="upload-image">Carregar imagem</label>
                    </div>
                </div>


                <div className="container-sobre">
                <div className="title"><h3>Fale um pouco sobre você</h3></div>
                <div className="fild">
                    <textarea name="" id="" cols="30" rows="10"></textarea>
                </div>
                <div className="fild"><span>Escreva uma pequeno texto falando sobre você</span></div>
                <div className="fild">
                    <button className="btn btn-primary">Pular</button>
                    <button className="btn btn-warning">Salvar</button>
                </div>
                </div>
            </div>
        </div>
    )
} 