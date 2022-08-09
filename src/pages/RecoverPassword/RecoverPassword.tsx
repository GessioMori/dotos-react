import { User } from 'phosphor-react'
import { ButtonContainer } from '../../components/Button.styles'
import { BaseContainer } from '../../components/Container.styles'
import { HelperLink } from '../../components/HelperLink.styles'
import { InputContainer } from '../../components/Input.styles'
import { LabelContainer } from '../../components/Label.styles'
import { MainContainer } from '../../components/MainContainer.styles'
import { TitleContainer } from '../../components/Title.styles'

export function RecoverPassword() {
  return (
    <MainContainer>
      <BaseContainer>
        <TitleContainer>Reset your password</TitleContainer>
        <LabelContainer htmlFor="email">Email:</LabelContainer>
        <InputContainer
          type="email"
          id="email"
          placeholder="Enter your email."
          marginTop={true}
        />
        <ButtonContainer marginTop={true}>Send email</ButtonContainer>
        <HelperLink to="/signin">
          <User size={20} />
          <p>Remember your password? Sign in!</p>
        </HelperLink>
      </BaseContainer>
    </MainContainer>
  )
}
