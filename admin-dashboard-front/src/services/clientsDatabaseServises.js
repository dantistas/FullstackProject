import axios from 'axios'
const databaseUrl = '/api/database' // pakeisti http://localhost:3001/api/database
const newQueriesUrl = '/api/new-queries'    // http://localhost:3001/api/new-queries



const getAllClients = async () => {
   const request = await axios.get(databaseUrl)
    return request.data
}

const getAllNewQueries = async () => {
    const request = await axios.get(newQueriesUrl)
    return request.data
}

const createClient = async (clientValues) => {
    // const config = {
    //     headers: { Authorization: token }
    //   }

    const request = await axios.post(databaseUrl, clientValues)   // veliau dadeti config
    return request.data

}

const updatedClient = async (id, clientValues) => {
//           const config = {
//     headers: { Authorization: token }
//   }
    const request  = await axios.post(`${databaseUrl}/${id}`, clientValues)
    return request.data
}

const deleteClient = async (id) => {
//           const config = {
//     headers: { Authorization: token }
//   }
    const request = await axios.delete(`${databaseUrl}/${id}`)
    return request.data
}


const deleteQuerie = async (type, id) => {
//       const config = {
//     headers: { Authorization: token }
//   }
    const request = await axios.delete(`${newQueriesUrl}/${type}/${id}`)
    return request.data
}



export default {getAllClients, createClient, deleteClient, deleteQuerie, updatedClient, getAllNewQueries}