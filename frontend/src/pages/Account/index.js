import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom'
import axios from 'axios';
import CompressImage from '../../componentes/CompressImage'
import Alert from '../../componentes/Alert';
import './style.css'
import userImage from '../../assets/perfil.jpg';

export default function Account({history, location}) {

    const token = localStorage.getItem('token');

    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null)
    const [description, setDescription] = useState(null);
    const [avatar, setAvatar] = useState(null)

    const [alertDislay, setAlertDisplay] = useState(false);
    const [alertMessage, setAlertMessage] = useState({})

    // Gera um preview da imagem
    useEffect(() => {

        setPreview(image ? URL.createObjectURL(image) : image)

    }, [image])

    if (!location.data) {
        return (<Redirect to="/cadastro" />)
    }

    const { username, password, email } = location.data;

    async function handlerSalvar(e) {
        e.preventDefault();

        if (!image) {
            setAlertMessage({
                title: "Falha ao criar conta",
                message: "Nenhuma imagem foi selecionada.",
                type: "fail"
            })
            setAlertDisplay(true)
            return false;
        }



        if (!description) {
            setAlertMessage({
                title: "Falha ao criar conta",
                message: "Descrição não pode ficar em branco.",
                type: "fail"
            })
            setAlertDisplay(true)
            return false;
        }

        if(image){
            const image64 = await CompressImage(image, 0.6);
            if(image64){
                setAvatar(image64.data)
            }

            handleCadastro('e')


        }
    }

        async function handleCadastro(e){
            if(e !== 'e'){
                e.preventDefault();
            }

            try {
                const response = await axios.post('http://localhost:3001/api/users', { username, avatar, description, email, password });
    
                localStorage.setItem('token', `Bearer ${response.data.token}`);
                localStorage.setItem("user_id", response.data.user._id);
                localStorage.setItem("avatar", response.data.avatar);
                localStorage.setItem("login", true);
    
               
    
            } catch (err) {
                const erro = { error: err };
    
                if (erro.error.response) {
                    const message = erro.error.response.data.message
    
                    setAlertMessage({
                        title: "Falha ao cadastrar",
                        message: message,
                        type: "fail"
                    })
                    setAlertDisplay(true);
                }
    
    
            }
        
            if(localStorage.getItem('token')){
                history.push('/galeria');
            }

        


    }

    return (
        <div className="async-account" style={{ backgroundImage: `url(${userImage})` }}>
            <div className="container">
                <div className="container-image">
                    <div className="title"><h3>Escolha uma imagem para o seu perfil</h3></div>
                    <div className="container-account-preview" style={preview ? { backgroundImage: `url(${preview})` } : { backgroundImage: `url(${userImage})` }}></div>
                    <div className="fild">
                        <input type="file" name="upload-image" id="upload-image" onChange={event => setImage(event.target.files[0])} accept="image/*" />
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
                        <button className="btn btn-primary" onClick={handleCadastro}>Pular</button>
                        <button className="btn btn-warning" onClick={handlerSalvar}>Salvar</button>
                    </div>
                </div>
            </div>
            <Alert display={alertDislay} content={alertMessage} onClose={(e) => { setAlertDisplay(false) }} />
        </div>
    )
} 