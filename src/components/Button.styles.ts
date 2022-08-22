import styled, { css } from 'styled-components'

interface ButtonContainerProps {
  maxWidth?: string
  marginTop?: boolean
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
  width: 100%;
  height: 2.5rem;
  border: 0;
  border-radius: 8px;
  font-size: 1.2rem;
  font-weight: bold;

  :hover {
    filter: brightness(1.2);
  }

  :disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  ${(props) =>
    css`
      background-color: ${props.theme.blue};
      color: ${props.theme.white};
      max-width: ${props.maxWidth || '300rem'};
      margin-top: ${props.marginTop ? '1rem' : '0'};
      :focus {
        outline: ${props.theme.blue} solid 2px;
        outline-offset: 2px;
      }
    `}
`
