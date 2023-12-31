require('dotenv').config();
const express = require('express');
const { engine } = require('express-handlebars');
const app = express();
const homeRoutes = require('./src/routes/homeRoutes');
const myOrgRoutes = require('./src/routes/myOrgRoutes');


app.use(express.static('public'));
app.use('/js', express.static(__dirname + '/node_modules/htmx.org/dist/'));
app.engine('.hbs', engine({extname:'.hbs'}));
app.set('view engine', '.hbs');

app.use('/', homeRoutes);
app.use('/myOrg', myOrgRoutes);


app.listen(3000, () => {
    console.log('PerfManX - Server started on http://localhost:3000');
});