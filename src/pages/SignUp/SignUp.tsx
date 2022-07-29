import { SignIn } from 'phosphor-react'
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

export function SignUp() {
  const [isVisible, setIsVisible] = useState(false)

  function toggleVisibility() {
    setIsVisible((current) => !current)
  }

  return (
    <MainContainer>
      <BaseContainer>
        <TitleContainer>Sign up</TitleContainer>
        <LabelContainer htmlFor="name">Name:</LabelContainer>
        <InputContainer
          type="text"
          id="name"
          placeholder="Enter your name."
          marginTop={true}
        />
        <LabelContainer htmlFor="email">Email:</LabelContainer>
        <InputContainer
          type="email"
          id="email"
          placeholder="Enter your email."
          marginTop={true}
        />
        <LabelContainer htmlFor="password">Password:</LabelContainer>
        <PasswordContainer>
          <InputContainer
            type={isVisible ? 'text' : 'password'}
            id="password"
            placeholder="Enter your password."
            marginTop={true}
          />
          <PasswordButton
            isVisible={isVisible}
            toggleVisibility={toggleVisibility}
          />
        </PasswordContainer>
        <ButtonContainer marginTop={true}>Send</ButtonContainer>

        <HelperLink to="/signin">
          <SignIn size={20} />
          <p>Already have an account? Sign in!</p>
        </HelperLink>
      </BaseContainer>
    </MainContainer>
  )
}
