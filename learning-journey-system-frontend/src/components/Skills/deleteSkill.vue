<template>
    <div>
        <!-- Modal -->
        <div class="modal fade" :id="'delete'+ skill.skill_id" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Delete {{skill.skill_name}} Skill</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="this.$emit('reload'); resetMsg()"></button>
                </div>
                <div class="modal-body text-start">
                    Are you sure you want to delete this skill?<br><br>
                    <span class="text-success">{{successMsg}}</span>
                </div>
                <div class="modal-footer">
                    <button id="deleteBtn" type="button" class="btn btn-danger border border-dark" v-if="skill.skill_status == 'Retired'" @click="deleteSkill();" disabled>Delete</button>
                    <button id="deleteBtn" type="button" class="btn btn-danger border border-dark" v-else @click="deleteSkill();">Delete</button>
                    <button type="button" class="btn btn-light border border-dark" data-bs-dismiss="modal">No</button>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import 'bootstrap/dist/js/bootstrap.bundle.min.js'
    import 'bootstrap/dist/css/bootstrap.min.css'
    import axios from 'axios'
    
    export default {
      name: 'deleteSkill',
      props: {
        skill: Object
      },
      data(){
        return{
            updated_status: "Retired",
            successMsg: "",
            api: this.$store.state.api
        }
      },
      
      methods: {
        deleteSkill: async function(){
            await axios.put(this.api + '/skill', {
                id: this.skill.skill_id,
                status: this.updated_status
            })
            .then(response => {
                console.log(response)
                this.skill.skill_status = this.updated_status
                this.successMsg = "Skill has been successfully deleted"
            })
            .catch(error => {
                console.log(error)
            })
        },

        resetMsg(){
            this.successMsg = ""
        }

      }

    }
</script>