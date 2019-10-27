import React, { useState } from 'react';
import axios from 'axios';
import Alert from "../../componentes/Alert";
import ValidaForms from "../../componentes/ValidaForms";

import "./style.css";
import loadingSvg from "../../assets/loading.svg";
import woman from "../../assets/woman.jpg";


export default function Login({ history }) {

    // Form
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginON, setLoginOn] = useState([])


    // Alert
    const [alertContent, setAlertContent] = useState({})
    const [alertDisplay, setAlertDisplay] = useState(false);

    // Loading
    const [loading, setLoading] = useState('Login')


    async function handlerLogin(e) {
        e.preventDefault();
        setLoading('loading');

        // Valdia o formulario
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

            setAlertContent({
                title: "Falha ao logar",
                message: validaForm[0],
                type: 'fail'
            })
            setAlertDisplay(true);
            setLoading('login');
        } else {

            try {
                const autheticate = await axios.post(`http://localhost:3001/api/authenticate`, { email, password });
                
                
                localStorage.setItem('token', `Bearer ${autheticate.data.token}`);
                localStorage.setItem('user_id', autheticate.data.user._id);
                setLoading('Login');
                history.push('/galeria')


            } catch (err) {

                const erro = { error: err };

                if (erro.error.response) {

                    const message = erro.error.response.data.message

                    setAlertContent({
                        title: "Falha ao logar",
                        message: message,
                        type: 'fail'
                    });
                    setAlertDisplay(true);

                    setLoading('Login');
                } else {
                    console.log(erro);
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
                        <input type="checkbox" id="lebrar-me" 
                        onChange={event => setLoginOn(event.target.checked)} />
                        <label htmlFor="lebrar-me">Manter conectado</label>
                    </div>

                    <button className="btn-login">{loading === 'loading' ? (<img src={loadingSvg} className="loading" alt="Loading" />) : loading}</button>


                    <span className="no-count">Não tem uma conta? <a href="/cadastro">Crie uma agora</a></span>
                    <Alert

                        display={alertDisplay}
                        content={alertContent}
                        onClose={(e) => { setAlertDisplay(false) }} />
                </div>
            </form>
        </div>
    )
}