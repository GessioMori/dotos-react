import { zodResolver } from '@hookform/resolvers/zod'
import { Key, User } from 'phosphor-react'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
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
  })
  .required()

type SignInInputs = zod.infer<typeof validationSchema>

export function SignIn() {
  const [isVisible, setIsVisible] = useState(false)
  // const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignInInputs>({
    resolver: zodResolver(validationSchema),
  })

  const onSubmit: SubmitHandler<SignInInputs> = async ({ email, password }) => {
    await api
      .post('/account/login', {
        email,
        password,
      })
      .then((data) => console.log(data))
      .catch((err) => {
        if (err.response.data.message === 'Invalid email or password.') {
          setError(
            'email',
            { message: 'Invalid email or password' },
            { shouldFocus: false },
          )
          setError(
            'password',
            { message: 'Invalid email or password' },
            { shouldFocus: false },
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

  function toggleVisibility() {
    setIsVisible((current) => !current)
  }

  return (
    <MainContainer>
      <BaseContainer>
        <TitleContainer>Sign in</TitleContainer>
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
          <LabelContainer htmlFor="password">Password:</LabelContainer>
          <PasswordContainer>
            <InputContainer
              type={isVisible ? 'text' : 'password'}
              id="password"
              placeholder="Enter your password."
              {...register('password')}
              marginTop={true}
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
