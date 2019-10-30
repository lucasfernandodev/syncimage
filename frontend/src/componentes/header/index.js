import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import Logout from '../Logout/';
import "./style.css";



export default function Header(props) {

    const user_id = localStorage.getItem('user_id');
    const [user, setUser] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(`http://localhost:3001/api/users/${user_id}`);
            setUser(result.data);
            console.log(result);
        };

        if (!props.link) {
            fetchData();
        }
    }, []);


    if (props.link) {
        return (
            <header className="async-header">

                <Link to={props.rota} >
                    <button className="btn-back">{props.placeholder}</button>
                </Link>

            </header>
        )
    }


    if(user){
        return (
            <header className="async-header">
                <div className="user-content">
                    <span className="user-name">
                        {user ? user.username : null}
                        <span>{user ? user.email: null}</span>
                        <a href="/#" className="btn-logout" onClick={Logout}>Deslogar</a>
                    </span>
                    <div className="user-image" style={user ? { backgroundImage: `url(${user.avatar})` } : null}></div>

                </div>


            </header>
        )
    }else{
        return <div />
    }

}