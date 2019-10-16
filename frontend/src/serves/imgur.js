import React from "react";
import axios from 'axios';


export default {

    "post": async function(data){

        const base_URL = 'https://api.imgur.com/3/image';
        const headers = {
            headers: {
                'Authorization': 'Client-ID 0399bf5f8db335f',
                'Accept': 'application/json'
            }
        }
    
        return await axios.post(base_URL, data, headers);
    },

    "get": async function(id){
        const base_URL = `https://api.imgur.com/3/image/${id}`;
        const headers = {
            headers: {
                'Authorization': '0399bf5f8db335f',
            }
        }
    
        return await axios.get(base_URL, headers);
    }
}
