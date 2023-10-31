const db = require('../db/db'); 
const sql = require('mssql');
const queries = require('../resources/queries');
const {appConnectionPoolPromise} = require('../db');
let pool;

module.exports = {

    fetchData: () => {
        // Code to fetch data specifically for the home page
        // Return this data to be used in the controller
        //return db.query('SELECT * FROM some_table'); // Just an example
        // This is only for test
        return  {
            sidebarMenuOptions:[{label:'MyOrg',route:''},{label:'Champions Friday', route:''},{label:'SkillTree', route:''},{label:'ConsultantDeeds',route:''}],            
            message: 'PerfManX'
        };
    },

    saveData: (data) => {
        // Code to save data from the home page
        // Execute some database operation, for instance
        return db.query('INSERT INTO some_table SET ?', data);
    },

    // Any other data-specific functions related to the home page

};
