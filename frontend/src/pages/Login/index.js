import React, { useState } from 'react';
import axios from 'axios';
import Alert from "../../componentes/Alert";
import ValidaForms from "../../componentes/ValidaForms";

import "./style.css";
import loadingSvg from "../../assets/loading.svg";
import woman from "../../assets/woman.jpg";


export default function Login({ history }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginON, setLoginOn] = useState([])


    // alert
    const [alertDisplay, setAlertDisplay] = useState(false);
    const [alertContext, setAlertContext] = useState([]);
    const [alertType, setAlertType] = useState('')

    const [loading, setLoading] = useState('Login')


    async function handlerLogin(e) {
        e.preventDefault();
        setLoading('loading');

        const validaForm = await ValidaForms([
            {
                $campo: email, $nomeCampo: 'email', $rules: {
                    min: 4,
                    max: 32,
                    type: String,
                    required: true
                }
            },
            {
                $campo: password, $nomeCampo: 'password', $rules: {
                    min: 4,
                    max: 12,
                    type: String,
                    required: true
                }
            },
            {
                $campo: loginON, $nomeCampo: 'Lembrar-me', $rules: {
                    type: Boolean,
                    required: false
                }
            },

        ])

        if (validaForm !== false) {
            setAlertContext({
                title: "Falha ao logar",
                messege: validaForm[0]
            })
            setAlertType('fail');
            setAlertDisplay(true);
            setLoading('login');
        } else {

            try {
                const autheticate = await axios.post(`http://localhost:3001/api/authenticate`, { email, password });
                localStorage.setItem('user_id', autheticate.data._id);
                setLoading('login');
                history.push('/galeria')


            } catch (err) {

                const erro = { error: err };

                if (erro.error.response) {

                    const message = erro.error.response.data.message


                    setAlertContext({
                        title: "Falha ao fazer login",
                        messege: message
                    })
                    setAlertType('fail');
                    setAlertDisplay(true);
                    setLoading('login');
                } else {
                    // Falha no servidor
                }


            }
        }
    }


    return (
        <div className="container-main">
            <form className="form-login" onSubmit={handlerLogin}>
                <div className="container-woman">
                    <img src={woman} alt="Mulher de azul" />
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

                    <button className="btn-login">{loading === 'loading' ? (<img src={loadingSvg} className="loading" alt="Loading" />) : loading}</button>


                    <span className="no-count">Não tem uma conta? <a href="/#">Crie uma agora</a></span>
                    <Alert
                        title={alertContext.title}
                        type={alertType}
                        messege={alertContext.messege}
                        display={alertDisplay}
                        onClose={(e) => { setAlertDisplay(false) }} />
                </div>
            </form>
        </div>
    )
}