<template>
    <div class="container p-4 px-5">
        <router-link :to="'/learningJourneys'" class="btn btn-outline-dark my-auto mb-3"><i class="fa-solid fa-arrow-left"></i> Back</router-link>
        <div class="d-flex mb-3">
            
            <div v-if="edit_status === false" class="fs-3 fw-bold me-auto px-2">{{ lj_name }}</div>
            <div v-if="edit_status" class="fs-3 fw-bold me-auto px-2 w-50">
                <input type="text" class="form-control" v-model="lj_name" placeholder="Enter learning journey name" >
            </div>
            <button v-if="edit_status === false" class="btn btn-outline-dark" @click="editLJ()" ><i class="fa fa-light fa-pencil"></i>&nbsp;Edit Journey</button>
            <button v-if="edit_status" class="btn btn-outline-dark" @click="editLJ()"><i class="fa fa-light fa-pencil"></i>&nbsp;Done</button>
            <button v-if="edit_status === true" class="btn btn-danger mx-2" data-bs-toggle="modal" data-bs-target="#deleteModal"><i class="fa-regular fa-trash-can"></i>&nbsp;Delete</button>
        </div>
        <div class="fs-5 fst-italic mb-4">...as a {{role_name}}</div>
        <div class="col-8 mx-auto mb-5">
            <ProgressBar :progress="progress"></ProgressBar>
        </div>
        <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Are you sure?</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        You are about to delete your learning journey "{{ lj.lj_name }}"
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" @click="deleteLJ()" data-bs-dismiss="modal">Delete</button>
                        <button type="button" class="btn btn-light border border-dark" data-bs-dismiss="modal">No</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="container">
            <div class="d-flex mb-4 mt-3">
                <h5 v-if="incompleted_courses_list.length > 0" class="my-auto me-auto">Incomplete Courses</h5>
                <div v-if="edit_status" class="ms-auto">
                    <router-link :to="'/viewSkillsandCourses'" class="btn btn-outline-dark"><i class="far fa-plus"></i> Add Courses
                    </router-link>
                </div>
            </div>

            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 card-group">
                <div id="incomplete_course" v-for="course in incompleted_courses_list">
                    <div class="col h-100">
                        <div v-if="course.registration.completion_status != 'Completed' " class="h-100">
                            <Course :course="course" :incompletedCoursesList="incompleted_courses_list" :completedCoursesList="completed_courses_list" :showDelete="edit_status" @refreshPage="getLJ()"></Course>
                        </div>
                    </div>
                </div>
            </div>
        
            <h5 v-if="completed_courses_list.length > 0" class="mt-5 mb-4">Completed Courses</h5>
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 card-group mb-5">
                <div id="complete_course" v-for="course in completed_courses_list">
                    <div class="col h-100">
                        <div v-if="course.registration.completion_status == 'Completed'">
                            <Course :course="course" :incompletedCoursesList="incompleted_courses_list" :completedCoursesList="completed_courses_list" :showDelete="false" @refreshPage="getLJ()"></Course>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ProgressBar from '@/components/Common/ProgressBar.vue'
    import Course from '@/components/Courses/Course.vue'
    import axios from 'axios'
    import 'bootstrap/dist/js/bootstrap.bundle.min.js'
    import 'bootstrap/dist/css/bootstrap.min.css'

    export default{
        components: {
            Course,
            ProgressBar
        },
        
        data() {
            return {
                lj: [],
                lj_courses: [],
                completed_courses: 0,
                incompleted_courses: 0,
                progress: 0,
                completed_courses_list: [],
                incompleted_courses_list: [],
                lj_id: 0,
                job_role_id:0,
                edit_status: false,
                role_name: "",
                lj_name: "",
                api: this.$store.state.api
            }
        },
        emits: ['loading'],
        methods: {
            // get learning journey based on LJ_ID
            async getLJ() {
                await axios.get(this.api + '/journey?id=' + this.lj_id)
                    .then(response => {                        
                        // store learning object in vuex store
                        this.$store.commit('setCurrentLJ', response.data.data.learning_journey[0])
                        this.lj = response.data.data.learning_journey[0]
                        this.lj_courses = response.data.data.learning_journey[0].courses
                        this.job_role_id = response.data.data.learning_journey[0].job_role.role_id
                        this.role_name = response.data.data.learning_journey[0].job_role.role_name
                        this.lj_name = response.data.data.learning_journey[0].lj_name

                        this.completed_courses_list = []
                        this.incompleted_courses_list = []
                        this.completed_courses = 0
                        this.incompleted_courses = 0

                        for (var i = 0; i < this.lj_courses.length; i++) {
                            if (this.lj_courses[i].registration.completion_status == "Completed") {
                                this.completed_courses += 1
                                this.completed_courses_list.push(this.lj_courses[i])
                            }
                            else{
                                this.incompleted_courses += 1
                                this.incompleted_courses_list.push(this.lj_courses[i])
                            }
                        }

                        this.progress = Math.floor(this.completed_courses / (this.incompleted_courses + this.completed_courses) * 100)
                    
                    })
                    .catch(error => alert(error));
            },
            async editLJ(){
                // console.log("here", this.edit_status)
                this.loading(true)
                if(this.edit_status === true){
                    if(this.lj_name !== ""){
                        if(this.lj_name === this.lj.lj_name){
                            alert("No changes made to name for your learning journey")
                        }
                        else{
                            await this.saveLJName()
                        }
                    }
                    else {
                        this.lj_name = this.lj.lj_name
                        alert("Please enter a name for your learning journey")
                    }
                }
                this.loading(false)
                this.edit_status = !this.edit_status
            },
            async saveLJName(){
                const payload = {
                    "id": this.lj_id,
                    "name": this.lj_name,
                }
                await axios.put(this.api + "/journey", payload)
                    .then(response => {
                        if(response.status === 200){
                            this.lj.lj_name = this.lj_name
                            alert("Learning Journey name updated successfully!")
                        }
                    })
                    .catch(error => alert(error))
            },
            async deleteLJ(){
                this.loading(true)
                // console.log(this.lj_id)
                await axios.delete(this.api + "/journey", {data:{ id: this.lj_id}})
                .then(response => {
                    // console.log(response.data)
                    if(response.data.code === 200){
                        alert("Learning Journey Deleted Successfully")
                        this.$router.push({ path: "/learningJourneys/" })
                    }
                })
                .catch(error => alert(error));
                this.loading(false)
            },
            loading(flag){
                this.$emit('loading', flag)
            }
        },
        async created() {
            this.loading(true)
            this.lj_id = this.$store.state.stored_indivLJ_id
            await this.getLJ()
            this.loading(false)
        }
    }

</script>