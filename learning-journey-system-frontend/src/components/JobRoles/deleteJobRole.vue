<template>
    <div>
        <!-- Modal -->
        <div class="modal fade" :id="'delete'+ role.role_id" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Delete {{role.role_name}} Role</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="this.$emit('reload'); resetMsg()"></button>
                </div>
                <div class="modal-body">
                    Are you sure you want to delete this role?<br><br>
                    <span class="text-success">{{successMsg}}</span>
                </div>
                <div class="modal-footer">
                    <button id="deleteBtn" type="button" class="btn btn-danger border-dark" v-if="role.role_status == 'Retired'" disabled>Delete</button>
                    <button id="deleteBtn" type="button" class="btn btn-danger border-dark" v-else @click="deleteJobRole();">Delete</button>
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
      name: 'deleteJobRole',
      props: {
        role: Object
      },
      data(){
        return{
            updated_status: "Retired",
            successMsg: "",
            api: this.$store.state.api
        }
      },
      
      methods: {
        deleteJobRole: async function(){
            await axios.put(this.api + '/role', {
                id: this.role.role_id,
                status: this.updated_status
            })
            .then(response => {
                console.log(response)
                this.role.role_status = this.updated_status
                this.successMsg = "Job Role has been successfully deleted"
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