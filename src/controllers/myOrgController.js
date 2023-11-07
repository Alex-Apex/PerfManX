const model = require('../models/myOrgModel'); 

exports.getMyOrgPage = async (req, res) => {
    console.log('in Org');
    const myOrgModel = await model.fetchData();  // Fetch data or handle any business logic

    res.render('myOrg', myOrgModel); //TODO: swith this from home to myOrgDashboard
};