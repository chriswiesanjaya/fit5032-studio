/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onRequest } = require('firebase-functions/v2/https')
const admin = require('firebase-admin')
const cors = require('cors')({ origin: true })
const { logger } = require('firebase-functions')

admin.initializeApp()

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

exports.helloWorld = onRequest((request, response) => {
  logger.info('Hello logs!', { structuredData: true })
  response.send('Hello from Firebase!')
})

exports.countBooks = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const booksCollection = admin.firestore().collection('books')
      const snapshot = await booksCollection.get()
      const count = snapshot.size

      res.status(200).send({ count })
    } catch (error) {
      console.error('Error counting books: ', error.message)
      res.status(500).send('Error counting books')
    }
  })
})

exports.addBooks = onRequest((req, res) => {
  cors(req, res, async () => {
    // Ensure only POST requests are allowed
    if (req.method !== 'POST') {
      return res.status(405).send('Method Not Allowed')
    }

    // Destructure isbn and name from the request body
    const { isbn, name } = req.body

    // Validate input
    if (
      typeof isbn !== 'number' ||
      !Number.isInteger(isbn) ||
      !isbn ||
      typeof name !== 'string' ||
      !name.trim()
    ) {
      return res.status(400).send('Invalid input.')
    }

    try {
      const booksCollection = admin.firestore().collection('books')
      const newBook = { isbn, name }
      await booksCollection.add(newBook)

      res.status(201).send('Book added successfully')
    } catch (error) {
      console.error('Error adding books: ', error.message)
      res.status(500).send('Error adding books')
    }
  })
})
