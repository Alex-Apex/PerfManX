const fetchData = require('../models/dataModel'); // If you have a model for fetching data

exports.getHomePage = (req, res) => {
    const data = fetchData();  // Fetch data or handle any business logic
    res.render('home', { data: data, message: 'PerfManX' });
};
