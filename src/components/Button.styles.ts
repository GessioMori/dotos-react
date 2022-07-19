import styled, { css } from 'styled-components'

export const ButtonContainer = styled.button`
  width: 100%;
  height: 3rem;
  border: 0;
  border-radius: 8px;
  margin-top: 1rem;
  font-size: 1.2rem;
  font-weight: bold;

  :hover {
    filter: brightness(1.2);
  }

  ${(props) =>
    css`
      background-color: ${props.theme.purple800};
      color: ${props.theme.white};
      :focus {
        outline: ${props.theme.purple800} solid 2px;
        outline-offset: 2px;
      }
    `}
`
