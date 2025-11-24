import usersController from './controllers/usersController.js';
import express from 'express';
const app = express();

app.set('view engine', 'ejs')
app.use(express.static('public'));

const PORT = 5000;

app.get('/', (req, res) => {
    res.render('auth');
})

app.get('/users', (req, res) => {
    res.render('users');
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})