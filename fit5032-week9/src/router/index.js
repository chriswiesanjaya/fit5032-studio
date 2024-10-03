import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '@/views/LoginView.vue'
import FirebaseSignInView from '@/views/FirebaseSigninView.vue'
import FirebaseRegisterView from '@/views/FirebaseRegisterView.vue'
import AddBookView from '@/views/AddBookView.vue'
import UpdateBookView from '@/views/UpdateBookView.vue'
import DeleteBookView from '@/views/DeleteBookView.vue'
// import { M } from 'vite/dist/node/types.d-aGj9QkWt'
import GetBookCountView from '@/views/GetBookCountView.vue'
import AddBookFunctionView from '@/views/AddBookFunctionView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/FireLogin',
    name: 'FireLogin',
    component: FirebaseSignInView
  },
  {
    path: '/FireRegister',
    name: 'FireRegister',
    component: FirebaseRegisterView
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
    meta: { requiresAuth: true }
  },
  {
    path: '/Login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/addbook',
    name: 'Add Book',
    component: AddBookView
  },
  {
    path: '/updatebook',
    name: 'Update Book',
    component: UpdateBookView
  },
  {
    path: '/deletebook',
    name: 'Delete Book',
    component: DeleteBookView
  },
  {
    path: '/GetBookCount',
    name: 'GetBookCount',
    component: GetBookCountView
  },
  {
    path: '/AddBookFunction',
    name: 'AddBookFunction',
    component: AddBookFunctionView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated')
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
