import React, { useState, useEffect } from "react";
import axios from "axios";
import Logout from '../Logout/';
import "./style.css";

const user_id = localStorage.getItem('user_id');
// const avatar = localStorage.getItem('avatar');



export default function Header() {

    const [user, setUser] = useState(false);
    // const user = false;

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(`http://localhost:3001/api/users/${user_id}`);
            setUser(result.data);
            console.log(result);
        };
        fetchData();
    }, []);


 
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
            // <div />
        )
    }else{
        return <div />
    }

}