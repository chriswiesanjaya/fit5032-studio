<template>
  <pre>{{ jsondata }}</pre>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const jsondata = ref(null)
const error = ref(null)

const getBookCountAPI = async () => {
  try {
    const response = await axios.get('https://countbooks-2ofkbfwpmq-uc.a.run.app')
    jsondata.value = response.data
    error.value = null
  } catch (err) {
    console.log('Error fetching book count: ', err)
    error.value = err
    jsondata.value = null
  }
}

onMounted(() => {
  getBookCountAPI()
})
</script>
