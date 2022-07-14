import styled, { css } from 'styled-components'

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success'

interface ButtonContainerProps {
  variant: ButtonVariant
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
  width: 200px;
  height: 80px;

  ${(props) =>
    css`
      background-color: ${props.theme[props.variant]};
      color: ${props.theme.white};
      border: 0;
      border-radius: 8px;
      margin: 1rem;
    `}
`
