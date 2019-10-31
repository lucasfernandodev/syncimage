import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import Header from "../../componentes/header";
import Footer from "../../componentes/footer";
import Upload from '../../componentes/Upload';
import ImageView from '../../componentes/ImageView';
import AddCategory from "./addCategory";
import LoadingImages from "../../componentes/LoadingImages";
import "./style.css";

import camera from "../../assets/camera.svg";

export default function Galeria() {

    const user_id = localStorage.getItem('user_id');
    const token = localStorage.getItem('token');

    // Modais
    const [uploadDisplay, setUploadDisplay] = useState(false);
    const [categoryDisplay, setCategoryDisplay] = useState(false);
    const [imageView, setImageView] = useState(false);

    // Array com categorias das imagens
    const [listCategory, setListCategory] = useState([]);
    const [categorySelect, setCategorySelect] = useState('all')

    const [imageData, setImageData] = useState(null)


    // useEffect(() => {

    //     (async function () {
    //         try {
    //             // Busca as imagens
    //             const response = await axios.get(`http://localhost:3001/api/image/${user_id}`, {headers: {
    //                 authorization: token
    //             }});

    //             const {data} = response;
    //             setImageData(data)


    //         } catch (error) {
    //             console.log({ error })
    //         }

    //     }());


    // }, [user_id])


    useEffect(() => {
        (async function () {

            try {
                const response = await axios.get(`http://localhost:3001/api/category/${user_id}`, {
                    headers: {
                        authorization: token
                    }
                });

                if (response.data.category === null) {
                    setListCategory(['none']);
                } else {
                    setListCategory(response.data.category);
                }

            } catch (error) {
                // Tratar erro
                console.log({ error })
            }
        }());


    }, [uploadDisplay])


    console.log(imageData)

    function mostaImage(dados){
        setImageData(dados)
        setImageView(true)
    }


    return (
        <>
            <Header />
            <ImageView image={imageData !== null ? imageData : null} display={imageView} onClose={event => setImageView(false)}/>
            <div className="container-galeria">
                <header className="header-galeria">
                    <div className="header-title">
                        <h1 className="title">Galeria</h1>
                    </div>

                    <div className="header-upload">
                        <button className="btn-upload" onClick={event => setUploadDisplay(true)}> Adicionar imagem <img src={camera} alt="" /></button>
                    </div>

                    <div className="header-category">
                        <select className="btn-category"
                            onChange={event => setCategorySelect(event.target.value)}>
                            <option value="all">All</option>

                            {listCategory ? listCategory.map((item, i) => (
                                <option value={item} key={i}>{item}</option>
                            )) : ''}
                        </select>
                    </div>

                    <div className="header-add-category">
                        <button className="btn-add-category" onClick={event => setCategoryDisplay(true)}>
                            +
                        </button>
                    </div>

                </header>

                <main className="main-galeria">

                    <LoadingImages filter={categorySelect} View={item => mostaImage(item)}/>

                </main>
            </div>

            <AddCategory display={categoryDisplay} onClose={event => setCategoryDisplay(false)} />
            <Upload display={uploadDisplay} onClose={event => setUploadDisplay(false)} />
            <Footer />
        </>
    )
}
