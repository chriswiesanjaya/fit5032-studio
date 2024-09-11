<template>
  <!-- Update Book Form -->
  <div>
    <h1>Update Book</h1>
    <form @submit.prevent="updateBook">
      <div>
        <label for="updateIsbn">ISBN:</label>
        <input type="text" v-model="updateIsbn" id="updateIsbn" required />
      </div>
      <div>
        <label for="updateName">New Name:</label>
        <input type="text" v-model="updateName" id="updateName" required />
      </div>
      <button type="submit">Update Book</button>
    </form>
  </div>

  <!-- Display List of Books -->
  <div>
    <BookList />
  </div>
</template>

<script>
import { ref } from 'vue'
import db from '../firebase/init.js'
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore'
import BookList from '../components/BookList.vue'

export default {
  setup() {
    const isbn = ref('')
    const name = ref('')

    const updateBook = async () => {
      try {
        const isbnNumber = Number(isbn.value)
        if (isNaN(isbnNumber)) {
          alert('ISBN must be a valid number')
          return
        }

        const q = query(collection(db, 'books'), where('isbn', '==', isbnNumber))
        const querySnapshot = await getDocs(q)

        if (querySnapshot.empty) {
          alert('No book found with the given ISBN')
          return
        }

        const bookDoc = querySnapshot.docs[0]
        const bookRef = doc(db, 'books', bookDoc.id)
        await updateDoc(bookRef, { name: name.value })
        isbn.value = ''
        name.value = ''
        alert('Book updated successfully!')
      } catch (error) {
        console.log('Error updating book: ', error)
      }
    }

    return {
      isbn,
      name,
      updateBook
    }
  },
  components: { BookList }
}
</script>
