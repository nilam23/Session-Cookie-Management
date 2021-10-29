const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const csurf = require('csurf');
const csrfProtection = csurf({ cookie: {httpOnly: true} });

app.use(cookieParser());
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', csrfProtection, (req, res) => {
    // res.cookie('John', 'Doe', {httpOnly: true, maxAge: 60000});
    const csrfToken = req.csrfToken();
    res.render('form', {csrfToken});
});

app.post('/register', csrfProtection, (req, res) => {
    if(req.cookies.John === 'Doe')
        res.send('Success.');
    else
        res.send('Failure.');
});

app.use((err, req, res, next) => {
    if(err.code !== 'EBADCSRFTOKEN') return next(err);
    res.status(403);
    res.send('CSRF attack detected');
});

app.listen(3000, () => console.log('Server running at 3000.'));