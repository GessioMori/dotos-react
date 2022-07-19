import { Key, User } from 'phosphor-react'
import { useState } from 'react'
import { ButtonContainer } from '../../components/Button.styles'
import { BaseContainer } from '../../components/Container.styles'
import { HelperLink } from '../../components/HelperLink.styles'
import { InputContainer } from '../../components/Input.styles'
import { LabelContainer } from '../../components/Label.styles'
import { MainContainer } from '../../components/MainContainer.styles'
import { PasswordButton } from '../../components/PasswordButton'
import { PasswordContainer } from '../../components/PasswordContainer.styles'
import { TitleContainer } from '../../components/Title.styles'

export function SignIn() {
  const [isVisible, setIsVisible] = useState(false)

  function toggleVisibility() {
    setIsVisible((current) => !current)
  }

  return (
    <MainContainer>
      <BaseContainer>
        <TitleContainer>Sign in</TitleContainer>
        <LabelContainer htmlFor="email">Email:</LabelContainer>
        <InputContainer
          type="email"
          id="email"
          placeholder="Enter your email."
        />
        <LabelContainer htmlFor="password">Password:</LabelContainer>
        <PasswordContainer>
          <InputContainer
            type={isVisible ? 'text' : 'password'}
            id="password"
            placeholder="Enter your password."
          />
          <PasswordButton
            isVisible={isVisible}
            toggleVisibility={toggleVisibility}
          />
        </PasswordContainer>

        <ButtonContainer>Send</ButtonContainer>
        <HelperLink to="/signup">
          <User size={20} />
          <p>Don&apos;t have an account? Sign up!</p>
        </HelperLink>
        <HelperLink to="/recover">
          <Key size={20} />
          <p>Don&apos;t remember your password?</p>
        </HelperLink>
      </BaseContainer>
    </MainContainer>
  )
}
