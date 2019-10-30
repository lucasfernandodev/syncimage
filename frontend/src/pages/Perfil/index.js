import React,{useState, useEffect} from 'react';
import axios from 'axios';

import Footer from '../../componentes/footer';
import Header from '../../componentes/header';
import './style.css';

export default function Perfil() {

    const user_id = localStorage.getItem('user_id');
    const [isLoading, seIsLoading] = useState(false)
    const [user, setUser] = useState(false);

    useEffect(() => {

        async function fetchUser(){

            try {
                const response = await axios.get(`http://localhost:3001/api/users/${user_id}`);

                setUser(response.data)
                seIsLoading(true)
            } catch (error) {  
                console.log({error})
                seIsLoading(true)
            }
        }
        fetchUser();

    }, [])

   if(!isLoading){
    console.log(user)
   }
    
    return (
        <div className="async-perfil">

            <Header link="true" rota="/galeria" placeholder="Voltar a galeria"/>

            <div className="container-perfil">
                <div className="container-user">
                    <div className="container-user-image" style={isLoading ? {backgroundImage: `url(${user.avatar})`} : null}></div>
                    <span className="user-name">{isLoading ? user.username : null}</span>
                    <span className="logout">Logout</span>
                </div>

                <div className="container-title"><h3>Informações do usuario</h3></div>

                <div className="container-dados">


                    <div className="fild">
                        <span className="title">Nome</span>
                        <span className="text">{isLoading ? user.username : null}</span>
                    </div>
                    <div className="fild">
                        <span className="title">E-mail</span>
                        <span className="text">{isLoading ? user.email : null}</span>
                    </div>
                    <div className="fild">
                        <span className="title">Senha</span>
                        <input className="text" type="password" value="senhadousuario" disabled />
                    </div>
                </div>


                <div className="container-sobre">
                    <div className="fild">
                        <span className="title">Quem sou eu?</span>
                        <span className="text">{isLoading ? user.description : null}</span>
                    </div>
                    <div className="fild">
                        <div className="title">Categorias favoritas</div>
                        <div className="text">Animes, desenhos, arvores, amigos, pessoas</div>
                    </div>
                </div>

                <div className="container-title favorites"><h3>Imagens favoritas</h3></div>

                <div className="container-favorites">Nenhuma imagem selecionada!</div>
            </div>

            <Footer />
        </div>
    )
};

