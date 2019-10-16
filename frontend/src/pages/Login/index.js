import React, { useState } from 'react';
import axios from 'axios';
import Alert from "../../componentes/Alert";
import ValidaForms from "../../componentes/ValidaForms";

import "./style.css";
import loading from "../../assets/loading.svg";
import woman from "../../assets/woman.jpg";


export default function Login({history}) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    // alert
    const [alertDisplay, setAlertDisplay] = useState(false);
    const [alertContext, setAlertContext] = useState([]);
    const [loginON, setLoginOn] = useState([])

    async function handlerLogin(e){
        e.preventDefault();

        
        const vUsername = ValidaForms(username, 'username', { min: 4, max: 12 })
        const vPassword = ValidaForms(password, 'password', { min: 4, max: 16 })

        if (vUsername.length > 0) {
            setAlertContext({
                title: "Falha ao logar",
                messege: vUsername[0].messege
            })
            setAlertDisplay(true);
        }

        if (vPassword.length > 0) {
            setAlertContext({
                title: "Falha ao logar",
                messege: vPassword[0].messege
            })
            setAlertDisplay(true);
        }

        if(vUsername.length === 0 && vPassword.length === 0){


     
                const response =  await axios.get(`http://localhost:3001/api/users/${username}`);

                if(response.data === null){
                    setAlertContext({
                        title: "Falha ao fazer login",
                        messege: "usuario digitado não exite."
                    })
                    setAlertDisplay(true);
                }else{
                    localStorage.setItem('user_id',response.data._id);
                    history.push('/galeria')
                }

            console.log(response);




        }
    }


    return (
        <div className="container-main">
            <form className="form-login" onSubmit={handlerLogin}>
                <div className="container-woman">
                    <img src={woman} alt=""/>
                </div>
               <div className="content">
               <h1 className="title">
                   Ola,
                   <span>Bem vindo!</span>
                </h1>
                <span className="description">
                    Faça upload das suas imagens, com qualidade e tenha acesso aonde estiver pelo computador ou celular.
                </span>
                <div className="form-group">
                    <label htmlFor="username" className="f-label">Username <span>(Somente letras)</span></label>
                    <input
                        type="text"
                        id="username"
                        className="f-input"
                        placeholder="Nome de usuario"
                        onChange={event => setUsername(event.target.value)}
                        maxLength="10"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="f-label">Password</label>
                    <input
                        type="password"
                        id="password"
                        className="f-input"
                        placeholder="Senha"
                        onChange={event => setPassword(event.target.value)}
                        maxLength="10"
                    />
                </div>
                <div className="form-row">
                    <input type="checkbox" id="lebrar-me" onChange={event => setLoginOn(event.target.checked)}/>
                    <label htmlFor="lebrar-me">Lembrar-me</label>
                </div>

                <button className="btn-login">Login</button>
                <img src={loading} alt="" className="loading"/>
                <span className="no-count">Não tem uma conta? <a href="#">Crie uma agora</a></span>
                <Alert
                    title={alertContext.title}
                    messege={alertContext.messege}
                    display={alertDisplay}
                    onClose={(e) => { setAlertDisplay(false) }} />
               </div>
            </form>
        </div>
    )
}