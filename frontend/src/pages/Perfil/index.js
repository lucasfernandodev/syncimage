import React from 'react';
import Footer from '../../componentes/footer';
import './style.css';

export default function Perfil() {

    return (
        <div className="async-perfil">
            <div className="container-perfil">
                <div className="container-user">
                    <div className="container-user-image"></div>
                    <span className="user-name">Lucas Fernando</span>
                    <span className="logout">Logout</span>
                </div>

                <div className="container-title"><h3>Informações do usuario</h3></div>

                <div className="container-dados">


                    <div className="fild">
                        <span className="title">Nome</span>
                        <span className="text">Lucas Fernando</span>
                    </div>
                    <div className="fild">
                        <span className="title">E-mail</span>
                        <span className="text">Exemplo@gmail.com</span>
                    </div>
                    <div className="fild">
                        <span className="title">Senha</span>
                        <input className="text" type="password" value="senhadousuario" disabled />
                    </div>
                </div>


                <div className="container-sobre">
                    <div className="fild">
                        <span className="title">Quem sou eu?</span>
                        <span className="text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Alias voluptatem quis, pariatur labore soluta esse iste aliquid aliquam tempora assumenda rem necessitatibus impedit eum libero corrupti nam magni reiciendis repellendus.</span>
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

