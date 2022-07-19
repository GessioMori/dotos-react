import styled, { css } from 'styled-components'

export const HeaderContainer = styled.header`
  width: 100%;
  height: 3rem;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  ${(props) => css`
    background-color: ${props.theme.dark800};
  `}
`
