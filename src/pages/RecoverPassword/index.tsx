import { zodResolver } from '@hookform/resolvers/zod'
import { User } from 'phosphor-react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as zod from 'zod'
import { ButtonContainer } from '../../components/Button.styles'
import { BaseContainer } from '../../components/Container.styles'
import { HelperLink } from '../../components/HelperLink.styles'
import { InputContainer } from '../../components/Input.styles'
import { LabelContainer } from '../../components/Label.styles'
import { MainContainer } from '../../components/MainContainer.styles'
import { TitleContainer } from '../../components/Title.styles'

const validationSchema = zod.object({
  email: zod.string().email({ message: 'Must be a valid email' }),
})

type recoverPasswordInput = zod.infer<typeof validationSchema>

export function RecoverPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<recoverPasswordInput>({
    resolver: zodResolver(validationSchema),
  })

  const onSubmit: SubmitHandler<recoverPasswordInput> = (data) =>
    console.log(data)

  return (
    <MainContainer>
      <BaseContainer>
        <TitleContainer>Reset your password</TitleContainer>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <LabelContainer htmlFor="email">Email:</LabelContainer>
          <InputContainer
            type="email"
            id="email"
            placeholder="Enter your email."
            marginTop={true}
            {...register('email')}
          />
          <p>{errors.email?.message}</p>
          <ButtonContainer marginTop={true} type="submit">
            Send email
          </ButtonContainer>
        </form>
        <HelperLink to="/signin">
          <User size={20} />
          <p>Remember your password? Sign in!</p>
        </HelperLink>
      </BaseContainer>
    </MainContainer>
  )
}
