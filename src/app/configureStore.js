import { createStore, applyMiddleware } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import { rootEpic, rootReducer } from './modules/root'

const epicMiddleware = createEpicMiddleware(rootEpic)

export default configureStore = () => {
    const store = createStore(
        rootReducer,
        compose(
            applyMiddleware(epicMiddleware),
            window.devToolsExtension ? window.devToolsExtension() : f => f
        )
    )

    return store
}
