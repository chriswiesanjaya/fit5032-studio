<template>
  <!-- Delete Book Form -->
  <div>
    <h1>Delete Book</h1>
    <form @submit.prevent="deleteBook">
      <div>
        <label for="isbn">ISBN to Delete:</label>
        <input type="text" v-model="isbn" id="isbn" required />
      </div>
      <button type="submit">Delete Book</button>
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
import { collection, doc, getDocs, query, deleteDoc, where } from 'firebase/firestore'
import BookList from '../components/BookList.vue'

export default {
  setup() {
    const isbn = ref('')

    const deleteBook = async () => {
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
        await deleteDoc(bookRef)
        isbn.value = ''
        alert('Book deleted successfully!')
      } catch (error) {
        console.log('Error deleting book: ', error)
      }
    }

    return {
      isbn,
      deleteBook
    }
  },
  components: { BookList }
}
</script>
