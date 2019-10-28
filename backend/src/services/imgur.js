const axios = require('axios');

module.exports = async function imgur(base64){


    const base_URL = 'https://api.imgur.com/3/image';
    const headers = {
        headers: {
            'Authorization': 'Client-ID 0399bf5f8db335f'
        }
    }


    try {
        response = await axios.post(base_URL, {'image': base64}, headers);
        return response.data.data;
    } catch (error) {
        return error;
    }
};