import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom'
import Alert from '../../componentes/Alert';
import './style.css'
import userImage from '../../assets/perfil.jpg';

export default function Account(){

    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null)
    const [description, setDescription] = useState(null);

    const [alertDislay, setAlertDisplay] = useState(false);
    const [alertMessage, setAlertMessage] = useState({})

    // Gera um preview da imagem
        useEffect(() => {

         setPreview(image ? URL.createObjectURL(image) : image)

        }, [image])


    async function handlerSalvar(e){
        e.preventDefault();

        if(!image){
            setAlertMessage({
                title: "Falha ao criar conta",
                message: "Nenhuma imagem foi selecionada.",
                type: "fail"
            })
            setAlertDisplay(true)
        }

        if(!description){
            setAlertMessage({
                title: "Falha ao criar conta",
                message: "Descrição não pode ficar em branco.",
                type: "fail"
            })
            setAlertDisplay(true)
        }
    }

    return (
        <div className="async-account" style={{backgroundImage: `url(${userImage})`}}>
            <div className="container">
                <div className="container-image">
                    <div className="title"><h3>Escolha uma imagem para o seu perfil</h3></div>
                    <div className="container-account-preview" style={preview ? {backgroundImage: `url(${preview})`} : {backgroundImage: `url(${userImage})`}}></div>
                    <div className="fild">
                        <input type="file" name="upload-image" id="upload-image" onChange={event => setImage(event.target.files[0])} accept="image/*"/>
                        <label htmlFor="upload-image" className="btn-primary">Carregar imagem</label>
                    </div>
                </div>


                <div className="container-sobre">
                <div className="title"><h3>Fale um pouco sobre você</h3></div>
                <div className="fild">
                    <textarea cols="30" rows="10" onChange={event => setDescription(event.target.value)}></textarea>
                </div>
                <div className="fild"><span>Escreva uma pequeno texto falando sobre você</span></div>
                <div className="fild">
                    <Link to="/galeria"><button className="btn btn-primary">Pular</button></Link>
                    <button className="btn btn-warning" onClick={handlerSalvar}>Salvar</button>
                </div>
                </div>
            </div>
            <Alert display={alertDislay} content={alertMessage} onClose={(e) => { setAlertDisplay(false) }} />
        </div>
    )
} 