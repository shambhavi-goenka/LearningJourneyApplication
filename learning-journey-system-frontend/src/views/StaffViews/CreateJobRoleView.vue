<template>
    <Loading v-if="loading"></Loading>
    <div v-if="!loading" class="container p-4 px-5">
        <a href="javascript:history.back()" class="btn btn-outline-dark my-auto mb-3"><i class="fa-solid fa-arrow-left"></i> Back</a>

        <div class="mx-5">
            <h1 class="fs-2 fw-bold mb-3">Add new Job Role</h1>

            <div class="alert alert-success alert-dismissible fade show" role="alert" v-if="success">
                <strong>Success!</strong> Job role has been added.
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>

            <!-- Job role name -->
            <h3 class="fs-5 mt-4 mb-3"><span style="color:red;">*</span> Role name</h3>
            
            <div class="input-group mb-4 input-group-lg">
                <input type="text" class="form-control" placeholder="Your role name goes here....." aria-label="Username" v-model="role_name">
            </div>
            <!-- check if role name already exists -->
            <div v-for="name in jobroleNames">
                <!-- <p>{{name.role_name}}</p> -->
                <p class="mb-3" v-if="name.role_name.toLowerCase() === role_name.toLowerCase()" style="color:red">This job role already exists. Enter another role name</p>
            </div>

            <!-- Skills -->
            <h3 class="fs-5 my-3"><span style="color:red;">*</span> Skills required</h3>
            <div class="mb-3">
                <div v-for="selected_skill in role_skills" class="d-inline">
                    <span class="badge bg-primary mx-1 mb-3">{{selected_skill.skill_name}}</span>
                </div>
                <!-- Search bar and list of skills -->
                <input type="text" class="form-control mb-3" v-model="skill" style="font-family: fontAwesome;" placeholder="&#xf002; Search skills"/>
                <div class="form-check" v-for="skill in filteredSkills">
                    <input class="form-check-input" type="checkbox" :value="skill" :id="skill.skill_id" v-model="role_skills">
                    <label class="form-check-label" :for="skill.skill_id">
                        {{skill.skill_name}}
                    </label>
                </div>
            </div>

            <!-- Create button -->
            <div class="text-center mb-5">
                <button class="btn btn-outline-dark mt-4 mb-4" style="padding: 10px 15%" @click="addJobRole();">Create job role</button>
            </div>

        </div>
    </div>
</template>

<script>
    import 'bootstrap/dist/js/bootstrap.bundle.min.js'
    import 'bootstrap/dist/css/bootstrap.min.css'
    import Loading from '@/components/Common/Loading.vue'
    import axios from 'axios'

    export default {
      name: 'CreateJobRoleView',
      components: { Loading },
      data() {
        return {
            role_name: '', // new role name
            existing_roles: [], // existing job role names
            skill: '', // search bar
            role_skills: [], // skills selected by the user
            all_skills: [], // all skills in the database
            role_id: 0, // new job role id
            success: false, // alert message
            loading: null, // loading screen,
            api: this.$store.state.api
            }
        },
        methods: {
            async addJobRole(){
                this.loading = true
                // if role_name exists in jobroleNames, then don't add it
                if(this.jobroleNames.some(name => name.role_name.toLowerCase() === this.role_name.toLowerCase())){
                    alert("This job role already exists")
                }
                else if(this.role_name == ''){
                    alert("Please enter a role name")
                }
                else if (this.role_skills.length == 0){
                    alert("Please select at least one skill")
                }
                else{
                    await axios.post(this.api + '/role', {
                        name: this.role_name
                    })
                    .then(response => {
                        console.log(response)
                    })
                    .catch(error => alert(error));

                    await this.activate()
                }
                this.loading = false
            },

            async getNewJobRoleID(){
                await axios.get(this.api + '/role')
                    .then(response => {
                        this.role_id = response.data.data.job_roles.slice(-1)[0].role_id
                    })
                    .catch(error => alert(error));
            },

            async getJobRole(){
                await axios.get(this.api + '/role')
                .then(response => {
                    this.existing_roles = response.data.data.job_roles
                })
                .catch(error => alert(error));
            },

            async activate(){
                await this.getNewJobRoleID()
                await this.addSkilltoJobRole()
                
            },

            async addSkilltoJobRole(){
                let code = 0
                let count = 10
                let skills_added = 0
                for (var i = 0; i < this.role_skills.length; i++){
                    while(count < 10 || code !== 200){
                        await axios.post(this.api + '/role_skill', {
                            role: this.role_id,
                            skill: this.role_skills[i].skill_id
                        })
                        .then(response => {
                            code = response.data.code
                            if (code == 200){
                                skills_added++
                            }
                        })
                        .catch(error => alert(error));
                        count ++

                    }
                    code = 0
                }
                
                // if role_skills list empty, then show success alert
                if(skills_added == this.role_skills.length){
                    this.clearForm()
                }
                else{
                    alert("Error adding skills to job role. Please try updating the job role instead.")
                }
            },

            getAllSkills(){
                axios.get(this.api + '/skill?status=active')
                    .then(response => {
                        this.all_skills = response.data.data.skills
                    })
                    .catch(error => alert(error));
            },

            clearForm(){
                this.role_name = ''
                this.role_skills = []
                this.success = true
                alert("Job role added successfully")

                this.getJobRole()
            }
        },
        created() {
            this.getJobRole(),
            this.getAllSkills()
        },
        computed: {
            filteredSkills() {
                this.all_skills.sort((a, b) => (a.skill_name < b.skill_name) ? -1 : 1)
                return this.all_skills.filter(p => {
                    return p.skill_name.toLowerCase().indexOf(this.skill.toLowerCase()) != -1;
                });
            },
            // for checking if the job role name already exists
            jobroleNames() {
                return this.existing_roles.filter(p => {
                    return p.role_name.toLowerCase().indexOf(this.role_name.toLowerCase()) != -1;
                });
            }
        }
    }

</script>