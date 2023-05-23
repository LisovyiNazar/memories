import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducers from './store/reducers'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { PostForEditProvider } from './store/context/postForEdit.context'
import App from './components/App'
import './index.css'

const store = createStore(reducers, compose(applyMiddleware(thunk)))

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <Provider store={store}>
        <GoogleOAuthProvider clientId='614050099505-72d53dh0tv2tosdaovqpqsg0gcfkga8r.apps.googleusercontent.com'>
            <PostForEditProvider>
                <App />
            </PostForEditProvider>
        </GoogleOAuthProvider>
    </Provider>
)
