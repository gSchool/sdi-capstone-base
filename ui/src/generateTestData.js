export const makeTestEvents = (num) => {
  let testEvents = []
  let start = new Date()
  let end = new Date()
  for (let i = 0; i < num; i++) {
    let testEvent = {
      name: `System ${i + 1} CTT`,
      id: i + 1,
      description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna. Nunc viverra imperdiet enim. Fusce est. Vivamus a tellus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna. Nunc viverra imperdiet enim. Fusce est. Vivamus a tellus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna. Nunc viverra imperdiet enim. Fusce est. Vivamus a tellus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis.',
      start_date: start.toDateString(),
      end_date: (new Date(end.setTime(start.getTime() + 60 * 60 * 24 * 3 * 1000))).toDateString()
    }
    testEvents.push(testEvent)
  }
  return testEvents
}


export const makeTestUsers = (num) => {
  let testUsers = []
  for (let i = 0; i < num; i++) {
    let testUser = {
      name: "Bob",
      is_admin: '1',
      is_editor: '1'
    }
    testUsers.push(testUser)
  }
  return testUsers
}

export const makeTestAttacks = (num) => {
  let testAttacks = []
  for (let i = 0; i < num; i++) {
    let testAttack = {
      mission: i % 3 + 1,
      attack: i,
      variant: 1,
      description: 'I am an attack',
      goal: 'attack some things',
      assumptions: 'I am cool',
      mission_impact: 'it would be bad',
      mission_impact_score: i % 5,
      likelihood: 'not very likely',
      likelihood_score: i % 5
    }
    testAttacks.push(testAttack)
  }
  return testAttacks
}

export const makeTestTeams = (num) => {
  let testTeams = []
  for (let i = 0; i < num; i++) {
    let testTeam = {
      name: `Team ${i}`
    }
    testTeams.push(testTeam)
  }
  return testTeams
}

