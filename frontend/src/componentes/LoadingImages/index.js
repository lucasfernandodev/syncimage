import React, { useState, useEffect, useMemo } from 'react';
import useInfiniteScroll from '../useInfiniteScroll';
import axios from 'axios';

const user_id = localStorage.getItem("user_id");

export default function LoadingImages(props) {

    // images
    const [listItems, setListItems] = useState(null);
    const [imagesTrue, setImagesTrue] = useState(null)
    const [imageData, setImageData] = useState(null)
    // pagination
    const [currentPage, setCurrentPage] = useState(1)
    const imagesporpage = 6;
    const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreListItems);



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
                setImageData(data)


            } catch (error) {
                console.log({ error })
            }

        }());


    }, [])

    useEffect(() => {
        if (props.filter !== 'all') {
            if (imagesTrue) {

                if (imageData) {
                    const filtrado = imageData.filter(function (obj) {
                        return obj.category === props.filter;
                    });
                    if (filtrado) {

                        console.log(filtrado)
                        setImagesTrue(filtrado);

                        const currentImages = filtrado.slice(0, 6);
                        setListItems(currentImages);
                    }
                }


            }

        } else {

            if (imageData) {
                setImagesTrue(imageData);
                const currentImages = imageData.slice(0, 6);
                setListItems(currentImages);
            }

        }
    }, [props.filter])


    function fetchMoreListItems() {

        if (imagesTrue) {
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
            }
        
        } else {

            setIsFetching(false);
        }
    }

    // Renderiza o componente
    return (
        <>
            <ul className="content-galeria">
                {listItems ? listItems.map(item => (

                    <li className="card-image" key={item._id}>
                        <img src={item.link} alt={item.title} className="card-img" />
                    </li>
                )) : ''}
            </ul>
        </>
    );
};
