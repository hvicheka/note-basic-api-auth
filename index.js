const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')

app.use(express.json())

const users = [
    {
        username: 'john',
        password: 'password123admin',
        role: 'admin'
    }, {
        username: 'anna',
        password: 'password123member',
        role: 'member'
    }
];

const books = [
    {
        "author": "john",
        "country": "Nigeria",
        "language": "English",
        "pages": 209,
        "title": "Things Fall Apart",
        "year": 1958
    },
    {
        "author": "john",
        "country": "Denmark",
        "language": "Danish",
        "pages": 784,
        "title": "Fairy tales",
        "year": 1836
    },
    {
        "author": "anna",
        "country": "Italy",
        "language": "Italian",
        "pages": 928,
        "title": "The Divine Comedy",
        "year": 1315
    },
];

const secretKey = 'secret key'

app.post('/login', (req, res) => {
    const { username, password } = req.body
    const user = users.filter(u => u.username == username && u.password == password )

    if(user){
        const token = jwt.sign({name: username}, secretKey)
        res.json({
            token
        })
    }
})

app.get('/posts', auth, (req, res) => {
    const bookAuthor = books.filter(book => book.author == req.user.name)
    res.json(bookAuthor)
})

function auth (req, res, next) {
    let token = req.headers.authorization.split(' ')[1]
    jwt.verify(token, secretKey, (err,user) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    })
}

app.listen(3000, () => console.log('Server is started on port 3000'))