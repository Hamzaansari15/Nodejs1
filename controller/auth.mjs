import { userModel } from "../model/user.mjs";
import bcrypt from 'bcrypt';
import Jwt from "jsonwebtoken";


const SecretToken = 'hamzaWeb';

const handleSigninUser = async (req, res) => {
    const { first_name, last_name, contact, email, password } = await req.body;
    try {
        const existUser = await userModel.findOne({ email: email })
        if (existUser) {
            res.status(400).send({ message: 'User already Exists' });
            return;
        }
        else {
            if (first_name && last_name && email && contact && password) {
                const hashPassword = await bcrypt.hash(password, 10)
                if (hashPassword) {
                    const createUser = await userModel.create({
                        first_name: first_name,
                        last_name: last_name,
                        contact: contact,
                        email: email,
                        password: hashPassword
                    })
                    if (createUser) {
                        console.log(createUser)
                        const token = Jwt.sign({
                            _id: createUser._id,
                            email: createUser.email,
                            iat: Math.floor(Date.now() / 1000) - 30,
                            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24)
                        }, SecretToken)
                        console.log('token', token)
                        res.cookie('token', token, {
                            maxAge: 86_400_000,
                            httpOnly: true
                        })
                        res.status(201).send({ message: 'Signin Successfully' })
                        req.body.token = token;
                        console.log(req.body)
                        return;
                    }
                    else {
                        res.status(500).send({ message: 'Server Error' })
                    }
                }
                else {
                    res.status(500).send({ message: 'Server Error' })
                }
                return;
            }
            else {
                res.status(400).send({ message: 'Some Fields Are Empty!' })
            }
        }
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ message: "Server Error", 'error': error })
    }

}


const handleLoginUser = async (req, res) => {
    try {
        if (email && password) {
            const { email, password } = req.body;
            const findUser = await userModel.findOne({ email: email }, 'email password')
            const match = await bcrypt.compare(password, findUser.password)
            if (match) {
                const token = Jwt.sign({
                    _id: findUser._id,
                    email: findUser.email,
                    iat: Math.floor(Date.now() / 1000) - 30,
                    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24)
                }, SecretToken);
                console.log('token', token)
                res.cookie('token', token, {
                    maxAge: 86_400_000,
                    httpOnly: true
                })
                req.body.token = token
                console.log(req.body)
                res.status(200).send({message: 'Login Successfully'});
            }
        }
        else{
            res.status(400).send('Please Filled All Fields');
        }
        // console.log(findUser)
        // res.send('ll')

    }
    catch (error) {
        res.status(500).send({ message: 'Server Error', 'Error': error })
    }
}

export {
    handleSigninUser, handleLoginUser
}