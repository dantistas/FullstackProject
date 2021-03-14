import axios from 'axios'
const baseUrl = '/api/login'    //http://localhost:3001/api/login


const login = async credentials => {
  const res = await axios.post(baseUrl, credentials)
  return res.data
}


export default { login }