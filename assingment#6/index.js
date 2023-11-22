const express = require('express')
var jwt = require('jsonwebtoken');
const app = express()
app.use(express.json())
const port = 3001

const users = [
    { id: 1, username: "Ali", Password: 12345 },
    { id: 2, username: "Ahmed", Password: 1235, },
    { id: 3, username: "Asif", Password: 1234, }
]

app.post('/', (req, res) => {
    let username = req.body.username
    let password = req.body.password
    if (!username || !password) {
        res.send("invalid Username or Password")
    };
    let useralready = users.find(u => u.username === username);
    if (useralready) {
        return res.send("user already")

    }
    else {
        users.push({ username, password })
        return res.send("oky")
    }
})
const verify = (req, res, next) => {
    const token = req.headers.auth
    const decode = jwt.verify(token, 'shhhhh')
    if (decode) {
        next()
    }
}
app.post('/login', (req, res) => {
    let username = req.body.username
    let password = req.body.username
    if (username && password) {
        // res.send("Login successfully")
        var token = jwt.sign({ username: username }, 'shhhhh');
        res.json({ token });
    }
    else {
        res.send("invalid username or password")
    }
});
app.delete('/delete/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(user => user.id === userId);
    if (userIndex !== -1) {
        users.splice(userIndex, 1);
        res.send(`user with id ${userId} deleted successfully`);
    } else {
        res.send(`user with id ${userId} not found`);
    }
});


app.put('/update/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const { name } = req.body;

    const userIndex = users.findIndex(user => user.id === userId);
    if (userIndex !== -1) {
        users[userIndex].name = name;
        res.send(`user with id ${userId} updated successfully`);
    } else {
        res.send(`user with id ${userId} not found`);
    }
});
app.get('/', verify, (req, res) => {
    res.send(users)
})
app.listen(port, () => {
    console.log(`Example App listening on port ${port}`);
})