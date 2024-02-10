const model = require('../models/championsFridayModel'); // If you have a model for fetching data

exports.getHomePage = async (req, res) => {
    const homepageModel = await model.fetchData();  // Fetch data or handle any business logic
    res.render('champions_home',homepageModel);
};

/**
 * 
 */
exports.getChampionRegistrationPage = async(req, res) => {
    const championRegistrationPage = await model.fetchRegistrationPageData();
    res.render('champions_registration', championRegistrationPage);
};

/**
 * 
 */
exports.postChampionRegistration = async(req, res) => {
    const champion = req.body;
    const championsRegistrationPage = await model.fetchRegistrationPageData(champion);
    console.log(model.toastMessage);
    res.render('champions_registration', championsRegistrationPage);
};