import { createRoot } from 'react-dom/client'
import './styles/index.css'
import './styles/header.css'
import './styles/profile.css'
import './styles/login.css'
import './styles/users.css'
import './styles/favorites.css'
import './styles/page-not-found.css'
import "./styles/recipeDetails.css";
import "./styles/recipeCard.css";
import "./styles/App.css";

import routes from './routes.tsx'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import type { User as UserType } from "./types/user";

import { Provider } from 'react-redux'
import { store } from './store/store.ts'

import { setLoggedUser } from './store/reducers/auth.ts'
import { setUsers } from './store/reducers/user.ts'
import { setLoading } from './store/reducers/loading.ts';

import axios from 'axios'

interface UsersResponse {
  users: UserType[];
}

const getUsers = async () => {
  const url = "https://dummyjson.com/users";
  const response = await axios.get<UsersResponse>(url);
  store.dispatch(setUsers(response.data.users))
}

const getLoggedUser = async () => {
  const token = localStorage.getItem('token');

  if (!token) {
    store.dispatch(setLoggedUser(null));
    return;
  }

  try {
    const url = "https://dummyjson.com/auth/me";
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    store.dispatch(setLoggedUser(response.data))
  } catch(e) {
    localStorage.removeItem('token')
    store.dispatch(setLoggedUser(null))
  }
}

Promise.all([getUsers(), getLoggedUser()]).finally(() => store.dispatch(setLoading(false)))

const router = createBrowserRouter(routes)

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)