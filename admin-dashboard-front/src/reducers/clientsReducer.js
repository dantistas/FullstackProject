import clientsDatabaseServises from '../services/clientsDatabaseServises';

const clientsReducer = (state = [] , action) => {
    switch(action.type) {
        case "INITIALIZE_CLIENTS":
            return state = action.data
        case "CREATE_CLIENT":
            return state.concat(action.data) 
        case "DELETE_CLIENT":
            return state = state.filter(client => client._id !== action.data)
        default:
            return state
    }
}



export const initializeClients = () => {
    return async dispatch => {
        const clients = await clientsDatabaseServises.getAllClients()
        dispatch(
          {
            type: 'INITIALIZE_CLIENTS',
            data: clients
           }
        )
      } 
}

export const createClient = (clientValues) => {
    
    return async dispatch => {
        const createdClient = await clientsDatabaseServises.createClient(clientValues)
        dispatch({
            type:"SET_NOTIFICATION",
            data: createdClient.notification
        })
        dispatch({
            type:"CREATE_CLIENT",
            data: createdClient.client
        })
    }
}

export const deleteClientWithID = (id) => {

    return async dispatch => {
        const deletedClient = await clientsDatabaseServises.deleteClient(id)
        dispatch({
            type:"SET_NOTIFICATION",
            data: deletedClient.notification
        })
        dispatch({
            type:"DELETE_CLIENT",
            data: id
        })
    }

}


export default clientsReducer