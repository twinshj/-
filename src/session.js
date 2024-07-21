const cookieParser = require('cookie-parser');
const session = require('express-session');

app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));

module.exports = sessionMiddleware;