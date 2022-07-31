import styled, { css } from 'styled-components'

interface InputContainerProps {
  maxWidth?: string
  marginTop?: boolean
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
    margin-top: ${props.marginTop ? '0.5rem' : '0'};

    &[value=''] {
      color: ${props.theme.dark200};
    }

    :focus {
      outline: ${props.theme.blue} solid 2px;
    }
  `}
`
