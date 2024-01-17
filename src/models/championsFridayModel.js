const {appConnectionPoolPromise} = require('../db/db');
const queries = require('../db/queries');

let pool;

  /**
   * Return the options for the sidebar menu 
   * 
  */
  async function getSidebarMenuOptions() {
    return [
        {label:'Back to PerfManX', route:'/'},
        {label:'General Champion Leaderboard', route:'/foc'},
        {label:'Admin', route:'/SkillsTree'},        
    ];
};

const getChampionsFridayLeaderboard = async () => {
  try {
    pool = await appConnectionPoolPromise.connect();
    const result = await pool.request().query(queries.GET_FRIDAY_CHAMPIONS_LEADERBOARD);
    return result.recordset;
  } catch(exception) {
    console.error('Error while trying to get the Champions Friday Leaderboard:', exception);
    throw exception;
  } finally {
    await pool.close();
  }
};

const fetchData = async () => {
    let model = {};
    model.layout = 'champions';
    model.message = 'CHAMPIONS FRIDAY!';
    model.sidebarMenuOptions = await getSidebarMenuOptions();
    model.leaderBoard = await getChampionsFridayLeaderboard();
    //console.table(model.leaderBoard);
    console.log(model.leaderBoard[0].name);
    return  model;
};

const saveData = () => {
  
};

module.exports = {
  fetchData, // TODO: Maybe remove this?
  saveData,   /// To DO: Maybe Remove this?
};