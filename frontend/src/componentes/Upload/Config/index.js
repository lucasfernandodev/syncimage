import React, { useState } from 'react';
import axios from 'axios';

import Validaforms from "../../../componentes/ValidaForms";
import Alert from "../../../componentes/Alert";
import CompressImage from "../../../componentes/compress";



const user_id = localStorage.getItem("user_id");


export default function Config(props) {

    const [title, setTitle] = useState('');
    const [categoria, setCategoria] = useState('none');
    const [privacy, setPrivacy] = useState('publico');
    const [description, setDescription] = useState('');
    const [editionON, setEditionOn] = useState('Desativado');

    // style Erro input
    const [validaTitle, setValidaTitle] = useState(false);
    const [validaDescription, setValidaDescription] = useState(false);

    // Categorias
    const [listCategory, setListCategory] = useState([])

    // alert
    const [alertDisplay, setAlertDisplay] = useState(false);
    const [alertContext, setAlertContext] = useState([]);
    const [alertType, setAlertType] = useState('primary');

    const image = props.data;



    const renderList = async () => {


        try {
            const response = await axios.get(`http://localhost:3001/api/category/${user_id}`);

            if (response.data.category === null) {
                setListCategory(['none']);
            } else {
                setListCategory(response.data.category);
            }

        } catch (error) {
            // Tratar erro
            console.log({ error })
        }


    }

    renderList();


    async function handleUpload(e) {
        e.preventDefault();

        const vTitle = Validaforms(title, 'titulo', { min: 4, max: 16 })
        const vCategoria = Validaforms(categoria, 'categoria')
        const vPrivacy = Validaforms(privacy, 'privacidade')
        const vDescription = Validaforms(description, 'Descrição', { min: 5, max: 300 })
        const vEditionOn = Validaforms(editionON, 'Edição automatica')

        if (vTitle.length !== 0) {
            setAlertContext({
                title: "Falha ao salvar arquivo",
                messege: vTitle[0].messege
            })
            setAlertType('fail')
            setValidaTitle(true)
            setAlertDisplay(true)
        }

        if (vCategoria.length !== 0) {
            setAlertContext({
                title: "Falha ao salvar arquivo",
                messege: vCategoria[0].messege
            })
                        setAlertType('fail')
            setAlertDisplay(true)

        }

        if (vPrivacy.length !== 0) {
            setAlertContext({
                title: "Falha ao salvar arquivo",
                messege: vPrivacy[0].messege
            })
                        setAlertType('fail')
            setAlertDisplay(true)

        }

        if (vDescription.length !== 0) {
            setAlertContext({
                title: "Falha ao salvar arquivo",
                messege: vDescription[0].messege
            })
                        setAlertType('fail')
            setAlertDisplay(true)
            setValidaDescription(true)

        }

        if (vEditionOn.length !== 0) {
            setAlertContext({
                title: "Falha ao salvar arquivo",
                messege: vEditionOn[0].messege
            })
            setAlertType('fail')
            setAlertDisplay(true)

        }

        if (!image) {
            setAlertContext({
                title: "Falha ao fazer upload",
                messege: "Imagem invalida"
            })
            setAlertType('fail')
            setAlertDisplay(true)

        }


        if (image) {
            if (image.size >= 3000000) {
                setAlertContext({
                    title: "Falha ao fazer upload",
                    messege: "O Tamanho da imagem não deve exceder 5mb"
                })
                setAlertType('fail')
                setAlertDisplay(true)

            }

            if (alertContext.length === 0) {
                setValidaTitle(false)
                setValidaDescription(false)
                
            }

            const info = {
                user_id,
                title,
                description,
                category: categoria,
                privacy,

            }

            const result = await CompressImage(image, 1);

            const baseString = result.data;

            try {
                const response = await axios.post('http://localhost:3001/api/image', { image: baseString, info })
                console.log(response);
                
            } catch (error) {
                console.log(`${error}`)
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
                        onChange={event => setCategoria(event.target.value)}
                        value={categoria !== '' ? categoria : ''}
                    >
                        {listCategory ? listCategory.map((item, i) => (
                            <option key={i}>{item}</option>
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
                    <button className="btn btn-primary" onClick={handleUpload}>Salvar</button>
                    <button className="btn btn-none" onClick={handleCancelar}>Cancelar</button>
                </div>

                <span>Teve algum problema? tente o <a href="#">upload normal</a></span>
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



    if (props.name == 'description') {
        return (
            <>
                <div className="container-description">
                    <div className="form-group">
                        <label htmlFor="description" className="f-label">Defina um pequeno texto como descrição para sua imagem *</label>
                        <textarea
                            id="description"
                            className='f-textarea'
                            onChange={event => setDescription(event.target.value)}
                            value={description != '' ? description : ''}
                        >
                        </textarea>
                    </div>

                    <div className="form-row">
                        <input type="checkbox" />
                        <span>Deixar em branco</span>
                    </div>
                    <span>A descrição é limitada a 300 caracteres, caso não queiera adicionar descrição, marque a opção acima.</span>
                </div>
                <Alert
                    title={alertContext.title}
                    type={alertType}
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
                    type={alertType}
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