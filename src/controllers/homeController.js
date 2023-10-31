const model = require('../models/homeModel'); // If you have a model for fetching data

exports.getHomePage = async (req, res) => {
    const homepageModel = await model.fetchData();  // Fetch data or handle any business logic

    res.render('home',homepageModel);
};
