import { HeaderContainer, LogoutButton } from './Header.styles'
import { Logo } from './Logo'

interface HeaderProps {
  isLogged: boolean
}

export function Header({ isLogged }: HeaderProps) {
  return (
    <HeaderContainer>
      <Logo />
      {isLogged && <LogoutButton>Sign out</LogoutButton>}
    </HeaderContainer>
  )
}
