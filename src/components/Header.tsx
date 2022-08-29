import { api } from '../libs/axios'
import { HeaderContainer, LogoutButton } from './Header.styles'
import { Logo } from './Logo'

interface HeaderProps {
  isLogged: boolean
  handleLog: (state: boolean) => void
}

export function Header({ isLogged, handleLog }: HeaderProps) {
  const handleLogout = async () => {
    await api.get('/account/logout').then(() => {
      handleLog(false)
    })
  }

  return (
    <HeaderContainer>
      <Logo />
      {isLogged && <LogoutButton onClick={handleLogout}>Sign out</LogoutButton>}
    </HeaderContainer>
  )
}
