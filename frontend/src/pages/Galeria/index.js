import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from "../../componentes/header";
import Footer from "../../componentes/footer";
import Upload from '../../componentes/Upload';
import AddCategory from "./addCategory";
import "./style.css";

import camera from "../../assets/camera.svg";

const user_id = localStorage.getItem('user_id');

export default function Galeria() {

    // Modais
    const [uploadDisplay, setUploadDisplay] = useState(false);
    const [categoryDisplay, setCategoryDisplay] = useState(false);

    // Array com categorias das imagens
    const [listCategory, setListCategory] = useState([]);

    // Array com imagens do bd
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [imagePorPage, setImagePorPage] = useState(8)



    useEffect(() => {
        (async function () {
            try {
                const response = await axios.get(`http://localhost:3001/api/image/${user_id}`);
                console.log(response)

                setImages(response.data);
            } catch (error) {
                console.log(error)
            }

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
        }());


    }, [uploadDisplay])

    const indexOfLastImage = currentPage * imagePorPage;
    const indexOfFirstPost = indexOfLastImage - imagePorPage;
    const currentImages = images.slice(1, indexOfLastImage)

   document.addEventListener('scroll', function() {
    console.log(' ')
    if (document.documentElement.scrollTop + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      if(currentImages < indexOfLastImage){
        var pagination = currentPage + 1;
        setCurrentPage(pagination)
      }
    }
  });



    return (
        <>
            <Header />
            <div className="container-galeria">
                <header className="header-galeria">
                    <div className="header-title">
                        <h1 className="title">Galeria</h1>
                    </div>

                    <div className="header-upload">
                        <button className="btn-upload" onClick={event => setUploadDisplay(true)}> Adicionar imagem <img src={camera} alt="" /></button>
                    </div>

                    <div className="header-category">
                        <select className="btn-category">
                            <option value="">Categorias</option>
                            {listCategory ? listCategory.map((item, i) => (
                                <option key={i}>{item}</option>
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
                    <ul className="content-galeria">

                        {images ? currentImages.map(item => (

                            <li className="card-image" key={item._id}>
                               <img src={item.link} alt="" className="card-img" />
                            </li>
                        )) : 'Sem imagens no momento!'}


                    </ul>
                </main>
            </div>

            <AddCategory display={categoryDisplay} onClose={event => setCategoryDisplay(false)} />
            <Upload display={uploadDisplay} onClose={event => setUploadDisplay(false)} />
            <Footer />
        </>
    )
}
