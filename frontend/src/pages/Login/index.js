import React, { useState } from 'react';
import axios from 'axios';
import Alert from "../../componentes/Alert";
import ValidaForms from "../../componentes/ValidaForms";

import "./style.css";
import loading from "../../assets/loading.svg";
import woman from "../../assets/woman.jpg";


export default function Login({ history }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    // alert
    const [alertDisplay, setAlertDisplay] = useState(false);
    const [alertContext, setAlertContext] = useState([]);
    const [loginON, setLoginOn] = useState([])

    async function handlerLogin(e) {
        e.preventDefault();

        const vEmail = ValidaForms(email, 'e-mail', { min: 4, max: 12 })
        const vPassword = ValidaForms(password, 'password', { min: 4, max: 16 })

        if (vEmail.length > 0) {
            setAlertContext({
                title: "Falha ao logar",
                messege: vEmail[0].messege
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

        if (vEmail.length === 0 && vPassword.length === 0) {
   
            
            try {
                const autheticate = await axios.post(`http://localhost:3001/api/authenticate`, {email, password});
                localStorage.setItem('user_id', autheticate.data._id);
                history.push('/galeria')

                
            } catch (err) {

                const erro = {error: err};

                if(erro.error.response){

                    const message = erro.error.response.data.message

                  
                    setAlertContext({
                        title: "Falha ao fazer login",
                        messege: message
                    })
                    setAlertDisplay(true);
                }else{
                    // Falha no servidor
                }

                
            }






        }
    }


    return (
        <div className="container-main">
            <form className="form-login" onSubmit={handlerLogin}>
                <div className="container-woman">
                    <img src={woman} alt="" />
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
                        <label htmlFor="email" className="f-label">Seu email</label>
                        <input
                            type="email"
                            id="email"
                            className="f-input"
                            placeholder="E-mail"
                            onChange={event => setEmail(event.target.value)}
                            maxLength="30"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="f-label">Sua senha</label>
                        <input
                            type="password"
                            id="password"
                            className="f-input"
                            placeholder="Digite uma senha segura"
                            onChange={event => setPassword(event.target.value)}
                            maxLength="10"
                        />
                    </div>
                    <div className="form-row">
                        <input type="checkbox" id="lebrar-me" onChange={event => setLoginOn(event.target.checked)} />
                        <label htmlFor="lebrar-me">Manter conectado</label>
                    </div>

                    <button className="btn-login">Login</button>
                    <img src={loading} alt="" className="loading" />
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