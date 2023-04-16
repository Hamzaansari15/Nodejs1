import { userModel } from "../model/user.mjs";
import bcrypt from 'bcrypt';
import Jwt from "jsonwebtoken";


const SecretToken = 'hamzaWeb';

const handleSigninUser = async (req, res) => {
    try {
        const { first_name, last_name, contact, email, password } = await req.body;
        const user = await userModel.findOne({ email: email })
        if (user) {
            res.status(400).send({ message: 'User already exists' });
            return;
        }
        try {
            if (first_name && last_name && email && contact && password) {
                const hashPassword = await bcrypt.hash(password, 10)
                if (hashPassword) {
                    const createUser = await userModel.create({
                        first_name: first_name,
                        last_name: last_name,
                        email: email,
                        contact: contact,
                        password: hashPassword
                    })
                    if (createUser) {
                        console.log(createUser)
                        const token = await Jwt.sign({})
                        res.status(201).send({ message: 'User is Created' })
                    }
                }

            }
            else {
                console.log('jjj')
                res.send({ message: 'required field is empty' })
            }
        }
        catch(secondError){
            console.log(secondError)
            res.status(500).send({message: 'Server Error 2'})
        }
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ message: 'Server Error' })
    }


}


export { handleSigninUser }