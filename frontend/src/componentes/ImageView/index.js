import React from 'react';
import './style.css';



function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export default function ImageView(props) {
    console.log(props)
    let image;
    let sizekb;
    if (props.image !== null) {

        image = props.image;
        sizekb = formatBytes(image.size)
        console.log(image.link)
    }

    if(props.display){

        return (
            <div className="modal-view">
                <div className="container-document">
                    <div className="title"><h1>Visualizar imagem</h1>
                    <button className="close" onClick={props.onClose}>X</button></div>
                    <div className="content">
                        <div className="container-preview"
                            style={props.image ? { backgroundImage: `url(${image.link})` } : null}
                        ></div>
    
                        {/* -------------------------- */}
                        <div className="container-info">
                            <div className="info-title">
                                <h3>Informações</h3>
                            
                                </div>
    
                            <div className="container">
                                <div className="fild">
                                    <div className="info-title">Nome da image: </div>
                                    <span className="info-data">{props.image ? image.title : null}</span>
                                </div>
                                <div className="fild">
                                    <div className="info-title">Descrição: </div>
                                    <span className="info-data">{props.image ? image.description : null}</span>
                                </div>
                                <div className="fild">
                                    <div className="info-title">Categoria: </div>
                                    <span className="info-data">{props.image ? image.category : null}</span>
                                </div>
                                <div className="fild">
                                    <div className="info-title">Formato: </div>
                                    <span className="info-data">{props.image ? image.type : null}</span>
                                </div>
                                <div className="fild">
                                    <div className="info-title">Tamanho: </div>
                                    <span className="info-data">{props.image ? `${sizekb}` : null}</span>
                                </div>
    
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }else{
        return <div />
    }
}