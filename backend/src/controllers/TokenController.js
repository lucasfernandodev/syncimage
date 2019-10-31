const jwt = require('jsonwebtoken');
const authSecret = require('../config/auth.json')

module.exports = {
    async isToken(req, res){

        const authHeader = req.headers.authorization;

        if(!authHeader){
            return res.send({error: "Usuario não autorizado"})
        }
    
        const parts = authHeader.split(' ');
    
        if(!parts.length === 2){
            return resp.send({error: 'Token invalido'});
        }
    
        const [schema, token] = parts;
    
        if(!/^Bearer$/i.test(schema)){
            return res.send({error: 'Tolken mal formated'});
        }
    
        jwt.verify(token, authSecret.secret, (err, decoded) => {
            if(err) return res.send({error: "Token invalido"});
    
            req.userId = decoded.id;
            return res.status(200).send({sucess: true})
        })
    }
}