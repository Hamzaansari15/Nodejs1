import { userModel } from "../model/user.mjs";
import bcrypt from 'bcrypt';
import Jwt  from "jsonwebtoken";

const handleSigninUser = async (req, res) => {
    const { first_name, last_name, email, contact, password } = await req.body;
    const allUser = await userModel.findOne({ email: email })
    if (allUser) return res.status(401).send({ message: 'User already exist' })
    try {
        const hashPassword = await bcrypt.hash(password, 10)
        const userData = await userModel.create({
            first_name: first_name,
            last_name: last_name,
            contact: contact,
            password: hashPassword,
            email: email
        })
        res.status(201).send({ message: 'User is Created', id: userData._id })
    }
    catch(error){
        console.log(error)
        res.status(500).send('Server Error')
    }
    
}


export { handleSigninUser }