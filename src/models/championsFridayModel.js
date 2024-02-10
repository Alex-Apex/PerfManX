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
    if(pool)
      await pool.close();
  }
};

const fetchData = async () => {
    let model = {};
    model.layout = 'champions';
    model.message = 'CHAMPIONS FRIDAY!';
    model.sidebarMenuOptions = await getSidebarMenuOptions();
    model.leaderBoard = await getChampionsFridayLeaderboard();
    model.currentQuarter = 'Q1 2024'; // TODO ; make this dynamic
    //console.table(model.leaderBoard);
    return  model;
};

const saveData = () => {
  
};

/**
 * 
 */
const getChampionRegistrationSidebarMenuOptions = async () => {
    return [
      {label:'Back to PerfManX', route:'/'},
      {label:'General Champion Leaderboard', route:'/foc'},   
  ];
};

/**
 * 
 * @param {*} championEvent 
 */
const saveChampionEvent = async (championEvent) => {
   console.log(championEvent);
  //translate from championEvent to aEmployeePerformanceEvent
  const event = {
    employeeId : '',
    performanceEventTypeId : '',
    notes:championEvent.txtEventDescription,
    dateOccurred:'',
  };

  try{
    //await insertEmployeePerformanceEvent(event);
  } catch(error){
    throw new Error('Failed to insert the event', error);
  }
};

const fetchRegistrationPageData = async (championEvent) => {
  let model = {};
  try{
    await saveChampionEvent(championEvent);
    model.toastMessage = 'Successfully saved the Champion Event';
  } catch (error){
    model.toastMessage = 'Failed to insert champion event. Get in touch with Alex';
  }
  
  model.layout = 'champions';
  model.message='CHAMPIONS FRIDAY';
  model.sidebarMenuOptions = await getChampionRegistrationSidebarMenuOptions();
  model.currentQuarter = 'Q1 2024';  
  return model;
};

/**
 * Receives a Performance event for a particular employee and 
 * inserts it in the db
 * @param {*} EmployeePerformanceEvent 
 */
async function insertEmployeePerformanceEvent(event) {
  try{
    const pool = await appConnectionPoolPromise.connect();
    const request = pool.request();
    request
          .input('EmployeeId', sql.Int, event.employeeId)
          .input('PerformanceEventTypeId', sql.Int, event.performanceEventTypeId)
          .input('Notes', sql.VarChar(sql.MAX), event.notes);
    if(event.dateOccurred !== null && event.dateOccurred !== '') {
      console.log('Event Date Occurred:',event.dateOccurred);
      request.input('DateOccurred',sql.Date, event.dateOccurred);
    }
    const result = await request.execute('InsertEmployeePerformanceEvent');
    return result.recordset[0];
  } catch(exception) {
    console.error('Error while trying to insert performance evente', exception);
    throw error;
  }
};

module.exports = {
  fetchData, // TODO: Maybe remove this?
  saveData,   /// To DO: Maybe Remove this?
  fetchRegistrationPageData,
  insertEmployeePerformanceEvent,
};