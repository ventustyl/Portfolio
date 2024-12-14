import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux';
import store from "./store";
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
