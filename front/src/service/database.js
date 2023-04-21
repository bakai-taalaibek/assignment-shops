import axios from 'axios'

const baseUrl = 'http://localhost:3007/api/db'

let data = ''
const getAll = async () => {
  const response = await axios.get(baseUrl)
  data = response
}

const databaseService = {
  getAll
}
export default databaseService