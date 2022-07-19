import styled, { css } from 'styled-components'

export const BaseContainer = styled.div`
  width: 95%;
  height: auto;
  max-width: 40rem;

  display: flex;
  flex-direction: column;

  padding: 2rem 1rem;
  margin: auto;
  border-radius: 8px;

  ${(props) => css`
    background-color: ${props.theme.dark800};
  `}
`
