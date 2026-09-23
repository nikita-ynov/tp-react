import { createRoot } from 'react-dom/client'
import './index.css'
import routes from './routes.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'
import { setLoggedUser } from './store/reducers/auth.ts'
import axios from 'axios'

const getLoggedUser = async () => {
  try {
    const url = "https://dummyjson.com/auth/me";
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    store.dispatch(setLoggedUser(response.data))
  } catch(e) {
    localStorage.removeItem('token')
    store.dispatch(setLoggedUser(null))
  }
}

getLoggedUser();

const router = createBrowserRouter(routes)

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)