import React, { useState, useEffect,useMemo } from 'react';
import { Redirect } from 'react-router-dom';
import CompressImage from "../../componentes/compress";
import apiDB from "../../serves/api";
import imgur from "../../serves/imgur";
import "./style.css"

function mbConverter(x){

    return x * 1024
 
    }
    function bytesToSize(bytes, decimals = 2) {
        if (bytes === 0) return '0 Bytes';
    
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    
        const i = Math.floor(Math.log(bytes) / Math.log(k));
    
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

export default function Editar(props) {


    const State = props.history.location.state;
    const [imageData, setImageData] = useState(null)
    const [imageReduce, setImageReduce] = useState(0);
    const [qld, setQld] = useState('42')


    useEffect(() => {



        var q = (qld * 2) / 100;

        if (!imageData) {
            if(State){
                setImageData(State.data)
            }

        } else {

            const compressImage = CompressImage(Image, q).then(function (response) {
  
            const prefix = response.prefix;
            const data = response.data;
            setImageData(`${prefix}${data}`);
            setImageReduce(response.endSizeInMb)

            
            })
        }



    }, [qld])


 
    async function handleImage(e) {
        e.preventDefault();

        const response = await imgur.post(imageData);

        if(response.status === 200){
            const dataImgur = response.data.data
            const imageStore = {
                "user_name": localStorage.getItem('username'),
                "image_id" : dataImgur.id,
                "title": dataImgur.title,
                "description":  dataImgur.description,
                "link": dataImgur.link,
                "type": dataImgur.type,
                "size": dataImgur.size,
                "deletehash": dataImgur.deletehash,

            }

            const upload = await apiDB.Create(imageStore, 'asynimageupload');
            console.log(upload);
        }
    }
    if (!State) {
        return (<Redirect to="/" />);
    }else{
        
    return (

        <div className="container-editor">
            <div className="container-preview" style={imageData ? { backgroundImage: `url(${imageData})` } : { backgroundImage: `url(${URL.createObjectURL(State.data)})` }}> </div>
            <form className="container-option">
                <h1 className="title">Qualidade</h1>
                <div className="form-input">
                    <input type="range" min="0" max="50" defaultValue="42"
                        onChange={event => setQld(event.target.value)} />
                </div>
                <div className="container-qld">{qld*2}%</div>
                <div className="container-info">
                    <span className="initialSize">Tamanho inicial: <span>{bytesToSize(Image.size)}</span> </span>
                    <span className="reduzeSize">Tamanho final: <span> {bytesToSize(mbConverter(imageReduce)).replace('Bytes','KB')}</span></span>
                </div>
                <div className="button-group">
                    <button className="btn btn-danger">Descartar</button>
                    <button className="btn btn-primary" onClick={handleImage}>Salvar</button>
                </div>
            </form>
        </div>
    )
    }



}