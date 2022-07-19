import styled, { css } from 'styled-components'

export const InputContainer = styled.input`
  width: 100%;
  height: 2.5rem;
  padding: 0.5rem;
  margin: 0.5rem 0;

  ${(props) => css`
    background-color: ${props.theme.dark700};
    border: none;
    border-radius: 8px;
    color: ${props.theme.white};
    font-size: 1rem;

    :focus {
      outline: ${props.theme.purple800} solid 2px;
    }
  `}
`
