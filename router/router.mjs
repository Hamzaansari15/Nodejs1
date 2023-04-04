import express, { Router } from 'express';
import bodyParser from 'body-parser';


const router = Router();
const app = express();
// const jsonParser = bodyParser.urlencoded({ extended: false })
let user = [];

router.use(bodyParser.urlencoded({ extended: false }))

router.get('/', (req, res) => {
    res.send('success');
})
router.post('/add', (req, res) => {
    user.push(req.body)
    res.send('User Added')
})

router.get('/allUser', (req, res) => {
    res.send(user)
})

router.put('/edit', (req, res) => {
    user = user.map(item => {
        if (item.id === req.body.id) {
            return { ...item, name: req.body.name }
        }
        return item
    })
    res.send(`user Edit on id ${req.body.id}`)
})

router.delete('/delete', (req, res) => {
    user.splice(req.body.id - 1, 1)
    res.send(user)
})

export default router;