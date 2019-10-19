import React from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';

import Editar from './pages/Editar';
import Galeria from './pages/Galeria';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Upload from './pages/Upload';
import Erro404 from './pages/Erro404';

const username = localStorage.getItem('user_id');

const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={props => (
        username ? (
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
                <PrivateRoute path="/Galeria" component={Galeria}/>
                <PrivateRoute path="/Upload" component={Upload}/>
                <PrivateRoute path="/Editar" component={Editar}/>
                <Route path="*" exact component={Erro404}/>
            </Switch>
        </BrowserRouter>
    )
}