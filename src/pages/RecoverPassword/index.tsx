import { zodResolver } from '@hookform/resolvers/zod'
import { User } from 'phosphor-react'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as zod from 'zod'
import { ButtonContainer } from '../../components/Button.styles'
import { BaseContainer } from '../../components/Container.styles'
import { HelperLink } from '../../components/HelperLink.styles'
import { InputContainer } from '../../components/Input.styles'
import { LabelContainer } from '../../components/Label.styles'
import { MainContainer } from '../../components/MainContainer.styles'
import { TitleContainer } from '../../components/Title.styles'
import { api } from '../../libs/axios'

const validationSchema = zod.object({
  email: zod.string().email({ message: 'Must be a valid email' }),
})

type recoverPasswordInput = zod.infer<typeof validationSchema>

export function RecoverPassword() {
  const [emailConfirmation, setEmailConfirmation] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<recoverPasswordInput>({
    resolver: zodResolver(validationSchema),
  })

  const onSubmit: SubmitHandler<recoverPasswordInput> = async ({ email }) => {
    await api
      .post('/account/recover-password', { email })
      .then(() => {
        setEmailConfirmation(true)
      })
      .catch((err) => {
        if (err.response && err.response.data.message === 'Email not found.') {
          setError('email', { message: 'Email not found' })
        }
      })
  }

  return (
    <MainContainer>
      <BaseContainer>
        {emailConfirmation ? (
          <p>Check your inbox! An email has been sent.</p>
        ) : (
          <>
            <TitleContainer>Reset your password</TitleContainer>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <LabelContainer htmlFor="email">Email:</LabelContainer>
              <InputContainer
                type="email"
                id="email"
                placeholder="Enter your email"
                marginTop={true}
                {...register('email')}
              />
              <p>{errors.email?.message}</p>
              <ButtonContainer
                marginTop={true}
                type="submit"
                disabled={isSubmitting}
              >
                Send email
              </ButtonContainer>
            </form>
            <HelperLink to="/signin">
              <User size={20} />
              <p>Remember your password? Sign in!</p>
            </HelperLink>
          </>
        )}
      </BaseContainer>
    </MainContainer>
  )
}
