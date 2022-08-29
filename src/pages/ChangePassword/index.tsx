import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import * as zod from 'zod'
import { ButtonContainer } from '../../components/Button.styles'
import { BaseContainer } from '../../components/Container.styles'
import { InputContainer } from '../../components/Input.styles'
import { LabelContainer } from '../../components/Label.styles'
import { MainContainer } from '../../components/MainContainer.styles'
import { TitleContainer } from '../../components/Title.styles'
import { api } from '../../libs/axios'
import { useNav } from '../../utils/useNav'

const validationSchema = zod.object({
  newPassword: zod
    .string()
    .min(6, { message: 'Password must have at least 6 characters' }),
})

type changePasswordInput = zod.infer<typeof validationSchema>

export function ChangePassword() {
  const { token } = useParams()
  const [passwordChanged, setPasswordChanged] = useState<boolean>(false)
  const navigate = useNav()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<changePasswordInput>({
    resolver: zodResolver(validationSchema),
  })

  const onSubmit: SubmitHandler<changePasswordInput> = async ({
    newPassword,
  }) => {
    await api
      .post(`account/change-password/${token}`, { newPassword })
      .then(() => {
        setPasswordChanged(true)
      })
      .catch((err) => {
        if (err.response && err.response.data.message === 'Invalid token.') {
          setError(
            'newPassword',
            {
              message: 'Invalid token, request password change again.',
            },
            { shouldFocus: false },
          )
        } else if (
          err.response &&
          err.response.data.message === 'Token expired.'
        ) {
          setError(
            'newPassword',
            {
              message: 'Token expired, request password change again.',
            },
            { shouldFocus: false },
          )
        } else {
          setError(
            'newPassword',
            { message: 'An error has occurred, please try again' },
            { shouldFocus: false },
          )
        }
      })
  }

  return (
    <MainContainer>
      <BaseContainer>
        {passwordChanged ? (
          <>
            <TitleContainer>Your password has been changed</TitleContainer>
            <ButtonContainer
              marginTop={true}
              onClick={() => navigate('/signin')}
            >
              Click here to sign in
            </ButtonContainer>
          </>
        ) : (
          <>
            <TitleContainer>Reset your password</TitleContainer>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <LabelContainer htmlFor="email">New password:</LabelContainer>
              <InputContainer
                type="password"
                id="password"
                placeholder="Enter your new password"
                marginTop={true}
                {...register('newPassword')}
              />
              <p>{errors.newPassword?.message}</p>
              <ButtonContainer
                marginTop={true}
                type="submit"
                disabled={isSubmitting}
              >
                Change password
              </ButtonContainer>
            </form>
          </>
        )}
      </BaseContainer>
    </MainContainer>
  )
}
