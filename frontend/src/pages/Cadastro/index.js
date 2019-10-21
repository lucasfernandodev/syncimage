import React, { useState } from 'react';
import axios from "axios";
import Alert from "../../componentes/Alert";
import ValidaForms from "../../componentes/ValidaForms";


import "./style.css";
import loadingSvg from "../../assets/loading.svg";
import woman from "../../assets/woman2.jpg";


export default function Cadastro({ history }) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [termos, setTermos] = useState(false);

    // alert
    const [alertDisplay, setAlertDisplay] = useState(false);
    const [alertContext, setAlertContext] = useState([]);
    const [alertType, setAlertType] = useState('')
    const [loading, setLoading] = useState('Cadastrar')

    async function handleCadastrar(e) {
        setLoading('loading');
        e.preventDefault();

        const vUsername = ValidaForms(username, 'username', { min: 4, max: 12 })
        const vPassword = ValidaForms(password, 'password', { min: 4, max: 16 })
        const vEmail = ValidaForms(email, 'email', { min: 4, max: 32 })
        const vTermos = ValidaForms(termos, 'termos & condições', { type: Boolean })

        if (vUsername.length > 0) {
            setAlertContext({
                title: "Falha ao cadastrar",
                messege: vUsername[0].messege
            })
            setAlertDisplay(true);
            setLoading('Cadastrar');
        } else {
            if (vPassword.length > 0) {
                setAlertContext({
                    title: "Falha ao cadastrar",
                    messege: vPassword[0].messege
                })
                setAlertDisplay(true);
                setLoading('Cadastrar');
            } else {
                if (vEmail.length > 0) {
                    setAlertContext({
                        title: "Falha ao cadastrar",
                        messege: vEmail[0].messege
                    })
                    setAlertDisplay(true);
                    setLoading('Cadastrar');
                } else {
                    if (vTermos.length > 0) {
                        setAlertContext({
                            title: "Falha ao cadastrar",
                            messege: vTermos[0].messege
                        })
                        setAlertDisplay(true);
                        setLoading('Cadastrar');
                    } else {

                        try {
                            const response = await axios.post('http://localhost:3001/api/users', {
                                name: username,
                                email: email,
                                password: password
                            });
                            localStorage.setItem("user_id", response.data._id);

                            setAlertContext({
                                title: "Sucesso ao cadastrar",
                                messege: "Bem vindo a SyncImage"
                            })

                            setAlertType('save');
                            setAlertDisplay(true);

                            history.push('/galeria');

                        } catch (err) {
                            const erro = {error: err};

                            if(erro.error.response){
                                const message = erro.error.response.data.message

                                console.log(erro.error.response)
                                setAlertContext({
                                    title: "Falha ao cadastrar",
                                    messege: message
                                })
                                setAlertDisplay(true);
                                setLoading('Cadastrar');
                            }

                            
                        }

                    }

                }
            }
        }

    }


    return (
        <div className="container-main">
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
                        <label htmlFor="username" className="f-label">Nome de usuario <span>(Somente letras)</span></label>
                        <input
                            type="text"
                            id="username"
                            className="f-input"
                            placeholder="Lucas Fernando"
                            onChange={event => setUsername(event.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email" className="f-label">Seu e-mail</label>
                        <input
                            type="email"
                            id="email"
                            className="f-input"
                            placeholder="Lucas@exemplo.com"
                            onChange={event => setEmail(event.target.value)}
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

                    <div className="form-row" id="form-row2">
                        <input type="checkbox" id="lebrar-me" onChange={event => setTermos(event.target.checked)} />
                        <label htmlFor="lebrar-me">Aceitar Termos e condições</label>
                    </div>

                    <button className="btn-login">{loading === 'loading' ? (<img src={loadingSvg} className="loading"/>) : loading}</button>
                   
                </div>
            </form>
            <Alert
                type={alertType}
                title={alertContext.title}
                messege={alertContext.messege}
                display={alertDisplay}
                onClose={(e) => { setAlertDisplay(false) }} 
            />
        </div>
    )
}