const { fetchData } = require('../models/homeModel'); // If you have a model for fetching data

exports.getHomePage = (req, res) => {
    const homepageModel = fetchData();  // Fetch data or handle any business logic

    res.render('home',homepageModel);
};
