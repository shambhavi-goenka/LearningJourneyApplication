import axios from 'axios'

//To change newCreateSkill value again when testing for a 2nd time, if not response would be 500 because skill already exist
const createNewSkill = async() => {
    const newCreateSkill = {
        name: "Software Project Management 5"
    }
    let response = await axios.post('https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/skill', newCreateSkill)
    console.log(response)
    return response.data.code
}

//To create an existing skill that already exists to test for 500 response
const createExistingSkill = async() => {
    const newExistingSkill = {
        name: "HTML"
    }
    let response = await axios.post('https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/skill', newExistingSkill)
    console.log(response)
    return response.data.code
}


//before updateSkill to change skill name from Microsoft Powerpoint to Microsoft Powerpoints
const beforeUpdateSkill = async() => {
    const updatedSkillName = {
        id: 10,
        name: "Microsoft Powerpoints"
    }
    let response = await axios.put('https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/skill', updatedSkillName)
    return response.data.code
}
//To change skill name from Microsoft Powerpoints to Microsoft Powerpoint 2018
const updateSkills = async() => {
    const updatedSkillName = {
        id: 10,
        name: "Microsoft Powerpoint 2018"
    }
    let response = await axios.put('https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/skill', updatedSkillName)
    return response.data.code
}
///To change skill name from Microsoft Powerpoint 2018 to Microsoft Powerpoint
const afterUpdateSkill = async() => {
    const updatedSkillName = {
        id: 10,
        name: "Microsoft Powerpoint"
    }
    let response = await axios.put('https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/skill', updatedSkillName)
    return response.data.code
}


//To change skill name from HTML to HTML, to test for 404 response
const updateSameSkill = async() => {
    const updateSameSkillName = {
        id: 2,
        name: "HTML",
    }
    let response = await axios.put('https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/skill', updateSameSkillName)
    console.log(response)
    return response.data.code
}

const updateSkillFromRetiredToActive = async() => {
    const updateSkillRetiredToActive = {
        id: 11,
        status: "Active",
    }
    let response = await axios.put('https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/skill', updateSkillRetiredToActive)
    console.log(response)
    return response.data.code
}
//After update change skill status back to Retired
const afterUpdateSkillFromRetiredToActive = async() => {
    const updateSkillRetiredToActive = {
        id: 11,
        status: "Retired",
    }
    let response = await axios.put('https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/skill', updateSkillRetiredToActive)
    console.log(response)
    return response.data.code
}

//To delete skill id 4 from 'Active' to 'Retired'
const deleteSkill = async() => {
    const updateSkillToRetired = {
        "id": 4,
        "status": "Retired"
    }
    let response = await axios.put('https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/skill', updateSkillToRetired)
    console.log(response)
    return response.data.code
}

//Afterall to restore skill id 4 from 'Retired' to 'Active'
const afterDeleteSkill = async() => {
    const updateSkillToRetired = {
        "id": 4,
        "status": "Active"
    }
    let response = await axios.put('https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/skill', updateSkillToRetired)
    console.log(response)
    return response.data.code
}

const deleteSameSkill = async() => {
    const updateSkillToRetired = {
        "id": 5,
        "status": "Retired"
    }
    let response = await axios.put('https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/skill', updateSkillToRetired)
    console.log(response)
    return response.data.code
}

//To retreive all skills
const getAllSkills = async () => {
  const result = []
  let response = await axios.get('https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/skill')
  //loop through first 3 response
  for (let i = 0; i < 3; i++) {
    result.push(response.data.data.skills[i])
    }
    return result
}

// Creation of Skills
describe("createSkills.vue", () => {
    // it("Should return 200 showing skill was created successfully", async () => {
    //     const response = await createNewSkill()
    //     expect(response).toEqual(200)
    // })

    it('Should return 500 because skill already exists', async () => {
        const response = await createExistingSkill()
        expect(response).toEqual(500)
    })
})

// Viewing of Skills
describe("viewAllSkills.vue", () => {
  it('Should render skill name and status', async () => {
      const skillsArray = await getAllSkills()
      const skill = [{"skill_id": 1, "skill_name": "Data Analytics", "skill_status": "Retired"}, 
      {"skill_id": 2, "skill_name": "HTML", "skill_status": "Active"}, {"skill_id": 3, "skill_name": "Project Managenment", "skill_status": "Retired"}]
      console.log("skills", skillsArray)
      expect(skillsArray).toEqual(skill)  
  })
})

// Update of Skills
describe("updateSkill.vue", () => {
    beforeAll(async () => { 
        await beforeUpdateSkill()
    })
    it("Should return 200 showing skill was updated successfully", async () => {
        
        const response = await updateSkills()
        expect(response).toEqual(200)
    })
        
    it('Should return 404 because skill already exists', async () => {
        const response = await updateSameSkill()
        expect(response).toEqual(404)
    })

    it('Should return 200 as skill is succesfully updated from Retired to Active', async () => {
        const response = await updateSkillFromRetiredToActive()
        expect(response).toEqual(200)
    })

    afterAll(async () => {
        await afterUpdateSkill()
        await afterUpdateSkillFromRetiredToActive()        
    })
})


// Delete Skills
describe("deleteSkills.vue", () => {
    it("Should return 200 showing skill was deleted successfully from Active to Retired", async () => {
        const response = await deleteSkill()
        expect(response).toEqual(200)
    })

    it("Should return 404 showing skill was deleted again from Retired to Retired", async () => {
        const response = await deleteSameSkill()
        expect(response).toEqual(404)
    })
    afterAll(async () => {
        await afterDeleteSkill()       
    })

})