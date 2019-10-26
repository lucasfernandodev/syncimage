import { useState, useEffect } from 'react';

const useInfiniteScroll = (callback) => {

    const [isFetching, setIsFetching] = useState(false);


    // Retorno da função
    useEffect(() => {
        if (!isFetching) return;
        callback(() => {
            console.log('called back');
        });
    });
    

    // Captura o evento de rolagem
    useEffect(() => {
        window.addEventListener('scroll', debounce(function () {

            // Verifica se o scroll está no final da pagina
            if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isFetching) return;
            setIsFetching(true);
        }, 500));


        return () => 
        window.removeEventListener('scroll', debounce(function () {

            // Verifica se o scroll está no final da pagina
            if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isFetching) return;
            setIsFetching(true);
        }, 500));
    });


    

    // Remove bugs do Scroll
    const debounce = (func, delay) => {
        let inDebounce;
        return function () {
            clearTimeout(inDebounce);
            inDebounce = setTimeout(() => {
                func.apply(this, arguments);
            }, delay);
        }
    }

    return [isFetching, setIsFetching];
};

export default useInfiniteScroll;