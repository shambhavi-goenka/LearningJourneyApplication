import { createRouter, createWebHashHistory } from 'vue-router'
import LearningJourneysView from '../views/StaffViews/LearningJourneysView.vue'
import JobRoleView from '../views/StaffViews/JobRoleView.vue'
import JobRoleViewAdmin from '../views/AdminViews/JobRoleViewAdmin.vue'
import IndivLearningJourneyView from '../views/StaffViews/IndivLearningJourneyView.vue'
import CreatelearningJourneyView from '../views/StaffViews/CreatelearningJourneyView.vue'
import viewSkillsandCourses from '../views/StaffViews/viewSkillsandCourses.vue'
import CreateJobRoleView from '../views/StaffViews/CreateJobRoleView.vue'
import ViewAllCoursesAdmin from '../views/AdminViews/ViewAllCoursesAdmin.vue'
import LoginView from '../views/LoginView.vue'
import createSkills from '@/views/AdminViews/createSkills.vue'
import viewAllSkills from '@/views/AdminViews/viewAllSkills.vue'
import LearningJourneyNameView from '@/views/StaffViews/LearningJourneyNameView.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView,
    meta: { hideNavbar: true}
  },
  {
    path: '/viewSkillsandCourses',
    name: 'viewSkillsandCourses',
    component: viewSkillsandCourses,
    props: true
  },
  {
    path: '/jobroles',
    name: 'jobroles',
    component: JobRoleView
  },
  {
    path: '/createjobrole',
    name: 'createjobrole',
    component: CreateJobRoleView
  },
  {
    path: '/jobrolesadmin',
    name: 'jobrolesadmin',
    component: JobRoleViewAdmin
  },
  {
    path: '/indivlearningJourneys',
    name: 'indivlearningJourneys',
    component: IndivLearningJourneyView
  },
  {
    path: '/learningJourneys',
    name: 'learningJourneys',
    component: LearningJourneysView
  },
  {
    path: '/createlearningJourney',
    name: '/createlearningJourney',
    component: CreatelearningJourneyView
  },
  {
    path: '/createSkills',
    name: 'createSkills',
    component: createSkills
  },
  {
    path: '/viewAllSkills',
    name: 'viewAllSkills',
    component: viewAllSkills
  },
  {
    path: '/ViewAllCoursesAdmin',
    name: 'ViewAllCoursesAdmin',
    component: ViewAllCoursesAdmin
  },
  {
    path: '/NameLearningJourney',
    name: 'NameLearningJourney',
    component: LearningJourneyNameView
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
