import express  from "express";
import router from './router/router.mjs'


const app = express();

app.use('/user', router)

app.use('/', (req, res) => {
    res.send(req.url)
})

// app.use('*', (req, res) => {
//     console.log('success');
//     res.send(req.url)

// })

app.listen('3000')