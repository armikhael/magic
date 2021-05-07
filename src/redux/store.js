/** @format */
import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducerCreatePage from './CreatePageDucks'

const rootReducer = combineReducers({
	createPage: reducerCreatePage,
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default function generateStore() {
	const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
	return store
}
