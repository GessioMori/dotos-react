import { useCallback, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

export function useNav() {
  const navigate = useNavigate()
  const navigateRef = useRef({ navigate })
  useEffect(() => {
    navigateRef.current.navigate = navigate
  }, [navigate])
  return useCallback((location: string) => {
    navigateRef.current.navigate(location, { replace: true })
  }, [])
}
