import { Eye, EyeSlash } from 'phosphor-react'
import { useState } from 'react'
import { ButtonContainer } from '../../components/Button.styles'
import { BaseContainer } from '../../components/Container.styles'
import { InputContainer } from '../../components/Input.styles'
import { LabelContainer } from '../../components/Label.styles'
import { MainContainer } from '../../components/MainContainer.styles'
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

          {isVisible ? (
            <Eye
              style={{ position: 'absolute', right: '1rem' }}
              size={20}
              onClick={toggleVisibility}
            />
          ) : (
            <EyeSlash
              style={{ position: 'absolute', right: '1rem' }}
              size={20}
              onClick={toggleVisibility}
            />
          )}
        </PasswordContainer>
        <ButtonContainer>Send</ButtonContainer>
      </BaseContainer>
    </MainContainer>
  )
}
