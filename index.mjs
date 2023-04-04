import express  from "express";
import router from './router/router.mjs'
const Port = process.env.PORT || 3000

const app = express();

app.use('/user', router)

app.use('/', (req, res) => {
    res.send(req.url)
})

app.listen(Port, () => {
    console.log('Server is Started')
})
