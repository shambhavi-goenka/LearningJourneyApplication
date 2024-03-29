import axios from 'axios'

describe("Job Role", () => {
    // Create Job Role Happy Test
    // it("Should return 200 showing job role was created successfully", async () => {
    //     const response = await createJobRole()
    //     expect(response).toEqual(200)
    // })

    // Create Job Role Negative Test
    it("Should return 500 showing existing job role was successful", async () => {
        const response = await createExistingJobRole()
        expect(response).toEqual(500)
    })

    // Read Job Role Happy Test
    it("Should return 200 showing all job role was successful", async () => {
        const response = await readJobRole()
        expect(response).toEqual(200)
    })

    // Read Job Role Negative Test
    it("Should return 404 showing job role id=100 was successful", async () => {
        const response = await readInvalidJobRole()
        expect(response).toEqual(404)
    })

    // Update Job Role Happy Test
    it("Should return 200 showing job role was updated successfully", async () => {
        const response = await updateRole()
        expect(response).toEqual(200)
    })
  
    // it("Should return 200 showing role skill was added successfully", async () => {
    //     const response = await addRoleSkill()
    //     expect(response).toEqual(200)
    // })
  
    // it("Should return 200 showing role skill was removed successfully", async () => {
    //     const response = await removeRoleSkill()
    //     expect(response).toEqual(200)
    // })

    // // Update Job Role Negative Test
    it("Should return 404 showing job role name was unable to update successfully", async () => {
        const response = await updateExistingRoleName()
        expect(response).toEqual(404)
    })

    // // "Delete" Job Role
    it("Should return 200 showing job role was retired successfully", async () => {
        const response = await removeJobRole()
        expect(response).toEqual(200)
    })

    it("Should return 404 showing job role was unable to retire successfully", async () => {
        const response = await removeRetiredJobRole()
        expect(response).toEqual(404)
    })
    
    afterAll(async () => {
        await resetUpdate();
        await resetDelete()
      })
    })
    
    const resetDelete = async () => {
        const setActive = {
            "id": 4,
            "status": "Active"
        }
        let response = await axios.put('https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/role', setActive)
        return response.data.code
    }

    const resetUpdate = async () => {
        const updateRoleName = {
            "id": 14,
            "name": "Backend System Analyst",
            "status": "Active"
        }
        let response = await axios.put('https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/role', updateRoleName)
        return response.data.code
    }
  
  // Create Job Role - Need to change name
//   const createJobRole = async() => {
//     const newJobRole = {
//         "name": "Data Administrator",
//         }
//         let response = await axios.post('https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/role', newJobRole)
//         console.log(response)
//         return response.data.code
//     }

    const createExistingJobRole = async() => {
        const existingJobRole = {
            "name": "Project Manager",
        }
        let response = await axios.post('https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/role', existingJobRole)
        return response.data.code
    }

    // Read Job Role
    const readJobRole = async () => {
        let response = await axios.get('https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/role')
        return response.data.code
    }

    // Read invalid Job Role
    const readInvalidJobRole = async () => {
        let response = await axios.get('https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/role?id=100')
        return response.data.code
    }

    // Update Job Role
    const updateRole = async () => {
        const updateRoleName = {
            "id": 14,
            "name": "System Analyst",
            "status": "Active"
        }
        let response = await axios.put('https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/role', updateRoleName)
        return response.data.code
    }
    
    // Update existing Job Role name
    const updateExistingRoleName = async () => {
        const updatedRoleName = {
            "id": 2,
            "name": "Project Manager",
            "status": "Retired"
        }
        let response = await axios.put('https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/role', updatedRoleName)
        return response.data.code
    }

    // "Delete" Job Role
    const removeJobRole = async () => {
        const retireJobRole = {
            "id": 4,
            "status": "Retired"
        }
        let response = await axios.put('https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/role', retireJobRole)
        return response.data.code
    }

    // Retire Job Role again
    const removeRetiredJobRole = async () => {
        const retireJobRole = {
            "id": 4,
            "status": "Retired"
        }
        let response = await axios.put('https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/role', retireJobRole)
        return response.data.code
    }