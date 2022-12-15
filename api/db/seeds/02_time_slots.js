/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const types = ['shift', 'replacement_needed', 'absent', 'unavailable'];

const shifts = [{start: '2022-12-22 18:00:00', end: '2022-12-23 02:00:00'}, {start: '2022-12-23 02:00:00', end: '2022-12-23 10:00:00'}, 
{start: '2022-12-23 10:00:00', end: '2022-12-23 18:00:00'},{start: '2022-12-23 18:00:00 ', end: '2022-12-24 02:00:00 '},
{start: '2022-12-24 02:00:00', end: '2022-12-24 10:00:00'},{start: '2022-12-24 10:00:00', end: '2022-12-24 18:00:00'},
{start: '2022-12-24 18:00:00', end: '2022-12-25 02:00:00'},{start: '2022-12-25 02:00:00 ', end: '2022-12-25 10:00:00 '},
{start: '2022-12-25 10:00:00', end: '2022-12-25 18:00:00'},{start: '2022-12-25 18:00:00', end: '2022-12-26 02:00:00'}];

exports.seed = async function(knex) {

  let memberList = await knex.select('id', 'crew_position_id').from('users').where('role', 'member');
  let memberIndex = 0;

  const getMember = async (crew) =>{
    let tempMember = memberList[memberIndex + (crew * 3)];
    memberIndex++;
    if(memberIndex === 3){
      memberIndex = 0;
    }
    console.log('Member:', tempMember);
    return tempMember;

  }

  

  const createTime_Slot = async(crew, shiftID, typeID) => {
    let tempMemberInsert = await getMember(crew);

    let time_slot = {
      start_datetime: shifts[shiftID].start,
      end_datetime: shifts[shiftID].end,
      type:types[typeID],
      description:'Default',
      user_id:tempMemberInsert.id,
      crew_position_id:tempMemberInsert.crew_position_id,
      created_at:knex.fn.now() ,
      updated_at:knex.fn.now()  
    }




    return time_slot;

  }


  // Deletes ALL existing entries
  await knex('time_slots').del()
  await knex('time_slots').insert([
    //A sequence of three time slots reprsents a crew getting assigned one shift. 
    //The first value relates to what shift, the second initalizes the type
    //CREW | SHIFT | TYPE

    //Alpha crew Thursday Night
    await createTime_Slot(0, 0, 0),
    await createTime_Slot(0, 0, 0),
    await createTime_Slot(0, 0, 0),

    //Bravo crew Friday Morning
    await createTime_Slot(1, 1, 0),
    await createTime_Slot(1, 1, 0),
    await createTime_Slot(1, 1, 0),

    //Charlie crew Friday Afternoon
    await createTime_Slot(2, 2, 0),
    await createTime_Slot(2, 2, 0),
    await createTime_Slot(2, 2, 0),

    //Alpha crew Friday Night
    await createTime_Slot(0, 3, 0),
    await createTime_Slot(0, 3, 0),
    await createTime_Slot(0, 3, 0),

    //Bravo crew Saturnday Morning
    await createTime_Slot(1, 4, 0),
    await createTime_Slot(1, 4, 0),
    await createTime_Slot(1, 4, 0),

    //Charlie crew Saturday Afternoon
    await createTime_Slot(2, 5, 0),
    await createTime_Slot(2, 5, 0),
    await createTime_Slot(2, 5, 0),

     //Alpha crew Saturday Night
     await createTime_Slot(0, 6, 0),
     await createTime_Slot(0, 6, 0),
     await createTime_Slot(0, 6, 0),

     //Bravo crew Sunday Morning
    await createTime_Slot(1, 7, 0),
    await createTime_Slot(1, 7, 0),
    await createTime_Slot(1, 7, 0),

    //Charlie crew Sunday Afternoon
    await createTime_Slot(2, 8, 0),
    await createTime_Slot(2, 8, 0),
    await createTime_Slot(2, 8, 0),

    //Alpha crew Saturday Night
    await createTime_Slot(0, 9, 0),
    await createTime_Slot(0, 9, 0),
    await createTime_Slot(0, 9, 0),



    
  ]);
};
