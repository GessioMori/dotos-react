import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Header } from '../components/Header'
import { api } from '../libs/axios'

export function DefaultLayout() {
  const [isLogged, setIsLogged] = useState<boolean>(false)
  const { pathname } = useLocation()

  console.log(isLogged, pathname)

  useEffect(() => {
    async function setAuth() {
      try {
        await api.post('/account/refresh')
        setIsLogged(true)
      } catch (error) {
        console.log(error)
        setIsLogged(false)
      }
    }
    setAuth()
  }, [])
  return (
    <>
      <Header isLogged={isLogged} />
      <Outlet />
    </>
  )
}
