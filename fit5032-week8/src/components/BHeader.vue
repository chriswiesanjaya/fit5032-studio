<template>
  <!-- Using Bootstrap's Header template (starter code) -->
  <!-- https://getbootstrap.com/docs/5.0/examples/headers/ -->
  <div class="container">
    <header class="d-flex justify-content-center py-3">
      <ul class="nav nav-pills">
        <li class="nav-item">
          <router-link to="/" class="nav-link" active-class="active" aria-current="page"
            >Home (Week 5)</router-link
          >
        </li>
        <li class="nav-item">
          <router-link to="/about" class="nav-link" active-class="active">About</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link" active-class="active">Login</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/addbook" class="nav-link" active-class="active">Add Book</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/updatebook" class="nav-link" active-class="active"
            >Update Book</router-link
          >
        </li>
        <li class="nav-item">
          <router-link to="/deletebook" class="nav-link" active-class="active"
            >Delete Book</router-link
          >
        </li>
        <li class="nav-item">
          <router-link to="/FireLogin" class="nav-link" active-class="active"
            >Firebase Login</router-link
          >
        </li>
        <li class="nav-item">
          <router-link to="/FireRegister" class="nav-link" active-class="active"
            >Firebase Register</router-link
          >
        </li>
        <li class="nav-item">
          <button v-if="isAuthenticatedFirebase" class="btn btn-secondary" @click="signoutFirebase">
            Firebase Logout
          </button>
        </li>
      </ul>
    </header>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'

const router = useRouter()
const auth = getAuth()
const isAuthenticatedFirebase = ref(false)

// Check Firebase Authentication state
onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isAuthenticatedFirebase.value = true
    } else {
      isAuthenticatedFirebase.value = false
    }
  })
})

// Firebase Log Out
const signoutFirebase = () => {
  signOut(auth)
    .then((data) => {
      console.log('Firebase Sign Out Successful!')
      router.push('/FireLogin')
      console.log(auth.currentUser)
    })
    .catch((error) => {
      console.log(error.code)
    })
}

// const isAuthenticated = ref(localStorage.getItem('isAuthenticated') === 'true')
// const router = useRouter()

// const logout = () => {
//   localStorage.removeItem('isAuthenticated')
//   isAuthenticated.value = false
//   router.push('/login')
// }
</script>

<style scoped>
.b-example-divider {
  height: 3rem;
  background-color: rgba(0, 0, 0, 0.1);
  border: solid rgba(0, 0, 0, 0.15);
  border-width: 1px 0;
  box-shadow:
    inset 0 0.5em 1.5em rgba(0, 0, 0, 0.1),
    inset 0 0.125em 0.5em rgba(0, 0, 0, 0.15);
}

.form-control-dark {
  color: #fff;
  background-color: var(--bs-dark);
  border-color: var(--bs-gray);
}
.form-control-dark:focus {
  color: #fff;
  background-color: var(--bs-dark);
  border-color: #fff;
  box-shadow: 0 0 0 0.25rem rgba(255, 255, 255, 0.25);
}

.bi {
  vertical-align: -0.125em;
  fill: currentColor;
}

.text-small {
  font-size: 85%;
}

.dropdown-toggle {
  outline: 0;
}
</style>
