<template>
    <Loading v-if="loading"></Loading>
    <div class="container p-5" v-if="userLearningJourneys.length > 0">
        <div class="row mb-5">
            <div class="d-flex">
                <h1 class="fs-2 fw-bold me-auto my-auto">My Learning Journeys</h1>
                <div class="fs-6 ms-auto"><router-link :to="'/NameLearningJourney'" class="btn btn-outline-dark">Create Journey</router-link></div>
            </div>

            <!-- <div class="col-4 btn-group p-5 inline" role="group">
                <button class="btn btn-primary"><router-link :to="'/jobroles'" class="text-light" style="text-decoration: none">Create Learning Journey</router-link></button> -->
                <!-- <a href="/#/createlearningJourney" class="btn btn-outline-dark m-1">Create</a> -->
                <!-- <a class="btn btn-outline-dark m-1">Update</a>
                <a href="" class="btn btn-outline-dark m-1">Delete</a> -->
            <!-- </div> -->
        </div>
        <div class="row">
            <div class="text-center">
                <LearningJourneyCard v-for="learningJourney in userLearningJourneys" v-bind:learningJourney="learningJourney"
                    :key="learningJourney" />
            </div>
        </div>
    </div>

    
    <div class="container" v-else>
        <div class="text-center">
            <img src="https://bbs.binus.ac.id/mm-blendedlearning/wp-content/uploads/sites/13/2021/02/how-design-thinking-transforming-learning-experience-free-ebook.jpg" alt="" class="mt-5" style="width:45%">
            <h1 class="fs-2 mt-4 mb-5">Looks like you don't have a learning journey yet. <br>Click the button below to start!</h1>
            <router-link :to="'/NameLearningJourney'" class="btn btn-outline-dark px-4 py-2 fs-4" style="text-decoration: none">Start your Journey</router-link>
        </div>
    </div>
</template>
<script>
import LearningJourneyCard from '@/components/LearningJourneys/LearningJourneyCard.vue'
import Loading from '@/components/Common/Loading.vue';
import axios from 'axios'

export default {
    name: 'LearningJourneysView',
    components: {
        LearningJourneyCard,
        Loading
    },
    data() {
        return {
            userLearningJourneys: [],
            userLearningJourneyIds: [],
            staffID: null,
            loading: null,
            api: this.$store.state.api
        }
    },
    
    methods:{
        async getUserLearningJourneys(){
            // get all learning journeys
            // TODO: get all learning journeys given userID
            await axios.get(this.api + "/journey?staff="+this.staffID)
                .then(response => {
                    if(response.data.code === 200){
                        this.userLearningJourneys = response.data.data.learning_journey
                    }
                    else{
                        this.userLearningJourneys = []
                    }
                })
                .catch(error => console.log(error))
        },
        filterUserLearningJourneyIds(){
            this.userLearningJourneyIds = this.userLearningJourneys.map(learningJourney => learningJourney.lj_id)
        },
        
    },
    async mounted() {
        this.loading = true
        this.staffID = this.$store.state.stored_staff_id
        await this.getUserLearningJourneys()
        this.loading = false
    },
    created(){
        if(!this.$store.state.stored_current_accessrole){
            this.$router.push('/')
        }
    }    
}
</script>
