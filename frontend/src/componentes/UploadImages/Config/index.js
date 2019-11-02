import React, { useState, useMemo, useEffect } from 'react';
import axios from 'axios';

import Validator from "../../../validators";
import {rules} from "../../../validators/rules/upload.js"
import Alert from "../../../componentes/Alert";
import CompressImage from "../../../componentes/CompressImage";

import loadingSvg from "../../../assets/loading.svg";


export default function Config(props) {

    const user_id = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");

    // Form
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('all');
    const [privacy, setPrivacy] = useState('publico');
    const [description, setDescription] = useState('');
    const [descriptionNone, setDescriptionNone] = useState(false);
    const [editionON, setEditionOn] = useState('Desativado');

    // Categorias
    const [listCategory, setListCategory] = useState([])

    // alert
    const [alertDisplay, setAlertDisplay] = useState(false);
    const [alertcontent, setAlertContent] = useState([])

    // loading
    const [loading, setLoading] = useState('Salvar')



    useMemo(async () => {
        try {
            const response = await axios.get(`http://localhost:3001/api/category/${user_id}`, {headers: {
                authorization: token
            }});

            if (response.data.category === null) {
                setListCategory(['none']);
            } else {
                setListCategory(response.data.category);
            }

        } catch (error) {
            // Tratar erro
            console.log({ error })
        }
    }, [user_id,token])


    useEffect(()=> {
        if (descriptionNone === true) {
            setDescription('Description none');
        }
    }, [descriptionNone])

    const image = props.data;


    async function handleUpload(e) {
        e.preventDefault();
        setLoading('loading')



        const validaForm = await Validator([

            { campo: title, campoName: 'titulo',  rules: rules.Title },
            { campo: category, campoName: 'categoria',  rules: rules.Category },
            { campo: privacy, campoName: 'privacidade',  rules: rules.Privacy },
            { campo: description, campoName: 'Descrição',  rules: rules.Description },
            { campo: editionON, campoName: 'Edição automatica',  rules: rules.EditionOn },

        ])

        if (validaForm !== false) {

            setAlertContent({
                title: "Falha ao realizar upload",
                message: validaForm[0],
                type: "fail"
            })
            setLoading('Salvar')
            setAlertDisplay(true);

        } else {


            if (!image) {
                setAlertContent({
                    title: "Falha ao fazer upload",
                    message: "Imagem invalida",
                    type: "fail"
                })
                setLoading('Salvar')
                setAlertDisplay(true)

            }


            if (image) {
                if (image.size >= 3000000) {

                    setAlertContent({
                        title: "Falha ao fazer upload",
                        message: "O Tamanho da imagem não deve exceder 5mb",
                        type: "fail"
                    })
                    setLoading('Salvar')
                    setAlertDisplay(true)

                }


                const info = {
                    user_id,
                    title,
                    description,
                    category,
                    privacy,

                }

                // Gera um base64 da image
                const result = await CompressImage(image, 1);
                const baseString = result.data;

                // Gera um base64 da preview
                const resultPreview = await CompressImage(image, 0.5);
                const preview64 = resultPreview.data;

                try {
                    await axios.post('http://localhost:3001/api/image', { image: baseString, info, preview: preview64 }, {headers: {
                        authorization: token
                    }})

                    

                    setAlertContent({
                        title: "Sucesso ao fazer upload",
                        message: "A imagem foi adicionada a sua galeria!",
                        type: "sucess"
                    })
                    setLoading('Salvar')
                    setAlertDisplay(true)
                    // console.log(response);

                } catch (error) {
                    setAlertContent({
                        title: "Falha ao fazer upload",
                        message: "Tente novamente!",
                        type: "fail"
                    })
                    setLoading('Salvar')
                    setAlertDisplay(true)
                }
            }
        }

    }

    function handleCancelar(e) {
        e.preventDefault();
    }

    // --------------------------------------------------------------------------------------


    if (props.name === 'option' || !props.name) {

        return (
            <div className="container-option">
                <div className="form-group">
                    <label htmlFor="title" className="f-label">Titulo da imagem *</label>
                    <input
                        type="text"
                        id="title"
                        className='f-input'
                        onChange={event => setTitle(event.target.value)}
                        value={title !== '' ? title : ''}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="category" className="f-label">Escolher categoria</label>
                    <select
                        id="category"
                        onChange={event => setCategory(event.target.value)}
                        value={category !== '' ? category : ''}
                    >
                        <option value="all">All</option>
                        {listCategory ? listCategory.map((item, i) => (
                            <option value={item} key={i}>{item}</option>
                        )) : ''}
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
                    <button className="btn btn-primary" onClick={handleUpload}>{loading === 'loading' ? (<img src={loadingSvg} className="loading" alt="Loading" />) : loading}</button>
                    <button className="btn btn-none" onClick={handleCancelar}>Cancelar</button>
                </div>

                <span>Teve algum problema? tente o <a href="/#">upload normal</a></span>
                <Alert
                    content={alertcontent}
                    display={alertDisplay}
                    onClose={(e) => { setAlertDisplay(false) }}
                />

            
            </div>

        )
    }



    if (props.name === 'description') {
        return (
            <>
                <div className="container-description">
                    <div className="form-group">
                        <label htmlFor="description" className="f-label">Defina um pequeno texto como descrição para sua imagem *</label>
                        <textarea
                            id="description"
                            className='f-textarea'
                            onChange={event => setDescription(event.target.value)}
                            value={description !== '' ? description : ''}
                        >
                        </textarea>
                    </div>

                    <div className="form-row">
                        {descriptionNone === false ? (<input type="checkbox"
                            onClick={event => setDescriptionNone(true)}

                        />) : (<input type="checkbox"
                            onClick={event => setDescriptionNone(false)}
                            checked="checked"
                        />)}

                        <span>Deixar em branco</span>
                    </div>
                    <span>A descrição é limitada a 300 caracteres, caso não queiera adicionar descrição, marque a opção acima.</span>
                </div>
                <Alert
                    content={alertcontent}
                    display={alertDisplay}
                    onClose={(e) => { setAlertDisplay(false) }}
                />
            </>
        )
    }

    if (props.name === 'avancado') {
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
                    content={alertcontent}
                    display={alertDisplay}
                    onClose={(e) => { setAlertDisplay(false) }}
                />
            </>
        )
    }

    return <div />
}