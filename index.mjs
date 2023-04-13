import express from "express";
import cors from 'cors';
import ConnectMongoDB from "./connection.mjs";
import UserRouter from "./routes/user.mjs";
import bodyParser from 'body-parser';



const app = express();
const Port = process.env.PORT || 8000
const mongodbURI = process.env.mongodbURI || 'mongodb+srv://muhammadhamza:firstDataBase@firstdatabase.hetswto.mongodb.net/?retryWrites=true&w=majority'
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}))
ConnectMongoDB(mongodbURI)
.then(() => console.log("MongoDB is Connected"))
.catch(err => console.log(err));



app.use('/user', UserRouter)

app.use('/', (req, res) => {
    res.send(req.url)
})

app.listen(Port, () => {
    console.log('Server is Started')
})

