import React from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';


import Cadastro from './pages/Cadastro';
import Login from './pages/Login';

import Perfil from './pages/Perfil';
import Galeria from './pages/Galeria';
import Account from './pages/Account'

import Erro404 from './pages/Erro404';

const token = localStorage.getItem('token');

const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={props => (
        token ? (
        <Component {...props} />
        ) : (
            <Redirect to={{ pathname: "/", state: {from : props.location} }} />
        )
    )} />
)

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login}/>
                <Route path="/Login" exact component={Login}/>
                <Route path="/cadastro" exact component={Cadastro}/>
                <PrivateRoute path="/Perfil" exact component={Perfil}/>
                <PrivateRoute path="/Account" exact component={Account}/>
                <PrivateRoute path="/Galeria" component={Galeria}/>
                <Route path="*" exact component={Erro404}/>
            </Switch>
        </BrowserRouter>
    )
}