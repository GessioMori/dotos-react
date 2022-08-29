import { Route, Routes } from 'react-router-dom'
import { TodosContextProvider } from './contexts/TodoContext'
import { DefaultLayout } from './layouts/DefaultLayout'
import { ChangePassword } from './pages/ChangePassword'
import { Home } from './pages/Home'
import { RecoverPassword } from './pages/RecoverPassword'
import { SignIn } from './pages/SignIn'
import { SignUp } from './pages/SignUp'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/recover" element={<RecoverPassword />} />
        <Route path="/changepassword/:token" element={<ChangePassword />} />
        <Route
          path="/dashboard"
          element={
            <TodosContextProvider>
              <Home />
            </TodosContextProvider>
          }
        />
      </Route>
    </Routes>
  )
}
