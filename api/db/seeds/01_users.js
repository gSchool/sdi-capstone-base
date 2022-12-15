



const { faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt");




const crew_position_ids = [];
const ranks = ['E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'O1', 'O2', 'E9', 'E7', 'E8', 'O3', 'O4', 'O5', 'O6', 'O7', 'O8', 'O9'];
const default_password = 'password';

const passwordGenerator = async() => {
  return (bcrypt.hash(default_password, 12));

}

const randomRank = async (rankType) => {
  if(rankType === 0){
    return (ranks[11]);

  }
  else{
    return (ranks[Math.floor(Math.random() * 8)]);

  }
  

}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */




exports.seed = async function(knex) {
  let crewPositionsList = await knex.select('*').from('crew_positions');
  await crewPositionsList.forEach(element => crew_position_ids.push(element.id));


  
  const createMember = async(crewType, isLeader) => {
    let member = {
      first_name: '',
      last_name: '',
      email: '',
      phone_number: '',
      role:'member',
      rank: '',
      username: '',
      passwordHash: '',
      crew_position_id: crew_position_ids[crewType],
      created_at:knex.fn.now() ,
      updated_at:knex.fn.now()  
  
    }
     member.passwordHash = await passwordGenerator();
     member.first_name = await faker.name.firstName();
     member.last_name = await faker.name.lastName();
     member.email = await faker.internet.email(member.first_name, member.last_name, 'spaceforce.mil');
     member.phone_number = await faker.phone.number();
     if(crewType === 0){
      member.rank = await randomRank(0);
     }
     else{
      member.rank = await randomRank(1);

     }
     
     member.username = await faker.internet.userName(member.first_name, member.last_name);

     if(isLeader){
      member.role = 'leader'
     }
     

    return(member);
  
  }



  

  

 




  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    // { first_name: '', last_name: '', email: '', phone_number: '', role:'', rank: '', username: '', passwordHash: '', crew_position_id: '', created_at:knex.fn.now() , updated_at:knex.fn.now()  },
    
    //Leadership
    await createMember(0, true),
   
    //One crew is a collection of three create members, one with 0 passed in, one with 1 passed in, and one with 2 passed in
    //ALPHA Crew
    await createMember(0, false),
    await createMember(1, false),
    await createMember(2, false),

    //Bravo Crew
    await createMember(0, false),
    await createMember(1, false),
    await createMember(2, false),

    //Charlie Crew
    await createMember(0, false),
    await createMember(1, false),
    await createMember(2, false),

    //Delta Crew
    await createMember(0, false),
    await createMember(1, false),
    await createMember(2, false),

    //Echo Crew
    await createMember(0, false),
    await createMember(1, false),
    await createMember(2, false),

    //Foxtrot Crew
    await createMember(0, false),
    await createMember(1, false),
    await createMember(2, false)


    
    
  ]);
};
