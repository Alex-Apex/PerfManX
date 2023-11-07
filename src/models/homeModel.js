const {appConnectionPoolPromise} = require('../db/db');
const queries = require('../db/queries');

let pool;

  /**
   * Return the options for the sidebar menu 
   * 
  */
  async function getSidebarMenuOptions() {
    return [
        {label:'MyOrg', route:'/myOrg'},
        {label:'Champions Friday', route:'/champions'},
        {label:'SkillTree', route:'/SkillsTree'},
        {label:'ConsultantDeeds',route:'/Deeds'}
    ];
}

const fetchData = async () => {
  let model = {};
      model.message = 'PerfManX';
      model.sidebarMenuOptions = await getSidebarMenuOptions();      
      return  model;
};

const saveData = () => {
  
};

module.exports = {
  fetchData, // TODO: Maybe remove this?
  saveData,   /// To DO: Maybe Remove this?
};
