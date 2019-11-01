import React, { useState } from 'react';
import { Redirect } from 'react-router-dom'


import Validator from "../../validators";
import { rules } from "../../validators/rules/cadastro";

import Alert from "../../componentes/Alert";
import loadingSvg from "../../assets/loading.svg";
import woman from "../../assets/woman2.jpg";
import "./style.css";

export default function Cadastro() {

    // Form
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [termos, setTermos] = useState(false);

    const [account, setAccount] = useState(false);

    // alert
    const [alertDisplay, setAlertDisplay] = useState(false);
    const [alertContent, setAlertContent] = useState({});


    // loading
    const [loading, setLoading] = useState('Cadastrar');



    async function handleCadastrar(e) {
        e.preventDefault();
        setLoading('loading');



        const validaForm = await Validator([
            { campo: username, campoName: 'username',  rules: rules.Username },
            { campo: email, campoName: 'email',  rules: rules.Email },
            { campo: password, campoName: 'password',  rules: rules.Password },
            { campo: termos, campoName: 'termos',  rules: rules.Termos },

        ])

        if (validaForm !== false) {
            setAlertContent({
                title: "Falha ao cadastrar",
                message: validaForm[0],
                type: "fail"
            })
            setAlertDisplay(true);
            setLoading('Cadastrar');

        } else {
            setLoading('Cadastrar');
            setAccount(true)

        }



    }

    return (
        <div className="async-cadastro">
            <div className="container-main">
            {account ? (<Redirect to={{
                pathname: "/account",
                data: {username, password, email},
            }} />) : ""}


            <form className="form-login" onSubmit={handleCadastrar}>
                <div className="container-woman">
                    <img src={woman} alt="" />
                </div>
                <div className="content">
                    <h1 className="title">
                        Que tal, criar uma nova conta!
                    </h1>

                    <span className="description">
                        Faça upload das suas imagens, com qualidade e tenha acesso aonde estiver pelo computador ou celular.
                    </span>

                    <div className="form-group">
                        <label htmlFor="username" className="f-label">Nome de usuario</label>
                        <input
                            type="text"
                            id="username"
                            className="f-input"
                            placeholder="Seu nome"
                            onChange={event => setUsername(event.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email" className="f-label">E-mail</label>
                        <input
                            type="email"
                            id="email"
                            className="f-input"
                            placeholder="Seu email"
                            onChange={event => setEmail(event.target.value)}
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

                    <div className="form-row" id="form-row2">
                        <input type="checkbox" id="lebrar-me" onChange={event => setTermos(event.target.checked)} />
                        <label htmlFor="lebrar-me">Aceitar Termos e condições</label>
                    </div>

                    <button className="btn-login">{loading === 'loading' ? (<img src={loadingSvg} className="loading" alt="Loading" />) : loading}</button>

                </div>
            </form>
            <Alert
                content={alertContent}
                display={alertDisplay}
                onClose={(e) => { setAlertDisplay(false) }}
            />

        </div>
        </div>
    )
}