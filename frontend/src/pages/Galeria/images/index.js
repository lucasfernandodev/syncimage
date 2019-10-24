import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';

const user_id = localStorage.getItem("user_id");

export default function Images(props) {
    const [listItems, setListItems] = useState(null);
    const [imagesTrue, setImagesTrue] = useState(null)
    const [isFetching, setIsFetching] = useState(false);
    const [currentPage, setCurrentPage] = useState(1)

    useMemo(() => {
        (async function () {
            try {
                const response = await axios.get(`http://localhost:3001/api/image/${user_id}`);

                setImagesTrue(response.data);
                const data = response.data;
                const currentImages = data.slice(0, 6);
                setListItems(currentImages);
            } catch (error) {
                console.log(error)
            }

        }());
    }, [])

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (!isFetching) return;
        fetchMoreListItems();
      }, [isFetching]);

      function fetchMoreListItems() {
          const imagesporpage = 6;
          const maxArray = imagesTrue.length - 1 ;

          if(maxArray >= currentPage){
            const indexOfLastImage = currentPage * imagesporpage;
            const currentImages = imagesTrue.slice(0, indexOfLastImage);
  

            setListItems(currentImages);
            var i = currentPage + 1;
            setCurrentPage(i)
            setIsFetching(false);
          }else{
            setIsFetching(false);
          }
          
      }

    function handleScroll() {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
        setIsFetching(true);
    }


    return (

        <ul className="content-galeria">
            {listItems ? listItems.map(item => (

                <li className="card-image" key={item._id}>
                    <img src={item.link} alt="" className="card-img" />
                </li>
            )) : ''}
        </ul>
    );
};
