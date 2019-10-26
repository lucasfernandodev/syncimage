import React, { useState } from 'react';
import Validaforms from "../../../componentes/ValidaForms";
import Alert from "../../../componentes/Alert";
import { Redirect } from "react-router-dom";

const token = localStorage.getItem('token');

export default function Config(props) {

    const [title, setTitle] = useState('');
    const [categoria, setCategoria] = useState('');
    const [privacy, setPrivacy] = useState('publico');
    const [description, setDescription] = useState('');
    const [editionON, setEditionOn] = useState('Dasativado');
    const [redirect, setRedirect] = useState(false);
    // alert
    const [alertDisplay, setAlertDisplay] = useState(false);
    const [alertContext, setAlertContext] = useState([]);

    const image = props.data;


    function handleUpload(e) {
        e.preventDefault();

        const vTitle = Validaforms(title, 'titulo', { min: 4, max: 16 })
        const vCategoria = Validaforms(categoria, 'categoria')
        const vPrivacy = Validaforms(privacy, 'privacidade')
        const vDescription = Validaforms(description, 'Descrição', { min: 5, max: 300 })
        const vEditionOn = Validaforms(editionON, 'Edição automatica')

        if (vTitle.length != 0) {
            setAlertContext({
                title: "Falha ao salvar arquivo",
                messege: vTitle[0].messege
            })
            setAlertDisplay(true)
        }

        if (vCategoria.length != 0) {
            setAlertContext({
                title: "Falha ao salvar arquivo",
                messege: vCategoria[0].messege
            })
            setAlertDisplay(true)
        }

        if (vPrivacy.length != 0) {
            setAlertContext({
                title: "Falha ao salvar arquivo",
                messege: vPrivacy[0].messege
            })
            setAlertDisplay(true)
        }

        if (vDescription.length != 0) {
            setAlertContext({
                title: "Falha ao salvar arquivo",
                messege: vDescription[0].messege
            })
            setAlertDisplay(true)
        }

        if (vEditionOn.length != 0) {
            setAlertContext({
                title: "Falha ao salvar arquivo",
                messege: vEditionOn[0].messege
            })
            setAlertDisplay(true)
        }

        if (!image) {
            setAlertContext({
                title: "Falha ao fazer upload",
                messege: "Imagem invalida"
            })
            setAlertDisplay(true)
        }
        

        if(image){
            if (image.size >= 1000000) {
                setAlertContext({
                    title: "Falha ao fazer upload",
                    messege: "O Tamanho da imagem não deve exceder 5mb"
                })
                setAlertDisplay(true)
            }
        }

        setRedirect(true)

    }



    if (props.name == 'option' || !props.name) {

        return (
            <div className="container-option">
                <div className="form-group">
                    <label htmlFor="title" className="f-label">Titulo da imagem</label>
                    <input
                        type="text"
                        className="f-input"
                        id="title"
                        onChange={event => setTitle(event.target.value)}
                        value={title != '' ? title : ''}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="categorias" className="f-label">Escolher categoria</label>
                    <select
                        id="categorias"
                        onChange={event => setCategoria(event.target.value)}
                        value={categoria != '' ? categoria : ''}
                    >
                        <option value="jogos">Jogos</option>
                        <option value="cidades">Cidades</option>
                        <option value="animes">animes</option>
                        <option value="nezuko">nezuko</option>
                    </select>
                </div>


                <div className="form-group">
                    <label htmlFor="privacy" className="f-label">Definir privacidade</label>
                    <select
                        id="privacy"
                        onChange={event => setPrivacy(event.target.value)}
                    >
                        <option value="publico">Publico</option>
                        <option value="privado">Privado</option>
                    </select>
                </div>
                <div className="form-row">
                    <button className="btn btn-primary" onClick={handleUpload}>Salvar</button>
                    <button className="btn btn-none">Cancelar</button>
                </div>
                <span>Teve algum problema? tente o <a href="#">upload normal</a></span>
                <Alert
                    title={alertContext.title}
                    messege={alertContext.messege}
                    display={alertDisplay}
                    onClose={(e) => { setAlertDisplay(false) }}
                />

            
            </div>

        )
    }

    if (props.name == 'description') {
        return (
            <>
                <div className="container-description">
                    <div className="form-group">
                        <label htmlFor="description" className="f-label">Defina um pequeno texto como descrição para sua imagem</label>
                        <textarea
                            id="description"
                            className="f-textarea"
                            onChange={event => setDescription(event.target.value)}
                            value={description != '' ? description : ''}
                        >
                        </textarea>
                    </div>

                    <div className="form-row">
                        <input type="checkbox" name="" id="" />
                        <span>Deixar em branco</span>
                    </div>
                    <span>A descrição é limitada a 300 caracteres.</span>
                </div>
                <Alert
                    title={alertContext.title}
                    messege={alertContext.messege}
                    display={alertDisplay}
                    onClose={(e) => { setAlertDisplay(false) }}
                />
            </>
        )
    }

    if (props.name == 'avancado') {
        return (
            <>
                <div className="container-avancado">
                    <div className="form-group">
                        <label htmlFor="editionOn" className="f-label">Tratamento automatico da imagem</label>
                        <select id="editionOn"
                            onChange={event => setEditionOn(event.target.value)}
                        >
                            <option value="Dasativado">Dasativado</option>
                            <option value="Ativado">Ativado</option>
                        </select>
                    </div>
                </div>
                <Alert
                    title={alertContext.title}
                    messege={alertContext.messege}
                    display={alertDisplay}
                    onClose={(e) => { setAlertDisplay(false) }}
                />
            </>
        )
    }

    return <div />
}