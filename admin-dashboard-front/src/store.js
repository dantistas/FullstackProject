import {createStore, applyMiddleware, combineReducers} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import queriesReducer from './reducers/queriesReducer'
import notificationsReducer from './reducers/notificationsReducer'
import clientsReducer from './reducers/clientsReducer'
import loginReducer from './reducers/loginReducer'





const reducer = combineReducers({
    allQueries: queriesReducer,
    notifications: notificationsReducer,
    clients: clientsReducer,
    user: loginReducer
})

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)




export default store