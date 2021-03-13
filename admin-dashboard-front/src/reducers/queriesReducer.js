import clientsDatabaseServises from '../services/clientsDatabaseServises';

const queriesReducer = (state = [] , action) => {
    switch(action.type) {
        case "INITIALIZE_QUERIES":
            return state = action.data 
        default:
            return state
    }
}

export const initializeAllNewQueries = () => {
    return async dispatch => {
        const allNewQueries = await clientsDatabaseServises.getAllNewQueries()
        dispatch(
          {
            type: 'INITIALIZE_QUERIES',
            data: allNewQueries
           }
        )
      } 

}






export default queriesReducer