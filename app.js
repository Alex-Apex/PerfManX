require('dotenv').config();
const express = require('express');
const session = require('express-session');
const path = require('path');
const { engine, create } = require('express-handlebars');
const app = express();
const homeRoutes = require('./src/routes/homeRoutes');
const myOrgRoutes = require('./src/routes/myOrgRoutes');
const championsRoutes = require('./src/routes/championsFridayRoutes');



// Set up Express Handlebars view engine
const hbs = create({
    extname:'.hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'src/views/layouts'),
    partialsDir: path.join(__dirname, 'src/views/partials')
});

app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

console.log(path.join(__dirname, 'src/views'));
app.set('views', path.join(__dirname, 'src/views'));


// Middleware to parse JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Setting up the session variables (to keep msg conversations). TODO: Conversation persistance with db should be a better bet
app.use(
    session({
        secret: 'your_secret_key', // This is a secret key used to sign the session ID cookie
        resave: false, // Forces the session to be saved back to the session store
        saveUninitialized: true, // Forces a session that is "uninitialized" to be saved to the store
        cookie: {
            secure: process.env.NODE_ENV === 'production', // Ensures cookies are only used over HTTPS
            maxAge: 1000 * 60 * 60 * 24 // Cookie expiration date, here it's set for one day
        }
    }));
    
    // Static files directory
    app.use(express.static('public'));
    app.use('/js', express.static(__dirname + '/node_modules/htmx.org/dist/'));
    
    app.use('/', homeRoutes);
    app.use('/myOrg', myOrgRoutes);
    // Handle 404 errors
    app.use((req, res, next) => {
        res.status(404).send("Sorry, that route doesn't exist.");
    });

app.listen(3000, () => {
    console.log('PerfManX - Server started on http://localhost:3000');
});