import styled, { css } from 'styled-components'

export const HeaderContainer = styled.header`
  width: 100%;
  height: 3rem;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${(props) => css`
    background-color: ${props.theme.dark800};
  `}
`

export const LogoutButton = styled.button`
  width: 5rem;
  height: 2rem;
  border: 0;
  border-radius: 8px;
  font-size: 1rem;

  :hover {
    filter: brightness(1.2);
  }

  background-color: ${(props) => props.theme.blue};
  color: ${(props) => props.theme.white};

  :focus {
    outline: ${(props) => props.theme.blue} solid 2px;
    outline-offset: 2px;
  }
`
