
const cors = require('cors')
const express = require('express')
const app = express()
let db = require('./db.json')
app.use(express.static('build'))
app.use(cors())
app.use(express.static('build'))
app.use(express.json())


app.get('/api/db', async (request, response) => {
  return response.json(db)
})

app.put('/api/db/:id', async (request,response) => {
  const body = request.body
  const id = request.params.id
  db[id] = body
  response.status(201).json(db)
})

const PORT = 8080
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

