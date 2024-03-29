import { useEffect, useState } from 'react'
import { Outlet, useLocation, useOutletContext } from 'react-router-dom'
import { Header } from '../components/Header'
import { api } from '../libs/axios'
import { useNav } from '../utils/useNav'

export function DefaultLayout() {
  const [isLogged, setIsLogged] = useState<boolean>(false)
  const navigate = useNav()
  const { pathname } = useLocation()

  const handleLog = (state: boolean) => {
    if (state) {
      navigate('/dashboard')
      setIsLogged(true)
    } else {
      navigate('/signin')
      setIsLogged(false)
    }
  }

  useEffect(() => {
    async function setAuth() {
      try {
        await api.post('/account/refresh')
        navigate('/dashboard')
        setIsLogged(true)
      } catch {
        if (
          pathname === '/signin' ||
          pathname === '/dashboard' ||
          pathname === '/'
        ) {
          navigate('/signin')
        }
      }
    }
    !isLogged && setAuth()
  }, [navigate, pathname, isLogged])

  return (
    <>
      <Header isLogged={isLogged} handleLog={handleLog} />
      <Outlet context={{ handleLog }} />
    </>
  )
}

interface LogUserProps {
  handleLog: (state: boolean) => void
}

export function useLogUser() {
  return useOutletContext<LogUserProps>()
}
