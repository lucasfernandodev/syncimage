import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import { PrivateRoute } from "./path/PrivateRoute";


import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Account from './pages/Account';
import Perfil from './pages/Perfil';
import Galeria from './pages/Galeria';
import Erro404 from './pages/Erro404';


export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login}/>
                <Route path="/login" component={Login}/>
                <Route path="/cadastro" component={Cadastro}/>
                <Route path="/account" exact component={Account}/>
                <PrivateRoute path="/perfil" component={Perfil}/>
                <PrivateRoute path="/galeria" component={Galeria}/>
                <Route path="*" component={Erro404}/>
            </Switch>
        </BrowserRouter>
    )
}