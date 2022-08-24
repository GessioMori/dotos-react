import { Navigate, Outlet, Route } from 'react-router-dom'
import { useAuth } from './useAuth'

export function RequireAuth() {
  const auth = useAuth()
  return <Route>{!auth ? <Navigate to="/signin" /> : <Outlet />}</Route>
}
