import express  from "express";

const app = express();


app.use('/', (req, res) => {
    console.log('success');
    res.send(req.url)

})

app.listen('3000')