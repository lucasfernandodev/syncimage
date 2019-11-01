import React, { useState } from 'react';
import axios from 'axios';

import Validator from "../../validators/";
import { rules } from "../../validators/rules/login"

import "./style.css";
import loadingSvg from "../../assets/loading.svg";
import woman from "../../assets/woman.jpg";
import Alert from "../../componentes/Alert";

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

        
        const validaLogin = await Validator([

            { campo: email, campoName: 'email', rules: rules.Email, },
            { campo: password, campoName: 'password', rules: rules.Password },
            { campo: loginON, campoName: 'Lembrar-me', rules: rules.isLogin },

        ])

        if (!validaLogin) {

            try {
                const autheticate = await axios.post(`http://localhost:3001/api/authenticate`, { email, password });

                localStorage.setItem('token', `Bearer ${autheticate.data.token}`);
                localStorage.setItem('user_id', autheticate.data.user._id);
                localStorage.setItem('avatar', autheticate.data.avatar);
                setLoading('Login');

                return history.push('/galeria')

            } catch (err) {

                setAlertContent({ title: "Falha ao logar", message: "Falha ao tentar logar!", type: 'fail' })
                setAlertDisplay(true);
                setLoading('login');
            }

        } else {


            setAlertContent({ title: "Falha ao logar!", message: validaLogin[0], type: 'fail' })
            setAlertDisplay(true);
            setLoading('login');
        }


    }

    if(localStorage.getItem('token')){
        history.push('/galeria');
    }
    return (
        <div className="async-login">
            <div className="container-main">
                <form className="form-login" onSubmit={handlerLogin}>

                    {/* Ilustração */}
                    <div className="container-woman">
                        <img src={woman} alt="Mulher de azul" />
                    </div>

                    <div className="content">
                        <h1 className="title">
                            Ola, <span>Bem vindo!</span>
                        </h1>

                        <span className="description">
                            Faça upload das suas imagens, com qualidade e tenha acesso aonde estiver pelo computador ou celular.
                    </span>


                        {/* Filds */}
                        <div className="form-group">
                            <label htmlFor="email" className="f-label">E-mail</label>
                            <input
                                type="email"
                                id="email"
                                className="f-input"
                                placeholder="Seu email"
                                onChange={event => setEmail(event.target.value)}
                                maxLength="30"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password" className="f-label">Senha</label>
                            <input
                                type="password"
                                id="password"
                                className="f-input"
                                placeholder="Sua senha"
                                onChange={event => setPassword(event.target.value)}
                                maxLength="10"
                            />
                        </div>

                        <div className="form-row">
                            <input type="checkbox" id="lebrar-me" onChange={event => setLoginOn(event.target.checked)} />
                            <label htmlFor="lebrar-me">Manter conectado</label>
                        </div>

                        <button className="btn-login">{loading === 'loading' ? (<img src={loadingSvg} className="loading" alt="Loading" />) : loading}</button>


                        <span className="no-count">Não tem uma conta? <a href="/cadastro">Crie uma agora</a></span>

                        <Alert display={alertDisplay} content={alertContent} onClose={(e) => { setAlertDisplay(false) }} />
                    </div>
                </form>
            </div>
        </div>
    )
}