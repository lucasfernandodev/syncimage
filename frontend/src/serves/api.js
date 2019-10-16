import axios from 'axios';
import queryString from 'query-string';

export default {
        
    "Create": async function(dataJson, rota = ''){
        const header = {
            headers: {
                "Content-Type": "application/json",
                "x-apikey": "5d9bc65d3cbe87164d4baff9",
                "Cache-Control": "no-cache"
            },
            data: {
                dataJson
            }
        }

        var url = `https://userimage-34f0.restdb.io/rest/${rota}`

        return await axios.post(url, {},header);
    },


    "Search": async function(id, rota = ''){
        const header = {
            headers: {
                'x-apikey': '5d9bc65d3cbe87164d4baff9', 'cache-control': 'no-cache'
            }
        }

        const query = queryString.stringify( {
            "h" : JSON.stringify({"dataJson": {"user_id":id}})

        })

        var url = `https://userimage-34f0.restdb.io/rest/${rota}`


        return await axios.get(`${url}?${query}&filter=${id}`,header)
    }


}
