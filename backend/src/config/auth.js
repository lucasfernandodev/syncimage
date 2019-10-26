const jwt =  require('jsonwebtoken');
const authSecret = require('./auth.json')

module.exports = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).send({error: "Usuario não autorizado"})
    }

    const parts = authHeader.split(' ');

    if(!parts.length === 2){
        return resp.status(401).send({error: 'Token invalido'});
    }

    const [schema, token] = parts;

    if(!/^Bearer$/i.test(schema)){
        return res.status(401).send({error: 'Tolken mal formated'});
    }

    jwt.verify(token, authSecret.secret, (err, decoded) => {
        if(err) return res.status(401).send({error: "Token invalido"});

        req.userId = decoded.id;
        return next();
    })
};