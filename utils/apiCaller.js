const axios = require('axios');

const api= {
    post: async(endpoint, data)=> {
        try {
            const response = await axios.post(process.env.SERVER_URL+endpoint, data );
        return response.data;
            
        } catch (error) {
            return error.response;
            
        }
        
    },
    get: async(endpoint)=> {
        try {
            const response = await axios.get(process.env.SERVER_URL+endpoint);
        return response.data;
            
        } catch (error) {
            return error.response;
            
        }
        
    }
}


module.exports = {api}