<template>
  <!-- Add Book (Function) Form -->
  <div>
    <h1>Add Book (Function)</h1>
    <form @submit.prevent="addBook">
      <div>
        <label for="isbn">ISBN:</label>
        <input type="text" v-model="isbn" id="isbn" required />
      </div>
      <div>
        <label for="name">Name:</label>
        <input type="text" v-model="name" id="name" required />
      </div>
      <button type="submit">Add Book</button>
    </form>
  </div>

  <!-- Display List of Books -->
  <div>
    <BookList />
  </div>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'
import BookList from '../components/BookList.vue'

export default {
  setup() {
    const isbn = ref('')
    const name = ref('')

    const addBook = async () => {
      const isbnNumber = Number(isbn.value)

      if (!isbn.value || !name.value.trim()) {
        alert('Both ISBN and Name are required.')
        return
      }
      if (isNaN(isbnNumber) || !Number.isInteger(isbnNumber) || isbnNumber <= 0) {
        alert('ISBN must be a positive integer.')
        return
      }

      try {
        await axios.post('https://addbooks-2ofkbfwpmq-uc.a.run.app', {
          isbn: isbnNumber,
          name: name.value.trim()
        })

        isbn.value = ''
        name.value = ''
        alert('Book added successfully!')
      } catch (error) {
        console.error('Error adding book: ', error)
        alert('Failed to add book. Please try again later.')
      }
    }
    return {
      isbn,
      name,
      addBook
    }
  },
  components: { BookList }
}
</script>
