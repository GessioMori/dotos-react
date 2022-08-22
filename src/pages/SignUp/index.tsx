import { zodResolver } from '@hookform/resolvers/zod'
import { SignIn } from 'phosphor-react'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import * as zod from 'zod'
import { ButtonContainer } from '../../components/Button.styles'
import { BaseContainer } from '../../components/Container.styles'
import { HelperLink } from '../../components/HelperLink.styles'
import { InputContainer } from '../../components/Input.styles'
import { LabelContainer } from '../../components/Label.styles'
import { MainContainer } from '../../components/MainContainer.styles'
import { PasswordButton } from '../../components/PasswordButton'
import { PasswordContainer } from '../../components/PasswordContainer.styles'
import { TitleContainer } from '../../components/Title.styles'
import { api } from '../../libs/axios'

const validationSchema = zod
  .object({
    email: zod.string().email({ message: 'Must be a valid email' }),
    password: zod
      .string()
      .min(6, { message: 'Password must have at least 6 characters' }),
    name: zod
      .string()
      .min(3, { message: 'Name must have at least 3 characters' }),
  })
  .required()

type SignUpInputs = zod.infer<typeof validationSchema>

export function SignUp() {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignUpInputs>({
    resolver: zodResolver(validationSchema),
  })

  function toggleVisibility() {
    setIsVisible((current) => !current)
  }

  const onSubmit: SubmitHandler<SignUpInputs> = async ({
    email,
    name,
    password,
  }) => {
    await api
      .post('/account', {
        email,
        name,
        password,
      })
      .then(() => navigate('/signin'))
      .catch((err) => {
        if (err.response.data.message === 'Email already registered.') {
          setError(
            'email',
            { message: 'Email already registered' },
            { shouldFocus: true },
          )
        } else {
          setError(
            'password',
            { message: 'An error has occurred, please try again' },
            { shouldFocus: false },
          )
        }
      })
  }

  return (
    <MainContainer>
      <BaseContainer>
        <TitleContainer>Sign up</TitleContainer>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <LabelContainer htmlFor="name">Name:</LabelContainer>
          <InputContainer
            type="text"
            id="name"
            placeholder="Enter your name."
            marginTop={true}
            {...register('name')}
          />
          <p>{errors.name?.message}</p>
          <LabelContainer htmlFor="email">Email:</LabelContainer>
          <InputContainer
            type="email"
            id="email"
            placeholder="Enter your email."
            marginTop={true}
            {...register('email')}
          />
          <p>{errors.email?.message}</p>
          <LabelContainer htmlFor="password">Password:</LabelContainer>
          <PasswordContainer>
            <InputContainer
              type={isVisible ? 'text' : 'password'}
              id="password"
              placeholder="Enter your password."
              marginTop={true}
              {...register('password')}
            />
            <PasswordButton
              isVisible={isVisible}
              toggleVisibility={toggleVisibility}
            />
          </PasswordContainer>
          <p>{errors.password?.message}</p>
          <ButtonContainer
            marginTop={true}
            type="submit"
            disabled={isSubmitting}
          >
            Send
          </ButtonContainer>
        </form>
        <HelperLink to="/signin">
          <SignIn size={20} />
          <p>Already have an account? Sign in!</p>
        </HelperLink>
      </BaseContainer>
    </MainContainer>
  )
}
