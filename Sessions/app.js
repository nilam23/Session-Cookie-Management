const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const csurf = require('csurf');
const session = require('express-session');
const dotenv = require('dotenv').config();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
    secret: process.env.secret,
    cookie: {},
    resave: false,
    saveUninitialized: false
}));
app.use(csurf());

app.get('/', (req, res) => {
    const csrfToken = req.csrfToken();
    var name = 'Guest';
    if(req.session.user)
        name = req.session.user;
    res.render('form', {name, csrfToken});
});

app.post('/post-name', (req, res) => {
    req.session.user = req.body.name.trim();
    res.redirect('/');
});

app.post('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

const PORT = process.env.PORT || 3000;
app.listen(3000, () => console.log(`Server running at port ${PORT}.`));