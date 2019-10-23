import React, { useState, useMemo } from 'react';
import axios from 'axios';

import ValidaForms from "../../../componentes/ValidaForms";
import Alert from "../../../componentes/Alert";
import CompressImage from "../../../componentes/compress";



const user_id = localStorage.getItem("user_id");


export default function Config(props) {

    const [title, setTitle] = useState('');
    const [categoria, setCategoria] = useState('none');
    const [privacy, setPrivacy] = useState('publico');
    const [description, setDescription] = useState('');
    const [descriptionNone, setDescriptionNone] = useState(false);
    const [editionON, setEditionOn] = useState('Desativado');



    // Categorias
    const [listCategory, setListCategory] = useState([])

    // alert
    const [alertDisplay, setAlertDisplay] = useState(false);
    const [alertContext, setAlertContext] = useState([]);
    const [alertType, setAlertType] = useState('primary');

    useMemo(async () => {
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
    }, [])

    const image = props.data;


    async function handleUpload(e) {
        e.preventDefault();


        if (descriptionNone === true) {
            setDescription('Description none');
        }

        const validaForm = await ValidaForms([
            {
                $campo: title, $nomeCampo: 'titulo', $rules: {
                    min: 4,
                    max: 16,
                    type: String,
                    required: true
                }
            },
            {
                $campo: categoria, $nomeCampo: 'categoria', $rules: {
                    type: String,
                    required: true
                }
            },
            {
                $campo: privacy, $nomeCampo: 'privacidade', $rules: {
                    type: String,
                    required: true
                }
            },
            {
                $campo: description, $nomeCampo: 'Descrição', $rules: {
                    min: 8,
                    max: 300,
                    type: String,
                    required: true
                }
            },
            {
                $campo: editionON, $nomeCampo: 'Edição automatica', $rules: {
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

        } else {


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
                    setAlertContext({
                        title: "Sucesso ao fazer upload",
                        messege: "A imagem foi adicionada a sua galeria!"
                    })
                    setAlertType('sucess')
                    setAlertDisplay(true)
                    console.log(response);

                } catch (error) {
                    setAlertContext({
                        title: "Falha ao fazer upload",
                        messege: "Tente novamente!"
                    })
                    setAlertType('fail')
                    setAlertDisplay(true)
                    console.log(`${error}`)
                }
            }
        }

    }

    function handleCancelar(e) {
        e.preventDefault();
    }

    // --------------------------------------------------------------------------------------

    console.log(props.name)

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

                <span>Teve algum problema? tente o <a href="/#">upload normal</a></span>
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
                        <input type="checkbox"
                            onClick={event => setDescriptionNone(event.target.value)}
                            value={descriptionNone !== false ? descriptionNone : false}
                        />
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