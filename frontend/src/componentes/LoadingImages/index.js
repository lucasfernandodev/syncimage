import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';

const user_id = localStorage.getItem("user_id");

export default function LoadingImages() {
    const [listItems, setListItems] = useState(null);
    const [imagesTrue, setImagesTrue] = useState(null)

    const [currentPage, setCurrentPage] = useState(1)

    const imagesporpage = 6;

    useMemo(() => {

        (async function () {
            try {
                // Busca as imagens
                const response = await axios.get(`http://localhost:3001/api/image/${user_id}`);

                // Salva todas as imagens
                setImagesTrue(response.data);

                // Carrega as 6 primeiras imagens
                const data = response.data;
                const currentImages = data.slice(0, 6);
                setListItems(currentImages);

            } catch (error) {
                console.log({ error })
            }

        }());
    }, [])

    // Captura o evento de scroll
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    const [isFetching, setIsFetching] = useState(false);

    // Verifica se é pra carregar mais imagens
    useEffect(() => {
        function fetchMoreListItems() {

            const arrayLenght = imagesTrue.length - 1;
    
            if (arrayLenght >= currentPage) {
    
                // Carrega mais itens a lista
                const indexOfLastImage = currentPage * imagesporpage;
                const currentImages = imagesTrue.slice(0, indexOfLastImage);
                setListItems(currentImages);
    
                // Atualiza a pagina atual do carregamento
                var i = currentPage + 1;
                setCurrentPage(i)
    
                // Declara que não prescisa buscar mais
                setIsFetching(false);
            } else {
    
                setIsFetching(false);
            }
    
        }

        if (!isFetching) return;
        
        fetchMoreListItems();
    });

    // Responsavel por carregar mais imagens
    

    // Verifica se o scroll do mouse tá no fim da pagina
    function handleScroll() {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
        setIsFetching(true);
    }

    // Renderiza o componente
    return (
        <ul className="content-galeria">
            {listItems ? listItems.map(item => (

                <li className="card-image" key={item._id}>
                    <img src={item.link} alt={item.title} className="card-img" />
                </li>
            )) : 'Galeria Vazia'}
        </ul>
    );
};
