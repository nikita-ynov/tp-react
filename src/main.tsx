import { createRoot } from 'react-dom/client'
import './index.css'
import routes from './routes.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'

const router = createBrowserRouter(routes)

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)