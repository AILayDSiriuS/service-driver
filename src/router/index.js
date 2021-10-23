import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/Home.vue')
    },
    {
      path: '/education',
      name: 'Education',
      component: () => import('../views/Education.vue')
    },
    {
      path: '/laws',
      name: 'Laws',
      component: () => import('../views/Laws.vue')
    },
    {
      path: '/signin',
      name: 'Signin',
      component: () => import('../views/Signin.vue'),
      props: true
    },
    {
      path: '/signup',
      name: 'Signup',
      component: () => import('../views/Signup.vue')
    },
    {
      path: '/license',
      name: 'License',
      component: () => import('../views/License.vue')
    },
    {
      path: '/logout',
      name: 'Logout',
      component: () => import('../views/Logout.vue')
    },
    {
      path: '/me',
      name: 'Profile',
      component: () => import('../views/Me.vue')
    },
    {
      path: '/friends',
      name: 'Friends',
      component: () => import('../views/Friends.vue')
    },
    {
      path: '/articles',
      name: 'Articles',
      component: () => import('../views/Articles')
    },
    {
      path: '/articles/:id',
      component: () => import('../views/ArticlePage.vue')
    },
    {
      path: '/exams/:id',
      component: () => import('../views/Exam.vue')
    },
    {
      path: '/tests/:id',
      component: () => import('../views/Test.vue')
    },
    {
      path: '/users/:id',
      component: () => import('../views/User.vue')
    },
    {
      path: '/videos/:id',
      component: () => import('../views/VideoPage.vue')
    },
    {
      path: '/search/:query',
      component: () => import('../views/SearchResults.vue')
    },
    {
      path: '/search/',
      component: () => import('../views/SearchResults.vue')
    },
    {
      path: '/videos',
      name: 'Videos',
      component: () => import('../views/Videos.vue')
    },
    {
      path: '/temp',
      name: 'Temp',
      component: () => import('../views/Temp.vue')
    },
    {
      path: '*',
      name: 'PageNotFound',
      component: () => import('../views/PageNotFound.vue')
    }
  ]

const router = new VueRouter({
  routes
})

export default router
