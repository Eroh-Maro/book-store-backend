import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRETE_KEY;

const verifyAdminToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).send({message: "Access Denied!"});
    }
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if(err) {
            return res.status(403).send({message: "Invalid credentials!"});
        }
        req.user = user;
        next()
    })
}

export default verifyAdminToken;