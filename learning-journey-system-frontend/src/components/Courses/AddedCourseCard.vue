<template>
    <div class="col-sm-6 col-md-4 col-xl-3 h-100">
        <div class="card text-start my-3 w-100 h-100" style="width: 18rem;">
            <img src="@/assets/courses.png" class="card-img-top" alt="">
            <div class="card-body">
                <h6 class="card-title fw-bold mb-3"> {{ course.course_id }} {{ course.course_name }}</h6>
                <p class="card-text text-muted" style="font-size:14px"><i class="fa-solid fa-house"></i>&nbsp; {{ course.course_type }} Course Type</p>
                <p class="card-text text-muted mb-3" style="font-size:14px">{{ course.course_desc }}</p>
                <button class="btn btn-danger w-100" @click="$emit('removeSelectedCourse', course.course_id)">Remove Course</button>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'CourseCard',
        data() {
            return {
            }
        },
        methods: {
        },
        props: {
            course: {
                course_category: String,
                course_desc: String,
                course_id: String,
                course_name: String,
                course_status: String,
                course_type: String,
            }
        }
    }
</script>