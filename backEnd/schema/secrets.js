require('dotenv').config({ path: '.env' });

const PORT = process.env.PORT;
const JWT_SECRETS  = process.env.JWT_SECRET
const SECRET = process.env.SECRET
const CLIENTID = process.env.CLIENTID
const CLIENTSECRET = process.env.CLIENTSECRET
module.exports = {
    PORT,
    JWT_SECRETS, 
    SECRET, 
    CLIENTID, 
    CLIENTSECRET
}

