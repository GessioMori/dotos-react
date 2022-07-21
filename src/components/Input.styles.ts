import styled, { css } from 'styled-components'

interface InputContainerProps {
  maxWidth?: string
}

export const InputContainer = styled.input<InputContainerProps>`
  width: 100%;
  height: 2.5rem;
  padding: 0.5rem;
  font-family: 'Roboto';

  ${(props) => css`
    background-color: ${props.theme.dark700};
    border: none;
    border-radius: 8px;
    color: ${props.theme.white};
    font-size: 1rem;
    max-width: ${props.maxWidth || '300rem'};

    &[value=''] {
      color: ${props.theme.dark200};
    }

    :focus {
      outline: ${props.theme.purple800} solid 2px;
    }
  `}
`
