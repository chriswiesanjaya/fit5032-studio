<template>
  <pre>{{ jsondata }}</pre>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      jsondata: null,
      error: null
    }
  },
  mounted() {
    this.getBookCountAPI()
  },
  methods: {
    async getBookCountAPI() {
      try {
        const response = await axios.get('https://countbooks-2ofkbfwpmq-uc.a.run.app')
        this.jsondata = response.data
        this.error = null
      } catch (error) {
        console.log('Error fetching book count: ', error)
        this.error = error
        this.count = null
      }
    }
  }
}
</script>
