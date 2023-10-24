const express = require('express');
const { engine } = require('express-handlebars');
const app = express();

app.use(express.static('public'));
app.use('/js', express.static(__dirname + '/node_modules/htmx.org/dist/'));
app.engine('.hbs', engine({extname:'.hbs'}));
app.set('view engine', '.hbs');

// Routes
app.get('/test', (req, res) => {    
    res.send('<div>Test<div>');
});

app.get('/', (req, res) => {
    //go to DB and bring stuff
    res.render('home', {message: 'PerfManX'});
});


app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});